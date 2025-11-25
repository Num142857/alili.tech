---
title: 'promise介绍--基础篇' 
date: 2019-01-30 2:30:23
hidden: true
slug: xt33kqeaw6i
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p><strong>Promise</strong>，相信每一个前端工程师都或多或少地在项目中都是用过，毕竟它早已不是一个新名词。ES6中已经原生对它加以支持，在caniuse中搜索一下<code>Promise</code>，发现新版的chrome和firefox也已经支持。但是低版本的浏览器我们可以使用<code>es6-promise</code>这个<code>polyfill</code>库来加以兼容。</p>
<p>暂且不谈<code>await</code>、<code>async</code>，在Google或百度或360搜索等搜索引擎、或者在segmentfault等社区中，我们可以搜到一大把介绍<code>promise</code>的文章，毕竟它已经出现了很长时间，早已有很多大神分析讲解过。</p>
<p>我也看了一些文章，但是感觉都没有达到想要的效果。所以决定自己开一个小系列文章学习讲解一下promise的原理，以及实现，最后再谈一谈与之联系密切的Deferred对象。</p>
<p>本文是该系列的第一篇文章，主要先让大家对Promise有一个基本的认识。</p>
<h1 id="articleHeader1">promise简介</h1>
<p>Promise的出现，原本是为了解决回调地狱的问题。所有人在讲解<code>Promise</code>时，都会以一个ajax请求为例，此处我们也用一个简单的ajax的例子来带大家看一下<code>Promise</code>是如何使用的。</p>
<p>ajax请求的传统写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getData(method, url, successFun, failFun){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open(method, url);
  xmlHttp.send();
  xmlHttp.onload = function () {
    if (this.status == 200 ) {
      successFun(this.response);
    } else {
      failFun(this.statusText);
    }
  };
  xmlHttp.onerror = function () {
    failFun(this.statusText);
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>getData(method, <span class="hljs-built_in">url</span>, successFun, failFun){
  <span class="hljs-built_in">var</span> xmlHttp = <span class="hljs-keyword">new</span> XMLHttpRequest();
  xmlHttp.open(method, <span class="hljs-built_in">url</span>);
  xmlHttp.send();
  xmlHttp.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.status == <span class="hljs-number">200</span> ) {
      successFun(<span class="hljs-keyword">this</span>.response);
    } <span class="hljs-title">else</span> {
      failFun(<span class="hljs-keyword">this</span>.statusText);
    }
  };
  xmlHttp.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    failFun(<span class="hljs-keyword">this</span>.statusText);
  };
}</code></pre>
<p>改为<code>promise</code>后的写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getData(method, url){
  var promise = new Promise(function(resolve, reject){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open(method, url);
    xmlHttp.send();
    xmlHttp.onload = function () {
      if (this.status == 200 ) {
        resolve(this.response);
      } else {
        reject(this.statusText);
      }
    };
    xmlHttp.onerror = function () {
      reject(this.statusText);
    };
  })
  return promise;
}

getData('get','www.xxx.com').then(successFun, failFun)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>getData(method, url){
  <span class="hljs-keyword">var</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>)</span>{
    <span class="hljs-keyword">var</span> xmlHttp = <span class="hljs-keyword">new</span> XMLHttpRequest();
    xmlHttp.open(method, url);
    xmlHttp.send();
    xmlHttp.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.status == <span class="hljs-number">200</span> ) {
        resolve(<span class="hljs-keyword">this</span>.response);
      } <span class="hljs-keyword">else</span> {
        reject(<span class="hljs-keyword">this</span>.statusText);
      }
    };
    xmlHttp.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      reject(<span class="hljs-keyword">this</span>.statusText);
    };
  })
  <span class="hljs-keyword">return</span> promise;
}

