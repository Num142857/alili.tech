---
title: JSX 这么6？
hidden: true
categories: reprint
slug: dd3b254f
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p>本文会先解释一下JSX的工作原理，再介绍一下如何用“不寻常”的方式来使用JSX。如果你已经了解了JSX的工作原理，可以跳过第一部分。如果你只想学一些实用的东西，那可以跳过第二部分。</p>
<hr>
<p>上周，我发了一条这样的动态：</p>
<p><img src="https://p0.ssl.qhimg.com/t01cd1072f7232d8f1c.png" alt=""></p>
<p>可以看出大家都很喜欢，他们评论区里纷纷留言：“呕”，“这都做了些什么啊”，“天！XML 又回来了”，“又是黑暗的一天” 。我写这篇文章就是为了回报他们的爱。（当然我也和<a href="https://medium.com/@lpalmes">Lorenzo Palmes</a> 打赌，如果这篇tweet收到100个赞我就会写这篇文章，同时感谢 <a href="https://medium.com/@ken_wheeler">Ken Wheeler</a>的转发).</p>
<hr>
<h4>JSX</h4>
<p>只要你用过React，就应该大概了解过 JSX，一种用于创建 React 元素的类 XML 语法：</p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getGreeting</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"greeting"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">foo</span>=<span class="hljs-string">"bar"</span>&gt;</span>Hello!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Good to see you {name}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

</code></pre><p>因为浏览器还不支持 JSX，所以在运行前，需要将代码转换为普通的 JavaScript。从对开发者友好的代码转换成对浏览器友好的代码这项工作，通常都是用 Babel 这样的工具来做。Babel 编译后，<code>getGreeting</code>函数就会被编译成下面这样：</p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getGreeting</span><span class="hljs-params">(name)</span> </span>{
  <span class="hljs-keyword">return</span> React.createElement(
    <span class="hljs-string">"div"</span>,
    { className: <span class="hljs-string">"greeting"</span> },
    React.createElement(<span class="hljs-string">"h1"</span>, { foo: <span class="hljs-string">"bar"</span> }, <span class="hljs-string">"Hello!"</span>),
    React.createElement(<span class="hljs-string">"h2"</span>, <span class="hljs-literal">null</span>, <span class="hljs-string">"Good to see you "</span>, name)
  );
}

</code></pre><p><a href="http://babeljs.io/repl/#?babili=false&amp;browsers=&amp;build=&amp;builtIns=false&amp;code_lz=GYVwdgxgLglg9mABAcwKZQOICdXpmZACjAEMBbVASkQG8AoRRHKELJQhxxAHgBMYAboggAbEgGdxAOXKoAvACJkOPAQUA-Tlx4ALAIyJgcOIoBGJLBoASqESLgBCbgHp9m7Y246ATOozHeRCg4RHFcRABPOBBaUgoAXxcfdy4XfgEUygBuOnigA&amp;debug=false&amp;forceAllTransforms=false&amp;shippedProposals=false&amp;circleciRepo=&amp;evaluate=false&amp;fileSize=false&amp;lineWrap=false&amp;presets=latest%2Creact&amp;prettier=true&amp;targets=&amp;version=6.26.0&amp;envVersion=1.6.2">Babel REPL</a></p>
<p>在这个不同的语法中，所有的标签名、属性名、属性值以及文本内容都没有改变。那么<code>React.createElement</code>是什么？</p>
<p><code>React.createElement</code>是 React 用来创建元素的方法。因为JSX通常与React同时使用，所以 Babel 默认注入这个方法，但实际情况并非如此。事实上，JSX 是从React中脱离出来的，JSX 是用于在 JS 中使用类似 XML 的语法定义树结构的规范。这个树结构可以是一个 React 组件渲染的元素，也可以是完全不同的其他的东西。</p>
<p>为了不只是在 React 中使用 JSX，我们需要告诉 Babel 使用其他的函数来代替<code>React.createElement</code>。只要在文件中添加<code>/* @jsx 另一个函数名 /</code>这样的注释就行了。例如：</p>
<pre><code class="hljs javascript"><span class="hljs-comment">/** @jsx foo */</span>
<span class="hljs-keyword">var</span> bar = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">x</span>&gt;</span>Hi<span class="hljs-tag">&lt;/<span class="hljs-name">x</span>&gt;</span></span>;
<span class="hljs-keyword">var</span> bax = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Y</span>&gt;</span>Hi<span class="hljs-tag">&lt;/<span class="hljs-name">Y</span>&gt;</span></span>;

<span class="hljs-comment">// becomes:</span>
<span class="hljs-keyword">var</span> bar = foo(<span class="hljs-string">"x"</span>, <span class="hljs-literal">null</span>, <span class="hljs-string">"Hi"</span>);
<span class="hljs-keyword">var</span> bax = foo(Y, <span class="hljs-literal">null</span>, <span class="hljs-string">"Hi"</span>);

