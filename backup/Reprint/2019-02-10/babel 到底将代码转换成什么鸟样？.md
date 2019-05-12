---
title: 'babel 到底将代码转换成什么鸟样？' 
date: 2019-02-10 2:30:42
hidden: true
slug: i8dhubhaiw
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>原文链接：<a href="https://github.com/lcxfs1991/blog/issues/9" rel="nofollow noreferrer" target="_blank">https://github.com/lcxfs1991/blog/issues/9</a></p></blockquote>
<h2 id="articleHeader0">前言</h2>
<p>将babel捧作前端一个划时代的工具一定也不为过，它的出现让许多程序员幸福地用上了es6新语法。但你就这么放心地让babel跑在外网？反正我是不放心，我就曾经过被坑过，于是萌生了研究babel代码转换的想法。本文不是分析babel源码，仅仅是看看babel转换的最终产物。</p>
<p>es6在babel中又称为es2015。由于es2015语法众多，本文仅挑选了较为常用的一些语法点，而且主要是分析babel-preset-2015这个插件（react开发的时候，常在webpack中用到这个preset）。</p>
<h2 id="articleHeader1">babel-preset-2015</h2>
<p>打开babel-preset2015插件一看，一共20个插件。熟悉es2015语法的同志一看，多多少少能从字面意思知道某个插件是用于哪种语法的转换</p>
<ul>
<li><p>babel-plugin-transform-es2015-template-literals  =&gt; es2015模板</p></li>
<li><p>babel-plugin-transform-es2015-literals</p></li>
<li><p>babel-plugin-transform-es2015-function-name =&gt; 函数name属性</p></li>
<li><p>babel-plugin-transform-es2015-arrow-functions =&gt; 箭头函数</p></li>
<li><p>babel-plugin-transform-es2015-block-scoped-functions =&gt; 函数块级作用域</p></li>
<li><p>babel-plugin-transform-es2015-classes =&gt; class类</p></li>
<li><p>babel-plugin-transform-es2015-object-super =&gt; super提供了调用prototype的方式</p></li>
<li><p>babel-plugin-transform-es2015-shorthand-properties =&gt; 对象属性的快捷定义，如obj = { x, y }</p></li>
<li><p>babel-plugin-transform-es2015-computed-properties =&gt; 对象中括号属性，如obj = {['x]: 1}</p></li>
<li><p>babel-plugin-transform-es2015-for-of =&gt; 对象for of遍历</p></li>
<li><p>babel-plugin-transform-es2015-sticky-regex</p></li>
<li><p>babel-plugin-transform-es2015-unicode-regex</p></li>
<li><p>babel-plugin-check-es2015-constants =&gt; const常量</p></li>
<li><p>babel-plugin-transform-es2015-spread =&gt; 对象扩展运算符属性，如...foobar</p></li>
<li><p>babel-plugin-transform-es2015-parameters =&gt; 函数参数默认值及扩展运算符</p></li>
<li><p>babel-plugin-transform-es2015-destructuring =&gt; 赋值解构</p></li>
<li><p>babel-plugin-transform-es2015-block-scoping =&gt; let和const块级作用域</p></li>
<li><p>babel-plugin-transform-es2015-typeof-symbol =&gt; symbol特性</p></li>
<li><p>babel-plugin-transform-es2015-modules-commonjs =&gt; commonjs模块加载</p></li>
<li><p>babel-plugin-transform-regenerator =&gt; generator特性</p></li>
</ul>
<h2 id="articleHeader2">var, const and let</h2>
<p>const和let现在一律转换成var。那const到底如何保证不变呢？如果你在源码中第二次修改const常量的值，babel编译会直接报错。<br>转换前</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1;
let b = 2;
const c = 3;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">var a</span> = 1;
<span class="hljs-attribute">let b</span> = 2;
<span class="hljs-attribute">const c</span> = 3;</code></pre>
<p>转换后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1;
var b = 2;
var c = 3;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">var a</span> = 1;
<span class="hljs-attribute">var b</span> = 2;
<span class="hljs-attribute">var c</span> = 3;</code></pre>
<p>那let的块级作用怎么体现呢？来看看下面例子，实质就是在块级作用改变一下变量名，使之与外层不同。<br>转换前：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a1 = 1;
let a2 = 6;

{
    let a1 = 2;
    let a2 = 5;

    {
        let a1 = 4;
        let a2 = 5;
    }
}
a1 = 3;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>let <span class="hljs-built_in">a1</span> = <span class="hljs-number">1</span><span class="hljs-comment">;</span>
let <span class="hljs-built_in">a2</span> = <span class="hljs-number">6</span><span class="hljs-comment">;</span>

{
    let <span class="hljs-built_in">a1</span> = <span class="hljs-number">2</span><span class="hljs-comment">;</span>
    let <span class="hljs-built_in">a2</span> = <span class="hljs-number">5</span><span class="hljs-comment">;</span>

    {
        let <span class="hljs-built_in">a1</span> = <span class="hljs-number">4</span><span class="hljs-comment">;</span>
        let <span class="hljs-built_in">a2</span> = <span class="hljs-number">5</span><span class="hljs-comment">;</span>
    }
}
<span class="hljs-built_in">a1</span> = <span class="hljs-number">3</span><span class="hljs-comment">;</span></code></pre>
<p>转换后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a1 = 1;
var a2 = 6;

{
    var _a = 2;
    var _a2 = 5;

    {
        var _a3 = 4;
        var _a4 = 5;
    }
}
a1 = 3;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>var <span class="hljs-built_in">a1</span> = <span class="hljs-number">1</span><span class="hljs-comment">;</span>
var <span class="hljs-built_in">a2</span> = <span class="hljs-number">6</span><span class="hljs-comment">;</span>

{
    var _a = <span class="hljs-number">2</span><span class="hljs-comment">;</span>
    var _<span class="hljs-built_in">a2</span> = <span class="hljs-number">5</span><span class="hljs-comment">;</span>

    {
        var _<span class="hljs-built_in">a3</span> = <span class="hljs-number">4</span><span class="hljs-comment">;</span>
        var _<span class="hljs-built_in">a4</span> = <span class="hljs-number">5</span><span class="hljs-comment">;</span>
    }
}
<span class="hljs-built_in">a1</span> = <span class="hljs-number">3</span><span class="hljs-comment">;</span></code></pre>
<h2 id="articleHeader3">赋值解构</h2>
<p>写react的时候，我们使用负值解构去取对象的值，用起来非常爽，像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var props = {
    name: &quot;heyli&quot;,
    getName: function() {

    },
    setName: function() {

    }
};

let { name, getName, setName } = this.props;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> props = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">"heyli"</span>,
    <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{

    },
    <span class="hljs-attr">setName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{

    }
};

<span class="hljs-keyword">let</span> { name, getName, setName } = <span class="hljs-keyword">this</span>.props;</code></pre>
<p>我们来看看转换的结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var props = {
    name: &quot;heyli&quot;,
    getName: function getName() {},
    setName: function setName() {}
};

var name = props.name;
var getName = props.getName;
var setName = props.setName;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> props = {
    name: <span class="hljs-string">"heyli"</span>,
    getName: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getName</span><span class="hljs-params">()</span> </span>{},
    setName: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setName</span><span class="hljs-params">()</span> </span>{}
};

<span class="hljs-keyword">var</span> name = props.name;
<span class="hljs-keyword">var</span> getName = props.getName;
<span class="hljs-keyword">var</span> setName = props.setName;</code></pre>
<p>至于数组呢？如果是一个匿名数组，则babel会帮你先定义一个变量存放这个数组，然后再对需要赋值的变量进行赋值。<br>转换前：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var [ a1, a2 ] = [1, 2, 3];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">var [ a1, a2 ] = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];</code></pre>
<p>转换后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _ref = [1, 2, 3];
var a1 = _ref[0];
var a2 = _ref[1];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code><span class="hljs-keyword">var</span> <span class="hljs-number">_</span><span class="hljs-keyword">ref</span> = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
<span class="hljs-keyword">var</span> a1 = <span class="hljs-number">_</span><span class="hljs-keyword">ref</span>[<span class="hljs-number">0</span>];
<span class="hljs-keyword">var</span> a2 = <span class="hljs-number">_</span><span class="hljs-keyword">ref</span>[<span class="hljs-number">1</span>];</code></pre>
<p>看到这个，感觉转换结果跟我们想的还蛮一致。哈哈，使用的噩梦还没开始。</p>
<p>如果使用匿名对象直接进行赋值解构会怎样呢？如下。babel为了使接收的变量唯一，直接就将匿名对象里的属性拼在一起，组成接收这个匿名对象的变量，吓得我赶紧检查一下项目里有没有这种写法。<br>转换前：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var { abc, bcd, cde, def } = { &quot;abc&quot;: &quot;abc&quot;, &quot;bcd&quot;: &quot;bcd&quot;, &quot;cde&quot;: &quot;cde&quot;, &quot;def&quot;: &quot;def&quot;, &quot;efg&quot;: &quot;efg&quot;, &quot;fgh&quot;: &quot;fgh&quot; };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> { abc, bcd, cde, <span class="hljs-function"><span class="hljs-keyword">def</span> } </span>= { <span class="hljs-string">"abc"</span>: <span class="hljs-string">"abc"</span>, <span class="hljs-string">"bcd"</span>: <span class="hljs-string">"bcd"</span>, <span class="hljs-string">"cde"</span>: <span class="hljs-string">"cde"</span>, <span class="hljs-string">"def"</span>: <span class="hljs-string">"def"</span>, <span class="hljs-string">"efg"</span>: <span class="hljs-string">"efg"</span>, <span class="hljs-string">"fgh"</span>: <span class="hljs-string">"fgh"</span> };</code></pre>
<p>转换后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _abc$bcd$cde$def$efg$ = { &quot;abc&quot;: &quot;abc&quot;, &quot;bcd&quot;: &quot;bcd&quot;, &quot;cde&quot;: &quot;cde&quot;, &quot;def&quot;: &quot;def&quot;, &quot;efg&quot;: &quot;efg&quot;, &quot;fgh&quot;: &quot;fgh&quot; };
var abc = _abc$bcd$cde$def$efg$.abc;
var bcd = _abc$bcd$cde$def$efg$.bcd;
var cde = _abc$bcd$cde$def$efg$.cde;
var def = _abc$bcd$cde$def$efg$.def;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>var _abc<span class="hljs-variable">$bcd</span><span class="hljs-variable">$cde</span><span class="hljs-variable">$def</span><span class="hljs-variable">$efg</span><span class="hljs-variable">$ </span>= { <span class="hljs-string">"abc"</span>: <span class="hljs-string">"abc"</span>, <span class="hljs-string">"bcd"</span>: <span class="hljs-string">"bcd"</span>, <span class="hljs-string">"cde"</span>: <span class="hljs-string">"cde"</span>, <span class="hljs-string">"def"</span>: <span class="hljs-string">"def"</span>, <span class="hljs-string">"efg"</span>: <span class="hljs-string">"efg"</span>, <span class="hljs-string">"fgh"</span>: <span class="hljs-string">"fgh"</span> };
var abc = _abc<span class="hljs-variable">$bcd</span><span class="hljs-variable">$cde</span><span class="hljs-variable">$def</span><span class="hljs-variable">$efg</span><span class="hljs-variable">$.</span>abc;
var bcd = _abc<span class="hljs-variable">$bcd</span><span class="hljs-variable">$cde</span><span class="hljs-variable">$def</span><span class="hljs-variable">$efg</span><span class="hljs-variable">$.</span>bcd;
var cde = _abc<span class="hljs-variable">$bcd</span><span class="hljs-variable">$cde</span><span class="hljs-variable">$def</span><span class="hljs-variable">$efg</span><span class="hljs-variable">$.</span>cde;
var <span class="hljs-function"><span class="hljs-keyword">def</span> = <span class="hljs-title">_abc</span></span><span class="hljs-variable">$bcd</span><span class="hljs-variable">$cde</span><span class="hljs-variable">$def</span><span class="hljs-variable">$efg</span><span class="hljs-variable">$.</span><span class="hljs-function"><span class="hljs-keyword">def</span>;</span></code></pre>
<p>还有一种对象深层次的解构赋值：<br>转换前：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    p1: [
        &quot;Hello&quot;,
        { p2: &quot;World&quot; }
      ]
};

