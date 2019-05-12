---
title: 'JS基础知识：变量对象、作用域链和闭包' 
date: 2018-12-15 2:30:11
hidden: true
slug: 9e4rwwq20d5
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>前言：这段时间一直在消化作用域链和闭包的相关知识。之前看《JS高程》和一些技术博客，对于这些概念的论述多多少少不太清楚或者不太完整，包括一些大神的技术文章。这也给我的学习上造成了一些困惑，这几个概念的理解也是始终处于一个半懂不懂的状态。后来在某公众号看到了@波同学的基础文章，这应该是我所看到的最清楚，最全面，最好懂的文章了。所以我在学习之余决定写一篇文章，总结学到的知识点，用我的理解来阐述，不足之处，见请谅解。</blockquote>
<h2 id="articleHeader0">执行上下文（Execution Context）</h2>
<p>也叫执行环境，也可以简称“环境”。是JS在执行过程中产生的，当JS执行一段可执行的代码时，就会生成一个叫执行环境的东西。JS中每个函数都会有自己的执行环境，当函数执行时，就生成了它的执行环境，执行上下文会生成函数的作用域。</p>
<p>除了函数有执行环境，还有全局的环境。在JS中，往往不止一个执行环境。</p>
<p>让我们先来看一个栗子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a=10;
function foo(){
  var b=5;
  function fn(){
    var c=20;
    var d=100;
  }
  fn();
}
foo();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> a=<span class="hljs-number">10</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">()</span></span>{
  <span class="hljs-keyword">var</span> b=<span class="hljs-number">5</span>;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">var</span> c=<span class="hljs-number">20</span>;
    <span class="hljs-keyword">var</span> d=<span class="hljs-number">100</span>;
  }
  fn();
}
foo();</code></pre>
<p>在这个栗子中，包括了三个执行环境：全局环境，foo()执行环境，fn()执行环境；</p>
<h3 id="articleHeader1">执行环境的处理机制</h3>
<p>在这里我们要了解到执行上下文的第一个特点：内部的环境可以访问外部的环境，而外部的环境无法访问内部的环境。</p>
<p>例如：我们可以在fn()中访问到位于foo()中的b，在全局环境中的a，而在foo()中却无法访问到c或者d。</p>
<p>为什么会这样，这就要了解JS处理代码的一个机制了。</p>
<p>我们知道JS的处理过程是以堆栈的方式来处理，JS引擎会把执行环境一个个放入栈里，然后先放进去的后处理，后放进去的先处理，上面这个栗子，最先被放进栈中的是全局环境，然后是foo()，再是fn()，然后处理完一个拿出一个来，所以我们知道为什么foo()不能访问fn()里的了，因为它已经走了。</p>
<h3 id="articleHeader2">执行环境的生命周期</h3>
<p>好了，了解完执行环境的的处理方式，我们要说明执行环境的生命周期。<br>执行环境的生命周期分为两个阶段，这两个阶段描述了执行环境在栈里面做了些什么。</p>
<blockquote><ol>
<li>创建阶段；</li>
<li>执行阶段</li>
</ol></blockquote>
<h4>创建阶段</h4>
<p>执行环境在创建阶段会完成这么几个任务：1.生成变量对象；2.建立作用域链；3.确定this指向</p>
<h4>执行阶段</h4>
<p>到了执行阶段，会给变量赋值，函数引用，然后还有执行其他的代码。</p>
<p>完成了这两个步骤，执行环境就可以准备出栈，一路走好了。</p>
<p>以上就是执行环境的具体执行内容。上面提到了执行环境在创建阶段会生成变量对象，这也是一个很重要的概念，我们下文会详细论述。</p>
<h2 id="articleHeader3">变量对象（variable object）</h2>
<blockquote>变量对象是什么呢？《JS高程》是这样说的：“每个执行环境都有与之关联的变量对象，环境中定义的所有变量和函数都保存在这个对象中。”</blockquote>
<p>那变量对象里有些什么东西呢？看下文：</p>
<h3 id="articleHeader4">变量对象的内容</h3>
<p>在变量对象创建时，经过了这样三个步骤：</p>
<ol>
<li>生成arguments属性；</li>
<li>找到function函数声明，创建属性；</li>
<li>找到var变量声明，创建属性</li>
</ol>
<p>其中值得注意的是：function函数声明的级别比var变量声明的级别要高，所以在实际执行的过程中会先寻找function的声明。</p>
<p>还需要注意的是：在执行环境的执行阶段之前，变量对象中的属性都无法访问，这里还有一个活动对象（activation object）的概念，其实这个概念正是由进入执行阶段的变量对象转化而来。</p>
<p>来看一个栗子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(){
  var a=10;
  function fn(){
    return 5;
  }
}
foo();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">()</span></span>{
  <span class="hljs-keyword">var</span> a=<span class="hljs-number">10</span>;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">return</span> <span class="hljs-number">5</span>;
  }
}
foo();</code></pre>
<p>让我们来看看foo()函数的执行环境：</p>
<p>它会包括三个部分：1.变量对象；2.作用域链；3.this指向对象</p>
<h4>创建阶段：</h4>
<ol>
<li>建立arguments</li>
<li>找到fn()；</li>
<li>找到变量a，undefined；</li>
</ol>
<h4>执行阶段：</h4>
<ol>
<li>变量对象变成活动对象；</li>
<li>arguments还是它~</li>
<li>fn();</li>
<li>a=10;</li>
</ol>
<p>以上就是变量对象的内容了，需要记住这个东西，因为会方便我们了解下文另一个重要的概念：作用域链。</p>
<h2 id="articleHeader5">作用域链（scope chain）</h2>
<blockquote>什么是作用域链？《JS高程》里的文字是：“作用域链的用途，是保证对执行环境有权访问的所有变量和函数的有序访问。”懵不懵逼？反正我第一次看到的时候确实是懵逼了。前面我们说过作用域，那么作用域链是不是就是串在一起的作用域呢？并不是。</blockquote>
<p>作用域和作用域链的关系，用@波同学的话说，<strong>作用域</strong>是一套通过标识符查找变量的规则。而<strong>作用域链</strong>则是这套规则这套规则的具体运行。</p>
<p>是不是还是有点懵逼？还是看例子吧：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(){
  var a=10;
  function fn(){
    return 5;
  }
}
foo();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">()</span></span>{
  <span class="hljs-keyword">var</span> a=<span class="hljs-number">10</span>;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">return</span> <span class="hljs-number">5</span>;
  }
}
foo();</code></pre>
<p>我们还是用上面的栗子，这次我们只看作用域链，根据规则，在一个函数的执行环境的作用域链上，会依次放入自己的变量对象，父级的变量对象，祖级的变量对象.....一直到全局的变量对象。</p>
<p>比如上面这个栗子，fn()的执行环境的作用域链上会有些什么呢？首先是自己的OV，然后是foo()的OV，接着就是全局的OV。而foo()的作用域链则会少一个fn()的OV。（OV是变量对象的缩写）</p>
<p>那这样放有什么好处呢？我们知道“作用域链保证了当前执行环境对符合访问权限的变量和函数的有序访问。”有序！外层函数不能访问内层函数的变量，而内层能够访问外层。正是有了这个作用域链，通过这个有方向的链，我们可以查找标识符，进而找到变量，才能实现这个特性。</p>
<h2 id="articleHeader6">闭包</h2>
<blockquote>好了，终于要讲到这个前端小萌新眼里的小boss了。在技术博客和书里翻滚了将将一周，对闭包的各种解释把我搞得精力憔悴，怀疑人生。以至于在写下这段关于闭包的论述时，也是内心忐忑，因为我也不确定我说的是百分之百正确。</blockquote>
<p>先看看《JS高程》说的：“闭包是指有权访问另一个函数作用域中的变量的函数。”</p>
<p>@波同学的说法是：“当函数可以记住并访问所在的作用域(全局作用域除外)时，就产生了闭包，即使函数是在当前作用域之外执行。”</p>
<p>......</p>
<p>好吧其实我觉得都说的不是太清楚。让我们这样来理解，就是内部函数引用了外部函数的变量对象时，外部函数就是一个闭包。</p>
<p>还是看例子吧。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(){
  var a=20;
  return function(){
    return a;
  }
}
foo()();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">()</span></span>{
  <span class="hljs-keyword">var</span> a=<span class="hljs-number">20</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">return</span> a;
  }
}
foo()();</code></pre>
<p>在这个栗子中，foo()函数内部返回了一个匿名函数，而匿名函数内部引用了外部函数foo()的变量a，由于作用域链，这个引用是有效的，按照JS的机制，foo()执行完毕后，执行环境会失去引用，内存会销毁，但是由于内部的匿名函数的引用，a会被暂时保存下来，罩着a的就是闭包。</p>
<p>return一个匿名函数时创造一个闭包的最简单的方式，实际上创造闭包十分灵活，再看一个栗子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fn = null;
function foo() {
    var a = 2;
    function innnerFoo() { 
        console.log(a);
    }
    fn = innnerFoo; 
}

