---
title: '聊聊webWorker' 
date: 2019-01-15 2:30:12
hidden: true
slug: 5d0g8sm4nro
categories: [reprint]
---

{{< raw >}}

                    
<h4>先看几个例子</h4>
<p>本例子是通过通过红点展示地球上的地震带，数据来自于地质探测局<br><code>通过console.log看到数据运算所耗的时间</code><br>不使用 webworker  <a href="http://spademan.github.io/earthquake-heatmap-layer/no_worker.html" rel="nofollow noreferrer" target="_blank">No web workers - all on main thread</a><br>使用一条 webworker <a href="http://spademan.github.io/earthquake-heatmap-layer/one_worker.html" rel="nofollow noreferrer" target="_blank">One web worker</a><br>使用两条   <a href="http://spademan.github.io/earthquake-heatmap-layer/two_worker.html" rel="nofollow noreferrer" target="_blank">Two web workers</a><br>使用八条   <a href="http://spademan.github.io/earthquake-heatmap-layer/eight_worker.html" rel="nofollow noreferrer" target="_blank">Eight web workers</a><br>使用20条   <a href="http://spademan.github.io/earthquake-heatmap-layer/20_worker.html" rel="nofollow noreferrer" target="_blank">20 web workers</a></p>
<p><code>结论</code>：是？ // 带着思考看下去</p>
<h4>背景</h4>
<p><code>JavaScript</code>引擎是单线程运行的，<code>JavaScript</code>中耗时的<code>I/O</code>操作都被处理为异步操作，它们包括键盘、鼠标<code>I/O</code>输入输出事件、窗口大小的<code>resize</code>事件、定时器(<code>setTimeout、setInterval</code>)事件、<code>Ajax</code>请求网络<code>I/O</code>回调等。当这些异步任务发生的时候，它们将会被放入浏览器的事件任务队列中去，等到<code>JavaScript</code>运行时执行线程空闲时候才会按照队列先进先出的原则被一一执行，但终究还是单线程。<br><span class="img-wrap"><img data-src="/img/bVNjQ3?w=759&amp;h=345" src="https://static.alili.tech/img/bVNjQ3?w=759&amp;h=345" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>虽然<code>JS</code>运行在浏览器中，是单线程的，每个<code>window</code>一个JS线程，但浏览器不是单线程的，例如<code>Webkit</code>或是<code>Gecko</code>引擎，都可能有如下线程：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="javascript引擎线程
界面渲染线程
浏览器事件触发线程
Http请求线程" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code><span class="hljs-keyword">javascript引擎线程
</span>界面渲染线程
浏览器事件触发线程
Http请求线程</code></pre>
<p>很多人觉得异步（promise async/await），都是通过类似event loop在平常的工作中已经足够，但是如果做复杂运算，这些异步伪线程的不足就逐渐体现出来，比如settimeout拿到的值并不正确，再者假如页面有复杂运算的时候页面很容易触发假死状态，<br>为了有多线程功能，<code>webworker</code>问世了。不过，这并不意味着 <code>JavaScript </code>语言本身就支持了多线程，对于<code> JavaScript</code> 语言本身它仍是运行在单线程上的，<code> Web Worker </code>只是浏览器（宿主环境）提供的一个<code>能力／API</code>。</p>
<h4>简介</h4>
<p><code> Web Worker</code> 是HTML5标准的一部分，这一规范定义了一套<code> API</code>，它允许一段<code>JavaScript</code>程序运行在主线程之外的另外一个线程中。工作线程允许开发人员编写能够长时间运行而不被用户所中断的后台程序， 去执行事务或者逻辑，并同时保证页面对用户的及时响应，可以将一些大量计算的代码交给web worker运行而不冻结用户界面，后面会有案例介绍</p>
<h4>类型</h4>
<p><code>Web workers</code>可分为两种类型：专用线程<code>dedicated web worker</code>，以及共享线程<code>shared web worker</code>。 <code>Dedicated web worker</code>随当前页面的关闭而结束；这意味着<code>Dedicated web worker</code>只能被创建它的页面访问。与之相对应的<code>Shared web worker</code>可以被多个页面访问。在<code>Javascript</code>代码中，<code>“Work”</code>类型代表<code>Dedicated web worker</code>，而<code>“SharedWorker”</code>类型代表<code>Shared web worker</code>。<br>而<code>Shared Worker</code>则可以被多个页面所共享（同域情况下）</p>
<h4>如何创建</h4>
<p>Web Worker的创建是在主线程当中通过传入文件的url来实现的。如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let webworker = new Worker('myworker.js');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> webworker = <span class="hljs-keyword">new</span> Worker(<span class="hljs-string">'myworker.js'</span>);</code></pre>
<p>返回的是<code>webworker</code>实例对象,该对象是主线程和其他线程的通讯桥梁<br>主线程和其他线程可以通过</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="onmessage: 监听事件
postmessage: 传送事件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code><span class="hljs-symbol">onmessage:</span> 监听事件
<span class="hljs-symbol">postmessage:</span> 传送事件</code></pre>
<p>相关的API进行通讯 <br>案例代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//主线程 main.js
var worker = new Worker(&quot;worker.js&quot;);
worker.onmessage = function(event){
    // 主线程收到子线程的消息
};
// 主线程向子线程发送消息
worker.postMessage({
    type: &quot;start&quot;,
    value: 12345
});

