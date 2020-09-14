---
title: '关于 this 你想知道的一切都在这里' 
date: 2019-01-28 2:30:09
hidden: true
slug: oit8log8oln
categories: [reprint]
---

{{< raw >}}

                    
<p>无论在 <code>javascript</code> 的日常使用中还是前端面试过程中，<code>this</code> 的出镜率都极高。这无疑说明了，<code>this</code> 的重要性。但是 <code>this</code> 非常灵活，导致很多人觉得 <code>this</code> 的行为难以理解。本文从为什么要有 <code>this</code> 作为切入点，总结了 <code>this</code> 的六大规则，希望能帮助你解答困惑。</p>
<h2 id="articleHeader0">简介</h2>
<p>this 实际上相当于一个参数，这个参数可能是开发中手动传入的，也可能是 JS 或者第三方传入的。<br>这个参数，通常指向的是函数执行时的“拥有者”。<code>this</code> 的机制，可以让函数设计的更加简洁，并且复用性更好。</p>
<p><code>this</code> 是在函数执行时进行绑定的，绑定规则一共六条，分别是：</p>
<ul>
<li><p><code>new</code> 绑定：使用 <code>new</code> 关键字创建对象时，<code>this</code> 会绑定到创建的对象上。</p></li>
<li><p>显式绑定：使用 <code>call</code>、<code>apply</code> 或 <code>bind</code> 方法显式绑定时， <code>this</code> 为其第一个参数。</p></li>
<li><p>隐式绑定：当函数挂在对象上执行时，系统会隐式地将 <code>this</code> 绑定到该对象上。</p></li>
<li><p>默认绑定：当函数独立执行时，严格模式 <code>this</code> 的默认绑定值为 <code>undefined</code>，否则为全局对象。</p></li>
<li><p>箭头函数绑定：使用箭头函数时，<code>this</code>的绑定值等于其外层的普通函数（或者全局对象本身）的<code>this</code>。</p></li>
<li><p>系统或第三方绑定：当函数作为参数，传入系统或者第三方提供的接口时，传入函数中的 <code>this</code> 是由系统或者第三方绑定的。</p></li>
</ul>
<h2 id="articleHeader1">
<code>this</code> 的作用</h2>
<p>this 的机制提供了一个优雅的方式，隐式地传递一个对象，这可以让函数设计的更加简洁，并且复用性更好。</p>
<p>考虑下面一个例子，有两个按钮，点击后将其背景改为红色。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function changeBackgroundColor(ele) {
  ele.style.backgroundColor = 'red';
}

btn1.addEventListener('click',function () {
  changeBackgroundColor(btn1);
});
btn2.addEventListener('click',function () {
  changeBackgroundColor(btn2);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">changeBackgroundColor</span>(<span class="hljs-params">ele</span>) </span>{
  ele.style.backgroundColor = <span class="hljs-string">'red'</span>;
}

btn1.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  changeBackgroundColor(btn1);
});
btn2.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  changeBackgroundColor(btn2);
});</code></pre>
<p>在这里，我们显式地将被点击的元素传递给了 <code>changeBackgroundColor</code> 函数。但实际上，这里可以利用  <code>this</code> 隐式传递上下文的特点，直接在函数获取当前被点击的元素。如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function changeBackgroundColor() {
    this.style.backgroundColor = 'red';
}

btn1.addEventListener('click',changeBackgroundColor);
btn2.addEventListener('click',changeBackgroundColor);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">changeBackgroundColor</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.style.backgroundColor = <span class="hljs-string">'red'</span>;
}

btn1.addEventListener(<span class="hljs-string">'click'</span>,changeBackgroundColor);
btn2.addEventListener(<span class="hljs-string">'click'</span>,changeBackgroundColor);</code></pre>
<p>在第一个例子中，被点击元素是通过 <code>ele</code> ，这个形式参数来代替的。而在第二个例子中，是通过一个特殊的关键字 <code>this</code> 来代替。<code>this</code> 它的作用和形式参数类似，其本质上是一个对象的引用，它的特殊性在于不需要手动传值，所以使用起来会更加简单和方便。</p>
<h2 id="articleHeader2">六大规则</h2>
<p>在实际使用中， <code>this</code> 究竟指向哪个对象是最令人困惑的。本文归类了六类情景，总结六条 <code>this</code> 的绑定规则。</p>
<h3 id="articleHeader3">
<code>new</code> 绑定</h3>
<p>使用 <code>new</code> 创建对象的时候，类中的 <code>this</code> 指的是什么？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Person {
  constructor(name){
    this.name = name;
  }

  getThis(){
    return this
  }
}


