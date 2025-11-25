---
title: '1625行，解开 underscore.js 的面纱 - 第六章' 
date: 2019-02-09 2:30:58
hidden: true
slug: 23ackmd55ay
categories: [reprint]
---

{{< raw >}}

                    
<p>北京的雨已经断断续续下了好久，昏昏欲睡的躲在家里不愿意出门，火影忍者快要结束了，一拳超人第二季据说还要等好多年，勇者大冒险貌似断更了，我又是在不喜欢海贼王的画风，所以，我该看什么好呢。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>  <span class="hljs-built_in">var</span> executeBound = function(sourceFunc, boundFunc, <span class="hljs-built_in">context</span>, callingContext, <span class="hljs-built_in">args</span>) {
    <span class="hljs-keyword">if</span> (!(callingContext instanceof boundFunc)) <span class="hljs-built_in">return</span> sourceFunc.<span class="hljs-built_in">apply</span>(<span class="hljs-built_in">context</span>, <span class="hljs-built_in">args</span>);
    <span class="hljs-built_in">var</span> self = baseCreate(sourceFunc.prototype);
    <span class="hljs-built_in">var</span> result = sourceFunc.<span class="hljs-built_in">apply</span>(self, <span class="hljs-built_in">args</span>);
    <span class="hljs-keyword">if</span> (<span class="hljs-symbol">_</span>.isObject(result)) <span class="hljs-built_in">return</span> result;
    <span class="hljs-built_in">return</span> self;
  };
</code></pre>
<p>executeBound 用来构成 <code>_.bind</code> 和 <code>_.partial</code> 两个函数，主要针对的是为了将函数调用模式更改为构造器调用和方法调用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  _.bind = restArgs(function(func, context, args) {
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var bound = restArgs(function(callArgs) {
      return executeBound(func, bound, context, this, args.concat(callArgs));
    });
    return bound;
  });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>  <span class="hljs-literal">_</span>.bind = restArgs(<span class="hljs-function"><span class="hljs-keyword">function</span></span>(func, context, args) {
    <span class="hljs-keyword">if</span> (!<span class="hljs-literal">_</span>.isFunction(func)) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-type">TypeError</span>(<span class="hljs-string">'Bind must be called on a function'</span>);
    <span class="hljs-keyword">var</span> bound = restArgs(<span class="hljs-function"><span class="hljs-keyword">function</span></span>(callArgs) {
      <span class="hljs-keyword">return</span> executeBound(func, bound, context, <span class="hljs-built_in">this</span>, args.concat(callArgs));
    });
    <span class="hljs-keyword">return</span> bound;
  });
</code></pre>
<p>也许我们可以参考下 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind" rel="nofollow noreferrer" target="_blank">Function.prototype.bind()</a>，<code>_.bind</code> 函数这个需要仔细讲一下了，先化简：</p>
<blockquote><div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    _.bind = function(func, context, args) {
        var length = arguments.length - 2;
        args = Array(length);
        for (var index = 0; index < length; index++) {
            args[index] = arguments[index + startIndex];
        }
        if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
        var bound = function(args_2){
            args_2 = Array(arguments.length);
            for (var index = 0; index < arguments.length; index++) {
                args_2[index] = arguments[index];
            }
            (function(sourceFunc, boundFunc, context, callingContext, args) {
                if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
                var self = baseCreate(sourceFunc.prototype);
                var result = sourceFunc.apply(self, args);
                if (_.isObject(result)) return result;
                return self;
          })(func, bound, context, this, args.concat(args_2));
        };
        return bound;
    };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>    <span class="hljs-symbol">_</span>.bind = function(func, <span class="hljs-built_in">context</span>, <span class="hljs-built_in">args</span>) {
        <span class="hljs-built_in">var</span> <span class="hljs-built_in">length</span> = arguments.<span class="hljs-built_in">length</span> - <span class="hljs-number">2</span>;
        <span class="hljs-built_in">args</span> = Array(<span class="hljs-built_in">length</span>);
        <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> index = <span class="hljs-number">0</span>; index &lt; <span class="hljs-built_in">length</span>; index++) {
            <span class="hljs-built_in">args</span>[index] = arguments[index + startIndex];
        }
        <span class="hljs-keyword">if</span> (!<span class="hljs-symbol">_</span>.isFunction(func)) <span class="hljs-built_in">throw</span> <span class="hljs-built_in">new</span> TypeError('Bind must be called on a function');
        <span class="hljs-built_in">var</span> bound = function(args_2){
            args_2 = Array(arguments.<span class="hljs-built_in">length</span>);
            <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> index = <span class="hljs-number">0</span>; index &lt; arguments.<span class="hljs-built_in">length</span>; index++) {
                args_2[index] = arguments[index];
            }
            (function(sourceFunc, boundFunc, <span class="hljs-built_in">context</span>, callingContext, <span class="hljs-built_in">args</span>) {
                <span class="hljs-keyword">if</span> (!(callingContext instanceof boundFunc)) <span class="hljs-built_in">return</span> sourceFunc.<span class="hljs-built_in">apply</span>(<span class="hljs-built_in">context</span>, <span class="hljs-built_in">args</span>);
                <span class="hljs-built_in">var</span> self = baseCreate(sourceFunc.prototype);
                <span class="hljs-built_in">var</span> result = sourceFunc.<span class="hljs-built_in">apply</span>(self, <span class="hljs-built_in">args</span>);
                <span class="hljs-keyword">if</span> (<span class="hljs-symbol">_</span>.isObject(result)) <span class="hljs-built_in">return</span> result;
                <span class="hljs-built_in">return</span> self;
          })(func, bound, <span class="hljs-built_in">context</span>, this, <span class="hljs-built_in">args</span>.<span class="hljs-built_in">concat</span>(args_2));
        };
        <span class="hljs-built_in">return</span> bound;
    };</code></pre></blockquote>
