---
title: 'javaScript中的Object.defineProperty()和defineProperties()' 
date: 2018-12-31 2:30:29
hidden: true
slug: nthjzwzqoc
categories: [reprint]
---

{{< raw >}}

                    
<p>文章同步到<a href="https://github.com/sunzhaoye/blog/issues/8" rel="nofollow noreferrer" target="_blank">github</a></p>
<blockquote>ECMAS-262第5版在定义只有内部采用的特性时，提供了描述了属性特征的几种属性。ECMAScript对象中目前存在的属性描述符主要有两种，数据描述符(数据属性)和存取描述符(访问器属性)，数据描述符是一个拥有可写或不可写值的属性。存取描述符是由一对 getter-setter 函数功能来描述的属性。</blockquote>
<p>Object的<strong>defineProperty</strong>和<strong>defineProperties</strong>这两个方法在js中的重要性十分重要，主要功能就是用来<strong>定义或修改这些内部属性</strong>,与之相对应的<strong>getOwnPropertyDescriptor</strong>和<strong>getOwnPropertyDescriptors</strong>就是获取这行内部属性的描述。</p>
<p>下面文章我先介绍数据描述符和存取描述符的属性代表的含义，然后简单介绍以上四个方法的基本功能，这些如果了解可直接跳过，最后我会举例扩展及说明各内部属性在各种场景下产生的实际效果，那才是这篇文章的核心内容。本文章关于概念性的描述还是会尽量使用《javaScript高级教程》、MDN网站等概念，保证准确和易于大家理解，讲解部分则结合个人理解和举例说明。</p>
<h1 id="articleHeader0">数据(数据描述符)属性</h1>
<p>数据属性有4个描述内部属性的特性</p>
<h2 id="articleHeader1">[[Configurable]]</h2>
<p>表示能否通过<a href="https://segmentfault.com/a/1190000010574280">delete</a>删除此属性，能否修改属性的特性，或能否修改把属性修改为访问器属性，如果直接使用字面量定义对象，默认值为true</p>
<h2 id="articleHeader2">[[Enumerable]]</h2>
<p>表示该属性是否可枚举，即是否通过for-in循环或Object.keys()返回属性，如果直接使用字面量定义对象，默认值为true</p>
<h2 id="articleHeader3">[[Writable]]</h2>
<p>能否修改属性的值，如果直接使用字面量定义对象，默认值为true</p>
<h2 id="articleHeader4">[[Value]]</h2>
<p>该属性对应的值，默认为undefined</p>
<h1 id="articleHeader5">访问器(存取描述符)属性</h1>
<p>访问器属性也有4个描述内部属性的特性</p>
<h2 id="articleHeader6">[[Configurable]]</h2>
<p>和数据属性的[[Configurable]]一样，表示能否通过delete删除此属性，能否修改属性的特性，或能否修改把属性修改为访问器属性，如果直接使用字面量定义对象，默认值为true</p>
<h2 id="articleHeader7">[[Enumerable]]</h2>
<p>和数据属性的[[Configurable]]一样，表示该属性是否可枚举，即是否通过for-in循环或Object.keys()返回属性，如果直接使用字面量定义对象，默认值为true</p>
<h2 id="articleHeader8">[[Get]]</h2>
<p>一个给属性提供 getter 的方法(访问对象属性时调用的函数,返回值就是当前属性的值)，如果没有 getter 则为 undefined。该方法返回值被用作属性值。默认为 undefined</p>
<h2 id="articleHeader9">[[Set]]</h2>
<p>一个给属性提供 setter 的方法(给对象属性设置值时调用的函数)，如果没有 setter 则为 undefined。该方法将接受唯一参数，并将该参数的新值分配给该属性。默认为 undefined</p>
<h1 id="articleHeader10"> 创建/修改/获取属性的方法</h1>
<h2 id="articleHeader11">Object.defineProperty()</h2>
<p><strong>功能:</strong><br>方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。如果不指定configurable, writable, enumerable ，则这些属性默认值为false，如果不指定value, get, set，则这些属性默认值为undefined</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="语法: Object.defineProperty(obj, prop, descriptor)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">语法: Object.defineProperty(obj, <span class="hljs-keyword">prop</span>, descriptor)</code></pre>
<p><strong>obj:</strong> 需要被操作的目标对象<br><strong>prop:</strong> 目标对象需要定义或修改的属性的名称<br><strong>descriptor:</strong> 将被定义或修改的属性的描述符</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = new Object();

