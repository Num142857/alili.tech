---
title: '19+ 个 JavaScript 快速编程技巧 — SitePoint' 
date: 2019-01-08 2:30:11
hidden: true
slug: 5rx8zm0bjxg
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">19+ 个 JavaScript 快速编程技巧 — SitePoint</h2>
<p>这确实是一篇针对于基于 JavaScript 语言编程的开发者必读的文章。在过去几年我学习 JavaScript 的时候，我写下了这篇文章，并将其作为 JavaScript 快速编程技巧的一个重要参考。为了有助于理解，针对常规写法我也给出了相关的编程观点。</p>
<blockquote><p>2017 年 6 月 14 日：这篇文章更新了一些基于 ES6 的速记写法。如果你想进一步了解 ES6 中有哪些新增的变化，可以注册 SitePoint Premium 并查看我们录制的视频 <a href="https://www.sitepoint.com/premium/screencasts/a-look-into-es2016" rel="nofollow noreferrer" target="_blank">A Look into ES6</a>.</p></blockquote>
<h3 id="articleHeader1">1. 三元操作符</h3>
<p>如果你想只用一行代码写出一个 if..else 表达式，那么这是一个很好的节省代码的方式。</p>
<p>常规写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const x = 20;
let answer;
if (x > 10) {
    answer = 'is greater';
} else {
    answer = 'is lesser';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> x = <span class="hljs-number">20</span>;
<span class="hljs-keyword">let</span> answer;
<span class="hljs-keyword">if</span> (x &gt; <span class="hljs-number">10</span>) {
    answer = <span class="hljs-string">'is greater'</span>;
} <span class="hljs-keyword">else</span> {
    answer = <span class="hljs-string">'is lesser'</span>;
}</code></pre>
<p>速记法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const answer = x > 10 ? 'is greater' : 'is lesser';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> answer = x &gt; <span class="hljs-number">10</span> ? <span class="hljs-string">'is greater'</span> : <span class="hljs-string">'is lesser'</span>;</code></pre>
<p>你也可以像这样嵌套 if 表达式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const big = x > 10 ? &quot; greater 10&quot; : x" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> big = x &gt; <span class="hljs-number">10</span> ? <span class="hljs-string">" greater 10"</span> : x</code></pre>
<h3 id="articleHeader2">2. 短路求值速记法</h3>
<p>当需要给另一个变量分配一个变量时，你可能需要确保变量不是 null、undefined 或者不为空。你可以写一个有多个 if 表达式的语句，你也可以使用短路求值。</p>
<p>常规写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (variable1 !== null || variable1 !== undefined || variable1 !== '') {
     let variable2 = variable1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (variable1 !== <span class="hljs-literal">null</span> || variable1 !== <span class="hljs-literal">undefined</span> || variable1 !== <span class="hljs-string">''</span>) {
     <span class="hljs-keyword">let</span> variable2 = variable1;
}</code></pre>
<p>速记法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const variable2 = variable1  || 'new';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> variable2 = variable1  || <span class="hljs-string">'new'</span>;</code></pre>
<p>你不相信这样可以 work？那就自己测试下吧（把下面的代码复制粘贴到 <a href="https://es6console.com/" rel="nofollow noreferrer" target="_blank">es6console</a>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let variable1;
let variable2 = variable1  || '';
console.log(variable2 === ''); // prints true

variable1 = 'foo';
variable2 = variable1  || '';
console.log(variable2); // prints foo" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> variable1;
<span class="hljs-keyword">let</span> variable2 = variable1  || <span class="hljs-string">''</span>;
<span class="hljs-built_in">console</span>.log(variable2 === <span class="hljs-string">''</span>); <span class="hljs-comment">// prints true</span>

variable1 = <span class="hljs-string">'foo'</span>;
variable2 = variable1  || <span class="hljs-string">''</span>;
<span class="hljs-built_in">console</span>.log(variable2); <span class="hljs-comment">// prints foo</span></code></pre>
<h3 id="articleHeader3">3. 变量声明速记法</h3>
<p>在函数里声明变量时，如果需要同时声明多个变量，这种速记法能够给你节省大量的时间和空间。</p>
<p>常规写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let x;
let y;
let z = 3;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> x;
<span class="hljs-keyword">let</span> y;
<span class="hljs-keyword">let</span> z = <span class="hljs-number">3</span>;</code></pre>
<p>速记法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let x, y, z=3;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> x, y, z=<span class="hljs-number">3</span>;</code></pre>
<h3 id="articleHeader4">4. If 判断变量是否存在速记法</h3>
<p>这可能会有些琐碎，但是值得一提。当需要用 if 判断一个变量是否为真时，赋值运算符有时候可以省略。</p>
<p>常规写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (likeJavaScript === true)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">if</span> (likeJavaScript === <span class="hljs-literal">true</span>)</code></pre>
<p>速记法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (likeJavaScript)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">if</span> (likeJavaScript)</code></pre>
<blockquote><p>注意：这两个例子并不是完全相等，只要 likeJavaScript 变量是一个 <a href="https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy" rel="nofollow noreferrer" target="_blank">真值</a>，该表达式就是成立的。</p></blockquote>
<p>再给出一个例子。如果 "a" 不等于 true，如下：</p>
<p>常规写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a;
if ( a !== true ) {
// do something...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> a;
<span class="hljs-keyword">if</span> ( a !== <span class="hljs-literal">true</span> ) {
<span class="hljs-comment">// do something...</span>
}</code></pre>
<p>速记法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a;
if ( !a ) {
// do something...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> a;
<span class="hljs-keyword">if</span> ( !a ) {
<span class="hljs-comment">// do something...</span>
}</code></pre>
<h3 id="articleHeader5">5. JavaScript 循环速记法</h3>
<p>如果你只想跑原生 JavaScript，不想依赖如 JQuery 或 lodash 这样的外部库，那这个小技巧会非常有用。</p>
<p>常规写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let i = 0; i < allImgs.length; i++)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs matlab"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">for</span> (let <span class="hljs-built_in">i</span> = <span class="hljs-number">0</span>; <span class="hljs-built_in">i</span> &lt; allImgs.<span class="hljs-built_in">length</span>; <span class="hljs-built_in">i</span>++)</code></pre>
<p>速记法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let index in allImgs)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> index <span class="hljs-keyword">in</span> allImgs)</code></pre>
<p>Array.forEach 速记法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function logArrayElements(element, index, array) {
  console.log(&quot;a[&quot; + index + &quot;] = &quot; + element);
}
[2, 5, 9].forEach(logArrayElements);
// logs:
// a[0] = 2
// a[1] = 5
// a[2] = 9" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">logArrayElements</span>(<span class="hljs-params">element, index, array</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"a["</span> + index + <span class="hljs-string">"] = "</span> + element);
}
[<span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">9</span>].forEach(logArrayElements);
<span class="hljs-comment">// logs:</span>
<span class="hljs-comment">// a[0] = 2</span>
<span class="hljs-comment">// a[1] = 5</span>
<span class="hljs-comment">// a[2] = 9</span></code></pre>
<h3 id="articleHeader6">6. 短路求值</h3>
<p>如果我们不想为了只是判断一个变量是 null 或 undefined 就分配一个默认值而写六行代码，那么可以使用短路逻辑操作符完成同样的功能，而且只有一行代码。</p>
<p>常规写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let dbHost;
if (process.env.DB_HOST) {
  dbHost = process.env.DB_HOST;
} else {
  dbHost = 'localhost';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> dbHost;
<span class="hljs-keyword">if</span> (process.env.DB_HOST) {
  dbHost = process.env.DB_HOST;
} <span class="hljs-keyword">else</span> {
  dbHost = <span class="hljs-string">'localhost'</span>;
}</code></pre>
<p>速记法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const dbHost = process.env.DB_HOST || 'localhost';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> dbHost = process.env.DB_HOST || <span class="hljs-string">'localhost'</span>;</code></pre>
<h3 id="articleHeader7">7. 十进制基数指数</h3>
<p>你可能随处可见这种写法。这是一种比较 fancy 的写法，省去了后面的一堆零。举个栗子，1e7 就意味着 1 后面跟着 7 个零。这是十进制基数指数的一种写法（JavaScript 会按照浮点类型去解释），和 10,000,000 是相等的。</p>
<p>常规写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let i = 0; i < 10000; i++) {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10000</span>; i++) {}</code></pre>
<p>速记法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let i = 0; i < 1e7; i++) {}
// All the below will evaluate to true
1e0 === 1;
1e1 === 10;
1e2 === 100;
1e3 === 1000;
1e4 === 10000;
1e5 === 100000;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">1e7</span>; i++) {}
<span class="hljs-comment">// All the below will evaluate to true</span>
<span class="hljs-number">1e0</span> === <span class="hljs-number">1</span>;
<span class="hljs-number">1e1</span> === <span class="hljs-number">10</span>;
<span class="hljs-number">1e2</span> === <span class="hljs-number">100</span>;
<span class="hljs-number">1e3</span> === <span class="hljs-number">1000</span>;
<span class="hljs-number">1e4</span> === <span class="hljs-number">10000</span>;
<span class="hljs-number">1e5</span> === <span class="hljs-number">100000</span>;</code></pre>
<h3 id="articleHeader8">8. 对象属性速记法</h3>
<p>在 JavaScript 中定义对象字面量非常简单。ES6 提供了一个更简单的定义对象属性的方法。如果 name 和 key 名字相同，那么就可以直接使用如下速记法。</p>
<p>常规写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = { x:x, y:y };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> obj = { <span class="hljs-attr">x</span>:x, <span class="hljs-attr">y</span>:y };</code></pre>
<p>速记法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = { x, y };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> obj = { x, y };</code></pre>
<h3 id="articleHeader9">9. 箭头函数速记法</h3>
<p>经典的函数写法易于阅读，但是一旦将这样的函数放进回调中就会略显冗长，而且会造成一些困惑。</p>
<p>常规写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sayHello(name) {
  console.log('Hello', name);
}

