---
title: '[译] 快速介绍 JavaScript 中的 CSP' 
date: 2019-02-04 2:30:58
hidden: true
slug: goqv5ke7jh
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>原文 <a href="http://lucasmreis.github.io/blog/quick-introduction-to-csp-in-javascript/" rel="nofollow noreferrer" target="_blank">http://lucasmreis.github.io/b...</a></p></blockquote>
<p>Communicating Sequential Processes 的 7 个示例</p>
<p>CSP 是什么? 一般来说, 它是写并行代码的一套方案.<br>在 Go 语言里自带该功能, Clojure 通过基于 Macro 的 <code>core.async</code> 来实现,<br>现在 JavaScript 通过 Generator 也能做支持了, 或者说 ES6 的功能.</p>
<p>为什么我要关心 CSP? 因为它强大啊, 而且高效, 而且简单. 都这样了你还想要什么? :)</p>
<p>好吧, 说细节. 怎样使用呢?我们用 <a href="https://github.com/ubolonton/js-csp" rel="nofollow noreferrer" target="_blank"><code>js-csp</code></a>, 而且需要 generator 支持, ES6 才有.<br>也就说 Node 4 或者更高的版本才行, 或者浏览器代码用 <a href="https://babeljs.io/" rel="nofollow noreferrer" target="_blank">Babel</a> 编译一下,<br>当然能其他的编译工具可能也行, 但你要确认下是支持 Generator 的.</p>
<blockquote><p>注: 文章写得早, 现在翻译文章, Chrome 应该是支持 Generator 的.</p></blockquote>
<p>扯多了, 来看例子吧!</p>
<h3 id="articleHeader0">例 1: 进程</h3>
<p>第一个要学的概念是"进程". 进程可以执行代码, 简单说就是这样的了. :)</p>
<blockquote><p>注: 当然不是操作系统原始的进程了, js 里模拟的.</p></blockquote>
<p>这是启动进程的语法: generator 函数作为参数, 传给 <code>go</code> 函数执行.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {go} from 'js-csp';

go(function* () {
  console.log('something!');
});

// terminal output:
//
// => something!" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> {go} <span class="hljs-keyword">from</span> <span class="hljs-string">'js-csp'</span>;

go(<span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'something!'</span>);
});

<span class="hljs-comment">// terminal output:</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// =&gt; something!</span></code></pre>
<h3 id="articleHeader1">例 2: 进程可以暂停</h3>
<p>使用 <code>yield</code> 关键字可以暂停一个进程, 把当前进程的占用释放:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {go, timeout} from 'js-csp';

go(function* () {
  yield timeout(1000);
  console.log('something else after 1 second!');
});

console.log('something!');

// terminal output:
//
// => something!
// => something else after 1 second!" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> {go, timeout} <span class="hljs-keyword">from</span> <span class="hljs-string">'js-csp'</span>;

go(<span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">yield</span> timeout(<span class="hljs-number">1000</span>);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'something else after 1 second!'</span>);
});

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'something!'</span>);

<span class="hljs-comment">// terminal output:</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// =&gt; something!</span>
<span class="hljs-comment">// =&gt; something else after 1 second!</span></code></pre>
<h3 id="articleHeader2">例 3: 进程等待来自管道的数据</h3>
<p>第二个要学的概念是管道, 也是最后一个了. 管道就像是队列.<br>一旦进程对管道调用 <code>take</code>, 进程就会暂停, 直到别人往管道放进数据.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {go, chan, take, putAsync} from 'js-csp';

let ch = chan();

go(function* () {
  const received = yield take(ch);
  console.log('RECEIVED:', received);
});

const text = 'something';
console.log('SENDING:', text);

// use putAsync to put a value in a
// channel from outside a process
putAsync(ch, text);

// terminal output:
//
// => SENDING: something
// => RECEIVED: something" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> {go, chan, take, putAsync} <span class="hljs-keyword">from</span> <span class="hljs-string">'js-csp'</span>;

