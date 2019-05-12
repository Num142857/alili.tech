---
title: 'ES6 系列之 Babel 将 Generator 编译成了什么样子' 
date: 2019-02-15 2:30:44
hidden: true
slug: cik25m3bh7m
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>本文就是简单介绍下 Generator 语法编译后的代码。</p>
<h2 id="articleHeader1">Generator</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">helloWorldGenerator</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">yield</span> <span class="hljs-string">'hello'</span>;
  <span class="hljs-keyword">yield</span> <span class="hljs-string">'world'</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-string">'ending'</span>;
}</code></pre>
<p>我们打印下执行的结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var hw = helloWorldGenerator();

console.log(hw.next()); // {value: &quot;hello&quot;, done: false}
console.log(hw.next()); // {value: &quot;world&quot;, done: false}
console.log(hw.next()); // {value: &quot;ending&quot;, done: true}
console.log(hw.next()); // {value: undefined, done: true}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> hw = helloWorldGenerator();

<span class="hljs-built_in">console</span>.log(hw.next()); <span class="hljs-comment">// {value: "hello", done: false}</span>
<span class="hljs-built_in">console</span>.log(hw.next()); <span class="hljs-comment">// {value: "world", done: false}</span>
<span class="hljs-built_in">console</span>.log(hw.next()); <span class="hljs-comment">// {value: "ending", done: true}</span>
<span class="hljs-built_in">console</span>.log(hw.next()); <span class="hljs-comment">// {value: undefined, done: true}</span></code></pre>
<h2 id="articleHeader2">Babel</h2>
<p>具体的执行过程就不说了，我们直接在 Babel 官网的 <a href="https://babeljs.io/repl" rel="nofollow noreferrer" target="_blank">Try it out</a> 粘贴上述代码，然后查看代码被编译成了什么样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 我们就称呼这个版本为简单编译版本吧
 */
var _marked = /*#__PURE__*/ regeneratorRuntime.mark(helloWorldGenerator);

