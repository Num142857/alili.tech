---
title: 'JavaScript学习总结——原型' 
date: 2019-02-11 2:30:49
hidden: true
slug: f2qwu87c948
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">什么是原型</h2>
<p>首先，原型是一个对象。而且所有的对象都有一个原型（有一种例外：当把对象的原型设为null时），并且任何对象都可以成为一个原型。</p>
<p>当我们定义一个对象时 <code>var a = new Object();</code> 默认的原型在原型链的顶端。</p>
<h2 id="articleHeader1">原型有什么好处</h2>
<p>原型最大的好处体现在它的 <code>共享</code> 的特性。所有原型对象的实例对象共享它所包含的属性和方法。所以我们常用利用原型来创建对象，也就是 <code>原型模式</code>。</p>
<h2 id="articleHeader2">原型模式</h2>
<p><code>原型模式</code> 是一种用来创建多个实例对象的方法，我们常常把它和 <code>构造函数</code>结合起来用来创建特定类型的对象。</p>
<p>我们创建的每一个函数都有一个 <code>prototype</code> 属性，这个属性是一个指针，指向一个对象。这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。这个对象就是实际上通过调用构造函数而创建的 <code>实例对象</code> 的原型对象。<strong>看代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 构造函数
function Person(){};

Person.prototype.name = &quot;darko&quot;;
Person.prototype.age = 21;
Person.prototype.sayName = function(){
    alert(this.name);
}

var person1 = new Person();
person1.sayName();  // &quot;darko&quot;

var person2 = new Person(); 
person2.sayName();  // &quot;darko&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 构造函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>)</span>{};

Person.prototype.name = <span class="hljs-string">"darko"</span>;
Person.prototype.age = <span class="hljs-number">21</span>;
Person.prototype.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    alert(<span class="hljs-keyword">this</span>.name);
}

<span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person();
person1.sayName();  <span class="hljs-comment">// "darko"</span>

<span class="hljs-keyword">var</span> person2 = <span class="hljs-keyword">new</span> Person(); 
person2.sayName();  <span class="hljs-comment">// "darko"</span></code></pre>
<p>我们将所有的属性和<code>sayName()</code>方法添加到了构造函数<code>Person</code>的<code>prototype</code>属性中，构造函数成了空函数。但是即便如此，我们也可以通过调用构造函数来创建新对象，而且新对象还会具有相同的属性和方法。</p>
<h2 id="articleHeader3">构造函数，实例对象和原型对象的关系</h2>
<p>实例对象就是通过构造函数创造的，默认拥有一个<code>constructor</code>属性指向其构造函数。</p>
<p>原型对象就是构造函数的属性<code>prototype</code>指向的那个对象，同时也是基于构造函数生成的实例对象的原型对象。在默认情况下，所有的原型对象都会自动获得一个<code>constructor</code>属性，这个属性是一个指针，指向其构造函数。</p>
<p>实例对象可以访问原型对象上的属性和方法。在实例对象的内部有一个属性（内部属性）<code>[[Prototype]]</code>指向其原型对象。有一种非标准方法<code>__proto__</code>访问<code>[[Prototype]]</code>。</p>
<p>在上面的例子中<code>person1</code>和<code>person2</code>就是实例对象，构造函数为<code>Person</code>，原型对象为<code>Person.prototype</code>。</p>
<p><strong>来，看个栗子（还是上面那段代码）:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="alert(person1.constructor === Person);  // true

alert(Person.prototype.constructor === Person);  // true

alerta(person1.__proto__ === Person.prototype); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">alert(person1.constructor === Person);  <span class="hljs-comment">// true</span>

alert(Person.prototype.constructor === Person);  <span class="hljs-comment">// true</span>

