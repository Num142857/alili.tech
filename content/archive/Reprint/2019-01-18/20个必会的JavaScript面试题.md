---
title: '20个必会的JavaScript面试题' 
date: 2019-01-18 2:30:34
hidden: true
slug: iyq6zflme4g
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">问题1:JavaScript 中 <code>undefined</code> 和 <code>not defined</code> 的区别</h2>
<p>JavaScript 未声明变量直接使用会抛出异常：<code>var name is not defined</code>，如果没有处理异常，代码就停止运行了。<br>但是，使用<code>typeof undeclared_variable</code>并不会产生异常，会直接返回 <code>undefined</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x; // 声明 x
console.log(x); //output: undefined " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> x; <span class="hljs-comment">// 声明 x</span>
<span class="hljs-built_in">console</span>.log(x); <span class="hljs-comment">//output: undefined </span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(typeof y); //output: undefined " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> y); <span class="hljs-comment">//output: undefined </span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(z);  // 抛出异常: ReferenceError: z is not defined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(z);  <span class="hljs-comment">// 抛出异常: ReferenceError: z is not defined</span></code></pre>
<h2 id="articleHeader1">问题2:下面的代码输出什么？</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var y = 1;
if (function f(){}) {
    y += typeof f;
}
console.log(y);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> y = <span class="hljs-number">1</span>;
<span class="hljs-keyword">if</span> (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>)</span>{}) {
    y += <span class="hljs-keyword">typeof</span> f;
}
<span class="hljs-built_in">console</span>.log(y);</code></pre>
<p>正确的答案应该是 <code>1undefined</code>。</p>
<p>JavaScript中if语句求值其实使用<code>eval</code>函数，<code>eval(function f(){})</code> 返回 <code>function f(){}</code> 也就是 <code>true</code>。</p>
<p>下面我们可以把代码改造下，变成其等效代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var k = 1;
if (1) {
    eval(function foo(){});
    k += typeof foo;
}
console.log(k); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> k = <span class="hljs-number">1</span>;
<span class="hljs-keyword">if</span> (<span class="hljs-number">1</span>) {
    <span class="hljs-built_in">eval</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{});
    k += <span class="hljs-keyword">typeof</span> foo;
}
<span class="hljs-built_in">console</span>.log(k); </code></pre>
<p>上面的代码输出其实就是 <code>1undefined</code>。为什么那？我们查看下 <code>eval()</code> 说明文档即可获得答案</p>
<blockquote><p>该方法只接受原始字符串作为参数，如果 string 参数不是原始字符串，那么该方法将不作任何改变地返回。</p></blockquote>
<p>恰恰 <code>function f(){}</code> 语句的返回值是 <code>undefined</code>，所以一切都说通了。</p>
<p>注意上面代码和以下代码不同。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var k = 1;
if (1) {
    function foo(){};
    k += typeof foo;
}
console.log(k); // output 1function" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> k = <span class="hljs-number">1</span>;
<span class="hljs-keyword">if</span> (<span class="hljs-number">1</span>) {
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{};
    k += <span class="hljs-keyword">typeof</span> foo;
}
<span class="hljs-built_in">console</span>.log(k); <span class="hljs-comment">// output 1function</span></code></pre>
<h2 id="articleHeader2">问题3:在JavaScript中创建一个真正的private方法有什么缺点？</h2>
<p>每一个对象都会创建一个private方法的方法，这样很耗费内存</p>
<p>观察下面代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Employee = function (name, company, salary) {
    this.name = name || &quot;&quot;;       
    this.company = company || &quot;&quot;; 
    this.salary = salary || 5000; 

    // Private method
    var increaseSalary = function () {
        this.salary = this.salary + 1000;
    };

    // Public method
    this.dispalyIncreasedSalary = function() {
        increaseSlary();
        console.log(this.salary);
    };
};