Object.defineProperty(obj, 'name', {
    configurable: false,
    writable: true,
    enumerable: true,
    value: '张三'
})

console.log(obj.name)  //张三" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> obj = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();

<span class="hljs-built_in">Object</span>.defineProperty(obj, <span class="hljs-string">'name'</span>, {
    <span class="hljs-attr">configurable</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">writable</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-string">'张三'</span>
})

<span class="hljs-built_in">console</span>.log(obj.name)  <span class="hljs-comment">//张三</span></code></pre>
<h2 id="articleHeader12">Object.defineProperties()</h2>
<p><strong>功能:</strong><br>方法直接在一个对象上定义一个或多个新的属性或修改现有属性，并返回该对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="语法: Object.defineProperties(obj, props)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code style="word-break: break-word; white-space: initial;">语法: Object.defineProperties(obj, props)</code></pre>
<p><strong>obj:</strong> 将要被添加属性或修改属性的对象<br><strong>props:</strong> 该对象的一个或多个键值对定义了将要为对象添加或修改的属性的具体配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = new Object();
Object.defineProperties(obj, {
    name: {
        value: '张三',
        configurable: false,
        writable: true,
        enumerable: true
    },
    age: {
        value: 18,
        configurable: true
    }
})

console.log(obj.name, obj.age) // 张三, 18" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">var</span> <span class="hljs-string">obj</span> <span class="hljs-string">=</span> <span class="hljs-string">new</span> <span class="hljs-string">Object();</span>
<span class="hljs-string">Object.defineProperties(obj,</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    name:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        value:</span> <span class="hljs-string">'张三'</span><span class="hljs-string">,</span>
<span class="hljs-attr">        configurable:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">        writable:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">        enumerable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-string">},</span>
<span class="hljs-attr">    age:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        value:</span> <span class="hljs-number">18</span><span class="hljs-string">,</span>
<span class="hljs-attr">        configurable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-string">}</span>
<span class="hljs-string">})</span>

<span class="hljs-string">console.log(obj.name,</span> <span class="hljs-string">obj.age)</span> <span class="hljs-string">//</span> <span class="hljs-string">张三,</span> <span class="hljs-number">18</span></code></pre>
<h2 id="articleHeader13">Object.getOwnPropertyDescriptor()</h2>
<p><strong>功能:</strong><br>该方法返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="语法: Object.getOwnPropertyDescriptor(obj, prop)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">语法: Object.getOwnPropertyDescriptor(obj, <span class="hljs-keyword">prop</span>)</code></pre>
<p><strong>obj:</strong> 需要查找的目标对象<br><strong>prop:</strong> 目标对象内属性名称</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var person = {
    name: '张三',
    age: 18
}

var desc = Object.getOwnPropertyDescriptor(person, 'name'); 
console.log(desc)  结果如下
// {
//     configurable: true,
//     enumerable: true,
//     writable: true,
//     value: &quot;张三&quot;
// }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> person = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'张三'</span>,
    <span class="hljs-attr">age</span>: <span class="hljs-number">18</span>
}

