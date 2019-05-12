---
title: 'javascript错误处理类型' 
date: 2018-12-30 2:30:10
hidden: true
slug: pypp2h6t1n
categories: [reprint]
---

{{< raw >}}

                    
<p>在写javascript的时候，调试错误必不可少，除了能够在浏览器中打印出来错误外，常常还需要知道错误的类型是什么，以便对症下药的纠错；也有时候，在自己封装的工具函数中，不传参或传入了错误类型的参数，也要适当的抛出一些错误以示警告；使用框架不正常情况下也会抛出错误，如果对错误一无所知，便无从下手调试。综合上述，了解错误的处理机制是多么必要，以下是笔者归纳总结，如有误之处，欢迎指出。</p>
<h2 id="articleHeader0">错误构造函数</h2>
<p>javascript规范中总共有8中错误类型构造函数</p>
<ul>
<li>Error -- 错误对象</li>
<li>SyntaxError --解析过程语法错误</li>
<li>TypeError   -- 不属于有效类型</li>
<li>ReferenceError -- 无效引用</li>
<li>RangeError -- 数值超出有效范围</li>
<li>URIError -- 解析URI编码出错</li>
<li>EvalError -- 调用eval函数错误</li>
<li>InternalError -- Javascript引擎内部错误的异常抛出， "递归太多"</li>
</ul>
<p>其中两种做个特殊说明：</p>
<blockquote><p><strong>EvalError</strong>调用eval函数错误，已经弃用，为了向后兼容，低版本还可以使用。<br><strong>InternalError</strong> 递归过深 抛出错误，多数浏览器未实现，属于非标准方法，生产环境禁用</p></blockquote>
<h2 id="articleHeader1">继承关系</h2>
<p><strong>Error</strong>是错误的基类，其他类型都继承<strong>Error</strong>这个类，可以使用ES6中提供的<strong>Object.getPrototypeOf()</strong>来判断，一个类是否继承了另一个类。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(Object.getPrototypeOf(SyntaxError) === Error);    // true
console.log(Object.getPrototypeOf(TypeError) === Error);   // true
console.log(Object.getPrototypeOf(ReferenceError) === Error);   // true
console.log(Object.getPrototypeOf(RangeError) === Error);   // true
console.log(Object.getPrototypeOf(URIError) === Error);   // true
console.log(Object.getPrototypeOf(EvalError) === Error);   // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-built_in">SyntaxError</span>) === <span class="hljs-built_in">Error</span>);    <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-built_in">TypeError</span>) === <span class="hljs-built_in">Error</span>);   <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-built_in">ReferenceError</span>) === <span class="hljs-built_in">Error</span>);   <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-built_in">RangeError</span>) === <span class="hljs-built_in">Error</span>);   <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-built_in">URIError</span>) === <span class="hljs-built_in">Error</span>);   <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-built_in">EvalError</span>) === <span class="hljs-built_in">Error</span>);   <span class="hljs-comment">// true</span></code></pre>
<p>来聊一聊每一种错误类型的使用和出错的场景。</p>
<h2 id="articleHeader2">Error</h2>
<p>通过Error的构造器可以创建一个错误对象。当运行时错误产生时，Error的实例对象会被抛出。</p>
<blockquote><p>语法：new Error([message])</p></blockquote>
<p>参数：</p>
<ul><li>message 可选，错误描述信息。</li></ul>
<h3 id="articleHeader3">抛出错误</h3>
<p>使用<strong>throw</strong>语句来抛出异常</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="throw new Error('这里抛出的是错误信息')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-type">Error</span>(<span class="hljs-string">'这里抛出的是错误信息'</span>)</code></pre>
<p>运行后，会在控制台打印输出：</p>
<blockquote><p>Uncaught Error: 这里抛出的是错误信息</p></blockquote>
<p><em>注意： 使用<strong>throw</strong>抛出异常后，之后的代码不再执行。</em></p>
<h3 id="articleHeader4">捕获错误</h3>
<p>可以通过<strong>try{}catch(){}</strong>语句来捕获到这个错误</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="try{
    throw new Error('这里抛出的是错误信息')
}catch(err){
    alert(err.name + ' '+ err.message)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">try</span>{
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-type">Error</span>(<span class="hljs-string">'这里抛出的是错误信息'</span>)
}<span class="hljs-keyword">catch</span>(err){
    alert(err.name + <span class="hljs-string">' '</span>+ err.message)
}</code></pre>
<p>属性说明：<br>当使用new Error创建错误实例后，会有两个属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let e =  new Error('这里抛出的是错误信息');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> e =  <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'这里抛出的是错误信息'</span>);</code></pre>
<p>name属性，为错误的类型，此时为Error<br>message属性，为错误的信息，此时为'这里抛出的是错误信息'</p>
<h2 id="articleHeader5">SyntaxError</h2>
<p>解析过程语法错误,这种类型抛出的错误有很多，往往是书写时候造成的语法错误，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" let n = 1\1;   // Uncaught SyntaxError: Invalid or unexpected token
 let str = &quot;hel&quot;lo&quot; // Uncaught SyntaxError: Unexpected identifier
 let 123Var = 'hi' // Uncaught SyntaxError: Invalid or unexpected token" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code> <span class="hljs-keyword">let</span> <span class="hljs-attr">n</span> = <span class="hljs-number">1</span>\<span class="hljs-number">1</span>;   // Uncaught SyntaxError: Invalid <span class="hljs-literal">or</span> unexpected token
 <span class="hljs-keyword">let</span> <span class="hljs-attr">str</span> = <span class="hljs-string">"hel"</span>lo<span class="hljs-string">" // Uncaught SyntaxError: Unexpected identifier
 let 123Var = 'hi' // Uncaught SyntaxError: Invalid or unexpected token</span></code></pre>
