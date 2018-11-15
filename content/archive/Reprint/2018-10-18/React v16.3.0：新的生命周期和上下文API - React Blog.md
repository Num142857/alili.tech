---
title: React v16.3.0：新的生命周期和上下文API - React Blog
hidden: true
categories: reprint
slug: ca95dd4a
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p>作者 <a href="https://github.com/bvaughn">Brian Vaughn</a>     2018年3月29日 </p>
<p>几天前， 我们 <a href="https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html">写了一篇关于对以前的生命周期方法进行更改的文章</a>, 包括逐步迁移策略。 在React 16.3.0中， 我们正在添加一些新的生命周期方法来辅助迁移。我们还为长期被要求的功能引入了新的API： 一个官方的context API，一个转发的ref API和一个更符合人类使用的ref API.</p>
<p><a href="https://reactjs.org/#official-context-api">继续阅读以了解更多关于该版本的信息。</a></p>
<h2>官方 Context API</h2>
<p>多年来，React仅提供了一个实验性的context API。尽管它是一个非常强大的API，但是，因为它固有问题以及我们打算用一个更好的API来替换这个实验的API，所以这个API一般不被推荐使用。</p>
<p>版本16.3引入了一个新的context API，它非常高效并且支持静态类型检查和深度更新。</p>
<blockquote>
<p><strong>注意</strong></p>
<p>旧的context API将继续适用于所有React 1.6x版本，所以你将有足够的时间进行迁移。 </p>
</blockquote>
<p>下面是一个例子，说明如何使用新的context API注入一个『theme』：  </p>
<pre><code class="hljs scala">const <span class="hljs-type">ThemeContext</span> = <span class="hljs-type">React</span>.createContext(<span class="hljs-symbol">'ligh</span>t');

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ThemeProvider</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  state = {theme: <span class="hljs-symbol">'ligh</span>t'};

  render() {
    <span class="hljs-keyword">return</span> (
      `&lt;<span class="hljs-type">ThemeContext</span>.<span class="hljs-type">Provider</span> value={<span class="hljs-keyword">this</span>.state.theme}&gt;`
        {<span class="hljs-keyword">this</span>.props.children}
      `&lt;/<span class="hljs-type">ThemeContext</span>.<span class="hljs-type">Provider</span>&gt;`
    );
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ThemedButton</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      `&lt;<span class="hljs-type">ThemeContext</span>.<span class="hljs-type">Consumer</span>&gt;`
        {theme =&gt; `&lt;<span class="hljs-type">Button</span> theme={theme} /&gt;`}
      `&lt;/<span class="hljs-type">ThemeContext</span>.<span class="hljs-type">Consumer</span>&gt;`
    );
  }
}

</code></pre><p><a href="https://reactjs.org/docs/context.html">了解更多关于新的context API的信息。</a></p>
<h2><a href="https://reactjs.org/#createref-api"><code>createRef</code> API</a></h2>
<p>先前, React 提交供了两种管理refs的方法：传统的字符串形式API和回调函数API。尽管字符串引用API是两者中使用最方便的，但它也有<a href="https://github.com/facebook/react/issues/1373">几个缺点</a> ，所有我们官方的建议是使用回调函数形式代替它。</p>
<p>版本16.3增加了一个管理refs的新的选项，它提供了使用字符串形式ref的便利性而且没有任务缺点：</p>
<pre><code class="hljs scala"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor(props) {
    <span class="hljs-keyword">super</span>(props);

    <span class="hljs-keyword">this</span>.inputRef = <span class="hljs-type">React</span>.createRef();
  }

  render() {
    <span class="hljs-keyword">return</span> `&lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span> ref={<span class="hljs-keyword">this</span>.inputRef} /&gt;`;
  }

  componentDidMount() {
    <span class="hljs-keyword">this</span>.inputRef.current.focus();
  }
}

