---
title: '[译] ES6 中 Arguments 和 Parameters 用法解析' 
date: 2019-02-06 2:30:09
hidden: true
slug: v3sa1w9je2
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<p><strong>原文地址：<a href="https://www.smashingmagazine.com/2016/07/how-to-use-arguments-and-parameters-in-ecmascript-6" rel="nofollow noreferrer" target="_blank">https://www.smashingmagazine.com/2016/07/how-to-use-arguments-and-parameters-in-ecmascript-6</a></strong></p>
<ul>
<li><p>By <a href="https://www.smashingmagazine.com/author/farazkelhini/" rel="nofollow noreferrer" target="_blank">Faraz Kelhini</a></p></li>
<li><p>July 20th, 2016</p></li>
<li><p><a href="https://www.smashingmagazine.com/tag/javascript/" rel="nofollow noreferrer" target="_blank">JavaScript</a><a href="https://www.smashingmagazine.com/tag/tools/" rel="nofollow noreferrer" target="_blank">Tools</a></p></li>
<li><p><a>7 Comments</a></p></li>
</ul>
</blockquote>
<p>ECMAScript 6 (也称 ECMAScript 2015) 是ECMAScript 标准的最新版本，显著地完善了JS中参数的处理方式。除了其它新特性外，我们还可以使用rest参数、默认值、解构赋值等。</p>
<p>本教程中，我们将详细探索arguments和parameters，看看ES6是如果改善升级它们的。</p>
<h3 id="articleHeader0">对比 Arguments 和 Parameters <a>Link</a>
</h3>
<p>通常情况下提到 Arguments 和 Parameters， 都认为是可以互换使用的。然而，基于本教程的目的，我们做了明确的区分。在大多数标准中，parameters (形式参数) 指声明函数名和函数体的时候使用的参数，而 arguments (实际参数) 指在函数实际调用时，传入的确定值。思考下面这个函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(param1, param2) {
    // do something
}
foo(10, 20); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">param1, param2</span>) </span>{
    <span class="hljs-comment">// do something</span>
}
foo(<span class="hljs-number">10</span>, <span class="hljs-number">20</span>); </code></pre>
<p>在这个函数中， <code>param1</code> 和 <code>param2</code> 是函数的形式参数（形参）, 而在函数foo调用时，传入的 (<code>10</code> 和 <code>20</code>) 则是实际参数（实参）。</p>
<h3 id="articleHeader1">扩展操作符 <a>Link</a>
</h3>
<p>在 ES5 中，用 <code>apply()</code> 方法可以很方便地将一个数组传递给函数。例如，我们经常把它和 <code>Math.max()</code> 结合使用，来取得数组中的最大值。请看下面代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var myArray = [5, 10, 50];
Math.max(myArray);    // Error: NaN
Math.max.apply(Math, myArray);    // 50 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> myArray = [<span class="hljs-number">5</span>, <span class="hljs-number">10</span>, <span class="hljs-number">50</span>];
<span class="hljs-built_in">Math</span>.max(myArray);    <span class="hljs-comment">// Error: NaN</span>
<span class="hljs-built_in">Math</span>.max.apply(<span class="hljs-built_in">Math</span>, myArray);    <span class="hljs-comment">// 50 </span></code></pre>
<p><code>Math.max()</code> 方法并不支持传入数组，它只接受数字。所以当我们把数组作为参数传递给它时，就会抛出错误。但是，加上 <code>apply()</code> 方法后，数组会被转换成单独的数字，就能被 <code>Math.max()</code> 处理了。</p>
<p>庆幸的是，ES6 引入了扩展操作符，我们不需要再使用 <code>apply()</code> 方法了。通过扩展操作符，我们可以很方便地为表达式传入多个参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var myArray = [5, 10, 50];
Math.max(...myArray);    // 50 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var myArray = [<span class="hljs-number">5</span>, <span class="hljs-number">10</span>, <span class="hljs-number">50</span>];
Math.max(...myArray);    <span class="hljs-comment">// 50 </span></code></pre>
<p>这里，扩展操作符把 <code>myArray</code> 展开成独立的数值传给了函数。 ES5里面使用 <code>apply()</code> 来模仿操作符是可以达到目的的，只是语法上令人困惑，并且缺乏扩展操作符的灵活性。 扩展操作符不仅易于使用，还涵盖了很多其他特性。例如，它可以被多次使用，还可以在 <code>function</code> 调用时，和其它参数混合使用:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function myFunction() {
  for(var i in arguments){
    console.log(arguments[i]);
  }
}
var params = [10, 15];
myFunction(5, ...params, 20, ...[25]);    // 5 10 15 20 25 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myFunction</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">arguments</span>){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">arguments</span>[i]);
  }
}
<span class="hljs-keyword">var</span> params = [<span class="hljs-number">10</span>, <span class="hljs-number">15</span>];
myFunction(<span class="hljs-number">5</span>, ...params, <span class="hljs-number">20</span>, ...[<span class="hljs-number">25</span>]);    <span class="hljs-comment">// 5 10 15 20 25 </span></code></pre>
<p>扩展操作符的另一个优点，就是它可以很简单地和构造函数一起使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Date(...[2016, 5, 6]);    // Mon Jun 06 2016 00:00:00 GMT-0700 (Pacific Daylight Time)` " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">new Date(...[<span class="hljs-number">2016</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>]);    <span class="hljs-comment">// Mon Jun 06 2016 00:00:00 GMT-0700 (Pacific Daylight Time)` </span></code></pre>
<p>当然，我们可以用ES5重写上面的代码，但我们则需要用一个复杂的模式来避免类型错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Date.apply(null, [2016, 4, 24]);    // TypeError: Date.apply is not a constructor
new (Function.prototype.bind.apply(Date, [null].concat([2016, 5, 6])));   // Mon Jun 06 2016 00:00:00 GMT-0700 (Pacific Daylight Time) " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>.apply(<span class="hljs-literal">null</span>, [<span class="hljs-number">2016</span>, <span class="hljs-number">4</span>, <span class="hljs-number">24</span>]);    <span class="hljs-comment">// TypeError: Date.apply is not a constructor</span>
<span class="hljs-keyword">new</span> (<span class="hljs-built_in">Function</span>.prototype.bind.apply(<span class="hljs-built_in">Date</span>, [<span class="hljs-literal">null</span>].concat([<span class="hljs-number">2016</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>])));   <span class="hljs-comment">// Mon Jun 06 2016 00:00:00 GMT-0700 (Pacific Daylight Time) </span></code></pre>
<h4>浏览器对扩展操作符在函数中调用的支持情况 <a>Link</a>
</h4>
<p>桌面浏览器;<br><span class="img-wrap"><img data-src="/img/remote/1460000006760769" src="https://static.alili.tech/img/remote/1460000006760769" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>移动端浏览器：<br><span class="img-wrap"><img data-src="/img/remote/1460000006063495" src="https://static.alili.tech/img/remote/1460000006063495" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">Rest参数 <a>Link</a>
</h3>
<p>rest参数和扩展操作符拥有相同的语法，不同的是，<code>rest参数是把所有的参数收集起来转换成数组</code>，而扩展操作符是把数组扩展成单独的参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function myFunction(...options) {
     return options;
}
myFunction('a', 'b', 'c');      // [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;] " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myFunction</span><span class="hljs-params">(<span class="hljs-rest_arg">...options</span>)</span> </span>{
     <span class="hljs-keyword">return</span> options;
}
myFunction(<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>);      <span class="hljs-comment">// ["a", "b", "c"] </span></code></pre>
<p>如果函数调用时，没有传入实际参数，则rest参数会输出一个空数组，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function myFunction(...options) {
     return options;
}
myFunction();      // [] " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myFunction</span><span class="hljs-params">(<span class="hljs-rest_arg">...options</span>)</span> </span>{
     <span class="hljs-keyword">return</span> options;
}
myFunction();      <span class="hljs-comment">// [] </span></code></pre>
<p>rest参数在创建一个可变函数（即一个参数个数可变的函数）时尤其有用。rest参数有着数组固有的优势，可以快捷地替换 <code>arguments</code> 对象（下文会解释这个名词）。下面这个函数是用ES5写的，我们来看下：</p>
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
checkSubstrings('this is a string', 'is', 'this');   // true " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkSubstrings</span>(<span class="hljs-params">string</span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> i = <span class="hljs-number">1</span>; i &lt; <span class="hljs-built_in">arguments</span>.length; i++) {
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">string</span>.indexOf(<span class="hljs-built_in">arguments</span>[i]) === <span class="hljs-number">-1</span>) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}
checkSubstrings(<span class="hljs-string">'this is a string'</span>, <span class="hljs-string">'is'</span>, <span class="hljs-string">'this'</span>);   <span class="hljs-comment">// true </span></code></pre>
<p>该函数检查字符串（<code>this is a string</code>）是否包括这些子串（<code>is</code>, <code>this</code>）。这个函数存在的第一个问题是，我们必须看函数体内是否有多个参数。第二个问题是，循环必须从 <code>1</code> 开始，而不是从 <code>0</code> 开始, 因为 <code>arguments[0]</code> 指向的就是第一个参数（<code>this is a string</code>）。 如果以后我们想要在这个字符串的前面或者后面添加另一个参数，我们可能会忘记更新循环体。而使用rest参数，我们就可以很容易地避免这些问题：</p>
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
checkSubstrings('this is a string', 'is', 'this');   // true " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkSubstrings</span><span class="hljs-params">(string, <span class="hljs-rest_arg">...keys</span>)</span> </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key of keys) {
    <span class="hljs-keyword">if</span> (string.indexOf(key) === <span class="hljs-number">-1</span>) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}