// Create Employee class object
var emp1 = new Employee(&quot;John&quot;,&quot;Pluto&quot;,3000);
// Create Employee class object
var emp2 = new Employee(&quot;Merry&quot;,&quot;Pluto&quot;,2000);
// Create Employee class object
var emp3 = new Employee(&quot;Ren&quot;,&quot;Pluto&quot;,2500);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> Employee = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">name, company, salary</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name || <span class="hljs-string">""</span>;       
    <span class="hljs-keyword">this</span>.company = company || <span class="hljs-string">""</span>; 
    <span class="hljs-keyword">this</span>.salary = salary || <span class="hljs-number">5000</span>; 

    <span class="hljs-comment">// Private method</span>
    <span class="hljs-keyword">var</span> increaseSalary = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.salary = <span class="hljs-keyword">this</span>.salary + <span class="hljs-number">1000</span>;
    };

    <span class="hljs-comment">// Public method</span>
    <span class="hljs-keyword">this</span>.dispalyIncreasedSalary = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        increaseSlary();
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.salary);
    };
};

<span class="hljs-comment">// Create Employee class object</span>
<span class="hljs-keyword">var</span> emp1 = <span class="hljs-keyword">new</span> Employee(<span class="hljs-string">"John"</span>,<span class="hljs-string">"Pluto"</span>,<span class="hljs-number">3000</span>);
<span class="hljs-comment">// Create Employee class object</span>
<span class="hljs-keyword">var</span> emp2 = <span class="hljs-keyword">new</span> Employee(<span class="hljs-string">"Merry"</span>,<span class="hljs-string">"Pluto"</span>,<span class="hljs-number">2000</span>);
<span class="hljs-comment">// Create Employee class object</span>
<span class="hljs-keyword">var</span> emp3 = <span class="hljs-keyword">new</span> Employee(<span class="hljs-string">"Ren"</span>,<span class="hljs-string">"Pluto"</span>,<span class="hljs-number">2500</span>);</code></pre>
<p>在这里 emp1,emp2,emp3都有一个increaseSalary私有方法的副本。</p>
<p>所以我们除非必要，非常不推荐使用私有方法。</p>
<h2 id="articleHeader3">问题4:JavaScript中什么是闭包？写出一个例子</h2>
<p>老生常谈的问题了，闭包是在一个函数里声明了另外一个函数，并且这个函数访问了父函数作用域里的变量。</p>
<p>下面给出一个闭包例子，它访问了三个域的变量</p>
<ul>
<li><p>它自己作用域的变量</p></li>
<li><p>父函数作用域的变量</p></li>
<li><p>全局作用域的变量</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var globalVar = &quot;abc&quot;; 

