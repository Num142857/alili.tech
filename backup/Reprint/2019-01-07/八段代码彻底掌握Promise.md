---
title: '八段代码彻底掌握Promise' 
date: 2019-01-07 2:30:11
hidden: true
slug: qu7vzmp3h8g
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">1.Promise的立即执行性</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = new Promise(function(resolve, reject){
  console.log(&quot;create a promise&quot;);
  resolve(&quot;success&quot;);
});

console.log(&quot;after new Promise&quot;);

p.then(function(value){
  console.log(value);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"create a promise"</span>);
  resolve(<span class="hljs-string">"success"</span>);
});

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"after new Promise"</span>);

p.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
  <span class="hljs-built_in">console</span>.log(value);
});</code></pre>
<p>控制台输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;create a promise&quot;
&quot;after new Promise&quot;
&quot;success&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>"<span class="hljs-keyword">create</span> a promise<span class="hljs-string">"
"</span><span class="hljs-keyword">after</span> <span class="hljs-keyword">new</span> Promise<span class="hljs-string">"
"</span><span class="hljs-keyword">success</span><span class="hljs-string">"</span></code></pre>
<p>Promise对象表示未来某个将要发生的事件，但在创建（new）Promise时，作为Promise参数传入的函数是会被立即执行的，只是其中执行的代码可以是异步代码。有些同学会认为，当Promise对象调用then方法时，Promise接收的函数才会执行，这是错误的。因此，代码中"create a promise"先于"after new Promise"输出。</p>
<h3 id="articleHeader1">2.Promise 三种状态</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p1 = new Promise(function(resolve,reject){
  resolve(1);
});
var p2 = new Promise(function(resolve,reject){
  setTimeout(function(){
    resolve(2);  
  }, 500);      
});
var p3 = new Promise(function(resolve,reject){
  setTimeout(function(){
    reject(3);  
  }, 500);      
});

console.log(p1);
console.log(p2);
console.log(p3);
setTimeout(function(){
  console.log(p2);
}, 1000);
setTimeout(function(){
  console.log(p3);
}, 1000);

p1.then(function(value){
  console.log(value);
});
p2.then(function(value){
  console.log(value);
});
p3.catch(function(err){
  console.log(err);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> p1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve,reject</span>)</span>{
  resolve(<span class="hljs-number">1</span>);
});
<span class="hljs-keyword">var</span> p2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve,reject</span>)</span>{
  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    resolve(<span class="hljs-number">2</span>);  
  }, <span class="hljs-number">500</span>);      
});
<span class="hljs-keyword">var</span> p3 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve,reject</span>)</span>{
  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    reject(<span class="hljs-number">3</span>);  
  }, <span class="hljs-number">500</span>);      
});

<span class="hljs-built_in">console</span>.log(p1);
<span class="hljs-built_in">console</span>.log(p2);
<span class="hljs-built_in">console</span>.log(p3);
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(p2);
}, <span class="hljs-number">1000</span>);
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(p3);
}, <span class="hljs-number">1000</span>);