alerta(person1.__proto__ === Person.prototype); <span class="hljs-comment">// true</span></code></pre>
<p><strong>来看个图你就什么都懂了：</strong><br><span class="img-wrap"><img data-src="/img/bVuPX9" src="https://static.alili.tech/img/bVuPX9" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">理解prototype，getPrototypeOf和 <strong>proto</strong> 之间的不同</h2>
<p><code>prototype</code>是函数的一个默认属性，只有函数对象才有</p>
<p><code>Object.getPrototypeOf()</code>方法用来返回实例对象内部属性<code>[[prototype]]</code>的值。这是ES5中定义的用来获取原型对象的标准方法。</p>
<p><code>__proto__</code>属性是获取原型对象的非标准方法（IE不支持）<br><strong>看个栗子（还是上面那段代码）:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="alert(Object.getPrototypeOf(person1) === Person.prototype); // true
alert(Object.getPrototypeOf(person1).name); // &quot;darko&quot;

alert(person1.__proto__ === Person.prototype);    // true
alert(person1.__proto__.name);  // &quot;darko&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code class="javascrit">alert(<span class="hljs-name">Object</span>.getPrototypeOf(<span class="hljs-name">person1</span>) === Person.prototype)<span class="hljs-comment">; // true</span>
alert(<span class="hljs-name">Object</span>.getPrototypeOf(<span class="hljs-name">person1</span>).name)<span class="hljs-comment">; // "darko"</span>

alert(<span class="hljs-name">person1</span>.__proto__ === Person.prototype)<span class="hljs-comment">;    // true</span>
alert(<span class="hljs-name">person1</span>.__proto__.name)<span class="hljs-comment">;  // "darko"</span></code></pre>
<h2 id="articleHeader5">原型模式下的对象</h2>
<p>每次查找对象的每个属性，都是一次搜索。搜索从实例对象本身开始，如果在实例对象中找到，停止查找，返回值。如果没有则继续搜索实例对象指向的原型对象。</p>
<p>若实例对象中属性和其指向的原型对象的属性重名，实例对象中的属性屏蔽原型对象中的那个属性。<br><strong>举个栗子：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(){};

Person.prototype.name = &quot;darko&quot;;
Person.prototype.age = 21;
Person.prototype.sayName = function(){
    alert(this.name);
}

var person1 = new Person();
var person2 = new Person();

person1.name = &quot;leon&quot;;
person1.sayName();   // &quot;leon&quot;，来自实例
person2.sayName()   // &quot;darko&quot;，来自原型

delete person1.name;
person1.sayName();  // &quot;darko&quot;，来自原型" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>)</span>{};

Person.prototype.name = <span class="hljs-string">"darko"</span>;
Person.prototype.age = <span class="hljs-number">21</span>;
Person.prototype.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    alert(<span class="hljs-keyword">this</span>.name);
}

<span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person();
<span class="hljs-keyword">var</span> person2 = <span class="hljs-keyword">new</span> Person();

person1.name = <span class="hljs-string">"leon"</span>;
person1.sayName();   <span class="hljs-comment">// "leon"，来自实例</span>
person2.sayName()   <span class="hljs-comment">// "darko"，来自原型</span>