function helloWorldGenerator() {
  return regeneratorRuntime.wrap(
    function helloWorldGenerator$(_context) {
      while (1) {
        switch ((_context.prev = _context.next)) {
          case 0:
            _context.next = 2;
            return &quot;hello&quot;;

          case 2:
            _context.next = 4;
            return &quot;world&quot;;

          case 4:
            return _context.abrupt(&quot;return&quot;, &quot;ending&quot;);

          case 5:
          case &quot;end&quot;:
            return _context.stop();
        }
      }
    },
    _marked,
    this
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 我们就称呼这个版本为简单编译版本吧
 */</span>
<span class="hljs-keyword">var</span> _marked = <span class="hljs-comment">/*#__PURE__*/</span> regeneratorRuntime.mark(helloWorldGenerator);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">helloWorldGenerator</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> regeneratorRuntime.wrap(
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">helloWorldGenerator$</span>(<span class="hljs-params">_context</span>) </span>{
      <span class="hljs-keyword">while</span> (<span class="hljs-number">1</span>) {
        <span class="hljs-keyword">switch</span> ((_context.prev = _context.next)) {
          <span class="hljs-keyword">case</span> <span class="hljs-number">0</span>:
            _context.next = <span class="hljs-number">2</span>;
            <span class="hljs-keyword">return</span> <span class="hljs-string">"hello"</span>;

          <span class="hljs-keyword">case</span> <span class="hljs-number">2</span>:
            _context.next = <span class="hljs-number">4</span>;
            <span class="hljs-keyword">return</span> <span class="hljs-string">"world"</span>;

          <span class="hljs-keyword">case</span> <span class="hljs-number">4</span>:
            <span class="hljs-keyword">return</span> _context.abrupt(<span class="hljs-string">"return"</span>, <span class="hljs-string">"ending"</span>);

          <span class="hljs-keyword">case</span> <span class="hljs-number">5</span>:
          <span class="hljs-keyword">case</span> <span class="hljs-string">"end"</span>:
            <span class="hljs-keyword">return</span> _context.stop();
        }
      }
    },
    _marked,
    <span class="hljs-keyword">this</span>
  );
}</code></pre>
<p>猛一看，好像编译后的代码还蛮少的，但是细细一看，编译后的代码肯定是不能用的呀，<code>regeneratorRuntime</code> 是个什么鬼？哪里有声明呀？<code>mark</code> 和 <code>wrap</code> 方法又都做了什么？</p>
<p>难道就不能编译一个完整可用的代码吗？</p>
<h2 id="articleHeader3">regenerator</h2>
<p>如果你想看到完整可用的代码，你可以使用 <a href="https://github.com/facebook/regenerator" rel="nofollow noreferrer" target="_blank">regenerator</a>，这是 facebook 下的一个工具，用于编译 ES6 的 generator 函数。</p>
<p>我们先安装一下 regenerator：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g regenerator" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install -g regenerator</code></pre>
<p>然后新建一个 generator.js 文件，里面的代码就是文章最一开始的代码，我们执行命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="regenerator --include-runtime generator.js > generator-es5.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">regenerator --include-runtime generator.js &gt; generator-es5.js</code></pre>
<p>我们就可以在 generator-es5.js 文件看到编译后的完整可用的代码。</p>
<p>而这一编译就编译了 700 多行…… 编译后的代码可以查看 <a href="https://github.com/mqyqingfeng/Blog/blob/master/demos/ES6/generator/generator-es5.js" rel="nofollow noreferrer" target="_blank">generator-es5.js</a></p>
<p>总之编译后的代码还蛮复杂，我们可以从中抽离出大致的逻辑，至少让简单编译的那段代码能够跑起来。</p>
<h2 id="articleHeader4">mark 函数</h2>
<p>简单编译后的代码第一段是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _marked = /*#__PURE__*/ regeneratorRuntime.mark(helloWorldGenerator);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> _marked = <span class="hljs-comment">/*#__PURE__*/</span> regeneratorRuntime.mark(helloWorldGenerator);</code></pre>
<p>我们查看完整编译版本中 mark 函数的源码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="runtime.mark = function(genFun) {
  genFun.__proto__ = GeneratorFunctionPrototype;
  genFun.prototype = Object.create(Gp);
  return genFun;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">runtime.mark = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">genFun</span>) </span>{
  genFun.__proto__ = GeneratorFunctionPrototype;
  genFun.prototype = <span class="hljs-built_in">Object</span>.create(Gp);
  <span class="hljs-keyword">return</span> genFun;
};</code></pre>
<p>这其中又涉及了 GeneratorFunctionPrototype 和 Gp 变量，我们也查看下对应的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Generator() {}
function GeneratorFunction() {}
function GeneratorFunctionPrototype() {}

...

var Gp = GeneratorFunctionPrototype.prototype =
  Generator.prototype = Object.create(IteratorPrototype);

GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;

GeneratorFunctionPrototype.constructor = GeneratorFunction;

GeneratorFunctionPrototype[toStringTagSymbol] =
  GeneratorFunction.displayName = &quot;GeneratorFunction&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Generator</span>(<span class="hljs-params"></span>) </span>{}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">GeneratorFunction</span>(<span class="hljs-params"></span>) </span>{}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">GeneratorFunctionPrototype</span>(<span class="hljs-params"></span>) </span>{}

...

var Gp = GeneratorFunctionPrototype.prototype =
  Generator.prototype = <span class="hljs-built_in">Object</span>.create(IteratorPrototype);

GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;

GeneratorFunctionPrototype.constructor = GeneratorFunction;

GeneratorFunctionPrototype[toStringTagSymbol] =
  GeneratorFunction.displayName = <span class="hljs-string">"GeneratorFunction"</span>;</code></pre>