<span class="hljs-keyword">let</span> ch = chan();

go(<span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> received = <span class="hljs-keyword">yield</span> take(ch);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'RECEIVED:'</span>, received);
});

<span class="hljs-keyword">const</span> text = <span class="hljs-string">'something'</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'SENDING:'</span>, text);

<span class="hljs-comment">// use putAsync to put a value in a</span>
<span class="hljs-comment">// channel from outside a process</span>
putAsync(ch, text);

<span class="hljs-comment">// terminal output:</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// =&gt; SENDING: something</span>
<span class="hljs-comment">// =&gt; RECEIVED: something</span></code></pre>
<h3 id="articleHeader3">例 4: 进程通过管道来通信</h3>
<p>管道的另一边, 往管道里 <code>put</code> 数据的那些进程也会暂停, 直到这边进程调用 <code>take</code>.</p>
<p>下面的例子就复杂一点了, 试着跟随一下主线, 印证一下终端输出的内容:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {go, chan, take, put} from 'js-csp';

let chA = chan();
let chB = chan();

// Process A
go(function* () {
  const receivedFirst = yield take(chA);
  console.log('A > RECEIVED:', receivedFirst);

  const sending = 'cat';
  console.log('A > SENDING:', sending);
  yield put(chB, sending);

  const receivedSecond = yield take(chA);
  console.log('A > RECEIVED:', receivedSecond);
});

// Process B
go(function* () {
  const sendingFirst = 'dog';
  console.log('B > SENDING:', sendingFirst);
  yield put(chA, sendingFirst);

  const received = yield take(chB);
  console.log('B > RECEIVED:', received);

  const sendingSecond = 'another dog';
  console.log('B > SENDING:', sendingSecond);
  yield put(chA, sendingSecond);
});

// terminal output:
//
// => B > SENDING: dog
// => A > RECEIVED: dog
// => A > SENDING: cat
// => B > RECEIVED: cat
// => B > SENDING: another dog
// => A > RECEIVED: another dog" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="clojure hljs"><code class="clojure">import {go, chan, take, put} from 'js-csp'<span class="hljs-comment">;</span>

let chA = chan()<span class="hljs-comment">;</span>
let chB = chan()<span class="hljs-comment">;</span>

// Process A
go(<span class="hljs-name">function*</span> () {
  const receivedFirst = yield take(<span class="hljs-name">chA</span>)<span class="hljs-comment">;</span>
  console.log(<span class="hljs-name">'A</span> &gt; RECEIVED:', receivedFirst)<span class="hljs-comment">;</span>

  const sending = 'cat';
  console.log(<span class="hljs-name">'A</span> &gt; SENDING:', sending)<span class="hljs-comment">;</span>
  yield put(<span class="hljs-name">chB</span>, sending)<span class="hljs-comment">;</span>

  const receivedSecond = yield take(<span class="hljs-name">chA</span>)<span class="hljs-comment">;</span>
  console.log(<span class="hljs-name">'A</span> &gt; RECEIVED:', receivedSecond)<span class="hljs-comment">;</span>
})<span class="hljs-comment">;</span>

// Process B
go(<span class="hljs-name">function*</span> () {
  const sendingFirst = 'dog';
  console.log(<span class="hljs-name">'B</span> &gt; SENDING:', sendingFirst)<span class="hljs-comment">;</span>
  yield put(<span class="hljs-name">chA</span>, sendingFirst)<span class="hljs-comment">;</span>

  const received = yield take(<span class="hljs-name">chB</span>)<span class="hljs-comment">;</span>
  console.log(<span class="hljs-name">'B</span> &gt; RECEIVED:', received)<span class="hljs-comment">;</span>

  const sendingSecond = 'another dog';
  console.log(<span class="hljs-name">'B</span> &gt; SENDING:', sendingSecond)<span class="hljs-comment">;</span>
  yield put(<span class="hljs-name">chA</span>, sendingSecond)<span class="hljs-comment">;</span>
})<span class="hljs-comment">;</span>

