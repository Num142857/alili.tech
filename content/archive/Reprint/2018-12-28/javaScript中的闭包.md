---
title: 'javaScript中的闭包' 
date: 2018-12-28 2:30:11
hidden: true
slug: fqznf3heyn5
categories: [reprint]
---

{{< raw >}}

                    
<p>文章同步到<a href="https://github.com/sunzhaoye/blog/issues/12" rel="nofollow noreferrer" target="_blank">github</a></p>
<p>js的闭包概念几乎是任何面试官都会问的问题,最近把闭包这块的概念梳理了一下,记录成以下文章。</p>
<h1 id="articleHeader0">什么是闭包</h1>
<p>我先列出一些官方及经典书籍等书中给出的概念,这些概念虽然表达的不一样,但是都在对闭包做了最正确的定义和翻译,也帮助大家更好的理解闭包,这阅读起来可能比较模糊,大家往后看,本文通过对多个经典书籍中的例子讲解,相信会让大家能很好的理解js中的闭包。文章开始,我会先铺垫一下闭包的概念和为什么要引入闭包的概念,然后结合例子来说明讲解,并讲解如何使用闭包。</p>
<h2 id="articleHeader1">百度百科中的定义:</h2>
<p><a href="https://baike.baidu.com/item/%E9%97%AD%E5%8C%85/10908873?fr=aladdin" rel="nofollow noreferrer" target="_blank">闭包</a>包含自由（未绑定到特定对象）变量；这些变量不是在这个代码块内或者任何全局上下文中定义的，而是在定义代码块的环境中定义（局部变量）。“闭包” 一词来源于以下两者的结合：要执行的代码块（由于自由变量被包含在代码块中，这些自由变量以及它们引用的对象没有被释放）和为自由变量提供绑定的计算环境（作用域) -- 百度百科</p>
<h2 id="articleHeader2">《javaScript权威指南》中的概念:</h2>
<p>函数对象可以通过作用域链互相关联起来,函数体内部的变量都可以保存在函数作用域内,这种特性在计算机科学中成为<strong>闭包</strong></p>
<h2 id="articleHeader3">《javaScript高级教程》中概念:</h2>
<p>闭包是指有权访问另一个函数作用域中的变量的函数。</p>
<h2 id="articleHeader4">MDN中的概念</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011612414?w=1412&amp;h=558" src="https://static.alili.tech/img/remote/1460000011612414?w=1412&amp;h=558" alt="MDN闭包" title="MDN闭包" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">个人总结的闭包概念:</h2>
<ol>
<li>闭包就是子函数可以有权访问父函数的变量、父函数的父函数的变量、一直到全局变量。归根结底,就是利用js得词法(静态)作用域,即作用域链在函数创建的时候就确定了。</li>
<li>子函数如果不被销毁,整条作用域链上的变量仍然保存在内存中。</li>
</ol>
<h1 id="articleHeader6">为什么引入闭包的概念</h1>
<p>我引入<a href="http://www.lai18.com/content/425670.html" rel="nofollow noreferrer" target="_blank">《深入理解JavaScript系列:闭包(Closures)》</a>文章中的例子来说明,也可以直接去看那篇文章,我结合其他书籍反复读了很多遍此文章才理解清楚。如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function testFn() {

  var localVar = 10;  // 自由变量

  function innerFn(innerParam) {
    alert(innerParam + localVar);
  }

  return innerFn;
}

var someFn = testFn();
someFn(20); // 30" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testFn</span><span class="hljs-params">()</span> </span>{

  <span class="hljs-keyword">var</span> localVar = <span class="hljs-number">10</span>;  <span class="hljs-comment">// 自由变量</span>

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">innerFn</span><span class="hljs-params">(innerParam)</span> </span>{
    alert(innerParam + localVar);
  }

  <span class="hljs-keyword">return</span> innerFn;
}

<span class="hljs-keyword">var</span> someFn = testFn();
someFn(<span class="hljs-number">20</span>); <span class="hljs-comment">// 30</span></code></pre>
<p><strong>一般来说,在函数执行完毕之后,局部变量对象即被销毁,所以innerFn是不可能以返回值形式返回的,innerFn函数作为局部变量应该被销毁才对。</strong></p>
<p>这是当函数以返回值时的问题,另外再看一个当函数以参数形式使用时的问题,还是直接引用《深入理解JavaScript系列》中的例子,也方便大家有兴趣可以直接去阅读那篇文章</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var z = 10;

