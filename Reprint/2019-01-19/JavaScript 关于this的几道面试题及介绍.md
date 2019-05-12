---
title: 'JavaScript 关于this的几道面试题及介绍' 
date: 2019-01-19 2:30:10
hidden: true
slug: a1r7pnp76zl
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="http://caibaojian.com/javascript-this.html" rel="nofollow noreferrer" target="_blank">原文链接</a></p>
<p>与其他语言相比，函数的<code>this</code>关键字在JavaScript中的行为略有不同。并且它在严格模式和非严格模式之间也有一些区别。</p>
<p>在绝大多数情况下，函数的调用方式决定了<code>this</code>的值。<code>this</code>不能在执行期间被赋值，在每次函数被调用时<code>this</code>的值也可能会不同。ES5引入了<code>bind</code>方法来设置函数的<code>this</code>值，而不用考虑函数如何被调用的。</p>
<h1 id="articleHeader0">先来做几道面试题：</h1>
<h2 id="articleHeader1">第一道：</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = &quot;caibaojian.com&quot;; 
var person = {
  name: &quot;kang&quot;,
  pro: {
    name: &quot;Michael&quot;,
    getName: function() {
      return this.name;
    }
  }
};
console.log(person.pro.getName()); // Michael
var pepole = person.pro.getName;
console.log(pepole()); // caibaojian.com" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> name = <span class="hljs-string">"caibaojian.com"</span>; 
<span class="hljs-keyword">var</span> person = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">"kang"</span>,
  <span class="hljs-attr">pro</span>: {
    <span class="hljs-attr">name</span>: <span class="hljs-string">"Michael"</span>,
    <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
    }
  }
};
<span class="hljs-built_in">console</span>.log(person.pro.getName()); <span class="hljs-comment">// Michael</span>
<span class="hljs-keyword">var</span> pepole = person.pro.getName;
<span class="hljs-built_in">console</span>.log(pepole()); <span class="hljs-comment">// caibaojian.com</span></code></pre>
<h2 id="articleHeader2">第二道：</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = &quot;caibaojian.com&quot;;
var person = {
  name: &quot;kang&quot;,
  pro: {
    name: &quot;Michael&quot;,
    getName: function() {
      console.log(this);
      return this.name;
    }
  }
};
console.log(person.pro.getName()); // Object { name: &quot;...&quot;, getName: () }, Michael
var pepole = person.pro.getName;
console.log(pepole()); // Window, caibaojian.com" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> name = <span class="hljs-string">"caibaojian.com"</span>;
<span class="hljs-keyword">var</span> person = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">"kang"</span>,
  <span class="hljs-attr">pro</span>: {
    <span class="hljs-attr">name</span>: <span class="hljs-string">"Michael"</span>,
    <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
    }
  }
};
<span class="hljs-built_in">console</span>.log(person.pro.getName()); <span class="hljs-comment">// Object { name: "...", getName: () }, Michael</span>
<span class="hljs-keyword">var</span> pepole = person.pro.getName;
<span class="hljs-built_in">console</span>.log(pepole()); <span class="hljs-comment">// Window, caibaojian.com</span></code></pre>
<h2 id="articleHeader3">第三道：</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict';
var name = &quot;caibaojian.com&quot;; 
var person = {
  name: &quot;kang&quot;,
  pro: {
    name: &quot;Michael&quot;,
    getName: function() {
      console.log(this);
      return this.name;
    }
  }
};
console.log(person.pro.getName()); // Object { name: &quot;...&quot;, getName: () }, Michael
var pepole = person.pro.getName;
console.log(pepole()); // undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">'use strict'</span>;
<span class="hljs-keyword">var</span> name = <span class="hljs-string">"caibaojian.com"</span>; 
<span class="hljs-keyword">var</span> person = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">"kang"</span>,
  <span class="hljs-attr">pro</span>: {
    <span class="hljs-attr">name</span>: <span class="hljs-string">"Michael"</span>,
    <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
    }
  }
};
<span class="hljs-built_in">console</span>.log(person.pro.getName()); <span class="hljs-comment">// Object { name: "...", getName: () }, Michael</span>
<span class="hljs-keyword">var</span> pepole = person.pro.getName;
<span class="hljs-built_in">console</span>.log(pepole()); <span class="hljs-comment">// undefined</span></code></pre>
<h2 id="articleHeader4">第四道：</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = &quot;caibaojian.com&quot;,
    person = {
      name : &quot;kang&quot;,
      getName : function(){
  　    return function(){
    　    return this.name;
  　    };
      }
    };