<p>语法错误有很多就不一一列举了，当在浏览器运行时，控制台会抛错，并且告知第几行，所以调试器来比较方便。但要读懂错误的类型为<strong>SyntaxError</strong>，以及后面的错误信息，这样方便改错。</p>
<h2 id="articleHeader6">TypeError</h2>
<p>不属于有效类型。这种错误就是在给的不是需要的类型而导致无法操作，会抛出类型错误。</p>
<ul><li>
<p>变量或参数不是预期类型，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="例如**new**运算符后必须是函数，而给定的不是函数，则会抛出类型错误" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code style="word-break: break-word; white-space: initial;">例如**<span class="hljs-keyword">new</span><span class="hljs-type"></span>**运算符后必须是函数，而给定的不是函数，则会抛出类型错误</code></pre>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let fn = 'hello';
new fn;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code><span class="hljs-keyword">let</span> <span class="hljs-function"><span class="hljs-keyword">fn</span> = 'hello'</span>;
<span class="hljs-keyword">new</span> <span class="hljs-function"><span class="hljs-keyword">fn</span></span>;</code></pre>
<p>抛出错误：</p>
<blockquote><p>Uncaught TypeError: fn is not a constructor</p></blockquote>
<ul><li>调用对象不存在的方法</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {};
obj.fn()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code><span class="hljs-keyword">let</span> obj = {};
obj.<span class="hljs-keyword">fn</span>()</code></pre>
<p>抛出错误：</p>
<blockquote><p>Uncaught TypeError: obj.fn is not a function</p></blockquote>
<ul><li>当然你也可以在封装函数时候，强制传入的参数为指定类型，否则抛出类型错误。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function flatten(arr){
    if( !Array.isArray(arr) ){
        throw new TypeError('传入参数不是数组')
    }    
}
flatten('test');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">flatten</span>(<span class="hljs-params">arr</span>)</span>{
    <span class="hljs-keyword">if</span>( !<span class="hljs-built_in">Array</span>.isArray(arr) ){
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">'传入参数不是数组'</span>)
    }    
}
flatten(<span class="hljs-string">'test'</span>);</code></pre>
<p>传入的参数不为数组时，抛出自定义的类型错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Uncaught TypeError: 传入参数不是数组" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;">Uncaught <span class="hljs-string">TypeError:</span> 传入参数不是数组</code></pre>
<h2 id="articleHeader7">ReferenceError</h2>
<p>无效引用。</p>
<ul><li>引用了一个不存在的变量</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(a);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code style="word-break: break-word; white-space: initial;">console.log(a)<span class="hljs-comment">;</span></code></pre>
<p>抛出错误</p>
<blockquote><p>Uncaught ReferenceError: a is not defined</p></blockquote>
<ul><li>将变量赋值给一个无法被赋值的数据<br> 这个错误常常犯的地方实在调用一个方法后在if语句中做判断，将比较运算符<strong>==</strong>写成了赋值运算符<strong>=</strong>，例如判断一个字符串第一个字符是不是指定的字符：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let str = 'hello';
if( str.charAt(0) = 'h' ){
    console.log('第一个字符为h');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>let <span class="hljs-built_in">str</span> = <span class="hljs-string">'hello'</span>;
<span class="hljs-keyword">if</span>( <span class="hljs-built_in">str</span>.charAt(<span class="hljs-number">0</span>) = <span class="hljs-string">'h'</span> ){
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'第一个字符为h'</span>);
}</code></pre>
<p>抛出错误：</p>
<blockquote><p>Uncaught ReferenceError: Invalid left-hand side in assignment</p></blockquote>
<h2 id="articleHeader8">RangeError</h2>
<p>数值超出有效范围。在一些方法中，传入的数值必须在一定的范围内，否则会抛出超出范围的错误。</p>
<ul><li>创建数组传入的长度小于了0</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = new Array(-1)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> arr = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-number">-1</span>)</code></pre>
<p>抛出错误：</p>
<blockquote><p>Uncaught RangeError: Invalid array length</p></blockquote>
<ul><li>repeat方法重复指定的字符串重复次数小于0</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let str = 'hello';
str.repeat(-1)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs rust"><code><span class="hljs-keyword">let</span> <span class="hljs-built_in">str</span> = <span class="hljs-symbol">'hello</span>';
<span class="hljs-built_in">str</span>.repeat(-<span class="hljs-number">1</span>)</code></pre>
<p>抛出错误：</p>
<blockquote><p>Uncaught RangeError: Invalid count value</p></blockquote>
<h2 id="articleHeader9">URIError</h2>
<p>处理URI编码出错。函数参数不正确，主要是encodeURI()、decodeURI()、encodeURIComponent()、decodeURIComponent()、escape()和unescape()这六个函数。</p>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="decodeURIComponent('%');
decodeURI('%2')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">decodeURIComponent</span>(<span class="hljs-string">'%'</span>);
<span class="hljs-built_in">decodeURI</span>(<span class="hljs-string">'%2'</span>)</code></pre>
<p>抛出错误：</p>
<blockquote><p>Uncaught URIError: URI malformed</p></blockquote>
<h2 id="articleHeader10">自定义错误类型</h2>
<p>有时候希望自定义错误类型，需要自定义一个构造函数，然后让原型继承继承<strong>Error.prototype</strong>即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function MyErrorType(message){
    this.message = message || '错误';
    this.name = 'MyErrorType';
    this.stack = (new Error()).stack;  // 错误位置和调用栈
}

