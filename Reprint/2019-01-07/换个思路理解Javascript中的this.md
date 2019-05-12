---
title: '换个思路理解Javascript中的this' 
date: 2019-01-07 2:30:11
hidden: true
slug: nmj8sm4ty0q
categories: [reprint]
---

{{< raw >}}

                    
<p>在网上很多文章都对 <strong>Javascript</strong> 中的 <strong>this</strong> 做了详细的介绍，但大多是介绍各个绑定方式或调用方式下 <strong>this</strong> 的指向，于是我想有一个统一的思路来更好理解 <strong>this</strong> 指向，使大家更好判断，以下有部分内容不是原理，而是一种解题思路。</p>
<h2 id="articleHeader0">从call方法开始</h2>
<blockquote><p><strong>call</strong> 方法允许切换函数执行的上下文环境（<strong>context</strong>），即 <strong>this</strong> 绑定的对象。</p></blockquote>
<p>大多数介绍 <strong>this</strong> 的文章中都会把 <strong>call</strong> 方法放到最后介绍，但此文我们要把 <strong>call</strong> 方法放在第一位介绍，并从 <strong>call</strong> 方法切入来研究 <strong>this</strong> ，因为 <strong>call</strong> 函数是显式绑定 <strong>this</strong> 的指向，我们来看看它如何模拟实现（不考虑传入 <strong>null</strong> 、 <strong>undefined</strong> 和原始值）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.call = function(thisArg) {
    var context = thisArg;
    var arr = [];
    var result;

    context.fn = this;

    for (let i = 1, len = arguments.length; i < len; i++) {
        arr.push('arguments[' + i + ']');
    }

    result = eval(&quot;context.fn(&quot; + arr + &quot;)&quot;);

    delete context.fn;

    return result;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Function</span>.prototype.call = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">thisArg</span>) </span>{
    <span class="hljs-keyword">var</span> context = thisArg;
    <span class="hljs-keyword">var</span> arr = [];
    <span class="hljs-keyword">var</span> result;

    context.fn = <span class="hljs-keyword">this</span>;

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">1</span>, len = <span class="hljs-built_in">arguments</span>.length; i &lt; len; i++) {
        arr.push(<span class="hljs-string">'arguments['</span> + i + <span class="hljs-string">']'</span>);
    }

    result = <span class="hljs-built_in">eval</span>(<span class="hljs-string">"context.fn("</span> + arr + <span class="hljs-string">")"</span>);

    <span class="hljs-keyword">delete</span> context.fn;

    <span class="hljs-keyword">return</span> result;
}</code></pre>
<p>从以上代码我们可以看到，把调用 <strong>call</strong> 方法的函数作为第一个参数对象的方法，此时相当于把第一个参数对象作为函数执行的上下文环境，而 <strong>this</strong> 是指向函数执行的上下文环境的，因此 <strong>this</strong> 就指向了第一个参数对象，实现了 <strong>call</strong> 方法切换函数执行上下文环境的功能。</p>
<h2 id="articleHeader1">对象方法中的this</h2>
<p>在模拟 <strong>call</strong> 方法的时候，我们使用了对象方法来改变 <strong>this</strong> 的指向。调用对象中的方法时，会把对象作为方法的上下文环境来调用。</p>
<p>既然 <strong>this</strong> 是指向执行函数的上下文环境的，那我们先来研究一下调用函数时的执行上下文情况。</p>
<p>下面我门来看看调用对象方法时执行上下文是如何的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = {
    x : 1,
    getX: function(){
        console.log(this.x);
    }
}
foo.getX();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> foo = {
    <span class="hljs-attr">x</span> : <span class="hljs-number">1</span>,
    <span class="hljs-attr">getX</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.x);
    }
}
foo.getX();</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010328757" src="https://static.alili.tech/img/remote/1460000010328757" alt="object-method" title="object-method" style="cursor: pointer;"></span></p>
<p>从上图中，我们可以看出<code>getX</code>方法的调用者的上下文是<code>foo</code>，因此<code>getX</code>方法中的 <strong>this</strong> 指向调用者上下文<code>foo</code>，转换成 <strong>call</strong> 方法为<code>foo.getX.call(foo)</code>。</p>
<p>下面我们把其他函数的调用方式都按调用对象方法的思路来转换。</p>
<h2 id="articleHeader2">构造函数中的this</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Foo(){
    this.x = 1;
    this.getX = function(){
        console.log(this.x);
    }
}
var foo = new Foo();
foo.getX();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Foo</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.x = <span class="hljs-number">1</span>;
    <span class="hljs-keyword">this</span>.getX = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.x);
    }
}
<span class="hljs-keyword">var</span> foo = <span class="hljs-keyword">new</span> Foo();
foo.getX();</code></pre>
<p>执行 <strong>new</strong> 如果不考虑原型链，只考虑上下文的切换，就相当于先创建一个空的对象，然后把这个空的对象作为构造函数的上下文，再去执行构造函数，最后返回这个对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var newMethod = function(func){
    var context = {};
    func.call(context);
    return context;
}
function Foo(){
    this.x = 1;
    this.getX = function(){
        console.log(this.x);
    }
}
var foo = newMethod(Foo);
foo.getX();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Method</span> = <span class="hljs-function"><span class="hljs-keyword">function</span></span>(func){
    <span class="hljs-keyword">var</span> context = {};
    func.call(context);
    <span class="hljs-keyword">return</span> context;
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Foo</span></span>(){
    <span class="hljs-built_in">this</span>.x = <span class="hljs-number">1</span>;
    <span class="hljs-built_in">this</span>.getX = <span class="hljs-function"><span class="hljs-keyword">function</span></span>(){
        console.log(<span class="hljs-built_in">this</span>.x);
    }
}
<span class="hljs-keyword">var</span> foo = <span class="hljs-keyword">new</span><span class="hljs-type">Method</span>(Foo);
foo.getX();</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010328758" src="https://static.alili.tech/img/remote/1460000010328758" alt="creater-method" title="creater-method" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">DOM事件处理函数中的this</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="DOMElement.addEventListener('click', function(){
    console.log(this);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>DOMElement.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
});</code></pre>
<p>把函数绑定到DOM事件时，可以当作在DOM上增加一个函数方法，当触发这个事件时调用DOM上对应的事件方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="DOMElement.clickHandle = function(){
    console.log(this);
}
DOMElement.clickHandle();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>DOMElement.clickHandle = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
}
DOMElement.clickHandle();</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010328759" src="https://static.alili.tech/img/remote/1460000010328759" alt="domelement-method" title="domelement-method" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">普通函数中的this</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = 1;
function getX(){
    console.log(this.x);
}
getX();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> x = <span class="hljs-number">1</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getX</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.x);
}
getX();</code></pre>
<p>这种情况下，我们创建一个虚拟上下文对象，然后普通函数作为这个虚拟上下文对象的方法调用，此时普通函数中的<strong>this</strong>就指向了这个虚拟上下文。</p>
<blockquote><p>那这个虚拟上下文是什么呢？在非严格模式下是全局上下文，浏览器里是 <strong>window</strong> ，NodeJs里是 <strong>Global</strong> ；在严格模式下是 <strong>undefined</strong> 。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = 1;
function getX(){
    console.log(this.x);
}

