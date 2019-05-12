---
title: '用co玩转异步' 
date: 2019-02-05 2:30:09
hidden: true
slug: 0e76az9j3swp
categories: [reprint]
---

{{< raw >}}

                    
<p>之前我在关于Promise的文章中提到了<code>co</code>这个库。在这篇文章里，我将写一写自己对它的认识。</p>
<p>Trust me，用了<code>co</code>库，你不想用别的，来它半斤异步调用你一口能吃仨。</p>
<p>但是我对Tj大神的<a href="https://github.com/tj/co" rel="nofollow noreferrer" target="_blank">co库源码</a>谈不上深入理解。所以，如有乱讲，欢迎指正。</p>
<p>我这里默认读者对<code>Promise</code>和<code>Generator</code>有一定的认识。</p>
<p>先安利自己写的两篇关于Promise的文章：</p>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000006708151">浅析ES6原生Promise</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006708186" target="_blank">再谈Promise</a></p></li>
</ul>
<p>下面我就来谈谈<code>co</code>这个牛逼的库。</p>
<h2 id="articleHeader0">ES7 async/await</h2>
<p>干嘛，我们不是讲ES6么，怎么跳到ES7了？</p>
<p>因为<code>co</code>要做的事情，就是ES7的<code>async/await</code>要做的事情。  <br>也就是说，这种解决异步的思路，已经在ECMA标准的考虑之中了。将来我们浏览器的JS引擎就可以原生实现这件事而不是通过JavaScript代码模拟。要知道，引擎的实现和代码的实现那是完全两码事。</p>
<h3 id="articleHeader1">一点题外话</h3>
<p>多一句嘴：有些同学混淆了ECMA标准、引擎支持和代码实现的联系。</p>
<p>这里引用<a href="http://blog.zhaojie.me/" rel="nofollow noreferrer" target="_blank">老赵</a>在知乎里面回答问题时说的一句话：</p>
<blockquote><p>ES7是个标准，定义的是what to do不是how to do，为什么好多人还是搞不清这两者的区别。</p></blockquote>
<p>ECMAScript定义了一些JavaScript语言层面要做的事情，这是一个标准。之所以要制定这个标准，是为了防止浏览器各自为政而出现JS引擎对同一行代码的解释出现不同的情况。</p>
<p>也就是说，ECMA制定标准，我们就可以按照这个标准来写JavaScript代码。写好的JavaScript代码由浏览器的JS引擎来解释，最终变成计算机能读懂的代码来执行。</p>
<hr>
<h3 id="articleHeader2">async/await</h3>
<p>上代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = function(){

    return new Promise(resolve => {
        // 异步操作之后
        resolve('OK');
    });
}

async funtion bar(){
    
    var result = await foo();
    
    console.log(result); 
    
}

bar(); // ==> 打印'OK'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> foo = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
        <span class="hljs-comment">// 异步操作之后</span>
        resolve(<span class="hljs-string">'OK'</span>);
    });
}

<span class="hljs-keyword">async</span> funtion bar(){
    
    <span class="hljs-keyword">var</span> result = <span class="hljs-keyword">await</span> foo();
    
    <span class="hljs-built_in">console</span>.log(result); 
    
}

bar(); <span class="hljs-comment">// ==&gt; 打印'OK'</span>
</code></pre>
<p>我们注意到，这段代码用了两个新的关键字<code>async</code>和<code>await</code>。而且有两件神奇的事情发生了：</p>
<ol>
<li><p><code>bar</code>函数中包含了一个返回<code>Promise</code>对象的语句，而且<code>Promise</code>中存在异步代码。但是这条语句接下来的语句明显是等待<code>Promise</code>对象中的代码异步执行完毕之后才执行的。（否则不会得到异步之后的值）</p></li>
<li><p><code>Promise</code>对象<code>resolve</code>的值，并没有在<code>then</code>中进行处理，而是直接作为返回值返回到<code>Promise</code>对象外面了.</p></li>
</ol>
<p>这就是<code>async/await</code>的魔法。在函数前面加上<code>async</code>关键字之后，内部的代码会识别<code>await</code>关键字。此时假设<code>await</code>后面的语句返回一个<code>Promise</code>对象，那么执行的代码将会等待，直到<code>Promise</code>对象变为<code>resolve</code>状态。并且<code>Promise</code>对象中<code>resolve</code>的值将直接作为<code>await</code>语句的返回值返回。然后再执行<code>await</code>语句之后的语句。</p>
<p>从此我们就可以无痛的撸异步代码，妈妈再也不用担心回调金字塔的出现和异步流程逻辑搞不定的情况了！</p>
<p>另一个奇妙的事情就是，率先支持这一特性的浏览器居然是微软的Edge。大概是因为<code>C#</code>语言早就出现<code>async/await</code>,并且<code>TypeScript</code>也支持这一特性的缘故吧。</p>
<h2 id="articleHeader3">co</h2>
<p>我们希望所有的浏览器都及早支持这一特性。但是值得欣喜的一点就是，虽然V8还没有支持，Tj大神早就利用<code>Generator</code>的方式实现了一个ES6版本的<code>async/await</code>！（膜拜脸）</p>
<h3 id="articleHeader4">co函数形式</h3>
<p>同样是上面的逻辑，我们用<code>co</code>实现一次：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 首先我们需要将co引入，假设我们使用commonJS的方式  

const co = require('co');

var foo = function(){

    return new Promise(resolve => {
        // 异步操作之后
        resolve('OK');
    });
}

co(function* (){
    
    var result = yield foo();
    
    console.log(result); 
    
}); // ==> 打印'OK'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 首先我们需要将co引入，假设我们使用commonJS的方式  </span>