// Parent self invoking function 
(function outerFunction (outerArg) { // begin of scope outerFunction
    // Variable declared in outerFunction function scope 
    var outerFuncVar = 'x';    
    // Closure self-invoking function 
    (function innerFunction (innerArg) { // begin of scope innerFunction
        // variable declared in innerFunction function scope
        var innerFuncVar = &quot;y&quot;; 
        console.log(          
            &quot;outerArg = &quot; + outerArg + &quot;\n&quot; +
            &quot;outerFuncVar = &quot; + outerFuncVar + &quot;\n&quot; +
            &quot;innerArg = &quot; + innerArg + &quot;\n&quot; +
            &quot;innerFuncVar = &quot; + innerFuncVar + &quot;\n&quot; +
            &quot;globalVar = &quot; + globalVar);
 
    }// end of scope innerFunction)(5); // Pass 5 as parameter 
}// end of scope outerFunction )(7); // Pass 7 as parameter 
innerFunction is closure that is defined inside outerFunc" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> globalVar = <span class="hljs-string">"abc"</span>; 

<span class="hljs-comment">// Parent self invoking function </span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">outerFunction</span> (<span class="hljs-params">outerArg</span>) </span>{ <span class="hljs-comment">// begin of scope outerFunction</span>
    <span class="hljs-comment">// Variable declared in outerFunction function scope </span>
    <span class="hljs-keyword">var</span> outerFuncVar = <span class="hljs-string">'x'</span>;    
    <span class="hljs-comment">// Closure self-invoking function </span>
    (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">innerFunction</span> (<span class="hljs-params">innerArg</span>) </span>{ <span class="hljs-comment">// begin of scope innerFunction</span>
        <span class="hljs-comment">// variable declared in innerFunction function scope</span>
        <span class="hljs-keyword">var</span> innerFuncVar = <span class="hljs-string">"y"</span>; 
        <span class="hljs-built_in">console</span>.log(          
            <span class="hljs-string">"outerArg = "</span> + outerArg + <span class="hljs-string">"\n"</span> +
            <span class="hljs-string">"outerFuncVar = "</span> + outerFuncVar + <span class="hljs-string">"\n"</span> +
            <span class="hljs-string">"innerArg = "</span> + innerArg + <span class="hljs-string">"\n"</span> +
            <span class="hljs-string">"innerFuncVar = "</span> + innerFuncVar + <span class="hljs-string">"\n"</span> +
            <span class="hljs-string">"globalVar = "</span> + globalVar);
 
    }<span class="hljs-comment">// end of scope innerFunction)(5); // Pass 5 as parameter </span>
}<span class="hljs-comment">// end of scope outerFunction )(7); // Pass 7 as parameter </span>
innerFunction is closure that is defined inside outerFunc</code></pre>
<p>输出很简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="outerArg = 7
outerFuncVar = x
innerArg = 5
innerFuncVar = y
globalVar = abc
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code><span class="hljs-attr">outerArg</span> = <span class="hljs-number">7</span>
<span class="hljs-attr">outerFuncVar</span> = x
<span class="hljs-attr">innerArg</span> = <span class="hljs-number">5</span>
<span class="hljs-attr">innerFuncVar</span> = y
<span class="hljs-attr">globalVar</span> = abc
</code></pre>
<h2 id="articleHeader4">问题5:写一个mul函数，使用方法如下。</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(mul(2)(3)(4)); // output : 24 
console.log(mul(4)(3)(4)); // output : 48" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(mul(<span class="hljs-number">2</span>)(<span class="hljs-number">3</span>)(<span class="hljs-number">4</span>)); <span class="hljs-comment">// output : 24 </span>
<span class="hljs-built_in">console</span>.log(mul(<span class="hljs-number">4</span>)(<span class="hljs-number">3</span>)(<span class="hljs-number">4</span>)); <span class="hljs-comment">// output : 48</span></code></pre>
<p>答案直接给出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function mul (x) {
    return function (y) { // anonymous function 
        return function (z) { // anonymous function 
            return x * y * z; 
        };
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mul</span> (<span class="hljs-params">x</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">y</span>) </span>{ <span class="hljs-comment">// anonymous function </span>
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">z</span>) </span>{ <span class="hljs-comment">// anonymous function </span>
            <span class="hljs-keyword">return</span> x * y * z; 
        };
    };
}</code></pre>
<p>简单说明下： mul 返回一个匿名函数，运行这个匿名函数又返回一个匿名函数，最里面的匿名函数可以访问 x,y,z 进而算出乘积返回即可。</p>
<p>对于JavaScript中的函数一般可以考察如下知识点：</p>
<ul>
<li><p>函数是一等公民</p></li>
<li><p>函数可以有属性，并且能连接到它的构造方法</p></li>
<li><p>函数可以像一个变量一样存在内存中</p></li>
<li><p>函数可以当做参数传给其他函数</p></li>
<li><p>函数可以返回其他函数</p></li>
</ul>
<h2 id="articleHeader5">问题6:JavaScript怎么清空数组？</h2>
<p>如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arrayList =  ['a','b','c','d','e','f'];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> arrayList =  [<span class="hljs-string">'a'</span>,<span class="hljs-string">'b'</span>,<span class="hljs-string">'c'</span>,<span class="hljs-string">'d'</span>,<span class="hljs-string">'e'</span>,<span class="hljs-string">'f'</span>];</code></pre>
<p>怎么清空 <code>arrayList</code></p>
<h3 id="articleHeader6">方法1</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arrayList = [];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">arrayList = [];</code></pre>
<p>直接改变arrayList所指向的对象，原对象并不改变。</p>
<h3 id="articleHeader7">方法2</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arrayList.length = 0;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">arrayList.length = <span class="hljs-number">0</span>;</code></pre>
<p>这种方法通过设置length=0 使原数组清除元素。</p>
<h3 id="articleHeader8">方法3</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arrayList.splice(0, arrayList.length);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">arrayList.splice(<span class="hljs-number">0</span>, arrayList.length);</code></pre>
<p>和方法2相似</p>
<h2 id="articleHeader9">问题7:怎么判断一个object是否是数组(array)？</h2>
<h3 id="articleHeader10">方法1</h3>
<p>使用 Object.prototype.toString 来判断是否是数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isArray(obj){
    return Object.prototype.toString.call( obj ) === '[object Array]';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isArray</span>(<span class="hljs-params">obj</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call( obj ) === <span class="hljs-string">'[object Array]'</span>;
}</code></pre>
<p>这里使用call来使 toString 中 this 指向 obj。进而完成判断</p>
<h3 id="articleHeader11">方法二</h3>
<p>使用 原型链 来完成判断</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isArray(obj){
    return obj.__proto__ === Array.prototype;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isArray</span>(<span class="hljs-params">obj</span>)</span>{
    <span class="hljs-keyword">return</span> obj.__proto__ === <span class="hljs-built_in">Array</span>.prototype;
}</code></pre>
<p>基本思想是利用 实例如果是某个构造函数构造出来的那么 它的 <code>__proto__</code>是指向构造函数的 <code>prototype</code>属性。</p>
<h3 id="articleHeader12">方法3</h3>
<p>利用JQuery</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isArray(obj){
    return $.isArray(obj)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isArray</span>(<span class="hljs-params">obj</span>)</span>{
    <span class="hljs-keyword">return</span> $.isArray(obj)
}</code></pre>
<p>JQuery isArray 的实现其实就是方法1</p>
<h2 id="articleHeader13">问题8:下面代码输出什么？</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var output = (function(x){
    delete x;
    return x;
})(0);
  
console.log(output);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> output = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x</span>)</span>{
    <span class="hljs-keyword">delete</span> x;
    <span class="hljs-keyword">return</span> x;
})(<span class="hljs-number">0</span>);
  
<span class="hljs-built_in">console</span>.log(output);</code></pre>
<p>输出是 <code>0</code>。 <code>delete</code> 操作符是将object的属性删去的操作。但是这里的 <code>x</code> 是并不是对象的属性， <code>delete</code> 操作符并不能作用。</p>
<h2 id="articleHeader14">问题9:下面代码输出什么？</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = 1;
var output = (function(){
    delete x;
    return x;
})();

console.log(output);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> x = <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> output = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">delete</span> x;
    <span class="hljs-keyword">return</span> x;
})();

