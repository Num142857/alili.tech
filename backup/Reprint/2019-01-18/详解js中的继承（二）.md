---
title: '详解js中的继承（二）' 
date: 2019-01-18 2:30:34
hidden: true
slug: 0imobok9cq6
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>趁周末结束之前赶紧先把坑填上。上回我们说到了原型链，并且留下了几个思考题，先把答案公布一下。</p>
<ol>
<li><p>在最后一个例子里，console.log(b1.constructor)，结果是什么？<br><strong>答案：function A，因为b1本身没有<code>constructor</code>属性，会沿着原型链向上找到B prototype对象，然后再往上找到A prototype对象，此时找到了<code>constructor</code>属性，也就是指向函数对象A，可参见上文最后一张图片</strong></p></li>
<li><p><code>B.prototype = new A();</code>和 <code>B.prototype.sayB = function(){ console.log("from B") }</code>这两句的执行顺序能不能交换?<br><strong>答案：不能，因为我们说过了，第一句是把改写B函数对象的prototype指向的原型对象，如果我们交换了顺序，是在原先的B的原型对象上绑定了方法，然后再把指针指向新的原型对象，那新的原型对象上自然就没有绑定<code>sayB</code>方法，接下来的<code>b1.sayB()</code>就会报函数未定义错误，</strong></p></li>
<li><p>在最后一个例子里，<code>A</code>看似已经是原型链的最顶层，那<code>A</code>还能再往上吗？<br><strong>答案，可以，因为其实所有的引用类型都默认继承了了<code>Object</code></strong>,也就是说，完整的原型链应该是<code>A prototype</code>的<code>[Prototype]</code>属性指向<code>Object prototype</code>。如图：</p></li>
</ol>
<p><span class="img-wrap"><img data-src="/img/bVKTdR?w=1515&amp;h=1199" src="https://static.alili.tech/img/bVKTdR?w=1515&amp;h=1199" alt="完整的原型链" title="完整的原型链" style="cursor: pointer; display: inline;"></span><br>顺便补充一下，<code>Object prototype</code>上的原生方法，包括我们常用的<code>hasOwnProperty()</code>、<code>isPropertyOf()</code>等。</p>
<h2 id="articleHeader1">接着谈继承</h2>
<p>在上一篇我们讲解了原型链的原理，建议没有理解清楚的读者朋友先理解之前的知识点，避免难点叠加</p>
<h3 id="articleHeader2">原型链的缺陷</h3>
<ol>
<li>
<p>引用类型的值在原型链传递中存在的问题<br>我们知道js中有值类型和引用类型，其中引用类型包括<code>Object</code>.<code>Array</code>等，引用类型的值有一个特点：<strong>在赋值的时候，赋给变量的是它在内存中的地址。</strong>换句话说，被赋值完的变量相当于一个指针，这会有什么问题呢？看例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   function A() {
        this.name = &quot;a&quot; 
        this.color = ['red','green'];         
    }
    function B(){

    }
     //让B的原型对象指向A的一个实例
     B.prototype = new A();
     
     //生成两个个B的实例
     var b1 = new B();
     var b2 = new B();
     //观察color属性
     console.log(b1.name)//a
     console.log(b2.name)//a
     console.log(b1.color)//[red,green]
     console.log(b2.color)//[red,green]
     //改变b1的name和color属性
     b1.name = 'b'
     b1.color.push('black')
     
     //重新观察color属性
     console.log(b1)//b
     console.log(b2)//a
     console.log(b2.name)
     console.log(b1.color)//[&quot;red&quot;, &quot;green&quot;, &quot;black&quot;]
     console.log(b2.color)//[&quot;red&quot;, &quot;green&quot;, &quot;black&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.name = <span class="hljs-string">"a"</span> 
        <span class="hljs-keyword">this</span>.color = [<span class="hljs-string">'red'</span>,<span class="hljs-string">'green'</span>];         
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">B</span>(<span class="hljs-params"></span>)</span>{

    }
     <span class="hljs-comment">//让B的原型对象指向A的一个实例</span>
     B.prototype = <span class="hljs-keyword">new</span> A();
     
     <span class="hljs-comment">//生成两个个B的实例</span>
     <span class="hljs-keyword">var</span> b1 = <span class="hljs-keyword">new</span> B();
     <span class="hljs-keyword">var</span> b2 = <span class="hljs-keyword">new</span> B();
     <span class="hljs-comment">//观察color属性</span>
     <span class="hljs-built_in">console</span>.log(b1.name)<span class="hljs-comment">//a</span>
     <span class="hljs-built_in">console</span>.log(b2.name)<span class="hljs-comment">//a</span>
     <span class="hljs-built_in">console</span>.log(b1.color)<span class="hljs-comment">//[red,green]</span>
     <span class="hljs-built_in">console</span>.log(b2.color)<span class="hljs-comment">//[red,green]</span>
     <span class="hljs-comment">//改变b1的name和color属性</span>
     b1.name = <span class="hljs-string">'b'</span>
     b1.color.push(<span class="hljs-string">'black'</span>)
     
     <span class="hljs-comment">//重新观察color属性</span>
     <span class="hljs-built_in">console</span>.log(b1)<span class="hljs-comment">//b</span>
     <span class="hljs-built_in">console</span>.log(b2)<span class="hljs-comment">//a</span>
     <span class="hljs-built_in">console</span>.log(b2.name)
     <span class="hljs-built_in">console</span>.log(b1.color)<span class="hljs-comment">//["red", "green", "black"]</span>
     <span class="hljs-built_in">console</span>.log(b2.color)<span class="hljs-comment">//["red", "green", "black"]</span></code></pre>