setTimeout(function() {
  console.log('Loaded')
}, 2000);

list.forEach(function(item) {
  console.log(item);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayHello</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hello'</span>, name);
}

setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Loaded'</span>)
}, <span class="hljs-number">2000</span>);

list.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>) </span>{
  <span class="hljs-built_in">console</span>.log(item);
});</code></pre>
<p>速记法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sayHello = name => console.log('Hello', name);

setTimeout(() => console.log('Loaded'), 2000);

list.forEach(item => console.log(item));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">sayHello = <span class="hljs-function"><span class="hljs-params">name</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hello'</span>, name);

setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Loaded'</span>), <span class="hljs-number">2000</span>);

list.forEach(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(item));</code></pre>
<p>这里需要注意的是：this 值在箭头函数和常规写法的函数里是完全不同的，所以那两个例子并不是严格等价的。查看 <a href="https://www.sitepoint.com/es6-arrow-functions-new-fat-concise-syntax-javascript/" rel="nofollow noreferrer" target="_blank">this article on arrow function syntax</a>获取更多细节。</p>
<h3 id="articleHeader10">10. 隐性返回速记法</h3>
<p>我们经常使用 return 关键字来返回一个函数的结果。仅有一个表达式的箭头函数会隐性返回函数结果（函数必须省略大括号({})才能省略 return 关键字）。</p>
<p>如果要返回多行表达式（比如一个对象字面量），那么需要用 () 而不是 {} 来包裹函数体。这样可以确保代码作为一个单独的表达式被计算返回。</p>
<p>常规写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function calcCircumference(diameter) {
  return Math.PI * diameter
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">calcCircumference</span>(<span class="hljs-params">diameter</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.PI * diameter
}</code></pre>
<p>速记法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="calcCircumference = diameter => (
  Math.PI * diameter;
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">calcCircumference = <span class="hljs-function"><span class="hljs-params">diameter</span> =&gt;</span> (
  <span class="hljs-built_in">Math</span>.PI * diameter;
)</code></pre>
<h3 id="articleHeader11">11. 默认参数值</h3>
<p>你可以使用 if 表达式为函数参数定义默认值。在 ES6 中，你可以在函数声明的时候直接定义默认值。</p>
<p>常规写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function volume(l, w, h) {
  if (w === undefined)
    w = 3;
  if (h === undefined)
    h = 4;
  return l * w * h;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">volume</span>(<span class="hljs-params">l, w, h</span>) </span>{
  <span class="hljs-keyword">if</span> (w === <span class="hljs-literal">undefined</span>)
    w = <span class="hljs-number">3</span>;
  <span class="hljs-keyword">if</span> (h === <span class="hljs-literal">undefined</span>)
    h = <span class="hljs-number">4</span>;
  <span class="hljs-keyword">return</span> l * w * h;
}</code></pre>
<p>速记法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="volume = (l, w = 3, h = 4 ) => (l * w * h);

