---
title: 'JavaScript专题之如何判断两个对象相等' 
date: 2019-01-05 2:30:10
hidden: true
slug: fakestgbghb
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>JavaScript 专题系列第十二篇，讲解如何判断两个参数是否相等</p></blockquote>
<h2 id="articleHeader0">前言</h2>
<p>虽然标题写的是如何判断两个对象相等，但本篇我们不仅仅判断两个对象相等，实际上，我们要做到的是如何判断两个参数相等，而这必然会涉及到多种类型的判断。</p>
<h2 id="articleHeader1">相等</h2>
<p>什么是相等？在<a href="https://github.com/mqyqingfeng/Blog/issues/27" rel="nofollow noreferrer" target="_blank">《JavaScript专题之去重》</a>中，我们认为只要 <code>===</code> 的结果为 true，两者就相等，然而今天我们重新定义相等：</p>
<p>我们认为：</p>
<ol>
<li>NaN 和 NaN 是相等</li>
<li>[1] 和 [1] 是相等</li>
<li>{value: 1} 和 {value: 1} 是相等</li>
</ol>
<p>不仅仅是这些长得一样的，还有</p>
<ol>
<li>1 和 new Number(1) 是相等</li>
<li>'Curly' 和 new String('Curly') 是相等</li>
<li>true 和 new Boolean(true) 是相等</li>
</ol>
<p>更复杂的我们会在接下来的内容中看到。</p>
<h2 id="articleHeader2">目标</h2>
<p>我们的目标是写一个 eq 函数用来判断两个参数是否相等，使用效果如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function eq(a, b) { ... }

var a = [1];
var b = [1];
console.log(eq(a, b)) // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">eq</span>(<span class="hljs-params">a, b</span>) </span>{ ... }

<span class="hljs-keyword">var</span> a = [<span class="hljs-number">1</span>];
<span class="hljs-keyword">var</span> b = [<span class="hljs-number">1</span>];
<span class="hljs-built_in">console</span>.log(eq(a, b)) <span class="hljs-comment">// true</span></code></pre>
<p>在写这个看似很简单的函数之前，我们首先了解在一些简单的情况下是如何判断的？</p>
<h2 id="articleHeader3">+0 与 -0</h2>
<p>如果 a === b 的结果为 true， 那么 a 和 b 就是相等的吗？一般情况下，当然是这样的，但是有一个特殊的例子，就是 +0 和 -0。</p>
<p>JavaScript “处心积虑”的想抹平两者的差异：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 表现1
console.log(+0 === -0); // true

// 表现2
(-0).toString() // '0'
(+0).toString() // '0'

// 表现3
-0 < +0 // false
+0 < -0 // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 表现1</span>
<span class="hljs-built_in">console</span>.log(+<span class="hljs-number">0</span> === <span class="hljs-number">-0</span>); <span class="hljs-comment">// true</span>

<span class="hljs-comment">// 表现2</span>
(<span class="hljs-number">-0</span>).toString() <span class="hljs-comment">// '0'</span>
(+<span class="hljs-number">0</span>).toString() <span class="hljs-comment">// '0'</span>

<span class="hljs-comment">// 表现3</span>
<span class="hljs-number">-0</span> &lt; +<span class="hljs-number">0</span> <span class="hljs-comment">// false</span>
+<span class="hljs-number">0</span> &lt; <span class="hljs-number">-0</span> <span class="hljs-comment">// false</span></code></pre>
<p>即便如此，两者依然是不同的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1 / +0 // Infinity
1 / -0 // -Infinity

1 / +0 === 1 / -0 // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-number">1</span> / +<span class="hljs-number">0</span> <span class="hljs-comment">// Infinity</span>
<span class="hljs-number">1</span> / <span class="hljs-number">-0</span> <span class="hljs-comment">// -Infinity</span>

<span class="hljs-number">1</span> / +<span class="hljs-number">0</span> === <span class="hljs-number">1</span> / <span class="hljs-number">-0</span> <span class="hljs-comment">// false</span></code></pre>
<p>也许你会好奇为什么要有 +0 和 -0 呢？</p>
<p>这是因为 JavaScript 采用了IEEE_754 浮点数表示法(几乎所有现代编程语言所采用)，这是一种二进制表示法，按照这个标准，最高位是符号位(0 代表正，1 代表负)，剩下的用于表示大小。而对于零这个边界值 ，1000(-0) 和 0000(0)都是表示 0 ，这才有了正负零的区别。</p>
<p>也许你会好奇什么时候会产生 -0 呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Math.round(-0.1) // -0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">Math</span>.round(<span class="hljs-number">-0.1</span>) <span class="hljs-comment">// -0</span></code></pre>
<p>那么我们又该如何在 === 结果为 true 的时候，区别 0 和 -0 得出正确的结果呢？我们可以这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function eq(a, b){
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    return false;
}

console.log(eq(0, 0)) // true
console.log(eq(0, -0)) // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">eq</span>(<span class="hljs-params">a, b</span>)</span>{
    <span class="hljs-keyword">if</span> (a === b) <span class="hljs-keyword">return</span> a !== <span class="hljs-number">0</span> || <span class="hljs-number">1</span> / a === <span class="hljs-number">1</span> / b;
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
}