<p>发现问题了吗？我们修改了<code>b1</code>的color和<code>name</code>属性，但是<code>b2</code>的<code>name</code>属性不变，<code>color</code>属性发生了改变。为了搞清楚这里问题，请尝试回答我的问题(想不出来的话，可以自己通过在控制台打印出来验证)：</p>
<ol>
<li><p><code>b1</code>和<code>b2</code>有自己的<code>color</code>属性吗？<br>答案：没有，只是<code>B prototype</code>上有color属性，因为它是<code>A</code>的一个实例，<code>b1</code>和<code>b2</code>其实是通过[Proto]属性访问<code>B prototype</code>上的<code>color</code>属性(指针)，从而访问和操作color数组的；</p></li>
<li><p><code>b1</code>和<code>b2</code>有自己的<code>name</code>属性吗？<br>答案：一开始都没有，当执行了<code>b1.name = 'b'</code>时，相当于b1有了自己的<code>name</code>属性，而<code>b2</code>依然没有<code>name</code>属性。</p></li>
</ol>
<p>所以以上问题的原因来源就是我们前面说的：<strong>引用类型的值在赋值的时候，赋给变量的是它在内存中的地址。</strong>(如果关于值类型和引用类型有没掌握的同学可以先去看看或者私下问我，这里默认这个是已经了解的。)<br>所以在原型链中如果<code>A</code>（其实就是继承中的父类型）含有引用类型的值，那么子类型的实例<strong>共享这个引用类型得值</strong>，也就是上面的color数组，这就是原型链的第一个缺陷。</p>
</li>
<li><p>第二个缺陷是：在创建子类型的实例(如<code>b1</code>,<code>b2</code>)时，无法向父类型的构造函数中传递参数。比如在上面的例子中，如果<code>A</code>的<code>name</code>属性是要传递参数的而不是写死的，那么我们在实例化<code>b1</code>和<code>b2</code>的时候根本没法传参</p></li>
</ol>
<h3 id="articleHeader3">借用构造函数继承</h3>
<p>为了解决引用类型值带来的问题，我们会采用<strong>借用构造函数继承</strong>的方式，又名<strong>*伪造对象或者经典继承</strong>，核心思路是：<strong>我们在子类型的构造函数中调用父类型的构造函数</strong>，这里要用到一个方法<code>call()</code>或者<code>apply()</code>函数，关于这个函数，我这里简单介绍一下，可以简单的理解功能就是，<strong>允许一个对象调用另一个对象的方法</strong>。具体的作用如果大家觉得需要可以在评论区回复，我会后面单独写一下这两个函数。在这里就不展开了。具体实现如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        function A() {
            this.name = &quot;a&quot; 
            this.color = ['red','green'];         
        }
        function B(){
          //“借用”|就体现在这里，子类型B借用了父类型A的构造函数，从而在这里实现了继承
          A.call(this);
        }
       
         
         //生成两个个B的实例
         var b1 = new B();
         var b2 = new B();
         //观察color属性
         console.log(b1.name)//a
         console.log(b2.name)//a
         console.log(b1.color)//['red','green']
         console.log(b2.color)//['red','green']
         //改变b1的name和color属性
         b1.name = 'b'
         b1.color.push('black')
         
         //重新观察属性
         console.log(b1.name)//b
         console.log(b2.name)//a
         console.log(b1.color)//['red','green','black']
         console.log(b2.color)//[&quot;red&quot;, &quot;green&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.name = <span class="hljs-string">"a"</span> 
            <span class="hljs-keyword">this</span>.color = [<span class="hljs-string">'red'</span>,<span class="hljs-string">'green'</span>];         
        }
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">B</span>(<span class="hljs-params"></span>)</span>{
          <span class="hljs-comment">//“借用”|就体现在这里，子类型B借用了父类型A的构造函数，从而在这里实现了继承</span>
          A.call(<span class="hljs-keyword">this</span>);
        }
       
         
         <span class="hljs-comment">//生成两个个B的实例</span>
         <span class="hljs-keyword">var</span> b1 = <span class="hljs-keyword">new</span> B();
         <span class="hljs-keyword">var</span> b2 = <span class="hljs-keyword">new</span> B();
         <span class="hljs-comment">//观察color属性</span>
         <span class="hljs-built_in">console</span>.log(b1.name)<span class="hljs-comment">//a</span>
         <span class="hljs-built_in">console</span>.log(b2.name)<span class="hljs-comment">//a</span>
         <span class="hljs-built_in">console</span>.log(b1.color)<span class="hljs-comment">//['red','green']</span>
         <span class="hljs-built_in">console</span>.log(b2.color)<span class="hljs-comment">//['red','green']</span>
         <span class="hljs-comment">//改变b1的name和color属性</span>
         b1.name = <span class="hljs-string">'b'</span>
         b1.color.push(<span class="hljs-string">'black'</span>)
         
         <span class="hljs-comment">//重新观察属性</span>
         <span class="hljs-built_in">console</span>.log(b1.name)<span class="hljs-comment">//b</span>
         <span class="hljs-built_in">console</span>.log(b2.name)<span class="hljs-comment">//a</span>
         <span class="hljs-built_in">console</span>.log(b1.color)<span class="hljs-comment">//['red','green','black']</span>
         <span class="hljs-built_in">console</span>.log(b2.color)<span class="hljs-comment">//["red", "green"]</span></code></pre>
