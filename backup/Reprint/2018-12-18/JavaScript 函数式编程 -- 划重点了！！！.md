---
title: 'JavaScript 函数式编程 -- 划重点了！！！' 
date: 2018-12-18 2:30:11
hidden: true
slug: eoyrrs58ny
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">函数是一等公民</h2>
<p>在谈到函数式编程的时候，很多时候会听到这样一句话 "函数是一等公民"。那我们如何去理解这句话呢? </p>
<p>"一等" 这个术语通常用来描述值。所以当我们说 "函数是一等公民" 时，也就是说函数拥有值的一切特性，你可以像看待一个值一样来看待一个函数。举个例子，数字在 JavaScript 中是一等公民，那么数字拥有的特性，也同样被函数所拥有。</p>
<ul><li><strong>函数可以像数字一样被存储为一个变量</strong></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const num = 10;
const fun = function() {
    return 10;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> num = <span class="hljs-number">10</span>;
<span class="hljs-keyword">const</span> fun = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-number">10</span>;
}</code></pre>
<ul><li><strong>函数可以像数字一样作为数组的一个元素</strong></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const a = [10, function() { return 20; } ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> a = [<span class="hljs-number">10</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-number">20</span>; } ]</code></pre>
<ul><li><strong>函数可以像数字一样存在于对象的插槽里</strong></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const b = {
    name: 'Tony',
    age: function() { 
        return 20; 
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> b = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'Tony'</span>,
    <span class="hljs-attr">age</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ 
        <span class="hljs-keyword">return</span> <span class="hljs-number">20</span>; 
    }
}</code></pre>
<ul><li><strong>函数可以像数字一样在使用时直接创建出来</strong></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="10 + (function() { return 20; })(); // 30" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-number">10</span> + (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-number">20</span>; })(); <span class="hljs-comment">// 30</span></code></pre>
<ul><li><strong>函数可以像数字一样被另一个函数返回</strong></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const well = function() {
    return 10;
}

const good = function() {
    return function() {
        return 10;
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> well = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-number">10</span>;
}

<span class="hljs-keyword">const</span> good = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-number">10</span>;
    };
}</code></pre>
<ul><li><strong>函数可以像数字一样被传递给另一个函数</strong></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const fun = function(value) { 
    return value; 
}

const happy = function(func) {
    return func(5) * 10;
}

happy(fun); // 50" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-keyword">const</span> fun = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{ 
    <span class="hljs-keyword">return</span> value; 
}

<span class="hljs-keyword">const</span> happy = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">func</span>) </span>{
    <span class="hljs-keyword">return</span> func(<span class="hljs-number">5</span>) * <span class="hljs-number">10</span>;
}

happy(fun); <span class="hljs-comment">// 50</span></code></pre>
<p>最后两条其实就是 <code>高阶函数</code> 的定义，如果你现在不理解也没有关系，我们在后面的部分会讲到它。</p>
<h2 id="articleHeader1">变量作用域和闭包</h2>
<h3 id="articleHeader2">变量作用域</h3>
<p>变量的作用域和闭包作为 JavaScript 的基础，在学习函数式编程中是非常重要的，只有理解了它们，你才能更好的去理解我们后面要讲到的高阶函数和部分应用等。</p>
<p>关于变量的作用域，你需要知道:</p>
<ul><li>
<code>全局作用域</code>: JavaScript 中拥有最长生命周期 (一个变量的多长的时间内保持一定的值) 的变量，其变量的生命周期将跨越整个程序。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="globalVariable = 'This is a global variable!';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">globalVariable = <span class="hljs-string">'This is a global variable!'</span>;</code></pre>
<ul><li>
<code>词法作用域</code>: 词法作用域其实就是指一个变量的可见性，以及它文本表述的模拟值。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a = 'outter a';

function good() {
    a = 'middle a';
    return function() {
        a = 'inner a';
        return 'I am ' + a;
    }
}

good(); // I am inner a" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">a = <span class="hljs-string">'outter a'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">good</span>(<span class="hljs-params"></span>) </span>{
    a = <span class="hljs-string">'middle a'</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        a = <span class="hljs-string">'inner a'</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-string">'I am '</span> + a;
    }
}

good(); <span class="hljs-comment">// I am inner a</span></code></pre>
<blockquote>PS：这里的示例代码仅仅是为了学习，你最好不要这样去写，因为它会让你的代码变得令人费解。</blockquote>
<p>在上面的例子中，我们分别对 a 变量进行了三次赋值，那么为什么最后我们拿到 a 的值是 'inner a' 而非其他呢？</p>
<p>当我们声明 <code>a = 'outter a'</code> 时，程序会在栈中开辟一个空间去存储 a，当执行 <code>good()</code>函数时，我们声明了 <code>a = 'middle a'</code>，这时候会将栈中 a 的值修改掉，变成 <code>'middle a'</code>，最后在执行 return 语句时，我们又声明了 <code>a = 'inner a'</code>，这时候会再次修改栈中的 a 的值，变成 <code>'inner a'</code>。因此得到了上面的结果。</p>
<p>在多次给同一变量赋值时，最后得到的值是离使用时最近的一次赋值。通过查找离使用时最近的一次赋值，我们可以快速的得出最后的结果。</p>
<ul><li><code>动态作用域</code></li></ul>
<p>提到 JavaScript 的动态作用域，就不得不提到 <code>this</code> 了。<code>this</code> 相关的知识很多，之后有时间再详细来讲讲。现在我们先记住 <code>this</code> 所指向的值由<strong>调用者</strong>确定，如下代码所示:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function globalThis() { return this; }

