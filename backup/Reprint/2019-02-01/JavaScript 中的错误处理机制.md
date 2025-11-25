---
title: 'JavaScript 中的错误处理机制' 
date: 2019-02-01 2:30:10
hidden: true
slug: h1hfvr2a2nj
categories: [reprint]
---

{{< raw >}}

                    
<p>错误处理在开发和调试过程中都显得尤为重要。有些没有进行错误处理的应用，直接就将浏览器的错误展示给了用户，极大的降低了用户体验。比如有些很 low 的网站，打开某些页面就直接弹出 "object" 这样的错误，用户看到之后一脸懵逼，心想这是什么鬼？让人感觉极其的不专业。可见错误处理对一个应用来说是多么的重要。</p>
<p>这篇文章主要是给大家科普一些关于错误处理的知识，让大家在脑海中有一个概览。下一篇文章中我会结合具体的项目以及当前主流的一些框架，比如react, redux，来更深入的介绍如何运用这些框架去封装一整套错误处理的解决方案。</p>
<h2 id="articleHeader0">error 对象</h2>
<p>Error 构造对象可以实例化一个 <code>error</code> 对象 (也就是Error 实例)，而 error 对象就是一个包含了错误信息的对象。当代码解析或者运行时发生错误，javascript 引擎就会自动产生并抛出一个 error 对象, 然后程序就中断在发生错误的地方。</p>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const error = new Error('Whoop!');
error.message; // Whoop!
error.name; // Error
error.stack; // &quot;Error: Whoops! at <anonymous>:1:13&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> error = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Whoop!'</span>);
error.message; <span class="hljs-comment">// Whoop!</span>
error.name; <span class="hljs-comment">// Error</span>
error.stack; <span class="hljs-comment">// "Error: Whoops! at &lt;anonymous&gt;:1:13"</span></code></pre>
<p>我们常用的 <code>message</code> 和 <code>name</code> 都是 <code>error</code> 的标准属性，由于各个浏览器厂商对 error 进行了不同的扩展，所以在不同的浏览器中，error 也有不同的属性和方法, 非标准属性中我们常用的是 <code>stack</code> 属性（很多浏览器都扩展了这一属性), 它用来表示栈跟踪信息。</p>
<table>
<thead><tr>
<th align="left">属性</th>
<th align="left">含义</th>
</tr></thead>
<tbody>
<tr>
<td align="left">message</td>
<td align="left">错误信息</td>
</tr>
<tr>
<td align="left">name</td>
<td align="left">错误类型</td>
</tr>
<tr>
<td align="left">constructor</td>
<td align="left">指定一个函数用来创建实例的原型，也就是指定构造器（创建自定义 Error 会用到）</td>
</tr>
<tr>
<td align="left">stack (非标准)</td>
<td align="left">栈跟踪信息</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader1">error 类型</h2>
<p>除了普通的 <code>Error</code> 构造对象以外， javascript 还实现了其他几种主要的 error 构造对象<sup id="fnref-1"><a href="#fn-1" class="footnote-ref">1</a></sup>.</p>
<table>
<thead><tr>
<th align="center">类型</th>
<th align="left">解析</th>
<th align="center">实例</th>
</tr></thead>
<tbody>
<tr>
<td align="center">EvalError</td>
<td align="left">eval错误。跟全局函数 eval() 有关的错误，在 ES5 之后已经不再出现了</td>
</tr>
<tr>
<td align="center">InternalError</td>
<td align="left">内部错误。由 JavaScript 引擎抛出的错误</td>
</tr>
<tr>
<td align="center">RangeError</td>
<td align="left">范围错误。发生在一个数值或参数超出其合法范围，主要包括超出数组范围或者超出数字取值范围</td>
<td align="center">new Array(-1); (1234).toExponential(21);</td>
</tr>
<tr>
<td align="center">ReferenceError</td>
<td align="left">引用错误。通常是由于引用了一个不存在的值。</td>
<td align="center">a.toString();</td>
</tr>
<tr>
<td align="center">SyntaxError</td>
<td align="left">语法错误。</td>
<td align="center">a ? a+1;</td>
</tr>
<tr>
<td align="center">TypeError</td>
<td align="left">类型错误。通常是因为在执行特定的类型操作时，变量的类型不符合要求。例如变量中保存着意外类型，访问不存在的方法等。</td>
<td align="center">var a = new {}; var a = {a:1}; a.reverse(); // 对象并没有 reverser 方法</td>
</tr>
<tr>
<td align="center">URIError</td>
<td align="left">decodeURI() 或者 encodeURI() 传入非法参数时，也包括 encodeURIComponent() 和 decodeURIComponent()</td>
<td align="center">decodeURI('<a href="http://www.test.com&amp;%" rel="nofollow noreferrer" target="_blank">http://www.test.com&amp;%</a>'); encodeURIComponent('uD800');</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader2">encodeURI 和 encodeURIComponent 的区别</h3>
<p>这里顺便说一下 <code>encodeURI</code> 和 <code>encodeURIComponent</code> 的区别。已经了解的同学可以忽略这一小部分，继续往前面看。</p>
<blockquote><strong>encodeURI 是对统一资源标识符 (URI) <code>全部编码</code>，而 encodeURIComponent 对统一资源标识符 (URI) <code>部分编码</code>。</strong></blockquote>
<p>假设一个 URI 是一个完整的 URI, 那么我们不必对那些在 URI 中保留的并且带有特殊含义的字符进行编码。由于 encodeURI 会替换掉所有字符，但是却不包含一些保留字符，如 "&amp;", "+", "=" 等（这些字符在 GET 和 POST 请求中是特殊字符，需要被编码），所以 <code>encodeURI</code> 本身无法产生能使用与 HTTP GET 或者 POST 请求的 URI。但是我们可以使用 <code>encodeURIComponent</code> 来对这些字符进行编码。</p>
<blockquote>
<code>encodeURIComponent</code> 转义除了字母、数字、(、)、.、!、~、*、'、-和_之外的所有字符。<br> 为了避免服务器收到不可预知的请求，对任何用户输入的作为 URI 部分的内容都需要用 encodeURIComponent 进行转义。</blockquote>
<h2 id="articleHeader3">抛出和捕获错误 throw and try...catch</h2>
<p>通常使用 <code>throw</code> 语句抛出错误，并用 <code>try...catch</code> 进行捕获。通常会把所有可能会抛出错误的代码都放在 <code>try</code> 语句块中，而把那些用于错误处理的代码放在 <code>catch</code> 块中。</p>
<h3 id="articleHeader4">throw 语句</h3>
<p><code>throw</code> 过程是阻塞的，程序会中断在第一个抛出错误的地方，所以后面的代码不会执行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="throw new SyntaxError('this is syntax error'); 
throw 123; // 不执行
throw 'hi there'; // 不执行
throw true;  // 不执行" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">SyntaxError</span>(<span class="hljs-string">'this is syntax error'</span>); 
<span class="hljs-keyword">throw</span> <span class="hljs-number">123</span>; <span class="hljs-comment">// 不执行</span>
<span class="hljs-keyword">throw</span> <span class="hljs-string">'hi there'</span>; <span class="hljs-comment">// 不执行</span>
<span class="hljs-keyword">throw</span> <span class="hljs-literal">true</span>;  <span class="hljs-comment">// 不执行</span></code></pre>
<h3 id="articleHeader5">catch 语句</h3>
<p><code>catch</code> 代码块捕获错误之后，程序不会中断，会按照正常流程继续执行下去。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="try {
  throw new Error('Whoops!');
} catch (e) {
  console.log(e.name + ':' + e.message);
}
console.log('hello!');