p1.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
  <span class="hljs-built_in">console</span>.log(value);
});
p2.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
  <span class="hljs-built_in">console</span>.log(value);
});
p3.catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{
  <span class="hljs-built_in">console</span>.log(err);
});</code></pre>
<p>控制台输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise {[[PromiseStatus]]: &quot;resolved&quot;, [[PromiseValue]]: 1}
Promise {[[PromiseStatus]]: &quot;pending&quot;, [[PromiseValue]]: undefined}
Promise {[[PromiseStatus]]: &quot;pending&quot;, [[PromiseValue]]: undefined}
1
2
3
Promise {[[PromiseStatus]]: &quot;resolved&quot;, [[PromiseValue]]: 2}
Promise {[[PromiseStatus]]: &quot;rejected&quot;, [[PromiseValue]]: 3}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code>Promise {<span class="hljs-string">[[PromiseStatus]]</span>: <span class="hljs-string">"resolved"</span>, <span class="hljs-string">[[PromiseValue]]</span>: <span class="hljs-number">1</span>}
Promise {<span class="hljs-string">[[PromiseStatus]]</span>: <span class="hljs-string">"pending"</span>, <span class="hljs-string">[[PromiseValue]]</span>: undefined}
Promise {<span class="hljs-string">[[PromiseStatus]]</span>: <span class="hljs-string">"pending"</span>, <span class="hljs-string">[[PromiseValue]]</span>: undefined}
<span class="hljs-number">1</span>
<span class="hljs-number">2</span>
<span class="hljs-number">3</span>
Promise {<span class="hljs-string">[[PromiseStatus]]</span>: <span class="hljs-string">"resolved"</span>, <span class="hljs-string">[[PromiseValue]]</span>: <span class="hljs-number">2</span>}
Promise {<span class="hljs-string">[[PromiseStatus]]</span>: <span class="hljs-string">"rejected"</span>, <span class="hljs-string">[[PromiseValue]]</span>: <span class="hljs-number">3</span>}</code></pre>
<p>Promise的内部实现是一个状态机。Promise有三种状态：pending，resolved，rejected。当Promise刚创建完成时，处于pending状态；当Promise中的函数参数执行了resolve后，Promise由pending状态变成resolved状态；如果在Promise的函数参数中执行的不是resolve方法，而是reject方法，那么Promise会由pending状态变成rejected状态。</p>
<p>p2、p3刚创建完成时，控制台输出的这两台Promise都处于pending状态，但为什么p1是resolved状态呢？ 这是因为p1 的函数参数中执行的是一段同步代码，Promise刚创建完成，resolve方法就已经被调用了，因而紧跟着的输出显示p1是resolved状态。我们通过两个<code>setTimeout</code>函数，延迟1s后再次输出p2、p3的状态，此时p2、p3已经执行完成，状态分别变成resolved和rejected。</p>
<h3 id="articleHeader2">3.Promise 状态的不可逆性</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p1 = new Promise(function(resolve, reject){
  resolve(&quot;success1&quot;);
  resolve(&quot;success2&quot;);
});

var p2 = new Promise(function(resolve, reject){
  resolve(&quot;success&quot;);
  reject(&quot;reject&quot;);
});

p1.then(function(value){
  console.log(value);
});

p2.then(function(value){
  console.log(value);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> p1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>)</span>{
  resolve(<span class="hljs-string">"success1"</span>);
  resolve(<span class="hljs-string">"success2"</span>);
});

<span class="hljs-keyword">var</span> p2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>)</span>{
  resolve(<span class="hljs-string">"success"</span>);
  reject(<span class="hljs-string">"reject"</span>);
});

p1.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
  <span class="hljs-built_in">console</span>.log(value);
});

