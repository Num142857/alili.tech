---
title: 'javascript this的学习总结' 
date: 2018-12-26 2:30:14
hidden: true
slug: w0a2a335zdm
categories: [reprint]
---

{{< raw >}}

                    
<p>刚入门javascript，关于this的学习，花了自己挺多的时间，做了比较多的功课，看了一篇又一篇的文章，也看了一些书籍，今天就结合看的那些东西总结下自己所学到的东西，方便留着以后回看，进一步的学习，这篇文章会不断的更新，不断的更新自己的想法，现在还是一个入门不久的小白，若有错误，恳请指出！</p>
<p>this这个关键字在整个javascript中用处挺广泛的，例如，在闭包，对象等中都会用到，掌握好this个人认为是学好javascript的关键之一了，当然其中还有：闭包、原型、原型链、对象等理论基础也是几个关键点，都得用心的学习。</p>
<p><strong>函数中的调用</strong></p>
<p>javascript函数中this的指向不是在函数定义的时候确定的，而是在函数调用时确定的，用我自己的话来说：就是看这个函数是在什么环境下被调用的，如果在全局环境下调用这个函数，那么这个函数中的this就指向了window，看下面的这个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var a = 2;
    function  foo() {
        console.log(this.a);//2
    }
    foo();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span>  <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a);<span class="hljs-comment">//2</span>
    }
    foo();</code></pre>
<p>函数foo（）的调用是在全局环境下调用的，即这个函数中的this指向的就是window（其实这也可以叫函数的默认绑定，在后面我会介绍），函数控制台输出的就是window.a,函数内部即使没有定义变量，同样也是可以输出a的值，这其中也涉及到了作用域链的相关知识点，由内向外搜索，这里就不解释了，这个可以自己去了解。<br> 加大一点难度，看看这个例子，可能会让你开始有点迷惑，我自己在不是很理解this在函数中的调用，是很迷惑的，不懂，相关知识点一遍一遍的反复的看，大家来看看，是上面的例子的改版：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var a = 2;
    function  foo() {
        var a = 3;
        console.log(this.a);//2
    }
    foo();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span>  <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> a = <span class="hljs-number">3</span>;
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a);<span class="hljs-comment">//2</span>
    }
    foo();</code></pre>
<p>这个函数foo（）的输出值，大家应该会感到很意外，我去，a怎么会输出的是2，不应该是3的吗，是不是有问题啊，哈哈哈哈哈，起初我是觉得是有问题的，函数中明明也声明了一个变量a，输出的值肯定是3啊，想了一些时间没有想明白。回过头来看看this是怎么说的，就清楚了为什么a输出的值依旧是2了：javascript函数中this的指向不是在函数定义的时候确定的，而是在函数调用时确定的。认真的解读下这句话就很清楚的知道变量a输出的值肯定就是2了，this的指向只与普通函数的调用有关，箭头函数另外再说，这个foo（）函数的调用时在全局环境，因此this是指向全局对象，即window，所以输出a的值依旧还是2了，而不是想当然的认为是3了，这下应该比较清楚了吧。大家再看下下面的这个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var a = 2;
    function  foo() {
        a = 3;
        console.log(this.a);
    }
    foo();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code> <span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span>  <span class="hljs-title">foo</span><span class="hljs-params">()</span> <span class="hljs-comment">{
        a = 3;
        console.log(this.a);
    }</span>
    <span class="hljs-title">foo</span><span class="hljs-params">()</span>;</span></code></pre>
<p>这个foo（）函数输出的又是什么值呢，这个就是大家认为的3了，这就不解释了，看了上面的应该就比较清楚了。</p>
<p><strong>绑定规则</strong></p>
<ol><li><p>默认绑定</p></li></ol>
<p>函数独立调用，直接使用不带任何修饰的函数引用进行调用，其this默认指向window对象，第一部分的第一个例子就是默认绑定，这就不在记述。</p>
<ol><li><p>隐式绑定</p></li></ol>
<p>函数调用时拥有一个上下文对象，就好像这个函数是属于这个对象的一样。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(){
        console.log(this.a);
    }
    var obj = {
        a:2,
        foo:foo
    };
    obj.foo();//2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a);
    }
    <span class="hljs-keyword">var</span> obj = {
        <span class="hljs-attr">a</span>:<span class="hljs-number">2</span>,
        <span class="hljs-attr">foo</span>:foo
    };
    obj.foo();<span class="hljs-comment">//2</span></code></pre>
<p>当函数foo（）被调用时，其引用有obj这个对象，即函数调用中的this绑定到了这个对象，this.a就相当于obj.a,输出的值就为2。</p>
<ol><li><p>隐式绑定丢失</p></li></ol>
<p>被隐式绑定的函数丢失绑定对象，其会应用默认绑定，这也是this应用中容易出错的地方，关键还是对this调用位置没有理解清楚。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" function foo(){
        console.log(this.a);
    }
    var obj = {
        a:2,
        foo:foo
    };
    var bar = obj.foo;
    var a = '全局';
    bar();// '全局'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a);
    }
    <span class="hljs-keyword">var</span> obj = {
        <span class="hljs-attr">a</span>:<span class="hljs-number">2</span>,
        <span class="hljs-attr">foo</span>:foo
    };
    <span class="hljs-keyword">var</span> bar = obj.foo;
    <span class="hljs-keyword">var</span> a = <span class="hljs-string">'全局'</span>;
    bar();<span class="hljs-comment">// '全局'</span></code></pre>