<p>在这里我们没有采用原型链，而是利用<code>call()</code>方法来实现<strong>在子类型的构造函数中借用父类型的构造函数</strong>，完成了继承，这样继承的结果就是：<code>b1</code>,<code>b2</code><strong>都分别拥有</strong>自己的<code>name</code>和<code>color</code>属性(可以直接<code>console.log(b1)</code>查看对象的属性)，也就是<code>b1</code>和<code>b2</code>完全独立的。这就解决了之前的第一个问题，而且传递参数的问题其实也可以解决，再稍微改一下<code>A</code>函数:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  //这里name改成传递参数的
        function A(name) {
            this.name = name 
            this.color = ['red','green'];         
        }
        function B(name){
          //在这里我们接受一个参数，并且通过call方法传递到A的构造函数中
          A.call(this,name);
        }
       
         
         //生成两个个B的实例
         var b1 = new B('Mike');
         var b2 = new B('Bob');
         //观察属性
         console.log(b1.name)//Mike
         console.log(b2.name)//Bob
         console.log(b1.color)//['red','green']
         console.log(b2.color)//['red','green']
      " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  <span class="hljs-comment">//这里name改成传递参数的</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params">name</span>) </span>{
            <span class="hljs-keyword">this</span>.name = name 
            <span class="hljs-keyword">this</span>.color = [<span class="hljs-string">'red'</span>,<span class="hljs-string">'green'</span>];         
        }
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">B</span>(<span class="hljs-params">name</span>)</span>{
          <span class="hljs-comment">//在这里我们接受一个参数，并且通过call方法传递到A的构造函数中</span>
          A.call(<span class="hljs-keyword">this</span>,name);
        }
       
         
         <span class="hljs-comment">//生成两个个B的实例</span>
         <span class="hljs-keyword">var</span> b1 = <span class="hljs-keyword">new</span> B(<span class="hljs-string">'Mike'</span>);
         <span class="hljs-keyword">var</span> b2 = <span class="hljs-keyword">new</span> B(<span class="hljs-string">'Bob'</span>);
         <span class="hljs-comment">//观察属性</span>
         <span class="hljs-built_in">console</span>.log(b1.name)<span class="hljs-comment">//Mike</span>
         <span class="hljs-built_in">console</span>.log(b2.name)<span class="hljs-comment">//Bob</span>
         <span class="hljs-built_in">console</span>.log(b1.color)<span class="hljs-comment">//['red','green']</span>
         <span class="hljs-built_in">console</span>.log(b2.color)<span class="hljs-comment">//['red','green']</span>
      </code></pre>
