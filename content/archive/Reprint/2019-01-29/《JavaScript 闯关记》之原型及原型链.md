---
title: '《JavaScript 闯关记》之原型及原型链' 
date: 2019-01-29 2:30:10
hidden: true
slug: blox1xln3l
categories: [reprint]
---

{{< raw >}}

                    
<p>原型链是一种机制，指的是 JavaScript 每个对象都有一个内置的 <code>__proto__</code> 属性指向创建它的构造函数的 <code>prototype</code>（原型）属性。原型链的作用是为了实现对象的继承，要理解原型链，需要先从<strong>函数对象</strong>、<code>constructor</code>、<code>new</code>、<code>prototype</code>、<code>__proto__</code> 这五个概念入手。</p>
<h2 id="articleHeader0">函数对象</h2>
<p>前面讲过，在 JavaScript 里，函数即对象，程序可以随意操控它们。比如，可以把函数赋值给变量，或者作为参数传递给其他函数，也可以给它们设置属性，甚至调用它们的方法。下面示例代码对「普通对象」和「函数对象」进行了区分。</p>
<p>普通对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var o1 = {};
var o2 = new Object();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> o1 = {};
<span class="hljs-keyword">var</span> o2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();</code></pre>
<p>函数对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f1(){};
var f2 = function(){};
var f3 = new Function('str','console.log(str)');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f1</span>(<span class="hljs-params"></span>)</span>{};
<span class="hljs-keyword">var</span> f2 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{};
<span class="hljs-keyword">var</span> f3 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>(<span class="hljs-string">'str'</span>,<span class="hljs-string">'console.log(str)'</span>);</code></pre>
<p>简单的说，凡是使用 <code>function</code> 关键字或 <code>Function</code> 构造函数创建的对象都是函数对象。而且，只有函数对象才拥有  <code>prototype</code> （原型）属性。</p>
<h2 id="articleHeader1">
<code>constructor</code> 构造函数</h2>
<p>函数还有一种用法，就是把它作为构造函数使用。像 <code>Object</code> 和 <code>Array</code> 这样的原生构造函数，在运行时会自动出现在执行环境中。此外，也可以创建自定义的构造函数，从而自定义对象类型的属性和方法。如下代码所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function(){
        console.log(this.name);
    };
}

var person1 = new Person(&quot;Stone&quot;, 28, &quot;Software Engineer&quot;);
var person2 = new Person(&quot;Sophie&quot;, 29, &quot;English Teacher&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name, age, job</span>)</span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.age = age;
    <span class="hljs-keyword">this</span>.job = job;
    <span class="hljs-keyword">this</span>.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
    };
}

<span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"Stone"</span>, <span class="hljs-number">28</span>, <span class="hljs-string">"Software Engineer"</span>);
<span class="hljs-keyword">var</span> person2 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"Sophie"</span>, <span class="hljs-number">29</span>, <span class="hljs-string">"English Teacher"</span>);</code></pre>
<p>在这个例子中，我们创建了一个自定义构造函数 <code>Person()</code>，并通过该构造函数创建了两个普通对象 <code>person1</code> 和 <code>person2</code>，这两个普通对象均包含3个属性和1个方法。</p>
<p>你应该注意到函数名 <code>Person</code> 使用的是大写字母 <code>P</code>。按照惯例，构造函数始终都应该以一个大写字母开头，而非构造函数则应该以一个小写字母开头。这个做法借鉴自其他面向对象语言，主要是为了区别于 JavaScript 中的其他函数；因为构造函数本身也是函数，只不过可以用来创建对象而已。</p>
<h2 id="articleHeader2">
<code>new</code> 操作符</h2>
<p>要创建 <code>Person</code> 的新实例，必须使用 <code>new</code> 操作符。以这种方式调用构造函数实际上会经历以下4个步骤：</p>
<ol>
<li><p>创建一个新对象；</p></li>
<li><p>将构造函数的作用域赋给新对象（因此 <code>this</code> 就指向了这个新对象）；</p></li>
<li><p>执行构造函数中的代码（为这个新对象添加属性）；</p></li>
<li><p>返回新对象。</p></li>
</ol>
<h3 id="articleHeader3">将构造函数当作函数</h3>
<p>构造函数与其他函数的唯一区别，就在于调用它们的方式不同。不过，构造函数毕竟也是函数，不存在定义构造函数的特殊语法。任何函数，只要通过 <code>new</code> 操作符来调用，那它就可以作为构造函数；而任何函数，如果不通过 <code>new</code> 操作符来调用，那它跟普通函数也不会有什么两样。例如，前面例子中定义的 <code>Person()</code> 函数可以通过下列任何一种方式来调用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 当作构造函数使用
var person = new Person(&quot;Stone&quot;, 28, &quot;Software Engineer&quot;);
person.sayName(); // &quot;Stone&quot;

// 作为普通函数调用
Person(&quot;Sophie&quot;, 29, &quot;English Teacher&quot;); // 添加到 window
window.sayName(); // &quot;Sophie&quot;

// 在另一个对象的作用域中调用
var o = new Object();
Person.call(o, &quot;Tommy&quot;, 3, &quot;Baby&quot;);
o.sayName(); // &quot;Tommy&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 当作构造函数使用</span>
<span class="hljs-keyword">var</span> person = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"Stone"</span>, <span class="hljs-number">28</span>, <span class="hljs-string">"Software Engineer"</span>);
person.sayName(); <span class="hljs-comment">// "Stone"</span>

<span class="hljs-comment">// 作为普通函数调用</span>
Person(<span class="hljs-string">"Sophie"</span>, <span class="hljs-number">29</span>, <span class="hljs-string">"English Teacher"</span>); <span class="hljs-comment">// 添加到 window</span>
<span class="hljs-built_in">window</span>.sayName(); <span class="hljs-comment">// "Sophie"</span>

