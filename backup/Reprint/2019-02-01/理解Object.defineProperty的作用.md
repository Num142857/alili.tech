---
title: '理解Object.defineProperty的作用' 
date: 2019-02-01 2:30:10
hidden: true
slug: htxk4let4a6
categories: [reprint]
---

{{< raw >}}

                    
<p>对象是由多个名/值对组成的无序的集合。对象中每个属性对应任意类型的值。<br>定义对象可以使用构造函数或字面量的形式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = new Object;  //obj = {}
obj.name = &quot;张三&quot;;  //添加描述
obj.say = function(){};  //添加行为" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> obj = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>;  <span class="hljs-comment">//obj = {}</span>
obj.name = <span class="hljs-string">"张三"</span>;  <span class="hljs-comment">//添加描述</span>
obj.say = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{};  <span class="hljs-comment">//添加行为</span></code></pre>
<p>除了以上添加属性的方式，还可以使用<strong>Object.defineProperty</strong>定义新属性或修改原有的属性。</p>
<h2 id="articleHeader0">Object.defineProperty()</h2>
<p>语法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.defineProperty(obj, prop, descriptor)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">Object.defineProperty(obj, <span class="hljs-keyword">prop</span>, descriptor)</code></pre>
<p>参数说明：</p>
<blockquote><p>obj：必需。目标对象 <br>  prop：必需。需定义或修改的属性的名字<br>  descriptor：必需。目标属性所拥有的特性</p></blockquote>
<p>返回值：</p>
<blockquote><p>传入函数的对象。即第一个参数obj</p></blockquote>
<p>针对属性，我们可以给这个属性设置一些特性，比如是否只读不可以写；是否可以被<em>for..in</em>或<em>Object.keys()</em>遍历。</p>
<p>给对象的属性添加特性描述，目前提供两种形式：数据描述和存取器描述。</p>
<h3 id="articleHeader1"><strong>数据描述</strong></h3>
<p>当修改或定义对象的某个属性的时候，给这个属性添加一些特性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    test:&quot;hello&quot;
}
//对象已有的属性添加特性描述
Object.defineProperty(obj,&quot;test&quot;,{
    configurable:true | false,
    enumerable:true | false,
    value:任意类型的值,
    writable:true | false
});
//对象新添加的属性的特性描述
Object.defineProperty(obj,&quot;newKey&quot;,{
    configurable:true | false,
    enumerable:true | false,
    value:任意类型的值,
    writable:true | false
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">test</span>:<span class="hljs-string">"hello"</span>
}
<span class="hljs-comment">//对象已有的属性添加特性描述</span>
<span class="hljs-built_in">Object</span>.defineProperty(obj,<span class="hljs-string">"test"</span>,{
    <span class="hljs-attr">configurable</span>:<span class="hljs-literal">true</span> | <span class="hljs-literal">false</span>,
    <span class="hljs-attr">enumerable</span>:<span class="hljs-literal">true</span> | <span class="hljs-literal">false</span>,
    <span class="hljs-attr">value</span>:任意类型的值,
    <span class="hljs-attr">writable</span>:<span class="hljs-literal">true</span> | <span class="hljs-literal">false</span>
});
<span class="hljs-comment">//对象新添加的属性的特性描述</span>
<span class="hljs-built_in">Object</span>.defineProperty(obj,<span class="hljs-string">"newKey"</span>,{
    <span class="hljs-attr">configurable</span>:<span class="hljs-literal">true</span> | <span class="hljs-literal">false</span>,
    <span class="hljs-attr">enumerable</span>:<span class="hljs-literal">true</span> | <span class="hljs-literal">false</span>,
    <span class="hljs-attr">value</span>:任意类型的值,
    <span class="hljs-attr">writable</span>:<span class="hljs-literal">true</span> | <span class="hljs-literal">false</span>
});</code></pre>
<p>数据描述中的属性都是可选的，来看一下设置每一个属性的作用。</p>
<h4><strong>value</strong></h4>
<p>属性对应的值,可以使任意类型的值，默认为undefined</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {}
//第一种情况：不设置value属性
Object.defineProperty(obj,&quot;newKey&quot;,{

});
console.log( obj.newKey );  //undefined
------------------------------
//第二种情况：设置value属性
Object.defineProperty(obj,&quot;newKey&quot;,{
    value:&quot;hello&quot;
});
console.log( obj.newKey );  //hello" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="javacript"><span class="hljs-keyword">var</span> obj = {}
<span class="hljs-comment">//第一种情况：不设置value属性</span>
<span class="hljs-built_in">Object</span>.defineProperty(obj,<span class="hljs-string">"newKey"</span>,{

});
<span class="hljs-built_in">console</span>.log( obj.newKey );  <span class="hljs-comment">//undefined</span>
------------------------------
<span class="hljs-comment">//第二种情况：设置value属性</span>
<span class="hljs-built_in">Object</span>.defineProperty(obj,<span class="hljs-string">"newKey"</span>,{
    <span class="hljs-attr">value</span>:<span class="hljs-string">"hello"</span>
});
<span class="hljs-built_in">console</span>.log( obj.newKey );  <span class="hljs-comment">//hello</span></code></pre>
<h4><strong>writable</strong></h4>
<p>属性的值是否可以被重写。设置为true可以被重写；设置为false，不能被重写。默认为false。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {}
//第一种情况：writable设置为false，不能重写。
Object.defineProperty(obj,&quot;newKey&quot;,{
    value:&quot;hello&quot;,
    writable:false
});
//更改newKey的值
obj.newKey = &quot;change value&quot;;
console.log( obj.newKey );  //hello

//第二种情况：writable设置为true，可以重写
Object.defineProperty(obj,&quot;newKey&quot;,{
    value:&quot;hello&quot;,
    writable:true
});
//更改newKey的值
obj.newKey = &quot;change value&quot;;
console.log( obj.newKey );  //change value" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> obj = {}
<span class="hljs-comment">//第一种情况：writable设置为false，不能重写。</span>
<span class="hljs-built_in">Object</span>.defineProperty(obj,<span class="hljs-string">"newKey"</span>,{
    <span class="hljs-attr">value</span>:<span class="hljs-string">"hello"</span>,
    <span class="hljs-attr">writable</span>:<span class="hljs-literal">false</span>
});
<span class="hljs-comment">//更改newKey的值</span>
obj.newKey = <span class="hljs-string">"change value"</span>;
<span class="hljs-built_in">console</span>.log( obj.newKey );  <span class="hljs-comment">//hello</span>

<span class="hljs-comment">//第二种情况：writable设置为true，可以重写</span>
<span class="hljs-built_in">Object</span>.defineProperty(obj,<span class="hljs-string">"newKey"</span>,{
    <span class="hljs-attr">value</span>:<span class="hljs-string">"hello"</span>,
    <span class="hljs-attr">writable</span>:<span class="hljs-literal">true</span>
});
<span class="hljs-comment">//更改newKey的值</span>
obj.newKey = <span class="hljs-string">"change value"</span>;
<span class="hljs-built_in">console</span>.log( obj.newKey );  <span class="hljs-comment">//change value</span></code></pre>
<h4><strong>enumerable</strong></h4>
<p>此属性是否可以被枚举（使用for...in或Object.keys()）。设置为true可以被枚举；设置为false，不能被枚举。默认为false。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {}
//第一种情况：enumerable设置为false，不能被枚举。
Object.defineProperty(obj,&quot;newKey&quot;,{
    value:&quot;hello&quot;,
    writable:false,
    enumerable:false
});

//枚举对象的属性
for( var attr in obj ){
    console.log( attr );  
}
//第二种情况：enumerable设置为true，可以被枚举。
Object.defineProperty(obj,&quot;newKey&quot;,{
    value:&quot;hello&quot;,
    writable:false,
    enumerable:true
});

//枚举对象的属性
for( var attr in obj ){
    console.log( attr );  //newKey
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> obj = {}
<span class="hljs-comment">//第一种情况：enumerable设置为false，不能被枚举。</span>
<span class="hljs-built_in">Object</span>.defineProperty(obj,<span class="hljs-string">"newKey"</span>,{
    <span class="hljs-attr">value</span>:<span class="hljs-string">"hello"</span>,
    <span class="hljs-attr">writable</span>:<span class="hljs-literal">false</span>,
    <span class="hljs-attr">enumerable</span>:<span class="hljs-literal">false</span>
});

<span class="hljs-comment">//枚举对象的属性</span>
<span class="hljs-keyword">for</span>( <span class="hljs-keyword">var</span> attr <span class="hljs-keyword">in</span> obj ){
    <span class="hljs-built_in">console</span>.log( attr );  
}
<span class="hljs-comment">//第二种情况：enumerable设置为true，可以被枚举。</span>
<span class="hljs-built_in">Object</span>.defineProperty(obj,<span class="hljs-string">"newKey"</span>,{
    <span class="hljs-attr">value</span>:<span class="hljs-string">"hello"</span>,
    <span class="hljs-attr">writable</span>:<span class="hljs-literal">false</span>,
    <span class="hljs-attr">enumerable</span>:<span class="hljs-literal">true</span>
});

<span class="hljs-comment">//枚举对象的属性</span>
<span class="hljs-keyword">for</span>( <span class="hljs-keyword">var</span> attr <span class="hljs-keyword">in</span> obj ){
    <span class="hljs-built_in">console</span>.log( attr );  <span class="hljs-comment">//newKey</span>
}</code></pre>
<h4><strong>configurable</strong></h4>
<p>是否可以删除目标属性或是否可以再次修改属性的特性（writable, configurable, enumerable）。设置为true可以被删除或可以重新设置特性；设置为false，不能被可以被删除或不可以重新设置特性。默认为false。</p>
<p>这个属性起到两个作用：</p>
<ol>
<li><p>目标属性是否可以使用delete删除</p></li>
<li><p>目标属性是否可以再次设置特性</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//-----------------测试目标属性是否能被删除------------------------
var obj = {}
//第一种情况：configurable设置为false，不能被删除。
Object.defineProperty(obj,&quot;newKey&quot;,{
    value:&quot;hello&quot;,
    writable:false,
    enumerable:false,
    configurable:false
});
//删除属性
delete obj.newKey;
console.log( obj.newKey ); //hello

//第二种情况：configurable设置为true，可以被删除。
Object.defineProperty(obj,&quot;newKey&quot;,{
    value:&quot;hello&quot;,
    writable:false,
    enumerable:false,
    configurable:true
});
//删除属性
delete obj.newKey;
console.log( obj.newKey ); //undefined

//-----------------测试是否可以再次修改特性------------------------
var obj = {}
//第一种情况：configurable设置为false，不能再次修改特性。
Object.defineProperty(obj,&quot;newKey&quot;,{
    value:&quot;hello&quot;,
    writable:false,
    enumerable:false,
    configurable:false
});

//重新修改特性
Object.defineProperty(obj,&quot;newKey&quot;,{
    value:&quot;hello&quot;,
    writable:true,
    enumerable:true,
    configurable:true
});
console.log( obj.newKey ); //报错：Uncaught TypeError: Cannot redefine property: newKey

//第二种情况：configurable设置为true，可以再次修改特性。
Object.defineProperty(obj,&quot;newKey&quot;,{
    value:&quot;hello&quot;,
    writable:false,
    enumerable:false,
    configurable:true
});

//重新修改特性
Object.defineProperty(obj,&quot;newKey&quot;,{
    value:&quot;hello&quot;,
    writable:true,
    enumerable:true,
    configurable:true
});
console.log( obj.newKey ); //hello" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//-----------------测试目标属性是否能被删除------------------------</span>
<span class="hljs-keyword">var</span> obj = {}
<span class="hljs-comment">//第一种情况：configurable设置为false，不能被删除。</span>
<span class="hljs-built_in">Object</span>.defineProperty(obj,<span class="hljs-string">"newKey"</span>,{
    <span class="hljs-attr">value</span>:<span class="hljs-string">"hello"</span>,
    <span class="hljs-attr">writable</span>:<span class="hljs-literal">false</span>,
    <span class="hljs-attr">enumerable</span>:<span class="hljs-literal">false</span>,
    <span class="hljs-attr">configurable</span>:<span class="hljs-literal">false</span>
});
<span class="hljs-comment">//删除属性</span>
<span class="hljs-keyword">delete</span> obj.newKey;
<span class="hljs-built_in">console</span>.log( obj.newKey ); <span class="hljs-comment">//hello</span>

<span class="hljs-comment">//第二种情况：configurable设置为true，可以被删除。</span>
<span class="hljs-built_in">Object</span>.defineProperty(obj,<span class="hljs-string">"newKey"</span>,{
    <span class="hljs-attr">value</span>:<span class="hljs-string">"hello"</span>,
    <span class="hljs-attr">writable</span>:<span class="hljs-literal">false</span>,
    <span class="hljs-attr">enumerable</span>:<span class="hljs-literal">false</span>,
    <span class="hljs-attr">configurable</span>:<span class="hljs-literal">true</span>
});
<span class="hljs-comment">//删除属性</span>
<span class="hljs-keyword">delete</span> obj.newKey;
<span class="hljs-built_in">console</span>.log( obj.newKey ); <span class="hljs-comment">//undefined</span>

<span class="hljs-comment">//-----------------测试是否可以再次修改特性------------------------</span>
<span class="hljs-keyword">var</span> obj = {}
<span class="hljs-comment">//第一种情况：configurable设置为false，不能再次修改特性。</span>
<span class="hljs-built_in">Object</span>.defineProperty(obj,<span class="hljs-string">"newKey"</span>,{
    <span class="hljs-attr">value</span>:<span class="hljs-string">"hello"</span>,
    <span class="hljs-attr">writable</span>:<span class="hljs-literal">false</span>,
    <span class="hljs-attr">enumerable</span>:<span class="hljs-literal">false</span>,
    <span class="hljs-attr">configurable</span>:<span class="hljs-literal">false</span>
});

<span class="hljs-comment">//重新修改特性</span>
<span class="hljs-built_in">Object</span>.defineProperty(obj,<span class="hljs-string">"newKey"</span>,{
    <span class="hljs-attr">value</span>:<span class="hljs-string">"hello"</span>,
    <span class="hljs-attr">writable</span>:<span class="hljs-literal">true</span>,
    <span class="hljs-attr">enumerable</span>:<span class="hljs-literal">true</span>,
    <span class="hljs-attr">configurable</span>:<span class="hljs-literal">true</span>
});
<span class="hljs-built_in">console</span>.log( obj.newKey ); <span class="hljs-comment">//报错：Uncaught TypeError: Cannot redefine property: newKey</span>

<span class="hljs-comment">//第二种情况：configurable设置为true，可以再次修改特性。</span>
<span class="hljs-built_in">Object</span>.defineProperty(obj,<span class="hljs-string">"newKey"</span>,{
    <span class="hljs-attr">value</span>:<span class="hljs-string">"hello"</span>,
    <span class="hljs-attr">writable</span>:<span class="hljs-literal">false</span>,
    <span class="hljs-attr">enumerable</span>:<span class="hljs-literal">false</span>,
    <span class="hljs-attr">configurable</span>:<span class="hljs-literal">true</span>
});

<span class="hljs-comment">//重新修改特性</span>
<span class="hljs-built_in">Object</span>.defineProperty(obj,<span class="hljs-string">"newKey"</span>,{
    <span class="hljs-attr">value</span>:<span class="hljs-string">"hello"</span>,
    <span class="hljs-attr">writable</span>:<span class="hljs-literal">true</span>,
    <span class="hljs-attr">enumerable</span>:<span class="hljs-literal">true</span>,
    <span class="hljs-attr">configurable</span>:<span class="hljs-literal">true</span>
});
<span class="hljs-built_in">console</span>.log( obj.newKey ); <span class="hljs-comment">//hello</span></code></pre>
<p>除了可以给新定义的属性设置特性，也可以给已有的属性设置特性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//定义对象的时候添加的属性，是可删除、可重写、可枚举的。
var obj = {
    test:&quot;hello&quot;
}

//改写值
obj.test = 'change value';

console.log( obj.test ); //'change value'

Object.defineProperty(obj,&quot;test&quot;,{
    writable:false
})


//再次改写值
obj.test = 'change value again';

console.log( obj.test ); //依然是：'change value'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-comment">//定义对象的时候添加的属性，是可删除、可重写、可枚举的。</span>
<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-keyword">test</span>:<span class="hljs-string">"hello"</span>
}

<span class="hljs-comment">//改写值</span>
obj.<span class="hljs-keyword">test</span> = 'change value';

console.<span class="hljs-built_in">log</span>( obj.<span class="hljs-keyword">test</span> ); <span class="hljs-comment">//'change value'</span>

Object.defineProperty(obj,<span class="hljs-string">"test"</span>,{
    writable:false
})


<span class="hljs-comment">//再次改写值</span>
obj.<span class="hljs-keyword">test</span> = 'change value again';

console.<span class="hljs-built_in">log</span>( obj.<span class="hljs-keyword">test</span> ); <span class="hljs-comment">//依然是：'change value'</span></code></pre>
<p>提示：一旦使用Object.defineProperty给对象添加属性，那么如果不设置属性的特性，那么configurable、enumerable、writable这些值都为默认的false</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {};
//定义的新属性后，这个属性的特性中configurable，enumerable，writable都为默认的值false
//这就导致了neykey这个是不能重写、不能枚举、不能再次设置特性
//
Object.defineProperty(obj,'newKey',{

});

//设置值
obj.newKey = 'hello';
console.log(obj.newKey);  //undefined

//枚举
for( var attr in obj ){
    console.log(attr);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> obj = {};
<span class="hljs-comment">//定义的新属性后，这个属性的特性中configurable，enumerable，writable都为默认的值false</span>
<span class="hljs-comment">//这就导致了neykey这个是不能重写、不能枚举、不能再次设置特性</span>
<span class="hljs-comment">//</span>
<span class="hljs-built_in">Object</span>.defineProperty(obj,<span class="hljs-string">'newKey'</span>,{

});

<span class="hljs-comment">//设置值</span>
obj.newKey = <span class="hljs-string">'hello'</span>;
<span class="hljs-built_in">console</span>.log(obj.newKey);  <span class="hljs-comment">//undefined</span>

<span class="hljs-comment">//枚举</span>
<span class="hljs-keyword">for</span>( <span class="hljs-keyword">var</span> attr <span class="hljs-keyword">in</span> obj ){
    <span class="hljs-built_in">console</span>.log(attr);
}</code></pre>
<p>设置的特性总结：</p>
<blockquote><p>value:  设置属性的值<br>  writable:   值是否可以重写。true | false<br>  enumerable: 目标属性是否可以被枚举。true | false<br>  configurable:   目标属性是否可以被删除或是否可以再次修改特性 true | false</p></blockquote>
<h3 id="articleHeader2"><strong>存取器描述</strong></h3>
<p>当使用存取器描述属性的特性的时候，允许设置以下特性属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {};
Object.defineProperty(obj,&quot;newKey&quot;,{
    get:function (){} | undefined,
    set:function (value){} | undefined
    configurable: true | false
    enumerable: true | false
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> obj = {};
<span class="hljs-built_in">Object</span>.defineProperty(obj,<span class="hljs-string">"newKey"</span>,{
    <span class="hljs-attr">get</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{} | <span class="hljs-literal">undefined</span>,
    <span class="hljs-attr">set</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>)</span>{} | <span class="hljs-literal">undefined</span>
    configurable: <span class="hljs-literal">true</span> | <span class="hljs-literal">false</span>
    enumerable: <span class="hljs-literal">true</span> | <span class="hljs-literal">false</span>
});</code></pre>
<p><strong>注意：当使用了getter或setter方法，不允许使用writable和value这两个属性</strong></p>
<h4><strong>getter/setter</strong></h4>
<p>当设置或获取对象的某个属性的值的时候，可以提供getter/setter方法。</p>
<ul>
<li><p>getter 是一种获得属性值的方法</p></li>
<li><p>setter是一种设置属性值的方法。</p></li>
</ul>
<p>在特性中使用get/set属性来定义对应的方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {};
var initValue = 'hello';
Object.defineProperty(obj,&quot;newKey&quot;,{
    get:function (){
        //当获取值的时候触发的函数
        return initValue;    
    },
    set:function (value){
        //当设置值的时候触发的函数,设置的新值通过参数value拿到
        initValue = value;
    }
});
//获取值
console.log( obj.newKey );  //hello

//设置值
obj.newKey = 'change value';

console.log( obj.newKey ); //change value" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="javacript"><span class="hljs-keyword">var</span> obj = {};
<span class="hljs-keyword">var</span> initValue = <span class="hljs-string">'hello'</span>;
<span class="hljs-built_in">Object</span>.defineProperty(obj,<span class="hljs-string">"newKey"</span>,{
    <span class="hljs-attr">get</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
        <span class="hljs-comment">//当获取值的时候触发的函数</span>
        <span class="hljs-keyword">return</span> initValue;    
    },
    <span class="hljs-attr">set</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>)</span>{
        <span class="hljs-comment">//当设置值的时候触发的函数,设置的新值通过参数value拿到</span>
        initValue = value;
    }
});
<span class="hljs-comment">//获取值</span>
<span class="hljs-built_in">console</span>.log( obj.newKey );  <span class="hljs-comment">//hello</span>

<span class="hljs-comment">//设置值</span>
obj.newKey = <span class="hljs-string">'change value'</span>;

<span class="hljs-built_in">console</span>.log( obj.newKey ); <span class="hljs-comment">//change value</span></code></pre>
<p><strong>注意：get或set不是必须成对出现，任写其一就可以。如果不设置方法，则get和set的默认值为undefined</strong></p>
<p><strong>configurable和enumerable同上面的用法。</strong></p>
<hr>
<h3 id="articleHeader3">兼容性</h3>
<p>在ie8下只能在DOM对象上使用，尝试在原生的对象使用 Object.defineProperty()会报错。</p>
<hr>
<p>参考：<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
理解Object.defineProperty的作用

## 原文链接
[https://segmentfault.com/a/1190000007434923](https://segmentfault.com/a/1190000007434923)