<p>这样看上去是不是直白很多，官网给它的定义是：<code>绑定函数 function 到对象 object 上, 也就是无论何时调用函数, 函数里的 this 都指向这个 object.任意可选参数 arguments 可以传递给函数 function , 可以填充函数所需要的参数,这也被称为 partial application。对于没有结合上下文的partial application绑定，请使用partial。</code>，怎么听怎么别扭，我们可以这样理解：<code>_.bind</code> 函数是为其传参中的 function 的 this 上绑定相应对象属性，并且同时进行 function 的参数传入，而其中最关键的就是在执行这一系列动作的同时将传入参数 context 绑定到了指向它的 Function 对象本身的 this 身上（可参考函数调用模式与方法调用模式的区别）。官网有个栗子：</p>
<blockquote><div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   var func = function(greeting){ return greeting + ': ' + this.name };
   func = _.bind(func, {name: 'moe'}, 'hi');
   func();
   {'hi: moe'}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>   var <span class="hljs-function"><span class="hljs-keyword">func</span> = <span class="hljs-title">function</span><span class="hljs-params">(greeting)</span>{ <span class="hljs-title">return</span> <span class="hljs-title">greeting</span> + ': ' + <span class="hljs-title">this</span>.<span class="hljs-title">name</span> };</span>
   <span class="hljs-function"><span class="hljs-keyword">func</span> = <span class="hljs-title">_</span>.<span class="hljs-title">bind</span><span class="hljs-params">(func, {name: <span class="hljs-string">'moe'</span>}, <span class="hljs-string">'hi'</span>)</span>;</span>
   <span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">()</span>;</span>
   {<span class="hljs-string">'hi: moe'</span>}</code></pre></blockquote>
<p>实际上呢它等同于：</p>
<blockquote><div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   var func = _.bind(function(greeting){
           return greeting + ': ' + this.name;
       },
       {name: 'moe'},
       'hi'
   );
   func();
   {'hi: moe'}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs go"><code>   <span class="hljs-keyword">var</span> <span class="hljs-function"><span class="hljs-keyword">func</span> = _.<span class="hljs-title">bind</span><span class="hljs-params">(function(greeting)</span></span>{
           <span class="hljs-keyword">return</span> greeting + <span class="hljs-string">': '</span> + this.name;
       },
       {name: <span class="hljs-string">'moe'</span>},
       <span class="hljs-string">'hi'</span>
   );
   <span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">()</span>;</span>
   {<span class="hljs-string">'hi: moe'</span>}</code></pre></blockquote>
