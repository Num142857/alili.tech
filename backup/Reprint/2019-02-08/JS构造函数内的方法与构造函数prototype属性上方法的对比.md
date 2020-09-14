---
title: 'JS构造函数内的方法与构造函数prototype属性上方法的对比' 
date: 2019-02-08 2:30:41
hidden: true
slug: ery90071hbl
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文的目的是让大家理解什么情况下把函数的方法写在JavaScript的构造函数上,什么时候把方法写在函数的<code>prototype</code>属性上;以及这样做的好处.</p></blockquote>
<p>为了阅读方便,我们约定一下:把方法写在构造函数内的情况我们简称为<strong>函数内方法</strong>,把方法写在<code>prototype</code>属性上的情况我们简称为<strong>prototype上的方法</strong></p>
<p><strong>首先我们先了解一下这篇文章的重点:</strong></p>
<ul>
<li><p><strong>函数内的方法:</strong> 使用函数内的方法我们可以<strong>访问到函数内部的私有变量</strong>,如果我们通过构造函数<code>new</code>出来的对象需要我们操作构造函数内部的私有变量的话,<br>  我们这个时候就要考虑使用函数内的方法.</p></li>
<li><p><strong>prototype上的方法:</strong> 当我们需要<strong>通过一个函数创建大量的对象</strong>,并且这些对象还都有许多的方法的时候;这时我们就要考虑在函数的<code>prototype</code>上添加这些方法.<br>  这种情况下我们代码的<strong>内存占用</strong>就比较小.</p></li>
<li><p><strong>在实际的应用中,这两种方法往往是结合使用的;所以我们要首先了解我们需要的是什么,然后再去选择如何使用.</strong></p></li>
</ul>
<p>我们还是根据下面的代码来说明一下这些要点吧,下面是<a href="http://pythontutor.com/visualize.html#code=//+%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0A%0Afunction+A%28name%29+%7B%0A++++this.name+=+name+%7C%7C+%27a%27;%0A++++this.sayHello+=+function%28%29+%7B%0A++++++++console.log%28%27Hello,+my+name+is:+%27+++this.name%29;%0A++++%7D%0A%7D%0A%0A//+%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0B%0Afunction+B%28name%29+%7B%0A++++this.name+=+name+%7C%7C+%27b%27;%0A%7D%0AB.prototype.sayHello+=+function%28%29+%7B%0A++++console.log%28%27Hello,+my+name+is:+%27+++this.name%29;%0A%7D;%0A%0Avar+a1+=+new+A%28%27a1%27%29;%0Avar+a2+=+new+A%28%27a2%27%29;%0Aa1.sayHello%28%29;%0Aa2.sayHello%28%29;%0A%0Avar+b1+=+new+B%28%27b1%27%29;%0Avar+b2+=+new+B%28%27b2%27%29;%0Ab1.sayHello%28%29;%0Ab2.sayHello%28%29;&amp;mode=display&amp;origin=opt-frontend.js&amp;cumulative=false&amp;heapPrimitives=false&amp;textReferences=false&amp;py=js&amp;rawInputLstJSON=%5B%5D&amp;curInstr=0" rel="nofollow noreferrer" target="_blank">代码部分</a>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 构造函数A
function A(name) {
    this.name = name || 'a';
    this.sayHello = function() {
        console.log('Hello, my name is: ' + this.name);
    }
}

// 构造函数B
function B(name) {
    this.name = name || 'b';
}
B.prototype.sayHello = function() {
    console.log('Hello, my name is: ' + this.name);
};

var a1 = new A('a1');
var a2 = new A('a2');
a1.sayHello();
a2.sayHello();

var b1 = new B('b1');
var b2 = new B('b2');
b1.sayHello();
b2.sayHello();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 构造函数A</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name || <span class="hljs-string">'a'</span>;
    <span class="hljs-keyword">this</span>.sayHello = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hello, my name is: '</span> + <span class="hljs-keyword">this</span>.name);
    }
}

<span class="hljs-comment">// 构造函数B</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">B</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name || <span class="hljs-string">'b'</span>;
}
B.prototype.sayHello = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hello, my name is: '</span> + <span class="hljs-keyword">this</span>.name);
};

