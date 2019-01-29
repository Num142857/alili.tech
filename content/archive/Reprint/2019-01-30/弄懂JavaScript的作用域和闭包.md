---
title: '弄懂JavaScript的作用域和闭包' 
date: 2019-01-30 2:30:23
hidden: true
slug: fq36kjyvh6q
categories: [reprint]
---

{{< raw >}}

                    
<p>《你不知道的JavaScript》真的是一本好书，阅读这本书，我有多次“哦，原来是这样”的感觉，以前自以为理解了（其实并非真的理解）的概念，这一次真的理解得更加透彻了。关于本书，我会写好几篇读书笔记用以记录那些让我恍然大悟的瞬间，本文是第一篇《弄懂JavaScript的作用域和闭包》。</p>
<blockquote><p>看正文之前，先考你几个问你，如果你能清晰的回答，那本文可能对你作用不大，如果有一些疑问，那我们就一起来解开这些疑问吧。</p></blockquote>
<h3 id="articleHeader0">考考你</h3>
<ul>
<li><p>标识符是什么？<code>LHS</code>，<code>RHS</code>又是什么，其意义何在？</p></li>
<li><p>什么是词法作用域？javascript语言中那些东西会影响作用域？</p></li>
<li><p>我们一直都在听说的各种提升（函数提升，变量提升）究竟要怎么理解？</p></li>
<li><p>在我们平时的编程中，那些地方用到了闭包？（悄悄告诉你，我之前也能把闭包的概念背的滚瓜乱熟，但是却一直以为自己平时很少用到闭包，后来才发现，原来一直都在用啊。。）</p></li>
</ul>
<h2 id="articleHeader1">正文从这里开始</h2>
<h3 id="articleHeader2">从浏览器如何编译JS代码说起</h3>
<p>很久以来我就在思考，当我们把代码交给浏览器，浏览器是如何把代码转换为活灵活现的网页的。JS引擎在执行我们的代码前，浏览器对我们的代码还做了什么，这个过程对我来说就像黑匣子一般，神秘而又让人好奇。</p>
<h4>理解<code>var a = 2</code>
</h4>
<p>我们每天都会写类似<code>var a = 2</code>这样的简单的JS代码，可是浏览器是机器，它可只认识二进制的0和1，<code>var a = 2</code>对它来说肯定比外语对我们还难。不过有困难不要紧，至少我们现在问题清晰了，要知道它是如何把有意义的人类字符转化为符合一定规则的机器的0 和 1 。</p>
<p>想想我们是如何阅读一句话的（可以想想我们不那么熟悉的外语），我们不熟悉英语的时候，我们其实优先去理解的是一个个的词，这些词按照一定的规则就成了有意义的句子。浏览器其实也是如此<code>var a = 2</code>，浏览器其实看到的是<code>var</code>,<code>a</code>,<code>=</code>,<code>2</code>这是一个个的词。这个过程叫做<strong>词法解析阶段</strong>，换句话说是这个过程会将由字符组成的字符串分解成(对编程语言来说)有意义的代码块。<br>就像我们按照语法规则组合单词为句子一样，浏览器也会把上述已经分解好的代码块组合为代表了程序语法结构的树（AST），这个阶段称为<strong>语法分析阶段</strong>，AST对浏览器来说已经是有意义的外语了，不过距离它直接理解还差一步<strong>代码生成</strong>，转换代码为有意义的机器语言（二进制语言）。</p>
<p>我们总结一下经历的三阶段</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- 词法分析：分解代码为有意义的词语；
* 语法分析：把有意义的词语按照语法规则组合成代表程序语法结构的树（AST）；
* 代码生成：将 AST 转换为可执行代码
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs asciidoc"><code><span class="hljs-bullet">- </span>词法分析：分解代码为有意义的词语；
<span class="hljs-bullet">* </span>语法分析：把有意义的词语按照语法规则组合成代表程序语法结构的树（AST）；
<span class="hljs-bullet">* </span>代码生成：将 AST 转换为可执行代码
</code></pre>
<p>通过上述三个阶段，浏览器已经可以运行我们得到的可执行代码了，这三个阶段还有一个合称呼叫做<strong>编译阶段</strong>。我们把之后对可执行代码的执行称为<strong>运行阶段</strong>。</p>
<h4>JS的作用域在何时确定</h4>
<p>编程语言中，作用域一般来说有两种，词法作用域和动态作用域。词法作用域就是依赖编程时所写的代码结构确定的作用域，一般来说在编译结束后，作用域就已经确定，代码运行过程中不再改变。而动态作用域听名字就知道是在代码运行过程中作用域会动态改变。一般认为我们的javascript的作用域是词法作用域（说一般，是因为javascript提供了一些动态改变作用域的方法，后文会有介绍）。</p>
<p>词法作用域就是依赖编程时所写的代码结构确定的作用域，对比一下浏览器在编译阶段做的事情，我们发现，<strong>词法作用域就是在编译阶段确定</strong>的。看到这里是不是突然理解了为什么以前我们常常听到的“函数的作用域在函数定义阶段就确定了”这句话了。接下来我们就来说明函数作用域是按照什么规则确定的。</p>
<h3 id="articleHeader3">JS中的作用域</h3>
<h4>作用域是什么？</h4>
<p>关于作用域是什么？《You don’t know js》给出了这么一个概念：</p>
<blockquote><p><strong>使用一套严格的规则来分辨哪些标识符对那些语法有访问权限。</strong></p></blockquote>
<p>好吧，好抽象的一句话，<strong>标识符</strong>又是什么呢？作用域到底要怎么理解啊？我们一个个来看。</p>
<h5>标识符：</h5>
<p>我们知道，当我们的程序运行的时候，我们的数据（”字符串”，“对象”，“函数”等等都是要载入内存的）。那我们该如何访问到对应的内存区域呢，标识符就在这时候起作用了，通过它我们就能找到对应的数据，从这个角度来看，变量名，函数名等等都是标识符。</p>
<p><strong>对标识符的操作</strong><br>知道了标识符，我们来想想，平时我们会对标识符进行哪些操作。其实无外乎两种，看下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第一种定义了标识符`a`并把数值2赋值给了`a`这种操作有一个专门的术语叫做`LHS`
var a = 2;

