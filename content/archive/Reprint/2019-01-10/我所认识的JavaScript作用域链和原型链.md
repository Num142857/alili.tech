---
title: '我所认识的JavaScript作用域链和原型链' 
date: 2019-01-10 2:30:08
hidden: true
slug: hkl9q5ubbg9
categories: [reprint]
---

{{< raw >}}

                    
<p>　　毕业也整整一年了，看着很多学弟都毕业了，忽然心中颇有感慨，时间一去不复还呀。记得从去年这个时候接触到JavaScript,从一开始就很喜欢这门语言，当时迷迷糊糊看完了《JavaScript高级程序设计》这本书，似懂非懂。这几天又再次回顾了这本书，之前很多不理解的内容似乎开始有些豁然开朗了。为了防止之后自己又开始模糊，所以自己来总结一下JavaScript中关于 作用域链和原型链的知识，并将二者相比较看待进一步加深理解。以下内容都纯属于自己的理解，有不对的地方欢迎指正。</p>
<h2 id="articleHeader0">作用域链</h2>
<h3 id="articleHeader1">作用域</h3>
<p>　　首先我们需要了解的是作用域做什么的？当JavaScript引擎在某一作用域中遇见<strong>变量</strong>和<strong>函数</strong>的时候，需要能够明确变量和函数所对应的值是什么，所以就需要作用域来对变量和函数进行查找，并且还需要确定当前代码是否对该变量具有访问权限。也就是说作用域主要有以下的任务:</p>
<ul>
<li><p>收集并维护所有声明的标识符(变量和函数)</p></li>
<li><p>依照特定的规则对标识符进行查找</p></li>
<li><p>确定当前的代码对标识符的访问权限</p></li>
</ul>
<p>　　举一个例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(a) {
    console.log( a ); // 2
}

foo( 2 );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">a</span>) </span>{
    <span class="hljs-built_in">console</span>.log( a ); <span class="hljs-comment">// 2</span>
}

