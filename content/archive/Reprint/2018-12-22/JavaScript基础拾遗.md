---
title: 'JavaScript基础拾遗' 
date: 2018-12-22 2:30:11
hidden: true
slug: oziypuaap2m
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">JavaScript基础拾遗</h2>
<blockquote><p>study notes by Tingting</p></blockquote>
<h3 id="articleHeader1">为啥说JavaScript的基础</h3>
<p>在平时开发时，我们更多的是在写PHP的逻辑层，但是在写后台时多多少少会写一写JavaScript的代码，有时候我们就会遇到对js的字符串、数组、对象搞不清咋么去处理的问题，毕竟我们是Phper，对js的语法和特性并不是那么了解，更多的时候遇到问题都是去百度，然后解决掉了下一次又遇到又去百度，却不知道为啥是这样写，所以就有了这次分享。</p>
<h3 id="articleHeader2">JavaScript历史（一嘴带过的历史）</h3>
<p>在上个世纪的1995年，当时的网景公司正凭借其Navigator浏览器成为Web时代开启时最著名的第一代互联网公司。</p>
<p>由于网景公司希望能在静态HTML页面上添加一些动态效果，于是叫Brendan Eich这哥们在两周之内设计出了JavaScript语言。你没看错，这哥们只用了10天时间。</p>
<p>为什么起名叫JavaScript？原因是当时Java语言非常红火，所以网景公司希望借Java的名气来推广，但事实上JavaScript除了语法上有点像Java，其他部分基本上没啥关系。</p>
<h3 id="articleHeader3">JavaScript和ECMAScript的关系</h3>
<p>因为网景开发了JavaScript，一年后微软又模仿JavaScript开发了JScript，为了让JavaScript成为全球标准，几个公司联合ECMA（European Computer Manufacturers Association）组织定制了JavaScript语言的标准，被称为ECMAScript标准。</p>
<p>所以简单说来就是，<code>ECMAScript</code>是一种语言标准，而JavaScript是网景公司对ECMAScript标准的一种实现。</p>
<p>目前我们所使用的js语法基本上都是对<code>ECMAScript5.1</code>（ES5）的实现，而现在在前端圈比较流行的<code>ES6</code>(ECMAScript2015)、<code>ES7</code>(ECMAScript2016)就是JavaScript的下一代标准和下几代标准了，目前浏览器对<code>ES6</code>的语法并不是完全支持的，前端圈现在更多的是在<code>Webpack</code>这种打包构建工具中使用，在发布生产代码或者开发运行时将<code>ES6</code>的语法编译成浏览器兼容的<code>ES5</code>(JavaScript)的语法，如果感兴趣看一看看<a href="http://es6.ruanyifeng.com/" rel="nofollow noreferrer" target="_blank">阮一峰的ECMAScript 6 入门</a>，ES6中有很多好玩的语法糖，比如<code>箭头函数</code>、<code>模板字符串</code>等等。</p>
<h3 id="articleHeader4">基础语法</h3>
<h4>关于分号</h4>
<p>JavaScript的语法和PHP语言类似，每个语句以<code>;</code>结束，语句块用<code>{...}</code>。但是，JavaScript并不强制要求在每个语句的结尾加<code>;</code>，浏览器中负责执行JavaScript代码的引擎会自动在每个语句的结尾补上<code>;</code>。</p>
<p>现在在前端圈因为大量像<code>webpack</code>这种构建工具的使用，反而更推荐不要去加<code>;</code>，因为构建工具在编译压缩代码时会自动给该加的地方加上，所以加不加分号的问题还是看个人习惯，像我们写PHP的同学可能更习惯加分号。</p>
<p>加不加分号没有绝对的约束，当然如果你致力于成为一名<code>全栈工程师</code>，比如你在写<code>Vue组件化</code>时，就更应该去遵守前端规范的约定，不去加分号。</p>
<h4>赋值</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1
var username = 'saboran'
var isOk = true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = <span class="hljs-number">1</span>
<span class="hljs-selector-tag">var</span> username = <span class="hljs-string">'saboran'</span>
<span class="hljs-selector-tag">var</span> isOk = true</code></pre>
<ul><li>ES6中的<code>let</code>、<code>const</code>和<code>var</code>的对比（可以详细讲一下或者在浏览器的console里执行一下参考代码）</li></ul>
<p><code>let</code>和<code>const</code>都是es5，es6新版本的js语言规范出来的定义，在这以前定义一个变量只能用<code>var</code>。<code>let</code>和<code>const</code>都是为了弥补var的一些缺陷而新设计出来的。<br>简单来说是：<code>let</code>修复了<code>var</code>的作用域的一些bug，变的更加好用。<code>let</code>是更好的<code>var</code>。<code>var</code>的作用域是函数作用域，而<code>let</code>是块级别（大括号括起来的内容）,<code>const</code>声明的变量只可以在声明时赋值，不可随意修改，这是最大的特点。</p>
<p>举例说明<code>let</code>和<code>var</code>的区别</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 当定义的变量在函数之外时，二者作用域都是全局，并无区别
let name = 'Tom'
var age = 18

// 当定义的变量位于函数内部时，二者的作用域都是函数内部，也没有区别

function makeCake(){
  let shape = '心型'
  var size = 8
}

// 不同点，let的作用域在块内，而var并无约束

// 测试let的作用域
function testLet(){
    
    for(let i=0; i < 10; i++){
        // todo something
    }
    
    // 此处的console.log的结果是报错，报错内容是 i is not defined 
    // 原因就是let 定义的变量的作用域是在块之间，在这个例子中let定义的i的作用域仅仅在这个for循环中，所以在for循环外部调用i会报错
    console.log(i) 
}

// 测试var的作用域
function testVar(){
    
    for(var i=0; i < 10; i++){
        // todo something
    }
    
    // 这里console.log的结果就为10，因为var定义的变量i作用域是在函数内部,当执行完for循环，i自增后便是10.
    // 这也就是var定义变量不好的一点，我们定义i的本意就应该是只在for循环中生效的
    console.log(i)
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-comment">// 当定义的变量在函数之外时，二者作用域都是全局，并无区别</span>
<span class="hljs-keyword">let</span> name = <span class="hljs-string">'Tom'</span>
<span class="hljs-built_in">var</span> age = <span class="hljs-number">18</span>

<span class="hljs-comment">// 当定义的变量位于函数内部时，二者的作用域都是函数内部，也没有区别</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeCake</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">let</span> shape = <span class="hljs-string">'心型'</span>
  <span class="hljs-built_in">var</span> <span class="hljs-built_in">size</span> = <span class="hljs-number">8</span>
}

