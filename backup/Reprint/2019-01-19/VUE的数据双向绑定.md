---
title: 'VUE的数据双向绑定' 
date: 2019-01-19 2:30:10
hidden: true
slug: gu8gacmk3di
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">写在前面的东西</h1>
<p>Vue.js自从在github上开源以来就受到各方的极大关注，并在短暂的时间里立即火了起来，现在已成为最流行的前端框架之一；我也使用vue有一段时间了，对vue的双向绑定有一定的理解，在这和大家分享我的愚见，有错误的地方望大家给予指正。</p>
<h2 id="articleHeader1">1、概述</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 让我们先来看一下官网的这张数据绑定的说明图：" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;"> 让我们先来看一下官网的这张数据绑定的说明图：</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVx1bI?w=1560&amp;h=874" src="https://static.alili.tech/img/bVx1bI?w=1560&amp;h=874" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="原理图告诉我们，a对象下面的b属性定义了getter、setter对属性进行劫持，当属性值改变是就会notify通知watch对象，而watch对象则会notify到view上对应的位置进行更新（这个地方还没讲清下面再讲），然后我们就看到了视图的更新了，反过来当在视图(如input)输入数据时，也会触发订阅者watch，更新最新的数据到data里面(图中的a.b),这样model数据就能实时响应view上的数据变化了，这样一个过程就是数据的双向绑定了。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code style="word-break: break-word; white-space: initial;">原理图告诉我们，a对象下面的b属性定义了getter、setter对属性进行劫持，当属性值改变是就会notify通知watch对象，而watch对象则会notify到view上对应的位置进行更新（这个地方还没讲清下面再讲），然后我们就看到了视图的更新了，反过来当在视图(如input)输入数据时，也会触发订阅者watch，更新最新的数据到<span class="hljs-class"><span class="hljs-keyword">data</span>里面(图中的<span class="hljs-title">a</span>.<span class="hljs-title">b</span>),这样model数据就能实时响应view上的数据变化了，这样一个过程就是数据的双向绑定了。</span></code></pre>
<p>看到这里就会第一个疑问：那么setter、getter是怎样实现的劫持的呢？答案就是vue运用了es5中Object.defineProperty()这个方法，所以要想理解双向绑定就得先知道Object.defineProperty是怎么一回事了；</p>
<h2 id="articleHeader2">2.Object.defineProperty</h2>
<p>它是es5一个方法，可以直接在一个对象上定义一个新属性，或者修改一个已经存在的属性， 并返回这个对象，对象里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。数据描述符是一个拥有可写或不可写值的属性。存取描述符是由一对 getter-setter 函数功能来描述的属性。描述符必须是两种形式之一；<strong>不能同时是两者</strong>。<br>  属性描述符包括：configurable(可配置性相当于属性的总开关，只有为true时才能设置，而且不可逆)、Writable(是否可写，为false时将不能够修改属性的值)、Enumerable(是否可枚举，为false时for..in以及Object.keys()将不能枚举出该属性)、get(一个给属性提供 getter 的方法)、set(一个给属性提供 setter 的方法)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var o = {name:'vue'};
Object.defineProperty(o, &quot;age&quot;,{ value : 3,
                               writable : true,//可以修改属性a的值
                               enumerable : true,//能够在for..in或者Object.keys()中枚举
                               configurable : true//可以配置
                               });

Object.keys(o)//['name','age']
o.age = 4;
console.log(o.age) //4

var bValue;
Object.defineProperty(o, &quot;b&quot;, {
                               get : function(){ 
                                         return bValue; 
                                     },
                               set : function(newValue){ 
                                       console.log('haha..')
                                       bValue = newValue; 
                                     },
                               enumerable : true,//默认值是false 及不能被枚举
                               configurable : true//默认也是false
                               });
 o.b = 'something';