getData(<span class="hljs-string">'get'</span>,<span class="hljs-string">'www.xxx.com'</span>).then(successFun, failFun)</code></pre>
<p>很显然，我们把异步中使用回调函数的场景改为了<code>.then()</code>、<code>.catch()</code>等函数链式调用的方式。基于<code>promise</code>我们可以把复杂的异步回调处理方式进行模块化。</p>
<p>下面，我们就来介绍一下<code>Promise</code>到底是个什么东西？它是如何做到的？</p>
<h1 id="articleHeader2">
<code>Promise</code>的原理分析</h1>
<p>其实<code>promise</code>原理说起来并不难，它内部有三个状态，分别是<code>pending</code>，<code>fulfilled</code>和<code>rejected </code>。</p>
<p><code>pending</code>是对象创建后的初始状态，当对象<code>fulfill</code>（成功）时变为<code>fulfilled</code>，当对象<code>reject</code>（失败）时变为<code>rejected</code>。且只能从<code>pengding</code>变为<code>fulfilled</code>或<code>rejected </code>，而不能逆向或从<code>fulfilled</code>变为<code>rejected </code>、从<code>rejected</code>变为<code>fulfilled</code>。如图所示：</p>
<p><span class="img-wrap"><img data-src="/img/bVGo9L?w=690&amp;h=366" src="https://static.alili.tech/img/bVGo9L?w=690&amp;h=366" alt="状态变化" title="状态变化" style="cursor: pointer;"></span></p>
<h1 id="articleHeader3">
<code>Promise</code>实例方法介绍</h1>
<p><code>Promise</code>对象拥有两个实例方法<code>then()</code>和<code>catch()</code>。</p>
<p>从前面的例子中可以看到，成功和失败的回调函数我们是通过<code>then()</code>添加，在<code>promise</code>状态改变时分别调用。<code>promise</code>构造函数中通常都是异步的，所以<code>then</code>方法往往都先于<code>resolve</code>和<code>reject</code>方法执行。所以<code>promise</code>内部需要有一个存储<code>fulfill</code>时调用函数的数组和一个存储<code>reject</code>时调用函数的数组。</p>
<p>从上面的例子中我们还可以看到<code>then</code>方法可以接收两个参数，且通常都是函数（非函数时如何处理下一篇文章中会详细介绍）。第一个参数会添加到<code>fulfill</code>时调用的数组中，第二个参数添加到<code>reject</code>时调用的数组中。当<code>promise</code>状态<code>fulfill</code>时，会把<code>resolve(value)</code>中的<code>value</code>值传给调用的函数中，同理，当<code>promise</code>状态<code>reject</code>时，会把<code>reject(reason)</code>中的<code>reason</code>值传给调用的函数。例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = new Promise(function(resolve, reject){
    resolve(5)
}).then(function(value){
    console.log(value) //5
})

var p1 = new Promise(function(resolve, reject){
    reject(new Error('错误'))
}).then(function(value){
    console.log(value)
}, function(reason){
    console.log(reason) //Error: 错误(…)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>)</span>{
    resolve(<span class="hljs-number">5</span>)
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-built_in">console</span>.log(value) <span class="hljs-comment">//5</span>
})

