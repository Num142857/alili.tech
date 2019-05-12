---
title: '高能！typeof Function.prototype 引发的先有 Function 还是先有 Object 的探讨' 
date: 2019-02-08 2:30:41
hidden: true
slug: 6dor15awrdf
categories: [reprint]
---

{{< raw >}}

                    
<p>来个摸底测试，说出以下每个表达式的结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function F(){};
var o = {};

typeof F;
typeof o;
typeof F.prototype;
typeof o.prototype;
typeof new F;
typeof (new F).prototype;
typeof (new F).__proto__;
typeof F.__proto__;
typeof o.__proto__;
typeof Object;
typeof Function;
typeof (new Function).prototype;
typeof (new Function).__proto__;
typeof (new Object).prototype;
typeof (new Object).__proto__;
typeof Object.prototype;
typeof Object.__proto__;
typeof Function.prototype;
typeof Function.__proto__;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">F</span>(<span class="hljs-params"></span>)</span>{};
<span class="hljs-keyword">var</span> o = {};

<span class="hljs-keyword">typeof</span> F;
<span class="hljs-keyword">typeof</span> o;
<span class="hljs-keyword">typeof</span> F.prototype;
<span class="hljs-keyword">typeof</span> o.prototype;
<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">new</span> F;
<span class="hljs-keyword">typeof</span> (<span class="hljs-keyword">new</span> F).prototype;
<span class="hljs-keyword">typeof</span> (<span class="hljs-keyword">new</span> F).__proto__;
<span class="hljs-keyword">typeof</span> F.__proto__;
<span class="hljs-keyword">typeof</span> o.__proto__;
<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Object</span>;
<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Function</span>;
<span class="hljs-keyword">typeof</span> (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>).prototype;
<span class="hljs-keyword">typeof</span> (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>).__proto__;
<span class="hljs-keyword">typeof</span> (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>).prototype;
<span class="hljs-keyword">typeof</span> (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>).__proto__;
<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Object</span>.prototype;
<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Object</span>.__proto__;
<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Function</span>.prototype;
<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Function</span>.__proto__;</code></pre>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function F(){};
var o = {};
                
typeof F;                          //==> function
typeof o;                          //==> object
typeof F.prototype;                //==> object
typeof o.prototype;                //==> undefinded
typeof new F;                      //==> object
typeof (new F).prototype;          //==> undefined
typeof (new F).__proto__;          //==> object
typeof F.__proto__;                //==> function
typeof o.__proto__;                //==> object
typeof Object;                     //==> function
typeof Function;                   //==> function
typeof (new Function).prototype;   //==> object
typeof (new Function).__proto__;   //==> function
typeof (new Object).prototype;     //==> undefined
typeof (new Object).__proto__;     //==> object
typeof Object.prototype;           //==> object
typeof Object.__proto__;           //==> function
typeof Function.prototype;         //==> function
typeof Function.__proto__;         //==> function
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">F</span>(<span class="hljs-params"></span>)</span>{};
<span class="hljs-keyword">var</span> o = {};
                
