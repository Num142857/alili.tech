---
title: '用 class 写法完整实现一个 Promise' 
date: 2018-11-30 2:30:12
hidden: true
slug: mmxc79xi77j
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.前言</h2>
<blockquote>本文分析 Promise 特性的了解，完整实现了 Promise 所有功能。没有参考原生 Promise 的写法，自己根据思路一步一步完成以及描述，每个构建模块由：1、Promise 特性描述；2、实现特性的完整思路(分析一波) 3、项目代码；4、功能测试代码 几个部分组成。大致用到的知识有： 1、变量私有化；2、订阅发布模式；3、eventloop 理解；4、Promise特性；5、class 特性；6、对象类型的判定... 算了不写了<del>强行塞这么多我也是够拼的</del><p>你可以<a href="https://github.com/li2568261/es6-record/tree/master/class%2Bpromise/code" rel="nofollow noreferrer" target="_blank">点我看源码</a>、<a href="https://github.com/li2568261/es6-record/blob/master/class%2Bpromise/class%2Bpromise.md" rel="nofollow noreferrer" target="_blank">点我看原文地址</a></p>
</blockquote>
<h2 id="articleHeader1">2.<em>Promise</em> 特征分析</h2>
<ul>
<li>
<em>Promise</em> 有三种状态： pending(执行中)、 fulfilled(成功执行)、settled(异常捕获);</li>
<li>
<em>Promise</em> 可以通过 new 关键字创建一个 未完成的 <em>Promise</em>;</li>
<li>
<em>Promise</em> 可以直接通过 <em>Promise</em>.resolve 创建一个成功完成的 <em>Promise</em> 对象;</li>
<li>
<em>Promise</em> 可以直接通过 <em>Promise</em>.reject 创建一个异常状态的 <em>Promise</em> 对象;</li>
<li>通过 new 关键字创建的 <em>Promise</em> 方法里如果出现错误，会被 <em>Promise</em> 的 reject 捕获;</li>
<li>
<em>Promise</em>.resolve / <em>Promise</em>.reject 接收 thenable 对象和 <em>Promise</em> 对象的处理方式;</li>
<li>当没有错误处理时的，全局的 <em>Promise</em> 拒绝处理;</li>
<li>串联 <em>Promise</em> 以及 <em>Promise</em> 链返回值;</li>
<li>
<em>Promise</em>.all <em>Promise</em>.race;</li>
</ul>
<h2 id="articleHeader2">3.<em>Promise</em> 的实现</h2>
<ul><li>
<h3 id="articleHeader3">状态码私有化</h3>
<p>开始之前讨论一波 class 私有属性的实现，个人想到的方案如下：</p>
<p>1.通过闭包,将变量存放在 construct 方法里；弊端，所有的其他的对象方法必须在 construct 内定义(NO)。</p>
<p>2.通过在定义 <em>Promise</em> 的环境下定义一个 Map，根据当前对象索引去获取相应的私有值；弊端，因为 Map 的 key 是强引用，当定义的 <em>Promise</em> 不用时也不会被内存回收(NO)；</p>
<p>3.通过在定义 <em>Promise</em> 的环境下定义一个 WeakMap，根据当前对象索引去获取相应的私有值； 优势，木有以上两种劣势（不写点什么感觉难受）；</p>
<p>说了这么多那么咱们要用第三种方法吗？NO，原生 [[PromiseState]] 是一个内部属性，不暴露在 <em>Promise</em> 上，但是通过浏览器的控制台可以看到，用第三种方式模仿并不能直观的在控制台看到，所以我决定还是不要作为私有变量出现，但是把枚举特性干掉了 <em>假装他是私有变量</em> <del>心里好过一点</del> 因此你就能看到下面的代码;</p>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const PENDDING = 'pendding';// 等待状态
const FULFILLED = 'resolved';// 成功操作状态
const REJECTED = 'rejected';// 捕获错误状态

class MyPromise{
  
  constructor(handler){
    // 数据初始化
    this.init();
  }
  
  // 数据初始化
  init(){
    Object.defineProperties(this,{
      '[[PromiseState]]': {
        value: PENDDING,
        writable: true,
        enumerable: false
      },
      '[[PromiseValue]]': {
        value: undefined,
        writable: true,
        enumerable: false
      },
      'thenQueue':{
        value: [],
        writable: true,
        enumerable: false
      },
      'catchQueue':{
        value: [],
        writable: true,
        enumerable: false
      }
    })
  }
  // 获取当前状态
  getPromiseState (){
    return this['[[PromiseState]]'];
  }
  // 设置当前状态
  setPromiseState (state) {
    Object.defineProperty(this, '[[PromiseState]]', {
      value: state,
      writable: false
    })
  }

  // 获取当前值
  getPromiseValue (){
    return this['[[PromiseValue]]'];
  }
  // 设置当前值
  setPromiseValue (val) {
    Object.defineProperty(this, '[[PromiseValue]]', {
      value: val
    })
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">const</span> PENDDING = <span class="hljs-string">'pendding'</span>;<span class="hljs-comment">// 等待状态</span>
<span class="hljs-keyword">const</span> FULFILLED = <span class="hljs-string">'resolved'</span>;<span class="hljs-comment">// 成功操作状态</span>
<span class="hljs-keyword">const</span> REJECTED = <span class="hljs-string">'rejected'</span>;<span class="hljs-comment">// 捕获错误状态</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyPromise</span></span>{
  
  <span class="hljs-keyword">constructor</span>(handler){
    <span class="hljs-comment">// 数据初始化</span>
    <span class="hljs-keyword">this</span>.init();
  }
  
  <span class="hljs-comment">// 数据初始化</span>
  init(){
    <span class="hljs-built_in">Object</span>.defineProperties(<span class="hljs-keyword">this</span>,{
      <span class="hljs-string">'[[PromiseState]]'</span>: {
        <span class="hljs-attr">value</span>: PENDDING,
        <span class="hljs-attr">writable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>
      },
      <span class="hljs-string">'[[PromiseValue]]'</span>: {
        <span class="hljs-attr">value</span>: <span class="hljs-literal">undefined</span>,
        <span class="hljs-attr">writable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>
      },
      <span class="hljs-string">'thenQueue'</span>:{
        <span class="hljs-attr">value</span>: [],
        <span class="hljs-attr">writable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>
      },
      <span class="hljs-string">'catchQueue'</span>:{
        <span class="hljs-attr">value</span>: [],
        <span class="hljs-attr">writable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>
      }
    })
  }
  <span class="hljs-comment">// 获取当前状态</span>
  getPromiseState (){
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>[<span class="hljs-string">'[[PromiseState]]'</span>];
  }
  <span class="hljs-comment">// 设置当前状态</span>
  setPromiseState (state) {
    <span class="hljs-built_in">Object</span>.defineProperty(<span class="hljs-keyword">this</span>, <span class="hljs-string">'[[PromiseState]]'</span>, {
      <span class="hljs-attr">value</span>: state,
      <span class="hljs-attr">writable</span>: <span class="hljs-literal">false</span>
    })
  }

  <span class="hljs-comment">// 获取当前值</span>
  getPromiseValue (){
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>[<span class="hljs-string">'[[PromiseValue]]'</span>];
  }
  <span class="hljs-comment">// 设置当前值</span>
  setPromiseValue (val) {
    <span class="hljs-built_in">Object</span>.defineProperty(<span class="hljs-keyword">this</span>, <span class="hljs-string">'[[PromiseValue]]'</span>, {
      <span class="hljs-attr">value</span>: val
    })
  }
}
</code></pre>
<ul><li>
<h3 id="articleHeader4">创建一个未完成状态的<em>Promise</em>
</h3>
<p>函数调用过程分析：</p>
<ol>
<li>使用者通过 new 关键字传入一个方法；</li>
<li>方法有两个参数 <code>resolve</code> 和 <code>reject</code> 两个方法</li>
<li>当传入的方法调用 <code>resolve</code> 时，状态变为 fulfilled，有且只有接收一次 <code>resolve</code> 里的方法里的值作为 <code>[[PromiseValue]]</code>，供该 <em>Promise</em> 对象下的 <code>then</code> 方法使用；</li>
<li>当传入的方法调用 <code>reject</code> 时，状态变为 rejected，有且只有接收一次 <code>reject</code> 里的方法里的值作为 <code>[[PromiseValue]]</code>，供该 <em>Promise</em> 对象下的 <code>catch</code> 方法使用；</li>
</ol>
</li></ul>
<p>代码思路：</p>
<ol>
<li>首先传入的函数应该在 construct 方法里进行调用；</li>
<li>因具备一个存放待执行成功操作方法的队列，一个存放捕获异常方法的队列。</li>
<li>
<p><code>resolve</code> 方法下处理的问题是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1、判断当前状态是否是等待状态，如果不是则啥也不干，如果是走第二步

2、修改```[[PromiseState]]```为FULFILLED;

3、将 ```[[PromiseValue]]``` 赋值为方法传递进来的参数； 

4、成功操作方法的队列在 eventloop 结束后<sup>①</sup>依次调用然后清空，捕获异常方法的队列清空；" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-number">1</span>、判断当前状态是否是等待状态，如果不是则啥也不干，如果是走第二步

<span class="hljs-number">2</span>、修改```[[PromiseState]]```为FULFILLED;

<span class="hljs-number">3</span>、将 ```[[PromiseValue]]``` 赋值为方法传递进来的参数； 

<span class="hljs-number">4</span>、成功操作方法的队列在 eventloop 结束后&lt;sup&gt;①&lt;/sup&gt;依次调用然后清空，捕获异常方法的队列清空；</code></pre>
</li>
<li>
<code>reject</code> 方法基本就不赘述啦......</li>
<li>
<p><code>then</code> 方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1、 判断当前状态是否为等待，是等待进行第 2 步，否则进行第 3 步；

2、 加入成功操作方法队列；

3、 当前eventloop 结束异步调用；" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1</span>、 判断当前状态是否为等待，是等待进行第 <span class="hljs-number">2</span> 步，否则进行第 <span class="hljs-number">3</span> 步；

<span class="hljs-number">2</span>、 加入成功操作方法队列；

<span class="hljs-number">3</span>、 当前eventloop 结束异步调用；</code></pre>
</li>
<li>
<code>catch</code> 方法不赘述</li>
</ol>
<p>ps: 注①因为无法将任务插入 microtask 中，就用 eventloop结束作为替代；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // 事件循环最后执行
  const eventLoopEndRun = function (handler){
    setImmediate(()=>{
      handler()
    })
  }
  // ...

