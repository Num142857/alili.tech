---
title: 'JavaScript-总结常用代码书写规范' 
date: 2019-02-04 2:30:58
hidden: true
slug: 8fecd83u42n
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">javascript 代码规范</h1>
<p>代码规范我们应该遵循古老的原则：“能做并不意味着应该做”。</p>
<h2 id="articleHeader1">全局命名空间污染</h2>
<p>总是将代码包裹在一个立即的函数表达式里面，形成一个独立的模块。</p>
<p><strong>不推荐</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = 10,
    y = 100;
console.log(window.x + ' ' + window.y);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java">var x = <span class="hljs-number">10</span>,
    y = <span class="hljs-number">100</span>;
console.log(window.x + <span class="hljs-string">' '</span> + window.y);</code></pre>
<p><strong>推荐</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=";(function(window){
    'use strict';
    var x = 10,
        y = 100;
    console.log(window.x + ' ' + window.y);
}(window));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">;(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">window</span>)</span>{
<span class="hljs-meta">    'use strict'</span>;
    <span class="hljs-keyword">var</span> x = <span class="hljs-number">10</span>,
        y = <span class="hljs-number">100</span>;
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">window</span>.x + <span class="hljs-string">' '</span> + <span class="hljs-built_in">window</span>.y);
}(<span class="hljs-built_in">window</span>));</code></pre>
<h2 id="articleHeader2">立即执行函数</h2>
<p>在<code>立即执行函数</code>里面，如果有用到全局变量应该通过变量传递的方式，让<code>立即执行函数</code>的函数体在调用时，能以局部变量的形式调用，在一定程度上提升程序性能。<br>并且应该在<code>立即执行函数</code>的形参里加上undefined，在最后一个位置，这是因为ES3里undefined是可以读写的，如果在全局位置更改undefined的值，你的代码可能得不到逾期的结果。<br>另外推荐在<code>立即执行函数</code>开始跟结尾都添加上分号，避免在合并时因为别人的代码不规范而影响到我们自己的代码<br><strong>不推荐</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(){
    'use strict';
    var x = 10,
        y = 100,
        c,
        elem=$('body');
    console.log(window.x + ' ' + window.y);
    $(document).on('click',function(){

    });
    if(typeof c==='undefined'){
        //你的代码
    }
}());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-meta">    'use strict'</span>;
    <span class="hljs-keyword">var</span> x = <span class="hljs-number">10</span>,
        y = <span class="hljs-number">100</span>,
        c,
        elem=$(<span class="hljs-string">'body'</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">window</span>.x + <span class="hljs-string">' '</span> + <span class="hljs-built_in">window</span>.y);
    $(<span class="hljs-built_in">document</span>).on(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{

    });
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> c===<span class="hljs-string">'undefined'</span>){
        <span class="hljs-comment">//你的代码</span>
    }
}());</code></pre>
<p><strong>推荐</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=";(function($,window,document,undefined){
    'use strict';
    var x = 10,
        y = 100,
        c,
        elem=$('body');
    console.log(window.x + ' ' + window.y);
    $(document).on('click',function(){

    });
    if(typeof c==='undefined'){
        //你的代码
    }
}(jQuery,window,document));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">;(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$,window,document,undefined</span>)</span>{
<span class="hljs-meta">    'use strict'</span>;
    <span class="hljs-keyword">var</span> x = <span class="hljs-number">10</span>,
        y = <span class="hljs-number">100</span>,
        c,
        elem=$(<span class="hljs-string">'body'</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">window</span>.x + <span class="hljs-string">' '</span> + <span class="hljs-built_in">window</span>.y);
    $(<span class="hljs-built_in">document</span>).on(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{

    });
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> c===<span class="hljs-string">'undefined'</span>){
        <span class="hljs-comment">//你的代码</span>
    }
}(jQuery,<span class="hljs-built_in">window</span>,<span class="hljs-built_in">document</span>));</code></pre>
<h2 id="articleHeader3">严格模式</h2>
<p>ECMAScript 5 严格模式可在整个脚本或独个方法内被激活。它对应不同的 javascript 语境会做更加严格的错误检查。严格模式也确保了 javascript 代码更加的健壮，运行的也更加快速。</p>
<p>严格模式会阻止使用在未来很可能被引入的预留关键字。</p>
<p>你应该在你的脚本中启用严格模式，最好是在独立的 立即执行函数 中应用它。避免在你的脚本第一行使用它而导致你的所有脚本都启动了严格模式，这有可能会引发一些第三方类库的问题。<br><strong>不推荐</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict';
(function(){

}());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">'use strict'</span>;
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{

}());</code></pre>
<p><strong>推荐</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
(function(){
    'use strict';
}());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-meta">    'use strict'</span>;
}());</code></pre>
<h2 id="articleHeader4">变量声明</h2>
<p>对所有的变量声明，我们都应该指定var，如果没有指定var，在严格模式下会报错，并且同一个作用域内的变量应该尽量采用一个var去声明，多个变量用“,”隔开。<br><strong>不推荐</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function myFun(){
    x=5;
    y=10;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myFun</span>(<span class="hljs-params"></span>)</span>{
    x=<span class="hljs-number">5</span>;
    y=<span class="hljs-number">10</span>;
}</code></pre>
<p><strong>不完全推荐</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function myFun(){
    var x=5;
    var y=10;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myFun</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> x=<span class="hljs-number">5</span>;
    <span class="hljs-keyword">var</span> y=<span class="hljs-number">10</span>;
}</code></pre>
<p><strong>推荐</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function myFun(){
    var x=5,
        y=10;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myFun</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> x=<span class="hljs-number">5</span>,
        y=<span class="hljs-number">10</span>;
}</code></pre>
<h2 id="articleHeader5">使用带类型判断的比较判断</h2>
<p>总是使用 === 精确的比较操作符，避免在判断的过程中，由 JavaScript 的强制类型转换所造成的困扰。</p>
<p>如果你使用 === 操作符，那比较的双方必须是同一类型为前提的条件下才会有效。<br><strong>不推荐</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(w){
  'use strict';

  w.console.log('0' == 0); // true
  w.console.log('' == false); // true
  w.console.log('1' == true); // true
  w.console.log(null == undefined); // true

  var x = {
    valueOf: function() {
      return 'X';
    }
  };

  w.console.log(x == 'X');//true

}(window.console.log));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">w</span>)</span>{
<span class="hljs-meta">  'use strict'</span>;

  w.console.log(<span class="hljs-string">'0'</span> == <span class="hljs-number">0</span>); <span class="hljs-comment">// true</span>
  w.console.log(<span class="hljs-string">''</span> == <span class="hljs-literal">false</span>); <span class="hljs-comment">// true</span>
  w.console.log(<span class="hljs-string">'1'</span> == <span class="hljs-literal">true</span>); <span class="hljs-comment">// true</span>
  w.console.log(<span class="hljs-literal">null</span> == <span class="hljs-literal">undefined</span>); <span class="hljs-comment">// true</span>

  <span class="hljs-keyword">var</span> x = {
    <span class="hljs-attr">valueOf</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-string">'X'</span>;
    }
  };

  w.console.log(x == <span class="hljs-string">'X'</span>);<span class="hljs-comment">//true</span>

}(<span class="hljs-built_in">window</span>.console.log));</code></pre>
<p><strong>推荐</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(w){
  'use strict';

  w.console.log('0' === 0); // false
  w.console.log('' === false); // false
  w.console.log('1' === true); // false
  w.console.log(null === undefined); // false

  var x = {
    valueOf: function() {
      return 'X';
    }
  };

  w.console.log(x === 'X');//false

}(window));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">w</span>)</span>{
<span class="hljs-meta">  'use strict'</span>;

  w.console.log(<span class="hljs-string">'0'</span> === <span class="hljs-number">0</span>); <span class="hljs-comment">// false</span>
  w.console.log(<span class="hljs-string">''</span> === <span class="hljs-literal">false</span>); <span class="hljs-comment">// false</span>
  w.console.log(<span class="hljs-string">'1'</span> === <span class="hljs-literal">true</span>); <span class="hljs-comment">// false</span>
  w.console.log(<span class="hljs-literal">null</span> === <span class="hljs-literal">undefined</span>); <span class="hljs-comment">// false</span>

  <span class="hljs-keyword">var</span> x = {
    <span class="hljs-attr">valueOf</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-string">'X'</span>;
    }
  };

  w.console.log(x === <span class="hljs-string">'X'</span>);<span class="hljs-comment">//false</span>

}(<span class="hljs-built_in">window</span>));</code></pre>
<h2 id="articleHeader6">变量赋值时的逻辑操作</h2>
<p>逻辑操作符 || 和 &amp;&amp; 也可被用来返回布尔值。如果操作对象为非布尔对象，那每个表达式将会被自左向右地做真假判断。基于此操作，最终总有一个表达式被返回回来。这在变量赋值时，是可以用来简化你的代码的。<br><strong>不推荐</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(!x) {
  if(!y) {
    x = 1;
  } else {
    x = y;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span>(!x) {
  <span class="hljs-keyword">if</span>(!y) {
    x = <span class="hljs-number">1</span>;
  } <span class="hljs-keyword">else</span> {
    x = y;
  }
}</code></pre>
<p><strong>推荐</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="x = x || y || 1;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">x = x || y || <span class="hljs-number">1</span>;</code></pre>
<h2 id="articleHeader7">分号</h2>
<p>总是使用分号，因为隐式的代码嵌套会引发难以察觉的问题。当然我们更要从根本上来杜绝这些问题[1] 。以下几个示例展示了缺少分号的危害：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 1.
MyClass.prototype.myMethod = function() {
  return 42;
}  //这里没有分号

(function() {

})();

 //2.
var x = {
  'i': 1,
  'j': 2
}  // 这里没有分号
//我知道这样的代码你可能永远不会写，但是还是举一个例子
[ffVersion, ieVersion][isIE]();

 // 3.
var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // 这里没有分号

-1 == resultOfOperation() || die();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 1.</span>
MyClass.prototype.myMethod = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-number">42</span>;
}  <span class="hljs-comment">//这里没有分号</span>

(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{

})();

 <span class="hljs-comment">//2.</span>
<span class="hljs-keyword">var</span> x = {
  <span class="hljs-string">'i'</span>: <span class="hljs-number">1</span>,
  <span class="hljs-string">'j'</span>: <span class="hljs-number">2</span>
}  <span class="hljs-comment">// 这里没有分号</span>
<span class="hljs-comment">//我知道这样的代码你可能永远不会写，但是还是举一个例子</span>
[ffVersion, ieVersion][isIE]();

 <span class="hljs-comment">// 3.</span>
<span class="hljs-keyword">var</span> THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  <span class="hljs-comment">// 这里没有分号</span>

<span class="hljs-number">-1</span> == resultOfOperation() || die();</code></pre>
<p><strong>错误结果</strong></p>
<ol>
<li><p>JavaScript 错误 —— 首先返回 42 的那个 function 被第二个function 当中参数传入调用，接着数字 42 也被“调用”而导致出错。</p></li>
<li><p>八成你会得到 ‘no such property in undefined’ 的错误提示，因为在真实环境中的调用是这个样子：xffVersion, ieVersion().</p></li>
<li><p>die 总是被调用。因为数组减 1 的结果是 NaN，它不等于任何东西（无论 resultOfOperation 是否返回 NaN）。所以最终的结果是 die() 执行完所获得值将赋给 THINGS_TO_EAT.</p></li>
</ol>
<h2 id="articleHeader8">语句块内的函数声明</h2>
<p>切勿在语句块内声明函数，在 ECMAScript 5 的严格模式下，这是不合法的。函数声明应该在作用域的顶层。但在语句块内可将函数申明转化为函数表达式赋值给变量。<br><strong>不推荐</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (x) {
  function foo() {}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (x) {
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{}
}</code></pre>
<p><strong>推荐</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (x) {
  var foo = function() {};
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (x) {
  <span class="hljs-keyword">var</span> foo = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{};
}</code></pre>
<h2 id="articleHeader9">不要使用eval函数</h2>
<p>eval() 不但混淆语境还很危险，总会有比这更好、更清晰、更安全的另一种方案来写你的代码，因此尽量不要使用 eval 函数。</p>
<h2 id="articleHeader10">数组和对象字面量</h2>
<h3 id="articleHeader11">1.用数组和对象字面量来代替数组和对象构造器。数组构造器很容易让人在它的参数上犯错。</h3>
<p><strong>不推荐</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//数组长度3
var a1 = new Array(x1, x2, x3);
//数组长度2
var a2 = new Array(x1, x2);

//如果x1是一个自然数，那么它的长度将为x1
//如果x1不是一个自然数，那么它的长度将为1
var a3 = new Array(x1);

var a4 = new Array();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//数组长度3</span>
<span class="hljs-keyword">var</span> a1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(x1, x2, x3);
<span class="hljs-comment">//数组长度2</span>
<span class="hljs-keyword">var</span> a2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(x1, x2);

<span class="hljs-comment">//如果x1是一个自然数，那么它的长度将为x1</span>
<span class="hljs-comment">//如果x1不是一个自然数，那么它的长度将为1</span>
<span class="hljs-keyword">var</span> a3 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(x1);

<span class="hljs-keyword">var</span> a4 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>();</code></pre>
<p>正因如此，如果将代码传参从两个变为一个，那数组很有可能发生意料不到的长度变化。为避免此类怪异状况，请总是采用可读的数组字面量。<br><strong>推荐</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [x1, x2, x3];
var a2 = [x1, x2];
var a3 = [x1];
var a4 = [];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> a = [x1, x2, x3];
<span class="hljs-keyword">var</span> a2 = [x1, x2];
<span class="hljs-keyword">var</span> a3 = [x1];
<span class="hljs-keyword">var</span> a4 = [];</code></pre>
<h3 id="articleHeader12">2.对象构造器不会有类似的问题，但是为了可读性和统一性，我们应该使用对象字面量。</h3>
<p><strong>不推荐</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var o = new Object();

var o2 = new Object();
o2.a = 0;
o2.b = 1;
o2.c = 2;
o2['strange key'] = 3;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> o = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();

<span class="hljs-keyword">var</span> o2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
o2.a = <span class="hljs-number">0</span>;
o2.b = <span class="hljs-number">1</span>;
o2.c = <span class="hljs-number">2</span>;
o2[<span class="hljs-string">'strange key'</span>] = <span class="hljs-number">3</span>;</code></pre>
<p><strong>推荐</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var o = {};
var o2 = {
  a: 0,
  b: 1,
  c: 2,
  'strange key': 3
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> o = {};
<span class="hljs-keyword">var</span> o2 = {
  <span class="hljs-attr">a</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attr">b</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attr">c</span>: <span class="hljs-number">2</span>,
  <span class="hljs-string">'strange key'</span>: <span class="hljs-number">3</span>
};</code></pre>
<h2 id="articleHeader13">三元条件判断（if 的快捷方法）</h2>
<p>用三元操作符分配或返回语句。在比较简单的情况下使用，避免在复杂的情况下使用。没人愿意用 10 行三元操作符把自己的脑子绕晕。<br><strong>不推荐</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(x === 10) {
  return 'valid';
} else {
  return 'invalid';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span>(x === <span class="hljs-number">10</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-string">'valid'</span>;
} <span class="hljs-keyword">else</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-string">'invalid'</span>;
}</code></pre>
<p><strong>推荐</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return x === 10 ? 'valid' : 'invalid';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">return</span> x === <span class="hljs-number">10</span> ? <span class="hljs-string">'valid'</span> : <span class="hljs-string">'invalid'</span>;</code></pre>
<h2 id="articleHeader14">for循环</h2>
<p>使用for循环过程中，数组的长度，使用一个变量来接收，这样有利于代码执行效率得到提高，而不是每走一次循环，都得重新计算数组长度<br><strong>不推荐</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var i=0;i<arr.length,i++){

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;arr.length,i++){

}</code></pre>
<p><strong>推荐</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var i=0,len=arr.length;i<len,i++){

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>,len=arr.length;i&lt;len,i++){

}</code></pre>
<h2 id="articleHeader15">重复的dom操作</h2>
<p>重复的dom操作，使用一个变量来进行接收很有必要，而不是频繁的去操作dom树，这对性能与代码的整洁及易维护性带来不好的影响<br><strong>不推荐</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('.myDiv').find('.span1').text('1');
$('.myDiv').find('.span2').text('2');
$('.myDiv').find('.span3').text('3');
$('.myDiv').find('.span4').text('4');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$(<span class="hljs-string">'.myDiv'</span>).find(<span class="hljs-string">'.span1'</span>).text(<span class="hljs-string">'1'</span>);
$(<span class="hljs-string">'.myDiv'</span>).find(<span class="hljs-string">'.span2'</span>).text(<span class="hljs-string">'2'</span>);
$(<span class="hljs-string">'.myDiv'</span>).find(<span class="hljs-string">'.span3'</span>).text(<span class="hljs-string">'3'</span>);
$(<span class="hljs-string">'.myDiv'</span>).find(<span class="hljs-string">'.span4'</span>).text(<span class="hljs-string">'4'</span>);</code></pre>
<p><strong>推荐</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mydiv=$('.myDiv');
mydiv.find('.span1').text('1');
mydiv.find('.span2').text('2');
mydiv.find('.span3').text('3');
mydiv.find('.span4').text('4');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> mydiv=$(<span class="hljs-string">'.myDiv'</span>);
mydiv.find(<span class="hljs-string">'.span1'</span>).text(<span class="hljs-string">'1'</span>);
mydiv.find(<span class="hljs-string">'.span2'</span>).text(<span class="hljs-string">'2'</span>);
mydiv.find(<span class="hljs-string">'.span3'</span>).text(<span class="hljs-string">'3'</span>);
mydiv.find(<span class="hljs-string">'.span4'</span>).text(<span class="hljs-string">'4'</span>);</code></pre>
<p>在jquery .end()可使用的情况下应该优先使用.end()<br><strong>推荐</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('.myDiv').find('.span1').text('1')
           .end().find('.span2').text('2');
           .end().find('.span3').text('3');
           .end().find('.span4').text('4');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$(<span class="hljs-string">'.myDiv'</span>).find(<span class="hljs-string">'.span1'</span>).text(<span class="hljs-string">'1'</span>)
           .end().find(<span class="hljs-string">'.span2'</span>).text(<span class="hljs-string">'2'</span>);
           .end().find(<span class="hljs-string">'.span3'</span>).text(<span class="hljs-string">'3'</span>);
           .end().find(<span class="hljs-string">'.span4'</span>).text(<span class="hljs-string">'4'</span>);</code></pre>
<h2 id="articleHeader16">注释规范</h2>
<p>在描写注释时，推荐格式化且统一的注释风格，在写注释时尽量描述写代码时的思路，而不是代码做了什么。<br><strong>不推荐</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//获取订单
function getOrderByID(id){
    var order;
    //...
    return order;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//获取订单</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getOrderByID</span>(<span class="hljs-params">id</span>)</span>{
    <span class="hljs-keyword">var</span> order;
    <span class="hljs-comment">//...</span>
    <span class="hljs-keyword">return</span> order;
}</code></pre>
<p>方法的注释应该统一用块级注释<br><strong>推荐</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 根据订单id获取订单详细数据
 * @param  {[number]} id [订单ID]
 * @return {[order]}    [订单详细信息]
 */
function getOrderByID(id){
    var order;
    //...
    return order;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 根据订单id获取订单详细数据
 * @param  {[number]} id [订单ID]
 * @return {[order]}    [订单详细信息]
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getOrderByID</span>(<span class="hljs-params">id</span>)</span>{
    <span class="hljs-keyword">var</span> order;
    <span class="hljs-comment">//...</span>
    <span class="hljs-keyword">return</span> order;
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript-总结常用代码书写规范

## 原文链接
[https://segmentfault.com/a/1190000006835021](https://segmentfault.com/a/1190000006835021)

