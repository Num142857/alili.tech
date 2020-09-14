---
title: '详解js中的闭包' 
date: 2019-02-01 2:30:10
hidden: true
slug: wzqyoqno6ua
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>在js中，闭包是一个很重要又相当不容易完全理解的要点，网上关于讲解闭包的文章非常多，但是并不是非常容易读懂，在这里以《javascript高级程序设计》里面的理论为基础。用拆分的方式，深入讲解一下对于闭包的理解，如果有不对请指正。</p>
<h2 id="articleHeader1">写在闭包之前</h2>
<p>闭包的内部细节，依赖于函数被调用过程所发生的一系列事件为基础，所以有必要先弄清楚以下几个概念：</p>
<h3 id="articleHeader2">1. 执行环境和活动对象</h3>
<blockquote><p><strong> - 执行环境(execution context)</strong>定义了变量或者函数有权访问的其他数据，每个执行环境都有一个与之关联的<strong>变量对象(variable object)</strong>，执行环境中定义的变量和函数就保存在这个变量对象中；<br>全局执行环境是最外围的一个执行环境，通常被认为是window对象<br>执行环境和变量对象在<strong>运行函数</strong>时生成<br>执行环境中的所有代码执行完以后，执行环境被销毁，保存在其中的变量和函数也随之销毁；(全局执行环境到应用退出时销毁)</p></blockquote>
<h3 id="articleHeader3">2. 作用域链</h3>
<blockquote><p>当代码在一个执行环境中执行时，会创建<strong>变量对象</strong>的一个<strong>作用域链(scope chain)</strong>，作用域链用来指定执行环境有权访问的所有变量和函数的<strong>访问顺序</strong>；<br>作用域链的最前端，始终是<strong>当前代码执行环境的变量对象</strong>，如果这个环境是函数，则其活动对象就是变量对象<br>作用域链的下一个变量对象，来自外部包含环境，再下一个变量对象，来自下一个外部包含环境，以此类推直到全局执行环境<br>在函数执行过程，根据当前执行环境的作用域链来<strong>逐层向外</strong>查找变量，并且进行标识符解析</p></blockquote>
<p>是不是觉得以上的理论很枯燥而且艰涩？因为基本上是从书上引用来的，不着急着理解，先摆在上面，等会结合案例回头再来看！接下来请看样例:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="样例1
<script>
    var a = 2;
    function A(){
         var a = 1;
         return a ;
    }
    console.log(A());//1
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>样例1
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params"></span>)</span>{
         <span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
         <span class="hljs-keyword">return</span> a ;
    }
    <span class="hljs-built_in">console</span>.log(A());<span class="hljs-comment">//1</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>以这段简单的代码为例，根据上面的理论画一下关系图(直接用ps画的，原谅我拙劣的笔迹):<br><span class="img-wrap"><img data-src="/img/bVE6yu?w=959&amp;h=360" src="https://static.alili.tech/img/bVE6yu?w=959&amp;h=360" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>如图所示，在执行函数A的时候，创建了A的执行环境和变量对象，其中A的变量对象和全局变量对象中都含有a变量，根据作用域链从前向后查找，在A的变量对象中找到，所以输出1，执行完毕以后 ，<strong>A的执行环境销毁，A的变量对象由于没有被引用，所以也销毁</strong>；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="样例2
<script>
    function A(){
         var a = 1;
         return a ;
    }
    console.log(a);// 报错  a is not defined
</script>     " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>样例2
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params"></span>)</span>{
         <span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
         <span class="hljs-keyword">return</span> a ;
    }
    <span class="hljs-built_in">console</span>.log(a);<span class="hljs-comment">// 报错  a is not defined</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>     </code></pre>
<p>这个例子比较简单，要画图的话只需要画一个全局变量对即可，因为在js中，外围环境无法访问内围局部变量(其实本质就是作用域链上找不到相应的值)，所以这里会报变量未定义的错误。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="样例3
<script>
      function A(){
         var a = 1;
         function B(){
             if(a==1){
                 console.log(1)
             }
             else
             {
                  console.log(0);
              }
         }
         B();
    }
    A();//1
