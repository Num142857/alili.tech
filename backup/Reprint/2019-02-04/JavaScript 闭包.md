---
title: 'JavaScript 闭包' 
date: 2019-02-04 2:30:58
hidden: true
slug: 164bbhwjcgs
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">JavaScript 闭包</h1>
<blockquote><p><a href="http://blog.percymong.com/2016/09/11/javascript-closure/" rel="nofollow noreferrer" target="_blank">原文链接</a></p></blockquote>
<h3 id="articleHeader1">什么是闭包（Closure）</h3>
<blockquote>
<p><strong>简单讲，<a href="https://developer.mozilla.org/cn/docs/Web/JavaScript/Closures" rel="nofollow noreferrer" target="_blank">闭包</a>就是指有权访问另一个函数作用域中的变量的函数。</strong></p>
<p><strong>MDN 上面这么说</strong>：<strong>闭包是一种特殊的对象</strong>。它由两部分构成：函数，以及创建该函数的环境。环境由闭包创建时在作用域中的任何局部变量组成。</p>
</blockquote>
<p>但是，网上找了好多资料，它们对闭包的定义也各有各样，搞得我也不知道怎么去定义闭包了，所以干脆不去定义了，意会吧。</p>
<blockquote><p>道可道，非常道；名可名，非常名。</p></blockquote>
<h3 id="articleHeader2">产生一个闭包</h3>
<p><strong>创建闭包最常见方式，就是在一个函数内部创建另一个函数。</strong>下面例子中的 closure 就是一个闭包：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function func(){
  var a = 1,b = 2;
  
  function closure(){
    return a+b;
  }
  return closure;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>,b = <span class="hljs-number">2</span>;
  
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">closure</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> a+b;
  }
  <span class="hljs-keyword">return</span> closure;
}</code></pre>
<p><strong>闭包的作用域链包含着它自己的作用域，以及包含它的函数的作用域和全局作用域。</strong></p>
<h3 id="articleHeader3">闭包的注意事项</h3>
<ul><li><p><strong>通常，函数的作用域及其所有变量都会在函数执行结束后被销毁。但是，在创建了一个闭包以后，这个函数的作用域就会一直保存到闭包不存在为止。</strong></p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12

// 释放对闭包的引用
add5 = null;
add10 = null;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeAdder</span>(<span class="hljs-params">x</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">y</span>) </span>{
    <span class="hljs-keyword">return</span> x + y;
  };
}

<span class="hljs-keyword">var</span> add5 = makeAdder(<span class="hljs-number">5</span>);
<span class="hljs-keyword">var</span> add10 = makeAdder(<span class="hljs-number">10</span>);

<span class="hljs-built_in">console</span>.log(add5(<span class="hljs-number">2</span>));  <span class="hljs-comment">// 7</span>
<span class="hljs-built_in">console</span>.log(add10(<span class="hljs-number">2</span>)); <span class="hljs-comment">// 12</span>

<span class="hljs-comment">// 释放对闭包的引用</span>
add5 = <span class="hljs-literal">null</span>;
add10 = <span class="hljs-literal">null</span>;</code></pre>
<p>add5 和 add10 都是闭包。它们共享相同的函数定义，但是保存了不同的环境。在 add5 的环境中，x 为 5。而在 add10 中，x 则为 10。最后通过 null 释放了 add5 和 add10 对闭包的引用。</p>
<blockquote><p><strong>在javascript中，如果一个对象不再被引用，那么这个对象就会被垃圾回收机制回收；</strong> <br><strong>如果两个对象互相引用，而不再被第3者所引用，那么这两个互相引用的对象也会被回收。</strong></p></blockquote>
<ul><li><p><strong>闭包只能取得包含函数中任何变量的最后一个值，这是因为闭包所保存的是整个变量对象，而不是某个特殊的变量。</strong></p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function test(){
  var arr = [];
  for(var i = 0;i < 10;i++){
    arr[i] = function(){
      return i;
    };
  }
  for(var a = 0;a < 10;a++){
    console.log(arr[a]());
  }
}
test(); // 连续打印 10 个 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span> arr = [];
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;i &lt; <span class="hljs-number">10</span>;i++){
    arr[i] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">return</span> i;
    };
  }
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> a = <span class="hljs-number">0</span>;a &lt; <span class="hljs-number">10</span>;a++){
    <span class="hljs-built_in">console</span>.log(arr[a]());
  }
}
test(); <span class="hljs-comment">// 连续打印 10 个 10</span></code></pre>
<p>对于上面的情况，如果我们改变代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function test(){
  var arr = [];
  for(let i = 0;i < 10;i++){  // 仅在这里作出了改动
    arr[i] = function(){
      return i;
    };
  }
  for(var a = 0;a < 10;a++){
    console.log(arr[a]());
  }
}
test(); // 打印 0 到 9" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span> arr = [];
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>;i &lt; <span class="hljs-number">10</span>;i++){  <span class="hljs-comment">// 仅在这里作出了改动</span>
    arr[i] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">return</span> i;
    };
  }
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> a = <span class="hljs-number">0</span>;a &lt; <span class="hljs-number">10</span>;a++){
    <span class="hljs-built_in">console</span>.log(arr[a]());
  }
}
test(); <span class="hljs-comment">// 打印 0 到 9</span></code></pre>
<p>对于上面两种代码的解释，请看我在 segmentfault 上面的提问：<a href="https://segmentfault.com/q/1010000006873055"><strong>链接</strong></a></p>
<ul><li><p>闭包中的 this 对象</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = &quot;The Window&quot;;

