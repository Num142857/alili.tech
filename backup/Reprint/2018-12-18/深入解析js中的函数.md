---
title: '深入解析js中的函数' 
date: 2018-12-18 2:30:11
hidden: true
slug: m3m57ixr51a
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">写在前面</h1>
<p>由于词语匮乏，本文继续沿用"深入解析xxx"这个俗套的命名，但是是真的很深入(你要信我啊)。如果本文对你有用，欢迎收藏，如果喜欢我的文章，欢迎点赞和关注专栏。<br>函数可以说是js的基础，无处不在，功能又十分强大，本文将简单介绍函数的特点并且重点介绍各种各样的用法。废话不多说，开车~<br><em>友情提示，由于本文涵盖的内容比较全面，不免篇幅稍长，中途请注意休息。</em></p>
<h1 id="articleHeader1">函数简介</h1>
<p>但是其实，函数的本质就是<strong>对象</strong>。确切一点来说，其实是第一类对象(first-class object)。关于第一类对象，wiki解释如下：</p>
<blockquote>
<p>第一类对象又称第一类公民，在编程语言中指的是一个具有以下特性的实体：</p>
<ol>
<li>能够作为参数被传递</li>
<li>能够从一个函数结果中返回</li>
<li>能够被修改和赋值给变量</li>
</ol>
</blockquote>
<p>虽然看起来高大上，但是我们只要先记住，<strong>在js里函数也是对象，可以拥有自己的属性和方法，而它和一般js对象的区别是：可以被调用，也就是可执行</strong>。</p>
<p>当然，函数还有一个明显的特点就是，提供<strong>作用域</strong>：在函数作用域内的变量都是局部变量，对外部不可见。由于js中其他代码块，比如<code>for</code>和<code>while</code>循环等并不提供作用域，所以有很多地方会利用函数来控制作用域。在后面会一一提到。</p>
<h1 id="articleHeader2">预备知识</h1>
<p>这一块在之前讲闭包的时候其实提到了一些，但是还是简单介绍下。</p>
<h2 id="articleHeader3">函数作用域</h2>
<p>在类似C语言的编程语言中，花括号<code>{}</code>表示一个作用域：在作用域内的变量对外不可见，这个称为<code>块级作用域</code>,但是在js中没有块级作用域，只有函数作用域:<strong>在函数体内声明的变量，在整个函数体内有定义</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fun(){
    for(var j =1;j<10;j++){
        
    }
    console.log(j)//10
}
console.log(j)//undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fun</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j =<span class="hljs-number">1</span>;j&lt;<span class="hljs-number">10</span>;j++){
        
    }
    <span class="hljs-built_in">console</span>.log(j)<span class="hljs-comment">//10</span>
}
<span class="hljs-built_in">console</span>.log(j)<span class="hljs-comment">//undefined</span></code></pre>
<p>这个例子中变量<code>j</code>定义在函数体中，那么在函数体内可以访问，在外部则无法访问。</p>
<h2 id="articleHeader4">作用域链</h2>
<p>作用域链，就是一个类似链表的解构，它表示<strong>当前代码有权访问的作用域的访问顺序</strong>。举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1;
function fun(){
    var a = 2
    console.log(a)
}
fun()//2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
function <span class="hljs-function"><span class="hljs-title">fun</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>
    console.log(a)
}
<span class="hljs-function"><span class="hljs-title">fun</span><span class="hljs-params">()</span></span><span class="hljs-comment">//2</span></code></pre>
<p>在这里，执行<code>fun()</code>时，作用域链上有2个作用域，第一个是<code>fun</code>，第二个是全局环境，按照顺序，首先访问内容的作用域，找到了<code>a</code>变量，那么就不继续寻找，如果这里没有<code>var a = 2</code>，那么会继续向外寻找，最终输出的就是<code>1</code>。</p>
<p>只要记住，作用域链都是<strong>从当前函数作用域向外</strong>一层层延伸的，所以内部作用域可以访问外部变量，反之则不行。</p>
<h2 id="articleHeader5">声明提升</h2>
<p>看下这个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fun(){
    console.log(a)
    var a = 1;
}
fun();//underfined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>function <span class="hljs-function"><span class="hljs-keyword">fun</span>(){
    <span class="hljs-title">console</span></span>.log(a)
    var a = <span class="hljs-number">1</span>;
}
<span class="hljs-function"><span class="hljs-keyword">fun</span>();<span class="hljs-title">/</span></span>/underfined</code></pre>
<p>是不是觉得很奇怪，这里既没有未定义报错，也没有输出1，因为这里的代码其实相当于这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fun(){
    var a;
    console.log(a)
    a = 1;
}
fun();//underfined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>function <span class="hljs-function"><span class="hljs-keyword">fun</span>(){
    <span class="hljs-title">var</span></span> a;
    console.log(a)
    a = <span class="hljs-number">1</span>;
}
<span class="hljs-function"><span class="hljs-keyword">fun</span>();<span class="hljs-title">/</span></span>/underfined</code></pre>
<p>可以看到，其实变量<code>a</code>的声明，相当于<strong>被提前到当前函数作用域的顶部</strong>，这就是所谓的<strong>声明提升</strong>，但是要注意，声明虽然提升了，赋值<code>a=1</code>并没有被提升，否则这个例子应该直接输出<code>1</code>。</p>
<p>接下来再举1个例子回顾下这一阶段的知识：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1;
var b = 4;
function fun (){
    console.log(a);
    var a = 2;
    var b = 3;
    console.log(b);
}
fun ();
console.log(b);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> b = <span class="hljs-number">4</span>;
function <span class="hljs-function"><span class="hljs-title">fun</span> <span class="hljs-params">()</span></span>{
    console.log(a);
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>;
    <span class="hljs-keyword">var</span> b = <span class="hljs-number">3</span>;
    console.log(b);
}
<span class="hljs-function"><span class="hljs-title">fun</span> <span class="hljs-params">()</span></span>;
console.log(b);</code></pre>
<p>具体结果大家可以跑跑看。</p>
<h1 id="articleHeader6">函数的创建</h1>
<p>通常来说，有2种创建函数的方式：函数表达式、函数声明。</p>
<h2 id="articleHeader7">函数表达式</h2>
<p>函数表达式通常具有如下形式:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var funA = function funName(param1,param2){
    //函数体
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> funA = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">funName</span><span class="hljs-params">(param1,param2)</span></span>{
    <span class="hljs-comment">//函数体</span>
} </code></pre>
<p>当然，更常见来说这里的<code>funName</code>是不写的，写与不写的区别是，在不同浏览器中，获得的函数对象中<code>name</code>属性的值会被处理成不行的形式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//这个例子可以在ie firefox webkit内核的浏览器分别跑一下看看结果 
var fun1 = function(){}
var fun2 = function funName(){}
console.log(fun1)
console.log(fun2)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//这个例子可以在ie firefox webkit内核的浏览器分别跑一下看看结果 </span>
<span class="hljs-keyword">var</span> fun1 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{}
<span class="hljs-keyword">var</span> fun2 = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">funName</span>(<span class="hljs-params"></span>)</span>{}
<span class="hljs-built_in">console</span>.log(fun1)
<span class="hljs-built_in">console</span>.log(fun2)</code></pre>
<p>写函数名字有个比较好用的地方是在递归的时候，可以很方便使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//阶乘函数
var fun1 = function recu(x){
    if(x<=1)
        return 1;
    else
        return x*recu(x-1)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//阶乘函数</span>
<span class="hljs-keyword">var</span> fun1 = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">recu</span><span class="hljs-params">(x)</span></span>{
    <span class="hljs-keyword">if</span>(x&lt;=<span class="hljs-number">1</span>)
        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
    <span class="hljs-keyword">else</span>
        <span class="hljs-keyword">return</span> x*recu(x<span class="hljs-number">-1</span>)
}</code></pre>
<h2 id="articleHeader8">函数声明</h2>
<p>函数声明形式一般如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function funName(){
    //函数体
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">funName</span><span class="hljs-params">()</span></span>{
    <span class="hljs-comment">//函数体</span>
}</code></pre>
<p>这个和函数表达式的区别就是，使用函数声明的方式在js里会有"提升"，而使用表达式方式写没有提升所以函数表达式定义的函数无法提前使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fun1();//fun1
fun2();//报错
function fun1 (){
    console.log(&quot;fun1&quot;)
}
var fun2 = function(){
     console.log(&quot;fun2&quot;)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>fun1();<span class="hljs-comment">//fun1</span>
fun2();<span class="hljs-comment">//报错</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fun1</span> (<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"fun1"</span>)
}
<span class="hljs-keyword">var</span> fun2 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
     <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"fun2"</span>)
}</code></pre>
<p>因为前面说过，<strong>赋值部分不会提升</strong>，而函数表达式的写法本质上也是一个变量声明和赋值,形如<code>var x = function...</code>，<code>x</code>的声明被提升，但是右边的赋值部分要等待代码执行到这句的时候才生效。</p>
<p>举个更容易理解的例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(fun2)//underfined
fun2();//报错
var fun2 = function(){
     console.log(&quot;fun2&quot;)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">console</span>.log(fun2)<span class="hljs-comment">//underfined</span>
fun2();<span class="hljs-comment">//报错</span>
<span class="hljs-keyword">var</span> fun2 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
     <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"fun2"</span>)
}</code></pre>
<p>同理，变量<code>fun2</code>已声明，但未赋值。所以这里<code>console.log</code>的时候不报错，运行的时候才报错。看不懂请再回顾下预备知识的<code>声明提升</code>部分。</p>
<h1 id="articleHeader9">函数参数</h1>
<p>函数的参数一般分成形参和实参，<strong>形参是函数定义时预期传入的参数，实参是函数调用时实际传入参数。</strong></p>
<h2 id="articleHeader10">参数数量不对等情况和<code>arguments</code>
</h2>
<p><strong>Javascript没有在函数调用时对实参做任何检查。</strong> 所以可能出现以下情况：</p>
<ul>
<li>
<p><strong>当传入的实参比形参个数要少的时候，剩下的形参会被自动设置为<code>underfined</code></strong>，所以在写函数的时候，我们经常要注意是否<strong>要给参数一些默认值</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fun(a){
    var a = a || &quot;&quot; //如果传入a就使用a,否则a设置为空字符串
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fun</span>(<span class="hljs-params">a</span>)</span>{
    <span class="hljs-keyword">var</span> a = a || <span class="hljs-string">""</span> <span class="hljs-comment">//如果传入a就使用a,否则a设置为空字符串</span>
}</code></pre>
<p>如果我们的函数使用了可选参数，那么可选参数的位置必须放在最后，否则，使用者调用时候，就要显式传入<code>underfind</code>，比如<code>fun(underfined,a)</code>表示第一个参数不传入。</p>
</li>
<li>
<p><strong>当传入的实参比形参个数要多的时候，我们可以通过标识符<code>arguments</code>对象来获得参数</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function fun(a){ if(arguments.length>1)console.log(arguments[1])};
    var a=1,b=2;
    fun(a,b);//2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fun</span>(<span class="hljs-params">a</span>)</span>{ <span class="hljs-keyword">if</span>(<span class="hljs-built_in">arguments</span>.length&gt;<span class="hljs-number">1</span>)<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">arguments</span>[<span class="hljs-number">1</span>])};
    <span class="hljs-keyword">var</span> a=<span class="hljs-number">1</span>,b=<span class="hljs-number">2</span>;
    fun(a,b);<span class="hljs-comment">//2</span></code></pre>
<p>这个例子中，通过<code>arguments</code>输出了实参<code>b</code>的值。值得一提的是，<strong><code>arguments</code>并不是数组，而是一个对象，只是恰好使用数字为索引</strong></p>
</li>
</ul>
<h2 id="articleHeader11">
<code>callee</code> 和 <code>caller</code>
</h2>
<p>es5的非严格模式下，我们可以使用<code>callee</code> 和 <code>caller</code>这两个属性，</p>
<ul>
<li>
<code>callee</code> 表示当前正在执行的函数，通常用法是在匿名函数中写递归调用</li>
<li>
<code>caller</code> 表示调用当前正在执行函数的函数，可以用来访问调用栈，这个属性是非标准的，但是大部分的浏览器都实现。更详细的用法可以查看MDN。</li>
</ul>
<h1 id="articleHeader12">函数的模式</h1>
<p>模式其实就是函数的各种应用方式，也是本文的重点</p>
<h2 id="articleHeader13">api模式</h2>
<p><code>api</code>模式主要是给函数提供更好的接口。</p>
<h3 id="articleHeader14">回调模式</h3>
<p>最前面已经提到，函数是对象，并且可以被作为参数传递给其他的函数。</p>
<p>当我们把函数A传递给函数B，并且让B能够在某一时刻执行A，这种情况我们称<code>函数A</code>是回调函数(<code>callback function</code>)，简称回调。</p>
<p>举个例子，假设这样一个背景：假设现在我们需要处理一批dom节点，处理大概分2步，第一步，筛选出符合要求的一部分节点，第二步，对这部分数据做一些css样式修改。那我们一般会先想到这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//筛选函数
function filterNodes(nodes){
    var  i = 0;
    var result = [];
    for(i = 0; i<nodes.length;i++){
        //根据条件筛选
        if(...){
            result.push()
        }
    }
    return result
}

//操作函数
function operte(nodes){
    var  i = 0;
    for(i = 0; i<node.length;i++){
        // 样式操作
        node[i].style...
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//筛选函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">filterNodes</span><span class="hljs-params">(nodes)</span></span>{
    <span class="hljs-keyword">var</span>  i = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> result = [];
    <span class="hljs-keyword">for</span>(i = <span class="hljs-number">0</span>; i&lt;nodes.length;i++){
        <span class="hljs-comment">//根据条件筛选</span>
        <span class="hljs-keyword">if</span>(...){
            result.push()
        }
    }
    <span class="hljs-keyword">return</span> result
}

<span class="hljs-comment">//操作函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">operte</span><span class="hljs-params">(nodes)</span></span>{
    <span class="hljs-keyword">var</span>  i = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">for</span>(i = <span class="hljs-number">0</span>; i&lt;node.length;i++){
        <span class="hljs-comment">// 样式操作</span>
        node[i].style...
    }
}
</code></pre>
<p>按照上面定义的2个函数，先用<code>filterNodes</code>筛选符合要求额节点，然后将结果作为<code>operate</code>函数的参数，这样逻辑上是完全没问题的，只是有一个地方：<strong>其实我们已经2次遍历了符合要求的节点：第一次是在筛选时，第二次是在样式操作时。这里有办法优化吗？</strong>，如果我们直接把样式操作直接写到<code>result.push()</code>后面，是可以减少一次遍历的，但是这样<code>filterNodes</code>函数就不是一个纯粹的筛选节点的数了。所以我们可以使用回调模式来解决，只需稍微修改下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//筛选函数
function filterNodes(nodes,callback){
    var  i = 0;
    var result = [];
    for(i = 0; i<nodes.length;i++){
        //根据条件筛选
        if(...){
            result.push()
            
            //在这里判断是否传递了样式操作函数，如果有，就执行样式操作
            if(callback){
                callback(nodes[i])
            }
        }
    }
    return result
}