// Error:Whoops!
// hello!" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">try</span> {
  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Whoops!'</span>);
} <span class="hljs-keyword">catch</span> (e) {
  <span class="hljs-built_in">console</span>.log(e.name + <span class="hljs-string">':'</span> + e.message);
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello!'</span>);

<span class="hljs-comment">// Error:Whoops!</span>
<span class="hljs-comment">// hello!</span></code></pre>
<h3 id="articleHeader6">finally 语句</h3>
<p><code>finally</code> 在 <code>try...catch</code> 中是可选的，但是一旦使用了它，它里面的代码就一定会被执行，也就是说不管 <code>try</code> 语句块中的代码是否正常执行，<code>finnaly</code> 都会被执行。正如下面的代码, 即使在 <code>try</code> 中资源被阻塞，由于我们在 <code>finnaly</code> 中执行了关闭操作，文件最后还是会被关闭。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="openMyFile()
try {
   // 阻塞资源
   writeMyFile(theData);
} finally {
   closeMyFile(); // 始终会关闭资源
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">openMyFile()
<span class="hljs-keyword">try</span> {
   <span class="hljs-comment">// 阻塞资源</span>
   writeMyFile(theData);
} <span class="hljs-keyword">finally</span> {
   closeMyFile(); <span class="hljs-comment">// 始终会关闭资源</span>
}</code></pre>
<p>处理一个特定的错误。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    try {
      foo.bar();
    } catch (e) {
      switch (e.name) {
        case 'RangeError':
          //do something
          console.log('RangeError: ' + e.message);
          break;
        case 'ReferenceError':
          //do something
          console.log('ReferenceError: ' + e.message);
          break;
        default:
          console.log(e.name + ':' + e.message);
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">try</span> {
      foo.bar();
    } <span class="hljs-keyword">catch</span> (e) {
      <span class="hljs-keyword">switch</span> (e.name) {
        <span class="hljs-keyword">case</span> <span class="hljs-string">'RangeError'</span>:
          <span class="hljs-comment">//do something</span>
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'RangeError: '</span> + e.message);
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">'ReferenceError'</span>:
          <span class="hljs-comment">//do something</span>
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'ReferenceError: '</span> + e.message);
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">default</span>:
          <span class="hljs-built_in">console</span>.log(e.name + <span class="hljs-string">':'</span> + e.message);
      }
    }</code></pre>
<h2 id="articleHeader7">error 事件</h2>
<blockquote><strong>任何没有 catch 的错误都会触发 window 对象的 error 事件。</strong></blockquote>
<p>error 事件可以接收三个参数：错误消息、错误所在的 URL 和行号。你可以通过以下两种方式给 window 绑上 error 事件<sup id="fnref-2"><a href="#fn-2" class="footnote-ref">2</a></sup>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // message: 错误消息, source: 发生错误文件的 URL, lineno: 错误行号

  // 方法一
  window.onerror = function(messageOrEvent, source, lineno, colno, error) {
    alert(messageOrEvent, source, lineno, colno, error);
  }
  
  or 
  
  window.onerror = console.log;
  throw new Error('whoops!');
  
  // 方法二 
  window.addEventListener('error', function(errorEvent){
      alert(errorEvent.error);
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-comment">// message: 错误消息, source: 发生错误文件的 URL, lineno: 错误行号</span>

  <span class="hljs-comment">// 方法一</span>
  <span class="hljs-built_in">window</span>.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">messageOrEvent, source, lineno, colno, error</span>) </span>{
    alert(messageOrEvent, source, lineno, colno, error);
  }
  
  or 
  
  <span class="hljs-built_in">window</span>.onerror = <span class="hljs-built_in">console</span>.log;
  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'whoops!'</span>);
  
  <span class="hljs-comment">// 方法二 </span>
  <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'error'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">errorEvent</span>)</span>{
      alert(errorEvent.error);
  });</code></pre>
