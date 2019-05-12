---
title: '《JavaScript 闯关记》之作用域和闭包' 
date: 2019-01-30 2:30:22
hidden: true
slug: cimfm48v7sl
categories: [reprint]
---

{{< raw >}}

                    
<p>作用域和闭包是 JavaScript 最重要的概念之一，想要进一步学习 JavaScript，就必须理解 JavaScript 作用域和闭包的工作原理。</p>
<h2 id="articleHeader0">作用域</h2>
<p>任何程序设计语言都有作用域的概念，简单的说，作用域就是变量与函数的可访问范围，即作用域控制着变量与函数的可见性和生命周期。在 JavaScript 中，变量的作用域有全局作用域和局部作用域两种。</p>
<h3 id="articleHeader1">全局作用域（Global Scope）</h3>
<p>在代码中任何地方都能访问到的对象拥有全局作用域，一般来说以下三种情形拥有全局作用域：</p>
<p>1.最外层函数和在最外层函数外面定义的变量拥有全局作用域，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var global = &quot;global&quot;;     // 显式声明一个全局变量
function checkscope() {
    var local = &quot;local&quot;;   // 显式声明一个局部变量
    return global;         // 返回全局变量的值
}
console.log(global);       // &quot;global&quot;
console.log(checkscope()); // &quot;global&quot;
console.log(local);        // error: local is not defined." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> global = <span class="hljs-string">"global"</span>;     <span class="hljs-comment">// 显式声明一个全局变量</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkscope</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> local = <span class="hljs-string">"local"</span>;   <span class="hljs-comment">// 显式声明一个局部变量</span>
    <span class="hljs-keyword">return</span> global;         <span class="hljs-comment">// 返回全局变量的值</span>
}
<span class="hljs-built_in">console</span>.log(global);       <span class="hljs-comment">// "global"</span>
<span class="hljs-built_in">console</span>.log(checkscope()); <span class="hljs-comment">// "global"</span>
<span class="hljs-built_in">console</span>.log(local);        <span class="hljs-comment">// error: local is not defined.</span></code></pre>
<p>上面代码中，<code>global</code> 是全局变量，不管是在 <code>checkscope()</code> 函数内部还是外部，都能访问到全局变量 <code>global</code>。</p>
<p>2.所有末定义直接赋值的变量自动声明为拥有全局作用域，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function checkscope() {
    var local = &quot;local&quot;; // 显式声明一个局部变量
    global = &quot;global&quot;;   // 隐式声明一个全局变量(不好的写法)
}
console.log(global);     // &quot;global&quot;
console.log(local);      // error: local is not defined." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkscope</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> local = <span class="hljs-string">"local"</span>; <span class="hljs-comment">// 显式声明一个局部变量</span>
    global = <span class="hljs-string">"global"</span>;   <span class="hljs-comment">// 隐式声明一个全局变量(不好的写法)</span>
}
<span class="hljs-built_in">console</span>.log(global);     <span class="hljs-comment">// "global"</span>
<span class="hljs-built_in">console</span>.log(local);      <span class="hljs-comment">// error: local is not defined.</span></code></pre>
<p>上面代码中，变量 <code>global</code> 未用 <code>var</code> 关键字定义就直接赋值，所以隐式的创建了全局变量 <code>global</code>，但这种写法容易造成误解，应尽量避免这种写法。</p>
<p>3.所有 <code>window</code> 对象的属性拥有全局作用域</p>
<p>一般情况下，<code>window</code> 对象的内置属性都拥有全局作用域，例如 <code>window.name</code>、<code>window.location</code>、<code>window.top</code> 等等。</p>
<h3 id="articleHeader2">局部作用域（Local Scope）</h3>
<p>和全局作用域相反，局部作用域一般只在固定的代码片段内可访问到。最常见的是在函数体内定义的变量，只能在函数体内使用。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function checkscope() {
    var local = &quot;local&quot;;   // 显式声明一个局部变量
    return local;         // 返回全局变量的值
}
console.log(checkscope()); // &quot;local&quot;
console.log(local);        // error: local is not defined." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkscope</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> local = <span class="hljs-string">"local"</span>;   <span class="hljs-comment">// 显式声明一个局部变量</span>
    <span class="hljs-keyword">return</span> local;         <span class="hljs-comment">// 返回全局变量的值</span>
}
<span class="hljs-built_in">console</span>.log(checkscope()); <span class="hljs-comment">// "local"</span>
<span class="hljs-built_in">console</span>.log(local);        <span class="hljs-comment">// error: local is not defined.</span></code></pre>
<p>上面代码中，在函数体内定义了变量 <code>local</code>，在函数体内是可以访问了，在函数外访问就报错了。</p>
<h3 id="articleHeader3">全局和局部作用域的关系</h3>
<p>在函数体内，局部变量的优先级高于同名的全局变量。如果在函数内声明的一个局部变量或者函数参数中带有的变量和全局变量重名，那么全局变量就被局部变量所遮盖。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var scope = &quot;global&quot;;      // 声明一个全局变量
function checkscope() {
    var scope = &quot;local&quot;;   // 声明一个同名的局部变量
    return scope;          // 返回局部变量的值，而不是全局变量的值
}
console.log(checkscope()); // &quot;local&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> scope = <span class="hljs-string">"global"</span>;      <span class="hljs-comment">// 声明一个全局变量</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkscope</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> scope = <span class="hljs-string">"local"</span>;   <span class="hljs-comment">// 声明一个同名的局部变量</span>
    <span class="hljs-keyword">return</span> scope;          <span class="hljs-comment">// 返回局部变量的值，而不是全局变量的值</span>
}
<span class="hljs-built_in">console</span>.log(checkscope()); <span class="hljs-comment">// "local"</span></code></pre>
<p>尽管在全局作用域编写代码时可以不写 <code>var</code> 语句，但声明局部变量时则必须使用 <code>var</code> 语句。思考一下如果不这样做会怎样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="scope = &quot;global&quot;;           // 声明一个全局变量，甚至不用 var 来声明
function checkscope2() {
    scope = &quot;local&quot;;        // 糟糕！我们刚修改了全局变量
    myscope = &quot;local&quot;;      // 这里显式地声明了一个新的全局变量
    return [scope, myscope];// 返回两个值
}
console.log(checkscope2()); // [&quot;local&quot;, &quot;local&quot;]，产生了副作用
console.log(scope);         // &quot;local&quot;，全局变量修改了
console.log(myscope);       // &quot;local&quot;，全局命名空间搞乱了" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">scope = <span class="hljs-string">"global"</span>;           <span class="hljs-comment">// 声明一个全局变量，甚至不用 var 来声明</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkscope2</span>(<span class="hljs-params"></span>) </span>{
    scope = <span class="hljs-string">"local"</span>;        <span class="hljs-comment">// 糟糕！我们刚修改了全局变量</span>
    myscope = <span class="hljs-string">"local"</span>;      <span class="hljs-comment">// 这里显式地声明了一个新的全局变量</span>
    <span class="hljs-keyword">return</span> [scope, myscope];<span class="hljs-comment">// 返回两个值</span>
}
<span class="hljs-built_in">console</span>.log(checkscope2()); <span class="hljs-comment">// ["local", "local"]，产生了副作用</span>
<span class="hljs-built_in">console</span>.log(scope);         <span class="hljs-comment">// "local"，全局变量修改了</span>
<span class="hljs-built_in">console</span>.log(myscope);       <span class="hljs-comment">// "local"，全局命名空间搞乱了</span></code></pre>
<p>函数定义是可以嵌套的。由于每个函数都有它自己的作用域，因此会出现几个局部作用域嵌套的情况，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var scope = &quot;global scope&quot;;         // 全局变量
function checkscope() {
    var scope = &quot;local scope&quot;;      //局部变量 
    function nested() {
        var scope = &quot;nested scope&quot;; // 嵌套作用域内的局部变量
        return scope;               // 返回当前作用域内的值
    }
    return nested();
}
console.log(checkscope());          // &quot;nested scope&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> scope = <span class="hljs-string">"global scope"</span>;         <span class="hljs-comment">// 全局变量</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkscope</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> scope = <span class="hljs-string">"local scope"</span>;      <span class="hljs-comment">//局部变量 </span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">nested</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> scope = <span class="hljs-string">"nested scope"</span>; <span class="hljs-comment">// 嵌套作用域内的局部变量</span>
        <span class="hljs-keyword">return</span> scope;               <span class="hljs-comment">// 返回当前作用域内的值</span>
    }
    <span class="hljs-keyword">return</span> nested();
}
<span class="hljs-built_in">console</span>.log(checkscope());          <span class="hljs-comment">// "nested scope"</span></code></pre>
<h3 id="articleHeader4">函数作用域和声明提前</h3>
<p>在一些类似 C 语言的编程语言中，花括号内的每一段代码都具有各自的作用域，而且变量在声明它们的代码段之外是不可见的，我们称为块级作用域（block scope），而 JavaScript 中没有块级作用域。JavaScript 取而代之地使用了函数作用域（function scope），变量在声明它们的函数体以及这个函数体嵌套的任意函数体内都是有定义的。</p>
<p>在如下所示的代码中，在不同位置定义了变量 <code>i</code>、<code>j</code> 和 <code>k</code>，它们都在同一个作用域内，这三个变量在函数体内均是有定义的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function test(o) {
    var i = 0; // i在整个函数体内均是有定义的
    if (typeof o == &quot;object&quot;) {
        var j = 0; // j在函数体内是有定义的，不仅仅是在这个代码段内
        for (var k = 0; k < 10; k++) { // k在函数体内是有定义的，不仅仅是在循环内
            console.log(k); // 输出数字0~9
        }
        console.log(k); // k已经定义了，输出10
    }
    console.log(j); // j已经定义了，但可能没有初始化
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params">o</span>) </span>{
    <span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; <span class="hljs-comment">// i在整个函数体内均是有定义的</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> o == <span class="hljs-string">"object"</span>) {
        <span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; <span class="hljs-comment">// j在函数体内是有定义的，不仅仅是在这个代码段内</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> k = <span class="hljs-number">0</span>; k &lt; <span class="hljs-number">10</span>; k++) { <span class="hljs-comment">// k在函数体内是有定义的，不仅仅是在循环内</span>
            <span class="hljs-built_in">console</span>.log(k); <span class="hljs-comment">// 输出数字0~9</span>
        }
        <span class="hljs-built_in">console</span>.log(k); <span class="hljs-comment">// k已经定义了，输出10</span>
    }
    <span class="hljs-built_in">console</span>.log(j); <span class="hljs-comment">// j已经定义了，但可能没有初始化</span>
}</code></pre>
<p>JavaScript 的函数作用域是指在函数内声明的所有变量在函数体内始终是可见的。有意思的是，这意味着变量在声明之前甚至已经可用。JavaScript 的这个特性被非正式地称为声明提前（hoisting），即 JavaScript 函数里声明的所有变量（但不涉及赋值）都被「提前」至函数体的顶部，看一下如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var scope = &quot;global&quot;;
function f() {
    console.log(scope);  // 输出&quot;undefined&quot;，而不是&quot;global&quot;
    var scope = &quot;local&quot;; // 变量在这里赋初始值，但变量本身在函数体内任何地方均是有定义的
    console.log(scope);  // 输出&quot;local&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> scope = <span class="hljs-string">"global"</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(scope);  <span class="hljs-comment">// 输出"undefined"，而不是"global"</span>
    <span class="hljs-keyword">var</span> scope = <span class="hljs-string">"local"</span>; <span class="hljs-comment">// 变量在这里赋初始值，但变量本身在函数体内任何地方均是有定义的</span>
    <span class="hljs-built_in">console</span>.log(scope);  <span class="hljs-comment">// 输出"local"</span>
}</code></pre>
<p>你可能会误以为函数中的第一行会输出 <code>"global"</code>，因为代码还没有执行到 <code>var</code> 语句声明局部变量的地方。其实不然，由于函数作用域的特性，局部变量在整个函数体始终是有定义的，也就是说，在函数体内局部变量遮盖了同名全局变量。尽管如此，只有在程序执行到 <code>var</code> 语句的时候，局部变量才会被真正赋值。因此，上述过程等价于：将函数内的变量声明“提前”至函数体顶部，同时变量初始化留在原来的位置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f() {
    var scope;          // 在函数顶部声明了局部变量
    console.log(scope); // 变量存在，但其值是&quot;undefined&quot;
    scope = &quot;local&quot;;    // 这里将其初始化并赋值
    console.log(scope); // 这里它具有了我们所期望的值
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> scope;          <span class="hljs-comment">// 在函数顶部声明了局部变量</span>
    <span class="hljs-built_in">console</span>.log(scope); <span class="hljs-comment">// 变量存在，但其值是"undefined"</span>
    scope = <span class="hljs-string">"local"</span>;    <span class="hljs-comment">// 这里将其初始化并赋值</span>
    <span class="hljs-built_in">console</span>.log(scope); <span class="hljs-comment">// 这里它具有了我们所期望的值</span>
}</code></pre>
<p>在具有块级作用域的编程语言中，在狭小的作用域里让变量声明和使用变量的代码尽可能靠近彼此，通常来讲，这是一个非常不错的编程习惯。由于 JavaScript 没有块级作用域，因此一些程序员特意将变量声明放在函数体顶部，而不是将声明靠近放在使用变量之处。这种做法使得他们的源代码非常清晰地反映了真实的变量作用域。</p>
<h3 id="articleHeader5">作用域链</h3>
<p>当代码在一个环境中执行时，会创建变量对象的一个<strong>作用域链</strong>（scope chain）。作用域链的用途，是保证对执行环境有权访问的所有变量和函数的有序访问。作用域链的前端，始终都是当前执行的代码所在环境的变量对象。如果这个环境是函数，则将其<strong>活动对象</strong>（activation object）作为变量对象。活动对象在最开始时只包含一个变量，即 <code>arguments</code> 对象（这个对象在全局环境中是不存在的）。作用域链中的下一个变量对象来自包含（外部）环境，而再下一个变量对象则来自下一个包含环境。这样，一直延续到全局执行环境；全局执行环境的变量对象始终都是作用域链中的最后一个对象。</p>
<p>标识符解析是沿着作用域链一级一级地搜索标识符的过程。搜索过程始终从作用域链的前端开始，然后逐级地向后回溯，直至找到标识符为止（如果找不到标识符，通常会导致错误发生）。</p>
<p>请看下面的示例代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var color = &quot;blue&quot;;