function foo() {
  alert(z);
}

foo(); // 10 – 使用静态和动态作用域的时候

(function () {

  var z = 20;
  foo(); // 10 – 使用静态作用域, 20 – 使用动态作用域

})();

// 将foo作为参数的时候是一样的
(function (funArg) {

  var z = 30;
  funArg(); // 10 – 静态作用域, 30 – 动态作用域

})(foo);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> z = <span class="hljs-number">10</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">()</span> </span>{
  alert(z);
}

foo(); <span class="hljs-comment">// 10 – 使用静态和动态作用域的时候</span>

(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{

  <span class="hljs-keyword">var</span> z = <span class="hljs-number">20</span>;
  foo(); <span class="hljs-comment">// 10 – 使用静态作用域, 20 – 使用动态作用域</span>

})();

<span class="hljs-comment">// 将foo作为参数的时候是一样的</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(funArg)</span> </span>{

  <span class="hljs-keyword">var</span> z = <span class="hljs-number">30</span>;
  funArg(); <span class="hljs-comment">// 10 – 静态作用域, 30 – 动态作用域</span>

})(foo);</code></pre>
<p>当函数foo在不同的函数中调用,z该取哪个上下文中的值呢,这就又是一个问题,所以就引入了闭包的概念,也可以理解为定义了一种规则。</p>
<h1 id="articleHeader7">理解闭包</h1>
<h2 id="articleHeader8">函数以返回值返回</h2>
<p>看一个《javsScript权威指南》中的一个例子,我稍微做一下修改如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var scope = 'global scope';
function checkScope() {
    var scope = 'local scope';
    return function() {
        console.log(scope);
    }
}

var result = checkScope(); 
result();   // local scope checkScope变量对象中的scope,非全局变量scope" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> scope = <span class="hljs-string">'global scope'</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkScope</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> scope = <span class="hljs-string">'local scope'</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(scope);
    }
}

<span class="hljs-keyword">var</span> result = checkScope(); 
result();   <span class="hljs-comment">// local scope checkScope变量对象中的scope,非全局变量scope</span></code></pre>
<p><strong>分析:</strong></p>
<p>即使匿名函数是在checkScope函数外调用,也没有使用全局变量scope,即是利用了js的静态作用域,当匿名函数初始化时,就创建了自己的作用域链(作用域链的概念这里不做解释,可以参考我的另一篇文章<a href="https://segmentfault.com/a/1190000011082342">js中的执行栈、执行环境(上下文)、作用域、作用域链、活动对象、变量对象的概念总结</a>,其实当把作用域链理解好了之后,闭包也就理解了), 此匿名函数的作用域链包括checkScope的活动对象和全局变量对象, 当checkScope函数执行完毕后,checkScope的活动对象并不会被销毁,因为匿名函数的作用域链还在引用checkScope的活动对象,也就是checkScope的执行环境被销毁,但是其活动对象没有被销毁,留存在堆内存中,直到匿名函数销毁后,checkScope的活动对象才会销毁,解除对匿名函数的引用将其设置为null即可,垃圾回收将会将其清除,另外当外部对checkScope的自由变量存在引用的时候,其活动对象也不会被销毁</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="result = null; //解除对匿名函数的引用" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">result</span> = <span class="hljs-literal">null</span>;<span class="hljs-comment"> //解除对匿名函数的引用</span></code></pre>
<p><strong>注释: </strong></p>
<p>自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量</p>
<p><strong>补充: </strong><br>引用一下《javsScript权威指南》中的补充,帮助大家进一步理解<br><span class="img-wrap"><img data-src="/img/remote/1460000011612145?w=1192&amp;h=974" src="https://static.alili.tech/img/remote/1460000011612145?w=1192&amp;h=974" alt="闭包" title="闭包" style="cursor: pointer;"></span></p>
<h2 id="articleHeader9">函数以参数形式使用</h2>
<p>当函数以参数形式使用时一般用于利用闭包特性解决实际问题,比如浏览器中内置的方法等,下面我直接引用《深入理解JavaScript系列:闭包(Closures)》中关于闭包实战部分的例子如下:</p>
<h3 id="articleHeader10">sort</h3>
<p>在sort的内置方法中,函数以参数形式传入回调函数,在sort的实现中调用:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1, 2, 3].sort(function (a, b) {
  ... // 排序条件
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].sort(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(a, b)</span> </span>{
  ... <span class="hljs-comment">// 排序条件</span>
});</code></pre>
<h3 id="articleHeader11">map</h3>
<p>和sort的实现一样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1, 2, 3].map(function (element) {
  return element * 2;
}); // [2, 4, 6]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(element)</span> </span>{
  <span class="hljs-keyword">return</span> element * <span class="hljs-number">2</span>;
}); <span class="hljs-comment">// [2, 4, 6]</span></code></pre>
<h3 id="articleHeader12">另外利用自执行匿名函数创建的闭包</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = {};