<span class="hljs-built_in">console</span>.log(eq(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>)) <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(eq(<span class="hljs-number">0</span>, <span class="hljs-number">-0</span>)) <span class="hljs-comment">// false</span></code></pre>
<h2 id="articleHeader4">NaN</h2>
<p>在本篇，我们认为 NaN 和 NaN 是相等的，那又该如何判断出 NaN 呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(NaN === NaN); // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(<span class="hljs-literal">NaN</span> === <span class="hljs-literal">NaN</span>); <span class="hljs-comment">// false</span></code></pre>
<p>利用 NaN 不等于自身的特性，我们可以区别出 NaN，那么这个 eq 函数又该怎么写呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function eq(a, b) {
    if (a !== a) return b !== b;
}

console.log(eq(NaN, NaN)); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">eq</span>(<span class="hljs-params">a, b</span>) </span>{
    <span class="hljs-keyword">if</span> (a !== a) <span class="hljs-keyword">return</span> b !== b;
}

<span class="hljs-built_in">console</span>.log(eq(<span class="hljs-literal">NaN</span>, <span class="hljs-literal">NaN</span>)); <span class="hljs-comment">// true</span></code></pre>
<h2 id="articleHeader5">eq 函数</h2>
<p>现在，我们已经可以去写 eq 函数的第一版了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// eq 第一版
// 用来过滤掉简单的类型比较，复杂的对象使用 deepEq 函数进行处理
function eq(a, b) {

    // === 结果为 true 的区别出 +0 和 -0
    if (a === b) return a !== 0 || 1 / a === 1 / b;

    // typeof null 的结果为 object ，这里做判断，是为了让有 null 的情况尽早退出函数
    if (a == null || b == null) return false;

    // 判断 NaN
    if (a !== a) return b !== b;

    // 判断参数 a 类型，如果是基本类型，在这里可以直接返回 false
    var type = typeof a;
    if (type !== 'function' &amp;&amp; type !== 'object' &amp;&amp; typeof b != 'object') return false;

    // 更复杂的对象使用 deepEq 函数进行深度比较
    return deepEq(a, b);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// eq 第一版</span>
<span class="hljs-comment">// 用来过滤掉简单的类型比较，复杂的对象使用 deepEq 函数进行处理</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">eq</span>(<span class="hljs-params">a, b</span>) </span>{

    <span class="hljs-comment">// === 结果为 true 的区别出 +0 和 -0</span>
    <span class="hljs-keyword">if</span> (a === b) <span class="hljs-keyword">return</span> a !== <span class="hljs-number">0</span> || <span class="hljs-number">1</span> / a === <span class="hljs-number">1</span> / b;

    <span class="hljs-comment">// typeof null 的结果为 object ，这里做判断，是为了让有 null 的情况尽早退出函数</span>
    <span class="hljs-keyword">if</span> (a == <span class="hljs-literal">null</span> || b == <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;

    <span class="hljs-comment">// 判断 NaN</span>
    <span class="hljs-keyword">if</span> (a !== a) <span class="hljs-keyword">return</span> b !== b;

    <span class="hljs-comment">// 判断参数 a 类型，如果是基本类型，在这里可以直接返回 false</span>
    <span class="hljs-keyword">var</span> type = <span class="hljs-keyword">typeof</span> a;
    <span class="hljs-keyword">if</span> (type !== <span class="hljs-string">'function'</span> &amp;&amp; type !== <span class="hljs-string">'object'</span> &amp;&amp; <span class="hljs-keyword">typeof</span> b != <span class="hljs-string">'object'</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;

    <span class="hljs-comment">// 更复杂的对象使用 deepEq 函数进行深度比较</span>
    <span class="hljs-keyword">return</span> deepEq(a, b);
};</code></pre>
<p>也许你会好奇是不是少了一个 <code>typeof b !== function</code>?</p>
<p>试想如果我们添加上了这句，当 a 是基本类型，而 b 是函数的时候，就会进入 deepEq 函数，而去掉这一句，就会进入直接进入 false，实际上 基本类型和函数肯定是不会相等的，所以这样做代码又少，又可以让一种情况更早退出。</p>
<h2 id="articleHeader6">String 对象</h2>
<p>现在我们开始写 deepEq 函数，一个要处理的重大难题就是 'Curly' 和 new String('Curly') 如何判断成相等？</p>
<p>两者的类型都不一样呐！不信我们看 typeof 的操作结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(typeof 'Curly'); // string
console.log(typeof new String('Curly')); // object" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> <span class="hljs-string">'Curly'</span>); <span class="hljs-comment">// string</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">String</span>(<span class="hljs-string">'Curly'</span>)); <span class="hljs-comment">// object</span></code></pre>
<p>可是我们在<a href="https://github.com/mqyqingfeng/Blog/issues/28" rel="nofollow noreferrer" target="_blank">《JavaScript专题之类型判断上》</a>中还学习过更多的方法判断类型，比如 Object.prototype.toString：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var toString = Object.prototype.toString;
toString.call('Curly'); // &quot;[object String]&quot;
toString.call(new String('Curly')); // &quot;[object String]&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> toString = <span class="hljs-built_in">Object</span>.prototype.toString;
toString.call(<span class="hljs-string">'Curly'</span>); <span class="hljs-comment">// "[object String]"</span>
toString.call(<span class="hljs-keyword">new</span> <span class="hljs-built_in">String</span>(<span class="hljs-string">'Curly'</span>)); <span class="hljs-comment">// "[object String]"</span></code></pre>
<p>神奇的是使用 toString 方法两者判断的结果却是一致的，可是就算知道了这一点，还是不知道如何判断字符串和字符串包装对象是相等的呢？</p>
<p>那我们利用隐式类型转换呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('Curly' + '' === new String('Curly') + ''); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Curly'</span> + <span class="hljs-string">''</span> === <span class="hljs-keyword">new</span> <span class="hljs-built_in">String</span>(<span class="hljs-string">'Curly'</span>) + <span class="hljs-string">''</span>); <span class="hljs-comment">// true</span></code></pre>
<p>看来我们已经有了思路：如果 a 和 b 的 Object.prototype.toString的结果一致，并且都是"[object String]"，那我们就使用 '' + a === '' + b 进行判断。</p>
<p>可是不止有 String 对象呐，Boolean、Number、RegExp、Date呢？</p>
<h2 id="articleHeader7">更多对象</h2>
<p>跟 String 同样的思路，利用隐式类型转换。</p>
<p><strong>Boolean</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = true;
var b = new Boolean(true);

console.log(+a === +b) // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = <span class="hljs-literal">true</span>;
<span class="hljs-keyword">var</span> b = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Boolean</span>(<span class="hljs-literal">true</span>);

<span class="hljs-built_in">console</span>.log(+a === +b) <span class="hljs-comment">// true</span></code></pre>
<p><strong>Date</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = new Date(2009, 9, 25);
var b = new Date(2009, 9, 25);

console.log(+a === +b) // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-number">2009</span>, <span class="hljs-number">9</span>, <span class="hljs-number">25</span>);
<span class="hljs-keyword">var</span> b = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-number">2009</span>, <span class="hljs-number">9</span>, <span class="hljs-number">25</span>);

<span class="hljs-built_in">console</span>.log(+a === +b) <span class="hljs-comment">// true</span></code></pre>
<p><strong>RegExp</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = /a/i;
var b = new RegExp(/a/i);

console.log('' + a === '' + b) // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = <span class="hljs-regexp">/a/i</span>;
<span class="hljs-keyword">var</span> b = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-regexp">/a/i</span>);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">''</span> + a === <span class="hljs-string">''</span> + b) <span class="hljs-comment">// true</span></code></pre>
<p><strong>Number</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1;
var b = new Number(1);

console.log(+a === +b) // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> b = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Number</span>(<span class="hljs-number">1</span>);

<span class="hljs-built_in">console</span>.log(+a === +b) <span class="hljs-comment">// true</span></code></pre>
<p>嗯哼？你确定 Number 能这么简单的判断？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = Number(NaN);
var b = Number(NaN);

console.log(+a === +b); // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = <span class="hljs-built_in">Number</span>(<span class="hljs-literal">NaN</span>);
<span class="hljs-keyword">var</span> b = <span class="hljs-built_in">Number</span>(<span class="hljs-literal">NaN</span>);

<span class="hljs-built_in">console</span>.log(+a === +b); <span class="hljs-comment">// false</span></code></pre>
<p>可是 a 和 b 应该被判断成 true 的呐~</p>
<p>那么我们就改成这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = Number(NaN);
var b = Number(NaN);

function eq() {
    // 判断 Number(NaN) Object(NaN) 等情况
    if (+a !== +a) return +b !== +b;
    // 其他判断 ...
}

console.log(eq(a, b)); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = <span class="hljs-built_in">Number</span>(<span class="hljs-literal">NaN</span>);
<span class="hljs-keyword">var</span> b = <span class="hljs-built_in">Number</span>(<span class="hljs-literal">NaN</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">eq</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 判断 Number(NaN) Object(NaN) 等情况</span>
    <span class="hljs-keyword">if</span> (+a !== +a) <span class="hljs-keyword">return</span> +b !== +b;
    <span class="hljs-comment">// 其他判断 ...</span>
}

<span class="hljs-built_in">console</span>.log(eq(a, b)); <span class="hljs-comment">// true</span></code></pre>
<h2 id="articleHeader8">deepEq 函数</h2>
<p>现在我们可以写一点 deepEq 函数了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var toString = Object.prototype.toString;

function deepEq(a, b) {
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;

    switch (className) {
        case '[object RegExp]':
        case '[object String]':
            return '' + a === '' + b;
        case '[object Number]':
            if (+a !== +a) return +b !== +b;
            return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
            return +a === +b;
    }

    // 其他判断
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> toString = <span class="hljs-built_in">Object</span>.prototype.toString;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deepEq</span>(<span class="hljs-params">a, b</span>) </span>{
    <span class="hljs-keyword">var</span> className = toString.call(a);
    <span class="hljs-keyword">if</span> (className !== toString.call(b)) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;

    <span class="hljs-keyword">switch</span> (className) {
        <span class="hljs-keyword">case</span> <span class="hljs-string">'[object RegExp]'</span>:
        <span class="hljs-keyword">case</span> <span class="hljs-string">'[object String]'</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-string">''</span> + a === <span class="hljs-string">''</span> + b;
        <span class="hljs-keyword">case</span> <span class="hljs-string">'[object Number]'</span>:
            <span class="hljs-keyword">if</span> (+a !== +a) <span class="hljs-keyword">return</span> +b !== +b;
            <span class="hljs-keyword">return</span> +a === <span class="hljs-number">0</span> ? <span class="hljs-number">1</span> / +a === <span class="hljs-number">1</span> / b : +a === +b;
      <span class="hljs-keyword">case</span> <span class="hljs-string">'[object Date]'</span>:
      <span class="hljs-keyword">case</span> <span class="hljs-string">'[object Boolean]'</span>:
            <span class="hljs-keyword">return</span> +a === +b;
    }

    <span class="hljs-comment">// 其他判断</span>
}</code></pre>
<h2 id="articleHeader9">构造函数实例</h2>
<p>我们看个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person() {
    this.name = name;
}

function Animal() {
    this.name = name
}

var person = new Person('Kevin');
var animal = new Animal('Kevin');

eq(person, animal) // ???" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = name;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = name
}

<span class="hljs-keyword">var</span> person = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'Kevin'</span>);
<span class="hljs-keyword">var</span> animal = <span class="hljs-keyword">new</span> Animal(<span class="hljs-string">'Kevin'</span>);