function bar() {
    fn();
}

foo();
bar(); // 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> fn = <span class="hljs-literal">null</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">innnerFoo</span>(<span class="hljs-params"></span>) </span>{ 
        <span class="hljs-built_in">console</span>.log(a);
    }
    fn = innnerFoo; 
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
    fn();
}

foo();
bar(); <span class="hljs-comment">// 2</span></code></pre>
<p>栗子来自@波同学；</p>
<p>如上，可以看到：通过把innnerFoo()赋值给全局变量fn，内部的函数在当前作用域外执行了，但是这不会影响foo形成了一个闭包。</p>
<h3 id="articleHeader7">闭包和两个不同的案例</h3>
<blockquote>这两组栗子都是在各种书籍和各种博客上司空见惯了的栗子，其实跟闭包的关系不是很大，但是涉及到了函数相关的知识点，所以在这里写下来。也算是积累。</blockquote>
<h4>闭包和变量（见《JS高程》P181）</h4>
<p>一个例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createFunction(){
     var result=new Array();
    for(i=0;i<10;i++){
        result[i]=function(){
              return i;
         }
      }
     return result;
}
alert(createFunction());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createFunction</span>(<span class="hljs-params"></span>)</span>{
     <span class="hljs-keyword">var</span> result=<span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>();
    <span class="hljs-keyword">for</span>(i=<span class="hljs-number">0</span>;i&lt;<span class="hljs-number">10</span>;i++){
        result[i]=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
              <span class="hljs-keyword">return</span> i;
         }
      }
     <span class="hljs-keyword">return</span> result;
}
alert(createFunction());</code></pre>
<p>这个例子并不会如我们以为的返回从0到9的一串索引值。<br>当我们执行createFunction()时，函数内会return result，而我们注意到result是一个数组，而每一个result[i]呢？它返回的则是一个函数，而不是这个函数的执行结果 i。</p>
<p>所以我们想要返回一串索引值的时候，试着选择result数组的其中一个，再加上圆括号让它执行起来，像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="createFunction()[2]()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code style="word-break: break-word; white-space: initial;">createFunction()[<span class="hljs-string">2</span>](<span class="hljs-link"></span>)</code></pre>
<p>这样子就能执行了吗？运行起来发现并没有，执行的结果是一串的i，为什么呢？</p>
<p>原因是在执行createFunction()的时候，i的值已经增加到了10，即退出循环的值，而再要执行result内部的匿名函数时，它能获取到的i就只有10了，所以不管引用多少次，i的值都会是10；</p>
<p>那要如何修改才能达到我们的目的呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createFunction(){
    var result=[];
    for(i=0;i<10;i++){
        result[i]=function(num){
            return function(){
              return num;
            };
        }(i);
    }
    return result;
}
alert(createFunction()[2]());
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createFunction</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">var</span> result=[];
    <span class="hljs-keyword">for</span>(i=<span class="hljs-number">0</span>;i&lt;<span class="hljs-number">10</span>;i++){
        result[i]=<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(num)</span></span>{
            <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
              <span class="hljs-keyword">return</span> num;
            };
        }(i);
    }
    <span class="hljs-keyword">return</span> result;
}
alert(createFunction()[<span class="hljs-number">2</span>]());
    </code></pre>
