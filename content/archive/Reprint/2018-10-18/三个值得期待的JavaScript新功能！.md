---
title: 三个值得期待的JavaScript新功能！
hidden: true
categories: reprint
slug: 31c9727c
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p>让我们来看看JavaScript中一些有用的即将推出的功能。您将看到他们的语法，链接以及时了解他们的进度，我们将编写一个小型测试套件，以展示如何立即开始使用这些提案！</p>
<h4>JavaScript是如何更新迭代的</h4>
<p><img src="https://p0.ssl.qhimg.com/t012c890e6986d3fd3b.png" alt=""></p>
<p>如果您已经熟悉<a href="http://www.ecma-international.org/memento/TC39.htm"><em>Ecma TC39</em></a>委员会如何决定并处理JavaScript语言的变更，请随意跳过此部分。</p>
<p>对于我们其他对JavaScript编程语言如何发展感到好奇的人，我想快速概述一下这个过程。</p>
<p>JavaScript是一种名为<a href="https://en.wikipedia.org/wiki/ECMAScript">ECMAScript</a>的语言标准的实现，它被创建用于标准化语言的所有<a href="https://en.wikipedia.org/wiki/Category:JavaScript_dialect_engines">实现</a>，因为它是在Web浏览器的早期发展而来的。</p>
<p>已经有八个版本的<a href="https://en.wikipedia.org/wiki/ECMAScript#Versions">ECMAScript标准</a> ，有七个版本（第四版被放弃）。</p>
<p>每个<a href="https://en.wikipedia.org/wiki/JavaScript_engine#JavaScript_engines">JavaScript引擎</a>开始实现每次发布后指定的更改。<a href="https://kangax.github.io/compat-table/es6/">此图</a>表将显示并非每个引擎都实现每个功能，并且某些引擎需要比其他引擎更长的时间来实现这些功能。虽然这可能看起来不是最佳的，但我相信它比没有标准更好！</p>
<h4>建议</h4>
<p>每个ECMAScript版本都经过审核提案的过程。如果提案被认为有用且向后兼容，则将包含在下一版中。</p>
<p>提案有五个阶段，在<a href="https://tc39.github.io/process-document/">本文档中概述</a>。每个提案都是最初提出的“strawman”或<a href="https://github.com/tc39/proposals/blob/master/stage-0-proposals.md">stage 0</a>。在这个级别，他们要么尚未提交给技术委员会，要么尚未被拒绝，但仍未达到进入下一阶段的标准。</p>
<p>下面显示的提案都不属于第0阶段。</p>
<p>作为个人推荐，我想鼓励读者避免在生产应用程序中使用0阶段提案，直到它们处于不稳定的阶段。此建议的目的只是为了避免在提案被放弃或彻底更改时出现问题。</p>
<h4>测试套件</h4>
<p>编程功能的介绍通常会显示脱离上下文的代码段，或者使用这些功能来构建应用程序。由于我是<a href="https://en.wikipedia.org/wiki/Test-driven_development">TDD</a>的忠实粉丝，我相信更好的方法来了解功能的作用是测试它。</p>
<p>我们将使用<a href="https://smile.amazon.com/Test-Driven-Development-Kent-Beck/dp/0321146530/ref=smi_www_rco2_go_smi_2609328962?_encoding=UTF8&amp;%2AVersion%2A=1&amp;%2Aentries%2A=0&amp;ie=UTF8">Jim Newkirk创造的学习测试来实现这一目标</a> _._，我们编写的测试将使断言不是关于我们自己的代码，而是关于编程语言本身。在学习第三方API或任何其他语言功能时，这个相同的概念非常有用。</p>
<h4>Transpilers</h4>
<p><em>如果您已熟悉转换器，请随意跳过此部分。</em></p>
<p>有些人可能想知道我们将如何使用尚未实现的语言功能！</p>
<p>JavaScript是一种不断发展的语言，它带有一些将JavaScript编译成JavaScript的<a href="https://scotch.io/tutorials/javascript-transpilers-what-they-are-why-we-need-them">转换器</a> 。在表面上可能听起来不是很有帮助，但我向你保证！</p>
<p>它允许我们编写最新版本的JavaScript - 甚至包括0阶段提案 - 并且仍然能够在当今的运行时环境中执行它，如Web浏览器和Node.js.<a href="https://babeljs.io/repl/#?babili=false&amp;browsers=&amp;build=&amp;builtIns=false&amp;code_lz=GYVwdgxgLglg9mABAEziARgGwKYGUCGAnogBQDOUATgJSIDeAUIopdlCJUhZYgNSIAiADSC-ibgG4GAXwYNQkWAkQR8ABxhR8mGAC9spbrUbNW7TuKoBtAAwBdAHRQ4AVTVrslAML4y2ErT83A5kGNwwYADmJACM1FKy8uDQ8EjYAB4QmPgwALaGVMZMLGwcXFRiAOQAhJUJcr6EkIgKKcpQ2BQB9EwA9L3i2AYAFnAA7oiaiLlwyDDAMJ2IUMMGjc2tSkh9A-ggUIg4-ABuSysGnQBMNjEArCpwuWr4sFgGm6lkiNoI2AD8MiAA&amp;debug=false&amp;forceAllTransforms=false&amp;shippedProposals=false&amp;circleciRepo=&amp;evaluate=false&amp;fileSize=false&amp;lineWrap=false&amp;presets=es2015%2Creact%2Cstage-0&amp;prettier=false&amp;targets=&amp;version=6.26.0&amp;envVersion=">它通过将我们的代码更改为为旧版本的JavaScript编写而实现此目的</a>。</p>
<p> <a href="https://babeljs.io/">Babel</a>是最受欢迎的JavaScript转发器之一。我们将在马上使用它。</p>
<h4>步骤</h4>
<p>您需要安装<a href="https://nodejs.org/en/">Node.js</a>和<a href="https://www.npmjs.com/">NPM</a>。</p>
<p>为此，您可以在新目录中运行以下命令：</p>
<pre><code class="hljs lsl">npm init -f &amp;&amp; npm i ava@<span class="hljs-number">1.0</span><span class="hljs-number">.0</span>-beta<span class="hljs-number">.3</span> @babel/preset-env@<span class="hljs-number">7.0</span><span class="hljs-number">.0</span>-beta<span class="hljs-number">.42</span> @babel/preset-stage<span class="hljs-number">-0</span>@<span class="hljs-number">7.0</span><span class="hljs-number">.0</span>-beta<span class="hljs-number">.42</span> @babel/register@<span class="hljs-number">7.0</span><span class="hljs-number">.0</span>-beta<span class="hljs-number">.42</span> @babel/polyfill@<span class="hljs-number">7.0</span><span class="hljs-number">.0</span>-beta<span class="hljs-number">.42</span> @babel/plugin-transform-runtime@<span class="hljs-number">7.0</span><span class="hljs-number">.0</span>-beta<span class="hljs-number">.42</span> @babel/runtime@<span class="hljs-number">7.0</span><span class="hljs-number">.0</span>-beta<span class="hljs-number">.42</span> --save-dev
</code></pre><p>然后，您需要将以下内容添加到package.json文件中：</p>
<pre><code class="hljs perl"><span class="hljs-string">"scripts"</span>: {  <span class="hljs-string">"test"</span>: <span class="hljs-string">"ava"</span>},<span class="hljs-string">"ava"</span>: {      <span class="hljs-string">"require"</span>: [          <span class="hljs-string">"@babel/register"</span>,    <span class="hljs-string">"@babel/polyfill"</span>     ]  }
</code></pre><p>最后创建一个.babelrc文件：</p>
<pre><code class="hljs json">{    <span class="hljs-attr">"presets"</span>: [        [<span class="hljs-string">"@babel/preset-env"</span>, {            <span class="hljs-attr">"targets"</span>: {                <span class="hljs-attr">"node"</span>: <span class="hljs-string">"current"</span>            }        }],        <span class="hljs-string">"@babel/preset-stage-0"</span>    ],    <span class="hljs-attr">"plugins"</span>: [        <span class="hljs-string">"@babel/plugin-transform-runtime"</span>  ]}
</code></pre><p>现在你准备开始写一些测试了！</p>
<h3>1.可选链接</h3>
<p>在JavaScript中，我们一直在使用Objects。有时这些物体没有我们期望的确切形状。下面你会找到一个人为的数据对象示例 - 可能是从数据库或API调用中检索到的。</p>
<pre><code class="hljs haskell"><span class="hljs-title">const</span> <span class="hljs-class"><span class="hljs-keyword">data</span> = {  <span class="hljs-title">user</span>: {    <span class="hljs-title">address</span>: {      <span class="hljs-title">street</span>: '<span class="hljs-type">Pennsylvania</span> <span class="hljs-type">Avenue</span>',    },   },};</span>
</code></pre><p>哎呀，看起来这个用户没有完成注册：</p>
<pre><code class="hljs haskell"><span class="hljs-title">const</span> <span class="hljs-class"><span class="hljs-keyword">data</span> = {  <span class="hljs-title">user</span>: {},};</span>
</code></pre><p>假设，当我尝试访问应用程序仪表板上的街道时，我会收到以下错误：</p>
<pre><code class="hljs coffeescript"><span class="hljs-built_in">console</span>.log(data.user.address.street);
<span class="hljs-regexp">//</span> Uncaught TypeError: Cannot read property <span class="hljs-string">'street'</span> <span class="hljs-keyword">of</span> <span class="hljs-literal">undefined</span>
</code></pre><p>为避免这种情况，我们目前必须访问“street”属性，如下所示：</p>
<pre><code class="hljs armasm"><span class="hljs-symbol">const</span> <span class="hljs-keyword">street </span>= <span class="hljs-meta">data</span> &amp;&amp; <span class="hljs-meta">data</span>.user &amp;&amp; <span class="hljs-meta">data</span>.user.<span class="hljs-keyword">address </span>&amp;&amp; <span class="hljs-meta">data</span>.user.<span class="hljs-keyword">address.street;console.log(street);
</span>// undefined
</code></pre><p>在我看来，这种方法是：</p>
<ol>
<li>不美观</li>
<li>繁重</li>
<li>啰嗦</li>
</ol>
<p>这里是可选链接的地方。您可以像这样使用它：</p>
<pre><code class="hljs lasso">console.<span class="hljs-keyword">log</span>(<span class="hljs-built_in">data</span>.user?.address?.street);
<span class="hljs-comment">// undefined</span>
</code></pre><p>那更容易，对吧？现在我们已经看到了这个功能的用处，我们可以继续深入研究。</p>
<p>所以我们来写一个测试！</p>
<p>现在我们看到可选链接保持了点符号的先前功能。接下来，让我们为不愉快的路径添加一个测试。</p>
<p>以下是可选链接如何用于数组属性访问：</p>
<p>有时我们不知道函数是否在Object中实现。</p>
<p>一个常见的例子是当您使用Web浏览器时。某些旧版浏览器可能没有某些功能。值得庆幸的是，我们可以使用可选链接来检测函数是否已实现！</p>
<p>如果链不完整，表达式将不会执行。在幕后，表达式大致转变为：</p>
<pre><code class="hljs cs"><span class="hljs-keyword">value</span> == <span class="hljs-literal">null</span> ? <span class="hljs-keyword">value</span>[some expression here]: undefined;
</code></pre><p>在可选链操作符之后没有什么？如果值未定义或为null，则将执行。我们可以在以下测试中看到该规则的实际应用：</p>
<p>有了它！可选链接减少了对if语句，lodash等导入库以及使用&amp;&amp;进行链接的需求。</p>
<blockquote>
<p>一句警告: 您可能会注意到使用此可选链带来了一些最小的开销。您检查的每个级别？必须包含在引擎盖下的某种条件逻辑中。如果过度使用，将导致性能损失。当你收到或创建对象时，我建议使用它进行某种对象验证。这将限制对这些检查的需求，从而限制性能损失。</p>
</blockquote>
<h4>链接</h4>
<p>这是该提案的<a href="https://github.com/TC39/proposal-optional-chaining">链接</a>。我也会在这篇文章的底部复制它，以便您可以在一个地方看到所有提案链接！</p>
<h3>2. 空值合并</h3>
<blockquote>
<p>合并：融合或融合在一起</p>
</blockquote>
<p>以下是我们在JavaScript中看到的一些常见操作：</p>
<ol>
<li>检查未定义或空值</li>
<li>Defaulting Values</li>
<li>确保0，false和空字符串不是默认值。</li>
</ol>
<p>您可能已经看到它像这样：</p>
<pre><code class="hljs cs"><span class="hljs-keyword">value</span> != <span class="hljs-literal">null</span> ? <span class="hljs-keyword">value</span> : <span class="hljs-string">'default value'</span>;
</code></pre><p>或者这样：</p>
<pre><code class="hljs ceylon"><span class="hljs-keyword">value</span> || <span class="hljs-string">'default value'</span>
</code></pre><p>问题是，对于第二个实现，我们的第三个操作条件不满足。在这种情况下，数字零，布尔值false和空字符串都被视为false。这就是我们必须明确检查null和undefined的原因。</p>
<pre><code class="hljs cs"><span class="hljs-keyword">value</span> != <span class="hljs-literal">null</span>
</code></pre><p>这与：</p>
<pre><code class="hljs cs"><span class="hljs-keyword">value</span> !== <span class="hljs-literal">null</span> &amp;&amp; <span class="hljs-keyword">value</span> !== undefined
</code></pre><p>这就是新提案（无效合并）的用武之地。现在我们可以这样做：</p>
<pre><code class="hljs ceylon"><span class="hljs-keyword">value</span> ?? <span class="hljs-string">'default value'</span>;
</code></pre><p>这可以保护我们不会意外地默认那些虚假的值，但是仍然会在没有三元和！= null检查的情况下捕获null和undefined。</p>
<p>现在我们看到了语法，我们可以编写一个简单的测试来验证它是如何工作的。</p>
<p>您可以在测试中看到它使用null，undefined和void 0的默认值（计算结果为undefined）。它不会默认虚假值，如0，''和false。在<a href="https://github.com/tc39/proposal-nullish-coalescing">这里</a>查看GitHub。</p>
<h3>3. 管道运算符</h3>
<p>在函数式编程中，我们有一个术语“<a href="https://medium.com/javascript-scene/composing-software-an-introduction-27b72500d6ea">组合</a>”，它是将多个函数调用链接在一起的行为。每个函数接收前一个函数的输出作为其输入。以下是我们在纯JavaScript中讨论的一个示例：</p>
<pre><code class="hljs ada"><span class="hljs-keyword">function</span> <span class="hljs-title">doubleSay</span> (str) {  <span class="hljs-keyword">return</span> <span class="hljs-type">str</span> + <span class="hljs-string">", "</span> + str;}
</code></pre><pre><code class="hljs matlab"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">capitalize</span> <span class="hljs-params">(str)</span> {  <span class="hljs-title">return</span> <span class="hljs-title">str</span><span class="hljs-params">[0]</span>.<span class="hljs-title">toUpperCase</span><span class="hljs-params">()</span> + <span class="hljs-title">str</span>.<span class="hljs-title">substring</span><span class="hljs-params">(1)</span>;}</span>
</code></pre><pre><code class="hljs ada"><span class="hljs-keyword">function</span> <span class="hljs-title">exclaim</span> (str) {  <span class="hljs-keyword">return</span> <span class="hljs-type">str</span> + <span class="hljs-string">'!'</span>;}
</code></pre><pre><code class="hljs lisp">let result = exclaim(<span class="hljs-name">capitalize</span>(<span class="hljs-name">doubleSay</span>(<span class="hljs-string">"hello"</span>)))<span class="hljs-comment">;result //=&gt; "Hello, hello!"</span>
</code></pre><p>这种串联是如此常见，以至于组合函数存在于大多数功能库中，如<a href="https://lodash.com/docs/4.17.5#flow">lodash</a>和<a href="http://ramdajs.com/docs/#compose">ramda</a>。</p>
<p>使用新的管道运算符，您可以跳过第三方库并按如下所示编写上述内容：</p>
<pre><code class="hljs coq"><span class="hljs-keyword">let</span> result = <span class="hljs-string">"hello"</span>  |<span class="hljs-type">&gt; doubleSay</span>  |<span class="hljs-type">&gt; capitalize</span>  |<span class="hljs-type">&gt; exclaim</span>;result //=&gt; <span class="hljs-string">"Hello, hello!"</span>
</code></pre><p>目的是使_链_更具可读性。它也将在未来部分应用中很好地工作，或者现在它可以像这样实现：</p>
<pre><code class="hljs coq"><span class="hljs-keyword">let</span> result = <span class="hljs-number">1</span>  |<span class="hljs-type">&gt; (_</span> =&gt; Math.max(<span class="hljs-number">0</span>, <span class="hljs-keyword">_</span>));result //=&gt; <span class="hljs-number">1</span>
</code></pre><pre><code class="hljs coq"><span class="hljs-keyword">let</span> result = <span class="hljs-number">-5</span>  |<span class="hljs-type">&gt; (_</span> =&gt; Math.max(<span class="hljs-number">0</span>, <span class="hljs-keyword">_</span>));result //=&gt; <span class="hljs-number">0</span>
</code></pre><p>现在我们看到了语法，我们可以开始编写测试了！</p>
<p>您可能注意到的一件事是，一旦将异步函数添加到管道，您必须等待该值。这是因为价值已成为承诺。有一些<a href="https://github.com/tc39/proposal-pipeline-operator">建议的更改</a>支持|&gt;等待asyncFunction，但尚未实现或决定。</p>
<p>好了，既然你已经看到了这些建议的实际应用，我希望你能够尝试一下这些建议！</p>
<p>学习测试的完整代码可以在这里<a href="https://github.com/JustinDFuller/javascript-proposals-tests">找到</a>。</p>
<p>以下是所有四个提案链接 :</p>
<p><a href="https://github.com/TC39/proposal-optional-chaining" title="https://github.com/TC39/proposal-optional-chaining"><strong>tc39/proposal-optional-chaining</strong> _Contribute to proposal-optional-chaining development by creating an account on GitHub._github.com</a><a href="https://github.com/TC39/proposal-optional-chaining"></a></p>
<p><a href="https://github.com/tc39/proposal-nullish-coalescing" title="https://github.com/tc39/proposal-nullish-coalescing"><strong>tc39/proposal-nullish-coalescing</strong> _proposal-nullish-coalescing - Nullish coalescing proposal x ?? y_github.com</a><a href="https://github.com/tc39/proposal-nullish-coalescing"></a></p>
<p><a href="https://github.com/tc39/proposal-partial-application" title="https://github.com/tc39/proposal-partial-application"><strong>tc39/proposal-partial-application</strong> _proposal-partial-application - Proposal to add partial application to ECMAScript_github.com</a><a href="https://github.com/tc39/proposal-partial-application"></a></p>
<p><a href="https://github.com/tc39/proposal-pipeline-operator" title="https://github.com/tc39/proposal-pipeline-operator"><strong>tc39/proposal-pipeline-operator</strong> _proposal-pipeline-operator - A proposal for adding the simple-but-useful pipeline operator to JavaScript._github.com</a><a href="https://github.com/tc39/proposal-pipeline-operator"></a></p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/here-are-three-upcoming-changes-to-javascript-that-you-ll-love](https://www.zcfy.cc/article/here-are-three-upcoming-changes-to-javascript-that-you-ll-love)
原文标题: 三个值得期待的JavaScript新功能！
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
