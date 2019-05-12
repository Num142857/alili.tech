---
title: '浅谈JavaScript面向对象' 
date: 2018-12-28 2:30:10
hidden: true
slug: j04k6czqw7f
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>对象(Object)应该算是js中最为重要的部分，也是js中非常难懂晦涩的一部分。更是面试以及框架设计中各出没。写这篇文章，主要参考与JavaScript红宝书（JavaScript高级程序设计 第六章章节）以及各大博主博客。<br><a href="https://github.com/Nealyang/YOU-SHOULD-KNOW-JS" rel="nofollow noreferrer" target="_blank">原文地址:https://github.com/Nealyang/YOU-SHOULD-KNOW-JS</a></p>
<h2 id="articleHeader1">谈谈对象属性的特性</h2>
<p>毕竟是面向对象编程，我们在讨论如何面向对象之前先讨论讨论对象具有哪些属性和特性。</p>
<h3 id="articleHeader2">属性类型</h3>
<p>简单的说，对象拥有四个属性:</p>
<ul>
<li>
<code> Configurable </code>:是否可以通过delete删除，能否修改属性的特性。直白点：是否可配置</li>
<li>
<code> Enumerable </code>:枚举性，表示是否可以通过for-in循环返回</li>
<li>
<code> Writable </code>:可写性：是否可以修改属性的值</li>
<li>
<code> Value </code>:包含属性的值，也就是对应的可读性。</li>
</ul>
<p>以上四个对象的属性的属性类型默认值分别为：true,true,true,undefined。</p>
<p>如果要修改属性默认的特性，必须通过Object.defineProperty()方法。大致如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var animal = {};
Object.defineProperty(animal,&quot;name&quot;,{
    writable:false,
    value: 'dog';
});
console.log(animal.name);//dog
animal.name = 'cat';
console.log(animal.name);//dog
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>var animal = {};
Object.defineProperty(animal,<span class="hljs-string">"name"</span>,{
    writable:<span class="hljs-literal">false</span>,
    value: <span class="hljs-string">'dog'</span>;
});
console.<span class="hljs-built_in">log</span>(animal.<span class="hljs-built_in">name</span>);<span class="hljs-comment">//dog</span>
animal.<span class="hljs-built_in">name</span> = <span class="hljs-string">'cat'</span>;
console.<span class="hljs-built_in">log</span>(animal.<span class="hljs-built_in">name</span>);<span class="hljs-comment">//dog</span>
</code></pre>
<p>从上面的实例大家也能看出，在调用Object.defineProperty()方法后，如果不指定 configurable、enumerable、writable 特性的值时，默认为FALSE。</p>
<h3 id="articleHeader3">访问器属性</h3>
<p>访问器属性不包含数据值，但是包含getter和setter函数。在读取访问器属性时，会调用getter函数，这个函数负责返回有效值。在写入访问器属性时，回到用setter函数并传入新值。</p>
<ul>
<li>
<code>Configurable</code>:表示是否可以通过delete删除。默认为TRUE</li>
<li>
<code>Enumerable</code>:同上面介绍的Enumerable一样，默认为true</li>
<li>
<code>Get</code>:读取数据时候调用的方法。默认为undefined</li>
<li>
<code>Set</code>:在写入属性值得时候默认调用的方法。默认为undefined</li>
</ul>
<p>这里不做过多解释，直接看例子吧（来自js红宝书）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var book = {
    _year:2012,
    edition:1
};
Object.defineProperty(book, 'year',{
    get:function(){
        return this._year
    },
    set:function(value){
        if(value>2012){
            this._year = value,
            this.edition++
        }
    }
});

book.year = 2013;
console.log(book.edition);//2
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> book = {
    _year:<span class="hljs-number">2012</span>,
    edition:<span class="hljs-number">1</span>
};
Object.defineProperty(book, <span class="hljs-string">'year'</span>,{
    <span class="hljs-keyword">get</span>:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._year
    },
    <span class="hljs-keyword">set</span>:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value)</span></span>{
        <span class="hljs-keyword">if</span>(value&gt;<span class="hljs-number">2012</span>){
            <span class="hljs-keyword">this</span>._year = value,
            <span class="hljs-keyword">this</span>.edition++
        }
    }
});