<span class="hljs-keyword">var</span> p1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>)</span>{
    reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'错误'</span>))
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-built_in">console</span>.log(value)
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reason</span>)</span>{
    <span class="hljs-built_in">console</span>.log(reason) <span class="hljs-comment">//Error: 错误(…)</span>
})</code></pre>
<p><code>then</code>方法会返回一个新的<code>promise</code>，下面的例子中<code>p == p1</code>将返回<code>false</code>,说明<code>p1</code>是一个全新的对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = new Promise(function(resolve, reject){
    resolve(5)
})
var p1 = p.then(function(value){
    console.log(value)
})
p == p1 // false
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>)</span>{
    resolve(<span class="hljs-number">5</span>)
})
<span class="hljs-keyword">var</span> p1 = p.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-built_in">console</span>.log(value)
})
p == p1 <span class="hljs-comment">// false</span>
</code></pre>
<p>这也是为什么<code>then</code>是可以链式调用的，它是在新的对象上添加成功或失败的回调，这与<code>jQuery</code>中的链式调用不同。</p>
<p>那么新对象的状态是基于什么改变的呢？是不是说如果<code>p</code>的状态<code>fulfill</code>，后面的<code>then</code>创建的新对象都会成功；或者说如果<code>p</code>的状态<code>reject</code>，后面的<code>then</code>创建的新对象都会失败？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = new Promise(function(resolve, reject){
    resolve(5)
})
var p1 = p.then(function(value){
    console.log(value)   // 5
}).then(function(value){
    console.log('fulfill ' + value)   // fulfill undefined
}, function(reason){
    console.log('reject ' + reason)   
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>)</span>{
    resolve(<span class="hljs-number">5</span>)
})
<span class="hljs-keyword">var</span> p1 = p.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-built_in">console</span>.log(value)   <span class="hljs-comment">// 5</span>
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'fulfill '</span> + value)   <span class="hljs-comment">// fulfill undefined</span>
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reason</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'reject '</span> + reason)   
})</code></pre>
<p>上面的例子会打印出5和"fulfill undefined"说明它的状态变为成功。那如果我们在<code>p1</code>的<code>then</code>方法中抛出异常呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = new Promise(function(resolve, reject){
    resolve(5)
})
var p1 = p.then(function(value){
    console.log(value)   // 5
    throw new Error('test')
}).then(function(value){
    console.log('fulfill ' + value)
}, function(reason){
    console.log('reject ' + reason)   // reject Error: test
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>)</span>{
    resolve(<span class="hljs-number">5</span>)
})
<span class="hljs-keyword">var</span> p1 = p.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-built_in">console</span>.log(value)   <span class="hljs-comment">// 5</span>
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'test'</span>)
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'fulfill '</span> + value)
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reason</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'reject '</span> + reason)   <span class="hljs-comment">// reject Error: test</span>
})</code></pre>
<p>理所当然，新对象肯定会失败。</p>
<p>反过来如果<code>p</code>失败了，会是什么样的呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = new Promise(function(resolve, reject){
    reject(5)
})
var p1 = p.then(undefined, function(value){
    console.log(value)   // 5
}).then(function(value){
    console.log('fulfill ' + value)   // fulfill undefined
}, function(reason){
    console.log('reject ' + reason)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>)</span>{
    reject(<span class="hljs-number">5</span>)
})
<span class="hljs-keyword">var</span> p1 = p.then(<span class="hljs-literal">undefined</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-built_in">console</span>.log(value)   <span class="hljs-comment">// 5</span>
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'fulfill '</span> + value)   <span class="hljs-comment">// fulfill undefined</span>
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reason</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'reject '</span> + reason)
})</code></pre>
<p>说明新对象状态不会受到前一个对象状态的影响。</p>
<p>再来看如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = new Promise(function(resolve, reject){
    reject(5)
})
var p1 = p.then(function(value){
    console.log(value) 
})
var p2 = p1.then(function(value){
    console.log('fulfill ' + value)
}, function(reason){
    console.log('reject ' + reason)   // reject 5
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>)</span>{
    reject(<span class="hljs-number">5</span>)
})
<span class="hljs-keyword">var</span> p1 = p.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-built_in">console</span>.log(value) 
})
<span class="hljs-keyword">var</span> p2 = p1.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'fulfill '</span> + value)
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reason</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'reject '</span> + reason)   <span class="hljs-comment">// reject 5</span>
})</code></pre>
<p>我们发现<code>p1</code>的状态变为<code>rejected</code>，从而触发了<code>then</code>方法第二个参数的函数。这似乎与我们之前提到的有差异啊，<code>p1</code>的状态受到了<code>p</code>的状态的影响。</p>
<p>再来看一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = new Promise(function(resolve, reject){
    resolve(5)
})
var p1 = p.then(undefined, function(value){
    console.log(value) 
})
var p2 = p1.then(function(value){
    console.log('fulfill ' + value)   // fulfill 5
}, function(reason){
    console.log('reject ' + reason)   
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>)</span>{
    resolve(<span class="hljs-number">5</span>)
})
<span class="hljs-keyword">var</span> p1 = p.then(<span class="hljs-literal">undefined</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-built_in">console</span>.log(value) 
})
<span class="hljs-keyword">var</span> p2 = p1.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'fulfill '</span> + value)   <span class="hljs-comment">// fulfill 5</span>
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reason</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'reject '</span> + reason)   
})</code></pre>
<p>细心的人可能会发现，该例子中<code>then</code>第一个参数是<code>undefined</code>，且<code>value</code>值5被传到了<code>p1</code>成功时的回调函数中。上面那个例子中<code>then</code>的第二个参数是<code>undefined</code>，同样<code>reason</code>值也传到了<code>p1</code>失败时的回调函数中。这是因当对应的参数不为函数时，会将前一<code>promise</code>的状态和值传递下去。</p>
<p><code>promise</code>含有一个实例方法<code>catch</code>，从名字上我们就看得出来，它和异常有千丝万缕的关系。其实<code>catch(onReject)</code>方法等价于<code>then(undefined, onReject)</code>，也就是说如下两种情况是等效的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise(function(resolve, reject){
    reject(new Error('error'))
}).then(undefined, function(reason){
    console.log(reason) // Error: error(…)
})

new Promise(function(resolve, reject){
    reject(new Error('error'))
}).catch(function(reason){
    console.log(reason) // Error: error(…)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>)</span>{
    reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'error'</span>))
}).then(<span class="hljs-literal">undefined</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reason</span>)</span>{
    <span class="hljs-built_in">console</span>.log(reason) <span class="hljs-comment">// Error: error(…)</span>
})

