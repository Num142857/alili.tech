---
title: 'JS基础—原型对象的那些事（一）' 
date: 2019-01-03 2:30:10
hidden: true
slug: ylawigkj9bo
categories: [reprint]
---

{{< raw >}}

                    
<p>谈起js的基础，绕不过去的坎就是：原型链、作用域链、this（em...好吧，还有闭包），今天总结一下关于原型对象的一些知识，供自己和大家复习。</p>
<h2 id="articleHeader0">概念理解</h2>
<p>什么是原型对象呢？有以下几点：<br>1.构造函数有一个<code>prototype</code>属性，指向构造函数的原型对象。而实例有一个<code>__proto__</code>属性，也指向原型对象。</p>
<p><strong>PS: 准确的说，实例指向原型对象的是<code>[[Prototype]]</code>属性，但这是一个隐式属性，脚本不可访问。因此浏览器厂商提供了一个属性<code>__proto__</code>，用来显式指向原型对象，但它并不是ECMA规范。</strong></p>
<p><strong>注意函数的是<code>prototype</code>属性，实例的是<code>__proto__</code>属性</strong>，不要弄错。</p>
<p>举个栗子，我们有一个构造函数<code>Person</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name) {
    this.name = name
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name
}</code></pre>
<p>这时，我们创建一个<code>Person</code>的实例<code>person</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var person = new Person(&quot;张三&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> person = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"张三"</span>)</code></pre>
<p>按照上边的理论，就可以表示为：</p>
<p><code>Person.prototype === person.__proto__</code></p>
<p>他们指向的都是原型对象。</p>
<p>2.通过同一个构造函数实例化的多个实例对象具有<strong>同一个</strong>原型对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var person1 = new Person(&quot;张三&quot;)
var person2 = new Person(&quot;李四&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"张三"</span>)
<span class="hljs-keyword">var</span> person2 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"李四"</span>)</code></pre>
<p><code>person1.__proto__</code>、<code>person2.__proto__</code> 、<code>Person.prototype</code> 他们是两两相等的。</p>
<p>3.原型对象有一个<code>constructor</code>属性，指向该原型对象对应的构造函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Person.prototype.constructor === Person

person.__proto__.constructor === Person
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs inform7"><code><span class="hljs-keyword">Person</span>.prototype.constructor === <span class="hljs-keyword">Person</span>

<span class="hljs-keyword">person</span>.__proto__.constructor === <span class="hljs-keyword">Person</span>
</code></pre>
<p>4.实例对象<strong>本身并没有</strong><code>constructor</code>属性，但它可以继承原型对象的<code>constructor</code>属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="person1.constructor === Person
person2.constructor === Person
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code>person1.<span class="hljs-built_in">constructor</span> === Person
person2.<span class="hljs-built_in">constructor</span> === Person
</code></pre>
<h2 id="articleHeader1">作用</h2>
<p>OK，说清楚了什么是原型，就要说一下这玩意是干嘛用的，为啥要在构造函数里加这么个东西。</p>
<p>还是以构造函数<code>Person</code>为例，稍微改一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name) {
    this.name = name
    this.sayName = function() {
        console.log(this.name)
    }
}

var person1 = new Person(&quot;张三&quot;)
var person2 = new Person(&quot;李四&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name
    <span class="hljs-keyword">this</span>.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
    }
}

<span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"张三"</span>)
<span class="hljs-keyword">var</span> person2 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"李四"</span>)</code></pre>
<p>我们在构造函数<code>Person</code>中增加了一个方法<code>sayName</code>，这样<code>Person</code>的实例<code>person1</code>、<code>person2</code>就<strong>各自</strong>都有了一个<code>sayName</code>方法。</p>
<p>注意，我说的是各自，什么意思呢？就是说每次创建一个实例，就要在内存中创建一个<code>sayName</code>方法，这些<code>sayName</code>并不是同一个<code>sayName</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="person1.sayName === person2.sayName 

-> false
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>person1.sayName === person2.sayName 

-<span class="ruby">&gt; <span class="hljs-literal">false</span>
</span></code></pre>
<p>多个实例重复创建相同的方法，这显然是浪费资源的。这个时候，我们的原型对象登场了。假如构造函数中的方法我们这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name) {
    this.name = name
}

Person.prototype.sayName = function() {
    console.log(this.name)
}

var person1 = new Person(&quot;张三&quot;)
var person2 = new Person(&quot;李四&quot;)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name
}

Person.prototype.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
}