globalThis.call('APPLE'); //=> 'APPLE'
globalThis.call('ORANGE'); //=> 'ORANGE'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">globalThis</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>; }

globalThis.call(<span class="hljs-string">'APPLE'</span>); <span class="hljs-comment">//=&gt; 'APPLE'</span>
globalThis.call(<span class="hljs-string">'ORANGE'</span>); <span class="hljs-comment">//=&gt; 'ORANGE'</span></code></pre>
<ul><li><code>函数作用域</code></li></ul>
<h3 id="articleHeader3">闭包</h3>
<p>说起闭包，很多人都会觉得有点头疼，这的确是一个令人费解的概念，不过不要怕，它其实没有那么难以理解。</p>
<h4>闭包的定义</h4>
<p><strong>闭包是一个函数和声明该函数的词法环境的组合</strong> </p>
<p>换句话说，闭包就是在<strong>使用时</strong>被作用域封闭的<strong>变量和函数</strong>。闭包可以捕获函数的参数和变量。</p>
<p>举个例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fun = function() {
    const a = 10;
    return function(b) {
         return a + b;
    }
}
const myFunc = fun(); // 此时 myFunc 就变成一个闭包了，这个闭包可以捕获 fun 函数里的 a 变量，b 参数。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> fun = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> a = <span class="hljs-number">10</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">b</span>) </span>{
         <span class="hljs-keyword">return</span> a + b;
    }
}
<span class="hljs-keyword">const</span> myFunc = fun(); <span class="hljs-comment">// 此时 myFunc 就变成一个闭包了，这个闭包可以捕获 fun 函数里的 a 变量，b 参数。</span></code></pre>
<p>注意闭包是在使用时才会生成的，而非创建时。如上面的例子，如果只创建 fun 函数，而不执行最后一句 fun()，那么 fun 并不能称之为一个闭包。这里的闭包应该是 fun 运行时所产生的作用域，这个作用域捕获了fun 里面的变量和参数。</p>
<h4>闭包的特点</h4>
<ul>
<li><strong>闭包会捕获一个值(或引用)，并多次返回相同的值</strong></li>
<li><strong>每一个新的闭包都会捕获不一样的值</strong></li>
</ul>
<p>再来看一个例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fun = function() {
    return function() {
        return 10;
    }
}

const myFunc = fun(); // myFunc 不是一个闭包

const fun2 = function(value) {
    return function() {
        return value;
    }
}
const myFunc2 = fun2('AWESOME'); // myFunc2 是一个闭包
myFunc2(); // AWESOME
myFunc2(); // AWESOME 多次执行 myFunc2 闭包，返回的值相同

const myFunc3 = fun2('HAPPY'); // myFunc3 是一个新的闭包
myFunc3(); // HAPPY" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> fun = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-number">10</span>;
    }
}

<span class="hljs-keyword">const</span> myFunc = fun(); <span class="hljs-comment">// myFunc 不是一个闭包</span>

<span class="hljs-keyword">const</span> fun2 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> value;
    }
}
<span class="hljs-keyword">const</span> myFunc2 = fun2(<span class="hljs-string">'AWESOME'</span>); <span class="hljs-comment">// myFunc2 是一个闭包</span>
myFunc2(); <span class="hljs-comment">// AWESOME</span>
myFunc2(); <span class="hljs-comment">// AWESOME 多次执行 myFunc2 闭包，返回的值相同</span>

<span class="hljs-keyword">const</span> myFunc3 = fun2(<span class="hljs-string">'HAPPY'</span>); <span class="hljs-comment">// myFunc3 是一个新的闭包</span>
myFunc3(); <span class="hljs-comment">// HAPPY</span></code></pre>
<p>这里 myFunc 严格意义上并不能叫作一个闭包，因为它并没有捕获 fun 任何的变量或者是函数的传参。而 myFunc2 是一个闭包，因为它捕获了 fun2 的传参。</p>
<h4>闭包的销毁</h4>
<p>闭包延续了变量的生命周期，如果不手动销毁，闭包里面的变量会一直存在内存中。比如当我们手动将 myFunc = null 时，闭包里面的变量才会被垃圾回收。</p>
<h4>实用的闭包</h4>
<p>说了这么多，你可能会有这样的疑问，闭包真的有用吗？闭包一般都会用到什么地方？</p>
<p>*1. 用闭包模拟私有方法, 使公共函数能够访问私有函数和变量，实现数据的隐藏和封装。私有方法有利于限制对代码的访问，并且提供了强大的管理命名空间的能力，避免了非核心代码对公共接口的干扰。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Counter = () => {
    let count = 0;
    
    const change = (a) => {
        count = count + a;
    }
    
    return {
        increase: () => {
            change(1);
        },
        decrease: () => {
            change(- 1);
        },
        value: () => {
            return count;
        }
    }
}