function operte(node){
    //这里就不必再次循环了
    // 样式操作
    node[i].style...
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-comment">//筛选函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">filterNodes</span></span>(nodes,<span class="hljs-keyword">callback</span>){
    <span class="hljs-keyword">var</span>  i = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> result = [];
    <span class="hljs-keyword">for</span>(i = <span class="hljs-number">0</span>; i&lt;nodes.length;i++){
        <span class="hljs-comment">//根据条件筛选</span>
        <span class="hljs-keyword">if</span>(...){
            result.push()
            
            <span class="hljs-comment">//在这里判断是否传递了样式操作函数，如果有，就执行样式操作</span>
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">callback</span>){
                <span class="hljs-keyword">callback</span>(nodes[i])
            }
        }
    }
    <span class="hljs-keyword">return</span> result
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">operte</span></span>(node){
    <span class="hljs-comment">//这里就不必再次循环了</span>
    <span class="hljs-comment">// 样式操作</span>
    node[i].style...
}
</code></pre>
<p>这样改造之后，2个函数依然各自拥有自己的逻辑，而且我们可以通过调用<code>filterNodes</code>时，传递不同参数的办法，来控制我们想要的功能。</p>
<p>回调函数还有很多的常见用途：</p>
<ol>
<li>
<p>异步事件监听<br>最常见的例子莫过于我们为文档添加监听事件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" document.addEventListener(&quot;click&quot;,[回调函数],false)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"> <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">"click"</span>,[回调函数],<span class="hljs-literal">false</span>)</code></pre>
<p>有了回调模式以后，程序可以以异步的模式运行：只有用户触发了某些交互行为，才会调用到我们指定的函数。</p>
</li>
<li>
<p>超时方法 <code>setTimeout()</code>和 <code>setTimeInterval()</code><br>这两个函数也一样接受回调函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout([回调函数],200)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">setTimeout</span><span class="hljs-params">([回调函数],<span class="hljs-number">200</span>)</span></span></code></pre>
</li>
<li>软件库设计<br>设计一个库的时候，很重要的就是设计通用性和复用性的代码，因为无法提前预测到需要的每一个功能，而且用户也不会总是需要用到所有的功能，利用回调模式，很容易设计出<strong>具有核心功能有同时提供自选项的函数</strong>(比如前面提到的节点筛选函数，核心功能是筛选，又能根据需要插入后续操作)。</li>
</ol>
<h3 id="articleHeader15">返回函数</h3>
<p>刚刚在回调函数部分，说的是函数作为另一个函数的参数传递，接下来说说函数作为另一边函数的结果返回。看下面一个计时器例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var counter = function(){
    var count = 0;
    return function(){
        return count++
    }
}
var f = counter();
f();//1
f();//2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> counter = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">var</span> count = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        <span class="hljs-keyword">return</span> count++
    }
}
<span class="hljs-keyword">var</span> f = counter();
f();<span class="hljs-comment">//1</span>
f();<span class="hljs-comment">//2</span></code></pre>
<p>其实这里就是一个闭包的实例，关于闭包，在我的另一篇文章里有更详细的描述<a href="https://segmentfault.com/a/1190000007376061">点击前往</a></p>
<h3 id="articleHeader16">配置对象</h3>
<p>配置对象模式其实就是让用对象作为函数的参数。<br>这种模式经常用在建立一个库，或者写的函数要提供给外部调用时。因为它能提供很简洁的接口。假设这样一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function operate(para1,para2){}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">operate</span><span class="hljs-params">(para1,para2)</span></span>{}</code></pre>
<p>如果我们正在写一个库函数，一开始我们预料到的参数只会有<code>para1</code>,<code>para2</code>，但是随着不断拓展，后来参数变多了，而且出现了一些可选参数<code>para3,para4</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function operate(para1,para2,para3,para4...)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">operate</span><span class="hljs-params">(para1,para2,para3,para4...)</span></span></code></pre>
<p>此时我们需要很小心的把可选参数放在后面，使用者在调用的时候还必须很小心的对上位置，比如说：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="operate(p1,p2,null,p4)//这里的null不可省略" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">operate</span><span class="hljs-params">(p1,p2,null,p4)</span></span><span class="hljs-comment">//这里的null不可省略</span></code></pre>
<p>此时，参数数量太多，使用起来需要很小心记住参数顺序，很不方便。所以就要采用配置对象的写法，即把参数写成一个对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function operate(config){}
var conf = {
    para1:...,
    para2:...,
    para4:..., 
}
 operate(con)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">operate</span><span class="hljs-params">(config)</span></span>{}