<span class="hljs-keyword">var</span> a1 = <span class="hljs-keyword">new</span> A(<span class="hljs-string">'a1'</span>);
<span class="hljs-keyword">var</span> a2 = <span class="hljs-keyword">new</span> A(<span class="hljs-string">'a2'</span>);
a1.sayHello();
a2.sayHello();

<span class="hljs-keyword">var</span> b1 = <span class="hljs-keyword">new</span> B(<span class="hljs-string">'b1'</span>);
<span class="hljs-keyword">var</span> b2 = <span class="hljs-keyword">new</span> B(<span class="hljs-string">'b2'</span>);
b1.sayHello();
b2.sayHello();</code></pre>
<p>我们首先写了两个构造函数,第一个是<code>A</code>,这个构造函数里面包含了一个方法<code>sayHello</code>;第二个是构造函数<code>B</code>,我们把那个方法<code>sayHello</code>写在了构造函数<code>B</code>的<code>prototype</code>属性上面.</p>
<p>需要指出的是,通过这两个构造函数<code>new</code>出来的对象具有一样的属性和方法,但是它们的区别我们可以通过下面的一个图来说明:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006775157" src="https://static.alili.tech/img/remote/1460000006775157" alt="1" title="1" style="cursor: pointer; display: inline;"></span></p>
<p>我们通过使用构造函数<code>A</code>创建了两个对象,分别是<code>a1</code>,<code>a2</code>;通过构造函数<code>B</code>创建了两个对象<code>b1</code>,<code>b2</code>;我们可以发现<code>b1</code>,<code>b2</code>这两个对象的那个<code>sayHello</code>方法都是指向了它们的构造函数的<code>prototype</code>属性的<code>sayHello</code>方法.而<code>a1</code>,<code>a2</code>都是在自己内部定义了这个方法.</p>
<p><strong>定义在构造函数内部的方法,会在它的每一个实例上都克隆这个方法;定义在构造函数的<code>prototype</code>属性上的方法会让它的所有示例都共享这个方法,但是不会在每个实例的内部重新定义这个方法</strong>.如果我们的应用需要创建很多新的对象,并且这些对象还有许多的方法,为了节省内存,我们建议把这些方法都定义在构造函数的<code>prototype</code>属性上<strong>当然,在某些情况下,我们需要将某些方法定义在构造函数中,这种情况一般是因为我们需要访问构造函数内部的私有变量</strong>.</p>
<p>下面我们举一个两者结合的例子,代码如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name, family) {
    this.name = name;
    this.family = family;
    
    var records = [{type: &quot;in&quot;, amount: 0}];

    this.addTransaction = function(trans) {
        if(trans.hasOwnProperty(&quot;type&quot;) &amp;&amp; trans.hasOwnProperty(&quot;amount&quot;)) {
           records.push(trans);
        }
    }

    this.balance = function() {
       var total = 0;

       records.forEach(function(record) {
           if(record.type === &quot;in&quot;) {
             total += record.amount;
           }
           else {
             total -= record.amount;
           }
       });
    
        return total;
    };
};

Person.prototype.getFull = function() {
    return this.name + &quot; &quot; + this.family;
};

Person.prototype.getProfile = function() {
     return this.getFull() + &quot;, total balance: &quot; + this.balance();
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name, family</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.family = family;
    
    <span class="hljs-keyword">var</span> records = [{<span class="hljs-attr">type</span>: <span class="hljs-string">"in"</span>, <span class="hljs-attr">amount</span>: <span class="hljs-number">0</span>}];

    <span class="hljs-keyword">this</span>.addTransaction = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">trans</span>) </span>{
        <span class="hljs-keyword">if</span>(trans.hasOwnProperty(<span class="hljs-string">"type"</span>) &amp;&amp; trans.hasOwnProperty(<span class="hljs-string">"amount"</span>)) {
           records.push(trans);
        }
    }

    <span class="hljs-keyword">this</span>.balance = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
       <span class="hljs-keyword">var</span> total = <span class="hljs-number">0</span>;

       records.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">record</span>) </span>{
           <span class="hljs-keyword">if</span>(record.type === <span class="hljs-string">"in"</span>) {
             total += record.amount;
           }
           <span class="hljs-keyword">else</span> {
             total -= record.amount;
           }
       });
    
        <span class="hljs-keyword">return</span> total;
    };
};