<span class="hljs-comment">// 在另一个对象的作用域中调用</span>
<span class="hljs-keyword">var</span> o = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
Person.call(o, <span class="hljs-string">"Tommy"</span>, <span class="hljs-number">3</span>, <span class="hljs-string">"Baby"</span>);
o.sayName(); <span class="hljs-comment">// "Tommy"</span></code></pre>
<p>这个例子中的前两行代码展示了构造函数的典型用法，即使用 <code>new</code> 操作符来创建一个新对象。接下来的两行代码展示了不使用 <code>new</code> 操作符调用 <code>Person()</code> 会出现什么结果，属性和方法都被添加给 <code>window</code> 对象了。当在全局作用域中调用一个函数时，<code>this</code> 对象总是指向 <code>Global</code> 对象（在浏览器中就是 <code>window</code> 对象）。因此，在调用完函数之后，可以通过 <code>window</code> 对象来调用 <code>sayName()</code> 方法，并且还返回了 <code>"Sophie"</code> 。最后，也可以使用 <code>call()</code>（或者 <code>apply()</code>）在某个特殊对象的作用域中调用 <code>Person()</code> 函数。这里是在对象 <code>o</code> 的作用域中调用的，因此调用后 <code>o</code> 就拥有了所有属性和 <code>sayName()</code> 方法。</p>
<h3 id="articleHeader4">构造函数的问题</h3>
<p>构造函数模式虽然好用，但也并非没有缺点。使用构造函数的主要问题，就是每个方法都要在每个实例上重新创建一遍。在前面的例子中，<code>person1</code> 和 <code>person2</code> 都有一个名为 <code>sayName()</code> 的方法，但那两个方法不是同一个 <code>Function</code> 的实例。因为 JavaScript 中的函数是对象，因此每定义一个函数，也就是实例化了一个对象。从逻辑角度讲，此时的构造函数也可以这样定义。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = new Function(&quot;console.log(this.name)&quot;); // 与声明函数在逻辑上是等价的
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name, age, job</span>)</span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.age = age;
    <span class="hljs-keyword">this</span>.job = job;
    <span class="hljs-keyword">this</span>.sayName = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>(<span class="hljs-string">"console.log(this.name)"</span>); <span class="hljs-comment">// 与声明函数在逻辑上是等价的</span>
}</code></pre>
<p>从这个角度上来看构造函数，更容易明白每个 <code>Person</code> 实例都包含一个不同的 <code>Function</code> 实例（<code>sayName()</code> 方法）。说得明白些，以这种方式创建函数，虽然创建 <code>Function</code> 新实例的机制仍然是相同的，但是不同实例上的同名函数是不相等的，以下代码可以证明这一点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(person1.sayName == person2.sayName);  // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(person1.sayName == person2.sayName);  <span class="hljs-comment">// false</span></code></pre>
<p>然而，创建两个完成同样任务的 <code>Function</code> 实例的确没有必要；况且有 <code>this</code> 对象在，根本不用在执行代码前就把函数绑定到特定对象上面。因此，大可像下面这样，通过把函数定义转移到构造函数外部来解决这个问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = sayName;
}

function sayName(){
    console.log(this.name);
}

var person1 = new Person(&quot;Stone&quot;, 28, &quot;Software Engineer&quot;);
var person2 = new Person(&quot;Sophie&quot;, 29, &quot;English Teacher&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name, age, job</span>)</span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.age = age;
    <span class="hljs-keyword">this</span>.job = job;
    <span class="hljs-keyword">this</span>.sayName = sayName;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayName</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
}

<span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"Stone"</span>, <span class="hljs-number">28</span>, <span class="hljs-string">"Software Engineer"</span>);
<span class="hljs-keyword">var</span> person2 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"Sophie"</span>, <span class="hljs-number">29</span>, <span class="hljs-string">"English Teacher"</span>);</code></pre>
<p>在这个例子中，我们把 <code>sayName()</code> 函数的定义转移到了构造函数外部。而在构造函数内部，我们将 <code>sayName</code> 属性设置成等于全局的 <code>sayName</code> 函数。这样一来，由于 <code>sayName</code> 包含的是一个指向函数的指针，因此 <code>person1</code> 和 <code>person2</code> 对象就共享了在全局作用域中定义的同一个 <code>sayName()</code> 函数。这样做确实解决了两个函数做同一件事的问题，可是新问题又来了，在全局作用域中定义的函数实际上只能被某个对象调用，这让全局作用域有点名不副实。而更让人无法接受的是，如果对象需要定义很多方法，那么就要定义很多个全局函数，于是我们这个自定义的引用类型就丝毫没有封装性可言了。好在，这些问题可以通过使用原型来解决。</p>
<h2 id="articleHeader5">
<code>prototype</code> 原型</h2>
<p>我们创建的每个函数都有一个 <code>prototype</code>（原型）属性。使用原型的好处是可以让所有对象实例共享它所包含的属性和方法。换句话说，不必在构造函数中定义对象实例的信息，而是可以将这些信息直接添加到原型中，如下面的例子所示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(){}

Person.prototype.name = &quot;Stone&quot;;
Person.prototype.age = 28;
Person.prototype.job = &quot;Software Engineer&quot;;
Person.prototype.sayName = function(){
    console.log(this.name);
};

var person1 = new Person();
person1.sayName();   // &quot;Stone&quot;

var person2 = new Person();
person2.sayName();   // &quot;Stone&quot;

console.log(person1.sayName == person2.sayName);  // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>)</span>{}

Person.prototype.name = <span class="hljs-string">"Stone"</span>;
Person.prototype.age = <span class="hljs-number">28</span>;
Person.prototype.job = <span class="hljs-string">"Software Engineer"</span>;
Person.prototype.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
};

<span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person();
person1.sayName();   <span class="hljs-comment">// "Stone"</span>

<span class="hljs-keyword">var</span> person2 = <span class="hljs-keyword">new</span> Person();
person2.sayName();   <span class="hljs-comment">// "Stone"</span>

