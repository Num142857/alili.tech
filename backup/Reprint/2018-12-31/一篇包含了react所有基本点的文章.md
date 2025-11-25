---
title: '一篇包含了react所有基本点的文章' 
date: 2018-12-31 2:30:30
hidden: true
slug: xsyk6re8i2e
categories: [reprint]
---

{{< raw >}}

                    
<p>去年，我写了一本关于学习React.js的小书，原来是大约100页。 今年我要挑战自己，把它归纳为一篇文章。</p>
<p>本文不会涵盖什么是React，或者为什么要学习它。 相反，这是面向已经熟悉JavaScript并熟悉DOM API基础知识的人，对React.js的基础知识的介绍。</p>
<p>以下所有代码示例均标示为参考。 它们纯粹是为了提供概念而写的例子。 他们大多数可以写得更好一些。</p>
<h1 id="articleHeader0">1：组件是React的一切</h1>
<p>React是围绕可重用组件的概念设计的。 您定义小组件，并将它们放在一起形成更大的组件。</p>
<p>所有小或小的组件都可重复使用，甚至跨不同的项目。</p>
<p>一个React组件（以其最简单的形式）是一个简单的JavaScript函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Example 1
// https://jscomplete.com/repl?j=Sy3QAdKHW
function Button (props) {
  // Returns a DOM element here. For example:
  return <button type=&quot;submit&quot;>{props.label}</button>;
}
// To render the Button component to the browser
ReactDOM.render(<Button label=&quot;Save&quot; />, mountNode)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// Example 1</span>
<span class="hljs-comment">// https://jscomplete.com/repl?j=Sy3QAdKHW</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Button</span> (<span class="hljs-params">props</span>) </span>{
  <span class="hljs-comment">// Returns a DOM element here. For example:</span>
  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"submit"</span>&gt;</span>{props.label}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
}
<span class="hljs-comment">// To render the Button component to the browser</span>
ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"Save"</span> /&gt;</span>, mountNode)</span></code></pre>
<p>用于按钮标签的花括号将在下面介绍。 现在不必要担心他们。 ReactDOM也将在后面解释，但是如果要测试这个例子和接下来的代码示例，<code>render</code>函数就是你需要的。</p>
<p><code>ReactDOM.render</code>的第二个参数是React将要接管和控制的目标DOM元素。 在jsComplete REPL中，您就可以使用<code>mountNode</code>变量。</p>
<p>关于示例1的注意事项有以下几点：</p>
<ul>
<li>组件名称以大写字母开头。 这是必需的，因为我们将处理HTML元素和React元素的混合。 小写名称保留给HTML元素。 事实上，请继续尝试将React组件命名为“button”。 ReactDOM将忽略该函数并呈现常规的空HTML按钮。</li>
<li>每个组件都接收一个属性列表，就像HTML元素一样。 在React中，这个列表叫做<code>props</code>。创建功能组件，你可以通过使用任意名称命名<code>props</code>。</li>
<li>在上面的Button组件的返回中，我们写出了奇怪的HTML。 这既不是JavaScript也不是HTML，甚至不是React.js。 但是，它非常受欢迎，成为React应用程序中的默认设置。 它被称为JSX，它是一个JavaScript扩展。 JSX也是妥协！ 继续尝试在上面的函数中的任何其他HTML元素，并查看它们是如何支持的（例如，返回一个文本输入元素）。</li>
</ul>
<h1 id="articleHeader1">2: What the flux is JSX?</h1>
<p>上面的示例1可以用纯粹的React.js来编写，而不需要JSX，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Example 2 -  React component without JSX
// https://jscomplete.com/repl?j=HyiEwoYB-
function Button (props) {
  return React.createElement(
    &quot;button&quot;,
    { type: &quot;submit&quot; },
    props.label
  );
}
// To use Button, you would do something like
ReactDOM.render(
  React.createElement(Button, { label: &quot;Save&quot; }),
  mountNode
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code><span class="hljs-comment">// Example 2 -  React component without JSX</span>
<span class="hljs-comment">// https://jscomplete.com/repl?j=HyiEwoYB-</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Button</span> <span class="hljs-params">(props)</span> {</span>
  <span class="hljs-keyword">return</span> React.createElement(
    <span class="hljs-string">"button"</span>,
    { <span class="hljs-built_in">type</span>: <span class="hljs-string">"submit"</span> },
    props.label
  );
}
<span class="hljs-comment">// To use Button, you would do something like</span>
ReactDOM.render(
  React.createElement(Button, { label: <span class="hljs-string">"Save"</span> }),
  mountNode
);</code></pre>
<p><code>createElement</code>函数是React顶级API中函数。 您需要学习的这个级别中共有7件事情中的1项。 可见ReactApi多么简短。</p>
<p>很像DOM本身有一个<code>document.createElement</code>函数来创建一个由标签名称指定的元素，React的<code>createElement</code>函数是一个更高级别的函数，可以做类似于<code>document.createElement</code>的功能。 但它也可以用于创建一个表示React组件的元素。 当我们使用上面的例2中的Button组件时，我们这里就是创建了一个React组件。</p>
<p>与<code>document.createElement</code>不同，React的<code>createElement</code>可以接受第二个参数之后的动态参数，以表示创建的元素的后代。 所以<code>createElement</code>实际上创建一个树。</p>
<p>这是一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/ Example 3 -  React’s createElement API
// https://jscomplete.com/repl?j=r1GNoiFBb
const InputForm = React.createElement(
  &quot;form&quot;,
  { target: &quot;_blank&quot;, action: &quot;https://google.com/search&quot; },
  React.createElement(&quot;div&quot;, null, &quot;Enter input and click Search&quot;),
  React.createElement(&quot;input&quot;, { name: &quot;q&quot;, className: &quot;input&quot; }),
  React.createElement(Button, { label: &quot;Search&quot; })
);
// InputForm uses the Button component, so we need that too:
function Button (props) {
  return React.createElement(
    &quot;button&quot;,
    { type: &quot;submit&quot; },
    props.label
  );
}
// Then we can use InputForm directly with .render
ReactDOM.render(InputForm, mountNode);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code>/ Example <span class="hljs-number">3</span> -  React’s createElement API
<span class="hljs-comment">// https://jscomplete.com/repl?j=r1GNoiFBb</span>
<span class="hljs-keyword">const</span> InputForm = React.createElement(
  <span class="hljs-string">"form"</span>,
  { <span class="hljs-keyword">target</span>: <span class="hljs-string">"_blank"</span>, action: <span class="hljs-string">"https://google.com/search"</span> },
  React.createElement(<span class="hljs-string">"div"</span>, <span class="hljs-keyword">null</span>, <span class="hljs-string">"Enter input and click Search"</span>),
  React.createElement(<span class="hljs-string">"input"</span>, { name: <span class="hljs-string">"q"</span>, className: <span class="hljs-string">"input"</span> }),
  React.createElement(Button, { label: <span class="hljs-string">"Search"</span> })
);
<span class="hljs-comment">// InputForm uses the Button component, so we need that too:</span>
<span class="hljs-function">function <span class="hljs-title">Button</span> <span class="hljs-params">(props)</span> </span>{
  <span class="hljs-function"><span class="hljs-keyword">return</span> React.<span class="hljs-title">createElement</span><span class="hljs-params">(
    <span class="hljs-string">"button"</span>,
    { type: <span class="hljs-string">"submit"</span> },
    props.label
  )</span></span>;
}
<span class="hljs-comment">// Then we can use InputForm directly with .render</span>
ReactDOM.render(InputForm, mountNode);</code></pre>
<p>关于以上例子要注意的几点：</p>
<ul>
<li>
<code>InputForm</code>不是React组件; 它只是一个React元素。 这就是为什么我们直接在<code>ReactDOM.render</code>调用中使用它，而不是使用<code>&lt;InputForm /&gt;</code>。</li>
<li>我们可以嵌套<code>React.createElement</code>调用，因为它都是JavaScript。</li>
<li>
<code>React.createElement</code>的第二个参数可以是null，也可以是一个空对象，当元素不需要attributes和props时。</li>
<li>我们可以将HTML元素与React组件混合使用。 您可以将HTML元素视为内置的React组件。</li>
<li>React的API尝试尽可能接近DOM API，因此我们为输入元素使用className而不是类。 私以为，我们都希望React的API将成为DOM API本身的一部分。 因为，你知道的，这有太多的好处了。</li>
</ul>
<p>上面的代码是您在引入React库时了解的内容。 浏览器不处理任何JSX业务。 然而，我们人类喜欢看HTML并且使用HTML而不是这些<code>createElement</code>调用（想象一下使用<code>document.createElement</code>构建一个网站，我相信你可以的！）。 这就是为什么存在JSX的原因。 我们可以用非常类似于HTML的语法编写它，而不是用<code>React.createElement</code>调用上面的表单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Example 4 - JSX (compare with Example 3)
// https://jscomplete.com/repl?j=SJWy3otHW
const InputForm =
  <form target=&quot;_blank&quot; action=&quot;https://google.com/search&quot;>
    <div>Enter input and click Search</div>
    <input name=&quot;q&quot; className=&quot;input&quot; />
    <Button label=&quot;Search&quot; />
  </form>;
// InputForm &quot;still&quot; uses the Button component, so we need that too.
// Either JSX or normal form would do
function Button (props) {
  // Returns a DOM element here. For example:
  return <button type=&quot;submit&quot;>{props.label}</button>;
}
// Then we can use InputForm directly with .render
ReactDOM.render(InputForm, mountNode);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-comment">// Example 4 - JSX (compare with Example 3)</span>
<span class="hljs-comment">// https://jscomplete.com/repl?j=SJWy3otHW</span>
<span class="hljs-keyword">const</span> InputForm =
  &lt;<span class="hljs-keyword">form</span> target=<span class="hljs-string">"_blank"</span> action=<span class="hljs-string">"https://google.com/search"</span>&gt;
    &lt;div&gt;Enter <span class="hljs-keyword">input</span> and click <span class="hljs-keyword">Search</span>&lt;/div&gt;
    &lt;<span class="hljs-keyword">input</span> name=<span class="hljs-string">"q"</span> className=<span class="hljs-string">"input"</span> /&gt;
    &lt;Button <span class="hljs-keyword">label</span>=<span class="hljs-string">"Search"</span> /&gt;
  &lt;/<span class="hljs-keyword">form</span>&gt;;
<span class="hljs-comment">// InputForm "still" uses the Button component, so we need that too.</span>
<span class="hljs-comment">// Either JSX or normal form would do</span>
function Button (props) {
  <span class="hljs-comment">// Returns a DOM element here. For example:</span>
  <span class="hljs-keyword">return</span> &lt;button <span class="hljs-keyword">type</span>=<span class="hljs-string">"submit"</span>&gt;{props.<span class="hljs-keyword">label</span>}&lt;/button&gt;;
}
<span class="hljs-comment">// Then we can use InputForm directly with .render</span>
ReactDOM.render(InputForm, mountNode);</code></pre>
<p>关于上面的例子注意以下几点</p>
<ul>
<li>它不是HTML。 例如，我们仍然在使用className而不是类。</li>
<li>我们仍然在考虑将以上HTML作为JavaScript。 看看我在末尾添加了分号。</li>
</ul>
<p>我们上面写的（例4）是JSX。 然而，我们在浏览器的执行版本是它的编译版本（示例3）。 为了实现这一点，我们需要使用预处理器将JSX版本转换为<code>React.createElement</code>版本。</p>
<p>那就是JSX。 这是一个折中，允许我们以类似于HTML的语法编写我们的React组件，这是一个很好的共识。</p>
<blockquote>上面标题中的“Flux”一词被选为韵脚(...)，但它也是Facebook流行的非常受欢迎的应用程序架构的名称。 最着名的实现是Redux。</blockquote>
<p>JSX，顺便说一下，可以自己在其他地方使用。 这不是只有在React中才可以使用的。</p>
<h1 id="articleHeader2">3: 您可以在JSX中的任何位置使用JavaScript表达式</h1>
<p>在JSX部分中，您可以在一对花括号内使用任何JavaScript表达式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Example 5 -  Using JavaScript expressions in JSX
// https://jscomplete.com/repl?j=SkNN3oYSW
const RandomValue = () => 
  <div>
    { Math.floor(Math.random() * 100) }
  </div>;
// To use it:
ReactDOM.render(<RandomValue />, mountNode);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-comment">// Example 5 -  Using JavaScript expressions in JSX</span>
<span class="hljs-comment">// https://jscomplete.com/repl?j=SkNN3oYSW</span>
const RandomValue = () =&gt; 
  <span class="hljs-params">&lt;div&gt;</span>
    { Math.floor(Math.random() * <span class="hljs-number">100</span>) }
  <span class="hljs-params">&lt;/div&gt;</span>;
<span class="hljs-comment">// To use it:</span>
ReactDOM.render(<span class="hljs-params">&lt;RandomValue /&gt;</span>, mountNode);</code></pre>
<p>任何JavaScript表达式都可以放在那些花括号内。 这相当于JavaScript模板文字中的<code>$ {}</code>插值语法。</p>
<p>这是JSX中唯一的约束：只有表达式。 所以，你不能使用常规的if语句，但是三元表达式是可以的。</p>
<p>JavaScript变量也是表达式，所以当组件接收到<code>props</code>列表（RandomValue组件没有，<code>props</code>是可选的）时，可以在花括号内使用这些<code>props</code>。 我们在上面的Button组件中这样做了（示例1）。</p>
<p>JavaScript对象也是表达式。 有时候，我们在一个花括号里面使用一个JavaScript对象，这使得它看起来像双花括号，但它实际上只是一个大括号内的一个对象。 一个用例是将CSS样式对象传递给React中的style属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Example 6 - An object passed to the special React style prop
// https://jscomplete.com/repl?j=S1Kw2sFHb
const ErrorDisplay = ({message}) =>
  <div style={ { color: 'red', backgroundColor: 'yellow' } }>
    {message}
  </div>;
// Use it:
ReactDOM.render(
  <ErrorDisplay 
    message=&quot;These aren't the droids you're looking for&quot; 
  />,
  mountNode
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code><span class="hljs-comment">// Example 6 - An object passed to the special React style prop</span>
<span class="hljs-comment">// https://jscomplete.com/repl?j=S1Kw2sFHb</span>
const ErrorDisplay = ({message}) =&gt;
  &lt;<span class="hljs-keyword">div</span> style={ { color: <span class="hljs-string">'red'</span>, backgroundColor: <span class="hljs-string">'yellow'</span> } }&gt;
    {message}
  &lt;/<span class="hljs-keyword">div</span>&gt;;
<span class="hljs-comment">// Use it:</span>
ReactDOM.render(
  &lt;ErrorDisplay 
    message=<span class="hljs-string">"These aren't the droids you're looking for"</span> 
  /&gt;,
  mountNode
);</code></pre>
<p>请注意，我如何仅解析<code>props</code>参数中的message的。 这是JavaScript。 还要注意上面的style属性是一个特殊的属性（再次，它不是HTML，它更接近于DOM API）。 我们使用一个对象作为style属性的值。 该对象定义了样式，就像我们使用JavaScript一样（因为确实就是）。</p>
<p>甚至可以在JSX中使用React元素，因为这也是一个表达式。 记住，一个React元素就是一个函数调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const MaybeError = ({errorMessage}) =>
  <div>
    {errorMessage &amp;&amp; <ErrorDisplay message={errorMessage} />}
  </div>;
  
// The MaybeError component uses the ErrorDisplay component:
const ErrorDisplay = ({message}) =>
  <div style={ { color: 'red', backgroundColor: 'yellow' } }>
    {message}
  </div>;
// Now we can use the MaybeError component:
ReactDOM.render(
  <MaybeError
    errorMessage={Math.random() > 0.5 ? 'Not good' : ''}
  />,
  mountNode
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>const MaybeError = ({errorMessage}) =&gt;
  &lt;<span class="hljs-keyword">div</span>&gt;
    {errorMessage &amp;&amp; &lt;ErrorDisplay message={errorMessage} /&gt;}
  &lt;/<span class="hljs-keyword">div</span>&gt;;
  
<span class="hljs-comment">// The MaybeError component uses the ErrorDisplay component:</span>
const ErrorDisplay = ({message}) =&gt;
  &lt;<span class="hljs-keyword">div</span> style={ { color: <span class="hljs-string">'red'</span>, backgroundColor: <span class="hljs-string">'yellow'</span> } }&gt;
    {message}
  &lt;/<span class="hljs-keyword">div</span>&gt;;
<span class="hljs-comment">// Now we can use the MaybeError component:</span>
ReactDOM.render(
  &lt;MaybeError
    errorMessage={Math.random() &gt; <span class="hljs-number">0.5</span> ? <span class="hljs-string">'Not good'</span> : <span class="hljs-string">''</span>}
  /&gt;,
  mountNode
);</code></pre>
<p>上面的<code>MaybeError</code>组件将只显示<code>ErrorDisplay</code>组件，如果有一个<code>errorMessage</code>字符串传递给它和一个空的div。 React将<code>{true}</code>，<code>{false}</code>，<code>{undefined}</code>和<code>{null}</code>视为没有呈现任何内容的有效元素子元素。</p>
<p>您还可以使用JSX内的集合上的所有JavaScript方法（map，reduce，filter，concat等）。 再次声明原因是因为它们返回的是表达式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Example 8 - Using an array map inside {}
// https://jscomplete.com/repl?j=SJ29aiYH-
const Doubler = ({value=[1, 2, 3]}) =>
  <div>
    {value.map(e => e * 2)}
  </div>;
// Use it
ReactDOM.render(<Doubler />, mountNode);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code>// Example 8 - Using an<span class="hljs-built_in"> array </span>map inside {}
// https://jscomplete.com/repl?j=SJ29aiYH-<span class="hljs-built_in">
const </span>Doubler = ({value=[1, 2, 3]}) =&gt;
  &lt;div&gt;
    {value.map(e =&gt; e * 2)}
  &lt;/div&gt;;
// Use it
ReactDOM.render(&lt;Doubler /&gt;, mountNode);</code></pre>
<p>请注意，我是如何给<code>value</code>props默认值的，因为它全是Javascript。 还要注意，我在div中输出了一个数组表达式，这在React中是可行的。 它将把每一个双倍的值放在一个文本节点中。</p>
<h1 id="articleHeader3">4: 您可以使用JavaScript类编写React组件</h1>
<p>简单的功能组件非常适合简单的需求，但有时我们需要更多的功能。 React支持通过JavaScript类语法创建组件。 这是使用类语法编写的Button组件（在示例1中）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Example 9 - Creating components using JavaScript classes
// https://jscomplete.com/repl?j=ryjk0iKHb
class Button extends React.Component {
  render() {
    return <button>{this.props.label}</button>;
  }
}
// Use it (same syntax)
ReactDOM.render(<Button label=&quot;Save&quot; />, mountNode);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-comment">// Example 9 - Creating components using JavaScript classes</span>
<span class="hljs-comment">// https://jscomplete.com/repl?j=ryjk0iKHb</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Button</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> &lt;button&gt;{<span class="hljs-keyword">this</span>.props.label}&lt;/button&gt;;
  }
}
<span class="hljs-comment">// Use it (same syntax)</span>
<span class="hljs-type">ReactDOM</span>.render(&lt;<span class="hljs-type">Button</span> label=<span class="hljs-string">"Save"</span> /&gt;, mountNode);</code></pre>
<p>类语法很简单。 定义一个扩展了React.Component基类的类（需要学习的另一个顶级的React API）。 该类定义一个唯一实例函数render（），该render函数返回虚拟DOM对象。 每次我们使用上面的基于Button类的组件（例如，通过执行&lt;Button ... /&gt;），React将从这个基于类的组件中实例化一个对象，并在DOM树中使用该对象。</p>
<p>这就是为什么我们在上面的渲染输出中在JSX中使用<code>this.props.label</code>的原因。 因为每个组件都获得一个称为<code>props</code>的特殊实例属性，该实例属性在实例化时保存传递给该组件的所有值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Example 10 -  Customizing a component instance
// https://jscomplete.com/repl?j=rko7RsKS-
class Button extends React.Component {
  constructor(props) {
    super(props);
    this.id = Date.now();
  }
  render() {
    return <button id={this.id}>{this.props.label}</button>;
  }
}
// Use it
ReactDOM.render(<Button label=&quot;Save&quot; />, mountNode);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-comment">// Example 10 -  Customizing a component instance</span>
<span class="hljs-comment">// https://jscomplete.com/repl?j=rko7RsKS-</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Button</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.id = <span class="hljs-type">Date</span>.now();
  }
  render() {
    <span class="hljs-keyword">return</span> &lt;button id={<span class="hljs-keyword">this</span>.id}&gt;{<span class="hljs-keyword">this</span>.props.label}&lt;/button&gt;;
  }
}
<span class="hljs-comment">// Use it</span>
<span class="hljs-type">ReactDOM</span>.render(&lt;<span class="hljs-type">Button</span> label=<span class="hljs-string">"Save"</span> /&gt;, mountNode);</code></pre>
<p>我们还可以定义类属性函数，并在我们想使用的地方使用，包括返回的JSX输出内：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Example 11 — Using class properties
// https://jscomplete.com/repl?j=H1YDCoFSb
class Button extends React.Component {
  clickCounter = 0;
handleClick = () => {
    console.log(`Clicked: ${++this.clickCounter}`);
  };
  