console.log(person.getName()()); // caibaojian.com" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> name = <span class="hljs-string">"caibaojian.com"</span>,
    person = {
      <span class="hljs-attr">name</span> : <span class="hljs-string">"kang"</span>,
      <span class="hljs-attr">getName</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  　    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    　    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
  　    };
      }
    };

<span class="hljs-built_in">console</span>.log(person.getName()()); <span class="hljs-comment">// caibaojian.com</span></code></pre>
<h1 id="articleHeader5">下面一起看看关于<code>this</code>的用法：</h1>
<h2 id="articleHeader6">一、全局上下文</h2>
<p>在全局运行上下文中（在任何函数体外部），<code>this</code>指代全局对象，<strong>无论是否在严格模式下</strong>。在浏览器中，全局对象为<code>window</code>对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(this.document === document); // true
console.log(this === window); // true
this.a = 37;
console.log(window.a); // 37" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.document === <span class="hljs-built_in">document</span>); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === <span class="hljs-built_in">window</span>); <span class="hljs-comment">// true</span>
<span class="hljs-keyword">this</span>.a = <span class="hljs-number">37</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">window</span>.a); <span class="hljs-comment">// 37</span></code></pre>
<h2 id="articleHeader7">二、函数上下文</h2>
<p>在函数内部，<code>this</code>的值取决于函数是如何调用的。</p>
<h3 id="articleHeader8">1、直接调用</h3>
<p>在非严格模式下，<code>this</code>的值不会在函数执行时被设置，此时的<code>this</code>的值会默认设置为全局对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(){
  return this;
}

foo() === window; // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
}

foo() === <span class="hljs-built_in">window</span>; <span class="hljs-comment">// true</span></code></pre>
<p>在严格模式下，<code>this</code>将保持他进入执行环境时的值，所以下面的<code>this</code>将会默认为<code>undefined</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(){
  &quot;use strict&quot;; // 严格模式
  return this;
}

foo() === undefined; // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-meta">  "use strict"</span>; <span class="hljs-comment">// 严格模式</span>
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
}

foo() === <span class="hljs-literal">undefined</span>; <span class="hljs-comment">// true</span></code></pre>
<p>在严格模式下，如果<code>this</code>未被执行的上下文环境定义，那么它将会默认为<code>undefined</code>。</p>
<h3 id="articleHeader9">2、对象方法中的<code>this</code>
</h3>
<p>当以对象里的方法的方式调用函数时，它们的<code>this</code>是调用该函数的对象。</p>
<p>下面的例子中，当<code>obj.f()</code>被调用时，函数内的<code>this</code>将绑定到<code>obj</code>对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
  prop: 37,
  foo: function() {
    return this.prop;
  }
};

console.log(obj.foo()); // 37" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> obj = {
  <span class="hljs-attr">prop</span>: <span class="hljs-number">37</span>,
  <span class="hljs-attr">foo</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.prop;
  }
};

<span class="hljs-built_in">console</span>.log(obj.foo()); <span class="hljs-comment">// 37</span></code></pre>
<p>注意，<strong>在何处或者如何定义调用函数完全不会影响到<code>this</code>的行为</strong>。</p>
<p>在上一个例子中，我们在定义<code>obj</code>的时候为其成员<code>foo</code>定义了一个匿名函数。但是，我们也可以首先定义函数然后再将其附属到<code>obj.foo</code>。这样做<code>this</code>的取值也和上面一致：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = { prop: 37 };