var { p1: [s1, { p2 }] } = obj;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">var</span> obj = {
<span class="hljs-symbol">    p1:</span> [
        <span class="hljs-string">"Hello"</span>,
        { <span class="hljs-built_in">p2</span>: <span class="hljs-string">"World"</span> }
      ]
}<span class="hljs-comment">;</span>

<span class="hljs-symbol">var</span> { <span class="hljs-built_in">p1</span>: [<span class="hljs-built_in">s1</span>, { <span class="hljs-built_in">p2</span> }] } = obj<span class="hljs-comment">;</span></code></pre>
<p>转换后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 为解释本人将代码美化了
var _slicedToArray = (function() {
    function sliceIterator(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;
        try {
           // 用Symbol.iterator造了一个可遍历对象，然后进去遍历。
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);
                if (i &amp;&amp; _arr.length === i) break;
            }
        } catch (err) {
            _d = true;
            _e = err;
        } finally {
            try {
                if (!_n &amp;&amp; _i[&quot;return&quot;]) _i[&quot;return&quot;]();
            } finally {
                if (_d) throw _e;
            }
        }
        return _arr;
    }
    return function(arr, i) {
        if (Array.isArray(arr)) {
            return arr;
        } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
        } else {
            throw new TypeError(&quot;Invalid attempt to destructure non-iterable instance&quot;);
        }
    };
})();

var obj = {
   p1: [&quot;Hello&quot;, { p2: &quot;World&quot; }]
};

var _obj$p = _slicedToArray(obj.p1, 2);

var s1 = _obj$p[0];
var p2 = _obj$p[1].p2;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 为解释本人将代码美化了</span>
<span class="hljs-keyword">var</span> _slicedToArray = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sliceIterator</span>(<span class="hljs-params">arr, i</span>) </span>{
        <span class="hljs-keyword">var</span> _arr = [];
        <span class="hljs-keyword">var</span> _n = <span class="hljs-literal">true</span>;
        <span class="hljs-keyword">var</span> _d = <span class="hljs-literal">false</span>;
        <span class="hljs-keyword">var</span> _e = <span class="hljs-literal">undefined</span>;
        <span class="hljs-keyword">try</span> {
           <span class="hljs-comment">// 用Symbol.iterator造了一个可遍历对象，然后进去遍历。</span>
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> _i = arr[<span class="hljs-built_in">Symbol</span>.iterator](), _s; !(_n = (_s = _i.next()).done); _n = <span class="hljs-literal">true</span>) {
                _arr.push(_s.value);
                <span class="hljs-keyword">if</span> (i &amp;&amp; _arr.length === i) <span class="hljs-keyword">break</span>;
            }
        } <span class="hljs-keyword">catch</span> (err) {
            _d = <span class="hljs-literal">true</span>;
            _e = err;
        } <span class="hljs-keyword">finally</span> {
            <span class="hljs-keyword">try</span> {
                <span class="hljs-keyword">if</span> (!_n &amp;&amp; _i[<span class="hljs-string">"return"</span>]) _i[<span class="hljs-string">"return"</span>]();
            } <span class="hljs-keyword">finally</span> {
                <span class="hljs-keyword">if</span> (_d) <span class="hljs-keyword">throw</span> _e;
            }
        }
        <span class="hljs-keyword">return</span> _arr;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">arr, i</span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Array</span>.isArray(arr)) {
            <span class="hljs-keyword">return</span> arr;
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Symbol</span>.iterator <span class="hljs-keyword">in</span> <span class="hljs-built_in">Object</span>(arr)) {
            <span class="hljs-keyword">return</span> sliceIterator(arr, i);
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">"Invalid attempt to destructure non-iterable instance"</span>);
        }
    };
})();

<span class="hljs-keyword">var</span> obj = {
   <span class="hljs-attr">p1</span>: [<span class="hljs-string">"Hello"</span>, { <span class="hljs-attr">p2</span>: <span class="hljs-string">"World"</span> }]
};

