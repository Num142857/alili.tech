---
title: '《javascript高级程序设计》笔记：变量对象与预解析' 
date: 2018-12-25 2:30:10
hidden: true
slug: 2otmqr4iqgw
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://segmentfault.com/a/1190000012118115">上一篇：《javascript高级程序设计》笔记：内存与执行环境</a><br><span class="img-wrap"><img data-src="/img/bVY4xr?w=1146&amp;h=374" src="https://static.alili.tech/img/bVY4xr?w=1146&amp;h=374" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>上篇文章中说到：<br>（1）当执行流进入函数时，对应的执行环境就会生成<br>（2）执行环境创建时会生成变量对象，确定作用域链，确定this指向<br>（2）每个执行环境都有一个与之关联的变量对象，环境中定义的所有变量和函数都保存在这个对象中</p>
<h2 id="articleHeader0">1. 变量对象</h2>
<p>变量对象是在进入执行环境就确定下来的，顾名思义，变量对象是用于存储在这个执行环境中的所有变量和函数的一个对象。只是这个对象是用于解析器处理数据时使用，我们无法直接调用</p>
<p>下图描述了执行流在执行环境中的执行过程（执行环境的生命周期）</p>
<p><span class="img-wrap"><img data-src="/img/bVY4xw?w=1764&amp;h=390" src="https://static.alili.tech/img/bVY4xw?w=1764&amp;h=390" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>（1）建立arguments对象。检查当前上下文中的参数，建立该对象下的属性与属性值。</p>
<p>（2）检查当前上下文的函数声明，也就是使用function关键字声明的函数。在变量对象中以函数名建立一个属性，属性值为指向该函数所在内存地址的引用。<strong>如果函数名的属性已经存在，那么该属性将会被新的引用所覆盖。</strong></p>
<p>（3）检查当前上下文中的变量声明，每找到一个变量声明，就在变量对象中以变量名建立一个属性，属性值为undefined。<strong>如果该变量名的属性已经存在，为了防止同名的函数被修改为undefined，则会直接跳过，原属性值不会被修改。</strong></p>
<p>总之：<code>function声明会比var声明优先级更高一点</code></p>
<p>下面通过具体的例子来看变量对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function test() {
  console.log(a);
  console.log(foo());

  var a = 1;
  function foo() {
    return 2;
  }
}

test();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(a);
  <span class="hljs-built_in">console</span>.log(foo());

  <span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-number">2</span>;
  }
}

test();</code></pre>
<p>当执行到test()时会生成执行环境testEC，具体形式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建过程
testEC = {
  // 变量对象（variable object）
  VO: {},
  // 作用域链
  scopeChain: [],
  // this指向
  this: {}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 创建过程</span>
testEC = {
  <span class="hljs-comment">// 变量对象（variable object）</span>
  VO: {},
  <span class="hljs-comment">// 作用域链</span>
  scopeChain: [],
  <span class="hljs-comment">// this指向</span>
  <span class="hljs-keyword">this</span>: {}
}</code></pre>
<p>仅针对变量对象来具体展开：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="VO = {
  // 传参对象
  arguments: {},
  // 在testEC中定义的function
  foo: &quot;<foo reference>&quot;,
  // 在testEC中定义的var
  a: undefined
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">VO = {
  <span class="hljs-comment">// 传参对象</span>
  <span class="hljs-built_in">arguments</span>: {},
  <span class="hljs-comment">// 在testEC中定义的function</span>
  foo: <span class="hljs-string">"&lt;foo reference&gt;"</span>,
  <span class="hljs-comment">// 在testEC中定义的var</span>
  a: <span class="hljs-literal">undefined</span>
}</code></pre>
<p><strong>未进入执行阶段之前，变量对象中的属性都不能访问！但是进入执行阶段之后，变量对象转变为了活动对象，里面的属性都能被访问了，然后开始进行执行阶段的操作</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 执行阶段
VO ->  AO   // Active Object
AO = {
  arguments: {...},
  foo: function(){return 2},
  a: 1
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 执行阶段</span>
VO -&gt;  AO   <span class="hljs-comment">// Active Object</span>
AO = {
  <span class="hljs-attr">arguments</span>: {...},
  <span class="hljs-attr">foo</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-keyword">return</span> <span class="hljs-number">2</span>},
  <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>
}</code></pre>
<p>最后我们将变量对象创建时的VO和执行阶段的AO整合到一起就可以得到整个执行环境中代码的执行顺序：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function test() {
  function foo() {
    return 2;
  }
  var a;
  console.log(a);// undefined
  console.log(foo());// 2
  a = 1;
}

test();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-number">2</span>;
  }
  <span class="hljs-keyword">var</span> a;
  <span class="hljs-built_in">console</span>.log(a);<span class="hljs-comment">// undefined</span>
  <span class="hljs-built_in">console</span>.log(foo());<span class="hljs-comment">// 2</span>
  a = <span class="hljs-number">1</span>;
}

