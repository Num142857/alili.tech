---
title: 'ES6关于Promise的用法' 
date: 2018-12-28 2:30:11
hidden: true
slug: klnzk31lpyq
categories: [reprint]
---

{{< raw >}}

                    
<p>Node的产生，大大推动了<code>Javascript</code>这门语言在服务端的发展，使得前端人员可以以很低的门槛转向后端开发。</p>
<p>当然，这并不代表迸发成了<em>全栈</em>。全栈的技能很集中，绝不仅仅是前端会写一些<code>HTML</code>和一些<em>交互</em>，后台熟悉<em>数据库的增删查改</em>。</p>
<p>想必接触过Node的人都知道，Node是以<em>异步(Async)回调</em>著称的，其异步性提高了程序的执行效率，但同时也减少了程序的可读性。如果我们有几个异步操作，并且后一个操作需要前一个操作返回的数据才能执行，这样按照Node的一般执行规律，要实现有序的异步操作，通常是一层加一层嵌套下去。</p>
<p>为了解决这个问题，ES6提出了<code>Promise</code>的实现。</p>
<h2 id="articleHeader0">含义</h2>
<p><em>Promise 对象用于一个异步操作的最终完成（或失败）及其结果值的表示</em>。简单点说，它就是用于处理异步操作的，异步处理成功了就执行成功的操作，异步处理失败了就捕获错误或者停止后续操作。</p>
<p>它的一般表示形式为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise(
    /* executor */
    function(resolve, reject) {
        if (/* success */) {
            // ...执行代码
            resolve();
        } else { /* fail */
            // ...执行代码
            reject();
        }
    }
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(
    <span class="hljs-comment">/* executor */</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-comment">/* success */</span>) {
            <span class="hljs-comment">// ...执行代码</span>
            resolve();
        } <span class="hljs-keyword">else</span> { <span class="hljs-comment">/* fail */</span>
            <span class="hljs-comment">// ...执行代码</span>
            reject();
        }
    }
);</code></pre>
<p>其中，Promise中的参数<code>executor</code>是一个执行器函数，它有两个参数<code>resolve</code>和<code>reject</code>。它内部通常有一些异步操作，如果异步操作成功，则可以调用resolve()来将该实例的状态置为<code>fulfilled</code>，即已完成的，如果一旦失败，可以调用reject()来将该实例的状态置为<code>rejected</code>，即失败的。</p>
<p>我们<strong>可以把Promise对象看成是一条工厂的流水线</strong>，对于流水线来说，从它的工作职能上看，它只有三种状态，一个是初始状态（刚开机的时候），一个是加工产品成功，一个是加工产品失败（出现了某些故障）。同样对于Promise对象来说，它也有三种状态：</p>
<ol>
<li>
<code>pending</code><br>初始状态,也称为未定状态，就是初始化Promise时，调用executor执行器函数后的状态。</li>
<li>
<code>fulfilled</code><br>完成状态，意味着异步操作成功。</li>
<li>
<code>rejected</code><br>失败状态，意味着异步操作失败。</li>
</ol>
<p>它只有两种状态可以转化，即</p>
<ul>
<li>操作成功<br><em>pending -&gt; fulfilled</em>
</li>
<li>操作失败<br><em>pending -&gt; rejected</em>
</li>
</ul>
<p>并且这个状态转化是<em>单向的，不可逆转</em>，已经确定的状态（fulfilled/rejected）无法转回初始状态（pending）。</p>
<h2 id="articleHeader1">方法</h2>
<h3 id="articleHeader2">Promise.prototype.then()</h3>
<p>Promise对象含有then方法，then()调用后返回一个Promise对象，意味着实例化后的Promise对象可以进行<em>链式调用</em>，而且这个then()方法可以接收两个函数，一个是处理成功后的函数，一个是处理错误结果的函数。</p>
<p>如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var promise1 = new Promise(function(resolve, reject) {
  // 2秒后置为接收状态
  setTimeout(function() {
    resolve('success');
  }, 2000);
});