</code></pre><p>最后要说的一点是，Babel会根据元素名称的大小写使用不同的方式处理JSX。小写字母名称会以字符串参数的形式进行传递，首字母大写的名称则会作为函数进行传递，就像在代码段中一样。</p>
<h4>数学中的JSX</h4>
<blockquote>
<p>免责声明：从这里开始，你可能什么都学不到，我将会在一些JSX不该出现的地方使用它。</p>
</blockquote>
<p>我们可以使用<code>Math.sqrt(a * a + b * b)</code>来算a和b的弦等于多少，但这一点都不好玩。我们可以用JSX来计算这个：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> Sum = <span class="hljs-function">(<span class="hljs-params">...args</span>) =&gt;</span> args.reduce(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a + b, <span class="hljs-number">0</span>);
<span class="hljs-keyword">const</span> Pow = <span class="hljs-function">(<span class="hljs-params">{ exponent }, base</span>) =&gt;</span> <span class="hljs-built_in">Math</span>.pow(base, exponent);
<span class="hljs-keyword">const</span> Sqrt = <span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> <span class="hljs-built_in">Math</span>.sqrt(x);

<span class="hljs-keyword">const</span> Hypotenuse = <span class="hljs-function">(<span class="hljs-params">{ a, b }</span>) =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Sqrt</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Sum</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Pow</span> <span class="hljs-attr">exponent</span>=<span class="hljs-string">{2}</span>&gt;</span>{a}<span class="hljs-tag">&lt;/<span class="hljs-name">Pow</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Pow</span> <span class="hljs-attr">exponent</span>=<span class="hljs-string">{2}</span>&gt;</span>{b}<span class="hljs-tag">&lt;/<span class="hljs-name">Pow</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Sum</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Sqrt</span>&gt;</span></span>
);

<span class="hljs-comment">/** @jsx calc */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">calc</span>(<span class="hljs-params">operation, props, ...args</span>) </span>{
  <span class="hljs-keyword">let</span> params = props ? [props] : [];
  params = params.concat(...args);
  <span class="hljs-keyword">return</span> operation(...params);
}

<span class="hljs-built_in">console</span>.log(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Hypotenuse</span> <span class="hljs-attr">a</span>=<span class="hljs-string">{3}</span> <span class="hljs-attr">b</span>=<span class="hljs-string">{4}</span> /&gt;</span>);

</span></code></pre><p><a href="https://codepen.io/pomber/pen/BRmOBX?editors=0012">codepen</a></p>
<p>这里还有另一个版本的<code>hypotenuse</code>可以接收两个以上的参数：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> Hypotenuse = <span class="hljs-function">(<span class="hljs-params">{ values }</span>) =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Sqrt</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Sum</span>&gt;</span>{values.map(v =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">Pow</span> <span class="hljs-attr">exponent</span>=<span class="hljs-string">{2}</span>&gt;</span>{v}<span class="hljs-tag">&lt;/<span class="hljs-name">Pow</span>&gt;</span>)}<span class="hljs-tag">&lt;/<span class="hljs-name">Sum</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Sqrt</span>&gt;</span></span>
);

<span class="hljs-built_in">console</span>.log(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Hypotenuse</span> <span class="hljs-attr">values</span>=<span class="hljs-string">{[3,</span> <span class="hljs-attr">4</span>, <span class="hljs-attr">5</span>]} /&gt;</span>);

</span></code></pre><p><a href="https://codepen.io/pomber/pen/JvrmgR?editors=0012">codepen</a></p>
<h4>无所不能的JSX</h4>
<p>接下来尝试做一些更神奇的事情，我们来试试归并排序。</p>
<p>首先，使用RamdaJS来给我们的组件加入一些初始功能。otaku</p>
<pre><code class="hljs tp">import <span class="hljs-keyword">R</span> from <span class="hljs-string">"ramda"</span>;
var divisibleBy = <span class="hljs-keyword">R</span>.curry(<span class="hljs-keyword">R</span>.pipe(<span class="hljs-keyword">R</span>.flip(<span class="hljs-keyword">R</span>.modulo), <span class="hljs-keyword">R</span>.equals(<span class="hljs-number">0</span>)));
var fizzbuzz = <span class="hljs-keyword">R</span>.map(
  <span class="hljs-keyword">R</span>.cond([
    [<span class="hljs-keyword">R</span>.both(divisibleBy(<span class="hljs-number">3</span>), divisibleBy(<span class="hljs-number">5</span>)), <span class="hljs-keyword">R</span>.always(<span class="hljs-string">"FizzBuzz"</span>)],
    [divisibleBy(<span class="hljs-number">3</span>), <span class="hljs-keyword">R</span>.always(<span class="hljs-string">"Fizz"</span>)],
    [divisibleBy(<span class="hljs-number">5</span>), <span class="hljs-keyword">R</span>.always(<span class="hljs-string">"Buzz"</span>)],
    [<span class="hljs-keyword">R</span>.T, <span class="hljs-keyword">R</span>.identity]
  ])
);
console.log(fizzbuzz(<span class="hljs-keyword">R</span>.range(<span class="hljs-number">1</span>, <span class="hljs-number">16</span>)));

</code></pre><p>Code from <a href="https://codereview.stackexchange.com/q/108449/71676">stackexchange codereview</a></p>
<p>我们可以使用 JSX 写出相同的代码，只需要编写与JSX元素名称匹配的函数去调用ramda函数就好了：</p>
<pre><code class="hljs javascript"><span class="hljs-comment">/** @jsx run */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">run</span>(<span class="hljs-params">f, props, ...args</span>) </span>{
  <span class="hljs-keyword">return</span> R[f](...args);
}

