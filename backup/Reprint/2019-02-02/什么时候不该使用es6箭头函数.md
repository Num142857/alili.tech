---
title: '什么时候不该使用es6箭头函数' 
date: 2019-02-02 2:30:11
hidden: true
slug: iaiex7af4ue
categories: [reprint]
---

{{< raw >}}

                    
<p>从开始接触es6到在项目中使用已经有一段时间了，es6有很多优秀的新特性，其中最有价值的特性之一就是箭头函数，他简洁的语法以及更好理解的this值都非常的吸引我。但是新事物也是有两面性的，箭头函数有他的便捷有他的优点，但是他也有缺点，他的优点是代码简洁，this提前定义，但他的缺点也是这些，比如代码太过简洁，导致不好阅读，this提前定义，导致无法使用js进行一些es5里面看起来非常正常的操作。针对这些缺点，下面我就总结一下什么情况下不该使用箭头函数。</p>
<h2 id="articleHeader0">1.在对象上定义函数</h2>
<p>先来看下面这段代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {  
    array: [1, 2, 3],
    sum: () => {
        console.log(this === window); // => true
        return this.array.reduce((result, item) => result + item);
    }
};

// Throws &quot;TypeError: Cannot read property 'reduce' of undefined&quot;
obj.sum();  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>var obj = {  
    array: [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>],
    sum: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === <span class="hljs-built_in">window</span>); <span class="hljs-regexp">//</span> =&gt; <span class="hljs-literal">true</span>
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.array.reduce(<span class="hljs-function"><span class="hljs-params">(result, item)</span> =&gt;</span> result + item);
    }
};

<span class="hljs-regexp">//</span> Throws <span class="hljs-string">"TypeError: Cannot read property 'reduce' of undefined"</span>
obj.sum();  </code></pre>
<p><em>sum</em>方法定义在<em>obj</em>对象上，当调用的时候我们发现抛出了一个<em>TypeError</em>，因为函数中的<em>this</em>是<em>window</em>对象，所以<em>this.array</em>也就是<em>undefined</em>。原因也很简单，相信只要了解过es6 箭头函数的都知道</p>
<blockquote><p>箭头函数没有它自己的this值，箭头函数内的this值继承自外围作用域</p></blockquote>
<p>解决方法也很简单，就是不用呗。这里可以用es6里函数表达式的简洁语法，在这种情况下，this值就取决于函数的调用方式了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {  
    array: [1, 2, 3],
    sum() {
        console.log(this === obj); // => true
        return this.array.reduce((result, item) => result + item);
    }
};

obj.sum(); // => 6  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> obj = {  
    <span class="hljs-attr">array</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>],
    sum() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === obj); <span class="hljs-comment">// =&gt; true</span>
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.array.reduce(<span class="hljs-function">(<span class="hljs-params">result, item</span>) =&gt;</span> result + item);
    }
};

obj.sum(); <span class="hljs-comment">// =&gt; 6  </span></code></pre>
<blockquote><p>通过object.method()语法调用的方法使用非箭头函数定义，这些函数需要从调用者的作用域中获取一个有意义的this值。</p></blockquote>
<h2 id="articleHeader1">2.在原型上定义函数</h2>
<p>在对象原型上定义函数也是遵循着一样的规则</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person (pName) {
    this.pName = pName;
}

Person.prototype.sayName = () => {
    console.log(this === window); // => true
    return this.pName;
}

var person = new Person('wdg');

person.sayName(); // => undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span> (<span class="hljs-params">pName</span>) </span>{
    <span class="hljs-keyword">this</span>.pName = pName;
}

Person.prototype.sayName = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === <span class="hljs-built_in">window</span>); <span class="hljs-comment">// =&gt; true</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.pName;
}

<span class="hljs-keyword">var</span> person = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'wdg'</span>);

person.sayName(); <span class="hljs-comment">// =&gt; undefined</span></code></pre>
<p>使用function函数表达式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person (pName) {
    this.pName = pName;
}

Person.prototype.sayName = function () {
    console.log(this === person); // => true
    return this.pName;
}

var person = new Person('wdg');

person.sayName(); // => wdg" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span> (<span class="hljs-params">pName</span>) </span>{
    <span class="hljs-keyword">this</span>.pName = pName;
}

Person.prototype.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === person); <span class="hljs-comment">// =&gt; true</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.pName;
}

<span class="hljs-keyword">var</span> person = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'wdg'</span>);

