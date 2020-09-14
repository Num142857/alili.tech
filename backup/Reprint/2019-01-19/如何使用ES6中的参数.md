---
title: '如何使用ES6中的参数' 
date: 2019-01-19 2:30:10
hidden: true
slug: ejjsd22oq1h
categories: [reprint]
---

{{< raw >}}

                    
<p>ECMAScript 6（或者叫 ECMAScript 2015）是 ECMAScript 的最新标准，极大的提高了 JavaScript 中处理参数的能力。现在我们可以使用 rest 参数（rest parameters）、默认值（default values）和解构（destructuring）以及其他许多新的特性。本文我们将探索参数(arguments)和参数(parameter)的方方面面，看一下ES6是如何对他们改进和提升的。</p>
<h2 id="articleHeader0">Arguments 和 Parameters</h2>
<p>arguments 和 Parameters 的含义通常是可以互换的。尽管如此，为了本文的目标，还是要做出区分。在大多数的标准中，函数声明时给出的叫做 parameters（或者叫 formal parameters），而传递给函数的叫做的 arguments（或者叫 actual arguments），看下面的函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(param1, param2) {
    // do something
}
foo(10, 20);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">param1, param2</span>) </span>{
    <span class="hljs-comment">// do something</span>
}
foo(<span class="hljs-number">10</span>, <span class="hljs-number">20</span>);</code></pre>
<p>在这个函数中，<code>param1</code> 和 <code>param2</code> 是函数的 parameters，而传递给函数的值（<code>10</code> 和 <code>20</code>）是 arguments。</p>
<p><strong>译者注：本文后面不再区分 arguments 和 parameters，统一译作参数。<img src="https://static.alili.techundefined" class="emoji" alt="joy" title="joy"></strong></p>
<h2 id="articleHeader1">扩展运算符（...)</h2>
<p>在 ES5 中，<code>apply()</code> 方法可以很方便将数组作为参数传递给函数，经常用于使用 <code>Math.max()</code> 来取得数组的最大值。看下面的代码段：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var myArray = [5, 10, 50];
Math.max(myArray);    // Error: NaN
Math.max.apply(Math, myArray);    // 50" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> myArray = [<span class="hljs-number">5</span>, <span class="hljs-number">10</span>, <span class="hljs-number">50</span>];
<span class="hljs-built_in">Math</span>.max(myArray);    <span class="hljs-comment">// Error: NaN</span>
<span class="hljs-built_in">Math</span>.max.apply(<span class="hljs-built_in">Math</span>, myArray);    <span class="hljs-comment">// 50</span></code></pre>
<p><code>Math.max()</code> 方法不支持数组，只接受数字作为参数。当数组传递给函数，函数会抛出错误。但是当使用 <code>apply()</code> 方法后，数组变成了一个个单独的数组传递给了函数，所以 <code>Math.max()</code> 就能够正确的执行了。</p>
<p>幸运的是，ES6 给我们带来了扩展运算符，我们就不必再继续使用 <code>apply()</code> 方法了。我们可以将表达式轻松的展开为多个参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var myArray = [5, 10, 50];
Math.max(...myArray);    // 50" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> myArray = [<span class="hljs-number">5</span>, <span class="hljs-number">10</span>, <span class="hljs-number">50</span>];
<span class="hljs-built_in">Math</span>.max(...myArray);    <span class="hljs-comment">// 50</span></code></pre>
<p>在这里我们通过扩展运算符将 <code>myArray</code> 展开成了一个个单独的值。虽然 ES5 中我们可以通过 <code>apply()</code> 方法来模拟扩展运算符，但是语法上让人迷惑，并且缺少可扩展性。扩展运算符不仅易于使用，还带来了许多新的特性。比如，你可以在函数调用时多次使用扩展运算符，并且还可以和其他参数混合在一起。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function myFunction() {
  for(var i in arguments){
    console.log(arguments[i]);
  }
}
var params = [10, 15];
myFunction(5, ...params, 20, ...[25]);    // 5 10 15 20 25" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myFunction</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">arguments</span>){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">arguments</span>[i]);
  }
}
<span class="hljs-keyword">var</span> params = [<span class="hljs-number">10</span>, <span class="hljs-number">15</span>];
myFunction(<span class="hljs-number">5</span>, ...params, <span class="hljs-number">20</span>, ...[<span class="hljs-number">25</span>]);    <span class="hljs-comment">// 5 10 15 20 25</span></code></pre>
<p>扩展运算符另一大好处就是他可以很容易的和构造函数（constructor）一起使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Date(...[2016, 5, 6]);    // Mon Jun 06 2016 00:00:00 GMT-0700 (Pacific Daylight Time)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(...[<span class="hljs-number">2016</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>]);    <span class="hljs-comment">// Mon Jun 06 2016 00:00:00 GMT-0700 (Pacific Daylight Time)</span></code></pre>
<p>当前我们可以使用 ES5 来重写上面的代码，不过我们需要一个复杂的方法来避免一个类型错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Date.apply(null, [2016, 4, 24]);    // TypeError: Date.apply is not a constructor
new (Function.prototype.bind.apply(Date, [null].concat([2016, 5, 6])));   // Mon Jun 06 2016 00:00:00 GMT-0700 (Pacific Daylight Time)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>.apply(<span class="hljs-literal">null</span>, [<span class="hljs-number">2016</span>, <span class="hljs-number">4</span>, <span class="hljs-number">24</span>]);    <span class="hljs-comment">// TypeError: Date.apply is not a constructor</span>
<span class="hljs-keyword">new</span> (<span class="hljs-built_in">Function</span>.prototype.bind.apply(<span class="hljs-built_in">Date</span>, [<span class="hljs-literal">null</span>].concat([<span class="hljs-number">2016</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>])));   <span class="hljs-comment">// Mon Jun 06 2016 00:00:00 GMT-0700 (Pacific Daylight Time)</span></code></pre>
<h2 id="articleHeader2">REST 参数</h2>
<p>rest 参数和扩展运算符是一样的语法，但是他不是将数组展开成一个个的参数，而是将一个个参数转换为数组。</p>
<p><strong>译者注：rest 参数和扩展运算符虽然一样的语法，在这里你就可以看出作者强调的 arguments 和 parameters 的区别了。扩展运算符用于函数调用的参数（arguments）中，而 rest 参数用于函数声明的参数（parameters）中。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function myFunction(...options) {
     return options;
}
myFunction('a', 'b', 'c');      // [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myFunction</span>(<span class="hljs-params">...options</span>) </span>{
     <span class="hljs-keyword">return</span> options;
}
myFunction(<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>);      <span class="hljs-comment">// ["a", "b", "c"]</span></code></pre>
<p>如果没有提供参数，rest 参数会被设置为空数组：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function myFunction(...options) {
     return options;
}
myFunction();      // []" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myFunction</span><span class="hljs-params">(<span class="hljs-rest_arg">...options</span>)</span> </span>{
     <span class="hljs-keyword">return</span> options;
}
myFunction();      <span class="hljs-comment">// []</span></code></pre>
<p>当创建可见函数（接受数量可变的参数的函数）的时候，rest 参数就显得十分有用。因为 rest 参数是一个数组，所以可以很方便的替换 <code>arguments</code> 对象（将会在下文讨论）。看下面一个使用 ES5 编写的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function checkSubstrings(string) {
  for (var i = 1; i < arguments.length; i++) {
    if (string.indexOf(arguments[i]) === -1) {
      return false;
    }
  }
  return true;
}
checkSubstrings('this is a string', 'is', 'this');   // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkSubstrings</span>(<span class="hljs-params">string</span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt; <span class="hljs-built_in">arguments</span>.length; i++) {
    <span class="hljs-keyword">if</span> (string.indexOf(<span class="hljs-built_in">arguments</span>[i]) === <span class="hljs-number">-1</span>) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}