<span class="hljs-built_in">console</span>.log(person1.sayName == person2.sayName);  <span class="hljs-comment">// true</span></code></pre>
<p>在此，我们将 <code>sayName()</code> 方法和所有属性直接添加到了 <code>Person</code> 的 <code>prototype</code> 属性中，构造函数变成了空函数。即使如此，也仍然可以通过调用构造函数来创建新对象，而且新对象还会具有相同的属性和方法。但与前面的例子不同的是，新对象的这些属性和方法是由所有实例共享的。换句话说，<code>person1</code> 和 <code>person2</code> 访问的都是同一组属性和同一个 <code>sayName()</code> 函数。</p>
<h3 id="articleHeader6">理解原型对象</h3>
<p>在默认情况下，所有原型对象都会自动获得一个 <code>constructor</code>（构造函数）属性，这个属性包含一个指向 <code>prototype</code> 属性所在函数的指针。就拿前面的例子来说，<code>Person.prototype.constructor</code> 指向 <code>Person</code>。而通过这个构造函数，我们还可继续为原型对象添加其他属性和方法。</p>
<p>虽然可以通过对象实例访问保存在原型中的值，但却不能通过对象实例重写原型中的值。如果我们在实例中添加了一个属性，而该属性与实例原型中的一个属性同名，那我们就在实例中创建该属性，该属性将会屏蔽原型中的那个属性。来看下面的例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(){}

Person.prototype.name = &quot;Stone&quot;;
Person.prototype.age = 28;
Person.prototype.job = &quot;Software Engineer&quot;;
Person.prototype.sayName = function(){
    console.log(this.name);
};

var person1 = new Person();
var person2 = new Person();

person1.name = &quot;Sophie&quot;;
console.log(person1.name);     // &quot;Sophie&quot;，来自实例
console.log(person2.name);     // &quot;Stone&quot;，来自原型
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>)</span>{}

Person.prototype.name = <span class="hljs-string">"Stone"</span>;
Person.prototype.age = <span class="hljs-number">28</span>;
Person.prototype.job = <span class="hljs-string">"Software Engineer"</span>;
Person.prototype.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
};

<span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person();
<span class="hljs-keyword">var</span> person2 = <span class="hljs-keyword">new</span> Person();

person1.name = <span class="hljs-string">"Sophie"</span>;
<span class="hljs-built_in">console</span>.log(person1.name);     <span class="hljs-comment">// "Sophie"，来自实例</span>
<span class="hljs-built_in">console</span>.log(person2.name);     <span class="hljs-comment">// "Stone"，来自原型</span>
</code></pre>
<p>在这个例子中，<code>person1</code> 的 <code>name</code> 被一个新值给屏蔽了。但无论访问 <code>person1.name</code> 还是访问 <code>person2.name</code> 都能够正常地返回值，即分别是 <code>"Sophie"</code>（来自对象实例）和 <code>"Stone"</code>（来自原型）。当访问 <code>person1.name</code> 时，需要读取它的值，因此就会在这个实例上搜索一个名为 <code>name</code> 的属性。这个属性确实存在，于是就返回它的值而不必再搜索原型了。当访问 <code>person2. name</code> 时，并没有在实例上发现该属性，因此就会继续搜索原型，结果在那里找到了 <code>name</code> 属性。</p>
<p>当为对象实例添加一个属性时，这个属性就会<strong>屏蔽</strong>原型中保存的同名属性；换句话说，添加这个属性只会阻止我们访问原型中的那个属性，但不会修改那个属性。即使将这个属性设置为 <code>null</code> ，也只会在实例中设置这个属性，而不会恢复其指向原型的连接。不过，使用 <code>delete</code> 操作符则可以完全删除实例属性，从而让我们能够重新访问原型中的属性，如下所示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(){}

Person.prototype.name = &quot;Stone&quot;;
Person.prototype.age = 28;
Person.prototype.job = &quot;Software Engineer&quot;;
Person.prototype.sayName = function(){
    console.log(this.name);
};

var person1 = new Person();
var person2 = new Person();

person1.name = &quot;Sophie&quot;;
console.log(person1.name);     // &quot;Sophie&quot;，来自实例
console.log(person2.name);     // &quot;Stone&quot;，来自原型

delete person1.name;
console.log(person1.name);     // &quot;Stone&quot;，来自原型" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>)</span>{}

Person.prototype.name = <span class="hljs-string">"Stone"</span>;
Person.prototype.age = <span class="hljs-number">28</span>;
Person.prototype.job = <span class="hljs-string">"Software Engineer"</span>;
Person.prototype.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
};

<span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person();
<span class="hljs-keyword">var</span> person2 = <span class="hljs-keyword">new</span> Person();

person1.name = <span class="hljs-string">"Sophie"</span>;
<span class="hljs-built_in">console</span>.log(person1.name);     <span class="hljs-comment">// "Sophie"，来自实例</span>
<span class="hljs-built_in">console</span>.log(person2.name);     <span class="hljs-comment">// "Stone"，来自原型</span>

<span class="hljs-keyword">delete</span> person1.name;
<span class="hljs-built_in">console</span>.log(person1.name);     <span class="hljs-comment">// "Stone"，来自原型</span></code></pre>
<p>在这个修改后的例子中，我们使用 <code>delete</code> 操作符删除了 <code>person1.name</code>，之前它保存的 <code>"Sophie"</code> 值屏蔽了同名的原型属性。把它删除以后，就恢复了对原型中 <code>name</code> 属性的连接。因此，接下来再调用 <code>person1.name</code> 时，返回的就是原型中 <code>name</code> 属性的值了。</p>
<h3 id="articleHeader7">更简单的原型语法</h3>
<p>前面例子中每添加一个属性和方法就要敲一遍 <code>Person.prototype</code>。为减少不必要的输入，也为了从视觉上更好地封装原型的功能，更常见的做法是用一个包含所有属性和方法的对象字面量来重写整个原型对象，如下面的例子所示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(){}

Person.prototype = {
    name : &quot;Stone&quot;,
    age : 28,
    job: &quot;Software Engineer&quot;,
    sayName : function () {
        console.log(this.name);
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>)</span>{}

Person.prototype = {
    <span class="hljs-attr">name</span> : <span class="hljs-string">"Stone"</span>,
    <span class="hljs-attr">age</span> : <span class="hljs-number">28</span>,
    <span class="hljs-attr">job</span>: <span class="hljs-string">"Software Engineer"</span>,
    <span class="hljs-attr">sayName</span> : <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
    }
};</code></pre>
<p>在上面的代码中，我们将 <code>Person.prototype</code> 设置为等于一个以对象字面量形式创建的新对象。最终结果相同，但有一个例外：<code>constructor</code> 属性不再指向 <code>Person</code> 了。前面曾经介绍过，每创建一个函数，就会同时创建它的 <code>prototype</code> 对象，这个对象也会自动获得 <code>constructor</code> 属性。而我们在这里使用的语法，本质上完全重写了默认的 <code>prototype</code> 对象，因此 <code>constructor</code> 属性也就变成了新对象的 <code>constructor</code> 属性（指向 <code>Object</code> 构造函数），不再指向 <code>Person</code> 函数。此时，尽管 <code>instanceof</code> 操作符还能返回正确的结果，但通过 <code>constructor</code> 已经无法确定对象的类型了，如下所示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var friend = new Person();