const xiaoMing = new Person(&quot;小明&quot;);

console.log(xiaoMing.getThis() === xiaoMing); // true
console.log(xiaoMing.getThis() === Person); // false
console.log(xiaoMing.name === &quot;小明&quot;); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> </span>{
  <span class="hljs-keyword">constructor</span>(name){
    <span class="hljs-keyword">this</span>.name = name;
  }

  getThis(){
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
  }
}


<span class="hljs-keyword">const</span> xiaoMing = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"小明"</span>);

<span class="hljs-built_in">console</span>.log(xiaoMing.getThis() === xiaoMing); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(xiaoMing.getThis() === Person); <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(xiaoMing.name === <span class="hljs-string">"小明"</span>); <span class="hljs-comment">// true</span></code></pre>
<p>在上面例子中，使用了 ES6 的语法创建了 <code>Person</code> 类。在使用 <code>new</code> 关键字创建对象的过程中，<code>this</code> 会由系统自动绑定到创建的对象上，也就是 <code>xiaoMing</code>。</p>
<p>规则一：在使用 <code>new</code> 关键字创建对象时，<code>this</code> 会绑定到创建的对象上。</p>
<h3 id="articleHeader4">显式绑定</h3>
<p>情景二，使用 <code>call</code>、<code>apply</code> 和 <code>bind</code> 方法，显式绑定 <code>this</code> 参数。</p>
<p>以 <code>call</code> 为例，<code>call</code> 方法的第一个传入的参数，是 <code>this</code> 引用的对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
  console.log( this === obj ); // true
  console.log( this.a === 2 ); // true
}

const obj = {
  a: 2
};

foo.call( obj );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span> === obj ); <span class="hljs-comment">// true</span>
  <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span>.a === <span class="hljs-number">2</span> ); <span class="hljs-comment">// true</span>
}

<span class="hljs-keyword">const</span> obj = {
  <span class="hljs-attr">a</span>: <span class="hljs-number">2</span>
};

foo.call( obj );</code></pre>
<p>在显式传递的情况下，<code>this</code> 指向的对象很明显，就是 <code>call</code>、<code>apply</code> 或 <code>bind</code> 方法的第一个参数。</p>
<p>规则二：使用 <code>call</code>、<code>apply</code> 或 <code>bind</code> 方法显式绑定时， <code>this</code> 为其第一个参数。</p>
<h3 id="articleHeader5">隐式绑定</h3>
<p>隐式绑定和显式绑定不同的地方在于，显式绑定由开发者来指定 <code>this</code>；而隐式绑定时，函数或方法都会有一个“拥有者”，这个“拥有者”指的是直接调用的函数或方法对象。</p>
<h4>例一</h4>
<p>先看一个最简单的例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function bar() {
  console.log( this === obj );
}

const obj = {
  foo: function () {
    console.log( this === obj );
  },
  bar: bar
};

obj.foo(); // true
obj.bar(); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span> === obj );
}

<span class="hljs-keyword">const</span> obj = {
  <span class="hljs-attr">foo</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span> === obj );
  },
  <span class="hljs-attr">bar</span>: bar
};

obj.foo(); <span class="hljs-comment">// true</span>
obj.bar(); <span class="hljs-comment">// true</span></code></pre>
<p>函数 <code>foo</code> 是直接挂在对象 <code>obj</code> 里面的，函数 <code>bar</code> 是在外面定义的，然后挂在对象 <code>obj</code> 上的。无论函数是在何处定义，但最后<strong>函数调用</strong>时，它的“拥有者”是 <code>obj</code>。所以 <code>this</code> 指向的是函数调用时的“拥有者” <code>obj</code>。</p>
<h4>例二</h4>
<p>为了更加深入的理解，再考虑函数重新赋值到新的对象上的情况，来看看下面的例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function bar() {
  console.log( this === obj1 ); // false
  console.log( this === obj2 ); // true
}

const obj1 = {
  foo: function () {
    console.log( this === obj1 ); // false
    console.log( this === obj2 ); // true
  },
  bar: bar
};

const obj2 = {
  foo: obj1.foo,
  bar: obj1.bar
};

