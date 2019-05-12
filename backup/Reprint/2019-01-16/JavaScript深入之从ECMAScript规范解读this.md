---
title: 'JavaScript深入之从ECMAScript规范解读this' 
date: 2019-01-16 2:30:08
hidden: true
slug: ptqkugdqox9
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>JavaScript深入系列第六篇，本篇我们追根溯源，从 ECMAScript5 规范解读 this 在函数调用时到底是如何确定的。</p></blockquote>
<h2 id="articleHeader0">前言</h2>
<p>在<a href="https://github.com/mqyqingfeng/Blog/issues/4" rel="nofollow noreferrer" target="_blank">《JavaScript深入之执行上下文栈》</a>中讲到，当JavaScript代码执行一段可执行代码(executable code)时，会创建对应的执行上下文(execution context)。</p>
<p>对于每个执行上下文，都有三个重要属性</p>
<ul>
<li><p>变量对象(Variable object，VO)</p></li>
<li><p>作用域链(Scope chain)</p></li>
<li><p>this</p></li>
</ul>
<p>今天重点讲讲 this，然而不好讲。</p>
<p>……</p>
<p>因为我们要从 ECMASciript5 规范开始讲起。</p>
<p>先奉上 ECMAScript 5.1 规范地址：</p>
<p>英文版：<a href="http://es5.github.io/#x15.1" rel="nofollow noreferrer" target="_blank">http://es5.github.io/#x15.1</a></p>
<p>中文版：<a href="http://yanhaijing.com/es5/#115" rel="nofollow noreferrer" target="_blank">http://yanhaijing.com/es5/#115</a></p>
<p>让我们开始了解规范吧！</p>
<h2 id="articleHeader1">Types</h2>
<p>首先是第 8 章 Types：</p>
<blockquote>
<p>Types are further subclassified into ECMAScript language types and specification types.</p>
<p>An ECMAScript language type corresponds to values that are directly manipulated by an ECMAScript programmer using the ECMAScript language. The ECMAScript language types are Undefined, Null, Boolean, String, Number, and Object.</p>
<p>A specification type corresponds to meta-values that are used within algorithms to describe the semantics of ECMAScript language constructs and ECMAScript language types. The specification types are Reference, List, Completion, Property Descriptor, Property Identifier, Lexical Environment, and Environment Record.</p>
</blockquote>
<p>我们简单的翻译一下：</p>
<p>ECMAScript 的类型分为语言类型和规范类型。</p>
<p>ECMAScript 语言类型是开发者直接使用 ECMAScript 可以操作的。其实就是我们常说的Undefined, Null, Boolean, String, Number, 和 Object。</p>
<p>而规范类型相当于 meta-values，是用来用算法描述 ECMAScript 语言结构和 ECMAScript 语言类型的。规范类型包括：Reference, List, Completion, Property Descriptor, Property Identifier, Lexical Environment, 和 Environment Record。</p>
<p>没懂？没关系，我们只要知道在 ECMAScript 规范中还有一种只存在于规范中的类型，它们的作用是用来描述语言底层行为逻辑。</p>
<p>今天我们要讲的重点是便是其中的 Reference 类型。它与 this 的指向有着密切的关联。</p>
<h2 id="articleHeader2">Reference</h2>
<p>那什么又是 Reference ？</p>
<p>让我们看 8.7 章 The Reference Specification Type：</p>
<blockquote><p>The Reference type is used to explain the behaviour of such operators as delete, typeof, and the assignment operators.</p></blockquote>
<p>所以 Reference 类型就是用来解释诸如 delete、typeof 以及赋值等操作行为的。</p>
<p>抄袭尤雨溪大大的话，就是：</p>
<blockquote><p>这里的 Reference 是一个 Specification Type，也就是 “只存在于规范里的抽象类型”。它们是为了更好地描述语言的底层行为逻辑才存在的，但并不存在于实际的 js 代码中。</p></blockquote>
<p>再看接下来的这段具体介绍 Reference 的内容：</p>
<blockquote>
<p>A Reference is a resolved name binding. </p>
<p>A Reference consists of three components, the base value, the referenced name and the Boolean valued strict reference flag. </p>
<p>The base value is either undefined, an Object, a Boolean, a String, a Number, or an environment record (10.2.1). </p>
<p>A base value of undefined indicates that the reference could not be resolved to a binding. The referenced name is a String.</p>
</blockquote>
<p>这段讲述了 Reference 的构成，由三个组成部分，分别是：</p>
<ul>
<li><p>base value</p></li>
<li><p>referenced name</p></li>
<li><p>strict reference</p></li>
</ul>
<p>可是这些到底是什么呢？</p>
<p>我们简单的理解的话：</p>
<p>base value 就是属性所在的对象或者就是 EnvironmentRecord，它的值只可能是 undefined, an Object, a Boolean, a String, a Number, or an environment record 其中的一种。</p>
<p>referenced name 就是属性的名称。</p>
<p>举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = 1;

