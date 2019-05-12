---
title: 'JavaScript深入之创建对象的多种方式以及优缺点' 
date: 2019-01-14 2:30:07
hidden: true
slug: uc2ydm52te
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>JavaScript深入系列第十四篇，讲解创建对象的各种方式，以及优缺点。</p></blockquote>
<h2 id="articleHeader0">写在前面</h2>
<p>这篇文章讲解创建对象的各种方式，以及优缺点。</p>
<p>但是注意：</p>
<p>这篇文章更像是笔记，因为《JavaScript高级程序设计》写得真是太好了！</p>
<h2 id="articleHeader1">1. 工厂模式</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createPerson(name) {
    var o = new Object();
    o.name = name;
    o.getName = function () {
        console.log(this.name);
    };

    return o;
}

var person1 = createPerson('kevin');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createPerson</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">var</span> o = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
    o.name = name;
    o.getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
    };

    <span class="hljs-keyword">return</span> o;
}

<span class="hljs-keyword">var</span> person1 = createPerson(<span class="hljs-string">'kevin'</span>);</code></pre>
<p>缺点：对象无法识别，因为所有的实例都指向一个原型</p>
<h2 id="articleHeader2">2. 构造函数模式</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name) {
    this.name = name;
    this.getName = function () {
        console.log(this.name);
    };
}

var person1 = new Person('kevin');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
    };
}

<span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'kevin'</span>);</code></pre>
<p>优点：实例可以识别为一个特定的类型</p>
<p>缺点：每次创建实例时，每个方法都要被创建一次</p>
<h2 id="articleHeader3">2.1 构造函数模式优化</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name) {
    this.name = name;
    this.getName = getName;
}

function getName() {
    console.log(this.name);
}

var person1 = new Person('kevin');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.getName = getName;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getName</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
}

<span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'kevin'</span>);</code></pre>
<p>优点：解决了每个方法都要被重新创建的问题</p>
<p>缺点：这叫啥封装……</p>
<h2 id="articleHeader4">3. 原型模式</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name) {

}

Person.prototype.name = 'keivn';
Person.prototype.getName = function () {
    console.log(this.name);
};

var person1 = new Person();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name</span>) </span>{

}

Person.prototype.name = <span class="hljs-string">'keivn'</span>;
Person.prototype.getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
};

<span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person();</code></pre>
<p>优点：方法不会重新创建</p>
<p>缺点：1. 所有的属性和方法都共享 2. 不能初始化参数</p>
<h2 id="articleHeader5">3.1 原型模式优化</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name) {

}

Person.prototype = {
    name: 'kevin',
    getName: function () {
        console.log(this.name);
    }
};

var person1 = new Person();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name</span>) </span>{

}

Person.prototype = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'kevin'</span>,
    <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
    }
};

<span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person();</code></pre>
<p>优点：封装性好了一点</p>
<p>缺点：重写了原型，丢失了constructor属性</p>
<h2 id="articleHeader6">3.2 原型模式优化</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name) {

}

Person.prototype = {
    constructor: Person,
    name: 'kevin',
    getName: function () {
        console.log(this.name);
    }
};

var person1 = new Person();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name</span>) </span>{

}

Person.prototype = {
    <span class="hljs-attr">constructor</span>: Person,
    <span class="hljs-attr">name</span>: <span class="hljs-string">'kevin'</span>,
    <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
    }
};

<span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person();</code></pre>
<p>优点：实例可以通过constructor属性找到所属构造函数</p>
<p>缺点：原型模式该有的缺点还是有</p>
<h2 id="articleHeader7">4. 组合模式</h2>
<p>构造函数模式与原型模式双剑合璧。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name) {
    this.name = name;
}

Person.prototype = {
    constructor: Person,
    getName: function () {
        console.log(this.name);
    }
};

var person1 = new Person();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name;
}

Person.prototype = {
    <span class="hljs-attr">constructor</span>: Person,
    <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
    }
};

<span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person();</code></pre>
<p>优点：该共享的共享，该私有的私有，使用最广泛的方式</p>
<p>缺点：有的人就是希望全部都写在一起，即更好的封装性</p>
<h2 id="articleHeader8">4.1 动态原型模式</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name) {
    this.name = name;
    if (typeof this.getName != &quot;function&quot;) {
        Person.prototype.getName = function () {
            console.log(this.name);
        }
    }
}

var person1 = new Person();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">this</span>.getName != <span class="hljs-string">"function"</span>) {
        Person.prototype.getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
        }
    }
}

<span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person();</code></pre>
<p>注意：使用动态原型模式时，不能用对象字面量重写原型</p>
<p>解释下为什么：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name) {
    this.name = name;
    if (typeof this.getName != &quot;function&quot;) {
        Person.prototype = {
            constructor: Person,
            getName: function () {
                console.log(this.name);
            }
        }
    }
}