MyErrorType.prototype = Object.create(Error.prototype);
MyErrorType.prototype.constructor = MyErrorType;

throw new MyErrorType('自定义错误类型抛出错误')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyErrorType</span>(<span class="hljs-params">message</span>)</span>{
    <span class="hljs-keyword">this</span>.message = message || <span class="hljs-string">'错误'</span>;
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'MyErrorType'</span>;
    <span class="hljs-keyword">this</span>.stack = (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>()).stack;  <span class="hljs-comment">// 错误位置和调用栈</span>
}

MyErrorType.prototype = <span class="hljs-built_in">Object</span>.create(<span class="hljs-built_in">Error</span>.prototype);
MyErrorType.prototype.constructor = MyErrorType;

<span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> MyErrorType(<span class="hljs-string">'自定义错误类型抛出错误'</span>)</code></pre>
<h3 id="articleHeader11">关于调用的错误栈信息</h3>
<p>提供的错误的跟踪功能，以什么样的调用顺序，在哪个文件的哪一行捕获到这个错误。<br>例如以下调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function trace() {
  try {
    throw new Error('myError');
  }
  catch(e) {
    console.log(e.stack);
  }
}
function b() {
  trace();
}
function a() {
  b(3, 4, '\n\n', undefined, {});
}
a('first call, firstarg');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">trace</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'myError'</span>);
  }
  <span class="hljs-keyword">catch</span>(e) {
    <span class="hljs-built_in">console</span>.log(e.stack);
  }
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">b</span>(<span class="hljs-params"></span>) </span>{
  trace();
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>) </span>{
  b(<span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-string">'\n\n'</span>, <span class="hljs-literal">undefined</span>, {});
}
a(<span class="hljs-string">'first call, firstarg'</span>);</code></pre>
<p>错误信息为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Error: myError
    at trace (<Error.html>:3:14)
    at b (<Error.html>:10:6)
    at a (<Error.html>:13:6)
    at <Error.html>:15:4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">Error</span>: <span class="hljs-selector-tag">myError</span>
    <span class="hljs-selector-tag">at</span> <span class="hljs-selector-tag">trace</span> (&lt;<span class="hljs-selector-tag">Error</span><span class="hljs-selector-class">.html</span>&gt;<span class="hljs-selector-pseudo">:3</span><span class="hljs-selector-pseudo">:14)</span>
    <span class="hljs-selector-tag">at</span> <span class="hljs-selector-tag">b</span> (&lt;<span class="hljs-selector-tag">Error</span><span class="hljs-selector-class">.html</span>&gt;<span class="hljs-selector-pseudo">:10</span><span class="hljs-selector-pseudo">:6)</span>
    <span class="hljs-selector-tag">at</span> <span class="hljs-selector-tag">a</span> (&lt;<span class="hljs-selector-tag">Error</span><span class="hljs-selector-class">.html</span>&gt;<span class="hljs-selector-pseudo">:13</span><span class="hljs-selector-pseudo">:6)</span>
    <span class="hljs-selector-tag">at</span> &lt;<span class="hljs-selector-tag">Error</span><span class="hljs-selector-class">.html</span>&gt;<span class="hljs-selector-pseudo">:15</span><span class="hljs-selector-pseudo">:4</span></code></pre>
<p>以上为抛错的构造函数的总结，如有误之处欢迎扶正。<br>以上每一种错误场景并没有列出太多，如果你有新的错误信息发现，欢迎留言讨论。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript错误处理类型

## 原文链接
[https://segmentfault.com/a/1190000011353194](https://segmentfault.com/a/1190000011353194)