volume(2) //output: 24" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">volume = <span class="hljs-function">(<span class="hljs-params">l, w = <span class="hljs-number">3</span>, h = <span class="hljs-number">4</span> </span>) =&gt;</span> (l * w * h);

volume(<span class="hljs-number">2</span>) <span class="hljs-comment">//output: 24</span></code></pre>
<h3 id="articleHeader12">12. 模板字面量</h3>
<p>你是不是已经厌倦了使用 ' + ' 来将多个变量拼接成一个字符串？难道就没有更简单的方式来完成吗？如果你可以使用 ES6 的话，那么恭喜你，你要做的只是使用反引号和 ${} 来包裹你的变量。</p>
<p>常规写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const welcome = 'You have logged in as ' + first + ' ' + last + '.'

const db = 'http://' + host + ':' + port + '/' + database;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> welcome = <span class="hljs-string">'You have logged in as '</span> + first + <span class="hljs-string">' '</span> + last + <span class="hljs-string">'.'</span>

<span class="hljs-keyword">const</span> db = <span class="hljs-string">'http://'</span> + host + <span class="hljs-string">':'</span> + port + <span class="hljs-string">'/'</span> + database;</code></pre>
<p>速记法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const welcome = You have logged in as ${first} ${last};

const db = http://${host}:${port}/${database};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> welcome = You have logged <span class="hljs-keyword">in</span> <span class="hljs-keyword">as</span> ${first} ${last};

