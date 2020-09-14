---
title: 'Promise 的链式调用与中止' 
date: 2019-01-31 2:31:16
hidden: true
slug: z4ymvs0jz2h
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">Abstract</h2>
<p>本文主要讲的是如何实现 Promise 的链式调用。也就是 <code>promise().then().then().catch()</code> 的形式，然后讨论如何在某一个 <code>then()</code> 里面中止 Promise。</p>
<p>在程序中，只要返回了一个 promise 对象，如果 promise 对象不是 Rejected 或 Fulfilled 状态，then 方法就会继续调用。利用这个特性，可以处理多个异步逻辑。但有时候某个 then 方法的执行结果可能会决定是否需要执行下一个 then，这个时候就需中止 promise，主要思想就是使用 reject 来中止 promise 的 then 继续执行。</p>
<p>“中止”这个词不知道用得是否准确。这里可能还是 <code>break</code> 的含义更精确，跳出本次 promise，不继续执行后面的 then 方法。但 promise 依旧会继续执行。</p>
<h2 id="articleHeader1">Can I use promises</h2>
<p>当前浏览器对 Promise 的支持情况见下图：</p>
<p><a href="http://caniuse.com/#search=promise" rel="nofollow noreferrer" target="_blank">http://caniuse.com/#search=promise</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007598897?w=2328&amp;h=978" src="https://static.alili.tech/img/remote/1460000007598897?w=2328&amp;h=978" alt="caniusepromise" title="caniusepromise" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">Promise</h2>
<p>先简单复习一下 Promise。Promise 其实很简单，就是一个处理异步的方法。一般可以通过 <code>new</code> 方法来调用 <code>Promise</code> 的构造器实例化一个 promise 对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var promise = new Promise((resolve, reject) => {
    // 异步处理
    // 处理结束后，调用 resolve 或 reject
    //      成功时就调用 resolve
    //      失败时就调用 reject
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-comment">// 异步处理</span>
    <span class="hljs-comment">// 处理结束后，调用 resolve 或 reject</span>
    <span class="hljs-comment">//      成功时就调用 resolve</span>
    <span class="hljs-comment">//      失败时就调用 reject</span>
});</code></pre>
<p>用 <code>new Promise</code> 实例化的 promise 对象有以下三个状态：</p>
<ul>
<li><p>"has-resolution" - Fulfilled。resolve(成功)时，此时会调用 onFulfilled</p></li>
<li><p>"has-rejection" - Rejected。reject(失败)时，此时会调用 onRejected</p></li>
<li><p>"unresolved" - Pending。既不是resolve也不是reject的状态，也就是promise对象刚被创建后的初始化状态等</p></li>
</ul>
<p>关于上面这三种状态的读法，其中左侧为在 ES6 Promises 规范中定义的术语， 而右侧则是在 Promises/A+ 中描述状态的术语。基本上状态在代码中是不会涉及到的，所以名称也无需太在意。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007598898" src="https://static.alili.tech/img/remote/1460000007598898" alt="promise state" title="promise state" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">Promise Chain</h2>
<p>先来假设一个业务需求：在系统中使用教务系统账号进行登录。首先用户在登录页面输入用户名（教务系统账号）和密码（教务系统密码）；然后判断数据库中是否存在该用户；如果不存在则使用用户名和密码模拟登录教务系统，如果模拟登录成功，则存储用户名和密码，并返回登录成功。</p>
<p>听起来就有点复杂对不对？于是画了个流程图来解释整个业务逻辑：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007598899?w=1402&amp;h=1426" src="https://static.alili.tech/img/remote/1460000007598899?w=1402&amp;h=1426" alt="flow char" title="flow char" style="cursor: pointer;"></span></p>
<p>上图只是一个简化版本，比如密码加密、session设置等没有表现出来，大家知道就好。图中 <code>(1)</code>、<code>(2)</code>、<code>(3)</code> 三个地方就是会进行异步处理的地方，一般数据库操作、网络请求都是异步的。</p>
<p>如果用传统的回调函数 <code>callback</code> 来处理上面的逻辑，嵌套的层级就会比较深，上面的业务因为有三个异步操作所以有三层回调，代码大概会是下面的样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 根据 name 查询用户信息
findUserByName(name, function(err, userinfo) {
  if (err) {
    return res.json({
      code: 1000,
      message: '查询用户信息，数据库操作数出现异常',
    });
  }


  if (userinfo.length > 0) {
  // 用户存在
  if (userinfo[0].pwd === pwd)
    // 密码正确
    return res.json({
      code: 0,
      message: '登录成功',
    });
  }

  // 数据库中不存在该用户，模拟登录教务系统
  loginEducationSystem(name, pwd, function(err, result) {
    if (err) {
      return res.json({
        code: 1001,
        message: '模拟登录教务系统出现异常',
      });
    }

    // 约定正确情况下，code 为 0
    if (result.code !== 0) {
      return res.json({
        code: 1002,
        message: '模拟登录教务系统失败，可能是用户名或密码错误',
      });
    }

    // 模拟登录成功，将用户名密码存入数据库
    saveUserToDB(name, pwd, function(err, result) {
      if (err) {
        return res.json({
          code: 1003,
          message: '将用户名密码存入数据库出现异常',
        });
      }
      if (result.code !== 0) {
        return res.json({
          code: 1004,
          message: '将用户名密码存入数据库出现异常',
        });
      }

      return res.json({
        code: 0,
        message: '登录成功!',
      });
    });
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code><span class="hljs-comment">// 根据 name 查询用户信息</span>
findUserByName(name, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(err, userinfo)</span> {</span>
  <span class="hljs-keyword">if</span> (err) {
    <span class="hljs-keyword">return</span> res.json({
      code: <span class="hljs-number">1000</span>,
      message: <span class="hljs-string">'查询用户信息，数据库操作数出现异常'</span>,
    });
  }


  <span class="hljs-keyword">if</span> (userinfo.<span class="hljs-built_in">length</span> &gt; <span class="hljs-number">0</span>) {
  <span class="hljs-comment">// 用户存在</span>
  <span class="hljs-keyword">if</span> (userinfo[<span class="hljs-number">0</span>].<span class="hljs-built_in">pwd</span> === <span class="hljs-built_in">pwd</span>)
    <span class="hljs-comment">// 密码正确</span>
    <span class="hljs-keyword">return</span> res.json({
      code: <span class="hljs-number">0</span>,
      message: <span class="hljs-string">'登录成功'</span>,
    });
  }

  <span class="hljs-comment">// 数据库中不存在该用户，模拟登录教务系统</span>
  loginEducationSystem(name, <span class="hljs-built_in">pwd</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(err, result)</span> {</span>
    <span class="hljs-keyword">if</span> (err) {
      <span class="hljs-keyword">return</span> res.json({
        code: <span class="hljs-number">1001</span>,
        message: <span class="hljs-string">'模拟登录教务系统出现异常'</span>,
      });
    }

    <span class="hljs-comment">// 约定正确情况下，code 为 0</span>
    <span class="hljs-keyword">if</span> (result.code !== <span class="hljs-number">0</span>) {
      <span class="hljs-keyword">return</span> res.json({
        code: <span class="hljs-number">1002</span>,
        message: <span class="hljs-string">'模拟登录教务系统失败，可能是用户名或密码错误'</span>,
      });
    }

    <span class="hljs-comment">// 模拟登录成功，将用户名密码存入数据库</span>
    saveUserToDB(name, <span class="hljs-built_in">pwd</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(err, result)</span> {</span>
      <span class="hljs-keyword">if</span> (err) {
        <span class="hljs-keyword">return</span> res.json({
          code: <span class="hljs-number">1003</span>,
          message: <span class="hljs-string">'将用户名密码存入数据库出现异常'</span>,
        });
      }
      <span class="hljs-keyword">if</span> (result.code !== <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">return</span> res.json({
          code: <span class="hljs-number">1004</span>,
          message: <span class="hljs-string">'将用户名密码存入数据库出现异常'</span>,
        });
      }

      <span class="hljs-keyword">return</span> res.json({
        code: <span class="hljs-number">0</span>,
        message: <span class="hljs-string">'登录成功!'</span>,
      });
    });
  });
});</code></pre>
<p>上面的代码可能存在的不优雅之处：</p>
<ul>
<li><p>随着业务逻辑变负责，回调层级会越来越深</p></li>
<li><p>代码耦合度比较高，不易修改</p></li>
<li><p>每一步操作都需要手动进行异常处理，比较麻烦</p></li>
</ul>
<p>接下来再用 promise 实现此处的业务需求。使用 promise 编码之前，可以先思考两个问题。</p>
<p>一是如何链式调用，二是如何中止链式调用。</p>
<h2 id="articleHeader4">How to Use Promise Chain</h2>
<p>业务中有三个需要异步处理的功能，所以会分别实例化三个 promise 对象，然后对 promise 进行链式调用。那么，如何进行链式调用？</p>
<p>其实也很简单，直接在 promise 的 then 方法里面返回另一个 promise 即可。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function start() {
  return new Promise((resolve, reject) => {
    resolve('start');
  });
}

start()
  .then(data => {
    // promise start
    console.log('result of start: ', data);
    return Promise.resolve(1); // p1
  })
  .then(data => {
    // promise p1
    console.log('result of p1: ', data);
    return Promise.reject(2); // p2
  })
  .then(data => {
    // promise p2
    console.log('result of p2: ', data);
    return Promise.resolve(3); // p3
  })
  .catch(ex => {
    // promise p3
    console.log('ex: ', ex);
    return Promise.resolve(4); // p4
  })
  .then(data => {
    // promise p4
    console.log('result of p4: ', data);
  });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">start</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    resolve(<span class="hljs-string">'start'</span>);
  });
}