<span class="hljs-built_in">console</span>.log(output);</code></pre>
<p>输出是 <code>1</code>。<code>delete</code> 操作符是将object的属性删去的操作。但是这里的 <code>x</code> 是并不是对象的属性， <code>delete</code> 操作符并不能作用。</p>
<h2 id="articleHeader15">问题10:下面代码输出什么？</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = { foo : 1};
var output = (function(){
    delete x.foo;
    return x.foo;
})();

console.log(output);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> x = { <span class="hljs-attr">foo</span> : <span class="hljs-number">1</span>};
<span class="hljs-keyword">var</span> output = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">delete</span> x.foo;
    <span class="hljs-keyword">return</span> x.foo;
})();

<span class="hljs-built_in">console</span>.log(output);</code></pre>
<p>输出是 <code>undefined</code>。x虽然是全局变量，但是它是一个object。<code>delete</code>作用在<code>x.foo</code>上，成功的将<code>x.foo</code>删去。所以返回<code>undefined</code></p>
<h2 id="articleHeader16">问题11:下面代码输出什么？</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Employee = {
    company: 'xyz'
}
var emp1 = Object.create(Employee);
delete emp1.company
console.log(emp1.company);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> Employee = {
    <span class="hljs-attr">company</span>: <span class="hljs-string">'xyz'</span>
}
<span class="hljs-keyword">var</span> emp1 = <span class="hljs-built_in">Object</span>.create(Employee);
<span class="hljs-keyword">delete</span> emp1.company
<span class="hljs-built_in">console</span>.log(emp1.company);</code></pre>
<p>输出是 <code>xyz</code>，这里的 emp1 通过 prototype 继承了 Employee的 company。emp1自己并没有company属性。所以delete操作符的作用是无效的。</p>
<h2 id="articleHeader17">问题12:什么是 <code>undefined x 1</code> ？</h2>
<p>在chrome下执行如下代码，我们就可以看到<code>undefined x 1</code>的身影。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var trees = [&quot;redwood&quot;,&quot;bay&quot;,&quot;cedar&quot;,&quot;oak&quot;,&quot;maple&quot;];
delete trees[3];
console.log(trees);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> trees = [<span class="hljs-string">"redwood"</span>,<span class="hljs-string">"bay"</span>,<span class="hljs-string">"cedar"</span>,<span class="hljs-string">"oak"</span>,<span class="hljs-string">"maple"</span>];
<span class="hljs-keyword">delete</span> trees[<span class="hljs-number">3</span>];
<span class="hljs-built_in">console</span>.log(trees);</code></pre>
<p>当我们使用 delete 操作符删除一个数组中的元素，这个元素的位置就会变成一个占位符。打印出来就是<code>undefined x 1</code>。<br>注意如果我们使用<code>trees[3] === 'undefined × 1'</code>返回的是 <code>false</code>。因为它仅仅是一种打印表示，并不是值变为<code>undefined x 1</code>。</p>
<h2 id="articleHeader18">问题13:下面代码输出什么？</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var trees = [&quot;xyz&quot;,&quot;xxxx&quot;,&quot;test&quot;,&quot;ryan&quot;,&quot;apple&quot;];
delete trees[3];
  