// 对应的Reference是：
var fooReference = {
    base: EnvironmentRecord,
    name: 'foo',
    strict: false
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> foo = <span class="hljs-number">1</span>;

<span class="hljs-comment">// 对应的Reference是：</span>
<span class="hljs-keyword">var</span> fooReference = {
    <span class="hljs-attr">base</span>: EnvironmentRecord,
    <span class="hljs-attr">name</span>: <span class="hljs-string">'foo'</span>,
    <span class="hljs-attr">strict</span>: <span class="hljs-literal">false</span>
};</code></pre>
<p>再举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = {
    bar: function () {
        return this;
    }
};
 
foo.bar(); // foo

// bar对应的Reference是：
var BarReference = {
    base: foo,
    propertyName: 'bar',
    strict: false
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> foo = {
    <span class="hljs-attr">bar</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
    }
};
 
foo.bar(); <span class="hljs-comment">// foo</span>

<span class="hljs-comment">// bar对应的Reference是：</span>
<span class="hljs-keyword">var</span> BarReference = {
    <span class="hljs-attr">base</span>: foo,
    <span class="hljs-attr">propertyName</span>: <span class="hljs-string">'bar'</span>,
    <span class="hljs-attr">strict</span>: <span class="hljs-literal">false</span>
};</code></pre>
<p>而且规范中还提供了获取 Reference 组成部分的方法，比如 GetBase 和 IsPropertyReference。</p>
<p>这两个方法很简单，简单看一看：</p>
<p>1.GetBase</p>
<blockquote><p>GetBase(V). Returns the base value component of the reference V.</p></blockquote>
<p>返回 reference 的 base value。</p>
<p>2.IsPropertyReference</p>
<blockquote><p>IsPropertyReference(V). Returns true if either the base value is an object or HasPrimitiveBase(V) is true; otherwise returns false.</p></blockquote>
<p>简单的理解：如果 base value 是一个对象，就返回true。</p>
<h2 id="articleHeader3">GetValue</h2>
<p>除此之外，紧接着在 8.7.1 章规范中就讲了一个用于从 Reference 类型获取对应值的方法： GetValue。</p>
<p>简单模拟 GetValue 的使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = 1;

var fooReference = {
    base: EnvironmentRecord,
    name: 'foo',
    strict: false
};

GetValue(fooReference) // 1;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> foo = <span class="hljs-number">1</span>;

<span class="hljs-keyword">var</span> fooReference = {
    <span class="hljs-attr">base</span>: EnvironmentRecord,
    <span class="hljs-attr">name</span>: <span class="hljs-string">'foo'</span>,
    <span class="hljs-attr">strict</span>: <span class="hljs-literal">false</span>
};

GetValue(fooReference) <span class="hljs-comment">// 1;</span></code></pre>
<p>GetValue 返回对象属性真正的值，但是要注意：</p>
<p><strong>调用 GetValue，返回的将是具体的值，而不再是一个 Reference</strong></p>
<p>这个很重要，这个很重要，这个很重要。</p>
<h2 id="articleHeader4">如何确定this的值</h2>
<p>关于 Reference 讲了那么多，为什么要讲 Reference 呢？到底 Reference 跟本文的主题 this 有哪些关联呢？如果你能耐心看完之前的内容，以下开始进入高能阶段：</p>
<p>看规范 11.2.3 Function Calls：</p>
<p>这里讲了当函数调用的时候，如何确定 this 的取值。</p>
<p>只看第一步、第六步、第七步：</p>
<blockquote>
<p>1.Let <em>ref</em> be the result of evaluating MemberExpression.</p>
<p>6.If Type(<em>ref</em>) is Reference, then</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  a.If IsPropertyReference(ref) is true, then

      i.Let thisValue be GetBase(ref).

  b.Else, the base of ref is an Environment Record

      i.Let thisValue be the result of calling the ImplicitThisValue concrete method of GetBase(ref)." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code>  a.If IsPropertyReference(ref) <span class="hljs-keyword">is</span> <span class="hljs-keyword">true</span>, <span class="hljs-keyword">then</span>

      i.Let thisValue be GetBase(ref).

  b.Else, the base <span class="hljs-keyword">of</span> ref <span class="hljs-keyword">is</span> an Environment <span class="hljs-keyword">Record</span>

      i.Let thisValue be the <span class="hljs-keyword">result</span> <span class="hljs-keyword">of</span> calling the ImplicitThisValue concrete <span class="hljs-function"><span class="hljs-keyword">method</span> <span class="hljs-title">of</span> <span class="hljs-title">GetBase</span><span class="hljs-params">(ref)</span>.</span></code></pre>
<p>7.Else, Type(<em>ref</em>) is not Reference.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  a. Let thisValue be undefined." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">  <span class="hljs-selector-tag">a</span>. Let thisValue be undefined.</code></pre>
</blockquote>
<p>让我们描述一下：</p>
<p>1.计算 MemberExpression 的结果赋值给 ref</p>
<p>2.判断 ref 是不是一个 Reference 类型</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2.1 如果 ref 是 Reference，并且 IsPropertyReference(ref) 是 true, 那么 this 的值为 GetBase(ref)

2.2 如果 ref 是 Reference，并且 base value 值是 Environment Record, 那么this的值为 ImplicitThisValue(ref)

2.3 如果 ref 不是 Reference，那么 this 的值为 undefined
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-number">2.1</span> 如果 <span class="hljs-keyword">ref</span> 是 Reference，并且 IsPropertyReference(<span class="hljs-keyword">ref</span>) 是 <span class="hljs-literal">true</span>, 那么 <span class="hljs-keyword">this</span> 的值为 GetBase(<span class="hljs-keyword">ref</span>)

<span class="hljs-number">2.2</span> 如果 <span class="hljs-keyword">ref</span> 是 Reference，并且 <span class="hljs-keyword">base</span> <span class="hljs-keyword">value</span> 值是 Environment Record, 那么<span class="hljs-keyword">this</span>的值为 ImplicitThisValue(<span class="hljs-keyword">ref</span>)

<span class="hljs-number">2.3</span> 如果 <span class="hljs-keyword">ref</span> 不是 Reference，那么 <span class="hljs-keyword">this</span> 的值为 undefined
</code></pre>
<h2 id="articleHeader5">具体分析</h2>
<p>让我们一步一步看：</p>
<ol><li><p>计算 MemberExpression 的结果赋值给 ref</p></li></ol>
<p>什么是 MemberExpression？看规范 11.2 Left-Hand-Side Expressions：</p>
<p>MemberExpression :</p>
<ul>
<li><p>PrimaryExpression // 原始表达式 可以参见《JavaScript权威指南第四章》</p></li>
<li><p>FunctionExpression    // 函数定义表达式</p></li>
<li><p>MemberExpression [ Expression ] // 属性访问表达式</p></li>
<li><p>MemberExpression . IdentifierName // 属性访问表达式</p></li>
<li><p>new MemberExpression Arguments    // 对象创建表达式</p></li>
</ul>
<p>举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
    console.log(this)
}