book.year = <span class="hljs-number">2013</span>;
console.log(book.edition);<span class="hljs-comment">//2</span>
</code></pre>
<p>其实对于多个属性的定义，我们可以使用Object.defineProperties方法。然后对于读取属性的特性我们可以使用Object.getOwnPropertyDescriptor()方法。大家自行查看哈。</p>
<h2 id="articleHeader4">创建对象</h2>
<p>创建对象，我们不是直接可以通过Object的构造函数或者对象字面量的方法来实现对象的创建嘛？当然，这些方法是可以的，但是有一个明显的缺点：使用同一个接口创建很多对象，产生大量重复的代码。所以这里，我们使用如下的一些骚操作</p>
<h3 id="articleHeader5">工厂模式</h3>
<p>一种很基础的设计模式，简而言之就是用函数来封装以特定接口创建对象的细节。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createAnimal(name,type){
    var o = new Object();
    o.name = name;
    o.type = type;
    o.sayName = function(){
        alert(this.name)
    }
    return o;
}
var cat = createAnimal('小猫','cat');
var dog = createAnimal('小?','dog');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createAnimal</span>(<span class="hljs-params">name,type</span>)</span>{
    <span class="hljs-keyword">var</span> o = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
    o.name = name;
    o.type = type;
    o.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        alert(<span class="hljs-keyword">this</span>.name)
    }
    <span class="hljs-keyword">return</span> o;
}
<span class="hljs-keyword">var</span> cat = createAnimal(<span class="hljs-string">'小猫'</span>,<span class="hljs-string">'cat'</span>);
<span class="hljs-keyword">var</span> dog = createAnimal(<span class="hljs-string">'小?'</span>,<span class="hljs-string">'dog'</span>);
</code></pre>
<p>优点：可以无数次的调用这个函数，来创建相似对象。<br>缺点：不能解决对象识别的问题。也就是说，我不知道你是谁家的b孩子</p>
<h3 id="articleHeader6">构造函数模式</h3>
<p>ECMAScript中的构造函数可以用来创建特定类型的对象。在运行时会自动出现在执行环境中（这句话后面讲解this的时候还是会说到）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Animal(name,type){
    this.name = name;
    this.type = type;
    this.say = function(){
        alert(this.name);
    }
}

var cat = new Animal('小猫','cat');
var dog = new Animal('小?','dog');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span><span class="hljs-params">(name,type)</span></span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.type = type;
    <span class="hljs-keyword">this</span>.say = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        alert(<span class="hljs-keyword">this</span>.name);
    }
}