promise1.then(function(data) {
  console.log(data); // success
}, function(err) {
  console.log(err); // 不执行
}).then(function(data) {
  // 上一步的then()方法没有返回值
  console.log('链式调用：' + data); // 链式调用：undefined 
}).then(function(data) {
  // ....
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> promise1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
  <span class="hljs-comment">// 2秒后置为接收状态</span>
  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    resolve(<span class="hljs-string">'success'</span>);
  }, <span class="hljs-number">2000</span>);
});

promise1.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
  <span class="hljs-built_in">console</span>.log(data); <span class="hljs-comment">// success</span>
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
  <span class="hljs-built_in">console</span>.log(err); <span class="hljs-comment">// 不执行</span>
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
  <span class="hljs-comment">// 上一步的then()方法没有返回值</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'链式调用：'</span> + data); <span class="hljs-comment">// 链式调用：undefined </span>
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
  <span class="hljs-comment">// ....</span>
});</code></pre>
<p>在这里我们主要关注promise1.then()方法调用后返回的Promise对象的状态，是<code>pending</code>还是<code>fulfilled</code>，或者是<code>rejected</code>?</p>
<p><em>返回的这个Promise对象的状态主要是根据promise1.then()方法返回的值</em>，大致分为以下几种情况：</p>
<ol>
<li>如果then()方法中返回了一个参数值，那么返回的Promise将会变成接收状态。</li>
<li>如果then()方法中抛出了一个异常，那么返回的Promise将会变成拒绝状态。</li>
<li>如果then()方法调用resolve()方法，那么返回的Promise将会变成接收状态。</li>
<li>如果then()方法调用reject()方法，那么返回的Promise将会变成拒绝状态。</li>
<li>如果then()方法返回了一个未知状态(pending)的Promise新实例，那么返回的新Promise就是未知状态。</li>
<li>如果then()方法没有明确指定的resolve(data)/reject(data)/return data时，那么返回的新Promise就是接收状态，可以一层一层地往下传递。</li>
</ol>
<p>转换实例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var promise2 = new Promise(function(resolve, reject) {
  // 2秒后置为接收状态
  setTimeout(function() {
    resolve('success');
  }, 2000);
});

promise2
  .then(function(data) {
    // 上一个then()调用了resolve，置为fulfilled态
    console.log('第一个then');
    console.log(data);
    return '2';
  })
  .then(function(data) {
    // 此时这里的状态也是fulfilled, 因为上一步返回了2
    console.log('第二个then');
    console.log(data);  // 2

    return new Promise(function(resolve, reject) {
      reject('把状态置为rejected error'); // 返回一个rejected的Promise实例
    });
  }, function(err) {
    // error
  })
  .then(function(data) {
    /* 这里不运行 */
    console.log('第三个then');
    console.log(data);
    // ....
  }, function(err) {
    // error回调
    // 此时这里的状态也是fulfilled, 因为上一步使用了reject()来返回值
    console.log('出错：' + err); // 出错：把状态置为rejected error
  })
  .then(function(data) {
    // 没有明确指定返回值，默认返回fulfilled
    console.log('这里是fulfilled态');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> promise2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
  <span class="hljs-comment">// 2秒后置为接收状态</span>
  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    resolve(<span class="hljs-string">'success'</span>);
  }, <span class="hljs-number">2000</span>);
});