<span class="hljs-keyword">const</span> co = <span class="hljs-built_in">require</span>(<span class="hljs-string">'co'</span>);

<span class="hljs-keyword">var</span> foo = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
        <span class="hljs-comment">// 异步操作之后</span>
        resolve(<span class="hljs-string">'OK'</span>);
    });
}

co(<span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>)</span>{
    
    <span class="hljs-keyword">var</span> result = <span class="hljs-keyword">yield</span> foo();
    
    <span class="hljs-built_in">console</span>.log(result); 
    
}); <span class="hljs-comment">// ==&gt; 打印'OK'</span>
</code></pre>
<p>我们看到，<code>co</code>函数接收一个<code>Generator</code>生成器函数作为参数。<strong>执行<code>co</code>函数的时候</strong>，生成器函数内部的逻辑像<code>async</code>函数<strong>调用</strong>时一样被执行。不同之处只是这里的<code>await</code>变成了<code>yield</code>。</p>
<h3 id="articleHeader5">简单版本的co代码</h3>
<p>要实现以上的逻辑，结合<code>Generator</code>的特性，<code>co</code>函数应该：</p>
<ul>
<li><p>在函数体内将Generator生成器函数执行并生成生成器实例(在此命名为<code>gen</code>)，然后通过<code>gen.next</code>方法的调用，不断执行生成器函数内部的代码。</p></li>
<li><p>执行<code>next</code>方法之后，返回的<code>Promise</code>在生成器函数执行环境之外执行，并取出<code>resolve</code>值，作为返回值作为<code>next</code>方法的参数返回到<code>Generator</code>执行环境中。</p></li>
</ul>
<p>基于以上两点，我们可以大体实现一个简化版的<code>co</code>，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const co = function(genFunc){  
    const gen = genFunc(); // 得到生成器实例  
    
    const deal = (val) => {
        
        const res = gen.next(val); 
        
        // 这里处理了异步逻辑，
        // 在回调中去递归，不断执行next
        // 这样就将resolve的值传回了Generator
        res.value.then(result => deal(result));
        
    }
    
    deal(); // 第一次触发递归
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> co = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">genFunc</span>)</span>{  
    <span class="hljs-keyword">const</span> gen = genFunc(); <span class="hljs-comment">// 得到生成器实例  </span>
    
    <span class="hljs-keyword">const</span> deal = <span class="hljs-function">(<span class="hljs-params">val</span>) =&gt;</span> {
        
        <span class="hljs-keyword">const</span> res = gen.next(val); 
        
        <span class="hljs-comment">// 这里处理了异步逻辑，</span>
        <span class="hljs-comment">// 在回调中去递归，不断执行next</span>
        <span class="hljs-comment">// 这样就将resolve的值传回了Generator</span>
        res.value.then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> deal(result));
        
    }
    
    deal(); <span class="hljs-comment">// 第一次触发递归</span>
}
</code></pre>
<p>去掉括号等等，只有短短六行代码。</p>
<h3 id="articleHeader6">more</h3>
<p>原理性的东西大约就是这样了。但是<code>co</code>做的不止这些。</p>
<ol>
<li><p>之前<code>co</code>的<code>yield</code>后的语句并不支持<code>Promise</code>对象，而是一个特殊的函数，叫做<code>thunk</code>。目前<code>co</code>二者都支持。  <br>此处我并不打算重复性解释<code>thunk</code>版本，因为原理性的东西实现起来是差不多的。</p></li>
<li>
<p><code>co</code>函数是有返回值的，也是一个<code>Promise</code>对象。</p>
<ul>
<li><p>当生成器函数内的逻辑执行完毕且没有错误之后，这个<code>Promise</code>对象（<code>co</code>返回值）变为<code>resolve</code>状态，且将生成器的返回值作为<code>resolve</code>出来的值。</p></li>
<li><p>若生成器函数内返回一个<code>Promise</code>对象，那么<code>co</code>函数返回值就是这个<code>Promise</code>对象。</p></li>
<li><p>若生成器函数抛出了错误，那么这个错误作为<code>reject</code>出来的值，将<code>Promise</code>对象的状态变为<code>reject</code>。</p></li>
</ul>
<p>这样我们就可以将错误放进其返回值的<code>.catch</code>方法中统一处理。</p>
</li>
<li><p>在生成器函数内部，我们也可以使用<code>try...catch</code>语句获取错误对象。</p></li>
<li><p>生成器的<code>yield</code>后面可以跟一个元素值为<code>Promise</code>对象的数组，这个数组内<code>Promise</code>对象内的异步逻辑将并发执行，并返回一个数组。（类似于<code>Promise.all</code>方法）</p></li>
<li><p>假设生成器执行之前需要从外部传入参数，<code>co</code>库提供了一个方法：</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var fn = co.wrap(function* (val) {
  
     return yield Promise.resolve(val);

  });

  fn(true).then(function (val) {

  });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  <span class="hljs-keyword">var</span> fn = co.wrap(<span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params">val</span>) </span>{
  
     <span class="hljs-keyword">return</span> <span class="hljs-keyword">yield</span> <span class="hljs-built_in">Promise</span>.resolve(val);

  });

  fn(<span class="hljs-literal">true</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">val</span>) </span>{

  });
</code></pre>
<h2 id="articleHeader7">结束</h2>
<p>以上是一点微小的见解。谢谢指正。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用co玩转异步

## 原文链接
[https://segmentfault.com/a/1190000006719931](https://segmentfault.com/a/1190000006719931)

