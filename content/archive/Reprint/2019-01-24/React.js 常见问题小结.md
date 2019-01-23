---
title: 'React.js 常见问题小结' 
date: 2019-01-24 2:30:11
hidden: true
slug: cn12ljx6gfu
categories: [reprint]
---

{{< raw >}}

            <h4>1 —— 组件名没有用大写字母开头</h4>
<p>React组件名必须大写字母开头。</p>
<p>如果组件名不以大写字母开头，组件会被当作是_内置_元素，像是<code>div</code> 或 <code>span</code>。</p>
<p>例如：</p>
<pre><code class="hljs scala"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">greeting</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{   
  <span class="hljs-comment">// ...  </span>
}
</code></pre><p>如果你要渲染<code>&lt;greeting /&gt;</code>，React会忽略上面内容，你也会收到警告：</p>
<p>Warning: The tag &lt;greeting&gt; is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.</p>
<p>这里更大的问题是当你决定命名你的<code>button</code> 或者 <code>img</code>组件时。React会忽略你的组件，并且只渲染原生的HTML <code>button</code> 或者 <code>img</code>标签。</p>
<p><img src="https://cdn-images-1.medium.com/max/2000/1*1DVD4DOgHfqAYXhQX1YYSw.png"></p>
<p>注意上面的“My Awesome Button”并没有渲染，React只渲染了一个空的HTML button元素。这种情况下React不会警告你。</p>
<h4>2——使用单引号而不是反撇号</h4>
<p>用反撇号(<code>`...`</code>) 创建的字符串和用单引号(<code>'...'</code>)创建的不一样。</p>
<p><em>在大部分键盘上，反撇号 (</em><code>_`_</code><em>)字符可以用</em> <code>_tab_</code> <em>上的那个键输入。</em></p>
<p>当我们需要在字符串里面包含动态表达式的时候（这样就不需要要字符串拼接），我们会创建一个反撇号的字符串。</p>
<pre><code class="hljs clean">`这个字符串模板可以包含表达式`
<span class="hljs-string">'这只是字符串，这里你不能包含表达式'</span>
</code></pre><p>一起看下如果需要一个不间断显示当前时间的字符串：
<code>“Time is ...”</code></p>
<pre><code class="hljs gauss"><span class="hljs-comment">// 当前时间字符串</span>
const <span class="hljs-built_in">time</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().toLocaleTimeString();

<span class="hljs-comment">// 使用一般的字符串（单引或者双引号）时，</span>
<span class="hljs-comment">//你需要使用字符串拼接</span>
'<span class="hljs-built_in">Time</span> is ' + <span class="hljs-built_in">time</span>

<span class="hljs-comment">//当使用反撇号时，</span>
<span class="hljs-comment">//你可以使用${}把时间注入到字符串中</span>
`<span class="hljs-built_in">Time</span> is ${<span class="hljs-built_in">time</span>}`
</code></pre><p>当然，在使用字符串时（通过反撇号），你可以创建一个分为多行的字符串：</p>
<pre><code class="hljs d"><span class="hljs-keyword">const</span> <span class="hljs-keyword">template</span> = <span class="hljs-string">`I

CAN

SPAN

Multiple Lines`</span>;
</code></pre><p>用普通字符串可做不到。</p>
<hr>
<h4>3——使用React.PropTypes</h4>
<p><code>PropTypes</code>对象从React里移除了。其过去是以<code>React.PropTypes</code>的形式被使用，但是再也用不了了。</p>
<p>相应的，你需要：</p>
<ol>
<li>把新的<strong>prop-types</strong>包加到你的项目中：<code>npm install prop-types</code></li>
<li>引入它：<code>import PropTypes from 'prop-types'</code></li>
</ol>
<p>然后你就可以用它了。例如：<code>PropTypes.string</code>。</p>
<p>如果你错误地使用了<code>React.PropTypes</code>，你会得到这样的错误提示：</p>
<p>TypeError: Cannot read property 'string' of undefined</p>
<hr>
<h4>4 ——不使用那些指南里面用的版本</h4>
<p>当看或读代码的内容，以及使用指南里的例子时，确保你使用的是内容里工具的版本。通常，使用工具的最新版本是最安全的方式，但是如果内容过时的话，你可能会遇到一些弃用提醒。</p>
<p>为了确保安全，使用相关工具的主干版本。例如，如果指南用的是React 16，不要去用React 15。</p>
<p>这点对于Node.js也很重要。如果使用旧版的Node，你会遇到一系列问题。例如，如果你正在看一些指南，这些指南使用了<code>Object.values</code>而你在用Node 6.x，那个版本此方法是不存在的。你需要Node 7.x或更高的版本。</p>
<hr>
<h4>5——把函数和类搞混了</h4>
<p>你能看出来下面的代码出了什么问题吗？
class Numbers extends React.Component {<br>  const arrayOfNumbers = _.range(1, 10);</p>
<p>  // ...<br>}</p>
<p>上面的代码之所以无效，是因为在JavaScript类体里你不可以乱写。你只能使用规定的语法定义方法和属性。</p>
<p><em>这让人有点混乱因为类语法里的</em>{}_很像常见的块级作用域，但并不是。 _
在一个由函数构成的组件里，你就可以想怎么搞就怎么搞：
// 这样完全没问题：</p>
<p>const Number = (props) =&gt; {<br>  const arrayOfNumbers = _.range(1, 10);</p>
<p>  // ...<br>};</p>
<hr>
<h4>6 ——将数字作为字符串传递</h4>
<p>你可以用一个字符串传递属性值</p>
<pre><code class="hljs applescript">&lt;Greeting <span class="hljs-built_in">name</span>=<span class="hljs-string">"World"</span> /&gt;
</code></pre><p>如果你需要传递数字类型的值，不要使用字符串：
// 不要这么做</p>
&lt;Greeting counter="7" /&gt;

取而代之，使用花括号传递实际数值：
// 用这个替代
&lt;Greeting counter={7} /&gt;

在 <code>Greeting</code> 组件里面使用<code>{7}</code>，<code>this.props.counter</code>会被赋值<code>7</code>，并且对其进行数学运算也不会有问题。如果你传了<code>“7”</code>还把它当成数字，你可能会运行出意想不到的结果。

<em> </em> <em>


#### 7 ——忘记了另外一个app在用同样的端口

为了运行web服务器，你需要使用host（像是127.0.0.1）和端口（像是8080）来让服务器监听有效http地址的请求。

一旦成功运行，web服务器就占据了那个端口。你就不能让这个端口它用。端口会被占用。

如果你在另外一个终端运行同样的服务器，你会得到一个端口被占用的错误提示。
像是这样：
Error: listen EADDRINUSE 127.0.0.1:8080

注意有时候web服务器会运行在 _后台_或者在分开的屏幕/tumux session。你看不见，但是它一直占据着端口。为了重启服务器，你需要“杀死”正在运行的那个。
为了鉴别正在使用特定端口的进程，你可以使用像<code>ps</code> （ <code>grep</code> 一些关于app的相关信息）的命令，或者如果知道端口号你也可以使用<code>lsof</code>命令：

lsof -i :8080

</em> <em> </em>

#### 8 ——忘了创建环境变量

一些项目要依赖shell环境变量才能运行。如果你在没有所需环境变量的情况下运行这些项目，它们会复制undefined，这样会给你带来潜在的未知错误。

例如，如果项目连到像MongoDB的数据库，有可能它使用了像<code>process.env.MONGO_URI</code> 的环境变量来连接。这就允许项目在不同的环境和不同的MongoDB实例一起使用。

为了本地运行连接到MongoDB的项目，你必须先导出<code>MONGO_URI</code>的环境变量。例如，如果你有一个运行在端口<code>27017</code>的本地MongoDB，你需要在运行项目前做这些：

export MONGO_URI = "mongodb://localhost:27017/mydb"

你可以<em>grep</em>项目源代码，找到<code>process.env</code>来查清楚其运行正常所需要的环境变量。

#### 9——把花括号{}和圆括号()搞混
不要用：
return {<br>  something();<br>};

这样用：
return (<br>  something();<br>);

第一段代码尝试（并且会失败）返回一个对象，然后第二段代码会正确地调用<code>something()</code>函数，并且返回函数返回的内容。

由于JSX里的任何<code>&lt;tag&gt;</code>会被解析成函数调用，当返回任何JSX时这个问题也会出现。

这个问题在箭头函数的缩写语法中也很常见。

不要用：
const Greeting = () =&gt; {<br>  <div><br>    Hello World<br>  </div><br>};

这样用：
const Greeting = () =&gt; (<br>  <div><br>    Hello World<br>  </div><br>);

当你使用带有箭头函数的中括号时，你就新起了一个函数的作用域。箭头函数的缩写语法不用中括号。

<em> </em> <em>

#### 10——不要用圆括号包裹对象

当你想创建一个返回普通对象的短箭头函数时，上面中括号和圆括号的问题同样会让人困扰。

不要用：
const myAction = () =&gt; { type: 'DO_THIS' };

这样用：
const myAction = () =&gt; ({ type: 'DO_THIS'});

如果没有把对象包裹在圆括号里，你就不能使用缩写语法。实际上你会给字符串定义一个标签。

这在<code>setState</code>方法中的<em>updater</em>函数里很常见，因为其需要返回一个对象。如果想使用短箭头函数语法，你需要用圆括号包裹对象。

不要用：
this.setState(prevState =&gt; { answer: 42 });

这样用：
this.setState(prevState =&gt; ({ answer: 42 }));

</em> <em> </em>

#### 11 ——没有正确使用API元素和属性的大小写
是<code>React.Component</code>，而不是<code>React.component</code>。是<code>componentDidMount</code>，而不是<code>ComponentDidMount</code>。_通常_是<code>ReactDOM</code>，而不是<code>ReactDom</code>。

注意下你需要的API大写情况。如果使用了错误的大写，你得到的错误信息可能不会很明确。

当引用<code>react</code> 和 <code>react-dom</code>，确保你引用了正确的名字，以及你使用和你的引用的是完全一样的。ESLint可以帮你指出没有被使用的地方。


在处理组件属性时也会遇到这种问题：
<code>&lt;Greeting userName="Max" /&gt;

// 组件内部，你需要的话
props.userName</code>
如果你没有使用<code>props.userName</code>，而是<code>props.username</code> 或 <code>props.UserName</code>，你会相当于用了一个undefined的值。需要特别留意下这点，当然更好的是配置ESLint，让其也能指出这些问题。

<em> </em> <em>

#### 12——把state对象和实例属性搞混了
在一个类组件里，你可以定义一个本地的<code>state</code>对象，之后可以用<code>this</code>获取之：
<code>class Greeting extends React.Component {  
  **state** = {  
    name: "World",  
  };

  render() {  
    return `Hello ${**this.state**.name}`  
  }  
}</code>
上面的代码会输出“Hello World”。
你也可以不用state，定义其他本地实例属性：
<code>class Greeting extends React.Component {  
  **user** = {  
    name: "World",  
  };

  render() {  
    return `Hello ${**this.user**.name}`  
  }  
}</code>
上面的代码也会输出“Hello World”。
<code>state</code>实例属性特殊之处在于React会处理它。你只可以通过<code>setState</code>改变之，当你这样做时React会有相应的反馈。然而，所有其他你定义的实例属性会在渲染算法上没有效果。正如你希望的一样，你可以在上面的例子中改变<code>this.user</code>，React并不会触发渲染机制。
</em> <em> </em>

#### 13——把&lt;tag/&gt;和&lt;/tag&gt;搞混了

在闭合标签里放错<code>/</code>字符。不可否认，有时你可以使用&lt;tag/&gt;，而其他时间你需要&lt;/tag&gt;。

在HTML里面，有个叫“自闭合标签”（非注释标签）的东西。这些标签表示没有任何子节点的元素。例如， <code>img</code>标签就是一个自闭合元素：
<code>&lt;img src /&gt;</code>
// 不要用<img>
<code>div</code> 标签可以有子元素，因此你可以用开始和结束标签：
<code>&lt;div&gt;  
  Children here...  
&lt;/div&gt;</code>

这点对于React组件也有效。如果组件有子内容，其可能看上去像这样：
<code>&lt;Greeting&gt;Hello!&lt;/Greeting&gt;</code>

// 注意/字符的位置。
如果组件没有子元素，你可以用开始/结束标签书写，或者就用一个自闭合标签：
// 2个有效的方式
<code>`</code>
&lt;Greeting&gt;&lt;/Greeting&gt;

<p>&lt;Greeting /&gt;</p>
<pre><code class="hljs http">

<span class="1c"><span class="hljs-comment">// 注意/字符基于元素闭合状态是如何移动的</span>
<span class="hljs-comment">// 是否是自闭合</span>
下面这种用法是无效的：
<span class="hljs-comment">// 错误</span>
</span></code></pre><p>&lt;Greeting&gt;&lt;Greeting /&gt;</p>
<pre><code class="hljs clean">如果你把`/`字符放错了，你会得到这样的错误：
    Syntax error: Unterminated JSX contents

* * *

#### <span class="hljs-number">14</span>——想当然的认为<span class="hljs-keyword">import</span>/<span class="hljs-keyword">export</span>可以用
<span class="hljs-keyword">import</span>/<span class="hljs-keyword">export</span>特性是JavaScript的官方特性（从<span class="hljs-number">2015</span>年开始）。然而，其只是ES2015的特性，并且还没有在流行浏览器和最新版Node里面被完整支持。

React项目的流行配置是使用Webpack和Babel。这两个都允许使用这一特性，同时把其编译到所有浏览器都可以理解。只有在工作流里存在像Webpack或者Babel的工具时，你才可以使用<span class="hljs-keyword">import</span>/<span class="hljs-keyword">export</span>。

然而，在你的React打包应用中有<span class="hljs-keyword">import</span>/<span class="hljs-keyword">export</span>并不意味你可以在任何相用的地方使用它们！例如，如果你也在通过最新版Node做服务端渲染，会行不通。你很有可能获得“_unexpected token_”的错误信息。

为了让Node也理解<span class="hljs-keyword">import</span>/<span class="hljs-keyword">export</span>（你需要了解它们，如果在前端使用它们，并且也想做SRR的话），你需要有可以编译其的Babel preset（像是_env_ preset），才能在Node端运行。你可以在开发时使用像 _pm2_、 _nodemon_ 和 _babel-watch_的工具做到这点，并且在每次你更改时重启Node。

* * *

#### <span class="hljs-number">15</span>——不绑定句柄方法
_我把这个留到最后是因为这是个很大同时很普遍的问题。_
你可以在React组件里定义类方法，然后在组件的 `render`里使用它们。例如：
</code></pre><p>class Greeting extends React.Component {<br>  <strong>whoIsThis</strong>() {<br>    console.dir(this); // "this" is the <em>caller</em> of whoIsThis<br>    return "World"<br>  }</p>
<p>  render() {<br>    return <code>Hello ${**this.whoIsThis()**}</code><br>  }<br>}</p>
<p>ReactDOM.render(&lt;Greeting /&gt;, mountNode);
<code>`</code></p>
<p>我在<code>render</code> 里以<code>this.whoIsThis</code>的方式使用<code>whoIsThis</code>方法，因为在<code>render</code>里，<code>this</code>关键字指向的是和DOM元素相关联的组件实例，而这个DOM元素也代表了组件。</p>
<p>React内部实现确保了类方法里的“<code>this</code>”指向实例。然而，当你使用 <code>whoIsThis</code> 方法的_引用_时， JavaScript没有自动绑定实例。</p>
<p>在<code>whoIsThis</code>里的<code>console.dir</code>那行会正确显示组件实例，因为方法是<code>render</code>方法里用一个_显式_调用对象(<code>this</code>)来调用的。当你执行上面代码时，你可以看下console里的<code>Greeting</code>对象。
<img src="https://cdn-images-1.medium.com/max/2000/1*kaoe2WU6rYWm2M5pTNfdlg.png" alt=""></p>
<p>然而，当你在<em>延迟执行</em>通道，例如<em>事件处理</em>里执行同样方法时，调用对象将不再是显性的，<code>console.dir</code>那样也不会显示对象实例。
查看代码和下面的（点击后的）输出
<img src="https://cdn-images-1.medium.com/max/2000/1*0A_QcuHnHG3IjMTiTySFaA.png" alt=""></p>
<p>上面的代码中，当你点击字符串时React会调用<code>whoIsThis</code>方法，但是在方法内部，其不会让你获取到组件实例。这就是当我们点击字符串时，你得到<code>undefined</code>的原因。如果你的类方法需要使用像<code>this.props</code> 和 <code>this.state</code>这样的方法，这就会是个大问题。它就是不会生效。
这个问题有很多解决方案。你可以把方法放在一个内联函数里，或者使用<code>.bind</code>调用来强制方法记住它的调用者。这两点对于不频繁更新的组件都是可以的。你也可以通过在类的<em>constructor</em>里优化bind方法，而不是在render方法里。然后，对于这个方法最好的解决方案是通过Babel来使用ECMAScript类域特性（目前还是stage-3），这样对于处理程序只需使用箭头函数就可以了：</p>
<p>class Greeting extends React.Component {<br>  <strong>whoIsThis = () =&gt; {<br>    console.dir(this);<br>  }</strong></p>
<p>  render() {<br>    return (<br>     </p><div><br>        Hello World<br>      </div><br>    );<br>  }<br>}<p></p>
<p>这样会和预期一样执行：
<img src="https://cdn-images-1.medium.com/freeze/max/60/1*yXSginjJHz7jZsCG_-K6Mw.png?q=20" alt=""></p>
<p><img src="https://cdn-images-1.medium.com/max/2000/1*yXSginjJHz7jZsCG_-K6Mw.png"></p>
<p>这就是本文所有内容了。感谢阅读。</p>
<hr>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React.js 常见问题小结

## 原文链接
[https://www.zcfy.cc/article/react-js-frequently-faced-problems-samer-buna-medium](https://www.zcfy.cc/article/react-js-frequently-faced-problems-samer-buna-medium)