<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>)</span>{
    reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'error'</span>))
}).catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reason</span>)</span>{
    <span class="hljs-built_in">console</span>.log(reason) <span class="hljs-comment">// Error: error(…)</span>
})</code></pre>
<p>我们提到参数不为函数时会把值和状态传递下去。所以我们可以在多个<code>then</code>之后添加一个<code>catch</code>方法，这样前面只要<code>reject</code>或抛出异常，都会被最后的<code>catch</code>方法处理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise(function(resolve, reject){
    resolve(5)
}).then(function(value){
    taskA()
}).then(function(value){
    taskB()
}).then(function(value){
    taskC()
}).catch(function(reason){
    console.log(reason)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code>new Promise(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(resolve, reject)</span>{</span>
    resolve(<span class="hljs-number">5</span>)
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value)</span>{</span>
    taskA()
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value)</span>{</span>
    taskB()
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value)</span>{</span>
    taskC()
}).<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(reason)</span>{</span>
    console.<span class="hljs-built_in">log</span>(reason)
})</code></pre>
<h1 id="articleHeader4">
<code>Promise</code>的静态方法</h1>
<p><code>Promise</code>还有四个静态方法，分别是<code>resolve</code>、<code>reject</code>、<code>all</code>、<code>race</code>，下面我们一一介绍。</p>
<p>除了通过<code>new Promise()</code>的方式，我们还有两种创建<code>Promise</code>对象的方法：</p>
<p><strong><code>Promise.resolve()</code></strong> 它相当于创建了一个立即<code>resolve</code>的对象。如下两段代码作用相同：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.resolve(5)

new Promise(function(resolve){
    resolve(5)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">5</span>)

<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>)</span>{
    resolve(<span class="hljs-number">5</span>)
})</code></pre>
<p>它使得promise对象直接<code>resolve</code>，并把5传到后面<code>then</code>添加的成功函数中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.resolve(5).then(function(value){
    console.log(value) // 5
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>Promise.<span class="hljs-built_in">resolve</span>(<span class="hljs-number">5</span>).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-title">value</span>){</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">value</span>)<span class="hljs-comment"> // 5</span>
})</code></pre>
<p><strong><code>Promise.reject()</code></strong> 很明显它相当于创建了一个立即<code>reject</code>的对象。如下两段代码作用相同：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.reject(new Error('error'))

new Promise(function(resolve, reject){
    reject(new Error('error'))
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Promise</span>.reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'error'</span>))

