---
title: '前端魔法堂——异常不仅仅是try/catch' 
date: 2018-12-28 2:30:11
hidden: true
slug: 01pro19uo0mo
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p> 编程时我们往往拿到的是业务流程正确的业务说明文档或规范，但实际开发中却布满荆棘和例外情况，而这些例外中包含业务用例的例外，也包含技术上的例外。对于业务用例的例外我们别无它法，必须要求实施人员与用户共同提供合理的解决方案；而技术上的例外，则必须由我们码农们手刃之，而这也是我想记录的内容。<br> 我打算分成<a href="http://www.cnblogs.com/fsjohnhuang/p/7685144.html" rel="nofollow noreferrer" target="_blank">《前端魔法堂——异常不仅仅是try/catch》</a>和《前端魔法堂——调用栈，异常实例中的宝藏》两篇分别叙述内置/自定义异常类，捕获运行时异常/语法异常/网络请求异常/PromiseRejection事件，什么是调用栈和如何获取调用栈的相关信息。<br> 是不是未出发就已经很期待呢？好吧，大家捉紧扶手，老司机要开车了^_^</p>
<h2 id="articleHeader1">概要</h2>
<p> 本篇将叙述如下内容：</p>
<ol>
<li><a href="#">异常还是错误？它会如何影响我们的代码？</a></li>
<li><a href="#">内置异常类型有哪些？</a></li>
<li><a href="#">动手写自己的异常类型吧！</a></li>
<li><a href="#">捕获“同步代码”中的"运行时异常"，用<code>try/catch</code>就够了。</a></li>
<li><a href="#">"万能"异常捕获者<code>window.onerror</code>，真的万能吗？</a></li>
<li><a href="#">Promise.reject也抛异常，怎么办？</a></li>
<li><a href="#">404等网络请求异常真心要后之后觉吗？</a></li>
</ol>
<h2 id="articleHeader2">一.异常还是错误？它会如何影响我们的代码？</h2>
<p> 在学习Java时我们会被告知异常(Exception)和错误(Error)是不一样的，异常是不会导致进程终止从而可以被修复(try/catch)，但错误将会导致进程终止因此不能被修复。当对于JavaScript而言，我们要面对的仅仅有异常（虽然异常类名为Error或含Error字样），异常的出现不会导致JavaScript引擎崩溃，最多就是让当前执行的任务终止而已。<br> 上面说到异常的出现最多就是让当前执行的任务终止，到底是什么意思呢？这里就涉及到Event Loop的原理了，下面我尝试用代码大致说明吧。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
  // 1.当前代码块将作为一个任务压入任务队列中，JavaScript线程会不断地从任务队列中提取任务执行；
  // 2.当任务执行过程中报异常，且异常没有捕获处理，则会一路沿着调用栈从顶到底抛出，最终终止当前任务的执行；
  // 3.JavaScript线程会继续从任务队列中提取下一个任务继续执行。
  function a(){throw Error(&quot;test&quot;)}
  function b(){a()}
  b()
  console.log(&quot;永远不会执行！&quot;)
