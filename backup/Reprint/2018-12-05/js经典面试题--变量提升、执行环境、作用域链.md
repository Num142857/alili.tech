---
title: 'js经典面试题--变量提升、执行环境、作用域链' 
date: 2018-12-05 2:30:09
hidden: true
slug: 0gwjpkja1n8
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">js经典面试题--变量提升、执行环境、作用域链</h3>
<p>今天记录一个js的经典面试题，该编程题涉及到了js的变量提升、执行环境、作用域链问题。</p>
<p>1、变量提升<br>js没有块级作用域，使用var声明的变量会自动添加到最接近的环境中。在函数内部，最接近的环境就是函数的局部环境。如果初始化变量时没有使用var变量，该变量会自动被添加到全局环境。下面两幅图是等价的，结果都是控制台打印出1 2 3 4 5<br><span class="img-wrap"><img data-src="/img/bV8IGZ?w=520&amp;h=89" src="https://static.alili.tech/img/bV8IGZ?w=520&amp;h=89" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>2、 执行环境<br>每个函数都有自己的执行环境。当执行流进入一个函数时(即调用该函数)，函数的环境就会被推入一个环境栈中。而在函数执行之后，将其环境弹出栈，把控制权返回给之前的执行环境。全局执行环境是最外围的一个执行环境。全局执行环境被认为是window对象，全局执行环境直到应用程序退出--例如关闭网页或浏览器---时才会被销毁。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function a(){
    //执行a功能代码
  }
  a();       //函数a的环境被推入一个环境栈中。
  
  function b(){
    //执行b功能代码
    var c=function(){
      //执行c功能代码
      function d(){
        //执行d功能代码
      }
      retrun d();
    }
    return c();
  }
  b();     //函数b、c、d依次被推入一个环境栈中，当调用b()函数时，其依次被弹出" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span><span class="hljs-params">()</span></span>{
    <span class="hljs-comment">//执行a功能代码</span>
  }
  a();       <span class="hljs-comment">//函数a的环境被推入一个环境栈中。</span>
  
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">b</span><span class="hljs-params">()</span></span>{
    <span class="hljs-comment">//执行b功能代码</span>
    <span class="hljs-keyword">var</span> c=<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
      <span class="hljs-comment">//执行c功能代码</span>
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">d</span><span class="hljs-params">()</span></span>{
        <span class="hljs-comment">//执行d功能代码</span>
      }
      retrun d();
    }
    <span class="hljs-keyword">return</span> c();
  }
  b();     <span class="hljs-comment">//函数b、c、d依次被推入一个环境栈中，当调用b()函数时，其依次被弹出</span></code></pre>
<p>其执行的具体流程如下图所示：<br><span class="img-wrap"><img data-src="/img/bV8JiD?w=2184&amp;h=548" src="https://static.alili.tech/img/bV8JiD?w=2184&amp;h=548" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>3、作用域链<br>当代码在一个环境中执行时，会创建变量对象的一个作用域链。作用域链的用途，是保证对执行环境有权访问的所有变量和函数的有序访问。作用域链的前端，始终都是当前执行的代码所在环境的变量对象。作用域链中的下一个变量对象来自包含（外部）环境，而再下一个变量对象则来自下一个包含环境。这样，一致延续到全局执行环境；全局执行环境的变量对象始终都是作用域链中的最后一个对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a=1;
function b(){
    //执行b功能代码
    var bVar=1;
    var c=function(){
      //执行c功能代码
      var cVar=2;
      function d(){
        //执行d功能代码
        var dVar=3;
        cVar=3;
      }
      retrun d();
    }
    return c();
 }
 b();  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> a=<span class="hljs-number">1</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">b</span><span class="hljs-params">()</span></span>{
    <span class="hljs-comment">//执行b功能代码</span>
    <span class="hljs-keyword">var</span> bVar=<span class="hljs-number">1</span>;
    <span class="hljs-keyword">var</span> c=<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
      <span class="hljs-comment">//执行c功能代码</span>
      <span class="hljs-keyword">var</span> cVar=<span class="hljs-number">2</span>;
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">d</span><span class="hljs-params">()</span></span>{
        <span class="hljs-comment">//执行d功能代码</span>
        <span class="hljs-keyword">var</span> dVar=<span class="hljs-number">3</span>;
        cVar=<span class="hljs-number">3</span>;
      }
      retrun d();
    }
    <span class="hljs-keyword">return</span> c();
 }
 b();  </code></pre>