// 第二种，var b = a ,其实对应a ,b 两个操作符是不同的操作，对b来说是一个赋值操作，这是LHS,但是对a来说却是取到a对应的值，这种操作也有一个专门的术语叫做“RHS”
var b = a;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第一种定义了标识符`a`并把数值2赋值给了`a`这种操作有一个专门的术语叫做`LHS`</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>;

<span class="hljs-comment">// 第二种，var b = a ,其实对应a ,b 两个操作符是不同的操作，对b来说是一个赋值操作，这是LHS,但是对a来说却是取到a对应的值，这种操作也有一个专门的术语叫做“RHS”</span>
<span class="hljs-keyword">var</span> b = a;</code></pre>
<p>小结一下，对标识符来说有以下两种操作</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- 赋值操作（LHS）；常见的是函数定义，函数传参，变量赋值等等
* 取值操作（RHS）；常见包括函数调用，
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs asciidoc"><code><span class="hljs-bullet">- </span>赋值操作（LHS）；常见的是函数定义，函数传参，变量赋值等等
<span class="hljs-bullet">* </span>取值操作（RHS）；常见包括函数调用，
</code></pre>
<h5>再回过头来看作用域</h5>
<p>明白了标识符及对标识符的两种操作，我们可以很容易的理解作用域了，作用域其实就是定义了我们的呈现在运行期，进行标识符操作的范围，对应到实际问题来说，就是我们熟悉的函数或者变量可以在什么地方调用。</p>
<p>作用域也可以看做是一套依据名称查找变量的规则。那我们再细看一下这个规则，在当前作用域中无法找到某个变量时，引擎就会在<strong>外层嵌套</strong>的作用域中继续查找，直到找到该变量， 或抵达最外层的作用域(也就是全局作用域)为止。</p>
<p>这里提到了嵌套一词，我们接下来看js中那些因素可以形成作用域。</p>
<h4>JS中的作用域类型</h4>
<h5>函数作用域</h5>
<p>函数作用域是js中最常见的作用域了，函数作用域给我们最直观的体会就是，内部函数可以调用外部函数中的变量。一层层的函数，很直观的就形成了嵌套的作用域。不过只说这一点真对不起本文的标题，还记得我们常常听到的“如果在函数内部我们给一个未定义的变量赋值，这个变量会转变为一个全局变量”。对我来说之前这句话几乎是背下来的，我一直都没能理解。我们从对标识符的操作的角度来理解这句话。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1;