p2.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
  <span class="hljs-built_in">console</span>.log(value);
});</code></pre>
<p>控制台输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;success1&quot;
&quot;success&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">"success1"</span>
<span class="hljs-string">"success"</span></code></pre>
<p>Promise状态的一旦变成resolved或rejected时，Promise的状态和值就固定下来了，不论你后续再怎么调用resolve或reject方法，都不能改变它的状态和值。因此，p1中<code>resolve("success2")</code>并不能将p1的值更改为<code>success2</code>，p2中<code>reject("reject")</code>也不能将p2的状态由resolved改变为rejected.</p>
<h3 id="articleHeader3">4.链式调用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = new Promise(function(resolve, reject){
  resolve(1);
});
p.then(function(value){               //第一个then
  console.log(value);
  return value*2;
}).then(function(value){              //第二个then
  console.log(value);
}).then(function(value){              //第三个then
  console.log(value);
  return Promise.resolve('resolve'); 
}).then(function(value){              //第四个then
  console.log(value);
  return Promise.reject('reject');
}).then(function(value){              //第五个then
  console.log('resolve: '+ value);
}, function(err){
  console.log('reject: ' + err);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>var p = new Promise(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(resolve, reject)</span></span>{
  resolve(<span class="hljs-number">1</span>);
});
p.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value)</span></span>{               //第一个<span class="hljs-keyword">then</span>
  console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">value</span>);
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">value</span>*<span class="hljs-number">2</span>;
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value)</span></span>{              //第二个<span class="hljs-keyword">then</span>
  console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">value</span>);
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value)</span></span>{              //第三个<span class="hljs-keyword">then</span>
  console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">value</span>);
  <span class="hljs-keyword">return</span> Promise.resolve(<span class="hljs-string">'resolve'</span>); 
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value)</span></span>{              //第四个<span class="hljs-keyword">then</span>
  console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">value</span>);
  <span class="hljs-keyword">return</span> Promise.reject(<span class="hljs-string">'reject'</span>);
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value)</span></span>{              //第五个<span class="hljs-keyword">then</span>
  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'resolve: '</span>+ <span class="hljs-keyword">value</span>);
}, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(err)</span></span>{
  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'reject: '</span> + err);
})</code></pre>
<p>控制台输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1
2
undefined
&quot;resolve&quot;
&quot;reject: reject&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1</span>
<span class="hljs-number">2</span>
undefined
<span class="hljs-string">"resolve"</span>
<span class="hljs-string">"reject: reject"</span></code></pre>
<p>Promise对象的then方法返回一个新的Promise对象，因此可以通过链式调用then方法。then方法接收两个函数作为参数，第一个参数是Promise执行成功时的回调，第二个参数是Promise执行失败时的回调。两个函数只会有一个被调用，函数的返回值将被用作创建then返回的Promise对象。这两个参数的返回值可以是以下三种情况中的一种：</p>
<ul>
<li>
<code>return</code> 一个同步的值 ，或者 <code>undefined</code>（当没有返回一个有效值时，默认返回undefined），<code>then</code>方法将返回一个resolved状态的Promise对象，Promise对象的值就是这个返回值。</li>
<li>
<code>return</code> 另一个 Promise，<code>then</code>方法将根据这个Promise的状态和值创建一个新的Promise对象返回。</li>
<li>
<code>throw</code> 一个同步异常，<code>then</code>方法将返回一个rejected状态的Promise,  值是该异常。</li>
</ul>
<p>根据以上分析，代码中第一个<code>then</code>会返回一个值为2（1*2），状态为resolved的Promise对象，于是第二个<code>then</code>输出的值是2。第二个<code>then</code>中没有返回值，因此将返回默认的undefined，于是在第三个<code>then</code>中输出undefined。第三个<code>then</code>和第四个<code>then</code>中分别返回一个状态是resolved的Promise和一个状态是rejected的Promise，依次由第四个<code>then</code>中成功的回调函数和第五个<code>then</code>中失败的回调函数处理。</p>
<h3 id="articleHeader4">5.Promise then() 回调异步性</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = new Promise(function(resolve, reject){
  resolve(&quot;success&quot;);
});

p.then(function(value){
  console.log(value);
});

console.log(&quot;which one is called first ?&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>)</span>{
  resolve(<span class="hljs-string">"success"</span>);
});

p.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
  <span class="hljs-built_in">console</span>.log(value);
});

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"which one is called first ?"</span>);</code></pre>
<p>控制台输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;which one is called first ?&quot;
&quot;success&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">"which one is called first ?"</span>
<span class="hljs-string">"success"</span></code></pre>
<p>Promise接收的函数参数是同步执行的，但<code>then</code>方法中的回调函数执行则是异步的，因此，"success"会在后面输出。</p>
<h3 id="articleHeader5">6.Promise 中的异常</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p1 = new Promise( function(resolve,reject){
  foo.bar();
  resolve( 1 );      
});

p1.then(
  function(value){
    console.log('p1 then value: ' + value);
  },
  function(err){
    console.log('p1 then err: ' + err);
  }
).then(
  function(value){
    console.log('p1 then then value: '+value);
  },
  function(err){
    console.log('p1 then then err: ' + err);
  }
);

var p2 = new Promise(function(resolve,reject){
  resolve( 2 );    
});

p2.then(
  function(value){
    console.log('p2 then value: ' + value);
    foo.bar();
  }, 
  function(err){
    console.log('p2 then err: ' + err);
  }
).then(
  function(value){
    console.log('p2 then then value: ' + value);
  },
  function(err){
    console.log('p2 then then err: ' + err);
    return 1;
  }
).then(
  function(value){
    console.log('p2 then then then value: ' + value);
  },
  function(err){
    console.log('p2 then then then err: ' + err);
  }
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> p1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve,reject</span>)</span>{
  foo.bar();
  resolve( <span class="hljs-number">1</span> );      
});