foo( <span class="hljs-number">2</span> );</code></pre>
<p>　　对于上述代码，JavaScript引擎需要对作用域发出以下的命令</p>
<ul>
<li><p>查询标识符<code>foo</code>,得到变量后执行该变量</p></li>
<li><p>查询标识符<code>a</code>,得到变量后对其赋值为2</p></li>
<li><p>查询标识符<code>console</code>,得到变量后准备执行属性<code>log</code></p></li>
<li><p>查询标识符<code>a</code>,得到变量后，作为参数传入<code>console.log</code>执行</p></li>
</ul>
<p>　　我们省略了函数<code>console.log</code>内部的执行过程，我们可以看到对JavaScript引擎来说，作用域最重要的功能就是查询标识符。从上面的例子来看，引擎对变量的使用其实不是都一样的。比如第一步引擎得到标识符<code>foo</code>的目的是执行它(或者说是为了拿到标识符里存储的值)。<br>但第二步中引擎查找标识符<code>a</code>的目的是为了对其赋值(也就是改变存储的值)。所以查找也分为两种：<strong><code>LHS</code></strong>和<strong><code>RHS</code></strong>。</p>
<p>　　我在之前的一篇文章中<a href="https://github.com/MrErHu/blog/issues/12" rel="nofollow noreferrer" target="_blank">从LHS与RHS角度浅谈Js变量声明与赋值</a>曾经介绍过<code>LHS</code>与<code>RHS</code>,这两个看起来很高大上的名词其实非常简单。<code>LHS</code>指的是<code>Left-hand Side</code>，而<code>RHS</code>指的是<code>Right-hand Side</code>。分别对应于两种不同目的的词法查询。<code>LHS</code>所查询的目的是为了赋值(类似于该变量会位于赋值符号<code>=</code>的左边)，例如第二步查找变量<code>a</code>的过程。而<code>RHS</code>所查询的目的是为了引用(类似于变量会位于赋值符号<code>=</code>的右边)，例如第一步查找变量<code>foo</code>的过程。<br>　　</p>
<h3 id="articleHeader2">作用域链</h3>
<p>　　我们知道代码不仅仅可以访问当前的作用域的变量，对于嵌套的父级作用域中的变量也可以访问。我们先只在ES5中表述，我们知道JavaScript在ES5中是没有块级作用域的，只有函数可以创建作用域。举个例子:<br>　　</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Outer(){
    var outer = 'outer';
    Inner();
    function Inner(){
        var inner = 'inner';
        console.log(outer,inner) // outer inner
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Outer</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> outer = <span class="hljs-string">'outer'</span>;
    Inner();
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Inner</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> inner = <span class="hljs-string">'inner'</span>;
        <span class="hljs-built_in">console</span>.log(outer,inner) <span class="hljs-comment">// outer inner</span>
    }
}</code></pre>
<p>　　当引擎执行到函数<code>Inner</code>内部的时候，不仅可以访问当前作用域而且可以访问到<code>Outer</code>的作用域，从而可以访问到标识符<code>outer</code>。因此我们发现当多个作用域相互嵌套的时候，就形成了作用域链。词法作用域在查找标识符的时候，优先在本作用域中查找。如果在本作用域没有找到标识符，会继续向上一级查找，当抵达最外层的全局作用域仍然没有找到，则会停止对标识符的搜索。如果没有查找到标识符，会根据不同的查找方式作出不同的反应。如果是<code>RHS</code>,则会抛出<code>Uncaught ReferenceError</code>的错误，如果是<code>LHS</code>,则会在查找最外层的作用域声明该变量，这就解释了为什么对未声明的变量赋值后该变量会成为全局变量。所以上面的代码执行</p>
<p><code>console.log(outer,inner)</code></p>
<p>的时候，引擎会首先要求<code>Inner</code>函数的词法作用域查找(<code>RHS</code>)标识符<code>outer</code>，被告知该词法作用域不存在该标识符，然后引擎会要求嵌套的上一级<code>Outer</code>词法作用域查找(<code>RHS</code>)标识符<code>outer</code>,<code>Outer</code>词法作用域的查找成功并将结果返回给引擎。</p>
<h3 id="articleHeader3">换个角度理解作用域链</h3>
<p>　　上面我们理解作用域链都是从作用域链查找变量的角度去考虑的，其实这已经足够了，大部分作用域链的场景都是查找标识符。但是我们可以换一个角度去理解作用域链。其实JavaScript的每个函数都有对应的<strong>执行环境</strong>(execution context)。当执行流进入进入一个函数时，该函数的执行环境就会被推入环境栈，当函数执行结束之后，该函数的执行环境就会被弹出环境栈，执行环境被变更为之前的执行环境。而每创建一个执行环境时，会同时生成一个<strong>变量对象</strong>(variable object)(函数生成的是<strong>活动变量</strong>(activation object))，用来存储当前执行环境中定义的变量和函数，当执行环境结束时，当前的变量(活动)对象就会被销毁(全局的变量对象是一直存在的，不会被销毁)。虽然我们无法访问到变量(活动)对象，但词法作用域查找标识符会使用它。<br>　　当对于函数的执行环境生成的活动对象，初始化就会存在两个变量:<code>this</code>和<code>arguments</code>，因此我们在函数中就直接可以使用这两个变量。对于作用域链存储都是变量(活动)对象，而当前执行环境的变量对象就存储在作用域链的最前端，优先被查找。从这个角度看，标识符解析是沿着作用域链一级一级地在变量(活动)对象中搜索标识符的过程。搜索过程始终从作用域链的前端开始，然后逐级地向后回溯，直至找到标识符为止。<br>　　</p>
<h2 id="articleHeader4">闭包</h2>
<p>　　这年头出去面试JavaScript的岗位，各个都要问你闭包的问题，开始的时候觉得闭包的概念蛮高级的，后来觉得这个也没啥东西可讲的。老早的之前就写过一篇关于闭包的文章<a href="https://github.com/MrErHu/blog/issues/11" rel="nofollow noreferrer" target="_blank">浅谈JavaScript闭包</a>,讲到现在我觉得把闭包放到作用域链一起将会更好。还是继续讲个例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn(){
    var a = 'JavaScript';
    function func(){
        console.log(a);
    }
    return func;
}

var func = fn();
func(); //JavaScript" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> a = <span class="hljs-string">'JavaScript'</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(a);
    }
    <span class="hljs-keyword">return</span> func;
}