start()
  .then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
    <span class="hljs-comment">// promise start</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'result of start: '</span>, data);
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">1</span>); <span class="hljs-comment">// p1</span>
  })
  .then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
    <span class="hljs-comment">// promise p1</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'result of p1: '</span>, data);
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-number">2</span>); <span class="hljs-comment">// p2</span>
  })
  .then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
    <span class="hljs-comment">// promise p2</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'result of p2: '</span>, data);
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">3</span>); <span class="hljs-comment">// p3</span>
  })
  .catch(<span class="hljs-function"><span class="hljs-params">ex</span> =&gt;</span> {
    <span class="hljs-comment">// promise p3</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'ex: '</span>, ex);
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">4</span>); <span class="hljs-comment">// p4</span>
  })
  .then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
    <span class="hljs-comment">// promise p4</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'result of p4: '</span>, data);
  });
</code></pre>
<p>上面的代码最终会输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="result of start:  start
result of p1:  1
ex:  2
result of p4:  4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code><span class="hljs-built_in">result</span> <span class="hljs-keyword">of</span> <span class="hljs-built_in">start</span>:  <span class="hljs-built_in">start</span>
<span class="hljs-built_in">result</span> <span class="hljs-keyword">of</span> p1:  <span class="hljs-number">1</span>
ex:  <span class="hljs-number">2</span>
<span class="hljs-built_in">result</span> <span class="hljs-keyword">of</span> p4:  <span class="hljs-number">4</span></code></pre>
<p>代码的执行逻辑如图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007598900?w=952&amp;h=1050" src="https://static.alili.tech/img/remote/1460000007598900?w=952&amp;h=1050" alt="promise chain" title="promise chain" style="cursor: pointer; display: inline;"></span></p>
<p>从图中可以看出来，代码的执行逻辑是 <code>promise start --&gt; promise p1 --&gt; promise p3 --&gt; promise p4</code>。所以结合输出结果和执行逻辑图，总结出以下几点：</p>
<ul>
<li><p>promise 的 then 方法里面可以继续返回一个新的 promise 对象</p></li>
<li><p>下一个 then 方法的参数是上一个 promise 对象的 resolve 参数</p></li>
<li><p>catch 方法的参数是其之前某个 promise 对象的 rejecte 参数</p></li>
<li><p>一旦某个 then 方法里面的 promise 状态改变为了 rejected，则promise 方法连会跳过后面的 then 直接执行 catch</p></li>
<li><p>catch 方法里面依旧可以返回一个新的 promise 对象</p></li>
</ul>
<h2 id="articleHeader5">How to Break Promise Chain</h2>
<p>接下来就该讨论如何中止 promise 方法链了。</p>
<p>通过上面的例子，我们可以知道 promise 的状态改变为 rejected 后，promise 就会跳过后面的 then 方法。</p>
<p>也就是，某个 then 里面发生异常后，就会跳过 then 方法，直接执行 catch。</p>
<p>所以，当在构造的 promise 方法链中，如果在某个 then 后面，不需要再执行 then 方法了，就可以把它当作一个异常来处理，返回一个异常信息给 catch，其参数可自定义，比如该异常的参数信息为 <code>{ notRealPromiseException: true}</code>，然后在 catch 里面判断一下 <code>notRealPromiseException</code> 是否为 <code>true</code>，如果为 <code>true</code>，就说明不是程序出现异常，而是在正常逻辑里面中止 then 方法的执行。</p>
<p>代码大概就这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="start()
  .then(data => {
    // promise start
    console.log('result of start: ', data);
    return Promise.resolve(1); // p1
    )
  .then(data => {
    // promise p1
    console.log('result of p1: ', data);
    return Promise.reject({
      notRealPromiseException: true,
    }); // p2
  })
  .then(data => {
    // promise p2
    console.log('result of p2: ', data);
    return Promise.resolve(3); // p3
  })
  .catch(ex => {
    console.log('ex: ', ex);
    if (ex.notRealPromiseException) {
      // 一切正常，只是通过 catch 方法来中止 promise chain
      // 也就是中止 promise p2 的执行
      return true;
    }
    // 真正发生异常
    return false;
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>start()
  .then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
    <span class="hljs-comment">// promise start</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'result of start: '</span>, data);
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">1</span>); <span class="hljs-comment">// p1</span>
    )
  .then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
    <span class="hljs-comment">// promise p1</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'result of p1: '</span>, data);
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject({
      <span class="hljs-attr">notRealPromiseException</span>: <span class="hljs-literal">true</span>,
    }); <span class="hljs-comment">// p2</span>
  })
  .then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
    <span class="hljs-comment">// promise p2</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'result of p2: '</span>, data);
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">3</span>); <span class="hljs-comment">// p3</span>
  })
  .catch(<span class="hljs-function"><span class="hljs-params">ex</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'ex: '</span>, ex);
    <span class="hljs-keyword">if</span> (ex.notRealPromiseException) {
      <span class="hljs-comment">// 一切正常，只是通过 catch 方法来中止 promise chain</span>
      <span class="hljs-comment">// 也就是中止 promise p2 的执行</span>
      <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }
    <span class="hljs-comment">// 真正发生异常</span>
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  });</code></pre>
<p>这样的做法可能不符合 <code>catch</code> 的语义。不过从某种意义上来说，promise 方法链没有继续执行，也可以算是一种“异常”。</p>
<h2 id="articleHeader6">Refactor Callback with Promise</h2>
<p>讲了那么多道理，现在就改来使用 promise 重构之前用回调函数写的异步逻辑了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 据 name 查询用户信息
const findUserByName = (name, pwd) => {
  return new Promise((resolve, reject) => {
    // 数据库查询操作
    if (dbError) {
      // 数据库查询出错，将 promise 设置为 rejected
      reject({
        code: 1000,
        message: '查询用户信息，数据库操作数出现异常',
      });
    }
    // 将查询结果赋给 userinfo 变量
    if (userinfo.length === 0) {
      // 数据库中不存在该用户
      resolve();
    }
    // 数据库存在该用户，判断密码是否正确
    if (pwd === userinfo[0].pwd) {
      // 密码正确，中止 promise 执行
      reject({
        notRealPromiseException: true,
        data: {
          code: 0,
          message: '密码正确，登录成功',
        }
      });
    }
    // 密码不正确，登录失败，将 Promise 设置为 Rejected 状态
    reject({
      code: 1001,
      message: '密码不正确，登录失败',
    });
  });
};