function independent() {
  return this.prop;
}

obj.foo = independent;

console.log(obj.foo()); // 37" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> obj = { <span class="hljs-attr">prop</span>: <span class="hljs-number">37</span> };

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">independent</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.prop;
}

obj.foo = independent;

<span class="hljs-built_in">console</span>.log(obj.foo()); <span class="hljs-comment">// 37</span></code></pre>
<p>这说明<code>this</code>的值只与函数<code>foo</code>作为<code>obj</code>的成员被调用有关系。</p>
<p>类似的，<code>this</code>的绑定只受最靠近的成员引用的影响。</p>
<p>在下面的这个例子中，我们把一个方法<code>g</code>当作对象<code>obj.b</code>的函数调用。在这次执行期间，函数中的<code>this</code>将指向<code>obj.b</code>。事实上，这与对象本身的成员没有多大关系，最靠近的引用才是最重要的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = { prop: 37 };

function independent() {
  return this.prop;
}

obj.b = {
  g: independent,
  prop: 42
};

console.log(obj.b.g()); // 42" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> obj = { <span class="hljs-attr">prop</span>: <span class="hljs-number">37</span> };

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">independent</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.prop;
}

obj.b = {
  <span class="hljs-attr">g</span>: independent,
  <span class="hljs-attr">prop</span>: <span class="hljs-number">42</span>
};

<span class="hljs-built_in">console</span>.log(obj.b.g()); <span class="hljs-comment">// 42</span></code></pre>
<h3 id="articleHeader10">3、原型链中的<code>this</code>
</h3>
<p>相同的概念在定义在原型链中的方法也是一致的。如果该方法存在于一个对象的原型链上，那么<code>this</code>指向的是调用这个方法的对象，表现得好像是这个方法就存在于这个对象上一样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
  f : function(){ 
    return this.a + this.b; 
  }
};
var p = Object.create(obj);
p.a = 1;
p.b = 4;

console.log(p.f()); // 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> obj = {
  <span class="hljs-attr">f</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ 
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.a + <span class="hljs-keyword">this</span>.b; 
  }
};
<span class="hljs-keyword">var</span> p = <span class="hljs-built_in">Object</span>.create(obj);
p.a = <span class="hljs-number">1</span>;
p.b = <span class="hljs-number">4</span>;

<span class="hljs-built_in">console</span>.log(p.f()); <span class="hljs-comment">// 5</span></code></pre>
<p>在这个例子中，对象<code>p</code>没有属于它自己的<code>f</code>属性，它的<code>f</code>属性继承自它的原型。但是这对于最终在<code>obj</code>中找到<code>f</code>属性的查找过程来说没有关系；查找过程首先从<code>p.f</code>的引用开始，所以函数中的<code>this</code>指向<code>p</code>。也就是说，因为<code>f</code>是作为<code>p</code>的方法调用的，所以它的<code>this</code>指向了<code>p</code>。这是JavaScript的原型继承中的一个有趣的特性。</p>
<h3 id="articleHeader11">4、<code>getter</code>与<code>setter</code>中的<code>this</code>
</h3>
<p>相同的概念也适用时的函数作为一个<code>getter</code>或者<code>setter</code>调用。作为<code>getter</code>或<code>setter</code>函数都会绑定<code>this</code>到从设置属性或得到属性的那个对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function modulus(){
  return Math.sqrt(this.re * this.re + this.im * this.im);
}

var obj = {
  re: 1,
  im: -1,
  get phase(){
    return Math.atan2(this.im, this.re);
  }
};

Object.defineProperty(obj, 'modulus', {
  get: modulus,
  enumerable: true,
  configurable: true
});

console.log(obj.phase, obj.modulus); // -0.785 1.414" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">modulus</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.sqrt(<span class="hljs-keyword">this</span>.re * <span class="hljs-keyword">this</span>.re + <span class="hljs-keyword">this</span>.im * <span class="hljs-keyword">this</span>.im);
}

