---
title: '深入挖掘js之函数' 
date: 2018-12-02 2:30:16
hidden: true
slug: 1lcd2tl5xyr
categories: [reprint]
---

{{< raw >}}

                    
<p>前言： 前端这两年的新技术铺天盖地，各种框架、工具层出不穷眼花缭乱。最近打算好好复习下 js 基础，夯实的基础才是学习新技术的基石。本文作为读书笔记简单的总结下 js 函数的基础知识。</p>
<hr>
<h2 id="articleHeader0">一、函数对象</h2>
<ul>
<li>JavaScript中的函数就是对象。对象是“名/值”对的集合并拥有一个连接到原型对象的隐藏连接。对象字面量产生的对象连接到Object.prototype。函数对象连接到Function.prototype(该原型对象本身连接到Object.prototype)。</li>
<li>每个函数对象在创建时也会有一个prototype属性。它的值是一个拥有constructor属性且值即为该函数的对象。</li>
<li>函数是对象，可以保存在变量、对象和数组中。函数可以当做参数传递给其他函数，函数也可以在返回函数，函数拥有方法。</li>
</ul>
<h2 id="articleHeader1">二、函数字面量</h2>
<p>函数对象通过函数字面量来创建：</p>
<blockquote>var add = function(a,b){<br>return a+b;<br>};</blockquote>
<p>函数字面量包括四个部分：</p>
<ul>
<li>1 保留字function</li>
<li>2 函数名（可省略）</li>
<li>3 包围在括号中的一组参数，在函数被调用是初始化为实际的参数的值</li>
<li>4 包围在花括号里的一组语句块</li>
</ul>
<p>注意：一个内部函数除了可以访问自己的参数和变量，同时也可以自由的访问父函数的参数和变量。用过这种函数字面量创建的函数对象包含一个连接到外部上下文的连接。这个被称为闭包</p>
<h2 id="articleHeader2">三、函数调用</h2>
<ul><li>每个函数接收两个附加的参数：this和arguments（实际参数），在JavaScript中有四种调用方式：方法调用模式，函数调用模式，构造器调用模式和apply调用模式</li></ul>
<h3 id="articleHeader3">方法调用模式</h3>
<p>当有个函数被保存为对象的一个属性是，我们称他为一个方法。当以个方法被调用时，this被绑定到该对像。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var myObject = {
    value: 0,
    increment: function (icn) {
        this.value += typeof inc === 'number' ? icn: 1;
    }
}
myObject.increment();
console.log(myObject.value);

myObject.increment(2);
console.log(myObject.value);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-keyword">var</span> myObject = {
    <span class="hljs-attr">value</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">increment</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">icn</span>) </span>{
        <span class="hljs-keyword">this</span>.value += <span class="hljs-keyword">typeof</span> inc === <span class="hljs-string">'number'</span> ? icn: <span class="hljs-number">1</span>;
    }
}
myObject.increment();
<span class="hljs-built_in">console</span>.log(myObject.value);

myObject.increment(<span class="hljs-number">2</span>);
<span class="hljs-built_in">console</span>.log(myObject.value);</code></pre>
<p>方法可以使用this访问自己所属的对象。通过this可取可取的他们所属对象的上下文的方法称为公共方法</p>
<h3 id="articleHeader4">函数调用模式</h3>
<ul><li>当一个函数并非一个对象的属性时，那么它就是被当做一个函数来调用的，以此模式调用函数，this被绑定到了全局对象。这是错误的，正确的设计应该是当内部函数被调用时，this应该绑定到外部函数的this变量。因此声明一个that变量并赋值this，内部函数就可以通过that访问到this。这个听起来比较难理解，我们以代码的形式来说明</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="myObject.double = function(){
    var that = this ;
    var helper = function(){
        that .value = add(that.value,that.value);
    }
    helper(); //以函数的形式调用helper
}
//以方法的形式调用double
myObject.double();
console.log(myObject.value);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>myObject.<span class="hljs-keyword">double</span> = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    var that = this ;
    var helper = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        that .<span class="hljs-keyword">value</span> = add(that.<span class="hljs-keyword">value</span>,that.<span class="hljs-keyword">value</span>);
    }
    helper(); //以函数的形式调用helper
}
//以方法的形式调用<span class="hljs-keyword">double</span>
myObject.<span class="hljs-keyword">double</span>();
console.<span class="hljs-built_in">log</span>(myObject.<span class="hljs-keyword">value</span>);</code></pre>
<h3 id="articleHeader5">构造器调用模式</h3>
<ul>
<li>JavaScript是基于原型继承的语言，对象可以直接从其他对象继属性，该语言是无类型的。</li>
<li>如果在一个函数前面带上new来调用，name背地里就会创建一个连接到该函数的prototype成员的新对象，同时this会绑定到新对象上</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//创建一个构造器函数Quo
var Quo = function(string){
    this.status = string;
};
//给Quo提供一个get_status的公共方法
Quo.prototype.get_status = function(){
    return this.status;
};
//构造一个Quo实例
var myQuo = new Quo(&quot;hello world&quot;);
console.log(myQuo.get_status());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-comment">//创建一个构造器函数Quo</span>
<span class="hljs-built_in">var</span> Quo = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">string</span>)</span>{
    <span class="hljs-keyword">this</span>.status = <span class="hljs-built_in">string</span>;
};
<span class="hljs-comment">//给Quo提供一个get_status的公共方法</span>
Quo.prototype.get_status = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.status;
};
<span class="hljs-comment">//构造一个Quo实例</span>
<span class="hljs-built_in">var</span> myQuo = <span class="hljs-keyword">new</span> Quo(<span class="hljs-string">"hello world"</span>);
<span class="hljs-built_in">console</span>.log(myQuo.get_status());</code></pre>
<h3 id="articleHeader6">Apply 调用模式</h3>
<ul><li>apply方法可以构建一个参数数组传递给调用函数，apply方法接收两个数组，第一个是要绑定给this的值，第二个就是一个参数数组。</li></ul>
<blockquote>var array = [3,4];<br>var sum = add.apply(null,array);</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var statusObject = {
    status: 'A-ok'
};
 var status = Quo.prototype.get_status.apply(statusObject);
 console.log(status); //A-OK" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> statusObject = {
    <span class="hljs-built_in">status</span>: 'A-ok'
};
 <span class="hljs-built_in">var</span> <span class="hljs-built_in">status</span> = Quo.prototype.get_status.<span class="hljs-built_in">apply</span>(statusObject);
 console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">status</span>); //A-OK</code></pre>
