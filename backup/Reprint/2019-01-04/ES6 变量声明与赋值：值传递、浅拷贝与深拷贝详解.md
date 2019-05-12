---
title: 'ES6 变量声明与赋值：值传递、浅拷贝与深拷贝详解' 
date: 2019-01-04 2:30:10
hidden: true
slug: rpohaayze7s
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://zhuanlan.zhihu.com/p/28508795" rel="nofollow noreferrer" target="_blank">ES6 变量声明与赋值：值传递、浅拷贝与深拷贝详解</a>归纳于笔者的<a href="https://parg.co/bjK" rel="nofollow noreferrer" target="_blank">现代 JavaScript 开发：语法基础与实践技巧</a>系列文章。本文首先介绍 ES6 中常用的三种变量声明方式，然后讨论了 JavaScript 按值传递的特性，最后介绍了复合类型拷贝的技巧；有兴趣的可以阅读下一章节 <a href="https://zhuanlan.zhihu.com/p/28494566" rel="nofollow noreferrer" target="_blank">ES6 变量作用域与提升：变量的生命周期详解</a>。</p></blockquote>
<h1 id="articleHeader0">变量声明与赋值</h1>
<p>ES6 为我们引入了 let 与 const 两种新的变量声明关键字，同时也引入了块作用域；本文首先介绍 ES6 中常用的三种变量声明方式，然后讨论了 JavaScript 按值传递的特性以及多种的赋值方式，最后介绍了复合类型拷贝的技巧。</p>
<h1 id="articleHeader1">变量声明</h1>
<p>在 JavaScript 中，基本的变量声明可以用 var 方式；JavaScript 允许省略 var，直接对未声明的变量赋值。也就是说，<code>var a = 1</code> 与 <code>a = 1</code>，这两条语句的效果相同。但是由于这样的做法很容易不知不觉地创建全局变量（尤其是在函数内部），所以建议总是使用 var 命令声明变量。在 ES6 中，对于变量声明的方式进行了扩展，引入了 let 与 const。var 与 let 两个关键字创建变量的区别在于， var 声明的变量作用域是最近的函数块；而 let 声明的变量作用域是最近的闭合块，往往会小于函数块。另一方面，以 let 关键字创建的变量虽然同样被提升到作用域头部，但是并不能在实际声明前使用；如果强行使用则会抛出 ReferenceError 异常。</p>
<h2 id="articleHeader2">var</h2>
<p>var 是 JavaScript 中基础的变量声明方式之一，其基本语法为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x; // Declaration and initialization
x = &quot;Hello World&quot;; // Assignment

// Or all in one
var y = &quot;Hello World&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> x; <span class="hljs-comment">// Declaration and initialization</span>
x = <span class="hljs-string">"Hello World"</span>; <span class="hljs-comment">// Assignment</span>

<span class="hljs-comment">// Or all in one</span>
<span class="hljs-keyword">var</span> y = <span class="hljs-string">"Hello World"</span>;</code></pre>
<p>ECMAScript 6 以前我们在 JavaScript 中并没有其他的变量声明方式，以 <code>var</code> 声明的变量作用于函数作用域中，如果没有相应的闭合函数作用域，那么该变量会被当做默认的全局变量进行处理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sayHello(){
  var hello = &quot;Hello World&quot;;
  return hello;
}
console.log(hello);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayHello</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span> hello = <span class="hljs-string">"Hello World"</span>;
  <span class="hljs-keyword">return</span> hello;
}
<span class="hljs-built_in">console</span>.log(hello);</code></pre>
<p>像如上这种调用方式会抛出异常: <code>ReferenceError: hello is not defined</code>，因为 <code>hello</code> 变量只能作用于 <code>sayHello</code> 函数中，不过如果按照如下先声明全局变量方式再使用时，其就能够正常调用:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var hello = &quot;Hello World&quot;;
function sayHello(){
  return hello;
}
console.log(hello);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> hello = <span class="hljs-string">"Hello World"</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayHello</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">return</span> hello;
}
<span class="hljs-built_in">console</span>.log(hello);</code></pre>
<h2 id="articleHeader3">let</h2>
<p>在 ECMAScript 6 中我们可以使用 <code>let</code> 关键字进行变量声明:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let x; // Declaration and initialization
x = &quot;Hello World&quot;; // Assignment

// Or all in one
let y = &quot;Hello World&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code><span class="hljs-keyword">let</span> x; // Declaration <span class="hljs-literal">and</span> initialization
<span class="hljs-attr">x</span> = <span class="hljs-string">"Hello World"</span>; // Assignment

// Or all <span class="hljs-keyword">in</span> one
<span class="hljs-keyword">let</span> <span class="hljs-attr">y</span> = <span class="hljs-string">"Hello World"</span>;</code></pre>
<p><code>let</code> 关键字声明的变量是属于块作用域，也就是包含在 <code>{}</code> 之内的作用于。使用 <code>let</code> 关键字的优势在于能够降低偶然的错误的概率，因为其保证了每个变量只能在最小的作用域内进行访问。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = &quot;Peter&quot;;
if(name === &quot;Peter&quot;){
  let hello = &quot;Hello Peter&quot;;
} else {
  let hello = &quot;Hi&quot;;
}
console.log(hello);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code>var <span class="hljs-attr">name</span> = <span class="hljs-string">"Peter"</span>;
<span class="hljs-keyword">if</span>(<span class="hljs-attr">name</span> === <span class="hljs-string">"Peter"</span>){
  <span class="hljs-keyword">let</span> <span class="hljs-attr">hello</span> = <span class="hljs-string">"Hello Peter"</span>;
} <span class="hljs-keyword">else</span> {
  <span class="hljs-keyword">let</span> <span class="hljs-attr">hello</span> = <span class="hljs-string">"Hi"</span>;
}
console.log(hello);</code></pre>
<p>上述代码同样会抛出 <code>ReferenceError: hello is not defined</code> 异常，因为 <code>hello</code> 只能够在闭合的块作用域中进行访问，我们可以进行如下修改:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = &quot;Peter&quot;;
if(name === &quot;Peter&quot;){
  let hello = &quot;Hello Peter&quot;;
  console.log(hello);
} else {
  let hello = &quot;Hi&quot;;
  console.log(hello);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code>var <span class="hljs-attr">name</span> = <span class="hljs-string">"Peter"</span>;
<span class="hljs-keyword">if</span>(<span class="hljs-attr">name</span> === <span class="hljs-string">"Peter"</span>){
  <span class="hljs-keyword">let</span> <span class="hljs-attr">hello</span> = <span class="hljs-string">"Hello Peter"</span>;
  console.log(hello);
} <span class="hljs-keyword">else</span> {
  <span class="hljs-keyword">let</span> <span class="hljs-attr">hello</span> = <span class="hljs-string">"Hi"</span>;
  console.log(hello);
}</code></pre>
<p>我们可以利用这种块级作用域的特性来避免闭包中因为变量保留而导致的问题，譬如如下两种异步代码，使用 var 时每次循环中使用的都是相同变量；而使用 let 声明的 i 则会在每次循环时进行不同的绑定，即每次循环中闭包捕获的都是不同的 i 实例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(let i = 0;i < 2; i++){
        setTimeout(()=>{console.log(`i:${i}`)},0);
}

for(var j = 0;j < 2; j++){
        setTimeout(()=>{console.log(`j:${j}`)},0);
}

let k = 0;
for(k = 0;k < 2; k++){
        setTimeout(()=>{console.log(`k:${k}`)},0);
}

// output
i:0
i:1
j:2
j:2
k:2
k:2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>;i &lt; <span class="hljs-number">2</span>; i++){
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`i:<span class="hljs-subst">${i}</span>`</span>)},<span class="hljs-number">0</span>);
}

<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>;j &lt; <span class="hljs-number">2</span>; j++){
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`j:<span class="hljs-subst">${j}</span>`</span>)},<span class="hljs-number">0</span>);
}

<span class="hljs-keyword">let</span> k = <span class="hljs-number">0</span>;
<span class="hljs-keyword">for</span>(k = <span class="hljs-number">0</span>;k &lt; <span class="hljs-number">2</span>; k++){
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`k:<span class="hljs-subst">${k}</span>`</span>)},<span class="hljs-number">0</span>);
}