function foo(){
// b第一次出现在函数foo中
    b = a ;
}

foo();

// 全局可以访问到b
console.log(b); //1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-comment">// b第一次出现在函数foo中</span>
    b = a ;
}

foo();

<span class="hljs-comment">// 全局可以访问到b</span>
<span class="hljs-built_in">console</span>.log(b); <span class="hljs-comment">//1</span></code></pre>
<p>在我们调用<code>foo()</code>时，对b其实是进行了LHS操作（取得a的值并赋值给b），b前面并不存在var let 等，因此浏览器首先在<code>foo()</code>作用域里面查找b这个标识符，结果在b里面没有找到，安装作用域的规则，浏览器会继续在<code>foo()</code>的外层作用域寻找标识符b，结果还是没有找到，说明在这次查询标识符b的范围内并不存在已经定义的b，在非严格模式下LHS操作会在可查找范围的最外层（也就是全局）定义一个b，因此b也就成了一个全局的变量了（严格模式LHS找不到返回ReferenceError错误）。这样那句话就可以理解了。同样值得我们注意的是对操作符进行RHS操作会出现不同的情况，无论严格或者非严格模式RHS找不到对返回ReferenceError错误（对RHS找到的值进行不合理的操作会返回错误<code>TypeError</code>（作用域判别成功，操作非法。））。</p>
<blockquote><p>闭包：闭包是基于词法作用域书写代码时所产生的自然结果，你甚至不需要为了利用它们而有意 识地创建闭包。闭包的创建和使用在你的代码中随处可见。你缺少的是根据你自己的意愿 来识别、拥抱和影响闭包的思维环境。</p></blockquote>
<h5>块作用域</h5>
<p>除了函数作用域，JS也提供块作用域。我们应该明确，作用域是针对标识符来说的，块作用域把标识符限制在<code>{}</code>中。</p>
<p>ES6 提供的<code>let</code>,<code>const</code>方法声明的标识符都会固定于块中。常被大家忽略的<code>try/catch</code>的<code>catch</code>语句也会创建一个块作用域。</p>
<h5>改变函数作用域的方法</h5>
<p>一般说来词法作用域在代码编译阶段就已经确定，这种确定性其实是很有好处的，代码在执行过程中，能够预测在执行过程中如何对它们进行查找。能够提高代码运行阶段的执行效率。不过JS也提供动态改变作用域的方法。<code>eval()</code>函数和<code>with</code>关键字.</p>
<p><strong><code>eval()</code>方法：</strong><br>这个方法接受一个字符串为参数，并将其中的内容视为好像在书写时就存在于程序中这个位置的代码。换句话说，可以在你写的代码中用程序生成代码并运行，就好像代码是写在那个位置的一样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" function foo(str,a){
     eval(str);//欺骗作用域,词法阶段阶段foo()函数中并没有定义标识符，但是在函数运行阶段却临时定义了一个b；
     console.log(a,b);
 }
 
 var b = 2;
 
 foo(&quot;var b =3;&quot;,1);//1,3

 // 严格模式下，`eval()`会产生自己的作用域，无法修改所在的作用域
 function foo(str){
     'use strict';
     eval(str);
     console.log(a);//ReferenceError: a is not de ned
 }
 
 foo('var a =2');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">str,a</span>)</span>{
     <span class="hljs-built_in">eval</span>(str);<span class="hljs-comment">//欺骗作用域,词法阶段阶段foo()函数中并没有定义标识符，但是在函数运行阶段却临时定义了一个b；</span>
     <span class="hljs-built_in">console</span>.log(a,b);
 }
 
 <span class="hljs-keyword">var</span> b = <span class="hljs-number">2</span>;
 
 foo(<span class="hljs-string">"var b =3;"</span>,<span class="hljs-number">1</span>);<span class="hljs-comment">//1,3</span>

 <span class="hljs-comment">// 严格模式下，`eval()`会产生自己的作用域，无法修改所在的作用域</span>
 <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">str</span>)</span>{