<p>在实际情况中，error 事件并不常用（但是在某些情况下，如微信端的调试，error 事件还是挺有用的），因为我们还是希望所有的异常都能得到很好的处理，而不是把错误交给浏览器。但有的时候并不是所有的错误都能够被扑获，并且某些业务场景会使用到追踪浏览器报错的工具，这时候可能就需要将浏览器的错误抛出去，所以在这种情况下也需要去全局监听 error 事件。</p>
<h2 id="articleHeader8">自定义错误类型 Custom Error Types</h2>
<p>创建一个自定义类 CustomError, 以方便去扩展更多的自定义 Error</p>
<p><strong>CustomError.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === 'function') {
      // 在浏览器领域，除了使用V8引擎的 Chrome，
      // 其它浏览器中不存在 Error.captureStackTrace()这一接口,
      // 所以在这里做一个条件判断。
      Error.captureStackTrace(this, this.constructor); // 返回调用堆栈信息, 用于在 error 对象上添加合理的 stack 属性。
    } else {
      this.stack = new Error(message).stack;
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CustomError</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Error</span> </span>{
  constructor(message) {
    <span class="hljs-keyword">super</span>(message);
    <span class="hljs-keyword">this</span>.name = <span class="hljs-keyword">this</span>.constructor.name;
    <span class="hljs-keyword">if</span> (typeof <span class="hljs-type">Error</span>.captureStackTrace === <span class="hljs-symbol">'functio</span>n') {
      <span class="hljs-comment">// 在浏览器领域，除了使用V8引擎的 Chrome，</span>
      <span class="hljs-comment">// 其它浏览器中不存在 Error.captureStackTrace()这一接口,</span>
      <span class="hljs-comment">// 所以在这里做一个条件判断。</span>
      <span class="hljs-type">Error</span>.captureStackTrace(<span class="hljs-keyword">this</span>, <span class="hljs-keyword">this</span>.constructor); <span class="hljs-comment">// 返回调用堆栈信息, 用于在 error 对象上添加合理的 stack 属性。</span>
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">this</span>.stack = <span class="hljs-keyword">new</span> <span class="hljs-type">Error</span>(message).stack;
    }
  }
}</code></pre>
<h3 id="articleHeader9">Error.captureStackTrace</h3>
<p>Error.captureStackTrace 是用来在 targetObject 中添加一个 <code>.stack</code> 属性。对该属性进行访问时，将以字符串的形式返回 Error.captureStackTrace() 语句被调用时的代码位置信息(即：调用栈历史)。</p>
<blockquote><code>Error.captureStackTrace(targetObject[, constructorOpt])</code></blockquote>
<p>除了 targetObject, captureStackTrace 还接受一个类型为 function 的可选参数 constructorOpt，当传递该参数时，调用栈中所有 constructorOpt 函数之上的信息(包括 constructorOpt 函数自身)，都会在访问 targetObject.stack 时被忽略。当需要对终端用户隐藏内部的技术细节时, constructorOpt 参数会很有用。</p>
<h3 id="articleHeader10">扩展自定义 Error 类型</h3>
<p>通过基类 <code>CustomError</code>，我们可以创建出更多的自定义 <strong>Error</strong>, 比如下面的 <code>HttpRequestError</code> 和 <code>LoginExpiredError</code></p>
<p><strong>HttpRequestError.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class HttpRequestError extends CustomError {
  constructor(message, requestId, code, httpStatusCode) {
    const defaultAPIErrorMessage = () => {
      // 检查是否有网
      return window.navigator.onLine ? 'Something wrong' : 'No connection';
    };

    message = message || defaultAPIErrorMessage();
    super(message);

    this.requestId = requestId;
    this.code = code;
    this.httpStatusCode = httpStatusCode;
  }
}

throw new HttpRequestError(null, 'requestId', 'code', 'httpStatusCode');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HttpRequestError</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">CustomError</span> </span>{
  constructor(message, requestId, code, httpStatusCode) {
    const defaultAPIErrorMessage = () =&gt; {
      <span class="hljs-comment">// 检查是否有网</span>
      <span class="hljs-keyword">return</span> window.navigator.onLine ? <span class="hljs-symbol">'Something</span> wrong' : <span class="hljs-symbol">'No</span> connection';
    };

    message = message || defaultAPIErrorMessage();
    <span class="hljs-keyword">super</span>(message);

    <span class="hljs-keyword">this</span>.requestId = requestId;
    <span class="hljs-keyword">this</span>.code = code;
    <span class="hljs-keyword">this</span>.httpStatusCode = httpStatusCode;
  }
}

