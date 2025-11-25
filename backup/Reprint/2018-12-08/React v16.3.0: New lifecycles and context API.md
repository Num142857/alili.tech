---
title: 'React v16.3.0: New lifecycles and context API' 
date: 2018-12-08 2:30:30
hidden: true
slug: rvkg7l0omyo
categories: [reprint]
---

{{< raw >}}

                    
<p>几天前，我们写了一篇关于即将到来的对我们的传统生命周期方法的变更的文章，包括逐步迁移策略。在React 16.3.0中，我们添加了一些新的生命周期方法来帮助迁移。我们还引入了新的API，用于长时间请求的特性:一个官方的上下文API、一个ref转发API和一个更语意化的ref API。</p>
<p>请继续阅读，了解更多关于这个版本的信息。</p>
<h2 id="articleHeader0">官方认证的 Context API</h2>
<p>多年来，React为Context提供了一个实验性的API。虽然它是一个强大的工具，但是由于API中固有的问题，它的使用是不受欢迎的，因此我们打算用一个更好的API来替代这实验性的API。</p>
<p>React 16.3引入了一个新的Context API，它更高效，同时支持静态类型检查和深度更新。</p>
<blockquote>
<strong>注意</strong><br>旧的ContextAPI 将继续保留到React 16.x，所以您将有时间迁移。</blockquote>
<p>下面是一个示例，说明如何使用新的上下文API注入“主题”:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="## by 司徒正美
const ThemeContext = React.createContext('light');

class ThemeProvider extends React.Component {
  state = {theme: 'light'};

  render() {
    return (
      <ThemeContext.Provider value={this.state.theme}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

class ThemedButton extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {theme => <Button theme={theme} />}
      </ThemeContext.Consumer>
    );
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx">## by 司徒正美
const <span class="hljs-type">ThemeContext</span> = <span class="hljs-type">React</span>.createContext(<span class="hljs-symbol">'ligh</span>t');

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ThemeProvider</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  state = {theme: <span class="hljs-symbol">'ligh</span>t'};

  render() {
    <span class="hljs-keyword">return</span> (
      &lt;<span class="hljs-type">ThemeContext</span>.<span class="hljs-type">Provider</span> value={<span class="hljs-keyword">this</span>.state.theme}&gt;
        {<span class="hljs-keyword">this</span>.props.children}
      &lt;/<span class="hljs-type">ThemeContext</span>.<span class="hljs-type">Provider</span>&gt;
    );
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ThemedButton</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;<span class="hljs-type">ThemeContext</span>.<span class="hljs-type">Consumer</span>&gt;
        {theme =&gt; &lt;<span class="hljs-type">Button</span> theme={theme} /&gt;}
      &lt;/<span class="hljs-type">ThemeContext</span>.<span class="hljs-type">Consumer</span>&gt;
    );
  }
}
</code></pre>
<h2 id="articleHeader1">createRef API</h2>
<p>以前，React提供了两种管理refs的方法:字符串ref API和回调ref API。尽管字符串ref API比较方便，但是它有几个缺点，所以我们的官方推荐是使用回调ref。</p>
<p>React 16.3为管理refs提供了一个新的方案，它为字符串ref提供了方便，并且没有任何缺点:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="## by 司徒正美

class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  render() {
    return <input type=&quot;text&quot; ref={this.inputRef} />;
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx">## by 司徒正美

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor(props) {
    <span class="hljs-keyword">super</span>(props);

    <span class="hljs-keyword">this</span>.inputRef = <span class="hljs-type">React</span>.createRef();
  }

  render() {
    <span class="hljs-keyword">return</span> &lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span> ref={<span class="hljs-keyword">this</span>.inputRef} /&gt;;
  }

  componentDidMount() {
    <span class="hljs-keyword">this</span>.inputRef.current.focus();
  }
}</code></pre>
<blockquote>
<strong>注意</strong><p>除了新的createRef API外，回调refs将继续得到支持。</p>
<p>您不需要在组件中替换回调refs。它们稍微灵活一些，因此它们将继续作为一个高级特性。</p>
</blockquote>
<h2 id="articleHeader2">forwardRef API</h2>
<p>高阶组件(或HOCs)是在组件之间重用代码的常用方法。基于上面的主题上下文示例，我们可能会创建一个临时对象，将当前的“主题”作为一个属性注入:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="## by 司徒正美