<span class="hljs-keyword">typeof</span> F;                          <span class="hljs-comment">//==&gt; function</span>
<span class="hljs-keyword">typeof</span> o;                          <span class="hljs-comment">//==&gt; object</span>
<span class="hljs-keyword">typeof</span> F.prototype;                <span class="hljs-comment">//==&gt; object</span>
<span class="hljs-keyword">typeof</span> o.prototype;                <span class="hljs-comment">//==&gt; undefinded</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">new</span> F;                      <span class="hljs-comment">//==&gt; object</span>
<span class="hljs-keyword">typeof</span> (<span class="hljs-keyword">new</span> F).prototype;          <span class="hljs-comment">//==&gt; undefined</span>
<span class="hljs-keyword">typeof</span> (<span class="hljs-keyword">new</span> F).__proto__;          <span class="hljs-comment">//==&gt; object</span>
<span class="hljs-keyword">typeof</span> F.__proto__;                <span class="hljs-comment">//==&gt; function</span>
<span class="hljs-keyword">typeof</span> o.__proto__;                <span class="hljs-comment">//==&gt; object</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Object</span>;                     <span class="hljs-comment">//==&gt; function</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Function</span>;                   <span class="hljs-comment">//==&gt; function</span>
<span class="hljs-keyword">typeof</span> (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>).prototype;   <span class="hljs-comment">//==&gt; object</span>
<span class="hljs-keyword">typeof</span> (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>).__proto__;   <span class="hljs-comment">//==&gt; function</span>
<span class="hljs-keyword">typeof</span> (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>).prototype;     <span class="hljs-comment">//==&gt; undefined</span>
<span class="hljs-keyword">typeof</span> (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>).__proto__;     <span class="hljs-comment">//==&gt; object</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Object</span>.prototype;           <span class="hljs-comment">//==&gt; object</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Object</span>.__proto__;           <span class="hljs-comment">//==&gt; function</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Function</span>.prototype;         <span class="hljs-comment">//==&gt; function</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Function</span>.__proto__;         <span class="hljs-comment">//==&gt; function</span>
</code></pre>
<p>看到这里相信有不少入门不久的同学已经产生疑惑了 是真的吗 然后在浏览器试过一番发现真是如此。</p>
<p>解开疑惑之前先回顾些大家都知道的知识点：</p>
<p>引用 MDN 关于 对象实例和对象原型对象 的阐述：</p>
<blockquote><p>JavaScript语言的所有对象都是由Object衍生的对象；<br>所有对象都继承了Object.prototype的方法和属性，尽管它们可能被覆盖。<br>例如，其它的构造器原型覆盖了constructor属性并提供了其自己的toString方法。<br>原型对象的更改会传播给所有的对象，除非这些属性和方法在原型链中被再次覆盖。</p></blockquote>
<p>就如我们经常在各类教科中看到的 所有的实例对象都是 Object 类型的实例</p>
<p>那么我们平时都是如何确定一个对象是否是另一个类型或对象的实例的呢？</p>
<p>对我们可以使用 typeof 关键字 亦或可以使用关键字 instanceof 来确定某个对象是否是指定类型或对象的实例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="typeof {} //object
({}) instanceof Object //true

typeof Date                      //function
Date instanceof Function         //true
typeof Date.prototype            //obejct
Date.prototype instanceof Object //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">typeof</span> {} <span class="hljs-comment">//object</span>
({}) <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span> <span class="hljs-comment">//true</span>

<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Date</span>                      <span class="hljs-comment">//function</span>
<span class="hljs-built_in">Date</span> <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Function</span>         <span class="hljs-comment">//true</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Date</span>.prototype            <span class="hljs-comment">//obejct</span>
<span class="hljs-built_in">Date</span>.prototype <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span> <span class="hljs-comment">//true</span></code></pre>
<p>然而针对 Object 的 prototype 属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="typeof Object.prototype //object

Object.prototype instanceof Object // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Object</span>.prototype <span class="hljs-comment">//object</span>

<span class="hljs-built_in">Object</span>.prototype <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span> <span class="hljs-comment">// false</span></code></pre>
<p>为什么,要想搞清楚为什么就得明白 instanceof 这个关键字在表达式中发生了什么?</p>
<p>在弄清楚 instanceof 之前 还得弄清楚一样东西 就是 new 一个对象到底做了什么：</p>
<blockquote><p>如 var a = new A(); 认为 “a为A函数的实例对象”</p></blockquote>
<p>new操作的过程是什么? 可以总结如下：</p>
<blockquote><p>1.new 创建一个空对象{}<br>2.然后将A.prototype的引用放置到该对象的原型链上。即a.__proto__指向 A.prototype<br>3.执行A函数，将A中this指向该对象，执行结束，如果没有return那么默认返回this引用</p></blockquote>
<p>那么new的其中一个的作用便是把A.prototype的指向添加到了a的原型链中。 </p>
<p>至此我们便知道了如下关系：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a.__proto__ === A.prototype //true

a instanceof A //true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code><span class="hljs-keyword">a</span>.__proto__ === A.prototype<span class="hljs-comment"> //true</span>

<span class="hljs-keyword">a</span> instanceof A<span class="hljs-comment"> //true</span>
</code></pre>
<p>故为何不得出一个结论：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="instanceof 操作符其实就是检查左侧的元素的 __proto__链上有没有右侧类或对象的prototype存在。
同理 当某某某是某某某的实例时 其实也是证明左侧的__proto__链上有右侧类或对象的prototype存在。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code><span class="hljs-title">instanceof</span> 操作符其实就是检查左侧的元素的 __proto__链上有没有右侧类或对象的proto<span class="hljs-keyword">type</span>存在。
同理 当某某某是某某某的实例时 其实也是证明左侧的__proto__链上有右侧类或对象的proto<span class="hljs-keyword">type</span>存在。
</code></pre>
<p>细节剖析如下：</p>
<p>1.看右侧的 A 获取其 prototype 得到 A.prototype。<br> 2.看左侧 a 对象的原型链上是否有第一步得到 A.prototype。<br>   1）获取 a.__proto__对象看是否为A.prototype，是则返回 true<br>   2）获取 a.__proto__.__proto__ 对象看是否为A.prototype,是则返回 true<br>   3）重复获取左侧的原型链上的<code>[[Prototype]]</code>特性即__proto__属性进行判断直到为空返回 false。</p>
<p>校验真理，我们都知道 js 有几大内置类型 这些类型都是 Function 的实例，是 Function 类型：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="out(typeof Date)     //Function
out(typeof RegExp)   //Function
out(typeof Number)   //Function
out(typeof Boolean)  //Function
out(typeof String)   //Function
out(typeof Array)    //Function
out(typeof Error)    //Function
//...

