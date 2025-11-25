---
title: 'ECMAScript 2017（ES8）特性概述' 
date: 2019-01-09 2:30:11
hidden: true
slug: 822qrmslkx2
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://zhuanlan.zhihu.com/p/27844393" rel="nofollow noreferrer" target="_blank">ECMAScript 2017（ES8）特性概述</a> 整理自 <a href="https://parg.co/b10" rel="nofollow noreferrer" target="_blank">ES8 was Released and here are its Main New Features</a>，归纳于笔者的<a href="https://parg.co/b1c" rel="nofollow noreferrer" target="_blank">现代 JavaScript 开发：语法基础与实践技巧</a>系列文章中；也欢迎关注<a href="https://parg.co/bh1" rel="nofollow noreferrer" target="_blank">前端每周清单系列</a>获得一手资讯。</p></blockquote>
<h2 id="articleHeader0">ECMAScript 2017（ES8）Features</h2>
<p>ECMAScript 2017 或 ES8 与 2017 年六月底由 TC39 正式发布，可以在<a href="https://www.ecma-international.org/ecma-262/8.0/index.html" rel="nofollow noreferrer" target="_blank">这里</a>浏览完整的版本；而 ES8 中代表性的特征包括了字符串填充、对象值遍历、对象的属性描述符获取、 函数参数列表与调用中的尾部逗号、异步函数、共享内存与原子操作等。</p>
<h3 id="articleHeader1">字符串填充</h3>
<p>ES8 中添加了内置的字符串填充函数，分别为 padStart 与 padEnd，该函数能够通过填充字符串的首部或者尾部来保证字符串达到固定的长度；开发者可以指定填充的字符串或者使用默认的空格，函数的声明如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="str.padStart(targetLength [, padString])

str.padEnd(targetLength [, padString])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">str</span><span class="hljs-selector-class">.padStart</span>(<span class="hljs-selector-tag">targetLength</span> <span class="hljs-selector-attr">[, padString]</span>)

<span class="hljs-selector-tag">str</span><span class="hljs-selector-class">.padEnd</span>(<span class="hljs-selector-tag">targetLength</span> <span class="hljs-selector-attr">[, padString]</span>)</code></pre>
<p>如上所示，函数的首个参数为目标长度，即最终生成的字符串长度；第二个参数即是指定的填充字符串：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'es8'.padStart(2);          // 'es8'
'es8'.padStart(5);          // '  es8'
'es8'.padStart(6, 'woof');  // 'wooes8'
'es8'.padStart(14, 'wow');  // 'wowwowwowwoes8'
'es8'.padStart(7, '0');     // '0000es8'
'es8'.padEnd(2);          // 'es8'
'es8'.padEnd(5);          // 'es8  '
'es8'.padEnd(6, 'woof');  // 'es8woo'
'es8'.padEnd(14, 'wow');  // 'es8wowwowwowwo'
'es8'.padEnd(7, '6');     // 'es86666'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scheme"><code><span class="hljs-symbol">'es8</span><span class="hljs-symbol">'.padStart</span>(<span class="hljs-name">2</span>)<span class="hljs-comment">;          // 'es8'</span>
<span class="hljs-symbol">'es8</span><span class="hljs-symbol">'.padStart</span>(<span class="hljs-name">5</span>)<span class="hljs-comment">;          // '  es8'</span>
<span class="hljs-symbol">'es8</span><span class="hljs-symbol">'.padStart</span>(<span class="hljs-name">6</span>, <span class="hljs-symbol">'woof</span>')<span class="hljs-comment">;  // 'wooes8'</span>
<span class="hljs-symbol">'es8</span><span class="hljs-symbol">'.padStart</span>(<span class="hljs-name">14</span>, <span class="hljs-symbol">'wow</span>')<span class="hljs-comment">;  // 'wowwowwowwoes8'</span>
<span class="hljs-symbol">'es8</span><span class="hljs-symbol">'.padStart</span>(<span class="hljs-name">7</span>, <span class="hljs-symbol">'0</span>')<span class="hljs-comment">;     // '0000es8'</span>
<span class="hljs-symbol">'es8</span><span class="hljs-symbol">'.padEnd</span>(<span class="hljs-name">2</span>)<span class="hljs-comment">;          // 'es8'</span>
<span class="hljs-symbol">'es8</span><span class="hljs-symbol">'.padEnd</span>(<span class="hljs-name">5</span>)<span class="hljs-comment">;          // 'es8  '</span>
<span class="hljs-symbol">'es8</span><span class="hljs-symbol">'.padEnd</span>(<span class="hljs-name">6</span>, <span class="hljs-symbol">'woof</span>')<span class="hljs-comment">;  // 'es8woo'</span>
<span class="hljs-symbol">'es8</span><span class="hljs-symbol">'.padEnd</span>(<span class="hljs-name">14</span>, <span class="hljs-symbol">'wow</span>')<span class="hljs-comment">;  // 'es8wowwowwowwo'</span>
<span class="hljs-symbol">'es8</span><span class="hljs-symbol">'.padEnd</span>(<span class="hljs-name">7</span>, <span class="hljs-symbol">'6</span>')<span class="hljs-comment">;     // 'es86666'</span></code></pre>
<h3 id="articleHeader2">对象指遍历</h3>
<p><code>Object.values</code> 函数会返回指定对象的可枚举的属性值数组，数组中值顺序与 <code>for-in</code> 循环保持一致，函数的声明为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.values(obj)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">Object</span><span class="hljs-selector-class">.values</span>(<span class="hljs-selector-tag">obj</span>)</code></pre>
<p>首个参数 <code>obj</code> 即为需要遍历的目标对象，它可以为某个对象或者数组（数组可以看做键为下标的对象）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = { x: 'xxx', y: 1 };
Object.values(obj); // ['xxx', 1]