// 模拟登录教务系统
const loginEducationSystem = (name, pwd) => {
  // 登录逻辑...
  // 登录成功
  resolve();
  // 登录失败
  reject({
    code: 1002,
    message: '模拟登录教务系统失败',
  });
};


// 将用户名密码存入数据库
const saveUserToDB(name, pwd) => {
  // 数据库存储操作
  if (dbError) {
    // 数据库存储出错，将 promise 设置为 rejected
    reject({
      code: 1004,
      message: '数据库存储出错，将出现异常',
    });
  }
  // 数据库存储操作成功
  resolve();
};


findUserByName(name)
.then(() => {
  return loginEducationSystem(name, pwd);
})
.then(() => {
  return saveUserToDB(name, pwd);
})
.catch(e => {
  // 判断异常出现原因
  if (e.notRealPromiseException) {
    // 正常中止 promise 而故意设置的异常
    return res.json(e.data);
  }
  // 出现错误或异常
  return res.json(e);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 据 name 查询用户信息</span>
<span class="hljs-keyword">const</span> findUserByName = <span class="hljs-function">(<span class="hljs-params">name, pwd</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-comment">// 数据库查询操作</span>
    <span class="hljs-keyword">if</span> (dbError) {
      <span class="hljs-comment">// 数据库查询出错，将 promise 设置为 rejected</span>
      reject({
        <span class="hljs-attr">code</span>: <span class="hljs-number">1000</span>,
        <span class="hljs-attr">message</span>: <span class="hljs-string">'查询用户信息，数据库操作数出现异常'</span>,
      });
    }
    <span class="hljs-comment">// 将查询结果赋给 userinfo 变量</span>
    <span class="hljs-keyword">if</span> (userinfo.length === <span class="hljs-number">0</span>) {
      <span class="hljs-comment">// 数据库中不存在该用户</span>
      resolve();
    }
    <span class="hljs-comment">// 数据库存在该用户，判断密码是否正确</span>
    <span class="hljs-keyword">if</span> (pwd === userinfo[<span class="hljs-number">0</span>].pwd) {
      <span class="hljs-comment">// 密码正确，中止 promise 执行</span>
      reject({
        <span class="hljs-attr">notRealPromiseException</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">data</span>: {
          <span class="hljs-attr">code</span>: <span class="hljs-number">0</span>,
          <span class="hljs-attr">message</span>: <span class="hljs-string">'密码正确，登录成功'</span>,
        }
      });
    }
    <span class="hljs-comment">// 密码不正确，登录失败，将 Promise 设置为 Rejected 状态</span>
    reject({
      <span class="hljs-attr">code</span>: <span class="hljs-number">1001</span>,
      <span class="hljs-attr">message</span>: <span class="hljs-string">'密码不正确，登录失败'</span>,
    });
  });
};