<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>)</span>{
    reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'error'</span>))
})</code></pre>
<p>它使得promise对象直接<code>reject</code>，并把error传到后面<code>catch</code>添加的函数中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.reject(new Error('error')).catch(function(reason){
    console.log(reason) // Error: error(…)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Promise</span>.reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'error'</span>)).catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reason</span>)</span>{
    <span class="hljs-built_in">console</span>.log(reason) <span class="hljs-comment">// Error: error(…)</span>
})</code></pre>
<p><strong><code>Promise.all()</code></strong> 它接收一个promise对象组成的数组作为参数，并返回一个新的<code>promise</code>对象。</p>
<p>当数组中所有的对象都<code>resolve</code>时，新对象状态变为<code>fulfilled</code>，所有对象的<code>resolve</code>的<code>value</code>依次添加组成一个新的数组，并以新的数组作为新对象<code>resolve</code>的<code>value</code>，例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.all([Promise.resolve(5), 
  Promise.resolve(6), 
  Promise.resolve(7)]).then(function(value){
    console.log('fulfill', value)  // fulfill [5, 6, 7]
}, function(reason){
    console.log('reject',reason)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Promise</span>.all([<span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">5</span>), 
  <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">6</span>), 
  <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">7</span>)]).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'fulfill'</span>, value)  <span class="hljs-comment">// fulfill [5, 6, 7]</span>
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reason</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'reject'</span>,reason)
})</code></pre>
<p>当数组中有一个对象<code>reject</code>时，新对象状态变为<code>rejected</code>，并以当前对象<code>reject</code>的<code>reason</code>作为新对象<code>reject</code>的<code>reason</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.all([Promise.resolve(5), 
  Promise.reject(new Error('error')), 
  Promise.resolve(7),
  Promise.reject(new Error('other error'))
  ]).then(function(value){
    console.log('fulfill', value)
}, function(reason){
    console.log('reject', reason)  // reject Error: error(…)
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Promise</span>.all([<span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">5</span>), 
  <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'error'</span>)), 
  <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">7</span>),
  <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'other error'</span>))
  ]).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'fulfill'</span>, value)
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reason</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'reject'</span>, reason)  <span class="hljs-comment">// reject Error: error(…)</span>
})
</code></pre>
<p>那当数组中，传入了非promise对象会如何呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.all([Promise.resolve(5), 
  6,
  true,
  'test',
  undefined,
  null,
  {a:1},
  function(){},
  Promise.resolve(7)
  ]).then(function(value){
    console.log('fulfill', value)  // fulfill [5, 6, true, &quot;test&quot;, undefined, null, Object, function, 7]
}, function(reason){
    console.log('reject', reason)
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Promise</span>.all([<span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">5</span>), 
  <span class="hljs-number">6</span>,
  <span class="hljs-literal">true</span>,
  <span class="hljs-string">'test'</span>,
  <span class="hljs-literal">undefined</span>,
  <span class="hljs-literal">null</span>,
  {<span class="hljs-attr">a</span>:<span class="hljs-number">1</span>},
  <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{},
  <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">7</span>)
  ]).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'fulfill'</span>, value)  <span class="hljs-comment">// fulfill [5, 6, true, "test", undefined, null, Object, function, 7]</span>
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reason</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'reject'</span>, reason)
})
</code></pre>
<p>我们发现，当传入的值为数字、boolean、字符串、undefined、null、{a:1}、function(){}等非promise对象时，会依次把它们添加到新对象<code>resolve</code>时传递的数组中。</p>
<p>那数组中的多个对象是同时调用，还是一个接一个的依次调用呢？我们再看个例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function timeout(time) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(time);
        }, time);
    });
}
console.time('promise')
Promise.all([
    timeout(10),
    timeout(60),
    timeout(100)
]).then(function (values) {
    console.log(values); [10, 60, 100]
    console.timeEnd('promise');   // 107ms 
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timeout</span>(<span class="hljs-params">time</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve</span>) </span>{
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            resolve(time);
        }, time);
    });
}
<span class="hljs-built_in">console</span>.time(<span class="hljs-string">'promise'</span>)
<span class="hljs-built_in">Promise</span>.all([
    timeout(<span class="hljs-number">10</span>),
    timeout(<span class="hljs-number">60</span>),
    timeout(<span class="hljs-number">100</span>)
]).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">values</span>) </span>{
    <span class="hljs-built_in">console</span>.log(values); [<span class="hljs-number">10</span>, <span class="hljs-number">60</span>, <span class="hljs-number">100</span>]
    <span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">'promise'</span>);   <span class="hljs-comment">// 107ms </span>
});</code></pre>
<p>由此我们可以看出，传入的多个对象几乎是同时执行的，因为总的时间略大于用时最长的一个对象<code>resolve</code>的时间。</p>
<p><strong><code>Promise.race()</code></strong> 它同样接收一个promise对象组成的数组作为参数，并返回一个新的<code>promise</code>对象。</p>
<p>与<code>Promise.all()</code>不同，它是在数组中有一个对象（最早改变状态）<code>resolve</code>或<code>reject</code>时，就改变自身的状态，并执行响应的回调。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.race([Promise.resolve(5), 
  Promise.reject(new Error('error')), 
  Promise.resolve(7)]).then(function(value){
    console.log('fulfill', value)  // fulfill 5
}, function(reason){
    console.log('reject',reason)
})

Promise.race([Promise.reject(new Error('error')), 
  Promise.resolve(7)]).then(function(value){
    console.log('fulfill', value) 
}, function(reason){
    console.log('reject',reason) //reject Error: error(…)
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Promise</span>.race([<span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">5</span>), 
  <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'error'</span>)), 
  <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">7</span>)]).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'fulfill'</span>, value)  <span class="hljs-comment">// fulfill 5</span>
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reason</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'reject'</span>,reason)
})