<span class="hljs-keyword">var</span> desc = <span class="hljs-built_in">Object</span>.getOwnPropertyDescriptor(person, <span class="hljs-string">'name'</span>); 
<span class="hljs-built_in">console</span>.log(desc)  结果如下
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//     configurable: true,</span>
<span class="hljs-comment">//     enumerable: true,</span>
<span class="hljs-comment">//     writable: true,</span>
<span class="hljs-comment">//     value: "张三"</span>
<span class="hljs-comment">// }</span>
</code></pre>
<h2 id="articleHeader14">Object. getOwnPropertyDescriptors()</h2>
<p><strong>功能:</strong><br>所指定对象的所有自身属性的描述符，如果没有任何自身属性，则返回空对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="语法: Object.getOwnPropertyDescriptors(obj)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code style="word-break: break-word; white-space: initial;">语法: Object.getOwnPropertyDescriptors(obj)</code></pre>
<p><strong>obj:</strong> 需要查找的目标对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var person = {
    name: '张三',
    age: 18
}
var desc = Object.getOwnPropertyDescriptors(person, 'name');
console.log(desc) // 结果如下图
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> person = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'张三'</span>,
    <span class="hljs-attr">age</span>: <span class="hljs-number">18</span>
}
<span class="hljs-keyword">var</span> desc = <span class="hljs-built_in">Object</span>.getOwnPropertyDescriptors(person, <span class="hljs-string">'name'</span>);
<span class="hljs-built_in">console</span>.log(desc) <span class="hljs-comment">// 结果如下图</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011294524" src="https://static.alili.tech/img/remote/1460000011294524" alt="console结果" title="console结果" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader15">各种场景下描述符属性的的扩展示例讲解</h1>
<h2 id="articleHeader16">configrubale</h2>
<p>如果设置configrubale属性为false，则不可使用delete操作符(在严格模式下抛出错误), 修改所有内部属性值会抛出错误,在《javaScript高级教程中》说只可以改变writable的值，现在改变writable的值也会抛出错误</p>
<h3 id="articleHeader17">在对象中添加一个数据描述符属性</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var person = {};

Object.defineProperty(person, 'name', {
    configurable: false,
    value: 'John'
}) ;

delete person.name   // 严格模式下抛出错误

console.log(person.name)  // 'John'  没有删除

Object.defineProperty(person, 'name', {
    configurable: true  //报错
});

Object.defineProperty(person, 'name', {
    enumerable: 2  //报错
});

Object.defineProperty(person, 'name', {
    writable: true  //报错
});