<span class="hljs-keyword">var</span> obj = {
  <span class="hljs-attr">re</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attr">im</span>: <span class="hljs-number">-1</span>,
  get phase(){
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.atan2(<span class="hljs-keyword">this</span>.im, <span class="hljs-keyword">this</span>.re);
  }
};

<span class="hljs-built_in">Object</span>.defineProperty(obj, <span class="hljs-string">'modulus'</span>, {
  <span class="hljs-attr">get</span>: modulus,
  <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>
});

<span class="hljs-built_in">console</span>.log(obj.phase, obj.modulus); <span class="hljs-comment">// -0.785 1.414</span></code></pre>
<h3 id="articleHeader12">5、构造函数中的<code>this</code>
</h3>
<p>当一个函数被作为一个构造函数来使用（使用<code>new</code>关键字），它的<code>this</code>与即将被创建的新对象绑定。</p>
<p>注意：当构造器返回的默认值是一个<code>this</code>引用的对象时，可以手动设置返回其他的对象，如果返回值不是一个对象，返回<code>this</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Fn(){
  this.a = 37;
}

var obj = new Fn();
console.log(obj.a); // 37

function Foo(){
  this.a = 37;
  return { a: 38 };
}

obj = new Foo();
console.log(obj.a); // 38" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Fn</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">this</span>.a = <span class="hljs-number">37</span>;
}

<span class="hljs-keyword">var</span> obj = <span class="hljs-keyword">new</span> Fn();
<span class="hljs-built_in">console</span>.log(obj.a); <span class="hljs-comment">// 37</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Foo</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">this</span>.a = <span class="hljs-number">37</span>;
  <span class="hljs-keyword">return</span> { <span class="hljs-attr">a</span>: <span class="hljs-number">38</span> };
}

obj = <span class="hljs-keyword">new</span> Foo();
<span class="hljs-built_in">console</span>.log(obj.a); <span class="hljs-comment">// 38</span></code></pre>
<h3 id="articleHeader13">6、<code>call</code>和<code>apply</code>
</h3>
<p>当一个函数的函数体中使用了<code>this</code>关键字时，通过所有函数都从<code>Function</code>对象的原型中继承的<code>call()</code>方法和<code>apply()</code>方法调用时，它的值可以绑定到一个指定的对象上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(c, d){
  return console.log(this.a + this.b + c + d);
}

var obj = {
  a: 1,
  b: 3
};

add.call(obj, 5, 7); // 1 + 3 + 5 + 7 = 16
add.apply(obj, [10, 20]); // 1 + 3 + 10 + 20 = 34" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params">c, d</span>)</span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a + <span class="hljs-keyword">this</span>.b + c + d);
}

<span class="hljs-keyword">var</span> obj = {
  <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attr">b</span>: <span class="hljs-number">3</span>
};

add.call(obj, <span class="hljs-number">5</span>, <span class="hljs-number">7</span>); <span class="hljs-comment">// 1 + 3 + 5 + 7 = 16</span>
add.apply(obj, [<span class="hljs-number">10</span>, <span class="hljs-number">20</span>]); <span class="hljs-comment">// 1 + 3 + 10 + 20 = 34</span></code></pre>
<p>使用<code>call</code>和<code>apply</code>函数的时候要注意，如果传递的<code>this</code>值不是一个对象，JavaScript将会尝试使用内部 <code>ToObject</code>操作将其转换为对象。因此，如果传递的值是一个原始值比如<code>7</code>或<code>foo</code>，那么就会使用相关构造函数将它转换为对象，所以原始值<code>7</code>通过<code>new Number(7)</code>被转换为对象，而字符串<code>foo</code>使用<code>new String('foo')</code>转化为对象，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function bar() {
  console.log(Object.prototype.toString.call(this));
}

bar.call(7); // [object Number]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.prototype.toString.call(<span class="hljs-keyword">this</span>));
}

