---
title: '《javascript高级程序设计》笔记：内存与执行环境' 
date: 2018-12-25 2:30:11
hidden: true
slug: tfv8crbjkf
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://segmentfault.com/a/1190000011917606">上一篇：《javascript高级程序设计》笔记：继承</a><br>近几篇博客都会围绕着图中的知识点展开</p>
<p><span class="img-wrap"><img data-src="/img/bVY0C4?w=1330&amp;h=618" src="https://static.alili.tech/img/bVY0C4?w=1330&amp;h=618" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>由于javascript是一门具有自动垃圾收集机制的编程语言，开发者不必担心内存的分配和回收的问题。因此，<code>内存</code>一词在javascript编程中被开发者提及较少，更有一些非专业计算机相关专业出身的开发人员对javascript中<code>内存</code>的概念全无，但这丝毫不影响<code>内存</code>在编程中的重要程度</p>
<h2 id="articleHeader0">1. 堆内存/栈内存</h2>
<p><strong>1、存放变量的比较</strong></p>
<p>栈内存用于存放基本类型、引用类型的地址和程序的执行（占用内存已知）<br>堆内存用于存放引用类型的真实内容，用于存放对象和函数（占用内存未知）</p>
<p><strong>2、存取方式的比较</strong></p>
<p>栈内存：“先进后出，后进先出”——类比兵兵球盒，仅当上面的出栈才能执行下面的</p>
<p><span class="img-wrap"><img data-src="/img/bVY0C8?w=854&amp;h=782" src="https://static.alili.tech/img/bVY0C8?w=854&amp;h=782" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>堆内存：“随意存取”——类比书橱，不受入栈出栈的影响，需要某个对象或方法时，使用指针引用即可</p>
<p><strong>3、内存为什么区分堆和栈（重点）</strong></p>
<p>内存占用大小一定程度上决定了程序执行的流畅程度，内存区分堆和栈就是从内存管理机制上使程序运行时占用的内存最小（这与垃圾回收机制有关，后续介绍）</p>
<p>当一个方法执行时，每个方法都会建立自己的内存栈（执行环境），在这个方法内定义的变量将会逐个放入这块栈内存里，随着方法的执行结束，这个方法的内存栈也将自然销毁了。因此，所有在方法中定义的变量都是放在栈内存中的；</p>
<p>当我们在程序中创建一个对象时，这个对象将被保存到运行时数据区中，以便反复利用（因为对象的创建成本通常较大），这个运行时数据区就是堆内存。堆内存中的对象不会随方法的结束而销毁，即使方法结束后，这个对象还可能被另一个引用变量所引用（方法的参数传递时很常见），则这个对象依然不会被销毁，只有当一个对象没有任何引用变量引用它时，系统的垃圾回收机制才会在核实的时候回收它</p>
<p><strong>4、基本类型与引用类型（内存分析）</strong></p>
<p>在博客<a href="https://segmentfault.com/a/1190000010641791" target="_blank">《javascript高级程序设计》笔记：值类型与引用类型</a>中有详细讲解</p>
<p><strong>5、垃圾回收</strong></p>
<blockquote><p>javascript 具有自动垃圾收集机制，也就是说，执行环境会负责管理代码执行过程中使用的内存</p></blockquote>
<p>不再用到的内存，没有及时释放，就叫做<strong>内存泄漏</strong>（memory leak）</p>
<p>好比一个餐厅，盘子总是有限的，所以服务员会去巡台回收空盘子<br>（1）自动回收：<code>标记清除</code>会将空盘和装菜的盘作上标识，当服务员巡台时，会收回空盘，释放内存<br>（2）手动回收：手动倒掉了盘子里面的菜（=null），在下次巡台时那盘子就会被收走了<br>（3）内存泄露：装着菜的盘子巡台时无法回收，但没有到客人桌上</p>
<h2 id="articleHeader1">2. 执行环境</h2>
<p>执行环境（execution context）也被称为执行上下文，它是javascript中最为重要的一个概念</p>
<p><strong>执行环境定义了变量或函数有权访问的其他数据，决定了他们各自的行为</strong></p>
<p>每个执行环境都有一个与之关联的<code>变量对象</code>，环境中定义的所有变量和函数都保存在这个对象中（包括arguments/函数/变量）</p>
<p>每次当控制器转到可执行代码(全局或执行函数)的时候，就会进入一个执行上下文。<strong>执行环境创建时，变量对象、作用域链和this指向确定</strong>（和面章节会介绍）</p>
<p>执行上下文可以理解为当前代码的执行环境，它会形成一个<code>作用域</code>。JavaScript中的运行环境大概包括三种情况：<br>（1）全局环境：JavaScript代码运行起来会首先进入该环境<br>（2）函数环境：当函数被调用执行时，会进入当前函数中执行代码<br>（3）eval</p>
<p>因此在一个JavaScript程序中，必定会产生多个执行上下文。<code>栈底永远都是全局上下文，而栈顶就是当前正在执行的上下文</code></p>
<p>下面结合代码和图解分析：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var color = 'blue';

