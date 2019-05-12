---
title: '前端面试之ES6篇（高产似母猪）' 
date: 2018-12-30 2:30:10
hidden: true
slug: y7q5pyhp6lf
categories: [reprint]
---

{{< raw >}}

                    
<p>这也是前端面试经常询问的问题，经常问你es6出现了哪些新的特性，平时又使用过那些。在编写此教程的时候，第一句话往往就是面试常常问到的地方，然后后面就是他的详细解释，面试要求的内容我会用*标记出来。写技术文档是真的累啊，虽然是看别人的文档，但是你得看很多，而且还得自己总结啊。所以说要是觉得对你有用还是帮我点个star吧<a href="https://github.com/skychenbo" rel="nofollow noreferrer" target="_blank">https://github.com/skychenbo</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1、箭头函数需要注意的地方
2、ES6 let、const
3、set数据结构
4、promise对象的用法,手写一个promise
5、class的理解
6、模版语法的理解
7、rest参数
8、    module体系
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1</span>、箭头函数需要注意的地方
<span class="hljs-number">2</span>、ES6 let、const
<span class="hljs-number">3</span>、set数据结构
<span class="hljs-number">4</span>、promise对象的用法,手写一个promise
<span class="hljs-number">5</span>、class的理解
<span class="hljs-number">6</span>、模版语法的理解
<span class="hljs-number">7</span>、rest参数
<span class="hljs-number">8</span>、    module体系
</code></pre>
<h2 id="articleHeader0">箭头函数需要注意的地方</h2>
<p>*当要求动态上下文的时候，就不能够使用箭头函数。也就是this的固定化<br>1、在使用=&gt;定义函数的时候，this的指向是定义时所在的对象，而不是使用时所在的对象<br>2、不能够用作构造函数，这就是说，不能够使用new命令，否则就会抛出一个错误<br>3、不能够使用arguments对象<br>4、不能使用yield命令<br>这是一道当年很困惑我的一道题不知道你在第一眼能不能看出其结果,this的指向总是让人困扰，但是有了=&gt;以后妈妈再也不用担心你使用this了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Animal {
    constructor(){
        this.type = 'animal'
    }
    says(say) {
        setTimeout(function () {
            console.log(this.type + 'says' + say)
        },1000)
    }
}
var animal = new Animal()
animal.says('hi') // undefined says hi
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Animal</span> </span>{
    <span class="hljs-keyword">constructor</span>(){
        <span class="hljs-keyword">this</span>.type = <span class="hljs-string">'animal'</span>
    }
    says(say) {
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.type + <span class="hljs-string">'says'</span> + say)
        },<span class="hljs-number">1000</span>)
    }
}
<span class="hljs-keyword">var</span> animal = <span class="hljs-keyword">new</span> Animal()
animal.says(<span class="hljs-string">'hi'</span>) <span class="hljs-comment">// undefined says hi</span>
</code></pre>
<p>我们再来看看=&gt;的情况</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Animal() {
    constructor() {
        this.type = 'animal'
    }
    says(say) {
        setTimeout(() => {
            console.log(this.type + ' says ' + say)
        }, 1000)
    }
}
var animal = new Animal()
animal.says('hi') // animal says hi
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Animal</span>() </span>{
    <span class="hljs-keyword">constructor</span>() {
        <span class="hljs-keyword">this</span>.type = <span class="hljs-string">'animal'</span>
    }
    says(say) {
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.type + <span class="hljs-string">' says '</span> + say)
        }, <span class="hljs-number">1000</span>)
    }
}
<span class="hljs-keyword">var</span> animal = <span class="hljs-keyword">new</span> Animal()
animal.says(<span class="hljs-string">'hi'</span>) <span class="hljs-comment">// animal says hi</span>
</code></pre>
<p>ES6 let、const<br>*let是更完美的var，不是全局变量，具有块级函数作用域,大多数情况不会发生变量提升。const定义常量值，不能够重新赋值，如果值是一个对象，可以改变对象里边的属性值<br>let <br>1、let声明的变量具有块级作用域<br>2、let声明的变量不能通过window.变量名进行访问<br>3、形如for(let x..)的循环是每次迭代都为x创建新的绑定<br>下面是var带来的不合理场景</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = []
for (var i = 0; i < i; i++) {
    a[i] = function () {
        console.log(i)
    }
}
a[5]() // 10
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = []
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; i; i++) {
    a[i] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(i)
    }
}
a[<span class="hljs-number">5</span>]() <span class="hljs-comment">// 10</span>
</code></pre>
<p>在上述代码中，变量i是var声明的，在全局范围类都有效。所以每一次循环，新的i值都会覆盖旧值，导致最后输出都是10<br>而如果对循环使用let语句的情况，那么每次迭代都是为x创建新的绑定代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = []
for (let i = 0; i < i; i++) {
    a[i] = function () {
        console.log(i)
    }
}
a[5]() // 5
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = []
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; i; i++) {
    a[i] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(i)
    }
}
a[<span class="hljs-number">5</span>]() <span class="hljs-comment">// 5</span>
</code></pre>
<p>当然除了这种方式让数组中的各个元素分别是不同的函数，我们还可以采用闭包和立即函数两种方法<br>这是闭包的方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function showNum(i) {
    return function () {
        console.log(i)
    }
}
var a = []
for (var i = 0; i < 5; i++) {
    a[i] = showNum(i)
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs matlab"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">showNum</span><span class="hljs-params">(i)</span> {</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
        console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">i</span>)
    }
}
var a = []
<span class="hljs-keyword">for</span> (var <span class="hljs-built_in">i</span> = <span class="hljs-number">0</span>; <span class="hljs-built_in">i</span> &lt; <span class="hljs-number">5</span>; <span class="hljs-built_in">i</span>++) {
    a[i] = showNum(i)
}
</code></pre>
<p>这是立即函数的方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = []
for (var i = 0; i < 5; i++) {
    a[i] = (function (i) {
        return function () {
            console.log(i)
        }
    })(i)
}
a[2]()
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = []
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">5</span>; i++) {
    a[i] = (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">i</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(i)
        }
    })(i)
}
a[<span class="hljs-number">2</span>]()
</code></pre>
<h2 id="articleHeader1">Set数据结构</h2>
<p>*es6方法,Set本身是一个构造函数，它类似于数组，但是成员值都是唯一的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const set = new Set([1,2,3,4,4])
[...set] // [1,2,3,4]
Array.from(new Set())是将set进行去重


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">const</span> <span class="hljs-keyword">set</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">4</span>])
[...<span class="hljs-keyword">set</span>] <span class="hljs-comment">// [1,2,3,4]</span>
Array.from(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>())是将<span class="hljs-keyword">set</span>进行去重


