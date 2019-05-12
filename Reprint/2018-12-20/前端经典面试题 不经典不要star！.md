---
title: '前端经典面试题 不经典不要star！' 
date: 2018-12-20 2:30:10
hidden: true
slug: mm7c1c4gb1
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>上一期说好的node.js的核心模块进阶以及基本web应用的使用将在2号或者3号与大家见面,在此之前我想跟大家分享几个前端经典的面试题,为什么我突然想写这么一篇文章呢?今天我应公司要求去面试了下几位招聘者,然后又现场整不出几个难题,就搜了一下前端变态面试题!  HAHA，前提我并不是一个变态 欺负人的面试官.只是我希望看看对方的逻辑能力！</p>
<p><strong>从而又拿这些面试题进行了自我检测,发现还是有一些坑的~~~</strong><br><strong>接下与大家进行几道题的分析 分享 互勉！</strong></p>
<h2 id="articleHeader1">正文</h2>
<p>先把我挑选的几道,不一定最经典.但是会让你有学习的进步！列举一下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//第1题
 [&quot;1&quot;, &quot;2&quot;, &quot;3&quot;].map(parseInt)
 
//第2题
[ [3,2,1].reduce(Math.pow), [].reduce(Math.pow) ]

//第3题
var ary = [0,1,2];
ary[10] = 10;
ary.filter(function(x) { return x === undefined;});

//第4题
[typeof null, null instanceof Object]

//第5题
function sidEffecting(ary) {
  ary[0] = ary[2];
 }
function bar(a,b,c) {
   c = 10
   sidEffecting(arguments);
   return a + b + c;
}
bar(1,1,1)

//第六题
 var END = Math.pow(2, 53);
 var START = END - 100;
 var count = 0;
 for (var i = START; i <= END; i++) {
     count++;
 }
 console.log(count);
 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//第1题</span>
 [<span class="hljs-string">"1"</span>, <span class="hljs-string">"2"</span>, <span class="hljs-string">"3"</span>].map(<span class="hljs-built_in">parseInt</span>)
 
<span class="hljs-comment">//第2题</span>
[ [<span class="hljs-number">3</span>,<span class="hljs-number">2</span>,<span class="hljs-number">1</span>].reduce(<span class="hljs-built_in">Math</span>.pow), [].reduce(<span class="hljs-built_in">Math</span>.pow) ]

<span class="hljs-comment">//第3题</span>
<span class="hljs-keyword">var</span> ary = [<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>];
ary[<span class="hljs-number">10</span>] = <span class="hljs-number">10</span>;
ary.filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x</span>) </span>{ <span class="hljs-keyword">return</span> x === <span class="hljs-literal">undefined</span>;});

<span class="hljs-comment">//第4题</span>
[<span class="hljs-keyword">typeof</span> <span class="hljs-literal">null</span>, <span class="hljs-literal">null</span> <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>]

<span class="hljs-comment">//第5题</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sidEffecting</span>(<span class="hljs-params">ary</span>) </span>{
  ary[<span class="hljs-number">0</span>] = ary[<span class="hljs-number">2</span>];
 }
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params">a,b,c</span>) </span>{
   c = <span class="hljs-number">10</span>
   sidEffecting(<span class="hljs-built_in">arguments</span>);
   <span class="hljs-keyword">return</span> a + b + c;
}
bar(<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>)

<span class="hljs-comment">//第六题</span>
 <span class="hljs-keyword">var</span> END = <span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">2</span>, <span class="hljs-number">53</span>);
 <span class="hljs-keyword">var</span> START = END - <span class="hljs-number">100</span>;
 <span class="hljs-keyword">var</span> count = <span class="hljs-number">0</span>;
 <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = START; i &lt;= END; i++) {
     count++;
 }
 <span class="hljs-built_in">console</span>.log(count);
 