  class MyPromise{
  
    constructor(handler){
      // ...
      
      // 方法传递，通过 bind 保持两个方法对当前对象的引用
      handler(this.resolve.bind(this), this.reject.bind(this));
    }

    // ...

    // 清空等待队列
    clearQueue (currentState) {
      
      const doQueue = currentState === REJECTED ? this.catchQueue : this.thenQueue;
      const promiseData = this.getPromiseValue();

      doQueue.forEach(queueHandler=>queueHandler(promiseData));
      this.catchQueue = [];
      this.thenQueue = []
    }

    // 状态改变方法
    changeStateHandler (currentState, data){

      this.setPromiseState(currentState);
      this.setPromiseValue(data);
      setImmediate(()=>{this.clearQueue(currentState)});
      
      // 保持状态只能改变一次
      this.changeStateHandler = null;
      this.setPromiseState = null;
      this.setPromiseValue = null;
    }

    // 不解释
    resolve (data) {
      this.changeStateHandler &amp;&amp; this.changeStateHandler(FULFILLED, data);
    }
    // 不解释
    reject (err) {
      this.changeStateHandler &amp;&amp; this.changeStateHandler(REJECTED, err);
    }

    // 不解释
    then(thenHandler){
      
      const currentState = this.getPromiseState();
      const promiseData = this.getPromiseValue();

      if (currentState === FULFILLED) thenHandler(promiseData);
      else if (currentState === PENDDING) this.thenQueue.push(thenHandler);
    }

    // 不解释
    catch(catchHandler){
      
      const currentState = this.getPromiseState();
      const promiseData = this.getPromiseValue();

      if (currentState === REJECTED) catchHandler(promiseData);
      else if (currentState === PENDDING) this.catchQueue.push(catchHandler);
    }
  }

  // 测试方法


  const test1 = new MyPromise((resolve,reject)=>{
    setTimeout(()=>{
      resolve('2s 后输出了我');
    }, 2000)
  });

  const test2 = new MyPromise((resolve,reject)=>{
    setTimeout(()=>{
      reject('我出错啦！')
    }, 2000)
  })

  test1.then(data=>console.log(data));
  test1.catch(err=>console.log(err));
  test2.then(data=>console.log(data));
  test2.catch(err=>console.log(err));
  console.log(&quot;我是最早的&quot;);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-comment">// 事件循环最后执行</span>
  <span class="hljs-keyword">const</span> eventLoopEndRun = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">handler</span>)</span>{
    setImmediate(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
      handler()
    })
  }
  <span class="hljs-comment">// ...</span>

  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyPromise</span></span>{
  
    <span class="hljs-keyword">constructor</span>(handler){
      <span class="hljs-comment">// ...</span>
      
      <span class="hljs-comment">// 方法传递，通过 bind 保持两个方法对当前对象的引用</span>
      handler(<span class="hljs-keyword">this</span>.resolve.bind(<span class="hljs-keyword">this</span>), <span class="hljs-keyword">this</span>.reject.bind(<span class="hljs-keyword">this</span>));
    }

    <span class="hljs-comment">// ...</span>

    <span class="hljs-comment">// 清空等待队列</span>
    clearQueue (currentState) {
      
      <span class="hljs-keyword">const</span> doQueue = currentState === REJECTED ? <span class="hljs-keyword">this</span>.catchQueue : <span class="hljs-keyword">this</span>.thenQueue;
      <span class="hljs-keyword">const</span> promiseData = <span class="hljs-keyword">this</span>.getPromiseValue();

      doQueue.forEach(<span class="hljs-function"><span class="hljs-params">queueHandler</span>=&gt;</span>queueHandler(promiseData));
      <span class="hljs-keyword">this</span>.catchQueue = [];
      <span class="hljs-keyword">this</span>.thenQueue = []
    }

    <span class="hljs-comment">// 状态改变方法</span>
    changeStateHandler (currentState, data){

      <span class="hljs-keyword">this</span>.setPromiseState(currentState);
      <span class="hljs-keyword">this</span>.setPromiseValue(data);
      setImmediate(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{<span class="hljs-keyword">this</span>.clearQueue(currentState)});
      
      <span class="hljs-comment">// 保持状态只能改变一次</span>
      <span class="hljs-keyword">this</span>.changeStateHandler = <span class="hljs-literal">null</span>;
      <span class="hljs-keyword">this</span>.setPromiseState = <span class="hljs-literal">null</span>;
      <span class="hljs-keyword">this</span>.setPromiseValue = <span class="hljs-literal">null</span>;
    }

    <span class="hljs-comment">// 不解释</span>
    resolve (data) {
      <span class="hljs-keyword">this</span>.changeStateHandler &amp;&amp; <span class="hljs-keyword">this</span>.changeStateHandler(FULFILLED, data);
    }
    <span class="hljs-comment">// 不解释</span>
    reject (err) {
      <span class="hljs-keyword">this</span>.changeStateHandler &amp;&amp; <span class="hljs-keyword">this</span>.changeStateHandler(REJECTED, err);
    }

    <span class="hljs-comment">// 不解释</span>
    then(thenHandler){
      
      <span class="hljs-keyword">const</span> currentState = <span class="hljs-keyword">this</span>.getPromiseState();
      <span class="hljs-keyword">const</span> promiseData = <span class="hljs-keyword">this</span>.getPromiseValue();

      <span class="hljs-keyword">if</span> (currentState === FULFILLED) thenHandler(promiseData);
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (currentState === PENDDING) <span class="hljs-keyword">this</span>.thenQueue.push(thenHandler);
    }

    <span class="hljs-comment">// 不解释</span>
    <span class="hljs-keyword">catch</span>(catchHandler){
      
      <span class="hljs-keyword">const</span> currentState = <span class="hljs-keyword">this</span>.getPromiseState();
      <span class="hljs-keyword">const</span> promiseData = <span class="hljs-keyword">this</span>.getPromiseValue();

      <span class="hljs-keyword">if</span> (currentState === REJECTED) catchHandler(promiseData);
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (currentState === PENDDING) <span class="hljs-keyword">this</span>.catchQueue.push(catchHandler);
    }
  }

  <span class="hljs-comment">// 测试方法</span>


  <span class="hljs-keyword">const</span> test1 = <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>)=&gt;</span>{
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
      resolve(<span class="hljs-string">'2s 后输出了我'</span>);
    }, <span class="hljs-number">2000</span>)
  });

  <span class="hljs-keyword">const</span> test2 = <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>)=&gt;</span>{
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
      reject(<span class="hljs-string">'我出错啦！'</span>)
    }, <span class="hljs-number">2000</span>)
  })

  test1.then(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span><span class="hljs-built_in">console</span>.log(data));
  test1.catch(<span class="hljs-function"><span class="hljs-params">err</span>=&gt;</span><span class="hljs-built_in">console</span>.log(err));
  test2.then(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span><span class="hljs-built_in">console</span>.log(data));
  test2.catch(<span class="hljs-function"><span class="hljs-params">err</span>=&gt;</span><span class="hljs-built_in">console</span>.log(err));
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"我是最早的"</span>);
</code></pre>
<ul><li>
<h3 id="articleHeader5">创建一个完成状态的<em>Promise</em>
</h3>
<p>通过 <em>Promise</em>.resolve() 创建一个成功操作的 <em>Promise</em> 对象； <em>Promise</em>.reject() 创建一个捕获错误的 <em>Promise</em> 对象，new 关键字传入的方法体有报错，会直接被 reject 捕获；</p>
<p>分析一波：</p>
<ol>
<li>能直接调用的方法，妥妥应该的是一个静态方法；</li>
<li>调用之后要生成一个新的 <em>Promise</em> 对象；</li>
<li>所以咱们就要分两步走 1，创建一个 <em>Promise</em> 对象，然后调用其 resolve 方法.</li>
<li>因为实例化的对象不能获取寄几的 static 方法</li>
<li>通过 try+catch 捕获 handler 异常，并通过 reject 进行抛出；</li>
</ol>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
  // ...
  // construct 方法新增一个类型，当 new 关键字进来传递的不是一个函数，咱们同样在 eventLoop 结束抛出一个错误
  if(Object.prototype.toString.call(handler) !== &quot;[object Function]&quot;){
    eventLoopEndRun(()=>{
      throw new Error(`MyPromise resolver ${typeof handler} is not a function`)
    })
  } else {
    // 方法传递，this指向会变，通过 bind 保持两个方法对当前对象的引用
    // 当然也可以这么玩：data=>this.resolve(data)
    try{
      handler(this.resolve.bind(this), this.reject.bind(this));
    } catch(err) {
      this.reject(err);
    }
  }

  // ...
  // 不解释
  static resolve (data) {
    return new MyPromise(resolve=>resolve(data));
  }
  // 不解释
  static reject (err) {
    return new MyPromise((resolve, reject)=>{reject(err)});
  }

  // 测试方法
  var resolvePromise =  MyPromise.resolve(111);

  resolvePromise.then(data=>console.log(data));

  var rejectPromise =  MyPromise.reject('这个错了');

  rejectPromise.catch(data=>console.log(data));

  new MyPromise();

  var errPromise = new MyPromise(()=>{throw new Error(&quot;我错了&quot;)});
  errPromise.catch(data=>console.log(data.message));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
  <span class="hljs-comment">// ...</span>
  <span class="hljs-comment">// construct 方法新增一个类型，当 new 关键字进来传递的不是一个函数，咱们同样在 eventLoop 结束抛出一个错误</span>
  <span class="hljs-keyword">if</span>(<span class="hljs-built_in">Object</span>.prototype.toString.call(handler) !== <span class="hljs-string">"[object Function]"</span>){
    eventLoopEndRun(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">`MyPromise resolver <span class="hljs-subst">${<span class="hljs-keyword">typeof</span> handler}</span> is not a function`</span>)
    })
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// 方法传递，this指向会变，通过 bind 保持两个方法对当前对象的引用</span>
    <span class="hljs-comment">// 当然也可以这么玩：data=&gt;this.resolve(data)</span>
    <span class="hljs-keyword">try</span>{
      handler(<span class="hljs-keyword">this</span>.resolve.bind(<span class="hljs-keyword">this</span>), <span class="hljs-keyword">this</span>.reject.bind(<span class="hljs-keyword">this</span>));
    } <span class="hljs-keyword">catch</span>(err) {
      <span class="hljs-keyword">this</span>.reject(err);
    }
  }

  <span class="hljs-comment">// ...</span>
  <span class="hljs-comment">// 不解释</span>
  <span class="hljs-keyword">static</span> resolve (data) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function"><span class="hljs-params">resolve</span>=&gt;</span>resolve(data));
  }
  <span class="hljs-comment">// 不解释</span>
  <span class="hljs-keyword">static</span> reject (err) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>)=&gt;</span>{reject(err)});
  }

  <span class="hljs-comment">// 测试方法</span>
  <span class="hljs-keyword">var</span> resolvePromise =  MyPromise.resolve(<span class="hljs-number">111</span>);

  resolvePromise.then(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span><span class="hljs-built_in">console</span>.log(data));

  <span class="hljs-keyword">var</span> rejectPromise =  MyPromise.reject(<span class="hljs-string">'这个错了'</span>);

  rejectPromise.catch(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span><span class="hljs-built_in">console</span>.log(data));

  <span class="hljs-keyword">new</span> MyPromise();

  <span class="hljs-keyword">var</span> errPromise = <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{<span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"我错了"</span>)});
  errPromise.catch(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span><span class="hljs-built_in">console</span>.log(data.message));</code></pre>