<span class="hljs-keyword">const</span> db = http:<span class="hljs-comment">//${host}:${port}/${database};</span></code></pre>
<h3 id="articleHeader13">13. 解构赋值速记法</h3>
<p>如果你正在使用任意一种流行的 web 框架，那么你很有可能会使用数组或者对象字面量形式的数据在组件和 API 之间传递信息。一旦组件接收到数据对象，你就需要将其展开。</p>
<p>常规写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const observable = require('mobx/observable');
const action = require('mobx/action');
const runInAction = require('mobx/runInAction');

const store = this.props.store;
const form = this.props.form;
const loading = this.props.loading;
const errors = this.props.errors;
const entity = this.props.entity;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> observable = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mobx/observable'</span>);
<span class="hljs-keyword">const</span> action = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mobx/action'</span>);
<span class="hljs-keyword">const</span> runInAction = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mobx/runInAction'</span>);

<span class="hljs-keyword">const</span> store = <span class="hljs-keyword">this</span>.props.store;
<span class="hljs-keyword">const</span> form = <span class="hljs-keyword">this</span>.props.form;
<span class="hljs-keyword">const</span> loading = <span class="hljs-keyword">this</span>.props.loading;
<span class="hljs-keyword">const</span> errors = <span class="hljs-keyword">this</span>.props.errors;
<span class="hljs-keyword">const</span> entity = <span class="hljs-keyword">this</span>.props.entity;</code></pre>
<p>速记法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { observable, action, runInAction } from 'mobx';

const { store, form, loading, errors, entity } = this.props;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { observable, action, runInAction } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx'</span>;

<span class="hljs-keyword">const</span> { store, form, loading, errors, entity } = <span class="hljs-keyword">this</span>.props;</code></pre>
<p>你甚至可以给变量重新分配变量名：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { store, form, loading, errors, entity:contact } = this.props;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> { store, form, loading, errors, <span class="hljs-attr">entity</span>:contact } = <span class="hljs-keyword">this</span>.props;</code></pre>
<h3 id="articleHeader14">14. 多行字符串速记法</h3>
<p>如果你需要在代码中写多行字符串，那么你可能会这样写：</p>
<p>常规写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const lorem = 'Lorem ipsum dolor sit amet, consectetur\n\t'
    + 'adipisicing elit, sed do eiusmod tempor incididunt\n\t'
    + 'ut labore et dolore magna aliqua. Ut enim ad minim\n\t'
    + 'veniam, quis nostrud exercitation ullamco laboris\n\t'
    + 'nisi ut aliquip ex ea commodo consequat. Duis aute\n\t'
    + 'irure dolor in reprehenderit in voluptate velit esse.\n\t'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> lorem = <span class="hljs-string">'Lorem ipsum dolor sit amet, consectetur\n\t'</span>
    + <span class="hljs-string">'adipisicing elit, sed do eiusmod tempor incididunt\n\t'</span>
    + <span class="hljs-string">'ut labore et dolore magna aliqua. Ut enim ad minim\n\t'</span>
    + <span class="hljs-string">'veniam, quis nostrud exercitation ullamco laboris\n\t'</span>
    + <span class="hljs-string">'nisi ut aliquip ex ea commodo consequat. Duis aute\n\t'</span>
    + <span class="hljs-string">'irure dolor in reprehenderit in voluptate velit esse.\n\t'</span></code></pre>