console.log(trees.length);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> trees = [<span class="hljs-string">"xyz"</span>,<span class="hljs-string">"xxxx"</span>,<span class="hljs-string">"test"</span>,<span class="hljs-string">"ryan"</span>,<span class="hljs-string">"apple"</span>];
<span class="hljs-keyword">delete</span> trees[<span class="hljs-number">3</span>];
  
<span class="hljs-built_in">console</span>.log(trees.length);</code></pre>
<p>输出是5。因为delete操作符并不是影响数组的长度。</p>
<h2 id="articleHeader19">问题14:下面代码输出什么？</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var bar = true;
console.log(bar + 0);   
console.log(bar + &quot;xyz&quot;);  
console.log(bar + true);  
console.log(bar + false);   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> bar = <span class="hljs-literal">true</span>;
<span class="hljs-built_in">console</span>.log(bar + <span class="hljs-number">0</span>);   
<span class="hljs-built_in">console</span>.log(bar + <span class="hljs-string">"xyz"</span>);  
<span class="hljs-built_in">console</span>.log(bar + <span class="hljs-literal">true</span>);  
<span class="hljs-built_in">console</span>.log(bar + <span class="hljs-literal">false</span>);   </code></pre>
<p>输出是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1
truexyz
2
1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1</span>
truexyz
<span class="hljs-number">2</span>
<span class="hljs-number">1</span></code></pre>
<p>下面给出一个加法操作表</p>
<ul>
<li><p>Number + Number -&gt; 加法</p></li>
<li><p>Boolean + Number -&gt; 加法</p></li>
<li><p>Boolean + Boolean -&gt; 加法</p></li>
<li><p>Number + String -&gt; 连接</p></li>
<li><p>String + Boolean -&gt; 连接</p></li>
<li><p>String + String -&gt; 连接</p></li>
</ul>
<h2 id="articleHeader20">问题15:下面代码输出什么？</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var z = 1, y = z = typeof y;
console.log(y);  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> z = <span class="hljs-number">1</span>, y = z = <span class="hljs-keyword">typeof</span> y;
<span class="hljs-built_in">console</span>.log(y);  </code></pre>
<p>输出是 <code>undefined</code>。js中赋值操作结合律是右至左的 ，即从最右边开始计算值赋值给左边的变量。</p>
<p>上面代码等价于</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var z = 1
z = typeof y;
var y = z;
console.log(y);  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> z = <span class="hljs-number">1</span>
z = <span class="hljs-keyword">typeof</span> y;
<span class="hljs-keyword">var</span> y = z;
<span class="hljs-built_in">console</span>.log(y);  </code></pre>
<h2 id="articleHeader21">问题16:下面代码输出什么？</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = function bar(){ return 12; };
typeof bar();  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> foo = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-keyword">return</span> <span class="hljs-number">12</span>; };
<span class="hljs-keyword">typeof</span> bar();  </code></pre>
<p>输出是抛出异常，bar is not defined。<br>如果想让代码正常运行，需要这样修改代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var bar = function(){ return 12; };
typeof bar();  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> bar = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-keyword">return</span> <span class="hljs-number">12</span>; };
<span class="hljs-keyword">typeof</span> bar();  </code></pre>
<p>或者是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function bar(){ return 12; };
typeof bar();  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-keyword">return</span> <span class="hljs-number">12</span>; };
<span class="hljs-keyword">typeof</span> bar();  </code></pre>
<p>明确说明这个下问题</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = function bar(){ 
    // foo is visible here 
    // bar is visible here
    console.log(typeof bar()); // Work here :)
};
// foo is visible here
// bar is undefined here" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> foo = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>)</span>{ 
    <span class="hljs-comment">// foo is visible here </span>
    <span class="hljs-comment">// bar is visible here</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> bar()); <span class="hljs-comment">// Work here :)</span>
};
<span class="hljs-comment">// foo is visible here</span>
<span class="hljs-comment">// bar is undefined here</span></code></pre>
<h2 id="articleHeader22">问题17:两种函数声明有什么区别？</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = function(){ 
    // Some code
}; 
function bar(){ 
    // Some code
}; " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> foo = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ 
    <span class="hljs-comment">// Some code</span>
}; 
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>)</span>{ 
    <span class="hljs-comment">// Some code</span>
}; </code></pre>
<p>foo的定义是在运行时。想系统说明这个问题，我们要引入变量提升的这一概念。</p>
<p>我们可以运行下如下代码看看结果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(foo)
console.log(bar)