const obj = ['e', 's', '8']; // same as { 0: 'e', 1: 's', 2: '8' };
Object.values(obj); // ['e', 's', '8']

// when we use numeric keys, the values returned in a numerical 
// order according to the keys
const obj = { 10: 'xxx', 1: 'yyy', 3: 'zzz' };
Object.values(obj); // ['yyy', 'zzz', 'xxx']
Object.values('es8'); // ['e', 's', '8']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>const obj = { x: <span class="hljs-string">'xxx'</span>, y: <span class="hljs-number">1</span> };
Object.values(obj); <span class="hljs-regexp">//</span> [<span class="hljs-string">'xxx'</span>, <span class="hljs-number">1</span>]

const obj = [<span class="hljs-string">'e'</span>, <span class="hljs-string">'s'</span>, <span class="hljs-string">'8'</span>]; <span class="hljs-regexp">//</span> same as { <span class="hljs-number">0</span>: <span class="hljs-string">'e'</span>, <span class="hljs-number">1</span>: <span class="hljs-string">'s'</span>, <span class="hljs-number">2</span>: <span class="hljs-string">'8'</span> };
Object.values(obj); <span class="hljs-regexp">//</span> [<span class="hljs-string">'e'</span>, <span class="hljs-string">'s'</span>, <span class="hljs-string">'8'</span>]

<span class="hljs-regexp">//</span> when we use numeric keys, the values returned <span class="hljs-keyword">in</span> a numerical 
<span class="hljs-regexp">//</span> order according to the keys
const obj = { <span class="hljs-number">10</span>: <span class="hljs-string">'xxx'</span>, <span class="hljs-number">1</span>: <span class="hljs-string">'yyy'</span>, <span class="hljs-number">3</span>: <span class="hljs-string">'zzz'</span> };
Object.values(obj); <span class="hljs-regexp">//</span> [<span class="hljs-string">'yyy'</span>, <span class="hljs-string">'zzz'</span>, <span class="hljs-string">'xxx'</span>]
Object.values(<span class="hljs-string">'es8'</span>); <span class="hljs-regexp">//</span> [<span class="hljs-string">'e'</span>, <span class="hljs-string">'s'</span>, <span class="hljs-string">'8'</span>]</code></pre>
<p>而 <code>Object.entries</code> 方法则会将某个对象的可枚举属性与值按照二维数组的方式返回，数组中顺序与 <code>Object.values</code> 保持一致，该函数的声明与使用为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = { x: 'xxx', y: 1 };
Object.entries(obj); // [['x', 'xxx'], ['y', 1]]

const obj = ['e', 's', '8'];
Object.entries(obj); // [['0', 'e'], ['1', 's'], ['2', '8']]

const obj = { 10: 'xxx', 1: 'yyy', 3: 'zzz' };
Object.entries(obj); // [['1', 'yyy'], ['3', 'zzz'], ['10': 'xxx']]
Object.entries('es8'); // [['0', 'e'], ['1', 's'], ['2', '8']]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>const obj = { x: <span class="hljs-string">'xxx'</span>, y: <span class="hljs-number">1</span> };
<span class="hljs-symbol">Object</span>.entries(obj); // [[<span class="hljs-string">'x'</span>, <span class="hljs-string">'xxx'</span>], [<span class="hljs-string">'y'</span>, <span class="hljs-number">1</span>]]

const obj = [<span class="hljs-string">'e'</span>, <span class="hljs-string">'s'</span>, <span class="hljs-string">'8'</span>];
<span class="hljs-symbol">Object</span>.entries(obj); // [[<span class="hljs-string">'0'</span>, <span class="hljs-string">'e'</span>], [<span class="hljs-string">'1'</span>, <span class="hljs-string">'s'</span>], [<span class="hljs-string">'2'</span>, <span class="hljs-string">'8'</span>]]

