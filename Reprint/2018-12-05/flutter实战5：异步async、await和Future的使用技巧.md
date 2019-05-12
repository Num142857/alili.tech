---
title: 'flutter实战5：异步async、await和Future的使用技巧' 
date: 2018-12-05 2:30:09
hidden: true
slug: tvs2yx7ha1
categories: [reprint]
---

{{< raw >}}

                    
<p>由于前面的<strong>HTTP</strong>请求用到了异步操作，不少小伙伴都被这个问题折了下腰，今天总结分享下实战成果。Dart是一个单线程的语言，遇到有延迟的运算（比如IO操作、延时执行）时，线程中按顺序执行的运算就会阻塞，用户就会感觉到卡顿，于是通常用异步处理来解决这个问题。当遇到有需要延迟的运算（<strong>async</strong>）时，将其放入到延迟运算的队列（<strong>await</strong>）中去，把不需要延迟运算的部分先执行掉，最后再来处理延迟运算的部分。</p>
<h2 id="articleHeader0">async和await</h2>
<p>首先看一个案例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  //HTTP的get请求返回值为Future<String>类型，即其返回值未来是一个String类型的值
  getData() async {    //async关键字声明该函数内部有代码需要延迟执行
    return await http.get(Uri.encodeFull(url), headers: {&quot;Accept&quot;: &quot;application/json&quot;}); //await关键字声明运算为延迟执行，然后return运算结果
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code>  <span class="hljs-comment">//HTTP的get请求返回值为Future&lt;String&gt;类型，即其返回值未来是一个String类型的值</span>
  getData() <span class="hljs-keyword">async</span> {    <span class="hljs-comment">//async关键字声明该函数内部有代码需要延迟执行</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> http.<span class="hljs-keyword">get</span>(<span class="hljs-built_in">Uri</span>.encodeFull(url), headers: {<span class="hljs-string">"Accept"</span>: <span class="hljs-string">"application/json"</span>}); <span class="hljs-comment">//await关键字声明运算为延迟执行，然后return运算结果</span>
  }
</code></pre>
<p>然后我们调用这个函数，想获取其结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  String data = getData();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code>  <span class="hljs-type">String</span> <span class="hljs-class"><span class="hljs-keyword">data</span> = getData();</span>
</code></pre>
<p>在书写时，在IDE中这个代码是没有问题的，但是当我们运行这段代码时，就报错了：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014396426" src="https://static.alili.tech/img/remote/1460000014396426" alt="Future类型不匹配的错误" title="Future类型不匹配的错误" style="cursor: pointer; display: inline;"></span></p>
<p>为什么呢？因为<code>data</code>是<strong>String</strong>类型，而函数<code>getData()</code>是一个异步操作函数，其返回值是一个<code>await</code>延迟执行的结果。在Dart中，有<code>await</code>标记的运算，其结果值都是一个<code>Future</code>对象，<code>Future</code>不是<strong>String</strong>类型，所以就报错了。</p>
<p>那如果这样的话，我们就没法获取到延迟执行的结果了？当然可以，Dart规定有<code>async</code>标记的函数，只能由<code>await</code>来调用，比如这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="String data = await getData();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code><span class="hljs-type">String</span> <span class="hljs-class"><span class="hljs-keyword">data</span> = await getData();</span>
</code></pre>
<p>但是要使用<code>await</code>，必须在有<code>async</code>标记的函数中运行，否则这个<code>await</code>会报错：<br><span class="img-wrap"><img data-src="/img/remote/1460000014396427" src="https://static.alili.tech/img/remote/1460000014396427" alt="await用法不正确" title="await用法不正确" style="cursor: pointer; display: inline;"></span></p>
<p>于是，我们要为这个给<code>data</code>赋值的语句加一个<code>async</code>函数的包装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="String data;
setData() async {
  data = await getData();    //getData()延迟执行后赋值给data
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code><span class="hljs-type">String</span> <span class="hljs-class"><span class="hljs-keyword">data</span>;</span>
<span class="hljs-title">setData</span>() async {
  <span class="hljs-class"><span class="hljs-keyword">data</span> = await getData();    //getData()延迟执行后赋值给<span class="hljs-keyword">data</span></span>
}
</code></pre>
<blockquote>上面这种方法一般用于调用封装好的异步接口，比如<code>getData()</code>被封装到了其他dart文件，通过使用<code>async</code>函数对其调取使用</blockquote>
<p>再或者，我们去掉<code>async</code>函数的包装，在<code>getData()</code>中直接完成<code>data</code>变量的赋值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="String data;
getData() async {
  data = await http.get(Uri.encodeFull(url), headers: {&quot;Accept&quot;: &quot;application/json&quot;});     //延迟执行后赋值给data
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code><span class="hljs-type">String</span> <span class="hljs-class"><span class="hljs-keyword">data</span>;</span>
<span class="hljs-title">getData</span>() async {
  <span class="hljs-class"><span class="hljs-keyword">data</span> = await http.get(<span class="hljs-type">Uri</span>.<span class="hljs-title">encodeFull</span>(<span class="hljs-title">url</span>), headers: {"<span class="hljs-type">Accept</span>": "<span class="hljs-title">application</span>/<span class="hljs-title">json</span>"});     //延迟执行后赋值给<span class="hljs-keyword">data</span></span>
}
</code></pre>
<p>这样，<code>data</code>就获取到HTTP请求的数据了。就这样就完了？是滴，只要记住两点：</p>
<ul>
<li>
<code>await</code>关键字必须在<code>async</code>函数内部使用</li>
<li>调用<code>async</code>函数必须使用<code>await</code>关键字</li>
</ul>
<blockquote>PS：<code>await</code>关键字真的很形象，等一等的意思，就是说，既然你运行的时候都要等一等，那我调用的时候也等一等吧</blockquote>
<h2 id="articleHeader1">Future简单科普</h2>
<p>前面个讲到过，直接<code>return await ...</code>的时候，实际上返回的是一个延迟计算的<code>Future</code>对象，这个<code>Future</code>对象是Dart内置的，有自己的队列策略，我们就来聊聊这个<a href="https://docs.flutter.io/flutter/dart-async/Future-class.html" rel="nofollow noreferrer" target="_blank">Future</a>。</p>
<p>先啰嗦一些关于Dart在线程方面的知识。</p>
<p><strong>Dart</strong>是基于单线程模型的语言。在<strong>Dart</strong>也有自己的进程（或者叫线程）机制，名叫<strong>isolate</strong>。APP的启动入口<code>main</code>函数就是一个<strong>isolate</strong>。玩家也可以通过引入<code>import 'dart:isolate'</code>创建自己的<strong>isolate</strong>，对多核CPU的特性来说，多个<strong>isolate</strong>可以显著提高运算效率，当然也要适当控制<strong>isolate</strong>的数量，不应滥用，否则走火入魔自废武功。有一个很重要的点，Dart中<strong>isolate</strong>之间无法直接共享内存，不同的<strong>isolate</strong>之间只能通过<strong>isolate</strong> API进行通信，当然本篇的重点在于<code>Future</code>，不展开讲<strong>isolate</strong>，心急的小伙伴可以参考<a href="https://webdev.dartlang.org/articles/performance/event-loop#event-queue-new-future" rel="nofollow noreferrer" target="_blank">官方阅读理解</a>或者参考大神<a href="https://segmentfault.com/u/tain335">tain335</a>的<a href="https://juejin.im/post/5a9a21f8518825558b3d5d35#heading-3" rel="nofollow noreferrer" target="_blank">人肉翻译</a>。</p>
<p><strong>Dart</strong>线程中有一个消息循环机制（<strong>event loop</strong>）和两个队列（<strong>event queue</strong>和<strong>microtask queue</strong>）。</p>
<ul>
<li>
<strong>event queue</strong>包含所有外来的事件：I/O，mouse events，drawing events，timers，isolate之间的message等。任意<strong>isolate</strong>中新增的<strong>event</strong>（I/O，mouse events，drawing events，timers，isolate的message）都会放入<strong>event queue</strong>中排队等待执行，好比机场的公共排队大厅。</li>
<li>
<strong>microtask queue</strong>只在当前<strong>isolate</strong>的任务队列中排队，优先级高于<strong>event queue</strong>，好比机场里的某个VIP候机室，总是VIP用户先登机了，才开放公共排队入口。</li>
</ul>
<p>如果在<strong>event</strong>中插入<strong>microtask</strong>，当前<strong>event</strong>执行完毕即可插队执行<strong>microtask</strong>。如果没有<strong>microtask</strong>，就没办法插队了，也就是说，<strong>microtask queue</strong>的存在为Dart提供了给任务队列插队的解决方案。</p>
<p>当<code>main</code>方法执行完毕退出后，<strong>event loop</strong>就会以FIFO(先进先出)的顺序执行<strong>microtask</strong>，当所有<strong>microtask</strong>执行完后它会从<strong>event queue</strong>中取事件并执行。如此反复，直到两个队列都为空，如下流程图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014396428" src="https://static.alili.tech/img/remote/1460000014396428" alt="event queue和microtask queue" title="event queue和microtask queue" style="cursor: pointer;"></span></p>
<blockquote>注意：当事件循环正在处理<strong>microtask</strong>的时候，<strong>event queue</strong>会被堵塞。这时候app就无法进行UI绘制，响应鼠标事件和I/O等事件。胡乱插队也是有代价的~</blockquote>
<p>虽然你可以预测任务执行的顺序，但你无法准确的预测到事件循环何时会处理你期望的任务。例如当你创建一个延时1s的任务，但在排在你之前的任务结束前事件循环是不会处理这个延时任务的，也就是或任务执行可能是大于1s的。</p>
<p>OK，了解以上信息之后，再来回到<strong>Future</strong>，小伙伴可能已经被绕晕了。</p>
<p><strong>Future</strong>就是<strong>event</strong>，很多<strong>Flutter</strong>内置的组件比如前几篇用到的Http（http请求控件）的<code>get</code>函数、RefreshIndicator（下拉手势刷新控件）的<code>onRefresh</code>函数都是<strong>event</strong>。每一个被<code>await</code>标记的句柄也是一个<strong>event</strong>，每创建一个<strong>Future</strong>就会把这个<strong>Future</strong>扔进<strong>event queue</strong>中排队等候安检~</p>
<p>什么？那<strong>microtask</strong>呢？当然不会忘了这个，<a href="https://docs.flutter.io/flutter/dart-async/scheduleMicrotask.html" rel="nofollow noreferrer" target="_blank">scheduleMicrotask</a>，用法和<strong>Future</strong>基本一样。</p>
<h2 id="articleHeader2">为什么要用Future？</h2>
<p>前面讲到，用<code>async</code>和<code>await</code>组合，即可向<strong>event queue</strong>中插入<strong>event</strong>实现异步操作，好像<strong>Future</strong>的存在有些多余的感觉，刚开始我本人也有这样的疑惑，且往下看。</p>
<p>当定义<strong>Flutter</strong>函数时，还可以指定其运行结果返回值的类型，以提高代码的可读性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//定义了返回结果值为String类型
Future<String> getDatas(String category) async {
    var request = await _httpClient.getUrl(Uri.parse(url));  
    var response = await request.close();
    return await response.transform(utf8.decoder).join();
}

run() async{
    int data = await getDatas('keji');    //因为类型不匹配，IDE会报错
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-comment">//定义了返回结果值为String类型</span>
Future&lt;<span class="hljs-built_in">String</span>&gt; getDatas(<span class="hljs-built_in">String</span> category) <span class="hljs-keyword">async</span> {
    <span class="hljs-keyword">var</span> request = <span class="hljs-keyword">await</span> _httpClient.getUrl(<span class="hljs-built_in">Uri</span>.parse(url));  
    <span class="hljs-keyword">var</span> response = <span class="hljs-keyword">await</span> request.close();
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> response.transform(utf8.decoder).join();
}

run() <span class="hljs-keyword">async</span>{
    <span class="hljs-built_in">int</span> data = <span class="hljs-keyword">await</span> getDatas(<span class="hljs-string">'keji'</span>);    <span class="hljs-comment">//因为类型不匹配，IDE会报错</span>
}
</code></pre>
<p><strong>Future</strong>最主要的功能就是提供了链式调用。熟悉ES6语法的小伙伴乐开了花，链式调用解决两大问题：明确代码执行的依赖关系和实现异常捕获。WTF?还不明白？且看下面这些案例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//案例1
funA() async{
  ...set an important variable...
}

funB() async{
  await funA();
  ...use the important variable...
}

main() async {
  funB();   
}
//如果要想先执行funA再执行funB，必须在funB中await funA();
//funB的代码与funA耦合，将来如果funA废掉或者改动，funB中还需要经过修改以适配变更。

//案例2
funA() async{
  try{
     ...set an important variable...
  }catch(e){
    do sth...
  }finally{
    do sth. else...
  }
}

funB() async{
  try{
     ...use the important variable...
  }catch(e){
    do sth...
  }finally{
    do sth. else...
  }
}

main() async {
  await funA();
  await funB();
}
//没有明确体现出设置变量和使用变量之间的依赖关系，其他开发者难以理解你的代码逻辑，代码维护困难
//并且如果为了防止funA()或者funB()因发生异常导致程序崩溃
//要到funA()或者funB()中分别加入`try`、`catch`、`finally`
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-comment">//案例1</span>
funA() async{
  <span class="hljs-params">...</span><span class="hljs-built_in">set</span> an important <span class="hljs-built_in">variable</span><span class="hljs-params">...</span>
}

funB() async{
  await funA();
  <span class="hljs-params">...</span>use the important <span class="hljs-built_in">variable</span><span class="hljs-params">...</span>
}

main() async {
  funB();   
}
<span class="hljs-comment">//如果要想先执行funA再执行funB，必须在funB中await funA();</span>
<span class="hljs-comment">//funB的代码与funA耦合，将来如果funA废掉或者改动，funB中还需要经过修改以适配变更。</span>

<span class="hljs-comment">//案例2</span>
funA() async{
  try{
     <span class="hljs-params">...</span><span class="hljs-built_in">set</span> an important <span class="hljs-built_in">variable</span><span class="hljs-params">...</span>
  }catch(e){
    <span class="hljs-keyword">do</span> sth<span class="hljs-params">...</span>
  }finally{
    <span class="hljs-keyword">do</span> sth. <span class="hljs-keyword">else</span><span class="hljs-params">...</span>
  }
}

funB() async{
  try{
     <span class="hljs-params">...</span>use the important <span class="hljs-built_in">variable</span><span class="hljs-params">...</span>
  }catch(e){
    <span class="hljs-keyword">do</span> sth<span class="hljs-params">...</span>
  }finally{
    <span class="hljs-keyword">do</span> sth. <span class="hljs-keyword">else</span><span class="hljs-params">...</span>
  }
}

main() async {
  await funA();
  await funB();
}
<span class="hljs-comment">//没有明确体现出设置变量和使用变量之间的依赖关系，其他开发者难以理解你的代码逻辑，代码维护困难</span>
<span class="hljs-comment">//并且如果为了防止funA()或者funB()因发生异常导致程序崩溃</span>
<span class="hljs-comment">//要到funA()或者funB()中分别加入`try`、`catch`、`finally`</span>
</code></pre>
<p>为了解决上面的问题，<strong>Future</strong>提供了一套非常简洁的解决方案：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//案例3
 funA(){
  ...set an important variable...    //设置变量
}

funB(){
  ...use the important variable...   //使用变量
}
main(){
  new Future.then(funA()).then(funB());   // 明确表现出了后者依赖前者设置的变量值
 
  new Future.then(funA()).then((_) {new Future(funB())});    //还可以这样用

  //链式调用，捕获异常
  new Future.then(funA(),onError: (e) { handleError(e); }).then(funB(),onError: (e) { handleError(e); })  
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code><span class="hljs-comment">//案例3</span>
 funA(){
  ...set an important <span class="hljs-keyword">variable</span>...    <span class="hljs-comment">//设置变量</span>
}

funB(){
  ...use the important <span class="hljs-keyword">variable</span>...   <span class="hljs-comment">//使用变量</span>
}
main(){
  <span class="hljs-keyword">new</span> Future.<span class="hljs-keyword">then</span>(funA()).<span class="hljs-keyword">then</span>(funB());   <span class="hljs-comment">// 明确表现出了后者依赖前者设置的变量值</span>
 
  <span class="hljs-keyword">new</span> Future.<span class="hljs-keyword">then</span>(funA()).<span class="hljs-keyword">then</span>((<span class="hljs-number">_</span>) {<span class="hljs-keyword">new</span> Future(funB())});    <span class="hljs-comment">//还可以这样用</span>

  <span class="hljs-comment">//链式调用，捕获异常</span>
  <span class="hljs-keyword">new</span> Future.<span class="hljs-keyword">then</span>(funA(),onError: (e) { handleError(e); }).<span class="hljs-keyword">then</span>(funB(),onError: (e) { handleError(e); })  
}
</code></pre>
<p>案例3的玩法是<code>async</code>和<code>await</code>无法企及的，因此掌握<strong>Future</strong>还是很有必要滴。当然了，<strong>Future</strong>的玩法不仅仅局限于案例3，还有很多有趣的玩法，包括和<strong>microtask</strong>对象<a href="https://docs.flutter.io/flutter/dart-async/scheduleMicrotask.html" rel="nofollow noreferrer" target="_blank">scheduleMicrotask</a>配合使用，我这里就不一一介绍了，大家参考大神<a href="https://segmentfault.com/u/tain335">tain335</a>的<a href="https://segmentfault.com/a/1190000008800122#articleHeader6" target="_blank">人肉翻译</a>或者<a href="https://docs.flutter.io/flutter/dart-async/Future-class.html" rel="nofollow noreferrer" target="_blank">官网阅读理解</a>吧。</p>
<h2 id="articleHeader3">总结</h2>
<p>Dart的<strong>isolate</strong>中加入了<strong>event queue</strong>和<strong>microtask queue</strong>后，有了一点协程的感觉，或许这就是<strong>Flutter</strong>为啥在性能上敢和原生开发叫板的原因之一吧。本篇的内容比较抽象，如果还是有不明白的小伙伴，欢迎留言提问，我尽量回答，哈哈哈，就酱，欢迎加入到<a href="https://www.jianshu.com/c/ebc9d2e84214" rel="nofollow noreferrer" target="_blank">Flutter圈子</a>或<strong>flutter 中文社区（官方QQ群：338252156）</strong>，群里有前后端及全栈各路大神镇场子，加入进来没事就写写APP挣点外快（这个真的有），顺便翻译翻译官方英文原稿拉一票粉丝，一举多得何乐而不为呢。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
flutter实战5：异步async、await和Future的使用技巧

## 原文链接
[https://segmentfault.com/a/1190000014396421](https://segmentfault.com/a/1190000014396421)

