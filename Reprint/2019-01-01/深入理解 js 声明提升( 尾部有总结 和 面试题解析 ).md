---
title: '深入理解 js 声明提升( 尾部有总结 和 面试题解析 )' 
date: 2019-01-01 2:30:07
hidden: true
slug: 4jc207ky6iq
categories: [reprint]
---

{{< raw >}}

                    
<p>javaScript<strong>自上而下执行</strong>的顺序受到很多新手和部分老手的共识，但是这其实并不完全正确，这涉及到js的编译过程，这方面我们稍后会聊到，先考虑下面代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onload = function(){
    xxx.onclick = fn;
};
function fn() {...}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>window.onload = function(){
    xxx.onclick = fn;
};
function fn() <span class="hljs-meta">{...}</span>
</code></pre>
<p>在你的代码中是否存在过类似这种写法，如果完全的自上而下成立，那么这么写应该存在错误，你可能会说，onload函数在页面加载完毕后才执行，js先加载了下面的代码所以不会有问题。</p>
<p>然而其实onload也只是函数，只是函数触发的时间和一般的函数不同，本质上和普通函数没有区别，编译器依然会加载并该报错依然会报错，这个问题的本质是 “ 函数的提升 ” 。</p>
<p>要理解函数的“提升”行为，让我们先解析什么是js的“提升”。</p>
<h2 id="articleHeader0"><strong> 1. 提升</strong></h2>
<p>js的代码在生成前，会先对代码进行编译，<em>编译的一部分工作就是找到所有的声明</em>，然后建立作用域将其关联起来，因此，在 <strong><em>当前作用域内</em></strong> <strong>包括变量和函数在内的所有声明都会在任何代码被执行前首先被处理</strong>。</p>
<p>注意这里是“声明”会被提前处理，赋值并没有， <em>定义声明是在编译阶段进行的，而赋值是在执行阶段进行的</em> 。也就是说 <strong>声明提升了，赋值还留着原地</strong>，等待执行。</p>
<h2 id="articleHeader1"><strong> 2. 变量提升</strong></h2>
<p>考虑下面代码，猜想输出结果:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" console.log(a);
 var a = 2;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code> console.log(a)<span class="hljs-comment">;</span>
 var a = <span class="hljs-number">2</span><span class="hljs-comment">;</span></code></pre>
<p>等价于</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var a ;         // a的默认值undefined
 console.log(a); // undefined
 a = 2;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-keyword">var</span> a ;         <span class="hljs-comment">// a的默认值undefined</span>
 <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// undefined</span>
 a = <span class="hljs-number">2</span>;</code></pre>
<p>这里就用到了我们上面的结论 <strong>声明提升了，赋值还留着原地</strong>。</p>
<h2 id="articleHeader2"><strong> 2.1. 函数表达式</strong></h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" a();     //typeError a不是函数
 var a = function(){...};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code> a();     //typeError a不是函数
 <span class="hljs-keyword">var</span> a = function()<span class="hljs-meta">{...}</span>;</code></pre>
<p><strong>函数表达式的提升 === 变量提升</strong> (区别就是赋值变量的类型) ，但是名字比较迷糊人，容易和我们马上要说的函数提升混淆。</p>
<p>一个简单的方法判断是函数表达式还是函数 : <strong>function关键字如果是整个声明的第一个词，那么就是函数，否则就是函数表达式</strong>，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(a); // ReferenceError  a is not defined
+function a(){ console.log(1); } //function不是第一个词" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// ReferenceError  a is not defined</span>
+<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>); } <span class="hljs-comment">//function不是第一个词</span></code></pre>
<h2 id="articleHeader3"><strong> 3. 函数提升</strong></h2>
<p>函数提升和变量提升都会被提升，但是有一个比较重要的细节，<strong>函数提升的优先级最高，将首先被提升</strong>。</p>
<p>考虑如下代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="foo();
function foo(){ console.log(1); }
var foo = function(){ console.log(2); }
foo();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>foo();
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>); }
<span class="hljs-keyword">var</span> foo = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>); }
foo();</code></pre>
<p>等价于</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo ;  //重复的声明将被忽略
function foo(){ console.log(1); }

foo(); //1

foo = function(){ console.log(2); }