<p>弹出的警告和索引值一模一样。这又是什么原因呢？</p>
<p>我们执行<code>createFunction()</code>时，把外部的匿名函数的执行结果赋值给了result，返回的result就是十个函数的数组。</p>
<p>而在这个外部函数里，有一个参数num，由于IIFE（立即执行函数）的缘故，循环过程中的i被赋值给了一个个的num，前后一共保存了10个num，为什么能够保存下来呢？因为内部的匿名函数引用了num。而这外部函数就是一个<strong>闭包</strong></p>
<p>接下来，当执行<code>createFunction()[2]()</code>时实际上是执行这个数组result的第三项，即：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function(){
   return num;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
   <span class="hljs-keyword">return</span> num;
};</code></pre>
<p>这个函数。</p>
<p>num值是多少呢？如前所述，正是对应的i。所以返回的值就能够达到我们的预期了。</p>
<blockquote>实际上，我认为这个例子中更重要的是自执行函数这个概念，正是有了自执行，才能形成多对对多的引用，尽管这个例子里确实存在闭包，不过我认为用这个例子来介绍闭包并不是太恰当。</blockquote>
<h3 id="articleHeader8">闭包和this</h3>
<blockquote>this也是JS里一个重中之重。我们知道，JS的this十分灵活的，前面已经介绍过，this的指向在函数执行环境建立时确定。函数中的this的指向是一个萌新们的难点，什么时候它是指向全局环境呢？什么时候它又是指向对象呢？注意：此处讨论的是指函数中的this，全局环境下的this一般情况指向window。</blockquote>
<h4>结论一：this的指向是在函数被调用的时候确定的</h4>
<p>因为当一个函数调用时，一个执行环境就创建了，接着它会执行，这是执行环境的生命周期。所以this的指向是在函数被调用时确定的。</p>
<h4>结论二：当函数执行时，如果这个函数是属于某个对象，调用的方式是以对象的方法进行的，那么this的指向就是这个对象，而其他情况，如函数独立调用，则基本是指向全局对象。</h4>
<p>PS：实际上这个说法不大准确，当函数独立调用时，在严格模式下，this的指向时undefined，而非严格模式下，则时指向全局对象。</p>
<p>为了更好的说明，让我们看一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 20;
var foo = {
    a: 10,
    getA: function () {
        return this.a;
    }
}
console.log(foo.getA()); // 10