<ul><li>
<h3 id="articleHeader6">thenable 对象 + 全局错误监听</h3>
<p>thenable 对象是啥？就是有个属性为 then 方法的对象，then 方法里有两个参数，resolve、reject 至于 resolve 和 reject 的作用，就不赘述啦 <del>好像还是打了很多字</del>。</p>
<p>全局错误监听，监听分为两种（书上的说法是）: 一个触发是当前事件循环结束前没有catch 当前错误 <em>Promise</em> --- unhandledRejection；一个触发是当前事件循环后，当 <em>Promise</em> 被拒绝，并且没有 catch 程序，就会被触发 --- rejectionHandled。经过 node 环境下测试(在 Chrome 控制台测试好像无论如何都不会被触发)感觉是 rejectionHandled 触发实在新的时间循环添加 catch 程序后才会被触发，大致流程图如下。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014888359?w=1078&amp;h=986" src="https://static.alili.tech/img/remote/1460000014888359?w=1078&amp;h=986" alt="流程图" title="流程图" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
let rejected;

process.on('unhandledRejection',function(event){
  console.log('onunhandledrejection');
})

process.on('rejectionHandled',function(event){
  console.log('onrejectionhandled');
})

rejected = Promise.reject(new Error('xx'))

eventLoopEndRun(()=>{
  console.log(123);
  rejected.catch(err=>{
    console.log(err.message)
  })
  rejected.catch(err=>{
    console.log(err.message)
  })
}) 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">let</span> rejected;

process.on(<span class="hljs-string">'unhandledRejection'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'onunhandledrejection'</span>);
})

process.on(<span class="hljs-string">'rejectionHandled'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'onrejectionhandled'</span>);
})

rejected = <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'xx'</span>))