<span class="hljs-comment">// 不同点，let的作用域在块内，而var并无约束</span>

<span class="hljs-comment">// 测试let的作用域</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testLet</span>(<span class="hljs-params"></span>)</span>{
    
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++){
        <span class="hljs-comment">// todo something</span>
    }
    
    <span class="hljs-comment">// 此处的console.log的结果是报错，报错内容是 i is not defined </span>
    <span class="hljs-comment">// 原因就是let 定义的变量的作用域是在块之间，在这个例子中let定义的i的作用域仅仅在这个for循环中，所以在for循环外部调用i会报错</span>
    <span class="hljs-built_in">console</span>.log(i) 
}

<span class="hljs-comment">// 测试var的作用域</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testVar</span>(<span class="hljs-params"></span>)</span>{
    
    <span class="hljs-keyword">for</span>(<span class="hljs-built_in">var</span> i=<span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++){
        <span class="hljs-comment">// todo something</span>
    }
    
    <span class="hljs-comment">// 这里console.log的结果就为10，因为var定义的变量i作用域是在函数内部,当执行完for循环，i自增后便是10.</span>
    <span class="hljs-comment">// 这也就是var定义变量不好的一点，我们定义i的本意就应该是只在for循环中生效的</span>
    <span class="hljs-built_in">console</span>.log(i)
}

</code></pre>
<h4>代码注释</h4>
<p>js的注释和PHP一样有两种，一种行注释使用双斜线<code>//</code>，另一种是块注释使用<code>/****/</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 这是变量a的注释
var a = 100

/**
 * 这是函数test的块注释
 */