obj2.foo();
obj2.bar();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span> === obj1 ); <span class="hljs-comment">// false</span>
  <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span> === obj2 ); <span class="hljs-comment">// true</span>
}

<span class="hljs-keyword">const</span> obj1 = {
  <span class="hljs-attr">foo</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span> === obj1 ); <span class="hljs-comment">// false</span>
    <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span> === obj2 ); <span class="hljs-comment">// true</span>
  },
  <span class="hljs-attr">bar</span>: bar
};

<span class="hljs-keyword">const</span> obj2 = {
  <span class="hljs-attr">foo</span>: obj1.foo,
  <span class="hljs-attr">bar</span>: obj1.bar
};

obj2.foo();
obj2.bar();</code></pre>
<p>在该例子中，将 <code>obj1</code> 中的 <code>foo</code> 和 <code>bar</code> 方法赋值给了 <code>obj2</code>。函数调用时，“拥有者”是 <code>obj2</code>，而不是 <code>obj1</code>。所以 <code>this</code> 指向的是 <code>obj2</code>。</p>
<h4>例三</h4>
<p>对象可以多层嵌套，在这种情况下执行函数，函数的“拥有者”是谁呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj1 = {
  obj2: {
    foo: function foo() {
      console.log( this === obj1 );      // false
      console.log( this === obj1.obj2 ); // true
    }
  }
};

obj1.obj2.foo()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> obj1 = {
  <span class="hljs-attr">obj2</span>: {
    <span class="hljs-attr">foo</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span> === obj1 );      <span class="hljs-comment">// false</span>
      <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span> === obj1.obj2 ); <span class="hljs-comment">// true</span>
    }
  }
};

obj1.obj2.foo()</code></pre>
<p><code>foo</code> 方法/函数中的直接调用者是 <code>obj2</code>，而不是 <code>obj1</code>，所以函数的“拥有者”指向的是离它最近的直接调用者。</p>
<h4>例四</h4>
<p>如果一个方法/函数，在它的直接对象上调用执行，又同时执行了 <code>call</code> 方法，那么它是属于隐式绑定还是显式绑定呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj1 = {
  a: 1,
  foo: function () {
    console.log(this === obj1); // false
    console.log(this === obj2); // true
    console.log(this.a === 2);  // true
  }
};

const obj2 = {
  a: 2
};

obj1.foo.call(obj2); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> obj1 = {
  <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attr">foo</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === obj1); <span class="hljs-comment">// false</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === obj2); <span class="hljs-comment">// true</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a === <span class="hljs-number">2</span>);  <span class="hljs-comment">// true</span>
  }
};

<span class="hljs-keyword">const</span> obj2 = {
  <span class="hljs-attr">a</span>: <span class="hljs-number">2</span>
};

obj1.foo.call(obj2); <span class="hljs-comment">// true</span></code></pre>
<p>由上，可以看出，如果显式绑定存在，它就不可能属于隐式绑定。</p>
<p>规则三：如果函数是挂在对象上执行的，这个时候系统会隐式的将 <code>this</code> 绑定为函数执行时的“拥有者”。</p>
<h3 id="articleHeader6">默认绑定</h3>
<p>前一小段，讨论了函数作为对象的方法执行时的情况。本小段，要讨论的是，函数独立执行的情况。</p>
<p>在函数直接调用的情况下，<code>this</code> 绑定的行为，称之为默认绑定。</p>
<h4>例一</h4>
<p>为了简单起见，先讨论在浏览器的非严格模式的下绑定行为。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
  console.log( this === window); // true
}

foo();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span> === <span class="hljs-built_in">window</span>); <span class="hljs-comment">// true</span>
}

foo();</code></pre>
<p>在上面的例子中，系统将 <code>window</code> 默认地绑定到函数的 <code>this</code> 上。</p>
<h4>例二</h4>
<p>在这里，先介绍一种我们可能会在代码中见到的显式绑定 <code>null</code> 的写法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
  console.log( this == window ); // true
}

foo.apply(null);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span> == <span class="hljs-built_in">window</span> ); <span class="hljs-comment">// true</span>
}