Object.defineProperty(person, 'name', {
    value: 2  //报错
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> person = {};

<span class="hljs-built_in">Object</span>.defineProperty(person, <span class="hljs-string">'name'</span>, {
    <span class="hljs-attr">configurable</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-string">'John'</span>
}) ;

<span class="hljs-keyword">delete</span> person.name   <span class="hljs-comment">// 严格模式下抛出错误</span>

<span class="hljs-built_in">console</span>.log(person.name)  <span class="hljs-comment">// 'John'  没有删除</span>

<span class="hljs-built_in">Object</span>.defineProperty(person, <span class="hljs-string">'name'</span>, {
    <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>  <span class="hljs-comment">//报错</span>
});

<span class="hljs-built_in">Object</span>.defineProperty(person, <span class="hljs-string">'name'</span>, {
    <span class="hljs-attr">enumerable</span>: <span class="hljs-number">2</span>  <span class="hljs-comment">//报错</span>
});

<span class="hljs-built_in">Object</span>.defineProperty(person, <span class="hljs-string">'name'</span>, {
    <span class="hljs-attr">writable</span>: <span class="hljs-literal">true</span>  <span class="hljs-comment">//报错</span>
});

<span class="hljs-built_in">Object</span>.defineProperty(person, <span class="hljs-string">'name'</span>, {
    <span class="hljs-attr">value</span>: <span class="hljs-number">2</span>  <span class="hljs-comment">//报错</span>
});</code></pre>
<p><strong>注意:</strong><br>以上是最开始定义属性描述符时,writabl默认为false,才会出现上述效果,如果writable定义为true, 则可以修改[[writable]]和[[value]]属性值,修改另外两个属性值报错</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {};

Object.defineProperty(obj, 'a', {
    configurable: false,
    writable: true,
    value: 1
});

Object.defineProperty(obj, 'a', {
    // configurable: true, //报错
    // enumerable: true,  //报错
    writable: false,
    value: 2
});
var d = Object.getOwnPropertyDescriptor(obj, 'a')
console.log(d);
// {
//     value: 2, 
//     writable: false, 
// }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">var</span> <span class="hljs-string">obj</span> <span class="hljs-string">=</span> <span class="hljs-string">{};</span>

<span class="hljs-string">Object.defineProperty(obj,</span> <span class="hljs-string">'a'</span><span class="hljs-string">,</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    configurable:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">    writable:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    value:</span> <span class="hljs-number">1</span>
<span class="hljs-string">});</span>

<span class="hljs-string">Object.defineProperty(obj,</span> <span class="hljs-string">'a'</span><span class="hljs-string">,</span> <span class="hljs-string">{</span>
    <span class="hljs-string">//</span> <span class="hljs-attr">configurable:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span> <span class="hljs-string">//报错</span>
    <span class="hljs-string">//</span> <span class="hljs-attr">enumerable:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>  <span class="hljs-string">//报错</span>
<span class="hljs-attr">    writable:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">    value:</span> <span class="hljs-number">2</span>
<span class="hljs-string">});</span>
<span class="hljs-string">var</span> <span class="hljs-string">d</span> <span class="hljs-string">=</span> <span class="hljs-string">Object.getOwnPropertyDescriptor(obj,</span> <span class="hljs-string">'a'</span><span class="hljs-string">)</span>
<span class="hljs-string">console.log(d);</span>
<span class="hljs-string">//</span> <span class="hljs-string">{</span>
<span class="hljs-string">//</span>     <span class="hljs-attr">value:</span> <span class="hljs-number">2</span><span class="hljs-string">,</span> 
<span class="hljs-string">//</span>     <span class="hljs-attr">writable:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span> 
<span class="hljs-string">//</span> <span class="hljs-string">}</span></code></pre>
<h3 id="articleHeader18">在对象中添加存取描述符属性</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {};
var aValue; //如果不初始化变量, 不给下面的a属性设置值,直接读取会报错aValue is not defined
var b;
Object.defineProperty(obj, 'a', {
    configurable : true,
    enumerable : true,
    get: function() {
        return aValue
    },
    set: function(newValue) {
        aValue = newValue;
        b = newValue + 1
    }
})
console.log(b) // undefined
console.log(obj.a)  // undefined, 当读取属性值时，调用get方法,返回undefined
obj.a = 2;  // 当设置属性值时,调用set方法,aValue为2

console.log(obj.a) // 2  读取属性值,调用get方法,此时aValue为2
console.log(b) // 3  再给obj.a赋值时,执行set方法,b的值被修改为2,额外说一句,vue中的计算属性就是利用setter来实现的" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> obj = {};
<span class="hljs-keyword">var</span> aValue; <span class="hljs-comment">//如果不初始化变量, 不给下面的a属性设置值,直接读取会报错aValue is not defined</span>
<span class="hljs-keyword">var</span> b;
<span class="hljs-built_in">Object</span>.defineProperty(obj, <span class="hljs-string">'a'</span>, {
    <span class="hljs-attr">configurable</span> : <span class="hljs-literal">true</span>,
    <span class="hljs-attr">enumerable</span> : <span class="hljs-literal">true</span>,
    <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> aValue
    },
    <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">newValue</span>) </span>{
        aValue = newValue;
        b = newValue + <span class="hljs-number">1</span>
    }
})
<span class="hljs-built_in">console</span>.log(b) <span class="hljs-comment">// undefined</span>
<span class="hljs-built_in">console</span>.log(obj.a)  <span class="hljs-comment">// undefined, 当读取属性值时，调用get方法,返回undefined</span>
obj.a = <span class="hljs-number">2</span>;  <span class="hljs-comment">// 当设置属性值时,调用set方法,aValue为2</span>