function changeColor(){
    if (color === &quot;blue&quot;){
        color = &quot;red&quot;;
    } else {
        color = &quot;blue&quot;;
    }
}

console.log(changeColor());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> color = <span class="hljs-string">"blue"</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">changeColor</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">if</span> (color === <span class="hljs-string">"blue"</span>){
        color = <span class="hljs-string">"red"</span>;
    } <span class="hljs-keyword">else</span> {
        color = <span class="hljs-string">"blue"</span>;
    }
}

<span class="hljs-built_in">console</span>.log(changeColor());</code></pre>
<p>在这个简单的例子中，函数 <code>changeColor()</code> 的作用域链包含两个对象：它自己的变量对象（其中定义着 <code>arguments</code> 对象）和全局环境的变量对象。可以在函数内部访问变量 <code>color</code>，就是因为可以在这个作用域链中找到它。</p>
<p>此外，在局部作用域中定义的变量可以在局部环境中与全局变量互换使用，如下面这个例子所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var color = &quot;blue&quot;;

function changeColor(){
    var anotherColor = &quot;red&quot;;

    function swapColors(){
        var tempColor = anotherColor;
        anotherColor = color;
        color = tempColor;

        // 这里可以访问color、anotherColor和tempColor
    }

    // 这里可以访问color和anotherColor，但不能访问tempColor
    swapColors();
}