<span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"张三"</span>)
<span class="hljs-keyword">var</span> person2 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"李四"</span>)
</code></pre>
<p>和之前的区别是，我们将<code>sayName</code>方法写到了构造函数的原型对象上，而不是写在构造函数里。</p>
<p>这里要先提一个概念，就是<strong>当对象找属性或者方法时，先在自己身上找，找到就调用。在自己身上找不到时，就会去他的原型对象上找</strong>。这就是原型链的概念，先点到这，大家知道这件事就可以了。</p>
<p>还记得之前说的吗：</p>
<blockquote><p>通过同一个构造函数实例化的多个实例对象具有同一个原型对象</p></blockquote>
<p><code>person1</code>和<code>person2</code>上显然是没有<code>sayName</code>方法的，但是他们的原型对象有啊。</p>
<p>所以这里的<code>person1.sayName</code>和<code>person2.sayName</code>，实际上都是继承自他原型对象上的<code>sayName</code>方法，既然原型对象是同一个，那<code>sayName</code>方法自然也是同一个了，所以此时：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="person1.sayName === person2.sayName   

-> true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>person1.sayName === person2.sayName   

-<span class="ruby">&gt; <span class="hljs-literal">true</span>
</span></code></pre>
<p><strong>将需要共享的方法和属性放到原型对象上，实例在调用这些属性和方法时，不用每次都创建，从而节约资源，这就是原型对象的作用。</strong></p>
<h3 id="articleHeader2">共享带来的“烦恼”</h3>
<p>但是，既然是共享，就有一点问题了，还是<code>Person</code>构造函数，我们再改造一下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function Person(name) {
        this.name = name
    }
    
    Person.prototype.ageList = [12, 16, 18]
   
    var person1 = new Person(&quot;张三&quot;)
    var person2 = new Person(&quot;李四&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name</span>) </span>{
        <span class="hljs-keyword">this</span>.name = name
    }
    
    Person.prototype.ageList = [<span class="hljs-number">12</span>, <span class="hljs-number">16</span>, <span class="hljs-number">18</span>]
   
    <span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"张三"</span>)
    <span class="hljs-keyword">var</span> person2 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"李四"</span>)</code></pre>
<p>这个时候，我们在<code>person1</code>上做一些操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="person1.ageList.push(30)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>person1<span class="hljs-selector-class">.ageList</span><span class="hljs-selector-class">.push</span>(<span class="hljs-number">30</span>)
</code></pre>
<p>看一下此时<code>person2.ageList</code>是什么：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="person2.ageList 

-> [12, 16, 18, 30]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>person2.ageList 

-&gt; [<span class="hljs-number">12</span>, <span class="hljs-number">16</span>, <span class="hljs-number">18</span>, <span class="hljs-number">30</span>]
</code></pre>
<p>有点意思，<code>person2</code>上的<code>ageList</code>也多了30。</p>
<p>原因其实还是因为共享。</p>
<p>共享不好的地方就是：一个实例对<strong>引用类型</strong>（数组、对象、函数）的属性进行修改，会导致原型对象上的属性修改（其实修改的就是原型对象上的属性，实例是没有这个属性的），进而导致所有的实例中，这个属性都改了！</p>
<p>很显然，大部分时候，我们喜欢共享，可以节约资源。但是不喜欢每一个实例都受影响，要不还创建不同的实例干嘛，用一个不就好了（摊手）。</p>
<p>所以，我们需要把那些需要共享的属性和方法，写在原型对象上，而每个实例单独用的、不希望互相影响的属性，就写在构造函数里边。类似这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name) {
    this.name = name
    this.ageList = [12, 16, 18]
}

var person1 = new Person(&quot;张三&quot;)
var person2 = new Person(&quot;李四&quot;)

person1.ageList.push(30)

person1.ageList 
-> [12, 16, 18, 30]

person2.ageList 
-> [12, 16, 18]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name
    <span class="hljs-keyword">this</span>.ageList = [<span class="hljs-number">12</span>, <span class="hljs-number">16</span>, <span class="hljs-number">18</span>]
}

<span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"张三"</span>)
<span class="hljs-keyword">var</span> person2 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"李四"</span>)

person1.ageList.push(<span class="hljs-number">30</span>)

person1.ageList 
-&gt; [<span class="hljs-number">12</span>, <span class="hljs-number">16</span>, <span class="hljs-number">18</span>, <span class="hljs-number">30</span>]

person2.ageList 
-&gt; [<span class="hljs-number">12</span>, <span class="hljs-number">16</span>, <span class="hljs-number">18</span>]</code></pre>
<h2 id="articleHeader3">此处有坑</h2>
<p>关于原型对象，还有两个坑，需要和大家说一下。</p>
<p>1.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function Person(name) {
        this.name = name
    }
    
    Person.prototype.ageList = [12, 16, 18]
   
    var person1 = new Person(&quot;张三&quot;)
    var person2 = new Person(&quot;李四&quot;)
    
    person1.ageList.push(30)
    
    person2.ageList 
    -> [12, 16, 18, 30]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name</span>) </span>{
        <span class="hljs-keyword">this</span>.name = name
    }
    
    Person.prototype.ageList = [<span class="hljs-number">12</span>, <span class="hljs-number">16</span>, <span class="hljs-number">18</span>]
   
    <span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"张三"</span>)
    <span class="hljs-keyword">var</span> person2 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"李四"</span>)
    
    person1.ageList.push(<span class="hljs-number">30</span>)
    
    person2.ageList 
    -&gt; [<span class="hljs-number">12</span>, <span class="hljs-number">16</span>, <span class="hljs-number">18</span>, <span class="hljs-number">30</span>]</code></pre>