var person1 = new Person('kevin');
var person2 = new Person('daisy');

// 报错 并没有该方法
person1.getName();

// 注释掉上面的代码，这句是可以执行的。
person2.getName();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">this</span>.getName != <span class="hljs-string">"function"</span>) {
        Person.prototype = {
            <span class="hljs-attr">constructor</span>: Person,
            <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
            }
        }
    }
}

<span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'kevin'</span>);
<span class="hljs-keyword">var</span> person2 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'daisy'</span>);

<span class="hljs-comment">// 报错 并没有该方法</span>
person1.getName();

<span class="hljs-comment">// 注释掉上面的代码，这句是可以执行的。</span>
person2.getName();
</code></pre>
<p>为了解释这个问题，假设开始执行<code>var person1 = new Person('kevin')</code>。</p>
<p>如果对 new 和 apply 的底层执行过程不是很熟悉，可以阅读底部相关链接中的文章。</p>
<p>我们回顾下 new 的实现步骤：</p>
<ol>
<li><p>首先新建一个对象</p></li>
<li><p>然后将对象的原型指向 Person.prototype</p></li>
<li><p>然后 Person.apply(obj)</p></li>
<li><p>返回这个对象</p></li>
</ol>
<p>注意这个时候，回顾下 apply 的实现步骤，会执行 obj.Person 方法，这个时候就会执行 if 语句里的内容，注意构造函数的 prototype 属性指向了实例的原型，使用字面量方式直接覆盖 Person.prototype，并不会更改实例的原型的值，person1 依然是指向了以前的原型，而不是 Person.prototype。而之前的原型是没有 getName 方法的，所以就报错了！</p>
<p>如果你就是想用字面量方式写代码，可以尝试下这种：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name) {
    this.name = name;
    if (typeof this.getName != &quot;function&quot;) {
        Person.prototype = {
            constructor: Person,
            getName: function () {
                console.log(this.name);
            }
        }

        return new Person(name);
    }
}

var person1 = new Person('kevin');
var person2 = new Person('daisy');

person1.getName(); // kevin
person2.getName();  // daisy
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">this</span>.getName != <span class="hljs-string">"function"</span>) {
        Person.prototype = {
            <span class="hljs-attr">constructor</span>: Person,
            <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
            }
        }

        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Person(name);
    }
}

<span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'kevin'</span>);
<span class="hljs-keyword">var</span> person2 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'daisy'</span>);

person1.getName(); <span class="hljs-comment">// kevin</span>
person2.getName();  <span class="hljs-comment">// daisy</span>
</code></pre>
<h3 id="articleHeader9">5.1 寄生构造函数模式</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name) {

    var o = new Object();
    o.name = name;
    o.getName = function () {
        console.log(this.name);
    };

    return o;

}

var person1 = new Person('kevin');
console.log(person1 instanceof Person) // false
console.log(person1 instanceof Object)  // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name</span>) </span>{

    <span class="hljs-keyword">var</span> o = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
    o.name = name;
    o.getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
    };

    <span class="hljs-keyword">return</span> o;

}

<span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'kevin'</span>);
<span class="hljs-built_in">console</span>.log(person1 <span class="hljs-keyword">instanceof</span> Person) <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(person1 <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>)  <span class="hljs-comment">// true</span></code></pre>
<p>寄生构造函数模式，我个人认为应该这样读：</p>
<p>寄生-构造函数-模式，也就是说寄生在构造函数的一种方法。</p>
<p>也就是说打着构造函数的幌子挂羊头卖狗肉，你看创建的实例使用 instanceof 都无法指向构造函数！</p>
<p>这样方法可以在特殊情况下使用。比如我们想创建一个具有额外方法的特殊数组，但是又不想直接修改Array构造函数，我们可以这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function SpecialArray() {
    var values = new Array();

    for (var i = 0, len = arguments.length; i < len; i++) {
        values.push(arguments[i]);
    }

    values.toPipedString = function () {
        return this.join(&quot;|&quot;);
    };
    return values;
}

var colors = new SpecialArray('red', 'blue', 'green');
var colors2 = SpecialArray('red2', 'blue2', 'green2');


console.log(colors);
console.log(colors.toPipedString()); // red|blue|green

console.log(colors2);
console.log(colors2.toPipedString()); // red2|blue2|green2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SpecialArray</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> values = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>();

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = <span class="hljs-built_in">arguments</span>.length; i &lt; len; i++) {
        values.push(<span class="hljs-built_in">arguments</span>[i]);
    }

    values.toPipedString = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.join(<span class="hljs-string">"|"</span>);
    };
    <span class="hljs-keyword">return</span> values;
}

