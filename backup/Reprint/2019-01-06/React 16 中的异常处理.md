---
title: 'React 16 中的异常处理' 
date: 2019-01-06 2:30:10
hidden: true
slug: xxmcm35hzlh
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://parg.co/bW1" rel="nofollow noreferrer" target="_blank">React 16 中的异常处理</a>翻译自<a href="https://parg.co/bWa" rel="nofollow noreferrer" target="_blank"> React 官方文档</a>，从属于笔者的<a href="https://parg.co/bIn" rel="nofollow noreferrer" target="_blank"> React 与前端工程化实践</a>系列中的<a href="https://parg.co/bW1" rel="nofollow noreferrer" target="_blank"> React 组件分割与解耦</a>章节；也可以使用<a href="https://parg.co/bWI" rel="nofollow noreferrer" target="_blank"> create-webpack-app </a> 运行本部分示例 。</p></blockquote>
<h1 id="articleHeader0">异常处理</h1>
<p>在 React 15.x 及之前的版本中，组件内的异常有可能会影响到 React 的内部状态，进而导致下一轮渲染时出现未知错误。这些组件内的异常往往也是由应用代码本身抛出，在之前版本的 React 更多的是交托给了开发者处理，而没有提供较好地组件内优雅处理这些异常的方式。在 React 16.x 版本中，引入了所谓 Error Boundary 的概念，从而保证了发生在 UI 层的错误不会连锁导致整个应用程序崩溃；未被任何异常边界捕获的异常可能会导致整个 React 组件树被卸载。所谓的异常边界即指某个能够捕获它的子元素（包括嵌套子元素等）抛出的异常，并且根据用户配置进行优雅降级地显示而不是导致整个组件树崩溃。异常边界能够捕获渲染函数、生命周期回调以及整个组件树的构造函数中抛出的异常。<br>我们可以通过为某个组件添加新的 <code>componentDidCatch(error, info)</code> 生命周期回调来使其变为异常边界：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ErrorBoundary</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = { hasError: <span class="hljs-literal">false</span> };
  }

  componentDidCatch(error, info) {
    <span class="hljs-comment">// Display fallback UI</span>
    <span class="hljs-keyword">this</span>.setState({ hasError: <span class="hljs-literal">true</span> });
    <span class="hljs-comment">// You can also log the error to an error reporting service</span>
    logErrorToMyService(error, info);
  }

  render() {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state.hasError) {
      <span class="hljs-comment">// You can render any custom fallback UI</span>
      <span class="hljs-keyword">return</span> &lt;h1&gt;<span class="hljs-type">Something</span> went wrong.&lt;/h1&gt;;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.props.children;
  }
}</code></pre>
<p>然后我们就可以如常使用该组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code><span class="hljs-section">&lt;ErrorBoundary&gt;</span>
  <span class="hljs-section">&lt;MyWidget /&gt;</span>
<span class="hljs-section">&lt;/ErrorBoundary&gt;</span></code></pre>
<p><code>componentDidCatch()</code> 方法就好像针对组件的 <code>catch {}</code> 代码块；不过 JavaScript 中的 <code>try/catch</code> 模式更多的是面向命令式代码，而 React 组件本身是声明式模式，因此更适合采用指定渲染对象的模式。需要注意的是仅有类组件可以成为异常边界，在真实的应与开发中我们往往会声明单个异常边界然后在所有可能抛出异常的组件中使用它。另外值得一提的是异常边界并不能捕获其本身的异常，如果异常边界组件本身抛出了异常，那么会冒泡传递到上一层最近的异常边界中。<br>在真实地应用开发中有的开发者也会将崩坏的界面直接展示给开发者，不过譬如在某个聊天界面中，如果在出现异常的情况下仍然直接将界面展示给用户，就有可能导致用户将信息发送给错误的接受者；或者在某些支付应用中导致用户金额显示错误。因此如果我们将应用升级到 React 16.x，我们需要将原本应用中没有被处理地异常统一包裹进异常边界中。譬如某个应用中可能会分为侧边栏、信息面板、会话界面、信息输入等几个不同的模块，我们可以将这些模块包裹进不同的错误边界中；这样如果某个组件发生崩溃，会被其直属的异常边界捕获，从而保证剩余的部分依然处于可用状态。同样的我们也可以在异常边界中添加错误反馈等服务接口以及时反馈生产环境下的异常并且修复他们。完整的应用代码如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  
  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }
  
  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style="{{" whiteSpace: 'pre-wrap' "}}">
            {this.state.error &amp;&amp; this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }  
}

class BuggyCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.setState(({counter}) => ({
      counter: counter + 1
    }));
  }
  
  render() {
    if (this.state.counter === 5) {
      // Simulate a JS error
      throw new Error('I crashed!');
    }
    return <h1 onClick={this.handleClick}>{this.state.counter}</h1>;
  }
}

function App() {
  return (
    <div>
      <p>
        <b>
          This is an example of error boundaries in React 16.
          <br /><br />
          Click on the numbers to increase the counters.
          <br />
          The counter is programmed to throw when it reaches 5. This simulates a JavaScript error in a component.
        </b>
      </p>
      <hr />
      <ErrorBoundary>
        <p>These two counters are inside the same error boundary. If one crashes, the error boundary will replace both of them.</p>
        <BuggyCounter />
        <BuggyCounter />
      </ErrorBoundary>
      <hr />
      <p>These two counters are each inside of their own error boundary. So if one crashes, the other is not affected.</p>
      <ErrorBoundary><BuggyCounter /></ErrorBoundary>
      <ErrorBoundary><BuggyCounter /></ErrorBoundary>
    </div>
  );
}



ReactDOM.render(
  <App />,
  document.getElementById('root')
);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ErrorBoundary</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = { <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span>, <span class="hljs-attr">errorInfo</span>: <span class="hljs-literal">null</span> };
  }
  
  componentDidCatch(error, errorInfo) {
    <span class="hljs-comment">// Catch errors in any components below and re-render with error message</span>
    <span class="hljs-keyword">this</span>.setState({
      <span class="hljs-attr">error</span>: error,
      <span class="hljs-attr">errorInfo</span>: errorInfo
    })
    <span class="hljs-comment">// You can also log error messages to an error reporting service here</span>
  }
  
  render() {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state.errorInfo) {
      <span class="hljs-comment">// Error path</span>
      <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Something went wrong.<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">details</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"</span> <span class="hljs-attr">whiteSpace:</span> '<span class="hljs-attr">pre-wrap</span>' "}}"&gt;</span>
            {this.state.error &amp;&amp; this.state.error.toString()}
            <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
            {this.state.errorInfo.componentStack}
          <span class="hljs-tag">&lt;/<span class="hljs-name">details</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      );
    }
    <span class="hljs-comment">// Normally, just render children</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.props.children;
  }  
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">BuggyCounter</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = { <span class="hljs-attr">counter</span>: <span class="hljs-number">0</span> };
    <span class="hljs-keyword">this</span>.handleClick = <span class="hljs-keyword">this</span>.handleClick.bind(<span class="hljs-keyword">this</span>);
  }
  
  handleClick() {
    <span class="hljs-keyword">this</span>.setState(<span class="hljs-function">(<span class="hljs-params">{counter}</span>) =&gt;</span> ({
      <span class="hljs-attr">counter</span>: counter + <span class="hljs-number">1</span>
    }));
  }
  
  render() {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state.counter === <span class="hljs-number">5</span>) {
      <span class="hljs-comment">// Simulate a JS error</span>
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'I crashed!'</span>);
    }
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.handleClick}</span>&gt;</span>{this.state.counter}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">App</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">b</span>&gt;</span>
          This is an example of error boundaries in React 16.
          <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
          Click on the numbers to increase the counters.
          <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
          The counter is programmed to throw when it reaches 5. This simulates a JavaScript error in a component.
        <span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">hr</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ErrorBoundary</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>These two counters are inside the same error boundary. If one crashes, the error boundary will replace both of them.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">BuggyCounter</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">BuggyCounter</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ErrorBoundary</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">hr</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>These two counters are each inside of their own error boundary. So if one crashes, the other is not affected.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ErrorBoundary</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">BuggyCounter</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ErrorBoundary</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ErrorBoundary</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">BuggyCounter</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ErrorBoundary</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}



ReactDOM.render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>,
  document.getElementById('root')
);
</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 16 中的异常处理

## 原文链接
[https://segmentfault.com/a/1190000010384911](https://segmentfault.com/a/1190000010384911)