const obj = { <span class="hljs-number">10</span>: <span class="hljs-string">'xxx'</span>, <span class="hljs-number">1</span>: <span class="hljs-string">'yyy'</span>, <span class="hljs-number">3</span>: <span class="hljs-string">'zzz'</span> };
<span class="hljs-symbol">Object</span>.entries(obj); // [[<span class="hljs-string">'1'</span>, <span class="hljs-string">'yyy'</span>], [<span class="hljs-string">'3'</span>, <span class="hljs-string">'zzz'</span>], [<span class="hljs-string">'10'</span>: <span class="hljs-string">'xxx'</span>]]
<span class="hljs-symbol">Object</span>.entries(<span class="hljs-string">'es8'</span>); // [[<span class="hljs-string">'0'</span>, <span class="hljs-string">'e'</span>], [<span class="hljs-string">'1'</span>, <span class="hljs-string">'s'</span>], [<span class="hljs-string">'2'</span>, <span class="hljs-string">'8'</span>]]</code></pre>
<h3 id="articleHeader3">对象的属性描述符获取</h3>
<p><code>getOwnPropertyDescriptors</code> 函数会返回指定对象的某个指定属性的描述符；该属性必须是对象自己定义而不是继承自原型链，函数的声明为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.getOwnPropertyDescriptor(obj, prop)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">Object.getOwnPropertyDescriptor(obj, <span class="hljs-keyword">prop</span>)</code></pre>
<p><code>obj</code> 即为源对象，而 <code>prop</code> 即为需要查看的属性名；结果中包含的键可能有 configurable、enumerable、writable、get、set 以及 value。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = { get es8() { return 888; } };
Object.getOwnPropertyDescriptor(obj, 'es8');
// {
//   configurable: true,
//   enumerable: true,
//   get: function es8(){}, //the getter function
//   set: undefined
// }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">const</span> obj = { <span class="hljs-function"><span class="hljs-keyword">get</span> <span class="hljs-title">es8</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-number">888</span>; } };
Object.getOwnPropertyDescriptor(obj, <span class="hljs-string">'es8'</span>);
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//   configurable: true,</span>
<span class="hljs-comment">//   enumerable: true,</span>
<span class="hljs-comment">//   get: function es8(){}, //the getter function</span>
<span class="hljs-comment">//   set: undefined</span>
<span class="hljs-comment">// }</span></code></pre>
<h3 id="articleHeader4">函数参数列表与调用中的尾部逗号</h3>
<p>该特性允许我们在定义或者调用函数时添加尾部逗号而不报错：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function es8(var1, var2, var3,) {
  // ...
}
es8(10, 20, 30,);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">es8</span><span class="hljs-params">(var1, var2, var3,)</span> </span>{
  <span class="hljs-comment">// ...</span>
}
es8(<span class="hljs-number">10</span>, <span class="hljs-number">20</span>, <span class="hljs-number">30</span>,);</code></pre>
<h3 id="articleHeader5">异步函数</h3>
<p>ES8 中允许使用 async/await 语法来定义与执行异步函数，async 关键字会返回某个 AsyncFunction 对象；在内部实现中虽然异步函数与迭代器的实现原理类似，但是其并不会被转化为迭代器函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fetchTextByPromise() {
  return new Promise(resolve => { 
    setTimeout(() => { 
      resolve(&quot;es8&quot;);
    }, 2000);
  });
}
async function sayHello() { 
  const externalFetchedText = await fetchTextByPromise();
  console.log(`Hello, ${externalFetchedText}`); // Hello, es8
}
sayHello();

console.log(1);
sayHello();
console.log(2);

// 调用结果
1 // immediately
2 // immediately
Hello, es8 // after 2 seconds" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetchTextByPromise</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> { 
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { 
      resolve(<span class="hljs-string">"es8"</span>);
    }, <span class="hljs-number">2000</span>);
  });
}
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayHello</span>(<span class="hljs-params"></span>) </span>{ 
  <span class="hljs-keyword">const</span> externalFetchedText = <span class="hljs-keyword">await</span> fetchTextByPromise();
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Hello, <span class="hljs-subst">${externalFetchedText}</span>`</span>); <span class="hljs-comment">// Hello, es8</span>
}
sayHello();

<span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
sayHello();
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);

<span class="hljs-comment">// 调用结果</span>
<span class="hljs-number">1</span> <span class="hljs-comment">// immediately</span>
<span class="hljs-number">2</span> <span class="hljs-comment">// immediately</span>
Hello, es8 <span class="hljs-comment">// after 2 seconds</span></code></pre>
<h3 id="articleHeader6">共享内存与原子操作</h3>
<p>共享内存允许多个线程并发读写数据，而原子操作则能够进行并发控制，确保多个存在竞争关系的线程顺序执行。本部分则介绍了新的构造器 <code>SharedArrayBuffer</code> 与包含静态方法的命名空间对象 <code>Atomics</code>。<code>Atomic</code> 对象类似于 <code>Math</code>，我们无法直接创建其实例，而只能使用其提供的静态方法：</p>
<ul>
<li><p>add /sub - 增加或者减去某个位置的某个值</p></li>
<li><p>and / or /xor - 进行位操作</p></li>
<li><p>load - 获取值</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ECMAScript 2017（ES8）特性概述

## 原文链接
[https://segmentfault.com/a/1190000010156802](https://segmentfault.com/a/1190000010156802)