promise2
  .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-comment">// 上一个then()调用了resolve，置为fulfilled态</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第一个then'</span>);
    <span class="hljs-built_in">console</span>.log(data);
    <span class="hljs-keyword">return</span> <span class="hljs-string">'2'</span>;
  })
  .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-comment">// 此时这里的状态也是fulfilled, 因为上一步返回了2</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第二个then'</span>);
    <span class="hljs-built_in">console</span>.log(data);  <span class="hljs-comment">// 2</span>

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
      reject(<span class="hljs-string">'把状态置为rejected error'</span>); <span class="hljs-comment">// 返回一个rejected的Promise实例</span>
    });
  }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
    <span class="hljs-comment">// error</span>
  })
  .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-comment">/* 这里不运行 */</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第三个then'</span>);
    <span class="hljs-built_in">console</span>.log(data);
    <span class="hljs-comment">// ....</span>
  }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
    <span class="hljs-comment">// error回调</span>
    <span class="hljs-comment">// 此时这里的状态也是fulfilled, 因为上一步使用了reject()来返回值</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'出错：'</span> + err); <span class="hljs-comment">// 出错：把状态置为rejected error</span>
  })
  .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-comment">// 没有明确指定返回值，默认返回fulfilled</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'这里是fulfilled态'</span>);
});</code></pre>
<h3 id="articleHeader3">Promise.prototype.catch()</h3>
<p>catch()方法和then()方法一样，都会返回一个新的Promise对象，它主要<em>用于捕获异步操作时出现的异常</em>。因此，我们通常省略then()方法的第二个参数，把错误处理控制权转交给其后面的catch()函数，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var promise3 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    reject('reject');
  }, 2000);
});

promise3.then(function(data) {
  console.log('这里是fulfilled状态'); // 这里不会触发
  // ...
}).catch(function(err) {
  // 最后的catch()方法可以捕获在这一条Promise链上的异常
  console.log('出错：' + err); // 出错：reject
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> promise3 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    reject(<span class="hljs-string">'reject'</span>);
  }, <span class="hljs-number">2000</span>);
});

promise3.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'这里是fulfilled状态'</span>); <span class="hljs-comment">// 这里不会触发</span>
  <span class="hljs-comment">// ...</span>
}).catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
  <span class="hljs-comment">// 最后的catch()方法可以捕获在这一条Promise链上的异常</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'出错：'</span> + err); <span class="hljs-comment">// 出错：reject</span>
});</code></pre>
<h3 id="articleHeader4">Promise.all()</h3>
<p>Promise.all()接收一个参数，它必须是<em>可以迭代的</em>，比如<em>数组</em>。</p>
<p>它通常用来处理一些并发的异步操作，即它们的结果互不干扰，但是又需要异步执行。它最终只有两种状态：<em>成功或者失败</em>。</p>
<p>它的状态受参数内各个值的状态影响，即里面状态全部为<code>fulfilled</code>时，它才会变成<code>fulfilled</code>，否则变成<code>rejected</code>。</p>
<p>成功调用后返回一个数组，数组的值是<em>有序</em>的，即按照传入参数的数组的值操作后返回的结果。如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 置为fulfilled状态的情况
var arr = [1, 2, 3];
var promises = arr.map(function(e) {
  return new Promise(function(resolve, reject) {
    resolve(e * 5);
  });
});

Promise.all(promises).then(function(data) {
    // 有序输出
  console.log(data); // [5, 10, 15]
  console.log(arr); // [1, 2, 3]
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 置为fulfilled状态的情况</span>
<span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
<span class="hljs-keyword">var</span> promises = arr.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
    resolve(e * <span class="hljs-number">5</span>);
  });
});

<span class="hljs-built_in">Promise</span>.all(promises).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-comment">// 有序输出</span>
  <span class="hljs-built_in">console</span>.log(data); <span class="hljs-comment">// [5, 10, 15]</span>
  <span class="hljs-built_in">console</span>.log(arr); <span class="hljs-comment">// [1, 2, 3]</span>
});</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 置为rejected状态的情况
var arr = [1, 2, 3];
var promises2 = arr.map(function(e) {
  return new Promise(function(resolve, reject) {
    if (e === 3) {
      reject('rejected');
    }
    resolve(e * 5);
  });
});

