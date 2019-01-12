---
title: 'javascript对象详解：__proto__和prototype的区别和联系' 
date: 2019-01-13 2:30:11
hidden: true
slug: ugzljm3unia
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>本篇文章用来记录下最近研究对象的一些心得，做一个记录与总结，以加深自己的印象，同时，希望也能给正在学习中的你一点启发。本文适合有一定JavaScript基础的童鞋阅读。<a href="https://mengera88.github.io/2017/06/06/javascript%E5%AF%B9%E8%B1%A1%E8%AF%A6%E8%A7%A3%EF%BC%9A%E6%90%9E%E6%B8%85%E6%A5%9A%E5%8E%9F%E5%9E%8B%E4%B8%8E%E5%8E%9F%E5%9E%8B%E9%93%BE/" rel="nofollow noreferrer" target="_blank">原文戳这里</a></p>
<h1 id="articleHeader1">引言</h1>
<p>在JavaScript中，万物皆对象。咱们写一个JavaScript对象，大多数时候是用构造函数创建一个对象或者用对象字面量创建一个对象。比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//通过构造函数来创建对象
function Person() {
    //...
}

var person1 = new Person();

//通过对象字面量创建对象
var person2 = {
    name: 'jessica',
    age: 27,
    job: 'teacher'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//通过构造函数来创建对象</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//...</span>
}

<span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person();

<span class="hljs-comment">//通过对象字面量创建对象</span>
<span class="hljs-keyword">var</span> person2 = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'jessica'</span>,
    <span class="hljs-attr">age</span>: <span class="hljs-number">27</span>,
    <span class="hljs-attr">job</span>: <span class="hljs-string">'teacher'</span>
}</code></pre>
<p>当然还有其他方式创建对象，这里就不列举出来了。那么问题来了，通过不同的方式创建的对象有什么区别呢？</p>
<p>我们知道，每个JS对象一定对应一个原型对象，并从原型对象继承属性和方法。那么对象是怎么和这个原型对象对应的呢？带着问题慢慢看下面的内容吧~</p>
<h1 id="articleHeader2">
<code>__proto__</code>和<code>prototype</code>概念区分</h1>
<p>其实说<code>__proto__</code>并不准确，确切的说是对象的<code>[[prototype]]</code>属性，只不过在主流的浏览器中，都用<code>__proto__</code>来代表<code>[[prototype]]</code>属性，因为<code>[[prototype]]</code>只是一个标准，而针对这个标准，不同的浏览器有不同的实现方式。在ES5中用<code>Object.getPrototypeOf</code>函数获得一个对象的<code>[[prototype]]</code>。ES6中，使用<code>Object.setPrototypeOf</code>可以直接修改一个对象的<code>[[prototype]]</code>。为了方便，我下面的文章用<code>__proto__</code>来代表对象的<code>[[prototype]]</code>。</p>
<p>而<code>prototype</code>属性是只有函数才特有的属性，当你创建一个函数时，<code>js</code>会自动为这个函数加上<code>prototype</code>属性，值是一个空对象。所以，函数在<code>js</code>中是非常特殊的，是所谓的<code>一等公民</code>。<br>那么<code>__proto__</code>和<code>prototype</code>是怎么联系起来的呢？让我们来看下下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name, age) {
    this.name = name;
    this.age = age;
}

var person1 = new Person('jessica', 27);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name, age</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.age = age;
}

