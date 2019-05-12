---
title: 'React16.3.0以后的生命周期(二) - 更新、卸载、异常' 
date: 2019-02-15 2:30:44
hidden: true
slug: l4xike4bv1
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">组件更新</h2>
<ul>
<li>
<p>static getDerivedStateFromProps()</p>
<p>当本地<code>state</code>需要根据<code>props</code>来改变的时候可调用此方法。</p>
<p>这个方法是在<code>render()</code>前会被执行，只要执行<code>render()</code>都会被在之前被触发。</p>
<p>该方法有两个参数<code>props</code>和<code>state</code>; 返回值为<code>state</code>对象, 不需要返回整体<code>state</code>，把需要改变的<code>state</code>返回即可。</p>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="static getDerivedStateFromProps(props, state) {
  if(props.color !== state.color) {
    return {color: props.color};
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code class="jsx">static getDerivedStateFromProps(props, <span class="hljs-keyword">state</span>) {
  if(props.color !== <span class="hljs-keyword">state</span>.color) {
    return {color: props.color};
  }
}</code></pre>
</li>
<li>
<p>shouldComponentUpdate()</p>
<p>此方法有两个参数：<code>shouldComponentUpdate(nextProps, nextState)</code>.</p>
<p>返回值为<code>true</code>或者<code>false</code>, 默认返回<code>true</code>.</p>
<p>主要使用它来控制组件要不要渲然，常用作性能优化。</p>
<p>触发此方法的条件是：组件接收任意<code>props</code>或者<code>state</code>时都会被调用。需要注意的是在第一次<code>render()</code>时和在调用<code>forceUpdate()</code>时都不会被触发。</p>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="shouldComponentUpdate(nextProps, nextState) {
  if(nextProps.color !== this.props.color || nextState.size !== this.state.size) {
    return true;
  } 
  return false;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code class="jsx">shouldComponentUpdate(nextProps, nextState) {
  <span class="hljs-keyword">if</span>(nextProps.color !== <span class="hljs-keyword">this</span>.props.color || nextState.size !== <span class="hljs-keyword">this</span>.state.size) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  } 
  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
}</code></pre>
</li>
<li>
<p>render()</p>
<p>这个方法是React组件中必须要提供的方法。当<code>state</code>或者<code>props</code>任一数据有更新时都会执行。</p>
<blockquote>需要注意当继承<code>PureComponent</code>时，不会对对象进行深度比较，也就是，不会根据对象内的对象变化时执行<code>render()</code>.</blockquote>
<p><code>render()</code>是一个纯函数，也就是不能在这个方法中有类似<code>setState()</code>这样的行为。</p>
<p>返回的数据类型可以有：</p>
<ul>
<li>
<code>null</code>、<code>String</code>、<code>Number</code>、<code>Array</code>、<code>Boolean</code>。</li>
<li>React elements</li>
<li>Fragment</li>
<li>
<p>Portal</p>
<blockquote>注意：不能返回<code>undefined</code>.</blockquote>
</li>
</ul>
</li>
</ul>
<p>当<code>shouldComponentUpdate()</code>返回<code>false</code>时，无论<code>state</code>和<code>props</code>有没有变化，这个方法都不执行。</p>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    render() {
      return (
        <div>{this.state.color}</div>
      );
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code class="jsx">    render() {
      return (
        <span class="hljs-variable">&lt;div&gt;</span>{this.<span class="hljs-keyword">state</span>.color}&lt;/div&gt;
      );
    }</code></pre>
<ul>
<li>
<p>getSnapshotBeforeUpdate()</p>
<p><code>getSnapshotBeforeUpdate(prevProps, prevState)</code>在<code>render</code>将组件渲然到<code>dom</code>中就会执行。</p>
<p>如果不实现该方法则返回null.</p>
<p>返回的数据由自己定义，并且返回的数据作为<code>componentDidUpdate</code>方法中的参数。</p>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ScrollingList extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevProps.list.length < this.props.list.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  render() {
    return (
      <div ref={this.listRef}>{/* ...contents... */}</div>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ScrollingList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.listRef = <span class="hljs-type">React</span>.createRef();
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    <span class="hljs-keyword">if</span> (prevProps.list.length &lt; <span class="hljs-keyword">this</span>.props.list.length) {
      const list = <span class="hljs-keyword">this</span>.listRef.current;
      <span class="hljs-keyword">return</span> list.scrollHeight - list.scrollTop;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
  }

  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div ref={<span class="hljs-keyword">this</span>.listRef}&gt;{<span class="hljs-comment">/* ...contents... */</span>}&lt;/div&gt;
    );
  }
}</code></pre>
</li>
<li>
<p>componentDidUpdate()</p>
<p>该方法在组件更新后立即执行，并且在组件挂载阶段不执行。</p>
<p><code>componentDidUpdate(prevProps, prevState, snapshot)</code>第三个参数就是上节中提到的。</p>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code class="jsx">  componentDidUpdate(prevProps, prevState, snapshot) {
    <span class="hljs-keyword">if</span> (snapshot !== <span class="hljs-literal">null</span>) {
      <span class="hljs-keyword">const</span> <span class="hljs-built_in">list</span> = <span class="hljs-keyword">this</span>.listRef.current;
      <span class="hljs-built_in">list</span>.scrollTop = <span class="hljs-built_in">list</span>.scrollHeight - snapshot;
    }
  }</code></pre>