// 这里只能访问color
changeColor();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> color = <span class="hljs-string">"blue"</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">changeColor</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> anotherColor = <span class="hljs-string">"red"</span>;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">swapColors</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> tempColor = anotherColor;
        anotherColor = color;
        color = tempColor;

        <span class="hljs-comment">// 这里可以访问color、anotherColor和tempColor</span>
    }

    <span class="hljs-comment">// 这里可以访问color和anotherColor，但不能访问tempColor</span>
    swapColors();
}

<span class="hljs-comment">// 这里只能访问color</span>
changeColor();</code></pre>
<p>以上代码共涉及3个执行环境：全局环境、<code>changeColor()</code> 的局部环境和 <code>swapColors()</code> 的局部环境。全局环境中有一个变量 <code>color</code> 和一个函数 <code>changeColor()</code>。<code>changeColor()</code> 的局部环境中有一个名为 <code>anotherColor</code> 的变量和一个名为 <code>swapColors()</code> 的函数，但它也可以访问全局环境中的变量 <code>color</code>。<code>swapColors()</code> 的局部环境中有一个变量 <code>tempColor</code>，该变量只能在这个环境中访问到。无论全局环境还是 <code>changeColor()</code> 的局部环境都无权访问 <code>tempColor</code>。然而，在 <code>swapColors()</code> 内部则可以访问其他两个环境中的所有变量，因为那两个环境是它的父执行环境。下图形象地展示了前面这个例子的作用域链。</p>
<p><span class="img-wrap"><img data-src="http://qiniu.shijiajie.com/blog/javascript-lesson/2.41.jpg" src="https://static.alili.techhttp://qiniu.shijiajie.com/blog/javascript-lesson/2.41.jpg" alt="" title="" style="cursor: pointer;"></span></p>
<p>上图中的矩形表示特定的执行环境。其中，内部环境可以通过作用域链访问所有的外部环境，但外部环境不能访问内部环境中的任何变量和函数。这些环境之间的联系是线性、有次序的。每个环境都可以向上搜索作用域链，以查询变量和函数名；但任何环境都不能通过向下搜索作用域链而进入另一个执行环境。对于这个例子中的 <code>swapColors()</code> 而言，其作用域链中包含3个对象：<code>swapColors()</code> 的变量对象、<code>changeColor()</code> 的变量对象和全局变量对象。<code>swapColors()</code> 的局部环境开始时会先在自己的变量对象中搜索变量和函数名，如果搜索不到则再搜索上一级作用域链。<code>changeColor()</code> 的作用域链中只包含两个对象：它自己的变量对象和全局变量对象。这也就是说，它不能访问 <code>swapColors()</code> 的环境。函数参数也被当作变量来对待，因此其访问规则与执行环境中的其他变量相同。</p>
<h2 id="articleHeader6">闭包</h2>
<p>MDN 对闭包的定义：</p>
<blockquote><p>闭包是指那些能够访问独立（自由）变量的函数（变量在本地使用，但定义在一个封闭的作用域中）。换句话说，这些函数可以「记忆」它被创建时候的环境。</p></blockquote>
<p>《JavaScript 权威指南(第6版)》对闭包的定义：</p>
<blockquote><p>函数对象可以通过作用域链相互关联起来，函数体内部的变量都可以保存在函数作用域内，这种特性在计算机科学文献中称为闭包。</p></blockquote>
<p>《JavaScript 高级程序设计(第3版)》对闭包的定义：</p>
<blockquote><p>闭包是指有权访问另一个函数作用域中的变量的函数。</p></blockquote>
<p>上面这些定义都比较晦涩难懂，<a href="http://www.ruanyifeng.com/" rel="nofollow noreferrer" target="_blank">阮一峰</a>的解释稍微好理解一些：</p>
<blockquote><p>由于在 Javascript 语言中，只有函数内部的子函数才能读取局部变量，因此可以把闭包简单理解成定义在一个函数内部的函数。</p></blockquote>
<h3 id="articleHeader7">闭包的用途</h3>
<p>闭包可以用在许多地方。它的最大用处有两个，一个是可以读取函数内部的变量（作用域链），另一个就是让这些变量的值始终保持在内存中。怎么来理解这句话呢？请看下面的代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fun() {　　　
    var n = 1;

    add = function() {
        n += 1
    }

    function fun2(){
        console.log(n);
    }

    return fun2;
}