function changeColor() {
  var anotherColor = 'red';

  function swapColors() {
    var tempColor = anotherColor;
    anotherColor = color;
    color = tempColor;
  }

  swapColors();
}

changeColor();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> color = <span class="hljs-string">'blue'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">changeColor</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> anotherColor = <span class="hljs-string">'red'</span>;

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">swapColors</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> tempColor = anotherColor;
    anotherColor = color;
    color = tempColor;
  }

  swapColors();
}

changeColor();</code></pre>
<p>步骤：<br>（1）全局上下文入栈<br>（2）碰到<code>changeColor()</code>后，changeColor的执行上下文入栈<br>（3）碰到<code>swapColors()</code>后，swapColors的执行上下文入栈<br>（4）<code>swapColors()</code>执行完毕，swapColors的上下文从栈中出栈<br>（5）<code>changeColor()</code>执行完毕，changeColor的上下文从栈中出栈</p>
<p>图解：</p>
<p><span class="img-wrap"><img data-src="/img/bVY0Dk?w=1766&amp;h=436" src="https://static.alili.tech/img/bVY0Dk?w=1766&amp;h=436" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>调试图解：<br>（1）进入全局上下文（可以看到变量提升的效果）</p>
<p><span class="img-wrap"><img data-src="/img/bVY0Dm?w=1466&amp;h=784" src="https://static.alili.tech/img/bVY0Dm?w=1466&amp;h=784" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>（2）进入changeColor执行环境</p>
<p><span class="img-wrap"><img data-src="/img/bVY0Dn?w=1414&amp;h=642" src="https://static.alili.tech/img/bVY0Dn?w=1414&amp;h=642" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>（3）进入swapColors执行环境，图中形成了一个闭包closure，里面有变量anotherColor值</p>
<p><span class="img-wrap"><img data-src="/img/bVY0Dq?w=1488&amp;h=648" src="https://static.alili.tech/img/bVY0Dq?w=1488&amp;h=648" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>（4）swapColors的执行环境出栈，回到changeColor执行环境，闭包消失</p>
<p><span class="img-wrap"><img data-src="/img/bVY0Dw?w=1618&amp;h=496" src="https://static.alili.tech/img/bVY0Dw?w=1618&amp;h=496" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>（5）changeColor的执行环境出栈，回到全局环境</p>
<p><span class="img-wrap"><img data-src="/img/bVY0Dz?w=1590&amp;h=506" src="https://static.alili.tech/img/bVY0Dz?w=1590&amp;h=506" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>总结：<br>（1）全局执行环境在js代码开始执行时就创建了，在浏览器关闭时出栈<br>（2）每次某个函数被调用，就会有个新的执行上下文为其创建，即使是调用的自身函数，也是如此<br>（3）函数的执行上下文的个数没有限制<br>（4）同步执行，只有栈顶的上下文处于执行中，其他上下文需要等待</p>
<p><a href="https://segmentfault.com/a/1190000012133116">下一篇：《javascript高级程序设计》笔记：变量对象与预解析</a><br><a href="https://segmentfault.com/a/1190000011880268" target="_blank">经典推荐：《javascript高级程序设计》笔记：原型图解</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
《javascript高级程序设计》笔记：内存与执行环境

## 原文链接
[https://segmentfault.com/a/1190000012118115](https://segmentfault.com/a/1190000012118115)

