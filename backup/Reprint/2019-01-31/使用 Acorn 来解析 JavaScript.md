---
title: '使用 Acorn 来解析 JavaScript' 
date: 2019-01-31 2:31:16
hidden: true
slug: xsqpe8tk059
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">Talk</h2>
<p>因为最近工作上有需要使用解析 JavaScript 的代码，大部分情况使用正则表达式匹配就可以处理，但是一旦依赖于代码上下文的内容时，正则或者简单的字符解析就很力不从心了，这个时候需要一个语言解析器来获取整一个 AST（abstract syntax tree）。</p>
<p>然后我找到了多个使用 JavaScript 编写的 JavaScript 解析器：</p>
<ul>
<li><p><a href="https://github.com/jquery/esprima" rel="nofollow noreferrer" target="_blank">Esprima</a></p></li>
<li><p><a href="https://github.com/ternjs/acorn" rel="nofollow noreferrer" target="_blank">Acorn</a></p></li>
<li><p><a href="https://github.com/mishoo/UglifyJS2" rel="nofollow noreferrer" target="_blank">UglifyJS 2</a></p></li>
<li><p><a href="https://github.com/shapesecurity/shift-parser-js" rel="nofollow noreferrer" target="_blank">Shift</a></p></li>
</ul>
<p>从提交记录来看，维护情况都蛮好的，ES 各种发展的特性都跟得上，我分别都简单了解了一下，聊聊他们的一些情况。</p>
<p>Esprima 是很经典的一个解析器，Acorn 在它之后诞生，都是几年前的事情了。按照 Acorn 作者的说法，当时造这个轮子更多只是好玩，速度可以和 Esprima 媲美，但是实现代码更少。其中比较关键的点是这两个解析器出来的 AST 结果（对，只是 AST，tokens 不一样）都是符合 <a href="https://github.comb/estree/estree" rel="nofollow noreferrer" target="_blank">The Estree Spec</a> 规范（这是 Mozilla 的工程师给出的 SpiderMonkey 引擎输出的 JavaScript AST 的规范文档，也可以参考：<a href="https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API" rel="nofollow noreferrer" target="_blank">SpiderMonkey in MDN</a>）的，也就是得到的结果在很大部分上是兼容的。</p>
<p>现在很出名的 Webpack 解析代码时用的也是 Acorn。</p>
<p>至于 Uglify，很出名的一个 JavaScript 代码压缩器，其实它自带了一个代码解析器，也可以输出 AST，但是它的功能更多还是用于压缩代码，如果拿来解析代码感觉不够纯粹。</p>
<p>Shift 这个没做多少了解，只知道他定义了自己的一套 AST 规范。</p>
<p>Esprima 官网上有一个<a href="http://esprima.org/test/compare.html" rel="nofollow noreferrer" target="_blank">性能测试</a>，我在 chrome 上跑的结果如下：</p>
<p>&lt;img src="<a href="http://ww1.sinaimg.cn/large/006tNc79gw1f9du3kfvqcj30q707lwfl.jpg%22" rel="nofollow noreferrer" target="_blank">http://ww1.sinaimg.cn/large/0...</a> alt="性能测试" style="width:100%;"&gt;</p>
<p>可见，Acorn 的性能很不错，而且还有一个 Estree 的规范呢（规范很重要，我个人觉得遵循通用的规范是代码复用的重要基础），所以我就直接选用 Acorn 来做代码解析了。</p>
<blockquote><p>图中做性能对比的还有 Google 的 Traceur，它更多是一个 ES6 to ES5 的 compiler，于我们想要找的解析器定位不符。</p></blockquote>
<p>下面进入正题，如何使用 Acorn 来解析 JavaScript。</p>
<h2 id="articleHeader1">API</h2>
<p>解析器的 API 都是很简单的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ast = acorn.parse(code, options)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> ast = acorn.parse(code, options)</code></pre>
<p>Acorn 的配置项蛮多的，里边还包括了一些事件可以设置回调函数。我们挑几个比较重要的讲下：</p>
<ul>
<li><p><strong>ecmaVersion</strong>  <br>字面意义，很好理解，就是设置你要解析的 JavaScript 的 ECMA 版本。默认是 ES7。</p></li>
<li><p><strong>sourceType</strong>  <br>这个配置项有两个值：<code>module</code> 和 <code>script</code>，默认是 <code>script</code>。</p></li>
</ul>
<p>主要是严格模式和 <code>import/export</code> 的区别。ES6 中的模块是严格模式，也就是你无须添加 <code>use strict</code>。我们通常浏览器中使用的 script 是没有 <code>import/export</code> 语法的。  <br>所以，选择了 <code>script</code> 则出现 <code>import/export</code> 会报错，可以使用严格模式声明，选择了 <code>module</code>，则不用严格模式声明，可以使用 <code>import/export</code> 语法。</p>
<ul>
<li><p><strong>locations</strong>  <br>默认值是 <code>false</code>，设置为 <code>true</code> 之后会在 AST 的节点中携带多一个 <code>loc</code> 对象来表示当前的开始和结束的行数和列数。</p></li>
<li><p><strong>onComment</strong>  <br>传入一个回调函数，每当解析到代码中的注释时会触发，可以获取当年注释内容，参数列表是：<code>[block, text, start, end]</code>。</p></li>
</ul>
<p><code>block</code> 表示是否是块注释，<code>text</code> 是注释内容，<code>start</code> 和 <code>end</code> 是注释开始和结束的位置。</p>
<blockquote><p>上边提及的 Espree 需要 Esprima 的 <code>attachComment</code> 的配置项，设置为 true 后，Esprima 会在代码解析结果的节点中携带注释相关信息（<code>trailingComments</code> 和 <code>leadingComments</code>）。Espree 则是利用 Acorn 的 <code>onComment</code> 配置来实现这个 Esprima 特性的兼容。</p></blockquote>
<p>解析器通常还会有一个获取词法分析结果的接口：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const tokens = [...acorn.tokenizer(code, options)]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> tokens = [...acorn.tokenizer(code, options)]</code></pre>
<p><code>tokenizer</code> 方法的第二个参数也能够配置 <code>locations</code>。  </p>
<p>词法结果 token 和 Esprima 的结果数据结构上有一定的区别（Espree 又是做了这一层的兼容），有兴趣了解的可以看下 Esprima 的解析结果：<a href="http://esprima.org/demo/parse.html" rel="nofollow noreferrer" target="_blank">http://esprima.org/demo/parse...</a> 。</p>
<p>至于 Acorn 解析的 AST 和 token 的内容我们接下来详述。</p>
<h2 id="articleHeader2">Token</h2>
<p>我找了半天，没找到关于 token 数据结构的详细介绍，只能自己动手来看一下了。</p>
<p>我用来测试解析的代码是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import &quot;hello.js&quot;

