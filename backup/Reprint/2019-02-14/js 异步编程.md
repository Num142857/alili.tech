---
title: 'js 异步编程' 
date: 2019-02-14 2:30:37
hidden: true
slug: bfo8wphklpg
categories: [reprint]
---

{{< raw >}}

                    
<p>大家都知道js的执行环境是单线程的，如果没有异步编程，那么js的执行效率会非常低下，导致程序十分卡顿，一提到异步编程大家首先的想到的一定是回调函数，这也是最常用的异步编程的形式，但其实常用的还有Promise和Async函数，接下来就让我们一起学习这几种常用的异步编程方法。</p>
<h2 id="articleHeader0">回调函数</h2>
<p>回调函数就是把任务的第二段单独写在一个函数里面，等到重新执行这个任务的时候，就直接调用这个函数，来看一个简单的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function print(name, callback) {
  setTimeout(() => {
    console.log(name)
    if (callback) {
      callback()
    }
  }, 1000)
}
print('a', function () {
  print('b')
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">print</span>(<span class="hljs-params">name, callback</span>) </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(name)
    <span class="hljs-keyword">if</span> (callback) {
      callback()
    }
  }, <span class="hljs-number">1000</span>)
}
print(<span class="hljs-string">'a'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  print(<span class="hljs-string">'b'</span>)
})</code></pre>
<p>上面这个例子中将print('b')放在print('a')的回调函数中，这样就能按顺序依次打印a、b,但是回调函数有一个很明显的问题，就是当回调函数嵌套过深时，会导致代码混乱，不够清晰，这就是人们常说的对调地狱，来看下面这个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function print(name, callback) {
  setTimeout(() => {
    console.log(name)
    if (callback) {
      callback()
    }
  }, 1000)
}
print('a', function () {
  print('b', function () {
    print('c', function () {
      print('d')
    })
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">print</span>(<span class="hljs-params">name, callback</span>) </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(name)
    <span class="hljs-keyword">if</span> (callback) {
      callback()
    }
  }, <span class="hljs-number">1000</span>)
}
print(<span class="hljs-string">'a'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  print(<span class="hljs-string">'b'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    print(<span class="hljs-string">'c'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      print(<span class="hljs-string">'d'</span>)
    })
  })
})</code></pre>
<p>当我们想按顺序依次打印a、b、c、d时，代码就变成上面的样子，可以看到，我们的代码形成四层嵌套，如果还要加回调函数就要继续嵌套，这样嵌套会越写越深，越来越难以维护，此时我们就必须考虑用新的技术去改进，es6的Promise函数应运而生，接下来让我们看Promise函数是如何改进这个问题的。</p>
<h2 id="articleHeader1">Promise</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function print(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(name)
      resolve()
    }, 1000)
  })
}
print('a').then(() => {
  return print('b')
})
  .then(() => {
    return print('c')
  })
  .then(() => {
    return print('d')
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">print</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(name)
      resolve()
    }, <span class="hljs-number">1000</span>)
  })
}
print(<span class="hljs-string">'a'</span>).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> print(<span class="hljs-string">'b'</span>)
})
  .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> print(<span class="hljs-string">'c'</span>)
  })
  .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> print(<span class="hljs-string">'d'</span>)
  })</code></pre>
<p>和之前用回调函数的形式相比，Promise函数写法更加清晰，由回调函数的嵌套调用变成了链式调用，但是Promise也有一个很严重的问题就是代码冗余，原来的任务被Promise包装了一下，不管什么操作都是放在then函数里面，导致代码的语以变差，有什么更好的解决办法呢？如果您对Promise函数还想有更深入的了解，可以去看阮一峰老师<a href="http://es6.ruanyifeng.com/#docs/promise" rel="nofollow noreferrer" target="_blank">es6入门</a></p>
<h2 id="articleHeader2">Async</h2>
<p>在正式使用异步函数之前，先简单的介绍一下它的用法，async通常与await一起使用，async函数返回一个Promise对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到触发的异步操作完成，再接着执行函数体后面的语句。做了简单的介绍后，接下来，我们来async函数是怎么对Promise调用优化的。看下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function print(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(name)
      resolve()
    }, 1000)
  })
}
async function test () {
  await print('a')
  await print('b')
  await print('c')
  await print('d')
}
test()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">print</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(name)
      resolve()
    }, <span class="hljs-number">1000</span>)
  })
}
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">await</span> print(<span class="hljs-string">'a'</span>)
  <span class="hljs-keyword">await</span> print(<span class="hljs-string">'b'</span>)
  <span class="hljs-keyword">await</span> print(<span class="hljs-string">'c'</span>)
  <span class="hljs-keyword">await</span> print(<span class="hljs-string">'d'</span>)
}
test()</code></pre>
<p>async函数来处理之前的问题，代码就是上面的这个例子中所展示的样子，是不是感觉代码瞬间清晰了，而且代码更加好理解了，再仔细思考一下使用async异步函数就很完美了吗？其实async异步函数也有其固有的问题，接下来我们就看看async异步函数还有什么问题需要解决。</p>
<h3 id="articleHeader3">错误捕获</h3>
<p>异步函数第一个需要解决的问题就是错误捕获的问题，让我们看看一般情况下async异步函数是怎么做错误捕获的，来看一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function print(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(name)
      resolve()
    }, 1000)
  })
}
async function test () {
  try {
    await print('a')
  } catch (err) {
    console.log(err)
  }
}
test()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">print</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(name)
      resolve()
    }, <span class="hljs-number">1000</span>)
  })
}
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">await</span> print(<span class="hljs-string">'a'</span>)
  } <span class="hljs-keyword">catch</span> (err) {
    <span class="hljs-built_in">console</span>.log(err)
  }
}
test()</code></pre>
<p>当使用上述形式的try,catch进行错误捕获的时候，是不是觉得代码和使用Promise函数时一样啰嗦，那有没有好的解决办法呢？让我们来看另外一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function print(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(name)
      resolve('a')
    }, 1000)
  })
}
async function test () {
  let [ err, result ] = await to(print('a'))
  if (err) throw err
  return result
}
test()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">print</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(name)
      resolve(<span class="hljs-string">'a'</span>)
    }, <span class="hljs-number">1000</span>)
  })
}
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> [ err, result ] = <span class="hljs-keyword">await</span> to(print(<span class="hljs-string">'a'</span>))
  <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err
  <span class="hljs-keyword">return</span> result
}
test()</code></pre>
<p>to.js:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function to(promise, errorExt) {
  return promise
    .then(function (data) { return [null, data]; })
    .catch(function (err) {
      if (errorExt) {
        Object.assign(err, errorExt);
      }
      return [err, undefined];
    });
}