<span class="hljs-keyword">var</span> _obj$p = _slicedToArray(obj.p1, <span class="hljs-number">2</span>);

<span class="hljs-keyword">var</span> s1 = _obj$p[<span class="hljs-number">0</span>];
<span class="hljs-keyword">var</span> p2 = _obj$p[<span class="hljs-number">1</span>].p2;</code></pre>
<p>babel在代码顶部生产了一个公共的代码_slicedToArray。大概就是将对象里面的一些属性转换成数组，方便解构赋值的进行。但Symbol.iterator的兼容性并不好（如下图），还是谨慎使用为妙。</p>
<p><span class="img-wrap"><img data-src="/img/bVvCdk" src="https://static.alili.tech/img/bVvCdk" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>另外，下面这种对字符串进行赋值解构也同样使用到_slicedToArray方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const [a, b, c, d, e] = 'hello';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> [a, b, c, d, e] = <span class="hljs-string">'hello'</span>;</code></pre>
<h2 id="articleHeader4">函数参数默认值及扩展运算符</h2>
<p>在es5的年代，一般我们写参数的默认值都会这么写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function func(x, y) {
    var x = x || 1;
    var y = y || 2;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span><span class="hljs-params">(x, y)</span> </span>{
    <span class="hljs-keyword">var</span> x = x || <span class="hljs-number">1</span>;
    <span class="hljs-keyword">var</span> y = y || <span class="hljs-number">2</span>;
}</code></pre>
<p>我们来看看babel的转换办法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function func({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

function func1(x = 1, y = 2) {
    return [x, y];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code><span class="hljs-keyword">function</span> <span class="hljs-title">func</span>({x, y} = { x: 0, y: 0 }) {
  <span class="hljs-keyword">return</span> <span class="hljs-type">[x,</span> y];
}

<span class="hljs-keyword">function</span> <span class="hljs-title">func1</span>(x = 1, y = 2) {
    <span class="hljs-keyword">return</span> <span class="hljs-type">[x,</span> y];
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function func() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? { x: 0, y: 0 } : arguments[0];

  var x = _ref.x;
  var y = _ref.y;

  return [x, y];
}

function func1() {
  var x = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
  var y = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];

  return [x, y];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> _ref = <span class="hljs-built_in">arguments</span>.length &lt;= <span class="hljs-number">0</span> || <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>] === <span class="hljs-literal">undefined</span> ? { <span class="hljs-attr">x</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">0</span> } : <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>];

  <span class="hljs-keyword">var</span> x = _ref.x;
  <span class="hljs-keyword">var</span> y = _ref.y;

  <span class="hljs-keyword">return</span> [x, y];
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func1</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> x = <span class="hljs-built_in">arguments</span>.length &lt;= <span class="hljs-number">0</span> || <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>] === <span class="hljs-literal">undefined</span> ? <span class="hljs-number">1</span> : <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>];
  <span class="hljs-keyword">var</span> y = <span class="hljs-built_in">arguments</span>.length &lt;= <span class="hljs-number">1</span> || <span class="hljs-built_in">arguments</span>[<span class="hljs-number">1</span>] === <span class="hljs-literal">undefined</span> ? <span class="hljs-number">2</span> : <span class="hljs-built_in">arguments</span>[<span class="hljs-number">1</span>];

  <span class="hljs-keyword">return</span> [x, y];
}</code></pre>
<p>babel这里使有了arguments来做判。第一种情况涉及解构赋值，因此x和y的值还是有可能是undefined的。至于第二种情况，则会保证2个参数的默认值分别是1和2.</p>
<p>再来看一种。...y代表它接收了剩下的参数。也就是arguments除了第一个标号的参数之外剩余的参数。</p>
<p>转换前：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function func(x, ...y) {
    console.log(x);
    console.log(y);
    return x * y.length;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span><span class="hljs-params">(x, <span class="hljs-rest_arg">...y</span>)</span> </span>{
    console.log(x);
    console.log(y);
    <span class="hljs-keyword">return</span> x * y.length;
}</code></pre>
<p>转换后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function func(x) {
    console.log(x);

    for (var _len = arguments.length, y = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        y[_key - 1] = arguments[_key];
    }

    console.log(y);
    return x * y.length;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>function func(x) {
    console.<span class="hljs-built_in">log</span>(x);

    <span class="hljs-keyword">for</span> (var <span class="hljs-variable">_len</span> = arguments.length, y = Array(<span class="hljs-variable">_len</span> &gt; <span class="hljs-number">1</span> ? <span class="hljs-variable">_len</span> - <span class="hljs-number">1</span> : <span class="hljs-number">0</span>), <span class="hljs-variable">_key</span> = <span class="hljs-number">1</span>; <span class="hljs-variable">_key</span> &lt; <span class="hljs-variable">_len</span>; <span class="hljs-variable">_key</span>++) {
        y[<span class="hljs-variable">_key</span> - <span class="hljs-number">1</span>] = arguments[<span class="hljs-variable">_key</span>];
    }

    console.<span class="hljs-built_in">log</span>(y);
    return x * y.length;
}</code></pre>
<h2 id="articleHeader5">箭头函数</h2>
<p>剪头函数其实主要是省了写函数的代码，同时能够直接用使外层的this而不用担心context切换的问题。以前我们一般都要在外层多写一个_this/self直向this。babel的转换办法其实跟我们的处理无异。</p>
<p>转换前：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    prop: 1,
    func: function() {
        var _this = this;

        var innerFunc = () => {
            this.prop = 1;
        };

        var innerFunc1 = function() {
            this.prop = 1;
        };
    },

};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">prop</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">func</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;

        <span class="hljs-keyword">var</span> innerFunc = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-keyword">this</span>.prop = <span class="hljs-number">1</span>;
        };

        <span class="hljs-keyword">var</span> innerFunc1 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.prop = <span class="hljs-number">1</span>;
        };
    },

};</code></pre>
<p>转换后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    prop: 1,
    func: function func() {
        var _this2 = this;

        var _this = this;

        var innerFunc = function innerFunc() {
            _this2.prop = 1;
        };

        var innerFunc1 = function innerFunc1() {
            this.prop = 1;
        };
    }

};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> obj = {
    prop: <span class="hljs-number">1</span>,
    func: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span><span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">var</span> _this2 = <span class="hljs-keyword">this</span>;

        <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;

        <span class="hljs-keyword">var</span> innerFunc = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">innerFunc</span><span class="hljs-params">()</span> </span>{
            _this2.prop = <span class="hljs-number">1</span>;
        };

        <span class="hljs-keyword">var</span> innerFunc1 = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">innerFunc1</span><span class="hljs-params">()</span> </span>{
            <span class="hljs-keyword">this</span>.prop = <span class="hljs-number">1</span>;
        };
    }

};</code></pre>
<h2 id="articleHeader6">对象的能力增强</h2>
<h3 id="articleHeader7">对象属性的快捷定义</h3>
<p>转换前：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1,
    b = &quot;2&quot;,
    c = function() {
        console.log('c');
    };

var obj = {a, b, c};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>,
    b = <span class="hljs-string">"2"</span>,
    c = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'c'</span>);
    };

<span class="hljs-keyword">var</span> obj = {a, b, c};</code></pre>
<p>转换后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1,
    b = &quot;2&quot;,
    c = function c() {
    console.log('c');
};

var obj = { a: a, b: b, c: c };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>,
    b = <span class="hljs-string">"2"</span>,
    c = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">c</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'c'</span>);
};

<span class="hljs-keyword">var</span> obj = { <span class="hljs-attr">a</span>: a, <span class="hljs-attr">b</span>: b, <span class="hljs-attr">c</span>: c };</code></pre>
<h3 id="articleHeader8">对象中括号属性</h3>
<p>es2015开始新增了在对象中用中括号解释属性的功能，这对变量、常量等当对象属性尤其有用。</p>
<p>转换前：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const prop2 = &quot;PROP2&quot;;
var obj = {
    ['prop']: 1,
    ['func']: function() {
        console.log('func');
    },
        [prop2]: 3
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> prop2 = <span class="hljs-string">"PROP2"</span>;
<span class="hljs-keyword">var</span> obj = {
    [<span class="hljs-string">'prop'</span>]: <span class="hljs-number">1</span>,
    [<span class="hljs-string">'func'</span>]: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'func'</span>);
    },
        [prop2]: <span class="hljs-number">3</span>
};</code></pre>
<p>转换后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _obj;
// 已美化
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