[viturl context].getX = getX;
[viturl context].getX();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> x = <span class="hljs-number">1</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getX</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.x);
}

[viturl context].getX = getX;
[viturl context].getX();</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010328760" src="https://static.alili.tech/img/remote/1460000010328760" alt="normal-function" title="normal-function" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">闭包中的this</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = 1;
var foo = {
    x: 2,
    y: 3,
    getXY: function(){
        (function(){
            console.log(&quot;x：&quot; + this.x);
            console.log(&quot;y：&quot; + this.y); 
        })();
    }
}
foo.getXY();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> x = <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> foo = {
    <span class="hljs-attr">x</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">y</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">getXY</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"x："</span> + <span class="hljs-keyword">this</span>.x);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"y："</span> + <span class="hljs-keyword">this</span>.y); 
        })();
    }
}
foo.getXY();</code></pre>
<p>这段代码的上下文如下图：<br><span class="img-wrap"><img data-src="/img/remote/1460000010328761" src="https://static.alili.tech/img/remote/1460000010328761" alt="closure-function1" title="closure-function1" style="cursor: pointer;"></span></p>
<p>这里需要注意的是，我们再研究函数中的 <strong>this</strong> 指向时，只需要关注 <strong>this</strong> 所在的函数是如何调用的， <strong>this</strong> 所在函数外的函数调用都是浮云，是不需要关注的。因此在所有的图示中，我们只需要关注红色框中的内容。</p>
<p>因此这段代码我们关注的部分只有:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(){
    console.log(this.x);
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>(<span class="hljs-name">function</span>(){
    console.log(<span class="hljs-name">this.x</span>)<span class="hljs-comment">;</span>
})()<span class="hljs-comment">;</span></code></pre>
<p>与普通函数调用一样，创建一个虚拟上下文对象，然后普通函数作为这个虚拟上下文对象的方法立即调用，匿名函数中的 <strong>this</strong> 也就指向了这个虚拟上下文。<br><span class="img-wrap"><img data-src="/img/remote/1460000010328762" src="https://static.alili.tech/img/remote/1460000010328762" alt="closure-function2" title="closure-function2" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">参数中的this</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = 1;
var foo = {
    x: 2,
    getX: function(){
        console.log(this.x);
    }
}
setTimeout(foo.getX, 1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> x = <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> foo = {
    <span class="hljs-attr">x</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">getX</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.x);
    }
}
setTimeout(foo.getX, <span class="hljs-number">1000</span>);</code></pre>
<p>函数参数是值传递的，因此上面代码等同于以下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var getX = function(){
    console.log(this.x);
};
setTimeout(getX, 1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> getX = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.x);
};
setTimeout(getX, <span class="hljs-number">1000</span>);</code></pre>
<p>然后我们又回到了普通函数调用的问题。</p>
<h2 id="articleHeader7">全局中的this</h2>
<p>全局中的 <strong>this</strong> 指向全局的上下文</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = 1;
console.log(this.x);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> x = <span class="hljs-number">1</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.x);</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010328763" src="https://static.alili.tech/img/remote/1460000010328763" alt="global-this" title="global-this" style="cursor: pointer;"></span></p>
<h2 id="articleHeader8">复杂情况下的this</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = 1;
var a = {
    x: 2,
    b: function(){
        return function(){
            return function foo(){
                console.log(this.x);
            }        
        }
    }
};