checkSubstrings(<span class="hljs-string">'this is a string'</span>, <span class="hljs-string">'is'</span>, <span class="hljs-string">'this'</span>);   <span class="hljs-comment">// true</span></code></pre>
<p>这个函数的作用是检查一个字符串是否包含指定的一系列字符串。这个函数的第一个问题就是，我们必须查看函数体才知道函数接受多个参数。另外 <code>arguments</code> 的迭代必须从 1 开始，因为 <code>arguments[0]</code> 是第一个参数。如果我们稍后给第一参数之后再添加参数，或许我们就忘记更新这个循环了。使用 rest 参数，我们可以很轻易的避开这个问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function checkSubstrings(string, ...keys) {
  for (var key of keys) {
    if (string.indexOf(key) === -1) {
      return false;
    }
  }
  return true;
}
checkSubstrings('this is a string', 'is', 'this');   // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkSubstrings</span>(<span class="hljs-params">string, ...keys</span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">of</span> keys) {
    <span class="hljs-keyword">if</span> (string.indexOf(key) === <span class="hljs-number">-1</span>) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}
checkSubstrings(<span class="hljs-string">'this is a string'</span>, <span class="hljs-string">'is'</span>, <span class="hljs-string">'this'</span>);   <span class="hljs-comment">// true</span></code></pre>
<p>函数的输出和上一个函数一样。再重复一次，<code>string</code> 参数作为第一个参数传入，剩下的参数被塞进一个数组并且赋值给了变量 <code>keys</code>。</p>
<p>使用 rest 参数代替 <code>arguments</code> 不仅提高了代码的可读性，并且避免了 JavaScript 中的<a href="https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments" rel="nofollow noreferrer" target="_blank">性能问题</a>。尽管如此，rest 参数并不能无限制使用，举个例子，它只能是最后一个参数，否则会导致语法错误。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function logArguments(a, ...params, b) {
        console.log(a, params, b);
}
logArguments(5, 10, 15);    // SyntaxError: parameter after rest parameter" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">logArguments</span>(<span class="hljs-params">a, ...params, b</span>) </span>{
        <span class="hljs-built_in">console</span>.log(a, params, b);
}
logArguments(<span class="hljs-number">5</span>, <span class="hljs-number">10</span>, <span class="hljs-number">15</span>);    <span class="hljs-comment">// SyntaxError: parameter after rest parameter</span></code></pre>
<p>另一个限制方法声明时只允许一个 rest 参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function logArguments(...param1, ...param2) {
}
logArguments(5, 10, 15);    // SyntaxError: parameter after rest parameter" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">logArguments</span>(<span class="hljs-params">...param1, ...param2</span>) </span>{
}
logArguments(<span class="hljs-number">5</span>, <span class="hljs-number">10</span>, <span class="hljs-number">15</span>);    <span class="hljs-comment">// SyntaxError: parameter after rest parameter</span></code></pre>
<h2 id="articleHeader3">默认值</h2>
<h3 id="articleHeader4">ES5 中的默认参数</h3>
<p>ES5 中 JavaScript 并不支持默认值，但这里有个很简单的实现，使用 <code>OR</code><br>运算符（<code>||</code>），我们可以很容易的模拟默认参数，看下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(param1, param2) {
   param1 = param1 || 10;
   param2 = param2 || 10;
   console.log(param1, param2);
}
foo(5, 5);  // 5 5
foo(5);    // 5 10
foo();    // 10 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">param1, param2</span>) </span>{
   param1 = param1 || <span class="hljs-number">10</span>;
   param2 = param2 || <span class="hljs-number">10</span>;
   <span class="hljs-built_in">console</span>.log(param1, param2);
}
foo(<span class="hljs-number">5</span>, <span class="hljs-number">5</span>);  <span class="hljs-comment">// 5 5</span>
foo(<span class="hljs-number">5</span>);    <span class="hljs-comment">// 5 10</span>
foo();    <span class="hljs-comment">// 10 10</span></code></pre>
<p>这个函数期望接收两个参数，但当无参数调用时，它会使用默认值。在函数内，缺失的参数自动设置为 undefined，所以我们检查这些参数，并给他们设置默认值。为了检测缺失的参数并设置默认值，我们使用 <code>OR</code> 运算符（<code>||</code>）。这个运算符首先检查第一个值，如果是 <a href="https://developer.mozilla.org/en-US/docs/Glossary/Truthy" rel="nofollow noreferrer" target="_blank">truthy</a>，运算符会返回它，否则返回第二个参数。</p>
<p>这种方法在函数内很常用，但也存在瑕疵。如果传递 <code>0</code> 或者 <code>null</code> 也会返回默认值。因为它们被认为是 falsy 值。所以如果我们确实需要给函数传递 <code>0</code> 或者 <code>null</code>，我们需要换种方法来检测参数是否缺失：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(param1, param2) {
  if(param1 === undefined){
    param1 = 10;
  }
  if(param2 === undefined){
    param2 = 10;
  }
  console.log(param1, param2);
}
foo(0, null);    // 0, null
foo();    // 10, 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">param1, param2</span>) </span>{
  <span class="hljs-keyword">if</span>(param1 === <span class="hljs-literal">undefined</span>){
    param1 = <span class="hljs-number">10</span>;
  }
  <span class="hljs-keyword">if</span>(param2 === <span class="hljs-literal">undefined</span>){
    param2 = <span class="hljs-number">10</span>;
  }
  <span class="hljs-built_in">console</span>.log(param1, param2);
}
foo(<span class="hljs-number">0</span>, <span class="hljs-literal">null</span>);    <span class="hljs-comment">// 0, null</span>
foo();    <span class="hljs-comment">// 10, 10</span></code></pre>
<p>在这个函数中，通过检查参数的类型是否为 undefined 来确定是否要赋予默认值。这种方法代码量稍微大一些，但更安全，可以让我们给函数传递 <code>0</code> 或者 <code>null</code>。</p>
<h3 id="articleHeader5">ES6 中的默认参数</h3>
<p>ES6 中，我们不必再检查参数是否为 undefined 来模拟默认参数，我们可以直接将默认参数函数声明中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(a = 10, b = 10) {
  console.log(a, b);
}
foo(5);    // 5 10
foo(0, null);    // 0 null" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">a = <span class="hljs-number">10</span>, b = <span class="hljs-number">10</span></span>) </span>{
  <span class="hljs-built_in">console</span>.log(a, b);
}
foo(<span class="hljs-number">5</span>);    <span class="hljs-comment">// 5 10</span>
foo(<span class="hljs-number">0</span>, <span class="hljs-literal">null</span>);    <span class="hljs-comment">// 0 null</span></code></pre>
<p>正如你所看到的，忽略参数返回了默认值，但传递 <code>0</code> 或者 <code>null</code> 并没有。我们甚至可以使用函数来产生参数的默认值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getParam() {
    alert(&quot;getParam was called&quot;);
    return 3;
}
function multiply(param1, param2 = getParam()) {
    return param1 * param2;
}
multiply(2, 5);     // 10
multiply(2);     // 6 (also displays an alert dialog)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getParam</span>(<span class="hljs-params"></span>) </span>{
    alert(<span class="hljs-string">"getParam was called"</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-number">3</span>;
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">multiply</span>(<span class="hljs-params">param1, param2 = getParam(</span>)) </span>{
    <span class="hljs-keyword">return</span> param1 * param2;
}
multiply(<span class="hljs-number">2</span>, <span class="hljs-number">5</span>);     <span class="hljs-comment">// 10</span>
multiply(<span class="hljs-number">2</span>);     <span class="hljs-comment">// 6 (also displays an alert dialog)</span></code></pre>
<p>需要注意的是，只有缺少第二个参数的时候，<code>gegParam</code> 方法才会执行，所以当我们使用两个参数 <code>multiply()</code> 的时候并不会弹出 alert。</p>
<p>默认参数另一个有意思的特性是在方法声明是可以引用其他参数和变量作为默认参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function myFunction(a=10, b=a) {
     console.log('a = ' + a + '; b = '  + b);
}
myFunction();     // a=10; b=10
myFunction(22);    // a=22; b=22
myFunction(2, 4);    // a=2; b=4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myFunction</span>(<span class="hljs-params">a=<span class="hljs-number">10</span>, b=a</span>) </span>{
     <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'a = '</span> + a + <span class="hljs-string">'; b = '</span>  + b);
}
myFunction();     <span class="hljs-comment">// a=10; b=10</span>
myFunction(<span class="hljs-number">22</span>);    <span class="hljs-comment">// a=22; b=22</span>
myFunction(<span class="hljs-number">2</span>, <span class="hljs-number">4</span>);    <span class="hljs-comment">// a=2; b=4</span></code></pre>
<p>甚至可以在函数声明的时候执行操作符：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function myFunction(a, b = ++a, c = a*b) {
     console.log(c);
}
myFunction(5);    // 36" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myFunction</span>(<span class="hljs-params">a, b = ++a, c = a*b</span>) </span>{
     <span class="hljs-built_in">console</span>.log(c);
}
myFunction(<span class="hljs-number">5</span>);    <span class="hljs-comment">// 36</span></code></pre>
<p>注意：不像其他语言，JavaScript 是在调用时才计算默认参数的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(value, array = []) {
  array.push(value);
  return array;
}
add(5);    // [5]
add(6);    // [6], not [5, 6]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params">value, array = []</span>) </span>{
  array.push(value);
  <span class="hljs-keyword">return</span> array;
}
add(<span class="hljs-number">5</span>);    <span class="hljs-comment">// [5]</span>
add(<span class="hljs-number">6</span>);    <span class="hljs-comment">// [6], not [5, 6]</span></code></pre>
<h2 id="articleHeader6">解构赋值</h2>
<p>解构赋值是 ES6 的新特性，让我们可以从数组或者对象中提取值并赋值给变量，语法上类似于对象和数组字面量。当给函数传参时，这种语法清晰且易于理解并且很实用。</p>
<p>在 ES5 中，经常使用配置对象来处理大量的的可选参数，尤其是属性的顺序无关紧要的时候，看下面的函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function initiateTransfer(options) {
    var  protocol = options.protocol,
        port = options.port,
        delay = options.delay,
        retries = options.retries,
        timeout = options.timeout,
        log = options.log;
    // code to initiate transfer
}
options = {
  protocol: 'http',
  port: 800,
  delay: 150,
  retries: 10,
  timeout: 500,
  log: true
};
initiateTransfer(options);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initiateTransfer</span>(<span class="hljs-params">options</span>) </span>{
    <span class="hljs-keyword">var</span>  protocol = options.protocol,
        port = options.port,
        delay = options.delay,
        retries = options.retries,
        timeout = options.timeout,
        log = options.log;
    <span class="hljs-comment">// code to initiate transfer</span>
}
options = {
  <span class="hljs-attr">protocol</span>: <span class="hljs-string">'http'</span>,
  <span class="hljs-attr">port</span>: <span class="hljs-number">800</span>,
  <span class="hljs-attr">delay</span>: <span class="hljs-number">150</span>,
  <span class="hljs-attr">retries</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">timeout</span>: <span class="hljs-number">500</span>,
  <span class="hljs-attr">log</span>: <span class="hljs-literal">true</span>
};
initiateTransfer(options);</code></pre>
<p>这种模式 JavaScript 开发者经常使用，并且很好用。但我们必须进入函数体内才知道到底需要多少参数，使用解构参数赋值，我们可以在函数声明时很清晰的指定需要的参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function initiateTransfer({protocol, port, delay, retries, timeout, log}) {
     // code to initiate transfer
};
var options = {
  protocol: 'http',
  port: 800,
  delay: 150,
  retries: 10,
  timeout: 500,
  log: true
}
initiateTransfer(options);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initiateTransfer</span>(<span class="hljs-params">{protocol, port, delay, retries, timeout, log}</span>) </span>{
     <span class="hljs-comment">// code to initiate transfer</span>
};
<span class="hljs-keyword">var</span> options = {
  <span class="hljs-attr">protocol</span>: <span class="hljs-string">'http'</span>,
  <span class="hljs-attr">port</span>: <span class="hljs-number">800</span>,
  <span class="hljs-attr">delay</span>: <span class="hljs-number">150</span>,
  <span class="hljs-attr">retries</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">timeout</span>: <span class="hljs-number">500</span>,
  <span class="hljs-attr">log</span>: <span class="hljs-literal">true</span>
}
initiateTransfer(options);</code></pre>
<p>在这个函数中，我们使用了对象解构模式，而不是一个配置型对象，让我们的代码更加清晰易读。</p>
<p>我们也可以混用解构参数和普通参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function initiateTransfer(param1, {protocol, port, delay, retries, timeout, log}) {
     // code to initiate transfer
}
initiateTransfer('some value', options);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initiateTransfer</span>(<span class="hljs-params">param1, {protocol, port, delay, retries, timeout, log}</span>) </span>{
     <span class="hljs-comment">// code to initiate transfer</span>
}
initiateTransfer(<span class="hljs-string">'some value'</span>, options);</code></pre>
<p>需要注意，如果函数调用时解构参数缺失会抛出一个类型错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function initiateTransfer({protocol, port, delay, retries, timeout, log}) {
     // code to initiate transfer
}
initiateTransfer();  // TypeError: Cannot match against 'undefined' or 'null'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initiateTransfer</span>(<span class="hljs-params">{protocol, port, delay, retries, timeout, log}</span>) </span>{
     <span class="hljs-comment">// code to initiate transfer</span>
}
initiateTransfer();  <span class="hljs-comment">// TypeError: Cannot match against 'undefined' or 'null'</span></code></pre>
<p>当我们的参数是必须的，这种行为我们是想要的，但是如果我们期望参数可选呢？为阻止这种错误，我们需要给解构参数赋一个默认值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function initiateTransfer({protocol, port, delay, retries, timeout, log} = {}) {
     // code to initiate transfer
}
initiateTransfer();    // no error" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initiateTransfer</span>(<span class="hljs-params">{protocol, port, delay, retries, timeout, log} = {}</span>) </span>{
     <span class="hljs-comment">// code to initiate transfer</span>
}
initiateTransfer();    <span class="hljs-comment">// no error</span></code></pre>
<p>在这个函数中，我们给解构参数赋了一个空对象作为默认值。现在如果函数调用时没有赋予参数，不会抛出错误。</p>
<p>我们也可以给解构参数每个属性都赋默认值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function initiateTransfer({
    protocol = 'http',
    port = 800,
    delay = 150,
    retries = 10,
    timeout = 500,
    log = true
}) {
     // code to initiate transfer
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initiateTransfer</span>(<span class="hljs-params">{
    protocol = <span class="hljs-string">'http'</span>,
    port = <span class="hljs-number">800</span>,
    delay = <span class="hljs-number">150</span>,
    retries = <span class="hljs-number">10</span>,
    timeout = <span class="hljs-number">500</span>,
    log = true
}</span>) </span>{
     <span class="hljs-comment">// code to initiate transfer</span>
}</code></pre>
<p>在这个例子中，每个属性都被赋予默认值，就无需在函数体内手动检查 undefined 的参数再赋予默认值。</p>
<h2 id="articleHeader7">参数传递</h2>
<p>函数传参有两种方式：引用传递和值传递。如果是引用传递，修改参数会引起全局的变化，如果是值传递，只会引起函数内的变化。</p>
<p>在一些语言中，像 Visual Basic 和 PowerShell，我们可以选择声明是值传递还是引用传递，但 JavaScript 不是这样。</p>
<h3 id="articleHeader8">值传递</h3>
<p>严格来说，JavaScript只能值传递。当我们通过值传递给函数传参，就在函数作用域内创建了这个值得副本。所以任何值得变化都只会反映在函数内部。看下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 5;
function increment(a) {
    a = ++a;
    console.log(a);
}
increment(a);   // 6
console.log(a);    // 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = <span class="hljs-number">5</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">increment</span>(<span class="hljs-params">a</span>) </span>{
    a = ++a;
    <span class="hljs-built_in">console</span>.log(a);
}
increment(a);   <span class="hljs-comment">// 6</span>
<span class="hljs-built_in">console</span>.log(a);    <span class="hljs-comment">// 5</span></code></pre>
<p>在这里，在函数内部修改修改参数并不会影响到原始值。所以在函数外打印这个变量，得到的结果始终是 <code>5</code>。</p>
<h3 id="articleHeader9">引用传递</h3>
<p>在 JavaScript 中，所有的都是值传递，但是当我们传递一个变量指向一个对象（包括数组），这个“值”就指向了这个对象，改变了对象的某个属相也会引起其关联对象的改变。</p>
<p>看这个函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(param){
    param.bar = 'new value';
}
obj = {
    bar : 'value'
}
console.log(obj.bar);   // value
foo(obj);
console.log(obj.bar);   // new value" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">param</span>)</span>{
    param.bar = <span class="hljs-string">'new value'</span>;
}
obj = {
    <span class="hljs-attr">bar</span> : <span class="hljs-string">'value'</span>
}
<span class="hljs-built_in">console</span>.log(obj.bar);   <span class="hljs-comment">// value</span>
foo(obj);
<span class="hljs-built_in">console</span>.log(obj.bar);   <span class="hljs-comment">// new value</span></code></pre>
<p>正如你看到的，对象的属性在函数体内部被修改，但是却影响到了函数外部的对象。</p>
<p>当我们传递一个非原始的值，像数组或者对象，程序会在内存中创建一个对象，指向原始地址。如果被修改，原始值也会随之修改。</p>
<h2 id="articleHeader10">类型检查和缺失或多余参数</h2>
<p>在强类型的语言中，我们必须在函数声明时声明参数的类型，但 JavaScript 中没有这种特性，在 JavaScript 中，并不关心传递给函数的参数的类型和个数。</p>
<p>假设我们有一个函数，仅接受一个参数。当我们调用这个函数的使用，我们并不限制到底传递给函数多少个参数，甚至可以选择不传，都不会产生错误。</p>
<p>参数的个数可以分为两种情况：</p>
<ul>
<li>
<h4>参数缺失</h4>
<p>缺失的变量赋值为 undefined</p>
</li>
<li>
<h4>参数过多</h4>
<p>多余的参数会被忽略，但可以从 arguments 变量中取到（下文即将讨论）。</p>
</li>
</ul>
<h2 id="articleHeader11">强制参数</h2>
<p>函数调用中如果函数缺失，它会被设置为 undefined。我们可以利用这一点，如果参数缺失就抛出错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(mandatory, optional) {
    if (mandatory === undefined) {
        throw new Error('Missing parameter: mandatory');
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">mandatory, optional</span>) </span>{
    <span class="hljs-keyword">if</span> (mandatory === <span class="hljs-literal">undefined</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Missing parameter: mandatory'</span>);
    }
}</code></pre>
<p>在 ES6 中，我们可以更近一步，使用默认参数来设置强制参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function throwError() {
    throw new Error('Missing parameter');
}
function foo(param1 = throwError(), param2 = throwError()) {
    // do something
}
foo(10, 20);    // ok
foo(10);   // Error: missing parameter" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">throwError</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Missing parameter'</span>);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">param1 = throwError(</span>), <span class="hljs-title">param2</span> = <span class="hljs-title">throwError</span>(<span class="hljs-params"></span>)) </span>{
    <span class="hljs-comment">// do something</span>
}
foo(<span class="hljs-number">10</span>, <span class="hljs-number">20</span>);    <span class="hljs-comment">// ok</span>
foo(<span class="hljs-number">10</span>);   <span class="hljs-comment">// Error: missing parameter</span></code></pre>
<h2 id="articleHeader12">arguments 对象</h2>
<p>在 ES4 的时候默认参数就被加入，来代替 <code>arguments</code> 对象，但 ES4 并没有实现。随着 ES6 的发布，JavaScript 现在官方支持了默认参数。但并没有取消支持 <code>arguments</code> 的计划。</p>
<p><code>arguments</code> 对象是一个类数组的对象，可以在所有的函数中取到。<code>arguments</code> 通过数字索引来获取传入的参数，而不是通过参数的名字。这个对象允许我们给函数传入任意多的参数。看下面的代码判断：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function checkParams(param1) {
    console.log(param1);    // 2
    console.log(arguments[0], arguments[1]);    // 2 3
    console.log(param1 + arguments[0]);    // 4
}
checkParams(2, 3);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkParams</span>(<span class="hljs-params">param1</span>) </span>{
    <span class="hljs-built_in">console</span>.log(param1);    <span class="hljs-comment">// 2</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>], <span class="hljs-built_in">arguments</span>[<span class="hljs-number">1</span>]);    <span class="hljs-comment">// 2 3</span>
    <span class="hljs-built_in">console</span>.log(param1 + <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>]);    <span class="hljs-comment">// 4</span>
}
checkParams(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>);</code></pre>
<p>这个函数期望传入一个参数，当我们传入两个参数调用它的时候，我们通过 <code>param1</code> 或者 <code>arguments[0]</code> 来获取第一个参数，但第二个参数只能通过 <code>arguments[1]</code> 获取。也即是说，<code>arguments</code> 对象可以和有命名的参数一起使用。</p>
<p><code>arguments</code> 对象包含了所有传入函数的参数，并且索引的起始是 <code>1</code>。当我们希望获取更多的参数的时候，我们会使用 <code>arguments[2]</code> 、<code>arguments[3]</code> 等等。</p>
<p>我们可以跳过所有的参数命名设置，仅仅使用 <code>arguments</code> 对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function checkParams() {
    console.log(arguments[1], arguments[0], arguments[2]);
}
checkParams(2, 4, 6);  // 4 2 6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkParams</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">arguments</span>[<span class="hljs-number">1</span>], <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>], <span class="hljs-built_in">arguments</span>[<span class="hljs-number">2</span>]);
}
checkParams(<span class="hljs-number">2</span>, <span class="hljs-number">4</span>, <span class="hljs-number">6</span>);  <span class="hljs-comment">// 4 2 6</span></code></pre>
<p>实际上，命名的参数是一种方便，但不是必需的。同样的，rest 参数也可以用来显示传入的参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function checkParams(...params) {
    console.log(params[1], params[0], params[2]);    // 4 2 6
    console.log(arguments[1], arguments[0], arguments[2]);    // 4 2 6
}
checkParams(2, 4, 6);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkParams</span>(<span class="hljs-params">...params</span>) </span>{
    <span class="hljs-built_in">console</span>.log(params[<span class="hljs-number">1</span>], params[<span class="hljs-number">0</span>], params[<span class="hljs-number">2</span>]);    <span class="hljs-comment">// 4 2 6</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">arguments</span>[<span class="hljs-number">1</span>], <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>], <span class="hljs-built_in">arguments</span>[<span class="hljs-number">2</span>]);    <span class="hljs-comment">// 4 2 6</span>
}
checkParams(<span class="hljs-number">2</span>, <span class="hljs-number">4</span>, <span class="hljs-number">6</span>);</code></pre>
<p><code>arguments</code> 对象是一个类数组对象，但是缺少像 <code>slice</code> 和 <code>foreach</code> 等方法。为了在 <code>arguments</code> 对象上使用这些方法，需要将其转换为真实的数组：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sort() {
    var a = Array.prototype.slice.call(arguments);
    return a.sort();
}
sort(40, 20, 50, 30);    // [20, 30, 40, 50]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sort</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> a = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>);
    <span class="hljs-keyword">return</span> a.sort();
}
sort(<span class="hljs-number">40</span>, <span class="hljs-number">20</span>, <span class="hljs-number">50</span>, <span class="hljs-number">30</span>);    <span class="hljs-comment">// [20, 30, 40, 50]</span></code></pre>
<p>在这个函数中，使用 <code>Array.prototype.slice.call()</code> 快速将 <code>arguments</code> 对象转换为数组。然后使用 <code>sort</code> 方法进行排序。</p>
<p>ES6 有一种更直接的方法，<code>Array.from()</code>，ES6 新增的方法，用来通过类数组对象创建一个新的数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sort() {
    var a = Array.from(arguments);
    return a.sort();
}
sort(40, 20, 50, 30);    // [20, 30, 40, 50]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sort</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> a = <span class="hljs-built_in">Array</span>.from(<span class="hljs-built_in">arguments</span>);
    <span class="hljs-keyword">return</span> a.sort();
}
sort(<span class="hljs-number">40</span>, <span class="hljs-number">20</span>, <span class="hljs-number">50</span>, <span class="hljs-number">30</span>);    <span class="hljs-comment">// [20, 30, 40, 50]</span></code></pre>
<h2 id="articleHeader13">length 属性</h2>
<p>虽然 arguments 对象并不是严格意义的数组，但它有一个 <code>length</code> 属性，可以用来检查传递给函数的参数的个数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function countArguments() {
    console.log(arguments.length);
}
countArguments();    // 0
countArguments(10, null, &quot;string&quot;);    // 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">countArguments</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">arguments</span>.length);
}
countArguments();    <span class="hljs-comment">// 0</span>
countArguments(<span class="hljs-number">10</span>, <span class="hljs-literal">null</span>, <span class="hljs-string">"string"</span>);    <span class="hljs-comment">// 3</span></code></pre>
<p>通过使用 <code>length</code> 属性，我们可以更好的控制参数的数量。比如说，如果一个函数需要两个参数，我们就可以使用 <code>length</code> 属性来检查参数数量，如果少于期望数量就抛出错误。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(param1, param2) {
    if (arguments.length < 2) {
        throw new Error(&quot;This function expects at least two arguments&quot;);
    } else if (arguments.length === 2) {
        // do something
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">param1, param2</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">arguments</span>.length &lt; <span class="hljs-number">2</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"This function expects at least two arguments"</span>);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-built_in">arguments</span>.length === <span class="hljs-number">2</span>) {
        <span class="hljs-comment">// do something</span>
    }
}</code></pre>
<p>rest 参数是数组，所以他也有 <code>length</code> 属性，我们用 ES6 来重写上面的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(...params) {
  if (params.length < 2) {
        throw new Error(&quot;This function expects at least two arguments&quot;);
    } else if (params.length === 2) {
        // do something
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">...params</span>) </span>{
  <span class="hljs-keyword">if</span> (params.length &lt; <span class="hljs-number">2</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"This function expects at least two arguments"</span>);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (params.length === <span class="hljs-number">2</span>) {
        <span class="hljs-comment">// do something</span>
    }
}</code></pre>
<h2 id="articleHeader14">Callee 和 Caller 属性</h2>
<p><code>callee</code> 属性指向当前正在运行的函数，而 <code>caller</code> 指向调用当前正在运行函数的函数。在 ES5 严格模式下，这些属性是被废弃掉的，如果要访问它们会抛出错误。</p>
<p><code>arguments.callee</code> 属性在递归函数（递归函数是一个普通函数，通过它的签名指向自身）下很有用，尤其是函数的签名不可用时（也就是匿名函数）。因为匿名函数没有名字，唯一指向自身的方法就是通过 <code>arguments.callee</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var result = (function(n) {
  if (n <= 1) {
    return 1;
  } else {
    return n * arguments.callee(n - 1);
  }
})(4);   // 24" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> result = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">n</span>) </span>{
  <span class="hljs-keyword">if</span> (n &lt;= <span class="hljs-number">1</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> n * <span class="hljs-built_in">arguments</span>.callee(n - <span class="hljs-number">1</span>);
  }
})(<span class="hljs-number">4</span>);   <span class="hljs-comment">// 24</span></code></pre>
<h2 id="articleHeader15">严格模式和非严格模式下的 arguments</h2>
<p>在 ES5 非严格模式下， <code>arguments</code> 对象有一个不常用的特性：它保持和命名参数值同步。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(param) {
   console.log(param === arguments[0]);    // true
   arguments[0] = 500;
   console.log(param === arguments[0]);    // true
   return param
}
foo(200);    // 500" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">param</span>) </span>{
   <span class="hljs-built_in">console</span>.log(param === <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>]);    <span class="hljs-comment">// true</span>
   <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>] = <span class="hljs-number">500</span>;
   <span class="hljs-built_in">console</span>.log(param === <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>]);    <span class="hljs-comment">// true</span>
   <span class="hljs-keyword">return</span> param
}
foo(<span class="hljs-number">200</span>);    <span class="hljs-comment">// 500</span></code></pre>
<p>在函数内部，一个新的值赋给 <code>arguments[0]</code>。因为 <code>arguments</code> 一直和命名参数的值保持同步，<code>arguments[0]</code> 的改变也会引起 <code>param</code> 的改变。事实上，他们是同个变量的不同名称。在 ES5 严格模式下，这种令人迷惑的特性被移除了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;use strict&quot;;
function foo(param) {
   console.log(param === arguments[0]);    // true
   arguments[0] = 500;
   console.log(param === arguments[0]);    // false
   return param
}
foo(200);   // 200" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-meta">"use strict"</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">param</span>) </span>{
   <span class="hljs-built_in">console</span>.log(param === <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>]);    <span class="hljs-comment">// true</span>
   <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>] = <span class="hljs-number">500</span>;
   <span class="hljs-built_in">console</span>.log(param === <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>]);    <span class="hljs-comment">// false</span>
   <span class="hljs-keyword">return</span> param
}
foo(<span class="hljs-number">200</span>);   <span class="hljs-comment">// 200</span></code></pre>
<p>这次，<code>arguments[0]</code> 的改变没有影响到 <code>param</code>，并且输出和期望一样。ES6下，输出结果和 ES5 的严格模式是一致的。但是请记住，在函数声明时使用了默认参数，<code>arguments</code> 不受影响。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(param1, param2 = 10, param3 = 20) {
   console.log(param1 === arguments[0]);    // true
   console.log(param2 === arguments[1]);    // true
   console.log(param3 === arguments[2]);    // false
   console.log(arguments[2]);    // undefined
   console.log(param3);    // 20
}
foo('string1', 'string2');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">param1, param2 = <span class="hljs-number">10</span>, param3 = <span class="hljs-number">20</span></span>) </span>{
   <span class="hljs-built_in">console</span>.log(param1 === <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>]);    <span class="hljs-comment">// true</span>
   <span class="hljs-built_in">console</span>.log(param2 === <span class="hljs-built_in">arguments</span>[<span class="hljs-number">1</span>]);    <span class="hljs-comment">// true</span>
   <span class="hljs-built_in">console</span>.log(param3 === <span class="hljs-built_in">arguments</span>[<span class="hljs-number">2</span>]);    <span class="hljs-comment">// false</span>
   <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">arguments</span>[<span class="hljs-number">2</span>]);    <span class="hljs-comment">// undefined</span>
   <span class="hljs-built_in">console</span>.log(param3);    <span class="hljs-comment">// 20</span>
}
foo(<span class="hljs-string">'string1'</span>, <span class="hljs-string">'string2'</span>);</code></pre>
<p>在这个函数中，尽管 <code>param3</code> 有默认值，但他和 <code>arguments[2]</code> 并不相等，因为只有两个参数传入了函数。也就是说，设置默认参数并不影响 arguments 对象。</p>
<h2 id="articleHeader16">结论</h2>
<p>ES6 给 JavaScript 带来了许多大大小小的改进。越来越多的开发者开始使用 ES6，而且很多所有的特性都可以无障碍使用。本文我们学习了 ES6 是如何提升JavaScript 处理参数的能力的。但我们仅仅学了 ES6 的一点皮毛。更多的有趣的特性等着我们去挖掘！</p>
<ul>
<li><p><a href="https://kangax.github.io/compat-table/es6/" rel="nofollow noreferrer" target="_blank">ECMAScript 6 Compatibility Table</a>, Juriy Zaytsev</p></li>
<li><p>“<a href="http://www.ecma-international.org/ecma-262/6.0/" rel="nofollow noreferrer" target="_blank">ECMAScript 2015 Language Specification</a>,” ECMA International</p></li>
</ul>
<hr>
<p>看下时间现在正好是23：23，几乎用了一个下午和晚上把这篇文章读完又翻译完，这篇文章结合 ES5 和 ES6 来讲解，收益颇多。不过翻译水平有限，求多提意见多多指教 ~</p>
<p>原文地址： <a href="https://www.smashingmagazine.com/2016/07/how-to-use-arguments-and-parameters-in-ecmascript-6/" rel="nofollow noreferrer" target="_blank">How To Use Arguments And Parameters In ECMAScript 6</a></p>
<p><strong>小广告</strong></p>
<p>欢迎关注我们的微信公众号:<br><span class="img-wrap"><img data-src="/img/remote/1460000008213457?w=258&amp;h=258" src="https://static.alili.tech/img/remote/1460000008213457?w=258&amp;h=258" alt="小前端FE(smallsfe)" title="小前端FE(smallsfe)" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何使用ES6中的参数

## 原文链接
[https://segmentfault.com/a/1190000008594196](https://segmentfault.com/a/1190000008594196)

