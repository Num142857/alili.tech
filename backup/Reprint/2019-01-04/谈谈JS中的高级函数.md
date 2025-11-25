---
title: '谈谈JS中的高级函数' 
date: 2019-01-04 2:30:10
hidden: true
slug: ji9r6ad255
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>博客原文地址：<a href="https://claiyre.github.io/" rel="nofollow noreferrer" target="_blank">Claiyre的个人博客</a><br>如需转载，请在文章开头注明原文地址</p></blockquote>
<p>在JavaScript中，函数的功能十分强大。它们是第一类对象，也可以作为另一个对象的方法，还可以作为参数传入另一个函数，不仅如此，还能被一个函数返回！可以说，在JS中，函数无处不在，无所不能，堪比孙猴子呀！当你运用好函数时，它能助你取西经，让代码变得优雅简洁，运用不好时，那就遭殃了，要大闹天宫咯~<br>除了函数相关的基础知识外，掌握一些高级函数并应用起来，不仅能让JS代码看起来更为精简，还可以提升性能。以下是博主总结的一些常用的、重要的高级函数，加上了一些个人见解，特此记录下来。如果您是JS初学者，也不要被“高级”两个字吓到，因为文中穿插讲解了一些原型、this等基础知识，相信并不难理解。如果您是JS大牛，也可以把本文用来查漏补缺。</p>
<h1 id="articleHeader0">正文</h1>
<h3 id="articleHeader1">作用域安全的构造函数</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name,age){
    this.name = name;
    this.age = age;
}
var p1 = new Person(&quot;Claiyre&quot;,80);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span><span class="hljs-params">(name,age)</span></span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.age = age;
}
<span class="hljs-keyword">var</span> p1 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"Claiyre"</span>,<span class="hljs-number">80</span>);</code></pre>
<p>相信您对上面的构造函数一定不陌生，但是，，如果某个粗心的程序猿调用这个构造函数时忘记加<code>new</code>了会发生什么？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p3 = Person(&quot;Tom&quot;,30);
console.log(p3);              //undefined
console.log(window.name);     //Tom" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> p3 = Person(<span class="hljs-string">"Tom"</span>,<span class="hljs-number">30</span>);
<span class="hljs-built_in">console</span>.log(p3);              <span class="hljs-comment">//undefined</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">window</span>.name);     <span class="hljs-comment">//Tom</span></code></pre>
<p>由于使用了不安全的构造函数，上面的代码意外的改变了window的name，因为<code>this</code>对象是在运行时绑定的，使用new调用构造函数时<code>this</code>是指向新创建的对象的，不使用<code>new</code>时，<code>this</code>是指向window的。<br>由于window的name属性是用来识别链接目标和frame的，所在这里对该属性的偶然覆盖可能导致其他错误。</p>
<p>作用域安全的构造函数会首先确认<code>this</code>对象是正确类型的实例，然后再进行更改，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name,age){
    if(this instanceof Person){
        this.name = name;
        this.age = age;
    } else {
        return new Person(name,age);
    }    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span><span class="hljs-params">(name,age)</span></span>{
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> Person){
        <span class="hljs-keyword">this</span>.name = name;
        <span class="hljs-keyword">this</span>.age = age;
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Person(name,age);
    }    
}</code></pre>
<p>这样就避免了在全局对象上意外更改或设置属性。<br>实现这个安全模式，相当于锁定了调用构造函数的环境，因此借用构造函数继承模式可能会出现问题，解决方法是组合使用原型链和构造函数模式，即组合继承。<br>如果您是一个JS库或框架的开发者，相信作用域安全的构造函数一定对您非常有用。在多人协作的项目中，为了避免他们误改了全局对象，也应使用作用域安全的构造函数。</p>
<h3 id="articleHeader2">惰性载入函数</h3>
<p>由于浏览器间的行为差异，代码中可能会有许多检测浏览器行为的if语句。但用户的浏览器若支持某一特性，便会一直支持，所以这些if语句，只用被执行一次，即便只有一个if语句的代码，也比没有要快。<br>惰性载入表示函数执行的分支仅会执行一次，有两种实现惰性载入的方式，第一种就是在函数第一次被调用时再处理函数，用检测到的结果重写原函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function detection(){
    if(//支持某特性){
        detection = function(){
            //直接用支持的特性
        }
    } else if(//支持第二种特性){
        detection = function(){
            //用第二种特性
        }
    } else {
        detection = function(){
            //用其他解决方案
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">detection</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">if</span>(<span class="hljs-comment">//支持某特性){</span>
        detection = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            <span class="hljs-comment">//直接用支持的特性</span>
        }
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-comment">//支持第二种特性){</span>
        detection = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            <span class="hljs-comment">//用第二种特性</span>
        }
    } <span class="hljs-keyword">else</span> {
        detection = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            <span class="hljs-comment">//用其他解决方案</span>
        }
    }
}</code></pre>
<p>第二种实现惰性载入的方式是在声明函数时就指定适当的函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var detection = (function(){
    if(//支持某特性){
        return function(){
            //直接用支持的特性
        }
    } else if(//支持第二种特性){
        return function(){
            //用第二种特性
        }
    } else {
        return function(){
            //用其他解决方案
        }
    } 
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> detection = (<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">if</span>(<span class="hljs-comment">//支持某特性){</span>
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            <span class="hljs-comment">//直接用支持的特性</span>
        }
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-comment">//支持第二种特性){</span>
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            <span class="hljs-comment">//用第二种特性</span>
        }
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            <span class="hljs-comment">//用其他解决方案</span>
        }
    } 
})();</code></pre>
<p>惰性载入函数的有点是在只初次执行时牺牲一点性能，之后便不会再有多余的消耗性能。</p>
<h3 id="articleHeader3">函数绑定作用域</h3>
<p>在JS中，函数的作用域是在函数被调用时动态绑定的，也就是说函数的this对象的指向是不定的，但在一些情况下，我们需要让某一函数的执行作用域固定，总是指向某一对象。这时怎么办呢？<br>当当当~~可以用函数绑定作用域函数呀</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function bind(fn,context){
    return function(){
        return fn.apply(context,arguments);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bind</span>(<span class="hljs-params">fn,context</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> fn.apply(context,<span class="hljs-built_in">arguments</span>);
    }
}</code></pre>
<p>用法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var person1 = {
    name: &quot;claiyre&quot;,
    sayName: function(){
        alert(this.name);
    }
}
var sayPerson1Name = bind(person1.sayName,person1);
sayPerson1Name();  //claiyre" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> person1 = {
    name: <span class="hljs-string">"claiyre"</span>,
    sayName: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        alert(<span class="hljs-keyword">this</span>.name);
    }
}
<span class="hljs-keyword">var</span> sayPerson1Name = bind(person1.sayName,person1);
sayPerson1Name();  <span class="hljs-comment">//claiyre</span></code></pre>
<p><code>call</code>函数和<code>apply</code>函数可以临时改变函数的作用域，使用bind函数可以得到一个绑定了作用域的函数</p>
<h3 id="articleHeader4">函数柯里化(curry)</h3>
<p>curry的概念很简单：只传递部分参数来调用函数，然后让函数返回另一个函数去处理剩下的参数。可以理解为赋予了函数“加载”的能力。<br>许多js库中都封装了curry函数，具体使用可以这样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var match = curry(function(what,str){
    return str.match(what)
});    

