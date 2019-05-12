---
title: 'call、apply和 bind的简单使用方法' 
date: 2019-01-09 2:30:12
hidden: true
slug: f6n3fu7zbt
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>- <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call" rel="nofollow noreferrer" target="_blank">call</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply" rel="nofollow noreferrer" target="_blank">apply</a>:</strong><br>在 javascript 中，call 和 apply 都是为了改变某个函数运行时的上下文（context）而存在的，换句话说，就是为了改变函数体内部 this 的指向。</p>
<p>JavaScript 的一大特点是，函数存在「定义时上下文」和「运行时上下文」以及「上下文是可以改变的」这样的概念。</p>
<p>call可以传递一个thisArgs参数和一个参数列表，thisArgs 指定了函数在运行期的调用者，也就是函数中的 this 对象，而参数列表会被传入调用函数中。thisArgs 的取值有以下4种情况：<br>（1） 不传，或者传null,undefined， 函数中的 this 指向 window 对象<br>（2） 传递另一个函数的函数名，函数中的 this 指向这个函数的引用<br>（3） 传递字符串、数值或布尔类型等基础类型，函数中的 this 指向其对应的包装对象，如 String、Number、Boolean<br>（4） 传递一个对象，函数中的 this 指向这个对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function a() {
    console.log(this); //输出函数a中的this对象
}
function b() {} //定义函数b

var obj = {
    name: 'hehe'
}; //定义对象obj

a.call(); //window
a.call(null); //window
a.call(undefined); //window
a.call(1); //Number
a.call(''); //String
a.call(true); //Boolean
a.call(b); // function b(){}
a.call(obj); //Object" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>); <span class="hljs-comment">//输出函数a中的this对象</span>
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">b</span>(<span class="hljs-params"></span>) </span>{} <span class="hljs-comment">//定义函数b</span>

<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'hehe'</span>
}; <span class="hljs-comment">//定义对象obj</span>