<p>结合前面简化的 <code>_.bind</code> 代码示例可知这个函数的核心思想就是先通过 <code>_.bind</code> 初始化的时候优化第3+个参数 args，为什么叫 <code>3+</code> 呢，因为从第三个参数开始，可能是不限定的参数数量，所以从第三个开始到最后一个参数同一处理为一个数组 args。<br>紧接着就是执行刚才初始化过后的函数了，当 <code>func();</code> 的时候也就是开始执行 <code>_.bind</code> 中的 bound 函数。bound 允许传递参数并且其参数会被 push 到 args 中，具体实现参看上面的简化代码 <code>args.concat(args_2)</code>。这里我们有几个需要注意的点，其一是 <code>callingContext instanceof boundFunc</code>，之前我们讲过 instanceof 的神奇用法，在这里它用与判断 <code>bound</code> 中的 this 的指向是否继承于 bound。我们一定知道 this 指向的四个情况，如下：</p>
<blockquote><div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {};
var func = function (){console.log(this);};
func();
new func();
obj.func = func;
obj.func();
func.apply(['this is parameter']);
func.call(['this is parameter']);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>var obj = {}<span class="hljs-comment">;</span>
var <span class="hljs-function"><span class="hljs-keyword">func</span> = <span class="hljs-title">function</span> <span class="hljs-params">()</span>{<span class="hljs-title">console</span>.<span class="hljs-title">log</span><span class="hljs-params">(this)</span>;};</span>
<span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">()</span>;</span>
new <span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">()</span>;</span>
obj.<span class="hljs-keyword">func</span> = <span class="hljs-function"><span class="hljs-keyword">func</span>;</span>
obj.<span class="hljs-keyword">func</span>()<span class="hljs-comment">;</span>
<span class="hljs-function"><span class="hljs-keyword">func</span>.<span class="hljs-title">apply</span><span class="hljs-params">([<span class="hljs-string">'this is parameter'</span>])</span>;</span>
<span class="hljs-function"><span class="hljs-keyword">func</span>.<span class="hljs-title">call</span><span class="hljs-params">([<span class="hljs-string">'this is parameter'</span>])</span>;</span></code></pre></blockquote>
<p>输出结果为：</p>
<blockquote><div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Window {external: Object, chrome: Object, document: document, alogObjectConfig: Object, alogObjectName: &quot;alog&quot;…}
func {}
Object {}
[&quot;this is parameter&quot;]
[&quot;this is parameter&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code>Window {<span class="hljs-keyword">external</span>: <span class="hljs-built_in">Object</span>, chrome: <span class="hljs-built_in">Object</span>, <span class="hljs-built_in">document</span>: <span class="hljs-built_in">document</span>, alogObjectConfig: <span class="hljs-built_in">Object</span>, alogObjectName: <span class="hljs-string">"alog"</span>…}
func {}
<span class="hljs-built_in">Object</span> {}
[<span class="hljs-string">"this is parameter"</span>]
[<span class="hljs-string">"this is parameter"</span>]</code></pre></blockquote>
<p>分别代表四种情况：</p>
<ul>
<li><p>函数调用模式：指向 <code>Global</code>，浏览器客户端即 window；</p></li>
<li><p>方法调用模式：指向对象本身；</p></li>
<li><p>构造器调用模式：指向为新构造的对象，继承自原 Function 对象；</p></li>
<li><p>apply 或 call 调用模式：指向传入的参数。</p></li>
</ul>
<p>这里还有一些非常好的资料：<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this" rel="nofollow noreferrer" target="_blank">this</a>、<a href="http://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/" rel="nofollow noreferrer" target="_blank">Understanding JavaScript Function Invocation and "this"</a>，在这里我要说一下我在推库上看到一篇关于 this 的介绍文章说：<code>“比较系统的分类是《JavaScript语言精粹》中的，分为函数调用模式（this绑定全局对象window）和方法调用模式（this绑定调用方法的主体）”</code>，我把《<a href="https://www.amazon.cn/JavaScript%E8%AF%AD%E8%A8%80%E7%B2%BE%E7%B2%B9-%E9%81%93%E6%A0%BC%E6%8B%89%E6%96%AF%E2%80%A2%E5%85%8B%E7%BD%97%E5%85%8B%E7%A6%8F%E5%BE%B7/dp/B0097CON2S/ref=sr_1_1?ie=UTF8&amp;qid=1465722328&amp;sr=8-1&amp;keywords=JavaScript%E8%AF%AD%E8%A8%80%E7%B2%BE%E7%B2%B9" rel="nofollow noreferrer" target="_blank">JavaScript语言精粹</a>》这本书从头到尾翻看了好几遍，实际上它原文是这样说的：<code>“在 JAVASCRIPT 中一共有4种调用模式：方法调用模式、函数调用模式、构造器调用模式和 apply 调用模式。”</code>，具体叙述在原书的P27～P30页，感兴趣的朋友可以看下，在给大家看一个彩蛋，<a href="http://speakingjs.com/es5/ch07.html#strict_mode" rel="nofollow noreferrer" target="_blank">严格模式下的 this</a>。紧接上文，当 <code>bound</code> 中的 this 的指向是否继承于 bound 函数的时候说明是使用了 <code>new</code> 关键字的构造器调用模式调用了 <code>_.bind</code> 函数，则继续执行 executeBound 函数中的 baseCreate 创建基本函数然后进行一系列的操作，其实说到底 baseCreate 的目的就是为了保证传入参数 Function 的 this 的干净。<br>另外一个需要注意的地方是官网示例的暗示（特蛋疼的暗示），我扩展了一下：</p>
<blockquote><div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   var func = function(){ return JSON.stringify(arguments) + ': ' + this.name };
   func = _.bind(func, {name: 'moe'}, 'hi');
   func();
   func = _.bind(func, {name: 'moe2'}, 'hi2');
   func();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>   var <span class="hljs-function"><span class="hljs-keyword">func</span> = <span class="hljs-title">function</span><span class="hljs-params">()</span>{ <span class="hljs-title">return</span> <span class="hljs-title">JSON</span>.<span class="hljs-title">stringify</span><span class="hljs-params">(arguments)</span> + ': ' + <span class="hljs-title">this</span>.<span class="hljs-title">name</span> };</span>
   <span class="hljs-function"><span class="hljs-keyword">func</span> = <span class="hljs-title">_</span>.<span class="hljs-title">bind</span><span class="hljs-params">(func, {name: <span class="hljs-string">'moe'</span>}, <span class="hljs-string">'hi'</span>)</span>;</span>
   <span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">()</span>;</span>
   <span class="hljs-function"><span class="hljs-keyword">func</span> = <span class="hljs-title">_</span>.<span class="hljs-title">bind</span><span class="hljs-params">(func, {name: <span class="hljs-string">'moe2'</span>}, <span class="hljs-string">'hi2'</span>)</span>;</span>
   <span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">()</span>;</span></code></pre></blockquote>
<p>输出结果：</p>
<blockquote><div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   &quot;{&quot;0&quot;:&quot;hi&quot;}: moe&quot;
   &quot;{&quot;0&quot;:&quot;hi&quot;,&quot;1&quot;:&quot;hi2&quot;}: moe&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>   <span class="hljs-string">"{"</span><span class="hljs-number">0</span><span class="hljs-string">":"</span>hi<span class="hljs-string">"}: moe"</span>
   <span class="hljs-string">"{"</span><span class="hljs-number">0</span><span class="hljs-string">":"</span>hi<span class="hljs-string">","</span><span class="hljs-number">1</span><span class="hljs-string">":"</span>hi2<span class="hljs-string">"}: moe"</span></code></pre></blockquote>
<p>可能有些不明就里的同学会问这是为什么啊，怎么 <code>this.name</code> 的值没有变化呢。实际上我们第一个 <code>_.bind</code> 是正常的函数绑定，而第二个 <code>func = _.bind(func, {name: 'moe2'}, 'hi2');</code> 是将上一个 <code>_.bind</code> 作为了 Function 参数传入到了新的 <code>_.bind</code> 中，而本来的函数 func 作为第一个 <code>_.bind</code> 的 func 参数一直传递到第二个 <code>_.bind</code> 中，但是中间的 this.name 却被绑定到了第一个 <code>_.bind</code> 上面而不是第一个 <code>_.bind</code> 中的 func 上。有一点绕口。用个代码介绍下，第二个 <code>_.bind</code> 的情况是这样子的：</p>
<blockquote><div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" func = _.bind(function(
       function(greeting){
           return greeting + ': ' + this.name;
      },
       context,
       args
   ) {
        var length = arguments.length - 2;
        args = Array(length);
        for (var index = 0; index < length; index++) {
            args[index] = arguments[index + startIndex];
        }
        if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
        var bound = function(args_2){
            args_2 = Array(arguments.length);
            for (var index = 0; index < arguments.length; index++) {
                args_2[index] = arguments[index];
            }
            (function(sourceFunc, boundFunc, context, callingContext, args) {
                if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
                var self = baseCreate(sourceFunc.prototype);
                var result = sourceFunc.apply(self, args);
                if (_.isObject(result)) return result;
                return self;
          })(func, bound, context, this, args.concat(args_2));
        };
        return bound;
    },
       {name: 'moe2'},
       'hi2'
   );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> func = _.bind(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">
       function(greeting</span>)</span>{
           <span class="hljs-keyword">return</span> greeting + <span class="hljs-string">': '</span> + <span class="hljs-keyword">this</span>.name;
      },
       context,
       args
   ) {
        <span class="hljs-keyword">var</span> length = <span class="hljs-built_in">arguments</span>.length - <span class="hljs-number">2</span>;
        args = <span class="hljs-built_in">Array</span>(length);
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>; index &lt; length; index++) {
            args[index] = <span class="hljs-built_in">arguments</span>[index + startIndex];
        }
        <span class="hljs-keyword">if</span> (!_.isFunction(func)) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">'Bind must be called on a function'</span>);
        <span class="hljs-keyword">var</span> bound = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">args_2</span>)</span>{
            args_2 = <span class="hljs-built_in">Array</span>(<span class="hljs-built_in">arguments</span>.length);
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>; index &lt; <span class="hljs-built_in">arguments</span>.length; index++) {
                args_2[index] = <span class="hljs-built_in">arguments</span>[index];
            }
            (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">sourceFunc, boundFunc, context, callingContext, args</span>) </span>{
                <span class="hljs-keyword">if</span> (!(callingContext <span class="hljs-keyword">instanceof</span> boundFunc)) <span class="hljs-keyword">return</span> sourceFunc.apply(context, args);
                <span class="hljs-keyword">var</span> self = baseCreate(sourceFunc.prototype);
                <span class="hljs-keyword">var</span> result = sourceFunc.apply(self, args);
                <span class="hljs-keyword">if</span> (_.isObject(result)) <span class="hljs-keyword">return</span> result;
                <span class="hljs-keyword">return</span> self;
          })(func, bound, context, <span class="hljs-keyword">this</span>, args.concat(args_2));
        };
        <span class="hljs-keyword">return</span> bound;
    },
       {<span class="hljs-attr">name</span>: <span class="hljs-string">'moe2'</span>},
       <span class="hljs-string">'hi2'</span>
   );</code></pre></blockquote>