<span class="hljs-keyword">delete</span> person1.name;
person1.sayName();  <span class="hljs-comment">// "darko"，来自原型</span></code></pre>
<p>可以利用<code>hasOwnProperty()</code>方法判断一个属性是位于实例中，还是原型中。只有在属性来自实例中时，才会返回<code>true</code>。通常和<code>in</code>操作符配合使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 接上
alert(&quot;name&quot; in person1);   // true
alert(person1.hasOwnProperty(&quot;name&quot;));  // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// 接上</span>
<span class="hljs-selector-tag">alert</span>(<span class="hljs-string">"name"</span> in person1);   <span class="hljs-comment">// true</span>
<span class="hljs-selector-tag">alert</span>(person1.hasOwnProperty(<span class="hljs-string">"name"</span>));  <span class="hljs-comment">// false</span></code></pre>
<h2 id="articleHeader6">原生对象的原型</h2>
<p>所有的原生引用类型都在其原构造函数的原型上定义了方法，例如，<code>Array.prototype.sort()</code>方法，正是由于原型的共享特性，我们定义的数组才可以使用<code>sort()</code>方法等一系列的方法。<br><strong>举个栗子：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var num = [1, 5, 3, 7, 9];
num.sort(); // 1,3,5,7,9
alert(num.constructor === Array);   // true
alert(num.__proto__ === Array.prototype);    // true
alert(num.__proto__.__proto__ === Object.prototype);    //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> num = [<span class="hljs-number">1</span>, <span class="hljs-number">5</span>, <span class="hljs-number">3</span>, <span class="hljs-number">7</span>, <span class="hljs-number">9</span>];
num.sort(); <span class="hljs-comment">// 1,3,5,7,9</span>
alert(num.constructor === <span class="hljs-built_in">Array</span>);   <span class="hljs-comment">// true</span>
alert(num.__proto__ === <span class="hljs-built_in">Array</span>.prototype);    <span class="hljs-comment">// true</span>
alert(num.__proto__.__proto__ === <span class="hljs-built_in">Object</span>.prototype);    <span class="hljs-comment">//true</span></code></pre>
<p>数组对象<code>num</code>本身就是构造器<code>Array</code>的实例对象，而<code>Array</code>的<code>prototype</code>属性指向的对象上定义了<code>sort()</code>方法，所以新定义了<code>num</code>对象经过搜索找到了<code>sort()</code>方法，并调用了方法。</p>
<h2 id="articleHeader7">原型的动态性</h2>
<p>由于在原型中查找值的过程是一次搜索，所以对原型对象的任何修改都能立即从实例上反应出来。<br><strong>举个栗子：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(){};
var firend = new Person();
// 修改原型
Person.prototype.sayHi = function(){
    alert(&quot;Hi&quot;);
}

firend.sayHi(); // &quot;Hi&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>)</span>{};
<span class="hljs-keyword">var</span> firend = <span class="hljs-keyword">new</span> Person();
<span class="hljs-comment">// 修改原型</span>
Person.prototype.sayHi = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    alert(<span class="hljs-string">"Hi"</span>);
}

firend.sayHi(); <span class="hljs-comment">// "Hi"</span></code></pre>
<p>但是若将原型重写，来看看有什么不同：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(){};
Person.prototype.name = &quot;darko&quot;;
var firend = new Person();
// 重写了原型对象
Person.prototype = {
    constructor: Person,  // 注意：重写原型对象，所以此时的constructor属性变成了新对象的构造函数，默认为Object构造函数，应该将其设置回适当的值
    sayHi: function(){
        alert(&quot;Hi&quot;);
    }
}

alert(friend.name); // &quot;darko&quot;
firend.sayHi(); // error" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>)</span>{};
Person.prototype.name = <span class="hljs-string">"darko"</span>;
<span class="hljs-keyword">var</span> firend = <span class="hljs-keyword">new</span> Person();
<span class="hljs-comment">// 重写了原型对象</span>
Person.prototype = {
    <span class="hljs-attr">constructor</span>: Person,  <span class="hljs-comment">// 注意：重写原型对象，所以此时的constructor属性变成了新对象的构造函数，默认为Object构造函数，应该将其设置回适当的值</span>
    sayHi: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        alert(<span class="hljs-string">"Hi"</span>);
    }
}

alert(friend.name); <span class="hljs-comment">// "darko"</span>
firend.sayHi(); <span class="hljs-comment">// error</span></code></pre>
<p>这说明，重写原型对象切断了现有原型和任何之前已经存在的实例对象之间的联系，它们引用的仍是最初的原型。</p>
<blockquote><p>如果你觉得我写的还可以，点一下推荐吧。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript学习总结——原型

## 原文链接
[https://segmentfault.com/a/1190000004929730](https://segmentfault.com/a/1190000004929730)