</code></pre><blockquote>
<p><strong>注意：</strong></p>
<p>除了新的<code>createRef</code> API，Callback refs 将会继续得到支持。</p>
<p>你没有必要替换掉你组件中的callback refs。它们稍微的更灵活一点，所以它们仍然是一个比较先进的功能。</p>
</blockquote>
<p><a href="https://reactjs.org/docs/refs-and-the-dom.html">了解更多关于新的 <code>createRef</code> API 的信息.</a></p>
<h2><a href="https://reactjs.org/#forwardref-api"><code>forwardRef</code> API</a></h2>
<p><a href="https://reactjs.org/docs/higher-order-components.html">高阶组件</a> (or HOCs) 是在组件间复用的代码的常用方法。基于上面的主题背景示例，我们中以创建一个HOC，它以属性的方式将当前『theme』进行注入：</p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">withTheme</span>(<span class="hljs-params">Component</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ThemedComponent</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">return</span> (
      <span class="hljs-string">`&lt;ThemeContext.Consumer&gt;`</span>
        {theme =&gt; <span class="hljs-string">`&lt;Component {...props} theme={theme} /&gt;`</span>}
      <span class="hljs-string">`&lt;/ThemeContext.Consumer&gt;`</span>
    );
  };
}

</code></pre><p>我们可以使用上面的HOC将组件直接连接到主体上下文，而无需直接使用 <code>ThemeContext</code>。例如：  </p>
<pre><code class="hljs scala"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">FancyButton</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  buttonRef = <span class="hljs-type">React</span>.createRef();

  focus() {
    <span class="hljs-keyword">this</span>.buttonRef.current.focus();
  }

  render() {
    const {label, theme, ...rest} = <span class="hljs-keyword">this</span>.props;
    <span class="hljs-keyword">return</span> (
      `&lt;button
        {...rest}
        className={`${theme}-button`}
        ref={<span class="hljs-keyword">this</span>.buttonRef}&gt;`
        {label}
      `&lt;/button&gt;`
    );
  }
}

const <span class="hljs-type">FancyThemedButton</span> = withTheme(<span class="hljs-type">FancyButton</span>);

<span class="hljs-comment">// 我们可以渲染FancyThemedButton，就好像它是一个FancyButton</span>
<span class="hljs-comment">// 它将会自动接收当前『theme』,</span>
<span class="hljs-comment">// 同时HOC也会传递我们其它的props。</span>
`&lt;<span class="hljs-type">FancyThemedButton</span>
  label=<span class="hljs-string">"Click me!"</span>
  onClick={handleClick}
/&gt;`;

</code></pre><p>HOCs通常将会把<a href="https://reactjs.org/docs/higher-order-components.html#convention-pass-unrelated-props-through-to-the-wrapped-component">props传递</a>给它们包裹着的组件。不幸的是, <a href="https://reactjs.org/docs/higher-order-components.html#refs-arent-passed-through">refs不会被传递</a>。这意味着，如果我们使用<code>FancyThemedButton</code>，我们将无法通过ref和<code>FancyButton</code>进行连接，所以我们无法调用<code>focus()</code>。 </p>
<p>新的<code>forwardRef</code> API解决了这个问题，它提供了一个方法来拦截<code>ref</code>，并将它作为了普通的prop进行传递：</p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">withTheme</span><span class="hljs-params">(Component)</span> </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ThemedComponent</span><span class="hljs-params">({forwardedRef, <span class="hljs-rest_arg">...rest</span>})</span> </span>{
    <span class="hljs-keyword">return</span> (
      `&lt;ThemeContext.Consumer&gt;`
        {theme =&gt; (
          <span class="hljs-comment">// Assign the custom prop "forwardedRef" as a ref</span>
          `&lt;Component
            {...rest}
            ref={forwardedRef}
            theme={theme}
          /&gt;`
        )}
      `&lt;/ThemeContext.Consumer&gt;`
    );
  }

  <span class="hljs-comment">// 注意第二个参数"ref"是由React.forwardRef提供的。</span>
  <span class="hljs-comment">// 我们可以将它作为变通的props传递给ThemedComponent，例如 "forwardedRef"</span>
  <span class="hljs-comment">// 然后它可以被连接到这个组件。</span>
  <span class="hljs-keyword">return</span> React.forwardRef((props, ref) =&gt; (
    `&lt;ThemedComponent {...props} forwardedRef={ref} /&gt;`
  ));
}

<span class="hljs-comment">// 在这里，我们假设FancyButton已经被导入到当前上下文</span>
<span class="hljs-keyword">const</span> FancyThemedButton = withTheme(FancyButton);

<span class="hljs-comment">// 通过Referenace API创建一个ref，</span>
<span class="hljs-keyword">const</span> fancyButtonRef = React.createRef();