// terminal output:
//
// =&gt; B &gt; SENDING: dog
// =&gt; A &gt; RECEIVED: dog
// =&gt; A &gt; SENDING: cat
// =&gt; B &gt; RECEIVED: cat
// =&gt; B &gt; SENDING: another dog
// =&gt; A &gt; RECEIVED: another dog</code></pre>
<h3 id="articleHeader4">立 5: 管道也是队列</h3>
<p>由于管道是队列, 当进程从管道取走数据, 其他进程就拿不到了.<br>所以推数据的是一个进程, 取数据的也是一个进程.</p>
<p>下面这个例子可以看到第二个进程永远不会打印 <code>B &gt; RECEIVED: dog</code>,<br>因为第一个进程已经把数据取走了.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {go, chan, take, put} from 'js-csp';

let ch = chan();

go(function* () {
  const text = yield take(ch);
  console.log('A > RECEIVED:', text);
});

go(function* () {
  const text = yield take(ch);
  console.log('B > RECEIVED:', text);
});

go(function* () {
  const text = 'dog'
  console.log('C > SENDING:', text);
  yield put(ch, text);
});

// terminal output:
//
// => C > SENDING: dog
// => A > RECEIVED: dog" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> {go, chan, take, put} <span class="hljs-keyword">from</span> <span class="hljs-string">'js-csp'</span>;

<span class="hljs-keyword">let</span> ch = chan();

go(<span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> text = <span class="hljs-keyword">yield</span> take(ch);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'A &gt; RECEIVED:'</span>, text);
});

go(<span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> text = <span class="hljs-keyword">yield</span> take(ch);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'B &gt; RECEIVED:'</span>, text);
});

go(<span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> text = <span class="hljs-string">'dog'</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'C &gt; SENDING:'</span>, text);
  <span class="hljs-keyword">yield</span> put(ch, text);
});

<span class="hljs-comment">// terminal output:</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// =&gt; C &gt; SENDING: dog</span>
<span class="hljs-comment">// =&gt; A &gt; RECEIVED: dog</span></code></pre>
<h3 id="articleHeader5">例 6: 带缓冲的管道不会在 <code>put</code> 操作时阻塞</h3>
<p>管道可以带缓冲, 也就是, 一定数量之内的数据, 执行 <code>put</code> 操作可以避开阻塞.</p>
<p>这个例子里, 即便没有其他进程调用 <code>take</code>, 前两个写操作也不会阻塞进程.<br>不过管道的缓存数量是 2, 所以第三个数据就阻塞进程了, 直到其他进程取走数据.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {go, chan, put, buffers} from 'js-csp';

let ch = chan(buffers.fixed(2));

go(function* () {
  yield put(ch, 'value A');
  yield put(ch, 'value B');
  console.log('I should print!');
  yield put(ch, 'value C');
  console.log('I should not print!');
});

// terminal output:
//
// => I should print!" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> {go, chan, put, buffers} <span class="hljs-keyword">from</span> <span class="hljs-string">'js-csp'</span>;

<span class="hljs-keyword">let</span> ch = chan(buffers.fixed(<span class="hljs-number">2</span>));

go(<span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">yield</span> put(ch, <span class="hljs-string">'value A'</span>);
  <span class="hljs-keyword">yield</span> put(ch, <span class="hljs-string">'value B'</span>);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'I should print!'</span>);
  <span class="hljs-keyword">yield</span> put(ch, <span class="hljs-string">'value C'</span>);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'I should not print!'</span>);
});