var obj = {
  name: &quot;My Object&quot;,
  
  getName: function(){
    return function(){
      return this.name;
    };
  }
};

console.log(obj.getName()());  // The Window" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> name = <span class="hljs-string">"The Window"</span>;

<span class="hljs-keyword">var</span> obj = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">"My Object"</span>,
  
  <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
    };
  }
};

<span class="hljs-built_in">console</span>.log(obj.getName()());  <span class="hljs-comment">// The Window</span></code></pre>
<p>obj.getName()()实际上是在全局作用域中调用了匿名函数，this指向了window。这里要理解<strong>函数名与函数功能（或者称函数值）是分割开的</strong>，不要认为函数在哪里，其内部的this就指向哪里。<strong>匿名函数的执行环境具有全局性，因此其 this 对象通常指向 window。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = &quot;The Window&quot;;

var obj = {
  name: &quot;My Object&quot;,
  
  getName: function(){
    var that = this;
    return function(){
      return that.name;
    };
  }
};

console.log(obj.getName()());  // My Object" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> name = <span class="hljs-string">"The Window"</span>;

<span class="hljs-keyword">var</span> obj = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">"My Object"</span>,
  
  <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">return</span> that.name;
    };
  }
};

<span class="hljs-built_in">console</span>.log(obj.getName()());  <span class="hljs-comment">// My Object</span></code></pre>
<h3 id="articleHeader4">闭包的应用</h3>
<ul><li><p>应用闭包的主要场合是：设计私有的方法和变量。</p></li></ul>
<p>任何在函数中定义的变量，都可以认为是私有变量，因为不能在函数外部访问这些变量。私有变量包括函数的参数、局部变量和函数内定义的其他函数。</p>
<p>把有权访问私有变量的公有方法称为<strong>特权方法（privileged method）</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Animal(){
  
  // 私有变量
  var series = &quot;哺乳动物&quot;;
  function run(){
    console.log(&quot;Run!!!&quot;);
  }
  
  // 特权方法
  this.getSeries = function(){
    return series;
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span>(<span class="hljs-params"></span>)</span>{
  
  <span class="hljs-comment">// 私有变量</span>
  <span class="hljs-keyword">var</span> series = <span class="hljs-string">"哺乳动物"</span>;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">run</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Run!!!"</span>);
  }
  
  <span class="hljs-comment">// 特权方法</span>
  <span class="hljs-keyword">this</span>.getSeries = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> series;
  };
}</code></pre>
<blockquote>
<p><strong>模块模式（The Module Pattern）</strong>：为单例创建私有变量和方法。</p>
<p><strong>单例（singleton）</strong>：指的是只有一个实例的对象。JavaScript 一般以对象字面量的方式来创建一个单例对象。</p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var singleton = {
  name: &quot;percy&quot;,
  speak:function(){
    console.log(&quot;speaking!!!&quot;);
  },
  getName: function(){
    return this.name;
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> singleton = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">"percy"</span>,
  <span class="hljs-attr">speak</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"speaking!!!"</span>);
  },
  <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
  }
};</code></pre>
<p>上面是普通模式创建的单例，下面使用模块模式创建单例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var singleton = (function(){
  
  // 私有变量
  var age = 22;
  var speak = function(){
    console.log(&quot;speaking!!!&quot;);
  };
  
  // 特权（或公有）属性和方法
  return {
    name: &quot;percy&quot;,
    getAge: function(){
      return age;
    }
  };
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> singleton = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  
  <span class="hljs-comment">// 私有变量</span>
  <span class="hljs-keyword">var</span> age = <span class="hljs-number">22</span>;
  <span class="hljs-keyword">var</span> speak = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"speaking!!!"</span>);
  };
  
  <span class="hljs-comment">// 特权（或公有）属性和方法</span>
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">"percy"</span>,
    <span class="hljs-attr">getAge</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">return</span> age;
    }
  };
})();</code></pre>
<ul><li><p><strong>匿名函数最大的用途是创建闭包</strong>，并且还可以构建命名空间，以减少全局变量的使用。从而使用闭包模块化代码，减少全局变量的污染。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var objEvent = objEvent || {};
(function(){ 
    var addEvent = function(){ 
      // some code
    };
    function removeEvent(){
      // some code
    }

    objEvent.addEvent = addEvent;
    objEvent.removeEvent = removeEvent;
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> objEvent = objEvent || {};
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ 
    <span class="hljs-keyword">var</span> addEvent = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ 
      <span class="hljs-comment">// some code</span>
    };
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">removeEvent</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-comment">// some code</span>
    }

    objEvent.addEvent = addEvent;
    objEvent.removeEvent = removeEvent;
})();</code></pre>
<p>在这段代码中函数 addEvent 和 removeEvent 都是局部变量，但我们可以通过全局变量 objEvent 使用它，这就大大减少了全局变量的使用，增强了网页的安全性。</p>
<ul><li><p>一个闭包计数器</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var countNumber = (function(){
  var num = 0;
  return function(){
    return ++num;
  };
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> countNumber = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span> num = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> ++num;
  };
})();</code></pre>
<h3 id="articleHeader5">闭包的缺陷</h3>
<ul>
<li><p>闭包的缺点就是常驻内存会增大内存使用量，并且使用不当很容易造成内存泄露。</p></li>
<li><p>如果不是因为某些特殊任务而需要闭包，在没有必要的情况下，在其它函数中创建函数是不明智的，因为闭包对脚本性能具有负面影响，包括处理速度和内存消耗。</p></li>
</ul>
<h3 id="articleHeader6">最后再来一些有关闭包的面试题</h3>
<ul><li><p>下面代码中，标记 ？ 的地方输出分别是什么？</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fun(n,o){
  console.log(o);
  return {
    fun: function(m){
      return fun(m,n);
    }
  };
}