console.log(friend instanceof Object);        // true
console.log(friend instanceof Person);        // true
console.log(friend.constructor === Person);    // false
console.log(friend.constructor === Object);    // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> friend = <span class="hljs-keyword">new</span> Person();

<span class="hljs-built_in">console</span>.log(friend <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>);        <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(friend <span class="hljs-keyword">instanceof</span> Person);        <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(friend.constructor === Person);    <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(friend.constructor === <span class="hljs-built_in">Object</span>);    <span class="hljs-comment">// true</span></code></pre>
<p>在此，用 <code>instanceof</code> 操作符测试 <code>Object</code> 和 <code>Person</code> 仍然返回 <code>true</code>，但 <code>constructor</code> 属性则等于 <code>Object</code> 而不等于 <code>Person</code> 了。如果 <code>constructor</code> 的值真的很重要，可以像下面这样特意将它设置回适当的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(){}

Person.prototype = {
    constructor : Person,
    name : &quot;Stone&quot;,
    age : 28,
    job: &quot;Software Engineer&quot;,
    sayName : function () {
        console.log(this.name);
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>)</span>{}

Person.prototype = {
    <span class="hljs-attr">constructor</span> : Person,
    <span class="hljs-attr">name</span> : <span class="hljs-string">"Stone"</span>,
    <span class="hljs-attr">age</span> : <span class="hljs-number">28</span>,
    <span class="hljs-attr">job</span>: <span class="hljs-string">"Software Engineer"</span>,
    <span class="hljs-attr">sayName</span> : <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
    }
};</code></pre>
<p>以上代码特意包含了一个 <code>constructor</code> 属性，并将它的值设置为 <code>Person</code> ，从而确保了通过该属性能够访问到适当的值。</p>
<p>注意，以这种方式重设 <code>constructor</code> 属性会导致它的 <code>[[Enumerable]]</code> 特性被设置为 <code>true</code>。默认情况下，原生的 <code>constructor</code> 属性是不可枚举的，因此如果你使用兼容 ECMAScript 5 的 JavaScript 引擎，可以试一试 <code>Object.defineProperty()</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(){}

Person.prototype = {
    name : &quot;Stone&quot;,
    age : 28,
    job : &quot;Software Engineer&quot;,
    sayName : function () {
        console.log(this.name);
    }
}; 

// 重设构造函数，只适用于 ECMAScript 5 兼容的浏览器
Object.defineProperty(Person.prototype, &quot;constructor&quot;, {
    enumerable: false,
    value: Person
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>)</span>{}

Person.prototype = {
    <span class="hljs-attr">name</span> : <span class="hljs-string">"Stone"</span>,
    <span class="hljs-attr">age</span> : <span class="hljs-number">28</span>,
    <span class="hljs-attr">job</span> : <span class="hljs-string">"Software Engineer"</span>,
    <span class="hljs-attr">sayName</span> : <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
    }
}; 

<span class="hljs-comment">// 重设构造函数，只适用于 ECMAScript 5 兼容的浏览器</span>
<span class="hljs-built_in">Object</span>.defineProperty(Person.prototype, <span class="hljs-string">"constructor"</span>, {
    <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">value</span>: Person
});</code></pre>
<h3 id="articleHeader8">原型的动态性</h3>
<p>由于在原型中查找值的过程是一次搜索，因此我们对原型对象所做的任何修改都能够立即从实例上反映出来，即使是先创建了实例后修改原型也照样如此。请看下面的例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var friend = new Person();

Person.prototype.sayHi = function(){
    console.log(&quot;hi&quot;);
};

friend.sayHi();   // &quot;hi&quot;（没有问题！）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> friend = <span class="hljs-keyword">new</span> Person();

Person.prototype.sayHi = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"hi"</span>);
};

friend.sayHi();   <span class="hljs-comment">// "hi"（没有问题！）</span></code></pre>
<p>以上代码先创建了 <code>Person</code> 的一个实例，并将其保存在 <code>friend</code> 中。然后，下一条语句在 <code>Person.prototype</code> 中添加了一个方法 <code>sayHi()</code>。即使 <code>person</code> 实例是在添加新方法之前创建的，但它仍然可以访问这个新方法。其原因可以归结为实例与原型之间的松散连接关系。当我们调用 <code>friend.sayHi()</code> 时，首先会在实例中搜索名为 <code>sayHi</code> 的属性，在没找到的情况下，会继续搜索原型。因为实例与原型之间的连接只不过是一个指针，而非一个副本，因此就可以在原型中找到新的 <code>sayHi</code> 属性并返回保存在那里的函数。</p>
<p>尽管可以随时为原型添加属性和方法，并且修改能够立即在所有对象实例中反映出来，但如果是重写整个原型对象，那么情况就不一样了。我们知道，调用构造函数时会为实例添加一个指向最初原型的 <code>[[Prototype]]</code> 指针，而把原型修改为另外一个对象就等于切断了构造函数与最初原型之间的联系。请记住：实例中的指针仅指向原型，而不指向构造函数。看下面的例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(){}

var friend = new Person();

Person.prototype = {
    constructor: Person,
    name : &quot;Stone&quot;,
    age : 28,
    job : &quot;Software Engineer&quot;,
    sayName : function () {
        console.log(this.name);
    }
};

friend.sayName();   // Uncaught TypeError: friend.sayName is not a function" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>)</span>{}

<span class="hljs-keyword">var</span> friend = <span class="hljs-keyword">new</span> Person();