var a = 2;

// test
function name() { console.log(arguments); }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> <span class="hljs-string">"hello.js"</span>

<span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>;

<span class="hljs-comment">// test</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">name</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">arguments</span>); }</code></pre>
<p>解析出来的 token 数组是一个个类似这样的对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Token {
    type:
     TokenType {
       label: 'import',
       keyword: 'import',
       beforeExpr: false,
       startsExpr: false,
       isLoop: false,
       isAssign: false,
       prefix: false,
       postfix: false,
       binop: null,
       updateContext: null },
    value: 'import',
    start: 5,
    end: 11 }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Token {
    <span class="hljs-attr">type</span>:
     TokenType {
       <span class="hljs-attr">label</span>: <span class="hljs-string">'import'</span>,
       <span class="hljs-attr">keyword</span>: <span class="hljs-string">'import'</span>,
       <span class="hljs-attr">beforeExpr</span>: <span class="hljs-literal">false</span>,
       <span class="hljs-attr">startsExpr</span>: <span class="hljs-literal">false</span>,
       <span class="hljs-attr">isLoop</span>: <span class="hljs-literal">false</span>,
       <span class="hljs-attr">isAssign</span>: <span class="hljs-literal">false</span>,
       <span class="hljs-attr">prefix</span>: <span class="hljs-literal">false</span>,
       <span class="hljs-attr">postfix</span>: <span class="hljs-literal">false</span>,
       <span class="hljs-attr">binop</span>: <span class="hljs-literal">null</span>,
       <span class="hljs-attr">updateContext</span>: <span class="hljs-literal">null</span> },
    <span class="hljs-attr">value</span>: <span class="hljs-string">'import'</span>,
    <span class="hljs-attr">start</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">end</span>: <span class="hljs-number">11</span> },</code></pre>
<p>看上去其实很好理解对不对，在 <code>type</code> 对应的对象中，<code>label</code> 表示当前标识的一个类型，<code>keyword</code> 就是关键词，像例子中的 <code>import</code>，或者 <code>function</code> 之类的。</p>
<p><code>value</code> 则是当前标识的值，<code>start/end</code> 分别是开始和结束的位置。</p>
<p>通常我们需要关注的就是 <code>label/keyword/value</code> 这些了。其他的详细可以参考源码：<a href="https://github.com/ternjs/acorn/blob/master/src/tokentype.js" rel="nofollow noreferrer" target="_blank">tokentype.js</a>。</p>
<h2 id="articleHeader3">The Estree Spec</h2>
<p>这一部分是重头戏，因为实际上我需要的还是解析出来的 AST。最原滋原味的内容来自于：<a href="https://github.com/estree/estree" rel="nofollow noreferrer" target="_blank">The Estree Spec</a>，我只是阅读了之后的搬运工。</p>
<p>提供了标准文档的好处是，很多东西有迹可循，这里还有一个工具，用于把满足 Estree 标准的 AST 转换为 ESMAScript 代码：<a href="https://github.com/estools/escodegen" rel="nofollow noreferrer" target="_blank">escodegen</a>。</p>
<p>好吧，回到正题，我们先来看一下 ES5 的部分，可以在 <a href="http://esprima.org/demo/parse.html" rel="nofollow noreferrer" target="_blank">Esprima: Parser</a> 这个页面测试各种代码的解析结果。</p>
<p>符合这个规范的解析出来的 AST 节点用 <code>Node</code> 对象来标识，<code>Node</code> 对象应该符合这样的接口：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Node {
    type: string;
    loc: SourceLocation | null;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface Node {
    <span class="hljs-attr">type</span>: string;
    loc: SourceLocation | <span class="hljs-literal">null</span>;
}</code></pre>
<p><code>type</code> 字段表示不同的节点类型，下边会再讲一下各个类型的情况，分别对应了 JavaScript 中的什么语法。<br><code>loc</code> 字段表示源码的位置信息，如果没有相关信息的话为 <code>null</code>，否则是一个对象，包含了开始和结束的位置。接口如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface SourceLocation {
    source: string | null;
    start: Position;
    end: Position;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface SourceLocation {
    <span class="hljs-attr">source</span>: string | <span class="hljs-literal">null</span>;
    start: Position;
    end: Position;
}</code></pre>
<p>这里的 <code>Position</code> 对象包含了行和列的信息，行从 1 开始，列从 0 开始：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Position {
    line: number; // >= 1
    column: number; // >= 0
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface Position {
    <span class="hljs-attr">line</span>: number; <span class="hljs-comment">// &gt;= 1</span>
    column: number; <span class="hljs-comment">// &gt;= 0</span>
}</code></pre>
<p>好了，基础部分就是这样，接下来看各种类型的节点，顺带温习一下 JavaScript 语法的一些东西吧。对于这里每一部分的内容，会简单谈一下，但不会展开（内容不少），对 JavaScript 了解的人很容易就明白的。</p>
<blockquote><p>我觉得看完就像把 JavaScript 的基础语法整理了一遍。</p></blockquote>
<h3 id="articleHeader4">Identifier</h3>
<p>标识符，我觉得应该是这么叫的，就是我们写 JS 时自定义的名称，如变量名，函数名，属性名，都归为标识符。相应的接口是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Identifier <: Expression, Pattern {
    type: &quot;Identifier&quot;;
    name: string;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface Identifier &lt;: Expression, Pattern {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"Identifier"</span>;
    name: string;
}</code></pre>
<p>一个标识符可能是一个表达式，或者是解构的模式（ES6 中的解构语法）。我们等会会看到 <code>Expression</code> 和 <code>Pattern</code> 相关的内容的。</p>
<h3 id="articleHeader5">Literal</h3>
<p>字面量，这里不是指 <code>[]</code> 或者 <code>{}</code> 这些，而是本身语义就代表了一个值的字面量，如 <code>1</code>，<code>“hello”</code>, <code>true</code> 这些，还有正则表达式（有一个扩展的 <code>Node</code> 来表示正则表达式），如 <code>/d?/</code>。我们看一下文档的定义：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Literal <: Expression {
    type: &quot;Literal&quot;;
    value: string | boolean | null | number | RegExp;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface Literal &lt;: Expression {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"Literal"</span>;
    value: string | boolean | <span class="hljs-literal">null</span> | number | <span class="hljs-built_in">RegExp</span>;
}</code></pre>
<p><code>value</code> 这里即对应了字面量的值，我们可以看出字面量值的类型，字符串，布尔，数值，<code>null</code> 和正则。</p>
<h4>RegExpLiteral</h4>
<p>这个针对正则字面量的，为了更好地来解析正则表达式的内容，添加多一个 <code>regex</code> 字段，里边会包括正则本身，以及正则的 <code>flags</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface RegExpLiteral <: Literal {
  regex: {
    pattern: string;
    flags: string;
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface RegExpLiteral &lt;: Literal {
  <span class="hljs-attr">regex</span>: {
    <span class="hljs-attr">pattern</span>: string;
    flags: string;
  };
}</code></pre>
<h3 id="articleHeader6">Programs</h3>
<p>一般这个是作为跟节点的，即代表了一棵完整的程序代码树。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Program <: Node {
    type: &quot;Program&quot;;
    body: [ Statement ];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface Program &lt;: Node {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"Program"</span>;
    body: [ Statement ];
}</code></pre>
<p><code>body</code> 属性是一个数组，包含了多个 <code>Statement</code>（即语句）节点。</p>
<h3 id="articleHeader7">Functions</h3>
<p>函数声明或者函数表达式节点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Function <: Node {
    id: Identifier | null;
    params: [ Pattern ];
    body: BlockStatement;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface <span class="hljs-built_in">Function</span> &lt;: Node {
    <span class="hljs-attr">id</span>: Identifier | <span class="hljs-literal">null</span>;
    params: [ Pattern ];
    body: BlockStatement;
}</code></pre>
<p><code>id</code> 是函数名，<code>params</code> 属性是一个数组，表示函数的参数。<code>body</code> 是一个块语句。</p>
<p>有一个值得留意的点是，你在测试过程中，是不会找到 <code>type: "Function"</code> 的节点的，但是你可以找到 <code>type: "FunctionDeclaration"</code> 和 <code>type: "FunctionExpression"</code>，因为函数要么以声明语句出现，要么以函数表达式出现，都是节点类型的组合类型，后边会再提及 <code>FunctionDeclaration</code> 和 <code>FunctionExpression</code> 的相关内容。</p>
<p>这让人感觉这个文档规划得蛮细致的，函数名，参数和函数块是属于函数部分的内容，而声明或者表达式则有它自己需要的东西。</p>
<h3 id="articleHeader8">Statement</h3>
<p>语句节点没什么特别的，它只是一个节点，一种区分，但是语句有很多种，下边会详述。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Statement <: Node { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">interface Statement &lt;: Node { }</code></pre>
<h4>ExpressionStatement</h4>
<p>表达式语句节点，<code>a = a + 1</code> 或者 <code>a++</code> 里边会有一个 <code>expression</code> 属性指向一个表达式节点对象（后边会提及表达式）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface ExpressionStatement <: Statement {
    type: &quot;ExpressionStatement&quot;;
    expression: Expression;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface ExpressionStatement &lt;: Statement {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"ExpressionStatement"</span>;
    expression: Expression;
}</code></pre>
<h4>BlockStatement</h4>
<p>块语句节点，举个例子：<code>if (...) { // 这里是块语句的内容 }</code>，块里边可以包含多个其他的语句，所以有一个 <code>body</code> 属性，是一个数组，表示了块里边的多个语句。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface BlockStatement <: Statement {
    type: &quot;BlockStatement&quot;;
    body: [ Statement ];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface BlockStatement &lt;: Statement {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"BlockStatement"</span>;
    body: [ Statement ];
}</code></pre>
<h4>EmptyStatement</h4>
<p>一个空的语句节点，没有执行任何有用的代码，例如一个单独的分号 <code>;</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface EmptyStatement <: Statement {
    type: &quot;EmptyStatement&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface EmptyStatement &lt;: Statement {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"EmptyStatement"</span>;
}</code></pre>
<h4>DebuggerStatement</h4>
<p><code>debugger</code>，就是表示这个，没有其他了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface DebuggerStatement <: Statement {
    type: &quot;DebuggerStatement&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface DebuggerStatement &lt;: Statement {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"DebuggerStatement"</span>;
}</code></pre>
<h4>WithStatement</h4>
<p><code>with</code> 语句节点，里边有两个特别的属性，<code>object</code> 表示 <code>with</code> 要使用的那个对象（可以是一个表达式），<code>body</code> 则是对应 <code>with</code> 后边要执行的语句，一般会是一个块语句。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface WithStatement <: Statement {
    type: &quot;WithStatement&quot;;
    object: Expression;
    body: Statement;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface WithStatement &lt;: Statement {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"WithStatement"</span>;
    object: Expression;
    body: Statement;
}</code></pre>
<hr>
<p>下边是控制流的语句：</p>
<h4>ReturnStatement</h4>
<p>返回语句节点，<code>argument</code> 属性是一个表达式，代表返回的内容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface ReturnStatement <: Statement {
    type: &quot;ReturnStatement&quot;;
    argument: Expression | null;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface ReturnStatement &lt;: Statement {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"ReturnStatement"</span>;
    argument: Expression | <span class="hljs-literal">null</span>;
}</code></pre>
<h4>LabeledStatement</h4>
<p><code>label</code> 语句，平时可能会比较少接触到，举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="loop: for(let i = 0; i < len; i++) {
    // ...
    for (let j = 0; j < min; j++) {
        // ...
        break loop;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">loop: <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; len; i++) {
    <span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j &lt; min; j++) {
        <span class="hljs-comment">// ...</span>
        <span class="hljs-keyword">break</span> loop;
    }
}</code></pre>
<p>这里的 <code>loop</code> 就是一个 <code>label</code> 了，我们可以在循环嵌套中使用 <code>break loop</code> 来指定跳出哪个循环。所以这里的 <code>label</code> 语句指的就是 <code>loop: ...</code> 这个。</p>
<p>一个 <code>label</code> 语句节点会有两个属性，一个 <code>label</code> 属性表示 <code>label</code> 的名称，另外一个 <code>body</code> 属性指向对应的语句，通常是一个循环语句或者 <code>switch</code> 语句。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface LabeledStatement <: Statement {
    type: &quot;LabeledStatement&quot;;
    label: Identifier;
    body: Statement;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface LabeledStatement &lt;: Statement {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"LabeledStatement"</span>;
    label: Identifier;
    body: Statement;
}</code></pre>
<h4>BreakStatement</h4>
<p><code>break</code> 语句节点，会有一个 <code>label</code> 属性表示需要的 <code>label</code> 名称，当不需要 <code>label</code> 的时候（通常都不需要），便是 <code>null</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface BreakStatement <: Statement {
    type: &quot;BreakStatement&quot;;
    label: Identifier | null;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface BreakStatement &lt;: Statement {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"BreakStatement"</span>;
    label: Identifier | <span class="hljs-literal">null</span>;
}</code></pre>
<h4>ContinueStatement</h4>
<p><code>continue</code> 语句节点，和 <code>break</code> 类似。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface ContinueStatement <: Statement {
    type: &quot;ContinueStatement&quot;;
    label: Identifier | null;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface ContinueStatement &lt;: Statement {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"ContinueStatement"</span>;
    label: Identifier | <span class="hljs-literal">null</span>;
}</code></pre>
<hr>
<p>下边是条件语句：</p>
<h4>IfStatement</h4>
<p><code>if</code> 语句节点，很常见，会带有三个属性，<code>test</code> 属性表示 <code>if (...)</code> 括号中的表达式。</p>
<p><code>consequent</code> 属性是表示条件为 <code>true</code> 时的执行语句，通常会是一个块语句。</p>
<p><code>alternate</code> 属性则是用来表示 <code>else</code> 后跟随的语句节点，通常也会是块语句，但也可以又是一个 <code>if</code> 语句节点，即类似这样的结构：   <br><code>if (a) { //... } else if (b) { // ... }</code>。  <br><code>alternate</code> 当然也可以为 <code>null</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface IfStatement <: Statement {
    type: &quot;IfStatement&quot;;
    test: Expression;
    consequent: Statement;
    alternate: Statement | null;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface IfStatement &lt;: Statement {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"IfStatement"</span>;
    test: Expression;
    consequent: Statement;
    alternate: Statement | <span class="hljs-literal">null</span>;
}</code></pre>
<h4>SwitchStatement</h4>
<p><code>switch</code> 语句节点，有两个属性，<code>discriminant</code> 属性表示 <code>switch</code> 语句后紧随的表达式，通常会是一个变量，<code>cases</code> 属性是一个 <code>case</code> 节点的数组，用来表示各个 <code>case</code> 语句。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface SwitchStatement <: Statement {
    type: &quot;SwitchStatement&quot;;
    discriminant: Expression;
    cases: [ SwitchCase ];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface SwitchStatement &lt;: Statement {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"SwitchStatement"</span>;
    discriminant: Expression;
    cases: [ SwitchCase ];
}</code></pre>
<h5>SwitchCase</h5>
<p><code>switch</code> 的 <code>case</code> 节点。<code>test</code> 属性代表这个 <code>case</code> 的判断表达式，<code>consequent</code> 则是这个 <code>case</code> 的执行语句。</p>
<p>当 <code>test</code> 属性是 <code>null</code> 时，则是表示 <code>default</code> 这个 <code>case</code> 节点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface SwitchCase <: Node {
    type: &quot;SwitchCase&quot;;
    test: Expression | null;
    consequent: [ Statement ];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface SwitchCase &lt;: Node {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"SwitchCase"</span>;
    test: Expression | <span class="hljs-literal">null</span>;
    consequent: [ Statement ];
}</code></pre>
<hr>
<p>下边是异常相关的语句：</p>
<h4>ThrowStatement</h4>
<p><code>throw</code> 语句节点，<code>argument</code> 属性用以表示 <code>throw</code> 后边紧跟的表达式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface ThrowStatement <: Statement {
    type: &quot;ThrowStatement&quot;;
    argument: Expression;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface ThrowStatement &lt;: Statement {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"ThrowStatement"</span>;
    argument: Expression;
}</code></pre>
<h4>TryStatement</h4>
<p><code>try</code> 语句节点，<code>block</code> 属性表示 <code>try</code> 的执行语句，通常是一个块语句。</p>
<p><code>hanlder</code> 属性是指 <code>catch</code> 节点，<code>finalizer</code> 是指 <code>finally</code> 语句节点，当 <code>hanlder</code> 为 <code>null</code> 时，<code>finalizer</code> 必须是一个块语句节点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface TryStatement <: Statement {
    type: &quot;TryStatement&quot;;
    block: BlockStatement;
    handler: CatchClause | null;
    finalizer: BlockStatement | null;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface TryStatement &lt;: Statement {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"TryStatement"</span>;
    block: BlockStatement;
    handler: CatchClause | <span class="hljs-literal">null</span>;
    finalizer: BlockStatement | <span class="hljs-literal">null</span>;
}</code></pre>
<h5>CatchClause</h5>
<p><code>catch</code> 节点，<code>param</code> 用以表示 <code>catch</code> 后的参数，<code>body</code> 则表示 <code>catch</code> 后的执行语句，通常是一个块语句。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface CatchClause <: Node {
    type: &quot;CatchClause&quot;;
    param: Pattern;
    body: BlockStatement;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface CatchClause &lt;: Node {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"CatchClause"</span>;
    param: Pattern;
    body: BlockStatement;
}</code></pre>
<hr>
<p>下边是循环语句：</p>
<h4>WhileStatement</h4>
<p><code>while</code> 语句节点，<code>test</code> 表示括号中的表达式，<code>body</code> 是表示要循环执行的语句。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface WhileStatement <: Statement {
    type: &quot;WhileStatement&quot;;
    test: Expression;
    body: Statement;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface WhileStatement &lt;: Statement {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"WhileStatement"</span>;
    test: Expression;
    body: Statement;
}</code></pre>
<h4>DoWhileStatement</h4>
<p><code>do/while</code> 语句节点，和 <code>while</code> 语句类似。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface DoWhileStatement <: Statement {
    type: &quot;DoWhileStatement&quot;;
    body: Statement;
    test: Expression;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface DoWhileStatement &lt;: Statement {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"DoWhileStatement"</span>;
    body: Statement;
    test: Expression;
}</code></pre>
<h4>ForStatement</h4>
<p><code>for</code> 循环语句节点，属性 <code>init/test/update</code> 分别表示了 <code>for</code> 语句括号中的三个表达式，初始化值，循环判断条件，每次循环执行的变量更新语句（<code>init</code> 可以是变量声明或者表达式）。这三个属性都可以为 <code>null</code>，即 <code>for(;;){}</code>。  <br><code>body</code> 属性用以表示要循环执行的语句。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface ForStatement <: Statement {
    type: &quot;ForStatement&quot;;
    init: VariableDeclaration | Expression | null;
    test: Expression | null;
    update: Expression | null;
    body: Statement;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface ForStatement &lt;: Statement {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"ForStatement"</span>;
    init: VariableDeclaration | Expression | <span class="hljs-literal">null</span>;
    test: Expression | <span class="hljs-literal">null</span>;
    update: Expression | <span class="hljs-literal">null</span>;
    body: Statement;
}</code></pre>
<h4>ForInStatement</h4>
<p><code>for/in</code> 语句节点，<code>left</code> 和 <code>right</code> 属性分别表示在 <code>in</code> 关键词左右的语句（左侧可以是一个变量声明或者表达式）。<code>body</code> 依旧是表示要循环执行的语句。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface ForInStatement <: Statement {
    type: &quot;ForInStatement&quot;;
    left: VariableDeclaration |  Pattern;
    right: Expression;
    body: Statement;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface ForInStatement &lt;: Statement {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"ForInStatement"</span>;
    left: VariableDeclaration |  Pattern;
    right: Expression;
    body: Statement;
}</code></pre>
<h3 id="articleHeader9">Declarations</h3>
<p>声明语句节点，同样也是语句，只是一个类型的细化。下边会介绍各种声明语句类型。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Declaration <: Statement { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">interface Declaration &lt;: Statement { }</code></pre>
<h4>FunctionDeclaration</h4>
<p>函数声明，和之前提到的 Function 不同的是，<code>id</code> 不能为 <code>null</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface FunctionDeclaration <: Function, Declaration {
    type: &quot;FunctionDeclaration&quot;;
    id: Identifier;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface FunctionDeclaration &lt;: <span class="hljs-built_in">Function</span>, Declaration {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"FunctionDeclaration"</span>;
    id: Identifier;
}</code></pre>
<h4>VariableDeclaration</h4>
<p>变量声明，<code>kind</code> 属性表示是什么类型的声明，因为 ES6 引入了 <code>const/let</code>。<br><code>declarations</code> 表示声明的多个描述，因为我们可以这样：<code>let a = 1, b = 2;</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface VariableDeclaration <: Declaration {
    type: &quot;VariableDeclaration&quot;;
    declarations: [ VariableDeclarator ];
    kind: &quot;var&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface VariableDeclaration &lt;: Declaration {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"VariableDeclaration"</span>;
    declarations: [ VariableDeclarator ];
    kind: <span class="hljs-string">"var"</span>;
}</code></pre>
<h5>VariableDeclarator</h5>
<p>变量声明的描述，<code>id</code> 表示变量名称节点，<code>init</code> 表示初始值的表达式，可以为 <code>null</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface VariableDeclarator <: Node {
    type: &quot;VariableDeclarator&quot;;
    id: Pattern;
    init: Expression | null;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface VariableDeclarator &lt;: Node {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"VariableDeclarator"</span>;
    id: Pattern;
    init: Expression | <span class="hljs-literal">null</span>;
}</code></pre>
<h3 id="articleHeader10">Expressions</h3>
<p>表达式节点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Expression <: Node { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">interface Expression &lt;: Node { }</code></pre>
<h4>ThisExpression</h4>
<p>表示 <code>this</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface ThisExpression <: Expression {
    type: &quot;ThisExpression&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface ThisExpression &lt;: Expression {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"ThisExpression"</span>;
}</code></pre>
<h4>ArrayExpression</h4>
<p>数组表达式节点，<code>elements</code> 属性是一个数组，表示数组的多个元素，每一个元素都是一个表达式节点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface ArrayExpression <: Expression {
    type: &quot;ArrayExpression&quot;;
    elements: [ Expression | null ];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface ArrayExpression &lt;: Expression {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"ArrayExpression"</span>;
    elements: [ Expression | <span class="hljs-literal">null</span> ];
}</code></pre>
<h4>ObjectExpression</h4>
<p>对象表达式节点，<code>property</code> 属性是一个数组，表示对象的每一个键值对，每一个元素都是一个属性节点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface ObjectExpression <: Expression {
    type: &quot;ObjectExpression&quot;;
    properties: [ Property ];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface ObjectExpression &lt;: Expression {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"ObjectExpression"</span>;
    properties: [ Property ];
}</code></pre>
<h5>Property</h5>
<p>对象表达式中的属性节点。<code>key</code> 表示键，<code>value</code> 表示值，由于 ES5 语法中有 <code>get/set</code> 的存在，所以有一个 <code>kind</code> 属性，用来表示是普通的初始化，或者是 <code>get/set</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Property <: Node {
    type: &quot;Property&quot;;
    key: Literal | Identifier;
    value: Expression;
    kind: &quot;init&quot; | &quot;get&quot; | &quot;set&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface Property &lt;: Node {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"Property"</span>;
    key: Literal | Identifier;
    value: Expression;
    kind: <span class="hljs-string">"init"</span> | <span class="hljs-string">"get"</span> | <span class="hljs-string">"set"</span>;
}</code></pre>
<h4>FunctionExpression</h4>
<p>函数表达式节点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface FunctionExpression <: Function, Expression {
    type: &quot;FunctionExpression&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface FunctionExpression &lt;: <span class="hljs-built_in">Function</span>, Expression {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"FunctionExpression"</span>;
}</code></pre>
<hr>
<p>下边是一元运算符相关的表达式部分：</p>
<h4>UnaryExpression</h4>
<p>一元运算表达式节点（<code>++/--</code> 是 update 运算符，不在这个范畴内），<code>operator</code> 表示运算符，<code>prefix</code> 表示是否为前缀运算符。<code>argument</code> 是要执行运算的表达式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface UnaryExpression <: Expression {
    type: &quot;UnaryExpression&quot;;
    operator: UnaryOperator;
    prefix: boolean;
    argument: Expression;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface UnaryExpression &lt;: Expression {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"UnaryExpression"</span>;
    operator: UnaryOperator;
    prefix: boolean;
    argument: Expression;
}</code></pre>
<h5>UnaryOperator</h5>
<p>一元运算符，枚举类型，所有值如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="enum UnaryOperator {
    &quot;-&quot; | &quot;+&quot; | &quot;!&quot; | &quot;~&quot; | &quot;typeof&quot; | &quot;void&quot; | &quot;delete&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">enum UnaryOperator {
    <span class="hljs-string">"-"</span> | <span class="hljs-string">"+"</span> | <span class="hljs-string">"!"</span> | <span class="hljs-string">"~"</span> | <span class="hljs-string">"typeof"</span> | <span class="hljs-string">"void"</span> | <span class="hljs-string">"delete"</span>
}</code></pre>
<h4>UpdateExpression</h4>
<p>update 运算表达式节点，即 <code>++/--</code>，和一元运算符类似，只是 <code>operator</code> 指向的节点对象类型不同，这里是 update 运算符。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface UpdateExpression <: Expression {
    type: &quot;UpdateExpression&quot;;
    operator: UpdateOperator;
    argument: Expression;
    prefix: boolean;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface UpdateExpression &lt;: Expression {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"UpdateExpression"</span>;
    operator: UpdateOperator;
    argument: Expression;
    prefix: boolean;
}</code></pre>
<h5>UpdateOperator</h5>
<p>update 运算符，值为 <code>++</code> 或 <code>--</code>，配合 update 表达式节点的 <code>prefix</code> 属性来表示前后。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="enum UpdateOperator {
    &quot;++&quot; | &quot;--&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">enum UpdateOperator {
    <span class="hljs-string">"++"</span> | <span class="hljs-string">"--"</span>
}</code></pre>
<hr>
<p>下边是二元运算符相关的表达式部分：</p>
<h4>BinaryExpression</h4>
<p>二元运算表达式节点，<code>left</code> 和 <code>right</code> 表示运算符左右的两个表达式，<code>operator</code> 表示一个二元运算符。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface BinaryExpression <: Expression {
    type: &quot;BinaryExpression&quot;;
    operator: BinaryOperator;
    left: Expression;
    right: Expression;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface BinaryExpression &lt;: Expression {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"BinaryExpression"</span>;
    operator: BinaryOperator;
    left: Expression;
    right: Expression;
}</code></pre>
<h5>BinaryOperator</h5>
<p>二元运算符，所有值如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="enum BinaryOperator {
    &quot;==&quot; | &quot;!=&quot; | &quot;===&quot; | &quot;!==&quot;
         | &quot;<&quot; | &quot;<=&quot; | &quot;>&quot; | &quot;>=&quot;
         | &quot;<<&quot; | &quot;>>&quot; | &quot;>>>&quot;
         | &quot;+&quot; | &quot;-&quot; | &quot;*&quot; | &quot;/&quot; | &quot;%&quot;
         | &quot;|&quot; | &quot;^&quot; | &quot;&amp;&quot; | &quot;in&quot;
         | &quot;instanceof&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">enum BinaryOperator {
    <span class="hljs-string">"=="</span> | <span class="hljs-string">"!="</span> | <span class="hljs-string">"==="</span> | <span class="hljs-string">"!=="</span>
         | <span class="hljs-string">"&lt;"</span> | <span class="hljs-string">"&lt;="</span> | <span class="hljs-string">"&gt;"</span> | <span class="hljs-string">"&gt;="</span>
         | <span class="hljs-string">"&lt;&lt;"</span> | <span class="hljs-string">"&gt;&gt;"</span> | <span class="hljs-string">"&gt;&gt;&gt;"</span>
         | <span class="hljs-string">"+"</span> | <span class="hljs-string">"-"</span> | <span class="hljs-string">"*"</span> | <span class="hljs-string">"/"</span> | <span class="hljs-string">"%"</span>
         | <span class="hljs-string">"|"</span> | <span class="hljs-string">"^"</span> | <span class="hljs-string">"&amp;"</span> | <span class="hljs-string">"in"</span>
         | <span class="hljs-string">"instanceof"</span>
}</code></pre>
<h4>AssignmentExpression</h4>
<p>赋值表达式节点，<code>operator</code> 属性表示一个赋值运算符，<code>left</code> 和 <code>right</code> 是赋值运算符左右的表达式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface AssignmentExpression <: Expression {
    type: &quot;AssignmentExpression&quot;;
    operator: AssignmentOperator;
    left: Pattern | Expression;
    right: Expression;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface AssignmentExpression &lt;: Expression {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"AssignmentExpression"</span>;
    operator: AssignmentOperator;
    left: Pattern | Expression;
    right: Expression;
}</code></pre>
<h5>AssignmentOperator</h5>
<p>赋值运算符，所有值如下：（常用的并不多）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="enum AssignmentOperator {
    &quot;=&quot; | &quot;+=&quot; | &quot;-=&quot; | &quot;*=&quot; | &quot;/=&quot; | &quot;%=&quot;
        | &quot;<<=&quot; | &quot;>>=&quot; | &quot;>>>=&quot;
        | &quot;|=&quot; | &quot;^=&quot; | &quot;&amp;=&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">enum AssignmentOperator {
    <span class="hljs-string">"="</span> | <span class="hljs-string">"+="</span> | <span class="hljs-string">"-="</span> | <span class="hljs-string">"*="</span> | <span class="hljs-string">"/="</span> | <span class="hljs-string">"%="</span>
        | <span class="hljs-string">"&lt;&lt;="</span> | <span class="hljs-string">"&gt;&gt;="</span> | <span class="hljs-string">"&gt;&gt;&gt;="</span>
        | <span class="hljs-string">"|="</span> | <span class="hljs-string">"^="</span> | <span class="hljs-string">"&amp;="</span>
}</code></pre>
<h4>LogicalExpression</h4>
<p>逻辑运算表达式节点，和赋值或者二元运算类型，只不过 <code>operator</code> 是逻辑运算符类型。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface LogicalExpression <: Expression {
    type: &quot;LogicalExpression&quot;;
    operator: LogicalOperator;
    left: Expression;
    right: Expression;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface LogicalExpression &lt;: Expression {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"LogicalExpression"</span>;
    operator: LogicalOperator;
    left: Expression;
    right: Expression;
}</code></pre>
<h5>LogicalOperator</h5>
<p>逻辑运算符，两种值，即与或。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="enum LogicalOperator {
    &quot;||&quot; | &quot;&amp;&amp;&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">enum LogicalOperator {
    <span class="hljs-string">"||"</span> | <span class="hljs-string">"&amp;&amp;"</span>
}</code></pre>
<h4>MemberExpression</h4>
<p>成员表达式节点，即表示引用对象成员的语句，<code>object</code> 是引用对象的表达式节点，<code>property</code> 是表示属性名称，<code>computed</code> 如果为 <code>false</code>，是表示 <code>.</code> 来引用成员，<code>property</code> 应该为一个 <code>Identifier</code> 节点，如果 <code>computed</code> 属性为 <code>true</code>，则是 <code>[]</code> 来进行引用，即 <code>property</code> 是一个 <code>Expression</code> 节点，名称是表达式的结果值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface MemberExpression <: Expression, Pattern {
    type: &quot;MemberExpression&quot;;
    object: Expression;
    property: Expression;
    computed: boolean;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface MemberExpression &lt;: Expression, Pattern {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"MemberExpression"</span>;
    object: Expression;
    property: Expression;
    computed: boolean;
}</code></pre>
<hr>
<p>下边是其他的一些表达式：</p>
<h4>ConditionalExpression</h4>
<p>条件表达式，通常我们称之为三元运算表达式，即 <code>boolean ? true : false</code>。属性参考条件语句。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface ConditionalExpression <: Expression {
    type: &quot;ConditionalExpression&quot;;
    test: Expression;
    alternate: Expression;
    consequent: Expression;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface ConditionalExpression &lt;: Expression {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"ConditionalExpression"</span>;
    test: Expression;
    alternate: Expression;
    consequent: Expression;
}</code></pre>
<h4>CallExpression</h4>
<p>函数调用表达式，即表示了 <code>func(1, 2)</code> 这一类型的语句。<code>callee</code> 属性是一个表达式节点，表示函数，<code>arguments</code> 是一个数组，元素是表达式节点，表示函数参数列表。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface CallExpression <: Expression {
    type: &quot;CallExpression&quot;;
    callee: Expression;
    arguments: [ Expression ];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface CallExpression &lt;: Expression {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"CallExpression"</span>;
    callee: Expression;
    <span class="hljs-built_in">arguments</span>: [ Expression ];
}</code></pre>
<h4>NewExpression</h4>
<p><code>new</code> 表达式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface NewExpression <: CallExpression {
    type: &quot;NewExpression&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface NewExpression &lt;: CallExpression {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"NewExpression"</span>;
}</code></pre>
<h4>SequenceExpression</h4>
<p>这个就是逗号运算符构建的表达式（不知道确切的名称），<code>expressions</code> 属性为一个数组，即表示构成整个表达式，被逗号分割的多个表达式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface SequenceExpression <: Expression {
    type: &quot;SequenceExpression&quot;;
    expressions: [ Expression ];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">interface SequenceExpression &lt;: Expression {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"SequenceExpression"</span>;
    expressions: [ Expression ];
}</code></pre>
<h3 id="articleHeader11">Patterns</h3>
<p>模式，主要在 ES6 的解构赋值中有意义，在 ES5 中，可以理解为和 <code>Identifier</code> 差不多的东西。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Pattern <: Node { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">interface Pattern &lt;: Node { }</code></pre>
<p>这一部分的内容比较多，但都可以举一反三，写这个的时候我就当把 JavaScript 语法再复习一遍。这个文档还有 ES2015，ES2016，ES2017 相关的内容，涉及的东西也蛮多，但是理解了上边的这一些，然后从语法层面去思考这个文档，其他的内容也就很好理解了，这里略去，有需要请参阅：<a href="https://github.com/estree/estree" rel="nofollow noreferrer" target="_blank">The Estree Spec</a>。</p>
<h2 id="articleHeader12">Plugins</h2>
<p>回到我们的主角，Acorn，提供了一种扩展的方式来编写相关的插件：<a href="https://github.com/ternjs/acorn#plugins" rel="nofollow noreferrer" target="_blank">Acorn Plugins</a>。</p>
<p>我们可以使用插件来扩展解析器，来解析更多的一些语法，如 <code>.jsx</code> 语法，有兴趣的看看这个插件：<a href="https://github.com/RReverser/acorn-jsx" rel="nofollow noreferrer" target="_blank">acorn-jsx</a>。</p>
<p>官方表示 Acorn 的插件是用于方便扩展解析器，但是需要对 Acorn 内部的运行极致比较了解，扩展的方式会在原本的基础上重新定义一些方法。这里不展开讲了，如果我需要插件的话，会再写文章聊聊这个东西。</p>
<h2 id="articleHeader13">Examples</h2>
<p>现在我们来看一下如何应用这个解析器，例如我们需要用来解析出一个符合 CommonJS 规范的模块依赖了哪些模块，我们可以用 Acorn 来解析 <code>require</code> 这个函数的调用，然后取出调用时的传入参数，便可以获取依赖的模块。</p>
<p>下边是示例代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 遍历所有节点的函数
function walkNode(node, callback) {
  callback(node)

  // 有 type 字段的我们认为是一个节点
  Object.keys(node).forEach((key) => {
    const item = node[key]
    if (Array.isArray(item)) {
      item.forEach((sub) => {
        sub.type &amp;&amp; walkNode(sub, callback)
      })
    }

    item &amp;&amp; item.type &amp;&amp; walkNode(item, callback)
  })
}

function parseDependencies(str) {
  const ast = acorn.parse(str, { ranges: true })
  const resource = [] // 依赖列表

  // 从根节点开始
  walkNode(ast, (node) => {
    const callee = node.callee
    const args = node.arguments

    // require 我们认为是一个函数调用，并且函数名为 require，参数只有一个，且必须是字面量
    if (
      node.type === 'CallExpression' &amp;&amp;
      callee.type === 'Identifier' &amp;&amp;
      callee.name === 'require' &amp;&amp;
      args.length === 1 &amp;&amp;
      args[0].type === 'Literal'
    ) {
      const args = node.arguments

      // 获取依赖的相关信息
      resource.push({
        string: str.substring(node.range[0], node.range[1]),
        path: args[0].value,
        start: node.range[0],
        end: node.range[1]
      })
    }
  })

  return resource
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 遍历所有节点的函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">walkNode</span>(<span class="hljs-params">node, callback</span>) </span>{
  callback(node)

  <span class="hljs-comment">// 有 type 字段的我们认为是一个节点</span>
  <span class="hljs-built_in">Object</span>.keys(node).forEach(<span class="hljs-function">(<span class="hljs-params">key</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> item = node[key]
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Array</span>.isArray(item)) {
      item.forEach(<span class="hljs-function">(<span class="hljs-params">sub</span>) =&gt;</span> {
        sub.type &amp;&amp; walkNode(sub, callback)
      })
    }

    item &amp;&amp; item.type &amp;&amp; walkNode(item, callback)
  })
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parseDependencies</span>(<span class="hljs-params">str</span>) </span>{
  <span class="hljs-keyword">const</span> ast = acorn.parse(str, { <span class="hljs-attr">ranges</span>: <span class="hljs-literal">true</span> })
  <span class="hljs-keyword">const</span> resource = [] <span class="hljs-comment">// 依赖列表</span>

  <span class="hljs-comment">// 从根节点开始</span>
  walkNode(ast, (node) =&gt; {
    <span class="hljs-keyword">const</span> callee = node.callee
    <span class="hljs-keyword">const</span> args = node.arguments

    <span class="hljs-comment">// require 我们认为是一个函数调用，并且函数名为 require，参数只有一个，且必须是字面量</span>
    <span class="hljs-keyword">if</span> (
      node.type === <span class="hljs-string">'CallExpression'</span> &amp;&amp;
      callee.type === <span class="hljs-string">'Identifier'</span> &amp;&amp;
      callee.name === <span class="hljs-string">'require'</span> &amp;&amp;
      args.length === <span class="hljs-number">1</span> &amp;&amp;
      args[<span class="hljs-number">0</span>].type === <span class="hljs-string">'Literal'</span>
    ) {
      <span class="hljs-keyword">const</span> args = node.arguments

      <span class="hljs-comment">// 获取依赖的相关信息</span>
      resource.push({
        <span class="hljs-attr">string</span>: str.substring(node.range[<span class="hljs-number">0</span>], node.range[<span class="hljs-number">1</span>]),
        <span class="hljs-attr">path</span>: args[<span class="hljs-number">0</span>].value,
        <span class="hljs-attr">start</span>: node.range[<span class="hljs-number">0</span>],
        <span class="hljs-attr">end</span>: node.range[<span class="hljs-number">1</span>]
      })
    }
  })

  <span class="hljs-keyword">return</span> resource
}</code></pre>
<p>这只是简单的一个情况的处理，但是已经给我们呈现了如何使用解析器，Webpack 则在这个的基础上做了更多的东西，包括 <code>var r = require; r('a')</code> 或者 <code>require.async('a')</code> 等的处理。</p>
<p>AST 这个东西对于前端来说，我们无时无刻不在享受着它带来的成果（模块构建，代码压缩，代码混淆），所以了解一下总归有好处。</p>
<p>有问题欢迎讨论。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 Acorn 来解析 JavaScript

## 原文链接
[https://segmentfault.com/a/1190000007473065](https://segmentfault.com/a/1190000007473065)