foo(); // MemberExpression 是 foo

function foo() {
    return function() {
        console.log(this)
    }
}

foo()(); // MemberExpression 是 foo()

var foo = {
    bar: function () {
        return this;
    }
}

foo.bar(); // MemberExpression 是 foo.bar
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>)
}

foo(); <span class="hljs-comment">// MemberExpression 是 foo</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>)
    }
}

foo()(); <span class="hljs-comment">// MemberExpression 是 foo()</span>

<span class="hljs-keyword">var</span> foo = {
    <span class="hljs-attr">bar</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
    }
}

foo.bar(); <span class="hljs-comment">// MemberExpression 是 foo.bar</span>
</code></pre>
<p>所以简单理解 MemberExpression 其实就是()左边的部分。</p>
<p>2.判断 ref 是不是一个 Reference 类型。</p>
<p>关键就在于看规范是如何处理各种 MemberExpression，返回的结果是不是一个Reference类型。</p>
<p>举最后一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var value = 1;

var foo = {
  value: 2,
  bar: function () {
    return this.value;
  }
}

//示例1
console.log(foo.bar());
//示例2
console.log((foo.bar)());
//示例3
console.log((foo.bar = foo.bar)());
//示例4
console.log((false || foo.bar)());
//示例5
console.log((foo.bar, foo.bar)());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> value = <span class="hljs-number">1</span>;