<p>其实上面就可以直接写成这样，但是为了让大家更容易理解，故意分开，隔离变量(大家看我这么用心真的不考虑点个赞吗？)，顺便再解释一下<code>A.call(this,name);</code>就是让<code>this</code>对象(这里是指B)调用构造函数<code>A</code>，同时传入一个参数<code>name</code>。</p>
<p>可以看到，借用构造函数继承不会有原型链继承的问题，那为什么不都借用采用构造函数继承的方法呢？原因在于：这种继承方式，所有的属性和方法都要在构造函数中定义，比如我们这里也要绑定之前的<code>sayA()</code>方法并继承，就只能写在<code>A</code>的构造函数里面，而写在<code>A prototype</code>的的方法，没法通过这种方式继承，而把所有的属性和方法都要在构造函数中定义的话，就<strong>不能对函数方法进行复用</strong>.</p>
<h3 id="articleHeader4">组合继承</h3>
<p>学习了原型链的继承和借用构造函数的继承后，我们可以发现，这两种方法的优缺点刚好互补：</p>
<ul>
<li><p>原型链继承可以把方法定义在原型上，从而复用方法</p></li>
<li><p>借用构造函数继承法可以解决引用类型值的继承问题和传递参数问题</p></li>
</ul>
<p>因此，就自然而然的想到，结合这两种方法，于是就有了下面的<strong>组合继承</strong>，也叫<strong>伪经典继承</strong>，（前面的借用构造函数是经典继承，可以联系起来），具体实现如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function A(name) {
            this.name = name 
            this.color = ['red','green'];     
        }
        A.prototype.sayA = function(){
          console.log(&quot;form A&quot;)
        }
        function B(name,age){
          //借用构造函数继承
          A.call(this,name);
          this.age = age;
        }

        //原型链
        B.prototype = new A();
        B.prototype.sayB = function(){
          console.log(&quot;form B&quot;)
        }
         
         //生成两个个B的实例
         var b1 = new B('Mike',12);
         var b2 = new B('Bob',13);
         //观察color属性
         console.log(b1)//{name:'Mike'...}
         console.log(b2)//{name:'Bob'...}
         b1.sayA()//from A
         b2.sayB()//from B" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params">name</span>) </span>{
            <span class="hljs-keyword">this</span>.name = name 
            <span class="hljs-keyword">this</span>.color = [<span class="hljs-string">'red'</span>,<span class="hljs-string">'green'</span>];     
        }
        A.prototype.sayA = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"form A"</span>)
        }
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">B</span>(<span class="hljs-params">name,age</span>)</span>{
          <span class="hljs-comment">//借用构造函数继承</span>
          A.call(<span class="hljs-keyword">this</span>,name);
          <span class="hljs-keyword">this</span>.age = age;
        }

        <span class="hljs-comment">//原型链</span>
        B.prototype = <span class="hljs-keyword">new</span> A();
        B.prototype.sayB = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"form B"</span>)
        }
         
         <span class="hljs-comment">//生成两个个B的实例</span>
         <span class="hljs-keyword">var</span> b1 = <span class="hljs-keyword">new</span> B(<span class="hljs-string">'Mike'</span>,<span class="hljs-number">12</span>);
         <span class="hljs-keyword">var</span> b2 = <span class="hljs-keyword">new</span> B(<span class="hljs-string">'Bob'</span>,<span class="hljs-number">13</span>);
         <span class="hljs-comment">//观察color属性</span>
         <span class="hljs-built_in">console</span>.log(b1)<span class="hljs-comment">//{name:'Mike'...}</span>
         <span class="hljs-built_in">console</span>.log(b2)<span class="hljs-comment">//{name:'Bob'...}</span>
         b1.sayA()<span class="hljs-comment">//from A</span>
         b2.sayB()<span class="hljs-comment">//from B</span></code></pre>