<span class="hljs-keyword">var</span> cat = <span class="hljs-keyword">new</span> Animal(<span class="hljs-string">'小猫'</span>,<span class="hljs-string">'cat'</span>);
<span class="hljs-keyword">var</span> dog = <span class="hljs-keyword">new</span> Animal(<span class="hljs-string">'小?'</span>,<span class="hljs-string">'dog'</span>);
</code></pre>
<p>注意上面我们没有显示的return过一个对象出来，为什么？因为this（后面会讲this的）。</p>
<p>关于构造函数惯例首字母大写就不啰嗦了。强调构造函数一定要使用关键字new来调用。为什么使用new呢？因为你使用了new，他会</p>
<ul>
<li>创建一个新的对象</li>
<li>将构造函数的作用域赋值给新对象（this执行新的对象）</li>
<li>执行构造函数的代码</li>
<li>返回新的对象</li>
</ul>
<p>那么解决了工厂模式的诟病了么？当然~</p>
<p>在实例对象中，都有一个constructor属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cat.constructor == Animal //true
dog.constructor == Animal //true
cat instanceof Animal //true
dog instanceof Animal //true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>cat<span class="hljs-selector-class">.constructor</span> == Animal <span class="hljs-comment">//true</span>
dog<span class="hljs-selector-class">.constructor</span> == Animal <span class="hljs-comment">//true</span>
cat instanceof Animal <span class="hljs-comment">//true</span>
dog instanceof Animal <span class="hljs-comment">//true</span>
</code></pre>
<p>构造函数模式的优点如上所说，但是缺点还是有的，比如说</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cat.sayName == dog.sayName //false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">cat.sayName == dog.sayName <span class="hljs-comment">//false</span></code></pre>
<p>也就是说，他创建了两个功能一样的函数，这样是很没有必要的，当然，我们可以把sayName放到构造函数外面，然后通过this.sayName=sayName来操作，但是这样的话，又会导致全局变量的污染。肿么办？？？</p>
<h3 id="articleHeader7">原型模式</h3>
<p>我们在创建每一个函数的时候都有一个prototype(原型)属性，这个属性是一个指针，指向一个对象。而这个对象的用途就是包含由特定类型的所有实例共享的属性和方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Animal() {}
Animal.prototype.name = '毛毛';
Animal.prototype.type = 'dog';
Animal.prototype.sayName = function() {
  alert(this.name);
}
var cat = new Animal();
var dog = new Animal();
alert(cat.sayName == dog.sayName)//true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span>(<span class="hljs-params"></span>) </span>{}
Animal.prototype.name = <span class="hljs-string">'毛毛'</span>;
Animal.prototype.type = <span class="hljs-string">'dog'</span>;
Animal.prototype.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  alert(<span class="hljs-keyword">this</span>.name);
}
<span class="hljs-keyword">var</span> cat = <span class="hljs-keyword">new</span> Animal();
<span class="hljs-keyword">var</span> dog = <span class="hljs-keyword">new</span> Animal();
alert(cat.sayName == dog.sayName)<span class="hljs-comment">//true</span></code></pre>
<p>原型模式的好处就是可以让所有的对象实例共享他的属性和方法。不必在构造函数中定义对象实例的信息。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person() {}
Person.prototype.name = 'Nealyang';
Person.prototype.age = 24;
Person.prototype.sayName = function(){
  alert(this.name);
}
var neal = new Person();
console.log(neal.name)//'Nealyang' -> 来自原型
neal.name = 'Neal';
console.log(neal.name)// Neal -> 来自实例

delete neal.name;
console.log(neal.name)//'Nealyang' -> 来自原型" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>) </span>{}
Person.prototype.name = <span class="hljs-string">'Nealyang'</span>;
Person.prototype.age = <span class="hljs-number">24</span>;
Person.prototype.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  alert(<span class="hljs-keyword">this</span>.name);
}
<span class="hljs-keyword">var</span> neal = <span class="hljs-keyword">new</span> Person();
<span class="hljs-built_in">console</span>.log(neal.name)<span class="hljs-comment">//'Nealyang' -&gt; 来自原型</span>
neal.name = <span class="hljs-string">'Neal'</span>;
<span class="hljs-built_in">console</span>.log(neal.name)<span class="hljs-comment">// Neal -&gt; 来自实例</span>