function withTheme(Component) {
  return function ThemedComponent(props) {
    return (
      <ThemeContext.Consumer>
        {theme => <Component {...props} theme={theme} />}
      </ThemeContext.Consumer>
    );
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code class="jsx"><span class="hljs-comment">## by 司徒正美</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">withTheme</span><span class="hljs-params">(Component)</span> </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ThemedComponent</span><span class="hljs-params">(props)</span> </span>{
    <span class="hljs-keyword">return</span> (
      &lt;ThemeContext.Consumer&gt;
        {theme =&gt; &lt;Component {...props} theme={theme} /&gt;}
      &lt;/ThemeContext.Consumer&gt;
    );
  };
}</code></pre>
<p>我们可以使用上述特殊的方式将组件连接到主题上下文，而不必直接使用主题上下文。例如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="## by 司徒正美

class FancyButton extends React.Component {
  buttonRef = React.createRef();

  focus() {
    this.buttonRef.current.focus();
  }

  render() {
    const {label, theme, ...rest} = this.props;
    return (
      <button
        {...rest}
        className={`${theme}-button`}
        ref={this.buttonRef}>

        {label}
      </button>
    );
  }
}

const FancyThemedButton = withTheme(FancyButton);

// We can render FancyThemedButton as if it were a FancyButton
// It will automatically receive the current &quot;theme&quot;,
// And the HOC will pass through our other props.
<FancyThemedButton
  label=&quot;Click me!&quot;
  onClick={handleClick}
/>;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx">## by 司徒正美

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">FancyButton</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  buttonRef = <span class="hljs-type">React</span>.createRef();

  focus() {
    <span class="hljs-keyword">this</span>.buttonRef.current.focus();
  }

  render() {
    const {label, theme, ...rest} = <span class="hljs-keyword">this</span>.props;
    <span class="hljs-keyword">return</span> (
      &lt;button
        {...rest}
        className={`${theme}-button`}
        ref={<span class="hljs-keyword">this</span>.buttonRef}&gt;

        {label}
      &lt;/button&gt;
    );
  }
}

const <span class="hljs-type">FancyThemedButton</span> = withTheme(<span class="hljs-type">FancyButton</span>);

<span class="hljs-comment">// We can render FancyThemedButton as if it were a FancyButton</span>
<span class="hljs-comment">// It will automatically receive the current "theme",</span>
<span class="hljs-comment">// And the HOC will pass through our other props.</span>
&lt;<span class="hljs-type">FancyThemedButton</span>
  label=<span class="hljs-string">"Click me!"</span>
  onClick={handleClick}
/&gt;;</code></pre>
<p>HOCs通常会将props传递给它们包装的组件。不幸的是，refs没有冲透进去。这意味着如果我们使用FancyThemedButton，我们就不能将ref添加到FancyButton中，因此我们无法调用focus()。</p>
<p>新的代理API通过提供一种方法来拦截一个ref，并将其转发为一个普通的props，从而解决了这个问题:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="## by 司徒正美

function withTheme(Component) {
  // Note the second param &quot;ref&quot; provided by React.forwardRef.
  // We can attach this to Component directly.
  function ThemedComponent(props, ref) {
    return (
      <ThemeContext.Consumer>
        {theme => (
          <Component {...props} ref={ref} theme={theme} />
        )}
      </ThemeContext.Consumer>
    );
  }

  // These next lines are not necessary,
  // But they do give the component a better display name in DevTools,
  // e.g. &quot;ForwardRef(withTheme(MyComponent))&quot;
  const name = Component.displayName || Component.name;
  ThemedComponent.displayName = `withTheme(${name})`;

  // Tell React to pass the &quot;ref&quot; to ThemedComponent.
  return React.forwardRef(ThemedComponent);
}

const fancyButtonRef = React.createRef();

// fancyButtonRef will now point to FancyButton
<FancyThemedButton
  label=&quot;Click me!&quot;
  onClick={handleClick}
  ref={fancyButtonRef}