</script>
<script>
  // 下一个任务
  console.log(&quot;你有你抛异常，我照样执行！&quot;)
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-comment">// 1.当前代码块将作为一个任务压入任务队列中，JavaScript线程会不断地从任务队列中提取任务执行；</span>
  <span class="hljs-comment">// 2.当任务执行过程中报异常，且异常没有捕获处理，则会一路沿着调用栈从顶到底抛出，最终终止当前任务的执行；</span>
  <span class="hljs-comment">// 3.JavaScript线程会继续从任务队列中提取下一个任务继续执行。</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-keyword">throw</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"test"</span>)}
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">b</span>(<span class="hljs-params"></span>)</span>{a()}
  b()
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"永远不会执行！"</span>)
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-comment">// 下一个任务</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"你有你抛异常，我照样执行！"</span>)
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader3">二.内置异常类型有哪些？</h2>
<p> 说到内置异常类那么必先提到的就是<code>Error</code>这个祖先类型了，其他所有的内置异常类和自定义类都必须继承它。而它的标准属性和方法就以下这寥寥几个而已</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@prop {String} name - 异常名称
@prop {String} message - 供人类阅读的异常信息
@prop {Function} constructor - 类型构造器
@method toString():String - 输出异常信息" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code>@prop <span class="hljs-comment">{String}</span> <span class="hljs-keyword">name</span> - 异常名称
@prop <span class="hljs-comment">{String}</span> <span class="hljs-keyword">message</span> - 供人类阅读的异常信息
@prop <span class="hljs-comment">{Function}</span> <span class="hljs-function"><span class="hljs-keyword">constructor</span> - 类型构造器
@<span class="hljs-title">method</span> <span class="hljs-title">toString</span><span class="hljs-params">()</span>:</span><span class="hljs-keyword">String</span> - 输出异常信息</code></pre>
<p> 由于标准属性实在太少，无法提供更有效的信息供开发者定位异常发生的位置和重现事故现场，因此各浏览器厂家均手多多的自己增加些属性，然后逐渐成了事实标准。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@prop {String} fileName - 异常发生的脚本URI
@prop {number} lineNumber - 异常发生的行号
@prop {number} columnNumber - 异常发生的列号
@prop {String} stack - 异常发生时的调用栈信息，IE10及以上才支持
@method toSource():String - 异常发生的脚本内容" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code>@prop <span class="hljs-comment">{String}</span> fileName - 异常发生的脚本URI
@prop <span class="hljs-comment">{number}</span> lineNumber - 异常发生的行号
@prop <span class="hljs-comment">{number}</span> columnNumber - 异常发生的列号
@prop <span class="hljs-comment">{String}</span> stack - 异常发生时的调用栈信息，IE10及以上才支持
@<span class="hljs-function"><span class="hljs-keyword">method</span> <span class="hljs-title">toSource</span><span class="hljs-params">()</span>:</span>String - 异常发生的脚本内容</code></pre>
<p>另外巨硬还新增以下两个属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@prop {String} description - 和message差不多
@prop {number} number - 异常类型的编号，巨硬为每个异常设置了一个唯一的编号" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code><span class="hljs-symbol">@prop</span> {<span class="hljs-built_in">String</span>} description - 和message差不多
<span class="hljs-symbol">@prop</span> {<span class="hljs-built_in">number</span>} <span class="hljs-built_in">number</span> - 异常类型的编号，巨硬为每个异常设置了一个唯一的编号</code></pre>
<p> 那么现在我要实例化一个Error对象，只需调用<code>Error()</code>或<code>new Error()</code>即可；若想同时设置message，则改为<code>Error("test")</code>或<code>new Error("test")</code>。其实Error的构造函数签名是这样的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@constructor
@param {String=} message - 设置message属性
@param {String=} fileName - 设置fileName属性
@param {number=} lineNumber - 设置lineNUmber属性" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code>@<span class="hljs-function"><span class="hljs-keyword">constructor</span>
@<span class="hljs-title">param</span> <span class="hljs-comment">{String=}</span> <span class="hljs-title">message</span> - 设置<span class="hljs-title">message</span>属性
@<span class="hljs-title">param</span> <span class="hljs-comment">{String=}</span> <span class="hljs-title">fileName</span> - 设置<span class="hljs-title">fileName</span>属性
@<span class="hljs-title">param</span> <span class="hljs-comment">{number=}</span> <span class="hljs-title">lineNumber</span> - 设置<span class="hljs-title">lineNUmber</span>属性</span></code></pre>
<p>现在我们看看具体有哪些内置的异常类型吧！</p>
<ol>
<li>
<strong>EvalError</strong>，调用<code>eval()</code>时发生的异常，已被废弃只用于向后兼容而已</li>
<li>
<strong>InternalError</strong>，JavaScript引擎内部异常，FireFox独门提供的！</li>
<li>
<strong>RangeError</strong>，当函数实参越界时发生，如<code>Array</code>，<code>Number.toExponential</code>,<code>Number.toFixed</code>和<code>Number.toPrecision</code>时入参非法时。</li>
<li>
<strong>ReferenceError</strong>，当引用未声明的变量时发生</li>
<li>
<strong>SyntaxError</strong>，解析时发生语法错误</li>
<li>
<strong>TypeError</strong>，当值不是所期待的类型时，<code>null.f()</code>也报这个错</li>
<li>
<strong>URIError</strong>，当传递一个非法的URI给全局URI处理函数时发生，如<code>decodeURIComponent('%')</code>，即<code>decodeURIComponent</code>，<code>decodeURI</code>,<code>encodeURIComponent</code>，<code>encodeURI</code>
</li>
</ol>
<h2 id="articleHeader4">三.动手写自己的异常类型吧！</h2>
<p> 关于在StackOverflow上早有人讨论如何自定义异常类型了<a href="https://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript" rel="nofollow noreferrer" target="_blank">参考</a><br>于是我们顺手拈来即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function MyError(message, fileName, lineNumber){
  if (this instanceof MyError);else return new MyError(message, fileName, lineNumber)
  this.message = message || &quot;&quot;
  if (fileName){ this.fileName = fileName }
  if (lineNumber){ this.lineNumber = lineNumber }
}