<h4>参数</h4>
<ul><li>当函数被调用时会得到arguments数组，函数可以通过此参数访问所有被它调用时传递的参数列表</li></ul>
<blockquote>arguments并不是一个真正的数组，拥有一个length属性，但它没有任何数组的方法</blockquote>
<h4>返回</h4>
<ul><li>如果函数调用时在前面加一个new前缀，且返回值不是一个对象，则返回this</li></ul>
<h2 id="articleHeader7">四、函数作用域</h2>
<ul><li>我们已经知道，在代码外部添加包装函数将内部的变量和函数定义“隐藏”起来，外部作用域无法访问包装函数内部的任何东西 例如：</li></ul>
<blockquote>var a = 2;<br>function foo(){<br>var a =3;<br>consloe.log(a);//3<br>}<br>foo();<br>consloe.log(a);//2</blockquote>
<h3 id="articleHeader8">闭包</h3>
<ul><li>内部函数可以访问定义在他们外部的函数的变量和参数（除了this、arguments）</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var que = function(status){
    return {
        get_status: function(){
            return status;
        }
    }
}
var myQuo = que(&quot;hello&quot;);
console.log(myQuo.get_status());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> que = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">status</span>)</span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">get_status</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">return</span> status;
        }
    }
}
<span class="hljs-keyword">var</span> myQuo = que(<span class="hljs-string">"hello"</span>);
<span class="hljs-built_in">console</span>.log(myQuo.get_status());</code></pre>
<p>get_status方法并不是访问参数的副本，他访问的就是参数的本身，这就是闭包，保护status为私有属性</p>
<h3 id="articleHeader9">回调callBack()</h3>
<ul><li>1 搞清异步和同步</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function a(){
    console.log('执行a函数');
    setTimeout(function(){
        console.log(&quot;执性a函数的延迟函数&quot;)
    },1000)
};
function b (){
    console.log('执行函数b')
}
a();
b();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'执行a函数'</span>);
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"执性a函数的延迟函数"</span>)
    },<span class="hljs-number">1000</span>)
};
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">b</span> (<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'执行函数b'</span>)
}
a();
b();</code></pre>
<p>以上代码会先执行函数a,而且不会等到a中的延迟函数执行完才执行函数b, 在延迟函数被触发的过程中就执行了函数b,当js引擎的event 队列空闲时才会去执行队列里等待的setTimeout的回调函数，这就是一个异步的例子</p>
<ul><li>2回调函数到底是什么</li></ul>
<p>以下是谷歌得出的结论</p>
<blockquote>callback is a function that is passed as an argument to another function and is executed after its parent function has completed.</blockquote>
<h3 id="articleHeader10">模块</h3>
<ul>
<li>我们可以使用函数和闭包来构造模块，模块是一个提供个借口却隐藏状态与实现的函数或对象</li>
<li>模块模式利用函数作用域和闭包来创建被绑定对象与私有成员的关联</li>
<li>模块的一般形式：一个定义了私有变量和函数的函数；利用闭包创建可以访问私有变量和函数的特权，最后一个返回该特权函数，或者把它们保存在一个可以访问的到的地方</li>
</ul>
<h5>模块模式需要具备两个条件</h5>
<ul>
<li>1、必须有外部的封装函数，该函数必须至少被调用一次（每次调用都会创建一个新的模块实例）。</li>
<li>2、封闭函数必须返回至少一个尼日不函数，这样内部函数才能在私有的作用域形成闭包，并且可以访问或者可以修改私有状态。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo= (function(){
    var something = 'cool';
    var another =[1,2,3];
    function doSomething(){
        console.log(something);
    }
    function doAnother(){
        console.log(another.join(' ! '));
    }
    return{
        doSomething: doSomething,
        doAnother: doAnother
    }
})();
foo.doSomething();
foo.doAnother();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> foo= (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> something = <span class="hljs-string">'cool'</span>;
    <span class="hljs-keyword">var</span> another =[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doSomething</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(something);
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doAnother</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(another.join(<span class="hljs-string">' ! '</span>));
    }
    <span class="hljs-keyword">return</span>{
        <span class="hljs-attr">doSomething</span>: doSomething,
        <span class="hljs-attr">doAnother</span>: doAnother
    }
})();
foo.doSomething();
foo.doAnother();</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入挖掘js之函数

## 原文链接
[https://segmentfault.com/a/1190000014664136](https://segmentfault.com/a/1190000014664136)