<span class="hljs-keyword">var</span> divisibleBy = (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">curry</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">pipe</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">flip</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">modulo</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">flip</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">equals</span>&gt;</span>{0}<span class="hljs-tag">&lt;/<span class="hljs-name">equals</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">pipe</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">curry</span>&gt;</span></span>
);

<span class="hljs-keyword">var</span> fizzbuzz = (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">map</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">cond</span>&gt;</span>
      {[
        [
          <span class="hljs-tag">&lt;<span class="hljs-name">both</span>&gt;</span>
            {divisibleBy(3)}
            {divisibleBy(5)}
          <span class="hljs-tag">&lt;/<span class="hljs-name">both</span>&gt;</span>,
          <span class="hljs-tag">&lt;<span class="hljs-name">always</span>&gt;</span>"FizzBuzz"<span class="hljs-tag">&lt;/<span class="hljs-name">always</span>&gt;</span>
        ],
        [divisibleBy(3), <span class="hljs-tag">&lt;<span class="hljs-name">always</span>&gt;</span>"Fizz"<span class="hljs-tag">&lt;/<span class="hljs-name">always</span>&gt;</span>],
        [divisibleBy(5), <span class="hljs-tag">&lt;<span class="hljs-name">always</span>&gt;</span>"Buzz"<span class="hljs-tag">&lt;/<span class="hljs-name">always</span>&gt;</span>],
        [R.T, <span class="hljs-tag">&lt;<span class="hljs-name">identity</span> /&gt;</span>]
      ]}
    <span class="hljs-tag">&lt;/<span class="hljs-name">cond</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">map</span>&gt;</span></span>
);

<span class="hljs-built_in">console</span>.log(fizzbuzz(R.range(<span class="hljs-number">1</span>, <span class="hljs-number">16</span>)));

</code></pre><p><a href="https://codepen.io/pomber/pen/qYPQOr?editors=0012">codepen</a></p>
<p>好看了？……并没有。</p>
<p>运行的函数还可以再智能一点，这样可以增加 JSX 代码的 “纯净度”：</p>
<pre><code class="hljs dust"><span class="xml">var FizzBuzz = (
  <span class="hljs-tag">&lt;<span class="hljs-name">map</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">cond</span> <span class="hljs-attr">concat</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">pair</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">both</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">DivisibleBy</span> <span class="hljs-attr">value</span>=</span></span><span class="hljs-template-variable">{3}</span><span class="xml"><span class="hljs-tag"> /&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">DivisibleBy</span> <span class="hljs-attr">value</span>=</span></span><span class="hljs-template-variable">{5}</span><span class="xml"><span class="hljs-tag"> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">both</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">always</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"FizzBuzz"</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">pair</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">pair</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">DivisibleBy</span> <span class="hljs-attr">value</span>=</span></span><span class="hljs-template-variable">{3}</span><span class="xml"><span class="hljs-tag"> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">always</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"Fizz"</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">pair</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">pair</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">DivisibleBy</span> <span class="hljs-attr">value</span>=</span></span><span class="hljs-template-variable">{5}</span><span class="xml"><span class="hljs-tag"> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">always</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"Buzz"</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">pair</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">pair</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">t</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">identity</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">pair</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">cond</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">map</span>&gt;</span>
);

console.log(
  <span class="hljs-tag">&lt;<span class="hljs-name">FizzBuzz</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">range</span>&gt;</span>
      </span><span class="hljs-template-variable">{1}</span><span class="xml">
      </span><span class="hljs-template-variable">{16}</span><span class="xml">
    <span class="hljs-tag">&lt;/<span class="hljs-name">range</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">FizzBuzz</span>&gt;</span>
);

</span></code></pre><p><a href="https://codepen.io/pomber/pen/aGLQZB?editors=0012">codepen</a></p>
<p>现在，你可以用<code>ramda</code>做的所有事情都可以用JSX来做了。你可以使用它来做任何事情，包括归并排序：</p>
<p><img src="https://p0.ssl.qhimg.com/t013a7858c36d8619cf.png" alt=""></p>
<hr>
<p>感谢阅读。</p>
<p>欢迎评论。</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/jsx-can-do-that](https://www.zcfy.cc/article/jsx-can-do-that)
原文标题: JSX 这么6？
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