<span class="hljs-meta">     'use strict'</span>;
     <span class="hljs-built_in">eval</span>(str);
     <span class="hljs-built_in">console</span>.log(a);<span class="hljs-comment">//ReferenceError: a is not de ned</span>
 }
 
 foo(<span class="hljs-string">'var a =2'</span>);</code></pre>
<p><code>eval()</code>有时候挺有用，但是性能消耗很大，可能也会带来安全隐患，因此不推荐使用。</p>
<p><strong><code>with</code>关键字：</strong></p>
<p>with 通常被当作重复引用同一个对象中的多个属性的快捷方式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var obj = { 
        a: 1,
      b: 2,
      c: 3 
      };
    // 单调乏味的重复 &quot;obj&quot; obj.a = 2;
    
    obj.b = 3;
    obj.c = 4;

    // 简单的快捷方式 
      
   with (obj) {
        a = 3;
        b = 4;
        c = 5;
    }

    function foo(obj) { 
        with (obj) {
            a = 2; 
        }
    }

    var o1 = { 
        a: 3
    };

    var o2 = { 
        b: 3
    };

    foo( o1 );
    console.log( o1.a ); // 2
    
    foo( o2 );
    console.log( o2.a ); // undefined
    
    console.log( a ); // 2——不好，a被泄漏到全局作用域上了!
    
    // 执行了LHS查询，不存在就在全局创建了一个。
    // with 声明实际上是根据你传递给它的对象凭空创建了一个全新的词法作用域。 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    <span class="hljs-keyword">var</span> obj = { 
        <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>,
      <span class="hljs-attr">c</span>: <span class="hljs-number">3</span> 
      };
    <span class="hljs-comment">// 单调乏味的重复 "obj" obj.a = 2;</span>
    
    obj.b = <span class="hljs-number">3</span>;
    obj.c = <span class="hljs-number">4</span>;

    <span class="hljs-comment">// 简单的快捷方式 </span>
      
   <span class="hljs-keyword">with</span> (obj) {
        a = <span class="hljs-number">3</span>;
        b = <span class="hljs-number">4</span>;
        c = <span class="hljs-number">5</span>;
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">obj</span>) </span>{ 
        <span class="hljs-keyword">with</span> (obj) {
            a = <span class="hljs-number">2</span>; 
        }
    }

    <span class="hljs-keyword">var</span> o1 = { 
        <span class="hljs-attr">a</span>: <span class="hljs-number">3</span>
    };

    <span class="hljs-keyword">var</span> o2 = { 
        <span class="hljs-attr">b</span>: <span class="hljs-number">3</span>
    };

    foo( o1 );
    <span class="hljs-built_in">console</span>.log( o1.a ); <span class="hljs-comment">// 2</span>
    
    foo( o2 );
    <span class="hljs-built_in">console</span>.log( o2.a ); <span class="hljs-comment">// undefined</span>
    
    <span class="hljs-built_in">console</span>.log( a ); <span class="hljs-comment">// 2——不好，a被泄漏到全局作用域上了!</span>
    
    <span class="hljs-comment">// 执行了LHS查询，不存在就在全局创建了一个。</span>
    <span class="hljs-comment">// with 声明实际上是根据你传递给它的对象凭空创建了一个全新的词法作用域。 </span></code></pre>
