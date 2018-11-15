---
title: ES6走走看看—由块级作用域引出的一场变革
reprint: true
categories: reprint
abbrlink: dfea777f
date: 2018-10-22 00:00:00
---

{{% raw %}}

                    
<p>持续更新的github笔记，链接地址：<a href="https://github.com/qiqihaobenben/Front-End-Basics" rel="nofollow noreferrer" target="_blank">Front-End-Basics</a>  </p>
<p>此篇文章的笔记地址：<a href="https://qiqihaobenben.gitbooks.io/front-end-basics/content/JavaScript/ES6/string.html" rel="nofollow noreferrer" target="_blank">字符到底发生了什么变化</a>  </p>
<p><strong>ES6走走看看系列，特别鸣谢奇舞读书会~</strong></p>
<hr>
<h2 id="articleHeader0">块级作用域又称词法作用域，存在于：</h2>
<ul>
<li>函数内部（函数作用域）</li>
<li>块中（字符 { 和 } 之间的区域）</li>
</ul>
<p><b>注意：ES6允许块级作用域任意嵌套</b></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{{{{{{let text = 'Hello World!'}}}}}}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code style="word-break: break-word; white-space: initial;">{{{{{{let text = <span class="hljs-string">'Hello World!'</span>}}}}}}</code></pre>
<p>因为有了块级作用域，然后我们才有继续往下聊的可能。</p>
<h2 id="articleHeader1">1、 块级声明</h2>
<p>块级声明是用于声明在指定块的作用域之外无法访问的变量。</p>
<h2 id="articleHeader2">2、 let声明：用来声明一个块级作用域变量</h2>
<p>1、 声明的变量具有块级作用域的特性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 例子
function getValue (condition) {
    if (condition) {
        let value = 'blue';
        return value;
    }
    console.log(value)
    // 报错 value is not defined
}
getValue()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code><span class="hljs-comment">// 例子</span>
<span class="hljs-keyword">function</span> getValue (condition) {
    <span class="hljs-keyword">if</span> (condition) {
        <span class="hljs-keyword">let</span> <span class="hljs-keyword">value</span> = <span class="hljs-string">'blue'</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">value</span>;
    }
    console.log(<span class="hljs-keyword">value</span>)
    <span class="hljs-comment">// 报错 value is not defined</span>
}
getValue()</code></pre>
<p>2、 在同一个作用域内不能使用let声明同名的变量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 不管是var,const或者let,新的let声明之前同名的变量，都会报错
var count = 30;
let count = 40;
// 报错 Identifier 'count' has already been declared

// 函数形参和函数内部的let声明变量重名，报错
function test(value) {
    let value = 3;
}
test()
// 报错 Identifier 'value' has already been declared