Person.prototype = {
    <span class="hljs-attr">constructor</span>: Person,
    <span class="hljs-attr">name</span> : <span class="hljs-string">"Stone"</span>,
    <span class="hljs-attr">age</span> : <span class="hljs-number">28</span>,
    <span class="hljs-attr">job</span> : <span class="hljs-string">"Software Engineer"</span>,
    <span class="hljs-attr">sayName</span> : <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
    }
};

friend.sayName();   <span class="hljs-comment">// Uncaught TypeError: friend.sayName is not a function</span></code></pre>
<p>在这个例子中，我们先创建了 <code>Person</code> 的一个实例，然后又重写了其原型对象。然后在调用 <code>friend.sayName()</code> 时发生了错误，因为 <code>friend</code> 指向的是重写前的原型对象，其中并不包含以该名字命名的属性。</p>
<h3 id="articleHeader9">原生对象的原型</h3>
<p>原型的重要性不仅体现在创建自定义类型方面，就连所有原生的引用类型，都是采用这种模式创建的。所有原生引用类型（<code>Object</code>、<code>Array</code>、<code>String</code>，等等）都在其构造函数的原型上定义了方法。例如，在 <code>Array.prototype</code> 中可以找到 <code>sort()</code> 方法，而在 <code>String.prototype</code> 中可以找到 <code>substring()</code> 方法，如下所示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(typeof Array.prototype.sort);       // &quot;function&quot;
console.log(typeof String.prototype.substring); // &quot;function&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Array</span>.prototype.sort);       <span class="hljs-comment">// "function"</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">String</span>.prototype.substring); <span class="hljs-comment">// "function"</span></code></pre>
<p>通过原生对象的原型，不仅可以取得所有默认方法的引用，而且也可以定义新方法。可以像修改自定义对象的原型一样修改原生对象的原型，因此可以随时添加方法。下面的代码就给基本包装类型 <code>String</code> 添加了一个名为 <code>startsWith()</code> 的方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="String.prototype.startsWith = function (text) {
    return this.indexOf(text) === 0;
};

var msg = &quot;Hello world!&quot;;
console.log(msg.startsWith(&quot;Hello&quot;));   // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">String</span>.prototype.startsWith = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">text</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.indexOf(text) === <span class="hljs-number">0</span>;
};

<span class="hljs-keyword">var</span> msg = <span class="hljs-string">"Hello world!"</span>;
<span class="hljs-built_in">console</span>.log(msg.startsWith(<span class="hljs-string">"Hello"</span>));   <span class="hljs-comment">// true</span></code></pre>
<p>这里新定义的 <code>startsWith()</code> 方法会在传入的文本位于一个字符串开始时返回 <code>true</code>。既然方法被添加给了 <code>String.prototype</code> ，那么当前环境中的所有字符串就都可以调用它。由于 <code>msg</code> 是字符串，而且后台会调用 <code>String</code> 基本包装函数创建这个字符串，因此通过 <code>msg</code> 就可以调用 <code>startsWith()</code> 方法。</p>
<p>尽管可以这样做，但我们不推荐在产品化的程序中修改原生对象的原型。如果因某个实现中缺少某个方法，就在原生对象的原型中添加这个方法，那么当在另一个支持该方法的实现中运行代码时，就可能会导致命名冲突。而且，这样做也可能会意外地重写原生方法。</p>
<h3 id="articleHeader10">原型对象的问题</h3>
<p>原型模式也不是没有缺点。首先，它省略了为构造函数传递初始化参数这一环节，结果所有实例在默认情况下都将取得相同的属性值。虽然这会在某种程度上带来一些不方便，但还不是原型的最大问题。原型模式的最大问题是由其共享的本性所导致的。</p>
<p>原型中所有属性是被很多实例共享的，这种共享对于函数非常合适。对于那些包含基本值的属性倒也说得过去，毕竟（如前面的例子所示），通过在实例上添加一个同名属性，可以隐藏原型中的对应属性。然而，对于包含引用类型值的属性来说，问题就比较突出了。来看下面的例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(){}

Person.prototype = {
    constructor: Person,
    name : &quot;Stone&quot;,
    age : 28,
    job : &quot;Software Engineer&quot;,
    friends : [&quot;ZhangSan&quot;, &quot;LiSi&quot;],
    sayName : function () {
        console.log(this.name);
    }
};

var person1 = new Person();
var person2 = new Person();

person1.friends.push(&quot;WangWu&quot;);

console.log(person1.friends);    // &quot;ZhangSan,LiSi,WangWu&quot;
console.log(person2.friends);    // &quot;ZhangSan,LiSi,WangWu&quot;
console.log(person1.friends === person2.friends);  // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>)</span>{}

Person.prototype = {
    <span class="hljs-attr">constructor</span>: Person,
    <span class="hljs-attr">name</span> : <span class="hljs-string">"Stone"</span>,
    <span class="hljs-attr">age</span> : <span class="hljs-number">28</span>,
    <span class="hljs-attr">job</span> : <span class="hljs-string">"Software Engineer"</span>,
    <span class="hljs-attr">friends</span> : [<span class="hljs-string">"ZhangSan"</span>, <span class="hljs-string">"LiSi"</span>],
    <span class="hljs-attr">sayName</span> : <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
    }
};

<span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person();
<span class="hljs-keyword">var</span> person2 = <span class="hljs-keyword">new</span> Person();

person1.friends.push(<span class="hljs-string">"WangWu"</span>);

<span class="hljs-built_in">console</span>.log(person1.friends);    <span class="hljs-comment">// "ZhangSan,LiSi,WangWu"</span>
<span class="hljs-built_in">console</span>.log(person2.friends);    <span class="hljs-comment">// "ZhangSan,LiSi,WangWu"</span>
<span class="hljs-built_in">console</span>.log(person1.friends === person2.friends);  <span class="hljs-comment">// true</span></code></pre>
<p>在此，<code>Person.prototype</code> 对象有一个名为 <code>friends</code> 的属性，该属性包含一个字符串数组。然后，创建了 <code>Person</code> 的两个实例。接着，修改了 <code>person1.friends</code> 引用的数组，向数组中添加了一个字符串。由于 <code>friends</code> 数组存在于 <code>Person.prototype</code> 而非 <code>person1</code> 中，所以刚刚提到的修改也会通过 <code>person2.friends</code>（与 <code>person1.friends</code> 指向同一个数组）反映出来。假如我们的初衷就是像这样在所有实例中共享一个数组，那么对这个结果我没有话可说。可是，实例一般都是要有属于自己的全部属性的。</p>
<h3 id="articleHeader11">构造函数和原型结合</h3>
<p>所以，构造函数用于定义实例属性，而原型用于定义方法和共享的属性。结果，每个实例都会有自己的一份实例属性的副本，但同时又共享着对方法的引用，最大限度地节省了内存。下面的代码重写了前面的例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = [&quot;ZhangSan&quot;, &quot;LiSi&quot;];
}