test();</code></pre>
<p>这个就是分步变量对象的创建和执行阶段来解读<code>预解析</code></p>
<h2 id="articleHeader1">2. 预解析</h2>
<p>预解析分为变量提升和函数提升<br><strong>变量提升</strong>：提升的是当前变量的声明，赋值还保留在原来的位置<br><strong>函数提升</strong>：函数声明，可以认为是把整个函数体声明了<br>函数表达式方式定义函数相当于变量声明 var fn = function(){}</p>
<p>一个简单的变量提升的例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="!function(){
  console.log(a);
  var a = 1;
}()

// 实际执行顺序
!function(){
  var a;
  console.log(a);
  a = 1;
}()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">!<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(a);
  <span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
}()

<span class="hljs-comment">// 实际执行顺序</span>
!<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span> a;
  <span class="hljs-built_in">console</span>.log(a);
  a = <span class="hljs-number">1</span>;
}()</code></pre>
<p>技巧：<br>将执行过程手动拆分成两个步骤<br>1.创建阶段：也称作编译阶段，主要是变量的声明和函数的定义（找var和function）<br>2.执行阶段：变量赋值和函数执行</p>
<p>这样看预解析还是比较容易的，但是涉及到命名冲突时，又是怎样的情况呢？</p>
<p>（1）一个函数和一个变量出现同名<br>情况一：变量只声明了，但没有赋值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="!function(){
  var f;
  function f() {};
  console.log(f); // f(){}
}()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">!<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span> f;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{};
  <span class="hljs-built_in">console</span>.log(f); <span class="hljs-comment">// f(){}</span>
}()</code></pre>
<p>情况二：变量只声明且赋值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="!function(){
  console.log(f); // f(){}
  var f = 123;
  function f() {};
  console.log(f); // 123
}()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">!<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(f); <span class="hljs-comment">// f(){}</span>
  <span class="hljs-keyword">var</span> f = <span class="hljs-number">123</span>;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{};
  <span class="hljs-built_in">console</span>.log(f); <span class="hljs-comment">// 123</span>
}()</code></pre>
<p><strong>结论</strong>：<br>1.一个函数和一个变量出现同名，如果是变量只声明了，但没有赋值，变量名会被忽略<br>2.一个函数和一个变量出现同名，变量声明且赋值，赋值前值为函数，赋值后为变量的值</p>
<p>（2）两个变量出现同名</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="!function(){
  console.log(f); // undefined
  var f = 123;
  var f = 456;
  console.log(f); // 456
}()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">!<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(f); <span class="hljs-comment">// undefined</span>
  <span class="hljs-keyword">var</span> f = <span class="hljs-number">123</span>;
  <span class="hljs-keyword">var</span> f = <span class="hljs-number">456</span>;
  <span class="hljs-built_in">console</span>.log(f); <span class="hljs-comment">// 456</span>
}()</code></pre>
<p><strong>结论</strong>：<br>两个变量出现同名，重复的var声明无效，会被忽略，只会起到赋值的作用，前面赋值会被后面的覆盖</p>
<p>（3）两个函数出现同名</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="!function(){
  console.log(f); // function f(){return 456};
  function f(){return 123};
  function f(){return 456};
  console.log(f); // function f(){return 456};
}()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">!<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(f); <span class="hljs-comment">// function f(){return 456};</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-keyword">return</span> <span class="hljs-number">123</span>};
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-keyword">return</span> <span class="hljs-number">456</span>};
  <span class="hljs-built_in">console</span>.log(f); <span class="hljs-comment">// function f(){return 456};</span>
}()</code></pre>
<p><strong>结论</strong>：<br>两个函数出现同名，由于javascript中函数没有重载，前面的同名函数会被后面的覆盖</p>
<p>（4）变量名与参数名相同</p>
<p>函数参数的本质是什么？函数参数也是变量，相当于在该函数的执行环境内最顶部声明了实参</p>
<p>情况一：参数为变量，与变量命名冲突</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function (a) {
    console.log(a); // 100
    var a = 10;
    console.log(a); // 10
})(100);
// 相当于
(function (a) {
  var a = 100;
    var a; // 重复声明的var没有意义，忽略
    console.log(a); // 100
    a = 10;
    console.log(a); // 10
})(100);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">a</span>) </span>{
    <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// 100</span>
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">10</span>;
    <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// 10</span>
})(<span class="hljs-number">100</span>);
<span class="hljs-comment">// 相当于</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">a</span>) </span>{
  <span class="hljs-keyword">var</span> a = <span class="hljs-number">100</span>;
    <span class="hljs-keyword">var</span> a; <span class="hljs-comment">// 重复声明的var没有意义，忽略</span>
    <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// 100</span>
    a = <span class="hljs-number">10</span>;
    <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// 10</span>
})(<span class="hljs-number">100</span>);</code></pre>
<p>情况二：参数为函数，与变量命名冲突</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function (a) {
    console.log(a); // function(){return 2}
    var a = 10;
    console.log(a); // 10
})(function(){return 2});
// 相当于
(function (a) {
  var a = function(){return 2};
    var a; // 重复声明的var没有意义，忽略
    console.log(a); // function(){return 2}
    a = 10;
    console.log(a); // 10
})(function(){return 2});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">a</span>) </span>{
    <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// function(){return 2}</span>
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">10</span>;
    <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// 10</span>
})(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-keyword">return</span> <span class="hljs-number">2</span>});
<span class="hljs-comment">// 相当于</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">a</span>) </span>{
  <span class="hljs-keyword">var</span> a = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-keyword">return</span> <span class="hljs-number">2</span>};
    <span class="hljs-keyword">var</span> a; <span class="hljs-comment">// 重复声明的var没有意义，忽略</span>
    <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// function(){return 2}</span>
    a = <span class="hljs-number">10</span>;
    <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// 10</span>
})(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-keyword">return</span> <span class="hljs-number">2</span>});</code></pre>
<p>情况三：参数为空，与变量命名冲突</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function (a) {
    console.log(a); // undefined
    var a = 10;
    console.log(a); // 10
})();
// 相当于
(function (a) {
  var a;
    console.log(a); // undefined
    a = 10;
    console.log(a); // 10
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">a</span>) </span>{
    <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// undefined</span>
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">10</span>;
    <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// 10</span>
})();
<span class="hljs-comment">// 相当于</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">a</span>) </span>{
  <span class="hljs-keyword">var</span> a;
    <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// undefined</span>
    a = <span class="hljs-number">10</span>;
    <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// 10</span>
})();</code></pre>
<p><strong>结论</strong>：<br>1.重名的是一个变量，传入了参数（变量或函数）：<br>  如果是在变量赋值之前，此时获取的是：参数的值！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="如果是在变量赋值之后，此时获取的是：变量的值！" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">如果是在变量赋值之后，此时获取的是：变量的值！</code></pre>
<p>2.重名的是一个变量，但是没有传入参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="如果是在变量赋值之前，此时获取的是：undefined！
如果是在变量赋值之后，此时获取的是：变量的值！
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>如果是在变量赋值之前，此时获取的是：<span class="hljs-literal">undefined</span>！
如果是在变量赋值之后，此时获取的是：变量的值！
</code></pre>
<p>（5）函数名与参数名相同</p>
<p>情况一：参数为变量，与函数命名冲突</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function (a) {
    console.log(a); // a(){}
    function a(){};
    console.log(a); // a(){}
})(100);
// 相当于
(function (a) {
  var a = 100;
  function a(){};
    console.log(a); // a(){}
    console.log(a); // a(){}
})(100);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">a</span>) </span>{
    <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// a(){}</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>)</span>{};
    <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// a(){}</span>
})(<span class="hljs-number">100</span>);
<span class="hljs-comment">// 相当于</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">a</span>) </span>{
  <span class="hljs-keyword">var</span> a = <span class="hljs-number">100</span>;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>)</span>{};
    <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// a(){}</span>
    <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// a(){}</span>
})(<span class="hljs-number">100</span>);</code></pre>
<p>情况二：参数为函数，与函数命名冲突</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function (a) {
    console.log(a); // function a(){return 1}
    function a(){return 1}
    console.log(a); // function a(){return 1}
})(function(){return 2});
// 相当于
(function (a) {
  var a = function(){return 2};
  function a(){return 1};
    console.log(a); // function a(){return 1}
    console.log(a); // function a(){return 1}
})(function(){return 2});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">a</span>) </span>{
    <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// function a(){return 1}</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-keyword">return</span> <span class="hljs-number">1</span>}
    <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// function a(){return 1}</span>
})(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-keyword">return</span> <span class="hljs-number">2</span>});
<span class="hljs-comment">// 相当于</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">a</span>) </span>{
  <span class="hljs-keyword">var</span> a = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-keyword">return</span> <span class="hljs-number">2</span>};
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-keyword">return</span> <span class="hljs-number">1</span>};
    <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// function a(){return 1}</span>
    <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// function a(){return 1}</span>
})(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-keyword">return</span> <span class="hljs-number">2</span>});</code></pre>
<p>情况三：参数为空，与函数命名冲突</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function (a) {
    console.log(a); // function a(){};
    function a(){};
    console.log(a); // function a(){};
})();
// 相当于
(function (a) {
  var a;
  function a(){};
    console.log(a); // function a(){};
    console.log(a); // function a(){};
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">a</span>) </span>{
    <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// function a(){};</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>)</span>{};
    <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// function a(){};</span>
})();
<span class="hljs-comment">// 相当于</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">a</span>) </span>{
  <span class="hljs-keyword">var</span> a;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>)</span>{};
    <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// function a(){};</span>
    <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// function a(){};</span>
})();</code></pre>
<p><strong>注意：</strong>函数表达式声明方式<code>var f = function(){}</code>，在预解析中与普通的变量声明无异，因为预解析阶段主要是通过<code>var</code>和<code>function</code>来区分函数与变量的</p>
<p><strong>结论</strong>：<br>传参为函数时，赋值前均为参数的值，赋值后为函数的值，传空时均为函数的值</p>
<p>现在，我们回到变量对象中，在变量对象的创建阶段（执行流编译阶段），分别确定了arguments对象、函数声明和变量声明，其优先级也是<code>arguments&gt;function&gt;var</code>，arguments就是参数，反推上面变量提升的结论，同样是成立的</p>
<p><a href="https://segmentfault.com/a/1190000011880268" target="_blank">经典推荐：《javascript高级程序设计》笔记：原型图解</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
《javascript高级程序设计》笔记：变量对象与预解析

## 原文链接
[https://segmentfault.com/a/1190000012133116](https://segmentfault.com/a/1190000012133116)