<p><code>with</code>也会带来性能的损耗。</p>
<blockquote><p>JavaScript 引擎会在编译阶段进行数项的性能优化。其中有些优化依赖于能够根据代码的词法进行静态分析，并预先确定所有变量和函数的定义位置，才能在执行过程中快速找到标识符。</p></blockquote>
<h4>声明提升</h4>
<p>作用域关系到的是标识符的作用范围，而标识符的作用范围和它的声明位置是密切相关的。在<code>js</code>中有一些关键字是专门用来声明标识符的（比如<code>var</code>,<code>let</code>,<code>const</code>），非匿名函数的定义也会声明标识符。</p>
<p>关于声明也许大家都听说过声明提升一词。我们来分析一下造成声明提升的原因。</p>
<p>我们已经知道引擎会在解释 JavaScript 代码之前首先对其进行编译。编译阶段中的一部分工作就是找到所有的声明，并用合适的作用域将它们关联起来（词法作用域的核心）。<br>这样的话，声明好像被提到了前面。<br>值得注意的是每个作用域都会进行提升操作。声明会被提升到所在作用域的顶部。</p>
<p>不过并非所有的声明都会被提升，不同声明提升的权重也不同，具体来说函数声明会被提升，函数表达式不会被提升（就算是有名称的函数表达式也不会提升）。</p>
<p>通过<code>var</code> 定义的变量会提升，而<code>let</code>和<code>const</code>进行的声明不会提升。</p>
<p>函数声明和变量声明都会被提升。但是一个值得注意的细节也就是函数会首先被提升，然后才是变量，也就是说如果一个变量声明和一个函数声明同名，那么就算在语句顺序上变量声明在前，该标识符还是会指向相关函数。</p>
<p>如果变量或函数有重复声明以会第一次声明为主。</p>
<p><strong>最后一点需要注意的是：</strong><br>声明本身会被提升，而包括函数表达式的赋值在内的赋值操作并不会提升。</p>
<h4>作用域的一些应用</h4>
<p>看到这里，我想大家对JS的作用域应该有了一个比较细致的了解。下面说一下对JS作用域的一些拓展应用。</p>
<h5>最小特权原则</h5>
<p>也叫最小授权或最小暴露原则。这个原则是指在软件设计中，应该最小限度地暴露必要内容，而将其他内容都“隐藏”起来，比如某个模块或对象的 API 设计。也就是尽可能多的把部分代码私有化。</p>
<p>函数可以产生自己的作用域，因此我们可以采用函数封装（函数表达式和函数声明都可以）的方法来实现这一原则。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 函数表达式
    var a = 2;
    (function foo() { // <-- 添加这一行 var a = 3;
       console.log(a); // 3 
    })(); // <-- 以及这一行 
    console.log( a ); // 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    <span class="hljs-comment">// 函数表达式</span>
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>;
    (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// &lt;-- 添加这一行 var a = 3;</span>
       <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// 3 </span>
    })(); <span class="hljs-comment">// &lt;-- 以及这一行 </span>
    <span class="hljs-built_in">console</span>.log( a ); <span class="hljs-comment">// 2</span></code></pre>
<p>这里顺便说明一下<strong>如何区分函数表达式和函数声明</strong>：</p>
<blockquote><p>如果 function 是声明中 的第一个词，那么就是一个函数声明，否则就是一个函数表达式。  <br>函数声明和函数表达式之间最重要的区别是它们的名称标识符将会绑定在何处。函数表达式可以是匿名的，而函数声明则不可以省略函数名——在 JavaScript 的语法中这是非法的。</p></blockquote>
<p>可以使用立即执行的函数表达式（IIFE）的方式来封装。</p>
<p><strong>立即执行的函数表达式(IIFE)</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var a = 2;
    (function foo() {
        var a = 3;
        console.log(a); // 3
    })();
    console.log(a); // 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    <span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>;
    (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> a = <span class="hljs-number">3</span>;
        <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// 3</span>
    })();
    <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// 2</span></code></pre>