<span class="hljs-keyword">var</span> colors = <span class="hljs-keyword">new</span> SpecialArray(<span class="hljs-string">'red'</span>, <span class="hljs-string">'blue'</span>, <span class="hljs-string">'green'</span>);
<span class="hljs-keyword">var</span> colors2 = SpecialArray(<span class="hljs-string">'red2'</span>, <span class="hljs-string">'blue2'</span>, <span class="hljs-string">'green2'</span>);


<span class="hljs-built_in">console</span>.log(colors);
<span class="hljs-built_in">console</span>.log(colors.toPipedString()); <span class="hljs-comment">// red|blue|green</span>

<span class="hljs-built_in">console</span>.log(colors2);
<span class="hljs-built_in">console</span>.log(colors2.toPipedString()); <span class="hljs-comment">// red2|blue2|green2</span></code></pre>
<p>你会发现，其实所谓的寄生构造函数模式就是比工厂模式在创建对象的时候，多使用了一个new，实际上两者的结果是一样的。</p>
<p>但是作者可能是希望能像使用普通 Array 一样使用 SpecialArray，虽然把 SpecialArray 当成函数也一样能用，但是这并不是作者的本意，也变得不优雅。</p>
<p>在可以使用其他模式的情况下，不要使用这种模式。</p>
<p>但是值得一提的是，上面例子中的循环：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (var i = 0, len = arguments.length; i < len; i++) {
    values.push(arguments[i]);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = <span class="hljs-built_in">arguments</span>.length; i &lt; len; i++) {
    values.push(<span class="hljs-built_in">arguments</span>[i]);
}</code></pre>
<p>可以替换成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="values.push.apply(values, arguments);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">values.push.apply(values, <span class="hljs-built_in">arguments</span>);</code></pre>
<h2 id="articleHeader10">5.2 稳妥构造函数模式</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function person(name){
    var o = new Object();
    o.sayName = function(){
        console.log(name);
    };
    return o;
}

var person1 = person('kevin');

person1.sayName(); // kevin

person1.name = &quot;daisy&quot;;

person1.sayName(); // kevin

console.log(person1.name); // daisy
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">person</span>(<span class="hljs-params">name</span>)</span>{
    <span class="hljs-keyword">var</span> o = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
    o.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(name);
    };
    <span class="hljs-keyword">return</span> o;
}

<span class="hljs-keyword">var</span> person1 = person(<span class="hljs-string">'kevin'</span>);

person1.sayName(); <span class="hljs-comment">// kevin</span>

person1.name = <span class="hljs-string">"daisy"</span>;

person1.sayName(); <span class="hljs-comment">// kevin</span>

<span class="hljs-built_in">console</span>.log(person1.name); <span class="hljs-comment">// daisy</span>
</code></pre>
<p>所谓稳妥对象，指的是没有公共属性，而且其方法也不引用 this 的对象。</p>
<p>与寄生构造函数模式有两点不同：</p>
<ol>
<li><p>新创建的实例方法不引用 this</p></li>
<li><p>不使用 new 操作符调用构造函数</p></li>
</ol>
<p>稳妥对象最适合在一些安全的环境中。</p>
<p>稳妥构造函数模式也跟工厂模式一样，无法识别对象所属类型。</p>
<h2 id="articleHeader11">下一篇文章</h2>
<p><a href="https://github.com/mqyqingfeng/Blog/issues/16" rel="nofollow noreferrer" target="_blank">JavaScript深入之继承的多种方式和优缺点</a></p>
<h2 id="articleHeader12">相关链接</h2>
<p><a href="https://github.com/mqyqingfeng/Blog/issues/2" rel="nofollow noreferrer" target="_blank">《JavaScript深入之从原型到原型链》</a></p>
<p><a href="https://github.com/mqyqingfeng/Blog/issues/13" rel="nofollow noreferrer" target="_blank">《JavaScript深入之new的模拟实现》</a></p>
<p><a href="https://github.com/mqyqingfeng/Blog/issues/11" rel="nofollow noreferrer" target="_blank">《JavaScript深入之call和apply的模拟实现》</a></p>
<h2 id="articleHeader13">深入系列</h2>
<p>JavaScript深入系列目录地址：<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a>。</p>
<p>JavaScript深入系列预计写十五篇左右，旨在帮大家捋顺JavaScript底层知识，重点讲解如原型、作用域、执行上下文、变量对象、this、闭包、按值传递、call、apply、bind、new、继承等难点概念。</p>
<p>如果有错误或者不严谨的地方，请务必给予指正，十分感谢。如果喜欢或者有所启发，欢迎star，对作者也是一种鼓励。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript深入之创建对象的多种方式以及优缺点

## 原文链接
[https://segmentfault.com/a/1190000009359984](https://segmentfault.com/a/1190000009359984)