checkSubstrings(<span class="hljs-string">'this is a string'</span>, <span class="hljs-string">'is'</span>, <span class="hljs-string">'this'</span>);   <span class="hljs-comment">// true </span></code></pre>
<p>该函数的输出跟前一个函数的输出是一样的。这里再提一下，参数 <code>string</code> 被包含在这个函数的 <code>argument</code> 中，并且第一个被传递进来，剩下的参数都被放到一个数组，并且赋给了名为 <code>keys</code> 的变量。</p>
<p>使用rest参数替代 <code>arguments</code> 对象来提高代码的可读性和避免一些js的<a href="https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments" rel="nofollow noreferrer" target="_blank">优化问题</a><a>1</a>。 然而，rest参数也不是没有缺点的。例如，它必须是最后一个参数，否则就会报错，如下面函数所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function logArguments(a, ...params, b) {
        console.log(a, params, b);
}
logArguments(5, 10, 15);    // SyntaxError: parameter after rest parameter " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">logArguments</span><span class="hljs-params">(a, <span class="hljs-rest_arg">...params</span>, b)</span> </span>{
        console.log(a, params, b);
}
logArguments(<span class="hljs-number">5</span>, <span class="hljs-number">10</span>, <span class="hljs-number">15</span>);    <span class="hljs-comment">// SyntaxError: parameter after rest parameter </span></code></pre>
<p>另一个缺点是，一个函数声明只能允许有一个rest参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function logArguments(...param1, ...param2) {
}
logArguments(5, 10, 15);    // SyntaxError: parameter after rest parameter " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">logArguments</span><span class="hljs-params">(<span class="hljs-rest_arg">...param1</span>, <span class="hljs-rest_arg">...param2</span>)</span> </span>{
}
logArguments(<span class="hljs-number">5</span>, <span class="hljs-number">10</span>, <span class="hljs-number">15</span>);    <span class="hljs-comment">// SyntaxError: parameter after rest parameter </span></code></pre>
<h4>浏览器对Rest参数的支持情况 <a>Link</a>
</h4>
<p>桌面浏览器：<br><span class="img-wrap"><img data-src="/img/remote/1460000006063497" src="https://static.alili.tech/img/remote/1460000006063497" alt="" title="" style="cursor: pointer;"></span></p>
<p>移动端浏览器：<br><span class="img-wrap"><img data-src="/img/remote/1460000006063499" src="https://static.alili.tech/img/remote/1460000006063499" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader3">默认参数 <a>Link</a>
</h3>
<h4>ES5 默认参数 <a>Link</a>
</h4>
<p>在ES5中，JS 并不支持默认参数, 但是，我们也有一种变通的方案，那就是在函数中使用 <code>OR</code> 操作符（ <code>|| </code>）。我们简单地模仿ES5中的默认参数，请看下面函数：</p>
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
foo();    // 10 10 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs powershell"><code><span class="hljs-keyword">function</span> foo(<span class="hljs-keyword">param</span>1, <span class="hljs-keyword">param</span>2) {
   <span class="hljs-keyword">param</span>1 = <span class="hljs-keyword">param</span>1 || <span class="hljs-number">10</span>;
   <span class="hljs-keyword">param</span>2 = <span class="hljs-keyword">param</span>2 || <span class="hljs-number">10</span>;
   console.log(<span class="hljs-keyword">param</span>1, <span class="hljs-keyword">param</span>2);
}
foo(<span class="hljs-number">5</span>, <span class="hljs-number">5</span>);  // <span class="hljs-number">5</span> <span class="hljs-number">5</span>
foo(<span class="hljs-number">5</span>);    // <span class="hljs-number">5</span> <span class="hljs-number">10</span>
foo();    // <span class="hljs-number">10</span> <span class="hljs-number">10</span> </code></pre>
<p>该函数预期传入两个参数，但如果在调用该函数时，没有传入实参，则它会用默认值。在函数体内，如果没有传入实际参数，则会被自动设为 undefined, 所以，我们可以检测这些参数，并且声明他们的默认值。我们可以使用 <code>OR</code> 操作符（<code>||</code>）来检测是否有传入实际参数，并且设定他们的默认值。<code>OR</code> 操作符会检测它的第一个参数，如果有<a href="https://developer.mozilla.org/en-US/docs/Glossary/Truthy" rel="nofollow noreferrer" target="_blank">实际值</a><a>2</a>，则用第一个，如果没有，则用它的第二个参数。</p>
<p>这种方法在函数中普遍使用，但它有一个瑕疵，那就是传入 <code>0</code> 或者 <code>null</code> 也会触发默认值，因为 <code>0</code> 和 <code>null</code> 都被认为是false. 所以，如果我们需要给函数传入 <code>0</code> 和 <code>null</code> 时，我们需要另一种方式去检测这个参数是否缺失：</p>
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
foo();    // 10, 10 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">param1, param2</span>) </span>{
  <span class="hljs-keyword">if</span>(param1 === <span class="hljs-literal">undefined</span>){
    param1 = <span class="hljs-number">10</span>;
  }
  <span class="hljs-keyword">if</span>(param2 === <span class="hljs-literal">undefined</span>){
    param2 = <span class="hljs-number">10</span>;
  }
  <span class="hljs-built_in">console</span>.log(param1, param2);
}
foo(<span class="hljs-number">0</span>, <span class="hljs-literal">null</span>);    <span class="hljs-comment">// 0, null</span>
foo();    <span class="hljs-comment">// 10, 10 </span></code></pre>
<p>在上面这个函数中，只有当所传的参数全等于 undefined 时，才会使用默认值。这种方式需要用到的代码稍微多点，但是安全度更高，我们可以给函数传入 <code>0</code> 和 <code>null</code> 。</p>
<h4>ES6 默认参数 <a>Link</a>
</h4>
<p>有了ES6,我们不需要再去检测哪些值为undefined并且给它们设定默认值了。现在我们可以直接在函数声明中放置默认值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(a = 10, b = 10) {
  console.log(a, b);
}
foo(5);    // 5 10
foo(0, null);    // 0 null " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">(a = 10, b = 10)</span> <span class="hljs-comment">{
  console.log(a, b);
}</span>
<span class="hljs-title">foo</span><span class="hljs-params">(5)</span>;</span>    <span class="hljs-comment">// 5 10</span>
foo(<span class="hljs-number">0</span>, null);    <span class="hljs-comment">// 0 null </span></code></pre>
<p>如你所见，省略一个参数，就会触发一个默认值，但是传入 <code>0</code> 或者 <code>null</code> 时，则不会。 我们甚至可以使用函数去找回默认参数的值：</p>
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
multiply(2);     // 6 (also displays an alert dialog) " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getParam</span><span class="hljs-params">()</span> </span>{
    alert(<span class="hljs-string">"getParam was called"</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-number">3</span>;
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">multiply</span><span class="hljs-params">(param1, param2 = getParam<span class="hljs-params">()</span>)</span> </span>{
    <span class="hljs-keyword">return</span> param1 * param2;
}
multiply(<span class="hljs-number">2</span>, <span class="hljs-number">5</span>);     <span class="hljs-comment">// 10</span>
multiply(<span class="hljs-number">2</span>);     <span class="hljs-comment">// 6 (also displays an alert dialog) </span></code></pre>
<p>注意 <code>getParam</code> 这个函数只有在第二个参数省略时才会被调用。所以当我们给 <code>multiply</code> 传入两个参数并调用它时，alert是不会出现的。</p>
<p>默认参数还有一个有趣的特性，那就是我们可以在函数声明中指定其它参数和变量的值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function myFunction(a=10, b=a) {
     console.log('a = ' + a + '; b = '  + b);
}
myFunction();     // a=10; b=10
myFunction(22);    // a=22; b=22
myFunction(2, 4);    // a=2; b=4 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">function</span> <span class="hljs-selector-tag">myFunction</span>(a=<span class="hljs-number">10</span>, b=a) {
     <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">'a = '</span> + a + <span class="hljs-string">'; b = '</span>  + b);
}
<span class="hljs-selector-tag">myFunction</span>();     <span class="hljs-comment">// a=10; b=10</span>
<span class="hljs-selector-tag">myFunction</span>(<span class="hljs-number">22</span>);    <span class="hljs-comment">// a=22; b=22</span>
<span class="hljs-selector-tag">myFunction</span>(<span class="hljs-number">2</span>, <span class="hljs-number">4</span>);    <span class="hljs-comment">// a=2; b=4 </span></code></pre>
<p>你甚至可以在函数声明中做运算：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function myFunction(a, b = ++a, c = a*b) {
     console.log(c);
}
myFunction(5);    // 36 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myFunction</span><span class="hljs-params">(a, b = ++a, c = a*b)</span> <span class="hljs-comment">{
     console.log(c);
}</span>
<span class="hljs-title">myFunction</span><span class="hljs-params">(5)</span>;</span>    <span class="hljs-comment">// 36 </span></code></pre>
<p>请注意，JavaScript 和其它语言不同， 它是在函数被调用时，才去求参数的默认值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(value, array = []) {
  array.push(value);
  return array;
}
add(5);    // [5]
add(6);    // [6], not [5, 6] " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code>function add(value,<span class="hljs-built_in"> array </span>= []) {
  array.push(value);
 <span class="hljs-built_in"> return </span>array;
}
add(5);    // [5]
add(6);    // [6],<span class="hljs-built_in"> not </span>[5, 6] </code></pre>
<h4>浏览器对默认参数的支持情况 <a>Link</a>
</h4>
<p>桌面浏览器：<br><span class="img-wrap"><img data-src="/img/remote/1460000006063501" src="https://static.alili.tech/img/remote/1460000006063501" alt="" title="" style="cursor: pointer;"></span></p>
<p>移动端浏览器：<br><span class="img-wrap"><img data-src="/img/remote/1460000006063512" src="https://static.alili.tech/img/remote/1460000006063512" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">解构赋值 <a>Link</a>
</h3>
<p>解构赋值是ES6的新特性。我们可以从数组和对象中提取值，对变量进行赋值。这种语法清晰且易于理解，尤其是在给函数传参时特别有用。</p>
<p>在ES5里面，我们经常用一个配置对象来处理大量的可选参数， 特别是当对象属性的顺序可变时：</p>
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
initiateTransfer(options); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code>function initiateTransfer(<span class="hljs-keyword">options</span>) {
    var  protocol = <span class="hljs-keyword">options</span>.protocol,
        port = <span class="hljs-keyword">options</span>.port,
        delay = <span class="hljs-keyword">options</span>.delay,
        retries = <span class="hljs-keyword">options</span>.retries,
        timeout = <span class="hljs-keyword">options</span>.timeout,
        log = <span class="hljs-keyword">options</span>.log;
    <span class="hljs-comment">// code to initiate transfer</span>
}
<span class="hljs-keyword">options</span> = {
  protocol: <span class="hljs-string">'http'</span>,
  port: <span class="hljs-number">800</span>,
  delay: <span class="hljs-number">150</span>,
  retries: <span class="hljs-number">10</span>,
  timeout: <span class="hljs-number">500</span>,
  log: <span class="hljs-keyword">true</span>
};
initiateTransfer(<span class="hljs-keyword">options</span>); </code></pre>
<p>这种方式实现起来很好，已经被许多JS开发者所采用。 只是我们必须看函数内部，才知道函数预期需要哪些参数。结合解构赋值，我们就可以在函数声明中清晰地表示这些参数：</p>
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
initiateTransfer(options); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">function</span> <span class="hljs-selector-tag">initiateTransfer</span>({<span class="hljs-selector-tag">protocol</span>, <span class="hljs-selector-tag">port</span>, <span class="hljs-selector-tag">delay</span>, <span class="hljs-selector-tag">retries</span>, <span class="hljs-selector-tag">timeout</span>, <span class="hljs-selector-tag">log</span>}) {
     <span class="hljs-comment">// code to initiate transfer</span>
};
var options = {
  <span class="hljs-attribute">protocol</span>: <span class="hljs-string">'http'</span>,
  <span class="hljs-attribute">port</span>: <span class="hljs-number">800</span>,
  <span class="hljs-attribute">delay</span>: <span class="hljs-number">150</span>,
  <span class="hljs-attribute">retries</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attribute">timeout</span>: <span class="hljs-number">500</span>,
  <span class="hljs-attribute">log</span>: true
}
<span class="hljs-selector-tag">initiateTransfer</span>(options); </code></pre>
<p>在该函数中，我们没有传入一个配置对象，而是以对象解构赋值的方式，给它传参数。这样做不仅使这个函数更加简明，可读性也更高。</p>
<p>我们也可以把解构赋值传参和其它规则的参数一起使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function initiateTransfer(param1, {protocol, port, delay, retries, timeout, log}) {
     // code to initiate transfer
}
initiateTransfer('some value', options); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initiateTransfer</span><span class="hljs-params">(param1, {protocol, port, delay, retries, timeout, log})</span> </span>{
     <span class="hljs-comment">// code to initiate transfer</span>
}
initiateTransfer(<span class="hljs-string">'some value'</span>, options); </code></pre>
<p>注意如果函数调用时，参数被省略掉，则会抛出错误，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function initiateTransfer({protocol, port, delay, retries, timeout, log}) {
     // code to initiate transfer
}
initiateTransfer();  // TypeError: Cannot match against 'undefined' or 'null' " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code><span class="hljs-keyword">function</span> <span class="hljs-title">initiateTransfer</span>({protocol, port, delay, retries, timeout, log}) {
     // code to initiate transfer
}
initiateTransfer();  // TypeError: Cannot match against <span class="hljs-symbol">'undefined</span>' <span class="hljs-keyword">or</span> <span class="hljs-symbol">'null</span>' </code></pre>
<p>当我们需要让参数都是必填时，这种方法能够得到我们想要的结果，但如果我们希望参数是可选的时候呢？想要让参数缺失时不会报错，我们就需要给默认参数设定一个默认值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function initiateTransfer({protocol, port, delay, retries, timeout, log} = {}) {
     // code to initiate transfer
}
initiateTransfer();    // no error " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initiateTransfer</span><span class="hljs-params">({protocol, port, delay, retries, timeout, log} = {})</span> </span>{
     <span class="hljs-comment">// code to initiate transfer</span>
}
initiateTransfer();    <span class="hljs-comment">// no error </span></code></pre>
<p>上面这个函数中，需要解构赋值的参数有了一个默认值，这个默认值就是一个空对象。这时候，函数被调用时，即使没有传入参数，也不会报错了。</p>
<p>我们也可以给每个被解构的参数设定默认值，如下：</p>
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
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code>function initiateTransfer({
    <span class="hljs-attr">protocol</span> = 'http',
    <span class="hljs-attr">port</span> = <span class="hljs-number">800</span>,
    <span class="hljs-attr">delay</span> = <span class="hljs-number">150</span>,
    <span class="hljs-attr">retries</span> = <span class="hljs-number">10</span>,
    <span class="hljs-attr">timeout</span> = <span class="hljs-number">500</span>,
    <span class="hljs-attr">log</span> = <span class="hljs-literal">true</span>
}) {
     // code to initiate transfer
} </code></pre>
<p>在这个例子中，每个属性都有一个默认值，我们不需要手动去检查哪个参数值是 <code>undefined</code> ，然后在函数中给它设定默认值了。</p>
<h4>浏览器对解构赋值的支持情况 <a>Link</a>
</h4>
<p>桌面浏览器：<br><span class="img-wrap"><img data-src="/img/remote/1460000006063546" src="https://static.alili.tech/img/remote/1460000006063546" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>移动端浏览器：<br><span class="img-wrap"><img data-src="/img/remote/1460000006063544" src="https://static.alili.tech/img/remote/1460000006063544" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader5">参数传递 <a>Link</a>
</h3>
<p>参数能通过<code>引用</code>或<code>值</code>传递给函数。修改按引用传递的参数，一般反映在全局中，而修改按值传递的参数，则只是反映在函数内部。</p>
<p>在像 <code>Visual Basic</code> 和 <code>PowerShell</code> 这样的语言中，我们可以选择是按引用还是按值来传递参数，但是在 <code>JavaScript</code> 中则不行。</p>
<h4>按值传递参数 <a>Link</a>
</h4>
<p>从技术上来讲，JavaScript 只允许按值传参。当我们给函数按值传递一个参数时，该函数的作用域内就已经复制了这个值。因此，这个值的改变，只会在函数内部反映出来。请思考下面这个列子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 5;
function increment(a) {
    a = ++a;
    console.log(a);
}
increment(a);   // 6
console.log(a);    // 5 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">var</span> a = <span class="hljs-number">5</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">increment</span><span class="hljs-params">(a)</span> <span class="hljs-comment">{
    a = ++a;
    console.log(a);
}</span>
<span class="hljs-title">increment</span><span class="hljs-params">(a)</span>;</span>   <span class="hljs-comment">// 6</span>
console.log(a);    <span class="hljs-comment">// 5 </span></code></pre>
<p>这里，修改函数里面的参数 <code>a = ++a</code>，是不会影响到原来<code>a</code>的值。 所以在函数外面打印 a 的值，输出仍然是 <code>5</code>。</p>
<h4>按引用传递参数 <a>Link</a>
</h4>
<p>在JavaScript中，一切都是按值传递的。但当我们给函数传一个变量，而这个变量所指向的是一个对象（包括数组）时，这个 <code>变量</code> 就是对象的一个引用。通过这个变量来改变对象的属性值，是会从根本上改变这个对象的。</p>
<p>来看下面这个例子：</p>
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
console.log(obj.bar);   // new value " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code>function foo(param){
    param.<span class="hljs-built_in">bar</span> = '<span class="hljs-keyword">new</span> value';
}
obj = {
    <span class="hljs-built_in">bar</span> : 'value'
}
console.<span class="hljs-built_in">log</span>(obj.<span class="hljs-built_in">bar</span>);   <span class="hljs-comment">// value</span>
foo(obj);
console.<span class="hljs-built_in">log</span>(obj.<span class="hljs-built_in">bar</span>);   <span class="hljs-comment">// new value </span></code></pre>
<p>如你所见，对象的属性值在函数内部被修改了，被修改的值在函数外面也是可见的。</p>
<p>当我们传递一个没有初始值的参数时，如数组或对象，会隐形地创建了一个变量，这个变量指向记忆中原对象所在的位置。这个变量随后被传递给了函数，在函数内部对这个变量进行修改将会影响到原对象。</p>
<h3 id="articleHeader6">参数类型检测、参数缺失或参数多余 <a>Link</a>
</h3>
<p>在强类型语言中，我们必须在函数声明中明确参数的类型，但是 JavaScript 没有这种特性。在JavaScript中，我们传递给函数的参数个数不限，也可以是任何类型的数据。</p>
<p>假设现在有一个函数，这个函数只接受一个参数。但是当函数被调用时，它本身没有限制传入的参数只能是一个，我们可以随意地传入一个、两个、甚至是更多。我们也可以什么都不传，这样都不会报错。</p>
<p>形参（<code>arguments</code>）和 实参（<code>parameters</code>）的个数不同有两种情况：</p>
<ul><li><p><strong>实参少于形参</strong></p></li></ul>
<p>缺失的参数都会等同于 <code>undefined</code>。</p>
<ul><li><p><strong>实参多于形参</strong></p></li></ul>
<p>多余的参数都将被忽略，但它们会以数组的形式保存于变量 <code>arguments</code> 中（下文会讨论到）。</p>
<h3 id="articleHeader7">必填参数 <a>Link</a>
</h3>
<p>如果一个参数在函数调用时缺失了，它将被设为 <code>undefined</code>。基于这一点，我们可以在参数缺失时抛出一个错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(mandatory, optional) {
    if (mandatory === undefined) {
        throw new Error('Missing parameter: mandatory');
    }
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">mandatory, optional</span>) </span>{
    <span class="hljs-keyword">if</span> (mandatory === <span class="hljs-literal">undefined</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Missing parameter: mandatory'</span>);
    }
} </code></pre>
<p>在 ES6 中，我们可以更好地利用这个特性，使用默认参数来设定必填参数：</p>
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
foo(10);   // Error: missing parameter " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">throwError</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Missing parameter'</span>);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">param1 = throwError(</span>), <span class="hljs-title">param2</span> = <span class="hljs-title">throwError</span>(<span class="hljs-params"></span>)) </span>{
    <span class="hljs-comment">// do something</span>
}
foo(<span class="hljs-number">10</span>, <span class="hljs-number">20</span>);    <span class="hljs-comment">// ok</span>
foo(<span class="hljs-number">10</span>);   <span class="hljs-comment">// Error: missing parameter </span></code></pre>
<h3 id="articleHeader8">参数对象 <a>Link</a>
</h3>
<p>为了取代参数对象，rest参数在 ECMAScript 4 中就已经得到支持，但是 ECMAScript 4 没有落实。随着 ECMAScript 6 版本的发布，JS 正式支持rest参数。它也拟定计划，准备<code>抛弃</code> 对参数对象 <code>arguments object</code> 的支持。</p>
<p>参数对象是一个类数组对象，可在一切函数内使用。它允许通过数字而不是名称，来找回被传递给函数的参数值。这个对象使得我们可以给函数传递任何参数。思考以下代码段：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function checkParams(param1) {
    console.log(param1);    // 2
    console.log(arguments[0], arguments[1]);    // 2 3
    console.log(param1 + arguments[0]);    // 2 + 2
}
checkParams(2, 3); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkParams</span>(<span class="hljs-params">param1</span>) </span>{
    <span class="hljs-built_in">console</span>.log(param1);    <span class="hljs-comment">// 2</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>], <span class="hljs-built_in">arguments</span>[<span class="hljs-number">1</span>]);    <span class="hljs-comment">// 2 3</span>
    <span class="hljs-built_in">console</span>.log(param1 + <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>]);    <span class="hljs-comment">// 2 + 2</span>
}
checkParams(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>); </code></pre>
<p>该函数预期接收一个参数。但是当我们给它传入两个参数并且调用它时，第一个参数通过名为 <code>param1</code> 的形参或者参数对象 <code>arguments[0]</code> 被函数所接受，而第二个参数只能被放在<code>argument[1]</code> 里面。此外，请注意，参数对象可以与命名参数一起使用。</p>
<p>参数对象给每个被传递给函数的参数提供了一个入口，并且第一个入口的下标从 <code>0</code> 开始。如果我们要给上面这个函数传递更多的参数，我们可以写 <code>arguments[2]</code>,<code>arguments[3]</code> 等等。</p>
<p>我们甚至可以跳过设定命名参数这一步，直接使用参数对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function checkParams() {
    console.log(arguments[1], arguments[0], arguments[2]);
}
checkParams(2, 4, 6);  // 4 2 6 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkParams</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">arguments</span>[<span class="hljs-number">1</span>], <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>], <span class="hljs-built_in">arguments</span>[<span class="hljs-number">2</span>]);
}
checkParams(<span class="hljs-number">2</span>, <span class="hljs-number">4</span>, <span class="hljs-number">6</span>);  <span class="hljs-comment">// 4 2 6 </span></code></pre>
<p>事实上，命名参数只是为了方便使用，并不是必须的。类似地，rest参数也可用于反映被传递的参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function checkParams(...params) {
    console.log(params[1], params[0], params[2]);    // 4 2 6
    console.log(arguments[1], arguments[0], arguments[2]);    // 4 2 6
}
checkParams(2, 4, 6); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkParams</span><span class="hljs-params">(<span class="hljs-rest_arg">...params</span>)</span> </span>{
    console.log(params[<span class="hljs-number">1</span>], params[<span class="hljs-number">0</span>], params[<span class="hljs-number">2</span>]);    <span class="hljs-comment">// 4 2 6</span>
    console.log(arguments[<span class="hljs-number">1</span>], arguments[<span class="hljs-number">0</span>], arguments[<span class="hljs-number">2</span>]);    <span class="hljs-comment">// 4 2 6</span>
}
checkParams(<span class="hljs-number">2</span>, <span class="hljs-number">4</span>, <span class="hljs-number">6</span>); </code></pre>
<p>参数对象是一个类数组的对象，只是它没有数组本身具备的方法，如<code>slice()</code> 和 <code>foreach()</code>。 如果要在参数对象中使用数组的方法，首先要把它转换成一个真正的数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sort() {
    var a = Array.prototype.slice.call(arguments);
    return a.sort();
}
sort(40, 20, 50, 30);    // [20, 30, 40, 50] " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sort</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> a = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>);
    <span class="hljs-keyword">return</span> a.sort();
}
sort(<span class="hljs-number">40</span>, <span class="hljs-number">20</span>, <span class="hljs-number">50</span>, <span class="hljs-number">30</span>);    <span class="hljs-comment">// [20, 30, 40, 50] </span></code></pre>
<p>在该函数中，采用了 <code>Array.prototype.slice.call()</code> 来快速地把参数对象转换成一个数组。接着，在 <code>sort()</code> 方法中，为这个数组排序并且把它返回。</p>
<p>ES6 新增了更直接的方法，用 <code>Array.from()</code> 把任何类数组对象转换成数组：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sort() {
    var a = Array.from(arguments);
    return a.sort();
}
sort(40, 20, 50, 30);    // [20, 30, 40, 50] " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sort</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> a = <span class="hljs-built_in">Array</span>.from(<span class="hljs-built_in">arguments</span>);
    <span class="hljs-keyword">return</span> a.sort();
}
sort(<span class="hljs-number">40</span>, <span class="hljs-number">20</span>, <span class="hljs-number">50</span>, <span class="hljs-number">30</span>);    <span class="hljs-comment">// [20, 30, 40, 50] </span></code></pre>
<h3 id="articleHeader9">长度属性 <a>Link</a>
</h3>
<p>尽管参数对象从技术上来讲，不算是一个数组，但仍有一个长度属性，来检测传递给函数的参数个数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function countArguments() {
    console.log(arguments.length);
}
countArguments();    // 0
countArguments(10, null, &quot;string&quot;);    // 3 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">countArguments</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">arguments</span>.length);
}
countArguments();    <span class="hljs-comment">// 0</span>
countArguments(<span class="hljs-number">10</span>, <span class="hljs-literal">null</span>, <span class="hljs-string">"string"</span>);    <span class="hljs-comment">// 3 </span></code></pre>
<p>通过 <code>length</code> 属性，我们可以更好地控制传递给函数的参数个数。举个例子，如果一个函数只要求两个参数，那么我们就可以使用 <code>length</code> 属性来检测所传入的参数个数，如果少于要求的个数，则抛出错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(param1, param2) {
    if (arguments.length < 2) {
        throw new Error(&quot;This function expects at least two arguments&quot;);
    } else if (arguments.length === 2) {
        // do something
    }
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">param1, param2</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">arguments</span>.length &lt; <span class="hljs-number">2</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"This function expects at least two arguments"</span>);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-built_in">arguments</span>.length === <span class="hljs-number">2</span>) {
        <span class="hljs-comment">// do something</span>
    }
} </code></pre>
<p>rest参数是数组，所以他们都有 <code>length</code> 属性。 所以上面的代码，在ES6里面可以用rest参数写成下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(...params) {
  if (params.length < 2) {
        throw new Error(&quot;This function expects at least two arguments&quot;);
    } else if (params.length === 2) {
        // do something
    }
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">(<span class="hljs-rest_arg">...params</span>)</span> </span>{
  <span class="hljs-keyword">if</span> (params.length &lt; <span class="hljs-number">2</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> Error(<span class="hljs-string">"This function expects at least two arguments"</span>);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (params.length === <span class="hljs-number">2</span>) {
        <span class="hljs-comment">// do something</span>
    }
} </code></pre>
<h3 id="articleHeader10">被调用属性与调用属性 <a>Link</a>
</h3>
<p><code>被调用</code> 属性指向当前正在执行的函数，而 <code>调用</code> 属性则指向那个调用了 <code>当前正在执行的函数</code> 的函数。 在ES5的严格模式下，这些属性是不被支持的，如果尝试使用它们，则会报错。</p>
<p><code>arguments.callee</code> 这个属性在递归函数中很有用，尤其在匿名函数中。因为匿名函数没有名称，只能通过 <code>arguments.callee</code> 来指向它。</p>
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
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> result = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">n</span>) </span>{
  <span class="hljs-keyword">if</span> (n &lt;= <span class="hljs-number">1</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> n * <span class="hljs-built_in">arguments</span>.callee(n - <span class="hljs-number">1</span>);
  }
})(<span class="hljs-number">4</span>);   <span class="hljs-comment">// 24</span></code></pre>
<h3 id="articleHeader11">严格模式和非严格模式下的参数对象 <a>Link</a>
</h3>
<p>在ES5非严格模式下，<code>参数对象</code> 有个不一般的特性：它能使 <code>自身的值</code> 跟 <code>与之相对应的命名参数的值 </code> 保持同步。</p>
<p>请看下面这个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(param) {
   console.log(param === arguments[0]);    // true
   arguments[0] = 500;
   console.log(param === arguments[0]);    // true
   return param
}
foo(200);    // 500 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">param</span>) </span>{
   <span class="hljs-built_in">console</span>.log(param === <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>]);    <span class="hljs-comment">// true</span>
   <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>] = <span class="hljs-number">500</span>;
   <span class="hljs-built_in">console</span>.log(param === <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>]);    <span class="hljs-comment">// true</span>
   <span class="hljs-keyword">return</span> param
}
foo(<span class="hljs-number">200</span>);    <span class="hljs-comment">// 500 </span></code></pre>
<p>在这个函数里面，<code>arguments[0]</code> 被重新赋值为 <code>500</code>。由于 <code>arguments</code> 的值总是和对应的命名参数保持同步，所以改变了<code>arguments[0]</code> 的值，也就相应的改变了 <code>param</code> 的值。实际上，他们就像是同一个变量，拥有两个不同的名字而已。而在 <code>ES5严格模式</code>下，参数对象的这种特性则被移除了。</p>
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
foo(200);   // 200 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">"use strict"</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">param</span>) </span>{
   <span class="hljs-built_in">console</span>.log(param === <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>]);    <span class="hljs-comment">// true</span>
   <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>] = <span class="hljs-number">500</span>;
   <span class="hljs-built_in">console</span>.log(param === <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>]);    <span class="hljs-comment">// false</span>
   <span class="hljs-keyword">return</span> param
}
foo(<span class="hljs-number">200</span>);   <span class="hljs-comment">// 200 </span></code></pre>
<p>加上 <code>严格模式</code>， 现在改变 <code>arguments[0]</code> 的值是不会影响到 <code>param</code> 的值了，打印出来的值也跟预期的一致。 在 <code>ES6</code>中 该函数的输出跟在 <code>ES5</code> 严格模式下是一样的。需要记住的是，当函数声明中使用了默认值时，参数对象是不会受到影响的：</p>
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
foo('string1', 'string2'); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">param1, param2 = <span class="hljs-number">10</span>, param3 = <span class="hljs-number">20</span></span>) </span>{
   <span class="hljs-built_in">console</span>.log(param1 === <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>]);    <span class="hljs-comment">// true</span>
   <span class="hljs-built_in">console</span>.log(param2 === <span class="hljs-built_in">arguments</span>[<span class="hljs-number">1</span>]);    <span class="hljs-comment">// true</span>
   <span class="hljs-built_in">console</span>.log(param3 === <span class="hljs-built_in">arguments</span>[<span class="hljs-number">2</span>]);    <span class="hljs-comment">// false</span>
   <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">arguments</span>[<span class="hljs-number">2</span>]);    <span class="hljs-comment">// undefined</span>
   <span class="hljs-built_in">console</span>.log(param3);    <span class="hljs-comment">// 20</span>
}
foo(<span class="hljs-string">'string1'</span>, <span class="hljs-string">'string2'</span>); </code></pre>
<p>在这个函数中，尽管 <code>param3</code> 有默认值 <code>20</code>，但是 <code>arguments[2]</code> 仍然是 <code>undefined</code>, 因为函数调用时只传了两个值。换言之，设定默认值对参数对象是没有任何影响的。</p>
<h3 id="articleHeader12">总结 <a>Link</a>
</h3>
<p>ES6 给 JS 带来了上百个大大小小的改进。 越来越多的开发者正使用ES6的新特性, 所以我们都需要去了解它们。在本教程中，我们学习了ES6是如何改善JS的参数处理的，但我们仍只是知晓了ES6的皮毛。更多新的、有趣的特性值得我们去探讨。</p>
<h4>参考链接 <a>Link</a>
</h4>
<ul>
<li><p><a href="https://kangax.github.io/compat-table/es6/" rel="nofollow noreferrer" target="_blank">ECMAScript 6 Compatibility Table</a><a>3</a>, Juriy Zaytsev</p></li>
<li><p><a href="http://www.ecma-international.org/ecma-262/6.0/" rel="nofollow noreferrer" target="_blank">ECMAScript 2015 Language Specification</a><a>4</a>, ECMA International</p></li>
</ul>
<p><em>(rb, ml, al, il)</em></p>
<p><em>Front page image credits: <a href="https://www.youtube.com/channel/UCzVnCG4ItKitN1SCBM7-AbA" rel="nofollow noreferrer" target="_blank">JavaScript Planet</a><a>5</a>.</em></p>
<h4>脚注 <a>Link</a>
</h4>
<ol>
<li><p><a>1 https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments</a></p></li>
<li><p><a>2 https://developer.mozilla.org/en-US/docs/Glossary/Truthy</a></p></li>
<li><p><a>3 https://kangax.github.io/compat-table/es6/</a></p></li>
<li><p><a>4 http://www.ecma-international.org/ecma-262/6.0/</a></p></li>
<li><p><a>5 https://www.youtube.com/channel/UCzVnCG4ItKitN1SCBM7-AbA</a></p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译] ES6 中 Arguments 和 Parameters 用法解析

## 原文链接
[https://segmentfault.com/a/1190000006057291](https://segmentfault.com/a/1190000006057291)

