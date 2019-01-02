---
title: 'Javascript中的柯里化' 
date: 2019-01-02 2:30:09
hidden: true
slug: v6989calpjm
categories: [reprint]
---

{{< raw >}}

                    
<p>柯里化，是函数式编程的一个重要概念。对于没接触过的人来说，会被一串串的小括号弄得摸不着头脑。但一旦理解了其中的含义和具体的使用场景，你一定会对它爱不释手。它既能减少代码冗余，也能增加可读性，可谓程序猿居家旅行，装逼撕逼必备之良药。</p>
<h4>什么是柯里化</h4>
<p>如果一个函数可以接收多个参数，将这个函数转化为每次只接收一部分参数的函数的多次调用形式，就是柯里化。文字上理解比较困难，先来看看下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(a, b, c) {
    return a + b + c;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params">a, b, c</span>) </span>{
    <span class="hljs-keyword">return</span> a + b + c;
}</code></pre>
<p>这个add函数接收3个参数，返回3个参数相加的结果。可以通过以下2种形式对其进行柯里化：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function addOne(a) {
    return function(b) {
        return function(c) {
            return a + b + c;
            }
        }
    }
}

function addTwo(a,b) {
    return function(c) {
        return a + b + c;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addOne</span>(<span class="hljs-params">a</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">b</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>) </span>{
            <span class="hljs-keyword">return</span> a + b + c;
            }
        }
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addTwo</span>(<span class="hljs-params">a,b</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>) </span>{
        <span class="hljs-keyword">return</span> a + b + c;
    }
}</code></pre>
<p>执行的时候，以下3种方式都会获得一样的结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="add(1, 2, 3);        // return 6
addOne(1)(2)(3);     // return 6
addTwo(1, 2)(3);     // return 6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">add(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>);        <span class="hljs-comment">// return 6</span>
addOne(<span class="hljs-number">1</span>)(<span class="hljs-number">2</span>)(<span class="hljs-number">3</span>);     <span class="hljs-comment">// return 6</span>
addTwo(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>)(<span class="hljs-number">3</span>);     <span class="hljs-comment">// return 6</span></code></pre>
<p>如果使用ES6语法，能更简洁的写出柯里化后的函数，以addOne为例:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const addOne = (a) => (b) => (c) => (a + b + c)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> addOne = <span class="hljs-function">(<span class="hljs-params">a</span>) =&gt;</span> (b) =&gt; <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> (a + b + c)</code></pre>
<p>上面的例子没有什么实际的意义，只是为了说明概念而已。在了解基本概念后，我们来聊聊实际的使用场景。</p>
<h4>使用场景1: 性能优化</h4>
<p>可以将一些模板代码通过柯里化的形式预先定义好，例如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var addEvent = function(el, type, fn, capture) {
    if (window.addEventListener) {
        el.addEventListener(type, function(e) {
            fn.call(el, e);
        }, capture);
    } else if (window.attachEvent) {
        el.attachEvent(&quot;on&quot; + type, function(e) {
            fn.call(el, e);
        });
    } 
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> addEvent = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el, type, fn, capture</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.addEventListener) {
        el.addEventListener(type, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
            fn.call(el, e);
        }, capture);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.attachEvent) {
        el.attachEvent(<span class="hljs-string">"on"</span> + type, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
            fn.call(el, e);
        });
    } 
};</code></pre>
<p>这段代码的作用就是根据浏览器的类型决定事件添加的方式。实际上if...else的判断只需要进行一次。将它柯里化后可以得到以下结果:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var addEvent = (function(){
    if (window.addEventListener) {
        return function(el, sType, fn, capture) {
            el.addEventListener(sType, function(e) {
                fn.call(el, e);
            }, (capture));
        };
    } else if (window.attachEvent) {
        return function(el, sType, fn, capture) {
            el.attachEvent(&quot;on&quot; + sType, function(e) {
                fn.call(el, e);
            });
        };
    }
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> addEvent = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.addEventListener) {
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el, sType, fn, capture</span>) </span>{
            el.addEventListener(sType, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
                fn.call(el, e);
            }, (capture));
        };
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.attachEvent) {
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el, sType, fn, capture</span>) </span>{
            el.attachEvent(<span class="hljs-string">"on"</span> + sType, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
                fn.call(el, e);
            });
        };
    }
})();</code></pre>
<h4>使用场景2: 代码复用</h4>
<p>在有回调函数的场景下，可以通过柯里化传入一些预设的值，排列组合后，达到代码复用的效果:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const match = (reg) => (str) => str.match(reg);
const hasSpace = match(/\s+/g);
const filter = (fn) => (arr) => arr.filter(fn);
const findSpace = filter(hasSpace);
let result = findSpace(['hi man', 'hi_man']);    //['hi man']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> match = <span class="hljs-function">(<span class="hljs-params">reg</span>) =&gt;</span> (str) =&gt; str.match(reg);
<span class="hljs-keyword">const</span> hasSpace = match(<span class="hljs-regexp">/\s+/g</span>);
<span class="hljs-keyword">const</span> filter = <span class="hljs-function">(<span class="hljs-params">fn</span>) =&gt;</span> (arr) =&gt; arr.filter(fn);
<span class="hljs-keyword">const</span> findSpace = filter(hasSpace);
<span class="hljs-keyword">let</span> result = findSpace([<span class="hljs-string">'hi man'</span>, <span class="hljs-string">'hi_man'</span>]);    <span class="hljs-comment">//['hi man']</span></code></pre>
<p>使用传统的方法实现以上效果，如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let result = ['hi man', 'hi_man'].filter( (item) => (item.match(/\s+/g)) );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> result = [<span class="hljs-string">'hi man'</span>, <span class="hljs-string">'hi_man'</span>].filter( <span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> (item.match(<span class="hljs-regexp">/\s+/g</span>)) );</code></pre>
<p>虽然传统的方法看起来代码量比较少，但如果在很多地方需要使用的时候，就体现出封装的威力了。而且，还可以为filter方法传入其它的条件生成各式各样的find工具函数！</p>
<h4>使用场景3: 使代码便于理解</h4>
<p>react-redux的connect方法，就是使用了柯里化增加代码的可读性:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let Container = connect(mapStateToProps, mapDispatchToProps)(Component);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> Container = connect(mapStateToProps, mapDispatchToProps)(Component);</code></pre>
<p>在这里，connect的作用就是将Component要用到的state切面和action注入到它的property中，达到展示型组件和容器组件分离的目的。如果将这个方法的定义改为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let Container = connect(mapStateToProps, mapDispatchToProps, Component);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> Container = connect(mapStateToProps, mapDispatchToProps, Component);</code></pre>
<p>就没那么好理解了。而且，mapStateToProps和mapDispatchToProps实际上也是可选参数，在不传它们的情况下传入Component会显得很恶心: connect(null, null, Component)。</p>
<h4>使用场景4: 扩展Javascript能力</h4>
<p>ES5中的bind方法，就是通过柯里化实现的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          return fToBind.apply(this instanceof fNOP
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    if (this.prototype) {
      fNOP.prototype = this.prototype; 
    }
    fBound.prototype = new fNOP();

    return fBound;
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (!<span class="hljs-built_in">Function</span>.prototype.bind) {
  <span class="hljs-built_in">Function</span>.prototype.bind = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">oThis</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">this</span> !== <span class="hljs-string">'function'</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">'Function.prototype.bind - what is trying to be bound is not callable'</span>);
    }

    <span class="hljs-keyword">var</span> aArgs   = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">1</span>),
        fToBind = <span class="hljs-keyword">this</span>,
        fNOP    = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{},
        fBound  = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">return</span> fToBind.apply(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> fNOP
                 ? <span class="hljs-keyword">this</span>
                 : oThis,
                 aArgs.concat(<span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>)));
        };

    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.prototype) {
      fNOP.prototype = <span class="hljs-keyword">this</span>.prototype; 
    }
    fBound.prototype = <span class="hljs-keyword">new</span> fNOP();

    <span class="hljs-keyword">return</span> fBound;
  };
}</code></pre>
<h4>总结</h4>
<p>通过本文的介绍，相信你对柯里化已经有一个全新的认识了。它最少有以下4种功能：</p>
<ul>
<li>性能优化</li>
<li>代码复用</li>
<li>使代码便于理解</li>
<li>扩展Javascript能力</li>
</ul>
<p>灵活使用柯里化，提高代码质量不是梦！</p>
<p>P.S. 如果还有本文没有提到的柯里化用法，欢迎留言交流(^-^)</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Javascript中的柯里化

## 原文链接
[https://segmentfault.com/a/1190000010878974](https://segmentfault.com/a/1190000010878974)