<p>所以 <code>_.bind</code> 一定要遵循正确的用法，不然真的出错了可能调试都不好发现问题，多层回调嵌套的时候一层套一层，很麻烦。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  _.partial = restArgs(function(func, boundArgs) {
    var placeholder = _.partial.placeholder;
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>  <span class="hljs-symbol">_</span>.partial = restArgs(function(func, boundArgs) {
    <span class="hljs-built_in">var</span> placeholder = <span class="hljs-symbol">_</span>.partial.placeholder;
    <span class="hljs-built_in">var</span> bound = function() {
      <span class="hljs-built_in">var</span> <span class="hljs-built_in">position</span> = <span class="hljs-number">0</span>, <span class="hljs-built_in">length</span> = boundArgs.<span class="hljs-built_in">length</span>;
      <span class="hljs-built_in">var</span> <span class="hljs-built_in">args</span> = Array(<span class="hljs-built_in">length</span>);
      <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">length</span>; i++) {
        <span class="hljs-built_in">args</span>[i] = boundArgs[i] === placeholder ? arguments[<span class="hljs-built_in">position</span>++] : boundArgs[i];
      }
      <span class="hljs-keyword">while</span> (<span class="hljs-built_in">position</span> &lt; arguments.<span class="hljs-built_in">length</span>) <span class="hljs-built_in">args</span>.<span class="hljs-built_in">push</span>(arguments[<span class="hljs-built_in">position</span>++]);
      <span class="hljs-built_in">return</span> executeBound(func, bound, this, this, <span class="hljs-built_in">args</span>);
    };
    <span class="hljs-built_in">return</span> bound;
  });
</code></pre>
<p><code>_.partial</code> 函数的核心思想与 <code>_.bind</code> 相同，都是为了解决 this 指向的问题，区别在于 <code>_.partial</code> 不需要对 this 上的值做什么处理。用法上我觉得 <code>_.partial</code> 看上去更怪异一些，也许用来做一些特定的计算可能更合适些。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  _.partial.placeholder = _;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code>  <span class="hljs-keyword">_</span>.partial.placeholder = <span class="hljs-keyword">_</span>;
</code></pre>
<p>设置 <code>_.partial.placeholder</code> 为 <code>_</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  _.bindAll = restArgs(function(obj, keys) {
    keys = flatten(keys, false, false);
    var index = keys.length;
    if (index < 1) throw new Error('bindAll must be passed function names');
    while (index--) {
      var key = keys[index];
      obj[key] = _.bind(obj[key], obj);
    }
  });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>  <span class="hljs-symbol">_</span>.bindAll = restArgs(function(obj, keys) {
    keys = <span class="hljs-built_in">flatten</span>(keys, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>);
    <span class="hljs-built_in">var</span> index = keys.<span class="hljs-built_in">length</span>;
    <span class="hljs-keyword">if</span> (index &lt; <span class="hljs-number">1</span>) <span class="hljs-built_in">throw</span> <span class="hljs-built_in">new</span> Error('bindAll must be passed function names');
    <span class="hljs-keyword">while</span> (index--) {
      <span class="hljs-built_in">var</span> <span class="hljs-built_in">key</span> = keys[index];
      obj[<span class="hljs-built_in">key</span>] = <span class="hljs-symbol">_</span>.bind(obj[<span class="hljs-built_in">key</span>], obj);
    }
  });
</code></pre>
<p>这里我们看到 <code>_.bindAll</code> 函数官网的示例就有点糊涂了：</p>
<blockquote><div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   var buttonView = {
     label  : 'underscore',
     onClick: function(){ console.log('clicked: ' + this.label); },
     onHover: function(){ console.log('hovering: ' + this.label); }
   };
   _.bindAll(buttonView, 'onClick', 'onHover');
   buttonView.onClick（);
   clicked: underscore" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>   <span class="hljs-keyword">var</span> buttonView = {
     <span class="hljs-attr">label</span>  : <span class="hljs-string">'underscore'</span>,
     <span class="hljs-attr">onClick</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'clicked: '</span> + <span class="hljs-keyword">this</span>.label); },
     <span class="hljs-attr">onHover</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hovering: '</span> + <span class="hljs-keyword">this</span>.label); }
   };
   _.bindAll(buttonView, <span class="hljs-string">'onClick'</span>, <span class="hljs-string">'onHover'</span>);
   buttonView.onClick（);
   clicked: underscore</code></pre></blockquote>