out(Date.__proto__  === Function.prototype)    //true
out(RegExp.__proto__ === Function.prototype)   //true
out(Number.__proto__ === Function.prototype)   //true
out(Boolean.__proto__ === Function.prototype)  //true
out(String.__proto__ === Function.prototype)   //true
out(Array.__proto__ === Function.prototype)    //true
out(Error.__proto__ === Function.prototype)    //true
//...

out(Object.getPrototypeOf(Date)  === Function.prototype)    //true
out(Object.getPrototypeOf(RegExp) === Function.prototype)   //true
out(Object.getPrototypeOf(Number) === Function.prototype)   //true
out(Object.getPrototypeOf(Boolean) === Function.prototype)  //true
out(Object.getPrototypeOf(String) === Function.prototype)   //true
out(Object.getPrototypeOf(Array) === Function.prototype)    //true
out(Object.getPrototypeOf(Error) === Function.prototype)    //true
//...

out( Date instanceof Function)    //true
out( RegExp instanceof Function)  //true
out( Number instanceof Function)  //true
out( Boolean instanceof Function) //true
out( String instanceof Function)  //true
out( Array instanceof Function)   //true
out( Error instanceof Function)   //true
//...
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>out(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Date</span>)     <span class="hljs-comment">//Function</span>
out(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">RegExp</span>)   <span class="hljs-comment">//Function</span>
out(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Number</span>)   <span class="hljs-comment">//Function</span>
out(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Boolean</span>)  <span class="hljs-comment">//Function</span>
out(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">String</span>)   <span class="hljs-comment">//Function</span>
out(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Array</span>)    <span class="hljs-comment">//Function</span>
out(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Error</span>)    <span class="hljs-comment">//Function</span>
<span class="hljs-comment">//...</span>

out(<span class="hljs-built_in">Date</span>.__proto__  === <span class="hljs-built_in">Function</span>.prototype)    <span class="hljs-comment">//true</span>
out(<span class="hljs-built_in">RegExp</span>.__proto__ === <span class="hljs-built_in">Function</span>.prototype)   <span class="hljs-comment">//true</span>
out(<span class="hljs-built_in">Number</span>.__proto__ === <span class="hljs-built_in">Function</span>.prototype)   <span class="hljs-comment">//true</span>
out(<span class="hljs-built_in">Boolean</span>.__proto__ === <span class="hljs-built_in">Function</span>.prototype)  <span class="hljs-comment">//true</span>
out(<span class="hljs-built_in">String</span>.__proto__ === <span class="hljs-built_in">Function</span>.prototype)   <span class="hljs-comment">//true</span>
out(<span class="hljs-built_in">Array</span>.__proto__ === <span class="hljs-built_in">Function</span>.prototype)    <span class="hljs-comment">//true</span>
out(<span class="hljs-built_in">Error</span>.__proto__ === <span class="hljs-built_in">Function</span>.prototype)    <span class="hljs-comment">//true</span>
<span class="hljs-comment">//...</span>

out(<span class="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-built_in">Date</span>)  === <span class="hljs-built_in">Function</span>.prototype)    <span class="hljs-comment">//true</span>
out(<span class="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-built_in">RegExp</span>) === <span class="hljs-built_in">Function</span>.prototype)   <span class="hljs-comment">//true</span>
out(<span class="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-built_in">Number</span>) === <span class="hljs-built_in">Function</span>.prototype)   <span class="hljs-comment">//true</span>
out(<span class="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-built_in">Boolean</span>) === <span class="hljs-built_in">Function</span>.prototype)  <span class="hljs-comment">//true</span>
out(<span class="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-built_in">String</span>) === <span class="hljs-built_in">Function</span>.prototype)   <span class="hljs-comment">//true</span>
out(<span class="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-built_in">Array</span>) === <span class="hljs-built_in">Function</span>.prototype)    <span class="hljs-comment">//true</span>
out(<span class="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-built_in">Error</span>) === <span class="hljs-built_in">Function</span>.prototype)    <span class="hljs-comment">//true</span>
<span class="hljs-comment">//...</span>