var hasNumber = match(/[0-9]+/g);
var hasSpace = match(/\s+/g)

hasNumber(&quot;123asd&quot;);       //['123']
hasNumber(&quot;hello world!&quot;);  //null

hasSpace(&quot;hello world!&quot;);  //[' '];
hasSpace(&quot;hello&quot;);         //null

console.log(match(/\s+/g,'i am  Claiyre'));  //直接全部传参也可： [' ','  ']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> match = curry(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">what,str</span>)</span>{
    <span class="hljs-keyword">return</span> str.match(what)
});    

<span class="hljs-keyword">var</span> hasNumber = match(<span class="hljs-regexp">/[0-9]+/g</span>);
<span class="hljs-keyword">var</span> hasSpace = match(<span class="hljs-regexp">/\s+/g</span>)

hasNumber(<span class="hljs-string">"123asd"</span>);       <span class="hljs-comment">//['123']</span>
hasNumber(<span class="hljs-string">"hello world!"</span>);  <span class="hljs-comment">//null</span>

hasSpace(<span class="hljs-string">"hello world!"</span>);  <span class="hljs-comment">//[' '];</span>
hasSpace(<span class="hljs-string">"hello"</span>);         <span class="hljs-comment">//null</span>

<span class="hljs-built_in">console</span>.log(match(<span class="hljs-regexp">/\s+/g</span>,<span class="hljs-string">'i am  Claiyre'</span>));  <span class="hljs-comment">//直接全部传参也可： [' ','  ']</span></code></pre>
<p>一旦函数经过柯里化，我们就可以先传递部分参数调用它，然后得到一个更具体的函数。这个更具体的函数通过闭包帮我们记住了第一次传递的参数，最后我们就可以用这个更具体的函数为所欲为啦~</p>
<p>一个较为简单的实现curry的方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function curry(fn){
    var i = 0;
    var outer = Array.prototype.slice.call(arguments,1);
    var len = fn.length;
    return function(){
        var inner = outer.concat(Array.prototype.slice.call(arguments));
        return inner.length === len?fn.apply(null,inner):function (){
                var finalArgs = inner.concat(Array.prototype.slice.call(arguments));
                return fn.apply(null,finalArgs);
            }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">curry</span>(<span class="hljs-params">fn</span>)</span>{
    <span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> outer = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>,<span class="hljs-number">1</span>);
    <span class="hljs-keyword">var</span> len = fn.length;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> inner = outer.concat(<span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>));
        <span class="hljs-keyword">return</span> inner.length === len?fn.apply(<span class="hljs-literal">null</span>,inner):<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
                <span class="hljs-keyword">var</span> finalArgs = inner.concat(<span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>));
                <span class="hljs-keyword">return</span> fn.apply(<span class="hljs-literal">null</span>,finalArgs);
            }
    }
}</code></pre>
<h3 id="articleHeader5">debounce函数</h3>
<p>debounce函数，又称“去抖函数”。它的功能也很简单直接，就是防止某一函数被连续调用，从而导致浏览器卡死或崩溃。用法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var myFunc = debounce(function(){
    //繁重、耗性能的操作
}，250);
window.addEventListener('resize',myFunc);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> myFunc = debounce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">//繁重、耗性能的操作</span>
}，<span class="hljs-number">250</span>);
<span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'resize'</span>,myFunc);</code></pre>
<p>像窗口的resize，这类可以以较高的速率触发的事件，非常适合用去抖函数，这时也可称作“函数节流”，避免给浏览器带来过大的性能负担。<br>具体的实现时，当函数被调用时，不立即执行相应的语句，而是等待固定的时间w,若在w时间内，即等待还未结束时，函数又被调用了一次，则再等待w时间，重复上述过程，直到最后一次被调用后的w时间内该函数都没有被再调用，则执行相应的代码。<br>实现代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function debounce(fn,wait){
    var td;
    return function(){
        clearTimeout(td);
        td= setTimeout(fn,wait);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">debounce</span><span class="hljs-params">(fn,wait)</span></span>{
    <span class="hljs-keyword">var</span> td;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        clearTimeout(td);
        td= setTimeout(fn,wait);
    }
}</code></pre>
<h3 id="articleHeader6">once函数</h3>
<p>顾名思义，once函数是仅仅会被执行一次的函数。具体实现如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function once(fn){
    var result;
    return function(){
        if(fn){
            result = fn(arguments);
            fn = null;
        }
        return result;
    }
}