// 在不同的作用域声明的变量重名是没问题的
let count = 30;
if(true) {
  let count = 40;
  // 不同的作用域，不会报错
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs swift"><code><span class="hljs-comment">// 不管是var,const或者let,新的let声明之前同名的变量，都会报错</span>
<span class="hljs-keyword">var</span> <span class="hljs-built_in">count</span> = <span class="hljs-number">30</span>;
<span class="hljs-keyword">let</span> <span class="hljs-built_in">count</span> = <span class="hljs-number">40</span>;
<span class="hljs-comment">// 报错 Identifier 'count' has already been declared</span>

<span class="hljs-comment">// 函数形参和函数内部的let声明变量重名，报错</span>
function test(value) {
    <span class="hljs-keyword">let</span> value = <span class="hljs-number">3</span>;
}
test()
<span class="hljs-comment">// 报错 Identifier 'value' has already been declared</span>

<span class="hljs-comment">// 在不同的作用域声明的变量重名是没问题的</span>
<span class="hljs-keyword">let</span> <span class="hljs-built_in">count</span> = <span class="hljs-number">30</span>;
<span class="hljs-keyword">if</span>(<span class="hljs-literal">true</span>) {
  <span class="hljs-keyword">let</span> <span class="hljs-built_in">count</span> = <span class="hljs-number">40</span>;
  <span class="hljs-comment">// 不同的作用域，不会报错</span>
}
</code></pre>
<p>3、 声明没有预解析，不存在变量提升，有“临时死区”(TDZ)</p>
<p>从块的开始到变量声明这段的区域被称为临时死区，ES6明确规定，如果区块中存在let和const命令，则这个区块对这些命令声明的变量从一开始就形成封闭作用域，只要在声明之前就使用这些变量（赋值，引用等等），就会报错。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(true) {
    console.log(typeof value);
    // 报错 value is not defined

    let value = 'blue';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">if</span>(<span class="hljs-literal">true</span>) {
    console.log(<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">value</span>);
    <span class="hljs-comment">// 报错 value is not defined</span>

    <span class="hljs-keyword">let</span> <span class="hljs-keyword">value</span> = <span class="hljs-string">'blue'</span>;
}</code></pre>
<p><b>注意：TDZ是区域是“块开始”到“变量声明”，下面的例子不报错</b></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// typeof 说是相对安全，确实是，永远拿不到想要的结果
console.log(typeof value); // 打印 undefined，没有报错
if(true) {
    let value = 'red';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-comment">// typeof 说是相对安全，确实是，永远拿不到想要的结果</span>
console.log(<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">value</span>); <span class="hljs-comment">// 打印 undefined，没有报错</span>
<span class="hljs-keyword">if</span>(<span class="hljs-literal">true</span>) {
    <span class="hljs-keyword">let</span> <span class="hljs-keyword">value</span> = <span class="hljs-string">'red'</span>;
}</code></pre>
<h2 id="articleHeader3">3、 const声明：声明常量（如PI），值一旦被设定后不可更改</h2>
<p>1、 常量声明的值是不可变的</p>
<p><b>注意：const声明的对象不允许修改绑定，但可以修改该对象的属性值。</b></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const number = 6;
number = 5;
// 报错 Assignment to constant variable

const obj = {number: 1};
obj.number = 2; // 不报错

obj = {number: 3};
// 报错 Assignment to constant variable" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code><span class="hljs-keyword">const</span> <span class="hljs-built_in">number</span> = <span class="hljs-number">6</span><span class="hljs-comment">;</span>
<span class="hljs-built_in">number</span> = <span class="hljs-number">5</span><span class="hljs-comment">;</span>
// 报错 Assignment <span class="hljs-keyword">to</span> constant variable

<span class="hljs-keyword">const</span> obj = {<span class="hljs-built_in">number</span>: <span class="hljs-number">1</span>}<span class="hljs-comment">;</span>
obj.<span class="hljs-built_in">number</span> = <span class="hljs-number">2</span><span class="hljs-comment">; // 不报错</span>

obj = {<span class="hljs-built_in">number</span>: <span class="hljs-number">3</span>}<span class="hljs-comment">;</span>
// 报错 Assignment <span class="hljs-keyword">to</span> constant variable</code></pre>
<p>2、 因为常量声明后值就不可更改了，所以声明时必须赋值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 有效的常量
const count = 30;

// 报错 Missing initializer in const declaration
const name;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-comment">// 有效的常量</span>
<span class="hljs-keyword">const</span> count = <span class="hljs-number">30</span>;

<span class="hljs-comment">// 报错 Missing initializer in const declaration</span>
<span class="hljs-keyword">const</span> <span class="hljs-keyword">name</span>;</code></pre>
<p>3、 声明的常量具有块级作用域的特性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(true) {
    const number = 5;
}
console.log(number)
// 报错 number is not defined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code><span class="hljs-keyword">if</span>(<span class="hljs-literal">true</span>) {
    <span class="hljs-keyword">const</span> <span class="hljs-built_in">number</span> = <span class="hljs-number">5</span><span class="hljs-comment">;</span>
}
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">number</span>)
// 报错 <span class="hljs-built_in">number</span> is <span class="hljs-literal">not</span> defined</code></pre>
<p>4、 在同一个作用域内不能使用const声明同名的变量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var message = 'Hello';
let age = 25;

// 这两条语句都会报错
const message = 'Good';
const age = 30;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">message</span> = <span class="hljs-string">'Hello'</span>;
let age = <span class="hljs-number">25</span>;

<span class="hljs-comment">// 这两条语句都会报错</span>
<span class="hljs-keyword">const</span> <span class="hljs-keyword">message</span> = <span class="hljs-string">'Good'</span>;
<span class="hljs-keyword">const</span> age = <span class="hljs-number">30</span>;</code></pre>
<p>5、 声明没有预解析，不存在变量提升，有“临时死区”(TDZ)</p>
<p><br></p>
<p><b>总结：一张表格</b></p>
<table>
<thead><tr>
<th>声明方式</th>
<th>变量提升</th>
<th>作用域</th>
<th>是否需要初始值</th>
<th>重复定义</th>
</tr></thead>
<tbody>
<tr>
<td>var</td>
<td>是</td>
<td>函数级</td>
<td>不需要</td>
<td>允许</td>
</tr>
<tr>
<td>let</td>
<td>否</td>
<td>块级</td>
<td>不需要</td>
<td>不允许</td>
</tr>
<tr>
<td>const</td>
<td>否</td>
<td>块级</td>
<td>需要</td>
<td>不允许</td>
</tr>
</tbody>
</table>
<p><b>扩展：再提一下变量命名，不管是var、let、const声明的变量名，可以由数字，字母，下划线及美元符号组成，但是不能以数字开头。美元符号可以放到任何一个位置，甚至单独一个美元符号。</b></p>
<h2 id="articleHeader4">4、 循环中的块作用域绑定</h2>
<blockquote>循环中的let声明</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第一个对比
// before
for(var i = 0; i < 5; i++) {
    // ... 省略一些代码
}
console.log(i)  // 5

//after
for(let i = 0; i < 5; i++) {
    // ... 省略一些代码
}
console.log(i) // 报错 i is not defined


// 第二个对比
// before
var funcs = [];
for(var i = 0; i < 10; i++) {
    funcs.push(() => {console.log(i)})
}
funcs.forEach((ele) => {
    ele()
})
// 打印 10次 10

// after
var funcs = [];
for(let i = 0; i < 10; i++) {
    funcs.push(() => {console.log(i)})
}
funcs.forEach((ele) => {
    ele()
})
// 打印 0 1 2 3 4 5 6 7 8 9" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 第一个对比</span>
<span class="hljs-comment">// before</span>
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">5</span>; i++) {
    <span class="hljs-comment">// ... 省略一些代码</span>
}
<span class="hljs-built_in">console</span>.log(i)  <span class="hljs-comment">// 5</span>

<span class="hljs-comment">//after</span>
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">5</span>; i++) {
    <span class="hljs-comment">// ... 省略一些代码</span>
}
<span class="hljs-built_in">console</span>.log(i) <span class="hljs-comment">// 报错 i is not defined</span>


<span class="hljs-comment">// 第二个对比</span>
<span class="hljs-comment">// before</span>
<span class="hljs-keyword">var</span> funcs = [];
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
    funcs.push(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {<span class="hljs-built_in">console</span>.log(i)})
}
funcs.forEach(<span class="hljs-function">(<span class="hljs-params">ele</span>) =&gt;</span> {
    ele()
})
<span class="hljs-comment">// 打印 10次 10</span>