//haha..
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> o = {<span class="hljs-attr">name</span>:<span class="hljs-string">'vue'</span>};
<span class="hljs-built_in">Object</span>.defineProperty(o, <span class="hljs-string">"age"</span>,{ <span class="hljs-attr">value</span> : <span class="hljs-number">3</span>,
                               <span class="hljs-attr">writable</span> : <span class="hljs-literal">true</span>,<span class="hljs-comment">//可以修改属性a的值</span>
                               enumerable : <span class="hljs-literal">true</span>,<span class="hljs-comment">//能够在for..in或者Object.keys()中枚举</span>
                               configurable : <span class="hljs-literal">true</span><span class="hljs-comment">//可以配置</span>
                               });

<span class="hljs-built_in">Object</span>.keys(o)<span class="hljs-comment">//['name','age']</span>
o.age = <span class="hljs-number">4</span>;
<span class="hljs-built_in">console</span>.log(o.age) <span class="hljs-comment">//4</span>

<span class="hljs-keyword">var</span> bValue;
<span class="hljs-built_in">Object</span>.defineProperty(o, <span class="hljs-string">"b"</span>, {
                               <span class="hljs-attr">get</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ 
                                         <span class="hljs-keyword">return</span> bValue; 
                                     },
                               <span class="hljs-attr">set</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">newValue</span>)</span>{ 
                                       <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'haha..'</span>)
                                       bValue = newValue; 
                                     },
                               <span class="hljs-attr">enumerable</span> : <span class="hljs-literal">true</span>,<span class="hljs-comment">//默认值是false 及不能被枚举</span>
                               configurable : <span class="hljs-literal">true</span><span class="hljs-comment">//默认也是false</span>
                               });
 o.b = <span class="hljs-string">'something'</span>;
<span class="hljs-comment">//haha..</span>
</code></pre>
<p>上面分别给出了对象属性描述符的数据描述符和存取描述的例子，注意一点是这两种不能同时拥有，也就是valuewritable不能和getset同时具备。在这里只是很粗浅的说了一下Object.defineProperty这个方法，要了解更多可以点击<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty" rel="nofollow noreferrer" target="_blank">这里</a></p>
<h1 id="articleHeader3">3.实现observer</h1>
<p>我们在上面一部分讲到了es5的Object.defineProperty()这个方法，vue正式通过它来实现对一个对象属性的劫持的，在创建实例的时候vue会对option中的data对象进行一次数据格式化或者说初始化，给每个data的属性都设置上get/set进行对象劫持，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Observer(data){
    this.data = data;
    if(Array.isArray(data)){
        protoAugment(data,arrayMethods); //arrayMethods实现对Array.prototype原型方法的拷贝;
        this.observeArray(data);
    }else{
        this.walk(data);
    }
    
}

Observer.prototype = {
    walk:function walk(data){
        var _this = this;
        Object.keys(data).forEach(function(key){
            _this.convert(key,data[key]);
        })
    },
    convert:function convert(key,val){
        this.defineReactive(this.data,key,val);
    },
    defineReactive:function defineReactive(data,key,val){
        var ochildOb = observer(val);
        var _this = this;
        Object.defineProperty(data,key,{
            configurable:false,
            enumerable:true,
            get:function(){
                console.log(`i get the ${key}-->${val}`)
                return val;
            },
            set:function(newVal){
                if(newVal == val)return;
                console.log(`haha.. ${key} changed oldVal-->${val} newVal-->${newVal}`);
                val = newVal;
                observer(newVal);//在这里对新设置的属性再一次进行get/set     
            }            
        })
    },
    observeArray:function observeArray(items){
        for (var i = 0, l = items.length; i < l; i++) {
            observer(items[i]);
         }
    }
}
function observer(data){
    if(!data || typeof data !=='object')return;
    return new Observer(data);
}
//让我们来试一下
var obj = {name:'jasonCloud'};
var ob = observer(obj);
obj.name = 'wu';
//haha.. name changed oldVal-->jasonCloud newVal-->wu
obj.name;
//i get the name-->wu" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Observer</span>(<span class="hljs-params">data</span>)</span>{
    <span class="hljs-keyword">this</span>.data = data;
    <span class="hljs-keyword">if</span>(<span class="hljs-built_in">Array</span>.isArray(data)){
        protoAugment(data,arrayMethods); <span class="hljs-comment">//arrayMethods实现对Array.prototype原型方法的拷贝;</span>
        <span class="hljs-keyword">this</span>.observeArray(data);
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">this</span>.walk(data);
    }
    
}