var prop2 = &quot;PROP2&quot;;
var obj = (_obj = {}, _defineProperty(_obj, 'prop', 1), _defineProperty(_obj, 'func', function func() {
    console.log('func');
}), _defineProperty(_obj, prop2, 3), _obj);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> _obj;
<span class="hljs-comment">// 已美化</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_defineProperty</span>(<span class="hljs-params">obj, key, value</span>) </span>{
    <span class="hljs-keyword">if</span> (key <span class="hljs-keyword">in</span> obj) {
        <span class="hljs-built_in">Object</span>.defineProperty(obj, key, {
            <span class="hljs-attr">value</span>: value,
            <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">writable</span>: <span class="hljs-literal">true</span>
        });
    } <span class="hljs-keyword">else</span> {
        obj[key] = value;
    }
    <span class="hljs-keyword">return</span> obj;
}

<span class="hljs-keyword">var</span> prop2 = <span class="hljs-string">"PROP2"</span>;
<span class="hljs-keyword">var</span> obj = (_obj = {}, _defineProperty(_obj, <span class="hljs-string">'prop'</span>, <span class="hljs-number">1</span>), _defineProperty(_obj, <span class="hljs-string">'func'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'func'</span>);
}), _defineProperty(_obj, prop2, <span class="hljs-number">3</span>), _obj);</code></pre>
<p>看似简单的属性，babel却大动干戈。新增了一个_defineProperty函数，给新建的_obj = {}进行属性定义。除此之外使用小括号包住一系列从左到右的运算使整个定义更简洁。</p>
<h3 id="articleHeader9">使用super去调用prototype</h3>
<p>以前我们一般都用obj.prototype或者尝试用this去往上寻找prototype上面的方法。而babel则自己写了一套在prototype链上寻找方法/属性的算法。</p>
<p>转换前：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    toString() {
     // Super calls
     return &quot;d &quot; + super.toString();
    },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs swift"><code><span class="hljs-keyword">var</span> obj = {
    <span class="hljs-built_in">toString</span>() {
     <span class="hljs-comment">// Super calls</span>
     <span class="hljs-keyword">return</span> <span class="hljs-string">"d "</span> + <span class="hljs-keyword">super</span>.<span class="hljs-built_in">toString</span>();
    },
};</code></pre>
<p>转换后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _obj;
// 已美化
var _get = function get(object, property, receiver) {
   // 如果prototype为空，则往Function的prototype上寻找
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);
    if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);
        // 如果在本层prototype找不到，再往更深层的prototype上找
        if (parent === null) {
            return undefined;
        } else {
            return get(parent, property, receiver);
        }
    }
    // 如果是属性，则直接返回
    else if (&quot;value&quot; in desc) {
        return desc.value;
    }
    // 如果是方法，则用call来调用，receiver是调用的对象 
    else {
        var getter = desc.get;  // getOwnPropertyDescriptor返回的getter方法
        if (getter === undefined) {
            return undefined;
        }
        return getter.call(receiver);
    }
};

var obj = _obj = {
  toString: function toString() {
    // Super calls
    return &quot;d &quot; + _get(Object.getPrototypeOf(_obj), &quot;toString&quot;, this).call(this);
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">var</span> _obj;
<span class="hljs-comment">// 已美化</span>
<span class="hljs-built_in">var</span> _get = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">get</span>(<span class="hljs-params">object, property, receiver</span>) </span>{
   <span class="hljs-comment">// 如果prototype为空，则往Function的prototype上寻找</span>
    <span class="hljs-keyword">if</span> (object === <span class="hljs-literal">null</span>) object = <span class="hljs-built_in">Function</span>.prototype;
    <span class="hljs-built_in">var</span> desc = <span class="hljs-built_in">Object</span>.getOwnPropertyDescriptor(object, <span class="hljs-keyword">property</span><span class="hljs-string">)</span>;
    <span class="hljs-keyword">if</span> (desc === <span class="hljs-literal">undefined</span>) {
        <span class="hljs-built_in">var</span> <span class="hljs-built_in">parent</span> = <span class="hljs-built_in">Object</span>.getPrototypeOf(object);
        <span class="hljs-comment">// 如果在本层prototype找不到，再往更深层的prototype上找</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">parent</span> === <span class="hljs-literal">null</span>) {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">undefined</span>;
        } <span class="hljs-title">else</span> {
            <span class="hljs-keyword">return</span> get(<span class="hljs-built_in">parent</span>, <span class="hljs-keyword">property</span><span class="hljs-string"></span>, receiver);
        }
    }
    <span class="hljs-comment">// 如果是属性，则直接返回</span>
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-string">"value"</span> <span class="hljs-keyword">in</span> desc) {
        <span class="hljs-keyword">return</span> desc.value;
    }
    <span class="hljs-comment">// 如果是方法，则用call来调用，receiver是调用的对象 </span>
    <span class="hljs-title">else</span> {
        <span class="hljs-built_in">var</span> getter = desc.get;  <span class="hljs-comment">// getOwnPropertyDescriptor返回的getter方法</span>
        <span class="hljs-keyword">if</span> (getter === <span class="hljs-literal">undefined</span>) {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">undefined</span>;
        }
        <span class="hljs-keyword">return</span> getter.call(receiver);
    }
};

<span class="hljs-built_in">var</span> obj = _obj = {
  <span class="hljs-attribute">toString</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">toString</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// Super calls</span>
    <span class="hljs-keyword">return</span> <span class="hljs-string">"d "</span> + _get(<span class="hljs-built_in">Object</span>.getPrototypeOf(_obj), <span class="hljs-string">"toString"</span>, <span class="hljs-keyword">this</span>).call(<span class="hljs-keyword">this</span>);
  }
};</code></pre>
<h3 id="articleHeader10">Object.assign 和 Object.is</h3>
<p>es6新增的Object.assign极大方便了对象的克隆复制。但babel的es2015 preset并不支持，所以没对其进入转换，这会使得一些移动端机子遇到这种写法会报错。所以一般开发者都会使用object-assign这个npm的库做兼容。</p>
<p>Object.is用于比较对象的值与类型，es2015 preset同样不支持编译。</p>
<h2 id="articleHeader11">es6模板</h2>
<h3 id="articleHeader12">多行字符串</h3>
<p>转换前：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(`string text line 1
string text line 2`);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>console.log(`<span class="hljs-keyword">string</span> <span class="hljs-built_in">text</span> <span class="hljs-built_in">line</span> <span class="hljs-number">1</span>
<span class="hljs-keyword">string</span> <span class="hljs-built_in">text</span> <span class="hljs-built_in">line</span> <span class="hljs-number">2</span>`);</code></pre>
<p>转换后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(&quot;string text line 1\nstring text line 2&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code style="word-break: break-word; white-space: initial;">console<span class="hljs-selector-class">.log</span>("string text line 1\nstring text line 2");</code></pre>
<h3 id="articleHeader13">字符中变量运算</h3>
<p>转换前：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 5;
var b = 10;
console.log(`Fifteen is ${a + b} and not ${2 * a + b}.`);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">var</span> a = <span class="hljs-number">5</span>;
<span class="hljs-keyword">var</span> b = <span class="hljs-number">10</span>;
console.log(`Fifteen <span class="hljs-keyword">is</span> $<span class="hljs-comment">{a + b}</span> <span class="hljs-keyword">and</span> <span class="hljs-keyword">not</span> $<span class="hljs-comment">{2 * a + b}</span>.`);</code></pre>
<p>转换后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 5;
var b = 10;
console.log(&quot;Fifteen is &quot; + (a + b) + &quot; and not &quot; + (2 * a + b) + &quot;.&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>var a = <span class="hljs-number">5</span><span class="hljs-comment">;</span>
var <span class="hljs-keyword">b </span>= <span class="hljs-number">10</span><span class="hljs-comment">;</span>
console.log(<span class="hljs-string">"Fifteen is "</span> + (a + <span class="hljs-keyword">b) </span>+ <span class="hljs-string">" and not "</span> + (<span class="hljs-number">2</span> * a + <span class="hljs-keyword">b) </span>+ <span class="hljs-string">"."</span>)<span class="hljs-comment">;</span></code></pre>
<h3 id="articleHeader14">标签模板</h3>
<p>es6的这种新特性给模板处理赋予更强大的功能，一改以往对模板进行各种replace的处理办法，用一个统一的handler去处理。babel的转换主要是添加了2个属性，因此看起来也并不算比较工程浩大的编译。</p>
<p>转换前：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 5;
var b = 10;

function tag(strings, ...values) {
  console.log(strings[0]); // &quot;Hello &quot;
  console.log(strings[1]); // &quot; world &quot;
  console.log(values[0]);  // 15
  console.log(values[1]);  // 50

  return &quot;Bazinga!&quot;;
}

tag`Hello ${ a + b } world ${ a * b }`;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> a = <span class="hljs-number">5</span>;
<span class="hljs-keyword">var</span> b = <span class="hljs-number">10</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">tag</span><span class="hljs-params">(strings, <span class="hljs-rest_arg">...values</span>)</span> </span>{
  console.log(strings[<span class="hljs-number">0</span>]); <span class="hljs-comment">// "Hello "</span>
  console.log(strings[<span class="hljs-number">1</span>]); <span class="hljs-comment">// " world "</span>
  console.log(values[<span class="hljs-number">0</span>]);  <span class="hljs-comment">// 15</span>
  console.log(values[<span class="hljs-number">1</span>]);  <span class="hljs-comment">// 50</span>

  <span class="hljs-keyword">return</span> <span class="hljs-string">"Bazinga!"</span>;
}

tag`Hello ${ a + b } world ${ a * b }`;</code></pre>
<p>转换后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _templateObject = _taggedTemplateLiteral([&quot;Hello &quot;, &quot; world &quot;, &quot;&quot;], [&quot;Hello &quot;, &quot; world &quot;, &quot;&quot;]);
// 已美化
function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, {
        raw: {
            value: Object.freeze(raw)
        }
    }));
}
// 给传入的object定义strings和raw两个不可变的属性。