<p>但是有一种更简单的方法：使用反引号。</p>
<p>速记法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const lorem = Lorem ipsum dolor sit amet, consectetur
    adipisicing elit, sed do eiusmod tempor incididunt
    ut labore et dolore magna aliqua. Ut enim ad minim
    veniam, quis nostrud exercitation ullamco laboris
    nisi ut aliquip ex ea commodo consequat. Duis aute
    irure dolor in reprehenderit in voluptate velit esse." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> lorem = Lorem ipsum dolor sit amet, consectetur
    adipisicing elit, sed <span class="hljs-keyword">do</span> eiusmod tempor incididunt
    ut labore et dolore magna aliqua. Ut enim ad minim
    veniam, quis nostrud exercitation ullamco laboris
    nisi ut aliquip ex ea commodo consequat. Duis aute
    irure dolor <span class="hljs-keyword">in</span> reprehenderit <span class="hljs-keyword">in</span> voluptate velit esse.</code></pre>
<h3 id="articleHeader15">15. 展开运算符速记</h3>
<p>展开运算符是在 ES6 中引入的，它的多种应用场景使得 JavaScript 代码使用起来更高效、更有趣。它可以用来替换某些数组函数。展开运算符写起来很简单，就是三个点。</p>
<p>常规写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// joining arrays
const odd = [1, 3, 5];
const nums = [2 ,4 , 6].concat(odd);

// cloning arrays
const arr = [1, 2, 3, 4];
const arr2 = arr.slice()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// joining arrays</span>
<span class="hljs-keyword">const</span> odd = [<span class="hljs-number">1</span>, <span class="hljs-number">3</span>, <span class="hljs-number">5</span>];
<span class="hljs-keyword">const</span> nums = [<span class="hljs-number">2</span> ,<span class="hljs-number">4</span> , <span class="hljs-number">6</span>].concat(odd);

<span class="hljs-comment">// cloning arrays</span>
<span class="hljs-keyword">const</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>];
<span class="hljs-keyword">const</span> arr2 = arr.slice()</code></pre>
<p>速记法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// joining arrays
const odd = [1, 3, 5 ];
const nums = [2 ,4 , 6, ...odd];
console.log(nums); // [ 2, 4, 6, 1, 3, 5 ]

// cloning arrays
const arr = [1, 2, 3, 4];
const arr2 = [...arr];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// joining arrays</span>
<span class="hljs-keyword">const</span> odd = [<span class="hljs-number">1</span>, <span class="hljs-number">3</span>, <span class="hljs-number">5</span> ];
<span class="hljs-keyword">const</span> nums = [<span class="hljs-number">2</span> ,<span class="hljs-number">4</span> , <span class="hljs-number">6</span>, ...odd];
<span class="hljs-built_in">console</span>.log(nums); <span class="hljs-comment">// [ 2, 4, 6, 1, 3, 5 ]</span>