<span class="hljs-keyword">delete</span> neal.name;
<span class="hljs-built_in">console</span>.log(neal.name)<span class="hljs-comment">//'Nealyang' -&gt; 来自原型</span></code></pre>
<p>上面的例子说明两点</p>
<ul>
<li>原型中的对象属性可以被实例所覆盖重写</li>
<li>通过delete可以删除实例中的属性，但是删除不了对象上的</li>
</ul>
<blockquote><p>我们可以通过hasOwnProperty()方法来确定一个属性是在原型上还是在实例上。person1.hasOwnProperty('name'),如果name为实例属性，则返回true。</p></blockquote>
<p>我们也可以通过 'name' in person1 来确定，person1上是否有name这个属性。</p>
<p>上面大家可能已将发现，这种原型模式的写法非常的繁琐，有了大量的XXX.prototype. 这里有一种简写的形式。<br>参照具体说明参照<a href="http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance.html" rel="nofollow noreferrer" target="_blank">阮神的博客 面向对象第二篇</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(){}
Person.prototype = {
    constructor:Person,
    name:&quot;Neal&quot;,
    age:24,
    job:'Software Engineer',
    sayName:function(){
        alert(this.name);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>)</span>{}
Person.prototype = {
    <span class="hljs-attr">constructor</span>:Person,
    <span class="hljs-attr">name</span>:<span class="hljs-string">"Neal"</span>,
    <span class="hljs-attr">age</span>:<span class="hljs-number">24</span>,
    <span class="hljs-attr">job</span>:<span class="hljs-string">'Software Engineer'</span>,
    <span class="hljs-attr">sayName</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        alert(<span class="hljs-keyword">this</span>.name);
    }
}</code></pre>
<p>上面代码特意添加了一个constructor属性，因为每创建一个函数，就会自动创建他的prototype对象，这个对象会自动获取contractor属性。而我们这中写法，本质上重写了默认的prototype对象，因此，constructor属性也就变成新的对象的constructor属性了（指向Object构造函数），所以这里的简写方式，一定要加上constructor。</p>
<p>下面我们再谈一谈原型模式的优缺点。</p>
<p>优点，正如上面我们说到的，可以省略为构造函数传递出实话参数这个环节，并且很多实例可以共享属性和方法。正是因为原型中所有的属性是被所有的实例所共享的，这个特性在方法中非常实用，但是对于包含引用类型的属性来说问题就比较突出了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(){};

Person.prototype = {
    constructor:Person,
    name:&quot;neal&quot;,
    friends:['xiaohong','xiaoming'],
    sayName:function(){
        alert(this.name);
    }
}

var person1 = new Person();
var person2 = new Person();

person1.friends.push('xiaohua');

alert(person1.friends);//'xiaohong','xiaoming','xiaohua'
alert(person2.friends);//'xiaohong','xiaoming','xiaohua'
alert(person1.friends == person2.friends)//true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span><span class="hljs-params">()</span></span>{};

Person.prototype = {
    constructor:Person,
    name:<span class="hljs-string">"neal"</span>,
    friends:[<span class="hljs-string">'xiaohong'</span>,<span class="hljs-string">'xiaoming'</span>],
    sayName:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        alert(<span class="hljs-keyword">this</span>.name);
    }
}

<span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person();
<span class="hljs-keyword">var</span> person2 = <span class="hljs-keyword">new</span> Person();

person1.friends.push(<span class="hljs-string">'xiaohua'</span>);

alert(person1.friends);<span class="hljs-comment">//'xiaohong','xiaoming','xiaohua'</span>
alert(person2.friends);<span class="hljs-comment">//'xiaohong','xiaoming','xiaohua'</span>
alert(person1.friends == person2.friends)<span class="hljs-comment">//true</span>
</code></pre>
<p>由于friends数组存在于Person.prototype上，并不是person1上面，所以当我们修改的时候，其实修改的是所有实例所共享的那个值。</p>
<h3 id="articleHeader8">组合使用构造函数和原型模式</h3>
<p>这是创建自定义类型最常见的一种方式。就是组合使用构造函数和原型模式.构造函数模式用于定义实力属性，原型模式用于定义方法和共享的属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name,age){
    this.name = name,
    this.age = age
}

Person.prototype = {
    constructor:Person,
    sayName:function(){
        alert(this.name);
    }
}

var person1 = new Person('Neal',24);
var person2 = new Person('Yang',23);
...
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span><span class="hljs-params">(name,age)</span></span>{
    <span class="hljs-keyword">this</span>.name = name,
    <span class="hljs-keyword">this</span>.age = age
}