var a = 5;
var b = 10;

function tag(strings) {
  console.log(strings[0]); // &quot;Hello &quot;
  console.log(strings[1]); // &quot; world &quot;
  console.log(arguments.length <= 1 ? undefined : arguments[1]); // 15
  console.log(arguments.length <= 2 ? undefined : arguments[2]); // 50

  return &quot;Bazinga!&quot;;
}

tag(_templateObject, a + b, a * b);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> _templateObject = _taggedTemplateLiteral([<span class="hljs-string">"Hello "</span>, <span class="hljs-string">" world "</span>, <span class="hljs-string">""</span>], [<span class="hljs-string">"Hello "</span>, <span class="hljs-string">" world "</span>, <span class="hljs-string">""</span>]);
<span class="hljs-comment">// 已美化</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_taggedTemplateLiteral</span>(<span class="hljs-params">strings, raw</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.freeze(<span class="hljs-built_in">Object</span>.defineProperties(strings, {
        <span class="hljs-attr">raw</span>: {
            <span class="hljs-attr">value</span>: <span class="hljs-built_in">Object</span>.freeze(raw)
        }
    }));
}
<span class="hljs-comment">// 给传入的object定义strings和raw两个不可变的属性。</span>

<span class="hljs-keyword">var</span> a = <span class="hljs-number">5</span>;
<span class="hljs-keyword">var</span> b = <span class="hljs-number">10</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">tag</span>(<span class="hljs-params">strings</span>) </span>{
  <span class="hljs-built_in">console</span>.log(strings[<span class="hljs-number">0</span>]); <span class="hljs-comment">// "Hello "</span>
  <span class="hljs-built_in">console</span>.log(strings[<span class="hljs-number">1</span>]); <span class="hljs-comment">// " world "</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">arguments</span>.length &lt;= <span class="hljs-number">1</span> ? <span class="hljs-literal">undefined</span> : <span class="hljs-built_in">arguments</span>[<span class="hljs-number">1</span>]); <span class="hljs-comment">// 15</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">arguments</span>.length &lt;= <span class="hljs-number">2</span> ? <span class="hljs-literal">undefined</span> : <span class="hljs-built_in">arguments</span>[<span class="hljs-number">2</span>]); <span class="hljs-comment">// 50</span>

  <span class="hljs-keyword">return</span> <span class="hljs-string">"Bazinga!"</span>;
}

tag(_templateObject, a + b, a * b);</code></pre>
<h2 id="articleHeader15">模块化与类</h2>
<h3 id="articleHeader16">类class</h3>
<p>javascript实现oo一直是非常热门的话题。从最原始时代需要手动维护在构造函数里调用父类构造函数,到后来封装好函数进行extend继承，再到babel出现之后可以像其它面向对象的语言一样直接写class。es2015的类方案仍然算是过渡方案，它所支持的特性仍然没有涵盖类的所有特性。目前主要支持的有：</p>
<ul>
<li><p>constructor</p></li>
<li><p>static方法</p></li>
<li><p>get 方法</p></li>
<li><p>set 方法</p></li>
<li><p>类继承</p></li>
<li><p>super调用父类方法。</p></li>
</ul>
<p>转换前：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Animal {

    constructor(name, type) {
        this.name = name;
        this.type = type;
    }

    walk() {
        console.log('walk');
    }

    run() {
        console.log('run')
    }

    static getType() {
        return this.type;
    }

    get getName() {
        return this.name;
    }

    set setName(name) {
        this.name = name;
    }


}

class Dog extends Animal {
    constructor(name, type) {
        super(name, type);
    }

    get getName() {
        return super.getName();
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Animal</span> </span>{

    constructor(name, <span class="hljs-class"><span class="hljs-keyword">type</span>) </span>{
        <span class="hljs-keyword">this</span>.name = name;
        <span class="hljs-keyword">this</span>.<span class="hljs-keyword">type</span> = <span class="hljs-class"><span class="hljs-keyword">type</span></span>;
    }

    walk() {
        console.log(<span class="hljs-symbol">'wal</span>k');
    }

    run() {
        console.log(<span class="hljs-symbol">'ru</span>n')
    }

    static getType() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.<span class="hljs-keyword">type</span>;
    }

    get getName() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
    }

    set setName(name) {
        <span class="hljs-keyword">this</span>.name = name;
    }


}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Dog</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Animal</span> </span>{
    constructor(name, <span class="hljs-class"><span class="hljs-keyword">type</span>) </span>{
        <span class="hljs-keyword">super</span>(name, <span class="hljs-class"><span class="hljs-keyword">type</span>)</span>;
    }

    get getName() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">super</span>.getName();
    }
}</code></pre>
<p>转换后（由于代码太长，先省略辅助的方法）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
......一堆辅助方法，后文详述
**/
var Animal = (function () {
    function Animal(name, type) {
                // 此处是constructor的实现，用_classCallCheck来判定constructor正确与否
        _classCallCheck(this, Animal);

        this.name = name;
        this.type = type;
    }
        // _creatClass用于创建类及其对应的方法
    _createClass(Animal, [{
        key: 'walk',
        value: function walk() {
            console.log('walk');
        }
    }, {
        key: 'run',
        value: function run() {
            console.log('run');
        }
    }, {
        key: 'getName',
        get: function get() {
            return this.name;
        }
    }, {
        key: 'setName',
        set: function set(name) {
            this.name = name;
        }
    }], [{
        key: 'getType',
        value: function getType() {
            return this.type;
        }
    }]);

    return Animal;
})();