</code></pre>
<h2 id="articleHeader2">读者思考时间</h2>
<p><span class="img-wrap"><img data-src="/img/bV1cgO?w=1125&amp;h=570" src="https://static.alili.tech/img/bV1cgO?w=1125&amp;h=570" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>大家努力思考,努力！==============================================</p>
<h2 id="articleHeader3">接下来一道一道咱们去慢慢解析</h2>
<p><strong>第一题：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[&quot;1&quot;, &quot;2&quot;, &quot;3&quot;].map(parseInt)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>[<span class="hljs-string">"1"</span>, <span class="hljs-string">"2"</span>, <span class="hljs-string">"3"</span>].<span class="hljs-built_in">map</span>(<span class="hljs-built_in">parseInt</span>)
</code></pre>
<p>这道题知识点包括:</p>
<ol>
<li><a href="https://link.juejin.im/?target=https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map" rel="nofollow noreferrer" target="_blank">Array/map</a></li>
<li>Number/parseInt</li>
<li>JavaScript parseInt</li>
</ol>
<p>按照上面知识点来串一下这道题！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="首先, map接受两个参数, 一个回调函数 callback, 一个回调函数的this值

其中回调函数接受三个参数 currentValue, index, arrary;

而题目中, map只传入了回调函数--parseInt.

其次, parseInt 只接受两个两个参数 string, radix(基数).  
本题理解来说也就是key与 index 

所以本题即问

parseInt('1', 0);
parseInt('2', 1);
parseInt('3', 2);
首先后两者参数不合法.

所以答案是 [1, NaN, NaN]

  如果研究理解了 
  parseInt(3, 8)
  parseInt(3, 2)    //下方评论该题答案  别作弊哦！
  parseInt(3, 0)
  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>首先, <span class="hljs-built_in">map</span>接受两个参数, 一个回调函数 callback, 一个回调函数的<span class="hljs-keyword">this</span>值

其中回调函数接受三个参数 currentValue, index, arrary;

而题目中, <span class="hljs-built_in">map</span>只传入了回调函数--<span class="hljs-built_in">parseInt</span>.

其次, <span class="hljs-built_in">parseInt</span> 只接受两个两个参数 <span class="hljs-keyword">string</span>, radix(基数).  
本题理解来说也就是key与 index 

所以本题即问

<span class="hljs-built_in">parseInt</span>(<span class="hljs-string">'1'</span>, <span class="hljs-number">0</span>);
<span class="hljs-built_in">parseInt</span>(<span class="hljs-string">'2'</span>, <span class="hljs-number">1</span>);
<span class="hljs-built_in">parseInt</span>(<span class="hljs-string">'3'</span>, <span class="hljs-number">2</span>);
首先后两者参数不合法.

所以答案是 [<span class="hljs-number">1</span>, NaN, NaN]

  如果研究理解了 
  <span class="hljs-built_in">parseInt</span>(<span class="hljs-number">3</span>, <span class="hljs-number">8</span>)
  <span class="hljs-built_in">parseInt</span>(<span class="hljs-number">3</span>, <span class="hljs-number">2</span>)    <span class="hljs-comment">//下方评论该题答案  别作弊哦！</span>
  <span class="hljs-built_in">parseInt</span>(<span class="hljs-number">3</span>, <span class="hljs-number">0</span>)
  