p1.then(
  <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'p1 then value: '</span> + value);
  },
  <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'p1 then err: '</span> + err);
  }
).then(
  <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'p1 then then value: '</span>+value);
  },
  <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'p1 then then err: '</span> + err);
  }
);

<span class="hljs-keyword">var</span> p2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve,reject</span>)</span>{
  resolve( <span class="hljs-number">2</span> );    
});

p2.then(
  <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'p2 then value: '</span> + value);
    foo.bar();
  }, 
  <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'p2 then err: '</span> + err);
  }
).then(
  <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'p2 then then value: '</span> + value);
  },
  <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'p2 then then err: '</span> + err);
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
  }
).then(
  <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'p2 then then then value: '</span> + value);
  },
  <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'p2 then then then err: '</span> + err);
  }
);</code></pre>
<p>控制台输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p1 then err: ReferenceError: foo is not defined
p2 then value: 2
p1 then then value: undefined
p2 then then err: ReferenceError: foo is not defined
p2 then then then value: 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vbscript"><code>p1 <span class="hljs-keyword">then</span> <span class="hljs-built_in">err</span>: ReferenceError: foo <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> defined
p2 <span class="hljs-keyword">then</span> value: <span class="hljs-number">2</span>
p1 <span class="hljs-keyword">then</span> <span class="hljs-keyword">then</span> value: undefined
p2 <span class="hljs-keyword">then</span> <span class="hljs-keyword">then</span> <span class="hljs-built_in">err</span>: ReferenceError: foo <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> defined
p2 <span class="hljs-keyword">then</span> <span class="hljs-keyword">then</span> <span class="hljs-keyword">then</span> value: <span class="hljs-number">1</span></code></pre>
<p>Promise中的异常由<code>then</code>参数中第二个回调函数（Promise执行失败的回调）处理，异常信息将作为Promise的值。异常一旦得到处理，<code>then</code>返回的后续Promise对象将恢复正常，并会被Promise执行成功的回调函数处理。另外，需要注意p1、p2 多级<code>then</code>的回调函数是交替执行的 ，这正是由Promise <code>then</code>回调的异步性决定的。</p>
<h3 id="articleHeader6">7.Promise.resolve()</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p1 = Promise.resolve( 1 );
var p2 = Promise.resolve( p1 );
var p3 = new Promise(function(resolve, reject){
  resolve(1);
});
var p4 = new Promise(function(resolve, reject){
  resolve(p1);
});

console.log(p1 === p2); 
console.log(p1 === p3);
console.log(p1 === p4);
console.log(p3 === p4);

p4.then(function(value){
  console.log('p4=' + value);
});

p2.then(function(value){
  console.log('p2=' + value);
})

p1.then(function(value){
  console.log('p1=' + value);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> p1 = <span class="hljs-built_in">Promise</span>.resolve( <span class="hljs-number">1</span> );
<span class="hljs-keyword">var</span> p2 = <span class="hljs-built_in">Promise</span>.resolve( p1 );
<span class="hljs-keyword">var</span> p3 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>)</span>{
  resolve(<span class="hljs-number">1</span>);
});
<span class="hljs-keyword">var</span> p4 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>)</span>{
  resolve(p1);
});

<span class="hljs-built_in">console</span>.log(p1 === p2); 
<span class="hljs-built_in">console</span>.log(p1 === p3);
<span class="hljs-built_in">console</span>.log(p1 === p4);
<span class="hljs-built_in">console</span>.log(p3 === p4);

p4.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'p4='</span> + value);
});

p2.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'p2='</span> + value);
})