<span class="hljs-comment">// after</span>
<span class="hljs-keyword">var</span> funcs = [];
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
    funcs.push(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {<span class="hljs-built_in">console</span>.log(i)})
}
funcs.forEach(<span class="hljs-function">(<span class="hljs-params">ele</span>) =&gt;</span> {
    ele()
})
<span class="hljs-comment">// 打印 0 1 2 3 4 5 6 7 8 9</span></code></pre>
<p><b>注意：有一点很重要，let 声明在循环内部的行为是标准中专门定义的，它不一定与 let 不提升特性有关。</b></p>
<blockquote>循环中的const声明</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// for 循环会报错
for (const i = 0; i < 1; i++) {
    console.log(i)
}
// 打印 0 ，然后报错 Assignment to constant variable.

// for-in 和 for-of 不会报错
var object = {
    a: true,
    b: true,
    c: true
};
for (const key in object) {
    // 不要在循环体内更改key的值，会报错
    console.log(key)
}
// 打印 a b c" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-comment">// for 循环会报错</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">1</span>; i++) {
    console.log(i)
}
<span class="hljs-comment">// 打印 0 ，然后报错 Assignment to constant variable.</span>

<span class="hljs-comment">// for-in 和 for-of 不会报错</span>
<span class="hljs-keyword">var</span> <span class="hljs-keyword">object</span> = {
    a: <span class="hljs-literal">true</span>,
    b: <span class="hljs-literal">true</span>,
    c: <span class="hljs-literal">true</span>
};
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> key <span class="hljs-keyword">in</span> <span class="hljs-keyword">object</span>) {
    <span class="hljs-comment">// 不要在循环体内更改key的值，会报错</span>
    console.log(key)
}
<span class="hljs-comment">// 打印 a b c</span></code></pre>
<p><b>注意：const可以应用在 for-in 和 for-of 循环中，是因为每次迭代不会修改已有绑定，而是会创建一个新绑定。</b></p>
<h2 id="articleHeader5">5、 块级绑定最佳实践的进化</h2>
<blockquote>ES6 早期</blockquote>
<p>普遍认为默认使用let来替代var,对于写保护的变量使用const</p>
<blockquote>ES6 使用中</blockquote>
<p>普遍默认使用const，只有确实需要改变变量的值时使用let。因为大部分变量的值在初始化后不应再改变，而预料之外的变量值的改变是许多bug的源头。这样就可以在某种程度上实现代码的不可变，从而防止某些错误的发生。</p>
<h2 id="articleHeader6">6、 全局变量将逐步与顶层对象的属性脱钩</h2>
<p>顶层对象，在浏览器环境指的是window对象，在Node指的是global对象。</p>
<p>为了保持兼容性，var命令和function命令声明的全局变量，依旧是顶层对象的属性；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1;
window.a // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
<span class="hljs-built_in">window</span>.a <span class="hljs-comment">// 1</span></code></pre>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVbgyJO?w=2378&amp;h=560" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="var 声明的a，在右侧 global 里面" title="var 声明的a，在右侧 global 里面" style="cursor: pointer;"></span></p>
<p>另一方面规定，let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVbgyJP?w=2396&amp;h=666" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>上图可见let 声明的变量，并没有在Window对象里，而是一个新的Script对象。</p>
<p><b>扩展：如果需要在浏览器中跨frame或window访问代码，仍然可以用var在全局对象下定义变量。</b></p>
<h2 id="articleHeader7">7、 块级函数</h2>
<p>从ECMAScript 6开始，在严格模式下，块里的函数作用域为这个块。ECMAScript 6之前不建议块级函数在严格模式下使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict';