<span class="hljs-comment">// 模拟登录教务系统</span>
<span class="hljs-keyword">const</span> loginEducationSystem = <span class="hljs-function">(<span class="hljs-params">name, pwd</span>) =&gt;</span> {
  <span class="hljs-comment">// 登录逻辑...</span>
  <span class="hljs-comment">// 登录成功</span>
  resolve();
  <span class="hljs-comment">// 登录失败</span>
  reject({
    <span class="hljs-attr">code</span>: <span class="hljs-number">1002</span>,
    <span class="hljs-attr">message</span>: <span class="hljs-string">'模拟登录教务系统失败'</span>,
  });
};


<span class="hljs-comment">// 将用户名密码存入数据库</span>
<span class="hljs-keyword">const</span> saveUserToDB(name, pwd) =&gt; {
  <span class="hljs-comment">// 数据库存储操作</span>
  <span class="hljs-keyword">if</span> (dbError) {
    <span class="hljs-comment">// 数据库存储出错，将 promise 设置为 rejected</span>
    reject({
      <span class="hljs-attr">code</span>: <span class="hljs-number">1004</span>,
      <span class="hljs-attr">message</span>: <span class="hljs-string">'数据库存储出错，将出现异常'</span>,
    });
  }
  <span class="hljs-comment">// 数据库存储操作成功</span>
  resolve();
};