<span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'jessica'</span>, <span class="hljs-number">27</span>);</code></pre>
<h2 id="articleHeader3">当我们<code>new Person()</code>的时候到底发生了什么？</h2>
<p><code>new</code>一个构造函数，相当于实例化一个对象，这期间其实进行了这三个步骤：</p>
<ol>
<li><p>创建对象，设为o，即： <code>var o = {}</code>;</p></li>
<li><p>上文提到了，每个对象都有<code>__proto__</code>属性，该属性指向一个对象，这里，将<code>o</code>对象的<code>__Proto__</code>指向构造函数<code>Person</code>的原型对象（<code>Person.prototype</code>）;</p></li>
<li><p>将<code>o</code>作为<code>this</code>去调用构造函数<code>Person</code>，从而设置<code>o</code>的属性和方法并初始化。</p></li>
</ol>
<p>当这3步完成，这个<code>o</code>对象就与构造函数<code>Person</code>再无联系，这个时候即使构造函数<code>Person</code>再加任何成员，都不再影响已经实例化的<code>o</code>对象了。<br>此时，<code>o</code>对象具有了<code>name</code>和<code>age</code>属性，同时具有了构造函数<code>Person</code>的原型对象的所有成员，当然，此时该原型对象是没有成员的。</p>
<p>现在大家都明白了吧，简单的总结下就是：</p>
<p><strong>js在创建对象的时候，都有一个叫做<code>__proto__</code>的内置属性，用于指向创建它的函数对象的原型对象<code>prototype</code></strong></p>
<p>那么一个对象的<code>__proto__</code>属性究竟怎么决定呢？答案显而易见了：是由构造该对象的方法决定的。</p>
<h1 id="articleHeader4">创建对象的不同方法解析</h1>
<p>下面讲解三种常见的创建对象方法。</p>
<h2 id="articleHeader5">对象字面量</h2>
<p>比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Person = {
    name: 'jessica',
    age: 27
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Person = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'jessica'</span>,
    <span class="hljs-attr">age</span>: <span class="hljs-number">27</span>
}</code></pre>
<p>这种形式就是对象字面量，通过对象字面量构造出的对象，其<code>__proto__</code>指向<code>Object.prototype</code>。</p>
<p>所以，其实<code>Object</code>是一个函数也不难理解了。<strong>Object、Function都是是js自带的函数对象。</strong></p>
<p>可以跑下面的代码看看：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(typeof Object); 
console.log(typeof Function); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Object</span>); 
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Function</span>); </code></pre>
<h2 id="articleHeader6">构造函数</h2>
<p>就如我前面讲的,形如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(){}
var person1 = new Person();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>)</span>{}
<span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person();</code></pre>
<p>这种形式创建对象的方式就是通过构造函数创建对象，这里的构造函数是<code>Person</code>函数。上面也讲过了，通过构造函数创建的对象，其<code>__proto</code>指向的是构造函数的<code>prototype</code>属性指向的对象。</p>
<h2 id="articleHeader7">Object.create</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var person1 = {
    name: 'jessica',
    age: 27
}
var person2 = Object.create(person1);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> person1 = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'jessica'</span>,
    <span class="hljs-attr">age</span>: <span class="hljs-number">27</span>
}
<span class="hljs-keyword">var</span> person2 = <span class="hljs-built_in">Object</span>.create(person1);</code></pre>
<p>这种情况下，<code>person2</code>的<code>__proto__</code>指向<code>person1</code>。在没有<code>Object.create</code>函数的时候，人们大多是这样做的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.create = function(p) {
    function f(){};
    f.prototype = p;
    return new f();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Object</span>.create = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">p</span>) </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>)</span>{};
    f.prototype = p;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> f();
}</code></pre>
<p>一看大家就会明白了。</p>
<h2 id="articleHeader8">总结</h2>
<p>其实仔细思考下上面提到的三种创建对象的方法，追究其本质，不难发现，最根本的还是利用构造函数再通过<code>new</code>来创建对象。所谓的对象字面量也只不过是语法糖而已，本质上是<code>var o = new Object(); o.xx = xx;o.yy=yy;</code>。 所以，函数真不愧是js中的<strong>一等公民</strong>呀~</p>
<h1 id="articleHeader9">原型链</h1>
<p>既然已经提到了原型，就不得不提一下原型链了，毕竟这是实现继承最关键所在，也是js对象精妙所在。</p>
<p>还记得上文提到的一个总结吗？不记得？没关系，我贴出来让大家温故而知新，哈哈~</p>
<p><strong>js在创建对象的时候，都有一个叫做<code>__proto__</code>的内置属性，用于指向创建它的函数对象的原型对象<code>prototype</code></strong></p>
<p>而原型链的基本思想就是利用原型让一个引用类型继承另一个引用类型的属性和方法。</p>
<p>让我们再简单回顾下构造函数、原型和实例的关系：</p>
<p>每个构造函数都有一个原型对象，原型对象包含一个指向构造函数的指针（<code>constructor</code>），而实例则包含一个指向原型对象的内部指针（<code>__proto__</code>）。</p>
<p>我们拿一个例子来讲解：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name, age) {
    this.name = name;
    this.age = age;
}

var person1 = new Person('jessica', 27);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name, age</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.age = age;
}

<span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'jessica'</span>, <span class="hljs-number">27</span>);</code></pre>
<p>一图胜前言，我们用画图的形式来讲解下上面的例子：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009704215" src="https://static.alili.tech/img/remote/1460000009704215" alt="alt 原型链示例1" title="alt 原型链示例1" style="cursor: pointer; display: inline;"></span></p>
<p>从上图可以看到，其实原型链的顶端是<code>Object.prototype.__proto__</code>,也即为<code>null</code>。</p>
<h1 id="articleHeader10">总结</h1>
<p>函数是<code>js</code>中的一等公民，<code>js</code>在创建对象的时候，都有一个叫做<code>__proto__</code>的内置属性，用于指向创建它的函数对象的原型对象<code>prototype</code>。只有函数有<code>prototype</code>, 当你创建一个函数时，<code>js</code>会自动为这个函数加上<code>prototype</code>属性，值是一个空对象。</p>
<h1 id="articleHeader11">参考文献</h1>
<p><a href="http://007sair.github.io/javascript/2015/07/22/js-prototype.html" rel="nofollow noreferrer" target="_blank">js 对象、原型、继承详解</a><br><a href="https://www.zhihu.com/question/34183746" rel="nofollow noreferrer" target="_blank">js中__proto__和prototype的区别和关系？</a><br><a href="http://blog.jobbole.com/9648/" rel="nofollow noreferrer" target="_blank">理解JavaScript原型</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript对象详解：__proto__和prototype的区别和联系

## 原文链接
[https://segmentfault.com/a/1190000009704212](https://segmentfault.com/a/1190000009704212)