<span class="hljs-keyword">var</span> foo = {
  <span class="hljs-attr">value</span>: <span class="hljs-number">2</span>,
  <span class="hljs-attr">bar</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.value;
  }
}

<span class="hljs-comment">//示例1</span>
<span class="hljs-built_in">console</span>.log(foo.bar());
<span class="hljs-comment">//示例2</span>
<span class="hljs-built_in">console</span>.log((foo.bar)());
<span class="hljs-comment">//示例3</span>
<span class="hljs-built_in">console</span>.log((foo.bar = foo.bar)());
<span class="hljs-comment">//示例4</span>
<span class="hljs-built_in">console</span>.log((<span class="hljs-literal">false</span> || foo.bar)());
<span class="hljs-comment">//示例5</span>
<span class="hljs-built_in">console</span>.log((foo.bar, foo.bar)());</code></pre>
<h3 id="articleHeader6">foo.bar()</h3>
<p>在示例 1 中，MemberExpression 计算的结果是 foo.bar，那么 foo.bar 是不是一个 Reference 呢？</p>
<p>查看规范 11.2.1 Property Accessors，这里展示了一个计算的过程，什么都不管了，就看最后一步：</p>
<blockquote><p>Return a value of type Reference whose base value is baseValue and whose referenced name is propertyNameString, and whose strict mode flag is strict.</p></blockquote>
<p>我们得知该表达式返回了一个 Reference 类型！</p>
<p>根据之前的内容，我们知道该值为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Reference = {
  base: foo,
  name: 'bar',
  strict: false
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> Reference = {
  <span class="hljs-attr">base</span>: foo,
  <span class="hljs-attr">name</span>: <span class="hljs-string">'bar'</span>,
  <span class="hljs-attr">strict</span>: <span class="hljs-literal">false</span>
};</code></pre>
<p>接下来按照 2.1 的判断流程走：</p>
<blockquote><p>2.1 如果 ref 是 Reference，并且 IsPropertyReference(ref) 是 true, 那么 this 的值为 GetBase(ref)</p></blockquote>
<p>该值是 Reference 类型，那么 IsPropertyReference(ref) 的结果是多少呢？</p>
<p>前面我们已经铺垫了 IsPropertyReference 方法，如果 base value 是一个对象，结果返回 true。</p>
<p>base value 为 foo，是一个对象，所以 IsPropertyReference(ref) 结果为 true。</p>
<p>这个时候我们就可以确定 this 的值了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this = GetBase(ref)，" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span> = GetBase(ref)，</code></pre>
<p>GetBase 也已经铺垫了，获得 base value 值，这个例子中就是foo，所以 this 的值就是 foo ，示例1的结果就是 2！</p>
<p>唉呀妈呀，为了证明 this 指向foo，真是累死我了！但是知道了原理，剩下的就更快了。</p>
<h3 id="articleHeader7">(foo.bar)()</h3>
<p>看示例2：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log((foo.bar)());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log((foo.bar)());</code></pre>
<p>foo.bar 被 () 包住，查看规范 11.1.6 The Grouping Operator </p>
<p>直接看结果部分：</p>
<blockquote>
<p>Return the result of evaluating Expression. This may be of type Reference.</p>
<p>NOTE This algorithm does not apply GetValue to the result of evaluating Expression.</p>
</blockquote>
<p>实际上 () 并没有对 MemberExpression 进行计算，所以其实跟示例 1 的结果是一样的。</p>
<h3 id="articleHeader8">(foo.bar = foo.bar)()</h3>
<p>看示例3，有赋值操作符，查看规范 11.13.1 Simple Assignment ( = ): </p>
<p>计算的第三步：</p>
<blockquote><p>3.Let rval be GetValue(rref).</p></blockquote>
<p>因为使用了 GetValue，所以返回的值不是 Reference 类型，</p>
<p>按照之前讲的判断逻辑：</p>
<blockquote><p>2.3 如果 ref 不是Reference，那么 this 的值为 undefined</p></blockquote>
<p>this 为 undefined，非严格模式下，this 的值为 undefined 的时候，其值会被隐式转换为全局对象。</p>
<h3 id="articleHeader9">(false || foo.bar)()</h3>
<p>看示例4，逻辑与算法，查看规范 11.11 Binary Logical Operators：</p>
<p>计算第二步：</p>
<blockquote><p>2.Let lval be GetValue(lref).</p></blockquote>
<p>因为使用了 GetValue，所以返回的不是 Reference 类型，this 为 undefined</p>
<h3 id="articleHeader10">(foo.bar, foo.bar)()</h3>
<p>看示例5，逗号操作符，查看规范11.14 Comma Operator ( , )</p>
<p>计算第二步：</p>
<blockquote><p>2.Call GetValue(lref).</p></blockquote>
<p>因为使用了 GetValue，所以返回的不是 Reference 类型，this 为 undefined</p>
<h3 id="articleHeader11">揭晓结果</h3>
<p>所以最后一个例子的结果是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var value = 1;

var foo = {
  value: 2,
  bar: function () {
    return this.value;
  }
}

//示例1
console.log(foo.bar()); // 2
//示例2
console.log((foo.bar)()); // 2
//示例3
console.log((foo.bar = foo.bar)()); // 1
//示例4
console.log((false || foo.bar)()); // 1
//示例5
console.log((foo.bar, foo.bar)()); // 1
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-keyword">var</span> value = <span class="hljs-number">1</span>;

<span class="hljs-keyword">var</span> foo = {
  <span class="hljs-attr">value</span>: <span class="hljs-number">2</span>,
  <span class="hljs-attr">bar</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.value;
  }
}