foo(); //2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">var</span> foo ;  <span class="hljs-comment">//重复的声明将被忽略</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">()</span><span class="hljs-comment">{ console.log(1); }</span>

<span class="hljs-title">foo</span><span class="hljs-params">()</span>;</span> <span class="hljs-comment">//1</span>

foo = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span><span class="hljs-comment">{ console.log(2); }</span>

<span class="hljs-title">foo</span><span class="hljs-params">()</span>;</span> <span class="hljs-comment">//2</span></code></pre>
<h2 id="articleHeader4"><strong>4.总结</strong></h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 无论声明出现在作用域的什么位置，都会被移动到各自作用域的顶部，这个过程被称为提升。

2. 声明被提升，而包括函数表达式的赋值在内的赋值操作并不会提升，而是留在原地等待执行。

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code><span class="hljs-bullet">1. </span>无论声明出现在作用域的什么位置，都会被移动到各自作用域的顶部，这个过程被称为提升。

<span class="hljs-bullet">2. </span>声明被提升，而包括函数表达式的赋值在内的赋值操作并不会提升，而是留在原地等待执行。

</code></pre>
<h2 id="articleHeader5"><strong>5.面试题解析</strong></h2>
<p>( 题尾答案+详细解析 )</p>
<p>选择了网上三题‘较’难，迷惑的人较多的面试题：</p>
<p><strong>1.</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(foo);     // ?
console.log(bar);     // ?

var foo = function(){...}; 
function bar(){...} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>console.log(foo);     // ?
console.log(bar);     // ?

<span class="hljs-keyword">var</span> foo = function()<span class="hljs-meta">{...}</span>; 
function bar()<span class="hljs-meta">{...}</span> </code></pre>
<hr>
<p>===============================================================<br>==============================解析=============================</p>
<p>答案 ： undefined ，function bar(){...}</p>
<p>详解：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo ;
function bar(){...} 

console.log(foo);    // undefined 
console.log(bar);    // function bar(){...}

foo = function(){...}; " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code><span class="hljs-keyword">var</span> foo ;
function bar()<span class="hljs-meta">{...}</span> 

console.log(foo);    // undefined 
console.log(bar);    // function bar()<span class="hljs-meta">{...}</span>

