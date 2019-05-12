---
title: 'Vue双向绑定的实现原理系列（一）：Object.defineproperty' 
date: 2018-12-15 2:30:11
hidden: true
slug: ndbzgvd48fe
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">了解Object.defineProperty()</h2>
<p><a href="https://github.com/fypShirley/vue_Source_analysis/tree/master/0_defineProperty" rel="nofollow noreferrer" target="_blank"> github源码 </a><br></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.defineProperty()方法直接在一个对象上定义一个新属性，或者修改一个已经存在的属性， 并返回这个对象。

vueJS采用 ES5 提供的 Object.defineProperty() 方法，监控对数据的操作，从而可以自动触发数据同步。并且，由于是在不同的数据上触发同步，可以精确的将变更发送给绑定的视图，而不是对所有的数据都执行一次检测。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">Object</span><span class="hljs-selector-class">.defineProperty</span>()方法直接在一个对象上定义一个新属性，或者修改一个已经存在的属性， 并返回这个对象。

<span class="hljs-selector-tag">vueJS</span>采用 <span class="hljs-selector-tag">ES5</span> 提供的 <span class="hljs-selector-tag">Object</span><span class="hljs-selector-class">.defineProperty</span>() 方法，监控对数据的操作，从而可以自动触发数据同步。并且，由于是在不同的数据上触发同步，可以精确的将变更发送给绑定的视图，而不是对所有的数据都执行一次检测。
</code></pre>
<p>首先我们得先知道,ECMAScript中有两种属性:数据属性和访问器属性（ ie8以下只能在dom对象上使用；不能使用在普通对象上）</p>
<h5>数据属性：</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  [[Configurable]]: 表示能否修改属性。默认值为true

  [[Enumerable]]: 表示属性是否可枚举,也就是是否可以通过for-in循环返回属性。默认值为true

  [[Writable]]: 表示能否修改属性的值。默认值为true

  [[value]]: 包含这个属性的值.读取属性的时候就是通过这里开始读。默认值为undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code>  <span class="hljs-string">[[Configurable]]</span>: 表示能否修改属性。默认值为<span class="hljs-literal">true</span>

  <span class="hljs-string">[[Enumerable]]</span>: 表示属性是否可枚举,也就是是否可以通过<span class="hljs-keyword">for</span>-<span class="hljs-keyword">in</span>循环返回属性。默认值为<span class="hljs-literal">true</span>

  <span class="hljs-string">[[Writable]]</span>: 表示能否修改属性的值。默认值为<span class="hljs-literal">true</span>

  <span class="hljs-string">[[value]]</span>: 包含这个属性的值.读取属性的时候就是通过这里开始读。默认值为undefined</code></pre>
<h5>访问器属性：</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   [[Configurable]]: 表示能否修改属性。默认值为true

   [[Enumerable]]: 表示属性是否可枚举,也就是是否可以通过for-in循环返回属性。默认值为true

   [[Get]]: 在读取属性时调用的函数，默认时undefined

   [[Set]]: 在设置属性时调用的函数，默认时undefined

    我们要是想修改默认属性的值就可以使用：Object.defineProperty(obj,prop,descriptor);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code>   <span class="hljs-string">[[Configurable]]</span>: 表示能否修改属性。默认值为<span class="hljs-literal">true</span>

   <span class="hljs-string">[[Enumerable]]</span>: 表示属性是否可枚举,也就是是否可以通过<span class="hljs-keyword">for</span>-<span class="hljs-keyword">in</span>循环返回属性。默认值为<span class="hljs-literal">true</span>

   <span class="hljs-string">[[Get]]</span>: 在读取属性时调用的函数，默认时undefined

   <span class="hljs-string">[[Set]]</span>: 在设置属性时调用的函数，默认时undefined

    我们要是想修改默认属性的值就可以使用：Object.defineProperty(obj,prop,descriptor);</code></pre>
<h3 id="articleHeader1">1.基本用法：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a= {}
Object.defineProperty(a,&quot;b&quot;,{
    value:123
});
console.log(a.b);//123
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a= {}
<span class="hljs-built_in">Object</span>.defineProperty(a,<span class="hljs-string">"b"</span>,{
    <span class="hljs-attr">value</span>:<span class="hljs-number">123</span>
});
<span class="hljs-built_in">console</span>.log(a.b);<span class="hljs-comment">//123</span>
</code></pre>
<h3 id="articleHeader2">2.参数介绍：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 第一个参数obj：目标对象a

 第二个参数prop：需要定义的属性或方法的名字&quot;b&quot;

 第二个参数descriptor：目标属性所拥有的特性" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code> 第一个参数obj：目标对象<span class="hljs-selector-tag">a</span>

 第二个参数prop：需要定义的属性或方法的名字<span class="hljs-string">"b"</span>

 第二个参数descriptor：目标属性所拥有的特性</code></pre>