Person.prototype = {
    constructor:Person,
    sayName:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        alert(<span class="hljs-keyword">this</span>.name);
    }
}

<span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'Neal'</span>,<span class="hljs-number">24</span>);
<span class="hljs-keyword">var</span> person2 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'Yang'</span>,<span class="hljs-number">23</span>);
...
</code></pre>
<p>上面的例子中，实例所有的属性都是在构造函数中定义，而实例所有共享的属性和方法都是在原型中定义。这种构造函数和原型模式混合的模式，是目前ECMAScript中使用最为广泛的一种方法。</p>
<p>当然，有些人会觉得独立的构造函数和原型非常的难受，所以也有推出所谓的动态原型构造模式的这么一说。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name,age){
    this.name = name,
    this.age = age,
    if(typeof this.sayName != 'function'){
        Person.prototype.sayName = function(){
            console.log(this.name)
        }
    }
}
...
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name,age</span>)</span>{
    <span class="hljs-keyword">this</span>.name = name,
    <span class="hljs-keyword">this</span>.age = age,
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">this</span>.sayName != <span class="hljs-string">'function'</span>){
        Person.prototype.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
        }
    }
}
...
</code></pre>
<p>注意上面的代码，之后在sayName不存在的时候，才会在原型上给他添加相应的方法。因为对原型的修改，能够立即在所有的实例中得到反应。所以这中做法确实也是非常的完美。</p>
<p>关于javaScript高程中说到的别的寄生构造函数模式和稳妥构造函数模式大家可以自行查看哈～这里就不做过多介绍了。</p>
<h2 id="articleHeader9">继承</h2>
<p>说到面向对象，当然得说到继承。说到继承当然得说到原型。说到原型，这里我们摘自<a href="https://www.ibm.com/developerworks/cn/web/1304_zengyz_jsoo" rel="nofollow noreferrer" target="_blank">网上一篇博客里的段落</a></p>
<blockquote><p>为了说明javascript是一门面向对象的语言，首先有必要从面相对象的概念入手1、一切事物皆对象。2、对象具有封装和继承特性。3、对象与对象之间使用消息通信，各自存在信息隐秘 。</p></blockquote>
<p>javascript语言是通过一种叫做原型(prototype) 的方式来实现面向对象编程的。当然，还有比如java就是基于类来实现面向对象编程的。</p>
<h3 id="articleHeader10">基于类的面向对象和基于原型的面向对象方式比价</h3>
<p>对于基于类的面向对象的方式中，对象依靠class类来产生。而在基于原型的面向对象方式中，对象则是依靠构造器(constructor)利用原型(prototype)构造出来的。举个客观世界的例子来说，例如工厂造一辆汽车一方面，工人必须参照一张工程图纸，设计规定这辆车如何制造，这里的工程图纸就好比语言中的类class。而车就是按照这个类制造出来的。另一方面，工人和机器相当于contractor，利用各种零部件(prototype)将汽车造出来。</p>
<p>当然，对于上面的例子两种思维各种说法。当然，笔者更加倾向于基于原型的面向对象编程，毕竟我是前端出生（咳咳，真相了），正当理由如下：</p>
<p>首先，客观世界中的对象的产生都是其他实物对象构造的世界，而抽象的图纸是不能产生出汽车的。也就是说，类，是一个抽象概念的而非实体，而对象的产生是一个实体的产生。其次，按照一切事物皆对象的这饿极本的面向对象的法则来说，类本身并不是一个对象，然而原型方式的构造函数和原型本身也是个对象。再次，在类的面向对象语言中，对象的状态又对象的实例所持有，对象的行为方法则由申明该对象的类所持有，并且只有对象的构造和方法能够被继承。而在原型的面向对象语言中，对象的行为、状态都属于对象本身，并且能够一起被继承。</p>
<h3 id="articleHeader11">原型链</h3>
<p>ECMAScript描述了原型链的概念，并将原型链作为实现继承的主要方法。基本思想就是利用原型让一个引用类型继承另一个引用类型的属性和方法。</p>
<p>实现原型链有一种基本模式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function SuperType(){
    this.property = true;
}