eq(person, animal) <span class="hljs-comment">// ???</span></code></pre>
<p>虽然 <code>person</code> 和 <code>animal</code> 都是 <code>{name: 'Kevin'}</code>，但是 <code>person</code> 和 <code>animal</code> 属于不同构造函数的实例，为了做出区分，我们认为是不同的对象。</p>
<p>如果两个对象所属的构造函数对象不同，两个对象就一定不相等吗？</p>
<p>并不一定，我们再举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var attrs = Object.create(null);
attrs.name = &quot;Bob&quot;;
eq(attrs, {name: &quot;Bob&quot;}); // ???" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> attrs = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>);
attrs.name = <span class="hljs-string">"Bob"</span>;
eq(attrs, {<span class="hljs-attr">name</span>: <span class="hljs-string">"Bob"</span>}); <span class="hljs-comment">// ???</span></code></pre>
<p>尽管 <code>attrs</code> 没有原型，<code>{name: "Bob"}</code> 的构造函数是 <code>Object</code>，但是在实际应用中，只要他们有着相同的键值对，我们依然认为是相等。</p>
<p>从函数设计的角度来看，我们不应该让他们相等，但是从实践的角度，我们让他们相等，所以相等就是一件如此随意的事情吗？！对啊，我也在想：undersocre，你怎么能如此随意呢！！！</p>
<p>哎，吐槽完了，我们还是要接着写这个相等函数，我们可以先做个判断，对于不同构造函数下的实例直接返回 false。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isFunction(obj) {
    return toString.call(obj) === '[object Function]'
}