var proto = MyError.prototype = Object.create(Error.prototype)
proto.name = &quot;MyError&quot;
proto.constructor = MyError" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyError</span>(<span class="hljs-params">message, fileName, lineNumber</span>)</span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> MyError);<span class="hljs-keyword">else</span> <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> MyError(message, fileName, lineNumber)
  <span class="hljs-keyword">this</span>.message = message || <span class="hljs-string">""</span>
  <span class="hljs-keyword">if</span> (fileName){ <span class="hljs-keyword">this</span>.fileName = fileName }
  <span class="hljs-keyword">if</span> (lineNumber){ <span class="hljs-keyword">this</span>.lineNumber = lineNumber }
}

<span class="hljs-keyword">var</span> proto = MyError.prototype = <span class="hljs-built_in">Object</span>.create(<span class="hljs-built_in">Error</span>.prototype)
proto.name = <span class="hljs-string">"MyError"</span>
proto.constructor = MyError</code></pre>
<p>cljs实现如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(defn ^export MyError [&amp; args]
  (this-as this
    (if (instance? MyError this)
      (let [ps [&quot;message&quot; &quot;fileName&quot; &quot;lineNumber&quot;]
            idxs (-> (min (count args) (count ps)) range)]
        (reduce
          (fn [accu i]
            (aset accu (nth ps i) (nth args i))
            accu)
          this
          idxs))
      (apply new MyError args))))

(def proto
  (aset MyError &quot;prototype&quot; (.create js/Object (.-prototype Error))))
(aset proto &quot;name&quot; &quot;MyError&quot;)
(aset proto &quot;constructor&quot; MyError)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>(<span class="hljs-name"><span class="hljs-builtin-name">defn</span></span> <span class="hljs-comment">^export</span> MyError [&amp; args]
  (<span class="hljs-name">this-as</span> this
    (<span class="hljs-name"><span class="hljs-builtin-name">if</span></span> (<span class="hljs-name"><span class="hljs-builtin-name">instance?</span></span> MyError this)
      (<span class="hljs-name"><span class="hljs-builtin-name">let</span></span> [ps [<span class="hljs-string">"message"</span> <span class="hljs-string">"fileName"</span> <span class="hljs-string">"lineNumber"</span>]
            idxs (<span class="hljs-name"><span class="hljs-builtin-name">-&gt;</span></span> (<span class="hljs-name"><span class="hljs-builtin-name">min</span></span> (<span class="hljs-name"><span class="hljs-builtin-name">count</span></span> args) (<span class="hljs-name"><span class="hljs-builtin-name">count</span></span> ps)) range)]
        (<span class="hljs-name"><span class="hljs-builtin-name">reduce</span></span>
          (<span class="hljs-name"><span class="hljs-builtin-name">fn</span></span> [accu i]
            (<span class="hljs-name"><span class="hljs-builtin-name">aset</span></span> accu (<span class="hljs-name"><span class="hljs-builtin-name">nth</span></span> ps i) (<span class="hljs-name"><span class="hljs-builtin-name">nth</span></span> args i))
            accu)
          this
          idxs))
      (<span class="hljs-name"><span class="hljs-builtin-name">apply</span></span> new MyError args))))