var result = fun();　　
result(); // 1
add();
result(); // 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fun</span>(<span class="hljs-params"></span>) </span>{　　　
    <span class="hljs-keyword">var</span> n = <span class="hljs-number">1</span>;

    add = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        n += <span class="hljs-number">1</span>
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fun2</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(n);
    }

    <span class="hljs-keyword">return</span> fun2;
}

<span class="hljs-keyword">var</span> result = fun();　　
result(); <span class="hljs-comment">// 1</span>
add();
result(); <span class="hljs-comment">// 2</span></code></pre>
<p>在这段代码中，<code>result</code> 实际上就是函数 <code>fun2</code>。它一共运行了两次，第一次的值是 <code>1</code>，第二次的值是 <code>2</code>。这证明了，函数 <code>fun</code> 中的局部变量 <code>n</code> 一直保存在内存中，并没有在 <code>fun</code> 调用后被自动清除。</p>
<p>为什么会这样呢？原因就在于 <code>fun</code> 是 <code>fun2</code> 的父函数，而 <code>fun2</code> 被赋给了一个全局变量，这导致 <code>fun2</code> 始终在内存中，而 <code>fun2</code> 的存在依赖于 <code>fun</code>，因此 <code>fun</code> 也始终在内存中，不会在调用结束后，被垃圾回收机制（garbage collection）回收。</p>
<p>这段代码中另一个值得注意的地方，就是 <code>add = function() { n += 1 }</code> 这一行。首先，变量 <code>add</code> 前面没有使用 <code>var</code> 关键字，因此 <code>add</code> 是一个全局变量，而不是局部变量。其次，<code>add</code> 的值是一个匿名函数（anonymous function），而这个匿名函数本身也是一个闭包，和 <code>fun2</code> 处于同一作用域，所以 <code>add</code> 相当于是一个 <code>setter</code>，可以在函数外部对函数内部的局部变量进行操作。</p>
<h3 id="articleHeader8">计数器的困境</h3>
<p>我们再来看一个经典例子「计数器的困境」，假设你想统计一些数值，且该计数器在所有函数中都是可用的。你可以定义一个全局变量 <code>counter</code> 当做计数器，再定义一个 <code>add()</code> 函数来设置计数器递增。代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var counter = 0;
function add() {
    return counter += 1;
}

