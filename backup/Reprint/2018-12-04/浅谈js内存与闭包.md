---
title: '浅谈js内存与闭包' 
date: 2018-12-04 2:30:05
hidden: true
slug: 1ks0ubzibtj
categories: [reprint]
---

{{< raw >}}

                    
<h1>0.前言</h1>
<p>主要结合了内存的概念讲了js的一些的很简单、但是又不小心就犯错的地方。<br>结论：js执行顺序，先定义，后执行，从上到下，就近原则。闭包可以让外部访问某函数内部变量，而且会导致内存泄漏。</p>
<h1>1.先说类型</h1>
<p>在ECMAscript数据类型有基本类型和引用类型，基本类型有Undefined、Null、Boolean、Number、String，引用类型有Object，所有的的值将会是6种的其中之一（数据类型具有动态性，没有定义其他数据类型的必要了）<br>引用类型的值，也就是对象，一个对象是某个引用类型的一个实例，用new操作符创建也可以用字面量的方式（对象字面量创建var obj ={ }）。ECMA里面有很多原生的引用类型，就是查文档的时候看见的那些：Function、Number （是对于原始类型Number的引用类型）、String（是对于原始类型String的引用类型）、Date、Array、Boolean（...）、Math、RegExp等等。<br>在程序运行的时候，整块内存可以划分为常量池（存放基本类型的值）、栈（存放变量）、很大的堆（存放对象）、运行时环境（函数运行时）</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014482438?w=838&amp;h=443" src="https://static.alili.tech/img/remote/1460000014482438?w=838&amp;h=443" alt="1" title="1"></span></p>
<p>基本数据类型的值是直接在常量池里面可以拿到，而引用类型是拿到的是对象的引用</p>
<pre><code class="javascript">var a = 1;
var b = 'hello';
var c = a;</code></pre>
<p>c = a，这种基本数据类型的复制，只是重新复制一份独立的副本，在变量的对象上创建一个新的值，再把值复制到新变量分配的位置上，a、c他们自己的操作不会影响到对方。</p>
<pre><code class="javascript">a++;console.log(a);console.log(c)</code></pre>
<p>显然是输出2、1</p>
<p>obj1和obj2，拿到的是新创建的对象的引用（也就是家里的钥匙，每个人带一把），当操作对象的时候，对象发生改变，另一个obj访问的时候，发现对象也会改。就像，家里有一个人回去搞卫生了，另一个回家发现家里很干净了。</p>
<pre><code class="javascript">var obj1 = new Object();
obj1.name = 'obj1'
var obj2 = obj1
console.log(obj2)  //{name: "obj1"}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014482439?w=838&amp;h=447" src="https://static.alili.tech/img/remote/1460000014482439?w=838&amp;h=447" alt="2" title="2"></span></p>
<p>对于vue，为什么data必须是一个返回一个对象的函数，也是这个道理，避免所有的vue实例共用一套data。所以对于类似于这种情况，我们可以像vue那样处理</p>
<pre><code class="javascript">//data是一个对象的时候，共用一套data
function D(){}
D.prototype.data =  {a:1,b:2}
var a = new D()
var b = new D()
a.data.a = 666
b.data.a //666
//data是一个函数的时候，各自维护自己的data
function D(){
    this.data = this.data()
}
D.prototype.data = function () {
    return {
        a:1,b:2
    }
}
var a = new D()
var b = new D()
a.data.a = 666
b.data.a //1</code></pre>
<p>同样的身为引用类型的函数也是同理</p>
<pre><code class="javascript">var a = function(){console.log(1)}
var b = a;
a = null;
b();a()
//b输出1，a报错：Uncaught TypeError: a is not a function
//a指向函数，b拿到和a一样的指针，然后让a指向空</code></pre>
<p>把a变成null，只是切断了a和函数之间的引用关系，对b没有影响</p>
<h1>2.再说顺序</h1>
<p>大家常听说的先定义后执行，其实就是在栈中先开辟一块内存空间，然后在拿到他所对应的值，基本类型去常量池，引用类型去堆拿到他的引用。大家常说的原始类型值在栈，其实就是这种效果。<br><span class="img-wrap"><img data-src="/img/remote/1460000014482440?w=921&amp;h=456" src="https://static.alili.tech/img/remote/1460000014482440?w=921&amp;h=456" alt="3" title="3"></span></p>
<h2>2.1 为什么引用类型值要放在堆中，而原始类型值要放在栈</h2>
<p>在计算机的数据结构中，栈比堆的运算速度快，Object是一个复杂的结构且可以扩展：数组可扩充，对象可添加属性，都可以增删改查。将他们放在堆中是为了不影响栈的效率。而是通过引用的方式查找到堆中的实际对象再进行操作。<br>因此又引出另一个话题，查找值的时候先去栈查找再去堆查找。</p>
<h2>2.2 为什么先去栈查找再去堆查找</h2>
<p>既然都讲了，栈比堆的运算速度，堆存放的是复杂数据类型。那么简单来说，宁愿大海捞针呢还是碗里捞针呢？</p>
<h1>3.然后到了函数</h1>
<p>先抛出一个问题</p>
<pre><code class="javascript">function a(){console.log(2)};
var a  = function(){console.log(1)};
a()</code></pre>
<p>覆盖？那么交换的结果又是什么呢？</p>
<pre><code class="javascript">var a  = function(){console.log(1)};
function a(){console.log(2)};
a()</code></pre>
<p>都是1，然后有的人就说了，var优先。好的，那为什么var优先？<br><span class="img-wrap"><img data-src="/img/remote/1460000014482441?w=822&amp;h=500" src="https://static.alili.tech/img/remote/1460000014482441?w=822&amp;h=500" alt="4" title="4"></span></p>
<p>先定义后执行，先去栈查找</p>
<p>变量提升，其实也是如此。先定义（开辟一块内存空间，此时值可以说是undefined）后执行（从上到下，该赋值的就赋值，该执行操作的就去操作），就近原则<br>函数声明和函数表达式，有时候不注意，就不小心出错了</p>
<pre><code class="javascript"> a(); function a(){console.log(666)}//666</code></pre>
<p>另一种情况：</p>
<pre><code class="javascript">a(); var a = function (){console.log(666)}//a  is not a function</code></pre>
<p>虽然第一种方法有变量提升，不会出错，正常来说，还是按顺序写，定义语句放前面。如果想严格要求自己，就手动来个严格模式‘use strict’吧。对于框架的开发，需要严谨遵守规则，所以一般会用严格模式。</p>
<h1>4.接着是临时空间</h1>
<p>函数执行的时候，会临时开辟一块内存空间，这块内存空间长得和外面这个一样，也有自己的栈堆，当函数运行完就销毁。</p>
<h2>4.1 eg1：</h2>
<pre><code class="javascript">var a = 10;
function() {
console.log(a);//undefined
var a = 1;
console.log(a)//1
}</code></pre>
<p>宏观来说，只有2步一和二，当执行第二步，就跳到函数内部执行②-⑧<br><span class="img-wrap"><img data-src="/img/remote/1460000014482442?w=805&amp;h=452" src="https://static.alili.tech/img/remote/1460000014482442?w=805&amp;h=452" alt="5" title="5"></span><br>函数外部的a=10完全就没有关系，这里面造成undefined主要因为变量提升，其实准确的顺序是：</p>
<pre><code class="javascript">var a
console.log(a);//undefined
a = 1;
console.log(a)//1</code></pre>
<p>为什么不出去找全局的a？<br>就近原则。为什么就近原则？都确定函数内部有定义了，就不会再去外面白费力气。其实是，函数在自己的作用域内找到就不会再再继续找，类似原型链一样，在构造函数里面找到某个属性就不会去原型找，找不到才去，再找不到就再往上。函数也是，沿着作用域链查找。类似的一个例子，我们用函数声明定义一个函数f，再用一个变量g拿到这个函数的引用，然后在外面用f是访问不了这个函数的，但是在函数内部是能找到f这个名字的：</p>
<pre><code class="javascript">var g = function f(){
   console.log(f)
    }