Person.prototype = {
    constructor : Person,
    sayName : function(){
        console.log(this.name);
    }
}

var person1 = new Person(&quot;Stone&quot;, 28, &quot;Software Engineer&quot;);
var person2 = new Person(&quot;Sophie&quot;, 29, &quot;English Teacher&quot;);

person1.friends.push(&quot;WangWu&quot;);
console.log(person1.friends);    // &quot;ZhangSan,LiSi,WangWu&quot;
console.log(person2.friends);    // &quot;ZhangSan,LiSi&quot;
console.log(person1.friends === person2.friends);    // false
console.log(person1.sayName === person2.sayName);    // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name, age, job</span>)</span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.age = age;
    <span class="hljs-keyword">this</span>.job = job;
    <span class="hljs-keyword">this</span>.friends = [<span class="hljs-string">"ZhangSan"</span>, <span class="hljs-string">"LiSi"</span>];
}

Person.prototype = {
    <span class="hljs-attr">constructor</span> : Person,
    <span class="hljs-attr">sayName</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
    }
}

<span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"Stone"</span>, <span class="hljs-number">28</span>, <span class="hljs-string">"Software Engineer"</span>);
<span class="hljs-keyword">var</span> person2 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"Sophie"</span>, <span class="hljs-number">29</span>, <span class="hljs-string">"English Teacher"</span>);

person1.friends.push(<span class="hljs-string">"WangWu"</span>);
<span class="hljs-built_in">console</span>.log(person1.friends);    <span class="hljs-comment">// "ZhangSan,LiSi,WangWu"</span>
<span class="hljs-built_in">console</span>.log(person2.friends);    <span class="hljs-comment">// "ZhangSan,LiSi"</span>
<span class="hljs-built_in">console</span>.log(person1.friends === person2.friends);    <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(person1.sayName === person2.sayName);    <span class="hljs-comment">// true</span></code></pre>
<p>在这个例子中，实例属性都是在构造函数中定义的，而由所有实例共享的属性 <code>constructor</code> 和方法 <code>sayName()</code> 则是在原型中定义的。而修改了 <code>person1.friends</code>（向其中添加一个新字符串），并不会影响到 <code>person2.friends</code>，因为它们分别引用了不同的数组。</p>
<p>这种构造函数与原型混成的模式，是目前在 JavaScript 中使用最广泛、认同度最高的一种创建自定义类型的方法。可以说，这是用来定义引用类型的一种默认模式。</p>
<h2 id="articleHeader12"><code>__proto__</code></h2>
<p>为什么在构造函数的 <code>prototype</code> 中定义了属性和方法，它的实例中就能访问呢？</p>
<p>那是因为当调用构造函数创建一个新实例后，该实例的内部将包含一个指针 <code>__proto__</code>，指向构造函数的原型。Firefox、Safari 和 Chrome 的每个对象上都有这个属性 ，而在其他浏览器中是完全不可见的（为了确保浏览器兼容性问题，不要直接使用 <code>__proto__</code> 属性，此处只为解释原型链而演示）。让我们来看下面代码和图片：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007869509?w=936&amp;h=606" src="https://static.alili.tech/img/remote/1460000007869509?w=936&amp;h=606" alt="" title="" style="cursor: pointer;"></span></p>
<p>图中展示了 <code>Person</code> 构造函数、<code>Person</code> 的原型属性以及 <code>Person</code> 现有的两个实例之间的关系。在此，<code>Person.prototype.constructor</code> 指回了 <code>Person</code>。<code>Person.prototype</code> 中除了包含 <code>constructor</code> 属性之外，还包括后来添加的其他属性。此外，要格外注意的是，虽然这两个实例都不包含属性和方法，但我们却可以调用 <code>person1.sayName()</code>。这是因为内部指针 <code>__proto__</code> 指向 <code>Person.prototype</code>，而在 <code>Person.prototype</code> 中能找到 <code>sayName()</code> 方法。</p>
<p>我们来证实一下，<code>__proto__</code> 是不是真的指向 <code>Person.prototype</code> 的？如下代码所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(){}
var person = new Person();
console.log(person.__proto__ === Person.prototype); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>)</span>{}
<span class="hljs-keyword">var</span> person = <span class="hljs-keyword">new</span> Person();
<span class="hljs-built_in">console</span>.log(person.__proto__ === Person.prototype); <span class="hljs-comment">// true</span></code></pre>
<p>既然，<code>__proto__</code> 确实是指向 <code>Person.prototype</code>，那么使用 <code>new</code> 操作符创建对象的过程可以演变为，为实例对象的 <code>__proto__</code> 赋值的过程。如下代码所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(){}

// var person = new Person(); 
// 上一行代码等同于以下过程 ==> 
var person = {};
person.__proto__ = Person.prototype;
Person.call(person);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>)</span>{}