var a = fun(0);  // ?
a.fun(1);        // ?        
a.fun(2);        // ?
a.fun(3);        // ?

var b = fun(0).fun(1).fun(2).fun(3);  // ?

var c = fun(0).fun(1);  // ?
c.fun(2);        // ?
c.fun(3);        // ?" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fun</span>(<span class="hljs-params">n,o</span>)</span>{
  <span class="hljs-built_in">console</span>.log(o);
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">fun</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">m</span>)</span>{
      <span class="hljs-keyword">return</span> fun(m,n);
    }
  };
}

<span class="hljs-keyword">var</span> a = fun(<span class="hljs-number">0</span>);  <span class="hljs-comment">// ?</span>
a.fun(<span class="hljs-number">1</span>);        <span class="hljs-comment">// ?        </span>
a.fun(<span class="hljs-number">2</span>);        <span class="hljs-comment">// ?</span>
a.fun(<span class="hljs-number">3</span>);        <span class="hljs-comment">// ?</span>

<span class="hljs-keyword">var</span> b = fun(<span class="hljs-number">0</span>).fun(<span class="hljs-number">1</span>).fun(<span class="hljs-number">2</span>).fun(<span class="hljs-number">3</span>);  <span class="hljs-comment">// ?</span>

<span class="hljs-keyword">var</span> c = fun(<span class="hljs-number">0</span>).fun(<span class="hljs-number">1</span>);  <span class="hljs-comment">// ?</span>
c.fun(<span class="hljs-number">2</span>);        <span class="hljs-comment">// ?</span>
c.fun(<span class="hljs-number">3</span>);        <span class="hljs-comment">// ?</span></code></pre>
<blockquote><p>undefined<br>0<br>0<br>0<br>undefined, 0, 1, 2<br>undefined, 0<br>1<br>1</p></blockquote>
<h3 id="articleHeader7">参考资料</h3>
<ul>
<li><p>【书】《JavaScript 高级程序设计（第三版）》</p></li>
<li><p>【文章】<a href="http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html" rel="nofollow noreferrer" target="_blank">学习Javascript闭包（Closure）</a></p></li>
<li><p>【文章】<a href="https://segmentfault.com/a/1190000004585904">【JavaScript】【函数】闭包闭包！</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 闭包

## 原文链接
[https://segmentfault.com/a/1190000006875662](https://segmentfault.com/a/1190000006875662)