out( <span class="hljs-built_in">Date</span> <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Function</span>)    <span class="hljs-comment">//true</span>
out( <span class="hljs-built_in">RegExp</span> <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Function</span>)  <span class="hljs-comment">//true</span>
out( <span class="hljs-built_in">Number</span> <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Function</span>)  <span class="hljs-comment">//true</span>
out( <span class="hljs-built_in">Boolean</span> <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Function</span>) <span class="hljs-comment">//true</span>
out( <span class="hljs-built_in">String</span> <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Function</span>)  <span class="hljs-comment">//true</span>
out( <span class="hljs-built_in">Array</span> <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Function</span>)   <span class="hljs-comment">//true</span>
out( <span class="hljs-built_in">Error</span> <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Function</span>)   <span class="hljs-comment">//true</span>
<span class="hljs-comment">//...</span>
</code></pre>
<p>回到上述针对 Object 的 prototype 属性疑惑 为什么到了 Object 就得不出一样的结果了呢？</p>
<p>我们都知道每个函数对象亦或函数类型都会有个 prototype 属性，在其上挂载的方法和属性均能够被该类型实例化出来的对象共享，因为实例化出来的对象拥有 <code>[[Prototype]]</code>特性即 <code>__proto__</code> 属性，js 便是通过该特性实现原型链机制。</p>
<p>那么这些函数的 prototype 属性对象是否也有自己的<code>[[Prototype]]</code>特性即 <code>__proto__</code> 属性呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="out(typeof Date.prototype)    //object
out(typeof RegExp.prototype)  //object
out(typeof Number.prototype)  //object
out(typeof Boolean.prototype) //object
out(typeof String.prototype)  //object
out(typeof Array.prototype)   //object
out(typeof Error.prototype)   //object

out(typeof Object.getPrototypeOf(Date.prototype))        //object
out(typeof Object.getPrototypeOf(RegExp.prototype))      //object
out(typeof Object.getPrototypeOf(Number.prototype))      //object
out(typeof Object.getPrototypeOf(Boolean.prototype))     //object
out(typeof Object.getPrototypeOf(String.prototype))      //object
out(typeof Object.getPrototypeOf(Array.prototype))       //object
out(typeof Object.getPrototypeOf(Error.prototype))       //object