eventLoopEndRun(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">123</span>);
  rejected.catch(<span class="hljs-function"><span class="hljs-params">err</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(err.message)
  })
  rejected.catch(<span class="hljs-function"><span class="hljs-params">err</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(err.message)
  })
}) 
</code></pre>
<p>分析一波：</p>
<ol>
<li>在 reject 阶段进行订阅 <code>unhanlderReject</code> 事件；</li>
<li>catch 函数中移除当前 <em>Promise</em> 对 <code>unhandledRejection</code> 事件的订阅，执行传入 catch 前发布当前 <em>Promise</em> 的 <code>rejectionHandled</code> 事件。</li>
<li>当前事件循环结束，我们需要优先对 <code>unhanlderReject</code> 事件进行发布，所以我们需要调整eventLoopEndRun 函数；当<em>Promise</em>没有 catch 程序,且没有全局没有 <code>unhanlderReject</code> 监听，我们就要抛出相应的错误。</li>
<li>我们需要自定义这个 订阅发布者，然后能通过当前 <em>Promise</em> 使得事件触发绑定相应的回调。</li>
<li>这个发布订阅者具有备的功能有： 1、新增监听回调；2、订阅和取消订阅；3、相应的事件发布后，将对应 map 中 <em>Promise</em> 修改状态。</li>
</ol>
</li></ul>
<p>于是乎代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // PromiseSubscribePublish.js
  const UNHANDLEDREJECTION = 'UNHANDLEDREJECTION'; // 当前事件循环，无 catch 函数状态；
  const REJECTIONHANDLED = 'REJECTIONHANDLED'; // 事件循环后，无 catch 函数状态；

  class PromiseSubscribePublish{

    constructor(){
      this.subscribeUnhandler = new Map();
      this.subscribeHandler = new Map();
      this.errFuc = {}
    }

    // 监听事件绑定
    bindLisener (type, cb){
      console.log(type.toUpperCase(), UNHANDLEDREJECTION)
      if(type.toUpperCase() !== UNHANDLEDREJECTION &amp;&amp; type.toUpperCase() !== REJECTIONHANDLED) throw Error('type toUpperCase must be UNHANDLEDREJECTION or REJECTIONHANDLED');
      if(Object.prototype.toString.call(cb) !== &quot;[object Function]&quot;) throw Error('callback is not function');
      this.errFuc[type.toUpperCase()] = cb;
    }

    subscribe(promise, err){
      // 订阅一波，以当前 Promise 为 key，err 为参数,加入 unhandler map 中
      this.subscribeUnhandler.set(promise, err)
    }

    quitSubscribe(promise){
      this.subscribeUnhandler.delete(promise);
    }

    publish (type, promise) {
      
      let changgeStateFuc; // 定义当前状态变换操作
      const errFuc = this.errFuc[type]; // 当前绑定的监听函数


      
      if(type === UNHANDLEDREJECTION){
        // 没有订阅事件的 promise 则啥也不干
        if (!this.subscribeUnhandler.size) return;
        // 根据当前事件类型，选择处理函数
        changgeStateFuc = (err, promise)=>{
          this.subscribeHandler.set(promise);
          this.subscribeUnhandler.delete(promise, err);
        }
        // 不论如何当前时间循环下的等待队列状态全部需要变更
        if(errFuc){
          this.subscribeUnhandler.forEach((err, promise)=>{
            errFuc(err, promise)
            changgeStateFuc(err, promise)
          })
        } else {
          this.subscribeUnhandler.forEach((err, promise)=>{
            changgeStateFuc(err, promise)
          })
          console.error('Uncaught (in promise)', err);
        }

      } else {
        // 如果该 promise 没有进行订阅
        if(!this.subscribeHandler.has(promise)) return;
        // 哪个 promise 发布 catch 函数，就根据当前 Promise 执行相应方法，并将其从 Handler 订阅者里删除
        
        errFuc &amp;&amp; errFuc(promise);
        this.subscribeHandler.delete(promise);

      } 

    }
  }

  // 定义一些静态成员变量 默认不可写
  Object.defineProperties(PromiseSubscribePublish, {
    [UNHANDLEDREJECTION]:{
      value: UNHANDLEDREJECTION
    },
    [REJECTIONHANDLED]:{
      value: REJECTIONHANDLED
    }
  })

  module.exports = PromiseSubscribePublish;

  // MyPromise.js
  // ..
  const PromiseSubscribePublish = require('./PromiseSubscribePublish');

  const promiseSubscribePublish = new PromiseSubscribePublish();

  // 事件循环最后执行
  const eventLoopEndRun = (()=>{
    let unhandledPub;
    let timer;
    const queueHandler = [];
    // 激活事件循环最后执行
    const activateRun = ()=>{
      // 截流
      timer &amp;&amp; clearTimeout(timer);
      timer = setTimeout(()=>{
        unhandledPub &amp;&amp; unhandledPub();
        let handler = queueHandler.shift();
        while(handler){
          handler();
          handler = queueHandler.shift();
        }
      },0);
    }
    
    // 设置 unhanldedReject 优先级最高 ， 直接加入队列
    return (handler,immediate)=> {
      immediate ? unhandledPub = handler : queueHandler.push(handler);
      activateRun();
    }
  })()
  
  //...
  reject (err) {
    this.changeStateHandler &amp;&amp; this.changeStateHandler(REJECTED, err);
    promiseSubscribePublish.subscribe(this, err);
    // 存在 reject ，事件循环结束发布 UNHANDLEDREJECTION
    eventLoopEndRun(()=>
      promiseSubscribePublish.publish(PromiseSubscribePublish.UNHANDLEDREJECTION, this),
      true
    );
  }

  //...

  static unhandledRejectionLisener(cb){
    promiseSubscribePublish.bindLisener(PromiseSubscribePublish.UNHANDLEDREJECTION ,cb)
  }

  static rejectionHandledLisener(cb){
    promiseSubscribePublish.bindLisener(PromiseSubscribePublish.REJECTIONHANDLED ,cb)
  }

  // ...
  catch(catchHandler){
    
    const currentState = this.getPromiseState();
    const promiseData = this.getPromiseValue();

    // 取消当前事件循环下 reject 状态未 catch 事件订阅;
    promiseSubscribePublish.quitSubscribe(this);
    
    if (currentState === REJECTED) {
      
      eventLoopEndRun(()=>{
        // 发布 catch 处理
        promiseSubscribePublish.publish(PromiseSubscribePublish.REJECTIONHANDLED, this);
        catchHandler(promiseData);
      });

    }
    else if (currentState === PENDDING) this.catchQueue.push(catchHandler);
  }


  // 测试代码

  MyPromise.unhandledRejectionLisener((err,promise)=>{
    console.log(err, promise);
  }) 
  MyPromise.rejectionHandledLisener((err,promise)=>{
    console.log(err, promise);
  }) 
  var myPromise = MyPromise.reject(11);
  // myPromise.catch(()=>{console.log('catch')});
  setTimeout(()=>{
    myPromise.catch(()=>{console.log('catch')});
  },1000)

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-comment">// PromiseSubscribePublish.js</span>
  <span class="hljs-keyword">const</span> UNHANDLEDREJECTION = <span class="hljs-string">'UNHANDLEDREJECTION'</span>; <span class="hljs-comment">// 当前事件循环，无 catch 函数状态；</span>
  <span class="hljs-keyword">const</span> REJECTIONHANDLED = <span class="hljs-string">'REJECTIONHANDLED'</span>; <span class="hljs-comment">// 事件循环后，无 catch 函数状态；</span>

  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">PromiseSubscribePublish</span></span>{

    <span class="hljs-keyword">constructor</span>(){
      <span class="hljs-keyword">this</span>.subscribeUnhandler = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>();
      <span class="hljs-keyword">this</span>.subscribeHandler = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>();
      <span class="hljs-keyword">this</span>.errFuc = {}
    }

    <span class="hljs-comment">// 监听事件绑定</span>
    bindLisener (type, cb){
      <span class="hljs-built_in">console</span>.log(type.toUpperCase(), UNHANDLEDREJECTION)
      <span class="hljs-keyword">if</span>(type.toUpperCase() !== UNHANDLEDREJECTION &amp;&amp; type.toUpperCase() !== REJECTIONHANDLED) <span class="hljs-keyword">throw</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'type toUpperCase must be UNHANDLEDREJECTION or REJECTIONHANDLED'</span>);
      <span class="hljs-keyword">if</span>(<span class="hljs-built_in">Object</span>.prototype.toString.call(cb) !== <span class="hljs-string">"[object Function]"</span>) <span class="hljs-keyword">throw</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'callback is not function'</span>);
      <span class="hljs-keyword">this</span>.errFuc[type.toUpperCase()] = cb;
    }

    subscribe(promise, err){
      <span class="hljs-comment">// 订阅一波，以当前 Promise 为 key，err 为参数,加入 unhandler map 中</span>
      <span class="hljs-keyword">this</span>.subscribeUnhandler.set(promise, err)
    }

    quitSubscribe(promise){
      <span class="hljs-keyword">this</span>.subscribeUnhandler.delete(promise);
    }

    publish (type, promise) {
      
      <span class="hljs-keyword">let</span> changgeStateFuc; <span class="hljs-comment">// 定义当前状态变换操作</span>
      <span class="hljs-keyword">const</span> errFuc = <span class="hljs-keyword">this</span>.errFuc[type]; <span class="hljs-comment">// 当前绑定的监听函数</span>


      
      <span class="hljs-keyword">if</span>(type === UNHANDLEDREJECTION){
        <span class="hljs-comment">// 没有订阅事件的 promise 则啥也不干</span>
        <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.subscribeUnhandler.size) <span class="hljs-keyword">return</span>;
        <span class="hljs-comment">// 根据当前事件类型，选择处理函数</span>
        changgeStateFuc = <span class="hljs-function">(<span class="hljs-params">err, promise</span>)=&gt;</span>{
          <span class="hljs-keyword">this</span>.subscribeHandler.set(promise);
          <span class="hljs-keyword">this</span>.subscribeUnhandler.delete(promise, err);
        }
        <span class="hljs-comment">// 不论如何当前时间循环下的等待队列状态全部需要变更</span>
        <span class="hljs-keyword">if</span>(errFuc){
          <span class="hljs-keyword">this</span>.subscribeUnhandler.forEach(<span class="hljs-function">(<span class="hljs-params">err, promise</span>)=&gt;</span>{
            errFuc(err, promise)
            changgeStateFuc(err, promise)
          })
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">this</span>.subscribeUnhandler.forEach(<span class="hljs-function">(<span class="hljs-params">err, promise</span>)=&gt;</span>{
            changgeStateFuc(err, promise)
          })
          <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'Uncaught (in promise)'</span>, err);
        }

      } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// 如果该 promise 没有进行订阅</span>
        <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">this</span>.subscribeHandler.has(promise)) <span class="hljs-keyword">return</span>;
        <span class="hljs-comment">// 哪个 promise 发布 catch 函数，就根据当前 Promise 执行相应方法，并将其从 Handler 订阅者里删除</span>
        
        errFuc &amp;&amp; errFuc(promise);
        <span class="hljs-keyword">this</span>.subscribeHandler.delete(promise);

      } 

    }
  }

  <span class="hljs-comment">// 定义一些静态成员变量 默认不可写</span>
  <span class="hljs-built_in">Object</span>.defineProperties(PromiseSubscribePublish, {
    [UNHANDLEDREJECTION]:{
      <span class="hljs-attr">value</span>: UNHANDLEDREJECTION
    },
    [REJECTIONHANDLED]:{
      <span class="hljs-attr">value</span>: REJECTIONHANDLED
    }
  })

  <span class="hljs-built_in">module</span>.exports = PromiseSubscribePublish;

  <span class="hljs-comment">// MyPromise.js</span>
  <span class="hljs-comment">// ..</span>
  <span class="hljs-keyword">const</span> PromiseSubscribePublish = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./PromiseSubscribePublish'</span>);

  <span class="hljs-keyword">const</span> promiseSubscribePublish = <span class="hljs-keyword">new</span> PromiseSubscribePublish();

  <span class="hljs-comment">// 事件循环最后执行</span>
  <span class="hljs-keyword">const</span> eventLoopEndRun = <span class="hljs-function">(<span class="hljs-params">(</span>)=&gt;</span>{
    <span class="hljs-keyword">let</span> unhandledPub;
    <span class="hljs-keyword">let</span> timer;
    <span class="hljs-keyword">const</span> queueHandler = [];
    <span class="hljs-comment">// 激活事件循环最后执行</span>
    <span class="hljs-keyword">const</span> activateRun = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
      <span class="hljs-comment">// 截流</span>
      timer &amp;&amp; clearTimeout(timer);
      timer = setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        unhandledPub &amp;&amp; unhandledPub();
        <span class="hljs-keyword">let</span> handler = queueHandler.shift();
        <span class="hljs-keyword">while</span>(handler){
          handler();
          handler = queueHandler.shift();
        }
      },<span class="hljs-number">0</span>);
    }
    
    <span class="hljs-comment">// 设置 unhanldedReject 优先级最高 ， 直接加入队列</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">handler,immediate</span>)=&gt;</span> {
      immediate ? unhandledPub = handler : queueHandler.push(handler);
      activateRun();
    }
  })()
  
  <span class="hljs-comment">//...</span>
  reject (err) {
    <span class="hljs-keyword">this</span>.changeStateHandler &amp;&amp; <span class="hljs-keyword">this</span>.changeStateHandler(REJECTED, err);
    promiseSubscribePublish.subscribe(<span class="hljs-keyword">this</span>, err);
    <span class="hljs-comment">// 存在 reject ，事件循环结束发布 UNHANDLEDREJECTION</span>
    eventLoopEndRun(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>
      promiseSubscribePublish.publish(PromiseSubscribePublish.UNHANDLEDREJECTION, <span class="hljs-keyword">this</span>),
      <span class="hljs-literal">true</span>
    );
  }

  <span class="hljs-comment">//...</span>

  <span class="hljs-keyword">static</span> unhandledRejectionLisener(cb){
    promiseSubscribePublish.bindLisener(PromiseSubscribePublish.UNHANDLEDREJECTION ,cb)
  }

  <span class="hljs-keyword">static</span> rejectionHandledLisener(cb){
    promiseSubscribePublish.bindLisener(PromiseSubscribePublish.REJECTIONHANDLED ,cb)
  }

  <span class="hljs-comment">// ...</span>
  <span class="hljs-keyword">catch</span>(catchHandler){
    
    <span class="hljs-keyword">const</span> currentState = <span class="hljs-keyword">this</span>.getPromiseState();
    <span class="hljs-keyword">const</span> promiseData = <span class="hljs-keyword">this</span>.getPromiseValue();

    <span class="hljs-comment">// 取消当前事件循环下 reject 状态未 catch 事件订阅;</span>
    promiseSubscribePublish.quitSubscribe(<span class="hljs-keyword">this</span>);
    
    <span class="hljs-keyword">if</span> (currentState === REJECTED) {
      
      eventLoopEndRun(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        <span class="hljs-comment">// 发布 catch 处理</span>
        promiseSubscribePublish.publish(PromiseSubscribePublish.REJECTIONHANDLED, <span class="hljs-keyword">this</span>);
        catchHandler(promiseData);
      });

    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (currentState === PENDDING) <span class="hljs-keyword">this</span>.catchQueue.push(catchHandler);
  }


  <span class="hljs-comment">// 测试代码</span>

  MyPromise.unhandledRejectionLisener(<span class="hljs-function">(<span class="hljs-params">err,promise</span>)=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(err, promise);
  }) 
  MyPromise.rejectionHandledLisener(<span class="hljs-function">(<span class="hljs-params">err,promise</span>)=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(err, promise);
  }) 
  <span class="hljs-keyword">var</span> myPromise = MyPromise.reject(<span class="hljs-number">11</span>);
  <span class="hljs-comment">// myPromise.catch(()=&gt;{console.log('catch')});</span>
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
    myPromise.catch(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'catch'</span>)});
  },<span class="hljs-number">1000</span>)