  render() {
    return (
      <button id={this.id} onClick={this.handleClick}>
        {this.props.label}
      </button>
    );
  }
}
// Use it
ReactDOM.render(<Button label=&quot;Save&quot; />, mountNode);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-comment">// Example 11 — Using class properties</span>
<span class="hljs-comment">// https://jscomplete.com/repl?j=H1YDCoFSb</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Button</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  clickCounter = <span class="hljs-number">0</span>;
handleClick = () =&gt; {
    console.log(`<span class="hljs-type">Clicked</span>: ${++<span class="hljs-keyword">this</span>.clickCounter}`);
  };
  
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;button id={<span class="hljs-keyword">this</span>.id} onClick={<span class="hljs-keyword">this</span>.handleClick}&gt;
        {<span class="hljs-keyword">this</span>.props.label}
      &lt;/button&gt;
    );
  }
}
<span class="hljs-comment">// Use it</span>
<span class="hljs-type">ReactDOM</span>.render(&lt;<span class="hljs-type">Button</span> label=<span class="hljs-string">"Save"</span> /&gt;, mountNode);</code></pre>
<p>关于例子11有几点需要注意</p>
<ul>
<li>
<code>handleClick</code>函数是使用JavaScript中新建的类字段语法编写的。这种语法仍然属于<code>stage-2,</code>，但由于很多原因，它是访问组件安装实例（由于箭头功能）的最佳选择。 但是，您需要使用像Babel这样的编译器来配置它来理解<code>stage-2</code>,（或类字段语法）来获取上面的代码。 jsComplete REPL具有预配置。</li>
<li>我们还使用相同的类字段语法定义了<code>ClickCounter</code>实例变量。 这允许我们完全跳过使用类构造函数调用。</li>
<li>当我们将<code>handleClick</code>函数指定为特殊的<code>onClick</code>，React属性的值时，我们没有调用它。 我们把handleClick函数引用传递给出去了。 在这个属性里面调用函数是使用React最常见的错误之一。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Wrong:
onClick={this.handleClick()}
// Right:
onClick={this.handleClick}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// Wrong:</span>
onClick={<span class="hljs-keyword">this</span>.handleClick()}
<span class="hljs-comment">// Right:</span>
onClick={<span class="hljs-keyword">this</span>.handleClick}</code></pre>
<h1 id="articleHeader4">5: React的事件中，两个最重要的区别</h1>
<p>在React元素中处理事件时，与DOM API的方式有两个非常重要的区别：</p>
<ul>
<li>所有React元素属性（包括事件）使用camelCase命名，而不是小写。 它是<code>onClick</code>，而不是<code>onclick</code>。</li>
<li>我们传递一个实际的JavaScript函数引用作为事件处理程序，而不是一个字符串。 它是<code>onClick = {handleClick}</code>，而不是<code>onClick =“handleClick”</code>。</li>
</ul>
<p>使用自己的对象将DOM事件对象包装起来，以优化事件处理的性能。 但是在事件处理程序中，我们仍然可以访问DOM事件对象上可用的所有方法。 React将包装的事件对象传递给每个句柄调用。 例如，为了防止表单从默认提交操作中，您可以执行以下操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Example 12 - Working with wrapped events
// https://jscomplete.com/repl?j=HkIhRoKBb
class Form extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted');
  };
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <button type=&quot;submit&quot;>Submit</button>
      </form>
    );
  }
}
// Use it
ReactDOM.render(<Form />, mountNode);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-comment">// Example 12 - Working with wrapped events</span>
<span class="hljs-comment">// https://jscomplete.com/repl?j=HkIhRoKBb</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Form</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  handleSubmit = (event) =&gt; {
    event.preventDefault();
    console.log(<span class="hljs-symbol">'Form</span> submitted');
  };
  
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;form onSubmit={<span class="hljs-keyword">this</span>.handleSubmit}&gt;
        &lt;button <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"submit"</span>&gt;<span class="hljs-type">Submit</span>&lt;/button&gt;
      &lt;/form&gt;
    );
  }
}
<span class="hljs-comment">// Use it</span>
<span class="hljs-type">ReactDOM</span>.render(&lt;<span class="hljs-type">Form</span> /&gt;, mountNode);</code></pre>
<h1 id="articleHeader5">6: 每一个React组件都有故事</h1>
<p>以下仅适用于类组件（扩展为React.Component的组件）。 函数组件有一个略有不同的故事。</p>
<ol>
<li>首先，我们为React定义一个模板，以从组件创建元素。</li>
<li>然后，我们指示React在某处使用它。 例如，在另一个组件的render调用中，或者使用ReactDOM.render。</li>
<li>然后，React实例化一个元素，并给出一组我们可以使用<code>this.props</code>访问的<code>props</code>。 那些<code>props</code>正是我们在上面的步骤2中传递的。</li>
<li>由于它都是JavaScript，所以构造方法将被调用（如果已经定义的话）。 这是我们要说的第一个：组件生命周期方法。</li>
<li>然后React计算<code>render</code>方法（虚拟DOM节点）的输出。</li>
<li>由于这是React渲染元素的第一次，React将与浏览器进行通信（代表我们使用DOM API）来显示元素。 这个过程通常被称为挂载。</li>
<li>然后，React调用另一个生命周期方法，称为<code>componentDidMount</code>。 我们可以使用这种方法做一些事情，例如，在DOM上做一些我们现在知道在浏览器中支持处理的东西。 在此生命周期方法之前，我们处理的DOM全部是虚拟的。</li>
<li>一些组件故事在这里结束。 出于各种原因，其他组件可以从浏览器DOM中解除挂载。 在后一种情况发生之前，React调用另一个生命周期方法<code>componentWillUnmount</code>。</li>
<li>任何已挂载元件的状态可能会改变。 该元素的父代可能会重新呈现。 在任一种情况下，安装的元件可能会接收不同的<code>props</code>。 这里的魔法发生了，我们现在开始需要React了！ 在此之前，我们完全不需要做任何事情</li>
<li>这个组件的故事继续下去，但在之前，我们需要了解我所说的这个状态。</li>
</ol>
<h1 id="articleHeader6">7: React组件有一个私有状态</h1>
<p>以下也仅适用于类组件。 有没有人提到有些人把只做展现的组件叫做哑巴？</p>
<p>状态类字段是任何React类组件中的特殊字段。 React监视每个组件状态以进行更改。 但是对于React要有效地执行这些操作，我们必须通过另一个需要学习的React API函数来更改state字段，<code>this.setState</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Example 13 -  the setState API
// https://jscomplete.com/repl?j=H1fek2KH-
class CounterButton extends React.Component {
  state = {
    clickCounter: 0,
    currentTimestamp: new Date(),
  };
  
