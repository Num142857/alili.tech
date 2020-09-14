---
title: '44个 Javascript 变态题解析 (上)' 
date: 2019-02-09 2:30:58
hidden: true
slug: 89ze693tw53
categories: [reprint]
---

{{< raw >}}

                    
<p>原文来自我的 <a href="https://github.com/xiaoyu2er/blog/issues/1" rel="nofollow noreferrer" target="_blank">github</a></p>
<p>原题来自: <a href="http://javascript-puzzlers.herokuapp.com/" rel="nofollow noreferrer" target="_blank">javascript-puzzlers</a></p>
<p><a href="https://segmentfault.com/a/1190000005682214?_ea=872460">44个 Javascript 变态题解析 (下)</a></p>
<p>读者可以先去做一下感受感受. 当初笔者的成绩是 21/44...</p>
<p>当初笔者做这套题的时候不仅怀疑智商, 连人生都开始怀疑了....</p>
<p>不过, 对于基础知识的理解是深入编程的前提. 让我们一起来看看这些变态题到底变态不变态吧!</p>
<h2 id="articleHeader0">第1题</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[&quot;1&quot;, &quot;2&quot;, &quot;3&quot;].map(parseInt)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;">[<span class="hljs-string">"1"</span>, <span class="hljs-string">"2"</span>, <span class="hljs-string">"3"</span>].<span class="hljs-built_in">map</span>(<span class="hljs-built_in">parseInt</span>)</code></pre>
<p>知识点:</p>
<ul>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map" rel="nofollow noreferrer" target="_blank">Array/map</a></p></li>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt" rel="nofollow noreferrer" target="_blank">Number/parseInt</a></p></li>
</ul>
<p>首先, map接受两个参数, 一个回调函数 callback, 一个回调函数的this值</p>
<p>其中回调函数接受三个参数 currentValue, index, arrary;</p>
<p>而题目中, map只传入了回调函数--parseInt.</p>
<p>其次, parseInt 只接受两个两个参数 string, radix(基数). radix的合法区间是2-36. 默认是10.</p>
<p>所以本题即问</p>
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
<p>首先后两者参数不合法. 第一个笔者猜测0和不传一样被认为是10.</p>
<p>所以答案是 <code>[1, NaN, NaN]</code></p>
<h2 id="articleHeader1">第2题</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[typeof null, null instanceof Object]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;">[<span class="hljs-keyword">typeof</span> <span class="hljs-literal">null</span>, <span class="hljs-literal">null</span> <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>]</code></pre>
<p>两个知识点:</p>
<ul>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof" rel="nofollow noreferrer" target="_blank">Operators/typeof</a></p></li>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof" rel="nofollow noreferrer" target="_blank">Operators/instanceof</a></p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof" rel="nofollow noreferrer" target="_blank">Operators/instanceof(中)</a></p></li>
</ul>
<p>typeof 返回一个表示类型的字符串.</p>
<p>instanceof 运算符用来检测 constructor.prototype 是否存在于参数 object 的原型链上.</p>
<p>这个题可以直接看链接... 因为 <code>typeof null === 'object'</code> 自语言之初就是这样....</p>
<p>typeof 的结果请看下表:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type         result
Undefined   &quot;undefined&quot;
Null        &quot;object&quot;
Boolean     &quot;boolean&quot;
Number      &quot;number&quot;
String      &quot;string&quot;
Symbol      &quot;symbol&quot;
Host object Implementation-dependent
Function    &quot;function&quot;
Object      &quot;object&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>type         result
Undefined   <span class="hljs-string">"undefined"</span>
Null        <span class="hljs-string">"object"</span>
<span class="hljs-built_in">Boolean</span>     <span class="hljs-string">"boolean"</span>
<span class="hljs-built_in">Number</span>      <span class="hljs-string">"number"</span>
<span class="hljs-built_in">String</span>      <span class="hljs-string">"string"</span>
<span class="hljs-built_in">Symbol</span>      <span class="hljs-string">"symbol"</span>
Host object Implementation-dependent
<span class="hljs-built_in">Function</span>    <span class="hljs-string">"function"</span>
<span class="hljs-built_in">Object</span>      <span class="hljs-string">"object"</span></code></pre>
<p>所以答案 <code>[object, false]</code></p>
<h2 id="articleHeader2">第3题</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[ [3,2,1].reduce(Math.pow), [].reduce(Math.pow) ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code style="word-break: break-word; white-space: initial;">[ [<span class="hljs-number">3</span>,<span class="hljs-number">2</span>,<span class="hljs-number">1</span>].reduce(Math.pow), [].reduce(Math.pow) ]</code></pre>
<p>知识点:</p>
<ul><li><p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce" rel="nofollow noreferrer" target="_blank">Array/Reduce</a></p></li></ul>
<p><code>arr.reduce(callback[, initialValue])</code></p>
<p>reduce接受两个参数, 一个回调, 一个初始值.</p>
<p>回调函数接受四个参数 <code>previousValue, currentValue, currentIndex, array</code></p>
<p>需要注意的是 <code>If the array is empty and no initialValue was provided, TypeError would be thrown.</code></p>
<p>所以第二个表达式会报异常. 第一个表达式等价于 <code>Math.pow(3, 2) =&gt; 9; Math.pow(9, 1) =&gt;9</code></p>
<p>答案 <code>an error</code></p>
<h2 id="articleHeader3">第4题</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var val = 'smtg';
console.log('Value is ' + (val === 'smtg') ? 'Something' : 'Nothing');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">val</span> = <span class="hljs-string">'smtg'</span>;
console.log(<span class="hljs-string">'Value is '</span> + (<span class="hljs-keyword">val</span> === <span class="hljs-string">'smtg'</span>) ? <span class="hljs-string">'Something'</span> : <span class="hljs-string">'Nothing'</span>);</code></pre>
<p>两个知识点:</p>
<ul>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence" rel="nofollow noreferrer" target="_blank">Operators/Operator_Precedence</a></p></li>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator" rel="nofollow noreferrer" target="_blank">Operators/Conditional_Operator</a></p></li>
</ul>
<p>简而言之 <code>+</code> 的优先级 大于 <code>?</code></p>
<p>所以原题等价于 <code>'Value is true' ? 'Somthing' : 'Nonthing'</code> 而不是 <code>'Value is' + (true ? 'Something' : 'Nonthing')</code></p>
<p>答案 <code>'Something'</code></p>
<h2 id="articleHeader4">第5题</h2>
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
<p>这个相对简单, 一个知识点:</p>
<ul><li><p><a href="https://developer.mozilla.org/en-US/docs/Glossary/Hoisting" rel="nofollow noreferrer" target="_blank">Hoisting</a></p></li></ul>
<p>在 JavaScript中， functions 和 variables 会被提升。变量提升是JavaScript将声明移至作用域 scope (全局域或者当前函数作用域) 顶部的行为。</p>
<p>这个题目相当于</p>
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
<p>所以答案是 <code>'Goodbye Jack'</code></p>
<h2 id="articleHeader5">第6题</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var END = Math.pow(2, 53);
var START = END - 100;
var count = 0;
for (var i = START; i <= END; i++) {
    count++;
}
console.log(count);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>var END = Math.pow(<span class="hljs-number">2</span>, <span class="hljs-number">53</span>)<span class="hljs-comment">;</span>
var START = END - <span class="hljs-number">100</span><span class="hljs-comment">;</span>
var <span class="hljs-built_in">count</span> = <span class="hljs-number">0</span><span class="hljs-comment">;</span>
for (var i = START<span class="hljs-comment">; i &lt;= END; i++) {</span>
    <span class="hljs-built_in">count</span>++<span class="hljs-comment">;</span>
}
console.log(<span class="hljs-built_in">count</span>)<span class="hljs-comment">;</span></code></pre>
<p>一个知识点:</p>
<ul><li><p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Infinity" rel="nofollow noreferrer" target="_blank">Infinity</a></p></li></ul>
<p>在 JS 里, Math.pow(2, 53) == 9007199254740992 是可以表示的最大值. 最大值加一还是最大值. 所以循环不会停.</p>
<h2 id="articleHeader6">第7题</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ary = [0,1,2];
ary[10] = 10;
ary.filter(function(x) { return x === undefined;});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> ary = [<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>];
ary[<span class="hljs-number">10</span>] = <span class="hljs-number">10</span>;
ary.filter(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(x)</span> </span>{ <span class="hljs-keyword">return</span> x === <span class="hljs-literal">undefined</span>;});</code></pre>
<p>答案是 <code>[]</code></p>
<p>看一篇文章理解稀疏数组</p>
<ul>
<li><p><a href="http://www.cnblogs.com/ziyunfei/archive/2012/09/16/2687165.html" rel="nofollow noreferrer" target="_blank">译 JavaScript中的稀疏数组与密集数组</a></p></li>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter" rel="nofollow noreferrer" target="_blank">Array/filter</a></p></li>
</ul>
<p>我们来看一下 Array.prototype.filter 的 polyfill:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!Array.prototype.filter) {
  Array.prototype.filter = function(fun/*, thisArg*/) {
    'use strict';

    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function') {
      throw new TypeError();
    }

    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t) { // 注意这里!!!
        var val = t[i];
        if (fun.call(thisArg, val, i, t)) {
          res.push(val);
        }
      }
    }

    return res;
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">if</span> (!<span class="hljs-built_in">Array</span>.prototype.filter) {
  <span class="hljs-built_in">Array</span>.prototype.filter = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fun<span class="hljs-regexp">/*, thisArg*/</span></span>) </span>{
<span class="hljs-meta">    'use strict'</span>;

    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span> === <span class="hljs-keyword">void</span> <span class="hljs-number">0</span> || <span class="hljs-keyword">this</span> === <span class="hljs-literal">null</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>();
    }

    <span class="hljs-keyword">var</span> t = <span class="hljs-built_in">Object</span>(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">var</span> len = t.length &gt;&gt;&gt; <span class="hljs-number">0</span>;
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> fun !== <span class="hljs-string">'function'</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>();
    }

    <span class="hljs-keyword">var</span> res = [];
    <span class="hljs-keyword">var</span> thisArg = <span class="hljs-built_in">arguments</span>.length &gt;= <span class="hljs-number">2</span> ? <span class="hljs-built_in">arguments</span>[<span class="hljs-number">1</span>] : <span class="hljs-keyword">void</span> <span class="hljs-number">0</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; len; i++) {
      <span class="hljs-keyword">if</span> (i <span class="hljs-keyword">in</span> t) { <span class="hljs-comment">// 注意这里!!!</span>
        <span class="hljs-keyword">var</span> val = t[i];
        <span class="hljs-keyword">if</span> (fun.call(thisArg, val, i, t)) {
          res.push(val);
        }
      }
    }

    <span class="hljs-keyword">return</span> res;
  };
}</code></pre>
<p>我们看到在迭代这个数组的时候, 首先检查了这个索引值是不是数组的一个属性, 那么我们测试一下.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="0 in ary; => true
3 in ary; => false
10 in ary; => true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs basic"><code><span class="hljs-symbol">0 </span>in ary; =&gt; true
<span class="hljs-symbol">3 </span>in ary; =&gt; false
<span class="hljs-symbol">10 </span>in ary; =&gt; true</code></pre>
<p>也就是说 从 3 - 9 都是没有初始化的'坑'!, 这些索引并不存在与数组中. 在 array 的函数调用的时候是会跳过这些'坑'的.</p>
<h2 id="articleHeader7">第8题</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var two   = 0.2
var one   = 0.1
var eight = 0.8
var six   = 0.6
[two - one == one, eight - six == two]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">two</span>   = 0.2
<span class="hljs-keyword">var</span> <span class="hljs-keyword">one</span>   = 0.1
<span class="hljs-keyword">var</span> eight = 0.8
<span class="hljs-keyword">var</span> six   = 0.6
[<span class="hljs-keyword">two</span> - <span class="hljs-keyword">one</span> == <span class="hljs-keyword">one</span>, eight - six == <span class="hljs-keyword">two</span>]</code></pre>
<ul><li><p><a href="http://ourjs.com/detail/54695381bc3f9b154e000046" rel="nofollow noreferrer" target="_blank">JavaScript的设计缺陷?浮点运算：0.1 + 0.2 != 0.3</a></p></li></ul>
<p>IEEE 754标准中的浮点数并不能精确地表达小数</p>
<p>那什么时候精准, 什么时候不经准呢? 笔者也不知道...</p>
<p>答案 <code>[true, false]</code></p>
<h2 id="articleHeader8">第9题</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function showCase(value) {
    switch(value) {
    case 'A':
        console.log('Case A');
        break;
    case 'B':
        console.log('Case B');
        break;
    case undefined:
        console.log('undefined');
        break;
    default:
        console.log('Do not know!');
    }
}
showCase(new String('A'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">showCase</span>(<span class="hljs-params">value</span>) </span>{
    <span class="hljs-keyword">switch</span>(value) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">'A'</span>:
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Case A'</span>);
        <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">'B'</span>:
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Case B'</span>);
        <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-literal">undefined</span>:
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'undefined'</span>);
        <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">default</span>:
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Do not know!'</span>);
    }
}
showCase(<span class="hljs-keyword">new</span> <span class="hljs-built_in">String</span>(<span class="hljs-string">'A'</span>));</code></pre>
<p>两个知识点:</p>
<ul>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch" rel="nofollow noreferrer" target="_blank">Statements/switch</a></p></li>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String" rel="nofollow noreferrer" target="_blank">String</a></p></li>
</ul>
<p>switch 是严格比较, String 实例和 字符串不一样.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var s_prim = 'foo';
var s_obj = new String(s_prim);