/>;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code class="jsx"><span class="hljs-comment">## by 司徒正美</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">withTheme</span><span class="hljs-params">(Component)</span> </span>{
  <span class="hljs-comment">// Note the second param "ref" provided by React.forwardRef.</span>
  <span class="hljs-comment">// We can attach this to Component directly.</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ThemedComponent</span><span class="hljs-params">(props, ref)</span> </span>{
    <span class="hljs-keyword">return</span> (
      &lt;ThemeContext.Consumer&gt;
        {theme =&gt; (
          &lt;Component {...props} ref={ref} theme={theme} /&gt;
        )}
      &lt;/ThemeContext.Consumer&gt;
    );
  }

  <span class="hljs-comment">// These next lines are not necessary,</span>
  <span class="hljs-comment">// But they do give the component a better display name in DevTools,</span>
  <span class="hljs-comment">// e.g. "ForwardRef(withTheme(MyComponent))"</span>
  <span class="hljs-keyword">const</span> name = Component.displayName || Component.name;
  ThemedComponent.displayName = `withTheme(${name})`;

  <span class="hljs-comment">// Tell React to pass the "ref" to ThemedComponent.</span>
  <span class="hljs-keyword">return</span> React.forwardRef(ThemedComponent);
}

<span class="hljs-keyword">const</span> fancyButtonRef = React.createRef();

<span class="hljs-comment">// fancyButtonRef will now point to FancyButton</span>
&lt;FancyThemedButton
  label=<span class="hljs-string">"Click me!"</span>
  onClick={handleClick}
  ref={fancyButtonRef}
/&gt;;</code></pre>
<h2 id="articleHeader3">组件生命周期钩子的变化</h2>
<p>React的类组件API已经存在多年，几乎没有变化。但是，当我们为更高级的特性(例如错误边界和即将到来的异步渲染模式)添加支持时，我们以它本来没有打算的方式来扩展这个模型。</p>
<p>例如，在当前的API中，用一些非寻常的手段来阻止初始渲染是很容易的。在某种程度上，这是因为有太多的钩子来完成这项既定的任务，而且还不清楚哪一个是最好的。我们已经注意到错误处理的中断行为通常不会被考虑，并且可能导致内存泄漏(这也会影响即将到来的异步渲染模式)。当前的类组件API也使其他的工作变得复杂，比如我们的代码优化器（Prepack）的工作。</p>
<p><code>componentWillMount</code>, <code>componentWillReceiveProps</code>, <code>componentWillUpdate</code>这些钩子很容易引发问题，并且也严重扰乱React的生命周期。基于这些原因，我们将废弃这些方法，以支持更好的替代方案。</p>
<p>我们认识到这一变化将影响许多现有的组件。因此，迁移路径将尽可能平缓，并提供迁移方案。(在Facebook，我们拥有5万多个React组件。我们也依赖于一个渐进的发布周期!</p>
<blockquote>
<strong>注意</strong><p>弃用警告将在React16以后的版本中启用， 一直保留到17发布时。</p>
<p>即使在React17中，仍然可以使用它们，但是它们将添加“UNSAFE_”前缀，以表明它们可能导致问题。我们还准备了一个自动化的脚本，以便现有代码中重命名它们。</p>
</blockquote>
<p>除了废弃不安全的生命周期钩子外，我们还增加了一些新的生命周期钩子:</p>
<p><code>getDerivedStateFromProps</code> 用来componentWillReceiveProps。</p>
<p><code>getSnapshotBeforeUpdate</code>，用在更新前从DOM中安全地读取属性。</p>
<h2 id="articleHeader4">StrictMode 组件</h2>
<p><code>&lt;StrictMode /&gt;</code>是一种专门用于暴露潜在问题的工具。与<code>&lt;Fragment /&gt;</code>一样，<code>&lt;StrictMode/&gt;</code>将 不会渲染到视图中。它能为其子组件激活额外的检查和警告。</p>
<blockquote>
<strong>注意</strong><p><code>&lt;StrictMode /&gt;</code>检查只在开发模式下运行;它们不会影响生产构建。</p>
</blockquote>
<p>虽然严格的模式不可能捕获所有的问题(例如某些类型的窜改)，但它可以帮助很多人。如果您在严格的模式下看到警告，这些事情很可能会导致异步渲染的错误。</p>
<p>在16.3版本中，StrictMode帮助:</p>
<ol>
<li>识别具有不安全生命周期钩子的组件。</li>
<li>关于遗留字符串ref API用法的警告。</li>
<li>检测意想不到的副作用</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React v16.3.0: New lifecycles and context API

## 原文链接
[https://segmentfault.com/a/1190000014083970](https://segmentfault.com/a/1190000014083970)