g()//打印整个函数
f()//报错</code></pre>
<h2>4.2 eg2</h2>
<pre><code class="javascript">function f(){
return function f1(){
       console.log(1)
   }
};
var res = f();
res();
f1()</code></pre>
<p>res(),返回的是里面的函数，如果直接f1（）就报错，因为这是window.f1()<br><span class="img-wrap"><img data-src="/img/remote/1460000014482443?w=731&amp;h=326" src="https://static.alili.tech/img/remote/1460000014482443?w=731&amp;h=326" alt="6" title="6"></span></p>
<ul>
<li>函数声明后，可以通过引用名称查找或者内存地址查找</li>
<li>局部作用域用function声明，声明不等于创建，只有调用函数的时候才创建</li>
<li>函数f有内存地址的话，通过栈找f的内存空间，如果找不到栈中f这个变量，就去堆中找</li>
</ul>
<h1>5.垃圾回收</h1>
<p>进行前端开发时几乎不需要关心内存问题，V8限制的内存几乎不会出现用完的情况，而且我们只要关闭了浏览器，一切都结束。如果是node后端，后端程序往往进行更加复杂的操作，加上长期运行在服务器不重启，如果不关注内存管理，积少成多就会导致内存泄漏。<br>node中的内存第一个部分还是和上面的一样，有栈、堆、运行时环境，另外还有一个缓冲区存放Buffer。你可以通过<code>process.memoryUsage()</code>查看node里面进程内存使用情况。堆中的对象，被划分为新生代和老生代，他们会被不同的垃圾回收机制清理掉。</p>
<h2>5.1新生代</h2>
<p>新生代用Scavenge算法进行垃圾回收，利用复制的方式实现内存回收的算法。<br>他的过程是：</p>
<ul>
<li>将新生代的总空间一分为二，只使用其中一个，另一个处于闲置，等待垃圾回收时使用。使用中的那块空间称为From，闲置的空间称为To</li>
<li>当触发垃圾回收时，V8将From空间中所有存活下来的对象复制到To空间。</li>
<li>From空间所有应该存活的对象都复制完成后，原本的From空间将被释放，成为闲置空间，原本To空间则成为使用中空间，也就是功能交换。</li>
<li>如果某对象已经经历一次新生代垃圾回收而且第二次依旧存活，或者To空间已经使用了25%，都会晋升至老生代</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014525537?w=448&amp;h=277" src="https://static.alili.tech/img/remote/1460000014525537?w=448&amp;h=277" alt="1" title="1"></span></p>
<h2>5.2老生代</h2>
<p>老生代利用了标记-清除（后面又加上了标记-整理）的方式进行垃圾回收。<br>在标记阶段（周期比较大）遍历堆中的所有对象，标记活着的对象，在随后的清除阶段中，只清除没有被标记的对象。每个内存页有一个用来标记对象的位图。这个位图另外有两位用来标记对象的状态，这个状态一共有三种：未被垃圾回收器发现、被垃圾回收器发现但邻接对象尚未全部处理、不被垃圾回收器发现但邻接对象全部被处理。分别对应着三种颜色：白、灰、黑。</p>
<p>遍历的时候，主要是利用DFS。刚刚开始的时候，所有的对象都是白色。从根对象开始遍历，遍历过的对象会变成灰色，放入一个额外开辟的双端队列中。标记阶段的每次循环，垃圾回收器都会从双端队列中取出一个对象染成黑对象，并将邻接的对象染色为灰，然后把其邻接对象放入双端队列。一直循环，最后所有的对象只有黑和白，白色的将会被清理。<br>假设全局根对象是root，那么活对象必然是被连接在对象树上面的，如果是死对象，比如<code>var a = {};a=null</code>我们创建了一个对象，但把他从对象树上面切断联系。这样子，DFS必然找不到他，他永远是白色。<br>此外，在过程中把垃圾对象删除后，内存空间是一块一块地零星散乱地分布，如果是遇到一个需要很大内存空间的对象，需要连续一大片内存存储的对象，那就有问题了。所以还有一个整理的阶段，把对象整理到在内存上连续分布。</p>
<h2>5.3 对比</h2>
<ul>
<li>新生代是经常发生的，老生代发生的周期长</li>
<li>新生代占用的内存小，老生代占用了大部分内存</li>
<li>新生代需要把内存分成两块进行操作，老生代不需要</li>
<li>新生代是基于对象复制，如果对象太多，复制消耗也会很大，所以需要和老生代相互合作。老生代基于DFS，深度遍历每一个活对象</li>
<li>显然老生代花销大，所以他的周期也长，但是比较彻底</li>
</ul>
<h1>6.IIFE和闭包</h1>
<h2>6.1 IIFE</h2>
<p>立即执行函数，形成一个沙盒环境，防止变量污染内部，是做各种框架的好方法<br>先手写一段假的jQuery</p>
<pre><code class="javascript">(function(root){
 var $ = function(){
//代码
}
root.$ = $
})(this)</code></pre>
<p>这样子在内部函数里面写相关的表达式，我们就可以用美元符号使用jQuery（实际上jQuery第一个括号是全局环境判断，真正的函数体放在第二个括号里面，号称世界上最强的选择器sizzle也里面）<br><span class="img-wrap"><img data-src="/img/remote/1460000014482444?w=827&amp;h=500" src="https://static.alili.tech/img/remote/1460000014482444?w=827&amp;h=500" alt="7" title="7"></span></p>
<h2>6.2闭包</h2>
<p>闭包的概念各有各的说法，平时人家问闭包是什么，大概多数人都是说在函数中返回函数、函数外面能访问到里面的变量，这些显而易见的现象，或者把一些长篇大论搬出来。简单来说，就是外部访问内部变量，而且内部临时开辟的内存空间不会被垃圾回收。查找值的时候沿着作用域链查找，找到则停止。<br>对于js各种库，是一个庞大的IIFE包裹着，如果他被垃圾回收了，我们肯定不能利用了。而我们实际上就是能利用他，就是因为他暴露了接口，使得全局环境保持对IIFE内部的函数和变量的引用，我们才得以利用。<br>各种书对于闭包的解释：<br>《权威指南》：函数对象通过作用域链相互关联起来，函数内部变量都可以保持在函数的作用域中，有权访问另一个函数作用域中的变量<br>《忍者秘籍》：一个函数创建时允许自身访问并操作该自身函数以外的变量所创建的作用域<br>《你不知道的js》：是基于词法的作用域书写代码时所产生的结果，当函数记住并访问所在的词法作用域，闭包就产生了<br>闭包的产生，会导致内存泄漏。<br>前面已经说到，js具有垃圾回收机制，如果发现变量被不使用将会被回收，而闭包相互引用，让他不会被回收，一直占据着一块内存，长期持有一块内存的引用，所以导致内存泄漏。</p>
<pre><code class="javascript">var b = 10
function a(){
    var b = 1
    return function c(){//暴露内部函数的接口
        console.log(b)
    }
}
a()()//1，外部拿到内部的引用，临时开辟的内存空间不会被回收