</code></pre>
<ul><li>
<h3 id="articleHeader7">串联 <em>Promise</em> 以及 <em>Promise</em> 链返回值</h3>
<p>看到链式，首先想到的是 jquery 调用。jquery 返回的是 jquery 对象本体。而 <em>Promise</em> 根据状态判断：</p>
<ul>
<li>当是操作成功状态时，调用 catch 会返回和当前 <em>Promise</em> 的 <code>[[PromiseStatus]]</code> 和 <code>[[PromiseValues]]</code> 状态相同新构建的 <em>Promise</em>；调用 then 方法时，返回和当前 <em>Promise</em> 的 <code>[[PromiseStatus]]</code> 相同的，<code>[[PromiseValues]]</code> 值为 then 方法返回值的 新构建的 <em>Promise</em>；</li>
<li>当是捕获错误状态时，调用 then 会返回和当前 <em>Promise</em> 的 <code>[[PromiseStatus]]</code> 和 <code>[[PromiseValues]]</code> 状态相同新构建的 <em>Promise</em>；调用 catch 方法时， 返回操作成功的新构建的 <em>Promise</em> ，<code>[[PromiseValues]]</code> 值为 catch 方法返回值；</li>
<li>当执行 catch 或 then 方法体内有报错，直接返回一个新构建捕获错误的 <em>Promise</em> ，<code>[[PromiseValues]]</code>  为那个错误；</li>
<li>如果 <em>Promise</em> 中有一环出现错误，而链中没有 catch 方法，则抛出错误，否则把链上的所有 Promise 都从 <code>unhandledRejuect</code> 订阅中去除。</li>
<li>因为 then 和 catch 回调方法是当前事件循环结束时才执行，而 catch 去除  <em>Promise</em> 链上 <code>unhandledRejuect</code> 订阅是当前事件循环，如果链上有方法报错，<code>unhandledRejuect</code> 订阅会再次发生，这样会造成哪怕当前报错 <em>Promise</em> 后有 catch，也会抛出错误，因此需要给当前 <em>Promise</em> 加一个属性，以标志链后有 catch，使得其不订阅 <code>unhandledRejuect</code> 事件。</li>
</ul>
</li></ul>
<p>分析一波：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 要在实例方法中，创建另一个当前类的实例时，必须用到当前类的构造函数。当咱们的类被继承出一个派生类，咱们希望返回的是那个派生类，于是不能直接 new MyPromise 去创建,而要使用一个 Symbol.species
2. 新建 *Promise* 和之前的 *Promise* 存在关联,所以当前 *Promise* 的状态决定新 *Promise* 状态，构建新 *Promise* 的过程中当前 *Promise* 的捕获函数不能将其订阅从 unhandledReject 中移除，所以需要一个标志位来标识 then 函数属性。
3. *Promise* 链上如果出现 catch 函数，链上 catch 函数之前的所有 *Promise* 都将从订阅 unhandledReject Map 中移除，因此 *Promise* 需要记录链上的上一级 *Promise*；
4. *Promise* then 或 catch 方法体内报错将构建一个捕获错误状态的 *Promise*，因此需要一个函数去捕获可能发生的错误；
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-number">1.</span> 要在实例方法中，创建另一个当前类的实例时，必须用到当前类的构造函数。当咱们的类被继承出一个派生类，咱们希望返回的是那个派生类，于是不能直接 <span class="hljs-keyword">new</span> MyPromise 去创建,而要使用一个 <span class="hljs-built_in">Symbol</span>.species
<span class="hljs-number">2.</span> 新建 *<span class="hljs-built_in">Promise</span>* 和之前的 *<span class="hljs-built_in">Promise</span>* 存在关联,所以当前 *<span class="hljs-built_in">Promise</span>* 的状态决定新 *<span class="hljs-built_in">Promise</span>* 状态，构建新 *<span class="hljs-built_in">Promise</span>* 的过程中当前 *<span class="hljs-built_in">Promise</span>* 的捕获函数不能将其订阅从 unhandledReject 中移除，所以需要一个标志位来标识 then 函数属性。
<span class="hljs-number">3.</span> *<span class="hljs-built_in">Promise</span>* 链上如果出现 <span class="hljs-keyword">catch</span> 函数，链上 <span class="hljs-keyword">catch</span> 函数之前的所有 *<span class="hljs-built_in">Promise</span>* 都将从订阅 unhandledReject <span class="hljs-built_in">Map</span> 中移除，因此 *<span class="hljs-built_in">Promise</span>* 需要记录链上的上一级 *<span class="hljs-built_in">Promise</span>*；
<span class="hljs-number">4.</span> *<span class="hljs-built_in">Promise</span>* then 或 <span class="hljs-keyword">catch</span> 方法体内报错将构建一个捕获错误状态的 *<span class="hljs-built_in">Promise</span>*，因此需要一个函数去捕获可能发生的错误；
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
  //... MyPromise.js


  const runFucMaybeError = handler => {
    try {
      return handler();
    } catch(err) {
      return {
        iserror: FUCERROR,
        err
      };
    }
  }

  const clearLinksSubscribe = linkPrePromise=>{
    while(linkPrePromise &amp;&amp; !linkPrePromise.hascatch){
      linkPrePromise.hascatch = true;
      promiseSubscribePublish.quitSubscribe(linkPrePromise);
      linkPrePromise = linkPrePromise.linkPrePromise;
    }
  }
  // 不解释
  then(thenHandler, quitReturn){
    
    const currentState = this.getPromiseState();
    const promiseData = this.getPromiseValue();
    let nextPromiseData;
    if (currentState === FULFILLED) eventLoopEndRun(()=>{
      nextPromiseData = runFucMaybeError(()=>thenHandler(promiseData))
    });
    else if (currentState === PENDDING) this.thenQueue.push(data=>{
      nextPromiseData = runFucMaybeError(()=>thenHandler(data))
    });

    if(!quitReturn){
      const nextPromise = new this.constructor[Symbol.species]((resolve,reject)=>{
        
        this.catch(err=>{
          reject(err);
        }, true);
        // 根据队列原则，执行肯定在当前 then 后，保证能正确拿到前一个 Promise 的返回值
        this.then(()=>{
          nextPromiseData &amp;&amp; nextPromiseData.iserror === FUCERROR 
            ? reject(nextPromiseData.err) 
              : resolve(nextPromiseData)
        }, true)
      })
      nextPromise.linkPrePromise = this;
      return nextPromise;
    };

  }

  catch(catchHandler, quitReturn){
    
    const currentState = this.getPromiseState();
    const promiseData = this.getPromiseValue();
    let nextPromiseData;
    // 取消当前事件循环下 reject 状态未 catch 事件订阅;
    // 当是实例内部调用时,不能将当前 Promise 从 unhandledReject 队列中移除；
    // 否则顺着生成链依次将 Promise 移除；
    if(!quitReturn)clearLinksSubscribe(this)
    if (currentState === REJECTED) {
      
      eventLoopEndRun(()=>{
        // 发布 catch 处理
        promiseSubscribePublish.publish(PromiseSubscribePublish.REJECTIONHANDLED, this);
        nextPromiseData = runFucMaybeError(()=>catchHandler(promiseData));
      });

    }
    else if (currentState === PENDDING) this.catchQueue.push(data=>{
      nextPromiseData = runFucMaybeError(()=>{catchHandler(data)})
    });

    if(!quitReturn){
      
      const nextPromise = new this.constructor[Symbol.species]((resolve,reject)=>{
        // 根据队列原则，执行肯定在当前 then 后，保证能正确拿到报错的 Promise 的返回值
        this.catch(()=>{
          nextPromiseData &amp;&amp; nextPromiseData.iserror === FUCERROR 
          ? reject(nextPromiseData.err) 
            : resolve(nextPromiseData)
        }, true);
        this.then(data=>resolve(data), true)
      })
      nextPromise.linkPrePromise = this;
      return nextPromise;
    }

  }

  // 测试代码
  const test1 = new MyPromise((resolve,reject)=>{
    setTimeout(()=>{
      resolve('2s 后输出了我');
    }, 2000)
  });


  test1.then(data=>{
    console.log(data);
    return '你好'
  }).then(data=>{
    console.log(data);
    return '不好'
  }).then(data=>{
    console.log(data);
  });

  test1.catch(err=>console.log(err)).then(data=>{
    console.log(data);
    return 'gggg'
  }).then(data=>{
    console.log(data);
  });

  const test2 = new MyPromise((resolve,reject)=>{
    throw new Error('xx');
  })

  test2.then(data=>console.log(data)).catch(err=>console.log(err));

  test2.catch(err=>console.log(err)).then(data=>{
    console.log(data);
    return '你好'
  }).then(data=>{
    console.log(data);
    return '不好'
  }).then(data=>{
    console.log(data);
  });
  var a = MyPromise.resolve(1);
  var b = a.then(data=>{throw new Error('11')}).catch(err=>{console.log(err.message)})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
  <span class="hljs-comment">//... MyPromise.js</span>


  <span class="hljs-keyword">const</span> runFucMaybeError = <span class="hljs-function"><span class="hljs-params">handler</span> =&gt;</span> {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">return</span> handler();
    } <span class="hljs-keyword">catch</span>(err) {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">iserror</span>: FUCERROR,
        err
      };
    }
  }

  <span class="hljs-keyword">const</span> clearLinksSubscribe = <span class="hljs-function"><span class="hljs-params">linkPrePromise</span>=&gt;</span>{
    <span class="hljs-keyword">while</span>(linkPrePromise &amp;&amp; !linkPrePromise.hascatch){
      linkPrePromise.hascatch = <span class="hljs-literal">true</span>;
      promiseSubscribePublish.quitSubscribe(linkPrePromise);
      linkPrePromise = linkPrePromise.linkPrePromise;
    }
  }
  <span class="hljs-comment">// 不解释</span>
  then(thenHandler, quitReturn){
    
    <span class="hljs-keyword">const</span> currentState = <span class="hljs-keyword">this</span>.getPromiseState();
    <span class="hljs-keyword">const</span> promiseData = <span class="hljs-keyword">this</span>.getPromiseValue();
    <span class="hljs-keyword">let</span> nextPromiseData;
    <span class="hljs-keyword">if</span> (currentState === FULFILLED) eventLoopEndRun(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
      nextPromiseData = runFucMaybeError(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>thenHandler(promiseData))
    });
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (currentState === PENDDING) <span class="hljs-keyword">this</span>.thenQueue.push(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span>{
      nextPromiseData = runFucMaybeError(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>thenHandler(data))
    });

    <span class="hljs-keyword">if</span>(!quitReturn){
      <span class="hljs-keyword">const</span> nextPromise = <span class="hljs-keyword">new</span> <span class="hljs-keyword">this</span>.constructor[<span class="hljs-built_in">Symbol</span>.species](<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>)=&gt;</span>{
        
        <span class="hljs-keyword">this</span>.catch(<span class="hljs-function"><span class="hljs-params">err</span>=&gt;</span>{
          reject(err);
        }, <span class="hljs-literal">true</span>);
        <span class="hljs-comment">// 根据队列原则，执行肯定在当前 then 后，保证能正确拿到前一个 Promise 的返回值</span>
        <span class="hljs-keyword">this</span>.then(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
          nextPromiseData &amp;&amp; nextPromiseData.iserror === FUCERROR 
            ? reject(nextPromiseData.err) 
              : resolve(nextPromiseData)
        }, <span class="hljs-literal">true</span>)
      })
      nextPromise.linkPrePromise = <span class="hljs-keyword">this</span>;
      <span class="hljs-keyword">return</span> nextPromise;
    };

  }

  <span class="hljs-keyword">catch</span>(catchHandler, quitReturn){
    
    <span class="hljs-keyword">const</span> currentState = <span class="hljs-keyword">this</span>.getPromiseState();
    <span class="hljs-keyword">const</span> promiseData = <span class="hljs-keyword">this</span>.getPromiseValue();
    <span class="hljs-keyword">let</span> nextPromiseData;
    <span class="hljs-comment">// 取消当前事件循环下 reject 状态未 catch 事件订阅;</span>
    <span class="hljs-comment">// 当是实例内部调用时,不能将当前 Promise 从 unhandledReject 队列中移除；</span>
    <span class="hljs-comment">// 否则顺着生成链依次将 Promise 移除；</span>
    <span class="hljs-keyword">if</span>(!quitReturn)clearLinksSubscribe(<span class="hljs-keyword">this</span>)
    <span class="hljs-keyword">if</span> (currentState === REJECTED) {
      
      eventLoopEndRun(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        <span class="hljs-comment">// 发布 catch 处理</span>
        promiseSubscribePublish.publish(PromiseSubscribePublish.REJECTIONHANDLED, <span class="hljs-keyword">this</span>);
        nextPromiseData = runFucMaybeError(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>catchHandler(promiseData));
      });

    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (currentState === PENDDING) <span class="hljs-keyword">this</span>.catchQueue.push(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span>{
      nextPromiseData = runFucMaybeError(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{catchHandler(data)})
    });

    <span class="hljs-keyword">if</span>(!quitReturn){
      
      <span class="hljs-keyword">const</span> nextPromise = <span class="hljs-keyword">new</span> <span class="hljs-keyword">this</span>.constructor[<span class="hljs-built_in">Symbol</span>.species](<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>)=&gt;</span>{
        <span class="hljs-comment">// 根据队列原则，执行肯定在当前 then 后，保证能正确拿到报错的 Promise 的返回值</span>
        <span class="hljs-keyword">this</span>.catch(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
          nextPromiseData &amp;&amp; nextPromiseData.iserror === FUCERROR 
          ? reject(nextPromiseData.err) 
            : resolve(nextPromiseData)
        }, <span class="hljs-literal">true</span>);
        <span class="hljs-keyword">this</span>.then(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span>resolve(data), <span class="hljs-literal">true</span>)
      })
      nextPromise.linkPrePromise = <span class="hljs-keyword">this</span>;
      <span class="hljs-keyword">return</span> nextPromise;
    }

  }

  <span class="hljs-comment">// 测试代码</span>
  <span class="hljs-keyword">const</span> test1 = <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>)=&gt;</span>{
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
      resolve(<span class="hljs-string">'2s 后输出了我'</span>);
    }, <span class="hljs-number">2000</span>)
  });


  test1.then(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(data);
    <span class="hljs-keyword">return</span> <span class="hljs-string">'你好'</span>
  }).then(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(data);
    <span class="hljs-keyword">return</span> <span class="hljs-string">'不好'</span>
  }).then(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(data);
  });

  test1.catch(<span class="hljs-function"><span class="hljs-params">err</span>=&gt;</span><span class="hljs-built_in">console</span>.log(err)).then(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(data);
    <span class="hljs-keyword">return</span> <span class="hljs-string">'gggg'</span>
  }).then(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(data);
  });

  <span class="hljs-keyword">const</span> test2 = <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>)=&gt;</span>{
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'xx'</span>);
  })

  test2.then(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span><span class="hljs-built_in">console</span>.log(data)).catch(<span class="hljs-function"><span class="hljs-params">err</span>=&gt;</span><span class="hljs-built_in">console</span>.log(err));

  test2.catch(<span class="hljs-function"><span class="hljs-params">err</span>=&gt;</span><span class="hljs-built_in">console</span>.log(err)).then(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(data);
    <span class="hljs-keyword">return</span> <span class="hljs-string">'你好'</span>
  }).then(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(data);
    <span class="hljs-keyword">return</span> <span class="hljs-string">'不好'</span>
  }).then(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(data);
  });
  <span class="hljs-keyword">var</span> a = MyPromise.resolve(<span class="hljs-number">1</span>);
  <span class="hljs-keyword">var</span> b = a.then(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span>{<span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'11'</span>)}).catch(<span class="hljs-function"><span class="hljs-params">err</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(err.message)})</code></pre>