var Dog = (function (_Animal) {
        // 子类继承父类
    _inherits(Dog, _Animal);

    function Dog(name, type) {
        _classCallCheck(this, Dog);
                // 子类实现constructor
                // babel会强制子类在constructor中使用super，否则编译会报错
        return _possibleConstructorReturn(this, Object.getPrototypeOf(Dog).call(this, name, type));
    }

    _createClass(Dog, [{
        key: 'getName',
        get: function get() {
                       // 跟上文使用super调用原型链的super编译解析的方法一致，
                       // 也是自己写了一个回溯prototype原型链
            return _get(Object.getPrototypeOf(Dog.prototype), 'getName', this).call(this);
        }
    }]);

    return Dog;
})(Animal);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/**
......一堆辅助方法，后文详述
**/</span>
<span class="hljs-keyword">var</span> Animal = (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span>(<span class="hljs-params">name, type</span>) </span>{
                <span class="hljs-comment">// 此处是constructor的实现，用_classCallCheck来判定constructor正确与否</span>
        _classCallCheck(<span class="hljs-keyword">this</span>, Animal);

        <span class="hljs-keyword">this</span>.name = name;
        <span class="hljs-keyword">this</span>.type = type;
    }
        <span class="hljs-comment">// _creatClass用于创建类及其对应的方法</span>
    _createClass(Animal, [{
        <span class="hljs-attr">key</span>: <span class="hljs-string">'walk'</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">walk</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'walk'</span>);
        }
    }, {
        <span class="hljs-attr">key</span>: <span class="hljs-string">'run'</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">run</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'run'</span>);
        }
    }, {
        <span class="hljs-attr">key</span>: <span class="hljs-string">'getName'</span>,
        <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">get</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
        }
    }, {
        <span class="hljs-attr">key</span>: <span class="hljs-string">'setName'</span>,
        <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">set</span>(<span class="hljs-params">name</span>) </span>{
            <span class="hljs-keyword">this</span>.name = name;
        }
    }], [{
        <span class="hljs-attr">key</span>: <span class="hljs-string">'getType'</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getType</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.type;
        }
    }]);

    <span class="hljs-keyword">return</span> Animal;
})();

<span class="hljs-keyword">var</span> Dog = (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">_Animal</span>) </span>{
        <span class="hljs-comment">// 子类继承父类</span>
    _inherits(Dog, _Animal);

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Dog</span>(<span class="hljs-params">name, type</span>) </span>{
        _classCallCheck(<span class="hljs-keyword">this</span>, Dog);
                <span class="hljs-comment">// 子类实现constructor</span>
                <span class="hljs-comment">// babel会强制子类在constructor中使用super，否则编译会报错</span>
        <span class="hljs-keyword">return</span> _possibleConstructorReturn(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">Object</span>.getPrototypeOf(Dog).call(<span class="hljs-keyword">this</span>, name, type));
    }

    _createClass(Dog, [{
        <span class="hljs-attr">key</span>: <span class="hljs-string">'getName'</span>,
        <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">get</span>(<span class="hljs-params"></span>) </span>{
                       <span class="hljs-comment">// 跟上文使用super调用原型链的super编译解析的方法一致，</span>
                       <span class="hljs-comment">// 也是自己写了一个回溯prototype原型链</span>
            <span class="hljs-keyword">return</span> _get(<span class="hljs-built_in">Object</span>.getPrototypeOf(Dog.prototype), <span class="hljs-string">'getName'</span>, <span class="hljs-keyword">this</span>).call(<span class="hljs-keyword">this</span>);
        }
    }]);

    <span class="hljs-keyword">return</span> Dog;
})(Animal);</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 检测constructor正确与否
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError(&quot;Cannot call a class as a function&quot;);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 检测constructor正确与否</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_classCallCheck</span>(<span class="hljs-params">instance, Constructor</span>) </span>{
    <span class="hljs-keyword">if</span> (!(instance <span class="hljs-keyword">instanceof</span> Constructor)) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">"Cannot call a class as a function"</span>);
    }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建类
var _createClass = (function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            // es6规范要求类方法为non-enumerable
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            // 对于setter和getter方法，writable为false
            if (&quot;value&quot; in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        // 非静态方法定义在原型链上
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        // 静态方法直接定义在constructor函数上
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 创建类</span>
<span class="hljs-keyword">var</span> _createClass = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineProperties</span>(<span class="hljs-params">target, props</span>) </span>{
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; props.length; i++) {
            <span class="hljs-keyword">var</span> descriptor = props[i];
            <span class="hljs-comment">// es6规范要求类方法为non-enumerable</span>
            descriptor.enumerable = descriptor.enumerable || <span class="hljs-literal">false</span>;
            descriptor.configurable = <span class="hljs-literal">true</span>;
            <span class="hljs-comment">// 对于setter和getter方法，writable为false</span>
            <span class="hljs-keyword">if</span> (<span class="hljs-string">"value"</span> <span class="hljs-keyword">in</span> descriptor) descriptor.writable = <span class="hljs-literal">true</span>;
            <span class="hljs-built_in">Object</span>.defineProperty(target, descriptor.key, descriptor);
        }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">Constructor, protoProps, staticProps</span>) </span>{
        <span class="hljs-comment">// 非静态方法定义在原型链上</span>
        <span class="hljs-keyword">if</span> (protoProps) defineProperties(Constructor.prototype, protoProps);
        <span class="hljs-comment">// 静态方法直接定义在constructor函数上</span>
        <span class="hljs-keyword">if</span> (staticProps) defineProperties(Constructor, staticProps);
        <span class="hljs-keyword">return</span> Constructor;
    };
})();</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 继承类
function _inherits(subClass, superClass) {
   // 父类一定要是function类型
    if (typeof superClass !== &quot;function&quot; &amp;&amp; superClass !== null) {
        throw new TypeError(&quot;Super expression must either be null or a function, not &quot; + typeof superClass);
    }
    // 使原型链subClass.prototype.__proto__指向父类superClass，同时保证constructor是subClass自己
    subClass.prototype = Object.create(superClass &amp;&amp; superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    // 保证subClass.__proto__指向父类superClass
    if (superClass) 
        Object.setPrototypeOf ? 
        Object.setPrototypeOf(subClass, superClass) :    subClass.__proto__ = superClass;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// 继承类</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_inherits</span>(<span class="hljs-params">subClass, superClass</span>) </span>{
   <span class="hljs-comment">// 父类一定要是function类型</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> superClass !== <span class="hljs-string">"function"</span> &amp;&amp; superClass !== <span class="hljs-literal">null</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">"Super expression must either be null or a function, not "</span> + <span class="hljs-keyword">typeof</span> superClass);
    }
    <span class="hljs-comment">// 使原型链subClass.prototype.__proto__指向父类superClass，同时保证constructor是subClass自己</span>
    subClass.prototype = <span class="hljs-built_in">Object</span>.create(superClass &amp;&amp; superClass.prototype, {
        <span class="hljs-keyword">constructor</span>: {
            value: subClass,
            enumerable: <span class="hljs-literal">false</span>,
            writable: <span class="hljs-literal">true</span>,
            configurable: <span class="hljs-literal">true</span>
        }
    });
    <span class="hljs-comment">// 保证subClass.__proto__指向父类superClass</span>
    <span class="hljs-keyword">if</span> (superClass) 
        <span class="hljs-built_in">Object</span>.setPrototypeOf ? 
        <span class="hljs-built_in">Object</span>.setPrototypeOf(subClass, superClass) :    subClass.__proto__ = superClass;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 子类实现constructor
function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError(&quot;this hasn't been initialised - super() hasn't been called&quot;);
    }
    // 若call是函数/对象则返回
    return call &amp;&amp; (typeof call === &quot;object&quot; || typeof call === &quot;function&quot;) ? call : self;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 子类实现constructor</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_possibleConstructorReturn</span>(<span class="hljs-params">self, call</span>) </span>{
    <span class="hljs-keyword">if</span> (!self) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">ReferenceError</span>(<span class="hljs-string">"this hasn't been initialised - super() hasn't been called"</span>);
    }
    <span class="hljs-comment">// 若call是函数/对象则返回</span>
    <span class="hljs-keyword">return</span> call &amp;&amp; (<span class="hljs-keyword">typeof</span> call === <span class="hljs-string">"object"</span> || <span class="hljs-keyword">typeof</span> call === <span class="hljs-string">"function"</span>) ? call : self;
}</code></pre>
<p>先前在用react重构项目的时候，所有的react组件都已经摒弃了es5的写法，一律采用了es6。用类的好处写继续更加方便，但无法用mixin，需要借助更新的es7语法中的decorator才能够实现类mixin的功能(例如pureRender）。但这次分析完babel源码之后，才发现原来babel在实现class特性的时候，定义了许多方法，尽管看起来并不太优雅。</p>
<h3 id="articleHeader17">模块化</h3>
<p>在开发react的时候，我们往往用webpack搭配babel的es2015和react两个preset进行构建。之前看了一篇文章对babel此处的模块加载有些启发（《分析 Babel 转换 ES6 module 的原理》）。</p>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// test.js
import { Animal as Ani, catwalk } from &quot;./t1&quot;;
import * as All from &quot;./t2&quot;;


class Cat extends Ani {

    constructor() {
        super();
    }
}

class Dog extends Ani {
    constructor() {
        super();
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-comment">// test.js</span>
<span class="hljs-keyword">import</span> { <span class="hljs-type">Animal</span> as <span class="hljs-type">Ani</span>, catwalk } from <span class="hljs-string">"./t1"</span>;
<span class="hljs-keyword">import</span> * as <span class="hljs-type">All</span> from <span class="hljs-string">"./t2"</span>;


<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Cat</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Ani</span> </span>{

    constructor() {
        <span class="hljs-keyword">super</span>();
    }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Dog</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Ani</span> </span>{
    constructor() {
        <span class="hljs-keyword">super</span>();
    }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// t1.js
export class Animal {

    constructor() {

    }

}

export function catwal() {
    console.log('cat walk');
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// t1.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Animal</span> </span>{

    <span class="hljs-keyword">constructor</span>() {

    }

}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">catwal</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'cat walk'</span>);
};</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// t2.js
export class Person {
    constructor() {

    }

}

export class Plane {
    constructor() {

    }

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// t2.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> </span>{
    <span class="hljs-keyword">constructor</span>() {

    }

}

<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Plane</span> </span>{
    <span class="hljs-keyword">constructor</span>() {

    }

}</code></pre>
<p>通过webpack与babel编译后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// t1.js的模块
Object.defineProperty(exports, &quot;__esModule&quot;, {
    value: true
});
exports.catwal = catwal;

// 省略一些类继承的方法

var Animal = exports.Animal = function Animal() {
    _classCallCheck(this, Animal);
};

function catwal() {
    console.log('cat walk');
};

// t2.js的模块
Object.defineProperty(exports, &quot;__esModule&quot;, {
    value: true
});

// 省略一些类继承的方法

var Person = exports.Person = function Person() {
    _classCallCheck(this, Person);
};

var Plane = exports.Plane = function Plane() {
    _classCallCheck(this, Plane);
};

// test.js的模块
var _t = __webpack_require__(1);

var _t2 = __webpack_require__(3); // 返回的都是exports上返回的对象属性

var All = _interopRequireWildcard(_t2);

function _interopRequireWildcard(obj) {
    // 发现是babel编译的， 直接返回
    if (obj &amp;&amp; obj.__esModule) {
        return obj;
    }
   // 非babel编译， 猜测可能是第三方模块，为了不报错，让default指向它自己
    else {
        var newObj = {};
        if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }
        newObj.default = obj;
        return newObj;
    }
}

// 省略一些类继承的方法

var Cat = (function (_Ani) {
    _inherits(Cat, _Ani);

    function Cat() {
        _classCallCheck(this, Cat);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Cat).call(this));
    }

    return Cat;
})(_t.Animal);

var Dog = (function (_Ani2) {
    _inherits(Dog, _Ani2);

    function Dog() {
        _classCallCheck(this, Dog);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Dog).call(this));
    }

    return Dog;
})(_t.Animal);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// t1.js的模块</span>
<span class="hljs-built_in">Object</span>.defineProperty(exports, <span class="hljs-string">"__esModule"</span>, {
    <span class="hljs-attr">value</span>: <span class="hljs-literal">true</span>
});
exports.catwal = catwal;