(function(){
    var x = 3;
    a.b()()();
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> x = <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> a = {
    <span class="hljs-attr">x</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">b</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.x);
            }        
        }
    }
};

(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> x = <span class="hljs-number">3</span>;
    a.b()()();
})();</code></pre>
<p>看到上面的情况是有很多个函数，但我们只需要关注 <strong>this</strong> 所在函数的调用方式，首先我们来简化一下如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = 1;
(function(){
    var x = 3;
    var foo = function(){
        console.log(this.x);
    }
    foo();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> x = <span class="hljs-number">1</span>;
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> x = <span class="hljs-number">3</span>;
    <span class="hljs-keyword">var</span> foo = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.x);
    }
    foo();
});</code></pre>
<p><strong>this</strong> 所在的函数 <strong>foo</strong> 是个普通函数，我们创建一个虚拟上下文对象，然后普通函数作为这个虚拟上下文对象的方法立即调用。因此这个 <strong>this</strong>指向了这个虚拟上下文。在非严格模式下是全局上下文，浏览器里是 <strong>window</strong> ，NodeJs里是 <strong>Global</strong> ；在严格模式下是 <strong>undefined</strong> 。</p>
<h2 id="articleHeader9">总结</h2>
<p>在需要判断 <strong>this</strong> 的指向时，我们可以安装这种思路来理解：</p>
<ul>
<li><p>判断 <strong>this</strong> 在全局中OR函数中，若在全局中则 <strong>this</strong> 指向全局，若在函数中则只关注这个函数并继续判断。</p></li>
<li><p>判断 <strong>this</strong> 所在函数是否作为对象方法调用，若是则 <strong>this</strong> 指向这个对象，否则继续操作。</p></li>
<li><p>创建一个虚拟上下文，并把<strong>this</strong>所在函数作为这个虚拟上下文的方法，此时 <strong>this</strong> 指向这个虚拟上下文。</p></li>
<li><p>在非严格模式下虚拟上下文是全局上下文，浏览器里是 <strong>window</strong> ，Node.js里是 <strong>Global</strong> ；在严格模式下是 <strong>undefined</strong> 。</p></li>
</ul>
<p>图示如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000010328764" src="https://static.alili.tech/img/remote/1460000010328764" alt="judge-this" title="judge-this" style="cursor: pointer;"></span></p>
<blockquote>
<p>欢迎关注：<a href="https://segmentfault.com/u/leechikit/articles">Leechikit</a><br>原文链接：<a href="https://segmentfault.com/a/1190000010328752" target="_blank">segmentfault.com</a></p>
<p>到此本文结束，欢迎提问和指正。<br>写原创文章不易，若本文对你有帮助，请点赞、推荐和关注作者支持。</p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
换个思路理解Javascript中的this

## 原文链接
[https://segmentfault.com/a/1190000010328752](https://segmentfault.com/a/1190000010328752)