<h4>2.1 第三个参数的取值介绍（descriptor）</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    value：属性的值

    writable：如果为false，属性的值就不能被重写,只能为只读了

    configurable：总开关，一旦为false，就不能再设置他的（value，writable，configurable）

    enumerable：是否能在for...in循环中遍历出来或在Object.keys中列举出来。

    get：后面介绍

    set：后面介绍

    注意：在 descriptor 中不能同时设置访问器（get 和 set）和 wriable 或 value，否则会错，就是说用 get 和 set，就不能用 writable 或 value 中的任何一个

在基本用法里只设置了value,没有设置别的，可以简单的理解为（暂时这样理解）它会默认帮我们把writable，configurable，enumerable。都设上值，而且值还都是false。（仅限于第一次设置的时候）,等同于以下代码：

    var a = {}; 
    Object.defineProperty(a, 'b', {
         value: 123, 
         writable: false, 
         enumerable: false, 
         configurable: false 
    }); 
    console.log(a.b); //123" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">    value：属性的值

    writable：如果为<span class="hljs-literal">false</span>，属性的值就不能被重写,只能为只读了

    configurable：总开关，一旦为<span class="hljs-literal">false</span>，就不能再设置他的（value，writable，configurable）

    enumerable：是否能在for...in循环中遍历出来或在Object.keys中列举出来。

    get：后面介绍

    <span class="hljs-built_in">set</span>：后面介绍

    注意：在 descriptor 中不能同时设置访问器（get 和 <span class="hljs-built_in">set</span>）和 wriable 或 value，否则会错，就是说用 get 和 <span class="hljs-built_in">set</span>，就不能用 writable 或 value 中的任何一个

在基本用法里只设置了value,没有设置别的，可以简单的理解为（暂时这样理解）它会默认帮我们把writable，configurable，enumerable。都设上值，而且值还都是<span class="hljs-literal">false</span>。（仅限于第一次设置的时候）,等同于以下代码：

    var a = {}; 
    Object.defineProperty(a, <span class="hljs-string">'b'</span>, {
         value: 123, 
         writable: <span class="hljs-literal">false</span>, 
         enumerable: <span class="hljs-literal">false</span>, 
         configurable: <span class="hljs-literal">false</span> 
    }); 
    console.log(a.b); //123</code></pre>
<h4>2.1.1 configurable介绍</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="总开关，第一次设置 false 之后，，第二次什么设置也不行了：
也就是说,你可以使用Object.defineProperty()方法无限修改同一个属性,但是当把configurable改为false之后就有限制了

var a = {};
Object.defineProperty(a, 'b', { 
    configurable: false
}); 
Object.defineProperty(a, 'b',{ 
    configurable: true 
});
//报错：Uncaught TypeError: Cannot redefine property: b(…) 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code>总开关，第一次设置 <span class="hljs-keyword">false</span> 之后，，第二次什么设置也不行了：
也就是说,你可以使用<span class="hljs-built_in">Object</span>.defineProperty()方法无限修改同一个属性,但是当把configurable改为<span class="hljs-keyword">false</span>之后就有限制了

<span class="hljs-keyword">var</span> a = {};
<span class="hljs-built_in">Object</span>.defineProperty(a, <span class="hljs-string">'b'</span>, { 
    configurable: <span class="hljs-keyword">false</span>
}); 
<span class="hljs-built_in">Object</span>.defineProperty(a, <span class="hljs-string">'b'</span>,{ 
    configurable: <span class="hljs-keyword">true</span> 
});
<span class="hljs-comment">//报错：Uncaught TypeError: Cannot redefine property: b(…) </span>
</code></pre>
<h4>2.1.2 writable介绍</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {}; 
Object.defineProperty(a, 'b', { 
    value: 123,
    writable: false //只读
});
console.log(a.b); // 打印 123 
a.b = 124; // 没有错误抛出（在严格模式下会抛出，即使之前已经有相同的值） 
console.log(a.b); // 打印 123， 赋值不起作用。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = {}; 
<span class="hljs-built_in">Object</span>.defineProperty(a, <span class="hljs-string">'b'</span>, { 
    <span class="hljs-attr">value</span>: <span class="hljs-number">123</span>,
    <span class="hljs-attr">writable</span>: <span class="hljs-literal">false</span> <span class="hljs-comment">//只读</span>
});
<span class="hljs-built_in">console</span>.log(a.b); <span class="hljs-comment">// 打印 123 </span>
a.b = <span class="hljs-number">124</span>; <span class="hljs-comment">// 没有错误抛出（在严格模式下会抛出，即使之前已经有相同的值） </span>
<span class="hljs-built_in">console</span>.log(a.b); <span class="hljs-comment">// 打印 123， 赋值不起作用。</span>
</code></pre>
<h4>2.1.3 enumerable介绍</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {}
    Object.defineProperty(a,&quot;b&quot;,{
        value:3445,
        enumerable:true
});
console.log(Object.keys(a));// 打印[&quot;b&quot;]