(<span class="hljs-name"><span class="hljs-builtin-name">def</span></span> proto
  (<span class="hljs-name"><span class="hljs-builtin-name">aset</span></span> MyError <span class="hljs-string">"prototype"</span> (<span class="hljs-name">.create</span> js/Object (<span class="hljs-name">.-prototype</span> Error))))
(<span class="hljs-name"><span class="hljs-builtin-name">aset</span></span> proto <span class="hljs-string">"name"</span> <span class="hljs-string">"MyError"</span>)
(<span class="hljs-name"><span class="hljs-builtin-name">aset</span></span> proto <span class="hljs-string">"constructor"</span> MyError)</code></pre>
<h2 id="articleHeader5">四.捕获“同步代码”中的"运行时异常"，用<code>try/catch</code>就够了</h2>
<p> 为了防止由于异常的出现，导致正常代码被略过的风险，我们习惯采取<code>try/catch</code>来捕获并处理异常。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="try{
  throw Error(&quot;unexpected operation happen...&quot;)
}
catch (e){
  console.log(e.message)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">try</span>{
  <span class="hljs-keyword">throw</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"unexpected operation happen..."</span>)
}
<span class="hljs-keyword">catch</span> (e){
  <span class="hljs-built_in">console</span>.log(e.message)
}</code></pre>
<p>cljs写法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(try
  (throw (Error. &quot;unexpected operation happen...&quot;)
  (catch e
         (println (.-message e)))))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>(<span class="hljs-name"><span class="hljs-builtin-name">try</span></span>
  (<span class="hljs-name"><span class="hljs-builtin-name">throw</span></span> (<span class="hljs-name">Error.</span> <span class="hljs-string">"unexpected operation happen..."</span>)
  (<span class="hljs-name">catch</span> e
         (<span class="hljs-name">println</span> (<span class="hljs-name">.-message</span> e)))))</code></pre>
<p> 很多时我们会以为这样书写就万事大吉了，但其实<code>try/catch</code>能且仅能捕获“同步代码”中的"运行时异常"。<br>1."同步代码"就是说无法获取如<code>setTimeout</code>、<code>Promise</code>等异步代码的异常，也就是说<code>try/catch</code>仅能捕获当前任务的异常，<code>setTimeout</code>等异步代码是在下一个EventLoop中执行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 真心捕获不到啊亲～！
try{
  setTimeout(function(){
    throw Error(&quot;unexpected operation happen...&quot;)
  }, 0)
} catch(e){
  console.log(e)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 真心捕获不到啊亲～！</span>
<span class="hljs-keyword">try</span>{
  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">throw</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"unexpected operation happen..."</span>)
  }, <span class="hljs-number">0</span>)
} <span class="hljs-keyword">catch</span>(e){
  <span class="hljs-built_in">console</span>.log(e)
}</code></pre>
<p>2."运行时异常"是指非SyntaxError，也就是语法错误是无法捕获的，因为在解析JavaScript源码时就报错了，还怎么捕获呢～～</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 非法标识符a->b，真心捕获不到啊亲～！
try{
  a->b = 1
} catch(e){
  console.log(e)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-comment">// 非法标识符a-&gt;b，真心捕获不到啊亲～！</span>
<span class="hljs-keyword">try</span>{
  a-&gt;b = <span class="hljs-number">1</span>
} <span class="hljs-keyword">catch</span>(e){
  console.<span class="hljs-built_in">log</span>(e)
}</code></pre>
<p> 这时大家会急不可待地问：“异步代码的异常咋办呢？语法异常咋办呢？”在解答上述疑问前，我们先偏离一下，稍微挖挖<code>throw</code>语句的特性。</p>
<h3 id="articleHeader6">
<code>throw</code>后面可以跟什么啊？</h3>
<p> 一般而言我们会<code>throw</code>一个Error或其子类的实例(如<code>throw Error()</code>)，其实我们<code>throw</code>任何类型的数据（如<code>throw 1</code>,<code>throw "test"</code>,<code>throw true</code>等）。但即使可以抛出任意类型的数据，我们还是要坚持抛出Error或其子类的实例。这是为什么呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="try{
  throw &quot;unexpected operation happen...&quot;
} catch(e){
  console.log(e)
}