<span class="hljs-comment">// cloning arrays</span>
<span class="hljs-keyword">const</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>];
<span class="hljs-keyword">const</span> arr2 = [...arr];</code></pre>
<p>和 <code>concat()</code> 函数不同，你可以在另一个数组里的任意位置插入一个数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const odd = [1, 3, 5 ];
const nums = [2, ...odd, 4 , 6];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> odd = [<span class="hljs-number">1</span>, <span class="hljs-number">3</span>, <span class="hljs-number">5</span> ];
<span class="hljs-keyword">const</span> nums = [<span class="hljs-number">2</span>, ...odd, <span class="hljs-number">4</span> , <span class="hljs-number">6</span>];</code></pre>
<p>你也可以将展开运算符和 ES6 解析赋值结合起来使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { a, b, ...z } = { a: 1, b: 2, c: 3, d: 4 };
console.log(a) // 1
console.log(b) // 2
console.log(z) // { c: 3, d: 4 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> { a, b, ...z } = { <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">c</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">d</span>: <span class="hljs-number">4</span> };
<span class="hljs-built_in">console</span>.log(a) <span class="hljs-comment">// 1</span>
<span class="hljs-built_in">console</span>.log(b) <span class="hljs-comment">// 2</span>
<span class="hljs-built_in">console</span>.log(z) <span class="hljs-comment">// { c: 3, d: 4 }</span></code></pre>
<h3 id="articleHeader16">16. 强制参数速记法</h3>
<p>如果没有传值的话，JavaScript 默认会将函数参数设置为 undefined。一些其他的编程语言会抛出警告或错误。为了强制给参数赋值，如果参数没有定义的话，你可以使用 if 表达式抛出错误，或者可以使用“强制参数速记法”。</p>
<p>常规写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(bar) {
  if(bar === undefined) {
    throw new Error('Missing parameter!');
  }
  return bar;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">bar</span>) </span>{
  <span class="hljs-keyword">if</span>(bar === <span class="hljs-literal">undefined</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Missing parameter!'</span>);
  }
  <span class="hljs-keyword">return</span> bar;
}</code></pre>
<p>速记法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mandatory = () => {
  throw new Error('Missing parameter!');
}

foo = (bar = mandatory()) => {
  return bar;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">mandatory = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Missing parameter!'</span>);
}

foo = <span class="hljs-function">(<span class="hljs-params">bar = mandatory(</span>)) =&gt;</span> {
  <span class="hljs-keyword">return</span> bar;
}</code></pre>
<h3 id="articleHeader17">17. Array.find 速记法</h3>
<p>如果你曾经使用原生 JavaScript 写一个查找函数，你可能会使用 for 循环。在 ES6 中，你可以使用数组的一个新方法<code> find()</code>。</p>
<p>常规写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const pets = [
  { type: 'Dog', name: 'Max'},
  { type: 'Cat', name: 'Karl'},
  { type: 'Dog', name: 'Tommy'},
]

function findDog(name) {
  for(let i = 0; i<pets.length; ++i) {
    if(pets[i].type === 'Dog' &amp;&amp; pets[i].name === name) {
      return pets[i];
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> pets = [
  { <span class="hljs-attr">type</span>: <span class="hljs-string">'Dog'</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'Max'</span>},
  { <span class="hljs-attr">type</span>: <span class="hljs-string">'Cat'</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'Karl'</span>},
  { <span class="hljs-attr">type</span>: <span class="hljs-string">'Dog'</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'Tommy'</span>},
]

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">findDog</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i&lt;pets.length; ++i) {
    <span class="hljs-keyword">if</span>(pets[i].type === <span class="hljs-string">'Dog'</span> &amp;&amp; pets[i].name === name) {
      <span class="hljs-keyword">return</span> pets[i];
    }
  }
}</code></pre>
<p>速记法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pet = pets.find(pet => pet.type ==='Dog' &amp;&amp; pet.name === 'Tommy');
console.log(pet); // { type: 'Dog', name: 'Tommy' }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">pet = pets.find(<span class="hljs-function"><span class="hljs-params">pet</span> =&gt;</span> pet.type ===<span class="hljs-string">'Dog'</span> &amp;&amp; pet.name === <span class="hljs-string">'Tommy'</span>);
<span class="hljs-built_in">console</span>.log(pet); <span class="hljs-comment">// { type: 'Dog', name: 'Tommy' }</span></code></pre>
<h3 id="articleHeader18">18. Object [key] 速记法</h3>
<p>你知道 <code>Foo.bar</code> 可以写成 <code>Foo['bar']</code> 吧。一开始，似乎并没有原因解释说为什么应该像这样写。但是这种写法可以让你编写可重用代码。</p>
<p>考虑下一个验证函数的简单例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function validate(values) {
  if(!values.first)
    return false;
  if(!values.last)
    return false;
  return true;
}

console.log(validate({first:'Bruce',last:'Wayne'})); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">validate</span>(<span class="hljs-params">values</span>) </span>{
  <span class="hljs-keyword">if</span>(!values.first)
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">if</span>(!values.last)
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}

<span class="hljs-built_in">console</span>.log(validate({<span class="hljs-attr">first</span>:<span class="hljs-string">'Bruce'</span>,<span class="hljs-attr">last</span>:<span class="hljs-string">'Wayne'</span>})); <span class="hljs-comment">// true</span></code></pre>
<p>这个函数完美的实现了所需的功能。但是，请考虑一个场景：你有许多表单需要验证，并且不同的域有不同的验证规则。那创建一个在运行时被配置的通用验证函数岂不是更好？</p>
<p>速记法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// object validation rules
const schema = {
  first: {
    required:true
  },
  last: {
    required:true
  }
}