Person.prototype.getFull = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name + <span class="hljs-string">" "</span> + <span class="hljs-keyword">this</span>.family;
};

Person.prototype.getProfile = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
     <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.getFull() + <span class="hljs-string">", total balance: "</span> + <span class="hljs-keyword">this</span>.balance();
};</code></pre>
<p>在上面的代码中,我们定义了一个<code>Person</code>构造函数;这个函数有一个内部的私有变量<code>records</code>,这个变量我们是不希望通过函数内部以外的方法去操作这个变量,所以我们把操作这个变量的方法都写在了函数的内部.而把一些可以公开的方法写在了<code>Person</code>的<code>prototype</code>属性上,比如方法<code>getFull</code>和<code>getProfile</code>.</p>
<p><strong>把方法写在构造函数的内部,增加了通过构造函数初始化一个对象的成本,把方法写在<code>prototype</code>属性上就有效的减少了这种成本.你也许会觉得,调用对象上的方法要比调用它的原型链上的方法快得多,其实并不是这样的,如果你的那个对象上面不是有很多的原型的话,它们的速度其实是差不多的。</strong></p>
<p>另外,需要注意的一些地方:</p>
<ul>
<li><p>首先如果是在函数的<code>prototype</code>属性上定义方法的话,要牢记一点,如果你改变某个方法,那么由这个构造函数产生的所有对象的那个方法都会被改变.</p></li>
<li>
<p>还有一点就是变量提升的问题,我们可以稍微的看一下下面的代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="func1(); // 这里会报错,因为在函数执行的时候,func1还没有被赋值. error: func1 is not a function
var func1 = function() {
    console.log('func1');
};

func2(); // 这个会被正确执行,因为函数的声明会被提升.
function func2() {
    console.log('func2');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">func1(); <span class="hljs-comment">// 这里会报错,因为在函数执行的时候,func1还没有被赋值. error: func1 is not a function</span>
<span class="hljs-keyword">var</span> func1 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'func1'</span>);
};

func2(); <span class="hljs-comment">// 这个会被正确执行,因为函数的声明会被提升.</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func2</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'func2'</span>);
}</code></pre>
</li>
<li>
<p>关于对象序列化的问题.定义在函数的<code>prototype</code>上的属性不会被序列化,可以看下面的代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function A(name) {
    this.name = name;
}
A.prototype.sayWhat = 'say what...';

var a = new A('dreamapple');
console.log(JSON.stringify(a));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name;
}
A.prototype.sayWhat = <span class="hljs-string">'say what...'</span>;

<span class="hljs-keyword">var</span> a = <span class="hljs-keyword">new</span> A(<span class="hljs-string">'dreamapple'</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">JSON</span>.stringify(a));</code></pre>
<p>我们可以看到输出结果是<code>{"name":"dreamapple"}</code></p>
</li>
</ul>
<p>原文地址：<a href="https://github.com/dreamapplehappy/hacking-with-javascript/blob/master/points/methods-within-constructor-vs-prototype-in-javascript.md" rel="nofollow noreferrer" target="_blank"><strong>github</strong></a></p>
<p>参考的文章或者问答:</p>
<ul>
<li><p><a href="http://thecodeship.com/web-development/methods-within-constructor-vs-prototype-in-javascript/%20" rel="nofollow noreferrer" target="_blank">Methods Within Constructor vs Prototype in Javascript</a></p></li>
<li><p><a href="http://stackoverflow.com/questions/310870/use-of-prototype-vs-this-in-javascript" rel="nofollow noreferrer" target="_blank">Use of 'prototype' vs. 'this' in JavaScript?</a></p></li>
<li><p><a href="http://stackoverflow.com/questions/4508313/advantages-of-using-prototype-vs-defining-methods-straight-in-the-constructor" rel="nofollow noreferrer" target="_blank">Advantages of using prototype, vs defining methods straight in the constructor? [duplicate]</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS构造函数内的方法与构造函数prototype属性上方法的对比

## 原文链接
[https://segmentfault.com/a/1190000005756510](https://segmentfault.com/a/1190000005756510)

