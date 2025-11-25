---
title: 'call, apply, bind 函数能干啥？如何在日常搬砖中使用？（全）' 
date: 2018-12-30 2:30:10
hidden: true
slug: 78alp3z50lo
categories: [reprint]
---

{{< raw >}}

                    
<p><code>call(),apply(),bind()</code> 函数大家可能都有所了解，但是在平时搬砖过程中<strong>很可能或者基本没用过</strong>，学过但都淡忘了。</p>
<p>但是在大量第三方的框架(库)，甚至js自己都在 <strong>源码中大量使用</strong> <code>call,apply</code> 函数。所以今天和大家仔细讨论下它们在 <strong>开发中的应用场景</strong> 。</p>
<h2 id="articleHeader0">1 . 它们是啥意思</h2>
<h2 id="articleHeader1">1.1 作用</h2>
<ol>
<li>他们的作用都是改变函数内部的<code>this</code>。</li>
<li>这三个函数都是<code>函数对象</code>的方法，也就是说只有函数才可以直接调用这些方法。</li>
</ol>
<p>ps：call,apply,bing属于this显示绑定，还有好几种其他的this绑定方式，<a href="http://sfau.lt/b5U8ps" rel="nofollow noreferrer" target="_blank">感兴趣的可以点这里</a>。</p>
<h2 id="articleHeader2">1.2 三者区别</h2>
<ul><li>
<strong>参数：</strong> 三个函数的第一个参数都是需要绑定的 <code>this</code>。</li></ul>
<p><code>call</code>： 可以有n个参数，从第二个参数开始的所有参数都是原函数的参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`apply`：只有两个参数，并且第二个参数必须为数组，数组中的所有元素一一对应原函数的参数。

`bind`： 只有一个参数，即要绑定的this。

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code>`apply`：只有两个参数，并且第二个参数必须为数组，数组中的所有元素一一对应原函数的参数。

`bind`： 只有一个参数，即要绑定的this。

</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    call 语法：  foo.call(this, arg1,arg2, ... ,argn );
    apply 语法： foo.apply(this, [ arg1,arg2, ... ,argn ] );
    bind 语法：  foo.bind(this);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>    call 语法：  foo.call(<span class="hljs-keyword">this</span>, arg1,arg2, ... ,argn );
    apply 语法： foo.apply(<span class="hljs-keyword">this</span>, [ arg1,arg2, ... ,argn ] );
    bind 语法：  foo.bind(<span class="hljs-keyword">this</span>);
</code></pre>
<ul><li><strong>调用：</strong></li></ul>
<p><code>call,apply</code>： 调用后立即执行原函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`bind`： 调用后返回已经绑定好this的函数。

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code>`bind`： 调用后返回已经绑定好this的函数。

</code></pre>
<p>小例子一枚：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    function foo(a,b){
        console.log(a+b);
    }
    foo.call(null,'海洋','饼干');        // 海洋饼干  这里this指向不重要就写null了
    foo.apply(null, ['海洋','饼干'] );   // 海洋饼干
    var fun = foo.bind(null);
    fun('海洋','饼干');                  // 海洋饼干" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>
    function foo(a,b){
        console.log(a+b);
    }
    foo.call(<span class="hljs-literal">null</span>,<span class="hljs-string">'海洋'</span>,<span class="hljs-string">'饼干'</span>);        <span class="hljs-comment">// 海洋饼干  这里this指向不重要就写null了</span>
    foo.apply(<span class="hljs-literal">null</span>, [<span class="hljs-string">'海洋'</span>,<span class="hljs-string">'饼干'</span>] );   <span class="hljs-comment">// 海洋饼干</span>
    <span class="hljs-keyword">var</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> = foo.<span class="hljs-title">bind</span><span class="hljs-params">(<span class="hljs-literal">null</span>)</span></span>;
    <span class="hljs-function"><span class="hljs-title">fun</span><span class="hljs-params">(<span class="hljs-string">'海洋'</span>,<span class="hljs-string">'饼干'</span>)</span></span>;                  <span class="hljs-comment">// 海洋饼干</span></code></pre>