//web worker.js
onmessage = function(event){
   // 收到
};
postMessage({
    type: &quot;debug&quot;,
    message: &quot;Starting processing...&quot;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//主线程 main.js</span>
<span class="hljs-keyword">var</span> worker = <span class="hljs-keyword">new</span> Worker(<span class="hljs-string">"worker.js"</span>);
worker.onmessage = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(event)</span></span>{
    <span class="hljs-comment">// 主线程收到子线程的消息</span>
};
<span class="hljs-comment">// 主线程向子线程发送消息</span>
worker.postMessage({
    type: <span class="hljs-string">"start"</span>,
    value: <span class="hljs-number">12345</span>
});

<span class="hljs-comment">//web worker.js</span>
onmessage = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(event)</span></span>{
   <span class="hljs-comment">// 收到</span>
};
postMessage({
    type: <span class="hljs-string">"debug"</span>,
    message: <span class="hljs-string">"Starting processing..."</span>
});</code></pre>
<p><a href="http://plnkr.co/edit/GdTBgR?p=preview" rel="nofollow noreferrer" target="_blank">相关demo</a></p>
<h4>如何终止</h4>
<p>如果在某个时机不想要 <code>Worker</code> 继续运行了，那么我们需要终止掉这个线程，可以调用 在主线程<code>worker</code> 的 <code>terminate</code> 方法 或者在相应的线程中调用<code>close</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 方式一 main.js 在主线程停止方式 
var worker = new Worker('./worker.js');
...
worker.terminate();

// 方式二、worker.js
self.close()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-comment">// 方式一 main.js 在主线程停止方式 </span>
<span class="hljs-built_in">var</span> worker = <span class="hljs-literal">new</span> Worker(<span class="hljs-string">'./worker.js'</span>);
<span class="hljs-params">...</span>
worker.terminate();

<span class="hljs-comment">// 方式二、worker.js</span>
<span class="hljs-built_in">self</span>.close()</code></pre>
<h4>错误机制</h4>
<p>提供了<code>onerror </code> API</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="worker.addEventListener('error', function (e) {
  console.log('MAIN: ', 'ERROR', e);
  console.log('filename:' + e.filename + '-message:' + e.message + '-lineno:' + e.lineno);
});

// event.filename: 导致错误的 Worker 脚本的名称；
// event.message: 错误的信息；
// event.lineno: 出现错误的行号；" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>worker.addEventListener(<span class="hljs-string">'error'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'MAIN: '</span>, <span class="hljs-string">'ERROR'</span>, e);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'filename:'</span> + e.filename + <span class="hljs-string">'-message:'</span> + e.message + <span class="hljs-string">'-lineno:'</span> + e.lineno);
});