Observer.prototype = {
    <span class="hljs-attr">walk</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">walk</span>(<span class="hljs-params">data</span>)</span>{
        <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
        <span class="hljs-built_in">Object</span>.keys(data).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key</span>)</span>{
            _this.convert(key,data[key]);
        })
    },
    <span class="hljs-attr">convert</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">convert</span>(<span class="hljs-params">key,val</span>)</span>{
        <span class="hljs-keyword">this</span>.defineReactive(<span class="hljs-keyword">this</span>.data,key,val);
    },
    <span class="hljs-attr">defineReactive</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineReactive</span>(<span class="hljs-params">data,key,val</span>)</span>{
        <span class="hljs-keyword">var</span> ochildOb = observer(val);
        <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
        <span class="hljs-built_in">Object</span>.defineProperty(data,key,{
            <span class="hljs-attr">configurable</span>:<span class="hljs-literal">false</span>,
            <span class="hljs-attr">enumerable</span>:<span class="hljs-literal">true</span>,
            <span class="hljs-attr">get</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`i get the <span class="hljs-subst">${key}</span>--&gt;<span class="hljs-subst">${val}</span>`</span>)
                <span class="hljs-keyword">return</span> val;
            },
            <span class="hljs-attr">set</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">newVal</span>)</span>{
                <span class="hljs-keyword">if</span>(newVal == val)<span class="hljs-keyword">return</span>;
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`haha.. <span class="hljs-subst">${key}</span> changed oldVal--&gt;<span class="hljs-subst">${val}</span> newVal--&gt;<span class="hljs-subst">${newVal}</span>`</span>);
                val = newVal;
                observer(newVal);<span class="hljs-comment">//在这里对新设置的属性再一次进行get/set     </span>
            }            
        })
    },
    <span class="hljs-attr">observeArray</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">observeArray</span>(<span class="hljs-params">items</span>)</span>{
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, l = items.length; i &lt; l; i++) {
            observer(items[i]);
         }
    }
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">observer</span>(<span class="hljs-params">data</span>)</span>{
    <span class="hljs-keyword">if</span>(!data || <span class="hljs-keyword">typeof</span> data !==<span class="hljs-string">'object'</span>)<span class="hljs-keyword">return</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Observer(data);
}
<span class="hljs-comment">//让我们来试一下</span>
<span class="hljs-keyword">var</span> obj = {<span class="hljs-attr">name</span>:<span class="hljs-string">'jasonCloud'</span>};
<span class="hljs-keyword">var</span> ob = observer(obj);
obj.name = <span class="hljs-string">'wu'</span>;
<span class="hljs-comment">//haha.. name changed oldVal--&gt;jasonCloud newVal--&gt;wu</span>
obj.name;
<span class="hljs-comment">//i get the name--&gt;wu</span></code></pre>
<p>到这一步我们只实现了对属性的set/get监听，但并没实现变化后notify，那该怎样去实现呢？在VUE里面使用了订阅器Dep，让其维持一个订阅数组，但有订阅者时就通知相应的订阅者notify。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let _id = 0;
/*
  Dep构造器用于维持$watcher检测队列；
*/
function Dep(){
    this.id = _id++;
    this.subs = [];
}

Dep.prototype = {
    constructor:Dep,
    addSub:function(sub){
        this.subs.push(sub);
    },
    notify:function(){
        this.subs.forEach(function(sub){
            if(typeof sub.update == 'function')
            sub.update();
        })
    },
    removeSub:function(sub){
        var index = this.subs.indexOf(sub);
        if(index >-1)
        this.subs.splice(index,1);
    },
    depend:function(){
        Dep.target.addDep(this);
    }
}

Dep.target = null; //定义Dep的一个属性，当watcher时Dep.targert=watcher实例对象" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs perl"><code>let _id = <span class="hljs-number">0</span>;
<span class="hljs-regexp">/*
  Dep构造器用于维持$watcher检测队列；
*/</span>
function Dep(){
    this.id = _id++;
    this.subs = [];
}