<span class="hljs-keyword">var</span> conf = {
    para1:...,
    para2:...,
    para4:..., 
}
 operate(con)</code></pre>
<p>这样的写法</p>
<ul>
<li>优点是：使用者不需要记住参数顺序，代码也显得更简洁，</li>
<li>缺点是：使用时要严格记住参数的名称，并且属性名称无法被压缩</li>
</ul>
<p>通常在操作<code>dom</code>对象的<code>css</code>样式时候会用这样的写法，因为<code>css</code>样式有很多，但是名称很容易记住,比如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var style ={
    color:&quot;...&quot;
    border:&quot;...&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">style</span> ={
    <span class="hljs-built_in">color</span>:<span class="hljs-string">"..."</span>
    <span class="hljs-built_in">border</span>:<span class="hljs-string">"..."</span>
}</code></pre>
<h3 id="articleHeader17">柯里化</h3>
<p><em>start18/08/08编辑</em></p>
<hr>
<p>柯里化内容已添加，<a href="https://segmentfault.com/a/1190000015929416" target="_blank">传送门</a></p>
<hr>
<p><em>end18/08/08编辑</em></p>
<p>柯里化的内容比较长，难度也稍大，后续另开一篇来写吧~~。</p>
<h2 id="articleHeader18">初始化模式</h2>
<p>初始化模式的主要作用是不污染全局命名空间，使用临时变量来完成初始化任务，使任务更加简洁</p>
<h3 id="articleHeader19">即时函数</h3>
<blockquote>即时函数模式（immeddiate Function pattern），是一种支持在定义函数后立即执行该函数的语法。也叫作自调用和自执行函数</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(){
    //函数内容
}())
//也可以这样写
(function(){
    //函数内容
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-comment">//函数内容</span>
}())
<span class="hljs-comment">//也可以这样写</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-comment">//函数内容</span>
})()</code></pre>
<p>这里给出了即时函数的两种写法，它的作用是可以给初始化的代码提供一个存放的空间：比如在页面初始化时，<strong>需要一些临时变量来完成一次初始化，但是这些工作只需要执行一次，执行之后就不再需要这些临时变量</strong>，那么我们就不必浪费全局变量来创建这些变量，此时使用即时函数，可以把所有代码打包起来，并且不会泄露到全局作用域。比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(){
    var initName = &quot;&quot;
    alert(initName)
}());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>(<span class="hljs-name">function</span>(){
    var initName = <span class="hljs-string">""</span>
    alert(<span class="hljs-name">initName</span>)
}())<span class="hljs-comment">;</span></code></pre>
<p>当然，即时函数也可以传递参数，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(initName){
    alert(initName)
}(&quot;hello&quot;));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>(<span class="hljs-name">function</span>(<span class="hljs-name">initName</span>){
    alert(<span class="hljs-name">initName</span>)
}(<span class="hljs-string">"hello"</span>))<span class="hljs-comment">;</span></code></pre>
<p>同样也可以有返回值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var result = (function(){
  return 1
}());
console.log(result)//1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">result</span> = (<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span><span class="hljs-comment">{
  return 1
}</span><span class="hljs-params">()</span>);</span>
console.log(<span class="hljs-keyword">result</span>)<span class="hljs-comment">//1</span></code></pre>
<p>即时函数经常用在写一些自包含模块，这样的好处是可以确保页面在有无该模块的情况下都能良好运行，很方便的可以分离出来，用于测试或者实现，或者根据需要实现“禁用”功能。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//moudle1.js
(function(){
    //模块代码
}//)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//moudle1.js</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-comment">//模块代码</span>
}<span class="hljs-comment">//)</span></code></pre>
<p>按照这一的形式写模块。可以根据需要加载模块。</p>
<h3 id="articleHeader20">即时对象初始化</h3>
<p>这个模式和即使函数模式很相似，区别在于我们的函数写在一个对象的方法上。通常我们在一个对象上写上<code>init</code>方法，并且在创建对象之后立即执行该方法。如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="({
    //初始化的属性和配置
    name:'Mike',
    age:'12',
    //其他方法
    ...
    //初始化
    init:function(){
        ...
    }
}).init();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>({
    <span class="hljs-comment">//初始化的属性和配置</span>
    name:<span class="hljs-string">'Mike'</span>,
    age:<span class="hljs-string">'12'</span>,
    <span class="hljs-comment">//其他方法</span>
    ...
    <span class="hljs-comment">//初始化</span>
    init:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        ...
    }
}).init();</code></pre>
<p>这个语法其实相当于在创建一个普通的对象并且，然后在创建之后立刻调用<code>init</code>方法。这种做法和即时函数的目的是一致的：<strong>在执行一次性初始化任务时保护全局命名空间</strong>。但是可以写出更加复杂的结构，比如私有方法等，而在即时函数里面只能把所有的方法都写成函数。</p>
<h3 id="articleHeader21">初始化时分支</h3>
<p>初始化时分支经常用在某个生命周期中做一次性测试的情境中。所谓的一次性测试就是：在本次生命周期中，某些属性不可能改变，比如浏览器内核等。典型的例子是<strong>浏览器嗅探</strong>.</p>
<p>看过<code>javacscript</code>高级程序设计的话，对这个例子一定很眼熟：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var utils = {
        addListener:function(el,type,fn){
            if(typeof window.addEvenrtListener === 'function'){
                el.addEventerListener(type,fn,false);
            }
            else if(typeof window.attachEvent === 'function'){
                //ie
                el.attachEvent('on' + type,fn)
            }
            else{
                //其他浏览器
                 el.['on'+ type] = fn
            }
        }
        ...//删除方法类似
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>    <span class="hljs-keyword">var</span> utils = {
        addListener:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el,<span class="hljs-keyword">type</span>,fn</span>)</span>{
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span>.addEvenrtListener === <span class="hljs-string">'function'</span>){
                el.addEventerListener(<span class="hljs-keyword">type</span>,fn,<span class="hljs-literal">false</span>);
            }
            <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span>.attachEvent === <span class="hljs-string">'function'</span>){
                <span class="hljs-comment">//ie</span>
                el.attachEvent(<span class="hljs-string">'on'</span> + <span class="hljs-keyword">type</span>,fn)
            }
            <span class="hljs-keyword">else</span>{
                <span class="hljs-comment">//其他浏览器</span>
                 el.[<span class="hljs-string">'on'</span>+ <span class="hljs-keyword">type</span>] = fn
            }
        }
        ...<span class="hljs-comment">//删除方法类似</span>
    }</code></pre>