<span class="hljs-keyword">var</span> func = fn();
func(); <span class="hljs-comment">//JavaScript</span></code></pre>
<p>　　首先明确一下什么是闭包？我认为闭包最好的概念解释就是:</p>
<blockquote><p><strong>函数在定义的词法作用域以外的地方被调用，闭包使得函数可以继续访问定义时的词法作用域。</strong></p></blockquote>
<p>　　<code>func</code>函数执行的位置和定义的位置是不相同的，<code>func</code>是在函数<code>fn</code>中定义的，但执行却是在全局环境中，虽然是在全局函数中执行的，但函数仍然可以访问当定义时的词法作用域。如下图所示:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009965289?w=722&amp;h=528" src="https://static.alili.tech/img/remote/1460000009965289?w=722&amp;h=528" alt="" title="" style="cursor: pointer;"></span></p>
<p>　　我们之前说过，当函数执行结束后其活动变量就会被销毁，但是在上面的例子中却不是这个样子。但函数<code>fn</code>执行结束之后，<code>fn</code>对象的活动变量并没有被销毁，这是因为<code>fn</code>返回的函数<code>func</code>的作用域链还保持着<code>fn</code>的活动变量，因此JavaScript的垃圾回收机制不会回收<code>fn</code>活动变量。虽然返回的函数<code>func</code>是在全局环境下执行的，但是其作用域链的存储的活动(变量)对象的顺序分别是:<code>func</code>的活动变量、<code>fn</code>的活动变量、全局变量对象。因此在<code>func</code>函数执行时，会顺着作用域链查找标识符，也就能访问到<code>fn</code>所定义的词法作用域(即<code>fn</code>函数的活动变量)也就不足为奇了。这样看起来是不是觉得闭包也是非常的简单。<br>　　</p>
<h2 id="articleHeader5">原型链</h2>
<h2 id="articleHeader6">原型</h2>
<p>　　说完了作用域链，我们来讲讲<strong>原型链</strong>。首先也是要明确什么是原型？所有的函数都有一个特殊的属性: <strong><code>prototype</code>(原型)</strong>，<code>prototype</code>属性是一个指针，指向的是一个对象(原型对象)，原型对象中的方法和属性都可以<strong>被函数的实例</strong>所共享。所谓的<strong>函数实例</strong>是指以函数作为构造函数创建的对象，这些对象实例都可以共享构造函数的原型的方法。举个例子:<br>　　</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Person = function(name){
    this.name = name;
}
Person.prototype.sayName = function(){
    console.log('name: ',this.name)
};

var person = new Person('JavaScript');
person.sayName(); //JavaScript" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Person = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>)</span>{
    <span class="hljs-keyword">this</span>.name = name;
}
Person.prototype.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'name: '</span>,<span class="hljs-keyword">this</span>.name)
};