<p>我们当然知道结果是 <code>clicked: underscore</code>，那么执行 <code>_.bindAll(buttonView, 'onClick', 'onHover');</code> 的意义在哪呢，所以说这又是官网坑人的地方了，<code>_.bindAll</code> 的本意是将其传入的第二个及以后的参数放到一个共同的上下文环境里面执行，从而达到 this 指向其第一个参数的本身的目的，而官网的示例为<code>方法调用模式</code>，this 指向已经是 Object 本身了所以看不到变化，但是我们在浏览器控制台查看的话应该能知道 this 上多了 <code>[[TargetFunction]]: function ()</code>、<code>[[BoundThis]]: Object</code>、<code>[[BoundArgs]]: Array[0]</code> 三个参数并且 <code>[[BoundThis]]</code> 恰好是 Object。闲来无事这好看到有人也写了这个问题并举证了一个示例，详见 <a href="http://blog.bigbinary.com/2011/08/18/understanding-bind-and-bindall-in-backbone.html" rel="nofollow noreferrer" target="_blank">Understanding bind and bindAll in Backbone.js</a>。我 cope 一下：</p>
<blockquote><div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   function Developer(skill) {
     this.skill = skill;
     this.says = function(){
       console.log(this.skill + ' rocks!');
     }
   }
   var john = new Developer('Ruby');
   _.bindAll(john, 'says');
   var func = john.says;
   func(); //Ruby rocks!" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Developer</span>(<span class="hljs-params">skill</span>) </span>{
     <span class="hljs-keyword">this</span>.skill = skill;
     <span class="hljs-keyword">this</span>.says = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
       <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.skill + <span class="hljs-string">' rocks!'</span>);
     }
   }
   <span class="hljs-keyword">var</span> john = <span class="hljs-keyword">new</span> Developer(<span class="hljs-string">'Ruby'</span>);
   _.bindAll(john, <span class="hljs-string">'says'</span>);
   <span class="hljs-keyword">var</span> func = john.says;
   func(); <span class="hljs-comment">//Ruby rocks!</span></code></pre></blockquote>
<p>这个<code>函数调用模式</code>的示例正好答疑了 this 指向已经被改变的这个问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  _.memoize = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">func, hasher</span>) </span>{
    <span class="hljs-keyword">var</span> memoize = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key</span>) </span>{
      <span class="hljs-keyword">var</span> cache = memoize.cache;
      <span class="hljs-keyword">var</span> address = <span class="hljs-string">''</span> + (hasher ? hasher.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>) : key);
      <span class="hljs-keyword">if</span> (!_.has(cache, address)) cache[address] = func.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
      <span class="hljs-keyword">return</span> cache[address];
    };
    memoize.cache = {};
    <span class="hljs-keyword">return</span> memoize;
  };