<span class="hljs-comment">// var person = new Person(); </span>
<span class="hljs-comment">// 上一行代码等同于以下过程 ==&gt; </span>
<span class="hljs-keyword">var</span> person = {};
person.__proto__ = Person.prototype;
Person.call(person);</code></pre>
<p>这个例子中，我先创建了一个空对象 <code>person</code>，然后把 <code>person.__proto__</code> 指向了 <code>Person</code> 的原型对象，便继承了 <code>Person</code> 原型对象中的所有属性和方法，最后又以 <code>person</code> 为作用域执行了 <code>Person</code> 函数，<code>person</code> 便就拥有了 <code>Person</code> 的所有属性和方法。这个过程和 <code>var person = new Person();</code> 完全一样。</p>
<p>简单来说，当我们访问一个对象的属性时，如果这个属性不存在，那么就会去 <code>__proto__</code> 里找，这个 <code>__proto__</code> 又会有自己的 <code>__proto__</code>，于是就这样一直找下去，直到找到为止。在找不到的情况下，搜索过程总是要一环一环地前行到原型链末端才会停下来。</p>
<h2 id="articleHeader13">原型链</h2>
<p>JavaScript 中描述了<strong>原型链</strong>的概念，并将原型链作为实现继承的主要方法。其基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。简单回顾一下构造函数、原型和实例的关系：每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针。如下图所示：（图源：<a href="https://segmentfault.com/q/1010000005182807?_ea=1284630">segmentfault.com</a>，作者：<a href="https://segmentfault.com/u/manxisuo" target="_blank">manxisuo</a>）</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007869510?w=590&amp;h=512" src="https://static.alili.tech/img/remote/1460000007869510?w=590&amp;h=512" alt="" title="" style="cursor: pointer;"></span></p>
<p>那么，假如我们让原型对象等于另一个类型的实例，结果会怎么样呢？显然，此时的原型对象将包含一个指向另一个原型的指针，相应地，另一个原型中也包含着一个指向另一个构造函数的指针。假如另一个原型又是另一个类型的实例，那么上述关系依然成立，如此层层递进，就构成了实例与原型的链条。这就是所谓原型链的基本概念。</p>
<p>上面这段话比较绕口，代码更容易理解，让我们来看看实现原型链的基本模式。如下代码所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Father(){
    this.value = true;
}
Father.prototype.getValue = function(){
    return this.value;
};

function Son(){
    this.value2 = false;
}

// 继承了 Father
Son.prototype = new Father();

Son.prototype.getValue2 = function (){
    return this.value2;
};

var son = new Son();
console.log(son.getValue());  // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Father</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.value = <span class="hljs-literal">true</span>;
}
Father.prototype.getValue = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.value;
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Son</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.value2 = <span class="hljs-literal">false</span>;
}

<span class="hljs-comment">// 继承了 Father</span>
Son.prototype = <span class="hljs-keyword">new</span> Father();

Son.prototype.getValue2 = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.value2;
};

<span class="hljs-keyword">var</span> son = <span class="hljs-keyword">new</span> Son();
<span class="hljs-built_in">console</span>.log(son.getValue());  <span class="hljs-comment">// true</span></code></pre>
<p>以上代码定义了两个类型：<code>Father</code> 和 <code>Son</code>。每个类型分别有一个属性和一个方法。它们的主要区别是 <code>Son</code> 继承了 <code>Father</code>，而继承是通过创建 <code>Father</code> 的实例，并将该实例赋给 <code>Son.prototype</code> 实现的。实现的本质是重写原型对象，代之以一个新类型的实例。换句话说，原来存在于 <code>Father</code> 的实例中的所有属性和方法，现在也存在于 <code>Son.prototype</code> 中了。在确立了继承关系之后，我们给 <code>Son.prototype</code> 添加了一个方法，这样就在继承了 <code>Father</code> 的属性和方法的基础上又添加了一个新方法。</p>
<p>我们再用 <code>__proto__</code> 重写上面代码，更便于大家的理解：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Father(){
    this.value = true;
}
Father.prototype.getValue = function(){
    return this.value;
};

function Son(){
    this.value2 = false;
}

// 继承了 Father
// Son.prototype = new Father(); ==>
Son.prototype = {};
Son.prototype.__proto__ = Father.prototype;
Father.call(Son.prototype);

Son.prototype.getValue2 = function (){
    return this.value2;
};

// var son = new Son(); ==>
var son = {};
son.__proto__ = Son.prototype;
Son.call(son);

console.log(son.getValue()); // true
console.log(son.getValue === son.__proto__.__proto__.getValue); // true " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Father</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.value = <span class="hljs-literal">true</span>;
}
Father.prototype.getValue = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.value;
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Son</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.value2 = <span class="hljs-literal">false</span>;
}

<span class="hljs-comment">// 继承了 Father</span>
<span class="hljs-comment">// Son.prototype = new Father(); ==&gt;</span>
Son.prototype = {};
Son.prototype.__proto__ = Father.prototype;
Father.call(Son.prototype);

Son.prototype.getValue2 = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.value2;
};

<span class="hljs-comment">// var son = new Son(); ==&gt;</span>
<span class="hljs-keyword">var</span> son = {};
son.__proto__ = Son.prototype;
Son.call(son);

<span class="hljs-built_in">console</span>.log(son.getValue()); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(son.getValue === son.__proto__.__proto__.getValue); <span class="hljs-comment">// true </span></code></pre>
<p>从以上代码可以看出，实例 <code>son</code> 调用 <code>getValue()</code> 方法，实际是经过了 <code>son.__proto__.__proto__.getValue</code> 的过程的，其中 <code>son.__proto__</code> 等于 <code>Son.prototype</code>，而 <code>Son.prototype.__proto__</code> 又等于 <code>Father.prototype</code>，所以 <code>son.__proto__.__proto__.getValue</code> 其实就是 <code>Father.prototype.getValue</code>。</p>
<p>事实上，前面例子中展示的原型链还少一环。我们知道，所有引用类型默然都继承了 <code>Obeject</code>，而这个继承也是通过原型链实现的。大家要记住，所有函数的默认原型都是 <code>Object</code> 的实例，因此默认原型都会包含一个内部指针 <code>__proto__</code>，指向 <code>Object.prototype</code>。这也正是所有自定义类型都会继承 <code>toString()</code>、<code>valueOf()</code> 等默认方法的根本原因。</p>
<p>下图展示了原型链实现继承的全部过程。（图源：<a href="https://segmentfault.com/q/1010000005182807?_ea=1284630">segmentfault.com</a>，作者：<a href="https://segmentfault.com/u/manxisuo" target="_blank">manxisuo</a>）</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007869511?w=772&amp;h=800" src="https://static.alili.tech/img/remote/1460000007869511?w=772&amp;h=800" alt="" title="" style="cursor: pointer;"></span></p>
<p>上图中，<code>p</code> 指 <code>prototype</code> 属性，<code>[p]</code> 即 <code>__proto__</code> 指对象的原型，<code>[p]</code> 形成的链（虚线部分）就是<strong>原型链</strong>。从图中可以得出以下信息：</p>
<ul>
<li><p><code>Object.prototype</code> 是顶级对象，所有对象都继承自它。</p></li>
<li><p><code>Object.prototype.__proto__ === null</code> ，说明原型链到 <code>Object.prototype</code> 终止。</p></li>
<li><p><code>Function.__proto__</code> 指向 <code>Function.prototype</code>。</p></li>
</ul>
<h2 id="articleHeader14">关卡</h2>
<p>根据描述写出对应的代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 挑战一
// 1.定义一个构造函数 Animal，它有一个 name 属性，以及一个 eat() 原型方法。
// 2.eat() 的方法体为：console.log(this.name + &quot; is eating something.&quot;)。
// 3.new 一个 Animal 的实例 tiger，然后调用 eat() 方法。
// 4.用 __proto__ 模拟 new Animal() 的过程，然后调用 eat() 方法。