//改写成IIFE形式
var b = 10
var a = (function(){
    var b = 1
    return function c(){
        console.log(b)
    }
})()
a()//1

//改成window对象的一个引用
var b = 10
(function(){
    var b = 1
    window.c =  function(){
        console.log(b)
    }
})()
c()//1

//多个闭包
function a(){
    var s = 1
    return function count(){
        s++
        console.log(s)
    }
}
var b = a()//相当于赋值
var c = a()
b()//2
b()//3
c()//2，各自保持各自的”赋值结果”，互相不干扰

//r被垃圾回收
function a(){
        var r = 1
    var s = 1
    return function count(){
        s++
        console.log(s)
    }
}
var b = a()//我们可以打个断点，在谷歌浏览器看他的调用栈，发现闭包里面没有r了</code></pre>
<p>对于最后一个例子，r、s并不是像一些人认为的那样，有闭包了，r、s都会留下，其实是r已经被回收了。在执行的函数时候，将会为这个函数创建一个上下文ctx，最开始这个ctx是空的，从上到下执行到函数a的闭包声明b时，由于b函数依赖变量s ，因此会将 s 加入b的ctx——ctx2。a内部所有的闭包，都会持有这个ctx2。（所以说，闭包之所以闭包，就是因为持有这个ctx）<br>每一个闭包都会引用其外部函数的ctx（这里是b的ctx2），读取变量s的时候，被闭包捕捉，加入ctx中的变量，接着被分配到堆。而真正的局部变量是r ，保存在栈，当b执行完毕后出栈并且被垃圾回收。而a的ctx被闭包引用，如果有任何一个闭包存活，他对应的ctx都将存活，变量也不会被销毁。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014525538?w=423&amp;h=269" src="https://static.alili.tech/img/remote/1460000014525538?w=423&amp;h=269" alt="image" title="image"></span></p>
<p>我们也听说一句话，尽量避免全局变量。其实也是这样的道理，一个函数返回另一个函数，也就是分别把两个函数按顺序压入调用栈。我们知道栈是先进后出，那全局的变量（也处于栈底），越是不能得到垃圾回收，存活的时间越长。但也许全局变量在某个时候开始就没有作用了，就不能被回收，造成了内存泄漏。所以又引出另一个常见的注意事项：不要过度利用闭包。用得越多，栈越深，变量越不能被回收。</p>
<p>浏览器的全局对象为window，关闭浏览器自然一切结束。Node中全局对象为global，如果global中有属性已经没有用处了，一定要设置为null，因为只有等到程序停止运行，才会销毁。而我们的服务器当然是长期不关机的，内存泄漏积少成多，爆内存是早晚的事情。</p>
<p>Node中，当一个模块被引入，这个模块就会被缓存在内存中，提高下次被引用的速度（缓存代理）。一般情况下，整个Node程序中对同一个模块的引用，都是同一个实例（instance），这个实例一直存活在内存中。所以，如果任意模块中有变量已经不再需要，最好手动设置为null，不然会白白占用内存</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浅谈js内存与闭包

## 原文链接
[https://segmentfault.com/a/1190000014482433](https://segmentfault.com/a/1190000014482433)

