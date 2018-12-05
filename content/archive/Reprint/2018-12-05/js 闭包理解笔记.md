---
title: 'js 闭包理解笔记' 
date: 2018-12-05 2:30:09
hidden: true
slug: 2oseseb51v5
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a></blockquote>
<h3 id="articleHeader0">首先引用来自官网文档的定义：</h3>
<blockquote>closure is the combination of a function and the lexical environment within which that function was declared.<br>闭包是一个函数和其内部公开变量的环境的集合.</blockquote>
<p>简单而言，  闭包 = 函数 + 环境</p>
<h3 id="articleHeader1">第一个闭包的例子</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function init() {
  var name = 'Mozilla'; // name is a local variable created by init
  function displayName() { // displayName() is the inner function, a closure
    alert(name); // use variable declared in the parent function    
  }
  displayName();    
}
init();

because inner functions have access to the variables of outer functions, displayName() can access the variable name declared in the parent function, init()." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">var</span> name = <span class="hljs-string">'Mozilla'</span>; <span class="hljs-comment">// name is a local variable created by init</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">displayName</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// displayName() is the inner function, a closure</span>
    alert(name); <span class="hljs-comment">// use variable declared in the parent function    </span>
  }
  displayName();    
}
init();

because inner functions have access to the variables <span class="hljs-keyword">of</span> outer functions, displayName() can access the variable name declared <span class="hljs-keyword">in</span> the <span class="hljs-built_in">parent</span> <span class="hljs-function"><span class="hljs-keyword">function</span>, <span class="hljs-title">init</span>(<span class="hljs-params"></span>).</span></code></pre>
<ul><li>其实这个栗子很简单，displayName()就是init()内部的闭包函数，而为啥在displayName内部可以调用到外部定义的变量 name 呢，因为<strong>js内部函数有获取外部函数中变量的权限</strong>。</li></ul>
<h3 id="articleHeader2">第二个栗子</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = [
    {'key':0},
    {'key':1},
    {'key':2}
];
function showKey() {
    for(var i=0;i<data.length;i++) {
         setTimeout(function(){
             //console.log(i); //发现i输出了3次3
            //console.log(this); // 发现 this 指向的是 Window
            data[i].key = data[i].key + 10;
            console.log(data[i].key)
         }, 1000);
    }
}
showKey();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> data = [
    {<span class="hljs-string">'key'</span>:<span class="hljs-number">0</span>},
    {<span class="hljs-string">'key'</span>:<span class="hljs-number">1</span>},
    {<span class="hljs-string">'key'</span>:<span class="hljs-number">2</span>}
];
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">showKey</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;data.length;i++) {
         setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
             <span class="hljs-comment">//console.log(i); //发现i输出了3次3</span>
            <span class="hljs-comment">//console.log(this); // 发现 this 指向的是 Window</span>
            data[i].key = data[i].key + <span class="hljs-number">10</span>;
            <span class="hljs-built_in">console</span>.log(data[i].key)
         }, <span class="hljs-number">1000</span>);
    }
}
showKey();</code></pre>
<p>上面这个例子可以正确输出 10 11 12 吗？<br>答案是：并不能，并且还会报语法错误....</p>
<ul>
<li>console.log(i); 发现i输出了3次3,也就是说，在setTimeout 1000毫秒之后，执行闭包函数的时候，for循环已经执行结束了，i是固定值，并没有实现我们期望的效果。</li>
<li>console.log(this); 发现 this 指向的是 Window，也就是说，在函数内部实现的闭包函数已经被转变成了全局函数，存储到了内存中。</li>
</ul>
<p>所以需要再定义一个执行函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = [
    {'key':0},
    {'key':1},
    {'key':2}
];
function showKey() {
    var f1 = function(n){
        data[i].key = data[i].key + 10;
        console.log(data[i].key)
    }
    for(var i=0;i<data.length;i++) {
         setTimeout(f1(i), 1000);
    }
}
showKey();
// 得到预期的 10 11 12" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> data = [
    {<span class="hljs-string">'key'</span>:<span class="hljs-number">0</span>},
    {<span class="hljs-string">'key'</span>:<span class="hljs-number">1</span>},
    {<span class="hljs-string">'key'</span>:<span class="hljs-number">2</span>}
];
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">showKey</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> f1 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">n</span>)</span>{
        data[i].key = data[i].key + <span class="hljs-number">10</span>;
        <span class="hljs-built_in">console</span>.log(data[i].key)
    }
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;data.length;i++) {
         setTimeout(f1(i), <span class="hljs-number">1000</span>);
    }
}
showKey();
<span class="hljs-comment">// 得到预期的 10 11 12</span></code></pre>
<h3 id="articleHeader3">第三个闭包的例子-柯里化(currying)</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function makeAdder(x) {
  return function(y) {
    return function(z) {
        return x + y + z;
    }
  };
}

console.log(makeAdder(1)(2)(3)); // 6