<span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-type">HttpRequestError</span>(<span class="hljs-literal">null</span>, <span class="hljs-symbol">'requestI</span>d', <span class="hljs-symbol">'cod</span>e', <span class="hljs-symbol">'httpStatusCod</span>e');</code></pre>
<p><strong>LoginExpiredError.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class LoginExpiredError extends CustomError {
  constructor(message) {
    message = message || 'Your session has expired!';

    super(message);
  }
}

throw new LoginExpiredError();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">LoginExpiredError</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">CustomError</span> </span>{
  constructor(message) {
    message = message || <span class="hljs-symbol">'Your</span> session has expired!';

    <span class="hljs-keyword">super</span>(message);
  }
}

<span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-type">LoginExpiredError</span>();</code></pre>
<p>当我们创建了各种自定义 Error 之后，我们可以在不同的场景去使用它们了，比如在 http 请求失败的时候抛出 HttpRequestError，并弹出对话框提示用户。在用户登录过期之后，抛出 LoginExpiredError，弹出对话框，并自动 logout 等等。通过抛出不同的 Error 类型，才能让我们进行不同的扑获处理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  const deffer = Q.deffer();

  if (expired) {
    deffer.reject(new LoginExpiredError()); // 通过 promise 抛出异常
  }

  if (error instanceof LoginExpiredError) { // 扑获异常
    logout();
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code>  <span class="hljs-keyword">const</span> deffer = Q.deffer();

  <span class="hljs-keyword">if</span> (expired) {
    deffer.reject(<span class="hljs-keyword">new</span> LoginExpiredError()); <span class="hljs-comment">// 通过 promise 抛出异常</span>
  }

  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">error</span> <span class="hljs-keyword">instanceof</span> LoginExpiredError) { <span class="hljs-comment">// 扑获异常</span>
    logout();
  }</code></pre>
<h2 id="articleHeader11">结尾</h2>
<p>关于 Error 的介绍就先讲到这里。</p>
<hr>
<ol>
<li id="fn-1"> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error" rel="nofollow noreferrer" target="_blank">Error in MDN</a> <a href="#fnref-1" class="footnote-backref">↩</a>
</li>
<li id="fn-2"> <a href="https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror" rel="nofollow noreferrer" target="_blank">window.onerror</a> <a href="#fnref-2" class="footnote-backref">↩</a>
</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 中的错误处理机制

## 原文链接
[https://segmentfault.com/a/1190000007384055](https://segmentfault.com/a/1190000007384055)