  handleClick = () => {
    this.setState((prevState) => {
     return { clickCounter: prevState.clickCounter + 1 };
    });
  };
  
  componentDidMount() {
   setInterval(() => {
     this.setState({ currentTimestamp: new Date() })
    }, 1000);
  }
  
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Click</button>
        <p>Clicked: {this.state.clickCounter}</p>
        <p>Time: {this.state.currentTimestamp.toLocaleString()}</p>
      </div>
    );
  }
}
// Use it
ReactDOM.render(<CounterButton />, mountNode);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// Example 13 -  the setState API</span>
<span class="hljs-comment">// https://jscomplete.com/repl?j=H1fek2KH-</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CounterButton</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  state = {
    <span class="hljs-attr">clickCounter</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">currentTimestamp</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(),
  };
  
  handleClick = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">this</span>.setState(<span class="hljs-function">(<span class="hljs-params">prevState</span>) =&gt;</span> {
     <span class="hljs-keyword">return</span> { <span class="hljs-attr">clickCounter</span>: prevState.clickCounter + <span class="hljs-number">1</span> };
    });
  };
  
  componentDidMount() {
   setInterval(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
     <span class="hljs-keyword">this</span>.setState({ <span class="hljs-attr">currentTimestamp</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>() })
    }, <span class="hljs-number">1000</span>);
  }
  
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.handleClick}</span>&gt;</span>Click<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Clicked: {this.state.clickCounter}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Time: {this.state.currentTimestamp.toLocaleString()}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
}
<span class="hljs-comment">// Use it</span>
ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">CounterButton</span> /&gt;</span>, mountNode);</span></code></pre>
<p>这是了解<code>state</code>最重要的例子。 它将完善您对React交互方式的基础知识。 在这个例子之后，还有一些你需要学习的小事情，但是从这一点来看，它主要是你和你的JavaScript技能。</p>
<p>我们来看一下实例13，从类字段开始。 它有两个。 特殊状态字段被初始化为一个对象，该对象包含起始值为0的<code>clickCounter</code>，以及起始值为<code>new Date()</code>的<code>currentTimestamp</code>。</p>
<p>第二个类字段是一个<code>handleClick</code>函数，我们传递给render方法中的button元素的<code>onClick</code>事件。 <code>handleClick</code>方法使用<code>setState</code>修改此组件实例状态。 注意到这一点。</p>
<p>我们在<code>componentDidMount</code>生命周期方法内部启动的间隔定时器中修改状态。 它每秒钟打勾并执行调用<code>this.setState</code>。</p>
<p>在render方法中，我们使用了正常读取语法对state两个属性的读取。 没有特殊的API。</p>
<p>现在，请注意，我们使用两种不同的方式更新了状态：</p>
<ol>
<li>传递返回一个对象的函数。 我们<code>handleClick</code>函数中实现了这部分内容。</li>
<li>通过传递一个常规对象。 我们在间隔回调中实现了。</li>
</ol>
<p>这两种方式都是可以接受的，但是当您同时读取和写入状态时，第一个是首选的（我们这样做）。 在间隔回调之内，我们只写给状态，而不是读取它。 当两难时，始终使用第一个函数参数语法。 它更加安全，因为<code>setState</code>实际上是一个异步方法。</p>
<p>我们如何更新状态？ 我们返回一个包含我们要更新的值的对象。 注意在两次调用<code>setState</code>中，我们只是从<code>state</code>字段传递一个属性，而不是两者。 这是完全可以的，因为<code>setState</code>实际上将您传递的内容（函数参数的返回值）与现有状态合并。 因此，在调用<code>setState</code>时不指定属性意味着我们不希望更改该属性（而不是删除它）。</p>
<h1 id="articleHeader7">8:React是可以响应的</h1>
<p>React从它对状态变化做出响应的事实（虽然不是反应性的，而是按计划进行）而得名。 有一个笑话，反应应该被命名为Schedule！</p>
<p>然而，当任何组件的状态被更新时，我们用肉眼看到的是React对该更新做出反应，并自动反映浏览器DOM中的更新（如果需要）。</p>
<p>将render函数输入视为两者</p>
<ol>
<li>从父元素得到<code>props</code>
</li>
<li>可以随时更新的内部私有状态</li>
</ol>
<p>当渲染功能的输入变化时，其输出可能会改变。</p>
<p>React保留了渲染历史的记录，当它看到一个渲染与前一个渲染不同时，它将计算它们之间的差异，并将其有效地转换为在DOM中执行的实际DOM操作。</p>
<h1 id="articleHeader8">9: React是你的代理</h1>
<p>您可以将React视为我们聘请的与浏览器通信的代理。 以上面的当前时间戳显示为例。 我们不是手动去浏览器并调用DOM API操作来每秒查找和更新p＃timestamp元素，而是在组件状态上更改了一个属性，而React代表我们与浏览器进行通信。 我相信这是真正受欢迎的真正原因。 我们讨厌浏览器（domApi很繁琐），React自愿为我们做所有对接工作，免费！</p>
<h1 id="articleHeader9">10: 每个React组件都有一个故事（第2部分）</h1>
<p>现在我们知道一个组件的状态，以及当这个状态改变了一些魔法的时候，让我们来学习关于该过程的最后几个概念。</p>
<ol>
<li>组件可能需要在其状态更新时重新呈现，或者当其父级决定更改传递给组件的<code>props</code>时，该组件可能需要重新呈现</li>
<li>如果后者发生，React会调用另一个生命周期方法<code>componentWillReceiveProps</code>。</li>
<li>如果状态对象或传入<code>props</code>被更改，则React有一个重要的决定。 组件应该在DOM中更新吗？ 这就是为什么它在这里调用另一个重要的生命周期方法，<code>shouldComponentUpdate</code>。 这个方法是一个实际的问题，所以如果你需要自己定制或优化渲染过程，你必须通过返回true或false来回答这个问题。</li>
<li>如果没有指定<code>customComponentUpdate</code>，React默认是一个非常聪明的事情，在大多数情况下实际上足够好。</li>
<li>首先，React在此时调用另一个生命周期方法<code>componentWillUpdate</code>。 然后React将计算新的渲染输出并将其与最后渲染的输出进行比较。</li>
<li>如果渲染的输出完全一样，React什么都不做。</li>
<li>如果存在差异，则React会将这些差异映射到浏览器内。</li>
<li>无论如何，由于更新过程无论如何（即使输出完全相同），React会调用最终的生命周期方法<code>componentDidUpdate</code>。</li>
</ol>
<p>生命周期方法实际上是舱口。 如果你没有做任何事情，你可以创建没有他们的完整的应用程序。 他们可以用来非常方便地分析应用程序中发生的情况，并进一步优化了React更新的性能。</p>
<p>根据以上学到的东西（或其中的一部分，真的），您就可以开始创建一些有趣的React应用程序。 如果您渴望了解更多信息，<a href="https://www.pluralsight.com/courses/react-js-getting-started" rel="nofollow noreferrer" target="_blank">请访问我们的Plactsight的React.js课程入门</a>：</p>
<p>翻译自All the fundamental React.js concepts, jammed into this single Medium article</p>
<p>关注我的公众号，更多优质文章定时推送</p>
<p><span class="img-wrap"><img data-src="/img/bVVbe2?w=344&amp;h=344" src="https://static.alili.tech/img/bVVbe2?w=344&amp;h=344" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一篇包含了react所有基本点的文章

## 原文链接
[https://segmentfault.com/a/1190000011205580](https://segmentfault.com/a/1190000011205580)