<p>函数表达式后面加上一个括号后会立即执行。</p>
<p><code>(function(){ .. }())</code>是IIFE的另外一种表达方式括号加在里面和外面，功能是一样的。</p>
<p>顺便说一下，IIFE 的另一个非常普遍的进阶用法是把它们当作函数调用并传递参数进去。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var a = 2;
    (function IIFE(global) {
        var a = 3;
        console.log(a); // 3 console.log( global.a ); // 2
    })(window);
    console.log(a); // 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    <span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>;
    (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">IIFE</span>(<span class="hljs-params">global</span>) </span>{
        <span class="hljs-keyword">var</span> a = <span class="hljs-number">3</span>;
        <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// 3 console.log( global.a ); // 2</span>
    })(<span class="hljs-built_in">window</span>);
    <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// 2</span></code></pre>
<h5>闭包</h5>
<p>一般大家都会这么形容闭包。</p>
<blockquote><p>当一个函数的返回值是另外一个函数，而返回的那个函数如果调用了其父函数内部的其它变量，如果返回的这个函数在外部被执行，就产生了闭包。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function foo() {
        var a = 2;
    
        function bar() {
            console.log(a);
        }
        return bar;
    }
    var baz = foo();
    baz(); // 2 —— 这就是闭包的效果。在函数外访问了函数内的标识符
    
    // bar()函数持有对其父作用域的引用，而使得父作用域没有被销毁，这就是闭包" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>;
    
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(a);
        }
        <span class="hljs-keyword">return</span> bar;
    }
    <span class="hljs-keyword">var</span> baz = foo();
    baz(); <span class="hljs-comment">// 2 —— 这就是闭包的效果。在函数外访问了函数内的标识符</span>
    
    <span class="hljs-comment">// bar()函数持有对其父作用域的引用，而使得父作用域没有被销毁，这就是闭包</span></code></pre>
<p>一般来说，由于垃圾回收机制的存在，函数在执行完以后会被销毁，不再使用的内存空间。上例中由于看上去 <code>foo()</code>的内容不会再被使用，所以很自然地会考虑对其进行回收。而闭包的“神奇”之处正是可以阻止这件事情的发生（以前总有人说要减少使用闭包，害怕内存泄漏什么的，其实这个也不大比担心）。</p>
<p>其实上面这个定义，在好久之前我就知道，不过同时我也误以为我平时很少用到闭包，因为我真的并没有主动去用过闭包，不过其实我错了，无意中，我一直在使用闭包。</p>
<p>本质上无论何时何地，如果将函数(访问它们各自的词法作用域)当作第一 级的值类型并到处传递，你就会看到闭包在这些函数中的应用。在定时器、事件监听器、 Ajax请求、跨窗口通信、Web Workers或者任何其他的异步(或者同步)任务中，只要使 用了回调函数，实际上就是在使用闭包!<br>所以你应该知道，你已经用过很多次闭包了。</p>
<p>这里说一个大家可能都遇到过的坑，一个没有正确理解作用域和闭包造成的坑。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    for (var i = 1; i <= 5; i++) {
        setTimeout(function timer() {
            console.log(i);
        }, i * 1000);
    }
// 其实我们想得到的结果是1，2，3，4，5，结果却是五个6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt;= <span class="hljs-number">5</span>; i++) {
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timer</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(i);
        }, i * <span class="hljs-number">1000</span>);
    }