var init = once(function(){
    //初始化操作
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">once</span>(<span class="hljs-params">fn</span>)</span>{
    <span class="hljs-keyword">var</span> result;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">if</span>(fn){
            result = fn(<span class="hljs-built_in">arguments</span>);
            fn = <span class="hljs-literal">null</span>;
        }
        <span class="hljs-keyword">return</span> result;
    }
}

<span class="hljs-keyword">var</span> init = once(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">//初始化操作</span>
})</code></pre>
<p>在被执行过一次后,参数fn就被赋值null了，那么在接下来被调用时，便再也不会进入到if语句中了，也就是第一次被调用后，该函数永远不会被执行了。</p>
<p>还可以对上述once函数进行改进，不仅可以传入函数，同时还可以给传入的函数绑定作用域u，同时实现了bind和once。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function once(fn,context){
    var result;
    return function(){
        if(fn){
            result = fn.apply(context,arguments);
            fn = null;
        }
        return result;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">once</span>(<span class="hljs-params">fn,context</span>)</span>{
    <span class="hljs-keyword">var</span> result;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">if</span>(fn){
            result = fn.apply(context,<span class="hljs-built_in">arguments</span>);
            fn = <span class="hljs-literal">null</span>;
        }
        <span class="hljs-keyword">return</span> result;
    }
}</code></pre>
<h1 id="articleHeader7">结语</h1>
<p>通过以上的阅读，不难发现很多“高级函数”的实现其实并不复杂，数十行代码便可搞定，但重要的是能真正理解它们的原理，在实际中适时地应用，以此性能提升，让代码简洁，逻辑清晰</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
谈谈JS中的高级函数

## 原文链接
[https://segmentfault.com/a/1190000010656110](https://segmentfault.com/a/1190000010656110)