var foo = function(){ 
    // Some code
}; 
function bar(){ 
    // Some code
}; " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(foo)
<span class="hljs-built_in">console</span>.log(bar)

<span class="hljs-keyword">var</span> foo = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ 
    <span class="hljs-comment">// Some code</span>
}; 
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>)</span>{ 
    <span class="hljs-comment">// Some code</span>
}; </code></pre>
<p>输出为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="undefined
function bar(){ 
    // Some code
}; " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-literal">undefined</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span><span class="hljs-params">()</span></span>{ 
    <span class="hljs-comment">// Some code</span>
}; </code></pre>
<p>为什么那？为什么 foo 打印出来是 undefined，而 bar打印出来却是函数？</p>
<p>JavaScript在执行时，会将变量提升。</p>
<p>所以上面代码JavaScript 引擎在实际执行时按这个顺序执行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// foo bar的定义位置被提升
function bar(){ 
    // Some code
}; 
var foo;

console.log(foo)
console.log(bar)

foo = function(){ 
    // Some code
}; 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// foo bar的定义位置被提升</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>)</span>{ 
    <span class="hljs-comment">// Some code</span>
}; 
<span class="hljs-keyword">var</span> foo;

<span class="hljs-built_in">console</span>.log(foo)
<span class="hljs-built_in">console</span>.log(bar)

foo = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ 
    <span class="hljs-comment">// Some code</span>
}; 
</code></pre>
<p>原代码的输出合理解释了。</p>
<h2 id="articleHeader23">问题18:下面代码输出什么？</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var salary = &quot;1000$&quot;;