var test = foo.getA;
console.log(test());  // 20" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = <span class="hljs-number">20</span>;
<span class="hljs-keyword">var</span> foo = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">10</span>,
    <span class="hljs-attr">getA</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.a;
    }
}
<span class="hljs-built_in">console</span>.log(foo.getA()); <span class="hljs-comment">// 10</span>

<span class="hljs-keyword">var</span> test = foo.getA;
<span class="hljs-built_in">console</span>.log(test());  <span class="hljs-comment">// 20</span></code></pre>
<p>在上面这个例子中，foo.getA()作为对象方法的调用，指向的自然是这个对象，而test虽然指向和foo.getA相同，但是因为是独立调用，所以在非严格模式下，指向的是全局对象。</p>
<blockquote>除了上面的例子，在《JS高程》中还有一个经典的例子，众多博客文章均有讨论，但是看过之后觉得解释还是不够清楚，至少我没完全理解，这里我将试着用自己的语言来解释。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name=&quot;the window&quot;;
var object={
    name:&quot;my object&quot;,    
    getNameFunc:function(){
        return function(){
            return this.name;
        };
    }
};
    
alert(object.getNameFunc()());   // the window" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> name=<span class="hljs-string">"the window"</span>;
<span class="hljs-keyword">var</span> object={
    name:<span class="hljs-string">"my object"</span>,    
    getNameFunc:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
        };
    }
};
    