<span class="hljs-built_in">console</span>.log(obj.a) <span class="hljs-comment">// 2  读取属性值,调用get方法,此时aValue为2</span>
<span class="hljs-built_in">console</span>.log(b) <span class="hljs-comment">// 3  再给obj.a赋值时,执行set方法,b的值被修改为2,额外说一句,vue中的计算属性就是利用setter来实现的</span></code></pre>
<p><strong>注意:</strong><br><strong><em>1.getter和setter可以不同时使用,但在严格模式下只其中一个,会抛出错误</em></strong><br><strong><em>2.数据描述符与存取描述符不可混用,会抛出错误</em></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {};
Object.defineProperty(obj, 'a', {
    value: 'a1',
    get: function() {
       return 'a2'
    }    
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> obj = {};
Object.defineProperty(obj, <span class="hljs-string">'a'</span>, {
    value: <span class="hljs-string">'a1'</span>,
    <span class="hljs-keyword">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
       <span class="hljs-keyword">return</span> <span class="hljs-string">'a2'</span>
    }    
});</code></pre>
<p><strong><em>3.全局环境下:</em></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1;  // a属于window, 相当于window.a" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;  <span class="hljs-comment">// a属于window, 相当于window.a</span></code></pre>
<p>让我们来看看a的描述符属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var d = Object.getOwnPropertyDescriptor(window, 'a');
console.log(d)
// {
//     configurable: false,
//     value: 1,
//     writable: true,
//     enumerable: true
// }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> d = <span class="hljs-built_in">Object</span>.getOwnPropertyDescriptor(<span class="hljs-built_in">window</span>, <span class="hljs-string">'a'</span>);
<span class="hljs-built_in">console</span>.log(d)
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//     configurable: false,</span>
<span class="hljs-comment">//     value: 1,</span>
<span class="hljs-comment">//     writable: true,</span>
<span class="hljs-comment">//     enumerable: true</span>
<span class="hljs-comment">// }</span></code></pre>
<p>在来看一下另一种不适用var声明的方式初始化a变量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a = 1; //a相当于window的一个属性, window.a" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">a</span> = <span class="hljs-number">1</span><span class="hljs-comment">; //a相当于window的一个属性, window.a</span></code></pre>
<p>再来看看此时a的描述符属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var d = Object.getOwnPropertyDescriptor(window, 'a');
console.log(d)
// {
//     configurable: true,   // 此时configurable属性值为true
//     value: 1,
//     writable: true,
//     enumerable: true
// }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> d = <span class="hljs-built_in">Object</span>.getOwnPropertyDescriptor(<span class="hljs-built_in">window</span>, <span class="hljs-string">'a'</span>);
<span class="hljs-built_in">console</span>.log(d)
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//     configurable: true,   // 此时configurable属性值为true</span>
<span class="hljs-comment">//     value: 1,</span>
<span class="hljs-comment">//     writable: true,</span>
<span class="hljs-comment">//     enumerable: true</span>
<span class="hljs-comment">// }</span></code></pre>
<p><strong>注意:</strong></p>
<p>只有使用var, let等操作符才是定义变量，而不使用var，直接a=1;,这样a的含义为window的一个属性，并不是我们所说的变量的概念。使用 var定义的任何变量，其configurable属性值都为false,定义对象也是一样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var b = {
    name: 'bbb'
}
var d = Object.getOwnPropertyDescriptor(window, 'b');
console.log(d)
// {
//     configurable: false
//     value: 1,
//     writable: true,
//     enumerable: true
// }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> b = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'bbb'</span>
}
<span class="hljs-keyword">var</span> d = <span class="hljs-built_in">Object</span>.getOwnPropertyDescriptor(<span class="hljs-built_in">window</span>, <span class="hljs-string">'b'</span>);
<span class="hljs-built_in">console</span>.log(d)
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//     configurable: false</span>
<span class="hljs-comment">//     value: 1,</span>
<span class="hljs-comment">//     writable: true,</span>
<span class="hljs-comment">//     enumerable: true</span>
<span class="hljs-comment">// }</span></code></pre>
<p>但是这里需要说明的一点是,使用字面量定义的对象,该对象内部的属性的数据描述符属性都为true</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var b = {
    name: 'bbb'
}
var d = Object.getOwnPropertyDescriptor(b, 'name');
console.log(d)
// {
//     configurable: true
//     writable: true,
//     enumerable: true
//     value: 'bbb'
// }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> b = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'bbb'</span>
}
<span class="hljs-keyword">var</span> d = <span class="hljs-built_in">Object</span>.getOwnPropertyDescriptor(b, <span class="hljs-string">'name'</span>);
<span class="hljs-built_in">console</span>.log(d)
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//     configurable: true</span>
<span class="hljs-comment">//     writable: true,</span>
<span class="hljs-comment">//     enumerable: true</span>
<span class="hljs-comment">//     value: 'bbb'</span>
<span class="hljs-comment">// }</span></code></pre>
<h2 id="articleHeader19">Writable</h2>
<p>当writable为false(并且configrubale为true),[[value]]可以通过defineeProperty修改, 但不能直接赋值修改</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {};