<p>这段代码构建了一堆看起来很复杂的关系链，其实这是参照着 <a href="https://www.ecma-international.org/ecma-262/6.0/#sec-generatorfunction-constructor" rel="nofollow noreferrer" target="_blank">ES6 规范</a>构建的关系链:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016855710?w=1722&amp;h=1506" src="https://static.alili.tech/img/remote/1460000016855710?w=1722&amp;h=1506" alt="regenerator" title="regenerator" style="cursor: pointer;"></span></p>
<p>图中 <code>+@@toStringTag:s = 'Generator'</code> 的就是 Gp，<code>+@@toStringTag:s = 'GeneratorFunction'</code> 的就是 GeneratorFunctionPrototype。</p>
<p>构建关系链的目的在于判断关系的时候能够跟原生的保持一致，就比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* f() {}
var g = f();
console.log(g.__proto__ === f.prototype); // true
console.log(g.__proto__.__proto__ === f.__proto__.prototype); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{}
<span class="hljs-keyword">var</span> g = f();
<span class="hljs-built_in">console</span>.log(g.__proto__ === f.prototype); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(g.__proto__.__proto__ === f.__proto__.prototype); <span class="hljs-comment">// true</span></code></pre>
<p>为了简化起见，我们可以把 Gp 先设置为一个空对象，不过正如你在上图中看到的，next()、 throw()、return() 函数都是挂载在 Gp 对象上，实际上，在完整的编译代码中，确实有为 Gp 添加这三个函数的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 117 行
function defineIteratorMethods(prototype) {
  [&quot;next&quot;, &quot;throw&quot;, &quot;return&quot;].forEach(function(method) {
    prototype[method] = function(arg) {
      return this._invoke(method, arg);
    };
  });
}

// 406 行
defineIteratorMethods(Gp);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 117 行</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineIteratorMethods</span>(<span class="hljs-params">prototype</span>) </span>{
  [<span class="hljs-string">"next"</span>, <span class="hljs-string">"throw"</span>, <span class="hljs-string">"return"</span>].forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">method</span>) </span>{
    prototype[method] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">arg</span>) </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._invoke(method, arg);
    };
  });
}