alert(object.getNameFunc()());   <span class="hljs-comment">// the window</span></code></pre>
<p>在这个带有闭包的例子里，我们可以看到object.getNameFunc()执行的返回是一个函数，再加()执行则是一个直接调用了。所以指向的是全局对象。</p>
<p>如果我们想要返回变量对象怎么办呢？</p>
<p>让我们看一段代码：</p>
<p>var name="the window";</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var object={
name:&quot;my object&quot;,
getFunc:function(){
        return this.name;
}
};
alert(object.getFunc());   //&quot;my object&quot;```" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>
<span class="hljs-keyword">var</span> <span class="hljs-keyword">object</span>={
name:<span class="hljs-string">"my object"</span>,
getFunc:function(){
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
}
};
alert(<span class="hljs-keyword">object</span>.getFunc());   <span class="hljs-comment">//"my object"```</span></code></pre>
<p>我去掉了上面例子的闭包，可以看出在方法调用的情况下，this指向的是对象，那么我们只要在闭包能访问到的位置，同时也是在这个方法调用的同一个作用域里设置一个“中转站”就好了，让我们把这个位置的this赋值给一个变量来存储，然后匿名函数调用这个变量时指向的就会是对象而不是全局对象了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var name=&quot;the window&quot;;
    
    var object={
        name:&quot;my object&quot;,
        getFunc:function(){
            var that=this;
            return function(){
                return that;
            };
        }
    };
    alert(object.getFunc());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>    <span class="hljs-keyword">var</span> name=<span class="hljs-string">"the window"</span>;
    
    <span class="hljs-keyword">var</span> object={
        name:<span class="hljs-string">"my object"</span>,
        getFunc:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            <span class="hljs-keyword">var</span> that=<span class="hljs-keyword">this</span>;
            <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
                <span class="hljs-keyword">return</span> that;
            };
        }
    };
    alert(object.getFunc());</code></pre>
<p>that's all</p>
<h3 id="articleHeader9">闭包的应用</h3>
<blockquote>闭包的应用太多了，最重要的一个就是模块模式了。不过说实话，实在还没上路，所以这里就用一个模块的栗子来结尾吧。（强行结尾）</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function () {
    var a = 10;
    var b = 20;

    function add(num1, num2) {
        var num1 = !!num1 ? num1 : a;
        var num2 = !!num2 ? num2 : b;

        return num1 + num2;
    }

    window.add = add;
})();

add(10, 20);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">10</span>;
    <span class="hljs-keyword">var</span> b = <span class="hljs-number">20</span>;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params">num1, num2</span>) </span>{
        <span class="hljs-keyword">var</span> num1 = !!num1 ? num1 : a;
        <span class="hljs-keyword">var</span> num2 = !!num2 ? num2 : b;

        <span class="hljs-keyword">return</span> num1 + num2;
    }

    <span class="hljs-built_in">window</span>.add = add;
})();

add(<span class="hljs-number">10</span>, <span class="hljs-number">20</span>);</code></pre>
<p>我们需要知道的是，所谓模块利用的就是闭包外部无法访问内部，内部却能访问外部的特性，通过引用了指定的公共变量和方法，达到访问私有变量和方法的目的。模块可以保证模块内部的私有方法和变量不被外部变量污染，进而方便更大规模的开发项目。</p>
<blockquote>so，这篇文就到这里辣，写了一个下午，最最最要感谢的是@波同学，正是读了他出色的教程，才能让我对JS的理解更深一点，他的每一篇技术文章都是非常用心的，事实上，我觉得我的论述仍然不够系统清晰，想要了解得更清晰的朋友可以去简书搜索@波同学阅读他写得技术文章，好了，就这样，债见</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS基础知识：变量对象、作用域链和闭包

## 原文链接
[https://segmentfault.com/a/1190000013050679](https://segmentfault.com/a/1190000013050679)