Dep.prototype = {
    constructor:Dep,
    addSub:function(<span class="hljs-function"><span class="hljs-keyword">sub</span>)</span>{
        this.subs.push(<span class="hljs-function"><span class="hljs-keyword">sub</span>)</span>;
    },
    notify:function(){
        this.subs.forEach(function(<span class="hljs-function"><span class="hljs-keyword">sub</span>)</span>{
            <span class="hljs-keyword">if</span>(typeof <span class="hljs-function"><span class="hljs-keyword">sub</span>.<span class="hljs-title">update</span> == '<span class="hljs-title">function</span>')
            <span class="hljs-title">sub</span>.<span class="hljs-title">update</span></span>();
        })
    },
    removeSub:function(<span class="hljs-function"><span class="hljs-keyword">sub</span>)</span>{
        var <span class="hljs-keyword">index</span> = this.subs.indexOf(<span class="hljs-function"><span class="hljs-keyword">sub</span>)</span>;
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">index</span> &gt;-<span class="hljs-number">1</span>)
        this.subs.splice(<span class="hljs-keyword">index</span>,<span class="hljs-number">1</span>);
    },
    depend:function(){
        Dep.target.addDep(this);
    }
}

Dep.target = null; <span class="hljs-regexp">//</span>定义Dep的一个属性，当watcher时Dep.targert=watcher实例对象</code></pre>
<p>在这里构造器Dep,维持内部一个数组subs，当有订阅时就addSub进去，通知订阅者更新时就会调用notify方法通知到订阅者；我们现在合并一下这两段代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Observer(data){
    //省略的代码..
    this.dep = new Dep();
    //省略的代码..
    
}

Observer.prototype = {

    //省略的代码..
    
    defineReactive:function defineReactive(data,key,val){

        //省略的代码..

        var dep = new Dep();

        Object.defineProperty(data,key,{
            configurable:false,
            enumerable:true,
            get:function(){
                if(Dep.target){
                    dep.depend();
                    //省略的代码..
                }
                return val;
            },
            set:function(newVal){
                //省略的代码..
                dep.notify();         
            }            
        })
    },
    observeArray:function observeArray(items){
        for (var i = 0, l = items.length; i < l; i++) {
            observer(items[i]);
         }
    }
}