var Animal = function(name){
    // 待补充的代码
};

var tiger = new Animal(&quot;tiger&quot;);
// 待补充的代码

var tiger2 = {};
// 待补充的代码" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 挑战一</span>
<span class="hljs-comment">// 1.定义一个构造函数 Animal，它有一个 name 属性，以及一个 eat() 原型方法。</span>
<span class="hljs-comment">// 2.eat() 的方法体为：console.log(this.name + " is eating something.")。</span>
<span class="hljs-comment">// 3.new 一个 Animal 的实例 tiger，然后调用 eat() 方法。</span>
<span class="hljs-comment">// 4.用 __proto__ 模拟 new Animal() 的过程，然后调用 eat() 方法。</span>

<span class="hljs-keyword">var</span> Animal = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>)</span>{
    <span class="hljs-comment">// 待补充的代码</span>
};

<span class="hljs-keyword">var</span> tiger = <span class="hljs-keyword">new</span> Animal(<span class="hljs-string">"tiger"</span>);
<span class="hljs-comment">// 待补充的代码</span>

<span class="hljs-keyword">var</span> tiger2 = {};
<span class="hljs-comment">// 待补充的代码</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 挑战二
// 1.定义一个构造函数 Bird，它继承自 Animal，它有一个 name 属性，以及一个 fly() 原型方法。
// 2.fly() 的方法体为：console.log(this.name + &quot; want to fly higher.&quot;);。
// 3.new 一个 Bird 的实例 pigeon，然后调用 eat() 和 fly() 方法。
// 4.用 __proto__ 模拟 new Bird() 的过程，然后用代码解释 pigeon2 为何能调用 eat() 方法。

var Bird = function(name){
      // 待补充的代码
}

var pigeon = new Bird(&quot;pigeon&quot;);
// 待补充的代码

var pigeon2 = {};
// 待补充的代码" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 挑战二</span>
<span class="hljs-comment">// 1.定义一个构造函数 Bird，它继承自 Animal，它有一个 name 属性，以及一个 fly() 原型方法。</span>
<span class="hljs-comment">// 2.fly() 的方法体为：console.log(this.name + " want to fly higher.");。</span>
<span class="hljs-comment">// 3.new 一个 Bird 的实例 pigeon，然后调用 eat() 和 fly() 方法。</span>
<span class="hljs-comment">// 4.用 __proto__ 模拟 new Bird() 的过程，然后用代码解释 pigeon2 为何能调用 eat() 方法。</span>

<span class="hljs-keyword">var</span> Bird = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>)</span>{
      <span class="hljs-comment">// 待补充的代码</span>
}

<span class="hljs-keyword">var</span> pigeon = <span class="hljs-keyword">new</span> Bird(<span class="hljs-string">"pigeon"</span>);
<span class="hljs-comment">// 待补充的代码</span>

<span class="hljs-keyword">var</span> pigeon2 = {};
<span class="hljs-comment">// 待补充的代码</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 挑战三
// 1.定义一个构造函数 Swallow，它继承自 Bird，它有一个 name 属性，以及一个 nesting() 原型方法。
// 2.nesting() 的方法体为：console.log(this.name + &quot; is nesting now.&quot;);。
// 3.new 一个 Swallow 的实例 yanzi，然后调用 eat()、fly() 和 nesting() 方法。
// 4.用 __proto__ 模拟 new Swallow() 的过程，然后用代码解释 yanzi2 为何能调用 eat() 方法。

var Swallow = function(name){
      // 待补充的代码
}

var yanzi = new Swallow(&quot;yanzi&quot;);
// 待补充的代码

var yanzi2 = {};
// 待补充的代码" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 挑战三</span>
<span class="hljs-comment">// 1.定义一个构造函数 Swallow，它继承自 Bird，它有一个 name 属性，以及一个 nesting() 原型方法。</span>
<span class="hljs-comment">// 2.nesting() 的方法体为：console.log(this.name + " is nesting now.");。</span>
<span class="hljs-comment">// 3.new 一个 Swallow 的实例 yanzi，然后调用 eat()、fly() 和 nesting() 方法。</span>
<span class="hljs-comment">// 4.用 __proto__ 模拟 new Swallow() 的过程，然后用代码解释 yanzi2 为何能调用 eat() 方法。</span>

<span class="hljs-keyword">var</span> Swallow = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>)</span>{
      <span class="hljs-comment">// 待补充的代码</span>
}

<span class="hljs-keyword">var</span> yanzi = <span class="hljs-keyword">new</span> Swallow(<span class="hljs-string">"yanzi"</span>);
<span class="hljs-comment">// 待补充的代码</span>

<span class="hljs-keyword">var</span> yanzi2 = {};
<span class="hljs-comment">// 待补充的代码</span></code></pre>
<h2 id="articleHeader15">更多</h2>
<blockquote><p>关注微信公众号「劼哥舍」回复「答案」，获取关卡详解。  <br>关注 <a href="https://github.com/stone0090/javascript-lessons" rel="nofollow noreferrer" target="_blank">https://github.com/stone0090/javascript-lessons</a>，获取最新动态。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
《JavaScript 闯关记》之原型及原型链

## 原文链接
[https://segmentfault.com/a/1190000007869506](https://segmentfault.com/a/1190000007869506)