function f() {
  return 1;
}

{
  function f() {
    return 2;
  }
}

f() === 1; // true

// f() === 2 在非严格模式下相等" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">'use strict'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}

{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-number">2</span>;
  }
}

f() === <span class="hljs-number">1</span>; <span class="hljs-comment">// true</span>

<span class="hljs-comment">// f() === 2 在非严格模式下相等</span></code></pre>
<p><b>注意：在非严格模式下不要用块级函数，因为在非严格模式下，块中函数的声明表现奇怪，有兼容性风险</b></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (shouldDefineZero) {
   function zero() {     // DANGER: 兼容性风险
      console.log(&quot;This is zero.&quot;);
   }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">if</span> (shouldDefineZero) {
   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">zero</span>(<span class="hljs-params"></span>) </span>{     <span class="hljs-comment">// DANGER: 兼容性风险</span>
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"This is zero."</span>);
   }
}</code></pre>
<p>ECMAScript 6中，如果shouldDefineZero是false，则永远不会定义zero,因为这个块不执行。这是新标准定义的。然而，这里存在历史遗留问题，无论这个块是否执行，一些浏览器会定义zero。</p>
<p>在严格模式下，所有支持ECMAScript 6的浏览器以相同的方式处理：只有在shouldDefineZero为true的情况下定义zero，并且作用域只是这个块内。</p>

                
{{% /raw %}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://segmentfault.com/a/1190000016300953](https://segmentfault.com/a/1190000016300953)

## 原文标题
ES6走走看看—由块级作用域引出的一场变革