<span class="hljs-comment">// 省略一些类继承的方法</span>

<span class="hljs-keyword">var</span> Animal = exports.Animal = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span>(<span class="hljs-params"></span>) </span>{
    _classCallCheck(<span class="hljs-keyword">this</span>, Animal);
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">catwal</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'cat walk'</span>);
};

<span class="hljs-comment">// t2.js的模块</span>
<span class="hljs-built_in">Object</span>.defineProperty(exports, <span class="hljs-string">"__esModule"</span>, {
    <span class="hljs-attr">value</span>: <span class="hljs-literal">true</span>
});

<span class="hljs-comment">// 省略一些类继承的方法</span>

<span class="hljs-keyword">var</span> Person = exports.Person = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>) </span>{
    _classCallCheck(<span class="hljs-keyword">this</span>, Person);
};

<span class="hljs-keyword">var</span> Plane = exports.Plane = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Plane</span>(<span class="hljs-params"></span>) </span>{
    _classCallCheck(<span class="hljs-keyword">this</span>, Plane);
};

<span class="hljs-comment">// test.js的模块</span>
<span class="hljs-keyword">var</span> _t = __webpack_require__(<span class="hljs-number">1</span>);

<span class="hljs-keyword">var</span> _t2 = __webpack_require__(<span class="hljs-number">3</span>); <span class="hljs-comment">// 返回的都是exports上返回的对象属性</span>

<span class="hljs-keyword">var</span> All = _interopRequireWildcard(_t2);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_interopRequireWildcard</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-comment">// 发现是babel编译的， 直接返回</span>
    <span class="hljs-keyword">if</span> (obj &amp;&amp; obj.__esModule) {
        <span class="hljs-keyword">return</span> obj;
    }
   <span class="hljs-comment">// 非babel编译， 猜测可能是第三方模块，为了不报错，让default指向它自己</span>
    <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">var</span> newObj = {};
        <span class="hljs-keyword">if</span> (obj != <span class="hljs-literal">null</span>) {
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> obj) {
                <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Object</span>.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }
        newObj.default = obj;
        <span class="hljs-keyword">return</span> newObj;
    }
}

<span class="hljs-comment">// 省略一些类继承的方法</span>

<span class="hljs-keyword">var</span> Cat = (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">_Ani</span>) </span>{
    _inherits(Cat, _Ani);

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Cat</span>(<span class="hljs-params"></span>) </span>{
        _classCallCheck(<span class="hljs-keyword">this</span>, Cat);

        <span class="hljs-keyword">return</span> _possibleConstructorReturn(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">Object</span>.getPrototypeOf(Cat).call(<span class="hljs-keyword">this</span>));
    }

    <span class="hljs-keyword">return</span> Cat;
})(_t.Animal);