foo = function()<span class="hljs-meta">{...}</span>; </code></pre>
<p>上面的代码就很容易理解了，本题主要考的是函数和函数表达式的区别。<br>变量声明和函数先提升到顶部，赋值被留到原地，foo默认undefined。bar输出函数自己。</p>
<p>2.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(){
    a = 5;
    console.log(window.a);  //  ?
    console.log(a);         //  ?
    var a = 10;
    console.log(a);         //  ?
}
foo();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{
    a = <span class="hljs-number">5</span>;
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">window</span>.a);  <span class="hljs-comment">//  ?</span>
    <span class="hljs-built_in">console</span>.log(a);         <span class="hljs-comment">//  ?</span>
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">10</span>;
    <span class="hljs-built_in">console</span>.log(a);         <span class="hljs-comment">//  ?</span>
}
foo();</code></pre>
<hr>
<p>===============================================================<br>==============================解析=============================</p>
<p>答案 ：undefined ，5 ，10 </p>
<p>详解： </p>
<p>这里涉及到全局污染问题，即不使用 <code>var</code> 或 其他声明关键字 去声明时，在本作用域找不到声明时，默认向上级找，直到最顶层绑定到全局window上（严格模式报 not defined ）。例如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(){
    a = 1;
    console.log(window.a);    // 1 变量a污染到了全局上
}
foo();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">()</span><span class="hljs-comment">{
    a = 1;
    console.log(window.a);    // 1 变量a污染到了全局上
}</span>
<span class="hljs-title">foo</span><span class="hljs-params">()</span>;</span></code></pre>
<p>下面是本题的解析，考点就是提升和全局污染</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(){
    var a ;                   // 因为下面有声明a变量,a的声明提前
    a = 5;                    //因为在自己的作用域内有a的声明存在,a并不会污染到全局,
                              //而是绑定到本作用域的a上，这也是比较忽悠人的地方
    console.log(window.a);    // undefined 
                              //a = 5 没有污染全局，所以window.a不存在,故输出undefined
    console.log(a);           // 5 ,a 的声明提升，变量 a = 10 没有提升，a 现在还是 5
    a = 10;
    console.log(a);           // 10
}
foo();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> a ;                   <span class="hljs-comment">// 因为下面有声明a变量,a的声明提前</span>
    a = <span class="hljs-number">5</span>;                    <span class="hljs-comment">//因为在自己的作用域内有a的声明存在,a并不会污染到全局,</span>
                              <span class="hljs-comment">//而是绑定到本作用域的a上，这也是比较忽悠人的地方</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">window</span>.a);    <span class="hljs-comment">// undefined </span>
                              <span class="hljs-comment">//a = 5 没有污染全局，所以window.a不存在,故输出undefined</span>
    <span class="hljs-built_in">console</span>.log(a);           <span class="hljs-comment">// 5 ,a 的声明提升，变量 a = 10 没有提升，a 现在还是 5</span>
    a = <span class="hljs-number">10</span>;
    <span class="hljs-built_in">console</span>.log(a);           <span class="hljs-comment">// 10</span>
}
foo();</code></pre>
<p>3.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
   var a = 1;        
   function b() {   
      a = 10;
      return '';
      function a() {...}
    }
    b();
    console.log(a);         // ?
}
foo();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
   <span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;        
   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">b</span>(<span class="hljs-params"></span>) </span>{   
      a = <span class="hljs-number">10</span>;
      <span class="hljs-keyword">return</span> <span class="hljs-string">''</span>;
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>) </span>{...}
    }
    b();
    <span class="hljs-built_in">console</span>.log(a);         <span class="hljs-comment">// ?</span>
}
foo();</code></pre>
<hr>
<p>===============================================================<br>==============================解析=============================</p>
<p>答案 ：1 </p>
<p>详解 ： 考点 1.污染 2.提升 3.作用域</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
    var a ;                    // a 和 b 一起提升到作用域顶部
    
    function b() {
      function a() {...}      //b里的函数a也提升到b的顶部
      a = 10;                 //因为上面有变量a，所以a也不会污染到上一层，而是对函数a进行再次赋值
                              //如果函数执行，函数里的a的值是 10，且没有污染
      return '';
    }
    
    a = 1;                    //对本作用域的a赋值
    
    b();                      //函数执行,b作用域内的a被赋值为10
    console.log(a);           // 1
                              // 这个有两点要搞清楚 :
                              // 1. b的a没有污染到这个作用域
                              // 2. 就近原则，本函数的log(a)找离自己最近的a变量，
                              //如果log在函数b内，那么输出 离自己最近的 10
}
foo();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> a ;                    <span class="hljs-comment">// a 和 b 一起提升到作用域顶部</span>
    
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">b</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>) </span>{...}      <span class="hljs-comment">//b里的函数a也提升到b的顶部</span>
      a = <span class="hljs-number">10</span>;                 <span class="hljs-comment">//因为上面有变量a，所以a也不会污染到上一层，而是对函数a进行再次赋值</span>
                              <span class="hljs-comment">//如果函数执行，函数里的a的值是 10，且没有污染</span>
      <span class="hljs-keyword">return</span> <span class="hljs-string">''</span>;
    }
    
    a = <span class="hljs-number">1</span>;                    <span class="hljs-comment">//对本作用域的a赋值</span>
    
    b();                      <span class="hljs-comment">//函数执行,b作用域内的a被赋值为10</span>
    <span class="hljs-built_in">console</span>.log(a);           <span class="hljs-comment">// 1</span>
                              <span class="hljs-comment">// 这个有两点要搞清楚 :</span>
                              <span class="hljs-comment">// 1. b的a没有污染到这个作用域</span>
                              <span class="hljs-comment">// 2. 就近原则，本函数的log(a)找离自己最近的a变量，</span>
                              <span class="hljs-comment">//如果log在函数b内，那么输出 离自己最近的 10</span>
}
foo();
</code></pre>
<hr>
<hr>
<hr>
<p>参考书籍：你不知道的JavaScript&lt;上卷&gt; ＫＹＬＥ　ＳＩＭＰＳＯＮ　著　（推荐）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入理解 js 声明提升( 尾部有总结 和 面试题解析 )

## 原文链接
[https://segmentfault.com/a/1190000011126068](https://segmentfault.com/a/1190000011126068)