const func1 = new Counter();
func1.value();  // 0

func1.increase(); 
func1.value(); // 1

func1.decrease();
func1.value(); // 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> Counter = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">let</span> count = <span class="hljs-number">0</span>;
    
    <span class="hljs-keyword">const</span> change = <span class="hljs-function">(<span class="hljs-params">a</span>) =&gt;</span> {
        count = count + a;
    }
    
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">increase</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            change(<span class="hljs-number">1</span>);
        },
        <span class="hljs-attr">decrease</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            change(- <span class="hljs-number">1</span>);
        },
        <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-keyword">return</span> count;
        }
    }
}

<span class="hljs-keyword">const</span> func1 = <span class="hljs-keyword">new</span> Counter();
func1.value();  <span class="hljs-comment">// 0</span>

func1.increase(); 
func1.value(); <span class="hljs-comment">// 1</span>

func1.decrease();
func1.value(); <span class="hljs-comment">// 0</span></code></pre>
<p>*2. 通过一个高阶函数，生成不同的闭包，从而得到多个保存不同环境的新函数。</p>
<p>如下面的例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const makeAdder = function(x) {
    return function(y) {
        return x + y;
    }
}

const add5 = makeAdder(5);
const add10 = makeAdder(10);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> makeAdder = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">y</span>) </span>{
        <span class="hljs-keyword">return</span> x + y;
    }
}

<span class="hljs-keyword">const</span> add5 = makeAdder(<span class="hljs-number">5</span>);
<span class="hljs-keyword">const</span> add10 = makeAdder(<span class="hljs-number">10</span>);</code></pre>
<p>makeAdder 其实是一个函数工厂，用于创建将制定的值和它的参数求和的函数。通过它我们又创建了两个新函数 add5 和 add10。add5 和 add10 都是闭包。它们共享着相同的函数定义，但是却保存了不同的环境。在 add5 的环境中，x 为 5，但是在 add10 中，x 则为10。</p>
<h2 id="articleHeader4">高阶函数</h2>
<h3 id="articleHeader5">定义</h3>
<p>满足以下任意条件之一即可称之为高阶函数：</p>
<ul>
<li>以一个或者多个函数作为参数</li>
<li>以一个函数作为返回结果</li>
</ul>
<p>我们常见的 map，find，reduce 都是以函数作为入参的函数，所以它们都是高阶函数。</p>
<h3 id="articleHeader6">以函数作为参数的函数</h3>
<p>使用函数作为函数的参数，可以让我们创建出更灵活的函数。通过将参数从值替换为函数，我们可以得到更多的可能性。因为在调用的时候，我们可以通过传入不同的函数来完成不同的需求。</p>
<p>正如下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const finder = function(val, func) {
    return val.reduce(function(prev, current) {
        return func(prev, current);
    });
}

const a = [1, 2, 3, 5, 8];
finder(a, Math.max); // 8
finder(a, Math.min); // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> finder = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">val, func</span>) </span>{
    <span class="hljs-keyword">return</span> val.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">prev, current</span>) </span>{
        <span class="hljs-keyword">return</span> func(prev, current);
    });
}

<span class="hljs-keyword">const</span> a = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">5</span>, <span class="hljs-number">8</span>];
finder(a, <span class="hljs-built_in">Math</span>.max); <span class="hljs-comment">// 8</span>
finder(a, <span class="hljs-built_in">Math</span>.min); <span class="hljs-comment">// 1</span></code></pre>
<p>在使用 finder 函数时，通过传入不同的函数，最后得到了完全不同的结果。这也是为什么我们强调 "使用函数，而不是值" 的原因。</p>
<h3 id="articleHeader7">以函数作为返回结果的函数</h3>
<p>以函数作为返回结果的函数，可以构建强大的函数。还记得我们前面提到的闭包吗? 通过高阶函数 makeAdder，我们生成了 add5 和 add10 两个新的函数。能够生成闭包的函数，其实都是高阶函数。</p>
<p>到这里，第一部分重点内容就讲完了。在下一部分中，我们会讲到函数式编程中剩下的几个重要部分:</p>
<ul>
<li>柯里化和组合</li>
<li>部分应用</li>
<li>递归</li>
<li>基于流的编程</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 函数式编程 -- 划重点了！！！

## 原文链接
[https://segmentfault.com/a/1190000012737990](https://segmentfault.com/a/1190000012737990)