</code></pre>
<p><strong>第二题：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[ [3,2,1].reduce(Math.pow), [].reduce(Math.pow) ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code style="word-break: break-word; white-space: initial;">[ [<span class="hljs-number">3</span>,<span class="hljs-number">2</span>,<span class="hljs-number">1</span>].reduce(Math.pow), [].reduce(Math.pow) ]</code></pre>
<p>这道题知识点：</p>
<ul><li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce" rel="nofollow noreferrer" target="_blank">Array/Reduce</a></li></ul>
<p>穿插知识点来一次这道题！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr.reduce(callback[, initialValue])

reduce接受两个参数, 一个回调, 一个初始值.

回调函数接受四个参数 previousValue, currentValue, currentIndex, array

需要注意的是 If the array is empty and no initialValue was provided, TypeError would be thrown.

所以第二个表达式会报异常. 第一个表达式等价于 Math.pow(3, 2) => 9; Math.pow(9, 1) =>9
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code>arr.reduce(callback[, initialValue])

reduce接受两个参数, 一个回调, 一个初始值.

回调函数接受四个参数 previousValue, currentValue, currentIndex,<span class="hljs-built_in"> array
</span>
需要注意的是 If the<span class="hljs-built_in"> array </span>is empty<span class="hljs-built_in"> and </span>no initialValue was provided, TypeError would be thrown.

所以第二个表达式会报异常. 第一个表达式等价于 Math.pow(3, 2) =&gt; 9; Math.pow(9, 1) =&gt;9
</code></pre>
<p>答案 <code>an</code> <code>error</code></p>
<p><strong>第三题：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ary = [0,1,2];
ary[10] = 10;
ary.filter(function(x) { return x === undefined;});

答案是 []" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> ary = [<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>];
ary[<span class="hljs-number">10</span>] = <span class="hljs-number">10</span>;
ary.filter(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(x)</span> </span>{ <span class="hljs-keyword">return</span> x === <span class="hljs-literal">undefined</span>;});

答案是 []</code></pre>
<p>知识点是：</p>
<ul><li><a href="http://www.cnblogs.com/ziyunfei/archive/2012/09/16/2687165.html" rel="nofollow noreferrer" target="_blank">稀疏数组</a></li></ul>
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
<p>也就是说 从 3 - 9 都是没有初始化的<code>bug </code>!, 这些索引并不存在与数组中. 在 array 的函数调用的时候是会跳过这些坑的.</p>
<p><strong>第四题：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[typeof null, null instanceof Object]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;">[<span class="hljs-keyword">typeof</span> <span class="hljs-literal">null</span>, <span class="hljs-literal">null</span> <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>]</code></pre>
<p>知识点：</p>
<ol>
<li><a href="https://link.juejin.im/?target=https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof" rel="nofollow noreferrer" target="_blank">Operators/typeof</a></li>
<li><a href="https://link.juejin.im/?target=https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof" rel="nofollow noreferrer" target="_blank">Operators/instanceof</a></li>
</ol>
<p>typeof 返回一个表示类型的字符串.</p>
<p>instanceof 运算符用来检测 constructor.prototype 是否存在于参数 object 的原型链上.</p>
<p>这个题可以直接看链接... 因为 typeof null === 'object' 自语言之初就是这样....</p>
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
Object      &quot;object&quot;
" title="" data-original-title="复制"></span>
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
<span class="hljs-built_in">Object</span>      <span class="hljs-string">"object"</span>
</code></pre>
<p>所以答案 [object, false]</p>
<p><strong>第五题：</strong></p>
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
<p>知识点:</p>
<ul><li><a href="https://link.juejin.im/?target=https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments" rel="nofollow noreferrer" target="_blank">Functions/arguments</a></li></ul>
<p>首先 The arguments object is an Array-like object corresponding to the arguments passed to a function.</p>
<p>也就是说 arguments 是一个 object, c 就是 arguments[2], 所以对于 c 的修改就是对 arguments[2] 的修改.</p>
<p>所以答案是 21.</p>
<p>但是！！！！</p>
<p>当函数参数涉及到 any rest parameters, any default parameters or any destructured parameters 的时候, 这个 arguments 就不在是一个 mapped arguments object 了.....</p>
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
<p>答案是 12 !!!!</p>
<p>请慢慢体会！！</p>
<p><strong>第六题：</strong></p>
<p>咳咳咳！<br>细心的小伙伴发现了我第<code>6</code>题不是第<code>6</code>题而是第<code>六</code>题<br>其实这个是给你们留下一个思考的题  如果有疑问或者探讨请留言！</p>
<h2 id="articleHeader4">结语</h2>
<p>这是2017年的最后一篇文章了！我是今年2017年11月7号创建的这个账号,准确来说是12月初走进<strong>segmentfault社区</strong>大家庭的（才开始接触答题文章头条等等）,一个月的时间感觉这个社区和别的不一样的地方很多,玩的挺开心！玩社区从来没写过文章，来到这或许这个也是我个人的一大迈步把！希望大家和我一起走下去！ 进步！进步！</p>
<h2 id="articleHeader5">最后提前祝愿大家新的一年 2018 事业有成 钱包鼓鼓！ 最后相信新一年大家都能找到自己的女神当女朋友！</h2>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端经典面试题 不经典不要star！

## 原文链接
[https://segmentfault.com/a/1190000012640358](https://segmentfault.com/a/1190000012640358)