<span class="hljs-built_in">Promise</span>.race([<span class="hljs-built_in">Promise</span>.reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'error'</span>)), 
  <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">7</span>)]).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'fulfill'</span>, value) 
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reason</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'reject'</span>,reason) <span class="hljs-comment">//reject Error: error(…)</span>
})
</code></pre>
<p>且当数组中有非异步<code>Promise</code>对象或有数字、boolean、字符串、undefined、null、{a:1}、function(){}等非<code>Promise</code>对象时，都会直接以该值<code>resolve</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.race([new Promise((resolve)=>{
    setTimeout(()=>{
        resolve(1)
    },100)}),
  Promise.resolve(5), 
  &quot;test&quot;,
  Promise.reject(new Error('error')), 
  Promise.resolve(7)]).then(function(value){
    console.log('fulfill', value)  // fulfill 5
}, function(reason){
    console.log('reject',reason)
})
// fulfill 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Promise</span>.race([<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>)=&gt;</span>{
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        resolve(<span class="hljs-number">1</span>)
    },<span class="hljs-number">100</span>)}),
  <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">5</span>), 
  <span class="hljs-string">"test"</span>,
  <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'error'</span>)), 
  <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">7</span>)]).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'fulfill'</span>, value)  <span class="hljs-comment">// fulfill 5</span>
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reason</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'reject'</span>,reason)
})
<span class="hljs-comment">// fulfill 5</span></code></pre>
<p>数组中第一个元素是异步的<code>Promise</code>，第二个是非异步<code>Promise</code>，会立即改变状态，所以新对象会立即改变状态并把<code>5</code>传递给成功时的回调函数。</p>
<p>那么问题又来了，既然数组中第一个元素成功或失败就会改变新对象的状态，那数组中后面的对象是否会执行呢?</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function timeout(time) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log(time)
            resolve(time);
        }, time);
    });
}
console.time('promise')
Promise.race([
    timeout(10),
    timeout(60),
    timeout(100)
]).then(function (values) {
    console.log(values); [10, 60, 100]
    console.timeEnd('promise');   // 107ms
});

// 结果依次为
// 10
// 10
// promise: 11.1ms
// 60
// 100" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timeout</span>(<span class="hljs-params">time</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve</span>) </span>{
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(time)
            resolve(time);
        }, time);
    });
}
<span class="hljs-built_in">console</span>.time(<span class="hljs-string">'promise'</span>)
<span class="hljs-built_in">Promise</span>.race([
    timeout(<span class="hljs-number">10</span>),
    timeout(<span class="hljs-number">60</span>),
    timeout(<span class="hljs-number">100</span>)
]).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">values</span>) </span>{
    <span class="hljs-built_in">console</span>.log(values); [<span class="hljs-number">10</span>, <span class="hljs-number">60</span>, <span class="hljs-number">100</span>]
    <span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">'promise'</span>);   <span class="hljs-comment">// 107ms</span>
});

<span class="hljs-comment">// 结果依次为</span>
<span class="hljs-comment">// 10</span>
<span class="hljs-comment">// 10</span>
<span class="hljs-comment">// promise: 11.1ms</span>
<span class="hljs-comment">// 60</span>
<span class="hljs-comment">// 100</span></code></pre>
<p>说明即使新对象的状态改变，数组中后面的promise对象还会执行完毕，其实<code>Promise.all()</code>中即使前面<code>reject</code>了，所有的对象也都会执行完毕。规范中，promise对象执行是不可以中断的。</p>
<h1 id="articleHeader5">补充</h1>
<p><code>promise</code>对象即使立马改变状态，它也是异步执行的。如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.resolve(5).then(function(value){
  console.log('后打出来', value)
});
console.log('先打出来')

// 结果依次为
// 先打出来
// 后打出来 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">5</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'后打出来'</span>, value)
});
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'先打出来'</span>)

<span class="hljs-comment">// 结果依次为</span>
<span class="hljs-comment">// 先打出来</span>
<span class="hljs-comment">// 后打出来 5</span></code></pre>
<p>但还有一个有意思的例子，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(function(){console.log(4)},0);
new Promise(function(resolve){
    console.log(1)
    for( var i=0 ; i<10000 ; i++ ){
        i==9999 &amp;&amp; resolve()
    }
    console.log(2)
}).then(function(){
    console.log(5)
});
console.log(3);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>)},<span class="hljs-number">0</span>);
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)
    <span class="hljs-keyword">for</span>( <span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span> ; i&lt;<span class="hljs-number">10000</span> ; i++ ){
        i==<span class="hljs-number">9999</span> &amp;&amp; resolve()
    }
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>)
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">5</span>)
});
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>);
</code></pre>
<p>结果是 1 2 3 5 4，命名4是先添加到异步队列中的，为什么结果不是1 2 3 4 5呢？这个涉及到Event loop，后面我会单独讲一下。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
promise介绍--基础篇

## 原文链接
[https://segmentfault.com/a/1190000007678185](https://segmentfault.com/a/1190000007678185)