// function factory it creates functions which can add a specific value to their argument
var add5 = makeAdder(5);
console.log(add5(1)(2));  // 8
console.log(add5(4)(5));  // 14" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeAdder</span>(<span class="hljs-params">x</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">y</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">z</span>) </span>{
        <span class="hljs-keyword">return</span> x + y + z;
    }
  };
}

<span class="hljs-built_in">console</span>.log(makeAdder(<span class="hljs-number">1</span>)(<span class="hljs-number">2</span>)(<span class="hljs-number">3</span>)); <span class="hljs-comment">// 6</span>

<span class="hljs-comment">// function factory it creates functions which can add a specific value to their argument</span>
<span class="hljs-keyword">var</span> add5 = makeAdder(<span class="hljs-number">5</span>);
<span class="hljs-built_in">console</span>.log(add5(<span class="hljs-number">1</span>)(<span class="hljs-number">2</span>));  <span class="hljs-comment">// 8</span>
<span class="hljs-built_in">console</span>.log(add5(<span class="hljs-number">4</span>)(<span class="hljs-number">5</span>));  <span class="hljs-comment">// 14</span></code></pre>
<ul><li>这种返回function的形式就是柯里化，作用是 makeAdder 可以作为一个 function factory来使用。</li></ul>
<h3 id="articleHeader4">第四个闭包的例子 - practicle closure</h3>
<ul>
<li>闭包的适用场景：当你想要通过一个function来操作它关联的数据时，闭包是很有用的，这种使用方法是类似面向对象的。</li>
<li>闭包同样可以模拟面向对象的私有变量的方法和变量的使用和获取。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var counter = (function() {
  // private variable
  var privateCounter = 0; 

  // private function
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    changeValue: function(val) {
      changeBy(val);
    },
    value: function() {
      return privateCounter;
    }
  };   
})();

console.log(counter.value()); // logs 0 // 实现了内部属性的获取
counter.changeValue(2);// 实现了内部的changeBy()方法
counter.changeValue(10); 
console.log(counter.value()); // logs 12
counter.changeValue(-5);
console.log(counter.value()); // logs 7" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> counter = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// private variable</span>
  <span class="hljs-keyword">var</span> privateCounter = <span class="hljs-number">0</span>; 

  <span class="hljs-comment">// private function</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">changeBy</span>(<span class="hljs-params">val</span>) </span>{
    privateCounter += val;
  }
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">changeValue</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">val</span>) </span>{
      changeBy(val);
    },
    <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> privateCounter;
    }
  };   
})();

<span class="hljs-built_in">console</span>.log(counter.value()); <span class="hljs-comment">// logs 0 // 实现了内部属性的获取</span>
counter.changeValue(<span class="hljs-number">2</span>);<span class="hljs-comment">// 实现了内部的changeBy()方法</span>
counter.changeValue(<span class="hljs-number">10</span>); 
<span class="hljs-built_in">console</span>.log(counter.value()); <span class="hljs-comment">// logs 12</span>
counter.changeValue(<span class="hljs-number">-5</span>);
<span class="hljs-built_in">console</span>.log(counter.value()); <span class="hljs-comment">// logs 7</span></code></pre>
<ul><li>
<strong>counter</strong>对外暴露的方法就是 counter.changeValue, counter.value,而内部属性 privateCounter 和 内部方法 changeBy 被隔离开了，只能通过外部方法来调用。</li></ul>
<ul><li>同时我们也可以定义多个 counter，其内部属性也是相互隔离的。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var makeCounter = function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  }  
};

var counter1 = makeCounter();
var counter2 = makeCounter();
alert(counter1.value()); /* Alerts 0 */
counter1.increment();
counter1.increment();
alert(counter1.value()); /* Alerts 2 */
counter1.decrement();
alert(counter1.value()); /* Alerts 1 */
alert(counter2.value()); /* Alerts 0 */" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> makeCounter = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">var</span> privateCounter = <span class="hljs-number">0</span>;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">changeBy</span><span class="hljs-params">(val)</span> </span>{
    privateCounter += val;
  }
  <span class="hljs-keyword">return</span> {
    increment: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
      changeBy(<span class="hljs-number">1</span>);
    },
    decrement: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
      changeBy(<span class="hljs-number">-1</span>);
    },
    value: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
      <span class="hljs-keyword">return</span> privateCounter;
    }
  }  
};

<span class="hljs-keyword">var</span> counter1 = makeCounter();
<span class="hljs-keyword">var</span> counter2 = makeCounter();
alert(counter1.value()); <span class="hljs-comment">/* Alerts 0 */</span>
counter1.increment();
counter1.increment();
alert(counter1.value()); <span class="hljs-comment">/* Alerts 2 */</span>
counter1.decrement();
alert(counter1.value()); <span class="hljs-comment">/* Alerts 1 */</span>
alert(counter2.value()); <span class="hljs-comment">/* Alerts 0 */</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js 闭包理解笔记

## 原文链接
[https://segmentfault.com/a/1190000014421639](https://segmentfault.com/a/1190000014421639)

