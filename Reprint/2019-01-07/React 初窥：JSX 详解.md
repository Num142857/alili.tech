---
title: 'React 初窥：JSX 详解' 
date: 2019-01-07 2:30:11
hidden: true
slug: 3mqf36e2z42
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://parg.co/baz" rel="nofollow noreferrer" target="_blank">React 初窥：JSX 详解</a> 从属于笔者的<a href="https://parg.co/bIn" rel="nofollow noreferrer" target="_blank"> React 与前端工程化实践</a>系列文章，本文引用借鉴的以及更多 React 相关资料参考<a href="https://parg.co/bM1" rel="nofollow noreferrer" target="_blank"> React 学习与实践资料索引</a>。</p></blockquote>
<h1 id="articleHeader0">JSX</h1>
<p>我们在上文中已经很多次的提及了 JSX，大家也对于基本的基于 JSX 编写 React 组件所有了解。实际上在 JSX 推出之初饱受非议，很多人觉得其很怪异。的确虽然与正统的 HTML 相比其都是类 XML语法的声明式标签语言，但是其对于类名强制使用 className、强制要求标签闭合等特点会让不少的传统前端开发者不太适应。JSX 的引入对笔者之前的工作流的冲击在于不能够直接使用 UI 部门提供的页面模板，并且因为组件化的分割与预编译，UI 比较麻烦地直接在浏览器开发工具中调整CSS样式然后保存到源代码中。JSX 本质上还是属于 JavaScript，这就避免了我们重复地学习不同框架或库中的指令约定，而可以直接使用 JavaScript 来描述模板渲染逻辑；而在前端框架的工作流中，往往将 JSX 的转化工作交托于 Babel 等转化工具，我们可以通过如下方式指定 JSX 使用的构建函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/** @jsx h */" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code style="word-break: break-word; white-space: initial;"><span class="hljs-comment"><span class="markdown">/<span class="hljs-emphasis">** @jsx h *</span>/</span></span></code></pre>
<h1 id="articleHeader1">JSX 的前世今生</h1>
<p>JSX 语言的名字最早出现在游戏厂商 DeNA，不过其偏重于加入增强语法使得JavaScript 变得更快、更安全、更简单。而 React 则是依赖于 ECMAScript 语法本身，并没有添加扩充语义。React 引入 JSX 主要是为了方便 View 层组件化，承载了构建 HTML 结构化页面的职责。这一点与其他很多的 JavaScript 模板语言异曲同工，不过React 将 JSX 映射为虚拟元素，并且通过创建与更新虚拟元素来管理整个 Virtual DOM 系统。譬如我们 JSX 语法声明某个虚拟组件时，会被转化为<code>React.createElement(component,props,...children) </code>函数调用，譬如我们定义了某个<code>MyButton</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 必须要在 JSX 声明文件中引入 React
import React from 'react';

<MyButton color=&quot;blue&quot; shadowSize={2}>
  Click Me
</MyButton>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 必须要在 JSX 声明文件中引入 React</span>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">MyButton</span> <span class="hljs-attr">color</span>=<span class="hljs-string">"blue"</span> <span class="hljs-attr">shadowSize</span>=<span class="hljs-string">{2}</span>&gt;</span>
  Click Me