function deepEq(a, b) {
    // 接着上面的内容
    var areArrays = className === '[object Array]';
    // 不是数组
    if (!areArrays) {
        // 过滤掉两个函数的情况
        if (typeof a != 'object' || typeof b != 'object') return false;

        var aCtor = a.constructor, bCtor = b.constructor;
        // aCtor 和 bCtor 必须都存在并且都不是 Object 构造函数的情况下，aCtor 不等于 bCtor， 那这两个对象就真的不相等啦
        if (aCtor == bCtor &amp;&amp; !(isFunction(aCtor) &amp;&amp; aCtor instanceof aCtor &amp;&amp; isFunction(bCtor) &amp;&amp; bCtor instanceof bCtor) &amp;&amp; ('constructor' in a &amp;&amp; 'constructor' in b)) {
            return false;
        }
    }

    // 下面还有好多判断
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isFunction</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">return</span> toString.call(obj) === <span class="hljs-string">'[object Function]'</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deepEq</span>(<span class="hljs-params">a, b</span>) </span>{
    <span class="hljs-comment">// 接着上面的内容</span>
    <span class="hljs-keyword">var</span> areArrays = className === <span class="hljs-string">'[object Array]'</span>;
    <span class="hljs-comment">// 不是数组</span>
    <span class="hljs-keyword">if</span> (!areArrays) {
        <span class="hljs-comment">// 过滤掉两个函数的情况</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> a != <span class="hljs-string">'object'</span> || <span class="hljs-keyword">typeof</span> b != <span class="hljs-string">'object'</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;

        <span class="hljs-keyword">var</span> aCtor = a.constructor, bCtor = b.constructor;
        <span class="hljs-comment">// aCtor 和 bCtor 必须都存在并且都不是 Object 构造函数的情况下，aCtor 不等于 bCtor， 那这两个对象就真的不相等啦</span>
        <span class="hljs-keyword">if</span> (aCtor == bCtor &amp;&amp; !(isFunction(aCtor) &amp;&amp; aCtor <span class="hljs-keyword">instanceof</span> aCtor &amp;&amp; isFunction(bCtor) &amp;&amp; bCtor <span class="hljs-keyword">instanceof</span> bCtor) &amp;&amp; (<span class="hljs-string">'constructor'</span> <span class="hljs-keyword">in</span> a &amp;&amp; <span class="hljs-string">'constructor'</span> <span class="hljs-keyword">in</span> b)) {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
    }

    <span class="hljs-comment">// 下面还有好多判断</span>
}</code></pre>
<h2 id="articleHeader10">数组相等</h2>
<p>现在终于可以进入我们期待已久的数组和对象的判断，不过其实这个很简单，就是递归遍历一遍……</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function deepEq(a, b) {
    // 再接着上面的内容
    if (areArrays) {

        length = a.length;
        if (length !== b.length) return false;

        while (length--) {
            if (!eq(a[length], b[length])) return false;
         }
    } 
    else {

        var keys = Object.keys(a), key;
        length = keys.length;

        if (Object.keys(b).length !== length) return false;

        while (length--) {
            key = keys[length];
            if (!(b.hasOwnProperty(key) &amp;&amp; eq(a[key], b[key]))) return false;
        }
    }
    return true;

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deepEq</span>(<span class="hljs-params">a, b</span>) </span>{
    <span class="hljs-comment">// 再接着上面的内容</span>
    <span class="hljs-keyword">if</span> (areArrays) {

        length = a.length;
        <span class="hljs-keyword">if</span> (length !== b.length) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;

        <span class="hljs-keyword">while</span> (length--) {
            <span class="hljs-keyword">if</span> (!eq(a[length], b[length])) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
         }
    } 
    <span class="hljs-keyword">else</span> {

        <span class="hljs-keyword">var</span> keys = <span class="hljs-built_in">Object</span>.keys(a), key;
        length = keys.length;

        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Object</span>.keys(b).length !== length) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;

        <span class="hljs-keyword">while</span> (length--) {
            key = keys[length];
            <span class="hljs-keyword">if</span> (!(b.hasOwnProperty(key) &amp;&amp; eq(a[key], b[key]))) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;

}</code></pre>
<h2 id="articleHeader11">循环引用</h2>
<p>如果觉得这就结束了，简直是太天真，因为最难的部分才终于要开始，这个问题就是循环引用！</p>
<p>举个简单的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a = {abc: null};
b = {abc: null};
a.abc = a;
b.abc = b;

eq(a, b)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">a = {<span class="hljs-attr">abc</span>: <span class="hljs-literal">null</span>};
b = {<span class="hljs-attr">abc</span>: <span class="hljs-literal">null</span>};
a.abc = a;
b.abc = b;

eq(a, b)</code></pre>
<p>再复杂一点的，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a = {foo: {b: {foo: {c: {foo: null"}}""}}"};
b = {foo: {b: {foo: {c: {foo: null"}}""}}"};
a.foo.b.foo.c.foo = a;
b.foo.b.foo.c.foo = b;

eq(a, b)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">a = {<span class="hljs-attr">foo</span>: {<span class="hljs-attr">b</span>: {<span class="hljs-attr">foo</span>: {<span class="hljs-attr">c</span>: {<span class="hljs-attr">foo</span>: <span class="hljs-literal">null</span>"}}""}}"};
b = {<span class="hljs-attr">foo</span>: {<span class="hljs-attr">b</span>: {<span class="hljs-attr">foo</span>: {<span class="hljs-attr">c</span>: {<span class="hljs-attr">foo</span>: <span class="hljs-literal">null</span>"}}""}}"};
a.foo.b.foo.c.foo = a;
b.foo.b.foo.c.foo = b;

eq(a, b)</code></pre>
<p>为了给大家演示下循环引用，大家可以把下面这段已经精简过的代码复制到浏览器中尝试：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// demo
var a, b;

a = { foo: { b: { foo: { c: { foo: null } } } } };
b = { foo: { b: { foo: { c: { foo: null } } } } };
a.foo.b.foo.c.foo = a;
b.foo.b.foo.c.foo = b;

function eq(a, b, aStack, bStack) {
    if (typeof a == 'number') {
        return a === b;
    }

    return deepEq(a, b)
}

function deepEq(a, b) {

    var keys = Object.keys(a);
    var length = keys.length;
    var key;

    while (length--) {
        key = keys[length]

        // 这是为了让你看到代码其实一直在执行
        console.log(a[key], b[key])

        if (!eq(a[key], b[key])) return false;
    }

    return true;

}

eq(a, b)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// demo</span>
<span class="hljs-keyword">var</span> a, b;

a = { <span class="hljs-attr">foo</span>: { <span class="hljs-attr">b</span>: { <span class="hljs-attr">foo</span>: { <span class="hljs-attr">c</span>: { <span class="hljs-attr">foo</span>: <span class="hljs-literal">null</span> } } } } };
b = { <span class="hljs-attr">foo</span>: { <span class="hljs-attr">b</span>: { <span class="hljs-attr">foo</span>: { <span class="hljs-attr">c</span>: { <span class="hljs-attr">foo</span>: <span class="hljs-literal">null</span> } } } } };
a.foo.b.foo.c.foo = a;
b.foo.b.foo.c.foo = b;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">eq</span>(<span class="hljs-params">a, b, aStack, bStack</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> a == <span class="hljs-string">'number'</span>) {
        <span class="hljs-keyword">return</span> a === b;
    }

    <span class="hljs-keyword">return</span> deepEq(a, b)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deepEq</span>(<span class="hljs-params">a, b</span>) </span>{

    <span class="hljs-keyword">var</span> keys = <span class="hljs-built_in">Object</span>.keys(a);
    <span class="hljs-keyword">var</span> length = keys.length;
    <span class="hljs-keyword">var</span> key;

    <span class="hljs-keyword">while</span> (length--) {
        key = keys[length]

        <span class="hljs-comment">// 这是为了让你看到代码其实一直在执行</span>
        <span class="hljs-built_in">console</span>.log(a[key], b[key])

        <span class="hljs-keyword">if</span> (!eq(a[key], b[key])) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }

    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;

}

eq(a, b)</code></pre>
<p>嗯，以上的代码是死循环。</p>
<p>那么，我们又该如何解决这个问题呢？underscore 的思路是 eq 的时候，多传递两个参数为 aStack 和 bStack，用来储存 a 和 b 递归比较过程中的 a 和 b 的值，咋说的这么绕口呢？<br>我们直接看个精简的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a, b;

a = { foo: { b: { foo: { c: { foo: null } } } } };
b = { foo: { b: { foo: { c: { foo: null } } } } };
a.foo.b.foo.c.foo = a;
b.foo.b.foo.c.foo = b;

function eq(a, b, aStack, bStack) {
    if (typeof a == 'number') {
        return a === b;
    }

    return deepEq(a, b, aStack, bStack)
}

function deepEq(a, b, aStack, bStack) {

    aStack = aStack || [];
    bStack = bStack || [];

    var length = aStack.length;

    while (length--) {
        if (aStack[length] === a) {
              return bStack[length] === b;
        }
    }

    aStack.push(a);
    bStack.push(b);

    var keys = Object.keys(a);
    var length = keys.length;
    var key;

    while (length--) {
        key = keys[length]

        console.log(a[key], b[key], aStack, bStack)

        if (!eq(a[key], b[key], aStack, bStack)) return false;
    }

    // aStack.pop();
    // bStack.pop();
    return true;

}

console.log(eq(a, b))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a, b;

a = { <span class="hljs-attr">foo</span>: { <span class="hljs-attr">b</span>: { <span class="hljs-attr">foo</span>: { <span class="hljs-attr">c</span>: { <span class="hljs-attr">foo</span>: <span class="hljs-literal">null</span> } } } } };
b = { <span class="hljs-attr">foo</span>: { <span class="hljs-attr">b</span>: { <span class="hljs-attr">foo</span>: { <span class="hljs-attr">c</span>: { <span class="hljs-attr">foo</span>: <span class="hljs-literal">null</span> } } } } };
a.foo.b.foo.c.foo = a;
b.foo.b.foo.c.foo = b;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">eq</span>(<span class="hljs-params">a, b, aStack, bStack</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> a == <span class="hljs-string">'number'</span>) {
        <span class="hljs-keyword">return</span> a === b;
    }

    <span class="hljs-keyword">return</span> deepEq(a, b, aStack, bStack)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deepEq</span>(<span class="hljs-params">a, b, aStack, bStack</span>) </span>{

    aStack = aStack || [];
    bStack = bStack || [];

    <span class="hljs-keyword">var</span> length = aStack.length;

    <span class="hljs-keyword">while</span> (length--) {
        <span class="hljs-keyword">if</span> (aStack[length] === a) {
              <span class="hljs-keyword">return</span> bStack[length] === b;
        }
    }

    aStack.push(a);
    bStack.push(b);

    <span class="hljs-keyword">var</span> keys = <span class="hljs-built_in">Object</span>.keys(a);
    <span class="hljs-keyword">var</span> length = keys.length;
    <span class="hljs-keyword">var</span> key;

    <span class="hljs-keyword">while</span> (length--) {
        key = keys[length]

        <span class="hljs-built_in">console</span>.log(a[key], b[key], aStack, bStack)

        <span class="hljs-keyword">if</span> (!eq(a[key], b[key], aStack, bStack)) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }

    <span class="hljs-comment">// aStack.pop();</span>
    <span class="hljs-comment">// bStack.pop();</span>
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;

}

<span class="hljs-built_in">console</span>.log(eq(a, b))</code></pre>
<p>之所以注释掉 <code>aStack.pop()</code>和<code>bStack.pop()</code>这两句，是为了方便大家查看 aStack bStack的值。</p>
<h2 id="articleHeader12">最终的 eq 函数</h2>
<p>最终的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var toString = Object.prototype.toString;

function isFunction(obj) {
    return toString.call(obj) === '[object Function]'
}

function eq(a, b, aStack, bStack) {

    // === 结果为 true 的区别出 +0 和 -0
    if (a === b) return a !== 0 || 1 / a === 1 / b;

    // typeof null 的结果为 object ，这里做判断，是为了让有 null 的情况尽早退出函数
    if (a == null || b == null) return false;

    // 判断 NaN
    if (a !== a) return b !== b;

    // 判断参数 a 类型，如果是基本类型，在这里可以直接返回 false
    var type = typeof a;
    if (type !== 'function' &amp;&amp; type !== 'object' &amp;&amp; typeof b != 'object') return false;

    // 更复杂的对象使用 deepEq 函数进行深度比较
    return deepEq(a, b, aStack, bStack);
};

function deepEq(a, b, aStack, bStack) {

    // a 和 b 的内部属性 [[class]] 相同时 返回 true
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;

    switch (className) {
        case '[object RegExp]':
        case '[object String]':
            return '' + a === '' + b;
        case '[object Number]':
            if (+a !== +a) return +b !== +b;
            return +a === 0 ? 1 / +a === 1 / b : +a === +b;
        case '[object Date]':
        case '[object Boolean]':
            return +a === +b;
    }

    var areArrays = className === '[object Array]';
    // 不是数组
    if (!areArrays) {
        // 过滤掉两个函数的情况
        if (typeof a != 'object' || typeof b != 'object') return false;

        var aCtor = a.constructor,
            bCtor = b.constructor;
        // aCtor 和 bCtor 必须都存在并且都不是 Object 构造函数的情况下，aCtor 不等于 bCtor， 那这两个对象就真的不相等啦
        if (aCtor == bCtor &amp;&amp; !(isFunction(aCtor) &amp;&amp; aCtor instanceof aCtor &amp;&amp; isFunction(bCtor) &amp;&amp; bCtor instanceof bCtor) &amp;&amp; ('constructor' in a &amp;&amp; 'constructor' in b)) {
            return false;
        }
    }


    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;

    // 检查是否有循环引用的部分
    while (length--) {
        if (aStack[length] === a) {
            return bStack[length] === b;
        }
    }

    aStack.push(a);
    bStack.push(b);

    // 数组判断
    if (areArrays) {

        length = a.length;
        if (length !== b.length) return false;

        while (length--) {
            if (!eq(a[length], b[length], aStack, bStack)) return false;
        }
    }
    // 对象判断
    else {

        var keys = Object.keys(a),
            key;
        length = keys.length;

        if (Object.keys(b).length !== length) return false;
        while (length--) {

            key = keys[length];
            if (!(b.hasOwnProperty(key) &amp;&amp; eq(a[key], b[key], aStack, bStack))) return false;
        }
    }

    aStack.pop();
    bStack.pop();
    return true;

}

console.log(eq(0, 0)) // true
console.log(eq(0, -0)) // false

console.log(eq(NaN, NaN)); // true
console.log(eq(Number(NaN), Number(NaN))); // true

console.log(eq('Curly', new String('Curly'))); // true

console.log(eq([1], [1])); // true
console.log(eq({ value: 1 }, { value: 1 })); // true

var a, b;

a = { foo: { b: { foo: { c: { foo: null } } } } };
b = { foo: { b: { foo: { c: { foo: null } } } } };
a.foo.b.foo.c.foo = a;
b.foo.b.foo.c.foo = b;

console.log(eq(a, b)) // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> toString = <span class="hljs-built_in">Object</span>.prototype.toString;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isFunction</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">return</span> toString.call(obj) === <span class="hljs-string">'[object Function]'</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">eq</span>(<span class="hljs-params">a, b, aStack, bStack</span>) </span>{

    <span class="hljs-comment">// === 结果为 true 的区别出 +0 和 -0</span>
    <span class="hljs-keyword">if</span> (a === b) <span class="hljs-keyword">return</span> a !== <span class="hljs-number">0</span> || <span class="hljs-number">1</span> / a === <span class="hljs-number">1</span> / b;

    <span class="hljs-comment">// typeof null 的结果为 object ，这里做判断，是为了让有 null 的情况尽早退出函数</span>
    <span class="hljs-keyword">if</span> (a == <span class="hljs-literal">null</span> || b == <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;

    <span class="hljs-comment">// 判断 NaN</span>
    <span class="hljs-keyword">if</span> (a !== a) <span class="hljs-keyword">return</span> b !== b;

    <span class="hljs-comment">// 判断参数 a 类型，如果是基本类型，在这里可以直接返回 false</span>
    <span class="hljs-keyword">var</span> type = <span class="hljs-keyword">typeof</span> a;
    <span class="hljs-keyword">if</span> (type !== <span class="hljs-string">'function'</span> &amp;&amp; type !== <span class="hljs-string">'object'</span> &amp;&amp; <span class="hljs-keyword">typeof</span> b != <span class="hljs-string">'object'</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;

    <span class="hljs-comment">// 更复杂的对象使用 deepEq 函数进行深度比较</span>
    <span class="hljs-keyword">return</span> deepEq(a, b, aStack, bStack);
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deepEq</span>(<span class="hljs-params">a, b, aStack, bStack</span>) </span>{

    <span class="hljs-comment">// a 和 b 的内部属性 [[class]] 相同时 返回 true</span>
    <span class="hljs-keyword">var</span> className = toString.call(a);
    <span class="hljs-keyword">if</span> (className !== toString.call(b)) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;

    <span class="hljs-keyword">switch</span> (className) {
        <span class="hljs-keyword">case</span> <span class="hljs-string">'[object RegExp]'</span>:
        <span class="hljs-keyword">case</span> <span class="hljs-string">'[object String]'</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-string">''</span> + a === <span class="hljs-string">''</span> + b;
        <span class="hljs-keyword">case</span> <span class="hljs-string">'[object Number]'</span>:
            <span class="hljs-keyword">if</span> (+a !== +a) <span class="hljs-keyword">return</span> +b !== +b;
            <span class="hljs-keyword">return</span> +a === <span class="hljs-number">0</span> ? <span class="hljs-number">1</span> / +a === <span class="hljs-number">1</span> / b : +a === +b;
        <span class="hljs-keyword">case</span> <span class="hljs-string">'[object Date]'</span>:
        <span class="hljs-keyword">case</span> <span class="hljs-string">'[object Boolean]'</span>:
            <span class="hljs-keyword">return</span> +a === +b;
    }

    <span class="hljs-keyword">var</span> areArrays = className === <span class="hljs-string">'[object Array]'</span>;
    <span class="hljs-comment">// 不是数组</span>
    <span class="hljs-keyword">if</span> (!areArrays) {
        <span class="hljs-comment">// 过滤掉两个函数的情况</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> a != <span class="hljs-string">'object'</span> || <span class="hljs-keyword">typeof</span> b != <span class="hljs-string">'object'</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;

        <span class="hljs-keyword">var</span> aCtor = a.constructor,
            bCtor = b.constructor;
        <span class="hljs-comment">// aCtor 和 bCtor 必须都存在并且都不是 Object 构造函数的情况下，aCtor 不等于 bCtor， 那这两个对象就真的不相等啦</span>
        <span class="hljs-keyword">if</span> (aCtor == bCtor &amp;&amp; !(isFunction(aCtor) &amp;&amp; aCtor <span class="hljs-keyword">instanceof</span> aCtor &amp;&amp; isFunction(bCtor) &amp;&amp; bCtor <span class="hljs-keyword">instanceof</span> bCtor) &amp;&amp; (<span class="hljs-string">'constructor'</span> <span class="hljs-keyword">in</span> a &amp;&amp; <span class="hljs-string">'constructor'</span> <span class="hljs-keyword">in</span> b)) {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
    }


    aStack = aStack || [];
    bStack = bStack || [];
    <span class="hljs-keyword">var</span> length = aStack.length;

    <span class="hljs-comment">// 检查是否有循环引用的部分</span>
    <span class="hljs-keyword">while</span> (length--) {
        <span class="hljs-keyword">if</span> (aStack[length] === a) {
            <span class="hljs-keyword">return</span> bStack[length] === b;
        }
    }

    aStack.push(a);
    bStack.push(b);

    <span class="hljs-comment">// 数组判断</span>
    <span class="hljs-keyword">if</span> (areArrays) {

        length = a.length;
        <span class="hljs-keyword">if</span> (length !== b.length) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;

        <span class="hljs-keyword">while</span> (length--) {
            <span class="hljs-keyword">if</span> (!eq(a[length], b[length], aStack, bStack)) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
    }
    <span class="hljs-comment">// 对象判断</span>
    <span class="hljs-keyword">else</span> {

        <span class="hljs-keyword">var</span> keys = <span class="hljs-built_in">Object</span>.keys(a),
            key;
        length = keys.length;

        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Object</span>.keys(b).length !== length) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        <span class="hljs-keyword">while</span> (length--) {

            key = keys[length];
            <span class="hljs-keyword">if</span> (!(b.hasOwnProperty(key) &amp;&amp; eq(a[key], b[key], aStack, bStack))) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
    }

    aStack.pop();
    bStack.pop();
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;

}

<span class="hljs-built_in">console</span>.log(eq(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>)) <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(eq(<span class="hljs-number">0</span>, <span class="hljs-number">-0</span>)) <span class="hljs-comment">// false</span>

<span class="hljs-built_in">console</span>.log(eq(<span class="hljs-literal">NaN</span>, <span class="hljs-literal">NaN</span>)); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(eq(<span class="hljs-built_in">Number</span>(<span class="hljs-literal">NaN</span>), <span class="hljs-built_in">Number</span>(<span class="hljs-literal">NaN</span>))); <span class="hljs-comment">// true</span>

<span class="hljs-built_in">console</span>.log(eq(<span class="hljs-string">'Curly'</span>, <span class="hljs-keyword">new</span> <span class="hljs-built_in">String</span>(<span class="hljs-string">'Curly'</span>))); <span class="hljs-comment">// true</span>

<span class="hljs-built_in">console</span>.log(eq([<span class="hljs-number">1</span>], [<span class="hljs-number">1</span>])); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(eq({ <span class="hljs-attr">value</span>: <span class="hljs-number">1</span> }, { <span class="hljs-attr">value</span>: <span class="hljs-number">1</span> })); <span class="hljs-comment">// true</span>

<span class="hljs-keyword">var</span> a, b;

a = { <span class="hljs-attr">foo</span>: { <span class="hljs-attr">b</span>: { <span class="hljs-attr">foo</span>: { <span class="hljs-attr">c</span>: { <span class="hljs-attr">foo</span>: <span class="hljs-literal">null</span> } } } } };
b = { <span class="hljs-attr">foo</span>: { <span class="hljs-attr">b</span>: { <span class="hljs-attr">foo</span>: { <span class="hljs-attr">c</span>: { <span class="hljs-attr">foo</span>: <span class="hljs-literal">null</span> } } } } };
a.foo.b.foo.c.foo = a;
b.foo.b.foo.c.foo = b;

<span class="hljs-built_in">console</span>.log(eq(a, b)) <span class="hljs-comment">// true</span></code></pre>
<p>真让人感叹一句：eq 不愧是 underscore 中实现代码行数最多的函数了！</p>
<h2 id="articleHeader13">专题系列</h2>
<p>JavaScript专题系列目录地址：<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a>。</p>
<p>JavaScript专题系列预计写二十篇左右，主要研究日常开发中一些功能点的实现，比如防抖、节流、去重、类型判断、拷贝、最值、扁平、柯里、递归、乱序、排序等，特点是研(chao)究(xi) underscore 和 jQuery 的实现方式。</p>
<p>如果有错误或者不严谨的地方，请务必给予指正，十分感谢。如果喜欢或者有所启发，欢迎 star，对作者也是一种鼓励。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript专题之如何判断两个对象相等

## 原文链接
[https://segmentfault.com/a/1190000010567491](https://segmentfault.com/a/1190000010567491)

