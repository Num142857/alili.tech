---
title: '和少妇白洁一起学JavaScript' 
date: 2019-01-26 2:30:18
hidden: true
slug: oj62g3qlkcm
categories: [reprint]
---

{{< raw >}}

                    
<p>我不确定JavaScript语言是否应该被称为Object-Oriented，因为Object Oriented是一组语言特性、编程模式、和设计与工程方法的笼统称谓，没有一个详尽和大家都认可的checklist去比较，就很难在主观意见上互相认同。</p>
<p>但JavaScript百分之一百是一门Object语言。</p>
<p>这句话有两个直接含义：</p>
<ol>
<li><p>除了原始类型(primitive type)值之外，一切皆对象，包括函数；</p></li>
<li><p>一切对象都是构造出来的，有一个函数作为它的构造函数（constructor）；</p></li>
</ol>
<p>JavaScript的另一个标志性特性是原型重用(prototype-based reuse)，我在这里故意避免使用继承(inheritance)这个词语，是不想让读者立刻联想C++/Java语言的继承，请忘记它们；</p>
<p>JavaScript里的对象并非是Class的实例化，它没有静态结构的概念；当然这不意味这对象没有结构，但对象的结构只能由构造函数在运行时构造出来，因此构造函数在JavaScript里的地位是很高的，它是唯一负责结构的地方。</p>
<ol><li><p>每个对象都有一个原型，对象可以使用和重载原型对象上的数据成员或方法，这是对象的唯一重用机制；</p></li></ol>
<p>介绍原型概念的文章和书很多，假定你理解原型的基本概念；这里需要指出的问题是，对象之间的属性重用，和面向对象里面说的重用是两回事；</p>
<p>你可以从重用的如此简单的定义看出，它唯一的设计目的是想减少对象的数量，它提供的机制就是让多个对象共享原型对象上的属性，同时又可以有重载能力；</p>
<p>但不要对此浮想连篇，它和Java语言里通过继承重用静态结构和行为是完全两回事，即使说“JavaScript的原型化重用仅仅是行为重用，而Java的重用是结构和行为的双重重用”，这样的表述也没有意义，因为前者在运行时对象之间发生后者在静态编译时发生，一个在说我们发明了活字印刷术让印刷变得更容易，另一个在说我们发明了电脑上的字体，你需要显示哪个字就来到我这里拿；虽然结果有时看起来很像，但是机制上完全风马牛不相及，不要上了阮一峰老师的当。</p>
<p>前面写的这三条，可以作为构造JavaScript对象系统的三个基础假设；</p>
<p>在JavaScript里最最底层的概念，并非你在如何使用JavaScript语言的那些教材中看到的种种编程概念，而是两个词语：<strong>构造</strong>和<strong>原型</strong>(或者说结构与重用)。</p>
<p>每个对象必有构造函数和原型，整个JavaScript系统里你看到的所有东西，都可以在概念或模型上这样去理解，虽然实现上是另一回事。</p>
<p>JavaScript对运行环境(runtime)的假设只有一个，就是<strong>单线程事件模型</strong>，其他关于虚拟机该怎样实现并无定义，也没有bytecode的定义；ECMA262采用了一种类似伪码的方式定义了对对象、属性、函数的基本操作逻辑，所有实现，解释器也好，JIT也好，无论如何执行JavaScript脚本，只要保证语义一致即可；其实这种伪码定义方式本身，就暗示了某种特性，但我们暂且不表。</p>
<p>单线程的事件模型不是万能的，但绝大多数情况下让编程变得简单；缺乏runtime定义使得这门语言并不实用，开发者总是需要完整的东西，但好在JavaScript自诞生起就有了第一个runtime：网络浏览器，这让它有了立足之地，之后又出现Node.js，它又找到一个可以生存的地方。</p>
<p>扯远了，我们说回构造和原型的问题。</p>
<h2 id="articleHeader0">创世纪</h2>
<p>假如今天我们冒充上帝，开始构造JavaScript的对象世界，在这个世界里没有什么不是对象，也遵循前述原则；</p>
<p>我们开始犯愁的第一个问题，似乎我们掉进了鸡生蛋蛋生鸡的逻辑怪圈。</p>
<p>对吧，第一个对象造不出来，因为对象需要构造函数构造，而函数也是对象，所以我们前面说的那个对象必然不是第一个对象。</p>
<p>当然逻辑是逻辑，我们可以先捏几个最原始的对象出来，然后把<code>constructor</code>和<code>__proto__</code>引用装载上去，让它们成为系统最初的亚当和夏娃。反正上帝本来也回答不了亚当的妈是谁的问题，我们也这么做。</p>
<blockquote><p>最初在ECMA262里并没有约定JavaScript实现必须提供能访问每个对象的原型对象的方法，它只是一个概念；但是node/v8和js shell都提供了<code>__proto__</code>这个名字的属性，可以给出任何对象的原型；另一个方法是使用Object.getPrototypeOf方法。</p></blockquote>
<p>注意<code>__proto__</code>和function对象的prototype属性是两回事，prototype是function对象的特有属性(就像Array对象有length这个特有属性)，<code>__proto__</code>才是对象的原型；下面的描述和代码里都使用<code>__proto__</code>这个很别扭的名字指对象的原型，它没歧义，和代码一致，再发明一个名字只会制造更多的混乱。</p>
<p>现在打开node shell。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> let m = {}
undefined
> m.__proto__
{}
> m.__proto__ === m
false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code>&gt; <span class="hljs-keyword">let</span> <span class="hljs-attr">m</span> = {}
undefined
&gt; m.__proto__
{}
&gt; m.<span class="hljs-attr">__proto__</span> === m
<span class="hljs-literal">false</span></code></pre>
<p>我们创建了一个空对象，叫做m，它的原型也是一个空对象，虽然同为空对象但是它们并非一个对象，所以并不相等；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> m.__proto__.__proto__
null
> let op = m.__proto__
undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&gt; m.__proto__.__proto__
<span class="hljs-literal">null</span>
&gt; <span class="hljs-keyword">let</span> op = m.__proto__
<span class="hljs-literal">undefined</span></code></pre>
<p>再沿着原型链往上爬，看看原型的原型是谁？没了。这很好，我们知道m的原型没有原型了，我们先把m的原型叫做<code>op</code>。</p>
<p>谁构造的<code>op</code>呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> op.constructor
[Function: Object]
> op.constructor === Object
true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code>&gt; op.<span class="hljs-keyword">constructor</span>
[<span class="hljs-function"><span class="hljs-keyword">Function</span>:</span> <span class="hljs-keyword">Object</span>]
&gt; op.<span class="hljs-keyword">constructor</span> === <span class="hljs-keyword">Object</span>
true</code></pre>
<p><code>op</code>的构造函数是全局那个叫<code>Object</code>的对象，它本身是一个函数；不要把<code>Object</code>理解成namespace，或者把<code>Object</code>对象上的方法理解为“静态方法”，<code>Object</code>就是一个对象，它被赋值给了全局对象的<code>Object</code>属性，虽然它有特别的功能，但是要把它理解成我们正在构造的对象世界中的一员，它只是在对象世界开天辟地时被构造好了而已，而我们在讨论的就是这个构造的过程。</p>
<p>我们已经回答了<code>op</code>的构造函数和原型都是谁的问题，现在牵扯出来一个<code>Object</code>，我们继续检查；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> Object.constructor
[Function: Function]
> Object.constructor === Function
true
> Object.__proto__
[Function]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs monkey"><code>&gt; Object.constructor
[<span class="hljs-function"><span class="hljs-keyword">Function</span>:</span> <span class="hljs-function"><span class="hljs-keyword">Function</span>]</span>
&gt; Object.constructor === <span class="hljs-function"><span class="hljs-keyword">Function</span></span>
<span class="hljs-literal">true</span>
&gt; Object.__proto__
[<span class="hljs-function"><span class="hljs-keyword">Function</span>]</span></code></pre>
<p><code>Object</code>的构造函数是全局对象上属性叫<code>Function</code>的对象；<code>Object</code>的原型是个匿名函数，按照JavaScript关于构造函数的约定，它应该是构造函数的prototype属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> Object.__proto__ === Function.prototype
true
> let fp = Function.prototype
undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&gt; <span class="hljs-built_in">Object</span>.__proto__ === <span class="hljs-built_in">Function</span>.prototype
<span class="hljs-literal">true</span>
&gt; <span class="hljs-keyword">let</span> fp = <span class="hljs-built_in">Function</span>.prototype
<span class="hljs-literal">undefined</span></code></pre>
<p>我们给这个对象起个名字，叫fp。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> fp
[Function]
> fp.constructor
[Function: Function]
> fp.constructor === Function
true
> fp.__proto__
{}
> fp.__proto__.__proto__
null
> fp.__proto__ === op
true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs monkey"><code>&gt; fp
[<span class="hljs-function"><span class="hljs-keyword">Function</span>]</span>
&gt; fp.constructor
[<span class="hljs-function"><span class="hljs-keyword">Function</span>:</span> <span class="hljs-function"><span class="hljs-keyword">Function</span>]</span>
&gt; fp.constructor === <span class="hljs-function"><span class="hljs-keyword">Function</span></span>
<span class="hljs-literal">true</span>
&gt; fp.__proto__
{}
&gt; fp.__proto__.__proto__
<span class="hljs-literal">null</span>
&gt; fp.__proto__ === op
<span class="hljs-literal">true</span></code></pre>
<p>这个<code>fp</code>也不是很麻烦，我们发现它是一个匿名函数，它的构造函数是<code>Function</code>，而它的原型是<code>op</code>。</p>
<p>最后来看<code>Function</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> Function.constructor
[Function: Function]
> Function.__proto__
[Function]
> Function.__proto__ === fp
true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs monkey"><code>&gt; <span class="hljs-function"><span class="hljs-keyword">Function</span>.<span class="hljs-title">constructor</span></span>
[<span class="hljs-function"><span class="hljs-keyword">Function</span>:</span> <span class="hljs-function"><span class="hljs-keyword">Function</span>]</span>
&gt; <span class="hljs-function"><span class="hljs-keyword">Function</span>.<span class="hljs-title">__proto__</span></span>
[<span class="hljs-function"><span class="hljs-keyword">Function</span>]</span>
&gt; <span class="hljs-function"><span class="hljs-keyword">Function</span>.<span class="hljs-title">__proto__</span> =</span>== fp
<span class="hljs-literal">true</span></code></pre>
<p><code>Function</code>自己耍了一个赖皮，自己是自己的构造函数所以解决了鸡和蛋的问题。<code>Function</code>的原型和prototype属性指向了同一个对象<code>fp</code>。</p>
<p>所以到此为止呢，我们扒开了JavaScript世界里最原始的几个对象，他们的原型关系是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function and Object -> fp -> op -> null" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code style="word-break: break-word; white-space: initial;">F<span class="hljs-function"><span class="hljs-title">unction</span> <span class="hljs-built_in">and</span> Object -&gt;</span> <span class="hljs-function"><span class="hljs-title">fp</span> -&gt;</span> <span class="hljs-function"><span class="hljs-title">op</span> -&gt;</span> null</code></pre>
<p>至于构造函数呢，因为<code>Object</code>是function，它的prototype是<code>op</code>，按照JavaScript的约定：function对象的prototype属性指向的对象应该把<code>constructor</code>属性设置成该function对象，即：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="functionObject.prototype.constructor = functionObject" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">functionObject<span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.constructor</span> = functionObject</code></pre>
<p>同样的道理，<code>Function</code>的prototype是<code>fp</code>，<code>fp</code>的constructor也要设置成<code>Function</code>。</p>
<p>这是JavaScript里最基础的四个对象；其他的一切对象，在模型和概念中都可以构造出来；</p>
<p>如果你在写一个解释器，你在最初就要把这些东西创造出来，然后创造一个global对象（或者叫context），在这个对象上装上<code>Object</code>和<code>Function</code>，让他们成为全局对象，至于<code>op</code>和<code>fp</code>，就让他们藏在里面好了；编程中没有需要用到他们的地方，如果要找到他们，可以用<code>Object.prototype</code>或者<code>Function.prototype</code>来找到。</p>
<p>所以到此为止，我们启动了JavaScript的对象世界，有了<code>Function</code>我们就可以构造函数对象，有了函数我们就可以构造更多的对象，如果语言上允许（即不需要通过native code实现特殊功能），我们可以继续创建<code>Object.prototype</code>和<code>Function.prototype</code>上的那些函数对象并把他们装载上去，在概念模型上，内置对象没有什么了不起，他们仍然可以被理解成被构造出来的对象；</p>
<p>事实上所有的函数作用域和函数内的变量也可以被理解成对象和它的属性，在本文的结尾我们会谈这个问题，当然它只是模型上的；</p>
<p>我们阐述了一切皆对象的含义；这个对象模型够简单吗？我认为是的；它只有对象，函数，原型三个概念。</p>
<blockquote>
<p>一些人说JavaScript是Lisp穿了马甲，从对象模型上是可以成立的；因为Lisp里的数据结构是List，它是一个链表，每个节点有两个slot，一个用于装载值，另一个装载next；而JavaScript对象其实也是链表，只不过它给每个节点增加了一个字符串标签，即所谓的property name；但如果你用<code>for ... in</code>语法遍历对象内部的时候，你仍然能看到内部结构的顺序是稳定的，仍然是链表；</p>
<p>给每个节点加上label是JavaScript设计上非常聪明的地方，因为它让文科生也可以参与如火如荼的编程活动。</p>
</blockquote>
<p>但是这个对象模型说完了好像什么也没有说？怎么JavaScript书上讲的那么多概念都没有提到呢？</p>
<p>这是问题的本质，也是很多Java过来的程序员很费劲的地方；JavaScript利用上述的这个非常简单的对象模型，去<strong>模拟，或者说实现</strong>，其他所有的编程概念。</p>
<p>JavaScript最初的设计目的只是用于非常简单的一些小功能，需要可编程；不管Brenden Eich是天才、拙劣、还是巧合的模仿了Lisp，以及Smalltalk和Self，他把两个非常简单且独一无二的事情结合在了一起：</p>
<p>Lisp是λ Calculus在编程语言上的直接实现；原型重用的意思则是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="JavaScript：让我们消灭必须用静态定义约定动态对象结构的做法吧，编程君！任何静态能定义出来的结构，我们在运行时也可以通过不断的复制获得啊，只是会慢一点点而已。
编程君：内存不够怎么办？
JavaScript：我们有原型啊！
编程君：好吧，但你要请我吃冰激凌。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code><span class="hljs-keyword">JavaScript：让我们消灭必须用静态定义约定动态对象结构的做法吧，编程君！任何静态能定义出来的结构，我们在运行时也可以通过不断的复制获得啊，只是会慢一点点而已。
</span>编程君：内存不够怎么办？
<span class="hljs-keyword">JavaScript：我们有原型啊！
</span>编程君：好吧，但你要请我吃冰激凌。</code></pre>
<p>不谈工程实现，仅仅在概念和模型上纸上谈兵的话，JavaScript语言模型之简单，是很多老牌语言和新兴脚本语言都难以企及的，它非常纯粹。</p>
<h2 id="articleHeader1">函数对象与构造函数</h2>
<p>在谈构造函数之前我们先看一段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 构造对象的方式1
const factory = (a, b) => {

  return {
    a: a,
    b: b,
    sum: function() {
      return this.a + this.b
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 构造对象的方式1</span>
<span class="hljs-keyword">const</span> factory = <span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> {

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">a</span>: a,
    <span class="hljs-attr">b</span>: b,
    <span class="hljs-attr">sum</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.a + <span class="hljs-keyword">this</span>.b
    }
  }
}</code></pre>
<p><code>return</code>语句后面返回的对象，被称为<em>ex nihilo</em>对象，拉丁语，out of nothing的意思，即这个对象没有用一个专门的构造函数去构造，而是用那个全局的<code>Object</code>去构造了。</p>
<p>如果你仅仅是想创建具有同样结构的对象实现功能，这样的工厂方法足够了。但是这样写，一方面，重用不方便；另一方面，如果我只构造几十个这样对象，可能不是什么大问题，但是如果要构造一百万个呢？构造一百万个会引发什么问题？</p>
<p>让我们来重新强调对象的另一个含义：<strong>对象是有生命周期的</strong>；因为函数也是对象，所以函数对象也不例外；这一点是JavaScript和Java的巨大差异，后者的函数，本质上是静态存在的，或者说和程序的生命周期一致。但JavaScript里的函数对象并非如此。</p>
<p>前面的sum属性对应的匿名函数对象，它是什么时候创建呢？在<code>return</code>语句触发<code>Object</code>构造的时候。如果要创建一百万个对象呢？这个函数对象也会被创建一百万次，产生一百万个函数对象实例！</p>
<p>换句话说，这个工厂方法创建的一百万个对象不仅状态各有一份，方法也各有一份，前者是我们的意图，但后者是巨大的负担，虽然运行环境不会真的蠢到去把代码复制一百万份，但函数对象确实存在那么多，对象再小也有基础的内存消耗，数量多时内存消耗不管怎样都会可观的，如果对象具有不只一个函数，那浪费就更可观了。</p>
<p>这是JavaScript的<strong>一切皆对象，包括函数也是对象</strong>的代价。</p>
<p>遇到这样的问题一般有两种办法，一种是修改机制，即前面说的模型，引入新的概念；另一种是加入策略，即在语言实现层面增加约定，但是利用现有机制，不增加概念；</p>
<p>JavaScript的设计者选择了后者，这也是JavaScript的看似古怪的构造函数的由来。</p>
<p>设计者说可以这样来解决问题：如果一个函数对象的目的是构造其他对象（即构造函数），它需要一个对象作为它的合作者，装载所有被构造的对象的公用函数，两者之间的联系这样建立：</p>
<ol>
<li><p>构造函数对象需要具有一个名称为prototype的属性，指向公用函数容器对象；</p></li>
<li><p>公用函数容器对象需要具有一个名称为constructor的属性，指向构造函数对象；</p></li>
</ol>
<blockquote><p>这个公用函数容器对象在创建function对象的时候，如果不是arrow function，它自动就有prototype属性，指向一个空对象；如果是arrow函数，没有这个属性，arrow函数也不可以和new一起使用；</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> function x() {}
undefined
> x.prototype
x {}
> const y = () => {}
undefined
> y.prototype
undefined
>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&gt; <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">x</span>(<span class="hljs-params"></span>) </span>{}
<span class="hljs-literal">undefined</span>
&gt; x.prototype
x {}
&gt; <span class="hljs-keyword">const</span> y = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {}
<span class="hljs-literal">undefined</span>
&gt; y.prototype
<span class="hljs-literal">undefined</span>
&gt;</code></pre>
<p>当调用构造函数时，通过使用<code>new</code>关键字明确表示要构造对象，这时函数的工作方式变了：</p>
<ol>
<li><p>先创建一个空对象N，把它的原型<code>__proto__</code>设置成该构造函数对象的prototype属性；</p></li>
<li><p>把N的<code>constructor</code>属性设置为构造函数对象；</p></li>
<li><p>把N bind成构造函数的this；</p></li>
<li><p>运行构造函数；</p></li>
<li><p>返回新对象N，不管构造函数返回了什么；</p></li>
</ol>
<p><code>new</code>被定义成关键字是为了兼容其他语言使用者的习惯，写成函数也一样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function NEW(constructor, ...args) {
  let obj = Object.create(constructor.prototype)
  obj.construtor = constructor
  constructor.bind(obj)(...args)
  return obj
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">NEW</span>(<span class="hljs-params">constructor, ...args</span>) </span>{
  <span class="hljs-keyword">let</span> obj = <span class="hljs-built_in">Object</span>.create(<span class="hljs-keyword">constructor</span>.prototype)
  obj.construtor = <span class="hljs-keyword">constructor</span>
  <span class="hljs-keyword">constructor</span>.bind(obj)(...args)
  return obj
}</code></pre>
<p>另一个关键字<code>instanceof</code>，则反过来工作，如果表达式是<code>A instanceof B</code>，如果不考虑继承问题，就去判断<code>A.constructor === B</code>即可；继承的问题后面讨论。</p>
<p>理解了这个过程就会明白，JavaScript里的构造函数问题，其实并非在发明构造函数的新语法，而是保持语言模型不变，让他能够<strong>构造共享原型的对象</strong>的一种方式。</p>
<p>这就是为什么在ES5语法里看到的构造函数和它的原型的代码是类似这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function X(name) {  this.name = name }

X.prototype.hello = function() { console.log('hello ' + this.name) }

var x1 = new X('alice')
x1.hello()

var x2 = new X('bob')
x2.hello()
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">X</span>(<span class="hljs-params">name</span>) </span>{  <span class="hljs-keyword">this</span>.name = name }

X.prototype.hello = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello '</span> + <span class="hljs-keyword">this</span>.name) }

<span class="hljs-keyword">var</span> x1 = <span class="hljs-keyword">new</span> X(<span class="hljs-string">'alice'</span>)
x1.hello()

<span class="hljs-keyword">var</span> x2 = <span class="hljs-keyword">new</span> X(<span class="hljs-string">'bob'</span>)
x2.hello()
</code></pre>
<p>但即使需要这样做，上面的写法也不是唯一的写法，也可以这样直接写工厂方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let methods = {
  hello: function() {
    console.log('hello' + this.name)
  }
}

function createX(name) {
  let obj = Object.create(Object.assign({}, methods)) // 使用Object.assign可以merge多个methods
  obj.name = name
  return obj
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> methods = {
  <span class="hljs-attr">hello</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello'</span> + <span class="hljs-keyword">this</span>.name)
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createX</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">let</span> obj = <span class="hljs-built_in">Object</span>.create(<span class="hljs-built_in">Object</span>.assign({}, methods)) <span class="hljs-comment">// 使用Object.assign可以merge多个methods</span>
  obj.name = name
  <span class="hljs-keyword">return</span> obj
}
</code></pre>
<p>同样实现<strong>构造共享原型的对象</strong>，只是返回的对象不具有constructor属性，<code>instanceof</code>没法用，但如果你不需要<code>instanceof</code>，也不需要设计多层的继承，这是可用的方法；</p>
<p>总结一下关于构造函数的这一节；</p>
<p>首先JavaScript在定义函数时，并不区分这个函数是不是构造函数，是否是构造函数取决于你是否使用<code>new</code>调用；</p>
<p>其次，如果一个函数是构造函数，它不是一个人在战斗，它需要和它的prototype属性指向的对象合作，该对象将是构造的对象的原型，请把两个对象而不是一个对象印在脑子里，这对后面理解继承非常关键；</p>
<p>第三，和Java里那种数据成员和方法成员在心理上位于一个对象容器内不同，JavaScript的对象在设计上就要理解为数据（或者状态）在自己身上，方法（函数对象）在原型身上，这仍然是两个对象在合作，<strong>表现得象一个对象</strong>。</p>
<h2 id="articleHeader2">继承</h2>
<p>JavaScript里的继承仍然不是语言特性，在这个问题上我们继续沿用前面的思路：用JavaScript的原型重用能力，去<strong>模拟，或者说实现</strong>Java语言里的<strong>继承形式</strong>。</p>
<p>我们先说思路，假想我们就是Brenden Eich几分钟。</p>
<p>假如我们已经用<strong>构造共享原型的对象</strong>的思路，写了一个构造函数BaseConstructor，它负责创建每个对象的数据或状态属性，也有了一个合作者BaseConstructor.prototype，它提供了方法BaseMethod1, ...；现在我们需要拓展它，要增加一部分状态或者属性，也要增加一部分方法，我们该怎么做？</p>
<p>首先我们考虑拓展方法，这不难，如果我们构建一个对象，把它的原型设置为BaseConstructor.prototype，然后在新对象里添加方法即可；</p>
<p>其次我们未来需要使用的对象应该都以该对象为原型，因为原有方法和扩展方法都能通过它访问；这预示了我们需要一个新的构造函数以该对象作为prototype属性；逻辑上可以是这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Base     <-> Base.prototype
  ^            ^
  |            *
  | call       * __proto__
  |            *
Extended <-> Extended.prototype" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code><span class="hljs-type">Base</span>     &lt;-&gt; <span class="hljs-type">Base</span>.proto<span class="hljs-keyword">type</span>
  ^            ^
  |            *
  | call       * __proto__
  |            *
<span class="hljs-type">Extended</span> &lt;-&gt; <span class="hljs-type">Extended</span>.proto<span class="hljs-keyword">type</span></code></pre>
<p>Extended函数可以创建<code>Extended.prototype</code>里扩展方法所需要的状态或数据成员；但是<code>Base.prototype</code>里需要的状态或者数据成员需要<code>Base</code>来创建，我们肯定不希望把<code>Base</code>里的代码复制一份到<code>Extended</code>内；我们需要调用它来创建原有方法所需的状态或数据成员。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Base(name) { this.name = name}
Base.prototype.printName = function() { console.log(this.name) }

function Extended(name, age) {
  Base.bind(this)(name)
  this.age = age
}
Extended.prototype = Object.create(Base.prototype)
Extended.prototype.constructor = Extended
Extended.prototype.printAge = function() { console.log(this.age) }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Base</span>(<span class="hljs-params">name</span>) </span>{ <span class="hljs-keyword">this</span>.name = name}
Base.prototype.printName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name) }

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Extended</span>(<span class="hljs-params">name, age</span>) </span>{
  Base.bind(<span class="hljs-keyword">this</span>)(name)
  <span class="hljs-keyword">this</span>.age = age
}
Extended.prototype = <span class="hljs-built_in">Object</span>.create(Base.prototype)
Extended.prototype.constructor = Extended
Extended.prototype.printAge = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.age) }</code></pre>
<p>这里tricky的地方有几处：</p>
<p>第一，在<code>Extended</code>函数内，先把<code>this</code> bind到Base构造函数上，然后提供<code>name</code>参数调用它，这样<code>this</code>就会具有<code>printName</code>所需的<code>name</code>属性，实现结构继承；</p>
<p>第二，我们使用<code>Object.create</code>方法创建了一个以<code>Base.prototype</code>为原型的新对象，把它设置为<code>Extended.prototype</code>，实现行为继承；</p>
<p>第三，把<code>Extended.prototype.constructor</code>设置为<code>Extended</code>构造函数，这样我们可以使用<code>instanceof</code>语法糖；</p>
<p>最后我们在<code>Extended</code>函数内创建新的状态或数据属性，我们也在<code>Extended.prototype</code>上添加新的函数方法；</p>
<p>或者我们说我们找到了一种方式既拓展了构造函数构造的新对象的数据属性，也拓展了它的函数属性，沿着两条链平行实施，达到了我们的目的。</p>
<p>在JavaScript里使用这种在原有构造函数及其prototype对象上拓展出一对新的构造函数和prototype对象的拓展方式，我们称之为继承。</p>
<p>因为对象可以重载原型对象的属性，所以在<code>function.prototype</code>的原型链上，重载函数的能力也具有了。</p>
<h2 id="articleHeader3">Class</h2>
<p>JavaScript里没有type系统意义上的Class的概念。<code>class</code>关键字仍然是语法糖。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class A {

  constructor () { // 这是构造函数
  }

  method() { // 这是A.prototype上的方法
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">A</span> </span>{

  <span class="hljs-keyword">constructor</span> () { <span class="hljs-comment">// 这是构造函数</span>
  }

  method() { <span class="hljs-comment">// 这是A.prototype上的方法</span>
  }
}</code></pre>
<p>这个语法比前面分开写构造函数和prototype对象的写法要简洁干净很多，但是带着Java的Class的概念试图去理解它，更容易被误导了。</p>
<p><code>A</code>在这里仍然是函数对象，只不过它只能当构造函数用，必须用<code>new</code>调用；其他还有一些细节差异，不赘述了；</p>
<p>如果是继承呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Base {
  constructor() {}
  method1() {}
}

class Extended extends Base {
  constructor() {
    super()
    //...
  }
  method2() {}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Base</span> </span>{
  <span class="hljs-keyword">constructor</span>() {}
  method1() {}
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Extended</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Base</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">super</span>()
    <span class="hljs-comment">//...</span>
  }
  method2() {}
}</code></pre>
<p>也是大同小异；<code>Extended</code>构造函数内需要调用<code>super()</code>来实现调用<code>Base</code>构造函数构造属性；这一句必须调用，否则没有<code>this</code>，这是class语法和前面ES5语法的一个差异，在ES5语法内，新对象是在调用<code>Extended</code>构造函数时立刻创建的，在class语法中，这个对象是沿着<code>super()</code>向上爬到最顶层构造函数才创建的，所以如果不调用<code>super</code>就没<code>this</code>了。</p>
<p>实际上在JavaScript里的继承，应该当作一种Pattern来理解，即：使用构造函数和它的prototype属性对象合作来<strong>模拟</strong>传统OO语言里的继承形式，把它叫做<code>Inheritance Pattern</code>恰当的多。</p>
<h2 id="articleHeader4">函数作用域</h2>
<p>前面我们曾冒充上帝，假想一个JavaScript程序启动后，如何从零开始构造整个对象世界；现在我们得寸进尺，冒充上帝他妈，考虑站在执行器的视角上，如果拿到一份JavaScript脚本如何执行；</p>
<p>假定我们已经使用了底层语言，例如C/C++，实现了JavaScript的对象模型，即很容易创建对象，维护原型链。</p>
<p>我们先创建一个空对象，把它称为global，先把标准的内置对象都作为全局变量名称装载进去；然后开始运行。</p>
<p>JavaScript是个单线程模型，所以假定我们用栈的方式来实现计算；基本操作符和表达式的栈计算就不多说了，我们只说遇到函数怎么办。</p>
<p>一般来说遇到函数应该约定在栈上处理参数和返回值的方式，但这个无关紧要，有关紧要的问题是我们需要把传统的Function Frame的概念，即对一个函数在栈上分配局部变量的概念，换个思维，我们不用Function Frame，而是创建一个空对象来表式一个Function Frame，我们一行一行的读入代码，遇到局部变量声明就在这个对象上装上一个属性，遇到修改局部变量的时候就给它赋值；</p>
<p>如果这样做，我们就可以把Function Scope(一般说Function Scope指的是代码层面的Lexical Scope，这里我们把Function Scope和Function Frame混用)作为原型链串起来，词法域中外围的Function Scope是原型，内部的Function Scope是对象；这样Function Scope的引用可能出现在栈上，但它本身并非分配在栈上；Function Scope对象的创建是在调用函数时，它的销毁我们可以暂时指望垃圾回收器，可回收的时间是该函数已经完成执行且没有其他Function Scope引用该Scope；</p>
<p>如果你仔细观察在Function Scope构成的链上查找变量名(Identifier)的时候，其逻辑和在原型链上查找属性的方式一模一样；用这样的方式也可以准确找到闭包变量，唯一的区别是这里需要小小的修改一下原型链的约定，原型上的属性可以直接修改，因为闭包变量是可以赋值的；</p>
<p>这就是前面我们说Function Scope也可以当作是对象处理的原因。</p>
<p>你可以想象出来这个解释器可以写得多小和多简单，而且如果没有hoisting，它可以在源文件还没下载完就开始投入运行，而不是一开始就把整个语法树都解析出来；</p>
<p>如果你问为什么早期的JavaScript的<code>var</code>没有block scope支持，因为block scope按照这种思路来说，需要为block scope单独创建对象。</p>
<p>所以在这个讨论里，你能对JavaScript最初呱呱坠地时的一些小想法获得一些感受；它从一开始只想用一个令人震惊的简单的方法做几件简单的小事情，比如赚一个亿，但这并不说明它无能，相反，在数学和编程的世界里，越是简单的事情越有无穷无尽的能量。</p>
<p>写到这里，我想我说完了自己对JavaScript的<strong>一切皆对象</strong>的认知，欢迎探讨。</p>
<p>最后鸣谢少妇白洁愿意出现在本文题目中。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
和少妇白洁一起学JavaScript

## 原文链接
[https://segmentfault.com/a/1190000008449808](https://segmentfault.com/a/1190000008449808)