findUserByName(name)
.then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> loginEducationSystem(name, pwd);
})
.then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> saveUserToDB(name, pwd);
})
.catch(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
  <span class="hljs-comment">// 判断异常出现原因</span>
  <span class="hljs-keyword">if</span> (e.notRealPromiseException) {
    <span class="hljs-comment">// 正常中止 promise 而故意设置的异常</span>
    <span class="hljs-keyword">return</span> res.json(e.data);
  }
  <span class="hljs-comment">// 出现错误或异常</span>
  <span class="hljs-keyword">return</span> res.json(e);
});</code></pre>
<p>在上面的代码中，实例化了三个 promise 对象，分别实现业务需求中的三个功能。然后通过 promise 方法链来调用。相比用回调函数而言，代码结构更加清晰，也更易读易懂耦合度更低更易扩展了。</p>
<h2 id="articleHeader7">Promise.all &amp;&amp; Promise.race</h2>
<p>仔细观察可以发现，在上面的 promise 代码中，<code>loginEducationSystem</code> 和 <code>saveUserToDB</code> 两个方法执行有先后顺序要求，但没有数据传递。</p>
<p>其实 promise 方法链更好用的一点是，当下一个操作依赖于上一个操作的结果的时候，可以很方便地通过 then 方法的参数来传递数据。前面页提到过，下一个 then 方法的参数就是上一个 then 方法里面 <code>resolve</code> 的参数，所以当然就可以把上一个 then 方法的执行结果作为参数传递给下一个 then 方法了。</p>
<p>还有些时候，可能 then 方法的执行顺序也没有太多要求，只需要 promise 方法链中的两个或多个 promise 全部都执行正确。这时，如果依旧一个一个去写 then 可能就比较麻烦，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function p1() {
  return new Promise((resolve) => {
    console.log(1);
    resolve();
  });
}