console.log(add());
console.log(add());
console.log(add());
// 计数器现在为 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> counter = <span class="hljs-number">0</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> counter += <span class="hljs-number">1</span>;
}

<span class="hljs-built_in">console</span>.log(add());
<span class="hljs-built_in">console</span>.log(add());
<span class="hljs-built_in">console</span>.log(add());
<span class="hljs-comment">// 计数器现在为 3</span></code></pre>
<p>计数器数值在执行 <code>add()</code> 函数时发生变化。但问题来了，页面上的任何脚本都能改变计数器 <code>counter</code>，即便没有调用 <code>add()</code> 函数。如果我们将计数器 <code>counter </code> 定义在 <code>add()</code> 函数内部，就不会被外部脚本随意修改到计数器的值了。代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add() {
    var counter = 0;
    return counter += 1;
}

console.log(add());
console.log(add());
console.log(add());
// 本意是想输出 3, 但事与愿违，输出的都是 1 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> counter = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">return</span> counter += <span class="hljs-number">1</span>;
}

<span class="hljs-built_in">console</span>.log(add());
<span class="hljs-built_in">console</span>.log(add());
<span class="hljs-built_in">console</span>.log(add());
<span class="hljs-comment">// 本意是想输出 3, 但事与愿违，输出的都是 1 </span></code></pre>
<p>因为每次调用 <code>add()</code> 函数，计数器都会被重置为 0，输出的都是 1，这并不是我们想要的结果。闭包正好可以解决这个问题，我们在 <code>add()</code> 函数内部，再定义一个 <code>plus()</code> 内嵌函数（闭包），内嵌函数 <code>plus()</code> 可以访问父函数的 <code>counter</code> 变量。代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add() {
    var counter = 0;
    var plus = function() {counter += 1;}
    plus();
    return counter; 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> counter = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> plus = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{counter += <span class="hljs-number">1</span>;}
    plus();
    <span class="hljs-keyword">return</span> counter; 
}</code></pre>
<p>接下来，只要我们能在外部访问 <code>plus()</code> 函数，并且确保 <code>counter = 0</code> 只执行一次，就能解决计数器的困境。代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var add = function() {
    var counter = 0;
    var plus = function() {return counter += 1;}
    return plus;
}

var puls2 = add();
console.log(puls2());
console.log(puls2());
console.log(puls2());
// 计数器为 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> add = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> counter = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> plus = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{<span class="hljs-keyword">return</span> counter += <span class="hljs-number">1</span>;}
    <span class="hljs-keyword">return</span> plus;
}