<span class="hljs-comment">// 其实我们想得到的结果是1，2，3，4，5，结果却是五个6</span></code></pre>
<p>我们分析一下造成这个结果的原因：<br>我们试图假设循环中的每个迭代在运行时都会给自己“捕获”一个 i 的副本。但是根据作用域的工作原理，实际情况是尽管循环中的五个函数是在各个迭代中分别定义的（前面说过以第一次定义为主，后面的会被忽略）， 但是它们都被封闭在一个共享的全局作用域中，因为在时间到了执行timer函数时,全局里面的这个i就是6，因此无法达到预期。</p>
<p>理解了是作用域的问题，这里我们有两种解决办法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 办法1
    for (var i = 1; i <= 5; i++) {
        (function(j) {
            setTimeout(function timer() {
                console.log(j);
            }, j * 1000);
        })(i);
    //通过一个立即执行函数，为每次循环创建一个单独的作用域。
    }
    
    // 办法2
    for (var i = 1; i <= 5; i++) {
        let j = i; // 是的，闭包的块作用域! 
          setTimeout( function timer() {
        console.log(j);
        }, j * 1000);
    }
    // let 每次循环都会创建一个块作用域" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    <span class="hljs-comment">// 办法1</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt;= <span class="hljs-number">5</span>; i++) {
        (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">j</span>) </span>{
            setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timer</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-built_in">console</span>.log(j);
            }, j * <span class="hljs-number">1000</span>);
        })(i);
    <span class="hljs-comment">//通过一个立即执行函数，为每次循环创建一个单独的作用域。</span>
    }
    
    <span class="hljs-comment">// 办法2</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt;= <span class="hljs-number">5</span>; i++) {
        <span class="hljs-keyword">let</span> j = i; <span class="hljs-comment">// 是的，闭包的块作用域! </span>
          setTimeout( <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timer</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(j);
        }, j * <span class="hljs-number">1000</span>);
    }
    <span class="hljs-comment">// let 每次循环都会创建一个块作用域</span></code></pre>
<p>现在的开发都离不开模块化，下面说说模块是如何利用闭包的。</p>
<p><strong>模块是如何利用闭包的：</strong><br>最常见的实现模块模式的方法通常被称为<strong>模块暴露</strong>。</p>
<p>我们来看看如何定义一个模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function CoolModule() {
        var something = &quot;cool&quot;;
        var another = [1, 2, 3];
    
        function doSomething() {
            console.log(something);
        }
    
        function doAnother() {
            console.log(another.join(&quot; ! &quot;));
        }
    
    // 返回的是一个对象，对象中可能包含各种函数
        return {
            doSomething: doSomething,
            doAnother: doAnother
        };
    }

    var foo = CoolModule();
// 在外面调用返回对象中的方法就形成了闭包
    foo.doSomething(); // cool
    foo.doAnother(); // 1 ! 2 ! 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">CoolModule</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> something = <span class="hljs-string">"cool"</span>;
        <span class="hljs-keyword">var</span> another = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
    
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doSomething</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(something);
        }
    
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doAnother</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(another.join(<span class="hljs-string">" ! "</span>));
        }
    
    <span class="hljs-comment">// 返回的是一个对象，对象中可能包含各种函数</span>
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">doSomething</span>: doSomething,
            <span class="hljs-attr">doAnother</span>: doAnother
        };
    }

    <span class="hljs-keyword">var</span> foo = CoolModule();
<span class="hljs-comment">// 在外面调用返回对象中的方法就形成了闭包</span>
    foo.doSomething(); <span class="hljs-comment">// cool</span>
    foo.doAnother(); <span class="hljs-comment">// 1 ! 2 ! 3</span></code></pre>
<p>模块的两个必要条件：</p>
<ul>
<li><p>必须有外部的封闭函数，该函数必须至少被调用一次</p></li>
<li><p>封闭函数必须返回至少一个内部函数，这样内部函数才能在私有作用域中形成闭包，并且可以访问或者修改私有的状态。</p></li>
</ul>
<p>文章写到这里也差不多该结束了，谢谢你的阅读，希望你有所收获。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
弄懂JavaScript的作用域和闭包

## 原文链接
[https://segmentfault.com/a/1190000007650548](https://segmentfault.com/a/1190000007650548)