<span class="hljs-comment">//示例1</span>
<span class="hljs-built_in">console</span>.log(foo.bar()); <span class="hljs-comment">// 2</span>
<span class="hljs-comment">//示例2</span>
<span class="hljs-built_in">console</span>.log((foo.bar)()); <span class="hljs-comment">// 2</span>
<span class="hljs-comment">//示例3</span>
<span class="hljs-built_in">console</span>.log((foo.bar = foo.bar)()); <span class="hljs-comment">// 1</span>
<span class="hljs-comment">//示例4</span>
<span class="hljs-built_in">console</span>.log((<span class="hljs-literal">false</span> || foo.bar)()); <span class="hljs-comment">// 1</span>
<span class="hljs-comment">//示例5</span>
<span class="hljs-built_in">console</span>.log((foo.bar, foo.bar)()); <span class="hljs-comment">// 1</span>
</code></pre>
<p>注意：以上是在非严格模式下的结果，严格模式下因为 this 返回 undefined，所以示例 3 会报错。</p>
<h3 id="articleHeader12">补充</h3>
<p>最最后，忘记了一个最最普通的情况：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
    console.log(this)
}

foo(); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>)
}

foo(); </code></pre>
<p>MemberExpression 是 foo，解析标识符，查看规范 10.3.1 Identifier Resolution，会返回一个 Reference 类型的值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fooReference = {
    base: EnvironmentRecord,
    name: 'foo',
    strict: false
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> fooReference = {
    <span class="hljs-attr">base</span>: EnvironmentRecord,
    <span class="hljs-attr">name</span>: <span class="hljs-string">'foo'</span>,
    <span class="hljs-attr">strict</span>: <span class="hljs-literal">false</span>
};</code></pre>
<p>接下来进行判断：</p>
<blockquote><p>2.1 如果 ref 是 Reference，并且 IsPropertyReference(ref) 是 true, 那么 this 的值为 GetBase(ref)</p></blockquote>
<p>因为 base value 是 EnvironmentRecord，并不是一个 Object 类型，还记得前面讲过的 base value 的取值可能吗？ 只可能是 undefined, an Object, a Boolean, a String, a Number, 和 an environment record 中的一种。</p>
<p>IsPropertyReference(ref) 的结果为 false，进入下个判断：</p>
<blockquote><p>2.2 如果 ref 是 Reference，并且 base value 值是 Environment Record, 那么this的值为 ImplicitThisValue(ref)</p></blockquote>
<p>base value 正是 Environment Record，所以会调用 ImplicitThisValue(ref)</p>
<p>查看规范 10.2.1.1.6，ImplicitThisValue 方法的介绍：该函数始终返回 undefined。</p>
<p>所以最后 this 的值就是 undefined。</p>
<h2 id="articleHeader13">多说一句</h2>
<p>尽管我们可以简单的理解 this 为调用函数的对象，如果是这样的话，如何解释下面这个例子呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var value = 1;

var foo = {
  value: 2,
  bar: function () {
    return this.value;
  }
}
console.log((false || foo.bar)()); // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> value = <span class="hljs-number">1</span>;

<span class="hljs-keyword">var</span> foo = {
  <span class="hljs-attr">value</span>: <span class="hljs-number">2</span>,
  <span class="hljs-attr">bar</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.value;
  }
}
<span class="hljs-built_in">console</span>.log((<span class="hljs-literal">false</span> || foo.bar)()); <span class="hljs-comment">// 1</span></code></pre>
<p>此外，又如何确定调用函数的对象是谁呢？在写文章之初，我就面临着这些问题，最后还是放弃从多个情形下给大家讲解 this 指向的思路，而是追根溯源的从 ECMASciript 规范讲解 this 的指向，尽管从这个角度写起来和读起来都比较吃力，但是一旦多读几遍，明白原理，绝对会给你一个全新的视角看待 this 。而你也就能明白，尽管 foo() 和 (foo.bar = foo.bar)() 最后结果都指向了 undefined，但是两者从规范的角度上却有着本质的区别。</p>
<p>此篇讲解执行上下文的 this，即便不是很理解此篇的内容，依然不影响大家了解执行上下文这个主题下其他的内容。所以，依然可以安心的看下一篇文章。</p>
<h2 id="articleHeader14">下一篇文章</h2>
<p><a href="https://github.com/mqyqingfeng/Blog/issues/8" rel="nofollow noreferrer" target="_blank">《JavaScript深入之执行上下文》</a></p>
<h2 id="articleHeader15">深入系列</h2>
<p>JavaScript深入系列目录地址：<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a>。</p>
<p>JavaScript深入系列预计写十五篇左右，旨在帮大家捋顺JavaScript底层知识，重点讲解如原型、作用域、执行上下文、变量对象、this、闭包、按值传递、call、apply、bind、new、继承等难点概念。</p>
<p>如果有错误或者不严谨的地方，请务必给予指正，十分感谢。如果喜欢或者有所启发，欢迎star，对作者也是一种鼓励。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript深入之从ECMAScript规范解读this

## 原文链接
[https://segmentfault.com/a/1190000009048715](https://segmentfault.com/a/1190000009048715)

