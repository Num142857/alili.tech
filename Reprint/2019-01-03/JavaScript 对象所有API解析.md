---
title: 'JavaScript 对象所有API解析' 
date: 2019-01-03 2:30:11
hidden: true
slug: zj0dkil4wr
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>之前看到<a href="http://louiszhai.github.io/2017/04/28/array/" rel="nofollow noreferrer" target="_blank">【深度长文】JavaScript数组所有API全解密</a>和<a href="http://louiszhai.github.io/2016/01/12/js.String/" rel="nofollow noreferrer" target="_blank">JavaScript字符串所有API全解密</a>这两篇高质量的文章。发现没写对象API解析（估计是博主觉得简单，就没写）。刚好我看到《JavaScript面向对象编程指南（第2版）》，觉得有必要写（或者说chao）一下，也好熟悉下对象的所有API用法。</blockquote>
<p>创建对象的两种方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var o = new Object();
var o = {}; // 推荐" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> o = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
<span class="hljs-keyword">var</span> o = {}; <span class="hljs-comment">// 推荐</span></code></pre>
<p>该构造器可以接受任何类型的参数，并且会自动识别参数的类型，并选择更合适的构造器来完成相关操作。比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var o = new Object('something');
o.constructor; // ƒ String() { [native code] }
var n = new Object(123);
n.constructor; // ƒ Number() { [native code] }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> o = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>(<span class="hljs-string">'something'</span>);
o.constructor; <span class="hljs-comment">// ƒ String() { [native code] }</span>
<span class="hljs-keyword">var</span> n = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>(<span class="hljs-number">123</span>);
n.constructor; <span class="hljs-comment">// ƒ Number() { [native code] }</span></code></pre>
<h2 id="articleHeader0">一、Object构造器的成员</h2>
<h3 id="articleHeader1">Object.prototype</h3>
<p>该属性是所有对象的原型（包括 <code>Object</code>对象本身），语言中的其他对象正是通过对该属性上添加东西来实现它们之间的继承关系的。所以要小心使用。<br>比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var s = new String('xuanyuan');
Object.prototype.custom = 1;
console.log(s.custom); // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> s = <span class="hljs-keyword">new</span> <span class="hljs-built_in">String</span>(<span class="hljs-string">'xuanyuan'</span>);
<span class="hljs-built_in">Object</span>.prototype.custom = <span class="hljs-number">1</span>;
<span class="hljs-built_in">console</span>.log(s.custom); <span class="hljs-comment">// 1</span></code></pre>
<h2 id="articleHeader2">二、Object.prototype 的成员</h2>
<h3 id="articleHeader3">Object.prototype.constructor</h3>
<p>该属性指向用来构造该函数对象的构造器，在这里为<code>Object()</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.prototype.constructor === Object; // true
var o = new Object();
o.constructor === Object; // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">Object</span>.prototype.<span class="hljs-keyword">constructor</span> === <span class="hljs-keyword">Object</span>; <span class="hljs-comment">// true</span>
<span class="hljs-keyword">var</span> o = new <span class="hljs-keyword">Object</span>();
o.<span class="hljs-keyword">constructor</span> === <span class="hljs-keyword">Object</span>; <span class="hljs-comment">// true</span></code></pre>
<h3 id="articleHeader4">Object.prototype.toString(radix)</h3>
<p>该方法返回的是一个用于描述目标对象的字符串。特别地，当目标是一个Number对象时，可以传递一个用于进制数的参数<code>radix</code>，该参数<code>radix</code>，该参数的默认值为10。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var o = {prop:1};
o.toString(); // '[object Object]'
var n = new Number(255);
n.toString(); // '255'
n.toString(16); // 'ff'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pony"><code><span class="hljs-keyword">var</span> o = {prop:<span class="hljs-number">1</span>};
o.toString(); <span class="hljs-comment">// '[object Object]'</span>
<span class="hljs-keyword">var</span> n = <span class="hljs-function"><span class="hljs-keyword">new</span> <span class="hljs-title">Number</span>(<span class="hljs-number">255</span>);
<span class="hljs-title">n</span>.<span class="hljs-title">toString</span>(); <span class="hljs-comment">// '255'</span>
<span class="hljs-title">n</span>.<span class="hljs-title">toString</span>(<span class="hljs-number">16</span>); <span class="hljs-comment">// 'ff'</span></span></code></pre>
<h3 id="articleHeader5">Object.prototype.toLocaleString()</h3>
<p>该方法的作用与<code>toString()</code>基本相同，只不过它做一些本地化处理。该方法会根据当前对象的不同而被重写，例如<code>Date()</code>,<code>Number()</code>,<code>Array()</code>,它们的值都会以本地化的形式输出。当然，对于包括<code>Object()</code>在内的其他大多数对象来说，该方法与<code>toString()</code>是基本相同的。<br>在浏览器环境下，可以通过<code>BOM</code>对象<code>Navigator</code>的<code>language</code>属性（在<code>IE</code>中则是<code>userLanguage</code>）来了解当前所使用的语言：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="navigator.language; //'en-US'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">navigator.language; <span class="hljs-regexp">//</span><span class="hljs-string">'en-US'</span></code></pre>
<h3 id="articleHeader6">Object.prototype.valueOf()</h3>
<p>该方法返回的是用基本类型所表示的<code>this</code>值，如果它可以用基本类型表示的话。如果<code>Number</code>对象返回的是它的基本数值，而<code>Date</code>对象返回的是一个时间戳（<code>timestamp</code>）。如果无法用基本数据类型表示，该方法会返回<code>this</code>本身。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Object
var o = {};
typeof o.valueOf(); // 'object'
o.valueOf() === o; // true
// Number
var n = new Number(101);
typeof n; // 'object'
typeof n.vauleOf; // 'function'
typeof n.valueOf(); // 'number'
n.valueOf() === n; // false
// Date
var d = new Date();
typeof d.valueOf(); // 'number'
d.valueOf(); // 1503146772355" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// Object</span>
<span class="hljs-keyword">var</span> o = {};
<span class="hljs-keyword">typeof</span> o.valueOf(); <span class="hljs-comment">// 'object'</span>
o.valueOf() === o; <span class="hljs-comment">// true</span>
<span class="hljs-comment">// Number</span>
<span class="hljs-keyword">var</span> n = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Number</span>(<span class="hljs-number">101</span>);
<span class="hljs-keyword">typeof</span> n; <span class="hljs-comment">// 'object'</span>
<span class="hljs-keyword">typeof</span> n.vauleOf; <span class="hljs-comment">// 'function'</span>
<span class="hljs-keyword">typeof</span> n.valueOf(); <span class="hljs-comment">// 'number'</span>
n.valueOf() === n; <span class="hljs-comment">// false</span>
<span class="hljs-comment">// Date</span>
<span class="hljs-keyword">var</span> d = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
<span class="hljs-keyword">typeof</span> d.valueOf(); <span class="hljs-comment">// 'number'</span>
d.valueOf(); <span class="hljs-comment">// 1503146772355</span></code></pre>
<h3 id="articleHeader7">Object.prototype.hasOwnProperty(prop)</h3>
<p>该方法仅在目标属性为对象自身属性时返回<code>true</code>,而当该属性是从原型链中继承而来或根本不存在时，返回<code>false</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var o = {prop:1};
o.hasOwnProperty('prop'); // true
o.hasOwnProperty('toString'); // false
o.hasOwnProperty('formString'); // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>var o = {<span class="hljs-symbol">prop:</span><span class="hljs-number">1</span>};
o.hasOwnProperty(<span class="hljs-string">'prop'</span>); <span class="hljs-regexp">//</span> <span class="hljs-keyword">true</span>
o.hasOwnProperty(<span class="hljs-string">'toString'</span>); <span class="hljs-regexp">//</span> <span class="hljs-keyword">false</span>
o.hasOwnProperty(<span class="hljs-string">'formString'</span>); <span class="hljs-regexp">//</span> <span class="hljs-keyword">false</span></code></pre>
<h3 id="articleHeader8">Object.prototype.isPrototypeOf(obj)</h3>
<p>如果目标对象是当前对象的原型，该方法就会返回<code>true</code>，而且，当前对象所在原型上的所有对象都能通过该测试，并不局限与它的直系关系。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var s = new String('');
Object.prototype.isPrototypeOf(s); // true
String.prototype.isPrototypeOf(s); // true
Array.prototype.isPrototypeOf(s); // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> s = <span class="hljs-keyword">new</span> <span class="hljs-built_in">String</span>(<span class="hljs-string">''</span>);
<span class="hljs-built_in">Object</span>.prototype.isPrototypeOf(s); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">String</span>.prototype.isPrototypeOf(s); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">Array</span>.prototype.isPrototypeOf(s); <span class="hljs-comment">// false</span></code></pre>
<h3 id="articleHeader9">Object.prototype.propertyIsEnumerable(prop)</h3>
<p>如果目标属性能在<code>for in</code>循环中被显示出来，该方法就返回<code>true</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [1,2,3];
a.propertyIsEnumerable('length'); // false
a.propertyIsEnumerable(0); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
a.propertyIsEnumerable('length'); <span class="hljs-comment">// false</span>
a.propertyIsEnumerable(<span class="hljs-number">0</span>); <span class="hljs-comment">// true</span></code></pre>
<h2 id="articleHeader10">三、在<code>ES5</code>中附加的<code>Object</code>属性</h2>
<p>在<code>ES3</code>中，除了一些内置属性（如：<code>Math.PI</code>），对象的所有的属性在任何时候都可以被修改、插入、删除。在<code>ES5</code>中，我们可以设置属性是否可以被改变或是被删除——在这之前，它是内置属性的特权。<code>ES5</code>中引入了<strong>属性描述符</strong>的概念，我们可以通过它对所定义的属性有更大的控制权。这些<strong>属性描述符</strong>（特性）包括：</p>
<blockquote>
<code>value</code>——当试图获取属性时所返回的值。<br><code>writable</code>——该属性是否可写。<br><code>enumerable</code>——该属性在<code>for in</code>循环中是否会被枚举<br><code>configurable</code>——该属性是否可被删除。<br><code>set()</code>——该属性的更新操作所调用的函数。<br><code>get()</code>——获取属性值时所调用的函数。<br>另外，<strong>数据描述符</strong>（其中属性为：<code>enumerable</code>，<code>configurable</code>，<code>value</code>，<code>writable</code>）与<strong>存取描述符</strong>（其中属性为<code>enumerable</code>，<code>configurable</code>，<code>set()</code>，<code>get()</code>）之间是有互斥关系的。在定义了<code>set()</code>和<code>get()</code>之后，描述符会认为存取操作已被 定义了，其中再定义<code>value</code>和<code>writable</code>会<strong>引起错误</strong>。<br>以下是<em>ES3</em>风格的属性定义方式：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var person = {};
person.legs = 2;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>var person = {}<span class="hljs-comment">;</span>
person.legs = <span class="hljs-number">2</span><span class="hljs-comment">;</span></code></pre>
<p>以下是等价的ES5通过<strong>数据描述符</strong>定义属性的方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var person = {};
Object.defineProperty(person, 'legs', {
    value: 2,
    writable: true,
    configurable: true,
    enumerable: true
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">var</span> <span class="hljs-string">person</span> <span class="hljs-string">=</span> <span class="hljs-string">{};</span>
<span class="hljs-string">Object.defineProperty(person,</span> <span class="hljs-string">'legs'</span><span class="hljs-string">,</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    value:</span> <span class="hljs-number">2</span><span class="hljs-string">,</span>
<span class="hljs-attr">    writable:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    configurable:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    enumerable:</span> <span class="hljs-literal">true</span>
<span class="hljs-string">});</span></code></pre>
<p>其中， 除了value的默认值为<code>undefined</code>以外，其他的默认值都为<code>false</code>。这就意味着，如果想要通过这一方式定义一个可写的属性，必须显示将它们设为<code>true</code>。<br>或者，我们也可以通过<code>ES5</code>的存储描述符来定义：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var person = {};
Object.defineProperty(person, 'legs', {
    set:function(v) {
        return this.value = v;
    },
    get: function(v) {
        return this.value;
    },
    configurable: true,
    enumerable: true
});
person.legs = 2;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> person = {};
Object.defineProperty(person, <span class="hljs-string">'legs'</span>, {
    <span class="hljs-keyword">set</span>:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(v)</span> </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.value = v;
    },
    <span class="hljs-keyword">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(v)</span> </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.value;
    },
    configurable: <span class="hljs-literal">true</span>,
    enumerable: <span class="hljs-literal">true</span>
});
person.legs = <span class="hljs-number">2</span>;</code></pre>
<p>这样一来，多了许多可以用来描述属性的代码，如果想要防止别人篡改我们的属性，就必须要用到它们。此外，也不要忘了浏览器向后兼容<code>ES3</code>方面所做的考虑。例如，跟添加<code>Array.prototype</code>属性不一样，我们不能再旧版的浏览器中使用<code>shim</code>这一特性。<br>另外，我们还可以（通过定义<code>nonmalleable</code>属性），在具体行为中运用这些描述符：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var person = {};
Object.defineProperty(person, 'heads', {value: 1});
person.heads = 0; // 0
person.heads; // 1  (改不了)
delete person.heads; // false
person.heads // 1 (删不掉)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> person = {};
<span class="hljs-built_in">Object</span>.defineProperty(person, <span class="hljs-string">'heads'</span>, {<span class="hljs-attr">value</span>: <span class="hljs-number">1</span>});
person.heads = <span class="hljs-number">0</span>; <span class="hljs-comment">// 0</span>
person.heads; <span class="hljs-comment">// 1  (改不了)</span>
<span class="hljs-keyword">delete</span> person.heads; <span class="hljs-comment">// false</span>
person.heads <span class="hljs-comment">// 1 (删不掉)</span></code></pre>
<h3 id="articleHeader11">Object.defineProperty(obj, prop, descriptor) (ES5)</h3>
<p>具体用法可参见上文，或者查看MDN。<br><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty" rel="nofollow noreferrer" target="_blank">MDN Object.defineProperty(obj, descriptor)</a></p>
<blockquote>Vue.js文档：<a href="https://cn.vuejs.org/v2/guide/reactivity.html" rel="nofollow noreferrer" target="_blank"><strong>如何追踪变化</strong></a> 把一个普通 JavaScript 对象传给 Vue 实例的 data 选项，Vue 将遍历此对象所有的属性，并使用 Object.defineProperty 把这些属性全部转为 getter/setter。Object.defineProperty 是仅 ES5 支持，且无法 shim 的特性，这也就是为什么 Vue 不支持 IE8 以及更低版本浏览器的原因。</blockquote>
<h3 id="articleHeader12">Object.defineProperties(obj, props) (ES5)</h3>
<p>该方法的作用与<code>defineProperty()</code>基本相同，只不过它可以用来一次定义多个属性。<br>比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var glass = Object.defineProperties({}, {
    'color': {
        value: 'transparent',
        writable: true
    },
    'fullness': {
        value: 'half',
        writable: false
    }
});
glass.fullness; // 'half'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">var</span> glass = Object.defineProperties({}, {
    <span class="hljs-string">'color'</span>: {
        <span class="hljs-keyword">value</span>: <span class="hljs-string">'transparent'</span>,
        writable: <span class="hljs-literal">true</span>
    },
    <span class="hljs-string">'fullness'</span>: {
        <span class="hljs-keyword">value</span>: <span class="hljs-string">'half'</span>,
        writable: <span class="hljs-literal">false</span>
    }
});
glass.fullness; <span class="hljs-comment">// 'half'</span></code></pre>
<h3 id="articleHeader13">Object.getPrototypeOf(obj) (ES5)</h3>
<p>之前在<code>ES3</code>中，我们往往需要通过<code>Object.prototype.isPrototypeOf()</code>去猜测某个给定的对象的原型是什么，如今在<code>ES5</code>中，我们可以直接询问改对象“你的原型是什么？”</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.getPrototypeOf([]) === Array.prototype; // true
Object.getPrototypeOf(Array.prototype) === Object.prototype; // true
Object.getPrototypeOf(Object.prototype) === null; // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Object</span>.getPrototypeOf([]) === <span class="hljs-built_in">Array</span>.prototype; <span class="hljs-comment">// true</span>
<span class="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-built_in">Array</span>.prototype) === <span class="hljs-built_in">Object</span>.prototype; <span class="hljs-comment">// true</span>
<span class="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-built_in">Object</span>.prototype) === <span class="hljs-literal">null</span>; <span class="hljs-comment">// true</span></code></pre>
<h3 id="articleHeader14">Object.create(obj, descr) (ES5)</h3>
<p>该方法主要用于创建一个新对象，并为其设置原型，用（上述）属性描述符来定义对象的原型属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var parent = {hi: 'Hello'};
var o = Object.create(parent, {
    prop: {
        value: 1
    }
});
o.hi; // 'Hello'
// 获得它的原型
Object.getPrototypeOf(parent) === Object.prototype; // true 说明parent的原型是Object.prototype
Object.getPrototypeOf(o); // {hi: &quot;Hello&quot;} // 说明o的原型是{hi: &quot;Hello&quot;}
o.hasOwnProperty('hi'); // false 说明hi是原型上的
o.hasOwnProperty('prop'); // true 说明prop是原型上的自身上的属性。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">parent</span> = {<span class="hljs-attribute">hi</span>: <span class="hljs-string">'Hello'</span>};
<span class="hljs-built_in">var</span> o = <span class="hljs-built_in">Object</span>.create(<span class="hljs-built_in">parent</span>, {
    <span class="hljs-attribute">prop</span>: {
        <span class="hljs-attribute">value</span>: <span class="hljs-number">1</span>
    }
});
o.hi; <span class="hljs-comment">// 'Hello'</span>
<span class="hljs-comment">// 获得它的原型</span>
<span class="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-built_in">parent</span>) === <span class="hljs-built_in">Object</span>.prototype; <span class="hljs-comment">// true 说明parent的原型是Object.prototype</span>
<span class="hljs-built_in">Object</span>.getPrototypeOf(o); <span class="hljs-comment">// {hi: "Hello"} // 说明o的原型是{hi: "Hello"}</span>
o.hasOwnProperty(<span class="hljs-string">'hi'</span>); <span class="hljs-comment">// false 说明hi是原型上的</span>
o.hasOwnProperty(<span class="hljs-string">'prop'</span>); <span class="hljs-comment">// true 说明prop是原型上的自身上的属性。</span></code></pre>
<p>现在，我们甚至可以用它来创建一个完全空白的对象，这样的事情在<code>ES3</code>中可是做不到的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var o = Object.create(null);
typeof o.toString(); // 'undefined'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> o = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>);
<span class="hljs-keyword">typeof</span> o.toString(); <span class="hljs-comment">// 'undefined'</span></code></pre>
<h3 id="articleHeader15">Object.getOwnPropertyDesciptor(obj, property) (ES5)</h3>
<p>该方法可以让我们详细查看一个属性的定义。甚至可以通过它一窥那些内置的，之前不可见的隐藏属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.getOwnPropertyDescriptor(Object.prototype, 'toString');
// {writable: true, enumerable: false, configurable: true, value: ƒ toString()}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">Object.getOwnPropertyDescriptor(Object.prototype,</span> <span class="hljs-string">'toString'</span><span class="hljs-string">);</span>
<span class="hljs-string">//</span> <span class="hljs-string">{writable:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span> <span class="hljs-attr">enumerable:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span> <span class="hljs-attr">configurable:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span> <span class="hljs-attr">value:</span> <span class="hljs-string">ƒ</span> <span class="hljs-string">toString()}</span></code></pre>
<h3 id="articleHeader16">Object.getOwnPropertyNames(obj) (ES5)</h3>
<p>该方法返回一个数组，其中包含了当前对象所有属性的名称（字符串），不论它们是否可枚举。当然，也可以用<code>Object.keys()</code>来单独返回可枚举的属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.getOwnPropertyNames(Object.prototype);
// [&quot;__defineGetter__&quot;, &quot;__defineSetter__&quot;, &quot;hasOwnProperty&quot;, &quot;__lookupGetter__&quot;, &quot;__lookupSetter__&quot;, &quot;propertyIsEnumerable&quot;, &quot;toString&quot;, &quot;valueOf&quot;, &quot;__proto__&quot;, &quot;constructor&quot;, &quot;toLocaleString&quot;, &quot;isPrototypeOf&quot;]
Object.keys(Object.prototype);
// []
Object.getOwnPropertyNames(Object);
// [&quot;length&quot;, &quot;name&quot;, &quot;arguments&quot;, &quot;caller&quot;, &quot;prototype&quot;, &quot;assign&quot;, &quot;getOwnPropertyDescriptor&quot;, &quot;getOwnPropertyDescriptors&quot;, &quot;getOwnPropertyNames&quot;, &quot;getOwnPropertySymbols&quot;, &quot;is&quot;, &quot;preventExtensions&quot;, &quot;seal&quot;, &quot;create&quot;, &quot;defineProperties&quot;, &quot;defineProperty&quot;, &quot;freeze&quot;, &quot;getPrototypeOf&quot;, &quot;setPrototypeOf&quot;, &quot;isExtensible&quot;, &quot;isFrozen&quot;, &quot;isSealed&quot;, &quot;keys&quot;, &quot;entries&quot;, &quot;values&quot;]
Object.keys(Object);
// []" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>Object.getOwnPropertyNames(Object.prototype);
<span class="hljs-regexp">//</span> [<span class="hljs-string">"__defineGetter__"</span>, <span class="hljs-string">"__defineSetter__"</span>, <span class="hljs-string">"hasOwnProperty"</span>, <span class="hljs-string">"__lookupGetter__"</span>, <span class="hljs-string">"__lookupSetter__"</span>, <span class="hljs-string">"propertyIsEnumerable"</span>, <span class="hljs-string">"toString"</span>, <span class="hljs-string">"valueOf"</span>, <span class="hljs-string">"__proto__"</span>, <span class="hljs-string">"constructor"</span>, <span class="hljs-string">"toLocaleString"</span>, <span class="hljs-string">"isPrototypeOf"</span>]
Object.keys(Object.prototype);
<span class="hljs-regexp">//</span> []
Object.getOwnPropertyNames(Object);
<span class="hljs-regexp">//</span> [<span class="hljs-string">"length"</span>, <span class="hljs-string">"name"</span>, <span class="hljs-string">"arguments"</span>, <span class="hljs-string">"caller"</span>, <span class="hljs-string">"prototype"</span>, <span class="hljs-string">"assign"</span>, <span class="hljs-string">"getOwnPropertyDescriptor"</span>, <span class="hljs-string">"getOwnPropertyDescriptors"</span>, <span class="hljs-string">"getOwnPropertyNames"</span>, <span class="hljs-string">"getOwnPropertySymbols"</span>, <span class="hljs-string">"is"</span>, <span class="hljs-string">"preventExtensions"</span>, <span class="hljs-string">"seal"</span>, <span class="hljs-string">"create"</span>, <span class="hljs-string">"defineProperties"</span>, <span class="hljs-string">"defineProperty"</span>, <span class="hljs-string">"freeze"</span>, <span class="hljs-string">"getPrototypeOf"</span>, <span class="hljs-string">"setPrototypeOf"</span>, <span class="hljs-string">"isExtensible"</span>, <span class="hljs-string">"isFrozen"</span>, <span class="hljs-string">"isSealed"</span>, <span class="hljs-string">"keys"</span>, <span class="hljs-string">"entries"</span>, <span class="hljs-string">"values"</span>]
Object.keys(Object);
<span class="hljs-regexp">//</span> []</code></pre>
<h3 id="articleHeader17">Object.preventExtensions(obj) (ES5)</h3>
<h3 id="articleHeader18">Object.isExtensible(obj) (ES5)</h3>
<p><code>preventExtensions()</code>方法用于禁止向某一对象添加更多属性，而<code>isExtensible()</code>方法则用于检查某对象是否还可以被添加属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var deadline = {};
Object.isExtensible(deadline); // true
deadline.date = 'yesterday'; // 'yesterday'
Object.preventExtensions(deadline);
Object.isExtensible(deadline); // false
deadline.date = 'today';
deadline.date; // 'today'
// 尽管向某个不可扩展的对象中添加属性不算是一个错误操作，但它没有任何作用。
deadline.report = true;
deadline.report; // undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> deadline = {};
<span class="hljs-built_in">Object</span>.isExtensible(deadline); <span class="hljs-comment">// true</span>
deadline.date = <span class="hljs-string">'yesterday'</span>; <span class="hljs-comment">// 'yesterday'</span>
<span class="hljs-built_in">Object</span>.preventExtensions(deadline);
<span class="hljs-built_in">Object</span>.isExtensible(deadline); <span class="hljs-comment">// false</span>
deadline.date = <span class="hljs-string">'today'</span>;
deadline.date; <span class="hljs-comment">// 'today'</span>
<span class="hljs-comment">// 尽管向某个不可扩展的对象中添加属性不算是一个错误操作，但它没有任何作用。</span>
deadline.report = <span class="hljs-keyword">true</span>;
deadline.report; <span class="hljs-comment">// undefined</span></code></pre>
<h3 id="articleHeader19">Object.seal(obj) (ES5)</h3>
<h3 id="articleHeader20">Object.isSeal(obj) (ES5)</h3>
<p><code>seal()</code>方法可以让一个对象密封，并返回被密封后的对象。<br><code>seal()</code>方法的作用与<code>preventExtensions()</code>基本相同，但除此之外，它还会将现有属性<br>设置成不可配置。也就是说，在这种情况下，我们只能变更现有属性的值，但不能删除或（用<code>defineProperty()</code>）重新配置这些属性，例如不能将一个可枚举的属性改成不可枚举。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var person = {legs:2};
// person === Object.seal(person); // true
Object.isSealed(person); // true
Object.getOwnPropertyDescriptor(person, 'legs');
// {value: 2, writable: true, enumerable: true, configurable: false}
delete person.legs; // false (不可删除，不可配置)
Object.defineProperty(person, 'legs',{value:2});
person.legs; // 2
person.legs = 1;
person.legs; // 1 (可写)
Object.defineProperty(person, &quot;legs&quot;, { get: function() { return &quot;legs&quot;; } });
// 抛出TypeError异常" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> person = {<span class="hljs-attr">legs</span>:<span class="hljs-number">2</span>};
<span class="hljs-comment">// person === Object.seal(person); // true</span>
<span class="hljs-built_in">Object</span>.isSealed(person); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">Object</span>.getOwnPropertyDescriptor(person, <span class="hljs-string">'legs'</span>);
<span class="hljs-comment">// {value: 2, writable: true, enumerable: true, configurable: false}</span>
<span class="hljs-keyword">delete</span> person.legs; <span class="hljs-comment">// false (不可删除，不可配置)</span>
<span class="hljs-built_in">Object</span>.defineProperty(person, <span class="hljs-string">'legs'</span>,{<span class="hljs-attr">value</span>:<span class="hljs-number">2</span>});
person.legs; <span class="hljs-comment">// 2</span>
person.legs = <span class="hljs-number">1</span>;
person.legs; <span class="hljs-comment">// 1 (可写)</span>
<span class="hljs-built_in">Object</span>.defineProperty(person, <span class="hljs-string">"legs"</span>, { <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-string">"legs"</span>; } });
<span class="hljs-comment">// 抛出TypeError异常</span></code></pre>
<h3 id="articleHeader21">Object.freeze(obj) (ES5)</h3>
<h3 id="articleHeader22">Object.isFrozen(obj) (ES5)</h3>
<p><code>freeze()</code>方法用于执行一切不受<code>seal()</code>方法限制的属性值变更。<code>Object.freeze()</code> 方法可以冻结一个对象，冻结指的是不能向这个对象添加新的属性，不能修改其已有属性的值，不能删除已有属性，以及不能修改该对象已有属性的可枚举性、可配置性、可写性。也就是说，这个对象永远是不可变的。该方法返回被冻结的对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var deadline = Object.freeze({date: 'yesterday'});
deadline.date = 'tomorrow';
deadline.excuse = 'lame';
deadline.date; // 'yesterday'
deadline.excuse; // undefined
Object.isSealed(deadline); // true;
Object.isFrozen(deadline); // true
Object.getOwnPropertyDescriptor(deadline, 'date');
// {value: &quot;yesterday&quot;, writable: false, enumerable: true, configurable: false} (不可配置，不可写)
Object.keys(deadline); // ['date'] (可枚举)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>var deadline = Object.freeze({<span class="hljs-symbol">date:</span> <span class="hljs-string">'yesterday'</span>});
deadline.date = <span class="hljs-string">'tomorrow'</span>;
deadline.excuse = <span class="hljs-string">'lame'</span>;
deadline.date; <span class="hljs-regexp">//</span> <span class="hljs-string">'yesterday'</span>
deadline.excuse; <span class="hljs-regexp">//</span> undefined
Object.isSealed(deadline); <span class="hljs-regexp">//</span> <span class="hljs-keyword">true</span>;
Object.isFrozen(deadline); <span class="hljs-regexp">//</span> <span class="hljs-keyword">true</span>
Object.getOwnPropertyDescriptor(deadline, <span class="hljs-string">'date'</span>);
<span class="hljs-regexp">//</span> {<span class="hljs-symbol">value:</span> <span class="hljs-string">"yesterday"</span>, <span class="hljs-symbol">writable:</span> <span class="hljs-keyword">false</span>, <span class="hljs-symbol">enumerable:</span> <span class="hljs-keyword">true</span>, <span class="hljs-symbol">configurable:</span> <span class="hljs-keyword">false</span>} (不可配置，不可写)
Object.keys(deadline); <span class="hljs-regexp">//</span> [<span class="hljs-string">'date'</span>] (可枚举)</code></pre>
<h3 id="articleHeader23">Object.keys(obj) (ES5)</h3>
<p>该方法是一种特殊的<code>for-in</code>循环。它只返回当前对象的属性（不像<code>for-in</code>），而且这些属性也必须是可枚举的（这点和<code>Object.getOwnPropertyNames()</code>不同，不论是否可以枚举）。返回值是一个字符串数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.prototype.customProto = 101;
Object.getOwnPropertyNames(Object.prototype);
// [..., &quot;constructor&quot;, &quot;toLocaleString&quot;, &quot;isPrototypeOf&quot;, &quot;customProto&quot;]
Object.keys(Object.prototype); // ['customProto']
var o = {own: 202};
o.customProto; // 101
Object.keys(o); // ['own']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-built_in">Object</span>.prototype.customProto = <span class="hljs-number">101</span>;
<span class="hljs-built_in">Object</span>.getOwnPropertyNames(<span class="hljs-built_in">Object</span>.prototype);
<span class="hljs-comment">// [..., "constructor", "toLocaleString", "isPrototypeOf", "customProto"]</span>
<span class="hljs-built_in">Object</span>.keys(<span class="hljs-built_in">Object</span>.prototype); <span class="hljs-comment">// ['customProto']</span>
<span class="hljs-keyword">var</span> o = {own: <span class="hljs-number">202</span>};
o.customProto; <span class="hljs-comment">// 101</span>
<span class="hljs-built_in">Object</span>.keys(o); <span class="hljs-comment">// ['own']</span></code></pre>
<h3 id="articleHeader24">四、在<code>ES6</code>中附加的<code>Object</code>属性</h3>
<h3 id="articleHeader25">Object.is(value1, value2) (ES6)</h3>
<p>该方法用来比较两个值是否严格相等。它与严格比较运算符（===）的行为基本一致。<br>不同之处只有两个：一是<code>+0</code>不等于<code>-0</code>，而是<code>NaN</code>等于自身。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.is('xuanyuan', 'xuanyuan'); // true
Object.is({},{}); // false
Object.is(+0, -0); // false
+0 === -0; // true
Object.is(NaN, NaN); // true
NaN === NaN; // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-built_in">Object</span>.<span class="hljs-keyword">is</span>(<span class="hljs-string">'xuanyuan'</span>, <span class="hljs-string">'xuanyuan'</span>); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">Object</span>.<span class="hljs-keyword">is</span>({},{}); <span class="hljs-comment">// false</span>
<span class="hljs-built_in">Object</span>.<span class="hljs-keyword">is</span>(+<span class="hljs-number">0</span>, <span class="hljs-number">-0</span>); <span class="hljs-comment">// false</span>
+<span class="hljs-number">0</span> === <span class="hljs-number">-0</span>; <span class="hljs-comment">// true</span>
<span class="hljs-built_in">Object</span>.<span class="hljs-keyword">is</span>(NaN, NaN); <span class="hljs-comment">// true</span>
NaN === NaN; <span class="hljs-comment">// false</span></code></pre>
<p><code>ES5</code>可以通过以下代码部署<code>Object.is</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.defineProperty(Object, 'is', {
    value: function() {x, y} {
        if (x === y) {
           // 针对+0不等于-0的情况
           return x !== 0 || 1 / x === 1 / y;
        }
        // 针对 NaN的情况
        return x !== x &amp;&amp; y !== y;
    },
    configurable: true,
    enumerable: false,
    writable: true
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Object</span>.defineProperty(<span class="hljs-built_in">Object</span>, <span class="hljs-string">'is'</span>, {
    <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{x, y} {
        <span class="hljs-keyword">if</span> (x === y) {
           <span class="hljs-comment">// 针对+0不等于-0的情况</span>
           <span class="hljs-keyword">return</span> x !== <span class="hljs-number">0</span> || <span class="hljs-number">1</span> / x === <span class="hljs-number">1</span> / y;
        }
        <span class="hljs-comment">// 针对 NaN的情况</span>
        <span class="hljs-keyword">return</span> x !== x &amp;&amp; y !== y;
    },
    <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">writable</span>: <span class="hljs-literal">true</span>
});</code></pre>
<h3 id="articleHeader26">Object.assign(target, ...sources) (ES6)</h3>
<p>该方法用来源对象（<code>source</code>）的所有可枚举的属性复制到目标对象（<code>target</code>）。它至少需要两个对象作为参数，第一个参数是目标对象<code>target</code>，后面的参数都是源对象（<code>source</code>）。只有一个参数不是对象，就会抛出<code>TypeError</code>错误。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var target = {a: 1};
var source1 = {b: 2};
var source2 = {c: 3};
obj = Object.assign(target, source1, source2);
target; // {a:1,b:2,c:3}
obj; // {a:1,b:2,c:3}
target === obj; // true
// 如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
var source3 = {a:2,b:3,c:4};
Object.assign(target, source3);
target; // {a:2,b:3,c:4}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">var</span> target = <span class="hljs-comment">{a: 1}</span>;
<span class="hljs-keyword">var</span> source1 = <span class="hljs-comment">{b: 2}</span>;
<span class="hljs-keyword">var</span> source2 = <span class="hljs-comment">{c: 3}</span>;
obj = <span class="hljs-keyword">Object</span>.assign(target, source1, source2);
target; <span class="hljs-comment">// {a:1,b:2,c:3}</span>
obj; <span class="hljs-comment">// {a:1,b:2,c:3}</span>
target === obj; <span class="hljs-comment">// true</span>
<span class="hljs-comment">// 如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。</span>
<span class="hljs-keyword">var</span> source3 = <span class="hljs-comment">{a:2,b:3,c:4}</span>;
<span class="hljs-keyword">Object</span>.assign(target, source3);
target; <span class="hljs-comment">// {a:2,b:3,c:4}</span></code></pre>
<p><code>Object.assign</code>只复制自身属性，不可枚举的属性（<code>enumerable</code>为<code>false</code>）和继承的属性不会被复制。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.assign({b: 'c'}, 
    Object.defineProperty({}, 'invisible', {
        enumerable: false,
        value: 'hello'
    })
);
// {b: 'c'}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">Object</span><span class="hljs-selector-class">.assign</span>({<span class="hljs-attribute">b</span>: <span class="hljs-string">'c'</span>}, 
    <span class="hljs-selector-tag">Object</span><span class="hljs-selector-class">.defineProperty</span>({}, <span class="hljs-string">'invisible'</span>, {
        <span class="hljs-attribute">enumerable</span>: false,
        <span class="hljs-attribute">value</span>: <span class="hljs-string">'hello'</span>
    })
);
<span class="hljs-comment">// {b: 'c'}</span></code></pre>
<p>属性名为<code>Symbol</code>值的属性，也会被<code>Object.assign()</code>复制。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.assign({a: 'b'}, {[Symbol('c')]: 'd'});
// {a: 'b', Symbol(c): 'd'}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>Object.assign({a: <span class="hljs-string">'b'</span>}, {[Symbol(<span class="hljs-string">'c'</span>)]: <span class="hljs-string">'d'</span>});
// {a: <span class="hljs-string">'b'</span>, Symbol(c): <span class="hljs-string">'d'</span>}</code></pre>
<p>对于嵌套的对象，<code>Object.assign()</code>的处理方法是替换，而不是添加。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.assign({a: {b:'c',d:'e'"}}", {a:{b:'hello'"}}");
// {a: {b:'hello'"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">Object</span><span class="hljs-selector-class">.assign</span>({<span class="hljs-attribute">a</span>: {<span class="hljs-attribute">b</span>:<span class="hljs-string">'c'</span>,<span class="hljs-attribute">d</span>:<span class="hljs-string">'e'</span>"}}", {<span class="hljs-attribute">a</span>:{<span class="hljs-attribute">b</span>:<span class="hljs-string">'hello'</span>"}}");
<span class="hljs-comment">// {a: {b:'hello'"}}"</span></code></pre>
<p>对于数组，<code>Object.assign()</code>把数组视为属性名为0、1、2的对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.assign([1,2,3], [4,5]);
// [4,5,3]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>Object.assign([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>], [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>]);
<span class="hljs-comment">// [4,5,3]</span></code></pre>
<h3 id="articleHeader27">Object.getOwnPropertySymbols(obj) (ES6)</h3>
<p>该方法会返回一个数组，该数组包含了指定对象自身的（非继承的）所有 <code>symbol</code> 属性键。<br>该方法和 <code>Object.getOwnPropertyNames()</code> 类似，但后者返回的结果只会包含字符串类型的属性键，也就是传统的属性名。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.getOwnPropertySymbols({a: 'b', [Symbol('c')]: 'd'});
// [Symbol(c)]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-built_in">Object</span>.getOwnPropertySymbols({a: <span class="hljs-string">'b'</span>, [<span class="hljs-built_in">Symbol</span>(<span class="hljs-string">'c'</span>)]: <span class="hljs-string">'d'</span>});
<span class="hljs-comment">// [Symbol(c)]</span></code></pre>
<h3 id="articleHeader28">Object.setPrototypeOf(obj, prototype) (ES6)</h3>
<p>该方法设置一个指定的对象的原型 ( 即, 内部<code>[[Prototype]]</code>属性）到另一个对象或  <code>null</code>。<br><code>__proto__</code>属性用来读取或设置当前对象的<code>prototype</code>对象。目前，所有浏览器（包括<code>IE11</code>）都部署了这个属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES6写法
var obj = {
    method: function(){
        // code ...
    }
};
// obj.__proto__ = someOtherObj;
// ES5写法
var obj = Object.create(someOtherObj);
obj.method = function(){
    // code ...
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// ES6写法</span>
<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">method</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-comment">// code ...</span>
    }
};
<span class="hljs-comment">// obj.__proto__ = someOtherObj;</span>
<span class="hljs-comment">// ES5写法</span>
<span class="hljs-keyword">var</span> obj = <span class="hljs-built_in">Object</span>.create(someOtherObj);
obj.method = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">// code ...</span>
};</code></pre>
<p>该属性没有写入<code>ES6</code>的正文，而是写入了附录。<code>__proto__</code>前后的双下划线说明它本质上是一个内部属性，而不是正式对外的一个API。无论从语义的角度，还是从兼容性的角度，都不要使用这个属性。而是使用<code>Object.setPrototypeOf()</code>（写操作），<code>Object.getPrototypeOf()</code>（读操作），或<code>Object.create()</code>（生成操作）代替。<br>在实现上，<code>__proto__</code>调用的<code>Object.prototype.__proto__</code>。<br><code>Object.setPrototypeOf()</code>方法的作用与<code>__proto__</code>作用相同，用于设置一个对象的<code>prototype</code>对象。它是<code>ES6</code>正式推荐的设置原型对象的方法。</p>
<h2 id="articleHeader29">五、在<code>ES8</code>中附加的<code>Object</code>属性</h2>
<h3 id="articleHeader30">Object.getOwnPropertyDescriptors(obj) (ES8)</h3>
<p>该方法基本与<code>Object.getOwnPropertyDescriptor(obj, property)</code>用法一致，只不过它可以用来获取一个对象的所有自身属性的描述符。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.getOwnPropertyDescriptor(Object.prototype, 'toString');
// {writable: true, enumerable: false, configurable: true, value: ƒ toString()}
Object.getOwnPropertyDescriptors(Object.prototype); // 可以自行在浏览器控制台查看效果。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">Object.getOwnPropertyDescriptor(Object.prototype,</span> <span class="hljs-string">'toString'</span><span class="hljs-string">);</span>
<span class="hljs-string">//</span> <span class="hljs-string">{writable:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span> <span class="hljs-attr">enumerable:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span> <span class="hljs-attr">configurable:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span> <span class="hljs-attr">value:</span> <span class="hljs-string">ƒ</span> <span class="hljs-string">toString()}</span>
<span class="hljs-string">Object.getOwnPropertyDescriptors(Object.prototype);</span> <span class="hljs-string">//</span> <span class="hljs-string">可以自行在浏览器控制台查看效果。</span></code></pre>
<h3 id="articleHeader31">Object.values(obj) (ES8)</h3>
<p><code>Object.values()</code> 方法与<code>Object.keys</code>类似。返回一个给定对象自己的所有可枚举属性值的数组，值的顺序与使用<code>for...in</code>循环的顺序相同 ( 区别在于<code>for-in</code>循环枚举原型链中的属性 )。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {a:1,b:2,c:3};
Object.keys(obj); // ['a','b','c']
Object.values(obj); // [1,2,3]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">var</span> obj = <span class="hljs-comment">{a:1,b:2,c:3}</span>;
<span class="hljs-keyword">Object</span>.keys(obj); <span class="hljs-comment">// ['a','b','c']</span>
<span class="hljs-keyword">Object</span>.values(obj); <span class="hljs-comment">// [1,2,3]</span></code></pre>
<h3 id="articleHeader32">Object.entries(obj) (ES8)</h3>
<p><code>Object.entries()</code> 方法返回一个给定对象自己的可枚举属性<code>[key，value]</code>对的数组，数组中键值对的排列顺序和使用 <code>for...in</code> 循环遍历该对象时返回的顺序一致（区别在于一个<code>for-in</code>循环也枚举原型链中的属性）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {a:1,b:2,c:3};
Object.keys(obj); // ['a','b','c']
Object.values(obj); // [1,2,3]
Object.entries(obj); // [['a',1],['b',2],['c',3]]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>var obj = {a:<span class="hljs-number">1</span>,b:<span class="hljs-number">2</span>,c:<span class="hljs-number">3</span>};
<span class="hljs-symbol">Object</span>.keys(obj); // [<span class="hljs-string">'a'</span>,<span class="hljs-string">'b'</span>,<span class="hljs-string">'c'</span>]
<span class="hljs-symbol">Object</span>.values(obj); // [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]
<span class="hljs-symbol">Object</span>.entries(obj); // [[<span class="hljs-string">'a'</span>,<span class="hljs-number">1</span>],[<span class="hljs-string">'b'</span>,<span class="hljs-number">2</span>],[<span class="hljs-string">'c'</span>,<span class="hljs-number">3</span>]]</code></pre>
<h2 id="articleHeader33">关于</h2>
<p>作者：常以<strong>轩辕Rowboat</strong>为名混迹于江湖。前端路上 | PPT爱好者 | 所知甚少，唯善学。<br><a href="https://lxchuan12.github.io/" rel="nofollow noreferrer" target="_blank">个人博客</a><br><a href="https://segmentfault.com/u/lxchuan12">segmentfault个人主页</a><br><a href="https://juejin.im/user/57974dc55bbb500063f522fd/posts" rel="nofollow noreferrer" target="_blank">掘金个人主页</a><br><a href="https://www.zhihu.com/people/lxchuan12/activities" rel="nofollow noreferrer" target="_blank">知乎</a><br><a href="https://github.com/lxchuan12" rel="nofollow noreferrer" target="_blank">github</a></p>
<h2 id="articleHeader34">小结</h2>
<p>您可能会发现MDN上还有一些API，本文没有列举到。因为那些是非标准的API。熟悉对象的API对理解原型和原型链相关知识会有一定帮助。常用的API主要有<code>Object.prototype.toString()</code>，<code>Object.prototype.hasOwnProperty()</code>， <code>Object.getPrototypeOf(obj)</code>，<code>Object.create()</code>，<code>Object.defineProperty</code>，<code>Object.keys(obj)</code>，<code>Object.assign()</code>。</p>
<h2 id="articleHeader35">参考资料</h2>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object" rel="nofollow noreferrer" target="_blank">MDN Object API</a><br><a href="https://book.douban.com/subject/26302623/" rel="nofollow noreferrer" target="_blank">JavaScript面向对象编程指南（第2版）（豆瓣读书链接）</a><br><a href="http://es6.ruanyifeng.com/" rel="nofollow noreferrer" target="_blank">阮一峰 ES6标准入门2</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 对象所有API解析

## 原文链接
[https://segmentfault.com/a/1190000010753942](https://segmentfault.com/a/1190000010753942)