<h2 id="articleHeader3">2 .它们能干啥事</h2>
<p>这是我们今天讨论的主题，这三个函数如何应用？什么情况下使用？<strong>能改变<code>this</code>指向又能咋滴？</strong></p>
<h2 id="articleHeader4">2 .1 处理伪数组 (最常用)</h2>
<p>先考虑一个问题，如果你使用<code>var arr = document.getElementsByTagName('li')</code>获取了5个<code>li</code>元素，你现在需要获取其中的第2,3,4三个元素，你会怎么做？</p>
<p>这样<code>arr.slice(1,4);</code>？  啊哦，<code>TypeError -- arr.slice is not a function(slice不是函数)</code>，数组操作在日常搬砖中非常常见，我见过最傻的解决这个问题的方式是使用循环，将需要的元素一个个添加到一个新数组里0.0，<strong>下面我介绍的方法完全可以在实战中使用，可以给你的代码加分哦,非常方便简洁</strong>(中高级前端程序员中，算是基本操作了)。</p>
<p>先要介绍一个概念( <strong>伪数组</strong> )，这也是为什么我们刚刚slice切割数组时出错的原因： (对新手来说算是干货了，知道的可以跳过)</p>
<p>什么是伪数组？( 字面的意思已经呼之欲出了 )</p>
<ol>
<li>有length属性</li>
<li>能按索引存储数据</li>
<li><strong>能像遍历数组一样来遍历</strong></li>
<li><strong>不能使用数组的<code>push()、slice()</code>等方法</strong></li>
</ol>
<p><strong>简单来说就是可以像数组一样操作的对象，但是没有数组的方法。</strong></p>
<p>js中存在大量伪数组，如 ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. function的arguments对象。
2. getElementsByName(),getElementsByTagName(),childNodes/children 等方法的返回值。
3. 还有比较常见的jquery,使用它获取的元素也是伪数组。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code><span class="hljs-bullet">1. </span>function的arguments对象。
<span class="hljs-bullet">2. </span>getElementsByName(),getElementsByTagName(),childNodes/children 等方法的返回值。
<span class="hljs-bullet">3. </span>还有比较常见的jquery,使用它获取的元素也是伪数组。
</code></pre>
<p>回到原来的问题，如何截取伪数组中的元素：<strong>伪数组没有这些方法，我们'借用'Array的slice不就行了</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[].slice.call(arr,1,4);  // 推荐写法
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-attr">[]</span><span class="hljs-selector-class">.slice</span><span class="hljs-selector-class">.call</span>(arr,<span class="hljs-number">1</span>,<span class="hljs-number">4</span>);  <span class="hljs-comment">// 推荐写法</span>
</code></pre>
<p><strong>不想借用你可以直接给伪数组添加一个slice函数</strong>，如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr.slice = [].slice;
arr.slice(1,4);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>arr.slice = [].slice;
arr.slice(<span class="hljs-number">1</span>,<span class="hljs-number">4</span>);</code></pre>
<p>当然，'借用' 更方便，直接添加会导致伪数组对象'污染'。</p>
<p>如果可以随意改变原对象，可以 <strong>直接将其转成真正的数组对象</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[].slice.call(arr);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-attr">[]</span><span class="hljs-selector-class">.slice</span><span class="hljs-selector-class">.call</span>(<span class="hljs-selector-tag">arr</span>);
</code></pre>
<h2 id="articleHeader5">2 .2 继承</h2>
<p>继承方式多种多样,我们现在讨论的这种是其中很重要的一种实现方式，用<code>call</code>实现 js <strong>构造函数继承</strong> 。</p>
<ul><li>单继承</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function person(name){
    this.name = name
}
function man(name){
    this.age = '男';
    person.call(this,name);              // 继承 man
}
var me = new man('海洋饼干');

console.log(me.name,me.age);             // '海洋饼干' '男'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">person</span>(<span class="hljs-params">name</span>)</span>{
    <span class="hljs-keyword">this</span>.name = name
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">man</span>(<span class="hljs-params">name</span>)</span>{
    <span class="hljs-keyword">this</span>.age = <span class="hljs-string">'男'</span>;
    person.call(<span class="hljs-keyword">this</span>,name);              <span class="hljs-comment">// 继承 man</span>
}
<span class="hljs-keyword">var</span> me = <span class="hljs-keyword">new</span> man(<span class="hljs-string">'海洋饼干'</span>);