Promise.all(promises2).then(function(data) {
  // 这里不会执行
  console.log(data);
  console.log(arr);
}).catch(function(err) {
  console.log(err); // rejected
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 置为rejected状态的情况</span>
<span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
<span class="hljs-keyword">var</span> promises2 = arr.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
    <span class="hljs-keyword">if</span> (e === <span class="hljs-number">3</span>) {
      reject(<span class="hljs-string">'rejected'</span>);
    }
    resolve(e * <span class="hljs-number">5</span>);
  });
});

<span class="hljs-built_in">Promise</span>.all(promises2).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
  <span class="hljs-comment">// 这里不会执行</span>
  <span class="hljs-built_in">console</span>.log(data);
  <span class="hljs-built_in">console</span>.log(arr);
}).catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
  <span class="hljs-built_in">console</span>.log(err); <span class="hljs-comment">// rejected</span>
});</code></pre>
<h3 id="articleHeader5">Promise.race()</h3>
<p>Promise.race()和Promise.all()类似，都接收一个可以迭代的参数，但是<em>不同之处是Promise.race()的状态变化不是全部受参数内的状态影响，一旦参数内有一个值的状态发生的改变，那么该Promise的状态就是改变的状态</em>。就跟<code>race</code>单词的字面意思一样，谁跑的快谁赢。如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p1 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 300, 'p1 doned');
});

var p2 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 50, 'p2 doned');
});

var p3 = new Promise(function(resolve, reject) {
  setTimeout(reject, 100, 'p3 rejected');
});

Promise.race([p1, p2, p3]).then(function(data) {
  // 显然p2更快，所以状态变成了fulfilled
  // 如果p3更快，那么状态就会变成rejected
  console.log(data); // p2 doned
}).catch(function(err) {
  console.log(err); // 不执行
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> p1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
  setTimeout(resolve, <span class="hljs-number">300</span>, <span class="hljs-string">'p1 doned'</span>);
});

<span class="hljs-keyword">var</span> p2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
  setTimeout(resolve, <span class="hljs-number">50</span>, <span class="hljs-string">'p2 doned'</span>);
});

<span class="hljs-keyword">var</span> p3 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
  setTimeout(reject, <span class="hljs-number">100</span>, <span class="hljs-string">'p3 rejected'</span>);
});

<span class="hljs-built_in">Promise</span>.race([p1, p2, p3]).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
  <span class="hljs-comment">// 显然p2更快，所以状态变成了fulfilled</span>
  <span class="hljs-comment">// 如果p3更快，那么状态就会变成rejected</span>
  <span class="hljs-built_in">console</span>.log(data); <span class="hljs-comment">// p2 doned</span>
}).catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
  <span class="hljs-built_in">console</span>.log(err); <span class="hljs-comment">// 不执行</span>
});
</code></pre>
<h3 id="articleHeader6">Promise.resolve()</h3>
<p>Promise.resolve()接受一个参数值，可以是<code>普通的值</code>，<code>具有then()方法的对象</code>和<code>Promise实例</code>。正常情况下，它返回一个Promise对象，状态为<code>fulfilled</code>。但是，当解析时发生错误时，返回的Promise对象将会置为<code>rejected</code>态。如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 参数为普通值
var p4 = Promise.resolve(5);
p4.then(function(data) {
  console.log(data); // 5
});


// 参数为含有then()方法的对象
var obj = {
  then: function() {
    console.log('obj 里面的then()方法');
  }
};

var p5 = Promise.resolve(obj);
p5.then(function(data) {
  // 这里的值时obj方法里面返回的值
  console.log(data); // obj 里面的then()方法
});


// 参数为Promise实例
var p6 = Promise.resolve(7);
var p7 = Promise.resolve(p6);

p7.then(function(data) {
  // 这里的值时Promise实例返回的值
  console.log(data); // 7
});

// 参数为Promise实例,但参数是rejected态
var p8 = Promise.reject(8);
var p9 = Promise.resolve(p8);

