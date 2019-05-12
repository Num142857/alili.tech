---
title: 'javascript原生一步步实现bind分析' 
date: 2019-02-01 2:30:10
hidden: true
slug: pzonaco1jtf
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">bind</h1>
<h2 id="articleHeader1">官方描述</h2>
<p>bind() 函数会创建一个新函数（称为绑定函数），新函数与被调函数（绑定函数的目标函数）具有相同的函数体（在 ECMAScript 5 规范中内置的call属性）。当目标函数被调用时 this 值绑定到 bind() 的第一个参数，该参数不能被重写。绑定函数被调用时，bind() 也接受预设的参数提供给原函数。<code>一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。</code></p>
<h2 id="articleHeader2">使用介绍</h2>
<p>由于<code>javascript</code>中作用域是由其运行时候所处的环境决定的，所以往往函数定义和实际运行的时候所处环境不一样，那么作用域也会发生相应的变化。<br>例如下面这个情况：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var id = 'window';
//定义一个函数，但是不立即执行
var test = function(){
    console.log(this.id)
}
test() // window
//把test作为参数传递
var obj = {
    id:'obj',
    hehe:test
}
//此时test函数运行环境发生了改变
obj.hehe() // 'obj'
//为了避免这种情况，javascript里面有一个bind方法可以在函数运行之前就绑定其作用域，修改如下

var id = 'window';
var test = function(){
    console.log(this.id)
}.bind(window)
var obj = {
    id:'obj',
    hehe:test
}
test() // window
obj.hehe() // window" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> id = <span class="hljs-string">'window'</span>;
<span class="hljs-comment">//定义一个函数，但是不立即执行</span>
<span class="hljs-keyword">var</span> test = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.id)
}
test() <span class="hljs-comment">// window</span>
<span class="hljs-comment">//把test作为参数传递</span>
<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">id</span>:<span class="hljs-string">'obj'</span>,
    <span class="hljs-attr">hehe</span>:test
}
<span class="hljs-comment">//此时test函数运行环境发生了改变</span>
obj.hehe() <span class="hljs-comment">// 'obj'</span>
<span class="hljs-comment">//为了避免这种情况，javascript里面有一个bind方法可以在函数运行之前就绑定其作用域，修改如下</span>

<span class="hljs-keyword">var</span> id = <span class="hljs-string">'window'</span>;
<span class="hljs-keyword">var</span> test = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.id)
}.bind(<span class="hljs-built_in">window</span>)
<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">id</span>:<span class="hljs-string">'obj'</span>,
    <span class="hljs-attr">hehe</span>:test
}
test() <span class="hljs-comment">// window</span>
obj.hehe() <span class="hljs-comment">// window</span></code></pre>
<p>上面介绍了<code>bind</code>方法的一个重要作用就是为一个函数绑定作用域，但是<code>bind</code>方法在低版本浏览器不兼容，这里我们可以手动实现一下。</p>
<h2 id="articleHeader3">拆分一下关键思路</h2>
<ol>
<li><p>因为bind方法不会立即执行函数，需要返回一个待执行的函数（这里用到闭包，可以返回一个函数）<code>return function(){}</code></p></li>
<li><p>作用域绑定，这里可以使用apply或者call方法来实现 <code>xx.call(yy)/xx.apply(yy)</code></p></li>
<li><p>参数传递，由于参数的不确定性，需要用apply传递数组（<code>实例更明了</code>）<code>xx.apply(yy,[...Array...])，如果用call就不太方便了，因为call后面的参数需要一个个列出来</code></p></li>
</ol>
<h2 id="articleHeader4">实现</h2>
<p>有了上述的思路，大致的雏形已经明了了，代码应该也很容易实现</p>
<h2 id="articleHeader5">绑定作用域，绑定传参</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.testBind = function(that){
    var _this = this,
        /*
        *由于参数的不确定性，统一用arguments来处理，这里的arguments只是一个类数组对象，有length属性
        *可以用数组的slice方法转化成标准格式数组，除了作用域对象that以外，
        *后面的所有参数都需要作为数组参数传递
        *Array.prototype.slice.apply(arguments,[1])/Array.prototype.slice.call(arguments,1)
        */
        slice = Array.prototype.slice,
        args = slice.apply(arguments,[1]);
    //返回函数    
    return function(){
        //apply绑定作用域，进行参数传递
        return _this.apply(that,args)
    }    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Function</span>.prototype.testBind = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">that</span>)</span>{
    <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>,
        <span class="hljs-comment">/*
        *由于参数的不确定性，统一用arguments来处理，这里的arguments只是一个类数组对象，有length属性
        *可以用数组的slice方法转化成标准格式数组，除了作用域对象that以外，
        *后面的所有参数都需要作为数组参数传递
        *Array.prototype.slice.apply(arguments,[1])/Array.prototype.slice.call(arguments,1)
        */</span>
        slice = <span class="hljs-built_in">Array</span>.prototype.slice,
        args = slice.apply(<span class="hljs-built_in">arguments</span>,[<span class="hljs-number">1</span>]);
    <span class="hljs-comment">//返回函数    </span>
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-comment">//apply绑定作用域，进行参数传递</span>
        <span class="hljs-keyword">return</span> _this.apply(that,args)
    }    
}</code></pre>
<p>测试</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var test = function(a,b){
    console.log('作用域绑定 '+ this.value)
    console.log('testBind参数传递 '+ a.value2)
    console.log('调用参数传递 ' + b)
}
var obj = {
    value:'ok'
}
var fun_new = test.testBind(obj,{value2:'also ok'})