</script>  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>样例3
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params"></span>)</span>{
         <span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
         <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">B</span>(<span class="hljs-params"></span>)</span>{
             <span class="hljs-keyword">if</span>(a==<span class="hljs-number">1</span>){
                 <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)
             }
             <span class="hljs-keyword">else</span>
             {
                  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">0</span>);
              }
         }
         B();
    }
    A();<span class="hljs-comment">//1</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>  </code></pre>
<p>上面这个例子，在函数A中定义了函数B,关系图如下:  <span class="img-wrap"><img data-src="/img/bVLi3D?w=800&amp;h=536" src="https://static.alili.tech/img/bVLi3D?w=800&amp;h=536" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>从图上可以很清楚的看出，在每个执行环境中可以访问到的变量对象，所以B可以访问A的变量对象和全局变量对象中的变量以及自身变量对象，A可以访问自身变量对象和全局变量对象</p>
<p>关于执行环境和作用域链暂时说到这里，下面进入正题，讲闭包;</p>
<h2 id="articleHeader4">初涉闭包</h2>
<blockquote><p>闭包是指有权访问另一个函数作用域变量的<strong>函数</strong>，创建闭包的通常方式，是在一个函数内部创建另一个函数</p></blockquote>
<p>上文我们提到了，由于作用域链的结构，外围函数是无法访问内部变量的，为了能够访问内部变量，我们就可以使用闭包，<strong>闭包的本质还是函数</strong>，<strong>闭包的本质还是函数</strong><strong>闭包的本质还是函数</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="样例4
<script>
    function A(){
        var x = 1;
        return function(){
            console.log(x);
        }
    }
    var m = A();
    m();//1
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>样例4
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> x = <span class="hljs-number">1</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-built_in">console</span>.log(x);
        }
    }
    <span class="hljs-keyword">var</span> m = A();
    m();<span class="hljs-comment">//1</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>上面就是一个很简单的闭包例子，通过m函数，我们可以获得A函数内部变量的值，这个样例比较简单，看不出什么问题，接下来我们来深入了解一下。<br>-------------------------------从简单到复杂的分割线，请做好准备----------------------------------------------------</p>
<h2 id="articleHeader5">闭包详解</h2>
<h4>难点一:判断作用域指向的变量对象是否相同</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="样例5
<script>
    function A(){
        var x = 1;
        return function(){
            x++;
            console.log(x);
        }
    }
    var m1 = A();//第一次执行A函数
    m1();//2
    m1();//3
    var m2 = A();//第二次执行A函数
    m2();//2
    m1();//4
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>样例5
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> x = <span class="hljs-number">1</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            x++;
            <span class="hljs-built_in">console</span>.log(x);
        }
    }
    <span class="hljs-keyword">var</span> m1 = A();<span class="hljs-comment">//第一次执行A函数</span>
    m1();<span class="hljs-comment">//2</span>
    m1();<span class="hljs-comment">//3</span>
    <span class="hljs-keyword">var</span> m2 = A();<span class="hljs-comment">//第二次执行A函数</span>
    m2();<span class="hljs-comment">//2</span>
    m1();<span class="hljs-comment">//4</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>上面这个例子其实可以引出几个问题:<br>   1.为什么连续执行m1的时候，x的值在递增?<br>   2.定义函数m2的时候，为什么x的值重新从1开始了?<br>   3.运行m2以后，为什么再运行m1，x还是按照之前m1的运行结果继续增长?（其实就是m1和m2里面的x为什么是相互独立，各自维持的？）</p>