<span class="hljs-keyword">var</span> Dog = (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">_Ani2</span>) </span>{
    _inherits(Dog, _Ani2);

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Dog</span>(<span class="hljs-params"></span>) </span>{
        _classCallCheck(<span class="hljs-keyword">this</span>, Dog);

        <span class="hljs-keyword">return</span> _possibleConstructorReturn(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">Object</span>.getPrototypeOf(Dog).call(<span class="hljs-keyword">this</span>));
    }

    <span class="hljs-keyword">return</span> Dog;
})(_t.Animal);</code></pre>
<p>es6的模块加载是属于多对象多加载，而commonjs则属于单对象单加载。babel需要做一些手脚才能将es6的模块写法写成commonjs的写法。主要是通过定义__esModule这个属性来判断这个模块是否经过babel的编译。然后通过_interopRequireWildcard对各个模块的引用进行相应的处理。</p>
<p>另一个发现是，通过webpack打包babel编译后的代码，每一个模块里面都包含了相同的类继承帮助方法，这是开发时忽略的。由此可看，在开发react的时候用es5的语法可能会比使用es6的class能使js bundle更小。</p>
<h2 id="articleHeader18">babel es2015 loose mode</h2>
<p>开发家校群的时候，在android4.0下面报esModule错误的问题，如下：<br><code>Uncaught TypeError: Cannot assign to read only property '__esModule' of #&lt;Object&gt;</code>。</p>
<p>经查证，发现是构建中babel-es2015 loader的模式问题，会导致Android4.0的用户有报错。只需要使用loose mode就可以解决问题。下面是相关的stackoverflow issue以及对应解决问题的npm包。</p>
<ul>
<li><p><a href="http://stackoverflow.com/questions/33446318/is-there-a-way-to-use-loose-modules-when-using-es2015-preset-in-babel-6" rel="nofollow noreferrer" target="_blank">stackoverflow</a></p></li>
<li><p><a href="https://www.npmjs.com/package/babel-preset-es2015-loose%20" rel="nofollow noreferrer" target="_blank">babel-preset-est2015-loose npm package</a></p></li>
</ul>
<p>那么es2015和normal mode和loose mode有什么区别呢，这个出名的博客略有介绍:<a href="http://www.2ality.com/2015/12/babel6-loose-mode.html" rel="nofollow noreferrer" target="_blank">Babel 6: loose mode</a>。</p>
<p>实质就是（作者总结）normal mode的转换更贴近es6的写法，许多的property都是通过Object.defineProperty进行的。而loose mode则更贴近es5的写法，性能更好一些，兼容性更好一些，但将这部份代码再转换成native es6的话会比较麻烦一些（感觉这一点并不是缺点，有源码就可以了）。</p>
<p>上面esModule解决的办法，实质就是将</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.defineProperty(exports, &quot;__esModule&quot;, {
    value: true
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">Object</span><span class="hljs-selector-class">.defineProperty</span>(<span class="hljs-selector-tag">exports</span>, "__<span class="hljs-selector-tag">esModule</span>", {
    <span class="hljs-attribute">value</span>: true
});</code></pre>
<p>改成 <code>exports.__esModule = true;</code>。</p>
<p>再举个例子，如下面的Cat类定义：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Cat extends Ani {

    constructor() {
        super();
    }

    miao() {
        console.log('miao');
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Cat</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Ani</span> </span>{

    constructor() {
        <span class="hljs-keyword">super</span>();
    }

    miao() {
        console.log(<span class="hljs-symbol">'mia</span>o');
    }
}</code></pre>
<p>正常模式会编译为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Cat = (function (_Ani) {
    _inherits(Cat, _Ani);

    function Cat() {
        _classCallCheck(this, Cat);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Cat).call(this));
    }

    _createClass(Cat, [{
        key: &quot;miao&quot;,
        value: function miao() {
            console.log('miao');
        }
    }]);

    return Cat;
})(_t.Animal);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>var Cat = (<span class="hljs-name">function</span> (<span class="hljs-name">_Ani</span>) {
    _inherits(<span class="hljs-name">Cat</span>, _Ani)<span class="hljs-comment">;</span>

    function Cat() {
        _classCallCheck(<span class="hljs-name">this</span>, Cat)<span class="hljs-comment">;</span>

        return _possibleConstructorReturn(<span class="hljs-name">this</span>, Object.getPrototypeOf(<span class="hljs-name">Cat</span>).call(<span class="hljs-name">this</span>))<span class="hljs-comment">;</span>
    }

    _createClass(<span class="hljs-name">Cat</span>, [{
        key: <span class="hljs-string">"miao"</span>,
        value: function miao() {
            console.log('miao')<span class="hljs-comment">;</span>
        }
    }])<span class="hljs-comment">;</span>

    return Cat<span class="hljs-comment">;</span>
})(<span class="hljs-name">_t</span>.Animal)<span class="hljs-comment">;</span></code></pre>
<p>loose mode模式会编译为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Cat = (function (_Ani) {
    _inherits(Cat, _Ani);

    function Cat() {
        _classCallCheck(this, Cat);

        return _possibleConstructorReturn(this, _Ani.call(this));
    }

    Cat.prototype.miao = function miao() {
        console.log('miao');
    };

    return Cat;
})(_t.Animal);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>var Cat = (<span class="hljs-name">function</span> (<span class="hljs-name">_Ani</span>) {
    _inherits(<span class="hljs-name">Cat</span>, _Ani)<span class="hljs-comment">;</span>

    function Cat() {
        _classCallCheck(<span class="hljs-name">this</span>, Cat)<span class="hljs-comment">;</span>

        return _possibleConstructorReturn(<span class="hljs-name">this</span>, _Ani.call(<span class="hljs-name">this</span>))<span class="hljs-comment">;</span>
    }

    Cat.prototype.miao = function miao() {
        console.log('miao')<span class="hljs-comment">;</span>
    }<span class="hljs-comment">;</span>

    return Cat<span class="hljs-comment">;</span>
})(<span class="hljs-name">_t</span>.Animal)<span class="hljs-comment">;</span></code></pre>
<p>babel es2015中loose模式主要是针对下面几个plugin：</p>
<ul>
<li><p>transform-es2015-template-literals</p></li>
<li><p>transform-es2015-classes</p></li>
<li><p>transform-es2015-computed-properties</p></li>
<li><p>transform-es2015-for-of</p></li>
<li><p>transform-es2015-spread</p></li>
<li><p>transform-es2015-destructuring</p></li>
<li><p>transform-es2015-modules-commonjs</p></li>
</ul>
<p>每一种的转换方式在此就不再赘述了，大家可以回家自己试。</p>
<p>如有错误，恳请斧正！</p>
<h2 id="articleHeader19">参考文章</h2>
<h4>babel try out</h4>
<ul><li><p><a href="https://babeljs.io/repl/" rel="nofollow noreferrer" target="_blank">https://babeljs.io/repl/</a></p></li></ul>
<h4>template literals</h4>
<ul><li><p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals</a></p></li></ul>
<h4>block-scoped functions</h4>
<ul>
<li><p><a href="https://blogs.msdn.microsoft.com/cdndevs/2015/09/16/future-of-javascript-ecmascript-6-es2015-block-scoping/" rel="nofollow noreferrer" target="_blank">https://blogs.msdn.microsoft.com/cdndevs/2015/09/16/future-of-javascript-ecmascript-6-es2015-block-scoping/</a></p></li>
<li><p><a href="http://www.programmerinterview.com/index.php/javascript/javascript-block-scope/" rel="nofollow noreferrer" target="_blank">http://www.programmerinterview.com/index.php/javascript/javascript-block-scope/</a></p></li>
<li><p><a href="http://www.2ality.com/2015/02/es6-scoping.html" rel="nofollow noreferrer" target="_blank">http://www.2ality.com/2015/02/es6-scoping.html</a></p></li>
</ul>
<h4>classes</h4>
<ul>
<li><p><a href="http://purplebamboo.github.io/2014/07/13/javascript-oo-class/" rel="nofollow noreferrer" target="_blank">http://purplebamboo.github.io/2014/07/13/javascript-oo-class/</a></p></li>
<li><p><a href="http://blog.rainy.im/2015/07/20/prototype-chain-in-js/" rel="nofollow noreferrer" target="_blank">http://blog.rainy.im/2015/07/20/prototype-chain-in-js/</a></p></li>
</ul>
<h4>objects</h4>
<ul><li><p><a href="http://fourkitchens.com/blog/article/practical-introduction-es2015-objects" rel="nofollow noreferrer" target="_blank">http://fourkitchens.com/blog/article/practical-introduction-es2015-objects</a></p></li></ul>
<h4>commonjs and es6 module</h4>
<ul>
<li><p><a href="http://ryerh.com/javascript/2016/03/27/babel-module-implementation.html" rel="nofollow noreferrer" target="_blank">http://ryerh.com/javascript/2016/03/27/babel-module-implementation.html</a></p></li>
<li><p><a href="http://www.2ality.com/2015/12/babel6-loose-mode.html" rel="nofollow noreferrer" target="_blank">http://www.2ality.com/2015/12/babel6-loose-mode.html</a></p></li>
<li><p><a href="http://www.2ality.com/2015/02/es6-classes-final.html" rel="nofollow noreferrer" target="_blank">http://www.2ality.com/2015/02/es6-classes-final.html</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
babel 到底将代码转换成什么鸟样？

## 原文链接
[https://segmentfault.com/a/1190000005112677](https://segmentfault.com/a/1190000005112677)