</code></pre>
<p><code>_.memoize</code> 函数更像是一个可以缓存第一次执行结果的递归函数，我们从源码中可以看到 <code>memoize.cache = {};</code> 就是用来存储计算结果的容器，这里面比较有意思的是 hasher 这个参数，官网释义： <code>hashFunction</code>，实际上就是通过 hashFunction 对传入的 key 值进行处理然后放到 <code>memoize.cache = {};</code> 中，至于怎么处理 hash 也好、md5 也好、或者什么其他的计算加密真值判断增加对象等等都可以通过 hasher 这个传入的回调进行扩展。</p>
<p>————————— 疲惫的分割线 ———————————<br>这几天北京总在下雨，身体特别的疲惫，状态也不怎么好，所以今天才开始继续更新。<br>————————— END ———————————</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  _.delay = restArgs(function(func, wait, args) {
    return setTimeout(function() {
      return func.apply(null, args);
    }, wait);
  });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>  _.delay = restArgs(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(func, wait, args)</span> </span>{
    <span class="hljs-keyword">return</span> setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
      <span class="hljs-keyword">return</span> func.apply(<span class="hljs-literal">null</span>, args);
    }, wait);
  });
</code></pre>
<p><code>_.delay</code> 函数用于处理定时器相关函数，原理是通过 setTimeout 进行二次封装，比较关键的就是 args 参数通过 restArgs 函数处理为一个数组，方便了下一步的 <code>func.apply(null, args);</code> 传值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  _.defer = _.partial(_.delay, _, 1);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>  <span class="hljs-symbol">_</span>.defer = <span class="hljs-symbol">_</span>.partial(<span class="hljs-symbol">_</span>.<span class="hljs-built_in">delay</span>, <span class="hljs-symbol">_</span>, <span class="hljs-number">1</span>);
</code></pre>
<p><code>_.defer</code> 这个函数我们首先可以看到内部应用了 <code>_.partial</code> 并且中间传入参数 <code>_</code>，这意味着当 <code>_.defer</code> 执行的时候传入的参数会被补全到 <code>_.partial</code> 内部 bound 中的 <code>args[0]</code> 位置，而此时 <code>args</code> 的值为 <code>[func, 1]</code>并将它传给 <code>_.delay</code> 函数，即 <code>_.delay.apply(null, args);</code>，用着这种方式曲线的设置 setTimeout 函数的 <code>wait = 1</code>，目的就是处理代码复用问题，不然的话完全可以改装一下 <code>_.delay</code> 函数可以更简单的实现这一功能。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  _.throttle = function(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    var throttled = function() {
      var now = _.now();
      if (!previous &amp;&amp; options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout &amp;&amp; options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
    throttled.cancel = function() {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };
    return throttled;
  };
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code>  _.<span class="hljs-attr">throttle</span> = function(func, wait, options) {
    var timeout, context, args, result;
    var <span class="hljs-attr">previous</span> = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">if</span> (!options) <span class="hljs-attr">options</span> = {};
    var <span class="hljs-attr">later</span> = function() {
      <span class="hljs-attr">previous</span> = options.<span class="hljs-attr">leading</span> === <span class="hljs-literal">false</span> ? <span class="hljs-number">0</span> : _.now();
      <span class="hljs-attr">timeout</span> = <span class="hljs-literal">null</span>;
      <span class="hljs-attr">result</span> = func.apply(context, args);
      <span class="hljs-keyword">if</span> (!timeout) <span class="hljs-attr">context</span> = <span class="hljs-attr">args</span> = <span class="hljs-literal">null</span>;
    };
    var <span class="hljs-attr">throttled</span> = function() {
      var <span class="hljs-attr">now</span> = _.now();
      <span class="hljs-keyword">if</span> (!previous &amp;&amp; options.<span class="hljs-attr">leading</span> === <span class="hljs-literal">false</span>) <span class="hljs-attr">previous</span> = now;
      var <span class="hljs-attr">remaining</span> = wait - (now - previous);
      <span class="hljs-attr">context</span> = this;
      <span class="hljs-attr">args</span> = arguments;
      <span class="hljs-keyword">if</span> (remaining &lt;= <span class="hljs-number">0</span> || remaining &gt; wait) {
        <span class="hljs-keyword">if</span> (timeout) {
          clearTimeout(timeout);
          <span class="hljs-attr">timeout</span> = <span class="hljs-literal">null</span>;
        }
        <span class="hljs-attr">previous</span> = now;
        <span class="hljs-attr">result</span> = func.apply(context, args);
        <span class="hljs-keyword">if</span> (!timeout) <span class="hljs-attr">context</span> = <span class="hljs-attr">args</span> = <span class="hljs-literal">null</span>;
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (!timeout &amp;&amp; options.trailing !== <span class="hljs-literal">false</span>) {
        <span class="hljs-attr">timeout</span> = setTimeout(later, remaining);
      }
      return result;
    };
    throttled.<span class="hljs-attr">cancel</span> = function() {
      clearTimeout(timeout);
      <span class="hljs-attr">previous</span> = <span class="hljs-number">0</span>;
      <span class="hljs-attr">timeout</span> = <span class="hljs-attr">context</span> = <span class="hljs-attr">args</span> = <span class="hljs-literal">null</span>;
    };
    return throttled;
  };
</code></pre>
<p><code>_.throttle</code> 函数可以限制和控制其参数 func 的执行次数和执行时间，思想就是通过 wait、now、previous 和 remaining 进行判断然后分别执行相应的策略。</p>
<ul>
<li><p>wait：使用 <code>_.throttle</code> 函数时传入的时间标识，在每个 wait 毫秒时间段内最多且一定调用一次该函数。</p></li>
<li><p>now：使用 <code>_.now()</code> 函数获取当前时间戳。</p></li>
<li><p>previous：用来缓存函数执行时的时间戳，用于后面与下一次执行时的时间戳进行相关判断。</p></li>
<li><p>remaining：缓存 <code>wait - (now - previous)</code> 的差值。</p></li>
</ul>
<p>我们在看官网介绍可以知道 <code>_.throttle</code> 传递的 options 分四种情况（默认是 <code>{leading:false,trailing:false}</code>）：</p>
<ul>
<li><p><code>{leading:true,trailing:true}</code>：从实例化 <code>_.throttle</code> 的时间开始到执行实例化的函数的时间为止，中间的差值定义为 <code>now - previous</code>，进而得出设定的时间 wait 与 <code>now - previous</code> 的差值 remaining，从而决定怎么执行函数。参考 <a href="http://www.easyui.info/third/underscore/throttle.html" rel="nofollow noreferrer" target="_blank">世纪之光</a> 的很有趣的说法，就是第一次可以立即执行，第二次开始将在每 wait 时间内只允许执行一次，为什么会第一次立即执行呢，因为大家设置的 wait 一般都不会太大，所以页面加载过程中一般已经执行了 <code>_.throttle</code> 的实例化，也就是说其 <code>remaining &lt;= 0</code>，而后面如果一直执行函数，那么就开始 <code>0 &lt; remaining &lt;= wait</code> 模式了，</p></li>
<li><p><code>{leading:false,trailing:false}</code>：这种情况下比较有意思的是 previous 这个参数，在实例化 <code>_.throttle</code> 的时候，<code>previous = 0</code>，利用了 <code>!0 === true</code> 的特性使 <code>_.throttle</code> 内部并没有执行回调函数 func，所以第一次函数调用失败，在第二次开始 <code>previous = now</code> （now 为第一次调用的时间戳），所以它也分为两种情况：</p></li>
<li><p><code>{leading:true,trailing:false}</code>：这种情况下是没有 setTimeout 函数的，因为 <code>leading:true</code>，所以 previous 初始化为 <code>0</code>，意味着第一次执行函数会立即执行，儿后面就要遵循 <code>remaining &lt;= 0 || remaining &gt; wait</code> 才能执行，也就是说只有第一执行完毕后的时间超过了 wait 才能继续调用函数才能执行（调用是重点），以此类推。</p></li>
<li><p><code>{leading:false,trailing:true}</code>：这种情况由于 <code>leading:false</code>，所以每次 previous 都等于当前调用函数时的时间戳，所以完美的不存在 <code>remaining &lt;= 0 || remaining &gt; wait</code> 的情况，由此只能通过 setTimeout 执行回调，所以遵循通过 setTimeout 函数设定时间为 remaining 毫秒后执行 <code>_.throttle</code> 函数的回调函数 func，用以达到在规定时间 wait 毫秒时执行函数的目的，并且规定 wait 时间内只执行一次函数。</p></li>
</ul>
<p>其实总结一下就是大概一下两种都存在或者只存在其一的情况：</p>
<ul>
<li><p><code>remaining &lt;= 0</code>：立即执行 <code>_.throttle</code> 函数的回调函数 func。</p></li>
<li>
<p><code>0 &lt; remaining &lt;= wait</code>：通过 setTimeout 函数设定时间为 remaining 毫秒后执行 <code>_.throttle</code> 函数的回调函数 func，用以达到在规定时间 wait 毫秒时执行函数的目的，并且规定 wait 时间内只执行一次函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" _.debounce = function(func, wait, immediate) {
   var timeout, result;
   var later = function(context, args) {
     timeout = null;
     if (args) result = func.apply(context, args);
   };
   var debounced = restArgs(function(args) {
     if (timeout) clearTimeout(timeout);
     if (immediate) {
       var callNow = !timeout;
       timeout = setTimeout(later, wait);
       if (callNow) result = func.apply(this, args);
     } else {
       timeout = _.delay(later, wait, this, args);
     }
     return result;
   });
   debounced.cancel = function() {
     clearTimeout(timeout);
     timeout = null;
   };
   return debounced;
 };
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code> _.debounce = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(func, wait, immediate)</span> </span>{
   <span class="hljs-keyword">var</span> timeout, result;
   <span class="hljs-keyword">var</span> later = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(context, args)</span> </span>{
     timeout = <span class="hljs-literal">null</span>;
     <span class="hljs-keyword">if</span> (args) result = func.apply(context, args);
   };
   <span class="hljs-keyword">var</span> debounced = restArgs(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(args)</span> </span>{
     <span class="hljs-keyword">if</span> (timeout) clearTimeout(timeout);
     <span class="hljs-keyword">if</span> (immediate) {
       <span class="hljs-keyword">var</span> callNow = !timeout;
       timeout = setTimeout(later, wait);
       <span class="hljs-keyword">if</span> (callNow) result = func.apply(<span class="hljs-keyword">this</span>, args);
     } <span class="hljs-keyword">else</span> {
       timeout = _.delay(later, wait, <span class="hljs-keyword">this</span>, args);
     }
     <span class="hljs-keyword">return</span> result;
   });
   debounced.cancel = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
     clearTimeout(timeout);
     timeout = <span class="hljs-literal">null</span>;
   };
   <span class="hljs-keyword">return</span> debounced;
 };
</code></pre>
</li>
</ul>
<p><code>_.debounce</code> 更像是 <code>_.delay</code> 的方言版，当 <code>immediate = true</code> 的时候通过 <code>var callNow = !timeout = false</code> 达到立即执行回调函数 func 的目的，并用 later 函数限制 规定 wait 时间内不允许在调用函数（later 函数内部 context = args = underfind，其实我们知道 <code>var later = function(context, args)</code> 这个条件是为 <code>_.delay(later, wait, this, args)</code> 准备的）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>  _.wrap = function(<span class="hljs-function"><span class="hljs-keyword">func</span>, <span class="hljs-title">wrapper</span>) {</span>
    <span class="hljs-keyword">return</span> _.partial(wrapper, <span class="hljs-function"><span class="hljs-keyword">func</span>);</span>
  }<span class="hljs-comment">;</span>
</code></pre>
<p><code>_.wrap</code> 的两个参数理论上都要求是 Function，我们已经知道 <code>_.partial</code> 是用来在 this 上下功夫的，虽然这里和 this 也没什么太大关系，之所以这里应用了 <code>_.partial</code> 是为了让 func 作为 wrapper 的第一个参数执行，并且通过 executeBound 函数对<code>函数调用模式</code>和<code>方法调用模式</code>做处理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  _.negate = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">predicate</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> !predicate.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
    };
  };