//改成false:

var a = {}
    Object.defineProperty(a,&quot;b&quot;,{
        value:3445,
        enumerable:false
});
console.log(Object.keys(a));// 打印[]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = {}
    <span class="hljs-built_in">Object</span>.defineProperty(a,<span class="hljs-string">"b"</span>,{
        <span class="hljs-attr">value</span>:<span class="hljs-number">3445</span>,
        <span class="hljs-attr">enumerable</span>:<span class="hljs-literal">true</span>
});
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.keys(a));<span class="hljs-comment">// 打印["b"]</span>

<span class="hljs-comment">//改成false:</span>

<span class="hljs-keyword">var</span> a = {}
    <span class="hljs-built_in">Object</span>.defineProperty(a,<span class="hljs-string">"b"</span>,{
        <span class="hljs-attr">value</span>:<span class="hljs-number">3445</span>,
        <span class="hljs-attr">enumerable</span>:<span class="hljs-literal">false</span>
});
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.keys(a));<span class="hljs-comment">// 打印[]</span>
</code></pre>
<h4>2.1.4 set &amp; get</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="访问器属性不能直接定义!只能通过Object.defineProperty()来定义：
var a= {}
Object.defineProperty(a,&quot;b&quot;,{
    set:function(newValue){
        console.log(&quot;赋值是:&quot;+newValue)
    },
    get:function(){
        console.log(&quot;取值:&quot;)
        return 2 //注意这里，我硬编码返回2
    }
});
a.b =1; //赋值是: 1
console.log(a.b) ;   //取值  2  

简单来说，这个 b 赋值或者取值的时候会分别触发 set 和 get 对应的函数

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>访问器属性不能直接定义!只能通过<span class="hljs-built_in">Object</span>.defineProperty()来定义：
<span class="hljs-keyword">var</span> a= {}
<span class="hljs-built_in">Object</span>.defineProperty(a,<span class="hljs-string">"b"</span>,{
    <span class="hljs-keyword">set</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">newValue</span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"赋值是:"</span>+newValue)
    },
    <span class="hljs-keyword">get</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"取值:"</span>)
        <span class="hljs-keyword">return</span> <span class="hljs-number">2</span> <span class="hljs-comment">//注意这里，我硬编码返回2</span>
    }
});
a.b =<span class="hljs-number">1</span>; <span class="hljs-comment">//赋值是: 1</span>
<span class="hljs-built_in">console</span>.log(a.b) ;   <span class="hljs-comment">//取值  2  </span>

简单来说，这个 b 赋值或者取值的时候会分别触发 <span class="hljs-keyword">set</span> 和 <span class="hljs-keyword">get</span> 对应的函数

</code></pre>
<h3 id="articleHeader3">3.Object.defineProperty示例：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//判断是不是对象
function isObj(obj){
    var type = Object.prototype.toString.call(obj);
    return type === '[object Object]';
}
 
//执行函数：
function objFun(obj){
    if(isObj(obj)){
        new Observer(obj);
    }
}

function Observer(obj){
    this.data = obj;
    this.walk(obj);
}

 //监听事件函数：
Observer.prototype.walk = function(obj){
    for(var k in obj){
        def(obj,k,obj[k])
    }
}

function def(obj,k,val){
    Object.defineProperty(obj,k,{
        configurable:true,
        enumerable:true,
        get:function(){
            console.log('get取值');
            return val;
        },
        set:function(newVal){
            if(val === newVal){
                return;
            }
            val = newVal;
            console.log('set设置值')
        }
    });
}

//测试：
var obj = {a:111,b:222};
objFun(obj);
console.log(obj.a)//get取值 222
obj.a = 333;//set设置值
console.log(obj) 

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//判断是不是对象</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isObj</span>(<span class="hljs-params">obj</span>)</span>{
    <span class="hljs-keyword">var</span> type = <span class="hljs-built_in">Object</span>.prototype.toString.call(obj);
    <span class="hljs-keyword">return</span> type === <span class="hljs-string">'[object Object]'</span>;
}
 