(function () {
    console.log(&quot;Original salary was &quot; + salary);

    var salary = &quot;5000$&quot;;

    console.log(&quot;My New Salary &quot; + salary);
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> salary = <span class="hljs-string">"1000$"</span>;

(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Original salary was "</span> + salary);

    <span class="hljs-keyword">var</span> salary = <span class="hljs-string">"5000$"</span>;

    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"My New Salary "</span> + salary);
})();</code></pre>
<p>输出是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Original salary was undefined
My New Salary 5000$" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>Original salary was <span class="hljs-literal">undefined</span>
My New Salary <span class="hljs-number">5000</span>$</code></pre>
<p>这题同样考察的是变量提升。等价于以下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var salary = &quot;1000$&quot;;

 (function () {
     var salary ;
     console.log(&quot;Original salary was &quot; + salary);

     salary = &quot;5000$&quot;;

     console.log(&quot;My New Salary &quot; + salary);
 })();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> salary = <span class="hljs-string">"1000$"</span>;

 (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
     <span class="hljs-keyword">var</span> salary ;
     <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Original salary was "</span> + salary);

     salary = <span class="hljs-string">"5000$"</span>;

     <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"My New Salary "</span> + salary);
 })();</code></pre>
<h2 id="articleHeader24">问题19:什么是 <code>instanceof</code> 操作符？下面代码输出什么？</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(){ 
  return foo; 
}

console.log(new foo() instanceof foo);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{ 
  <span class="hljs-keyword">return</span> foo; 
}

<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">new</span> foo() <span class="hljs-keyword">instanceof</span> foo);</code></pre>
<p><code>instanceof</code>操作符用来判断是否当前对象是特定类的对象。</p>
<p>如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Animal(){
    //或者不写return语句
    return this;
}
var dog = new Animal();
dog instanceof Animal // Output : true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">//或者不写return语句</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
}
<span class="hljs-keyword">var</span> dog = <span class="hljs-keyword">new</span> Animal();
dog <span class="hljs-keyword">instanceof</span> Animal <span class="hljs-comment">// Output : true</span></code></pre>
<p>但是，这里的foo定义为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(){ 
  return foo; 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{ 
  <span class="hljs-keyword">return</span> foo; 
}</code></pre>
<p>所以</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// here bar is pointer to function foo(){return foo}.
var bar = new foo();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// here bar is pointer to function foo(){return foo}.</span>
<span class="hljs-keyword">var</span> bar = <span class="hljs-keyword">new</span> foo();
</code></pre>
<p>所以 <code>new foo() instanceof foo</code> 返回 false</p>
<h2 id="articleHeader25">问题20: 如果我们使用JavaScript的"关联数组"，我们怎么计算"关联数组"的长度？</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var counterArray = {
    A : 3,
    B : 4
};
counterArray[&quot;C&quot;] = 1;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> counterArray = {
    <span class="hljs-attr">A</span> : <span class="hljs-number">3</span>,
    <span class="hljs-attr">B</span> : <span class="hljs-number">4</span>
};
counterArray[<span class="hljs-string">"C"</span>] = <span class="hljs-number">1</span>;</code></pre>
<p>其实答案很简单，直接计算key的数量就可以了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.keys(counterArray).length // Output 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">Object</span>.keys(counterArray).length <span class="hljs-comment">// Output 3</span></code></pre>
<p>面试题参考自: <a href="https://www.codementor.io/nihantanu/21-essential-javascript-tech-interview-practice-questions-answers-du107p62z" rel="nofollow noreferrer" target="_blank">21 Essential JavaScript Interview Questions | Codementor</a></p>
<p><strong>本文给出的面试题答案只是很多合理答案中的几个，可能会不全面，欢迎大家补充。</strong></p>
<p><strong>由于个人疏忽等原因，本文中难免会存在少量错误，欢迎大家批评指正。</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
20个必会的JavaScript面试题

## 原文链接
[https://segmentfault.com/a/1190000008785931](https://segmentfault.com/a/1190000008785931)