<span class="hljs-comment">// 406 行</span>
defineIteratorMethods(Gp);</code></pre>
<p>为了简单起见，我们将整个 mark 函数简化为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="runtime.mark = function(genFun) {
  var generator = Object.create({
    next: function(arg) {
      return this._invoke('next', arg)
    }
  });
  genFun.prototype = generator;
  return genFun;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">runtime.mark = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">genFun</span>) </span>{
  <span class="hljs-keyword">var</span> generator = <span class="hljs-built_in">Object</span>.create({
    <span class="hljs-attr">next</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">arg</span>) </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._invoke(<span class="hljs-string">'next'</span>, arg)
    }
  });
  genFun.prototype = generator;
  <span class="hljs-keyword">return</span> genFun;
};</code></pre>
<h2 id="articleHeader5">wrap 函数</h2>
<p>除了设置关系链之外，mark 函数的返回值 genFun 还作为了 wrap 函数的第二个参数传入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function helloWorldGenerator() {
  return regeneratorRuntime.wrap(
    function helloWorldGenerator$(_context) {
      ...
    },
    _marked,
    this
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">helloWorldGenerator</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> regeneratorRuntime.wrap(
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">helloWorldGenerator$</span>(<span class="hljs-params">_context</span>) </span>{
      ...
    },
    _marked,
    <span class="hljs-keyword">this</span>
  );
}</code></pre>
<p>我们再看下 wrap 函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function wrap(innerFn, outerFn, self) {
  var generator = Object.create(outerFn.prototype);
  var context = new Context([]);
  generator._invoke = makeInvokeMethod(innerFn, self, context);

  return generator;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">wrap</span>(<span class="hljs-params">innerFn, outerFn, self</span>) </span>{
  <span class="hljs-keyword">var</span> generator = <span class="hljs-built_in">Object</span>.create(outerFn.prototype);
  <span class="hljs-keyword">var</span> context = <span class="hljs-keyword">new</span> Context([]);
  generator._invoke = makeInvokeMethod(innerFn, self, context);

  <span class="hljs-keyword">return</span> generator;
}</code></pre>
<p>所以当执行 <code>var hw = helloWorldGenerator();</code> 的时候，其实执行的是 wrap 函数，wrap 函数返回了 generator，generator 是一个对象，原型是 <code>outerFn.prototype</code>, <code>outerFn.prototype</code> 其实就是 <code>genFun.prototype</code>， <code>genFun.prototype</code> 是一个空对象，原型上有 next() 方法。</p>
<p>所以当你执行 <code>hw.next()</code> 的时候，执行的其实是 hw 原型的原型上的 next 函数，next 函数执行的又是 hw 的 _invoke 函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="generator._invoke = makeInvokeMethod(innerFn, self, context);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">generator._invoke = makeInvokeMethod(innerFn, self, context);</code></pre>
<p>innerFn 就是 wrap 包裹的那个函数，其实就是 helloWordGenerato$ 函数，呐，就是这个函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function helloWorldGenerator$(_context) {
  while (1) {
    switch ((_context.prev = _context.next)) {
      case 0:
        _context.next = 2;
        return &quot;hello&quot;;

      case 2:
        _context.next = 4;
        return &quot;world&quot;;

      case 4:
        return _context.abrupt(&quot;return&quot;, &quot;ending&quot;);

      case 5:
      case &quot;end&quot;:
        return _context.stop();
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">helloWorldGenerator$</span>(<span class="hljs-params">_context</span>) </span>{
  <span class="hljs-keyword">while</span> (<span class="hljs-number">1</span>) {
    <span class="hljs-keyword">switch</span> ((_context.prev = _context.next)) {
      <span class="hljs-keyword">case</span> <span class="hljs-number">0</span>:
        _context.next = <span class="hljs-number">2</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-string">"hello"</span>;

      <span class="hljs-keyword">case</span> <span class="hljs-number">2</span>:
        _context.next = <span class="hljs-number">4</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-string">"world"</span>;

      <span class="hljs-keyword">case</span> <span class="hljs-number">4</span>:
        <span class="hljs-keyword">return</span> _context.abrupt(<span class="hljs-string">"return"</span>, <span class="hljs-string">"ending"</span>);

      <span class="hljs-keyword">case</span> <span class="hljs-number">5</span>:
      <span class="hljs-keyword">case</span> <span class="hljs-string">"end"</span>:
        <span class="hljs-keyword">return</span> _context.stop();
    }
  }
}</code></pre>
<p>而 context 你可以直接理解为这样一个全局对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ContinueSentinel = {};

var context = {
  done: false,
  method: &quot;next&quot;,
  next: 0,
  prev: 0,
  abrupt: function(type, arg) {
    var record = {};
    record.type = type;
    record.arg = arg;

    return this.complete(record);
  },
  complete: function(record, afterLoc) {
    if (record.type === &quot;return&quot;) {
      this.rval = this.arg = record.arg;
      this.method = &quot;return&quot;;
      this.next = &quot;end&quot;;
    }

    return ContinueSentinel;
  },
  stop: function() {
    this.done = true;
    return this.rval;
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> ContinueSentinel = {};

<span class="hljs-keyword">var</span> context = {
  <span class="hljs-attr">done</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">method</span>: <span class="hljs-string">"next"</span>,
  <span class="hljs-attr">next</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attr">prev</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attr">abrupt</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">type, arg</span>) </span>{
    <span class="hljs-keyword">var</span> record = {};
    record.type = type;
    record.arg = arg;

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.complete(record);
  },
  <span class="hljs-attr">complete</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">record, afterLoc</span>) </span>{
    <span class="hljs-keyword">if</span> (record.type === <span class="hljs-string">"return"</span>) {
      <span class="hljs-keyword">this</span>.rval = <span class="hljs-keyword">this</span>.arg = record.arg;
      <span class="hljs-keyword">this</span>.method = <span class="hljs-string">"return"</span>;
      <span class="hljs-keyword">this</span>.next = <span class="hljs-string">"end"</span>;
    }

    <span class="hljs-keyword">return</span> ContinueSentinel;
  },
  <span class="hljs-attr">stop</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.done = <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.rval;
  }
};</code></pre>
<p>每次 <code>hw.next</code> 的时候，就会修改 next 和 prev 属性的值，当在 generator 函数中 return 的时候会执行 abrupt，abrupt 中又会执行 complete，执行完 complete，因为 <code>this.next = end</code> 的缘故，再执行就会执行 stop 函数。</p>
<p>我们来看下 makeInvokeMethod 函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ContinueSentinel = {};

function makeInvokeMethod(innerFn, self, context) {
  var state = 'start';

  return function invoke(method, arg) {

    if (state === 'completed') {
      return { value: undefined, done: true };
    }

    context.method = method;
    context.arg = arg;

    while (true) {

      state = 'executing';

      var record = {
        type: 'normal',
        arg: innerFn.call(self, context)
      };
      if (record.type === &quot;normal&quot;) {

        state = context.done
          ? 'completed'
          : 'yield';

        if (record.arg === ContinueSentinel) {
          continue;
        }

        return {
          value: record.arg,
          done: context.done
        };

      }
    }
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> ContinueSentinel = {};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeInvokeMethod</span>(<span class="hljs-params">innerFn, self, context</span>) </span>{
  <span class="hljs-keyword">var</span> state = <span class="hljs-string">'start'</span>;

  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">invoke</span>(<span class="hljs-params">method, arg</span>) </span>{

    <span class="hljs-keyword">if</span> (state === <span class="hljs-string">'completed'</span>) {
      <span class="hljs-keyword">return</span> { <span class="hljs-attr">value</span>: <span class="hljs-literal">undefined</span>, <span class="hljs-attr">done</span>: <span class="hljs-literal">true</span> };
    }

    context.method = method;
    context.arg = arg;

    <span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {

      state = <span class="hljs-string">'executing'</span>;

      <span class="hljs-keyword">var</span> record = {
        <span class="hljs-attr">type</span>: <span class="hljs-string">'normal'</span>,
        <span class="hljs-attr">arg</span>: innerFn.call(self, context)
      };
      <span class="hljs-keyword">if</span> (record.type === <span class="hljs-string">"normal"</span>) {

        state = context.done
          ? <span class="hljs-string">'completed'</span>
          : <span class="hljs-string">'yield'</span>;

        <span class="hljs-keyword">if</span> (record.arg === ContinueSentinel) {
          <span class="hljs-keyword">continue</span>;
        }

        <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">value</span>: record.arg,
          <span class="hljs-attr">done</span>: context.done
        };

      }
    }
  };
}</code></pre>
<p>基本的执行过程就不分析了，我们重点看第三次执行 <code>hw.next()</code> 的时候:</p>
<p>第三次执行 <code>hw.next()</code> 的时候，其实执行了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this._invoke(&quot;next&quot;, undefined);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>._invoke(<span class="hljs-string">"next"</span>, <span class="hljs-literal">undefined</span>);</code></pre>
<p>我们在 invoke 函数中构建了一个 record 对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var record = {
  type: &quot;normal&quot;,
  arg: innerFn.call(self, context)
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> record = {
  <span class="hljs-attr">type</span>: <span class="hljs-string">"normal"</span>,
  <span class="hljs-attr">arg</span>: innerFn.call(self, context)
};</code></pre>
<p>而在 <code>innerFn.call(self, context)</code> 中，因为 _context.next 为 4 的缘故，其实执行了:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_context.abrupt(&quot;return&quot;, 'ending');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">_context.abrupt(<span class="hljs-string">"return"</span>, <span class="hljs-string">'ending'</span>);</code></pre>
<p>而在 abrupt 中，我们又构建了一个 record 对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var record = {};
record.type = 'return';
record.arg = 'ending';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> record = {};
record.type = <span class="hljs-string">'return'</span>;
record.arg = <span class="hljs-string">'ending'</span>;</code></pre>
<p>然后执行了 <code>this.complete(record)</code>，</p>
<p>在 complete 中，因为 <code>record.type === "return"</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.rval = 'ending';
this.method = &quot;return&quot;;
this.next = &quot;end&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">this</span>.rval = <span class="hljs-string">'ending'</span>;
<span class="hljs-keyword">this</span>.method = <span class="hljs-string">"return"</span>;
<span class="hljs-keyword">this</span>.next = <span class="hljs-string">"end"</span>;</code></pre>
<p>然后返回了全局对象 ContinueSentinel，其实就是一个全局空对象。</p>
<p>然后在 invoke 函数中，因为 <code>record.arg === ContinueSentinel</code> 的缘故，没有执行后面的 return 语句，就直接进入下一个循环。</p>
<p>于是又执行了一遍 <code>innerFn.call(self, context)</code>，此时 <code>_context.next</code> 为 end, 执行了 <code>_context.stop()</code>, 在 stop 函数中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.done = true;
return this.rval; // this.rval 其实就是 `ending`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">this</span>.done = <span class="hljs-literal">true</span>;
<span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.rval; <span class="hljs-comment">// this.rval 其实就是 `ending`</span></code></pre>
<p>所以最终返回的值为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  value: 'ending',
  done: true
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-attr">value</span>: <span class="hljs-string">'ending'</span>,
  <span class="hljs-attr">done</span>: <span class="hljs-literal">true</span>
};</code></pre>
<p>之后，我们再执行 hw.next() 的时候，因为 state 已经是 'completed' 的缘故，直接就返回 <code>{ value: undefined, done: true}</code></p>
<h2 id="articleHeader6">不完整但可用的源码</h2>
<p>当然这个过程，看文字理解起来可能有些难度，不完整但可用的代码如下，你可以断点调试查看具体的过程：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function() {
  var ContinueSentinel = {};

  var mark = function(genFun) {
    var generator = Object.create({
      next: function(arg) {
        return this._invoke(&quot;next&quot;, arg);
      }
    });
    genFun.prototype = generator;
    return genFun;
  };

  function wrap(innerFn, outerFn, self) {
    var generator = Object.create(outerFn.prototype);

    var context = {
      done: false,
      method: &quot;next&quot;,
      next: 0,
      prev: 0,
      abrupt: function(type, arg) {
        var record = {};
        record.type = type;
        record.arg = arg;

        return this.complete(record);
      },
      complete: function(record, afterLoc) {
        if (record.type === &quot;return&quot;) {
          this.rval = this.arg = record.arg;
          this.method = &quot;return&quot;;
          this.next = &quot;end&quot;;
        }

        return ContinueSentinel;
      },
      stop: function() {
        this.done = true;
        return this.rval;
      }
    };

    generator._invoke = makeInvokeMethod(innerFn, context);

    return generator;
  }

  function makeInvokeMethod(innerFn, context) {
    var state = &quot;start&quot;;

    return function invoke(method, arg) {
      if (state === &quot;completed&quot;) {
        return { value: undefined, done: true };
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        state = &quot;executing&quot;;

        var record = {
          type: &quot;normal&quot;,
          arg: innerFn.call(self, context)
        };

        if (record.type === &quot;normal&quot;) {
          state = context.done ? &quot;completed&quot; : &quot;yield&quot;;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        }
      }
    };
  }

  window.regeneratorRuntime = {};

  regeneratorRuntime.wrap = wrap;
  regeneratorRuntime.mark = mark;
})();