SuperType.prototype.getSuperValue = function(){
    return this.property;
}

function SubType (){
    this.subproperty = false;
}

SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function(){
    return this.subproperty;
}

var instance = new SubType();

alert(instance.getSuperValue());
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SuperType</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">this</span>.property = <span class="hljs-literal">true</span>;
}

SuperType.prototype.getSuperValue = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.property;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SubType</span> <span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">this</span>.subproperty = <span class="hljs-literal">false</span>;
}

SubType.prototype = <span class="hljs-keyword">new</span> SuperType();

SubType.prototype.getSubValue = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.subproperty;
}

<span class="hljs-keyword">var</span> instance = <span class="hljs-keyword">new</span> SubType();

alert(instance.getSuperValue());
</code></pre>
<p>在上面的代码中，我们没有使用SubType默认提供的原型，而是给它换了一个新的原型，这个新原型就是SuperType的实例。于是，新原型不仅具有所谓一个SuperType的实例所拥有的全部属性和方法，而且其内部还有一个指针，指向SuperType的原型。最终结果是这样的：instance指向subtype的原型，subtype的原型又指向SuperType的原型。</p>
<p>通过实现原型链，本质上是扩展了原型搜索机制。</p>
<p>虽然如上，我们已经实现了javascript中的继承。但是依旧存在一些问题：最主要的问题来自包含引用类型的原型。第二个问题就是在创建子类型的实例时，不能向超类型的构造函数中传递参数。这两个问题上面也都有说到，这里就不做过多介绍，直接看解决办法！</p>
<h3 id="articleHeader12">借用构造函数</h3>
<p>在解决原型中包含引用类型的数据时，我们可以在子类型构造函数内部调用超类型的构造函数。直接看代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function SuperType(name){
    this.colors = ['red','yellow'];
    this.name = name;
}

function SubType(name){
    //继承了Super
    SuperType.call(this,name)
}

var instance1 = new SubType('Neal');
alert(instance1.name)
instance1.colors.push('black');
alert(instance1.colors);//'red','yellow','black'

var instance2 = new SubType('yang');
alert(instance2.colors);//'red','yellow'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SuperType</span><span class="hljs-params">(name)</span></span>{
    <span class="hljs-keyword">this</span>.colors = [<span class="hljs-string">'red'</span>,<span class="hljs-string">'yellow'</span>];
    <span class="hljs-keyword">this</span>.name = name;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SubType</span><span class="hljs-params">(name)</span></span>{
    <span class="hljs-comment">//继承了Super</span>
    SuperType.call(<span class="hljs-keyword">this</span>,name)
}

<span class="hljs-keyword">var</span> instance1 = <span class="hljs-keyword">new</span> SubType(<span class="hljs-string">'Neal'</span>);
alert(instance1.name)
instance1.colors.push(<span class="hljs-string">'black'</span>);
alert(instance1.colors);<span class="hljs-comment">//'red','yellow','black'</span>

<span class="hljs-keyword">var</span> instance2 = <span class="hljs-keyword">new</span> SubType(<span class="hljs-string">'yang'</span>);
alert(instance2.colors);<span class="hljs-comment">//'red','yellow'</span>
</code></pre>
<p>毕竟函数只不过是在特定环境中执行代码的对象，因此可以通过call活着apply方法在新创建的对象上执行构造函数。而且如上代码也解决了子类构造函数中向超类构造函数传递参数的问题</p>
<p>但是，这样问题就来了，类似我们之前讨论创建的对象那种构造函数的问题：如果都是使用构造函数，那么，也就避免不了方法都在构造函数中定义，然后就会产生大量重复的代码了。</p>
<h3 id="articleHeader13">组合继承</h3>
<p>因为考虑到上述的缺点，所以这里又使用了组合继承的方式，历史总是惊人的相似。直接看代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function SuperType(name){
    this.name = name;
    this.colors = ['red','yellow'];
}