<span class="hljs-keyword">var</span> puls2 = add();
<span class="hljs-built_in">console</span>.log(puls2());
<span class="hljs-built_in">console</span>.log(puls2());
<span class="hljs-built_in">console</span>.log(puls2());
<span class="hljs-comment">// 计数器为 3</span></code></pre>
<p>计数器 <code>counter</code> 受 <code>add()</code> 函数的作用域保护，只能通过 <code>puls2</code> 方法修改。</p>
<h3 id="articleHeader9">使用闭包的注意点</h3>
<ul>
<li><p>由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在 IE 中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除或设置为 <code>null</code>，断开变量和内存的联系。</p></li>
<li><p>闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（public method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。</p></li>
</ul>
<p>JavaScript 闭包是一种强大的语言特性。通过使用这个语言特性来隐藏变量，可以避免覆盖其他地方使用的同名变量，理解闭包有助于编写出更有效也更简洁的代码。</p>
<h2 id="articleHeader10">
<code>this</code> 关键字</h2>
<p>谈到作用域和闭包就不得不说 <code>this</code> 关键字，虽然它们之间关联不大，但是它们一起使用却容易让人产生疑惑。下面列出了使用 <code>this</code> 的大部分场景，带大家一探究竟。</p>
<p><code>this</code> 是 JavaScript 的关键字，指函数执行时的上下文，跟函数定义时的上下文无关。随着函数使用场合的不同，<code>this</code> 的值会发生变化。但是有一个总的原则，那就是 <code>this</code> 指代的是调用函数的那个对象。</p>
<h3 id="articleHeader11">全局上下文</h3>
<p>在全局上下文中，也就是在任何函数体外部，<code>this</code> 指代全局对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在浏览器中，this 指代全局对象 window
console.log(this === window);  // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 在浏览器中，this 指代全局对象 window</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === <span class="hljs-built_in">window</span>);  <span class="hljs-comment">// true</span></code></pre>
<h3 id="articleHeader12">函数上下文</h3>
<p>在函数上下文中，也就是在任何函数体内部，<code>this</code> 指代调用函数的那个对象。</p>
<h4>函数调用中的 <code>this</code>
</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f1(){
    return this;
}

console.log(f1() === window); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f1</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
}

<span class="hljs-built_in">console</span>.log(f1() === <span class="hljs-built_in">window</span>); <span class="hljs-comment">// true</span></code></pre>
<p>如上代码所示，直接定义一个函数 <code>f1()</code>，相当于为 <code>window</code> 对象定义了一个属性。直接执行函数 <code>f1()</code>，相当于执行 <code>window.f1()</code>。所以函数 <code>f1()</code> 中的 <code>this</code> 指代调用函数的那个对象，也就是 <code>window</code> 对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f2(){
    &quot;use strict&quot;; // 这里是严格模式
    return this;
}

console.log(f2() === undefined); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f2</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-meta">    "use strict"</span>; <span class="hljs-comment">// 这里是严格模式</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
}

<span class="hljs-built_in">console</span>.log(f2() === <span class="hljs-literal">undefined</span>); <span class="hljs-comment">// true</span></code></pre>
<p>如上代码所示，在「严格模式」下，禁止 <code>this</code> 关键字指向全局对象（在浏览器环境中也就是 <code>window</code> 对象），<code>this</code> 的值将维持 <code>undefined</code> 状态。</p>
<h4>对象方法中的 <code>this</code>
</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var o = {
    name: &quot;stone&quot;,
    f: function() {
        return this.name;
    }
};

console.log(o.f()); // &quot;stone&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> o = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">"stone"</span>,
    <span class="hljs-attr">f</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
    }
};

<span class="hljs-built_in">console</span>.log(o.f()); <span class="hljs-comment">// "stone"</span></code></pre>
<p>如上代码所示，对象 <code>o</code> 中包含一个属性 <code>name</code> 和一个方法 <code>f()</code>。当我们执行 <code>o.f()</code> 时，方法 <code>f()</code> 中的 <code>this</code> 指代调用函数的那个对象，也就是对象 <code>o</code>，所以 <code>this.name</code> 也就是 <code>o.name</code>。</p>
<p>注意，在何处定义函数完全不会影响到 <code>this</code> 的行为，我们也可以首先定义函数，然后再将其附属到 <code>o.f</code>。这样做 <code>this</code> 的行为也一致。如下代码所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fun = function() {
    return this.name;
};

var o = { name: &quot;stone&quot; };
o.f = fun;

console.log(o.f()); // &quot;stone&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> fun = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
};

<span class="hljs-keyword">var</span> o = { <span class="hljs-attr">name</span>: <span class="hljs-string">"stone"</span> };
o.f = fun;

<span class="hljs-built_in">console</span>.log(o.f()); <span class="hljs-comment">// "stone"</span></code></pre>
<p>类似的，<code>this</code> 的绑定只受最靠近的成员引用的影响。在下面的这个例子中，我们把一个方法 <code>g()</code> 当作对象 <code>o.b</code> 的函数调用。在这次执行期间，函数中的 <code>this</code> 将指向 <code>o.b</code>。事实上，这与对象本身的成员没有多大关系，最靠近的引用才是最重要的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="o.b = {
    name: &quot;sophie&quot;
    g: fun,
};

console.log(o.b.g()); // &quot;sophie&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">o.b = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">"sophie"</span>
    g: fun,
};

<span class="hljs-built_in">console</span>.log(o.b.g()); <span class="hljs-comment">// "sophie"</span></code></pre>
<h4>
<code>eval()</code> 方法中的 <code>this</code>
</h4>
<p><code>eval()</code> 方法可以将字符串转换为 JavaScript 代码，使用 <code>eval()</code> 方法时，<code>this</code> 指向哪里呢？答案很简单，看谁在调用 <code>eval()</code> 方法，调用者的执行环境中的 <code>this</code> 就被 <code>eval()</code> 方法继承下来了。如下代码所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 全局上下文
function f1(){
    return eval(&quot;this&quot;);
}
console.log(f1() === window); // true