// 初始化
(function (object) {

  var x = 10;

  object.getX = function() {
    return x;
  };

})(foo);

alert(foo.getX()); // 获得闭包 &quot;x&quot; – 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> foo = {};

<span class="hljs-comment">// 初始化</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(object)</span> </span>{

  <span class="hljs-keyword">var</span> x = <span class="hljs-number">10</span>;

  object.getX = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">return</span> x;
  };

})(foo);

alert(foo.getX()); <span class="hljs-comment">// 获得闭包 "x" – 10</span></code></pre>
<h1 id="articleHeader13">利用闭包实现私有属性的存取</h1>
<p>先来看一个例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fnBox = [];
function foo() {
    for(var i = 0; i < 3; i++) {
        fnBox[i] = function() {
            return i;
        }
    }
}

foo();
var fn0 = fnBox[0];
var fn1 = fnBox[1];
var fn2 = fnBox[2];
console.log(fn0()); //  3
console.log(fn1()); //  3
console.log(fn2()); //  3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> fnBox = [];
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">3</span>; i++) {
        fnBox[i] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> i;
        }
    }
}

foo();
<span class="hljs-keyword">var</span> fn0 = fnBox[<span class="hljs-number">0</span>];
<span class="hljs-keyword">var</span> fn1 = fnBox[<span class="hljs-number">1</span>];
<span class="hljs-keyword">var</span> fn2 = fnBox[<span class="hljs-number">2</span>];
<span class="hljs-built_in">console</span>.log(fn0()); <span class="hljs-comment">//  3</span>
<span class="hljs-built_in">console</span>.log(fn1()); <span class="hljs-comment">//  3</span>
<span class="hljs-built_in">console</span>.log(fn2()); <span class="hljs-comment">//  3</span></code></pre>
<p>用伪代码来说明如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fn0.[[scope]]= {
    // 其他变量对象,一直到全局变量对象
    父级上下文中的活动对象AO: [data: [...], i: 3]
}

fn1.[[scope]]= {
    // 其他变量对象,一直到全局变量对象
    父级上下文中的活动对象AO: [data: [...], i: 3]
}

fn2.[[scope]]= {
    // 其他变量对象,一直到全局变量对象
    父级上下文中的活动对象AO: [data: [...], i: 3],
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code>fn0.<span class="hljs-string">[[scope]]</span>= {
    // 其他变量对象,一直到全局变量对象
    父级上下文中的活动对象AO: [data: [...], i: <span class="hljs-number">3</span>]
}

fn1.<span class="hljs-string">[[scope]]</span>= {
    // 其他变量对象,一直到全局变量对象
    父级上下文中的活动对象AO: [data: [...], i: <span class="hljs-number">3</span>]
}

fn2.<span class="hljs-string">[[scope]]</span>= {
    // 其他变量对象,一直到全局变量对象
    父级上下文中的活动对象AO: [data: [...], i: <span class="hljs-number">3</span>],
}</code></pre>
<p><strong>分析:</strong></p>
<p>这是因为fn0、fn1、fn2的作用域链共享foo的活动对象, 而且js没有块级作用域,当函数foo执行完毕的时候foo的活动对象中i的值已经变为3,当fn0、fn1、fn2执行的时候,其最顶层的作用域没有i变量,就沿着作用域链查找foo的活动对象中的i,所以i都为3。</p>
<p>但是这种结果往往不是我们想要的,这时就可以利用认为创建一个闭包来解决这个问题,如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fnBox = [];
function foo() {
    for(var i = 0; i < 3; i++) {
        fnBox[i] = (function(num) {
            return function() {
                return num;
            }
        })(i);
    }
}
foo();
var fn0 = fnBox[0];
var fn1 = fnBox[1];
var fn2 = fnBox[2];
console.log(fn0()); //  0
console.log(fn1()); //  1
console.log(fn2()); //  2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> fnBox = [];
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">3</span>; i++) {
        fnBox[i] = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">num</span>) </span>{
            <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">return</span> num;
            }
        })(i);
    }
}
foo();
<span class="hljs-keyword">var</span> fn0 = fnBox[<span class="hljs-number">0</span>];
<span class="hljs-keyword">var</span> fn1 = fnBox[<span class="hljs-number">1</span>];
<span class="hljs-keyword">var</span> fn2 = fnBox[<span class="hljs-number">2</span>];
<span class="hljs-built_in">console</span>.log(fn0()); <span class="hljs-comment">//  0</span>
<span class="hljs-built_in">console</span>.log(fn1()); <span class="hljs-comment">//  1</span>
<span class="hljs-built_in">console</span>.log(fn2()); <span class="hljs-comment">//  2</span></code></pre>
<p>用伪代码来说明如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fn0.[[scope]]= {
    // 其他变量对象,一直到全局变量对象
    父级上下文中的活动对象AO: [data: [...], i: 3],
    fn0本身的活动对象AO: {num: 0} 
}