<span class="hljs-comment">// fancyButtonRef 现在指向 FancyButton</span>
`&lt;FancyThemedButton
  label=<span class="hljs-string">"Click me!"</span>
  onClick={handleClick}
  ref={fancyButtonRef}
/&gt;`;

</code></pre><h2><a href="https://reactjs.org/#component-lifecycle-changes">组件生命周期变更</a></h2>
<p>React类组件的API已经有好多年了，而且几乎没有变化。但是，当我们添加对更高级功能的支持时（比如<a href="https://reactjs.org/docs/react-component.html#componentdidcatch">错误边界</a>和<a href="https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html">即将到来的异步渲染模式</a>），我们会以不是我们想要的方式来扩展此模型。</p>
<p>例如，使用当前的API，可以很容易的阻止非必要的逻辑进行初始渲染。部分原因是因为完成某项任务的方式太多，而且哪一个最好也不清楚。我们已经观察到错误中断的处理行通常不被考虑在内，并且可能导致内存泄漏（它会影响到即将到来的异步渲染模式）。目前的类组件API也使其他工作复杂化，就像我们在<a href="https://twitter.com/trueadm/status/944908776896978946">原型化React编译器</a>方面的工作一样。</p>
<p>这些问题在组件生命周期（<code>componentWillMount</code>, <code>componentWillReceiveProps</code>, and <code>componentWillUpdate</code>）的一个子集中更加的恶化。这些也恰好是造成React社区最混乱的生命周期问题。出于这些原因的考虑，我们将会降低这些方法的使用，转而使用更好的方法代替。</p>
<p>我们意识到这些变更将会影响到现有的组件。因此，迁移路径将会是渐进式的，并且会提供补救措施。（在Facebook上，我们维护了超过50,000个React组件。 我们也依赖于一个渐进的发布周期！
） </p>
<blockquote>
<p><strong>注意：</strong></p>
<p>弃用警告将在未来的16.x版本中启用，但旧版生命周期将继续运行至17.x版。</p>
</blockquote>
<blockquote>
<p>即使在17.x版中，仍然可以使用它们，但它们会以『UNSAFE_』为前缀被重命名，以表明它们可能会引起问题。我们还准备了一个<a href="https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles">自动化的脚本</a>来在现有代码中对它们重新命名。</p>
</blockquote>
<p>除了摒弃不安全的生命周期外，我们还增加了一些新的生命周期：</p>
<ul>
<li><a href="https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops"><code>getDerivedStateFromProps</code></a> 是一个比较安全的方法来替代以前 <code>componentWillReceiveProps</code>.</li>
<li><a href="https://reactjs.org/docs/react-component.html#getsnapshotbeforeupdate"><code>getSnapshotBeforeUpdate</code></a> 用于更安全的读取属性，比如在更新之前获取DOM。</li>
</ul>
<p><a href="https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html">了解更多关于生命周期的变更。</a></p>
<h2><a href="https://reactjs.org/#strictmode-component"><code>StrictMode</code> Component</a></h2>
<p><code>StrictMode</code>是一个突出显示应用潜在问题的工具。像Fragment一样，StrictMode不会呈现任何可见的UI。它会为子组件作额外的检查并发出警告。</p>
<blockquote>
<p><strong>注意：</strong></p>
<p><code>StrictMode</code> 检查仅仅运行在开发模式下； <em>它们不影响生产构建</em>。</p>
</blockquote>
<p>尽管在严格模式下不可能捕获所有的问题（例如：某些类型的突变），但在它在大多数情况下还是很有用的。如果你在严格模式下看到警告，这些东西可能会引起异步渲染的错误。</p>
<p>在16.3版中，<code>StrictMode</code>提供以下帮助：</p>
<ul>
<li>识别不安全的生命周期组件</li>
<li>对使用字符串ref API进行警告</li>
<li>检测潜在副作用</li>
</ul>
<p>随着未来React的发版，将会添加更多的功能。  </p>
<p><a href="https://reactjs.org/docs/strict-mode.html">了解更多关于<code>StrictMode</code> 组件的信息.</a></p>
<p><a href="https://github.com/reactjs/reactjs.org/tree/master/content/blog/2018-03-29-react-v-16-3.md">编辑此页面</a></p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/react-v16-3-0-new-lifecycles-and-context-api-react-blog](https://www.zcfy.cc/article/react-v16-3-0-new-lifecycles-and-context-api-react-blog)
原文标题: React v16.3.0：新的生命周期和上下文API - React Blog
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