<ul><li>
<h3 id="articleHeader8">
<em>Promise</em>.all + <em>Promise</em>.race;</h3>
<p><em>Promise</em>.all 有如下特性: 1、接收一个具有[Symbol.iterator]函数的数据， 返回一个 <em>Promise</em>，该 <em>Promise</em> 成功操作，then 方法传入一个数组，数组数据位置和迭代器迭代返回的顺序相关联，该 <em>Promise</em> 捕获错误 catch 里的传入捕获的错误; 2、 迭代器遍历结果如果是 <em>Promise</em> , 则将其 PromiseValue 作为值，插入传入数组对应的位置，当遍历结果不是 <em>Promise</em> 直接插入数组对应位置，当遇到捕获错误，或者 <em>Promise</em> 出现错误时直接将状态转变为 rejected 状态 ，从 catch 拿到相应错误的值；总结就是有错马上抛，要不等所有数据处理完才改变状态；</p>
<p><em>Promise</em>.race 就不赘述：记住几点，传入参数要求和 .all 相同，数据处理方式是，先到先得，率先处理完的数据直接修改状态。</p>
<p>在分析一波之前，调整几个之前的没有考虑到的问题：</p>
<ol>
<li>将状态改变函数覆盖操作移至 resolve 和 reject 函数中。</li>
<li>reject 方法体执行全都由是否能改变状态决定。</li>
<li>reject 新增一个参数，表示不订阅 <code>unhandledReject</code> 事件，因为 then 方法也会生成新的 <em>Promise</em>，而 then 链前有捕获异常状态的 <em>Promise</em> 会造成重复报错，catch 无所谓,因为本身会Promise 链队列。</li>
</ol>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // 开头的 '-' 标示移除，'+' 表示新增
  // ... changeStateHandler 方法
  -  this.changeStateHandler = null;

  resolve (data) {
    if(this.changeStateHandler){
      this.changeStateHandler(FULFILLED, data);
      // 保持状态只能改变一次
      this.changeStateHandler = null;
    }
  }

  reject (err, noSubscribe) {
    if(this.changeStateHandler){ 
      this.changeStateHandler(REJECTED, err);
      !noSubscribe &amp;&amp; !this.hascatch &amp;&amp; promiseSubscribePublish.subscribe(this, err);
      // 存在 reject ，事件循环结束发布 UNHANDLEDREJECTION
      eventLoopEndRun(()=>
        promiseSubscribePublish.publish(PromiseSubscribePublish.UNHANDLEDREJECTION, this),
        true
      );
      // 保持状态只能改变一次
      this.changeStateHandler = null;
    }
  }

  // then 方法
  - this.catch(err=>{
    reject(err)
  }, true);
  
  + this.catch(err=>reject(err, true), true);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-comment">// 开头的 '-' 标示移除，'+' 表示新增</span>
  <span class="hljs-comment">// ... changeStateHandler 方法</span>
  -  <span class="hljs-keyword">this</span>.changeStateHandler = <span class="hljs-literal">null</span>;

  resolve (data) {
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.changeStateHandler){
      <span class="hljs-keyword">this</span>.changeStateHandler(FULFILLED, data);
      <span class="hljs-comment">// 保持状态只能改变一次</span>
      <span class="hljs-keyword">this</span>.changeStateHandler = <span class="hljs-literal">null</span>;
    }
  }

  reject (err, noSubscribe) {
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.changeStateHandler){ 
      <span class="hljs-keyword">this</span>.changeStateHandler(REJECTED, err);
      !noSubscribe &amp;&amp; !<span class="hljs-keyword">this</span>.hascatch &amp;&amp; promiseSubscribePublish.subscribe(<span class="hljs-keyword">this</span>, err);
      <span class="hljs-comment">// 存在 reject ，事件循环结束发布 UNHANDLEDREJECTION</span>
      eventLoopEndRun(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>
        promiseSubscribePublish.publish(PromiseSubscribePublish.UNHANDLEDREJECTION, <span class="hljs-keyword">this</span>),
        <span class="hljs-literal">true</span>
      );
      <span class="hljs-comment">// 保持状态只能改变一次</span>
      <span class="hljs-keyword">this</span>.changeStateHandler = <span class="hljs-literal">null</span>;
    }
  }

  <span class="hljs-comment">// then 方法</span>
  - <span class="hljs-keyword">this</span>.catch(<span class="hljs-function"><span class="hljs-params">err</span>=&gt;</span>{
    reject(err)
  }, <span class="hljs-literal">true</span>);
  
  + <span class="hljs-keyword">this</span>.catch(<span class="hljs-function"><span class="hljs-params">err</span>=&gt;</span>reject(err, <span class="hljs-literal">true</span>), <span class="hljs-literal">true</span>);</code></pre>