<p>其实很好理解为什么this指向的全局对象window，关键还是看函数的调用位置，虽然函数foo（）被当作引用添加到obj对象中，它也仅仅是一个引用，变量bar也就是obj.foo的一个引用的传递，然而bar（）是独立调用的，不带任何修饰的函数调用，所以函数调用中的this是绑定到了全局对象，即this.a是window.a,输出的值为'全局'。</p>
<ol><li><p>显式绑定</p></li></ol>
<p>显式绑定多数是用call()、apply()函数，他们的第一个参数是一个对象，是给this准备的，函数调用时将其绑定到this，也就是直接指定this的绑定对象。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" function foo(){
        console.log(this.a);
    }
    var obj = {
        a:2
    };
    foo.call(obj);//2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a);
    }
    <span class="hljs-keyword">var</span> obj = {
        <span class="hljs-attr">a</span>:<span class="hljs-number">2</span>
    };
    foo.call(obj);<span class="hljs-comment">//2</span></code></pre>
<p>通过call()，调用foo时强制把它的this绑定到obj上。<br>apply()的使用和call()一样，它们不同的在于传参的方式不一样，call（）接受的是若干个参数的列表，apply（）接受的是一个包含多个参数的数组，具体作用可以自己去了解。</p>
<ol><li><p>new绑定</p></li></ol>
<p>如果是一个构造函数，用new来调用，那么绑定的将是新创建的对象。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" function foo(a){
        this.a = a;
    }
    var bar = new foo(2);
    console.log(bar.a);//2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">a</span>)</span>{
        <span class="hljs-keyword">this</span>.a = a;
    }
    <span class="hljs-keyword">var</span> bar = <span class="hljs-keyword">new</span> foo(<span class="hljs-number">2</span>);
    <span class="hljs-built_in">console</span>.log(bar.a);<span class="hljs-comment">//2</span></code></pre>
<p>使用new来调用foo()时，构造一个新的对象并把它绑定到函数调用中的this上面，即this.a就是bar.a，输出的值为2。</p>
<p><strong>箭头函数this问题</strong></p>
<p>箭头函数体内的this对象就是定义时所在的对象，而不是使用时所在的对象，固定不变。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(){
        setTimeout(()=>{
            console.log(this.a);
        },100);
    }
    var obj = {
        a:2
    }
    foo.call(obj);//2
    
    
    function foo(){
        setTimeout(function(){
            console.log(this.a);
        },100);
    }
    var obj = {
        a:2
    }
    foo.call(obj);//undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a);
        },<span class="hljs-number">100</span>);
    }
    <span class="hljs-keyword">var</span> obj = {
        <span class="hljs-attr">a</span>:<span class="hljs-number">2</span>
    }
    foo.call(obj);<span class="hljs-comment">//2</span>
    
    
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a);
        },<span class="hljs-number">100</span>);
    }
    <span class="hljs-keyword">var</span> obj = {
        <span class="hljs-attr">a</span>:<span class="hljs-number">2</span>
    }
    foo.call(obj);<span class="hljs-comment">//undefined</span></code></pre>
<p>看上面的两个例子，第一个使用的是箭头函数，第二个使用的是普通函数，最后的结果不一样的，输出一个是2，一个是undefined。原因很简单，箭头函数中this对象是在定义所在的的对象，普通函数中的this对象的指向是可变的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="本例第一个用例中箭头函数中的this总是指向函数定义生效时所在的对象，即为obj，所以箭头函数的this.a就是obj.a,输出的值就为2。第二个用例中，根据调用的位置，普通函数this的指向是可变的，这个用例中this的最终指向的是全局对象window，即this.a就是window.a,全局环境中没有定义变量啊，所以输出的值为undefined。为什么第二个用例的this指向的是全局对象，有一种解释是：对象中的方法的函数被当作函数模式所触发，所以它的this是指向window的，这也是this应用容易出错的一个地方。如果也想让它的this指向定义时绑定的对象，做如下改变就行了：" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code style="word-break: break-word; white-space: initial;">本例第一个用例中箭头函数中的<span class="hljs-keyword">this</span>总是指向函数定义生效时所在的对象，即为obj，所以箭头函数的<span class="hljs-keyword">this</span>.a就是obj.a,输出的值就为<span class="hljs-number">2</span>。第二个用例中，根据调用的位置，普通函数<span class="hljs-keyword">this</span>的指向是可变的，这个用例中<span class="hljs-keyword">this</span>的最终指向的是全局对象window，即<span class="hljs-keyword">this</span>.a就是window.a,全局环境中没有定义变量啊，所以输出的值为undefined。为什么第二个用例的<span class="hljs-keyword">this</span>指向的是全局对象，有一种解释是：对象中的方法的函数被当作函数模式所触发，所以它的<span class="hljs-keyword">this</span>是指向window的，这也是<span class="hljs-keyword">this</span>应用容易出错的一个地方。如果也想让它的<span class="hljs-keyword">this</span>指向定义时绑定的对象，做如下改变就行了：</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(){
        var that = this;
        setTimeout(function(){
            console.log(that.a);
        },100);
    }
    var obj = {
        a:2
    }
    foo.call(obj);//2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-built_in">console</span>.log(that.a);
        },<span class="hljs-number">100</span>);
    }
    <span class="hljs-keyword">var</span> obj = {
        <span class="hljs-attr">a</span>:<span class="hljs-number">2</span>
    }
    foo.call(obj);<span class="hljs-comment">//2</span></code></pre>
<p>将this临时传递给一个变量that，通过that使用，这样输出的值就为2了。</p>
<p><strong>结束</strong></p>
<p>1.this的掌握的关键在于它的调用位置，这个理解清楚了就不太容易出错。<br>2.要区分好普通函数和箭头函数中this的使用，不要搞混淆了。<br>3.学好这些理论基础是学好javascript的基石，对以后理解和写javascript的逻辑提供很好的帮助</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript this的学习总结

## 原文链接
[https://segmentfault.com/a/1190000011940804](https://segmentfault.com/a/1190000011940804)