<span class="hljs-comment">// event.filename: 导致错误的 Worker 脚本的名称；</span>
<span class="hljs-comment">// event.message: 错误的信息；</span>
<span class="hljs-comment">// event.lineno: 出现错误的行号；</span></code></pre>
<h4>sharedWorker</h4>
<p>对于 <code>Web Worker</code> ，一个 <code>tab</code> 页面只能对应一个 <code>Worker</code> 线程，是相互独立的；<br>而 <code>SharedWorker</code> 提供了能力能够让不同标签中页面共享的同一个<code> Worker </code>脚本线程；<br>当然，有个很重要的限制就是它们需要满足同源策略，也就是需要在同域下；<br>在页面（可以多个）中实例化<code> Worker</code> 线程：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// main.js

var myWorker = new SharedWorker(&quot;worker.js&quot;);

myWorker.port.start();

myWorker.port.postMessage(&quot;hello, I'm main&quot;);

myWorker.port.onmessage = function(e) {
  console.log('Message received from worker');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// main.js</span>

<span class="hljs-keyword">var</span> myWorker = <span class="hljs-keyword">new</span> SharedWorker(<span class="hljs-string">"worker.js"</span>);

myWorker.port.start();

myWorker.port.postMessage(<span class="hljs-string">"hello, I'm main"</span>);

myWorker.port.onmessage = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Message received from worker'</span>);
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// worker.js
onconnect = function(e) {
  var port = e.ports[0];

  port.addEventListener('message', function(e) {
    var workerResult = 'Result: ' + (e.data[0]);
    port.postMessage(workerResult);
  });
  port.start();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// worker.js</span>
onconnect = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span> </span>{
  <span class="hljs-keyword">var</span> port = e.ports[<span class="hljs-number">0</span>];

  port.addEventListener(<span class="hljs-string">'message'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span> </span>{
    <span class="hljs-keyword">var</span> workerResult = <span class="hljs-string">'Result: '</span> + (e.data[<span class="hljs-number">0</span>]);
    port.postMessage(workerResult);
  });
  port.start();
}</code></pre>
<p><a href="http://coolaj86.github.io/html5-shared-web-worker-examples/?" rel="nofollow noreferrer" target="_blank">在线demo</a></p>
<h5>父子线程</h5>
<p>线程中再创建线程</p>
<h4>环境与作用域</h4>
<p>在<code> Worker </code>线程的运行环境中没有<code> window </code>全局对象，也无法访问<code> DOM </code>对象，所以一般来说他只能来执行纯 <code>JavaScript </code>的计算操作。但是，他还是可以获取到部分浏览器提供的<code> API</code> 的：</p>
<p><code>setTimeout()， clearTimeout()， setInterval()， clearInterval()：</code>有了设计个函数，就可以在 <code>Worker </code>: 线程中可以再创建worker；<br><code>XMLHttpRequest </code>: 对象：意味着我们可以在 Worker 线程中执行 <code>ajax</code> 请求；<br><code>navigator </code>对象：可以获取到 <code>ppName，appVersion，platform，userAgent </code>等信息；<br><code>location </code>对象（只读）：可以获取到有关当前<code> URL</code> 的信息；<br><code>Application Cache</code><br><code>indexedDB </code> <br><code>WebSocket、</code><br><code>Promise、</code></p>
<h4>库或外部脚本引入和访问</h4>
<p>在线程中，提供了<code>importScripts</code>方法<br>如果线程中使用了<code>importScripts</code> 一般按照以下步骤解析</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1、解析 importScripts方法的每一个参数。
2、如果有任何失败或者错误，抛出 SYNTAX_ERR 异常。
3、尝试从用户提供的 URL 资源位置处获取脚本资源。
4、对于 importScripts 方法的每一个参数，按照用户的提供顺序，获取脚本资源后继续进行其它操作。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1</span>、解析 importScripts方法的每一个参数。
<span class="hljs-number">2</span>、如果有任何失败或者错误，抛出 SYNTAX_ERR 异常。
<span class="hljs-number">3</span>、尝试从用户提供的 URL 资源位置处获取脚本资源。
<span class="hljs-number">4</span>、对于 importScripts 方法的每一个参数，按照用户的提供顺序，获取脚本资源后继续进行其它操作。</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// worker.js
importScripts('math_utilities.js'); 
onmessage = function (event) 
 { 
     var first=event.data.first; 
     var second=event.data.second; 
     calculate(first,second); // calculate 是math_utilities.js中的方法 
 }; 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// worker.js</span>
importScripts(<span class="hljs-string">'math_utilities.js'</span>); 
onmessage = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(event)</span> 
 </span>{ 
     <span class="hljs-keyword">var</span> first=event.data.first; 
     <span class="hljs-keyword">var</span> second=event.data.second; 
     calculate(first,second); <span class="hljs-comment">// calculate 是math_utilities.js中的方法 </span>
 }; 
</code></pre>
<p>也可以一次性引入多个</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//可以多起一次传入
importScripts('script1.js', 'script2.js');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">//可以多起一次传入</span>
<span class="hljs-selector-tag">importScripts</span>(<span class="hljs-string">'script1.js'</span>, <span class="hljs-string">'script2.js'</span>);</code></pre>
<h4>XMLHttpRequest</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="onmessage = function(evt){
    var xhr = new XMLHttpRequest();
    xhr.open(&quot;GET&quot;, &quot;serviceUrl&quot;); //serviceUrl为后端j返回son数据的接口
    xhr.onload = function(){
    postMessage(xhr.responseText);
    };
    xhr.send();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code>onmessage = function(evt){
    var xhr = new XMLHttpRequest();
    xhr.open(<span class="hljs-string">"<span class="hljs-keyword">GET</span>"</span>, <span class="hljs-string">"serviceUrl"</span>); //serviceUrl为后端j返回son数据的接口
    xhr.onload = function(){
    postMessage(xhr.responseText);
    };
    xhr.send();
}</code></pre>
<h5>jsonp</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 设置jsonp
function MakeServerRequest() 
{
    importScripts(&quot;http://SomeServer.com?jsonp=HandleRequest&quot;);
} 

// jsonp回调
function HandleRequest(objJSON) 
{
    postMessage(&quot;Data returned from the server...FirstName: &quot; 
                  + objJSON.FirstName + &quot; LastName: &quot; + objJSON.LastName);
} 

// Trigger the server request for the JSONP data 
MakeServerRequest();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// 设置jsonp</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MakeServerRequest</span><span class="hljs-params">()</span> 
</span>{
    importScripts(<span class="hljs-string">"http://SomeServer.com?jsonp=HandleRequest"</span>);
} 

<span class="hljs-comment">// jsonp回调</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">HandleRequest</span><span class="hljs-params">(objJSON)</span> 
</span>{
    postMessage(<span class="hljs-string">"Data returned from the server...FirstName: "</span> 
                  + objJSON.FirstName + <span class="hljs-string">" LastName: "</span> + objJSON.LastName);
} 

<span class="hljs-comment">// Trigger the server request for the JSONP data </span>
MakeServerRequest();</code></pre>
<h4>通讯原理</h4>
<p>从一个线程到另一个线程的通讯实际上是一个值拷贝的过程，实际上是先将数据<code>JSON.stringify</code>之后再<code>JSON.parse</code>。主线程与子线程之间也可以交换二进制数据，比如<code>File、Blob、ArrayBuffer</code>等对象，也可以在线程之间发送。但是，用拷贝方式发送二进制数据，会造成性能问题。比如，主线程向子线程发送一个50MB文件，默认情况下浏览器会生成一个原文件的拷贝。为了解决这个问题，JavaScript允许主线程把二进制数据直接转移给子线程，转移后主线程无法再使用这些数据，这是为了防止出现多个线程同时修改数据的问题，这种转移数据的方法，叫做<code>Transferable Objects。</code><br>不过现在很多浏览器支持<code>transferable objects(可转让对象)</code> ,这个技术是零拷贝转移，能大大提升性能，<br>可以指定传送的数据全都是<code>零拷贝</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var abBuffer = new ArrayBuffer(32);
aDedicatedWorker.postMessage(abBuffer, [abBuffer]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pony"><code><span class="hljs-keyword">var</span> abBuffer = <span class="hljs-function"><span class="hljs-keyword">new</span> <span class="hljs-title">ArrayBuffer</span>(<span class="hljs-number">32</span>);
<span class="hljs-title">aDedicatedWorker</span>.<span class="hljs-title">postMessage</span>(abBuffer, [abBuffer]);</span></code></pre>
<p>也可以 指定某个是 使用 <code>零拷贝</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var objData = {
   &quot;employeeId&quot;: 103,
   &quot;name&quot;: &quot;Sam Smith&quot;,
   &quot;dateHired&quot;: new Date(2006, 11, 15),
   &quot;abBuffer&quot;: new ArrayBuffer(32)
};
aDedicatedWorker.postMessage(objData, [objData.abBuffer]);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> objData = {
   <span class="hljs-string">"employeeId"</span>: <span class="hljs-number">103</span>,
   <span class="hljs-string">"name"</span>: <span class="hljs-string">"Sam Smith"</span>,
   <span class="hljs-string">"dateHired"</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-number">2006</span>, <span class="hljs-number">11</span>, <span class="hljs-number">15</span>),
   <span class="hljs-string">"abBuffer"</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">ArrayBuffer</span>(<span class="hljs-number">32</span>)
};
aDedicatedWorker.postMessage(objData, [objData.abBuffer]);
</code></pre>
<h4>工作线程生命周期</h4>
<p>工作线程之间的通信必须依赖于浏览器的上下文环境，并且通过它们的 <code>MessagePort </code>对象实例传递消息。每个工作线程的全局作用域都拥有这些线程的端口列表，这些列表包括了所有线程使用到的<code> MessagePort </code>对象。在专用线程的情况下，这个列表还会包含隐式的 <code>MessagePort</code> 对象。<br>每个工作线程的全局作用域对象 <code>WorkerGlobalScope </code>还会有一个工作线程的线程列表，在初始化时这个列表为空。当工作线程被创建的时候或者拥有父工作线程的时候，它们就会被填充进来。<br>最后，每个工作线程的全局作用域对象<code> WorkerGlobalScope</code> 还拥有这个线程的文档模型，在初始化时这个列表为空。当工作线程被创建的时候，文档对象就会被填充进来。无论何时当一个文档对象被丢弃的时候，它就要从这个文档对象列举里面删除出来。</p>
<h4>性能测试</h4>
<h5>初始化测试</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 部分机器webwoker初始化时间
Macbook Pro: 2 workers, 0.4 milliseconds on average
Macbook Pro: 4 workers, 0.6 milliseconds on average
Nexus 5: 2 workers, 6 milliseconds on average
Nexus 5: 4 workers, 15 milliseconds on average (border-line UI jank)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>// 部分机器webwoker初始化时间
Macbook Pro: <span class="hljs-number">2</span> workers, <span class="hljs-number">0.4</span> <span class="hljs-built_in">milliseconds</span> <span class="hljs-keyword">on</span> <span class="hljs-title">average</span>
Macbook Pro: <span class="hljs-number">4</span> workers, <span class="hljs-number">0.6</span> <span class="hljs-built_in">milliseconds</span> <span class="hljs-keyword">on</span> <span class="hljs-title">average</span>
Nexus <span class="hljs-number">5</span>: <span class="hljs-number">2</span> workers, <span class="hljs-number">6</span> <span class="hljs-built_in">milliseconds</span> <span class="hljs-keyword">on</span> <span class="hljs-title">average</span>
Nexus <span class="hljs-number">5</span>: <span class="hljs-number">4</span> workers, <span class="hljs-number">15</span> <span class="hljs-built_in">milliseconds</span> <span class="hljs-keyword">on</span> <span class="hljs-title">average</span> (<span class="hljs-title">border-line</span> <span class="hljs-title">UI</span> <span class="hljs-title">jank</span>)
</code></pre>
<h5>传输速度测试</h5>
<p>1、普通json/object<br><span class="img-wrap"><img data-src="/img/bVNwCw?w=1102&amp;h=196" src="https://static.alili.tech/img/bVNwCw?w=1102&amp;h=196" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>2、tranferable objects</p>
<p><span class="img-wrap"><img data-src="/img/bVNwCL?w=1070&amp;h=198" src="https://static.alili.tech/img/bVNwCL?w=1070&amp;h=198" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br><code>可见 transferable objects</code>传输速度要高很多</p>
<h4>部分典型的应用场景如下</h4>
<p>1）  使用专用线程进行数学运算<br><code>Web Worker</code>最简单的应用就是用来做后台计算，而这种计算并不会中断前台用户的操作<br>2）  图像处理<br>通过使用从<code>&lt;canvas&gt;</code>或者<code>&lt;video&gt;</code>元素中获取的数据，可以把图像分割成几个不同的区域并且把它们推送给并行的不同<code>Workers</code>来做计算<br>3）  大量数据的检索<br>当需要在调用 <code>ajax</code>后处理大量的数据，如果处理这些数据所需的时间长短非常重要，可以在<code>Web Worker</code>中来做这些，避免冻结<code>UI线程</code>。<br>4）  背景数据分析<br>由于在使用<code>Web Worker</code>的时候，我们有更多潜在的<code>CPU</code>可用时间，我们现在可以考虑一下<code>JavaScript</code>中的新应用场景。例如，我们可以想像在不影响UI体验的情况下实时处理用户输入。利用这样一种可能，我们可以想像一个像<code>Word（Office Web Apps 套装）</code>一样的应用：当用户打字时后台在词典中进行查找，帮助用户自动纠错等等。</p>
<h4>限制</h4>
<p>1、不能访问<code>DOM和BOM</code>对象的，<code>Location和navigator</code>的只读访问，并且<code>navigator</code>封装成了<code>WorkerNavigator</code>对象，更改部分属性。无法读取本地文件系统<br>2、子线程和父级线程的通讯是通过值拷贝，子线程对通信内容的修改，不会影响到主线程。在通讯过程中值过大也会影响到性能（解决这个问题可以用<code>transferable objects</code>）<br>3、并非真的多线程，多线程是因为浏览器的功能<br>4、兼容性<br>5 <del>因为线程是通过<code>importScripts</code>引入外部的<code>js</code>，并且直接执行，其实是不安全的，很容易被外部注入一些恶意代码</del><br>6、条数限制，大多浏览器能创建webworker线程的条数是有限制的，虽然可以手动去拓展，但是如果不设置的话，基本上都在20条以内，每条线程大概5M左右，需要手动关掉一些不用的线程才能够创建新的线程（<a href="http://stackoverflow.com/questions/13574158/number-of-web-workers-limit" rel="nofollow noreferrer" target="_blank">相关解决方案</a>）<br>7、js存在真的线程的东西，比如<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer" rel="nofollow noreferrer" target="_blank">SharedArrayBuffer</a></p>
<p><span class="img-wrap"><img data-src="/img/bVNaFD?w=1282&amp;h=621" src="https://static.alili.tech/img/bVNaFD?w=1282&amp;h=621" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>js的多线程库</h4>
<p>1、<a href="https://github.com/DoubleSpout/node-threads-a-gogo2" rel="nofollow noreferrer" target="_blank">tagg2</a></p>
<p>参考文献：[1] <a href="https://www.html5rocks.com/zh/tutorials/workers/basics/" rel="nofollow noreferrer" target="_blank">https://www.html5rocks.com/zh...</a><br>[2] <a href="http://www.alloyteam.com/2015/11/deep-in-web-worker/#prettyPhoto" rel="nofollow noreferrer" target="_blank">http://www.alloyteam.com/2015...</a><br>[3] <a href="https://typedarray.org/concurrency-in-javascript/" rel="nofollow noreferrer" target="_blank">https://typedarray.org/concur...</a><br>[4] <a href="http://www.andygup.net/advanced-web-worker-performance/" rel="nofollow noreferrer" target="_blank">http://www.andygup.net/advanc...</a><br>[5] <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a><br>[6] <a href="http://coolaj86.github.io/html5-shared-web-worker-examples/?" rel="nofollow noreferrer" target="_blank">http://coolaj86.github.io/htm...</a> <br>[7] <a href="http://www.xyhtml5.com/webworker-javascript-debug-implementation.html" rel="nofollow noreferrer" target="_blank">http://www.xyhtml5.com/webwor...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
聊聊webWorker

## 原文链接
[https://segmentfault.com/a/1190000009313491](https://segmentfault.com/a/1190000009313491)