Object.defineProperty(obj, 'a', {
    configurable: true,
    enumerable: false,
    writable: false,
    value: 1
});

Object.defineProperty(obj, 'a', {
    configurable: false,
    enumerable: true,
    writable: false ,
    value: 2
});
var d = Object.getOwnPropertyDescriptor(obj, 'a')

console.log(d); // 结果如下
// {
//     value: 2, 
//     writable: false, 
//     enumerable: true, 
//     configurable: false
// }


但是如果直接复制修改
var obj = {}

Object.defineProperty(obj, 'a', {
    configurable: true,
    enumerable: false,
    writable: false,
    value: 1
});
obj.a=2;
var d = Object.getOwnPropertyDescriptor(obj, 'a')

console.log(d); // 结果如下

// {
//     value: 1,  // 没有做出修改
//     writable: false, 
//     enumerable: true, 
//     configurable: false
// }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">var</span> <span class="hljs-string">obj</span> <span class="hljs-string">=</span> <span class="hljs-string">{};</span>

<span class="hljs-string">Object.defineProperty(obj,</span> <span class="hljs-string">'a'</span><span class="hljs-string">,</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    configurable:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    enumerable:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">    writable:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">    value:</span> <span class="hljs-number">1</span>
<span class="hljs-string">});</span>

<span class="hljs-string">Object.defineProperty(obj,</span> <span class="hljs-string">'a'</span><span class="hljs-string">,</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    configurable:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">    enumerable:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    writable:</span> <span class="hljs-literal">false</span> <span class="hljs-string">,</span>
<span class="hljs-attr">    value:</span> <span class="hljs-number">2</span>
<span class="hljs-string">});</span>
<span class="hljs-string">var</span> <span class="hljs-string">d</span> <span class="hljs-string">=</span> <span class="hljs-string">Object.getOwnPropertyDescriptor(obj,</span> <span class="hljs-string">'a'</span><span class="hljs-string">)</span>

<span class="hljs-string">console.log(d);</span> <span class="hljs-string">//</span> <span class="hljs-string">结果如下</span>
<span class="hljs-string">//</span> <span class="hljs-string">{</span>
<span class="hljs-string">//</span>     <span class="hljs-attr">value:</span> <span class="hljs-number">2</span><span class="hljs-string">,</span> 
<span class="hljs-string">//</span>     <span class="hljs-attr">writable:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span> 
<span class="hljs-string">//</span>     <span class="hljs-attr">enumerable:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span> 
<span class="hljs-string">//</span>     <span class="hljs-attr">configurable:</span> <span class="hljs-literal">false</span>
<span class="hljs-string">//</span> <span class="hljs-string">}</span>


<span class="hljs-string">但是如果直接复制修改</span>
<span class="hljs-string">var</span> <span class="hljs-string">obj</span> <span class="hljs-string">=</span> <span class="hljs-string">{}</span>

<span class="hljs-string">Object.defineProperty(obj,</span> <span class="hljs-string">'a'</span><span class="hljs-string">,</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    configurable:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    enumerable:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">    writable:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">    value:</span> <span class="hljs-number">1</span>
<span class="hljs-string">});</span>
<span class="hljs-string">obj.a=2;</span>
<span class="hljs-string">var</span> <span class="hljs-string">d</span> <span class="hljs-string">=</span> <span class="hljs-string">Object.getOwnPropertyDescriptor(obj,</span> <span class="hljs-string">'a'</span><span class="hljs-string">)</span>