<p>这个例子只是对上面的例子稍作修改：</p>
<ol>
<li><p>我们在<code>A prototype</code>上定义了<code>sayA()</code> ，在<code>B prototype</code> 定义了<code>sayB()</code></p></li>
<li><p>我们增加了<code>B.prototype = new A();</code>原型链</p></li>
</ol>
<p>最终实现的效果就是，b1和b2都有各自的属性，同时方法都定义在两个原型对象上，这就达到了我们的目的：<strong>属性独立，方法复用</strong>，这种继承的理解相对简单，因为就是把前两种继承方式简单的结合一下，<strong>原型链负责原型对象上的方法，call借用构造函数负责让子类型拥有各自的属性。</strong><br>组合继承是js中最常用的继承方式</p>
<h3 id="articleHeader5">原型式继承</h3>
<p>原型式继承与之前的继承方式不太相同，原理上相当于<strong>对对象进行一次浅复制</strong>，浅复制简单的说就是：把<strong>父对像的属性，全部拷贝给子对象</strong>。但是我们前面说到，由于<strong>引用类型值的赋值特点，所以属性如果是引用类型的值，拷贝过去的也仅仅是个指针，拷贝完后父子对象的指针是指向同一个引用类型的</strong>（关于深复制和浅复制如果需要细讲的同样可以在评论区留言。）原型式继承目前可以通过<code>Object.create()</code>方式来实现，(这个函数的原理我不想在这里提，因为我希望读者在看完这里内容以后自己去查阅一下这个内容)本文只讲实现方式：<br><code>Object.create()</code>接收两个参数：</p>
<ul>
<li><p>第一个参数是作为新对象的原型的对象</p></li>
<li><p>第二个参数是定义为新对象增加额外属性的对象（这个是可选属性）</p></li>
<li><p>如果没有传递第二个参数的话，就相当于直接运行<code>object()</code>方法（这个方法如果不懂直接百度就好）<br>上面的说法可能有点拗口，换句话说：</p></li>
</ul>
<p>比如说我们现在要创建一个新对象<code>B</code>，那么要先传入第一个参数对象<code>A</code>，这个A将被作为<code>B prototype</code>;然后可以再传入一个参数对象<code>C</code>，<code>C</code>对象中可以定义我们需要的一些额外的属性。来看例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var A  = {
        name:'A',
        color:['red','green']
    }

    //使用Object.create方法先复制一个对象
    var B = Object.create(A);
    B.name = 'B';
    B.color.push('black');

    //使用Object.create方法再复制一个对象
    var C = Object.create(A);
    C.name = 'C';
    B.color.push('blue');
    console.log(A.name)//A
    console.log(B.name)//B
    console.log(C.name)//C
    console.log(A.color)//[&quot;red&quot;, &quot;green&quot;, &quot;black&quot;, &quot;blue&quot;]
         " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code>    var A  = {
        <span class="hljs-keyword">name</span>:<span class="hljs-string">'A'</span>,
        <span class="hljs-built_in">color</span>:[<span class="hljs-string">'red'</span>,<span class="hljs-string">'green'</span>]
    }

    <span class="hljs-comment">//使用Object.create方法先复制一个对象</span>
    var B = Object.create(A);
    B.<span class="hljs-keyword">name</span> = <span class="hljs-string">'B'</span>;
    B.<span class="hljs-built_in">color</span>.push(<span class="hljs-string">'black'</span>);

    <span class="hljs-comment">//使用Object.create方法再复制一个对象</span>
    var C = Object.create(A);
    C.<span class="hljs-keyword">name</span> = <span class="hljs-string">'C'</span>;
    B.<span class="hljs-built_in">color</span>.push(<span class="hljs-string">'blue'</span>);
    console.<span class="hljs-built_in">log</span>(A.<span class="hljs-keyword">name</span>)<span class="hljs-comment">//A</span>
    console.<span class="hljs-built_in">log</span>(B.<span class="hljs-keyword">name</span>)<span class="hljs-comment">//B</span>
    console.<span class="hljs-built_in">log</span>(C.<span class="hljs-keyword">name</span>)<span class="hljs-comment">//C</span>
    console.<span class="hljs-built_in">log</span>(A.<span class="hljs-built_in">color</span>)<span class="hljs-comment">//["red", "green", "black", "blue"]</span>
         </code></pre>