function p2() {
  return new Promise((resolve) => {
    console.log(2);
    resolve();
  });
}

function p3() {
  return new Promise((resolve) => {
    console.log(3);
    resolve();
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">p1</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
    resolve();
  });
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">p2</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);
    resolve();
  });
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">p3</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>);
    resolve();
  });
}</code></pre>
<p>现在只需要 <code>p1</code> <code>p2</code>  <code>p3</code> 这三个 promise 都执行，并且 promise 最终状态都是 Fulfilled，那么如果还是使用方法链，这是这样调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p1()
.then(() => {
  return p2();
})
.then(() => {
  return p3();
})
.then(() => {
  console.log('all done');
})
.catch(e => {
  console.log('e: ', e);
});

// 输出结果：
// 1
// 2
// 3
// all done" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>p1()
.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> p2();
})
.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> p3();
})
.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'all done'</span>);
})
.<span class="hljs-keyword">catch</span>(e =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'e: '</span>, e);
});

<span class="hljs-regexp">//</span> 输出结果：
<span class="hljs-regexp">//</span> <span class="hljs-number">1</span>
// <span class="hljs-number">2</span>
// <span class="hljs-number">3</span>
// all done</code></pre>
<p>代码貌似就不那么精炼了。这个时候就有了 <code>Promise.all</code> 这个方法。</p>
<p><code>Promise.all</code> 接收一个 promise对象的数组作为参数，当这个数组里的所有 promise 对象全部变为 resolve 或 reject 状态的时候，它才会去调用 <code>then</code> 方法。</p>
<p>于是，调用这几个 promise 的代码就可以这样写了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p1()
.then(() => {
  return Promise.all([
    p2(),
    p3(),
  ]);
})
.then(() => {
  console.log('all done');
})
.catch((e) => {
  console.log('e: ', e);
});

// 输出结果：
// 1
// 2
// 3
// all done" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>p1()
.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> Promise.all([
    p2(),
    p3(),
  ]);
})
.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'all done'</span>);
})
.<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-params">(e)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'e: '</span>, e);
});

<span class="hljs-regexp">//</span> 输出结果：
<span class="hljs-regexp">//</span> <span class="hljs-number">1</span>
// <span class="hljs-number">2</span>
// <span class="hljs-number">3</span>
// all done</code></pre>
<p>这样看起来貌似就精炼些了。</p>
<p>而对于 <code>Promise.race</code>，其参数也跟 <code>Promise.all</code> 一样是一个数组。只是数组中的任何一个 promise 对象如果变为 resolve 或者reject 的话，该函数就会返回，并使用这个 promise 对象的值进行 resolve 或者 reject。</p>
<p>这里就不举例了。</p>
<h2 id="articleHeader8">Conclusion</h2>
<p>到目前为止，我们就基本了解了 Promise 的用法及特点，并实现用 Promise 重构用回调函数写的异步操作。现在对 Promise 的使用，应该驾轻就熟了。</p>
<p>完。</p>
<hr>
<p>Github Issue: <a href="https://github.com/nodejh/nodejh.github.io/issues/23" rel="nofollow noreferrer" target="_blank">https://github.com/nodejh/nodejh.github.io/issues/23</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Promise 的链式调用与中止

## 原文链接
[https://segmentfault.com/a/1190000007598894](https://segmentfault.com/a/1190000007598894)