export { to };
export default to;    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">to</span>(<span class="hljs-params">promise, errorExt</span>) </span>{
  <span class="hljs-keyword">return</span> promise
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{ <span class="hljs-keyword">return</span> [<span class="hljs-literal">null</span>, data]; })
    .catch(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
      <span class="hljs-keyword">if</span> (errorExt) {
        <span class="hljs-built_in">Object</span>.assign(err, errorExt);
      }
      <span class="hljs-keyword">return</span> [err, <span class="hljs-literal">undefined</span>];
    });
}

<span class="hljs-keyword">export</span> { to };
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> to;    </code></pre>
<p>上述例子中，将async异步函数的错误处理封装到了一个to.js中，这里面其实只有一个简单方法，传入一个Promise对象，对Promise对象进行错误捕获返回值，用解构的形式获取返回值和错误，这样就不需要反复写try catche做错误捕获了。<a href="https://www.npmjs.com/package/await-to-js" rel="nofollow noreferrer" target="_blank">to.js</a>是一个开源库</p>
<h3 id="articleHeader4">异步陷阱</h3>
<p>什么是异步陷阱呢？在使用async异步函数的时候，多个异步操作是可以同时执行，但是有await命令变成了继发的形式了，即必须等待前一个执行完了后一个才能执行，还是之前的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function print(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(name)
      resolve()
    }, 1000)
  })
}
async function test () {
  await print('a')
  await print('b')
  await print('c')
  await print('d')
}
test()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">print</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(name)
      resolve()
    }, <span class="hljs-number">1000</span>)
  })
}
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">await</span> print(<span class="hljs-string">'a'</span>)
  <span class="hljs-keyword">await</span> print(<span class="hljs-string">'b'</span>)
  <span class="hljs-keyword">await</span> print(<span class="hljs-string">'c'</span>)
  <span class="hljs-keyword">await</span> print(<span class="hljs-string">'d'</span>)
}
test()</code></pre>
<p>假设await print('a')、await print('b')、await print('c')、await print('d')这四个操作并没有先后的逻辑关系，可以同时执行，那么按照上面的写法就会导致前一个执行完再执行下一个，整个执行过程中的等待时间会有4s，但是同时执行的等待时间就只有1s，这是在使用async异步函数会经常忽略的一个问题，那么怎么解决呢？介绍一个我经常使用的办法，看例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function print(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(name)
      resolve('a')
    }, 1000)
  })
}
async function test () {
  Promise.all([print('a'), print('b'), print('c'), print('d')])
}
test()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">print</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(name)
      resolve(<span class="hljs-string">'a'</span>)
    }, <span class="hljs-number">1000</span>)
  })
}
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">Promise</span>.all([print(<span class="hljs-string">'a'</span>), print(<span class="hljs-string">'b'</span>), print(<span class="hljs-string">'c'</span>), print(<span class="hljs-string">'d'</span>)])
}
test()</code></pre>
<p>其实解决办法很简单就是通过Promise.all()方法，将所有异步操作作为参数数组传入，这样print('a')、print('b')、print('c')、print('d')这四个异步操作就可以并发执行了。</p>
<h2 id="articleHeader5">总结</h2>
<p>这篇文章简单的介绍了一些常用的异步编程的方法，如果有错误或不严谨的地方，欢迎批评指正，如果喜欢，欢迎点赞收藏。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js 异步编程

## 原文链接
[https://segmentfault.com/a/1190000016852548](https://segmentfault.com/a/1190000016852548)