fun_new ('hello bind')
// 作用域绑定 ok
// testBind参数传递 also ok
// 调用参数传递  undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> test = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a,b</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'作用域绑定 '</span>+ <span class="hljs-keyword">this</span>.value)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'testBind参数传递 '</span>+ a.value2)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'调用参数传递 '</span> + b)
}
<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">value</span>:<span class="hljs-string">'ok'</span>
}
<span class="hljs-keyword">var</span> fun_new = test.testBind(obj,{<span class="hljs-attr">value2</span>:<span class="hljs-string">'also ok'</span>})

fun_new (<span class="hljs-string">'hello bind'</span>)
<span class="hljs-comment">// 作用域绑定 ok</span>
<span class="hljs-comment">// testBind参数传递 also ok</span>
<span class="hljs-comment">// 调用参数传递  undefined</span></code></pre>
<h2 id="articleHeader6">动态参数</h2>
<p>上面已经实现了<code>bind</code>方法的作用域绑定，但是美中不足的是，既然我们返回的是一个函数，调用的时候应该支持传递参数，很显然，上面的 <code>fun_new</code> 调用的时候并不支持传参，只能在 <code>testBind</code> 绑定的时候传递参数，因为我们最终调用的是这个返回函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function(){
        return _this.apply(that,args)
    }    

这里面的args在绑定的时候就已经确定了，调用的时候值已经固定，
我们并没有处理这个function传递的参数。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code><span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        <span class="hljs-keyword">return</span> _this.apply(that,args)
    }    

这里面的args在绑定的时候就已经确定了，调用的时候值已经固定，
我们并没有处理这个<span class="hljs-function"><span class="hljs-keyword">function</span></span>传递的参数。</code></pre>
<p>我们对其进行改造</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return function(){
        return _this.apply(that,
            args.concat(Array.prototype.slice.apply(arguments,[0]))
        )
    }    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> _this.apply(that,
            args.concat(<span class="hljs-built_in">Array</span>.prototype.slice.apply(<span class="hljs-built_in">arguments</span>,[<span class="hljs-number">0</span>]))
        )
    }    </code></pre>
<p>这里的 <code>Array.prototype.slice.apply(arguments,[0])</code> 指的是这个返回函数执行的时候传递的一系列参数，所以是从第一个参数开始 <code>[0]</code> ,之前的<code>args = slice.apply(arguments,[1])</code>指的是 <code>testBind</code>方法执行时候传递的参数，所以从第二个开始 <code>[1]</code>，两则有本质区别，不能搞混，<code>只有两者合并了之后才是返回函数的完整参数</code></p>
<p>所以有如下实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.testBind = function(that){
    var _this = this,
        slice = Array.prototype.slice,
        args = slice.apply(arguments,[1]);
    return function(){
        return _this.apply(that,
                    args.concat(Array.prototype.slice.apply(arguments,[0]))
                )
    }    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Function</span>.prototype.testBind = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">that</span>)</span>{
    <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>,
        slice = <span class="hljs-built_in">Array</span>.prototype.slice,
        args = slice.apply(<span class="hljs-built_in">arguments</span>,[<span class="hljs-number">1</span>]);
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> _this.apply(that,
                    args.concat(<span class="hljs-built_in">Array</span>.prototype.slice.apply(<span class="hljs-built_in">arguments</span>,[<span class="hljs-number">0</span>]))
                )
    }    
}</code></pre>
<p>测试</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var test = function(a,b){
    console.log('作用域绑定 '+ this.value)
    console.log('testBind参数传递 '+ a.value2)
    console.log('调用参数传递 ' + b)
}
var obj = {
    value:'ok'
}
var fun_new = test.testBind(obj,{value2:'also ok'})