person.sayName(); <span class="hljs-comment">// =&gt; wdg</span></code></pre>
<p>所以给对象原型挂载方法时，使用function函数表达式</p>
<h2 id="articleHeader2">3.动态上下文中的回调函数</h2>
<p><em>this</em>是js中非常强大的特点，他让函数可以根据其调用方式动态的改变上下文，然后箭头函数直接在声明时就绑定了this对象，所以不再是动态的。<br>在客户端，在dom元素上绑定事件监听函数是非常普遍的行为，在dom事件被触发时，回调函数中的this指向该dom,可当我们使用箭头函数时:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var button = document.getElementById('myButton');  
button.addEventListener('click', () => {  
    console.log(this === window); // => true
    this.innerHTML = 'Clicked button';
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>var button = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'myButton'</span>);  
button.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {  
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === <span class="hljs-built_in">window</span>); <span class="hljs-regexp">//</span> =&gt; <span class="hljs-literal">true</span>
    <span class="hljs-keyword">this</span>.innerHTML = <span class="hljs-string">'Clicked button'</span>;
});</code></pre>
<p>因为这个回调的箭头函数是在全局上下文中被定义的，所以他的this是window。所以当this是由目标对象决定时，我们应该使用函数表达式:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var button = document.getElementById('myButton');  
button.addEventListener('click', function() {  
    console.log(this === button); // => true
    this.innerHTML = 'Clicked button';
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> button = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'myButton'</span>);  
button.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{  
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === button); <span class="hljs-comment">// =&gt; true</span>
    <span class="hljs-keyword">this</span>.innerHTML = <span class="hljs-string">'Clicked button'</span>;
});</code></pre>
<h2 id="articleHeader3">4.构造函数中</h2>
<p>在构造函数中，this指向新创建的对象实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this instanceOf MyFunction === true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceOf</span> MyFunction === <span class="hljs-keyword">true</span></code></pre>
<p>需要注意的是，构造函数不能使用箭头函数，如果这样做会抛出异常</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Person = (name) => {
    this.name = name;
}

// Uncaught TypeError: Person is not a constructor
var person = new Person('wdg');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> Person = <span class="hljs-function">(<span class="hljs-params">name</span>) =&gt;</span> {
    <span class="hljs-keyword">this</span>.name = name;
}

<span class="hljs-comment">// Uncaught TypeError: Person is not a constructor</span>
<span class="hljs-keyword">var</span> person = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'wdg'</span>);</code></pre>
<p>理论上来说也是不能这么做的，因为箭头函数在创建时this对象就绑定了，更不会指向对象实例。</p>
<h2 id="articleHeader4">5.太简短的（难以理解）函数</h2>
<p>箭头函数可以让语句写的非常的简洁，但是一个真实的项目，一般由多个开发者共同协作完成，就算由单人完成，后期也并不一定是同一个人维护，箭头函数有时候并不会让人很好的理解，比如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let multiply = (a, b) => b === undefined ? b => a * b : a * b;

let double = multiply(2);

double(3); // => 6

multiply(2, 3); // =>6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>let <span class="hljs-keyword">multiply </span>= (a, <span class="hljs-keyword">b) </span>=&gt; <span class="hljs-keyword">b </span>=== undefined ? <span class="hljs-keyword">b </span>=&gt; a * <span class="hljs-keyword">b </span>: a * <span class="hljs-keyword">b;
</span>
let double = <span class="hljs-keyword">multiply(2);
</span>
double(<span class="hljs-number">3</span>)<span class="hljs-comment">; // =&gt; 6</span>

<span class="hljs-keyword">multiply(2, </span><span class="hljs-number">3</span>)<span class="hljs-comment">; // =&gt;6</span></code></pre>
<p>这个函数的作用就是当只有一个参数<em>a</em>时，返回接受一个参数<em>b</em>返回<em>a*b</em>的函数，接收两个参数时直接返回乘积，这个函数可以很好的工作并且看起很简洁，但是从第一眼看去并不是很好理解。<br>为了让这个函数更好的让人理解，我们可以为这个箭头函数加一对花括号，并加上<em>return</em>语句，或者直接使用函数表达式:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function multiply(a, b) {
    if (b === undefined) {
        return function (b) {
            return a * b;
        }
    }
    return a * b;
}

let double = multiply(2);

double(3); // => 6
multiply(2, 3)； // => 6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">multiply</span>(<span class="hljs-params">a, b</span>) </span>{
    <span class="hljs-keyword">if</span> (b === <span class="hljs-literal">undefined</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">b</span>) </span>{
            <span class="hljs-keyword">return</span> a * b;
        }
    }
    <span class="hljs-keyword">return</span> a * b;
}

<span class="hljs-keyword">let</span> <span class="hljs-built_in">double</span> = multiply(<span class="hljs-number">2</span>);

<span class="hljs-built_in">double</span>(<span class="hljs-number">3</span>); <span class="hljs-comment">// =&gt; 6</span>
multiply(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>)； <span class="hljs-comment">// =&gt; 6</span></code></pre>
<h2 id="articleHeader5">总结</h2>
<p>毫无疑问，箭头函数带来了很多便利。恰当的使用箭头函数可以让我们避免使用早期的<em>.bind()</em>函数或者需要固定上下文的地方并且让代码更加简洁。<br>箭头函数也有一些不便利的地方。我们在需要动态上下文的地方不能使用箭头函数:定义需要动态上下文的函数，构造函数，需要<em>this</em>对象作为目标的回调函数以及用箭头函数难以理解的语句。在其他情况下，请尽情的使用箭头函数。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
什么时候不该使用es6箭头函数

## 原文链接
[https://segmentfault.com/a/1190000007074846](https://segmentfault.com/a/1190000007074846)