<span class="hljs-comment">// output</span>
i:<span class="hljs-number">0</span>
i:<span class="hljs-number">1</span>
j:<span class="hljs-number">2</span>
j:<span class="hljs-number">2</span>
k:<span class="hljs-number">2</span>
k:<span class="hljs-number">2</span></code></pre>
<h2 id="articleHeader4">const</h2>
<p><code>const</code> 关键字一般用于常量声明，用 <code>const</code> 关键字声明的常量需要在声明时进行初始化并且不可以再进行修改，并且 <code>const</code> 关键字声明的常量被限制于块级作用域中进行访问。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f() {
  {
    let x;
    {
      // okay, block scoped name
      const x = &quot;sneaky&quot;;
      // error, const
      x = &quot;foo&quot;;
    }
    // error, already declared in block
    let x = &quot;inner&quot;;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
  {
    <span class="hljs-keyword">let</span> x;
    {
      <span class="hljs-comment">// okay, block scoped name</span>
      <span class="hljs-keyword">const</span> x = <span class="hljs-string">"sneaky"</span>;
      <span class="hljs-comment">// error, const</span>
      x = <span class="hljs-string">"foo"</span>;
    }
    <span class="hljs-comment">// error, already declared in block</span>
    <span class="hljs-keyword">let</span> x = <span class="hljs-string">"inner"</span>;
  }
}</code></pre>
<p>JavaScript 中 const 关键字的表现于 C 中存在着一定差异，譬如下述使用方式在 JavaScript 中就是正确的，而在 C 中则抛出异常：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# JavaScript
const numbers = [1, 2, 3, 4, 6]
numbers[4] = 5
console.log(numbers[4]) // print 5 

# C
const int numbers[] = {1, 2, 3, 4, 6};
numbers[4] = 5; // error: read-only variable is not assignable
printf(&quot;%d\n&quot;, numbers[4]); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code># JavaScript
const numbers = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">6</span>]
numbers[<span class="hljs-number">4</span>] = <span class="hljs-number">5</span>
console.log(numbers[<span class="hljs-number">4</span>]) <span class="hljs-comment">// print 5 </span>

# C
const int numbers[] = {<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">6</span>};
numbers[<span class="hljs-number">4</span>] = <span class="hljs-number">5</span>; <span class="hljs-comment">// error: read-only variable is not assignable</span>
printf(<span class="hljs-string">"%d<span class="hljs-subst">\n</span>"</span>, numbers[<span class="hljs-number">4</span>]); </code></pre>
<p>从上述对比我们也可以看出，JavaScript 中 const 限制的并非值不可变性；而是创建了不可变的绑定，即对于某个值的只读引用，并且禁止了对于该引用的重赋值，即如下的代码会触发错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const numbers = [1, 2, 3, 4, 6]
numbers = [7, 8, 9, 10, 11] // error: assignment to constant variable
console.log(numbers[4])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>const numbers = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">6</span>]
numbers = [<span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>, <span class="hljs-number">10</span>, <span class="hljs-number">11</span>] <span class="hljs-comment">// error: assignment to constant variable</span>
console.log(numbers[<span class="hljs-number">4</span>])</code></pre>
<p>我们可以参考如下图片理解这种机制，每个变量标识符都会关联某个存放变量实际值的物理地址；所谓只读的变量即是该变量标识符不可以被重新赋值，而该变量指向的值还是可变的。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010652254" src="https://static.alili.tech/img/remote/1460000010652254" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>JavaScript 中存在着所谓的原始类型与复合类型，使用 const 声明的原始类型是值不可变的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# Example 1
const a = 10
a = a + 1 // error: assignment to constant variable
# Example 2
const isTrue = true
isTrue = false // error: assignment to constant variable
# Example 3
const sLower = 'hello world'
const sUpper = sLower.toUpperCase() // create a new string
console.log(sLower) // print hello world
console.log(sUpper) // print HELLO WORLD" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vala"><code><span class="hljs-meta"># Example 1</span>
<span class="hljs-keyword">const</span> a = <span class="hljs-number">10</span>
a = a + <span class="hljs-number">1</span> <span class="hljs-comment">// error: assignment to constant variable</span>
<span class="hljs-meta"># Example 2</span>
<span class="hljs-keyword">const</span> isTrue = <span class="hljs-literal">true</span>
isTrue = <span class="hljs-literal">false</span> <span class="hljs-comment">// error: assignment to constant variable</span>
<span class="hljs-meta"># Example 3</span>
<span class="hljs-keyword">const</span> sLower = <span class="hljs-string">'hello world'</span>
<span class="hljs-keyword">const</span> sUpper = sLower.toUpperCase() <span class="hljs-comment">// create a new string</span>
console.log(sLower) <span class="hljs-comment">// print hello world</span>
console.log(sUpper) <span class="hljs-comment">// print HELLO WORLD</span></code></pre>
<p>而如果我们希望将某个对象同样变成不可变类型，则需要使用 <code>Object.freeze()</code>；不过该方法仅对于键值对的 Object 起作用，而无法作用于 Date、Map 与 Set 等类型：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# Example 4
const me = Object.freeze({name: “Jacopo”})
me.age = 28
console.log(me.age) // print undefined
# Example 5
const arr = Object.freeze([-1, 1, 2, 3])
arr[0] = 0
console.log(arr[0]) // print -1
# Example 6
const me = Object.freeze({
  name: 'Jacopo', 
  pet: {
    type: 'dog',
    name: 'Spock'
  }
})
me.pet.name = 'Rocky'
me.pet.breed = 'German Shepherd'
console.log(me.pet.name) // print Rocky
console.log(me.pet.breed) // print German Shepherd" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code># Example <span class="hljs-number">4</span>
const <span class="hljs-keyword">me</span> = Object.freeze({name: “Jacopo”})
<span class="hljs-keyword">me</span>.age = <span class="hljs-number">28</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">me</span>.age) // <span class="hljs-keyword">print</span> undefined
# Example <span class="hljs-number">5</span>
const arr = Object.freeze([-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>])
arr[<span class="hljs-number">0</span>] = <span class="hljs-number">0</span>
console.<span class="hljs-built_in">log</span>(arr[<span class="hljs-number">0</span>]) // <span class="hljs-keyword">print</span> -<span class="hljs-number">1</span>
# Example <span class="hljs-number">6</span>
const <span class="hljs-keyword">me</span> = Object.freeze({
  name: <span class="hljs-string">'Jacopo'</span>, 
  <span class="hljs-keyword">pe</span><span class="hljs-variable">t:</span> {
    <span class="hljs-built_in">type</span>: <span class="hljs-string">'dog'</span>,
    name: <span class="hljs-string">'Spock'</span>
  }
})
<span class="hljs-keyword">me</span>.pet.name = <span class="hljs-string">'Rocky'</span>
<span class="hljs-keyword">me</span>.pet.breed = <span class="hljs-string">'German Shepherd'</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">me</span>.pet.name) // <span class="hljs-keyword">print</span> Rocky
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">me</span>.pet.breed) // <span class="hljs-keyword">print</span> German Shepherd</code></pre>
<p>即使是 <code>Object.freeze()</code> 也只能防止顶层属性被修改，而无法限制对于嵌套属性的修改，这一点我们会在下文的浅拷贝与深拷贝部分继续讨论。</p>
<h1 id="articleHeader5">变量赋值</h1>
<h2 id="articleHeader6">按值传递</h2>
<p>JavaScript 中永远是按值传递（pass-by-value），只不过当我们传递的是某个对象的引用时，这里的值指的是对象的引用。按值传递中函数的形参是被调用时所传实参的副本。修改形参的值并不会影响实参。而按引用传递（pass-by-reference）时，函数的形参接收实参的隐式引用，而不再是副本。这意味着函数形参的值如果被修改，实参也会被修改。同时两者指向相同的值。我们首先看下 C 中按值传递与引用传递的区别：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void Modify(int p, int * q)
{
    p = 27; // 按值传递 - p是实参a的副本, 只有p被修改
    *q = 27; // q是b的引用，q和b都被修改
}
int main()
{
    int a = 1;
    int b = 1;
    Modify(a, &amp;b);   // a 按值传递, b 按引用传递,
                     // a 未变化, b 改变了
    return(0);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">Modify</span><span class="hljs-params">(<span class="hljs-keyword">int</span> p, <span class="hljs-keyword">int</span> * q)</span>
</span>{
    p = <span class="hljs-number">27</span>; <span class="hljs-comment">// 按值传递 - p是实参a的副本, 只有p被修改</span>
    *q = <span class="hljs-number">27</span>; <span class="hljs-comment">// q是b的引用，q和b都被修改</span>
}
<span class="hljs-function"><span class="hljs-keyword">int</span> <span class="hljs-title">main</span><span class="hljs-params">()</span>
</span>{
    <span class="hljs-keyword">int</span> a = <span class="hljs-number">1</span>;
    <span class="hljs-keyword">int</span> b = <span class="hljs-number">1</span>;
    Modify(a, &amp;b);   <span class="hljs-comment">// a 按值传递, b 按引用传递,</span>
                     <span class="hljs-comment">// a 未变化, b 改变了</span>
    <span class="hljs-keyword">return</span>(<span class="hljs-number">0</span>);
}</code></pre>
<p>而在 JavaScript 中，对比例子如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function changeStuff(a, b, c)
{
  a = a * 10;
  b.item = &quot;changed&quot;;
  c = {item: &quot;changed&quot;};
}

var num = 10;
var obj1 = {item: &quot;unchanged&quot;};
var obj2 = {item: &quot;unchanged&quot;};

changeStuff(num, obj1, obj2);

console.log(num);
console.log(obj1.item);    
console.log(obj2.item);

// 输出结果
10
changed
unchanged" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">changeStuff</span>(<span class="hljs-params">a, b, c</span>)
</span>{
  a = a * <span class="hljs-number">10</span>;
  b.item = <span class="hljs-string">"changed"</span>;
  c = {<span class="hljs-attr">item</span>: <span class="hljs-string">"changed"</span>};
}

<span class="hljs-keyword">var</span> num = <span class="hljs-number">10</span>;
<span class="hljs-keyword">var</span> obj1 = {<span class="hljs-attr">item</span>: <span class="hljs-string">"unchanged"</span>};
<span class="hljs-keyword">var</span> obj2 = {<span class="hljs-attr">item</span>: <span class="hljs-string">"unchanged"</span>};

changeStuff(num, obj1, obj2);

<span class="hljs-built_in">console</span>.log(num);
<span class="hljs-built_in">console</span>.log(obj1.item);    
<span class="hljs-built_in">console</span>.log(obj2.item);

<span class="hljs-comment">// 输出结果</span>
<span class="hljs-number">10</span>
changed
unchanged</code></pre>
<p>JavaScript 按值传递就表现于在内部修改了 c 的值但是并不会影响到外部的 obj2 变量。如果我们更深入地来理解这个问题，JavaScript 对于对象的传递则是按共享传递的（pass-by-sharing，也叫按对象传递、按对象共享传递）。最早由Barbara Liskov. 在1974年的GLU语言中提出；该求值策略被用于Python、Java、Ruby、JS等多种语言。该策略的重点是：调用函数传参时，函数接受对象实参引用的副本(既不是按值传递的对象副本，也不是按引用传递的隐式引用)。 它和按引用传递的不同在于：在共享传递中对函数形参的赋值，不会影响实参的值。按共享传递的直接表现就是上述代码中的 obj1，当我们在函数内修改了 b 指向的对象的属性值时，我们使用 obj1 来访问相同的变量时同样会得到变化后的值。</p>
<h2 id="articleHeader7">连续赋值</h2>
<p>JavaScript 中是支持变量的连续赋值，即譬如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a=b=1;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">var a</span>=b=1;</code></pre>
<p>但是在连续赋值中，会发生引用保留，可以考虑如下情景：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var a = {n:1};  
a.x = a = {n:2};  
alert(a.x); // --> undefined  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>
var a = {<span class="hljs-string">n:</span><span class="hljs-number">1</span>};  
a.x = a = {<span class="hljs-string">n:</span><span class="hljs-number">2</span>};  
alert(a.x); <span class="hljs-comment">// --&gt; undefined  </span></code></pre>
<p>为了解释上述问题，我们引入一个新的变量:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var a = {n:1};  
var b = a; // 持有a，以回查  
a.x = a = {n:2};  
alert(a.x);// --> undefined  
alert(b.x);// --> [object Object]  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>
var a = {n:<span class="hljs-number">1</span>}<span class="hljs-comment">;  </span>
var <span class="hljs-keyword">b </span>= a<span class="hljs-comment">; // 持有a，以回查  </span>
a.x = a = {n:<span class="hljs-number">2</span>}<span class="hljs-comment">;  </span>
alert(a.x)<span class="hljs-comment">;// --&gt; undefined  </span>
alert(<span class="hljs-keyword">b.x);// </span>--&gt; [object Object]  </code></pre>
<p>实际上在连续赋值中，值是直接赋予给变量指向的内存地址：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
              a.x  =  a  = {n:2}
              │      │
      {n:1}<──┘      └─>{n:2}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>
              <span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.x</span>  =  <span class="hljs-selector-tag">a</span>  = {n:<span class="hljs-number">2</span>}
              │      │
      {n:<span class="hljs-number">1</span>}&lt;──┘      └─&gt;{n:<span class="hljs-number">2</span>}</code></pre>
<h2 id="articleHeader8">Deconstruction: 解构赋值</h2>
<p>解构赋值允许你使用类似数组或对象字面量的语法将数组和对象的属性赋给各种变量。这种赋值语法极度简洁，同时还比传统的属性访问方法更为清晰。传统的访问数组前三个元素的方式为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var first = someArray[0];
    var second = someArray[1];
    var third = someArray[2];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> first = someArray[<span class="hljs-number">0</span>];
    <span class="hljs-keyword">var</span> second = someArray[<span class="hljs-number">1</span>];
    <span class="hljs-keyword">var</span> third = someArray[<span class="hljs-number">2</span>];</code></pre>
<p>而通过解构赋值的特性，可以变为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var [first, second, third] = someArray;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code style="word-break: break-word; white-space: initial;">    <span class="hljs-built_in">var</span> [<span class="hljs-built_in">first</span>, <span class="hljs-built_in">second</span>, <span class="hljs-built_in">third</span>] = someArray;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// === Arrays

var [a, b] = [1, 2];
console.log(a, b);
//=> 1 2


// Use from functions, only select from pattern
var foo = () => {
  return [1, 2, 3];
};

var [a, b] = foo();
console.log(a, b);
// => 1 2


// Omit certain values
var [a, , b] = [1, 2, 3];
console.log(a, b);
// => 1 3


// Combine with spread/rest operator (accumulates the rest of the values)
var [a, ...b] = [1, 2, 3];
console.log(a, b);
// => 1 [ 2, 3 ]


// Fail-safe.
var [, , , a, b] = [1, 2, 3];
console.log(a, b);
// => undefined undefined


// Swap variables easily without temp
var a = 1, b = 2;
[b, a] = [a, b];
console.log(a, b);
// => 2 1


// Advance deep arrays
var [a, [b, [c, d]]] = [1, [2, [[[3, 4], 5], 6]]];
console.log(&quot;a:&quot;, a, &quot;b:&quot;, b, &quot;c:&quot;, c, &quot;d:&quot;, d);
// => a: 1 b: 2 c: [ [ 3, 4 ], 5 ] d: 6


// === Objects

var {user: x} = {user: 5};
console.log(x);
// => 5


// Fail-safe
var {user: x} = {user2: 5};
console.log(x);
// => undefined


// More values
var {prop: x, prop2: y} = {prop: 5, prop2: 10};
console.log(x, y);
// => 5 10

// Short-hand syntax
var { prop, prop2} = {prop: 5, prop2: 10};
console.log(prop, prop2);
// => 5 10

// Equal to:
var { prop: prop, prop2: prop2} = {prop: 5, prop2: 10};
console.log(prop, prop2);
// => 5 10

// Oops: This doesn't work:
var a, b;
{ a, b } = {a: 1, b: 2};

// But this does work
var a, b;
({ a, b } = {a: 1, b: 2});
console.log(a, b);
// => 1 2

// This due to the grammar in JS. 
// Starting with { implies a block scope, not an object literal. 
// () converts to an expression.

// From Harmony Wiki:
// Note that object literals cannot appear in
// statement positions, so a plain object
// destructuring assignment statement
//  { x } = y must be parenthesized either
// as ({ x } = y) or ({ x }) = y.

// Combine objects and arrays
var {prop: x, prop2: [, y]} = {prop: 5, prop2: [10, 100]};
console.log(x, y);
// => 5 100


// Deep objects
var {
  prop: x,
  prop2: {
    prop2: {
      nested: [ , , b]
    }
  }
} = { prop: &quot;Hello&quot;, prop2: { prop2: { nested: [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]"}}"};
console.log(x, b);
// => Hello c


// === Combining all to make fun happen

// All well and good, can we do more? Yes!
// Using as method parameters
var foo = function ({prop: x}) {
  console.log(x);
};

foo({invalid: 1});
foo({prop: 1});
// => undefined
// => 1


// Can also use with the advanced example
var foo = function ({
  prop: x,
  prop2: {
    prop2: {
      nested: b
    }
  }
}) {
  console.log(x, ...b);
};
foo({ prop: &quot;Hello&quot;, prop2: { prop2: { nested: [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]"}}"});
// => Hello a b c


// In combination with other ES2015 features.

// Computed property names
const name = 'fieldName';
const computedObject = { [name]: name }; // (where object is { 'fieldName': 'fieldName' })
const { [name]: nameValue } = computedObject;
console.log(nameValue)
// => fieldName



// Rest and defaults
var ajax = function ({ url = &quot;localhost&quot;, port: p = 80}, ...data) {
  console.log(&quot;Url:&quot;, url, &quot;Port:&quot;, p, &quot;Rest:&quot;, data);
};

ajax({ url: &quot;someHost&quot; }, &quot;additional&quot;, &quot;data&quot;, &quot;hello&quot;);
// => Url: someHost Port: 80 Rest: [ 'additional', 'data', 'hello' ]

ajax({ }, &quot;additional&quot;, &quot;data&quot;, &quot;hello&quot;);
// => Url: localhost Port: 80 Rest: [ 'additional', 'data', 'hello' ]


// Ooops: Doesn't work (in traceur)
var ajax = ({ url = &quot;localhost&quot;, port: p = 80}, ...data) => {
  console.log(&quot;Url:&quot;, url, &quot;Port:&quot;, p, &quot;Rest:&quot;, data);
};
ajax({ }, &quot;additional&quot;, &quot;data&quot;, &quot;hello&quot;);
// probably due to traceur compiler

But this does:
var ajax = ({ url: url = &quot;localhost&quot;, port: p = 80}, ...data) => {
  console.log(&quot;Url:&quot;, url, &quot;Port:&quot;, p, &quot;Rest:&quot;, data);
};
ajax({ }, &quot;additional&quot;, &quot;data&quot;, &quot;hello&quot;);


// Like _.pluck
var users = [
  { user: &quot;Name1&quot; },
  { user: &quot;Name2&quot; },
  { user: &quot;Name2&quot; },
  { user: &quot;Name3&quot; }
];
var names = users.map( ({ user }) => user );
console.log(names);
// => [ 'Name1', 'Name2', 'Name2', 'Name3' ]


// Advanced usage with Array Comprehension and default values
var users = [
  { user: &quot;Name1&quot; },
  { user: &quot;Name2&quot;, age: 2 },
  { user: &quot;Name2&quot; },
  { user: &quot;Name3&quot;, age: 4 }
];

[for ({ user, age = &quot;DEFAULT AGE&quot; } of users) console.log(user, age)];
// => Name1 DEFAULT AGE
// => Name2 2
// => Name2 DEFAULT AGE
// => Name3 4
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// === Arrays</span>

<span class="hljs-keyword">var</span> [a, b] = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>];
<span class="hljs-built_in">console</span>.log(a, b);
<span class="hljs-comment">//=&gt; 1 2</span>


<span class="hljs-comment">// Use from functions, only select from pattern</span>
<span class="hljs-keyword">var</span> foo = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
};

<span class="hljs-keyword">var</span> [a, b] = foo();
<span class="hljs-built_in">console</span>.log(a, b);
<span class="hljs-comment">// =&gt; 1 2</span>


<span class="hljs-comment">// Omit certain values</span>
<span class="hljs-keyword">var</span> [a, , b] = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
<span class="hljs-built_in">console</span>.log(a, b);
<span class="hljs-comment">// =&gt; 1 3</span>


<span class="hljs-comment">// Combine with spread/rest operator (accumulates the rest of the values)</span>
<span class="hljs-keyword">var</span> [a, ...b] = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
<span class="hljs-built_in">console</span>.log(a, b);
<span class="hljs-comment">// =&gt; 1 [ 2, 3 ]</span>


<span class="hljs-comment">// Fail-safe.</span>
<span class="hljs-keyword">var</span> [, , , a, b] = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
<span class="hljs-built_in">console</span>.log(a, b);
<span class="hljs-comment">// =&gt; undefined undefined</span>


<span class="hljs-comment">// Swap variables easily without temp</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>, b = <span class="hljs-number">2</span>;
[b, a] = [a, b];
<span class="hljs-built_in">console</span>.log(a, b);
<span class="hljs-comment">// =&gt; 2 1</span>


<span class="hljs-comment">// Advance deep arrays</span>
<span class="hljs-keyword">var</span> [a, [b, [c, d]]] = [<span class="hljs-number">1</span>, [<span class="hljs-number">2</span>, [[[<span class="hljs-number">3</span>, <span class="hljs-number">4</span>], <span class="hljs-number">5</span>], <span class="hljs-number">6</span>]]];
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"a:"</span>, a, <span class="hljs-string">"b:"</span>, b, <span class="hljs-string">"c:"</span>, c, <span class="hljs-string">"d:"</span>, d);
<span class="hljs-comment">// =&gt; a: 1 b: 2 c: [ [ 3, 4 ], 5 ] d: 6</span>


<span class="hljs-comment">// === Objects</span>

<span class="hljs-keyword">var</span> {<span class="hljs-attr">user</span>: x} = {<span class="hljs-attr">user</span>: <span class="hljs-number">5</span>};
<span class="hljs-built_in">console</span>.log(x);
<span class="hljs-comment">// =&gt; 5</span>


<span class="hljs-comment">// Fail-safe</span>
<span class="hljs-keyword">var</span> {<span class="hljs-attr">user</span>: x} = {<span class="hljs-attr">user2</span>: <span class="hljs-number">5</span>};
<span class="hljs-built_in">console</span>.log(x);
<span class="hljs-comment">// =&gt; undefined</span>


<span class="hljs-comment">// More values</span>
<span class="hljs-keyword">var</span> {<span class="hljs-attr">prop</span>: x, <span class="hljs-attr">prop2</span>: y} = {<span class="hljs-attr">prop</span>: <span class="hljs-number">5</span>, <span class="hljs-attr">prop2</span>: <span class="hljs-number">10</span>};
<span class="hljs-built_in">console</span>.log(x, y);
<span class="hljs-comment">// =&gt; 5 10</span>

<span class="hljs-comment">// Short-hand syntax</span>
<span class="hljs-keyword">var</span> { prop, prop2} = {<span class="hljs-attr">prop</span>: <span class="hljs-number">5</span>, <span class="hljs-attr">prop2</span>: <span class="hljs-number">10</span>};
<span class="hljs-built_in">console</span>.log(prop, prop2);
<span class="hljs-comment">// =&gt; 5 10</span>

<span class="hljs-comment">// Equal to:</span>
<span class="hljs-keyword">var</span> { <span class="hljs-attr">prop</span>: prop, <span class="hljs-attr">prop2</span>: prop2} = {<span class="hljs-attr">prop</span>: <span class="hljs-number">5</span>, <span class="hljs-attr">prop2</span>: <span class="hljs-number">10</span>};
<span class="hljs-built_in">console</span>.log(prop, prop2);
<span class="hljs-comment">// =&gt; 5 10</span>

<span class="hljs-comment">// Oops: This doesn't work:</span>
<span class="hljs-keyword">var</span> a, b;
{ a, b } = {<span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>};

<span class="hljs-comment">// But this does work</span>
<span class="hljs-keyword">var</span> a, b;
({ a, b } = {<span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>});
<span class="hljs-built_in">console</span>.log(a, b);
<span class="hljs-comment">// =&gt; 1 2</span>

<span class="hljs-comment">// This due to the grammar in JS. </span>
<span class="hljs-comment">// Starting with { implies a block scope, not an object literal. </span>
<span class="hljs-comment">// () converts to an expression.</span>

<span class="hljs-comment">// From Harmony Wiki:</span>
<span class="hljs-comment">// Note that object literals cannot appear in</span>
<span class="hljs-comment">// statement positions, so a plain object</span>
<span class="hljs-comment">// destructuring assignment statement</span>
<span class="hljs-comment">//  { x } = y must be parenthesized either</span>
<span class="hljs-comment">// as ({ x } = y) or ({ x }) = y.</span>

<span class="hljs-comment">// Combine objects and arrays</span>
<span class="hljs-keyword">var</span> {<span class="hljs-attr">prop</span>: x, <span class="hljs-attr">prop2</span>: [, y]} = {<span class="hljs-attr">prop</span>: <span class="hljs-number">5</span>, <span class="hljs-attr">prop2</span>: [<span class="hljs-number">10</span>, <span class="hljs-number">100</span>]};
<span class="hljs-built_in">console</span>.log(x, y);
<span class="hljs-comment">// =&gt; 5 100</span>


<span class="hljs-comment">// Deep objects</span>
<span class="hljs-keyword">var</span> {
  <span class="hljs-attr">prop</span>: x,
  <span class="hljs-attr">prop2</span>: {
    <span class="hljs-attr">prop2</span>: {
      <span class="hljs-attr">nested</span>: [ , , b]
    }
  }
} = { <span class="hljs-attr">prop</span>: <span class="hljs-string">"Hello"</span>, <span class="hljs-attr">prop2</span>: { <span class="hljs-attr">prop2</span>: { <span class="hljs-attr">nested</span>: [<span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>, <span class="hljs-string">"c"</span>]"}}"};
<span class="hljs-built_in">console</span>.log(x, b);
<span class="hljs-comment">// =&gt; Hello c</span>


<span class="hljs-comment">// === Combining all to make fun happen</span>

<span class="hljs-comment">// All well and good, can we do more? Yes!</span>
<span class="hljs-comment">// Using as method parameters</span>
<span class="hljs-keyword">var</span> foo = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">{prop: x}</span>) </span>{
  <span class="hljs-built_in">console</span>.log(x);
};

foo({<span class="hljs-attr">invalid</span>: <span class="hljs-number">1</span>});
foo({<span class="hljs-attr">prop</span>: <span class="hljs-number">1</span>});
<span class="hljs-comment">// =&gt; undefined</span>
<span class="hljs-comment">// =&gt; 1</span>


<span class="hljs-comment">// Can also use with the advanced example</span>
<span class="hljs-keyword">var</span> foo = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">{
  prop: x,
  prop2: {
    prop2: {
      nested: b
    }
  }
}</span>) </span>{
  <span class="hljs-built_in">console</span>.log(x, ...b);
};
foo({ <span class="hljs-attr">prop</span>: <span class="hljs-string">"Hello"</span>, <span class="hljs-attr">prop2</span>: { <span class="hljs-attr">prop2</span>: { <span class="hljs-attr">nested</span>: [<span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>, <span class="hljs-string">"c"</span>]"}}"});
<span class="hljs-comment">// =&gt; Hello a b c</span>


<span class="hljs-comment">// In combination with other ES2015 features.</span>

<span class="hljs-comment">// Computed property names</span>
<span class="hljs-keyword">const</span> name = <span class="hljs-string">'fieldName'</span>;
<span class="hljs-keyword">const</span> computedObject = { [name]: name }; <span class="hljs-comment">// (where object is { 'fieldName': 'fieldName' })</span>
<span class="hljs-keyword">const</span> { [name]: nameValue } = computedObject;
<span class="hljs-built_in">console</span>.log(nameValue)
<span class="hljs-comment">// =&gt; fieldName</span>



<span class="hljs-comment">// Rest and defaults</span>
<span class="hljs-keyword">var</span> ajax = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">{ url = <span class="hljs-string">"localhost"</span>, port: p = <span class="hljs-number">80</span>}, ...data</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Url:"</span>, url, <span class="hljs-string">"Port:"</span>, p, <span class="hljs-string">"Rest:"</span>, data);
};

ajax({ <span class="hljs-attr">url</span>: <span class="hljs-string">"someHost"</span> }, <span class="hljs-string">"additional"</span>, <span class="hljs-string">"data"</span>, <span class="hljs-string">"hello"</span>);
<span class="hljs-comment">// =&gt; Url: someHost Port: 80 Rest: [ 'additional', 'data', 'hello' ]</span>

ajax({ }, <span class="hljs-string">"additional"</span>, <span class="hljs-string">"data"</span>, <span class="hljs-string">"hello"</span>);
<span class="hljs-comment">// =&gt; Url: localhost Port: 80 Rest: [ 'additional', 'data', 'hello' ]</span>


<span class="hljs-comment">// Ooops: Doesn't work (in traceur)</span>
<span class="hljs-keyword">var</span> ajax = <span class="hljs-function">(<span class="hljs-params">{ url = <span class="hljs-string">"localhost"</span>, port: p = <span class="hljs-number">80</span>}, ...data</span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Url:"</span>, url, <span class="hljs-string">"Port:"</span>, p, <span class="hljs-string">"Rest:"</span>, data);
};
ajax({ }, <span class="hljs-string">"additional"</span>, <span class="hljs-string">"data"</span>, <span class="hljs-string">"hello"</span>);
<span class="hljs-comment">// probably due to traceur compiler</span>

But <span class="hljs-keyword">this</span> does:
<span class="hljs-keyword">var</span> ajax = <span class="hljs-function">(<span class="hljs-params">{ url: url = <span class="hljs-string">"localhost"</span>, port: p = <span class="hljs-number">80</span>}, ...data</span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Url:"</span>, url, <span class="hljs-string">"Port:"</span>, p, <span class="hljs-string">"Rest:"</span>, data);
};
ajax({ }, <span class="hljs-string">"additional"</span>, <span class="hljs-string">"data"</span>, <span class="hljs-string">"hello"</span>);


<span class="hljs-comment">// Like _.pluck</span>
<span class="hljs-keyword">var</span> users = [
  { <span class="hljs-attr">user</span>: <span class="hljs-string">"Name1"</span> },
  { <span class="hljs-attr">user</span>: <span class="hljs-string">"Name2"</span> },
  { <span class="hljs-attr">user</span>: <span class="hljs-string">"Name2"</span> },
  { <span class="hljs-attr">user</span>: <span class="hljs-string">"Name3"</span> }
];
<span class="hljs-keyword">var</span> names = users.map( <span class="hljs-function">(<span class="hljs-params">{ user }</span>) =&gt;</span> user );
<span class="hljs-built_in">console</span>.log(names);
<span class="hljs-comment">// =&gt; [ 'Name1', 'Name2', 'Name2', 'Name3' ]</span>


<span class="hljs-comment">// Advanced usage with Array Comprehension and default values</span>
<span class="hljs-keyword">var</span> users = [
  { <span class="hljs-attr">user</span>: <span class="hljs-string">"Name1"</span> },
  { <span class="hljs-attr">user</span>: <span class="hljs-string">"Name2"</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">2</span> },
  { <span class="hljs-attr">user</span>: <span class="hljs-string">"Name2"</span> },
  { <span class="hljs-attr">user</span>: <span class="hljs-string">"Name3"</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">4</span> }
];

[<span class="hljs-keyword">for</span> ({ user, age = <span class="hljs-string">"DEFAULT AGE"</span> } <span class="hljs-keyword">of</span> users) <span class="hljs-built_in">console</span>.log(user, age)];
<span class="hljs-comment">// =&gt; Name1 DEFAULT AGE</span>
<span class="hljs-comment">// =&gt; Name2 2</span>
<span class="hljs-comment">// =&gt; Name2 DEFAULT AGE</span>
<span class="hljs-comment">// =&gt; Name3 4</span>
</code></pre>
<h3 id="articleHeader9">数组与迭代器</h3>
<p>以上是数组解构赋值的一个简单示例，其语法的一般形式为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    [ variable1, variable2, ..., variableN ] = array;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code style="word-break: break-word; white-space: initial;">    [ <span class="hljs-keyword">variable</span><span class="hljs-number">1</span>, <span class="hljs-keyword">variable</span><span class="hljs-number">2</span>, ..., variableN ] = array;</code></pre>
<p>这将为variable1到variableN的变量赋予数组中相应元素项的值。如果你想在赋值的同时声明变量，可在赋值语句前加入<code>var</code>、<code>let</code>或<code>const</code>关键字，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var [ variable1, variable2, ..., variableN ] = array;
    let [ variable1, variable2, ..., variableN ] = array;
    const [ variable1, variable2, ..., variableN ] = array;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code>    var [ <span class="hljs-keyword">variable</span><span class="hljs-number">1</span>, <span class="hljs-keyword">variable</span><span class="hljs-number">2</span>, ..., variableN ] = array;
    <span class="hljs-keyword">let</span> [ <span class="hljs-keyword">variable</span><span class="hljs-number">1</span>, <span class="hljs-keyword">variable</span><span class="hljs-number">2</span>, ..., variableN ] = array;
    const [ <span class="hljs-keyword">variable</span><span class="hljs-number">1</span>, <span class="hljs-keyword">variable</span><span class="hljs-number">2</span>, ..., variableN ] = array;</code></pre>
<p>事实上，用<code>变量</code>来描述并不恰当，因为你可以对任意深度的嵌套数组进行解构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var [foo, [[bar], baz]] = [1, [[2], 3]];
    console.log(foo);
    // 1
    console.log(bar);
    // 2
    console.log(baz);
    // 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code>    var [foo, <span class="hljs-string">[[bar], baz]]</span> = [<span class="hljs-number">1</span>, <span class="hljs-string">[[2], 3]]</span>;
    console.log(foo);
    // <span class="hljs-number">1</span>
    console.log(bar);
    // <span class="hljs-number">2</span>
    console.log(baz);
    // <span class="hljs-number">3</span></code></pre>
<p>此外，你可以在对应位留空来跳过被解构数组中的某些元素：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var [,,third] = [&quot;foo&quot;, &quot;bar&quot;, &quot;baz&quot;];
    console.log(third);
    // &quot;baz&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>    <span class="hljs-built_in">var</span> [,,<span class="hljs-built_in">third</span>] = [<span class="hljs-string">"foo"</span>, <span class="hljs-string">"bar"</span>, <span class="hljs-string">"baz"</span>];
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">third</span>);
    // <span class="hljs-string">"baz"</span></code></pre>
<p>而且你还可以通过“<a href="http://www.infoq.com/cn/articles/es6-in-depth-rest-parameters-and-defaults" rel="nofollow noreferrer" target="_blank">不定参数</a>”模式捕获数组中的所有尾随元素：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var [head, ...tail] = [1, 2, 3, 4];
    console.log(tail);
    // [2, 3, 4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> [head, ...tail] = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>];
    <span class="hljs-built_in">console</span>.log(tail);
    <span class="hljs-comment">// [2, 3, 4]</span></code></pre>
<p>当访问空数组或越界访问数组时，对其解构与对其索引的行为一致，最终得到的结果都是：<code>undefined</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    console.log([][0]);
    // undefined
    var [missing] = [];
    console.log(missing);
    // undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-built_in">console</span>.log([][<span class="hljs-number">0</span>]);
    <span class="hljs-comment">// undefined</span>
    <span class="hljs-keyword">var</span> [missing] = [];
    <span class="hljs-built_in">console</span>.log(missing);
    <span class="hljs-comment">// undefined</span></code></pre>
<p>请注意，数组解构赋值的模式同样适用于任意迭代器：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function* fibs() {
      var a = 0;
      var b = 1;
      while (true) {
        yield a;
        [a, b] = [b, a + b];
      }
    }
    var [first, second, third, fourth, fifth, sixth] = fibs();
    console.log(sixth);
    // 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">fibs</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">var</span> a = <span class="hljs-number">0</span>;
      <span class="hljs-keyword">var</span> b = <span class="hljs-number">1</span>;
      <span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
        <span class="hljs-keyword">yield</span> a;
        [a, b] = [b, a + b];
      }
    }
    <span class="hljs-keyword">var</span> [first, second, third, fourth, fifth, sixth] = fibs();
    <span class="hljs-built_in">console</span>.log(sixth);
    <span class="hljs-comment">// 5</span></code></pre>
<h3 id="articleHeader10">对象</h3>
<p>通过解构对象，你可以把它的每个属性与不同的变量绑定，首先指定被绑定的属性，然后紧跟一个要解构的变量。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var robotA = { name: &quot;Bender&quot; };
    var robotB = { name: &quot;Flexo&quot; };
    var { name: nameA } = robotA;
    var { name: nameB } = robotB;
    console.log(nameA);
    // &quot;Bender&quot;
    console.log(nameB);
    // &quot;Flexo&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> robotA = { <span class="hljs-attr">name</span>: <span class="hljs-string">"Bender"</span> };
    <span class="hljs-keyword">var</span> robotB = { <span class="hljs-attr">name</span>: <span class="hljs-string">"Flexo"</span> };
    <span class="hljs-keyword">var</span> { <span class="hljs-attr">name</span>: nameA } = robotA;
    <span class="hljs-keyword">var</span> { <span class="hljs-attr">name</span>: nameB } = robotB;
    <span class="hljs-built_in">console</span>.log(nameA);
    <span class="hljs-comment">// "Bender"</span>
    <span class="hljs-built_in">console</span>.log(nameB);
    <span class="hljs-comment">// "Flexo"</span></code></pre>
<p>当属性名与变量名一致时，可以通过一种实用的句法简写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var { foo, bar } = { foo: &quot;lorem&quot;, bar: &quot;ipsum&quot; };
    console.log(foo);
    // &quot;lorem&quot;
    console.log(bar);
    // &quot;ipsum&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> { foo, bar } = { <span class="hljs-attr">foo</span>: <span class="hljs-string">"lorem"</span>, <span class="hljs-attr">bar</span>: <span class="hljs-string">"ipsum"</span> };
    <span class="hljs-built_in">console</span>.log(foo);
    <span class="hljs-comment">// "lorem"</span>
    <span class="hljs-built_in">console</span>.log(bar);
    <span class="hljs-comment">// "ipsum"</span></code></pre>
<p>与数组解构一样，你可以随意嵌套并进一步组合对象解构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var complicatedObj = {
      arrayProp: [
        &quot;Zapp&quot;,
        { second: &quot;Brannigan&quot; }
      ]
    };
    var { arrayProp: [first, { second }] } = complicatedObj;
    console.log(first);
    // &quot;Zapp&quot;
    console.log(second);
    // &quot;Brannigan&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> complicatedObj = {
      <span class="hljs-attr">arrayProp</span>: [
        <span class="hljs-string">"Zapp"</span>,
        { <span class="hljs-attr">second</span>: <span class="hljs-string">"Brannigan"</span> }
      ]
    };
    <span class="hljs-keyword">var</span> { <span class="hljs-attr">arrayProp</span>: [first, { second }] } = complicatedObj;
    <span class="hljs-built_in">console</span>.log(first);
    <span class="hljs-comment">// "Zapp"</span>
    <span class="hljs-built_in">console</span>.log(second);
    <span class="hljs-comment">// "Brannigan"</span></code></pre>
<p>当你解构一个未定义的属性时，得到的值为<code>undefined</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var { missing } = {};
    console.log(missing);
    // undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">var</span> { missing } = {};
    <span class="hljs-built_in">console</span>.log(missing);
    <span class="hljs-comment">// undefined</span></code></pre>
<p>请注意，当你解构对象并赋值给变量时，如果你已经声明或不打算声明这些变量（亦即赋值语句前没有<code>let</code>、<code>const</code>或<code>var</code>关键字），你应该注意这样一个潜在的语法错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    { blowUp } = { blowUp: 10 };
    // Syntax error 语法错误" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code>    { <span class="hljs-keyword">blowUp </span>} = { <span class="hljs-keyword">blowUp: </span><span class="hljs-number">10</span> }<span class="hljs-comment">;</span>
    // Syntax error 语法错误</code></pre>
<p>为什么会出错？这是因为JavaScript语法通知解析引擎将任何以{开始的语句解析为一个块语句（例如，<code>{console}</code>是一个合法块语句）。解决方案是将整个表达式用一对小括号包裹：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ({ safe } = {});
    // No errors 没有语法错误" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">    (</span><span class="hljs-template-variable">{ safe }</span><span class="xml"> = </span><span class="hljs-template-variable">{}</span><span class="xml">);
    // No errors 没有语法错误</span></code></pre>
<h3 id="articleHeader11">默认值</h3>
<p>当你要解构的属性未定义时你可以提供一个默认值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var [missing = true] = [];
    console.log(missing);
    // true
    var { message: msg = &quot;Something went wrong&quot; } = {};
    console.log(msg);
    // &quot;Something went wrong&quot;
    var { x = 3 } = {};
    console.log(x);
    // 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> [missing = <span class="hljs-literal">true</span>] = [];
    <span class="hljs-built_in">console</span>.log(missing);
    <span class="hljs-comment">// true</span>
    <span class="hljs-keyword">var</span> { <span class="hljs-attr">message</span>: msg = <span class="hljs-string">"Something went wrong"</span> } = {};
    <span class="hljs-built_in">console</span>.log(msg);
    <span class="hljs-comment">// "Something went wrong"</span>
    <span class="hljs-keyword">var</span> { x = <span class="hljs-number">3</span> } = {};
    <span class="hljs-built_in">console</span>.log(x);
    <span class="hljs-comment">// 3</span></code></pre>
<p>由于解构中允许对对象进行解构，并且还支持默认值，那么完全可以将解构应用在函数参数以及参数的默认值中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function removeBreakpoint({ url, line, column }) {
      // ...
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">removeBreakpoint</span>(<span class="hljs-params">{ url, line, column }</span>) </span>{
      <span class="hljs-comment">// ...</span>
    }</code></pre>
<p>当我们构造一个提供配置的对象，并且需要这个对象的属性携带默认值时，解构特性就派上用场了。举个例子，jQuery的<code>ajax</code>函数使用一个配置对象作为它的第二参数，我们可以这样重写函数定义：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="jQuery.ajax = function (url, {
      async = true,
      beforeSend = noop,
      cache = true,
      complete = noop,
      crossDomain = false,
      global = true,
      // ... 更多配置
    }) {
      // ... do stuff
    };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">jQuery.ajax = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">url, {
      async = true,
      beforeSend = noop,
      cache = true,
      complete = noop,
      crossDomain = false,
      global = true,
      <span class="hljs-regexp">//</span> ... 更多配置
    }</span>) </span>{
      <span class="hljs-comment">// ... do stuff</span>
    };</code></pre>