<span class="hljs-built_in">console</span>.log(me.name,me.age);             <span class="hljs-comment">// '海洋饼干' '男'</span></code></pre>
<ul><li>多继承</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function person(name){
    this.name = name
}
function man(name){
    this.age = '男';
}
function manProgrammer(name){
    this.girlfriend = null;
    person.call(this,name);  // 继承 person
    man.call(this,name);     // 继承 man
}
var me = new manProgrammer('海洋饼干');

console.log(me.name,me.age,me.girlfriend);   // '海洋饼干' '男' null" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">person</span>(<span class="hljs-params">name</span>)</span>{
    <span class="hljs-keyword">this</span>.name = name
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">man</span>(<span class="hljs-params">name</span>)</span>{
    <span class="hljs-keyword">this</span>.age = <span class="hljs-string">'男'</span>;
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">manProgrammer</span>(<span class="hljs-params">name</span>)</span>{
    <span class="hljs-keyword">this</span>.girlfriend = <span class="hljs-literal">null</span>;
    person.call(<span class="hljs-keyword">this</span>,name);  <span class="hljs-comment">// 继承 person</span>
    man.call(<span class="hljs-keyword">this</span>,name);     <span class="hljs-comment">// 继承 man</span>
}
<span class="hljs-keyword">var</span> me = <span class="hljs-keyword">new</span> manProgrammer(<span class="hljs-string">'海洋饼干'</span>);

<span class="hljs-built_in">console</span>.log(me.name,me.age,me.girlfriend);   <span class="hljs-comment">// '海洋饼干' '男' null</span></code></pre>
<h2 id="articleHeader6">2 .3 this 硬绑定 --- bind</h2>
<p><strong>将一个对象强制且永久性绑定到函数的this上</strong>，使用call,apply或者其他的绑定方式都无法改变(<strong>除了new</strong>绑定，当然，可以手动撸一个new都无法改变的硬绑定)</p>
<p>直接看例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fun ;
var obj = {
    a : 1,
    foo : function(){
        var _this = this;            //平时有没有过这种写法？ 为了防止this指向问题
                                     //将this赋值给一个变量,间接维持了this的安全性
       fun = function(){
            console.log(_this.a);
        }
    }
}
obj.foo();
fun();                 // 1

var obj1 = { a : 2}
obj.foo.call(obj1);    // 直接修改_this所绑定的值,boom了
fun();                 // 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> ;</span>
<span class="hljs-keyword">var</span> obj = {
    a : <span class="hljs-number">1</span>,
    foo : function(){
        <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;            <span class="hljs-comment">//平时有没有过这种写法？ 为了防止this指向问题</span>
                                     <span class="hljs-comment">//将this赋值给一个变量,间接维持了this的安全性</span>
       <span class="hljs-function"><span class="hljs-keyword">fun</span> = <span class="hljs-title">function</span><span class="hljs-params">()</span></span>{
            console.log(_this.a);
        }
    }
}
obj.foo();
<span class="hljs-function"><span class="hljs-title">fun</span><span class="hljs-params">()</span></span>;                 <span class="hljs-comment">// 1</span>

<span class="hljs-keyword">var</span> obj1 = { a : <span class="hljs-number">2</span>}
obj.foo.call(obj1);    <span class="hljs-comment">// 直接修改_this所绑定的值,boom了</span>
<span class="hljs-function"><span class="hljs-title">fun</span><span class="hljs-params">()</span></span>;                 <span class="hljs-comment">// 2</span></code></pre>
<p>但是<strong>这种方法感觉上是在逃避问题，直接不使用this了 ? 这真的不是什么好的解决问题的态度</strong>。下面使用我们的bind来优化一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fun ;
var obj = {
    a : 1,
    foo : function(){            // 不使用 _this， 避免无谓的变量声明
        fun = function(){
            console.log(this.a);
        }.bind(this);            // 代码很简洁,很漂亮（b格）
    }
}
var obj1 = { a : 2}
obj.foo();
fun();             // 1
fun.call(obj1);    // 1  call ,apply等绑定 无法修改
                   // 这里和上面call的位置不同是因为this所处于不同的位置" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> ;</span>