function observer(data){
    if(!data || typeof data !=='object')return;
    return new Observer(data);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Observer</span><span class="hljs-params">(data)</span></span>{
    <span class="hljs-comment">//省略的代码..</span>
    <span class="hljs-keyword">this</span>.dep = <span class="hljs-keyword">new</span> Dep();
    <span class="hljs-comment">//省略的代码..</span>
    
}

Observer.prototype = {

    <span class="hljs-comment">//省略的代码..</span>
    
    defineReactive:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineReactive</span><span class="hljs-params">(data,key,val)</span></span>{

        <span class="hljs-comment">//省略的代码..</span>

        <span class="hljs-keyword">var</span> dep = <span class="hljs-keyword">new</span> Dep();

        Object.defineProperty(data,key,{
            configurable:<span class="hljs-literal">false</span>,
            enumerable:<span class="hljs-literal">true</span>,
            <span class="hljs-keyword">get</span>:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
                <span class="hljs-keyword">if</span>(Dep.target){
                    dep.depend();
                    <span class="hljs-comment">//省略的代码..</span>
                }
                <span class="hljs-keyword">return</span> val;
            },
            <span class="hljs-keyword">set</span>:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(newVal)</span></span>{
                <span class="hljs-comment">//省略的代码..</span>
                dep.notify();         
            }            
        })
    },
    observeArray:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">observeArray</span><span class="hljs-params">(items)</span></span>{
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, l = items.length; i &lt; l; i++) {
            observer(items[i]);
         }
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">observer</span><span class="hljs-params">(data)</span></span>{
    <span class="hljs-keyword">if</span>(!data || <span class="hljs-keyword">typeof</span> data !==<span class="hljs-string">'object'</span>)<span class="hljs-keyword">return</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Observer(data);
}</code></pre>
<p>上面代码中有一个protoAugment方法，在vue中是实现对数组一些方法的重写，但他并不是直接在Array.prototype.[xxx]直接进行重写这样会影响到所有的数组中的方法，显然是不明智的，vue很巧妙的进行了处理，使其并不会影响到所有的Array上的方法，代码可以点击<a href="https://github.com/JasonCloud/wue/blob/master/src/js/observer.js" rel="nofollow noreferrer" target="_blank">这里</a></p>
<p>到这里我们实现了数据的劫持，并定义了一个订阅器来存放订阅者，那么谁是订阅者呢？那就是Watcher,下面让我们看看怎样实现watcher</p>
<h2 id="articleHeader4">4.实现一个Watcher</h2>
<p>watcher是实现view视图指令及数据和model层数据联系的管道，当在执行编译时候，他会把对应的属性创建一个Watcher对象让他和数据层model建立起联系。但数据发生变化是会触发update方法更新到视图上view中，反过来亦然。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Watcher(vm,expOrFn,cb){
    this.vm = vm;
    this.cb = cb;
    this.expOrFn = expOrFn;
    this.depIds = {};
    var value = this.get(),valuetemp;
    if(typeof value === 'object' &amp;&amp; value !== null){
        if(Array.isArray(value)){
            valuetemp = [];
            for(var i = 0,len = value.length;i<len;i++){
                valuetemp.push(value[i]);
            }
        }else{
            valuetemp = {};
            for(var j in value){
                valuetemp[j] = value[j];
            }
        }
        this.value = valuetemp;
    }else{
        this.value = value;
    }
     
};
Watcher.prototype = {
    update:function(){
        this.run();
    },
    run:function(){
        var val = this.get(),valuetemp;
        var oldVal = this.value;
        if(val!==oldVal){
            if(typeof val === 'object' &amp;&amp; val !== null){
                if(Array.isArray(val)){
                    valuetemp = [];
                    for(var i = 0,len = val.length;i<len;i++){
                        valuetemp.push(val[i]);
                    }
                }else{
                    valuetemp = {};
                    for(var j in val){
                        valuetemp[j] = val[j];
                    }
                }
                this.value = valuetemp;
            }else{
                this.value = val;
            }
            this.cb.call(this,val,oldVal);
        }
    },
    get:function(){
        Dep.target = this;
        var val = this.getVMVal();
        Dep.target = null;
        return val;
    },
    getVMVal:function(){
        var exps = this.expOrFn.split('.');
        var val = this.vm._data;
        exps.forEach(function(key){
            val = val[key];
        })

        return val;
    },
    addDep:function(dep){
        if(!this.depIds.hasOwnProperty(dep.id)){
            dep.addSub(this);
            this.depIds[dep.id] = dep;
        }
    }

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>function Watcher(vm,expOrFn,cb){
    <span class="hljs-keyword">this</span>.vm = vm;
    <span class="hljs-keyword">this</span>.cb = cb;
    <span class="hljs-keyword">this</span>.expOrFn = expOrFn;
    <span class="hljs-keyword">this</span>.depIds = {};
    <span class="hljs-keyword">var</span> value = <span class="hljs-keyword">this</span>.<span class="hljs-keyword">get</span>(),valuetemp;
    <span class="hljs-keyword">if</span>(typeof value === <span class="hljs-string">'object'</span> &amp;&amp; value !== <span class="hljs-literal">null</span>){
        <span class="hljs-keyword">if</span>(Array.isArray(value)){
            valuetemp = [];
            <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>,len = value.length;i&lt;len;i++){
                valuetemp.push(value[i]);
            }
        }<span class="hljs-keyword">else</span>{
            valuetemp = {};
            <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j <span class="hljs-keyword">in</span> value){
                valuetemp[j] = value[j];
            }
        }
        <span class="hljs-keyword">this</span>.value = valuetemp;
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">this</span>.value = value;
    }
     
};
Watcher.prototype = {
    update:function(){
        <span class="hljs-keyword">this</span>.run();
    },
    run:function(){
        <span class="hljs-keyword">var</span> <span class="hljs-keyword">val</span> = <span class="hljs-keyword">this</span>.<span class="hljs-keyword">get</span>(),valuetemp;
        <span class="hljs-keyword">var</span> oldVal = <span class="hljs-keyword">this</span>.value;
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">val</span>!==oldVal){
            <span class="hljs-keyword">if</span>(typeof <span class="hljs-keyword">val</span> === <span class="hljs-string">'object'</span> &amp;&amp; <span class="hljs-keyword">val</span> !== <span class="hljs-literal">null</span>){
                <span class="hljs-keyword">if</span>(Array.isArray(<span class="hljs-keyword">val</span>)){
                    valuetemp = [];
                    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>,len = <span class="hljs-keyword">val</span>.length;i&lt;len;i++){
                        valuetemp.push(<span class="hljs-keyword">val</span>[i]);
                    }
                }<span class="hljs-keyword">else</span>{
                    valuetemp = {};
                    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j <span class="hljs-keyword">in</span> <span class="hljs-keyword">val</span>){
                        valuetemp[j] = <span class="hljs-keyword">val</span>[j];
                    }
                }
                <span class="hljs-keyword">this</span>.value = valuetemp;
            }<span class="hljs-keyword">else</span>{
                <span class="hljs-keyword">this</span>.value = <span class="hljs-keyword">val</span>;
            }
            <span class="hljs-keyword">this</span>.cb.call(<span class="hljs-keyword">this</span>,<span class="hljs-keyword">val</span>,oldVal);
        }
    },
    <span class="hljs-keyword">get</span>:function(){
        Dep.target = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">var</span> <span class="hljs-keyword">val</span> = <span class="hljs-keyword">this</span>.getVMVal();
        Dep.target = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">val</span>;
    },
    getVMVal:function(){
        <span class="hljs-keyword">var</span> exps = <span class="hljs-keyword">this</span>.expOrFn.split(<span class="hljs-string">'.'</span>);
        <span class="hljs-keyword">var</span> <span class="hljs-keyword">val</span> = <span class="hljs-keyword">this</span>.vm._data;
        exps.forEach(function(key){
            <span class="hljs-keyword">val</span> = <span class="hljs-keyword">val</span>[key];
        })

        <span class="hljs-keyword">return</span> <span class="hljs-keyword">val</span>;
    },
    addDep:function(dep){
        <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">this</span>.depIds.hasOwnProperty(dep.id)){
            dep.addSub(<span class="hljs-keyword">this</span>);
            <span class="hljs-keyword">this</span>.depIds[dep.id] = dep;
        }
    }

}</code></pre>
<p>到现在还差一步就是将我们在容器中写的指令和"{{""}}"让他和我们的model建立起连续并转化成，我们平时熟悉的html文档，这个过程也就是编译；编译简单的实现就是将我们定义的容器里面所有的子节点都获取到，然后通过对应的规则进行转换编译，为了提高性能，先创建一个文档碎片createDocumentFragment（），然后操作都在碎片中进行，等操作成功后一次性appendChild进去；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Compile(el,vm){
    this.$vm = vm;
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    if(this.$el){
        this.$fragment = this.nodeToFragment(this.$el);
        this.init();
        this.$el.appendChild(this.$fragment);
        this.$vm.$option['mount'] &amp;&amp; this.$vm.$option['mount'].call(this.$vm);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>function Compile(el,vm){
    <span class="hljs-keyword">this</span>.$vm = vm;
    <span class="hljs-keyword">this</span>.$el = <span class="hljs-keyword">this</span>.isElementNode(el) ? el : document.querySelector(el);
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.$el){
        <span class="hljs-keyword">this</span>.$fragment = <span class="hljs-keyword">this</span>.nodeToFragment(<span class="hljs-keyword">this</span>.$el);
        <span class="hljs-keyword">this</span>.init();
        <span class="hljs-keyword">this</span>.$el.appendChild(<span class="hljs-keyword">this</span>.$fragment);
        <span class="hljs-keyword">this</span>.$vm.$option[<span class="hljs-string">'mount'</span>] &amp;&amp; <span class="hljs-keyword">this</span>.$vm.$option[<span class="hljs-string">'mount'</span>].call(<span class="hljs-keyword">this</span>.$vm);
    }
}</code></pre>
<h2 id="articleHeader5">5.实现一个简易版的vue</h2>
<p>到目前为止我们可以实现一个简单的数据双向绑定了，接下来要做的就是对这一套流程进行整合了，不多说上码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Wue(option){
    this.$option = option;
    var data = this._data = this.$option.data;
    var _this = this;

    //数据代理实现数据从vm.xx == vm.$data.xx;
    Object.keys(data).forEach(function(val){
        _this._proxy(val)
    });

    observer(data)
    this.$compile = new Compile(this.$option.el , this);
}

Wue.prototype = {
    $watch:function(expOrFn,cb){
        return new Watcher(this,expOrFn,cb);
    },
    _proxy:function(key){
        var _this = this;
        Object.defineProperty(_this,key,{
            configurable: false,
            enumerable: true,
            get:function(){
                return _this._data[key];
            },
            set:function(newVal){
                _this._data[key] = newVal;
            }
        })
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Wue</span><span class="hljs-params">(option)</span></span>{
    <span class="hljs-keyword">this</span>.$option = option;
    <span class="hljs-keyword">var</span> data = <span class="hljs-keyword">this</span>._data = <span class="hljs-keyword">this</span>.$option.data;
    <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;

    <span class="hljs-comment">//数据代理实现数据从vm.xx == vm.$data.xx;</span>
    Object.keys(data).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(val)</span></span>{
        _this._proxy(val)
    });

    observer(data)
    <span class="hljs-keyword">this</span>.$compile = <span class="hljs-keyword">new</span> Compile(<span class="hljs-keyword">this</span>.$option.el , <span class="hljs-keyword">this</span>);
}

Wue.prototype = {
    $watch:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(expOrFn,cb)</span></span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Watcher(<span class="hljs-keyword">this</span>,expOrFn,cb);
    },
    _proxy:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(key)</span></span>{
        <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
        Object.defineProperty(_this,key,{
            configurable: <span class="hljs-literal">false</span>,
            enumerable: <span class="hljs-literal">true</span>,
            <span class="hljs-keyword">get</span>:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
                <span class="hljs-keyword">return</span> _this._data[key];
            },
            <span class="hljs-keyword">set</span>:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(newVal)</span></span>{
                _this._data[key] = newVal;
            }
        })
    }
}</code></pre>
<p>在这里定义了一个Wue构造函数，当实例化的时候他会对option的data属性进行格式化（劫持），然后再进行编译，让数据和视图建立起联系；在这里用_proxy进行数据代理是为了当访问数据时可以直接vm.xx而不需要vm._data.xx;</p>
<p>源码放在<a href="https://github.com/JasonCloud/wue" rel="nofollow noreferrer" target="_blank">这里</a></p>
<h2 id="articleHeader6">后话</h2>
<p>在这里只是很初步的实现了一些vue的功能，而且还很残缺，比如对象的深层绑定，以及计算属性都还没有加入，作为后续部分吧，最后得膜拜一下尤神，太牛叉了！</p>
<p>参考资料：<br> 1.<a href="https://segmentfault.com/a/1190000006599500"></a><a href="https://segmentfault.com/a/1190000006599500" target="_blank">https://segmentfault.com/a/11...</a><br> 2.<a href="https://segmentfault.com/a/1190000004384515"></a><a href="https://segmentfault.com/a/1190000004384515" target="_blank">https://segmentfault.com/a/11...</a><br> 3.<a href="https://github.com/youngwind/blog/issues/87" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/youngwind/blog/issues/87" rel="nofollow noreferrer" target="_blank">https://github.com/youngwind/...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
VUE的数据双向绑定

## 原文链接
[https://segmentfault.com/a/1190000008584577](https://segmentfault.com/a/1190000008584577)