bar.call(<span class="hljs-number">7</span>); <span class="hljs-comment">// [object Number]</span></code></pre>
<h3 id="articleHeader14">7、<code>bind()</code>方法</h3>
<p>ECMAScript 5引入了<code>Function.prototype.bind</code>。调用<code>fn.bind(someObject)</code>会创建一个与<code>fn</code>具有相同函数体和作用域的函数，但是在这个新函数中，<code>this</code>将永久地被绑定到了<code>bind</code>的第一个参数，无论这个函数是如何被调用的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn(){
  return this.a;
}

var g = fn.bind({ a: &quot;azerty&quot; });
console.log(g()); // &quot;azerty&quot;

var obj = {
  a: 37,
  foo: fn,
  go: g
};
console.log(obj.foo(), obj.go()); // 37, &quot;azerty&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.a;
}

<span class="hljs-keyword">var</span> g = fn.bind({ <span class="hljs-attr">a</span>: <span class="hljs-string">"azerty"</span> });
<span class="hljs-built_in">console</span>.log(g()); <span class="hljs-comment">// "azerty"</span>

<span class="hljs-keyword">var</span> obj = {
  <span class="hljs-attr">a</span>: <span class="hljs-number">37</span>,
  <span class="hljs-attr">foo</span>: fn,
  <span class="hljs-attr">go</span>: g
};
<span class="hljs-built_in">console</span>.log(obj.foo(), obj.go()); <span class="hljs-comment">// 37, "azerty"</span></code></pre>
<h3 id="articleHeader15">8、DOM事件处理函数中的<code>this</code>
</h3>
<p>当函数被用作事件处理函数时，它的<code>this</code>指向触发事件的元素（一些浏览器在动态添加监听器时不遵守这个约定，除非使用<code>addEventListener</code>）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获取文档中的所有元素的列表
var elements = document.getElementsByTagName('*');

for(var i = 0; i < elements.length; i++){
  // 当元素被点击时，就会变成蓝色
  elements[i].addEventListener('click', function (e) {
    e.stopPropagation();
    console.log(this);
    console.log(e.currentTarget);
    console.log(e.target);
    // 上面3个值是一样的
    this.style.backgroundColor = '#A5D9F3';
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 获取文档中的所有元素的列表</span>
<span class="hljs-keyword">var</span> elements = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'*'</span>);

<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; elements.length; i++){
  <span class="hljs-comment">// 当元素被点击时，就会变成蓝色</span>
  elements[i].addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    e.stopPropagation();
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
    <span class="hljs-built_in">console</span>.log(e.currentTarget);
    <span class="hljs-built_in">console</span>.log(e.target);
    <span class="hljs-comment">// 上面3个值是一样的</span>
    <span class="hljs-keyword">this</span>.style.backgroundColor = <span class="hljs-string">'#A5D9F3'</span>;
  });
}</code></pre>
<h3 id="articleHeader16">9、内联事件处理函数中的<code>this</code>
</h3>
<p>当代码被内联处理函数调用时，它的<code>this</code>指向监听器所在的DOM元素：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button onclick=&quot;alert(this.tagName.toLowerCase());&quot;>
&nbsp; Show this
</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"alert(this.tagName.toLowerCase());"</span>&gt;</span>
&nbsp; Show this
<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre>
<p>上面的<code>alert</code>会显示<code>button</code>。注意只有外层代码中的<code>this</code>是这样设置的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button onclick=&quot;alert((function(){return this})());&quot;>
  Show inner this
</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"alert((function(){return this})());"</span>&gt;</span>
  Show inner this
<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre>
<p>在这种情况下，没有设置内部函数的<code>this</code>，所以它指向<code>global/window</code>对象（即非严格模式下调用的函数未设置<code>this</code>时指向的默认对象）。</p>
<h1 id="articleHeader17">（完）</h1>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 关于this的几道面试题及介绍

## 原文链接
[https://segmentfault.com/a/1190000008590012](https://segmentfault.com/a/1190000008590012)