<p><span class="img-wrap"><img data-src="/img/bV8Jvw?w=306&amp;h=415" src="https://static.alili.tech/img/bV8Jvw?w=306&amp;h=415" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>以上代码共涉及4个执行环境：全局环境，b()的局部环境、c()的局部环境、d()的局部环境。全局环境有一个变量a和一个函数b()。b()的局部环境中有一个变量bVar和一个函数c.....依次。位于最里边的函数可以访问外部环境的所有变量和函数，因为外部环境是它的父执行环境。总结：内部环境可以通过作用域链访问所有的外部环境，但外部环境无法访问到内部环境中的任何变量和函数。这些环境之间的联系是线性、有次序的。每个环境都可以向上搜索作用域链，以查询变量和函数名(服从就近原则)；但任何环境都不能通过向下搜索作用域而进入另一个执行环境。</p>
<p>通过上面介绍执行环境与作用域的两幅图可以看出，浏览器在执行js时，首先会将window对象(全局执行环境)压入环境栈，每次执行一个函数时，被调用的函数(按照调用的先后顺序)依次压入环境栈中。而压入栈中的环境类似于容器，往栈底方向的容器包含了上面的容器。容器中存放的是自己的变量和函数以及上面的容器。我们可以把容器的玻璃的材质想象为车窗户(可以从里边看到外面，但是无法从外面看到里边)，当在某个环境(容器)中执行代码块时，就好比我们站在当前容器里，此时我们可以看到外部容器(父级环境)的变量和函数，但却看不到内部容器的任何东西，这就是作用域链。</p>
<hr>
<p>下面进入正题，说下我对该面试题的理解</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1    var foo = {n:1};
2    (function (foo) {
3        console.log(foo.n);
4        foo.n=3;
5        var foo = {n:2};
6        console.log(foo.n);
7    })(foo);
8    console.log(foo.n); 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs basic"><code><span class="hljs-symbol">1 </span>   var foo = {n:<span class="hljs-number">1</span>};
<span class="hljs-symbol">2 </span>   (function (foo) {
<span class="hljs-symbol">3 </span>       console.<span class="hljs-keyword">log</span>(foo.n);
<span class="hljs-symbol">4 </span>       foo.n=<span class="hljs-number">3</span>;
<span class="hljs-symbol">5 </span>       var foo = {n:<span class="hljs-number">2</span>};
<span class="hljs-symbol">6 </span>       console.<span class="hljs-keyword">log</span>(foo.n);
<span class="hljs-symbol">7 </span>   })(foo);
<span class="hljs-symbol">8 </span>   console.<span class="hljs-keyword">log</span>(foo.n); 
</code></pre>
<p>上面的代码其实可以写成这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1    var foo = {n:1};
2    (function (foo) {
3         var foo;
4        console.log(foo.n);
5        foo.n=3;
6        var foo = {n:2};
7        console.log(foo.n);
8    })(foo);
9    console.log(foo.n); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs basic"><code><span class="hljs-symbol">1 </span>   var foo = {n:<span class="hljs-number">1</span>};
<span class="hljs-symbol">2 </span>   (function (foo) {
<span class="hljs-symbol">3 </span>        var foo;
<span class="hljs-symbol">4 </span>       console.<span class="hljs-keyword">log</span>(foo.n);
<span class="hljs-symbol">5 </span>       foo.n=<span class="hljs-number">3</span>;
<span class="hljs-symbol">6 </span>       var foo = {n:<span class="hljs-number">2</span>};
<span class="hljs-symbol">7 </span>       console.<span class="hljs-keyword">log</span>(foo.n);
<span class="hljs-symbol">8 </span>   })(foo);
<span class="hljs-symbol">9 </span>   console.<span class="hljs-keyword">log</span>(foo.n); </code></pre>
<p>1、声明一个变量，为引用类型<br>2和8、声明一个匿名函数，并立即执行，传递的参数是第1行中的foo。将一个对象类型赋值给一个新的变量，由于对象是引用类型，实质上是指将对象的地址赋值给该变量（也就是说这两个变量指向同一个地址空间），因此改变新的变量中的属性值或方法，对应的原来对象的值也会改变。<br>3、原题中的第5行，由于存在变量提升，因此会在函数开始就声明，此时为undefined；然而由于一个变量的声明优先级低于形参，所以这行没有任何效果<br>4、打印形参的foo.n,打印1<br>5、改变第1行变量foo的属性n的值为3；<br>6、重新声明并定义了一个变量，开辟了新的内存空间，n为2<br>7、由于js中的代码是自上而下执行，所以此时输出2<br>9、上面的函数调用结束后，局部变量被销毁，而之前的内存空间值已经变为3，所以输出3<br>所以最终的结果为：1 2 3</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js经典面试题--变量提升、执行环境、作用域链

## 原文链接
[https://segmentfault.com/a/1190000014437648](https://segmentfault.com/a/1190000014437648)