console.log(typeof s_prim); // &quot;string&quot;
console.log(typeof s_obj);  // &quot;object&quot;
console.log(s_prim === s_obj); // false
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> s_prim = <span class="hljs-string">'foo'</span>;
<span class="hljs-keyword">var</span> s_obj = <span class="hljs-keyword">new</span> <span class="hljs-built_in">String</span>(s_prim);

<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> s_prim); <span class="hljs-comment">// "string"</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> s_obj);  <span class="hljs-comment">// "object"</span>
<span class="hljs-built_in">console</span>.log(s_prim === s_obj); <span class="hljs-comment">// false</span>
</code></pre>
<p>答案是 <code>'Do not know!'</code></p>
<h2 id="articleHeader9">第10题</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function showCase2(value) {
    switch(value) {
    case 'A':
        console.log('Case A');
        break;
    case 'B':
        console.log('Case B');
        break;
    case undefined:
        console.log('undefined');
        break;
    default:
        console.log('Do not know!');
    }
}
showCase2(String('A'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">showCase2</span>(<span class="hljs-params">value</span>) </span>{
    <span class="hljs-keyword">switch</span>(value) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">'A'</span>:
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Case A'</span>);
        <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">'B'</span>:
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Case B'</span>);
        <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-literal">undefined</span>:
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'undefined'</span>);
        <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">default</span>:
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Do not know!'</span>);
    }
}
showCase2(<span class="hljs-built_in">String</span>(<span class="hljs-string">'A'</span>));</code></pre>
<p>解释:<br><code>String(x) does not create an object but does return a string, i.e. typeof String(1) === "string"</code></p>
<p>还是刚才的知识点, 只不过 String 不仅是个构造函数 直接调用返回一个字符串哦.</p>
<p>答案 <code>'Case A'</code></p>
<h2 id="articleHeader10">第11题</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isOdd(num) {
    return num % 2 == 1;
}
function isEven(num) {
    return num % 2 == 0;
}
function isSane(num) {
    return isEven(num) || isOdd(num);
}
var values = [7, 4, '13', -9, Infinity];
values.map(isSane);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code><span class="hljs-keyword">function</span> <span class="hljs-title">isOdd</span>(num) {
    <span class="hljs-keyword">return</span> <span class="hljs-type">num</span> % <span class="hljs-number">2</span> == <span class="hljs-number">1</span>;
}
<span class="hljs-keyword">function</span> <span class="hljs-title">isEven</span>(num) {
    <span class="hljs-keyword">return</span> <span class="hljs-type">num</span> % <span class="hljs-number">2</span> == <span class="hljs-number">0</span>;
}
<span class="hljs-keyword">function</span> <span class="hljs-title">isSane</span>(num) {
    <span class="hljs-keyword">return</span> <span class="hljs-type">isEven(num)</span> || isOdd(num);
}
var values = [<span class="hljs-number">7</span>, <span class="hljs-number">4</span>, '<span class="hljs-number">13</span>', -<span class="hljs-number">9</span>, Infinity];
values.map(isSane);</code></pre>
<p>一个知识点</p>
<ul><li><p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Remainder" rel="nofollow noreferrer" target="_blank">Arithmetic_Operators#Remainder</a></p></li></ul>
<p>此题等价于</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="7 % 2 => 1
4 % 2 => 0
'13' % 2 => 1
-9 % % 2 => -1
Infinity % 2 => NaN" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">7</span> % <span class="hljs-number">2</span> =&gt; <span class="hljs-number">1</span>
<span class="hljs-number">4</span> % <span class="hljs-number">2</span> =&gt; <span class="hljs-number">0</span>
'<span class="hljs-number">13</span>' % <span class="hljs-number">2</span> =&gt; <span class="hljs-number">1</span>
<span class="hljs-number">-9</span> % % <span class="hljs-number">2</span> =&gt; <span class="hljs-number">-1</span>
Infinity % <span class="hljs-number">2</span> =&gt; NaN</code></pre>
<p>需要注意的是 余数的正负号随第一个操作数.</p>
<p>答案 <code>[true, true, true, false, false]</code></p>
<h2 id="articleHeader11">第12题</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="parseInt(3, 8)
parseInt(3, 2)
parseInt(3, 0)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">parseInt</span><span class="hljs-params">(<span class="hljs-number">3</span>, <span class="hljs-number">8</span>)</span></span>
<span class="hljs-function"><span class="hljs-title">parseInt</span><span class="hljs-params">(<span class="hljs-number">3</span>, <span class="hljs-number">2</span>)</span></span>
<span class="hljs-function"><span class="hljs-title">parseInt</span><span class="hljs-params">(<span class="hljs-number">3</span>, <span class="hljs-number">0</span>)</span></span></code></pre>
<p>第一个题讲过了, 答案 <code>3, NaN, 3</code></p>
<h2 id="articleHeader12">第13题</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.isArray( Array.prototype )" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vbscript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">Array</span>.<span class="hljs-built_in">isArray</span>( <span class="hljs-built_in">Array</span>.prototype )</code></pre>
<p>一个知识点:</p>
<ul><li><p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype" rel="nofollow noreferrer" target="_blank">Array/prototype</a></p></li></ul>
<p>一个鲜为人知的实事: <code>Array.prototype =&gt; []</code>;</p>
<p>答案: <code>true</code></p>
<h2 id="articleHeader13">第14题</h2>
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
<ul><li><p><a href="https://dorey.github.io/JavaScript-Equality-Table/" rel="nofollow noreferrer" target="_blank">JavaScript-Equality-Table</a></p></li></ul>
<p>一图胜千言</p>
<p><span class="img-wrap"><img data-src="/img/bVx0au" src="https://static.alili.tech/img/bVx0au" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVx0av" src="https://static.alili.tech/img/bVx0av" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>答案: <code>false</code></p>
<h2 id="articleHeader14">第15题</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[]==[]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code><span class="hljs-string">[]</span>==<span class="hljs-string">[]</span>
</code></pre>
<p><code>==</code> 是万恶之源, 看上图</p>
<p>答案是 <code>false</code></p>
<h2 id="articleHeader15">第16题</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'5' + 3
'5' - 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>'<span class="hljs-number">5</span>' + <span class="hljs-number">3</span>
'<span class="hljs-number">5</span>' - <span class="hljs-number">3</span></code></pre>
<p>两个知识点:</p>
<ul>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Addition" rel="nofollow noreferrer" target="_blank">Arithmetic_Operators#Addition</a></p></li>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Subtraction" rel="nofollow noreferrer" target="_blank">Arithmetic_Operators#Subtraction</a></p></li>
</ul>
<p><code>+</code> 用来表示两个数的和或者字符串拼接, <code>-</code>表示两数之差.</p>
<p>请看例子, 体会区别:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> '5' + 3
'53'
> 5 + '3'
'53'
> 5 - '3'
2
> '5' - 3
2
> '5' - '3'
2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>&gt; '<span class="hljs-number">5</span>' + <span class="hljs-number">3</span>
'<span class="hljs-number">53</span>'
&gt; <span class="hljs-number">5</span> + '<span class="hljs-number">3</span>'
'<span class="hljs-number">53</span>'
&gt; <span class="hljs-number">5</span> - '<span class="hljs-number">3</span>'
<span class="hljs-number">2</span>
&gt; '<span class="hljs-number">5</span>' - <span class="hljs-number">3</span>
<span class="hljs-number">2</span>
&gt; '<span class="hljs-number">5</span>' - '<span class="hljs-number">3</span>'
<span class="hljs-number">2</span></code></pre>
<p>也就是说 <code>-</code> 会尽可能的将两个操作数变成数字, 而 <code>+</code> 如果两边不都是数字, 那么就是字符串拼接.</p>
<p>答案是 <code>'53', 2</code></p>
<h2 id="articleHeader16">第17题</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1 + - + + + - + 1
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs basic"><code><span class="hljs-symbol">1 </span>+ - + + + - + <span class="hljs-number">1</span>
</code></pre>
<p>这里应该是(倒着看)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1 + (a)     => 2
a = - (b) => 1
b = + (c) => -1
c = + (d) => -1
d = + (e) => -1
e = + (f) => -1
f = - (g) => -1
g = + 1   => 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-number">1</span> + <span class="hljs-function">(<span class="hljs-params">a</span>)     =&gt;</span> <span class="hljs-number">2</span>
a = - <span class="hljs-function">(<span class="hljs-params">b</span>) =&gt;</span> <span class="hljs-number">1</span>
b = + <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> <span class="hljs-number">-1</span>
c = + <span class="hljs-function">(<span class="hljs-params">d</span>) =&gt;</span> <span class="hljs-number">-1</span>
d = + <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> <span class="hljs-number">-1</span>
e = + <span class="hljs-function">(<span class="hljs-params">f</span>) =&gt;</span> <span class="hljs-number">-1</span>
f = - <span class="hljs-function">(<span class="hljs-params">g</span>) =&gt;</span> <span class="hljs-number">-1</span>
g = + <span class="hljs-number">1</span>   =&gt; <span class="hljs-number">1</span></code></pre>
<p>所以答案 <code>2</code></p>
<h2 id="articleHeader17">第18题</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ary = Array(3);
ary[0]=2
ary.map(function(elem) { return '1'; });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> ary = <span class="hljs-built_in">Array</span>(<span class="hljs-number">3</span>);
ary[<span class="hljs-number">0</span>]=<span class="hljs-number">2</span>
ary.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">elem</span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-string">'1'</span>; });</code></pre>
<p>稀疏数组. 同第7题.</p>
<p>题目中的数组其实是一个长度为3, 但是没有内容的数组, array 上的操作会跳过这些未初始化的'坑'.</p>
<p>所以答案是 <code>["1", undefined × 2]</code></p>
<h2 id="articleHeader18">第19题</h2>
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
bar(1,1,1)
" title="" data-original-title="复制"></span>
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
bar(<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>)
</code></pre>
<p>这是一个大坑, 尤其是涉及到 ES6语法的时候</p>
<p>知识点:</p>
<ul><li><p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments" rel="nofollow noreferrer" target="_blank">Functions/arguments</a></p></li></ul>
<p>首先 <code>The arguments object is an Array-like object corresponding to the arguments passed to a function.</code></p>
<p>也就是说 <code>arguments</code> 是一个 <code>object</code>, c 就是 arguments[2], 所以对于 c 的修改就是对 arguments[2] 的修改.</p>
<p>所以答案是 <code>21</code>.</p>
<p>然而!!!!!!</p>
<p>当函数参数涉及到 <code>any rest parameters, any default parameters or any destructured parameters</code> 的时候, 这个 arguments 就不在是一个 <code>mapped arguments object </code> 了.....</p>
<p>请看:</p>
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
<p>答案是 <code>12</code> !!!!</p>
<p>请读者细细体会!!</p>
<h2 id="articleHeader19">第20题</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var a = 111111111111111110000,
    b = 1111;