SuperType.prototype.sayName = function(){
    alert(this.name);
}

function SubType(name,age){
    //继承属性
    SuperType.call(this,name);

    this.age = age;
}

//继承方法
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function(){
    alert(this.age);
}

var instance1 = new SubType('Nealyang',24);
instance1.colors.push('white');
instance1.sayName();//Nealyang
instance1.sayAge();// 24

var instance2 = new SubType('Neal',21);
alert(instance2.colors);//'red','yellow'
instance2.sayName();//Neal
instance2.sayAge();//21
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SuperType</span><span class="hljs-params">(name)</span></span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.colors = [<span class="hljs-string">'red'</span>,<span class="hljs-string">'yellow'</span>];
}

SuperType.prototype.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    alert(<span class="hljs-keyword">this</span>.name);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SubType</span><span class="hljs-params">(name,age)</span></span>{
    <span class="hljs-comment">//继承属性</span>
    SuperType.call(<span class="hljs-keyword">this</span>,name);

    <span class="hljs-keyword">this</span>.age = age;
}

<span class="hljs-comment">//继承方法</span>
SubType.prototype = <span class="hljs-keyword">new</span> SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    alert(<span class="hljs-keyword">this</span>.age);
}

<span class="hljs-keyword">var</span> instance1 = <span class="hljs-keyword">new</span> SubType(<span class="hljs-string">'Nealyang'</span>,<span class="hljs-number">24</span>);
instance1.colors.push(<span class="hljs-string">'white'</span>);
instance1.sayName();<span class="hljs-comment">//Nealyang</span>
instance1.sayAge();<span class="hljs-comment">// 24</span>

<span class="hljs-keyword">var</span> instance2 = <span class="hljs-keyword">new</span> SubType(<span class="hljs-string">'Neal'</span>,<span class="hljs-number">21</span>);
alert(instance2.colors);<span class="hljs-comment">//'red','yellow'</span>
instance2.sayName();<span class="hljs-comment">//Neal</span>
instance2.sayAge();<span class="hljs-comment">//21</span>
</code></pre>
<p>在上面的例子中，SuperType构造函数定义了两个属性，name和colors，SuperType的原型中定义了一个方法sayName，subtype的构造函数中调用SuperType构造函数并且传入name，然后将SuperType的实例赋值给subtype的原型。然后又在新的原型中定义了sayAge的方法。这样一来，就可以让两个不同的SubType实例既分别拥有自己的属性，包括colors，又可以使用相同的方法了。</p>
<p>组合继承避免了原型链和借用构造函数的缺陷，融合了他们的优点。成为javascript中最为常见的继承模式。而且instanceof和isPrototypeOf方法也能用于识别组合模式创建的对象。</p>
<h3 id="articleHeader14">别的继承模式</h3>
<p>继承模式是有很多，上面只是说到我们经常使用到的继承模式。包括还有原型式继承、寄生式继承、寄生组合式继承等，其实，只要理解了原型、原型链、构造函数等对象的基本概念，理解起来这中模式都是非常容易的。后续如果有时间，再给大家总结吧～</p>
<h2 id="articleHeader15">交流</h2>
<p><strong><em>扫码关注我的个人微信公众号，分享更多原创文章。点击交流学习加我微信、qq群。一起学习，一起进步</em></strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011708896?w=430&amp;h=430" src="https://static.alili.tech/img/remote/1460000011708896?w=430&amp;h=430" alt="" title="" style="cursor: pointer;"></span></p>
<hr>
<p>欢迎兄弟们加入：</p>
<p>Node.js技术交流群：209530601 </p>
<p>React技术栈：398240621</p>
<p>前端技术杂谈：604953717 (新建)</p>
<hr>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浅谈JavaScript面向对象

## 原文链接
[https://segmentfault.com/a/1190000011708891](https://segmentfault.com/a/1190000011708891)