<p>这个例子是为了写一个能够支持跨浏览器处理事件的方法，但是有个缺点：每次在处理事件时都要检测一次浏览器的类型。我们知道，<strong>其实在一次页面的生命周期里，其实只需要检测一次就够了</strong>，所以可以利用初始化分支来这样改写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var utils = {
    addListener:null
}
if(typeof window.addEvenrtListener === 'function'){
    utils.addListener = function(el,type,fn){
        el.addEventerListener(type,fn,false);   
    }
}
else if(typeof window.attachEvent === 'function'){
    //ie
    utils.addListener = function(el,type,fn){
        el.attachEvent('on' + type,fn)
    }
}
else{
    //其他浏览器
     utils.addListener = function(el,type,fn){
        el.['on'+ type] = fn
     }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> utils = {
    <span class="hljs-attr">addListener</span>:<span class="hljs-literal">null</span>
}
<span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span>.addEvenrtListener === <span class="hljs-string">'function'</span>){
    utils.addListener = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el,type,fn</span>)</span>{
        el.addEventerListener(type,fn,<span class="hljs-literal">false</span>);   
    }
}
<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span>.attachEvent === <span class="hljs-string">'function'</span>){
    <span class="hljs-comment">//ie</span>
    utils.addListener = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el,type,fn</span>)</span>{
        el.attachEvent(<span class="hljs-string">'on'</span> + type,fn)
    }
}
<span class="hljs-keyword">else</span>{
    <span class="hljs-comment">//其他浏览器</span>
     utils.addListener = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el,type,fn</span>)</span>{
        el.[<span class="hljs-string">'on'</span>+ type] = fn
     }
}</code></pre>
<p>这样的话就可以在加载时完成一次嗅探。</p>
<h2 id="articleHeader22">性能模式</h2>
<p>性能模式，主要是在某些情况下加快代码的运行。</p>
<h3 id="articleHeader23">备忘模式</h3>
<p><strong>备忘模式的核心是使用函数属性，缓存能计算结果。以便后续调用时可以不必重新计算。</strong><br>这么做的基础主要是之前提到过的，函数本质还是对象（这句话已经重复n次了），既然是对象自然可以拥有属性和方法，例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fun = function(key){
    if(!fun.cache[key]){
        //不存在对应缓存，那么计算
        var result = {}
        ...//计算过程
        fun.cache[key] = result
    }
    return fun.cache[key] 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> = <span class="hljs-title">function</span><span class="hljs-params">(key)</span></span>{
    <span class="hljs-keyword">if</span>(!<span class="hljs-function"><span class="hljs-keyword">fun</span>.cache[key]){</span>
        <span class="hljs-comment">//不存在对应缓存，那么计算</span>
        <span class="hljs-keyword">var</span> result = {}
        ...<span class="hljs-comment">//计算过程</span>
        <span class="hljs-function"><span class="hljs-keyword">fun</span>.cache[key] = result</span>
    }
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">fun</span>.cache[key] </span>
}</code></pre>
<p>这里举了一个比较简单的例子，在获取对应数据的时候，先判断有无缓存，有的话直接获取；没有的话计算一次并缓存到对应位置。之后便无需重复计算。</p>
<p>当然，这里的<code>key</code>我们假设是基本类型的值，如果是复杂类型的值，需要先序列化。<br>另外，在函数内的<code>fun</code>可以通过前面提到的<code>arguments.callee</code>来代替，只要不在es5的严格模式下就行。</p>
<h3 id="articleHeader24">自定义模式</h3>
<p>自定义函数的原理很简单：<strong>首先创建一个函数并保存到一个变量<code>f</code>。然后在创建一个新函数，也保存在这个变量<code>f</code>，那么<code>f</code>最终指向的应该是新的函数。那么如果我们让这个过程发生在旧的函数内部，那么就实现了惰性函数</strong>。话不多说，看例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fun = function(){
  console.log(&quot;在这里执行一些初始化工作&quot;)
  fun = function(){
       console.log(&quot;在这里执行正常工作时需要执行的工作&quot;)
  }
}
fun();//在这里执行一些初始化工作
fun();//在这里执行正常工作时需要执行的工作
fun();//在这里执行正常工作时需要执行的工作" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> = <span class="hljs-title">function</span><span class="hljs-params">()</span></span>{
  console.log(<span class="hljs-string">"在这里执行一些初始化工作"</span>)
  <span class="hljs-function"><span class="hljs-keyword">fun</span> = <span class="hljs-title">function</span><span class="hljs-params">()</span></span>{
       console.log(<span class="hljs-string">"在这里执行正常工作时需要执行的工作"</span>)
  }
}
<span class="hljs-function"><span class="hljs-title">fun</span><span class="hljs-params">()</span></span>;<span class="hljs-comment">//在这里执行一些初始化工作</span>
<span class="hljs-function"><span class="hljs-title">fun</span><span class="hljs-params">()</span></span>;<span class="hljs-comment">//在这里执行正常工作时需要执行的工作</span>
<span class="hljs-function"><span class="hljs-title">fun</span><span class="hljs-params">()</span></span>;<span class="hljs-comment">//在这里执行正常工作时需要执行的工作</span></code></pre>
<p>在这里我们执行了一次初始化任务以后，函数就变成了正常的函数，之后的执行就可以减少工作。</p>
<h1 id="articleHeader25">总结</h1>
<p>这是2018年写的第一篇长文（其实一共就写了2篇，哈哈哈）希望今年自己可以好好努力，把“深入”系列贯彻到底。也希望大家都有所进步。<br>然后依然是每次都一样的结尾，如果内容有错误的地方欢迎指出；如果对你有帮助，欢迎点赞和收藏，转载请征得同意后著明出处，如果有问题也欢迎私信交流，主页添加了邮箱地址~溜了</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入解析js中的函数

## 原文链接
[https://segmentfault.com/a/1190000012802855](https://segmentfault.com/a/1190000012802855)