<p>在这个例子中，我们只传入第一个参数，所以<code>B</code>和<code>C</code>都是对<code>A</code><strong>浅复制</strong>的结果，由于<code>name</code>是值类型的，<code>color</code>是引用类型的，所以ABC的name值独立，color属性指向同一个对象。接下来举个传递两个参数的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var A  = {
        name:'A',
        color:['red','green'],
        sayA:function(){
            console.log('from A');
        }
    };

    //使用Object.create方法先复制一个对象
    var B = Object.create(A,{
        name:{
          value:'B'
        }
    });
    console.log(B)//Object{name:'B'}
    B.sayA()//'from A'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">var</span> A  = {
        <span class="hljs-attr">name</span>:<span class="hljs-string">'A'</span>,
        <span class="hljs-attr">color</span>:[<span class="hljs-string">'red'</span>,<span class="hljs-string">'green'</span>],
        <span class="hljs-attr">sayA</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'from A'</span>);
        }
    };

    <span class="hljs-comment">//使用Object.create方法先复制一个对象</span>
    <span class="hljs-keyword">var</span> B = <span class="hljs-built_in">Object</span>.create(A,{
        <span class="hljs-attr">name</span>:{
          <span class="hljs-attr">value</span>:<span class="hljs-string">'B'</span>
        }
    });
    <span class="hljs-built_in">console</span>.log(B)<span class="hljs-comment">//Object{name:'B'}</span>
    B.sayA()<span class="hljs-comment">//'from A'</span></code></pre>