try{
  throw TypeError(&quot;unexpected operation happen...&quot;)
} catch(e){
  if (&quot;TypeError&quot; == e.name){
    // Do something1
  }
  else if (&quot;RangeError&quot; == e.name){
    // Do something2
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code><span class="hljs-keyword">try</span>{
  <span class="hljs-keyword">throw</span> <span class="hljs-string">"unexpected operation happen..."</span>
} <span class="hljs-keyword">catch</span>(e){
  console.<span class="hljs-built_in">log</span>(e)
}

<span class="hljs-keyword">try</span>{
  <span class="hljs-keyword">throw</span> TypeError(<span class="hljs-string">"unexpected operation happen..."</span>)
} <span class="hljs-keyword">catch</span>(e){
  <span class="hljs-keyword">if</span> (<span class="hljs-string">"TypeError"</span> == e.<span class="hljs-built_in">name</span>){
    <span class="hljs-comment">// Do something1</span>
  }
  <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-string">"RangeError"</span> == e.<span class="hljs-built_in">name</span>){
    <span class="hljs-comment">// Do something2</span>
  }
}</code></pre>
<p> 原因显然易见——异常发生时提供信息越全越好，更容易追踪定位重现问题嘛！</p>
<h2 id="articleHeader7">五."万能"异常捕获者<code>window.onerror</code>，真的万能吗？</h2>
<p> 在每个可能发生异常的地方都写上<code>try/catch</code>显然是不实际的(另外还存在性能问题)，即使是罗嗦如Java我们开发时也就是不断声明<code>throws</code>，然后在顶层处理异常罢了。那么，JavaScript中对应的顶层异常处理入口又在哪呢？木有错，就是在<code>window.onerror</code>。看看方法签名吧</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@description window.onerror处理函数
@param {string} message - 异常信息&quot;
@param {string} source  - 发生异常的脚本的URI
@param {number} lineno  - 发生异常的脚本行号
@param {number} colno   - 发生异常的脚本列号
@param {?Error} error   - Error实例，Safari和IE10中没有这个实参" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>@<span class="hljs-keyword">description</span> window.onerror处理函数
@param {<span class="hljs-selector-tag">string</span>} <span class="hljs-selector-tag">message</span> <span class="hljs-selector-tag">-</span> 异常信息"
@<span class="hljs-keyword">param</span> {<span class="hljs-selector-tag">string</span>} <span class="hljs-selector-tag">source</span>  <span class="hljs-selector-tag">-</span> 发生异常的脚本的<span class="hljs-selector-tag">URI</span>
@<span class="hljs-keyword">param</span> {<span class="hljs-selector-tag">number</span>} <span class="hljs-selector-tag">lineno</span>  <span class="hljs-selector-tag">-</span> 发生异常的脚本行号
@<span class="hljs-keyword">param</span> {<span class="hljs-selector-tag">number</span>} <span class="hljs-selector-tag">colno</span>   <span class="hljs-selector-tag">-</span> 发生异常的脚本列号
@<span class="hljs-keyword">param</span> {?<span class="hljs-selector-tag">Error</span>} <span class="hljs-selector-tag">error</span>   <span class="hljs-selector-tag">-</span> <span class="hljs-selector-tag">Error</span>实例，<span class="hljs-selector-tag">Safari</span>和<span class="hljs-selector-tag">IE10</span>中没有这个实参</code></pre>
<p> 这时我们就可以通过它捕获除了<code>try/catch</code>能捕获的异常外，还可以捕获<code>setTimeout</code>等的异步代码异常，语法错误。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onerror = function(message, source, lineno, colno, error){
  // Do something you like.
}

setTimeout(function(){ throw Error(&quot;oh no!&quot;) }, 0)
a->b = 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">message, source, lineno, colno, error</span>)</span>{
  <span class="hljs-comment">// Do something you like.</span>
}

setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-keyword">throw</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"oh no!"</span>) }, <span class="hljs-number">0</span>)
a-&gt;b = <span class="hljs-number">1</span></code></pre>
<p> 这样就满足了吗？还没出大杀技呢——屏蔽异常、屏蔽、屏～～<br> 只有onerror函数返回<code>true</code>时，异常就不会继续向上抛(否则继续上抛就成了Uncaught Error了)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 有异常没问题啊，因为我看不到^_^
window.onerror = function(){return true}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 有异常没问题啊，因为我看不到^_^</span>
<span class="hljs-built_in">window</span>.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>}</code></pre>
<p> 现在回到标题的疑问中，有了onerror就可以捕获所有异常了吗？答案又是否定的（我的娘啊，还要折腾多久啊～0～）</p>
<ol>
<li>Chrome中对于跨域脚本所报的异常，虽然onerror能够捕获，但统一报<code>Script Error</code>。若要得到正确的错误信息，则要配置跨域资源共享CORS才可以。</li>
<li>
<code>window.onerror</code>实际上采用的事件冒泡的机制捕获异常，并且在冒泡(bubble)阶段时才触发，因此像网络请求异常这些不会冒泡的异常是无法捕获的。</li>
<li>Promise.reject产生的未被catch的异常，<code>window.onerror</code>也是无能为力。</li>
</ol>
<h2 id="articleHeader8">六.Promise.reject也抛异常，怎么办？</h2>
<p> 通过Promise来处理复杂的异步流程控制让我们得心应手，但倘若其中出现异常或Promise实例状态变为rejected时，会是怎样一个状况，我们又可以如何处理呢？</p>
<h3 id="articleHeader9">Promise是如何标识异常发生的？</h3>
<p> Promise实例的初始化状态是pending，而发生异常时则为rejected，而导致状态从pending转变为rejected的操作有</p>
<ol>
<li>调用<code>Promise.reject</code>类方法</li>
<li>在工厂方法中调用<code>reject</code>方法</li>
<li>在工厂方法或then回调函数中抛异常</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 方式1
Promise.reject(&quot;anything you want&quot;)

// 方式2
new Promise(function(resolve, reject) { reject(&quot;anything you want&quot;) })

// 方式3
new Promise(function{ throw &quot;anything you want&quot; })
new Promise(function(r) { r(Error(&quot;anything you want&quot; ) }).then(function(e) { throw e })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 方式1</span>
<span class="hljs-built_in">Promise</span>.reject(<span class="hljs-string">"anything you want"</span>)

<span class="hljs-comment">// 方式2</span>
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{ reject(<span class="hljs-string">"anything you want"</span>) })

<span class="hljs-comment">// 方式3</span>
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span></span>{ <span class="hljs-keyword">throw</span> <span class="hljs-string">"anything you want"</span> })
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">r</span>) </span>{ r(<span class="hljs-built_in">Error</span>(<span class="hljs-string">"anything you want"</span> ) }).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{ <span class="hljs-keyword">throw</span> e })</code></pre>
<p> 当Promise实例从pending转变为rejected时，和之前谈论到异常一样，要么被捕获处理，要么继续抛出直到成为<code>Uncaught(in promise) Error</code>为止。</p>
<h3 id="articleHeader10">异常发生前就<code>catch</code>掉</h3>
<p> 若在异常发生前我们已经调用<code>catch</code>方法来捕获异常，那么则相安无事</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise(function(resolve, reject){
  setTimeout(reject, 0)
}).catch(function(e){
  console.log(&quot;catch&quot;)
  return &quot;bingo&quot;
}).then(function(x){
  console.log(x)
})

// 回显 bingo" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>)</span>{
  setTimeout(reject, <span class="hljs-number">0</span>)
}).catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"catch"</span>)
  <span class="hljs-keyword">return</span> <span class="hljs-string">"bingo"</span>
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x</span>)</span>{
  <span class="hljs-built_in">console</span>.log(x)
})