<p>其实要解决上面的问题，我们就要用到前面铺垫的知识点了:<br>首先，先画一下结构图，<span class="img-wrap"><img data-src="/img/bVE6Tz?w=1576&amp;h=845" src="https://static.alili.tech/img/bVE6Tz?w=1576&amp;h=845" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>(额，这图画的可能真的有点丑)，不要慌，图上虽然画的有点乱，但是其实很简单:左半部分和上面简单闭包的例子，其实是完全一样的，而右边半部分，与左边其实是完全对称的；注意看图上的重点：<strong>每次执行A函数时，都会生成一个A的活动变量和执行环境，执行完毕以后，A的执行环境销毁，但是活动对象由于被闭包函数引用，所以仍然保留</strong>，所以，最终剩下两个A的变量对象，<strong>因此m1和m2在操作x时，指向的是不同的数据</strong>，</p>
<p>现在来回答上面的三个问题:<br>1.(为什么连续执行m1的时候，x的值在递增?)<br><strong>answer:因为m1在引用的活动对象A一直没有释放(想释放的话可以让m1=null)，所以x的值一直递增。</strong><br>2.定义函数m2的时候，为什么x的值重新从1开始了?<br><strong>answer:因为又一次运行了A函数，生成一个新的A的活动对象，所以m2的作用域链引用的是一个新的x值。</strong><br>3.m1和m2里面的x为什么是相互独立，各自维持的？<br><strong>answer:因为在定义m1和m2的时候，分别运行了A函数，生成了两个活动对象，所以,m1和m2的作用域链是指向不同的A的活动对象的。</strong></p>
<p>好的，到这里先回顾一下前面说到的知识点:</p>
<blockquote><p>执行环境和变量对象在<strong>运行函数</strong>时生成<br>执行环境中的所有代码执行完以后，<strong>执行环境</strong>被销毁，保存在其中的变量和函数也随之销毁；(全局执行环境到应用退出时销毁)</p></blockquote>
<p>感觉理解了吗？接下来，再看看另一个很类似的例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="样例6
 <script>
    function A(){
        var x = 1;
        var m=[];
        m[0] = function(){
            x++;
            console.log(x);
        };
        m[1] = function(){
            x++;
            console.log(x);
        }
         return m;
    }
    var m = A();//第一次运行A,而且只运行这一次
    m[0]();//2
    m[1]();//3
    m[0]();//4
    m[1]();//5
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>样例6
 <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> x = <span class="hljs-number">1</span>;
        <span class="hljs-keyword">var</span> m=[];
        m[<span class="hljs-number">0</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            x++;
            <span class="hljs-built_in">console</span>.log(x);
        };
        m[<span class="hljs-number">1</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            x++;
            <span class="hljs-built_in">console</span>.log(x);
        }
         <span class="hljs-keyword">return</span> m;
    }
    <span class="hljs-keyword">var</span> m = A();<span class="hljs-comment">//第一次运行A,而且只运行这一次</span>
    m[<span class="hljs-number">0</span>]();<span class="hljs-comment">//2</span>
    m[<span class="hljs-number">1</span>]();<span class="hljs-comment">//3</span>
    m[<span class="hljs-number">0</span>]();<span class="hljs-comment">//4</span>
    m[<span class="hljs-number">1</span>]();<span class="hljs-comment">//5</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>这个例子和刚刚十分类似，不同的是，在A内部就先定义了两个函数，可以看出 ，最后的结果与上面的例子有些不同:<br><strong>变量x仍然能保持递增，但是m[0]和m[1]定义的函数，对于x的改变不再是相互独立的</strong>，其实大家估计猜到了，这里的m[0]和m[1]的作用域指向的A的变量对象，其实是同一个，为什么呢?很简单，看看刚刚这段代码，其实是只调用了一次A函数，再看上文那句话:</p>
<blockquote><p>执行环境和变量对象在<strong>运行函数</strong>时生成</p></blockquote>
<p>既然A只执行一次，那么A的活动变量当然也就生成了一个，所以这里m[0]和m[1]的作用域指向同一个A的变量对象</p>
<h4>难点二:判断变量对象中变量的值</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 样例7
 <script>
    function A(){
        var funs=[];
        for(var i=0;i<10;i++){
           funs[i]=function(){
               return i;
           }
        }
        return funs; 
    }
    var funs = A();//定义funs[0]-funs[9]，10个函数
    console.log(funs[0]());//10
    console.log(funs[1]());//10
    console.log(funs[6]());//10
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code> 样例7
 <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> funs=[];
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;<span class="hljs-number">10</span>;i++){
           funs[i]=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
               <span class="hljs-keyword">return</span> i;
           }
        }
        <span class="hljs-keyword">return</span> funs; 
    }
    <span class="hljs-keyword">var</span> funs = A();<span class="hljs-comment">//定义funs[0]-funs[9]，10个函数</span>
    <span class="hljs-built_in">console</span>.log(funs[<span class="hljs-number">0</span>]());<span class="hljs-comment">//10</span>
    <span class="hljs-built_in">console</span>.log(funs[<span class="hljs-number">1</span>]());<span class="hljs-comment">//10</span>
    <span class="hljs-built_in">console</span>.log(funs[<span class="hljs-number">6</span>]());<span class="hljs-comment">//10</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>这个例子其实算是一个经典案例，在很多地方都有提到，执行完毕后 funs数组中，funs[0]-funs[9]存的其实都是一样的,都是一个返回i值的函数，<strong>这个例子容易错误的地方其实在于，弄错了产生执行环境的时机</strong>，还是看这句话：</p>
