---
title: 'Generator：同步代码书写异步情怀' 
date: 2019-01-07 2:30:10
hidden: true
slug: gz1nufo256e
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>编者按：看完本文，你能对ES6的Generator有一个很好的理解，轻松地以同步的方式写异步代码，也能初步理解到TJ大神的co框架的原理。</p></blockquote>
<p>前言：ES6在2015年6月正式发布，它带给js带来许多新特性，其中一个就是Generator，虽然其它语言如python早就有了，但js的Generator和它们的还是有点不一样的，js的Generator重点在解决异步回调金字塔问题，巧妙的使用它可以写出看起来同步的代码。</p>
<p>我们都知道js跟其它语言相比，最大的特性就是异步，所以当我们要取异步取一个文件内容时，一般我们会这样写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.get('http://youzan.com/test.txt', function(data){
    console.log(data);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$.get(<span class="hljs-string">'http://youzan.com/test.txt'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
    <span class="hljs-built_in">console</span>.log(data);
})</code></pre>
<p>如果取完A文件后又要再取B文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.get('http://youzan.com/A.txt', function(a){
    $.get('http://youzan.com/B.txt', function(b){
        console.log(b);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$.get(<span class="hljs-string">'http://youzan.com/A.txt'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a</span>)</span>{
    $.get(<span class="hljs-string">'http://youzan.com/B.txt'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">b</span>)</span>{
        <span class="hljs-built_in">console</span>.log(b);
    }
}</code></pre>
<p>再取一个C文件可能这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.get('http://youzan.com/A.txt', function(a){
    $.get('http://youzan.com/B.txt', function(b){
        $.get('http://youzan.com/C.txt', function(c){
            console.log(c);
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$.get(<span class="hljs-string">'http://youzan.com/A.txt'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a</span>)</span>{
    $.get(<span class="hljs-string">'http://youzan.com/B.txt'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">b</span>)</span>{
        $.get(<span class="hljs-string">'http://youzan.com/C.txt'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>)</span>{
            <span class="hljs-built_in">console</span>.log(c);
        }
    }
}</code></pre>
<p>当有更多的异步操作，业务逻辑更为的复杂时，按上面的写法维护时心中肯定要骂娘了。那有没有更好一点的写法呢？在Generator出来之前可以使用promise实现，虽然说promise也是es6的一部分，es6标准未出之前已经有很多ployfill出来了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.get('http://youzan.com/A.txt')
    .done(function(a){
        return $.get('http://youzan.com/B.txt');
    })
    .done(function(b){
        return $.get('http://youzan.com/C.txt');
    })
    .done(function(c){
        console.log(c);
    })
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$.get(<span class="hljs-string">'http://youzan.com/A.txt'</span>)
    .done(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a</span>)</span>{
        <span class="hljs-keyword">return</span> $.get(<span class="hljs-string">'http://youzan.com/B.txt'</span>);
    })
    .done(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">b</span>)</span>{
        <span class="hljs-keyword">return</span> $.get(<span class="hljs-string">'http://youzan.com/C.txt'</span>);
    })
    .done(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>)</span>{
        <span class="hljs-built_in">console</span>.log(c);
    })
</code></pre>
<p>promise的实现要比上面嵌套回调要优雅许多，但也可以一眼看出异步回调的身影。目前js有很多框架要致力解决js金字塔回调，让异步代码书写的逻辑更为清晰，如async, wind.js, promise, deffer。这些框架都有自己的一些约定，如async是以数组形式来写，promise是以回调参数方式，但它们都不能做到像写c或java那样第一行open一个file，然后第二行马上读取，来看看最新的Generator是怎么做的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="co(function* (){
    var a = yield $.get('http://youzan.com/A.txt');
    var b = yield $.get('http://youzan.com/B.txt');
    var c = yield $.get('http://youzan.com/C.txt');
    console.log(c);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">co(<span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> a = <span class="hljs-keyword">yield</span> $.get(<span class="hljs-string">'http://youzan.com/A.txt'</span>);
    <span class="hljs-keyword">var</span> b = <span class="hljs-keyword">yield</span> $.get(<span class="hljs-string">'http://youzan.com/B.txt'</span>);
    <span class="hljs-keyword">var</span> c = <span class="hljs-keyword">yield</span> $.get(<span class="hljs-string">'http://youzan.com/C.txt'</span>);
    <span class="hljs-built_in">console</span>.log(c);
})</code></pre>
<p>上面代码使用了co框架包裹，里面一个Generator，从书写上看它已经和其它同步语言差不多。写了多年的异步看到上面代码是不是感觉不可思义呢？这就是Generator带来的可喜之处，其实es6还更多的新东西等着你发现。下面来了详细了解一下Generator。</p>
<h3 id="articleHeader0">Generator是什么</h3>
<p>Generator是生成器的意思，它是一种可以从中退出并在之后重新进入的函数。<strong>生成器的环境（绑定的变量）会在每次执行后被保存，下次进入时可继续使用</strong>。生成器其实在其它语言很早就有了，比如python、c#，但与python不同的是js的generator更多的是提供一种异步解决方案。</p>
<p>Generator使用<code>function*</code>来定义，内部有<code>yield</code>关键字，<code>next</code>方法控制内部执行流程，每执行到一个<code>yield</code>语句就会中断，并返回一个迭代值，下次执行时从<code>yield</code>的下一个语句继续执行。一个生成器只能执行一次。</p>
<p>一个简单的定义如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* hello() {
   var a = 'b'
   yield 'a';
   return a;
}

var gen = hello();
console.log(gen);
// => hello {[[GeneratorStatus]]: &quot;suspended&quot;, [[GeneratorReceiver]]: undefined}
console.log(gen.next())
// => {value: &quot;a&quot;, done: false}
console.log(gen.next())
// => {value: &quot;b&quot;, done: true}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">hello</span>(<span class="hljs-params"></span>) </span>{
   <span class="hljs-keyword">var</span> a = <span class="hljs-string">'b'</span>
   <span class="hljs-keyword">yield</span> <span class="hljs-string">'a'</span>;
   <span class="hljs-keyword">return</span> a;
}

<span class="hljs-keyword">var</span> gen = hello();
<span class="hljs-built_in">console</span>.log(gen);
<span class="hljs-comment">// =&gt; hello {[[GeneratorStatus]]: "suspended", [[GeneratorReceiver]]: undefined}</span>
<span class="hljs-built_in">console</span>.log(gen.next())
<span class="hljs-comment">// =&gt; {value: "a", done: false}</span>
<span class="hljs-built_in">console</span>.log(gen.next())
<span class="hljs-comment">// =&gt; {value: "b", done: true}</span></code></pre>
<p>上面代码通过调用<code>hello()</code>，产生了一个生成器，内部代码没有执行。调用<code>next</code>方法执行到<code>yield</code>后暂停，内部环境被保存，<code>next</code>执行返回一个对象，<code>value</code>为<code>yield</code>的执行结果，<code>done</code>表示迭代器是否完成。当迭代器完成后，<code>done</code>为true，<code>value</code>为return的值，继续执行<code>next</code>，<code>value</code>将为undefined</p>
<h3 id="articleHeader1">Generator执行原理</h3>
<p>回到开头的例子，Generator给我们提供了直观的写法来处理异步回调，它让代码逻辑非常清晰。来了解一下Generator内部的一些原理</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* hello() {
   yield 'a';
   return 'b';
}
var gen = hello();
console.log(gen);
// => hello {[[GeneratorStatus]]: &quot;suspended&quot;, [[GeneratorReceiver]]: undefined}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">hello</span>(<span class="hljs-params"></span>) </span>{
   <span class="hljs-keyword">yield</span> <span class="hljs-string">'a'</span>;
   <span class="hljs-keyword">return</span> <span class="hljs-string">'b'</span>;
}
<span class="hljs-keyword">var</span> gen = hello();
<span class="hljs-built_in">console</span>.log(gen);
<span class="hljs-comment">// =&gt; hello {[[GeneratorStatus]]: "suspended", [[GeneratorReceiver]]: undefined}</span></code></pre>
<p>使用chrome工具查看对象内容，可发现里面有<code>next</code>和<code>throw</code>方法。<br><span class="img-wrap"><img data-src="/img/bVRCmN?w=710&amp;h=240" src="https://static.alili.tech/img/bVRCmN?w=710&amp;h=240" alt="Snip20150909_1.png" title="Snip20150909_1.png" style="cursor: pointer;"></span></p>
<p>当我们执行<code>next</code>方法时，发现其返回了一个对象：<br><span class="img-wrap"><img data-src="/img/bVRCmU?w=729&amp;h=50" src="https://static.alili.tech/img/bVRCmU?w=729&amp;h=50" alt="Snip20150909_2.png" title="Snip20150909_2.png" style="cursor: pointer;"></span></p>
<p>对象含有<code>value</code>和<code>done</code>两个字段，<code>value</code>为yield 'a'的返回值，即为'a'，<code>done</code>表示generator的状态，为true时表示执行完成。再执行next方法时，可以看到done的值已经为true了，<strong>而且value的值为return的值</strong>。<br><span class="img-wrap"><img data-src="/img/bVRCm5?w=701&amp;h=47" src="https://static.alili.tech/img/bVRCm5?w=701&amp;h=47" alt="Snip20150909_3.png" title="Snip20150909_3.png" style="cursor: pointer;"></span><br>查看gen自身内部的状态，可以看到GeneratorStatus已经为closed了<br><span class="img-wrap"><img data-src="/img/bVRCng?w=706&amp;h=115" src="https://static.alili.tech/img/bVRCng?w=706&amp;h=115" alt="Snip20150909_4.png" title="Snip20150909_4.png" style="cursor: pointer;"></span></p>
<p>综上可以得出Generator是通过调用<code>next</code>方法来控制执行流程，当遇到yield语句时暂停执行。<code>next</code>方法返回一个对像{value: 'yield', done: false}，value存储的yield 执行结果，done表示迭代器是否执行完成。</p>
<p>通过上面的了解貌似generator并没有太大卵用，不能如所说的用同步情怀书写异步代码。上面漏了很重要的一点就是<strong>yield的返回值</strong>及<strong>next的参数</strong>。看下面一段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* hello() {
  var ret = yield 'a';
  console.log(ret);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">hello</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> ret = <span class="hljs-keyword">yield</span> <span class="hljs-string">'a'</span>;
  <span class="hljs-built_in">console</span>.log(ret);
}</code></pre>
<p>然后过程如下一下：<br><span class="img-wrap"><img data-src="/img/bVRCno?w=697&amp;h=170" src="https://static.alili.tech/img/bVRCno?w=697&amp;h=170" alt="Snip20150909_5.png" title="Snip20150909_5.png" style="cursor: pointer; display: inline;"></span><br>从上面执行过程可以看到，ret与第二个next的参数值一样，这是Generator的传值方式。yield的返回值就是next的参数，第一个next由于执行到yield语句之前就暂停了，所以参数b没有用。</p>
<p>这里也提一下上面出现的throw方法。</p>
<p>在generator中使用gen.throw('error')来抛出异常。当出现异常后，迭代中止，再次执行gen.next()时，将返回{value: undefined, done: true};</p>
<p>使用try catch可捕获gen.throw出来的异常。</p>
<h3 id="articleHeader2">Generator自动执行封装</h3>
<p>至此对generator了解的也差不多了，但貌似使用它来写代码感觉挺变扭的，因为你要不停的next，如果有一个函数能自动执行generator函数就好了。就像之前提到的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="co(function* (){
    var a = yield $.get('http://youzan.com/A.txt');
    var b = yield $.get('http://youzan.com/B.txt');
    var c = yield $.get('http://youzan.com/C.txt');
    console.log(c);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">co(<span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> a = <span class="hljs-keyword">yield</span> $.get(<span class="hljs-string">'http://youzan.com/A.txt'</span>);
    <span class="hljs-keyword">var</span> b = <span class="hljs-keyword">yield</span> $.get(<span class="hljs-string">'http://youzan.com/B.txt'</span>);
    <span class="hljs-keyword">var</span> c = <span class="hljs-keyword">yield</span> $.get(<span class="hljs-string">'http://youzan.com/C.txt'</span>);
    <span class="hljs-built_in">console</span>.log(c);
})</code></pre>
<p>上面提到的Generator内部原理可以总结出，<code>right</code>这边执行后的结果放到value里，next的参数放到了<code>left</code>这边。为了让<code>right</code>这边执行后的结果放到<code>left</code>，那<code>right</code>就得返回一个function，传一个callback进行，然后在callback里执行next方法。通过了角Generator的数据传递过程就可以写出一个简易版的co来自动执行next方法，以达到上面代码效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function co(genFunc) {
  var gen = genFunc();

  var next = function(value){
     var ret = gen.next(value);
     if (!ret.done) {
       ret.value(next);
     }
  }

  next();
}

function getAFromServer(url){
    /*
     *do something sync
     */
    return function(cb) {
       /*
        *do something async
        */ 
       var a = 'data A from server';
       cb(a);    // 返回读到的内容
    }
}

function getBFromServer(url){
    /*
     *do something sync
     */
    return function(cb) {
       /*
        *do something async
        */ 
       var b = 'data B from server';
       cb(b);    // 返回读到的内容
    }
}

co(function* (){
  var ret = yield getFromSever('url of A');
  console.log(ret);  // 输出  data A from server
  var retB = yield getFromSever('url of B');
  console.log(retB);  // 输出  data B from server
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">co</span>(<span class="hljs-params">genFunc</span>) </span>{
  <span class="hljs-keyword">var</span> gen = genFunc();

  <span class="hljs-keyword">var</span> next = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
     <span class="hljs-keyword">var</span> ret = gen.next(value);
     <span class="hljs-keyword">if</span> (!ret.done) {
       ret.value(next);
     }
  }

  next();
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getAFromServer</span>(<span class="hljs-params">url</span>)</span>{
    <span class="hljs-comment">/*
     *do something sync
     */</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">cb</span>) </span>{
       <span class="hljs-comment">/*
        *do something async
        */</span> 
       <span class="hljs-keyword">var</span> a = <span class="hljs-string">'data A from server'</span>;
       cb(a);    <span class="hljs-comment">// 返回读到的内容</span>
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getBFromServer</span>(<span class="hljs-params">url</span>)</span>{
    <span class="hljs-comment">/*
     *do something sync
     */</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">cb</span>) </span>{
       <span class="hljs-comment">/*
        *do something async
        */</span> 
       <span class="hljs-keyword">var</span> b = <span class="hljs-string">'data B from server'</span>;
       cb(b);    <span class="hljs-comment">// 返回读到的内容</span>
    }
}

co(<span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span> ret = <span class="hljs-keyword">yield</span> getFromSever(<span class="hljs-string">'url of A'</span>);
  <span class="hljs-built_in">console</span>.log(ret);  <span class="hljs-comment">// 输出  data A from server</span>
  <span class="hljs-keyword">var</span> retB = <span class="hljs-keyword">yield</span> getFromSever(<span class="hljs-string">'url of B'</span>);
  <span class="hljs-built_in">console</span>.log(retB);  <span class="hljs-comment">// 输出  data B from server</span>
})</code></pre>
<p>上面的co就是一个非常简单的自动执行generator next的函数，且<code>right</code>这边的值能正确传到<code>left</code>，唯一的要求是getA的写法必须<a href="http://www.ruanyifeng.com/blog/2015/05/thunk.html" rel="nofollow noreferrer" target="_blank">trunk</a>的写法。像我们使用nodejs的一些异步api，可使用<a href="https://github.com/tj/node-thunkify" rel="nofollow noreferrer" target="_blank">trunkify</a>来转成trunk形式。</p>
<p>在co内部主要靠next来实现循环，靠外部cb()来驱动运行。大体流程如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVRCqM?w=822&amp;h=836" src="https://static.alili.tech/img/bVRCqM?w=822&amp;h=836" alt="Snip20150815_11.png" title="Snip20150815_11.png" style="cursor: pointer; display: inline;"></span></p>
<p>了解了co原理，那就可以把它做得更强大一些，如支持Promise，支持nodejs写法的异常处理。这个可以参考co, trunks的代码。</p>
<h3 id="articleHeader3">支持情况</h3>
<p>根据这个<a href="http://kangax.github.io/compat-table/es6/#Generator" rel="nofollow noreferrer" target="_blank">ECMAScript 6 compatibility table</a>的资料显示，目前已经有如下平台可以支持：</p>
<p>Chrome 35+ (about://flags中开启)<br>Firefox 31+ (默认开启)<br>nodejs harmony<br>nodejs 0.11+</p>
<h4>参考资料</h4>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a>*<br><a href="http://es6.ruanyifeng.com/#docs/generator" rel="nofollow noreferrer" target="_blank">http://es6.ruanyifeng.com/#do...</a><br><a href="http://kangax.github.io/compat-table/es6/#Generator%20expressions" rel="nofollow noreferrer" target="_blank">http://kangax.github.io/compa...</a><br><a href="http://www.slideshare.net/RameshNair6/es6-next-generation-javascript" rel="nofollow noreferrer" target="_blank">http://www.slideshare.net/Ram...</a></p>
<blockquote><p>本文首发于有赞技术博客: <a href="http://tech.youzan.com/es6-generator/" rel="nofollow noreferrer" target="_blank">http://tech.youzan.com/es6-ge...</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Generator：同步代码书写异步情怀

## 原文链接
[https://segmentfault.com/a/1190000010354158](https://segmentfault.com/a/1190000010354158)