<p>接下来开始分析一波：</p>
<ol>
<li>首先咱们的判断，传入的是否具有 <code>Symbol.iterator</code>，没有就直接抛错（<em>Promise</em> 状态会直接变为 reject，就不往下说了）；</li>
<li>因为咱们定义的 MyPromise 所以判断类型应该是 MyPromise，如果想要通过 <code>Object.prototype.toString.call</code> 去判断，咱们需要给咱们的类加一个 tag</li>
<li>.all 处理完一波数据插入结果值对应的位置，判断是否数据完全处理完，如果全部处理完才改变状态。.race 处理完那个直接改变状态，忽略后面、忽略后面、忽略后面(重要的事情哔哔3次)。</li>
<li>两边如果有传入的 <em>Promise</em> 状态出现捕获异常,返回的 <em>Promise</em> 状态即变为异常，catch 得到的值即为传入 <em>Promise</em> 异常的那个异常 <del>绕死你</del>。</li>
<li>因为是静态方法所以不能用 Symbol.species 构建实例。</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // MyPromise.js 最后头
  MyPromise.prototype[Symbol.toStringTag] = &quot;MyPromise&quot;;


  static all (promiseArr){
    
    
    
    // 因为是静态方法 无法获取 this 所以不能使用实例内部方法构建方式去构建新对象
    return new MyPromise((resolve,reject)=>{
      const iterator = isIterator(promiseArr);
      
      if(typeof iterator === 'string'){
        console.error(iterator);
        throw new Error(iterator);
      }

      let data = iterator.next();
      const result = [];
      let index = -1; // Promise 应存放返回数组的位置；
      let waitPromiseNum = 0; // 统计未完成的 Promise；
      
      let checkAllEnd = () => {
        return waitPromiseNum === 0;
      }

      while (data) {
        if(data.done) break;
        index ++;
        if(Object.prototype.toString.call(data.value) !== &quot;[object MyPromise]&quot;){
          result[index] = data.value;
        } else {

          (index=>{
            const promise = data.value; 
            waitPromiseNum++;
            promise.then(data=>{
              result[index] = data;
              waitPromiseNum--;
              // 看是否 Promise 全部完成
              if(checkAllEnd())resolve(result);
            }).catch(data=>reject(data));
          })(index)

        }
        data = iterator.next();
      }

      if(checkAllEnd())resolve(result);
    })
  }

  static race (promiseArr){
    
    // 因为是静态方法 无法获取 this 所以不能使用实例内部方法构建方式去构建新对象
    return new MyPromise((resolve,reject)=>{
      const iterator = isIterator(promiseArr);

      if(typeof iterator === 'string'){
        console.error(iterator);
        throw new Error(iterator);
      }

      let data = iterator.next();
      while (data) {
        if(data.done) break;
        if(Object.prototype.toString.call(data.value) !== &quot;[object MyPromise]&quot;){
          return resolve(data.value);
        } else {
          data.value
            .then(data=>resolve(data))
            .catch(data=>reject(data));
        }
        data = iterator.next();
      }

    })
  }

  // 测试方法

  MyPromise.all(
    [
      MyPromise.resolve(1),
      new MyPromise(resolve=>setTimeout(()=>resolve(2), 1000)),
      MyPromise.resolve(3)
    ]).then(data=>{console.log(data)});

  MyPromise.all([
    1,
    new MyPromise(resolve=>setTimeout(()=>resolve(2), 1000)),
    MyPromise.resolve(3)
    ]).then(data=>{console.log(data)});

  MyPromise.all([
    MyPromise.resolve(1),
    new MyPromise(resolve=>setTimeout(()=>resolve(2), 1000)),
    MyPromise.reject(3)
    ]).then(data=>{console.log(data)});


  MyPromise.race([
    MyPromise.resolve(1),
    new MyPromise(resolve=>setTimeout(()=>resolve(2), 1000)),
    MyPromise.resolve(3)
    ]).then(data=>{console.log(data)});

  MyPromise.race([
    1,
    new MyPromise(resolve=>setTimeout(()=>resolve(2), 1000)),
    MyPromise.resolve(3)
    ]).then(data=>{console.log(data)});
    
  MyPromise.race([
    MyPromise.resolve(1),
    new MyPromise(resolve=>setTimeout(()=>resolve(2), 1000)),
    MyPromise.reject(3)
    ]).then(data=>{console.log(data)});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-comment">// MyPromise.js 最后头</span>
  MyPromise.prototype[<span class="hljs-built_in">Symbol</span>.toStringTag] = <span class="hljs-string">"MyPromise"</span>;


  <span class="hljs-keyword">static</span> all (promiseArr){
    
    
    
    <span class="hljs-comment">// 因为是静态方法 无法获取 this 所以不能使用实例内部方法构建方式去构建新对象</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>)=&gt;</span>{
      <span class="hljs-keyword">const</span> iterator = isIterator(promiseArr);
      
      <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> iterator === <span class="hljs-string">'string'</span>){
        <span class="hljs-built_in">console</span>.error(iterator);
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(iterator);
      }

      <span class="hljs-keyword">let</span> data = iterator.next();
      <span class="hljs-keyword">const</span> result = [];
      <span class="hljs-keyword">let</span> index = <span class="hljs-number">-1</span>; <span class="hljs-comment">// Promise 应存放返回数组的位置；</span>
      <span class="hljs-keyword">let</span> waitPromiseNum = <span class="hljs-number">0</span>; <span class="hljs-comment">// 统计未完成的 Promise；</span>
      
      <span class="hljs-keyword">let</span> checkAllEnd = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> waitPromiseNum === <span class="hljs-number">0</span>;
      }

      <span class="hljs-keyword">while</span> (data) {
        <span class="hljs-keyword">if</span>(data.done) <span class="hljs-keyword">break</span>;
        index ++;
        <span class="hljs-keyword">if</span>(<span class="hljs-built_in">Object</span>.prototype.toString.call(data.value) !== <span class="hljs-string">"[object MyPromise]"</span>){
          result[index] = data.value;
        } <span class="hljs-keyword">else</span> {

          (<span class="hljs-function"><span class="hljs-params">index</span>=&gt;</span>{
            <span class="hljs-keyword">const</span> promise = data.value; 
            waitPromiseNum++;
            promise.then(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span>{
              result[index] = data;
              waitPromiseNum--;
              <span class="hljs-comment">// 看是否 Promise 全部完成</span>
              <span class="hljs-keyword">if</span>(checkAllEnd())resolve(result);
            }).catch(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span>reject(data));
          })(index)

        }
        data = iterator.next();
      }

      <span class="hljs-keyword">if</span>(checkAllEnd())resolve(result);
    })
  }

  <span class="hljs-keyword">static</span> race (promiseArr){
    
    <span class="hljs-comment">// 因为是静态方法 无法获取 this 所以不能使用实例内部方法构建方式去构建新对象</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>)=&gt;</span>{
      <span class="hljs-keyword">const</span> iterator = isIterator(promiseArr);

      <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> iterator === <span class="hljs-string">'string'</span>){
        <span class="hljs-built_in">console</span>.error(iterator);
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(iterator);
      }

      <span class="hljs-keyword">let</span> data = iterator.next();
      <span class="hljs-keyword">while</span> (data) {
        <span class="hljs-keyword">if</span>(data.done) <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">if</span>(<span class="hljs-built_in">Object</span>.prototype.toString.call(data.value) !== <span class="hljs-string">"[object MyPromise]"</span>){
          <span class="hljs-keyword">return</span> resolve(data.value);
        } <span class="hljs-keyword">else</span> {
          data.value
            .then(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span>resolve(data))
            .catch(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span>reject(data));
        }
        data = iterator.next();
      }

    })
  }

  <span class="hljs-comment">// 测试方法</span>

  MyPromise.all(
    [
      MyPromise.resolve(<span class="hljs-number">1</span>),
      <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function"><span class="hljs-params">resolve</span>=&gt;</span>setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>resolve(<span class="hljs-number">2</span>), <span class="hljs-number">1000</span>)),
      MyPromise.resolve(<span class="hljs-number">3</span>)
    ]).then(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(data)});

  MyPromise.all([
    <span class="hljs-number">1</span>,
    <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function"><span class="hljs-params">resolve</span>=&gt;</span>setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>resolve(<span class="hljs-number">2</span>), <span class="hljs-number">1000</span>)),
    MyPromise.resolve(<span class="hljs-number">3</span>)
    ]).then(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(data)});

  MyPromise.all([
    MyPromise.resolve(<span class="hljs-number">1</span>),
    <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function"><span class="hljs-params">resolve</span>=&gt;</span>setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>resolve(<span class="hljs-number">2</span>), <span class="hljs-number">1000</span>)),
    MyPromise.reject(<span class="hljs-number">3</span>)
    ]).then(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(data)});


  MyPromise.race([
    MyPromise.resolve(<span class="hljs-number">1</span>),
    <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function"><span class="hljs-params">resolve</span>=&gt;</span>setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>resolve(<span class="hljs-number">2</span>), <span class="hljs-number">1000</span>)),
    MyPromise.resolve(<span class="hljs-number">3</span>)
    ]).then(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(data)});

  MyPromise.race([
    <span class="hljs-number">1</span>,
    <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function"><span class="hljs-params">resolve</span>=&gt;</span>setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>resolve(<span class="hljs-number">2</span>), <span class="hljs-number">1000</span>)),
    MyPromise.resolve(<span class="hljs-number">3</span>)
    ]).then(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(data)});
    
  MyPromise.race([
    MyPromise.resolve(<span class="hljs-number">1</span>),
    <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function"><span class="hljs-params">resolve</span>=&gt;</span>setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>resolve(<span class="hljs-number">2</span>), <span class="hljs-number">1000</span>)),
    MyPromise.reject(<span class="hljs-number">3</span>)
    ]).then(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(data)});</code></pre>
<h2 id="articleHeader9">结束</h2>
<blockquote>如果发现过程遇到什么问题，欢迎及时提出。</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用 class 写法完整实现一个 Promise

## 原文链接
[https://segmentfault.com/a/1190000014888354](https://segmentfault.com/a/1190000014888354)