fn1.[[scope]]= {
    // 其他变量对象,一直到全局变量对象
    父级上下文中的活动对象AO: [data: [...], i: 3],
    fn1本身的活动对象AO: {num: 1} 
}

fn2.[[scope]]= {
    // 其他变量对象,一直到全局变量对象
    父级上下文中的活动对象AO: [data: [...], i: 3],
    fn2本身的活动对象AO: {num: 2} 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>fn0.[[scope]]= {
    <span class="hljs-comment">// 其他变量对象,一直到全局变量对象</span>
    父级上下文中的活动对象<span class="hljs-string">AO:</span> [<span class="hljs-string">data:</span> [...], <span class="hljs-string">i:</span> <span class="hljs-number">3</span>],
    fn0本身的活动对象<span class="hljs-string">AO:</span> {<span class="hljs-string">num:</span> <span class="hljs-number">0</span>} 
}

fn1.[[scope]]= {
    <span class="hljs-comment">// 其他变量对象,一直到全局变量对象</span>
    父级上下文中的活动对象<span class="hljs-string">AO:</span> [<span class="hljs-string">data:</span> [...], <span class="hljs-string">i:</span> <span class="hljs-number">3</span>],
    fn1本身的活动对象<span class="hljs-string">AO:</span> {<span class="hljs-string">num:</span> <span class="hljs-number">1</span>} 
}

fn2.[[scope]]= {
    <span class="hljs-comment">// 其他变量对象,一直到全局变量对象</span>
    父级上下文中的活动对象<span class="hljs-string">AO:</span> [<span class="hljs-string">data:</span> [...], <span class="hljs-string">i:</span> <span class="hljs-number">3</span>],
    fn2本身的活动对象<span class="hljs-string">AO:</span> {<span class="hljs-string">num:</span> <span class="hljs-number">2</span>} 
}</code></pre>
<p><strong>分析:</strong></p>
<p>当使用自执行匿名函数创建闭包, 传入i的值赋值给num,由于作用域链是在函数初始化时创建的,所以当每次循环时,函数fn10、fn1、fn2的作用域链中保存了当次循环是num的值, 当fn10、fn1、fn2调用时,是按照本身的作用域链进行查找。</p>
<h1 id="articleHeader14">闭包引起的内存泄漏</h1>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011612146?w=1336&amp;h=284" src="https://static.alili.tech/img/remote/1460000011612146?w=1336&amp;h=284" alt="闭包内存泄漏" title="闭包内存泄漏" style="cursor: pointer;"></span></p>
<h1 id="articleHeader15">总结</h1>
<p>从理论的角度将,由于js作用域链的特性,js中所有函数都是闭包,但是从应用的角度来说,只有当函数以返回值返回、或者当函数以参数形式使用、或者当函数中自由变量在函数外被引用时,才能成为明确意义上的闭包。</p>
<p>最后,我想表达的式,本篇大量引用和罗列了经典的犀牛书《javaScript权威指南》、红宝书《javaScript高级教程》、以及《深入理解JavaScript系列:闭包(Closures)》系列文章中的概念和例子,不为能形成自己的独特见解,只为了能把闭包清晰的讲解出来。笔者是个小菜鸟,能力实在有限,也在学习中,希望大家多多指点,如发现错误,请多多指正。也希望看过此文的朋友能对闭包多一些理解,那我写这篇文章也就值得了。下次面试时就可以告诉面试官什么是闭包了。谢谢。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javaScript中的闭包

## 原文链接
[https://segmentfault.com/a/1190000011612140](https://segmentfault.com/a/1190000011612140)