var _marked = regeneratorRuntime.mark(helloWorldGenerator);

function helloWorldGenerator() {
  return regeneratorRuntime.wrap(
    function helloWorldGenerator$(_context) {
      while (1) {
        switch ((_context.prev = _context.next)) {
          case 0:
            _context.next = 2;
            return &quot;hello&quot;;

          case 2:
            _context.next = 4;
            return &quot;world&quot;;

          case 4:
            return _context.abrupt(&quot;return&quot;, &quot;ending&quot;);

          case 5:
          case &quot;end&quot;:
            return _context.stop();
        }
      }
    },
    _marked,
    this
  );
}

var hw = helloWorldGenerator();

console.log(hw.next());
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> ContinueSentinel = {};

  <span class="hljs-keyword">var</span> mark = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">genFun</span>) </span>{
    <span class="hljs-keyword">var</span> generator = <span class="hljs-built_in">Object</span>.create({
      <span class="hljs-attr">next</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">arg</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._invoke(<span class="hljs-string">"next"</span>, arg);
      }
    });
    genFun.prototype = generator;
    <span class="hljs-keyword">return</span> genFun;
  };

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">wrap</span>(<span class="hljs-params">innerFn, outerFn, self</span>) </span>{
    <span class="hljs-keyword">var</span> generator = <span class="hljs-built_in">Object</span>.create(outerFn.prototype);

    <span class="hljs-keyword">var</span> context = {
      <span class="hljs-attr">done</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">method</span>: <span class="hljs-string">"next"</span>,
      <span class="hljs-attr">next</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">prev</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">abrupt</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">type, arg</span>) </span>{
        <span class="hljs-keyword">var</span> record = {};
        record.type = type;
        record.arg = arg;

        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.complete(record);
      },
      <span class="hljs-attr">complete</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">record, afterLoc</span>) </span>{
        <span class="hljs-keyword">if</span> (record.type === <span class="hljs-string">"return"</span>) {
          <span class="hljs-keyword">this</span>.rval = <span class="hljs-keyword">this</span>.arg = record.arg;
          <span class="hljs-keyword">this</span>.method = <span class="hljs-string">"return"</span>;
          <span class="hljs-keyword">this</span>.next = <span class="hljs-string">"end"</span>;
        }

        <span class="hljs-keyword">return</span> ContinueSentinel;
      },
      <span class="hljs-attr">stop</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.done = <span class="hljs-literal">true</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.rval;
      }
    };

    generator._invoke = makeInvokeMethod(innerFn, context);

    <span class="hljs-keyword">return</span> generator;
  }

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeInvokeMethod</span>(<span class="hljs-params">innerFn, context</span>) </span>{
    <span class="hljs-keyword">var</span> state = <span class="hljs-string">"start"</span>;

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">invoke</span>(<span class="hljs-params">method, arg</span>) </span>{
      <span class="hljs-keyword">if</span> (state === <span class="hljs-string">"completed"</span>) {
        <span class="hljs-keyword">return</span> { <span class="hljs-attr">value</span>: <span class="hljs-literal">undefined</span>, <span class="hljs-attr">done</span>: <span class="hljs-literal">true</span> };
      }

      context.method = method;
      context.arg = arg;

      <span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
        state = <span class="hljs-string">"executing"</span>;

        <span class="hljs-keyword">var</span> record = {
          <span class="hljs-attr">type</span>: <span class="hljs-string">"normal"</span>,
          <span class="hljs-attr">arg</span>: innerFn.call(self, context)
        };

        <span class="hljs-keyword">if</span> (record.type === <span class="hljs-string">"normal"</span>) {
          state = context.done ? <span class="hljs-string">"completed"</span> : <span class="hljs-string">"yield"</span>;

          <span class="hljs-keyword">if</span> (record.arg === ContinueSentinel) {
            <span class="hljs-keyword">continue</span>;
          }

          <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">value</span>: record.arg,
            <span class="hljs-attr">done</span>: context.done
          };
        }
      }
    };
  }

  <span class="hljs-built_in">window</span>.regeneratorRuntime = {};

  regeneratorRuntime.wrap = wrap;
  regeneratorRuntime.mark = mark;
})();