// 函数上下文
var o = {
    name: &quot;stone&quot;,
    f: function() {
        return eval(&quot;this.name&quot;);
    }
};
console.log(o.f()); // &quot;stone&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 全局上下文</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f1</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">eval</span>(<span class="hljs-string">"this"</span>);
}
<span class="hljs-built_in">console</span>.log(f1() === <span class="hljs-built_in">window</span>); <span class="hljs-comment">// true</span>

<span class="hljs-comment">// 函数上下文</span>
<span class="hljs-keyword">var</span> o = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">"stone"</span>,
    <span class="hljs-attr">f</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">eval</span>(<span class="hljs-string">"this.name"</span>);
    }
};
<span class="hljs-built_in">console</span>.log(o.f()); <span class="hljs-comment">// "stone"</span></code></pre>
<h4>
<code>call()</code> 和 <code>apply()</code> 方法中的 <code>this</code>
</h4>
<p><code>call()</code> 和 <code>apply()</code> 是函数对象的方法，它的作用是改变函数的调用对象，它的第一个参数就表示改变后的调用这个函数的对象。因此，<code>this</code> 指代的就是这两个方法的第一个参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = 0;　　
function f() {　　　　
    console.log(this.x);　　
}　　
var o = {};　　
o.x = 1;
o.m = f;　　
o.m.apply(); // 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> x = <span class="hljs-number">0</span>;　　
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{　　　　
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.x);　　
}　　
<span class="hljs-keyword">var</span> o = {};　　
o.x = <span class="hljs-number">1</span>;
o.m = f;　　
o.m.apply(); <span class="hljs-comment">// 0</span></code></pre>
<p><code>call()</code> 和 <code>apply()</code> 的参数为空时，默认调用全局对象。因此，这时的运行结果为 <code>0</code>，证明 <code>this</code> 指的是全局对象。如果把最后一行代码修改为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="o.m.apply(o); // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">o.m.apply(o); <span class="hljs-comment">// 1</span></code></pre>
<p>运行结果就变成了 <code>1</code>，证明了这时 <code>this</code> 指代的是对象 <code>o</code>。</p>
<h4>
<code>bind()</code> 方法中的 <code>this</code>
</h4>
<p>ECMAScript 5 引入了 <code>Function.prototype.bind</code>。调用 <code>f.bind(someObject)</code> 会创建一个与 <code>f</code> 具有相同函数体和作用域的函数，但是在这个新函数中，<code>this</code> 将永久地被绑定到了 <code>bind</code> 的第一个参数，无论这个函数是如何被调用的。如下代码所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f() {
    return this.a;
}

var g = f.bind({
    a: &quot;stone&quot;
});
console.log(g()); // stone

var o = {
    a: 28,
    f: f,
    g: g
};
console.log(o.f(), o.g()); // 28, stone" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.a;
}

<span class="hljs-keyword">var</span> g = f.bind({
    <span class="hljs-attr">a</span>: <span class="hljs-string">"stone"</span>
});
<span class="hljs-built_in">console</span>.log(g()); <span class="hljs-comment">// stone</span>

<span class="hljs-keyword">var</span> o = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">28</span>,
    <span class="hljs-attr">f</span>: f,
    <span class="hljs-attr">g</span>: g
};
<span class="hljs-built_in">console</span>.log(o.f(), o.g()); <span class="hljs-comment">// 28, stone</span></code></pre>
<h4>DOM 事件处理函数中的 <code>this</code>
</h4>
<p>一般来讲，当函数使用 <code>addEventListener</code>，被用作事件处理函数时，它的 <code>this</code> 指向触发事件的元素。如下代码所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE HTML>
<html>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>test</title>
</head>
<body>
    <button id=&quot;btn&quot; type=&quot;button&quot;>click</button>
    <script>
        var btn = document.getElementById(&quot;btn&quot;);
        btn.addEventListener(&quot;click&quot;, function(){
            this.style.backgroundColor = &quot;#A5D9F3&quot;;
        }, false);
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE HTML&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>test<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span>&gt;</span>click<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"btn"</span>);
        btn.addEventListener(<span class="hljs-string">"click"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">this</span>.style.backgroundColor = <span class="hljs-string">"#A5D9F3"</span>;
        }, <span class="hljs-literal">false</span>);
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>但在 IE 浏览器中，当函数使用 <code>attachEvent</code> ，被用作事件处理函数时，它的 <code>this</code> 却指向 <code>window</code>。如下代码所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE HTML>
<html>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>test</title>
</head>
<body>
    <button id=&quot;btn&quot; type=&quot;button&quot;>click</button>
    <script>
        var btn = document.getElementById(&quot;btn&quot;);
        btn.attachEvent(&quot;onclick&quot;, function(){
            console.log(this === window);  // true
        });
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE HTML&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>test<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span>&gt;</span>click<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"btn"</span>);
        btn.attachEvent(<span class="hljs-string">"onclick"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === <span class="hljs-built_in">window</span>);  <span class="hljs-comment">// true</span>
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h4>内联事件处理函数中的 <code>this</code>
</h4>
<p>当代码被内联处理函数调用时，它的 <code>this</code> 指向监听器所在的 DOM 元素。如下代码所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button onclick=&quot;alert(this.tagName.toLowerCase());&quot;>
  Show this