</code></pre>
<h2 id="articleHeader2">promise对象的用法,手写一个promise</h2>
<p>promise是一个构造函数，下面是一个简单实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var promise = new Promise((resolve,reject) => {
    if (操作成功) {
        resolve(value)
    } else {
        reject(error)
    }
})
promise.then(function (value) {
    // success
},function (value) {
    // failure
})


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (操作成功) {
        resolve(value)
    } <span class="hljs-keyword">else</span> {
        reject(error)
    }
})
promise.then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
    <span class="hljs-comment">// success</span>
},<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
    <span class="hljs-comment">// failure</span>
})


</code></pre>
<h2 id="articleHeader3">Class的讲解</h2>
<p>*class语法相对原型、构造函数、继承更接近传统语法，它的写法能够让对象原型的写法更加清晰、面向对象编程的语法更加通俗<br>这是class的具体用法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Animal {
    constructor () {
        this.type = 'animal'
    }
    says(say) {
        console.log(this.type + 'says' + say)
    }
}
 let animal = new Animal()
 animal.says('hello') // animal says hello

 class Cat extends Animal {
     constructor() {
         super()
         this.type = 'cat'
     }
 }
 let cat = new Cat()
 cat.says('hello') // cat says hello
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Animal</span> </span>{
    constructor () {
        <span class="hljs-keyword">this</span>.<span class="hljs-keyword">type</span> = <span class="hljs-symbol">'anima</span>l'
    }
    says(say) {
        console.log(<span class="hljs-keyword">this</span>.<span class="hljs-keyword">type</span> + <span class="hljs-symbol">'say</span>s' + say)
    }
}
 let animal = <span class="hljs-keyword">new</span> <span class="hljs-type">Animal</span>()
 animal.says(<span class="hljs-symbol">'hell</span>o') <span class="hljs-comment">// animal says hello</span>

 <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Cat</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Animal</span> </span>{
     constructor() {
         <span class="hljs-keyword">super</span>()
         <span class="hljs-keyword">this</span>.<span class="hljs-keyword">type</span> = <span class="hljs-symbol">'ca</span>t'
     }
 }
 let cat = <span class="hljs-keyword">new</span> <span class="hljs-type">Cat</span>()
 cat.says(<span class="hljs-symbol">'hell</span>o') <span class="hljs-comment">// cat says hello</span>