</code></pre>
<p><code>_.negate</code> 用来做真值判断。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  _.compose = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">arguments</span>;
    <span class="hljs-keyword">var</span> start = args.length - <span class="hljs-number">1</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">var</span> i = start;
      <span class="hljs-keyword">var</span> result = args[start].apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
      <span class="hljs-keyword">while</span> (i--) result = args[i].call(<span class="hljs-keyword">this</span>, result);
      <span class="hljs-keyword">return</span> result;
    };
  };
</code></pre>
<p><code>_.compose</code> 用于将函数执行结果进行传递，需要注意的是 <code>var args = arguments;</code> 中的 arguments 和 <code>args[start].apply(this, arguments);</code> 中的 arguments 并不相同就可以了。这个涉及到函数的执行，当每一个函数执行的时候都会形成一个内部的上下文执行环境（传说叫 <code>ExecutionContext</code>，这个我还没有考证过），在构建环境的同时生成 arguments 变量和作用域链表等等，这里不像叙述了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  _.after = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">times, func</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">if</span> (--times &lt; <span class="hljs-number">1</span>) {
        <span class="hljs-keyword">return</span> func.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
      }
    };
  };
</code></pre>
<p><code>_.after</code> 接受两个参数，Number 参数用来限定 <code>_.after</code> 实例化函数的执行次数，说白了就是只有当第 Number 次执行实例化函数的时候才会继续执行 func 回调，这个用来处理遍历 <code>_.each</code> 时某些情况很有用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  _.before = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">times, func</span>) </span>{
    <span class="hljs-keyword">var</span> memo;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">if</span> (--times &gt; <span class="hljs-number">0</span>) {
        memo = func.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
      }
      <span class="hljs-keyword">if</span> (times &lt;= <span class="hljs-number">1</span>) func = <span class="hljs-literal">null</span>;
      <span class="hljs-keyword">return</span> memo;
    };
  };