<span class="hljs-comment">// 回显 bingo</span></code></pre>
<h3 id="articleHeader11">专属于Promise的顶层异常处理</h3>
<p> 若在异常发生前我们没有调用<code>catch</code>方法来捕获异常，还是可以通过<code>window</code>的<code>unhandledrejection</code>事件捕获异常的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.addEventListener(&quot;unhandledrejection&quot;, function(e){
  // Event新增属性
  // @prop {Promise} promise - 状态为rejected的Promise实例
  // @prop {String|Object} reason - 异常信息或rejected的内容

  // 会阻止异常继续抛出，不让Uncaught(in promise) Error产生
  e.preventDefault()
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">"unhandledrejection"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  <span class="hljs-comment">// Event新增属性</span>
  <span class="hljs-comment">// @prop {Promise} promise - 状态为rejected的Promise实例</span>
  <span class="hljs-comment">// @prop {String|Object} reason - 异常信息或rejected的内容</span>

  <span class="hljs-comment">// 会阻止异常继续抛出，不让Uncaught(in promise) Error产生</span>
  e.preventDefault()
})</code></pre>
<h3 id="articleHeader12">迟来的<code>catch</code>
</h3>
<p> 由于Promise实例可异步订阅其状态变化，也就是可以异步注册catch处理函数，这时其实已经抛出<code>Uncaught(in promise) Error</code>，但我们依然可以处理</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = new Promise(function(resolve, reject){
  setTimeout(reject, 0)
})
setTimeout(function(){
  p.catch(function(e){
    console.log(&quot;catch&quot;)
    return &quot;bingo&quot;
  })
}, 1000)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>)</span>{
  setTimeout(reject, <span class="hljs-number">0</span>)
})
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  p.catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"catch"</span>)
    <span class="hljs-keyword">return</span> <span class="hljs-string">"bingo"</span>
  })
}, <span class="hljs-number">1000</span>)</code></pre>
<p> 另外，还可以通过<code>window</code>的<code>rejectionhandled</code>事件监听异步注册catch处理函数的行为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.addEventListener(&quot;rejectionhandled&quot;, function(e){
  // Event新增属性
  // @prop {Promise} promise - 状态为rejected的Promise实例
  // @prop {String|Object} reason - 异常信息或rejected的内容

  // Uncaught(in promise) Error已经抛出，所以这句毫无意义^_^
  e.preventDefault()
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">"rejectionhandled"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  <span class="hljs-comment">// Event新增属性</span>
  <span class="hljs-comment">// @prop {Promise} promise - 状态为rejected的Promise实例</span>
  <span class="hljs-comment">// @prop {String|Object} reason - 异常信息或rejected的内容</span>

  <span class="hljs-comment">// Uncaught(in promise) Error已经抛出，所以这句毫无意义^_^</span>
  e.preventDefault()
})</code></pre>
<p>注意：只有抛出<code>Uncaught(in promise) Error</code>后，异步catch才会触发该事件。</p>
<h2 id="articleHeader13">七.404等网络请求异常真心要后之后觉吗？</h2>
<p> 也许我们都遇到<code>&lt;img src="./404.png"&gt;</code>报404网络请求异常的情况，然后测试或用户保障怎么哪个哪个图标没有显示。其实我们我们可以通过以下方式捕获这类异常</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.addEventListener(&quot;error&quot;, function(e){
  // Do something
  console.log(e.bubbles) // 回显false
}, true)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">"error"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  <span class="hljs-comment">// Do something</span>
  <span class="hljs-built_in">console</span>.log(e.bubbles) <span class="hljs-comment">// 回显false</span>
}, <span class="hljs-literal">true</span>)</code></pre>
<p> 由于网络请求异常不会冒泡，因此必须在capture阶段捕获才可以。但还有一个问题是这种方式无法精确判断异常的HTTP状态是404还是500等，因此还是要配合服务端日志来排查分析才可以。</p>
<h2 id="articleHeader14">总结</h2>
<p> 对异常和如何捕获异常仅仅是前端智能监控中的一小撮知识点，敬请期待后续另一小撮知识点《前端魔法堂——调用栈，异常实例中的宝藏》吧:D<br> 尊重原创，转载请注明来自：<a href="http://www.cnblogs.com/fsjohnhuang/p/7685144.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/fsjohn...</a> ^_^肥仔John</p>
<h2 id="articleHeader15">参考</h2>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a><br><a href="https://stackoverflow.com/questions/8504673/how-to-detect-on-page-404-errors-using-javascript" rel="nofollow noreferrer" target="_blank">https://stackoverflow.com/que...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端魔法堂——异常不仅仅是try/catch

## 原文链接
[https://segmentfault.com/a/1190000011602203](https://segmentfault.com/a/1190000011602203)