<p>这个例子就很清楚的表明了这个函数的作用了，传入的<code>A</code>对象被当做<code>B</code>的原型，所以生成<code>B</code>对象没有sayA()方法，却可以调用该方法(类似于通过原型链)，同时我们在第二个参数中修改了<code>B</code>自己的<code>name</code>，所以就实现了这种<strong>原型式继承</strong>。原型式继承的好处是：如果我们只是简单的想保持一个对象和另一个对象类似，不必大费周章写一堆代码，直接调用就能实现</p>
<h3 id="articleHeader6">寄生式继承</h3>
<p>寄生式继承和原型继承联系紧密，思路类似于<strong>工厂模式,即创建一个只负责封装继承过程的函数，在函数中根据需要增强对象，最后返回对象</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" function createA(name){
    //创建新对象
    var obj = Object(name);
    //增强功能
     obj.sayO = function(){
         console.log(&quot;from O&quot;)
     };
    //返回对象
    return obj;
     
}
var A = {
    name:'A',
    color:['red','green','blue']
};
//实现继承
var  B = createA(A);
console.log(B)//Object {name: &quot;A&quot;, color: Array[3]}
B.sayO();//from O" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createA</span>(<span class="hljs-params">name</span>)</span>{
    <span class="hljs-comment">//创建新对象</span>
    <span class="hljs-keyword">var</span> obj = <span class="hljs-built_in">Object</span>(name);
    <span class="hljs-comment">//增强功能</span>
     obj.sayO = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
         <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"from O"</span>)
     };
    <span class="hljs-comment">//返回对象</span>
    <span class="hljs-keyword">return</span> obj;
     
}
<span class="hljs-keyword">var</span> A = {
    <span class="hljs-attr">name</span>:<span class="hljs-string">'A'</span>,
    <span class="hljs-attr">color</span>:[<span class="hljs-string">'red'</span>,<span class="hljs-string">'green'</span>,<span class="hljs-string">'blue'</span>]
};
<span class="hljs-comment">//实现继承</span>
<span class="hljs-keyword">var</span>  B = createA(A);
<span class="hljs-built_in">console</span>.log(B)<span class="hljs-comment">//Object {name: "A", color: Array[3]}</span>
B.sayO();<span class="hljs-comment">//from O</span></code></pre>
<p>继承的结果是<code>B</code>拥有<code>A</code>的所有属性和方法，而且具有自己的sayO()方法，效果和原型式继承很相似，读者可以比较一下寄生式继承和原型式继承的相似和区别。</p>
<h3 id="articleHeader7">寄生组合式继承</h3>
<p>终于写到最后一个继承了，我们在之前讲了5种继承方式，分别是<strong>原型链</strong>，<strong>借用构造函数继承</strong>，<strong>组合继承</strong>，<strong>原型式继承</strong>，<strong>寄生式继承</strong>，其中，前三种联系比较紧密，后面两种也比较紧密，而我们要讲的最后一种，是和<strong>组合继承</strong>还有<strong>寄生式继承</strong>有关系的。（看名字就知道了嘛）</p>
<p><em>友情提示：如果看到这里有点累的读者可以先休息一下，因为虽然已经分了一二两篇，本文的篇幅还是稍长（我都打了两个多小时了），而且如果先把之前的理解清楚，比较容易理解最后一种继承。</em></p>
<h4>组合继承仍有缺陷</h4>
<p>我们在之前说过，最常用的继承方式就是<strong>组合继承</strong>，但是看似完美的组合继承依然有缺点：<strong>子类型会两次调用父类型的构造函数</strong>，一次是在<strong>子类型的构造函数里</strong>，另一次是在<strong>实现原型链的步骤</strong>,来看之前的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function A(name) {
            this.name = name 
            this.color = ['red','green'];     
        }
        A.prototype.sayA = function(){
          console.log(&quot;form A&quot;)
        }
        function B(name,age){
         //第二次调用了A
          A.call(this,name);
          this.age = age;
        }

        //第一次调用了A
        B.prototype = new A();
        B.prototype.sayB = function(){
          console.log(&quot;form B&quot;)
        }
         

         var b1 = new B('Mike',12);
         var b2 = new B('Bob',13);
          console.log(B.prototype)//A {name: undefined, color: Array[2]}
       " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params">name</span>) </span>{
            <span class="hljs-keyword">this</span>.name = name 
            <span class="hljs-keyword">this</span>.color = [<span class="hljs-string">'red'</span>,<span class="hljs-string">'green'</span>];     
        }
        A.prototype.sayA = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"form A"</span>)
        }
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">B</span>(<span class="hljs-params">name,age</span>)</span>{
         <span class="hljs-comment">//第二次调用了A</span>
          A.call(<span class="hljs-keyword">this</span>,name);
          <span class="hljs-keyword">this</span>.age = age;
        }

        <span class="hljs-comment">//第一次调用了A</span>
        B.prototype = <span class="hljs-keyword">new</span> A();
        B.prototype.sayB = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"form B"</span>)
        }
         

         <span class="hljs-keyword">var</span> b1 = <span class="hljs-keyword">new</span> B(<span class="hljs-string">'Mike'</span>,<span class="hljs-number">12</span>);
         <span class="hljs-keyword">var</span> b2 = <span class="hljs-keyword">new</span> B(<span class="hljs-string">'Bob'</span>,<span class="hljs-number">13</span>);
          <span class="hljs-built_in">console</span>.log(B.prototype)<span class="hljs-comment">//A {name: undefined, color: Array[2]}</span>
       </code></pre>