foo.apply(<span class="hljs-literal">null</span>);</code></pre>
<p>将例一默认绑定的情况，改为了显式绑定 <code>null</code> 的情况。</p>
<p>在实际开发中，我们可能会用到 <code>apply</code> 方法，并在第一个参数传入 <code>null</code> 值，第二个参数传入数组的方式来传递数组类型的参数。这是一种传统的写法，当然现在可以用 <code>ES6</code> 的写法来代替，但是这不在本文的讨论范围内。</p>
<p>在本例最需要关注的是，<code>this</code> 竟然指向的 <code>window</code> 而不是 <code>null</code>。个人测试的结果是，在函数独立调用时，或者显式调用，传入的值为 <code>null</code> 和 <code>undefined</code> 的情况下，会将 <code>window</code> 默认绑定到 <code>this</code> 上。</p>
<p>在函数多次调用，形成了一个调用栈的情况下，默认绑定的规则也是成立的。</p>
<h4>例三</h4>
<p>接着，探讨下严格模式下，<code>this</code> 的默认绑定的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;use strict&quot;;

function foo() {
  console.log( this === undefined );
}

foo();               // true
foo.call(undefined); // true
foo.call(null);      // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-meta">"use strict"</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span> === <span class="hljs-literal">undefined</span> );
}

foo();               <span class="hljs-comment">// true</span>
foo.call(<span class="hljs-literal">undefined</span>); <span class="hljs-comment">// true</span>
foo.call(<span class="hljs-literal">null</span>);      <span class="hljs-comment">// false</span></code></pre>
<p>在严格模式下，<code>this</code> 的默认绑定的值为 <code>undefined</code>。</p>
<p>规则四：在函数独立执行的情况下，严格模式 <code>this</code> 的默认绑定值为 <code>undefined</code>，否则默认绑定的值为 <code>window</code>。</p>
<h3 id="articleHeader7">箭头函数绑定</h3>
<p>箭头函数实际上，只是一个语法糖，实际上箭头函数中的 <code>this</code> 实际上是其外层函数（或者 window/global 本身）中的 <code>this</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES6
function foo() {
  setTimeout(() => {
    console.log(this === obj); // true
  }, 100);
}

const obj = {
  a : 1
}

foo.call(obj);

// ES5
function foo() {
  var _this = this;

  setTimeout(function () {
    console.log(_this === obj); // true
  }, 100);
}

var obj = {
  a : 1
}

foo.call(obj);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// ES6</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === obj); <span class="hljs-comment">// true</span>
  }, <span class="hljs-number">100</span>);
}

<span class="hljs-keyword">const</span> obj = {
  <span class="hljs-attr">a</span> : <span class="hljs-number">1</span>
}

foo.call(obj);

<span class="hljs-comment">// ES5</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;

  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(_this === obj); <span class="hljs-comment">// true</span>
  }, <span class="hljs-number">100</span>);
}

<span class="hljs-keyword">var</span> obj = {
  <span class="hljs-attr">a</span> : <span class="hljs-number">1</span>
}

foo.call(obj);</code></pre>
<p>规则五：使用箭头函数时，<code>this</code> 的绑定值和其外层的普通函数（或者 window/global 本身） <code>this</code> 绑定值相同。</p>
<h3 id="articleHeader8">系统或第三方绑定</h3>
<p>在 JavaScript 中，函数是第一公民，可以将函数以值的方式，传入任何系统或者第三方提供的函数中。现在讨论，最后一种情况。当将函数作为值，传入系统函数或者第三方函数中时，<code>this</code> 究竟是如何绑定的。</p>
<p>我们在文章一开始提到的，两个按钮例子，系统自动将 <code>this</code> 绑定为点击的按钮。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function changeBackgroundColor() {
    console.log(this === btn1); // true
}

btn1.addEventListener('click',changeBackgroundColor);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">changeBackgroundColor</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === btn1); <span class="hljs-comment">// true</span>
}

btn1.addEventListener(<span class="hljs-string">'click'</span>,changeBackgroundColor);</code></pre>
<p>接着测试系统提供的 <code>setTimeout</code> 接口在浏览器和 node 中绑定行为。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 浏览器
setTimeout(function () {
  console.log(this === window); // true
},0)

// node
setTimeout(function () {
  console.log(this === global); // false
  console.log(this); // Timeout
},0)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 浏览器</span>
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === <span class="hljs-built_in">window</span>); <span class="hljs-comment">// true</span>
},<span class="hljs-number">0</span>)