p1.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'p1='</span> + value);
})</code></pre>
<p>控制台输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="true
false
false
false
p2=1
p1=1
p4=1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-literal">true</span>
<span class="hljs-literal">false</span>
<span class="hljs-literal">false</span>
<span class="hljs-literal">false</span>
<span class="hljs-string">p2=1</span>
<span class="hljs-string">p1=1</span>
<span class="hljs-string">p4=1</span></code></pre>
<p><code>Promise.resolve(...)</code>可以接收一个值或者是一个Promise对象作为参数。当参数是普通值时，它返回一个resolved状态的Promise对象，对象的值就是这个参数；当参数是一个Promise对象时，它直接返回这个Promise参数。因此，p1 === p2。但通过new的方式创建的Promise对象都是一个新的对象，因此后面的三个比较结果都是false。另外，为什么p4的<code>then</code>最先调用，但在控制台上是最后输出结果的呢？因为p4的<code>resolve</code>中接收的参数是一个Promise对象p1，<code>resolve</code>会对p1”拆箱“，获取p1的状态和值，但这个过程是异步的，可参考下一节。</p>
<h3 id="articleHeader7">8.resolve vs reject</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p1 = new Promise(function(resolve, reject){
  resolve(Promise.resolve('resolve'));
});

var p2 = new Promise(function(resolve, reject){
  resolve(Promise.reject('reject'));
});

var p3 = new Promise(function(resolve, reject){
  reject(Promise.resolve('resolve'));
});

p1.then(
  function fulfilled(value){
    console.log('fulfilled: ' + value);
  }, 
  function rejected(err){
    console.log('rejected: ' + err);
  }
);

p2.then(
  function fulfilled(value){
    console.log('fulfilled: ' + value);
  }, 
  function rejected(err){
    console.log('rejected: ' + err);
  }
);

p3.then(
  function fulfilled(value){
    console.log('fulfilled: ' + value);
  }, 
  function rejected(err){
    console.log('rejected: ' + err);
  }
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> p1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>)</span>{
  resolve(<span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-string">'resolve'</span>));
});

<span class="hljs-keyword">var</span> p2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>)</span>{
  resolve(<span class="hljs-built_in">Promise</span>.reject(<span class="hljs-string">'reject'</span>));
});

<span class="hljs-keyword">var</span> p3 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>)</span>{
  reject(<span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-string">'resolve'</span>));
});

p1.then(
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fulfilled</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'fulfilled: '</span> + value);
  }, 
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">rejected</span>(<span class="hljs-params">err</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'rejected: '</span> + err);
  }
);

p2.then(
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fulfilled</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'fulfilled: '</span> + value);
  }, 
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">rejected</span>(<span class="hljs-params">err</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'rejected: '</span> + err);
  }
);

p3.then(
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fulfilled</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'fulfilled: '</span> + value);
  }, 
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">rejected</span>(<span class="hljs-params">err</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'rejected: '</span> + err);
  }
);</code></pre>
<p>控制台输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p3 rejected: [object Promise]
p1 fulfilled: resolve
p2 rejected: reject" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>p3 <span class="hljs-string">rejected:</span> [object Promise]
p1 <span class="hljs-string">fulfilled:</span> resolve
p2 <span class="hljs-string">rejected:</span> reject</code></pre>
<p>Promise回调函数中的第一个参数<code>resolve</code>，会对Promise执行"拆箱"动作。即当<code>resolve</code>的参数是一个Promise对象时，<code>resolve</code>会"拆箱"获取这个Promise对象的状态和值，但这个过程是异步的。p1"拆箱"后，获取到Promise对象的状态是resolved，因此<code>fulfilled</code>回调被执行；p2"拆箱"后，获取到Promise对象的状态是rejected，因此<code>rejected</code>回调被执行。但Promise回调函数中的第二个参数<code>reject</code>不具备”拆箱“的能力，reject的参数会直接传递给<code>then</code>方法中的<code>rejected</code>回调。因此，即使p3 <code>reject</code>接收了一个resolved状态的Promise，<code>then</code>方法中被调用的依然是<code>rejected</code>，并且参数就是<code>reject</code>接收到的Promise对象。</p>
<hr>
<p><strong>欢迎关注我的公众号：老干部的大前端，领取21本大前端精选书籍！</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV4lGT?w=540&amp;h=193" src="https://static.alili.tech/img/bV4lGT?w=540&amp;h=193" alt="3808299627-5a93ba468b59a" title="3808299627-5a93ba468b59a" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
八段代码彻底掌握Promise

## 原文链接
[https://segmentfault.com/a/1190000010345031](https://segmentfault.com/a/1190000010345031)