<span class="hljs-string">console.log(d);</span> <span class="hljs-string">//</span> <span class="hljs-string">结果如下</span>

<span class="hljs-string">//</span> <span class="hljs-string">{</span>
<span class="hljs-string">//</span>     <span class="hljs-attr">value:</span> <span class="hljs-number">1</span><span class="hljs-string">,</span>  <span class="hljs-string">//</span> <span class="hljs-string">没有做出修改</span>
<span class="hljs-string">//</span>     <span class="hljs-attr">writable:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span> 
<span class="hljs-string">//</span>     <span class="hljs-attr">enumerable:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span> 
<span class="hljs-string">//</span>     <span class="hljs-attr">configurable:</span> <span class="hljs-literal">false</span>
<span class="hljs-string">//</span> <span class="hljs-string">}</span></code></pre>
<h2 id="articleHeader20">Enumerable</h2>
<p>直接上例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {};
Object.defineProperties(obj, {
    a: {
        value: 1,
        enumerable: false
    }, 
    b: {
        value: 2,
        enumerable: true
    },
    c: {
        value: 3,
        enumerable: false
    }
})

obj.d = 4;

//等同于

//Object.defineProperty(obj, 'd', {
//    configurable: true,
//    enumerable: true,
//    writable: true,
//    value: 4
//})

for(var key in obj) {
    console.log(key);  
    // 打印一次b, 一次d, a和c属性enumerable为false，不可被枚举
} 

var arr = Object.keys(obj);
console.log(arr);  // ['b', 'd']
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">var</span> <span class="hljs-string">obj</span> <span class="hljs-string">=</span> <span class="hljs-string">{};</span>
<span class="hljs-string">Object.defineProperties(obj,</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    a:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        value:</span> <span class="hljs-number">1</span><span class="hljs-string">,</span>
<span class="hljs-attr">        enumerable:</span> <span class="hljs-literal">false</span>
    <span class="hljs-string">},</span> 
<span class="hljs-attr">    b:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        value:</span> <span class="hljs-number">2</span><span class="hljs-string">,</span>
<span class="hljs-attr">        enumerable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-string">},</span>
<span class="hljs-attr">    c:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        value:</span> <span class="hljs-number">3</span><span class="hljs-string">,</span>
<span class="hljs-attr">        enumerable:</span> <span class="hljs-literal">false</span>
    <span class="hljs-string">}</span>
<span class="hljs-string">})</span>

<span class="hljs-string">obj.d</span> <span class="hljs-string">=</span> <span class="hljs-number">4</span><span class="hljs-string">;</span>

<span class="hljs-string">//等同于</span>

<span class="hljs-string">//Object.defineProperty(obj,</span> <span class="hljs-string">'d'</span><span class="hljs-string">,</span> <span class="hljs-string">{</span>
<span class="hljs-string">//</span>    <span class="hljs-attr">configurable:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-string">//</span>    <span class="hljs-attr">enumerable:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-string">//</span>    <span class="hljs-attr">writable:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-string">//</span>    <span class="hljs-attr">value:</span> <span class="hljs-number">4</span>
<span class="hljs-string">//})</span>

<span class="hljs-string">for(var</span> <span class="hljs-string">key</span> <span class="hljs-string">in</span> <span class="hljs-string">obj)</span> <span class="hljs-string">{</span>
    <span class="hljs-string">console.log(key);</span>  
    <span class="hljs-string">//</span> <span class="hljs-string">打印一次b,</span> <span class="hljs-string">一次d,</span> <span class="hljs-string">a和c属性enumerable为false，不可被枚举</span>
<span class="hljs-string">}</span> 