<p>同样，解构也可以应用在函数的多重返回值中，可以类似于其他语言中的元组的特性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function returnMultipleValues() {
      return [1, 2];
    }
var [foo, bar] = returnMultipleValues();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">returnMultipleValues</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>];
    }
<span class="hljs-keyword">var</span> [foo, bar] = returnMultipleValues();</code></pre>
<h2 id="articleHeader12">Three Dots</h2>
<h3 id="articleHeader13">Rest Operator</h3>
<p>在 JavaScript 函数调用时我们往往会使用内置的 arguments 对象来获取函数的调用参数，不过这种方式却存在着很多的不方便性。譬如 arguments 对象是 Array-Like 对象，无法直接运用数组的 .map() 或者 .forEach() 函数；并且因为 arguments 是绑定于当前函数作用域，如果我们希望在嵌套函数里使用外层函数的 arguments 对象，我们还需要创建中间变量。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function outerFunction() {  
   // store arguments into a separated variable
   var argsOuter = arguments;
   function innerFunction() {
      // args is an array-like object
      var even = Array.prototype.map.call(argsOuter, function(item) {
         // do something with argsOuter               
      });
   }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">outerFunction</span>(<span class="hljs-params"></span>) </span>{  
   <span class="hljs-comment">// store arguments into a separated variable</span>
   <span class="hljs-keyword">var</span> argsOuter = <span class="hljs-built_in">arguments</span>;
   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">innerFunction</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-comment">// args is an array-like object</span>
      <span class="hljs-keyword">var</span> even = <span class="hljs-built_in">Array</span>.prototype.map.call(argsOuter, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>) </span>{
         <span class="hljs-comment">// do something with argsOuter               </span>
      });
   }
}</code></pre>
<p>ES6 中为我们提供了 Rest Operator 来以数组形式获取函数的调用参数，Rest Operator 也可以用于在解构赋值中以数组方式获取剩余的变量：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function countArguments(...args) {  
   return args.length;
}
// get the number of arguments
countArguments('welcome', 'to', 'Earth'); // => 3  
// destructure an array
let otherSeasons, autumn;  
[autumn, ...otherSeasons] = cold;
otherSeasons      // => ['winter']  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">countArguments</span><span class="hljs-params">(<span class="hljs-rest_arg">...args</span>)</span> </span>{  
   <span class="hljs-keyword">return</span> args.length;
}
<span class="hljs-comment">// get the number of arguments</span>
countArguments(<span class="hljs-string">'welcome'</span>, <span class="hljs-string">'to'</span>, <span class="hljs-string">'Earth'</span>); <span class="hljs-comment">// =&gt; 3  </span>
<span class="hljs-comment">// destructure an array</span>
let otherSeasons, autumn;  
[autumn, ...otherSeasons] = cold;
otherSeasons      <span class="hljs-comment">// =&gt; ['winter']  </span></code></pre>
<p>典型的 Rest Operator 的应用场景譬如进行不定数组的指定类型过滤：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function filter(type, ...items) {  
  return items.filter(item => typeof item === type);
}
filter('boolean', true, 0, false);        // => [true, false]  
filter('number', false, 4, 'Welcome', 7); // => [4, 7]  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">filter</span><span class="hljs-params">(type, <span class="hljs-rest_arg">...items</span>)</span> </span>{  
  <span class="hljs-keyword">return</span> items.filter(item =&gt; <span class="hljs-keyword">typeof</span> item === type);
}
filter(<span class="hljs-string">'boolean'</span>, <span class="hljs-literal">true</span>, <span class="hljs-number">0</span>, <span class="hljs-literal">false</span>);        <span class="hljs-comment">// =&gt; [true, false]  </span>
filter(<span class="hljs-string">'number'</span>, <span class="hljs-literal">false</span>, <span class="hljs-number">4</span>, <span class="hljs-string">'Welcome'</span>, <span class="hljs-number">7</span>); <span class="hljs-comment">// =&gt; [4, 7]  </span></code></pre>
<p>尽管 Arrow Function 中并没有定义 arguments 对象，但是我们仍然可以使用 Rest Operator 来获取 Arrow Function 的调用参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function() {
  let outerArguments = arguments;
  const concat = (...items) => {
    console.log(arguments === outerArguments); // => true
    return items.reduce((result, item) => result + item, '');
  };
  concat(1, 5, 'nine'); // => '15nine'
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> outerArguments = <span class="hljs-built_in">arguments</span>;
  <span class="hljs-keyword">const</span> concat = <span class="hljs-function">(<span class="hljs-params">...items</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">arguments</span> === outerArguments); <span class="hljs-comment">// =&gt; true</span>
    <span class="hljs-keyword">return</span> items.reduce(<span class="hljs-function">(<span class="hljs-params">result, item</span>) =&gt;</span> result + item, <span class="hljs-string">''</span>);
  };
  concat(<span class="hljs-number">1</span>, <span class="hljs-number">5</span>, <span class="hljs-string">'nine'</span>); <span class="hljs-comment">// =&gt; '15nine'</span>
})();</code></pre>
<h3 id="articleHeader14">Spread Operator</h3>
<p>Spread Operator 则与 Rest Opeator 的功能正好相反，其常用于进行数组构建与解构赋值，也可以用于将某个数组转化为函数的参数列表，其基本使用方式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let cold = ['autumn', 'winter'];  
let warm = ['spring', 'summer'];  
// construct an array
[...cold, ...warm] // => ['autumn', 'winter', 'spring', 'summer']
// function arguments from an array
cold.push(...warm);  
cold              // => ['autumn', 'winter', 'spring', 'summer']  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code>let cold = ['autumn', 'winter'];  
let warm = ['spring', 'summer'];  
// construct an<span class="hljs-built_in"> array
</span>[...cold, ...warm] // =&gt; ['autumn', 'winter', 'spring', 'summer']
// function arguments from an<span class="hljs-built_in"> array
</span>cold.push(...warm);  
cold              // =&gt; ['autumn', 'winter', 'spring', 'summer']  </code></pre>
<p>我们也可以使用 Spread Operator 来简化函数调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class King {  
   constructor(name, country) {
     this.name = name;
     this.country = country;     
   }
   getDescription() {
     return `${this.name} leads ${this.country}`;
   }
}
var details = ['Alexander the Great', 'Greece'];  
var Alexander = new King(...details);  
Alexander.getDescription(); // => 'Alexander the Great leads Greece'  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">King</span> </span>{  
   <span class="hljs-keyword">constructor</span>(name, country) {
     <span class="hljs-keyword">this</span>.name = name;
     <span class="hljs-keyword">this</span>.country = country;     
   }
   getDescription() {
     <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.name}</span> leads <span class="hljs-subst">${<span class="hljs-keyword">this</span>.country}</span>`</span>;
   }
}
<span class="hljs-keyword">var</span> details = [<span class="hljs-string">'Alexander the Great'</span>, <span class="hljs-string">'Greece'</span>];  
<span class="hljs-keyword">var</span> Alexander = <span class="hljs-keyword">new</span> King(...details);  
Alexander.getDescription(); <span class="hljs-comment">// =&gt; 'Alexander the Great leads Greece'  </span></code></pre>
<p>还有另外一个好处就是可以用来替换 Object.assign 来方便地从旧有的对象中创建新的对象，并且能够修改部分值；譬如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {a:1,b:2}
var obj_new_1 = Object.assign({},obj,{a:3});
var obj_new_2 = {
  ...obj,
  a:3
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">var</span> obj = <span class="hljs-comment">{a:1,b:2}</span>
<span class="hljs-keyword">var</span> obj_new_1 = <span class="hljs-keyword">Object</span>.assign(<span class="hljs-comment">{}</span>,obj,<span class="hljs-comment">{a:3}</span>);
<span class="hljs-keyword">var</span> obj_new_2 = <span class="hljs-comment">{
  ...obj,
  a:3
}</span></code></pre>
<p>最后我们还需要讨论下 Spread Operator 与 Iteration Protocols，实际上 Spread Operator 也是使用的 Iteration Protocols 来进行元素遍历与结果搜集；因此我们也可以通过自定义 Iterator 的方式来控制 Spread Operator 的表现。Iterable 协议规定了对象必须包含 Symbol.iterator 方法，该方法返回某个 Iterator 对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Iterable {  
  [Symbol.iterator]() {
    //...
    return Iterator;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>interface Iterable {  
  [<span class="hljs-string">Symbol.iterator</span>](<span class="hljs-link"></span>) {
<span class="hljs-code">    //...</span>
<span class="hljs-code">    return Iterator;</span>
  }
}</code></pre>
<p>该 Iterator 对象从属于 Iterator Protocol，其需要提供 next 成员方法，该方法会返回某个包含 done 与 value 属性的对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Iterator {  
  next() {
     //...
     return {
        value: <value>,
        done: <boolean>
     };
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>interface <span class="hljs-class">Iterator </span>{  
  next() {
     <span class="hljs-comment">//...</span>
     <span class="hljs-class">return </span>{
<span class="hljs-symbol">        value:</span> <span class="hljs-params">&lt;value&gt;</span>,
<span class="hljs-symbol">        done:</span> <span class="hljs-params">&lt;boolean&gt;</span>
     };
  };
}</code></pre>
<p>典型的 Iterable 对象就是字符串：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = 'hi';  
var iterator = str[Symbol.iterator]();  
iterator.toString(); // => '[object String Iterator]'  
iterator.next();     // => { value: 'h', done: false }  
iterator.next();     // => { value: 'i', done: false }  
iterator.next();     // => { value: undefined, done: true }  
[...str];            // => ['h', 'i']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>var str = <span class="hljs-string">'hi'</span>;  
var iterator = str[Symbol.iterator]();  
iterator.toString(); <span class="hljs-regexp">//</span> =&gt; <span class="hljs-string">'[object String Iterator]'</span>  
iterator.<span class="hljs-keyword">next</span>();     <span class="hljs-regexp">//</span> =&gt; { <span class="hljs-symbol">value:</span> <span class="hljs-string">'h'</span>, <span class="hljs-symbol">done:</span> <span class="hljs-keyword">false</span> }  
iterator.<span class="hljs-keyword">next</span>();     <span class="hljs-regexp">//</span> =&gt; { <span class="hljs-symbol">value:</span> <span class="hljs-string">'i'</span>, <span class="hljs-symbol">done:</span> <span class="hljs-keyword">false</span> }  
iterator.<span class="hljs-keyword">next</span>();     <span class="hljs-regexp">//</span> =&gt; { <span class="hljs-symbol">value:</span> undefined, <span class="hljs-symbol">done:</span> <span class="hljs-keyword">true</span> }  
[...str];            <span class="hljs-regexp">//</span> =&gt; [<span class="hljs-string">'h'</span>, <span class="hljs-string">'i'</span>]</code></pre>
<p>我们可以通过自定义 array-like 对象的 Symbol.iterator 属性来控制其在迭代器上的效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function iterator() {  
  var index = 0;
  return {
    next: () => ({ // Conform to Iterator protocol
      done : index >= this.length,
      value: this[index++]
    })
  };
}
var arrayLike = {  
  0: 'Cat',
  1: 'Bird',
  length: 2
};
// Conform to Iterable Protocol
arrayLike[Symbol.iterator] = iterator;  
var array = [...arrayLike];  
console.log(array); // => ['Cat', 'Bird']  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">iterator</span>(<span class="hljs-params"></span>) </span>{  
  <span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">next</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({ <span class="hljs-comment">// Conform to Iterator protocol</span>
      done : index &gt;= <span class="hljs-keyword">this</span>.length,
      <span class="hljs-attr">value</span>: <span class="hljs-keyword">this</span>[index++]
    })
  };
}
<span class="hljs-keyword">var</span> arrayLike = {  
  <span class="hljs-number">0</span>: <span class="hljs-string">'Cat'</span>,
  <span class="hljs-number">1</span>: <span class="hljs-string">'Bird'</span>,
  <span class="hljs-attr">length</span>: <span class="hljs-number">2</span>
};
<span class="hljs-comment">// Conform to Iterable Protocol</span>
arrayLike[<span class="hljs-built_in">Symbol</span>.iterator] = iterator;  
<span class="hljs-keyword">var</span> array = [...arrayLike];  
<span class="hljs-built_in">console</span>.log(array); <span class="hljs-comment">// =&gt; ['Cat', 'Bird']  </span></code></pre>
<p><code>arrayLike[Symbol.iterator]</code> 为该对象创建了值为某个迭代器的属性，从而使该对象符合了 Iterable 协议；而 iterator() 又返回了包含 next 成员方法的对象，使得该对象最终具有和数组相似的行为表现。</p>
<h1 id="articleHeader15">Copy Composite Data Types: 复合类型的拷贝</h1>
<h2 id="articleHeader16">Shallow Copy: 浅拷贝</h2>
<h3 id="articleHeader17">顶层属性遍历</h3>
<p>浅拷贝是指复制对象的时候，指对第一层键值对进行独立的复制。一个简单的实现如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 浅拷贝实现
function shadowCopy(target, source){ 
    if( !source || typeof source !== 'object'){
        return;
    }
    // 这个方法有点小trick，target一定得事先定义好，不然就不能改变实参了。
       // 具体原因解释可以看参考资料中 JS是值传递还是引用传递
    if( !target || typeof target !== 'object'){
        return;
    }  
    // 这边最好区别一下对象和数组的复制
    for(var key in source){
        if(source.hasOwnProperty(key)){
            target[key] = source[key];
        }
    }
}

//测试例子
var arr = [1,2,3];
var arr2 = [];
shadowCopy(arr2, arr);
console.log(arr2);
//[1,2,3]

var today = {
    weather: 'Sunny',
    date: {
        week: 'Wed'
    } 
}

var tomorrow = {};
shadowCopy(tomorrow, today);
console.log(tomorrow);
// Object {weather: &quot;Sunny&quot;, date: Object}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 浅拷贝实现</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">shadowCopy</span>(<span class="hljs-params">target, source</span>)</span>{ 
    <span class="hljs-keyword">if</span>( !source || <span class="hljs-keyword">typeof</span> source !== <span class="hljs-string">'object'</span>){
        <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-comment">// 这个方法有点小trick，target一定得事先定义好，不然就不能改变实参了。</span>
       <span class="hljs-comment">// 具体原因解释可以看参考资料中 JS是值传递还是引用传递</span>
    <span class="hljs-keyword">if</span>( !target || <span class="hljs-keyword">typeof</span> target !== <span class="hljs-string">'object'</span>){
        <span class="hljs-keyword">return</span>;
    }  
    <span class="hljs-comment">// 这边最好区别一下对象和数组的复制</span>
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> source){
        <span class="hljs-keyword">if</span>(source.hasOwnProperty(key)){
            target[key] = source[key];
        }
    }
}

<span class="hljs-comment">//测试例子</span>
<span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">var</span> arr2 = [];
shadowCopy(arr2, arr);
<span class="hljs-built_in">console</span>.log(arr2);
<span class="hljs-comment">//[1,2,3]</span>

<span class="hljs-keyword">var</span> today = {
    <span class="hljs-attr">weather</span>: <span class="hljs-string">'Sunny'</span>,
    <span class="hljs-attr">date</span>: {
        <span class="hljs-attr">week</span>: <span class="hljs-string">'Wed'</span>
    } 
}

<span class="hljs-keyword">var</span> tomorrow = {};
shadowCopy(tomorrow, today);
<span class="hljs-built_in">console</span>.log(tomorrow);
<span class="hljs-comment">// Object {weather: "Sunny", date: Object}</span></code></pre>
<h3 id="articleHeader18">Object.assign</h3>
<p><strong>Object.assign()</strong> 方法可以把任意多个的<strong>源对象</strong>所拥有的<strong>自身可枚举属性</strong>拷贝给目标对象，然后返回目标对象。<code>Object.assign</code> 方法只会拷贝源对象自身的并且可枚举的属性到目标对象身上。注意，对于访问器属性，该方法会执行那个访问器属性的 <code>getter</code> 函数，然后把得到的值拷贝给目标对象，如果你想拷贝访问器属性本身，请使用 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor" rel="nofollow noreferrer" target="_blank"><code>Object.getOwnPropertyDescriptor()</code></a> 和<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties" rel="nofollow noreferrer" target="_blank"><code>Object.defineProperties()</code></a> 方法。</p>
<p>注意，<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/String" rel="nofollow noreferrer" target="_blank"><code>字符串</code></a>类型和 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol" rel="nofollow noreferrer" target="_blank"><code>symbol</code></a> 类型的属性都会被拷贝。</p>
<p>注意，在属性拷贝过程中可能会产生异常，比如目标对象的某个只读属性和源对象的某个属性同名，这时该方法会抛出一个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError" rel="nofollow noreferrer" target="_blank"><code>TypeError</code></a> 异常，拷贝过程中断，已经拷贝成功的属性不会受到影响，还未拷贝的属性将不会再被拷贝。</p>
<p>注意， <code>Object.assign</code> 会跳过那些值为 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null" rel="nofollow noreferrer" target="_blank"><code>null</code></a> 或 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined" rel="nofollow noreferrer" target="_blank"><code>undefined</code></a> 的源对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.assign(target, ...sources)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">Object</span><span class="hljs-selector-class">.assign</span>(<span class="hljs-selector-tag">target</span>, ..<span class="hljs-selector-class">.sources</span>)</code></pre>
<ul><li>例子：浅拷贝一个对象</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = { a: 1 };
var copy = Object.assign({}, obj);
console.log(copy); // { a: 1 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code><span class="hljs-keyword">var</span> obj = <span class="hljs-comment">{ a: 1 }</span>;
<span class="hljs-keyword">var</span> <span class="hljs-keyword">copy</span> = Object.assign(<span class="hljs-comment">{}</span>, obj);
console.log(<span class="hljs-keyword">copy</span>); <span class="hljs-comment">// { a: 1 }</span></code></pre>
<ul><li>例子：合并若干个对象</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var o1 = { a: 1 };
var o2 = { b: 2 };
var o3 = { c: 3 };

var obj = Object.assign(o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
console.log(o1);  // { a: 1, b: 2, c: 3 }, 注意目标对象自身也会改变。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> o1 = { <span class="hljs-attr">a</span>: <span class="hljs-number">1</span> };
<span class="hljs-keyword">var</span> o2 = { <span class="hljs-attr">b</span>: <span class="hljs-number">2</span> };
<span class="hljs-keyword">var</span> o3 = { <span class="hljs-attr">c</span>: <span class="hljs-number">3</span> };

<span class="hljs-keyword">var</span> obj = <span class="hljs-built_in">Object</span>.assign(o1, o2, o3);
<span class="hljs-built_in">console</span>.log(obj); <span class="hljs-comment">// { a: 1, b: 2, c: 3 }</span>
<span class="hljs-built_in">console</span>.log(o1);  <span class="hljs-comment">// { a: 1, b: 2, c: 3 }, 注意目标对象自身也会改变。</span></code></pre>
<ul><li>例子：拷贝 symbol 类型的属性</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var o1 = { a: 1 };
var o2 = { [Symbol(&quot;foo&quot;)]: 2 };

var obj = Object.assign({}, o1, o2);
console.log(obj); // { a: 1, [Symbol(&quot;foo&quot;)]: 2 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> o1 = { <span class="hljs-attr">a</span>: <span class="hljs-number">1</span> };
<span class="hljs-keyword">var</span> o2 = { [<span class="hljs-built_in">Symbol</span>(<span class="hljs-string">"foo"</span>)]: <span class="hljs-number">2</span> };

<span class="hljs-keyword">var</span> obj = <span class="hljs-built_in">Object</span>.assign({}, o1, o2);
<span class="hljs-built_in">console</span>.log(obj); <span class="hljs-comment">// { a: 1, [Symbol("foo")]: 2 }</span></code></pre>
<ul><li>例子：继承属性和不可枚举属性是不能拷贝的</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = Object.create({foo: 1}, { // foo 是个继承属性。
    bar: {
        value: 2  // bar 是个不可枚举属性。
    },
    baz: {
        value: 3,
        enumerable: true  // baz 是个自身可枚举属性。
    }
});

var copy = Object.assign({}, obj);
console.log(copy); // { baz: 3 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> obj = <span class="hljs-built_in">Object</span>.create({<span class="hljs-attr">foo</span>: <span class="hljs-number">1</span>}, { <span class="hljs-comment">// foo 是个继承属性。</span>
    bar: {
        <span class="hljs-attr">value</span>: <span class="hljs-number">2</span>  <span class="hljs-comment">// bar 是个不可枚举属性。</span>
    },
    <span class="hljs-attr">baz</span>: {
        <span class="hljs-attr">value</span>: <span class="hljs-number">3</span>,
        <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>  <span class="hljs-comment">// baz 是个自身可枚举属性。</span>
    }
});

<span class="hljs-keyword">var</span> copy = <span class="hljs-built_in">Object</span>.assign({}, obj);
<span class="hljs-built_in">console</span>.log(copy); <span class="hljs-comment">// { baz: 3 }</span></code></pre>
<ul><li>例子：原始值会被隐式转换成其包装对象</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var v1 = &quot;123&quot;;
var v2 = true;
var v3 = 10;
var v4 = Symbol(&quot;foo&quot;)

var obj = Object.assign({}, v1, null, v2, undefined, v3, v4); 
// 源对象如果是原始值，会被自动转换成它们的包装对象，
// 而 null 和 undefined 这两种原始值会被完全忽略。
// 注意，只有字符串的包装对象才有可能有自身可枚举属性。
console.log(obj); // { &quot;0&quot;: &quot;1&quot;, &quot;1&quot;: &quot;2&quot;, &quot;2&quot;: &quot;3&quot; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code><span class="hljs-keyword">var</span> v1 = <span class="hljs-string">"123"</span>;
<span class="hljs-keyword">var</span> v2 = <span class="hljs-literal">true</span>;
<span class="hljs-keyword">var</span> v3 = <span class="hljs-number">10</span>;
<span class="hljs-keyword">var</span> v4 = Symbol(<span class="hljs-string">"foo"</span>)

<span class="hljs-keyword">var</span> obj = Object.assign({}, v1, <span class="hljs-literal">null</span>, v2, <span class="hljs-literal">undefined</span>, v3, v4); 
<span class="hljs-regexp">// 源对象如果是原始值，会被自动转换成它们的包装对象，
//</span> 而 <span class="hljs-literal">null</span> 和 <span class="hljs-literal">undefined</span> 这两种原始值会被完全忽略。
<span class="hljs-regexp">// 注意，只有字符串的包装对象才有可能有自身可枚举属性。
console.log(obj); //</span> { <span class="hljs-string">"0"</span>: <span class="hljs-string">"1"</span>, <span class="hljs-string">"1"</span>: <span class="hljs-string">"2"</span>, <span class="hljs-string">"2"</span>: <span class="hljs-string">"3"</span> }</code></pre>
<ul><li>例子：拷贝属性过程中发生异常</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var target = Object.defineProperty({}, &quot;foo&quot;, {
    value: 1,
    writeable: false
}); // target 的 foo 属性是个只读属性。

Object.assign(target, {bar: 2}, {foo2: 3, foo: 3, foo3: 3}, {baz: 4});
// TypeError: &quot;foo&quot; is read-only
// 注意这个异常是在拷贝第二个源对象的第二个属性时发生的。

console.log(target.bar);  // 2，说明第一个源对象拷贝成功了。
console.log(target.foo2); // 3，说明第二个源对象的第一个属性也拷贝成功了。
console.log(target.foo);  // 1，只读属性不能被覆盖，所以第二个源对象的第二个属性拷贝失败了。
console.log(target.foo3); // undefined，异常之后 assign 方法就退出了，第三个属性是不会被拷贝到的。
console.log(target.baz);  // undefined，第三个源对象更是不会被拷贝到的。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> target = <span class="hljs-built_in">Object</span>.defineProperty({}, <span class="hljs-string">"foo"</span>, {
    <span class="hljs-attr">value</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">writeable</span>: <span class="hljs-literal">false</span>
}); <span class="hljs-comment">// target 的 foo 属性是个只读属性。</span>

<span class="hljs-built_in">Object</span>.assign(target, {<span class="hljs-attr">bar</span>: <span class="hljs-number">2</span>}, {<span class="hljs-attr">foo2</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">foo</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">foo3</span>: <span class="hljs-number">3</span>}, {<span class="hljs-attr">baz</span>: <span class="hljs-number">4</span>});
<span class="hljs-comment">// TypeError: "foo" is read-only</span>
<span class="hljs-comment">// 注意这个异常是在拷贝第二个源对象的第二个属性时发生的。</span>

<span class="hljs-built_in">console</span>.log(target.bar);  <span class="hljs-comment">// 2，说明第一个源对象拷贝成功了。</span>
<span class="hljs-built_in">console</span>.log(target.foo2); <span class="hljs-comment">// 3，说明第二个源对象的第一个属性也拷贝成功了。</span>
<span class="hljs-built_in">console</span>.log(target.foo);  <span class="hljs-comment">// 1，只读属性不能被覆盖，所以第二个源对象的第二个属性拷贝失败了。</span>
<span class="hljs-built_in">console</span>.log(target.foo3); <span class="hljs-comment">// undefined，异常之后 assign 方法就退出了，第三个属性是不会被拷贝到的。</span>
<span class="hljs-built_in">console</span>.log(target.baz);  <span class="hljs-comment">// undefined，第三个源对象更是不会被拷贝到的。</span></code></pre>
<h3 id="articleHeader19">使用 <code>[].concat</code> 来复制数组</h3>
<p>同样类似于对于对象的复制，我们建议使用<code>[].concat</code>来进行数组的深复制:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var list = [1, 2, 3];
var changedList = [].concat(list);
changedList[1] = 2;
list === changedList; // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var <span class="hljs-type">list</span> = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
var changedList = [].concat(<span class="hljs-type">list</span>);
changedList[<span class="hljs-number">1</span>] = <span class="hljs-number">2</span>;
<span class="hljs-type">list</span> === changedList; <span class="hljs-comment">// false</span></code></pre>
<p>同样的，<code>concat</code>方法也只能保证一层深复制:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> list = [[1,2,3]]
[ [ 1, 2, 3 ] ]
> new_list = [].concat(list)
[ [ 1, 2, 3 ] ]
> new_list[0][0] = 4
4
> list
[ [ 4, 2, 3 ] ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>&gt; <span class="hljs-type">list</span> = [[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]]
[ [ <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span> ] ]
&gt; new_list = [].concat(<span class="hljs-type">list</span>)
[ [ <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span> ] ]
&gt; new_list[<span class="hljs-number">0</span>][<span class="hljs-number">0</span>] = <span class="hljs-number">4</span>
<span class="hljs-number">4</span>
&gt; <span class="hljs-type">list</span>
[ [ <span class="hljs-number">4</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span> ] ]</code></pre>
<h3 id="articleHeader20">浅拷贝的缺陷</h3>
<p>不过需要注意的是，assign是浅拷贝，或者说，它是一级深拷贝，举两个例子说明：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const defaultOpt = {
    title: {
        text: 'hello world',
        subtext: 'It\'s my world.'
    }
};

const opt = Object.assign({}, defaultOpt, {
    title: {
        subtext: 'Yes, your world.'
    }
});

console.log(opt);

// 预期结果
{
    title: {
        text: 'hello world',
        subtext: 'Yes, your world.'
    }
}
// 实际结果
{
    title: {
        subtext: 'Yes, your world.'
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> defaultOpt = {
    <span class="hljs-attr">title</span>: {
        <span class="hljs-attr">text</span>: <span class="hljs-string">'hello world'</span>,
        <span class="hljs-attr">subtext</span>: <span class="hljs-string">'It\'s my world.'</span>
    }
};

<span class="hljs-keyword">const</span> opt = <span class="hljs-built_in">Object</span>.assign({}, defaultOpt, {
    <span class="hljs-attr">title</span>: {
        <span class="hljs-attr">subtext</span>: <span class="hljs-string">'Yes, your world.'</span>
    }
});

<span class="hljs-built_in">console</span>.log(opt);

<span class="hljs-comment">// 预期结果</span>
{
    <span class="hljs-attr">title</span>: {
        <span class="hljs-attr">text</span>: <span class="hljs-string">'hello world'</span>,
        <span class="hljs-attr">subtext</span>: <span class="hljs-string">'Yes, your world.'</span>
    }
}
<span class="hljs-comment">// 实际结果</span>
{
    <span class="hljs-attr">title</span>: {
        <span class="hljs-attr">subtext</span>: <span class="hljs-string">'Yes, your world.'</span>
    }
}</code></pre>
<p>上面这个例子中，对于对象的一级子元素而言，只会替换引用，而不会动态的添加内容。那么，其实assign并没有解决对象的引用混乱问题，参考下下面这个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const defaultOpt = {
    title: {
        text: 'hello world',
        subtext: 'It\'s my world.'
    } 
};

const opt1 = Object.assign({}, defaultOpt);
const opt2 = Object.assign({}, defaultOpt);
opt2.title.subtext = 'Yes, your world.';

console.log('opt1:');
console.log(opt1);
console.log('opt2:');
console.log(opt2);

// 结果
opt1:
{
    title: {
        text: 'hello world',
        subtext: 'Yes, your world.'
    }
}
opt2:
{
    title: {
        text: 'hello world',
        subtext: 'Yes, your world.'
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> defaultOpt = {
    <span class="hljs-attr">title</span>: {
        <span class="hljs-attr">text</span>: <span class="hljs-string">'hello world'</span>,
        <span class="hljs-attr">subtext</span>: <span class="hljs-string">'It\'s my world.'</span>
    } 
};

<span class="hljs-keyword">const</span> opt1 = <span class="hljs-built_in">Object</span>.assign({}, defaultOpt);
<span class="hljs-keyword">const</span> opt2 = <span class="hljs-built_in">Object</span>.assign({}, defaultOpt);
opt2.title.subtext = <span class="hljs-string">'Yes, your world.'</span>;

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'opt1:'</span>);
<span class="hljs-built_in">console</span>.log(opt1);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'opt2:'</span>);
<span class="hljs-built_in">console</span>.log(opt2);

<span class="hljs-comment">// 结果</span>
opt1:
{
    <span class="hljs-attr">title</span>: {
        <span class="hljs-attr">text</span>: <span class="hljs-string">'hello world'</span>,
        <span class="hljs-attr">subtext</span>: <span class="hljs-string">'Yes, your world.'</span>
    }
}
opt2:
{
    <span class="hljs-attr">title</span>: {
        <span class="hljs-attr">text</span>: <span class="hljs-string">'hello world'</span>,
        <span class="hljs-attr">subtext</span>: <span class="hljs-string">'Yes, your world.'</span>
    }
}</code></pre>
<h2 id="articleHeader21">DeepCopy: 深拷贝</h2>
<h3 id="articleHeader22">递归属性遍历</h3>
<p>一般来说，在JavaScript中考虑复合类型的深层复制的时候，往往就是指对于Date、Object与Array这三个复合类型的处理。我们能想到的最常用的方法就是先创建一个空的新对象，然后递归遍历旧对象，直到发现基础类型的子节点才赋予到新对象对应的位置。不过这种方法会存在一个问题，就是JavaScript中存在着神奇的原型机制，并且这个原型会在遍历的时候出现，然后原型不应该被赋予给新对象。那么在遍历的过程中，我们应该考虑使用<code>hasOenProperty</code>方法来过滤掉那些继承自原型链上的属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function clone(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || &quot;object&quot; != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error(&quot;Unable to copy obj! Its type isn't supported.&quot;);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">clone</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">var</span> copy;

    <span class="hljs-comment">// Handle the 3 simple types, and null or undefined</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-literal">null</span> == obj || <span class="hljs-string">"object"</span> != <span class="hljs-keyword">typeof</span> obj) <span class="hljs-keyword">return</span> obj;

    <span class="hljs-comment">// Handle Date</span>
    <span class="hljs-keyword">if</span> (obj <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Date</span>) {
        copy = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
        copy.setTime(obj.getTime());
        <span class="hljs-keyword">return</span> copy;
    }

    <span class="hljs-comment">// Handle Array</span>
    <span class="hljs-keyword">if</span> (obj <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span>) {
        copy = [];
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = obj.length; i &lt; len; i++) {
            copy[i] = clone(obj[i]);
        }
        <span class="hljs-keyword">return</span> copy;
    }

    <span class="hljs-comment">// Handle Object</span>
    <span class="hljs-keyword">if</span> (obj <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>) {
        copy = {};
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> attr <span class="hljs-keyword">in</span> obj) {
            <span class="hljs-keyword">if</span> (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        <span class="hljs-keyword">return</span> copy;
    }

    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"Unable to copy obj! Its type isn't supported."</span>);
}</code></pre>
<p>调用如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// This would be cloneable:
var tree = {
    &quot;left&quot;  : { &quot;left&quot; : null, &quot;right&quot; : null, &quot;data&quot; : 3 },
    &quot;right&quot; : null,
    &quot;data&quot;  : 8
};

// This would kind-of work, but you would get 2 copies of the 
// inner node instead of 2 references to the same copy
var directedAcylicGraph = {
    &quot;left&quot;  : { &quot;left&quot; : null, &quot;right&quot; : null, &quot;data&quot; : 3 },
    &quot;data&quot;  : 8
};
directedAcyclicGraph[&quot;right&quot;] = directedAcyclicGraph[&quot;left&quot;];

// Cloning this would cause a stack overflow due to infinite recursion:
var cylicGraph = {
    &quot;left&quot;  : { &quot;left&quot; : null, &quot;right&quot; : null, &quot;data&quot; : 3 },
    &quot;data&quot;  : 8
};
cylicGraph[&quot;right&quot;] = cylicGraph;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// This would be cloneable:</span>
<span class="hljs-keyword">var</span> tree = {
    <span class="hljs-string">"left"</span>  : { <span class="hljs-string">"left"</span> : <span class="hljs-literal">null</span>, <span class="hljs-string">"right"</span> : <span class="hljs-literal">null</span>, <span class="hljs-string">"data"</span> : <span class="hljs-number">3</span> },
    <span class="hljs-string">"right"</span> : <span class="hljs-literal">null</span>,
    <span class="hljs-string">"data"</span>  : <span class="hljs-number">8</span>
};

<span class="hljs-comment">// This would kind-of work, but you would get 2 copies of the </span>
<span class="hljs-comment">// inner node instead of 2 references to the same copy</span>
<span class="hljs-keyword">var</span> directedAcylicGraph = {
    <span class="hljs-string">"left"</span>  : { <span class="hljs-string">"left"</span> : <span class="hljs-literal">null</span>, <span class="hljs-string">"right"</span> : <span class="hljs-literal">null</span>, <span class="hljs-string">"data"</span> : <span class="hljs-number">3</span> },
    <span class="hljs-string">"data"</span>  : <span class="hljs-number">8</span>
};
directedAcyclicGraph[<span class="hljs-string">"right"</span>] = directedAcyclicGraph[<span class="hljs-string">"left"</span>];

<span class="hljs-comment">// Cloning this would cause a stack overflow due to infinite recursion:</span>
<span class="hljs-keyword">var</span> cylicGraph = {
    <span class="hljs-string">"left"</span>  : { <span class="hljs-string">"left"</span> : <span class="hljs-literal">null</span>, <span class="hljs-string">"right"</span> : <span class="hljs-literal">null</span>, <span class="hljs-string">"data"</span> : <span class="hljs-number">3</span> },
    <span class="hljs-string">"data"</span>  : <span class="hljs-number">8</span>
};
cylicGraph[<span class="hljs-string">"right"</span>] = cylicGraph;</code></pre>
<h3 id="articleHeader23">利用 JSON 深拷贝</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="JSON.parse(JSON.stringify(obj));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">JSON</span><span class="hljs-selector-class">.parse</span>(<span class="hljs-selector-tag">JSON</span><span class="hljs-selector-class">.stringify</span>(<span class="hljs-selector-tag">obj</span>));</code></pre>
<p>对于一般的需求是可以满足的，但是它有缺点。下例中，可以看到JSON复制会忽略掉值为undefined以及函数表达式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    a: 1,
    b: 2,
    c: undefined,
    sum: function() { return a + b; }
};

var obj2 = JSON.parse(JSON.stringify(obj));
console.log(obj2);
//Object {a: 1, b: 2}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">c</span>: <span class="hljs-literal">undefined</span>,
    <span class="hljs-attr">sum</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> a + b; }
};

<span class="hljs-keyword">var</span> obj2 = <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">JSON</span>.stringify(obj));
<span class="hljs-built_in">console</span>.log(obj2);
<span class="hljs-comment">//Object {a: 1, b: 2}</span></code></pre>
<h1 id="articleHeader24">延伸阅读</h1>
<ul>
<li><a href="https://zhuanlan.zhihu.com/p/28313321" rel="nofollow noreferrer" target="_blank">基于 JSX 的动态数据绑定</a></li>
<li><a href="https://zhuanlan.zhihu.com/p/27844393" rel="nofollow noreferrer" target="_blank">ECMAScript 2017（ES8）特性概述</a></li>
<li><a href="https://zhuanlan.zhihu.com/p/27410280" rel="nofollow noreferrer" target="_blank">WebAssembly 初体验：从零开始重构计算模块</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6 变量声明与赋值：值传递、浅拷贝与深拷贝详解

## 原文链接
[https://segmentfault.com/a/1190000010652249](https://segmentfault.com/a/1190000010652249)