a.call(); <span class="hljs-comment">//window</span>
a.call(<span class="hljs-literal">null</span>); <span class="hljs-comment">//window</span>
a.call(<span class="hljs-literal">undefined</span>); <span class="hljs-comment">//window</span>
a.call(<span class="hljs-number">1</span>); <span class="hljs-comment">//Number</span>
a.call(<span class="hljs-string">''</span>); <span class="hljs-comment">//String</span>
a.call(<span class="hljs-literal">true</span>); <span class="hljs-comment">//Boolean</span>
a.call(b); <span class="hljs-comment">// function b(){}</span>
a.call(obj); <span class="hljs-comment">//Object</span></code></pre>
<p>这是call 的核心功能，它允许你在一个对象上调用该对象没有定义的方法，并且这个方法可以访问该对象中的属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function animals() {}
animals.prototype = {
    type: &quot;dog&quot;,
    say: function() {
         console.log(&quot;I am a &quot; + this.type);
    }
}
var dog = new animals();
dog.say();    //I am a dog
var cat = {type:'cat'};
dog.say.call(cat); //I am a cat" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">animals</span>(<span class="hljs-params"></span>) </span>{}
animals.prototype = {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"dog"</span>,
    <span class="hljs-attr">say</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
         <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"I am a "</span> + <span class="hljs-keyword">this</span>.type);
    }
}
<span class="hljs-keyword">var</span> dog = <span class="hljs-keyword">new</span> animals();
dog.say();    <span class="hljs-comment">//I am a dog</span>
<span class="hljs-keyword">var</span> cat = {<span class="hljs-attr">type</span>:<span class="hljs-string">'cat'</span>};
dog.say.call(cat); <span class="hljs-comment">//I am a cat</span></code></pre>
<p>因此，可以看出 call 和 apply 是为了动态改变 this 而出现的，当一个 object 没有某个方法（本栗子中cat没有say方法），但是其他的有（本栗子中dog有say方法），我们可以借助call或apply用其它对象的方法来操作。</p>
<p><strong>apply、call 的区别:</strong></p>
<p>对于 apply、call 二者而言，作用完全一样，只是接受参数的方式不太一样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="对象.函数名.call(thisArgs, arg1, arg2);
对象.函数名.apply(thisArgs, [arg1, arg2])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>对象.函数名<span class="hljs-selector-class">.call</span>(<span class="hljs-selector-tag">thisArgs</span>, <span class="hljs-selector-tag">arg1</span>, <span class="hljs-selector-tag">arg2</span>);
对象.函数名<span class="hljs-selector-class">.apply</span>(<span class="hljs-selector-tag">thisArgs</span>, <span class="hljs-selector-attr">[arg1, arg2]</span>)</code></pre>
<p>其中 this 是你想指定的上下文，他可以是任何一个 JavaScript 对象(JavaScript 中一切皆对象)，call 需要把参数按顺序传递进去，而 apply 则是把参数放在数组里。</p>
<p><strong>- <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind" rel="nofollow noreferrer" target="_blank">bind</a>:</strong><br>bind是ES5 新增的一个方法，它的传参和call类似，但又和 call/apply 有着显著的不同，即调用 call 或 apply 都会自动执行对应的函数，而 bind 不会执行对应的函数，只是返回了对函数的引用。</p>
<p>MDN的解释是：bind()方法会创建一个新函数，称为绑定函数，当调用这个绑定函数时，绑定函数会以创建它时传入 bind()方法的第一个参数作为 this，传入 bind() 方法的第二个以及以后的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    id : 1,
    eventBind: function(){
         var _this = this;
         $('.btn').on('click',function(event) {
              alert(this.id); //undefined
              alert(_this.id);  //1
        });
     }
}
obj.eventBind();//没有这句话，click事件不执行" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">var</span> obj = {
    <span class="hljs-attribute">id :</span><span class="hljs-string"> 1,
    eventBind</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
         <span class="hljs-built_in">var</span> _this = <span class="hljs-keyword">this</span>;
         $(<span class="hljs-string">'.btn'</span>).on(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
              alert(<span class="hljs-keyword">this</span>.id); <span class="hljs-comment">//undefined</span>
              alert(_this.id);  <span class="hljs-comment">//1</span>
        });
     }
}
obj.eventBind();<span class="hljs-comment">//没有这句话，click事件不执行</span></code></pre>
<p>由于 Javascript 特有的机制，上下文环境在 eventBind:function(){ } 过渡到 $('.btn').on('click',function(event) { }) 发生了改变，上述使用变量保存 this 这些方式都是有用的，也没有什么问题。当然使用 bind() 可以更加优雅的解决这个问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    id : 1,
    eventBind: function(){
         $('.btn').on('click',function(event) {
                  alert(this.id); //1
        }.bind(this));
    }
}
obj.eventBind();//没有这句话，click事件不执行" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">var</span> obj = {
    <span class="hljs-attribute">id :</span><span class="hljs-string"> 1,
    eventBind</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
         $(<span class="hljs-string">'.btn'</span>).on(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
                  alert(<span class="hljs-keyword">this</span>.id); <span class="hljs-comment">//1</span>
        }.bind(<span class="hljs-keyword">this</span>));
    }
}
obj.eventBind();<span class="hljs-comment">//没有这句话，click事件不执行</span></code></pre>
<p><strong>- call、apply和bind的区别：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    x: 88,
};
var foo = {
    getX: function() {
        return this.x;
    }
}
console.log(foo.getX.bind(obj)()); //88
console.log(foo.getX.call(obj)); //88
console.log(foo.getX.apply(obj)); //88" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">x</span>: <span class="hljs-number">88</span>,
};
<span class="hljs-keyword">var</span> foo = {
    <span class="hljs-attr">getX</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.x;
    }
}
<span class="hljs-built_in">console</span>.log(foo.getX.bind(obj)()); <span class="hljs-comment">//88</span>
<span class="hljs-built_in">console</span>.log(foo.getX.call(obj)); <span class="hljs-comment">//88</span>
<span class="hljs-built_in">console</span>.log(foo.getX.apply(obj)); <span class="hljs-comment">//88</span></code></pre>
<p>三个输出的都是88，但是注意使用 bind() 方法后面多了对括号。</p>
<p>也就是说，区别就是，当你希望改变上下文环境之后并非立即执行，而是回调执行的时候，使用 bind() 方法；而 apply/call 则会立即执行函数。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
call、apply和 bind的简单使用方法

## 原文链接
[https://segmentfault.com/a/1190000010072735](https://segmentfault.com/a/1190000010072735)