<span class="hljs-keyword">var</span> _marked = regeneratorRuntime.mark(helloWorldGenerator);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">helloWorldGenerator</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> regeneratorRuntime.wrap(
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">helloWorldGenerator$</span>(<span class="hljs-params">_context</span>) </span>{
      <span class="hljs-keyword">while</span> (<span class="hljs-number">1</span>) {
        <span class="hljs-keyword">switch</span> ((_context.prev = _context.next)) {
          <span class="hljs-keyword">case</span> <span class="hljs-number">0</span>:
            _context.next = <span class="hljs-number">2</span>;
            <span class="hljs-keyword">return</span> <span class="hljs-string">"hello"</span>;

          <span class="hljs-keyword">case</span> <span class="hljs-number">2</span>:
            _context.next = <span class="hljs-number">4</span>;
            <span class="hljs-keyword">return</span> <span class="hljs-string">"world"</span>;

          <span class="hljs-keyword">case</span> <span class="hljs-number">4</span>:
            <span class="hljs-keyword">return</span> _context.abrupt(<span class="hljs-string">"return"</span>, <span class="hljs-string">"ending"</span>);

          <span class="hljs-keyword">case</span> <span class="hljs-number">5</span>:
          <span class="hljs-keyword">case</span> <span class="hljs-string">"end"</span>:
            <span class="hljs-keyword">return</span> _context.stop();
        }
      }
    },
    _marked,
    <span class="hljs-keyword">this</span>
  );
}

<span class="hljs-keyword">var</span> hw = helloWorldGenerator();

<span class="hljs-built_in">console</span>.log(hw.next());
<span class="hljs-built_in">console</span>.log(hw.next());
<span class="hljs-built_in">console</span>.log(hw.next());
<span class="hljs-built_in">console</span>.log(hw.next());</code></pre>
<h2 id="articleHeader7">ES6 系列</h2>
<p>ES6 系列目录地址：<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a></p>
<p>ES6 系列预计写二十篇左右，旨在加深 ES6 部分知识点的理解，重点讲解块级作用域、标签模板、箭头函数、Symbol、Set、Map 以及 Promise 的模拟实现、模块加载方案、异步处理等内容。</p>
<p>如果有错误或者不严谨的地方，请务必给予指正，十分感谢。如果喜欢或者有所启发，欢迎 star，对作者也是一种鼓励。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6 系列之 Babel 将 Generator 编译成了什么样子

## 原文链接
[https://segmentfault.com/a/1190000016855707](https://segmentfault.com/a/1190000016855707)