// universal validation function
const validate = (schema, values) => {
  for(field in schema) {
    if(schema[field].required) {
      if(!values[field]) {
        return false;
      }
    }
  }
  return true;
}

console.log(validate(schema, {first:'Bruce'})); // false
console.log(validate(schema, {first:'Bruce',last:'Wayne'})); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// object validation rules</span>
<span class="hljs-keyword">const</span> schema = {
  <span class="hljs-attr">first</span>: {
    <span class="hljs-attr">required</span>:<span class="hljs-literal">true</span>
  },
  <span class="hljs-attr">last</span>: {
    <span class="hljs-attr">required</span>:<span class="hljs-literal">true</span>
  }
}

<span class="hljs-comment">// universal validation function</span>
<span class="hljs-keyword">const</span> validate = <span class="hljs-function">(<span class="hljs-params">schema, values</span>) =&gt;</span> {
  <span class="hljs-keyword">for</span>(field <span class="hljs-keyword">in</span> schema) {
    <span class="hljs-keyword">if</span>(schema[field].required) {
      <span class="hljs-keyword">if</span>(!values[field]) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
      }
    }
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}

<span class="hljs-built_in">console</span>.log(validate(schema, {<span class="hljs-attr">first</span>:<span class="hljs-string">'Bruce'</span>})); <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(validate(schema, {<span class="hljs-attr">first</span>:<span class="hljs-string">'Bruce'</span>,<span class="hljs-attr">last</span>:<span class="hljs-string">'Wayne'</span>})); <span class="hljs-comment">// true</span></code></pre>
<p>现在创建了一个可以在所有的表单里重用的验证函数，而不必为每个表单单独写一个特定的验证函数。</p>
<h3 id="articleHeader19">19. 双位取反运算符速记法</h3>
<p>逐位运算符是你在刚学习 <code>JavaScript</code> 时会学到的一个特性，但是如果你不处理二进制的话，基本上是从来都不会用上的。</p>
<p>但是，双位运算符有一个非常实用的使用场景：可以用来代替 <code>Math.floor</code>。双位取反运算符的优势在于它执行相同操作的速度更快。你可以在<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators" rel="nofollow noreferrer" target="_blank">这里</a>查看更多关于位运算符的知识。</p>
<p>常规写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Math.floor(4.9) === 4  //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">Math</span>.floor(<span class="hljs-number">4.9</span>) === <span class="hljs-number">4</span>  <span class="hljs-comment">//true</span></code></pre>
<p>速记法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="~~4.9 === 4  //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">~~<span class="hljs-number">4.9</span> === <span class="hljs-number">4</span>  <span class="hljs-comment">//true</span></code></pre>
<h3 id="articleHeader20">20. 还有其他的小技巧？</h3>
<p>我确实喜欢这些小技巧，也乐于发现更多的小技巧。如果你有什么想说的话，就直接留言吧！</p>
<blockquote><p>译者：<a href="http://www.zcfy.cc/@myvin" rel="nofollow noreferrer" target="_blank">myvin</a><br>链接：<a href="http://www.zcfy.cc/article/3519" rel="nofollow noreferrer" target="_blank">http://www.zcfy.cc/article/3519</a><br>原文：<a href="https://www.sitepoint.com/shorthand-javascript-techniques/" rel="nofollow noreferrer" target="_blank">https://www.sitepoint.com/shorthand-javascript-techniques/</a></p></blockquote>
<hr>
<p><strong>原文地址:</strong><br><a href="https://www.sitepoint.com/shorthand-javascript-techniques/" rel="nofollow noreferrer" target="_blank">https://www.sitepoint.com/sho...</a></p>
<p><strong>众成翻译</strong><br><a href="http://www.zcfy.cc/article/19-javascript-shorthand-coding-techniques-mdash-sitepoint-3519.html?t=new" rel="nofollow noreferrer" target="_blank">http://www.zcfy.cc/article/19...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
19+ 个 JavaScript 快速编程技巧 — SitePoint

## 原文链接
[https://segmentfault.com/a/1190000010189294](https://segmentfault.com/a/1190000010189294)