</code></pre>
<p>可以看出在使用extend的时候结构输出是cat says hello 而不是animal says hello。说明contructor内部定义的方法和属性是实例对象自己的，不能通过extends 进行继承。在class cat中出现了super(),这是什么呢<br> 在ES6中，子类的构造函数必须含有super函数，super表示的是调用父类的构造函数，虽然是父类的构造函数，但是this指向的却是cat</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.assign 方法" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">Object<span class="hljs-selector-class">.assign</span> 方法</code></pre>
<p>var n = Object.assign(a,b,c)向n中添加a,b,c的属性</p>
<h2 id="articleHeader4">模版语法</h2>
<p>*就是这种形式<code>${varible}</code>,在以往的时候我们在连接字符串和变量的时候需要使用这种方式'string' + varible + 'string'但是有了模版语言后我们可以使用<code>string${varible}string</code>这种进行连接</p>
<h2 id="articleHeader5">rest参数</h2>
<p>*es6引入rest参数，用于获取函数的多余参数，这样就不需要使用arguments对象了<br>ex:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(...values) {
    let sum = 0
    for(var val of values) {
        sum += val
    }
    return sum
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span><span class="hljs-params">(<span class="hljs-rest_arg">...values</span>)</span> </span>{
    let sum = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> val of values) {
        sum += val
    }
    <span class="hljs-keyword">return</span> sum
}

</code></pre>
<h2 id="articleHeader6">module体系</h2>
<p>*历史上js是没有module体系，无法将一个大程序拆分成一些小的程序。在es6之前，有commonJs,AMD两种<br>CommonJS是如何书写的呢</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="

const animal = require('./content.js')
    // content.js
    module.exports = 'a cat'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs http"><code>

<span class="java"><span class="hljs-keyword">const</span> animal = require(<span class="hljs-string">'./content.js'</span>)
    <span class="hljs-comment">// content.js</span>
    <span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = <span class="hljs-string">'a cat'</span>
</span></code></pre>
<p>require.js是这样做的<br>// content.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define('content.js', function () {
    return 'A cat'
})

require(['./content.js'], function (animal) {
    console.log(animal) // a cat
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>define(<span class="hljs-string">'content.js'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">'A cat'</span>
})

<span class="hljs-built_in">require</span>([<span class="hljs-string">'./content.js'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">animal</span>) </span>{
    <span class="hljs-built_in">console</span>.log(animal) <span class="hljs-comment">// a cat</span>
})
</code></pre>
<p>ES6的语法（在我用的vue中，就使用的是这个）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import animal from './content'
// content.js
export default 'a cat'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> animal <span class="hljs-keyword">from</span> <span class="hljs-string">'./content'</span>
<span class="hljs-comment">// content.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-string">'a cat'</span>
</code></pre>
<p>es6 import的其他用法<br>在vue中可以 import animal from './content'<br>animal这个值可以根据你的喜欢而改变，但是有一个问题就是如果一旦引入的是函数或者变量时，你就必须和content中的名字保持一致，可以参照<br>import { say, type } from './content' <br>常用的还有一种写法<br>import * as content from './content'  <br>这种写法就是表示所有的输出值都在这个对象上</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端面试之ES6篇（高产似母猪）

## 原文链接
[https://segmentfault.com/a/1190000011344301](https://segmentfault.com/a/1190000011344301)