<span class="hljs-tag">&lt;/<span class="hljs-name">MyButton</span>&gt;</span></span></code></pre>
<p>会被编译为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>React.createElement(
  MyButton,
  {<span class="hljs-string">color:</span> <span class="hljs-string">'blue'</span>, <span class="hljs-string">shadowSize:</span> <span class="hljs-number">2</span>},
  <span class="hljs-string">'Click Me'</span>
)</code></pre>
<p>而如果我们直接声明某个DOM元素，同样会转化为createElement函数调用:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.createElement(
  'div',
  {className: 'sidebar'},
  null
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>React.createElement(
  <span class="hljs-string">'div'</span>,
  {<span class="hljs-string">className:</span> <span class="hljs-string">'sidebar'</span>},
  <span class="hljs-literal">null</span>
)</code></pre>
<p>实际上除了最著名的 Babel JSX 转换器之外，我们还可以使用 <code>JSXDOM</code> 与 <code>Mercury JSX</code> 这两个同样的可以将 JSX 语法转化为 DOM 或者 Virtual DOM。在 JSXDOM 中，只支持使用 DOM 元素，允许在 DOM 标签中直接使用 JavaScript 变量，譬如当我们需要声明某个列表时，可以使用如下语法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/** @jsx JSXDOM */
 
var defaultValue = &quot;Fill me ...&quot;;
 
document.body.appendChild(
  <div>
    <input type=&quot;text&quot; value={defaultValue} />
    <button onclick=&quot;alert('clicked!');&quot;>Click Me!</button>
    <ul>
      {['un', 'deux', 'trois'].map(function(number) {
        return <li>{number}</li>;
      })}
    </ul>
  </div>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/** @jsx JSXDOM */</span>
 
<span class="hljs-keyword">var</span> defaultValue = <span class="hljs-string">"Fill me ..."</span>;
 
<span class="hljs-built_in">document</span>.body.appendChild(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{defaultValue}</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"alert('clicked!');"</span>&gt;</span>Click Me!<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      {['un', 'deux', 'trois'].map(function(number) {
        return <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>{number}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>;
      })}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
);</span></code></pre>
<p>这里我们还想讨论另一个问题，为什么需要引入 JSX。在 ECAMScript 6 的 ECMA-262 标准中引入了所谓的模板字符串（Template Literals），即可以在 ECMAScript 中使用内嵌的 DSL 来引入 JavaScript 变量，不过虽然模板字符串对于较长的嵌入式 DSL 作用极佳，但是对于需要引入大量作用域中的 ECMAScript 表达式会造成大量的噪音副作用，譬如如果我们要声明某个评论框布局，使用 JSX 的方式如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// JSX
var box =
  <Box>
    {
      shouldShowAnswer(user) ?
      <Answer value={false}>no</Answer> :
      <Box.Comment>
         Text Content
      </Box.Comment>
    }
  </Box>;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// JSX</span>
<span class="hljs-keyword">var</span> box =
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Box</span>&gt;</span>
    {
      shouldShowAnswer(user) ?
      <span class="hljs-tag">&lt;<span class="hljs-name">Answer</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{false}</span>&gt;</span>no<span class="hljs-tag">&lt;/<span class="hljs-name">Answer</span>&gt;</span> :
      <span class="hljs-tag">&lt;<span class="hljs-name">Box.Comment</span>&gt;</span>
         Text Content
      <span class="hljs-tag">&lt;/<span class="hljs-name">Box.Comment</span>&gt;</span>
    }
  <span class="hljs-tag">&lt;/<span class="hljs-name">Box</span>&gt;</span>;</span></code></pre>
<p>而使用模板字符串的方式如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Template Literals
var box = jsx`
  <${Box}>
    ${
      shouldShowAnswer(user) ?
      jsx`<${Answer} value=${false}>no</${Answer}>` :
      jsx`
        <${Box.Comment}>
         Text Content
        </${Box.Comment}>
      `
    }
  </${Box}>
`;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// Template Literals</span>
<span class="hljs-keyword">var</span> box = jsx<span class="hljs-string">`
  &lt;<span class="hljs-subst">${Box}</span>&gt;
    <span class="hljs-subst">${
      shouldShowAnswer(user) ?
      jsx<span class="hljs-string">`&lt;<span class="hljs-subst">${Answer}</span> value=<span class="hljs-subst">${<span class="hljs-literal">false</span>}</span>&gt;no&lt;/<span class="hljs-subst">${Answer}</span>&gt;`</span> :
      jsx<span class="hljs-string">`
        &lt;<span class="hljs-subst">${Box.Comment}</span>&gt;
         Text Content
        &lt;/<span class="hljs-subst">${Box.Comment}</span>&gt;
      `</span>
    }</span>
  &lt;/<span class="hljs-subst">${Box}</span>&gt;
`</span>;</code></pre>
<p>其主要缺陷在于因为存在变量的嵌套，需要在作用域中进进出出，很容易造成语法错误，因此还是 JSX 语法为佳。</p>
<h1 id="articleHeader2">JSX 语法</h1>
<p>JSX 的官方定义是类 XML 语法的 ECMAscript 扩展，完美地利用了 JavaScript 自带的语法和特性，并使用大家熟悉的 HTML 语法来创建虚拟元素。JSX 基本语法基本被 XML 囊括了，但也有很多的不同之处。React 在定义标签时，标签一定要闭合，否则无法编译通过。这一点与标准的 HTML 差别很大，HTML 在浏览器渲染时会自动进行补全，而强大的 JSX 报错机制则直接在编译阶段就以报错的方式指明出来。HTML 中自闭合的标签（如 <code>&lt;img&gt;</code> ）在 JSX 中也遵循同样规则，自定义标签可以根据是否有子组件或文本来决定闭合方式。另外 DOCTYPE 头也是一个非常特殊的标志，一般会在使用 React 作为服务端渲染时用到。在 HTML 中，DOCTYPE 是没有闭合的，也就是说我们无法直接渲染它。常见的做法是构造一个保存 HTML 的变量，将 DOCTYPE 与整个 HTML 标签渲染后的结果串联起来。使用JSX声明组件时，最外层的组件根元素只允许使用单一根元素。这一点我们在上文中也陈述过，因为 JSX 语法会被转化为 <code>React.createElement(component,props,...children)</code> 调用，而该函数的第一个参数只允许传入单元素，而不允许传入多元素。</p>
<h2 id="articleHeader3">变量使用</h2>
<ul><li><p>注释</p></li></ul>
<p>在 HTML 中，我们会使用 <code>&lt;!-- --&gt;</code> 进行注释，不过 JSX 中并不支持：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render() {
  return (
    <div>
      <!-- This doesn't work! -->
    </div>
  )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>render() {
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-comment">&lt;!-- This doesn't work! --&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  )
}</code></pre>
<p>我们需要以 JavaScript 中块注释的方式进行注释：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{/* A JSX comment */}

{/* 
  Multi
  line
  comment
*/}  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{<span class="hljs-comment">/* A JSX comment */</span>}

{<span class="hljs-comment">/* 
  Multi
  line
  comment
*/</span>}  </code></pre>
<ul><li><p>数组</p></li></ul>
<p>JSX 允许使用任意的变量，因此如果我们需要使用数组进行循环元素渲染时，直接使用 map、reduce、filter 等方法即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">NumberList</span>(<span class="hljs-params">props</span>) </span>{
  <span class="hljs-keyword">const</span> numbers = props.numbers;
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      {numbers.map((number) =&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">ListItem</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{number.toString()}</span>
                  <span class="hljs-attr">value</span>=<span class="hljs-string">{number}</span> /&gt;</span>
      )}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  );
}</span></code></pre>
<ul><li><p>条件渲染</p></li></ul>
<p>在JSX中我们不能再使用传统的if/else条件判断语法，但是可以使用更为简洁明了的Conditional Operator运算符，譬如我们要进行if操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{condition &amp;&amp; <span>为真时进行渲染</span> }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;">{condition &amp;&amp; <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>为真时进行渲染<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span> }</code></pre>
<p>如果要进行非操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{condition || <span>为假时进行渲染</span> }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;">{condition || <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>为假时进行渲染<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span> }</code></pre>
<p>我们也可以使用常见的三元操作符进行判断:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{condition
  ? <span>为真时进行渲染</span>
  : <span>为假时进行渲染</span>
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>{condition
  ? <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>为真时进行渲染<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
  : <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>为假时进行渲染<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
}</code></pre>
<p>如果对于较大的代码块，建议是进行换行以提升代码可读性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{condition ? (
  <span>
   为假时进行渲染
  </span>
) : (
  <span>
   为假时进行渲染
  </span>
)}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>{condition ? (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>
   为假时进行渲染
  <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
) : (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>
   为假时进行渲染
  <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
)}</code></pre>
<h2 id="articleHeader4">元素属性</h2>
<ul><li><p>style 属性</p></li></ul>
<p>JSX 中的 style 并没有跟 HTML 一样接收某个 CSS 字符串，而是接收某个使用 camelCase 风格属性的 JavaScript 对象，这一点倒是和DOM 对象的 style 属性一致。譬如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const divStyle = {
  color: 'blue',
  backgroundImage: 'url(' + imgUrl + ')',
};

function HelloWorldComponent() {
  return <div style={divStyle}>Hello World!</div>;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> divStyle = {
  <span class="hljs-attr">color</span>: <span class="hljs-string">'blue'</span>,
  <span class="hljs-attr">backgroundImage</span>: <span class="hljs-string">'url('</span> + imgUrl + <span class="hljs-string">')'</span>,
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">HelloWorldComponent</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{divStyle}</span>&gt;</span>Hello World!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}</code></pre>
<p>注意，内联样式并不能自动添加前缀，这也是笔者不太喜欢使用 CSS-in-JS 这种形式设置样式的的原因。为了支持旧版本浏览器，需要提供相关的前缀：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const divStyle = {
  WebkitTransition: 'all', // note the capital 'W' here
  msTransition: 'all' // 'ms' is the only lowercase vendor prefix
};

function ComponentWithTransition() {
  return <div style={divStyle}>This should work cross-browser</div>;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> divStyle = {
  <span class="hljs-attr">WebkitTransition</span>: <span class="hljs-string">'all'</span>, <span class="hljs-comment">// note the capital 'W' here</span>
  msTransition: <span class="hljs-string">'all'</span> <span class="hljs-comment">// 'ms' is the only lowercase vendor prefix</span>
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ComponentWithTransition</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{divStyle}</span>&gt;</span>This should work cross-browser<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}</code></pre>
<ul><li><p>className</p></li></ul>
<p>React 中是使用 <code>className</code> 来声明 CSS 类名，这一点对于所有的 DOM 与 SVG 元素都起作用。不过如果你是将 React 与 Web Components 结合使用，也是可以使用 <code>class</code> 属性的。</p>
<ul><li><p>htmlFor</p></li></ul>
<p>因为 <code>for</code> 是JavaScript中的保留关键字，因此 React 元素是使用 <code>htmlFor</code> 作为替代。</p>
<ul><li><p>Boolean 系列属性</p></li></ul>
<p>HTML 表单元素中我们经常会使用 disabled、required、checked 与 readOnly 等 Boolean 值性质的书，缺省的属性值会导致 JSX 认为 bool 值设为 true。当我们需要传入 false 时，必须要使用属性表达式。譬如 <code>&lt;input type='checkbox' checked={true}&gt;</code> 可以简写为<code>&lt;input type='checkbox' checked&gt;</code>，而 <code>&lt;input type='checkbox' checked={falsed}&gt;</code> 即不可以省略 checked 属性。</p>
<ul><li><p>自定义属性</p></li></ul>
<p>如果在 JSX 中向 DOM 元素中传入自定义属性，React 是会自动忽略的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div customProperty='a' />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-selector-tag">div</span> customProperty=<span class="hljs-string">'a'</span> /&gt;</code></pre>
<p>不过如果要使用HTML标准的自定义属性，即以 <code>data-*</code> 或者 <code>aria-*</code> 形式的属性是支持的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div data-attr='attr' />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-selector-tag">div</span> data-attr=<span class="hljs-string">'attr'</span> /&gt;</code></pre>
<h2 id="articleHeader5">子元素</h2>
<p>JSX 表达式中允许在一对开放标签或者闭合标签之间包含内容，这即是所谓的子元素，本部分介绍 JSX 支持的不同类别的子元素使用方式。</p>
<ul><li><p>字符串</p></li></ul>
<p>我们可以将字符串放置在一对开放与闭合的标签之间，此时所谓的 <code>props.children</code> 即就是字符串类型；譬如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<MyComponent>Hello World!</MyComponent>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">MyComponent</span>&gt;</span>Hello World!<span class="hljs-tag">&lt;/<span class="hljs-name">MyComponent</span>&gt;</span></code></pre>
<p>就是合法的 JSX 声明，此时 <code>MyComponent</code> 中的 <code>props.children</code> 值就是字符串 <code>Hello World!</code>；另外需要注意的是，JSX 会自动移除行首与行末的空格，并且移除空行，因此下面的三种声明方式渲染的结果是一致的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>Hello World</div>

<div>
  Hello World
</div>

<div>
  Hello
  World
</div>

<div>

  Hello World
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span>&gt;Hello World&lt;/<span class="hljs-keyword">div</span>&gt;

&lt;<span class="hljs-keyword">div</span>&gt;
  Hello World
&lt;/<span class="hljs-keyword">div</span>&gt;

&lt;<span class="hljs-keyword">div</span>&gt;
  Hello
  World
&lt;/<span class="hljs-keyword">div</span>&gt;

&lt;<span class="hljs-keyword">div</span>&gt;

  Hello World
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<ul><li><p>JSX 嵌套<br>我们可以嵌套地使用 JSX，即将某些 JSX 元素作为子元素，从而允许我们方便地展示嵌套组件：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<MyContainer>
  <MyFirstComponent />
  <MySecondComponent />
</MyContainer>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code><span class="hljs-section">&lt;MyContainer&gt;</span>
  <span class="hljs-section">&lt;MyFirstComponent /&gt;</span>
  <span class="hljs-section">&lt;MySecondComponent /&gt;</span>
<span class="hljs-section">&lt;/MyContainer&gt;</span></code></pre>
<p>我们可以混合使用字符串与 JSX，这也是 JSX 很类似于 HTML 的地方：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
  Here is a list:
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  Here is a list:
  <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Item 1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Item 2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>某个 React 组件不可以返回多个 React 元素，不过单个 JSX 表达式是允许包含多个子元素的；因此如果我们希望某个组件返回多个并列的子元素，就需要将它们包裹在某个 <code>div</code> 中。</p>
<ul><li><p>JavaScript 表达式<br>我们可以传入包裹在 <code>{}</code> 内的任意 JavaScript 表达式作为子元素，譬如下述声明方式渲染的结果是相同的：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<MyComponent>foo</MyComponent>

<MyComponent>{'foo'}</MyComponent>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">MyComponent</span>&gt;</span>foo<span class="hljs-tag">&lt;/<span class="hljs-name">MyComponent</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">MyComponent</span>&gt;</span></span><span class="hljs-template-variable">{'foo'}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">MyComponent</span>&gt;</span></span></code></pre>
<p>这种模式常用于渲染 HTML 列表：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Item(props) {
  return <li>{props.message}</li>;
}

function TodoList() {
  const todos = ['finish doc', 'submit pr', 'nag dan to review'];
  return (
    <ul>
      {todos.map((message) => <Item key={message} message={message} />)}
    </ul>
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Item</span>(<span class="hljs-params">props</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>{props.message}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">TodoList</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> todos = [<span class="hljs-string">'finish doc'</span>, <span class="hljs-string">'submit pr'</span>, <span class="hljs-string">'nag dan to review'</span>];
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      {todos.map((message) =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">Item</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{message}</span> <span class="hljs-attr">message</span>=<span class="hljs-string">{message}</span> /&gt;</span>)}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  );
}</span></code></pre>
<ul><li><p>JavaScript 函数<br>正常情况下 JSX 中包含的 JavaScript 表达式会被解析为字符串、React 元素或者列表；不过 <code>props.children</code> 是允许我们传入任意值的，譬如我们可以传入某个函数并且在自定义组件中调用：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Calls the children callback numTimes to produce a repeated component
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// Calls the children callback numTimes to produce a repeated component</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Repeat</span>(<span class="hljs-params">props</span>) </span>{
  <span class="hljs-keyword">let</span> items = [];
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; props.numTimes; i++) {
    items.push(props.children(i));
  }
  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{items}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ListOfTenThings</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Repeat</span> <span class="hljs-attr">numTimes</span>=<span class="hljs-string">{10}</span>&gt;</span>
      {(index) =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{index}</span>&gt;</span>This is item {index} in the list<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">Repeat</span>&gt;</span></span>
  );
}</code></pre>
<ul><li><p>布尔值与空值<br><code>false</code>，<code>null</code>，<code>undefined</code> 与 <code>true</code> 是有效的子元素，不过它们并不会被渲染，而是直接被忽略，如下的 JSX 表达式会被渲染为相同结果：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div />

<div></div>

<div>{false}</div>

<div>{null}</div>

<div>{undefined}</div>

<div>{true}</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> /&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span></span><span class="hljs-template-variable">{false}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span></span><span class="hljs-template-variable">{null}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span></span><span class="hljs-template-variable">{undefined}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span></span><span class="hljs-template-variable">{true}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<h2 id="articleHeader6">避免 XSS 注入攻击</h2>
<p>最后需要提及的是，React 中 JSX 能够帮我们自动防护部分 XSS 攻击，譬如我们常见的需要将用户输入的内容再呈现出来:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const title = response.potentiallyMaliciousInput;
// This is safe:
const element = <h1>{title}</h1>;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> title = response.potentiallyMaliciousInput;
<span class="hljs-comment">// This is safe:</span>
<span class="hljs-keyword">const</span> element = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{title}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;</code></pre>
<p>在标准的 HTML 中，如果我们不对用户输入作任何的过滤，那么当用户输入 <code>&lt;script&gt;alert(1)&lt;script/&gt;</code> 这样的可执行代码之后，就存在被 XSS 攻击的危险。而 React 在实际渲染之前会帮我们自动过滤掉嵌入在 JSX 中的危险代码，将所有的输入进行编码，保证其为纯字符串之后再进行渲染。不过这种安全过滤有时候也会对我们造成不便，譬如如果我们需要使用 <code>&amp;copy;</code> 这样的实体字符时，React 会自动将其转移最后导致无法正确渲染，我们可以寻找如下几种解决方法：</p>
<ul>
<li><p>直接使用 UTF-8 字符或者使用对应字符的 Unicode 编码</p></li>
<li><p>使用数组封装</p></li>
<li><p>直接插入原始的 HTML，React 为我们提供了 dangerouslySetInnerHTML 属性，其类似于 DOM 的 innerHTML 属性，允许我们声明强制直接插入 HTML 代码:</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createMarkup() {
  return {__html: 'First &amp;middot; Second'};
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code><span class="hljs-keyword">function</span> <span class="hljs-title">createMarkup</span>() {
  <span class="hljs-keyword">return</span> <span class="hljs-type">{__html:</span> <span class="hljs-symbol">'First</span> &amp;middot; Second'};
}

<span class="hljs-keyword">function</span> <span class="hljs-title">MyComponent</span>() {
  <span class="hljs-keyword">return</span> <span class="hljs-type">&lt;div</span> dangerouslySetInnerHTML={createMarkup()} /&gt;;
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 初窥：JSX 详解

## 原文链接
[https://segmentfault.com/a/1190000010297507](https://segmentfault.com/a/1190000010297507)