out(Object.getPrototypeOf(Date.prototype) === Object.prototype)    //true
out(Object.getPrototypeOf(RegExp.prototype) === Object.prototype)  //true
out(Object.getPrototypeOf(Number.prototype) === Object.prototype)  //true
out(Object.getPrototypeOf(Boolean.prototype) === Object.prototype) //true
out(Object.getPrototypeOf(String.prototype) === Object.prototype)  //true
out(Object.getPrototypeOf(Array.prototype) === Object.prototype)   //true
out(Object.getPrototypeOf(Error.prototype) === Object.prototype)   //true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>out(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Date</span>.prototype)    <span class="hljs-comment">//object</span>
out(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">RegExp</span>.prototype)  <span class="hljs-comment">//object</span>
out(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Number</span>.prototype)  <span class="hljs-comment">//object</span>
out(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Boolean</span>.prototype) <span class="hljs-comment">//object</span>
out(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">String</span>.prototype)  <span class="hljs-comment">//object</span>
out(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Array</span>.prototype)   <span class="hljs-comment">//object</span>
out(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Error</span>.prototype)   <span class="hljs-comment">//object</span>

out(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-built_in">Date</span>.prototype))        <span class="hljs-comment">//object</span>
out(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-built_in">RegExp</span>.prototype))      <span class="hljs-comment">//object</span>
out(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-built_in">Number</span>.prototype))      <span class="hljs-comment">//object</span>
out(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-built_in">Boolean</span>.prototype))     <span class="hljs-comment">//object</span>
out(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-built_in">String</span>.prototype))      <span class="hljs-comment">//object</span>
out(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-built_in">Array</span>.prototype))       <span class="hljs-comment">//object</span>
out(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-built_in">Error</span>.prototype))       <span class="hljs-comment">//object</span>

out(<span class="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-built_in">Date</span>.prototype) === <span class="hljs-built_in">Object</span>.prototype)    <span class="hljs-comment">//true</span>
out(<span class="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-built_in">RegExp</span>.prototype) === <span class="hljs-built_in">Object</span>.prototype)  <span class="hljs-comment">//true</span>
out(<span class="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-built_in">Number</span>.prototype) === <span class="hljs-built_in">Object</span>.prototype)  <span class="hljs-comment">//true</span>
out(<span class="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-built_in">Boolean</span>.prototype) === <span class="hljs-built_in">Object</span>.prototype) <span class="hljs-comment">//true</span>
out(<span class="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-built_in">String</span>.prototype) === <span class="hljs-built_in">Object</span>.prototype)  <span class="hljs-comment">//true</span>
out(<span class="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-built_in">Array</span>.prototype) === <span class="hljs-built_in">Object</span>.prototype)   <span class="hljs-comment">//true</span>
out(<span class="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-built_in">Error</span>.prototype) === <span class="hljs-built_in">Object</span>.prototype)   <span class="hljs-comment">//true</span>
</code></pre>
<p>可以看出每个函数对象的 prototype 属性也有自己的<code>[[Prototype]]</code>特性 而且指向的是 <code>Object.prototype</code></p>
<p>那么是否所有对象都会有直接的<code>[[Prototype]]</code>特性 呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="out( Object.getPrototypeOf( Object.getPrototypeOf(Date.prototype)))     //null
out( Object.getPrototypeOf( Object.getPrototypeOf(RegExp.prototype)))   //null
out( Object.getPrototypeOf( Object.getPrototypeOf(Number.prototype)))   //null
out( Object.getPrototypeOf( Object.getPrototypeOf(Boolean.prototype)))  //null
out( Object.getPrototypeOf( Object.getPrototypeOf(String.prototype)))   //null
out( Object.getPrototypeOf( Object.getPrototypeOf(Array.prototype)))    //null
out( Object.getPrototypeOf( Object.getPrototypeOf(Error.prototype)))    //null
out( Object.getPrototypeOf( Object.prototype))                          //null
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>out( <span class="hljs-name">Object</span>.getPrototypeOf( <span class="hljs-name">Object</span>.getPrototypeOf(<span class="hljs-name">Date</span>.prototype)))     //null
out( <span class="hljs-name">Object</span>.getPrototypeOf( <span class="hljs-name">Object</span>.getPrototypeOf(<span class="hljs-name">RegExp</span>.prototype)))   //null
out( <span class="hljs-name">Object</span>.getPrototypeOf( <span class="hljs-name">Object</span>.getPrototypeOf(<span class="hljs-name">Number</span>.prototype)))   //null
out( <span class="hljs-name">Object</span>.getPrototypeOf( <span class="hljs-name">Object</span>.getPrototypeOf(<span class="hljs-name">Boolean</span>.prototype)))  //null
out( <span class="hljs-name">Object</span>.getPrototypeOf( <span class="hljs-name">Object</span>.getPrototypeOf(<span class="hljs-name">String</span>.prototype)))   //null
out( <span class="hljs-name">Object</span>.getPrototypeOf( <span class="hljs-name">Object</span>.getPrototypeOf(<span class="hljs-name">Array</span>.prototype)))    //null
out( <span class="hljs-name">Object</span>.getPrototypeOf( <span class="hljs-name">Object</span>.getPrototypeOf(<span class="hljs-name">Error</span>.prototype)))    //null
out( <span class="hljs-name">Object</span>.getPrototypeOf( <span class="hljs-name">Object</span>.prototype))                          //null
</code></pre>
<p>答案是否。</p>
<p>有个例外他就是 <code>Object.prototype</code>。</p>
<p>回看前面的 Demo:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.prototype instanceof Object // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">Object</span>.prototype <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span> <span class="hljs-comment">// false</span></code></pre>
<p>从前面的代码输出我们看到 Object.prototype 对象是没有<code>[[Prototype]]</code>特性的，同时前面我们也讨论过 <code>instanceof</code> 这个关键字所涉及的具体操作。</p>
<p>我们可以具体剖析如下：</p>
<p>1.看右侧的 Object 获取其 prototype 得到 Object.prototype。<br> 2.看左侧 Object.prototype 对象的原型链上是否有第一步得到 Object.prototype。<br>   1）获取 Object.prototype.__proto__对象为空直接返回 false。</p>
<p>那么为什么所有的对象都有<code>[[Prototype]]</code> 特性，唯独<code>Object.prototype</code>没有呢。答案很简单：既然 JS的继承机制是基于原型链的那总该有个头吧，这个头便是<code>Object.prototype</code> 。</p>
<p>再来一发:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="out( typeof Function)                                          //function
out( typeof Object)                                            //function
out( Object instanceof Function)                               //true
out( Function instanceof Function)                             //true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code><span class="hljs-keyword">out</span>( typeof <span class="hljs-function"><span class="hljs-keyword">Function</span></span>)                                          //<span class="hljs-function"><span class="hljs-keyword">function</span></span>
<span class="hljs-keyword">out</span>( typeof Object)                                            //<span class="hljs-function"><span class="hljs-keyword">function</span></span>
<span class="hljs-keyword">out</span>( Object instanceof <span class="hljs-function"><span class="hljs-keyword">Function</span></span>)                               //true
<span class="hljs-keyword">out</span>( <span class="hljs-function"><span class="hljs-keyword">Function</span></span> instanceof <span class="hljs-function"><span class="hljs-keyword">Function</span></span>)                             //true
</code></pre>
<p>在学习 JS 的过程中我们已经知道所有的数据类型都是 <code>Function</code> 类型的实例，包括 <code>Object</code> 在内，但是我们都知道所有的对象都是 Object 的实例，这时便引出文章的题目</p>
<h2 id="articleHeader0">到底是先有 Function 还是先有 Object？</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="out( Function.__proto__  === Function.prototype)               //true
out( Object.__proto__  === Function.prototype)                 //true
out( Object.getPrototypeOf(Function) === Function.prototype)   //true
out( Object.getPrototypeOf(Object) === Function.prototype)     //true
out( Object.getPrototypeOf(Function) === Function.prototype)   //true
out( Object.getPrototypeOf(Object) === Function.prototype)     //true
out( Object instanceof Function)                               //true 
out( Function instanceof Function)                             //true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code><span class="hljs-keyword">out</span>( <span class="hljs-function"><span class="hljs-keyword">Function</span>.<span class="hljs-title">__proto__</span></span>  === <span class="hljs-function"><span class="hljs-keyword">Function</span>.<span class="hljs-title">prototype</span></span>)               //true
<span class="hljs-keyword">out</span>( Object.__proto__  === <span class="hljs-function"><span class="hljs-keyword">Function</span>.<span class="hljs-title">prototype</span></span>)                 //true
<span class="hljs-keyword">out</span>( Object.getPrototypeOf(<span class="hljs-function"><span class="hljs-keyword">Function</span></span>) === <span class="hljs-function"><span class="hljs-keyword">Function</span>.<span class="hljs-title">prototype</span></span>)   //true
<span class="hljs-keyword">out</span>( Object.getPrototypeOf(Object) === <span class="hljs-function"><span class="hljs-keyword">Function</span>.<span class="hljs-title">prototype</span></span>)     //true
<span class="hljs-keyword">out</span>( Object.getPrototypeOf(<span class="hljs-function"><span class="hljs-keyword">Function</span></span>) === <span class="hljs-function"><span class="hljs-keyword">Function</span>.<span class="hljs-title">prototype</span></span>)   //true
<span class="hljs-keyword">out</span>( Object.getPrototypeOf(Object) === <span class="hljs-function"><span class="hljs-keyword">Function</span>.<span class="hljs-title">prototype</span></span>)     //true
<span class="hljs-keyword">out</span>( Object instanceof <span class="hljs-function"><span class="hljs-keyword">Function</span></span>)                               //true 
<span class="hljs-keyword">out</span>( <span class="hljs-function"><span class="hljs-keyword">Function</span></span> instanceof <span class="hljs-function"><span class="hljs-keyword">Function</span></span>)                             //true
</code></pre>
<p>从上述代码加上前面得出的结论我们可以看出</p>
<p>Function 和 Object 的原型链上都有 <code>Function.prototype</code></p>
<p>我们再来详细看看 <code>Function.prototype</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="out( typeof Function.prototype);                // function
out( Function.prototype instanceof Object)      //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code><span class="hljs-keyword">out</span>( typeof <span class="hljs-function"><span class="hljs-keyword">Function</span>.<span class="hljs-title">prototype</span></span>);                // <span class="hljs-function"><span class="hljs-keyword">function</span></span>
<span class="hljs-keyword">out</span>( <span class="hljs-function"><span class="hljs-keyword">Function</span>.<span class="hljs-title">prototype</span></span> instanceof Object)      //true</code></pre>
<p>这时候问题升华为</p>
<h2 id="articleHeader1">Function.prototype 和 Object.prototype 的关系。</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="out( Function.prototype.__proto__ === Object.prototype)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code><span class="hljs-keyword">out</span>( <span class="hljs-function"><span class="hljs-keyword">Function</span>.<span class="hljs-title">prototype</span></span>.__proto__ === Object.prototype)
</code></pre>
<p>这时候关系已经很明了了：</p>
<p>我们都知道除了 Object.prototype 之外所有对象都会有<code>[[Prototype]]</code>特性 即 <code>__proto__</code> 属性,故 Function.prototype 也不例外，<br>Function.prototype 指向的是 Object.prototype</p>
<p>这时候就可以清楚的知道为什么说所有类型都是 Function 的实例，同时也是 Object 的实例:</p>
<blockquote><p>因为所有的类型的<code>[[Prototype]]</code>特性 即 <code>__proto__</code> 属性均指向的是 Function.prototype ,同时 Function.prototype 的<code>[[Prototype]]</code>特性 即 <code>__proto__</code> 属性又指向了 Object.prototype 。</p></blockquote>
<p>故大王是<code>Object.prototype</code>，二王是<code>Function.prototype</code>，其他均是小弟，但是小弟也有等级划分</p>
<p>先接着来看 Function:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="out( typeof Function.prototype);                // function
out( typeof Function.__proto__);                // function
out( Function.prototype === Function.__proto__);// true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code><span class="hljs-keyword">out</span>( typeof <span class="hljs-function"><span class="hljs-keyword">Function</span>.<span class="hljs-title">prototype</span></span>);                // <span class="hljs-function"><span class="hljs-keyword">function</span></span>
<span class="hljs-keyword">out</span>( typeof <span class="hljs-function"><span class="hljs-keyword">Function</span>.<span class="hljs-title">__proto__</span></span>);                // <span class="hljs-function"><span class="hljs-keyword">function</span></span>
<span class="hljs-keyword">out</span>( <span class="hljs-function"><span class="hljs-keyword">Function</span>.<span class="hljs-title">prototype</span></span> === <span class="hljs-function"><span class="hljs-keyword">Function</span>.<span class="hljs-title">__proto__</span></span>);// true</code></pre>
<p>首先我们可以看出 Function.prototype 和其他类型的 prototype 属性是 object 类型不一样， 是 function 类型<br>其次 Function.__proto__  指向了 Function.prototype。</p>
<p>我们知道当一个类型实例化出对象时，这些对象的便会共享挂载在该类型的 prototype 属性上的 资源，因为这些对象均有<code>[[Prototype]]</code>特性,指向的就是实例化出这些对象的类型的 prototype</p>
<p>从前面的例子可以看到所有的类型的<code>[[Prototype]]</code>特性均指向了 Function.prototype,所以这些类型都具有了使用挂载在Function.prototype上的资源的权利。因此可以看出，当一个对象具有使用挂载在Function.prototype上的资源的权利时，及该对象<code>[[Prototype]]</code>指向 Function.prototype 时代表这个对象是个 Function 实例是一个类型，能够实例化出该类型的对象，当然包括 Function 在内。</p>
<p>又因为所有类型的<code>[[Prototype]]</code>指向 Function.prototype 而 Function.prototype 的<code>[[Prototype]]</code>指向是 Object.prototype，所以这些类型都具有使用挂载在 Object.prototype 上的资源的权利。</p>
<p>那用这些类型实例化出来的对象呢 类型的原型链并不在实例化出来的对象上呀，但是这些实例化出来的对象的<code>[[Protitype]]</code>指向的是其类型的  prototype 属性</p>
<p>往回看前面的例子 可以看到有一段</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="out(Object.getPrototypeOf(Date.prototype) === Object.prototype)    //true
out(Object.getPrototypeOf(RegExp.prototype) === Object.prototype)  //true
out(Object.getPrototypeOf(Number.prototype) === Object.prototype)  //true
out(Object.getPrototypeOf(Boolean.prototype) === Object.prototype) //true
out(Object.getPrototypeOf(String.prototype) === Object.prototype)  //true
out(Object.getPrototypeOf(Array.prototype) === Object.prototype)   //true
out(Object.getPrototypeOf(Error.prototype) === Object.prototype)   //true
out(Object.getPrototypeOf(Function.prototype) === Object.prototype)   //true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">out</span>(<span class="hljs-keyword">Object</span>.getPrototypeOf(Date.prototype) === <span class="hljs-keyword">Object</span>.prototype)    <span class="hljs-comment">//true</span>
<span class="hljs-keyword">out</span>(<span class="hljs-keyword">Object</span>.getPrototypeOf(RegExp.prototype) === <span class="hljs-keyword">Object</span>.prototype)  <span class="hljs-comment">//true</span>
<span class="hljs-keyword">out</span>(<span class="hljs-keyword">Object</span>.getPrototypeOf(Number.prototype) === <span class="hljs-keyword">Object</span>.prototype)  <span class="hljs-comment">//true</span>
<span class="hljs-keyword">out</span>(<span class="hljs-keyword">Object</span>.getPrototypeOf(Boolean.prototype) === <span class="hljs-keyword">Object</span>.prototype) <span class="hljs-comment">//true</span>
<span class="hljs-keyword">out</span>(<span class="hljs-keyword">Object</span>.getPrototypeOf(<span class="hljs-keyword">String</span>.prototype) === <span class="hljs-keyword">Object</span>.prototype)  <span class="hljs-comment">//true</span>
<span class="hljs-keyword">out</span>(<span class="hljs-keyword">Object</span>.getPrototypeOf(<span class="hljs-keyword">Array</span>.prototype) === <span class="hljs-keyword">Object</span>.prototype)   <span class="hljs-comment">//true</span>
<span class="hljs-keyword">out</span>(<span class="hljs-keyword">Object</span>.getPrototypeOf(Error.prototype) === <span class="hljs-keyword">Object</span>.prototype)   <span class="hljs-comment">//true</span>
<span class="hljs-keyword">out</span>(<span class="hljs-keyword">Object</span>.getPrototypeOf(<span class="hljs-function"><span class="hljs-keyword">Function</span>.<span class="hljs-title">prototype</span>) === <span class="hljs-title">Object</span>.<span class="hljs-title">prototype</span>)   <span class="hljs-comment">//true</span>
</span></code></pre>
<p>可以看到这些类型的 prototype 属性的<code>[[Protitype]]</code>指向的是 Object.prototype 故至此，所有对象包括类型对象亦或类型实例化出来的对象都有使用挂载在 Object.prototype 上的资源的权利。</p>
<p>到这里所有对象之间的关系就已经清除了，相信已经有不少人已经晕乎了，没关系 我准备了图(看不太清晰是因为上传后被压缩了)：</p>
<p><span class="img-wrap"><img data-src="/img/bVyjcC" src="https://static.alili.tech/img/bVyjcC" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>当然这里我还是省略了部分细节 譬如对应类型的 prototype 属性对象均有 constructor 属性指向该类型，以及省略部分类型。</p>
<p>对着这张图重新看一遍本文和文章开头的摸底，相信你会有收获。</p>
<p>那么为什么使用 typeof 获取 Object.prototype 会返回 object 呢。</p>
<p>我们知道浏览器底层对 JS 的实现的是基于 C/C++<br>通过上图，我们可以猜测</p>
<h2 id="articleHeader2">浏览器在初始化JS 环境时都发生了些什么</h2>
<p>1.用 C/C++ 构造内部数据结构创建一个 OP 即(Object.prototype)以及初始化其内部属性但不包括行为。<br>2.用 C/C++ 构造内部数据结构创建一个 FP 即(Function.prototype)以及初始化其内部属性但不包括行为。<br>3.将 FP 的[[Prototype]]指向 OP。<br>4.用 C/C++ 构造内部数据结构创建各种内置引用类型。<br>5.将各内置引用类型的[[Prototype]]指向 FP。<br>6.将 Function 的 prototype 指向 FP。<br>7.将 Object 的 prototype 指向 OP。<br>8.用 Function 实例化出 OP，FP，以及 Object 的行为并挂载。<br>9.用 Object 实例化出除 Object 以及 Function 的其他内置引用类型的 prototype 属性对象。<br>10.用 Function 实例化出除Object 以及 Function 的其他内置引用类型的 prototype 属性对象的行为并挂载。<br>11.实例化内置对象 Math 以及 Grobal<br>至此，所有 内置类型构建完成。</p>
<p>现在我们可以回答为什么使用 typeof 获取 Object.prototype 会返回 object 了。<br>因为我们在使用 typeof 的时候得到的 object 类型并不完全代表是 Object 类型实例化出来的对象，有可能是底层实现的内部数据结构，包括 null。真正想知道这个类型还是需要去到当前该类的内部<code>[[Class]]</code>属性，至于如何获取可以使用Object的toString方法。</p>
<p>最后的最后，你还对是现有 Function 还是现有 Object 有想法了吗？</p>
<p>以上均为个人查阅及实践总结的观点。</p>
<p>谢谢~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
高能！typeof Function.prototype 引发的先有 Function 还是先有 Object 的探讨

## 原文链接
[https://segmentfault.com/a/1190000005754797](https://segmentfault.com/a/1190000005754797)