<span class="hljs-keyword">var</span> obj = {
    a : <span class="hljs-number">1</span>,
    foo : function(){            <span class="hljs-comment">// 不使用 _this， 避免无谓的变量声明</span>
        <span class="hljs-function"><span class="hljs-keyword">fun</span> = <span class="hljs-title">function</span><span class="hljs-params">()</span></span>{
            console.log(<span class="hljs-keyword">this</span>.a);
        }.bind(<span class="hljs-keyword">this</span>);            <span class="hljs-comment">// 代码很简洁,很漂亮（b格）</span>
    }
}
<span class="hljs-keyword">var</span> obj1 = { a : <span class="hljs-number">2</span>}
obj.foo();
<span class="hljs-function"><span class="hljs-title">fun</span><span class="hljs-params">()</span></span>;             <span class="hljs-comment">// 1</span>
<span class="hljs-function"><span class="hljs-keyword">fun</span>.<span class="hljs-title">call</span><span class="hljs-params">(obj1)</span></span>;    <span class="hljs-comment">// 1  call ,apply等绑定 无法修改</span>
                   <span class="hljs-comment">// 这里和上面call的位置不同是因为this所处于不同的位置</span></code></pre>
<p><strong>这样替代 <code>_this</code> 很规(zhuang)范(b)</strong>呢</p>
<p>ps：call,apply,bing属于this显示绑定，还有好几种其他的this绑定方式，<a href="http://sfau.lt/b5U8ps" rel="nofollow noreferrer" target="_blank">感兴趣的可以点这里</a>。</p>
<h2 id="articleHeader7">2 .4 取数组最大最小值</h2>
<p>Math.max和min方法，接收多个参数，比较出极值，这里用到apply的一个默认功能：<strong>展开数组</strong>，<code>传入一个数组参数就可以默认将这个数组转成一个个参数的形式赋给原函数</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var num = [6,9,-3,-5];
console.log(Math.max.apply(Math,num)); // 9  等价  console.log(Math.max(6,9,-3,-5));
console.log(Math.min.apply(Math,num)); // -5 等价  console.log(Math.min(6,9,-3,-5));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">num</span> = [<span class="hljs-number">6</span>,<span class="hljs-number">9</span>,-<span class="hljs-number">3</span>,-<span class="hljs-number">5</span>];
console.<span class="hljs-built_in">log</span>(Math.<span class="hljs-built_in">max</span>.<span class="hljs-built_in">apply</span>(Math,<span class="hljs-built_in">num</span>)); // <span class="hljs-number">9</span>  等价  console.<span class="hljs-built_in">log</span>(Math.<span class="hljs-built_in">max</span>(<span class="hljs-number">6</span>,<span class="hljs-number">9</span>,-<span class="hljs-number">3</span>,-<span class="hljs-number">5</span>));
console.<span class="hljs-built_in">log</span>(Math.<span class="hljs-built_in">min</span>.<span class="hljs-built_in">apply</span>(Math,<span class="hljs-built_in">num</span>)); // -<span class="hljs-number">5</span> 等价  console.<span class="hljs-built_in">log</span>(Math.<span class="hljs-built_in">min</span>(<span class="hljs-number">6</span>,<span class="hljs-number">9</span>,-<span class="hljs-number">3</span>,-<span class="hljs-number">5</span>));</code></pre>
<h2 id="articleHeader8">2 .5 合并数组</h2>
<p>合并数组常见有三种方式，<code>1.循环 2.Array的concat() 3. 使用apply()合并</code></p>
<p>这里是使用最简便的apply</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [1,2,3];
var b = [4,5,6];
[].push.apply(a,b);    // 借用数组的push方法 等价 a.push(4,5,6);
console.log(a);        // [1, 2, 3, 4, 5, 6]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
var b = [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>];
[].push.apply(a,b);    <span class="hljs-comment">// 借用数组的push方法 等价 a.push(4,5,6);</span>
console.log(a);        <span class="hljs-comment">// [1, 2, 3, 4, 5, 6]</span></code></pre>
<hr>
<hr>
<hr>
<p>觉得对你有帮助点个赞呗555</p>
<p><strong>大家有什么实用点的黑科技欢迎私信评论 分享，我会贴上id和你的分享 &gt;_&lt; </strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
call, apply, bind 函数能干啥？如何在日常搬砖中使用？（全）

## 原文链接
[https://segmentfault.com/a/1190000011389726](https://segmentfault.com/a/1190000011389726)