</li>
</ul>
<h2 id="articleHeader1">组件卸载</h2>
<ul><li>
<p>componentWillUnmount()</p>
<p>在组件被卸载或者销毁的时候执行，方法中不能再有<code>setState</code>的动作。</p>
<p>一般用作清除组件中起的定义器、<code>webSocket</code>等。</p>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentWillUnmount() {
  if(this.timer) {
    window.clearInterval(this.timer);
    this.timer = null;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code class="jsx">componentWillUnmount() {
  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.timer) {
    window.clearInterval(<span class="hljs-keyword">this</span>.timer);
    <span class="hljs-keyword">this</span>.timer = <span class="hljs-literal">null</span>;
  }
}</code></pre>
<p><a href="https://codesandbox.io/s/o551j5lmry" rel="nofollow noreferrer" target="_blank">在线示例</a></p>
</li></ul>
<h2 id="articleHeader2">组件异常处理</h2>
<ul><li>
<p>componentDidCatch()</p>
<p><code>componentDidCatch(error, info)</code> 异常的处理。</p>
<p>只能捕获组件树的异常，无法捕获这个方法内的异常。</p>
<p>示例：</p>
<p>定义一下异常处理组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    window.console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ErrorBoundary</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = { hasError: <span class="hljs-literal">false</span> };
  }

  componentDidCatch(error, info) {
    <span class="hljs-keyword">this</span>.setState({ hasError: <span class="hljs-literal">true</span> });
    window.console.log(error, info);
  }

  render() {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state.hasError) {
      <span class="hljs-keyword">return</span> &lt;h1&gt;<span class="hljs-type">Something</span> went wrong.&lt;/h1&gt;;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.props.children;
  }
}</code></pre>
<p>使用这个异常组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code class="jsx"><span class="hljs-section">&lt;ErrorBoundary&gt;</span>
  <span class="hljs-section">&lt;MyWidget /&gt;</span>
<span class="hljs-section">&lt;/ErrorBoundary&gt;</span></code></pre>
</li></ul>
<p>推荐阅读<a href="https://kairi1227.github.io" rel="nofollow noreferrer" target="_blank">《React 手稿》</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React16.3.0以后的生命周期(二) - 更新、卸载、异常

## 原文链接
[https://segmentfault.com/a/1190000016936585](https://segmentfault.com/a/1190000016936585)