p9.then(function(data) {
  // 这里的值时Promise实例返回的值
  console.log('fulfilled:'+ data); // 不执行
}).catch(function(err) {
  console.log('rejected:' + err); // rejected: 8
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 参数为普通值</span>
<span class="hljs-keyword">var</span> p4 = <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">5</span>);
p4.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
  <span class="hljs-built_in">console</span>.log(data); <span class="hljs-comment">// 5</span>
});


<span class="hljs-comment">// 参数为含有then()方法的对象</span>
<span class="hljs-keyword">var</span> obj = {
  <span class="hljs-attr">then</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'obj 里面的then()方法'</span>);
  }
};

<span class="hljs-keyword">var</span> p5 = <span class="hljs-built_in">Promise</span>.resolve(obj);
p5.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
  <span class="hljs-comment">// 这里的值时obj方法里面返回的值</span>
  <span class="hljs-built_in">console</span>.log(data); <span class="hljs-comment">// obj 里面的then()方法</span>
});


<span class="hljs-comment">// 参数为Promise实例</span>
<span class="hljs-keyword">var</span> p6 = <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">7</span>);
<span class="hljs-keyword">var</span> p7 = <span class="hljs-built_in">Promise</span>.resolve(p6);

p7.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
  <span class="hljs-comment">// 这里的值时Promise实例返回的值</span>
  <span class="hljs-built_in">console</span>.log(data); <span class="hljs-comment">// 7</span>
});

<span class="hljs-comment">// 参数为Promise实例,但参数是rejected态</span>
<span class="hljs-keyword">var</span> p8 = <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-number">8</span>);
<span class="hljs-keyword">var</span> p9 = <span class="hljs-built_in">Promise</span>.resolve(p8);

p9.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
  <span class="hljs-comment">// 这里的值时Promise实例返回的值</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'fulfilled:'</span>+ data); <span class="hljs-comment">// 不执行</span>
}).catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'rejected:'</span> + err); <span class="hljs-comment">// rejected: 8</span>
});</code></pre>
<h3 id="articleHeader7">Promise.reject()</h3>
<p>Promise.reject()和Promise.resolve()正好相反，它接收一个参数值<code>reason</code>，即<em>发生异常的原因</em>。此时返回的Promise对象将会置为<code>rejected</code>态。如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p10 = Promise.reject('手动拒绝');
p10.then(function(data) {
  console.log(data); // 这里不会执行，因为是rejected态
}).catch(function(err) {
  console.log(err); // 手动拒绝
}).then(function(data) {
 // 不受上一级影响
  console.log('状态：fulfilled'); // 状态：fulfilled
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code>var p10 = Promise.reject(<span class="hljs-string">'手动拒绝'</span>);
p10.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(data)</span> {</span>
  console.<span class="hljs-built_in">log</span>(data); <span class="hljs-comment">// 这里不会执行，因为是rejected态</span>
}).<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(err)</span> {</span>
  console.<span class="hljs-built_in">log</span>(err); <span class="hljs-comment">// 手动拒绝</span>
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(data)</span> {</span>
 <span class="hljs-comment">// 不受上一级影响</span>
  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'状态：fulfilled'</span>); <span class="hljs-comment">// 状态：fulfilled</span>
});</code></pre>
<p><strong>总之，除非Promise.then()方法内部抛出异常或者是明确置为rejected态，否则它返回的Promise的状态都是fulfilled态，即完成态，并且它的状态不受它的上一级的状态的影响。</strong></p>
<h2 id="articleHeader8">总结</h2>
<p>大概常用的方法就写那么多，剩下的看自己实际需要再去了解。</p>
<p>解决Node回调地狱的不止有<code>Promise</code>，还有<code>Generator</code>和ES7提出的<code>Async</code>实现。</p>
<p><strong>方法不在多，而在于精</strong>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6关于Promise的用法

## 原文链接
[https://segmentfault.com/a/1190000011652907](https://segmentfault.com/a/1190000011652907)