a + b;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>
var a = <span class="hljs-number">111111111111111110000</span>,
    <span class="hljs-keyword">b </span>= <span class="hljs-number">1111</span><span class="hljs-comment">;</span>
a + <span class="hljs-keyword">b;
</span></code></pre>
<p>答案还是 <code>111111111111111110000</code>. 解释是 <code>Lack of precision for numbers in JavaScript affects both small and big numbers.</code> 但是笔者不是很明白................ 请读者赐教!</p>
<p>精读者提示 是超过浮点数的精度了, 笔者没有仔细看标准...</p>
<h2 id="articleHeader20">第21题</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = [].reverse;
x();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>var x = [].reverse<span class="hljs-comment">;</span>
x()<span class="hljs-comment">;</span></code></pre>
<p>这个题有意思!</p>
<p>知识点:</p>
<ul><li><p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse" rel="nofollow noreferrer" target="_blank">Array/reverse</a></p></li></ul>
<p><code>The reverse method transposes the elements of the calling array object in place, mutating the array, and returning a reference to the array.</code></p>
<p>也就是说 最后会返回这个调用者(this), 可是 x 执行的时候是上下文是全局. 那么最后返回的是 <code>window</code>.</p>
<p>答案是 <code>window</code></p>
<h2 id="articleHeader21">第22题</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Number.MIN_VALUE > 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">Number<span class="hljs-selector-class">.MIN_VALUE</span> &gt; <span class="hljs-number">0</span></code></pre>
<p><code>true</code></p>
<p>今天先到这里, 下次我们来看后22个题!</p>
<p><a href="https://segmentfault.com/a/1190000005682214?_ea=872460">44个 Javascript 变态题解析 (下)</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
44个 Javascript 变态题解析 (上)

## 原文链接
[https://segmentfault.com/a/1190000005681454](https://segmentfault.com/a/1190000005681454)