<blockquote><p>执行环境和变量对象在<strong>运行函数</strong>时生成</p></blockquote>
<p>所以，当执行<code> var funs = A();</code>时，只是<strong>定义</strong>函数，而没有<strong>执行</strong>，真正产生环境变量的时间是在<code>console.log(funs[0]());</code>这三句的时候，此时A的变量对象中i值是什么呢？很简单，<strong>看它return的时候</strong>，i的值，显然，i的值是10，所以，最后三句输出的都是10</p>
<p>好的，针对以上的案例，如果我就是想让fun[i]能够返回i，那应该怎么写呢?在《javascript高级程序设计》中，提供了一种参考的写法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 样例8
 <script>
    function A(){
        var funs=[];
        for(var i=0;i<10;i++){
           funs[i] = function anonymous1(num){
                        return function anonymous2(){
                    return num;
                }
            }(i);
        }
        return funs; 
    }
    var funs = A();//定义funs[0]-funs[9]，10个函数
    console.log(funs[0]());//0
    console.log(funs[1]());//1
    console.log(funs[6]());//6
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code> 样例8
 <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> funs=[];
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;<span class="hljs-number">10</span>;i++){
           funs[i] = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">anonymous1</span>(<span class="hljs-params">num</span>)</span>{
                        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">anonymous2</span>(<span class="hljs-params"></span>)</span>{
                    <span class="hljs-keyword">return</span> num;
                }
            }(i);
        }
        <span class="hljs-keyword">return</span> funs; 
    }
    <span class="hljs-keyword">var</span> funs = A();<span class="hljs-comment">//定义funs[0]-funs[9]，10个函数</span>
    <span class="hljs-built_in">console</span>.log(funs[<span class="hljs-number">0</span>]());<span class="hljs-comment">//0</span>
    <span class="hljs-built_in">console</span>.log(funs[<span class="hljs-number">1</span>]());<span class="hljs-comment">//1</span>
    <span class="hljs-built_in">console</span>.log(funs[<span class="hljs-number">6</span>]());<span class="hljs-comment">//6</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>是不是一看头就大了？没关系，接下来我们慢慢分析，当然，上述代码中anonymous1和anonymous2两个名字是我自己添加上的，为了后面能够更好的说明。<br>首先，先来看看function anonymous1(num){}(i)，这是一个<strong>立即执行函数</strong>，效果和名字一样，定义完之后马上运行结果，<strong>那这里运行的结果是什么呢？就是把i的值立即传递给num这个局部变量</strong>，然后再返回anonymous2，<strong>请注意这个立即执行函数被执行的次数，10次</strong>，再来看看这句话</p>
<blockquote><p>执行环境和变量对象在<strong>运行函数</strong>时生成</p></blockquote>
<p>好的，那现在请回答我：<br><strong>这里面生成了几个anonymous1的活动变量？</strong><br>answer：当然也是10个，<br><strong>那每个anonymous1活动变量中存贮的num值是多少？</strong><br>answer：看anonymous函数return的时候可以知道，存贮的num值就是每次传入的i值，也就是0-9</p>
<p>好了，那现在很明了了，这样的写法其实相当于，<strong>把每次的i值都保存在一个anonymous1活动变量钟，给最内层的anonymous2函数使用</strong></p>
<h2 id="articleHeader6">小结</h2>
<p>写到这里，关于闭包的主要特征和辨别方式已经基本讲到了，个人感觉因为这个问题比较抽象，还是多看看文中以及网上的一些例子，加深理解。以上内容属于个人见解，如果有不同意见，欢迎指出和探讨。希望能对看到的人有所帮助，同时，码字不易(尤其是还要配上灵魂画师级别的配图~)，请尊重作者的版权，转载请注明出处，如作商用，请与作者联系，感谢！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
详解js中的闭包

## 原文链接
[https://segmentfault.com/a/1190000007376061](https://segmentfault.com/a/1190000007376061)