<span class="hljs-keyword">var</span> person = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'JavaScript'</span>);
person.sayName(); <span class="hljs-comment">//JavaScript</span></code></pre>
<p>　　在上面的例子中，对象<code>person</code>是构造函数<code>Person</code>创建的实例。所谓的构造函数也只不过是普通的函数通过操作符<code>new</code>来调用。在使用<code>new</code>操作符调用函数时主要执行以下几个步骤:</p>
<ul>
<li><p>创建新的对象，并将函数的this指向新创建的对象</p></li>
<li><p>执行函数</p></li>
<li><p>返回新创建的对象</p></li>
</ul>
<p>　　通过构造函数返回的对象，其中含有一个内部指针<code>[[Prototype]]</code>指向构造函数的原型对象，当然我们是无法访问到这个标准的内部指针<code>[[Prototype]]</code>,但是在Firefox、Safari和Chrome在上都支持一个属性<strong><code>__proto__</code></strong>，用来指向构造函数的原型对象。下图就解释了上面的结构:</p>
<p>　　<span class="img-wrap"><img data-src="/img/remote/1460000009965290?w=624&amp;h=296" src="https://static.alili.tech/img/remote/1460000009965290?w=624&amp;h=296" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>　　我们可以看到，构造函数<code>Person</code>的<code>prototype</code>属性指向<code>Prototype</code>的原型对象。而<code>person</code>作为构造函数<code>Person</code>创建的实例，其中存在内部指针也指向<code>Person</code>的原型对象。需要注意的是，在<code>Person</code>的原型对象中存在一个特殊的属性<code>constructor</code>，指向构造函数<code>Person</code>。在我们的例子中，执行到:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="person.sayName(); //JavaScript" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">person.sayName(); <span class="hljs-comment">//JavaScript</span></code></pre>
<p>　　当执行<code>person</code>的<code>sayName</code>属性时，首先会在对象实例中查找<code>sayName</code>属性，当发现对象实例中不存在<code>sayName</code>时，会转而去搜索<code>person</code>内部指针<code>[[Prototpe]]</code>所指向的原型对象，当发现原型对象中存在<code>sayName</code>属性时，执行该属性。关于函数<code>sayName</code>中<code>this</code>的指向，有兴趣可以戳这篇文章<a href="https://github.com/MrErHu/blog/issues/10om/Prototype1.png" rel="nofollow noreferrer" target="_blank">一个小小的JavaScript题目</a>。<br>　　</p>
<h3 id="articleHeader7">原型链</h3>
<p>　　讲完了原型，再讲讲原型链，其实我们上面的图并不完整，因为<strong>所有函数的默认原型都是Object的实例</strong>，所以函数原型实例的内部指针<code>[[Prototype]]</code>指向的是<code>Object.prototype</code>,让我们继续来完善一下:<br>　　<br><span class="img-wrap"><img data-src="/img/remote/1460000009965291?w=962&amp;h=555" src="https://static.alili.tech/img/remote/1460000009965291?w=962&amp;h=555" alt="" title="" style="cursor: pointer; display: inline;"></span><br>　　<br>　　这就是完整的原型链，假如我们执行下面代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="person.toString()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">person.toString()</code></pre>
<p>　　<br>　　执行上面代码时，首先会在对象实例<code>person</code>中查找属性<code>toString</code>方法，我们发现实例中不存在<code>toString</code>属性。然后我们转到<code>person</code>内部指针<code>[[Prototype]]</code>指向的<code>Person</code>原型对象去寻找<code>toString</code>属性，结果是仍然不存在。这找不到我们就放弃了？开玩笑，我们这么有毅力。我们会再接着到<code>Person</code>原型对象的内部指针<code>[[Prototype]]</code>指向的<code>Object</code>原型对象中查找，这次我们发现其中确实存在<code>toString</code>属性，然后我们执行<code>toString</code>方法。发现了没有，这一连串的原型形成了一条链，这就是<strong>原型链</strong>。<br>　　<br>　　其实我们上面例子中对属性<code>toString</code>查找属于<code>RHS</code>,以<code>RHS</code>方式寻找属性时，会在原型链中依次查找，如果在当前的原型中已经查找到所需要的属性，那么就会停止搜索，否则会一直向后查找原型链，直到原型链的结尾(这一点有点类似于作用域链)，如果直到原型链结尾仍未找到，那么该属性就是<code>undefined</code>。但执行<code>LHS</code>方式的查找却截然不同，当发现对象实例本身不存在该属性，直接在该对象实例中声明变量，而不会去查找原型链。例如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="person.toString = function(){
    console.log('person')
}
person.toString(); //person" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">person.toString = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'person'</span>)
}
person.toString(); <span class="hljs-comment">//person</span></code></pre>
<p>　　当对<code>person</code>执行<code>LHS</code>的方式查找<code>toString</code>属性时，我们发现<code>person</code>中并不存在<code>toString</code>，这时会直接在<code>person</code>中声明属性，而不会去查找原型链，接着我们执行<code>person.toString()</code>时，我们在实例中找到了<code>toString</code>属性并将其执行，这样实例中的<code>toString</code>就屏蔽了原型链中的<code>toString</code>属性。<br>　　</p>
<h2 id="articleHeader8">作用域链和原型链的比较</h2>
<p>　　讲完了作用域链和原型链，我们可以比较一下。作用域链的作用主要用于<strong>查找标识符</strong>，当作用域需要查询变量的时候会沿着作用域链依次查找，如果找到标识符就会停止搜索，否则将会沿着作用域链依次向后查找，直到作用域链的结尾。而原型链是用于<strong>查找引用类型的属性</strong>，查找属性会沿着原型链依次进行，如果找到该属性会停止搜索并做相应的操作，否则将会沿着原型链依次查找直到结尾。<br>　　　　<br>　　如果觉得阅读完了本篇文章对你有些许帮助，欢迎大家我关注我的掘金账号或者star我的Github的<a href="https://github.com/MrErHu/blog" rel="nofollow noreferrer" target="_blank">blog</a>项目，也算是对我的鼓励啦！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
我所认识的JavaScript作用域链和原型链

## 原文链接
[https://segmentfault.com/a/1190000009965278](https://segmentfault.com/a/1190000009965278)