<p>这个没毛病，但是假如我把操作<br><code>person1.ageList.push(30)</code><br>改为<br><code>person1.ageList = [1, 2, 3]</code>，结果会怎样呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="person2.ageList 

-> [12, 16, 18]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>person2.ageList 

-&gt; [<span class="hljs-number">12</span>, <span class="hljs-number">16</span>, <span class="hljs-number">18</span>]
</code></pre>
<p>这里就奇怪了，都是对<code>person1.ageList</code>进行操作，怎么就不一样呢?</p>
<p>其实原因在于，<code>person1.ageList = [1, 2, 3]</code>是一个赋值操作。</p>
<p>我们说过，<code>person1</code>本身是没有<code>ageList</code>属性的，而赋值操作，会给<code>person1</code>增加自己的<code>ageList</code>属性。既然自己有了，也就不用去原型对象上找了。这个时候，原型对象的<code>ageList</code>其实是没有变化的。而<code>person2</code>没有自己的<code>ageList</code>属性，所以<code>person2.ageList</code>还是继承自原型，就是<code>[12, 16, 18]</code>。</p>
<p>2.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function Person(name) {
        this.name = name
    }
    
    Person.prototype = {
        ageList : [12, 16, 18]
    }
   
    var person1 = new Person(&quot;张三&quot;)
    var person2 = new Person(&quot;李四&quot;)
    
    person1.ageList.push(30)
    
    person2.ageList -> [12, 16, 18, 30]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name</span>) </span>{
        <span class="hljs-keyword">this</span>.name = name
    }
    
    Person.prototype = {
        <span class="hljs-attr">ageList</span> : [<span class="hljs-number">12</span>, <span class="hljs-number">16</span>, <span class="hljs-number">18</span>]
    }
   
    <span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"张三"</span>)
    <span class="hljs-keyword">var</span> person2 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"李四"</span>)
    
    person1.ageList.push(<span class="hljs-number">30</span>)
    
    person2.ageList -&gt; [<span class="hljs-number">12</span>, <span class="hljs-number">16</span>, <span class="hljs-number">18</span>, <span class="hljs-number">30</span>]</code></pre>
<p>这里依然没毛病，但是写法上有一个变化：我们不再采用<code>Person.prototype.ageList = [12, 16, 18]</code>的形式赋值，而是给<code>Person.prototype</code>赋值了一个对象，对象中有<code>ageList</code>。</p>
<p>这样看貌似没有问题，用起来也都一样：改变<code>person1.ageList</code>，<code>person2.ageLis</code>t也变化了，说明<code>person1.ageList</code>和<code>person2.ageList</code>还是继承自同一个原型对象。</p>
<p>但是，这里有一个问题，之前我们说过：</p>
<blockquote><p>实例对象<strong>本身并没有</strong><code>constructor</code>属性，但它可以继承原型对象的<code>constructor</code>属性</p></blockquote>
<p>但是此时</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="person1.constructor === Person 
-> false

person2.constructor === Person 
-> false
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>person1.constructor === Person 
-<span class="ruby">&gt; <span class="hljs-literal">false</span>
</span>
person2.constructor === Person 
-<span class="ruby">&gt; <span class="hljs-literal">false</span>
</span></code></pre>
<p>为什么呢？</p>
<p>因为通过给<code>Person.prototype</code>赋值一个对象，就修改了原型对象的指向，此时原型对象的<code>constructor</code>指向内置构造函数<code>Object</code>了，使用<code>Person.prototype.ageList = [12, 16, 18]</code>的形式赋值，就不会造成这样的问题。</p>
<p>所以当给原型对象赋值一个新对象时，切记将原型对象的<code>constructor</code>指回原构造函数:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Person.prototype.constructor = Person" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">Person.prototype.constructor = Person</code></pre>
<p>以上就是本次分享的内容，关于原型对象的其他知识，下一篇<a href="https://segmentfault.com/a/1190000011095622?_ea=2518761">JS基础—原型对象的那些事（二）</a>会讲到。</p>
<p>ps：写的啰啰嗦嗦的，也不知道大家会不会看着烦。。。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS基础—原型对象的那些事（一）

## 原文链接
[https://segmentfault.com/a/1190000010842024](https://segmentfault.com/a/1190000010842024)