<p>在第一次调用的时候，生成了<code>B.prototype</code>对象，它具有<code>name</code>和<code>color</code>属性，因为它是<code>A</code>的一个实例；第二次调用的时候，就是实例化<code>b1</code>和<code>b2</code>的时候，这时候<code>b1</code>和<code>b2</code>也具有了<code>name</code>和<code>color</code>属性，我们之前说过，原型链的意义是：<strong>当对象本身不存在某个属性或方法的时候，可以沿着原型链向上查找，如果对象自身已经有某种属性或者方法，就访问自身的</strong>，但是我们现在发现，通过组合继承，只要是<code>A</code>里面原有的属性，<code>B prototype</code>对象一定会有，<code>b1</code>和<code>b2</code>肯定也会有，这样就造成了一种浪费：<code>B prototyope</code>上的属性其实我们根本用不上，为了解决这个问题，我们采用寄生组合式继承。<br>寄生组合式继承的核心思路是其实就是换一种方式实现<code> B.prototype = new A();</code>从而避免两次调用父类型的构造函数，官方定义是：<strong>使用寄生式继承来继承父类型的原型，然后将结果指定给子类型的原型，</strong>。`这句话不容易理解，来看例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//我们一直默认A是父类型，B是子类型
function inheritPrototype(B,A){
    //复制一个A的原型对象
    var pro  = Object(A.prototype);
    //改写这个原型对象的constructor指针指向B
    pro.constructor = B;
    //改写B的prototype指针指向这个原型对象
    B.prototype = pro;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code>//我们一直默认<span class="hljs-type">A</span>是父类型，<span class="hljs-type">B</span>是子类型
<span class="hljs-title">function</span> inheritProto<span class="hljs-keyword">type</span>(<span class="hljs-type">B</span>,<span class="hljs-type">A</span>){
    //复制一个<span class="hljs-type">A</span>的原型对象
    var pro  = <span class="hljs-type">Object</span>(<span class="hljs-type">A</span>.prototype);
    //改写这个原型对象的constructor指针指向<span class="hljs-type">B</span>
    pro.constructor = <span class="hljs-type">B</span>;
    //改写<span class="hljs-type">B</span>的prototype指针指向这个原型对象
    <span class="hljs-type">B</span>.prototype = pro;
}</code></pre>
<p>这个函数很简短，只有三行，函数内部发生的事情是:<strong>我们复制一个A的原型对象，然后把这个原型对象替换掉B的原型对象</strong>。为什么说这样就代替了<code> B.prototype = new A();</code>,不妨思考一下，<strong>我们最初为什么要把B的prototype属性指向A的一个实例?</strong>无非就是想得到<code>A的prototype的一个复制品</code>，然后实现原型链。而现在我们这样的做法，同样达到了我们的母的目的，而且，<strong>此时B的原型对象上不会再有A的属性了，因为它不是A的实例。</strong>因此，只要把将上面的<code> B.prototype = new A();</code>，替换成<code>inheritPrototype(B,A)</code>，就完成了寄生组合式继承。</p>
<p>寄生组合式继承保持了组合继承的优点，又避开了组合继承会有无用属性的缺陷，被认为是最理想的继承方式。</p>
<h2 id="articleHeader8">小结</h2>
<p>终于写完了！！ 明天还得起早去上班，下一次更新可能会放在这一周的周末。关于这一篇内容，建议的阅读方式是<strong>先读前三种继承方式，再看后两种继承，都理解的差不多了，就可以看最后一种继承方式了。</strong>中间注意消化和休息。最后再提一下吧：<strong>如果喜欢本文，请大方的点一下右上角的推荐和收藏（反正你们还是喜欢只收藏不推荐），虽然说写这个一方面是为了自己巩固知识，但是为了让读者更容易理解，我尽量都是采用拆解的方式来讲，而且穿插了新知识的时候都会给出解释，并不是直接搬运书本知识过来，那样毫无意义。这么做还是希望写的文章能够更有价值，让更多人能够得到帮助！</strong>以上内容属于个人见解，如果有不同意见，欢迎指出和探讨。请尊重作者的版权，转载请注明出处，如作商用，请与作者联系，感谢！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
详解js中的继承（二）

## 原文链接
[https://segmentfault.com/a/1190000008754962](https://segmentfault.com/a/1190000008754962)