fun_new ('hello bind')
// 作用域绑定 ok
// testBind参数传递 also ok
// 调用参数传递  hello bind" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> test = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a,b</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'作用域绑定 '</span>+ <span class="hljs-keyword">this</span>.value)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'testBind参数传递 '</span>+ a.value2)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'调用参数传递 '</span> + b)
}
<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">value</span>:<span class="hljs-string">'ok'</span>
}
<span class="hljs-keyword">var</span> fun_new = test.testBind(obj,{<span class="hljs-attr">value2</span>:<span class="hljs-string">'also ok'</span>})

fun_new (<span class="hljs-string">'hello bind'</span>)
<span class="hljs-comment">// 作用域绑定 ok</span>
<span class="hljs-comment">// testBind参数传递 also ok</span>
<span class="hljs-comment">// 调用参数传递  hello bind</span></code></pre>
<p>在以上2种传参方式中，<code>bind</code>的优先级高，从 <code>args.concat(Array.prototype.slice.apply(arguments,[0]))</code> 也可以看出来，<code>bind</code>的参数在数组前面。</p>
<h2 id="articleHeader7">原型链</h2>
<p>官方文档上有一句话:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="A bound function may also be constructed using the new operator: doing
so acts as though the target function had instead been constructed.
The provided this value is ignored, while prepended arguments are
provided to the emulated function.
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>A bound <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">may</span> <span class="hljs-title">also</span> <span class="hljs-title">be</span> <span class="hljs-title">constructed</span> <span class="hljs-title">using</span> <span class="hljs-title">the</span> <span class="hljs-title">new</span> <span class="hljs-title">operator</span>: <span class="hljs-title">doing</span></span>
so acts <span class="hljs-keyword">as</span> though <span class="hljs-keyword">the</span> target <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">had</span> <span class="hljs-title">instead</span> <span class="hljs-title">been</span> <span class="hljs-title">constructed</span>.</span>
The provided this <span class="hljs-built_in">value</span> is ignored, <span class="hljs-keyword">while</span> prepended arguments are
provided <span class="hljs-built_in">to</span> <span class="hljs-keyword">the</span> emulated <span class="hljs-function"><span class="hljs-keyword">function</span>.</span>
</code></pre>
<p>说明绑定过后的函数被<code>new</code>实例化之后，需要继承原函数的原型链方法，且绑定过程中提供的this被忽略（继承原函数的this对象），但是参数还是会使用。<br>这里就需要一个中转函数把原型链传递下去</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fNOP = function () {} //创建一个中转函数
fNOP.prototype = this.prototype;
xx.prototype = new fNOP() 
修改如下
Function.prototype.testBind = function(that){
    var _this = this,
        slice = Array.prototype.slice,
        args = slice.apply(arguments,[1]),
        fNOP = function () {},
        //所以调用官方bind方法之后 有一个name属性值为 'bound '
        bound = function(){
            return _this.apply(that,
                args.concat(Array.prototype.slice.apply(arguments,[0]))
            )
        }    

    fNOP.prototype = _this.prototype;

    bound.prototype = new fNOP();

    return bound;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>fNOP = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{} <span class="hljs-comment">//创建一个中转函数</span>
fNOP.prototype = <span class="hljs-keyword">this</span>.prototype;
xx.prototype = <span class="hljs-keyword">new</span> fNOP() 
修改如下
<span class="hljs-built_in">Function</span>.prototype.testBind = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">that</span>)</span>{
    <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>,
        slice = <span class="hljs-built_in">Array</span>.prototype.slice,
        args = slice.apply(<span class="hljs-built_in">arguments</span>,[<span class="hljs-number">1</span>]),
        fNOP = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{},
        <span class="hljs-comment">//所以调用官方bind方法之后 有一个name属性值为 'bound '</span>
        bound = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">return</span> _this.apply(that,
                args.concat(<span class="hljs-built_in">Array</span>.prototype.slice.apply(<span class="hljs-built_in">arguments</span>,[<span class="hljs-number">0</span>]))
            )
        }    

    fNOP.prototype = _this.prototype;

    bound.prototype = <span class="hljs-keyword">new</span> fNOP();

    <span class="hljs-keyword">return</span> bound;
}</code></pre>
<p>而且<code>bind</code>方法的第一个参数<code>this</code>是可以不传的，需要分2种情况</p>
<ul><li><p>直接调用bind之后的方法</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var f = function () { console.log('不传默认为'+this)  };f.bind()()
// 不传默认为 Window " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> f = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'不传默认为'</span>+<span class="hljs-keyword">this</span>)  };f.bind()()
<span class="hljs-comment">// 不传默认为 Window </span></code></pre>
<p><code>所以直接调用绑定方法时候</code>  <code>apply(that,</code> 建议改为 <code>apply(that||window,</code>，其实不改也可以，因为不传默认指向window</p>
<ul><li><p>使用<code>new</code>实例化被绑定的方法</p></li></ul>
<p><code>容易糊涂，重点在于弄清楚标准的bind方法在new的时候做的事情，然后就可以清晰的实现</code></p>
<p>这里我们需要看看 <code>new</code> 这个方法做了哪些操作  比如说  <code>var  a  = new  b()</code></p>
<ol>
<li><p>创建一个空对象 <code>a = {}</code>，并且<code>this</code>变量引用指向到这个空对象<code>a</code></p></li>
<li><p>继承被实例化函数的原型 ：<code>a.__proto__ = b.prototype</code></p></li>
<li><p>被实例化方法<code>b</code>的<code>this</code>对象的属性和方法将被加入到这个新的 <code>this</code> 引用的对象中： <code>b</code>的属性和方法被加入的 <code>a</code>里面</p></li>
<li><p>新创建的对象由 <code>this</code> 所引用 ：<code>b.call(a)</code></p></li>
</ol>
<p>通过以上可以得知，如果是<code>var after_new =  new bindFun();</code> 由于这种行为是把原函数当成构造器，那么那么最终实例化之后的对象 <code>this</code>需要继承自原函数, 而这里的 <code>bindFun</code> 目前是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function(){
            return _this.apply(that || window,
                args.concat(Array.prototype.slice.apply(arguments,[0]))
            )
        }    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">return</span> _this.apply(that || <span class="hljs-built_in">window</span>,
                args.concat(<span class="hljs-built_in">Array</span>.prototype.slice.apply(<span class="hljs-built_in">arguments</span>,[<span class="hljs-number">0</span>]))
            )
        }    </code></pre>