<span class="hljs-string">var</span> <span class="hljs-string">arr</span> <span class="hljs-string">=</span> <span class="hljs-string">Object.keys(obj);</span>
<span class="hljs-string">console.log(arr);</span>  <span class="hljs-string">//</span> <span class="hljs-string">['b',</span> <span class="hljs-string">'d'</span><span class="hljs-string">]</span>
</code></pre>
<h2 id="articleHeader21">get和set</h2>
<h3 id="articleHeader22">简易的数据双向绑定</h3>
<p>在线demo地址: <a href="http://www.sunzhaoye.com/demo/index.html" rel="nofollow noreferrer" target="_blank">http://www.sunzhaoye.com/demo...</a></p>
<p>html代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
    <p>
        input1=><input type=&quot;text&quot; id=&quot;input1&quot;>
    </p>
    <p>
        input2=>
        <input type=&quot;text&quot; id=&quot;input2&quot;>
    </p>
    <div>
        我每次比input1的值加1=>
        <span id=&quot;span&quot;></span>
    </div>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
        input1=&gt;<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"input1"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
        input2=&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"input2"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        我每次比input1的值加1=&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"span"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>js代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var oInput1 = document.getElementById('input1');
var oInput2 = document.getElementById('input2');
var oSpan = document.getElementById('span');
var obj = {};
Object.defineProperties(obj, {
    val1: {
        configurable: true,
        get: function() {
            oInput1.value = 0;
            oInput2.value = 0;
            oSpan.innerHTML = 0;
            return 0
        },
        set: function(newValue) {
            oInput2.value = newValue;
            oSpan.innerHTML = Number(newValue) ? Number(newValue) : 0
        }
    },
    val2: {
        configurable: true,
        get: function() {
            oInput1.value = 0;
            oInput2.value = 0;
            oSpan.innerHTML = 0;
            return 0
        },
        set: function(newValue) {
            oInput1.value = newValue;
            oSpan.innerHTML = Number(newValue)+1;
        }
    }
})
oInput1.value = obj.val1;
oInput1.addEventListener('keyup', function() {
    obj.val1 = oInput1.value;
}, false)
oInput2.addEventListener('keyup', function() {
    obj.val2 = oInput2.value;
}, false)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> oInput1 = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'input1'</span>);
<span class="hljs-keyword">var</span> oInput2 = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'input2'</span>);
<span class="hljs-keyword">var</span> oSpan = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'span'</span>);
<span class="hljs-keyword">var</span> obj = {};
<span class="hljs-built_in">Object</span>.defineProperties(obj, {
    <span class="hljs-attr">val1</span>: {
        <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            oInput1.value = <span class="hljs-number">0</span>;
            oInput2.value = <span class="hljs-number">0</span>;
            oSpan.innerHTML = <span class="hljs-number">0</span>;
            <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>
        },
        <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">newValue</span>) </span>{
            oInput2.value = newValue;
            oSpan.innerHTML = <span class="hljs-built_in">Number</span>(newValue) ? <span class="hljs-built_in">Number</span>(newValue) : <span class="hljs-number">0</span>
        }
    },
    <span class="hljs-attr">val2</span>: {
        <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            oInput1.value = <span class="hljs-number">0</span>;
            oInput2.value = <span class="hljs-number">0</span>;
            oSpan.innerHTML = <span class="hljs-number">0</span>;
            <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>
        },
        <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">newValue</span>) </span>{
            oInput1.value = newValue;
            oSpan.innerHTML = <span class="hljs-built_in">Number</span>(newValue)+<span class="hljs-number">1</span>;
        }
    }
})
oInput1.value = obj.val1;
oInput1.addEventListener(<span class="hljs-string">'keyup'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    obj.val1 = oInput1.value;
}, <span class="hljs-literal">false</span>)
oInput2.addEventListener(<span class="hljs-string">'keyup'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    obj.val2 = oInput2.value;
}, <span class="hljs-literal">false</span>)</code></pre>
<h1 id="articleHeader23">总结</h1>
<p>终于到了最后了,就不具体梳理总结了。虽然我们在开过过程中不怎么使用几种方法，但理解之后对于我们理解js中对象有很大帮助,对后续进步也很有帮助,比如vue的实现原理等。个人能力有限,还希望大家发现问题后能多多指点,共同进步。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javaScript中的Object.defineProperty()和defineProperties()

## 原文链接
[https://segmentfault.com/a/1190000011294519](https://segmentfault.com/a/1190000011294519)