</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"alert(this.tagName.toLowerCase());"</span>&gt;</span>
  Show this
<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre>
<p>上面的 <code>alert</code> 会显示 <code>button</code>，注意只有外层代码中的 <code>this</code> 是这样设置的。如果 <code>this</code> 被包含在匿名函数中，则又是另外一种情况了。如下代码所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button onclick=&quot;alert((function(){return this})());&quot;>
  Show inner this
</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"alert((function(){return this})());"</span>&gt;</span>
  Show inner this
<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre>
<p>在这种情况下，<code>this</code> 被包含在匿名函数中，相当于处于全局上下文中，所以它指向 <code>window</code> 对象。</p>
<h2 id="articleHeader13">关卡</h2>
<p>仔细想想，下面代码块会输出什么结果呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 挑战一
function func1() {
    function func2() {
        console.log(this)
    }
    return func2;
}
func1()();  // ???" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 挑战一</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func1</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func2</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>)
    }
    <span class="hljs-keyword">return</span> func2;
}
func1()();  <span class="hljs-comment">// ???</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 挑战二
scope = &quot;stone&quot;;

function Func() {
    var scope = &quot;sophie&quot;;

    function inner() {
        console.log(scope);
    }
    return inner;
}

var ret = Func();
ret();    // ???" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 挑战二</span>
scope = <span class="hljs-string">"stone"</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Func</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> scope = <span class="hljs-string">"sophie"</span>;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">inner</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(scope);
    }
    <span class="hljs-keyword">return</span> inner;
}

<span class="hljs-keyword">var</span> ret = Func();
ret();    <span class="hljs-comment">// ???</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 挑战三
scope = &quot;stone&quot;;

function Func() {
    var scope = &quot;sophie&quot;;

    function inner() {
        console.log(scope);
    }
    scope = &quot;tommy&quot;;
    return inner;
}

var ret = Func();
ret();    // ???" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 挑战三</span>
scope = <span class="hljs-string">"stone"</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Func</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> scope = <span class="hljs-string">"sophie"</span>;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">inner</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(scope);
    }
    scope = <span class="hljs-string">"tommy"</span>;
    <span class="hljs-keyword">return</span> inner;
}

<span class="hljs-keyword">var</span> ret = Func();
ret();    <span class="hljs-comment">// ???</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 挑战四
scope = &quot;stone&quot;;

function Bar() {
    console.log(scope);
}

function Func() {
    var scope = &quot;sophie&quot;;
    return Bar;
}

var ret = Func();
ret();    // ???" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 挑战四</span>
scope = <span class="hljs-string">"stone"</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Bar</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(scope);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Func</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> scope = <span class="hljs-string">"sophie"</span>;
    <span class="hljs-keyword">return</span> Bar;
}

<span class="hljs-keyword">var</span> ret = Func();
ret();    <span class="hljs-comment">// ???</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 挑战五
var name = &quot;The Window&quot;;　　
var object = {　　　　
    name: &quot;My Object&quot;,
    getNameFunc: function() {　　　　　　
        return function() {　　　　　　　　
            return this.name;　　　　　　
        };　　　　
    }　　
};　　
console.log(object.getNameFunc()());    // ???" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 挑战五</span>
<span class="hljs-keyword">var</span> name = <span class="hljs-string">"The Window"</span>;　　
<span class="hljs-keyword">var</span> object = {　　　　
    <span class="hljs-attr">name</span>: <span class="hljs-string">"My Object"</span>,
    <span class="hljs-attr">getNameFunc</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{　　　　　　
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{　　　　　　　　
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;　　　　　　
        };　　　　
    }　　
};　　
<span class="hljs-built_in">console</span>.log(object.getNameFunc()());    <span class="hljs-comment">// ???</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 挑战六
var name = &quot;The Window&quot;;　　
var object = {　　　　
    name: &quot;My Object&quot;,
    getNameFunc: function() {　　　　　　
        var that = this;　　　　　　
        return function() {　　　　　　　　
            return that.name;　　　　　　
        };　　　　
    }　　
};　　
console.log(object.getNameFunc()());    // ???" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 挑战六</span>
<span class="hljs-keyword">var</span> name = <span class="hljs-string">"The Window"</span>;　　
<span class="hljs-keyword">var</span> object = {　　　　
    <span class="hljs-attr">name</span>: <span class="hljs-string">"My Object"</span>,
    <span class="hljs-attr">getNameFunc</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{　　　　　　
        <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;　　　　　　
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{　　　　　　　　
            <span class="hljs-keyword">return</span> that.name;　　　　　　
        };　　　　
    }　　
};　　
<span class="hljs-built_in">console</span>.log(object.getNameFunc()());    <span class="hljs-comment">// ???</span></code></pre>
<h2 id="articleHeader14">更多</h2>
<blockquote><p>关注微信公众号「劼哥舍」回复「答案」，获取关卡详解。  <br>关注 <a href="https://github.com/stone0090/javascript-lessons" rel="nofollow noreferrer" target="_blank">https://github.com/stone0090/javascript-lessons</a>，获取最新动态。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
《JavaScript 闯关记》之作用域和闭包

## 原文链接
[https://segmentfault.com/a/1190000007791657](https://segmentfault.com/a/1190000007791657)