<span class="hljs-comment">// node</span>
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === global); <span class="hljs-comment">// false</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>); <span class="hljs-comment">// Timeout</span>
},<span class="hljs-number">0</span>)</code></pre>
<p>很神奇的是，<code>setTimeout</code> 在 node 和浏览器中的绑定行为不一致。如果我们将 node 的中的 <code>this</code> 打印出来，会发现它绑定是一个 <code>Timeout</code> 对象。</p>
<p>如果是第三发提供的接口，情况会更加复杂。因为在其内部，会将什么值绑定到传入的函数的 <code>this</code> 上，事先是不知道的，除非查看文档或者源码。</p>
<p>系统或者第三方，在其内部，可能会使用前面的五种规则一种或多种规则，对传入函数的 <code>this</code> 进行绑定。所以，规则六，实际上一条在由前五条规则上衍生出来的规则。</p>
<p>规则六：调用系统或者第三方提供的接口时，传入函数中的 <code>this</code> 是由系统或者第三方绑定的。</p>
<p>参考文章：</p>
<p><a href="https://github.com/getify/You-Dont-Know-JS/tree/master/this%20%26%20object%20prototypes" rel="nofollow noreferrer" target="_blank">You-Dont-Know-JS</a></p>
<p><a href="http://www.quirksmode.org/js/this.html" rel="nofollow noreferrer" target="_blank">The this keyword</a></p>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this" rel="nofollow noreferrer" target="_blank">MDN  this</a></p>
<hr>
<h2 id="articleHeader9">后期补充</h2>
<p>查完规范后，用伪代码再总结一下。</p>
<p>规范地址：</p>
<p>Construct：<a href="http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-function-objects-construct-argumentslist-newtarget" rel="nofollow noreferrer" target="_blank">http://www.ecma-international...</a><br>Function Objects：<a href="http://www.ecma-international.org/ecma-262/6.0/#sec-ordinarycallbindthis" rel="nofollow noreferrer" target="_blank">http://www.ecma-international...</a><br>Function Calls：<a href="http://www.ecma-international.org/ecma-262/6.0/#sec-function-calls-runtime-semantics-evaluation" rel="nofollow noreferrer" target="_blank">http://www.ecma-international...</a><br>ArrowFunction：<a href="http://www.ecma-international.org/ecma-262/6.0/#sec-arrow-function-definitions-runtime-semantics-evaluation" rel="nofollow noreferrer" target="_blank">http://www.ecma-international...</a></p>
<p>伪代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
if (`newObj = new Object()`) {
  this = newObj
} else if (`bind/call/apply(thisArgument,...)`) {
  if (`use strict`) {
    this = thisArgument
  } else {
    if (thisArgument == null || thisArgument == undefined) {
      this = window || global
    } else {
      this = ToObject(thisArgument)
    }
  }
} else if (`Function Call`) {
  if (`obj.foo()`) {
    // base value . Reference = base value + reference name + strict reference
    // 例外： super.render(obj).  this = childObj ?
    this = obj 
  } else if (`foo()`) {
    // 例外： with statement. this = with object    
    this = `use strict` ? undefined : window || global
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">if</span> (<span class="hljs-string">`newObj = new Object()`</span>) {
  <span class="hljs-keyword">this</span> = newObj
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-string">`bind/call/apply(thisArgument,...)`</span>) {
  <span class="hljs-keyword">if</span> (<span class="hljs-string">`use strict`</span>) {
    <span class="hljs-keyword">this</span> = thisArgument
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">if</span> (thisArgument == <span class="hljs-literal">null</span> || thisArgument == <span class="hljs-literal">undefined</span>) {
      <span class="hljs-keyword">this</span> = <span class="hljs-built_in">window</span> || global
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">this</span> = ToObject(thisArgument)
    }
  }
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-string">`Function Call`</span>) {
  <span class="hljs-keyword">if</span> (<span class="hljs-string">`obj.foo()`</span>) {
    <span class="hljs-comment">// base value . Reference = base value + reference name + strict reference</span>
    <span class="hljs-comment">// 例外： super.render(obj).  this = childObj ?</span>
    <span class="hljs-keyword">this</span> = obj 
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-string">`foo()`</span>) {
    <span class="hljs-comment">// 例外： with statement. this = with object</span>    
    <span class="hljs-keyword">this</span> = <span class="hljs-string">`use strict`</span> ? <span class="hljs-literal">undefined</span> : <span class="hljs-built_in">window</span> || global
  }
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于 this 你想知道的一切都在这里

## 原文链接
[https://segmentfault.com/a/1190000008156495](https://segmentfault.com/a/1190000008156495)