<span class="hljs-comment">//执行函数：</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">objFun</span>(<span class="hljs-params">obj</span>)</span>{
    <span class="hljs-keyword">if</span>(isObj(obj)){
        <span class="hljs-keyword">new</span> Observer(obj);
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Observer</span>(<span class="hljs-params">obj</span>)</span>{
    <span class="hljs-keyword">this</span>.data = obj;
    <span class="hljs-keyword">this</span>.walk(obj);
}

 <span class="hljs-comment">//监听事件函数：</span>
Observer.prototype.walk = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>)</span>{
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> k <span class="hljs-keyword">in</span> obj){
        def(obj,k,obj[k])
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">def</span>(<span class="hljs-params">obj,k,val</span>)</span>{
    <span class="hljs-built_in">Object</span>.defineProperty(obj,k,{
        <span class="hljs-attr">configurable</span>:<span class="hljs-literal">true</span>,
        <span class="hljs-attr">enumerable</span>:<span class="hljs-literal">true</span>,
        <span class="hljs-attr">get</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'get取值'</span>);
            <span class="hljs-keyword">return</span> val;
        },
        <span class="hljs-attr">set</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">newVal</span>)</span>{
            <span class="hljs-keyword">if</span>(val === newVal){
                <span class="hljs-keyword">return</span>;
            }
            val = newVal;
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'set设置值'</span>)
        }
    });
}

<span class="hljs-comment">//测试：</span>
<span class="hljs-keyword">var</span> obj = {<span class="hljs-attr">a</span>:<span class="hljs-number">111</span>,<span class="hljs-attr">b</span>:<span class="hljs-number">222</span>};
objFun(obj);
<span class="hljs-built_in">console</span>.log(obj.a)<span class="hljs-comment">//get取值 222</span>
obj.a = <span class="hljs-number">333</span>;<span class="hljs-comment">//set设置值</span>
<span class="hljs-built_in">console</span>.log(obj) 

</code></pre>
<h3 id="articleHeader4">4.Object.defineProperty实现数据和视图的联动：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html:

<div>
    Object.defineProperty实现数据和视图的联动: <br>
    <span id=&quot;nickName&quot;></span>
    <div id=&quot;introduce&quot;></div>
</div>

js：（视图控制器）

var userInfo = {};
Object.defineProperty(userInfo,'nickName',{
    get:function(){
        return document.getElementById('nickName').innerHTML;
    },
    set:function(nick){
        document.getElementById('nickName').innerHTML = nick
    }
});
Object.defineProperty(userInfo,'introduce',{
    get:function(){
        return document.getElementById('introduce').innerHTML;
    },
    set:function(introduce){
        document.getElementById('introduce').innerHTML = introduce
    }
});
//console.log(userInfo)
userInfo.nickName = '我是nickName';
userInfo.introduce = '我是introduce'

上面设置userInfo的nickName属性时会调用set方法，更新DOM节点的HTML" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>html:

&lt;div&gt;
    Object.defineProperty实现数据和视图的联动: &lt;br&gt;
    &lt;span id=<span class="hljs-string">"nickName"</span>&gt;&lt;/span&gt;
    &lt;div id=<span class="hljs-string">"introduce"</span>&gt;&lt;/div&gt;
&lt;/div&gt;

js：（视图控制器）

<span class="hljs-keyword">var</span> userInfo = {};
Object.defineProperty(userInfo,<span class="hljs-string">'nickName'</span>,{
    <span class="hljs-keyword">get</span>:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        <span class="hljs-keyword">return</span> document.getElementById(<span class="hljs-string">'nickName'</span>).innerHTML;
    },
    <span class="hljs-keyword">set</span>:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(nick)</span></span>{
        document.getElementById(<span class="hljs-string">'nickName'</span>).innerHTML = nick
    }
});
Object.defineProperty(userInfo,<span class="hljs-string">'introduce'</span>,{
    <span class="hljs-keyword">get</span>:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        <span class="hljs-keyword">return</span> document.getElementById(<span class="hljs-string">'introduce'</span>).innerHTML;
    },
    <span class="hljs-keyword">set</span>:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(introduce)</span></span>{
        document.getElementById(<span class="hljs-string">'introduce'</span>).innerHTML = introduce
    }
});
<span class="hljs-comment">//console.log(userInfo)</span>
userInfo.nickName = <span class="hljs-string">'我是nickName'</span>;
userInfo.introduce = <span class="hljs-string">'我是introduce'</span>

上面设置userInfo的nickName属性时会调用<span class="hljs-keyword">set</span>方法，更新DOM节点的HTML</code></pre>
<h4>系列文章的目录:</h4>
<p><a href="https://segmentfault.com/a/1190000013035407">Vue双向绑定的实现原理系列（一）：Object.defineproperty</a><br><a href="https://segmentfault.com/a/1190000013051584" target="_blank">Vue双向绑定的实现原理系列（二）：设计模式</a><br><a href="https://segmentfault.com/a/1190000013159255">Vue双向绑定的实现原理系列（三）：监听器Observer和订阅者Watcher</a><br><a href="https://segmentfault.com/a/1190000013169852" target="_blank">Vue双向绑定的实现原理系列（四）：补充指令解析器compile</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue双向绑定的实现原理系列（一）：Object.defineproperty

## 原文链接
[https://segmentfault.com/a/1190000013035407](https://segmentfault.com/a/1190000013035407)