</code></pre>
<p><code>_.before</code>，与 <code>_.after</code> 相反，只在规定 Number 参数的次数内以此执行 <code>_.before</code>，超过之后结束。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  _.once = _.partial(_.before, 2);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code>  <span class="hljs-keyword">_</span>.<span class="hljs-built_in">once</span> = <span class="hljs-keyword">_</span>.partial(<span class="hljs-keyword">_</span>.<span class="hljs-built_in">before</span>, <span class="hljs-number">2</span>);
</code></pre>
<p><code>_.once</code> 创建一个只能调用一次的函数。到这里关于函数相关的源码就结束了，说心里话很多地方看得懂不一定说的懂，说的懂也不一定用的懂，就拿这个 <code>_.once</code> 来讲，它只用了 <code>_.partial</code> 和 <code>_.before</code> 来做文章，用 <code>_.before</code> 限定只能执行一次还好理解，那么为什么一定要用 <code>_.partial</code> 坐下处理呢，其目的真的只是为了让 <code>2</code> 作为 <code>_.before</code> 的第一个参数进行传递过去并将 <code>_.once</code> 的传参作为 <code>arguments[1+]</code> 传入么，更深一层考虑，<code>_.partial</code> 函数是不是有处理过 <code>_.once</code> 传递过来的函数的作用域链和 this 相关的情况呢。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  _.restArgs = restArgs;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>  _.restArgs = restArgs<span class="hljs-comment">;</span>
</code></pre>
<p><code>_.restArgs</code> 将 restArgs 函数绑定到 <code>_</code> 对象上。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
1625行，解开 underscore.js 的面纱 - 第六章

## 原文链接
[https://segmentfault.com/a/1190000005710444](https://segmentfault.com/a/1190000005710444)