<p>这里<code>apply</code>的作用域是绑定的<code>that || window</code>，在执行 <code>testBind()</code>的时候就已经固定，并没有把原函数的this对象继承过来，不符合我们的要求，我们需要根据apply的特性解决这个问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="在一个子构造函数中，你可以通过调用父构造函数的 `apply/call` 方法来实现继承

例如

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code>在一个子构造函数中，你可以通过调用父构造函数的 `apply/call` 方法来实现继承

例如

</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Product(name, price) {
  this.name = name;
  this.price = price;

  if (price < 0) {
    throw RangeError('Cannot create product ' +
                      this.name + ' with a negative price');
  }
}

function Food(name, price) {
  Product.call(this, name, price); 
  this.category = 'food';
}

//等同于（其实就是把Product放在Food内部执行了一次）
function Food(name, price) { 
    this.name = name;
    this.price = price;
    if (price < 0) {
        throw RangeError('Cannot create product ' +
                this.name + ' with a negative price');
    }

    this.category = 'food'; 
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Product</span>(<span class="hljs-params">name, price</span>) </span>{
  <span class="hljs-keyword">this</span>.name = name;
  <span class="hljs-keyword">this</span>.price = price;

  <span class="hljs-keyword">if</span> (price &lt; <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-built_in">RangeError</span>(<span class="hljs-string">'Cannot create product '</span> +
                      <span class="hljs-keyword">this</span>.name + <span class="hljs-string">' with a negative price'</span>);
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Food</span>(<span class="hljs-params">name, price</span>) </span>{
  Product.call(<span class="hljs-keyword">this</span>, name, price); 
  <span class="hljs-keyword">this</span>.category = <span class="hljs-string">'food'</span>;
}

<span class="hljs-comment">//等同于（其实就是把Product放在Food内部执行了一次）</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Food</span>(<span class="hljs-params">name, price</span>) </span>{ 
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.price = price;
    <span class="hljs-keyword">if</span> (price &lt; <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-built_in">RangeError</span>(<span class="hljs-string">'Cannot create product '</span> +
                <span class="hljs-keyword">this</span>.name + <span class="hljs-string">' with a negative price'</span>);
    }

    <span class="hljs-keyword">this</span>.category = <span class="hljs-string">'food'</span>; 
}
</code></pre>
<p>所以在<code>new</code>新的实例的时候实时将这个新的<code>this</code>对象 进行 <code>apply</code> 继承原函数的 <code>this</code> 对象，就可以达到  <code>new</code> 方法里面的第 3 步的结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="apply(that||window,
//修改为 如果是new的情况，需要绑定new之后的作用域，this指向新的实例对象
apply(isNew ?　this : that||window,  ==>

Function.prototype.testBind = function(that){
    var _this = this,
        slice = Array.prototype.slice,
        args = slice.apply(arguments,[1]),
        fNOP = function () {},
        //所以调用官方bind方法之后 有一个name属性值为 'bound '
        bound = function(){
            return _this.apply(isNew ?　this : that||window,
                args.concat(Array.prototype.slice.apply(arguments,[0]))
            )
        }    

    fNOP.prototype = _this.prototype;

    bound.prototype = new fNOP();

    return bound;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>apply(that||<span class="hljs-built_in">window</span>,
<span class="hljs-comment">//修改为 如果是new的情况，需要绑定new之后的作用域，this指向新的实例对象</span>
apply(isNew ?　<span class="hljs-keyword">this</span> : that||<span class="hljs-built_in">window</span>,  ==&gt;

<span class="hljs-built_in">Function</span>.prototype.testBind = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">that</span>)</span>{
    <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>,
        slice = <span class="hljs-built_in">Array</span>.prototype.slice,
        args = slice.apply(<span class="hljs-built_in">arguments</span>,[<span class="hljs-number">1</span>]),
        fNOP = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{},
        <span class="hljs-comment">//所以调用官方bind方法之后 有一个name属性值为 'bound '</span>
        bound = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">return</span> _this.apply(isNew ?　<span class="hljs-keyword">this</span> : that||<span class="hljs-built_in">window</span>,
                args.concat(<span class="hljs-built_in">Array</span>.prototype.slice.apply(<span class="hljs-built_in">arguments</span>,[<span class="hljs-number">0</span>]))
            )
        }    

    fNOP.prototype = _this.prototype;

    bound.prototype = <span class="hljs-keyword">new</span> fNOP();

    <span class="hljs-keyword">return</span> bound;
}
</code></pre>
<p>这里的 <code>isNew</code> 是区分 <code>bindFun</code> 是直接调用还是被 <code>new</code> 之后再调用，通过原型链的继承关系可以知道，<br><code>bindFun</code> 属于 <code>after_new</code>的父类，所以 <code>after_new instanceof  bindFun 为 true,</code>同时<br><code>bindFun.prototype = new fNOP()</code> 原型继承; 所以 <code>fNOP</code> 也是 <code>after_new</code>的父类， <code>after_new instanceof  fNOP 为 true</code></p>
<h2 id="articleHeader8">最终结果</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.testBind = function(that){
        var _this = this,
            slice = Array.prototype.slice,
            args = slice.apply(arguments,[1]),
            fNOP = function () {},
            bound = function(){
                //这里的this指的是调用时候的环境
                return _this.apply(this instanceof  fNOP ?　this : that||window,
                    args.concat(Array.prototype.slice.apply(arguments,[0]))
                )
            }    
        fNOP.prototype = _this.prototype;
    
        bound.prototype = new fNOP();
    
        return bound;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Function</span>.prototype.testBind = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">that</span>)</span>{
        <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>,
            slice = <span class="hljs-built_in">Array</span>.prototype.slice,
            args = slice.apply(<span class="hljs-built_in">arguments</span>,[<span class="hljs-number">1</span>]),
            fNOP = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{},
            bound = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                <span class="hljs-comment">//这里的this指的是调用时候的环境</span>
                <span class="hljs-keyword">return</span> _this.apply(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span>  fNOP ?　<span class="hljs-keyword">this</span> : that||<span class="hljs-built_in">window</span>,
                    args.concat(<span class="hljs-built_in">Array</span>.prototype.slice.apply(<span class="hljs-built_in">arguments</span>,[<span class="hljs-number">0</span>]))
                )
            }    
        fNOP.prototype = _this.prototype;
    
        bound.prototype = <span class="hljs-keyword">new</span> fNOP();
    
        <span class="hljs-keyword">return</span> bound;
    }</code></pre>
<p>我看到有些地方写的是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this instanceof fNOP &amp;&amp; that ? this : that || window," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> fNOP &amp;&amp; <span class="hljs-literal">that</span> ? <span class="hljs-keyword">this</span> : <span class="hljs-literal">that</span> || <span class="hljs-built_in">window</span>,</code></pre>
<p>我个人觉得这里有点不正确，如果绑定时候不传参数，那么<code>that</code>就为空，那无论怎样就只能绑定 window作用域了。</p>
<p>以上是个人见解，不对的地方望指导，谢谢！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript原生一步步实现bind分析

## 原文链接
[https://segmentfault.com/a/1190000007342882](https://segmentfault.com/a/1190000007342882)