function test(){
    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// 这是变量a的注释</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-number">100</span>

<span class="hljs-comment">/**
 * 这是函数test的块注释
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span><span class="hljs-params">()</span></span>{
    
}</code></pre>
<h3 id="articleHeader5">数据类型和变量</h3>
<p>在JavaScript中定义了以下几种数据类型：</p>
<ul>
<li>Number（数值型）</li>
<li>布尔值</li>
<li>null</li>
<li>undefined</li>
<li>字符串</li>
<li>数组</li>
<li>对象</li>
</ul>
<h4>简单说前四种类型和运算符</h4>
<ol><li>Number</li></ol>
<p>JavaScript不区分整数和浮点数，统一用Number表示，以下都是合法的Number类型：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="123 // 整数123
0.456 // 浮点数0.456
1.2345e3 // 科学计数法表示1.2345x1000，等同于1234.5
-99 // 负数
NaN // NaN表示Not a Number，当无法计算结果时用NaN表示
Infinity // Infinity表示无限大，当数值超过了JavaScript的Number所能表示的最大值时，就表示为Infinity" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">123</span> <span class="hljs-comment">// 整数123</span>
<span class="hljs-number">0.456</span> <span class="hljs-comment">// 浮点数0.456</span>
<span class="hljs-number">1.2345e3</span> <span class="hljs-comment">// 科学计数法表示1.2345x1000，等同于1234.5</span>
<span class="hljs-number">-99</span> <span class="hljs-comment">// 负数</span>
NaN <span class="hljs-comment">// NaN表示Not a Number，当无法计算结果时用NaN表示</span>
Infinity <span class="hljs-comment">// Infinity表示无限大，当数值超过了JavaScript的Number所能表示的最大值时，就表示为Infinity</span></code></pre>
<ul><li>四则运算</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1 + 2 // 3
(1 + 2) * 5 / 2 // 7.5
2 / 0 // Infinity
0 / 0 // NaN
10 % 3 // 1  取模（取余）
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1</span> + <span class="hljs-number">2</span> <span class="hljs-comment">// 3</span>
(<span class="hljs-number">1</span> + <span class="hljs-number">2</span>) * <span class="hljs-number">5</span> / <span class="hljs-number">2</span> <span class="hljs-comment">// 7.5</span>
<span class="hljs-number">2</span> / <span class="hljs-number">0</span> <span class="hljs-comment">// Infinity</span>
<span class="hljs-number">0</span> / <span class="hljs-number">0</span> <span class="hljs-comment">// NaN</span>
<span class="hljs-number">10</span> % <span class="hljs-number">3</span> <span class="hljs-comment">// 1  取模（取余）</span>
</code></pre>
<ol><li>布尔值</li></ol>
<p>布尔值和布尔代数的表示完全一致，一个布尔值只有true、false两种值，要么是true，要么是false，可以直接用true、false表示布尔值。</p>
<p>js的<code>与或非</code>运算和PHP语法基本一致</p>
<ul><li>与运算</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="true &amp;&amp; true; // 这个&amp;&amp;语句计算结果为true
true &amp;&amp; false; // 这个&amp;&amp;语句计算结果为false
false &amp;&amp; true &amp;&amp; false; // 这个&amp;&amp;语句计算结果为false
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-literal">true</span> <span class="hljs-string">&amp;&amp;</span> <span class="hljs-literal">true</span><span class="hljs-string">;</span> <span class="hljs-string">//</span> <span class="hljs-string">这个&amp;&amp;语句计算结果为true</span>
<span class="hljs-literal">true</span> <span class="hljs-string">&amp;&amp;</span> <span class="hljs-literal">false</span><span class="hljs-string">;</span> <span class="hljs-string">//</span> <span class="hljs-string">这个&amp;&amp;语句计算结果为false</span>
<span class="hljs-literal">false</span> <span class="hljs-string">&amp;&amp;</span> <span class="hljs-literal">true</span> <span class="hljs-string">&amp;&amp;</span> <span class="hljs-literal">false</span><span class="hljs-string">;</span> <span class="hljs-string">//</span> <span class="hljs-string">这个&amp;&amp;语句计算结果为false</span>
</code></pre>
<ul><li>或运算</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="false || false; // 这个||语句计算结果为false
true || false; // 这个||语句计算结果为true
false || true || false; // 这个||语句计算结果为true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code><span class="hljs-literal">false</span> <span class="hljs-params">||</span> <span class="hljs-literal">false</span>; <span class="hljs-regexp">//</span> 这个<span class="hljs-params">||</span>语句计算结果为<span class="hljs-literal">false</span>
<span class="hljs-literal">true</span> <span class="hljs-params">||</span> <span class="hljs-literal">false</span>; <span class="hljs-regexp">//</span> 这个<span class="hljs-params">||</span>语句计算结果为<span class="hljs-literal">true</span>
<span class="hljs-literal">false</span> <span class="hljs-params">||</span> <span class="hljs-literal">true</span> <span class="hljs-params">||</span> <span class="hljs-literal">false</span>; <span class="hljs-regexp">//</span> 这个<span class="hljs-params">||</span>语句计算结果为<span class="hljs-literal">true</span></code></pre>
<ul><li>非运算（取反）</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="! true; // 结果为false
! false; // 结果为true
! (2 > 5); // 结果为true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>! <span class="hljs-keyword">true</span>; <span class="hljs-regexp">//</span> 结果为<span class="hljs-keyword">false</span>
! <span class="hljs-keyword">false</span>; <span class="hljs-regexp">//</span> 结果为<span class="hljs-keyword">true</span>
! (<span class="hljs-number">2</span> &gt; <span class="hljs-number">5</span>); <span class="hljs-regexp">//</span> 结果为<span class="hljs-keyword">true</span></code></pre>
<ol><li>null和undefined</li></ol>
<p><code>null</code>表示一个“空”的值，它和<code>0</code>以及空字符串<code>''</code>不同，<code>0</code>是一个数值，<code>''</code>表示长度为0的字符串，而<code>null</code>表示“空”,即没有值。</p>
<p>在JavaScript中，还有一个和<code>null</code>类似的<code>undefined</code>，它表示“未定义”。</p>
<p>JavaScript的设计者希望用<code>null</code>表示一个空的值，而<code>undefined</code>表示值未定义。事实上，大多数情况下，我们都应该用null。undefined仅仅在判断函数参数是否传递的情况下才有用。</p>
<ol><li>比较运算符</li></ol>
<p>比较运算符常用的无非是大于、小于、大于等于、小于等于，这里要着重说的是等于和全等于，即<code>==</code>和<code>===</code></p>
<blockquote><p>在JavaScript中是允许任意数据类型进行比较的</p></blockquote>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="flase == 0  // true
flase === 0 // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code><span class="hljs-attr">flase</span> == <span class="hljs-number">0</span>  // <span class="hljs-literal">true</span>
<span class="hljs-attr">flase</span> === <span class="hljs-number">0</span> // <span class="hljs-literal">false</span></code></pre>
<p>要特别注意的是，JavaScript在设计时，有两种比较运算符：</p>
<p>第一种是<code>==</code>比较，它会自动转换数据类型再比较，很多时候，会得到非常诡异的结果；</p>
<p>第二种是<code>===</code>比较，它不会自动转换数据类型，如果数据类型不一致，返回false，如果一致，再比较。</p>
<p>在JavaScript中推荐任何时候都是用<code>===</code>,而不去使用<code>==</code></p>
<ul><li>浮点数的相等的比较</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1 / 3 === (1 - 2 / 3)  // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs basic"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">1 </span>/ <span class="hljs-number">3</span> === (<span class="hljs-number">1</span> - <span class="hljs-number">2</span> / <span class="hljs-number">3</span>)  // false</code></pre>
<p>可能会有人有疑问，为什么<code>1/3</code>和<code>1 - 2/3</code>的值不相等，原因是：浮点数在运算过程中会产生误差，因为计算机无法精确表示无限循环小数。<br>所以，要比较两个浮点数是否相等，只能计算它们之差的绝对值，看是否小于某个阈值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Math.abs(1 / 3 - (1 - 2 / 3)) < 0.0000001  // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">Math.abs(<span class="hljs-number">1</span> / <span class="hljs-number">3</span> - (<span class="hljs-number">1</span> - <span class="hljs-number">2</span> / <span class="hljs-number">3</span>)) &lt; <span class="hljs-number">0.0000001</span>  <span class="hljs-comment">// true</span></code></pre>
<ul><li>一个特例：NAN</li></ul>
<p><code>NaN</code>这个特殊的Number与所有其他值都不相等，包括它自己：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="NaN === NaN  // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attr">NaN</span> === NaN  // <span class="hljs-literal">false</span></code></pre>
<p>唯一能判断<code>NAN</code>的方法是使用<code>isNaN()</code>函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="isNaN(NaN) // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">isNaN</span><span class="hljs-params">(NaN)</span></span> <span class="hljs-comment">// true</span></code></pre>
<h3 id="articleHeader6">主角们</h3>
<h4>字符串String</h4>
<p>字符串是以单引号<code>''</code>或双引号<code>""</code>括起来的任意文本，比如<code>'abc'</code>，<code>"xyz"</code>等等。请注意，<code>''</code>或<code>""</code>本身只是一种表示方式，并不是字符串的一部分。</p>
<p>单引号和双引号的功能在js中和PHP的功能并不一致，在PHP中双引号里面可以解析变量，单引号不可以，但是在js中，单引号和双引号并无任何区别，都不能解析变量。</p>
<p>所以，现在前端圈更推荐字符串只使用<code>''</code>单引号。</p>
<ol><li>拼接字符串</li></ol>
<p>和PHP不同的是js的拼接字符串使用的是<code>+</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let firstName = '苏'

let lastName = '秦'

let username = firstName + lastName

console.log(username) // 苏秦" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> firstName = <span class="hljs-string">'苏'</span>

<span class="hljs-keyword">let</span> lastName = <span class="hljs-string">'秦'</span>

<span class="hljs-keyword">let</span> username = firstName + lastName

<span class="hljs-built_in">console</span>.log(username) <span class="hljs-comment">// 苏秦</span></code></pre>
<p>当多个变量需要连接时，使用<code>+</code>就比较麻烦了，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = '刘德华'
var time = '2017.12.30'
var addr = '上海东方体育中心'

var message = time + '国际巨星' + name + '将在' + addr + '开个人演唱会！'

cosnole.log(message) // 2017.12.30国际巨星刘德华将在上海东方体育中心开个人演唱会！" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> name = <span class="hljs-string">'刘德华'</span>
<span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">time</span> = <span class="hljs-string">'2017.12.30'</span>
<span class="hljs-selector-tag">var</span> addr = <span class="hljs-string">'上海东方体育中心'</span>

<span class="hljs-selector-tag">var</span> message = <span class="hljs-selector-tag">time</span> + <span class="hljs-string">'国际巨星'</span> + name + <span class="hljs-string">'将在'</span> + addr + <span class="hljs-string">'开个人演唱会！'</span>

cosnole.log(message) <span class="hljs-comment">// 2017.12.30国际巨星刘德华将在上海东方体育中心开个人演唱会！</span></code></pre>
<ol><li>模板字符串(ES6的语法糖)</li></ol>
<p>为了解决多个字符串变量拼接麻烦的问题，ES6新增了一种模板字符串，是用反引号<code>`，将变量使用</code>${}`包裹，上面的例子使用末班字符串就可以这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = '刘德华'
var time = '2017.12.30'
var addr = '上海东方体育中心'

var message = `${time}国际巨星${name}将在${addr}开个人演唱会`

cosnole.log(message) // 2017.12.30国际巨星刘德华将在上海东方体育中心开个人演唱会！" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> name = <span class="hljs-string">'刘德华'</span>
<span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">time</span> = <span class="hljs-string">'2017.12.30'</span>
<span class="hljs-selector-tag">var</span> addr = <span class="hljs-string">'上海东方体育中心'</span>

<span class="hljs-selector-tag">var</span> message = `${time}国际巨星${name}将在${addr}开个人演唱会`

cosnole.log(message) <span class="hljs-comment">// 2017.12.30国际巨星刘德华将在上海东方体育中心开个人演唱会！</span></code></pre>
<ul><li>在ES6中反引号还有一个好用的点，是多行字符串</li></ul>
<p>正常我们想拼接多行字符串，往往是在后面加上<code>\n</code>,在ES6中我们可以直接在反引号里面换行，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = `这是
一个
多行
字符串`

console.log(str)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> str = <span class="hljs-string">`这是
一个
多行
字符串`</span>

<span class="hljs-built_in">console</span>.log(str)</code></pre>
<ol><li>操作字符串(js内置的一些字符串的操作函数和属性)</li></ol>
<ul><li>获取字符串长度(length)</li></ul>
<blockquote><p>length // 这个是属性，其他的是方法</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = 'sfjhhgsd'

str.length // 获取字符串长度  8" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> str = <span class="hljs-string">'sfjhhgsd'</span>

str<span class="hljs-selector-class">.length</span> <span class="hljs-comment">// 获取字符串长度  8</span></code></pre>
<ul><li>获取某个位置的字符串，使用字符串的索引</li></ul>
<blockquote><p>字符串的的索引是从0开始</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = 'hello world'

str[0]  // h
str[4]  // o
str[6]  // w
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>var <span class="hljs-keyword">str</span> = <span class="hljs-string">'hello world'</span>

<span class="hljs-keyword">str</span>[<span class="hljs-number">0</span>]  <span class="hljs-comment">// h</span>
<span class="hljs-keyword">str</span>[<span class="hljs-number">4</span>]  <span class="hljs-comment">// o</span>
<span class="hljs-keyword">str</span>[<span class="hljs-number">6</span>]  <span class="hljs-comment">// w</span>
</code></pre>
<ul><li>需要特别注意的是，字符串是不可变的，如果对字符串的某个索引赋值，不会有任何错误，但是，也没有任何效果：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var s = 'Test';
s[0] = 'X';
console.log(s); // s仍然为'Test'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> s = <span class="hljs-string">'Test'</span>;
s[<span class="hljs-number">0</span>] = <span class="hljs-string">'X'</span>;
<span class="hljs-built_in">console</span>.log(s); <span class="hljs-comment">// s仍然为'Test'</span></code></pre>
<ul><li>字符串大小写转换</li></ul>
<blockquote><p>toUpperCase() 把一个字符串全部转换成大写,生成的是一个新字符串，原字符串并不会被修改</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = 'shdkhjfkj'

str.toUpperCase() // SHDKHJFKJ

console.log(str) // shdkhjfkj" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>var <span class="hljs-built_in">str</span> = <span class="hljs-string">'shdkhjfkj'</span>

<span class="hljs-built_in">str</span>.toUpperCase() <span class="hljs-comment">// SHDKHJFKJ</span>

console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">str</span>) <span class="hljs-comment">// shdkhjfkj</span></code></pre>
<blockquote><p>toLowerCase() 把一个字符串全部转换为小写,同样的也是不会去修改元字符串，会生成一个新的字符串</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = 'SDGSGDHD'

str.toLowerCase() // sdgsgdhd
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>var <span class="hljs-keyword">str</span> = <span class="hljs-string">'SDGSGDHD'</span>

<span class="hljs-keyword">str</span>.toLowerCase() <span class="hljs-comment">// sdgsgdhd</span>
</code></pre>
<ul><li>搜索某个字符串出现的位置</li></ul>
<blockquote><p>indexOf() 会搜索指定字符串第一次出现的位置,当要搜索的字符串不存在该字符串时会返回<code>-1</code></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = 'hsfhshlkjhkg'

str.indexOf('a') // 不存在a,返回 -1 

str.indexOf('s') // 第一次出现的索引位置是 1 ，第一个字符串索引为0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>var <span class="hljs-keyword">str</span> = <span class="hljs-string">'hsfhshlkjhkg'</span>

<span class="hljs-keyword">str</span>.indexOf(<span class="hljs-string">'a'</span>) <span class="hljs-comment">// 不存在a,返回 -1 </span>

<span class="hljs-keyword">str</span>.indexOf(<span class="hljs-string">'s'</span>) <span class="hljs-comment">// 第一次出现的索引位置是 1 ，第一个字符串索引为0</span></code></pre>
<ul><li>截取指定区间的字符串</li></ul>
<blockquote><p>substring() 返回指定索引区间的子串，不会修改原字符串</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = &quot;hello world&quot;

str.substring(1,4) // 从索引1开始到4（不包括4），返回 'ell'

str.substring(7) // 从索引7开始到结束，返回'world'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>var <span class="hljs-keyword">str</span> = <span class="hljs-string">"hello world"</span>

<span class="hljs-keyword">str</span>.substring(<span class="hljs-number">1</span>,<span class="hljs-number">4</span>) <span class="hljs-comment">// 从索引1开始到4（不包括4），返回 'ell'</span>

<span class="hljs-keyword">str</span>.substring(<span class="hljs-number">7</span>) <span class="hljs-comment">// 从索引7开始到结束，返回'world'</span></code></pre>
<ul><li>将指定符号分隔的字符串转成数组，类似PHP中的explode()</li></ul>
<blockquote><p>split() 方法用于把一个字符串分割成字符串数组</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = 'saboran,18,shanhai,phper'

str.split(',') // 将使用英文逗号分隔的字符串转成数组 [&quot;saboran&quot;, &quot;18&quot;, &quot;shanhai&quot;, &quot;phper&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>var str = <span class="hljs-string">'saboran,18,shanhai,phper'</span>

str.split(<span class="hljs-string">','</span>) <span class="hljs-regexp">//</span> 将使用英文逗号分隔的字符串转成数组 [<span class="hljs-string">"saboran"</span>, <span class="hljs-string">"18"</span>, <span class="hljs-string">"shanhai"</span>, <span class="hljs-string">"phper"</span>]</code></pre>
<h4>数组Array</h4>
<ol><li>简介</li></ol>
<p>JavaScript的<code>Array</code>可以包含任意数据类型，并通过索引来访问每个元素。</p>
<p>一个重要的的点是：js里的数组只有索引数组，并没有PHP语言里的关联数组，就是说js的数组的键值的键只能是数字，不能是字符串。</p>
<ol><li>操作数组</li></ol>
<ul><li>length</li></ul>
<blockquote><p>要取得Array的长度，直接访问length属性</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,2,'tt',null,true]

arr.length // 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-string">'tt'</span>,null,true]

arr<span class="hljs-selector-class">.length</span> <span class="hljs-comment">// 5</span></code></pre>
<p>注意1：直接给Array的length赋一个新的值会导致Array大小的变化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,2,3]
arr.length // 3

arr.length = 6 // 将数组长度设置为6
arr // arr变为 [1, 2, 3, empty × 3]

arr.length = 2 // 将数组长度设置为2
arr // arr变为[1,2]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]
arr<span class="hljs-selector-class">.length</span> <span class="hljs-comment">// 3</span>

arr<span class="hljs-selector-class">.length</span> = <span class="hljs-number">6</span> <span class="hljs-comment">// 将数组长度设置为6</span>
arr <span class="hljs-comment">// arr变为 [1, 2, 3, empty × 3]</span>

arr<span class="hljs-selector-class">.length</span> = <span class="hljs-number">2</span> <span class="hljs-comment">// 将数组长度设置为2</span>
arr <span class="hljs-comment">// arr变为[1,2]</span></code></pre>
<p>Array可以通过索引把对应的元素修改为新的值，因此，对Array的索引进行赋值会直接修改这个Array</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = ['A', 'B', 'C']
arr[1] = 99
arr // arr现在变为['A', 99, 'C']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>var arr = [<span class="hljs-string">'A'</span>, <span class="hljs-string">'B'</span>, <span class="hljs-string">'C'</span>]
arr[<span class="hljs-number">1</span>] = <span class="hljs-number">99</span>
arr // arr现在变为[<span class="hljs-string">'A'</span>, <span class="hljs-number">99</span>, <span class="hljs-string">'C'</span>]</code></pre>
<p>注意2：如果通过索引赋值时，索引超过了范围，同样会引起Array大小的变化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1, 2, 3];
arr[5] = 'x';
arr; // arr变为[1, 2, 3, undefined, undefined, 'x']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
arr[<span class="hljs-number">5</span>] = 'x';
arr; <span class="hljs-comment">// arr变为[1, 2, 3, undefined, undefined, 'x']</span></code></pre>
<p>大多数其他编程语言不允许直接改变数组的大小，越界访问索引会报错。然而，JavaScript的Array却不会有任何错误。在编写代码时，不建议直接修改Array的大小，访问索引时要确保索引不会越界。</p>
<ul><li>indexOf()</li></ul>
<p>与String类似，Array也可以通过indexOf()来搜索一个指定的元素的位置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [10, 20, '30', 'xyz'];
arr.indexOf(10); // 元素10的索引为0
arr.indexOf(20); // 元素20的索引为1
arr.indexOf(30); // 元素30没有找到，返回-1
arr.indexOf('30'); // 元素'30'的索引为2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var arr = [<span class="hljs-number">10</span>, <span class="hljs-number">20</span>, '<span class="hljs-number">30</span>', 'xyz'];
arr.indexOf(<span class="hljs-number">10</span>); <span class="hljs-comment">// 元素10的索引为0</span>
arr.indexOf(<span class="hljs-number">20</span>); <span class="hljs-comment">// 元素20的索引为1</span>
arr.indexOf(<span class="hljs-number">30</span>); <span class="hljs-comment">// 元素30没有找到，返回-1</span>
arr.indexOf('<span class="hljs-number">30</span>'); <span class="hljs-comment">// 元素'30'的索引为2</span></code></pre>
<ul><li>slice()</li></ul>
<p>slice()就是对应String的substring()版本，它截取Array的部分元素，然后返回一个新的Array,slice()的起止参数包括开始索引，不包括结束索引</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
arr.slice(0, 3); // 从索引0开始，到索引3结束，但不包括索引3: ['A', 'B', 'C']
arr.slice(3); // 从索引3开始到结束: ['D', 'E', 'F', 'G']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>var arr = [<span class="hljs-string">'A'</span>, <span class="hljs-string">'B'</span>, <span class="hljs-string">'C'</span>, <span class="hljs-string">'D'</span>, <span class="hljs-string">'E'</span>, <span class="hljs-string">'F'</span>, <span class="hljs-string">'G'</span>];
arr.slice(<span class="hljs-number">0</span>, <span class="hljs-number">3</span>); // 从索引<span class="hljs-number">0</span>开始，到索引<span class="hljs-number">3</span>结束，但不包括索引<span class="hljs-number">3</span>: [<span class="hljs-string">'A'</span>, <span class="hljs-string">'B'</span>, <span class="hljs-string">'C'</span>]
arr.slice(<span class="hljs-number">3</span>); // 从索引<span class="hljs-number">3</span>开始到结束: [<span class="hljs-string">'D'</span>, <span class="hljs-string">'E'</span>, <span class="hljs-string">'F'</span>, <span class="hljs-string">'G'</span>]</code></pre>
<p>如果不给slice()传递任何参数，它就会从头到尾截取所有元素。利用这一点，我们可以很容易地复制一个Array</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
var aCopy = arr.slice();
aCopy; // ['A', 'B', 'C', 'D', 'E', 'F', 'G']
aCopy === arr; // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cal"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">'A'</span>, <span class="hljs-string">'B'</span>, <span class="hljs-string">'C'</span>, <span class="hljs-string">'D'</span>, <span class="hljs-string">'E'</span>, <span class="hljs-string">'F'</span>, <span class="hljs-string">'G'</span>];
<span class="hljs-keyword">var</span> aCopy = arr.slice();
aCopy; // [<span class="hljs-string">'A'</span>, <span class="hljs-string">'B'</span>, <span class="hljs-string">'C'</span>, <span class="hljs-string">'D'</span>, <span class="hljs-string">'E'</span>, <span class="hljs-string">'F'</span>, <span class="hljs-string">'G'</span>]
aCopy === arr; // <span class="hljs-literal">false</span></code></pre>
<ul><li>push()和pop()</li></ul>
<p>push()向Array的末尾添加若干元素，pop()则把Array的最后一个元素删除掉</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1, 2];
arr.push('A', 'B'); // 返回Array新的长度: 4
arr; // [1, 2, 'A', 'B']
arr.pop(); // pop()返回'B'
arr; // [1, 2, 'A']
arr.pop(); arr.pop(); arr.pop(); // 连续pop 3次
arr; // []
arr.pop(); // 空数组继续pop不会报错，而是返回undefined
arr; // []" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code>var arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>];
arr.<span class="hljs-keyword">push</span>(<span class="hljs-string">'A'</span>, <span class="hljs-string">'B'</span>); <span class="hljs-comment">// 返回Array新的长度: 4</span>
arr; <span class="hljs-comment">// [1, 2, 'A', 'B']</span>
arr.<span class="hljs-keyword">pop</span>(); <span class="hljs-comment">// pop()返回'B'</span>
arr; <span class="hljs-comment">// [1, 2, 'A']</span>
arr.<span class="hljs-keyword">pop</span>(); arr.<span class="hljs-keyword">pop</span>(); arr.<span class="hljs-keyword">pop</span>(); <span class="hljs-comment">// 连续pop 3次</span>
arr; <span class="hljs-comment">// []</span>
arr.<span class="hljs-keyword">pop</span>(); <span class="hljs-comment">// 空数组继续pop不会报错，而是返回undefined</span>
arr; <span class="hljs-comment">// []</span></code></pre>
<ul><li>unshift()和shift()</li></ul>
<p>如果要往Array的头部添加若干元素，使用unshift()方法，shift()方法则把Array的第一个元素删掉</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1, 2];
arr.unshift('A', 'B'); // 返回Array新的长度: 4
arr; // ['A', 'B', 1, 2]
arr.shift(); // 'A'
arr; // ['B', 1, 2]
arr.shift(); arr.shift(); arr.shift(); // 连续shift 3次
arr; // []
arr.shift(); // 空数组继续shift不会报错，而是返回undefined
arr; // []" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>var arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>];
arr.unshift(<span class="hljs-string">'A'</span>, <span class="hljs-string">'B'</span>); <span class="hljs-regexp">//</span> 返回Array新的长度: <span class="hljs-number">4</span>
arr; <span class="hljs-regexp">//</span> [<span class="hljs-string">'A'</span>, <span class="hljs-string">'B'</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>]
arr.shift(); <span class="hljs-regexp">//</span> <span class="hljs-string">'A'</span>
arr; <span class="hljs-regexp">//</span> [<span class="hljs-string">'B'</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>]
arr.shift(); arr.shift(); arr.shift(); <span class="hljs-regexp">//</span> 连续shift <span class="hljs-number">3</span>次
arr; <span class="hljs-regexp">//</span> []
arr.shift(); <span class="hljs-regexp">//</span> 空数组继续shift不会报错，而是返回undefined
arr; <span class="hljs-regexp">//</span> []</code></pre>
<ul><li>sort()</li></ul>
<p>sort()可以对当前Array进行排序，它会直接修改当前Array的元素位置，直接调用时，按照默认顺序排序</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = ['B', 'C', 'A'];
arr.sort();
arr; // ['A', 'B', 'C']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>var arr = [<span class="hljs-string">'B'</span>, <span class="hljs-string">'C'</span>, <span class="hljs-string">'A'</span>];
arr.sort();
arr; // [<span class="hljs-string">'A'</span>, <span class="hljs-string">'B'</span>, <span class="hljs-string">'C'</span>]</code></pre>
<ul><li>reverse()</li></ul>
<p>reverse()把整个Array的元素给掉个个，也就是反转</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = ['one', 'two', 'three'];
arr.reverse(); 
arr; // ['three', 'two', 'one']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>var arr = [<span class="hljs-string">'one'</span>, <span class="hljs-string">'two'</span>, <span class="hljs-string">'three'</span>];
arr.reverse(); 
arr; // [<span class="hljs-string">'three'</span>, <span class="hljs-string">'two'</span>, <span class="hljs-string">'one'</span>]</code></pre>
<ul><li>concat()</li></ul>
<p>concat()方法把当前的Array和另一个Array连接起来，并返回一个新的Array</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = ['A', 'B', 'C'];
var added = arr.concat([1, 2, 3]);
added; // ['A', 'B', 'C', 1, 2, 3]
arr; // ['A', 'B', 'C']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>var arr = [<span class="hljs-string">'A'</span>, <span class="hljs-string">'B'</span>, <span class="hljs-string">'C'</span>];
var added = arr.concat([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);
added; // [<span class="hljs-string">'A'</span>, <span class="hljs-string">'B'</span>, <span class="hljs-string">'C'</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]
arr; // [<span class="hljs-string">'A'</span>, <span class="hljs-string">'B'</span>, <span class="hljs-string">'C'</span>]</code></pre>
<p>注意：请注意，concat()方法并没有修改当前Array，而是返回了一个新的Array</p>
<ul><li>join() // 这个类似PHP的implode()</li></ul>
<p>join()方法是一个非常实用的方法，它把当前Array的每个元素都用指定的字符串连接起来，然后返回连接后的字符串，类似PHP中的implode()</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = ['A', 'B', 'C', 1, 2, 3];
arr.join('-'); // 'A-B-C-1-2-3'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">'A'</span>, <span class="hljs-string">'B'</span>, <span class="hljs-string">'C'</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
arr.<span class="hljs-keyword">join</span>(<span class="hljs-string">'-'</span>); <span class="hljs-comment">// 'A-B-C-1-2-3'</span></code></pre>
<ul><li>splice() // 这个有点复杂有点绕，可以不讲</li></ul>
<p>splice()方法是修改Array的“万能方法”，它可以从指定的索引开始删除若干元素，然后再从该位置添加若干元素</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = ['Microsoft', 'Apple', 'Yahoo', 'AOL', 'Excite', 'Oracle'];
// 从索引2开始删除3个元素,然后再添加两个元素:
arr.splice(2, 3, 'Google', 'Facebook'); // 返回删除的元素 ['Yahoo', 'AOL', 'Excite']
arr; // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']
// 只删除,不添加:
arr.splice(2, 2); // ['Google', 'Facebook']
arr; // ['Microsoft', 'Apple', 'Oracle']
// 只添加,不删除:
arr.splice(2, 0, 'Google', 'Facebook'); // 返回[],因为没有删除任何元素
arr; // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>var arr = [<span class="hljs-string">'Microsoft'</span>, <span class="hljs-string">'Apple'</span>, <span class="hljs-string">'Yahoo'</span>, <span class="hljs-string">'AOL'</span>, <span class="hljs-string">'Excite'</span>, <span class="hljs-string">'Oracle'</span>];
<span class="hljs-regexp">//</span> 从索引<span class="hljs-number">2</span>开始删除<span class="hljs-number">3</span>个元素,然后再添加两个元素:
arr.splice(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-string">'Google'</span>, <span class="hljs-string">'Facebook'</span>); <span class="hljs-regexp">//</span> 返回删除的元素 [<span class="hljs-string">'Yahoo'</span>, <span class="hljs-string">'AOL'</span>, <span class="hljs-string">'Excite'</span>]
arr; <span class="hljs-regexp">//</span> [<span class="hljs-string">'Microsoft'</span>, <span class="hljs-string">'Apple'</span>, <span class="hljs-string">'Google'</span>, <span class="hljs-string">'Facebook'</span>, <span class="hljs-string">'Oracle'</span>]
<span class="hljs-regexp">//</span> 只删除,不添加:
arr.splice(<span class="hljs-number">2</span>, <span class="hljs-number">2</span>); <span class="hljs-regexp">//</span> [<span class="hljs-string">'Google'</span>, <span class="hljs-string">'Facebook'</span>]
arr; <span class="hljs-regexp">//</span> [<span class="hljs-string">'Microsoft'</span>, <span class="hljs-string">'Apple'</span>, <span class="hljs-string">'Oracle'</span>]
<span class="hljs-regexp">//</span> 只添加,不删除:
arr.splice(<span class="hljs-number">2</span>, <span class="hljs-number">0</span>, <span class="hljs-string">'Google'</span>, <span class="hljs-string">'Facebook'</span>); <span class="hljs-regexp">//</span> 返回[],因为没有删除任何元素
arr; <span class="hljs-regexp">//</span> [<span class="hljs-string">'Microsoft'</span>, <span class="hljs-string">'Apple'</span>, <span class="hljs-string">'Google'</span>, <span class="hljs-string">'Facebook'</span>, <span class="hljs-string">'Oracle'</span>]</code></pre>
<ol><li>为js数组添加自己的方法</li></ol>
<p><code>Array.prototype</code>属性表示 Array 构造函数的原型，并允许我们向所有Array对象添加新的属性和方法。<br>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
 * 如JavaScript数组本身不提供 first() 方法，
 * 我们可以添加一个返回数组的第一个元素的新方法
 */ 

if(!Array.prototype.first) {
    Array.prototype.first = function() {
        return this[0];
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/*
 * 如JavaScript数组本身不提供 first() 方法，
 * 我们可以添加一个返回数组的第一个元素的新方法
 */</span> 

<span class="hljs-keyword">if</span>(!<span class="hljs-built_in">Array</span>.prototype.first) {
    <span class="hljs-built_in">Array</span>.prototype.first = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>[<span class="hljs-number">0</span>];
    }
}</code></pre>
<p>在实际项目中经常用到通过数组的索引删除数组的元素就可以给数组增加一个方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.removeByIndex = function (index) {
  if (index > -1) {
    // 通过splice去除传入的索引及对应的值
    this.splice(index, 1)
  }
}

// 调用
var arr = ['red','pink','blue']

arr.removeByIndex(1)

// 执行之后的arr的值就等于['red','blue']
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Array</span>.prototype.removeByIndex = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">index</span>) </span>{
  <span class="hljs-keyword">if</span> (index &gt; <span class="hljs-number">-1</span>) {
    <span class="hljs-comment">// 通过splice去除传入的索引及对应的值</span>
    <span class="hljs-keyword">this</span>.splice(index, <span class="hljs-number">1</span>)
  }
}

<span class="hljs-comment">// 调用</span>
<span class="hljs-keyword">var</span> arr = [<span class="hljs-string">'red'</span>,<span class="hljs-string">'pink'</span>,<span class="hljs-string">'blue'</span>]

arr.removeByIndex(<span class="hljs-number">1</span>)

<span class="hljs-comment">// 执行之后的arr的值就等于['red','blue']</span>
</code></pre>
<ol><li>数组的遍历</li></ol>
<ul><li>for循环</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = ['苹果','橘子','香蕉']

for (var i = 0; i < arr.length; i++) {
    console.log(i)
    console.log(arr[i])
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">'苹果'</span>,<span class="hljs-string">'橘子'</span>,<span class="hljs-string">'香蕉'</span>]

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
    <span class="hljs-built_in">console</span>.log(i)
    <span class="hljs-built_in">console</span>.log(arr[i])
}
</code></pre>
<ul><li>for...in</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = ['满天星','卡罗拉','薰衣草']

for (index in arr){
    console.log(index)
    console.log(arr[index])
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>var arr = [<span class="hljs-string">'满天星'</span>,<span class="hljs-string">'卡罗拉'</span>,<span class="hljs-string">'薰衣草'</span>]

<span class="hljs-keyword">for</span> (<span class="hljs-built_in">index</span> in arr){
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">index</span>)
    console.<span class="hljs-built_in">log</span>(arr[<span class="hljs-built_in">index</span>])
}</code></pre>
<ul><li>forEach</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = ['普罗旺斯','阿姆斯特丹','保加利亚']

arr.forEach(function(item,index){
    console.log(index)
    console.log(item)
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">'普罗旺斯'</span>,<span class="hljs-string">'阿姆斯特丹'</span>,<span class="hljs-string">'保加利亚'</span>]

arr.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item,index</span>)</span>{
    <span class="hljs-built_in">console</span>.log(index)
    <span class="hljs-built_in">console</span>.log(item)
})
</code></pre>
<ul><li>for...of</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = ['淮北','徐州','上海']

for(var item of arr){
    console.log(item)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">'淮北'</span>,<span class="hljs-string">'徐州'</span>,<span class="hljs-string">'上海'</span>]

<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> item <span class="hljs-keyword">of</span> arr){
    <span class="hljs-built_in">console</span>.log(item)
}</code></pre>
<h4>对象</h4>
<p>在JS中的对象就是一个以键值对形式存储属性的一个集合，每一个属性有一个特定的名称，并与名称相对应的值。其实这种关系是有一个专有名称的，我们可以称之为映射，当然对于对象来说，除了可以通过这种方式来保持自有属性，还可以通过继承的方式来获取继承属性。这种方式我们称作“原型式继承”。</p>
<ol><li>对象的创建</li></ol>
<ul><li>通过new 关键字</li></ul>
<p>当我们使用的new创建新的对象的时候，js解析器会分配一块内存空间，用以存放当前的对象的自有属性。之后解析器会给这一对象一个<code>_proto_</code>属性指向的原型对象内容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = new Object()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> obj = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>()</code></pre>
<ul><li>通过对象直接量声明</li></ul>
<p>对象直接量就是直接通过花括号包裹的键值对的形式来定义当前对象的。每两个值之间的通过逗号来进行分割。键和值之间通过冒号来分割。放解析器读取到当前的内容的时候会自动的生成一个对象的内容并把当前的对象存储在当前上下文中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">var</span> obj = {}</code></pre>
<ol><li>对象属性及操作</li></ol>
<ul><li>访问属性</li></ul>
<p>访问属性是通过.操作符完成的，但这要求属性名必须是一个有效的变量名。如果属性名包含特殊字符，就必须用''括起来.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 定义小明这个对象
var xiaoming = {
    name: '小明',
    birth: 1990,
    'middle-school': 'No.1 Middle School', // 因为middle-school 有中划线，所以键值都需要引号
    height: 1.70,
    weight: 65,
    score: null
}

// 访问属性

xiaoming.name // &quot;小明&quot;

// 因为`middle-school`不是有效的变量，在声明变量时需要使用`''`包住，访问属性时也不可以使用`.`操作符，必须用`['xxx']`来访问


xiaoming['middle-school'] //  No.1 Middle School" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// 定义小明这个对象</span>
<span class="hljs-selector-tag">var</span> xiaoming = {
    name: <span class="hljs-string">'小明'</span>,
    birth: <span class="hljs-number">1990</span>,
    <span class="hljs-string">'middle-school'</span>: <span class="hljs-string">'No.1 Middle School'</span>, <span class="hljs-comment">// 因为middle-school 有中划线，所以键值都需要引号</span>
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1.70</span>,
    weight: <span class="hljs-number">65</span>,
    score: null
}

<span class="hljs-comment">// 访问属性</span>

xiaoming<span class="hljs-selector-class">.name</span> <span class="hljs-comment">// "小明"</span>

<span class="hljs-comment">// 因为`middle-school`不是有效的变量，在声明变量时需要使用`''`包住，访问属性时也不可以使用`.`操作符，必须用`['xxx']`来访问</span>


xiaoming[<span class="hljs-string">'middle-school'</span>] <span class="hljs-comment">//  No.1 Middle School</span></code></pre>
<p>所以js对象属性的访问方式有两种，一种是使用<code>.</code>操作符，一种是使用类似PHP关联数组的访问方式,通过键名访问<code>abj.[xxx]</code></p>
<p>当访问一个不存在的属性不会报错，而是返回undefined</p>
<ul><li>属性赋值</li></ul>
<p>由于JavaScript的对象是动态类型，你可以自由地给一个对象添加或删除属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xiaoming = {}

xiaoming.name = '小明' 
xiaoming.age = 18
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> xiaoming = {}

xiaoming<span class="hljs-selector-class">.name</span> = <span class="hljs-string">'小明'</span> 
xiaoming<span class="hljs-selector-class">.age</span> = <span class="hljs-number">18</span>
</code></pre>
<ul><li>删除属性</li></ul>
<p>删除js对象的属性使用的是<code>delete</code>，返回布尔值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xiaoming = {
    name: '小明',
    age: 18
}

delete xiaoming.name // 删除小明的name属性" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> xiaoming = {
    name: <span class="hljs-string">'小明'</span>,
    age: <span class="hljs-number">18</span>
}

delete xiaoming<span class="hljs-selector-class">.name</span> <span class="hljs-comment">// 删除小明的name属性</span></code></pre>
<p>注意：删除一个对象中不存在的属性的时候并不会报错</p>
<h4>JavaScript对浏览器对象的获取和操作</h4>
<ol><li>window</li></ol>
<p>window对象不但充当全局作用域，而且表示浏览器窗口。</p>
<p>window对象有innerWidth和innerHeight属性，可以获取浏览器窗口的内部宽度和高度。内部宽高是指除去菜单栏、工具栏、边框等占位元素后，用于显示网页的净宽高。</p>
<p>对应的，还有一个outerWidth和outerHeight属性，可以获取浏览器窗口的整个宽高。</p>
<ol><li>navigator</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="navigator.appName：浏览器名称；
navigator.appVersion：浏览器版本；
navigator.language：浏览器设置的语言；
navigator.platform：操作系统类型；
navigator.userAgent：浏览器设定的User-Agent字符串" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">navigator</span><span class="hljs-selector-class">.appName</span>：浏览器名称；
<span class="hljs-selector-tag">navigator</span><span class="hljs-selector-class">.appVersion</span>：浏览器版本；
<span class="hljs-selector-tag">navigator</span><span class="hljs-selector-class">.language</span>：浏览器设置的语言；
<span class="hljs-selector-tag">navigator</span><span class="hljs-selector-class">.platform</span>：操作系统类型；
<span class="hljs-selector-tag">navigator</span><span class="hljs-selector-class">.userAgent</span>：浏览器设定的<span class="hljs-selector-tag">User-Agent</span>字符串</code></pre>
<ol><li>screen</li></ol>
<p>screen对象表示屏幕的信息，常用的属性有</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="screen.width：屏幕宽度，以像素为单位；
screen.height：屏幕高度，以像素为单位；
screen.colorDepth：返回颜色位数，如8、16、24。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">screen</span><span class="hljs-selector-class">.width</span>：屏幕宽度，以像素为单位；
<span class="hljs-selector-tag">screen</span><span class="hljs-selector-class">.height</span>：屏幕高度，以像素为单位；
<span class="hljs-selector-tag">screen</span><span class="hljs-selector-class">.colorDepth</span>：返回颜色位数，如8、16、24。</code></pre>
<ol><li>location // 比较重要</li></ol>
<p>location对象表示当前页面的URL信息。例如，一个完整的URL可以用location.href获取</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="location.href" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">location</span><span class="hljs-selector-class">.href</span></code></pre>
<p>location常用的方法</p>
<ul><li>location.href</li></ul>
<p>当不给值时，location.href获取的是当前url信息，当给location.href一个值，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="location.href = 'http://www.baidu.com'  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">location<span class="hljs-selector-class">.href</span> = <span class="hljs-string">'http://www.baidu.com'</span>  </code></pre>
<p>将会跳转到这个地址的页面</p>
<ul><li>location.reload()</li></ul>
<p>刷新当前页面</p>
<ul><li>location.assign(path)</li></ul>
<p>加载一个新页面,path为页面地址</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript基础拾遗

## 原文链接
[https://segmentfault.com/a/1190000012391369](https://segmentfault.com/a/1190000012391369)