<span class="hljs-comment">// terminal output:</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// =&gt; I should print!</span></code></pre>
<h3 id="articleHeader6">例 7: Dropping And Sliding Buffers</h3>
<p>固定大小的缓冲在 N 个数据之后会阻塞, 初次之外, 还有对缓冲的 dropping 和 sliding 控制.</p>
<p>缓冲的 dropping 以为着管道可以持有 N 个数据.<br>再增加额外的数据放进管道, 管道就会将其丢弃.</p>
<p>缓冲的 sliding 也可以持有 N 个数据. 不过相对于直接丢弃新数据,<br>sliding 缓冲原先的第一个推的数据会被丢弃, buffer 里会留下新的这个数据.</p>
<p>下面这个例子, <code>value B</code> 和 <code>value C</code> 在 dropping 缓冲里被丢弃, 因为已经有 <code>value A</code> 了.<br>第二个进程里, 当 <code>value B</code> 被放进管道, <code>value A</code> 就被丢弃了.<br>然后 <code>value C</code> 放进管道, <code>value B</code> 就被丢弃.</p>
<p>根据它们的工作原理, dropping 和 sliding 的缓冲永远不会阻塞!</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let droppingCh = chan(buffers.dropping(1));
let slidingCh  = chan(buffers.sliding(1));

go(function* () {
  yield put(droppingCh, 'value A');
  yield put(droppingCh, 'value B');
  yield put(droppingCh, 'value C');
  console.log('DROPPING:', yield take(droppingCh));
});

go(function* () {
  yield put(slidingCh, 'value A');
  yield put(slidingCh, 'value B');
  yield put(slidingCh, 'value C');
  console.log('SLIDING:', yield take(slidingCh));
});

// terminal output:
//
// => DROPPING: value A
// => SLIDING: value C" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> droppingCh = chan(buffers.dropping(<span class="hljs-number">1</span>));
<span class="hljs-keyword">let</span> slidingCh  = chan(buffers.sliding(<span class="hljs-number">1</span>));

go(<span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">yield</span> put(droppingCh, <span class="hljs-string">'value A'</span>);
  <span class="hljs-keyword">yield</span> put(droppingCh, <span class="hljs-string">'value B'</span>);
  <span class="hljs-keyword">yield</span> put(droppingCh, <span class="hljs-string">'value C'</span>);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'DROPPING:'</span>, <span class="hljs-keyword">yield</span> take(droppingCh));
});

go(<span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">yield</span> put(slidingCh, <span class="hljs-string">'value A'</span>);
  <span class="hljs-keyword">yield</span> put(slidingCh, <span class="hljs-string">'value B'</span>);
  <span class="hljs-keyword">yield</span> put(slidingCh, <span class="hljs-string">'value C'</span>);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'SLIDING:'</span>, <span class="hljs-keyword">yield</span> take(slidingCh));
});

<span class="hljs-comment">// terminal output:</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// =&gt; DROPPING: value A</span>
<span class="hljs-comment">// =&gt; SLIDING: value C</span></code></pre>
<h3 id="articleHeader7">结论</h3>
<p>CSP 用了一段时间之后, 用回调或者 Promise 写代码就像是侏罗纪的技术.<br>我希望 ES6 的 Generator 能帮助 CSP 成为 JavaScript 的一个标准,<br>就像是 Go 已经是的那样, 以及 Clojure 里正在成为的那样.</p>
<h3 id="articleHeader8">下一步</h3>
<p>另外有两个模型也还有意思, 大概可以认为是比 CSP 层级更高一点的:<br>函数式也是响应式编程(Rx)跟 Actors, 分别在 Rx 和 Erlang 里用到.<br>我当然后面也会写博客来挖掘一下.</p>
<p>我同时相信 CSP 对于前端框架来说非常棒.</p>
<blockquote><p>原作者还有一个文章可以看下: <a href="http://lucasmreis.github.io/blog/using-csp-as-application-architecture/" rel="nofollow noreferrer" target="_blank">Using CSP as Application Architecture</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译] 快速介绍 JavaScript 中的 CSP

## 原文链接
[https://segmentfault.com/a/1190000006873358](https://segmentfault.com/a/1190000006873358)

