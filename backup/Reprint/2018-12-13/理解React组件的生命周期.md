---
title: '理解React组件的生命周期' 
date: 2018-12-13 2:30:07
hidden: true
slug: trdn72dyuu
categories: [reprint]
---

{{< raw >}}

                    
<p>React提供了很多钩子函数使我们可以在合适的时间、合适的节点更新组件的状态，这些钩子是生命周期函数，想要使用React，我们必须掌握在钩子中可以做什么，不可以做什么。</p>
<blockquote>？？首先大家想一下在哪里发送请求比较合适<code>componentWillMount</code>、<code>componentDidMount</code>、<code>componentWillReceiveProps</code>、<code>componentDidUpdate</code>?</blockquote>
<p><span class="img-wrap"><img data-src="/img/bV4ca1?w=1169&amp;h=742" src="https://static.alili.tech/img/bV4ca1?w=1169&amp;h=742" alt="reactlifecycle.png" title="reactlifecycle.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">组件3个阶段</h2>
<p>组件的生命主要包括3个阶段： 挂载、更新、卸载，React 16开始还添加了错误处理。</p>
<h3 id="articleHeader1">挂载</h3>
<p>组件被实例化并挂载在到dom树这一过程称为挂载</p>
<p><span class="img-wrap"><img data-src="/img/bV4cbb?w=289&amp;h=470" src="https://static.alili.tech/img/bV4cbb?w=289&amp;h=470" alt="mounting.png" title="mounting.png" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li>constructor()</li>
<li>componentWillMount()</li>
<li>render()</li>
<li>componentDidMount()</li>
</ul>
<h3 id="articleHeader2">更新</h3>
<p>当组件的属性或者状态改变时会重新渲染</p>
<p><span class="img-wrap"><img data-src="/img/bV4cbh?w=519&amp;h=757" src="https://static.alili.tech/img/bV4cbh?w=519&amp;h=757" alt="updating.png" title="updating.png" style="cursor: pointer;"></span></p>
<ul>
<li>componentWillReceiveProps()</li>
<li>shouldComponentUpdate()</li>
<li>componentWillUpdate()</li>
<li>render()</li>
<li>componentDidUpdate()</li>
</ul>
<p>当执行this.forceUpdate时，shouldComponentUpdate将不会被触发</p>
<p><span class="img-wrap"><img data-src="/img/bV4cbG?w=373&amp;h=371" src="https://static.alili.tech/img/bV4cbG?w=373&amp;h=371" alt="forceUpdate.png" title="forceUpdate.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">卸载</h3>
<p>当一个组件被移出Dom树时，组件就会被卸载</p>
<ul><li>componentWillUnmount()</li></ul>
<h3 id="articleHeader4">Error Handling</h3>
<p><span class="img-wrap"><img data-src="/img/bV4cbJ?w=643&amp;h=402" src="https://static.alili.tech/img/bV4cbJ?w=643&amp;h=402" alt="error-handleing.png" title="error-handleing.png" style="cursor: pointer; display: inline;"></span></p>
<ul><li>componentDidCatch()</li></ul>
<h2 id="articleHeader5">constructor</h2>
<p>当组件被实例化时，构造函数就被会最先执行。需要注意的是constructor的第一行必须是<code>super(props)</code>语句。</p>
<p>DO</p>
<ol>
<li>设置组件的初始状态</li>
<li>bind function</li>
</ol>
<p>简单解释下bind function,当类的方法作为事件处理函数时，有可能会丢失this指向，有两种常见的解决方案：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// This binding is necessary to make `this` work in the callback
this.handleClick = this.handleClick.bind(this); // 上面提到的bind function" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// This binding is necessary to make `this` work in the callback</span>
<span class="hljs-keyword">this</span>.handleClick = <span class="hljs-keyword">this</span>.handleClick.bind(<span class="hljs-keyword">this</span>); <span class="hljs-comment">// 上面提到的bind function</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="使用箭头函数声明处理函数，个人比较推荐这种方案，代码简洁干净
handleClick = () => {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">使用箭头函数声明处理函数，个人比较推荐这种方案，代码简洁干净
handleClick = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {}</code></pre>
<p>DON’T</p>
<ol>
<li>向后台发送请求进而更新组件状态</li>
<li>使用this.setState初始化</li>
</ol>
<p>下图是强行在constructor中调用this.setState所发出的警告，在constructor中调用this.setState是没有任何作用的</p>
<p><span class="img-wrap"><img data-src="/img/bV4cbO?w=2536&amp;h=136" src="https://static.alili.tech/img/bV4cbO?w=2536&amp;h=136" alt="setStateError.png" title="setStateError.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">componentWillMount</h2>
<p>它也只会在挂载过程中被调用一次，它的作用和constructor没有太大差异。有很多人在componentWillMount中请求后台数据，认为这样可以更早的得到数据，componentWillMout是在render函数执行前执行的，虽然请求是在第一次render之前发送的，但是返回并不能保证在render之前完成。React中不推荐在componentWillMount中发送异步请求?。</p>
<p>还有一点需要了解： 在componentWillMount中执行this.setState是不会触发二次渲染的。仔细思考一下，componentWillMount好像没啥卵用了。正所谓存在即合理，在服务端渲染的场景中componentDidMount是不会被执行的，因此可以在componnetWillMount中发生AJAX请求。</p>
<p>DO</p>
<ol>
<li>使用this.setState更新组件状态</li>
<li>发送AJAX请求(服务端渲染场景中)</li>
</ol>
<p>DON’T</p>
<ol><li>发送AJAX请求(浏览器渲染场景中)</li></ol>
<h2 id="articleHeader7">componentDidMount</h2>
<p>此函数只会被调用一次既组件挂载完成时，在render函数调用之后。组件挂载完成表示它的子组件也全部被挂载完成。<code>父组件render -&gt;子组件render-&gt;子子组件render ... ...子子组件DidMount -&gt; 子组件DidMount -&gt; 父组件DidMount</code>。React就是个递归的世界。componentDidMount函数中可以发生异步请求。</p>
<p>DO</p>
<ol><li>发送AJAX请求</li></ol>
<p>DON’T</p>
<ol><li>this.setState更新状态，因为会触发二次渲染</li></ol>
<h2 id="articleHeader8">componentWillReceiveProps</h2>
<p>当父组件re-render时该钩子函数就会执行，即使所传入的属性没有改变。这个钩子最大的用途：组件的部分状态是依赖于属性时做状态同步使用，在其中使用this.setState是不会触发<code>额外</code>的渲染的，this.setState的状态更新和props触发的render合并一次进行。要合理使用componentWillReceiveProps需记住做好条件判断：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentWillReceiveProps(nextProps) {
  if(nextProps.myProp !== this.props.myProps) {
    // nextProps.myProp has a different value than our current prop
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">componentWillReceiveProps(nextProps) {
  <span class="hljs-keyword">if</span>(nextProps.myProp !== <span class="hljs-keyword">this</span>.props.myProps) {
    <span class="hljs-comment">// nextProps.myProp has a different value than our current prop</span>
  }
}</code></pre>
<p>请不要尝试在componentWillReceiveProps中发送异步请求(React Fiber后该钩子函数可能会被触发多次)?</p>
<p>DO</p>
<ol><li>根据Props的更新同步组件状态</li></ol>
<p>DON’T</p>
<ol><li>发生异步请求</li></ol>
<h2 id="articleHeader9">shouldComponentUpdate</h2>
<p>shouldComponentUpdate主要是用来优化React应用性能的，水平没达到一定高度就不要去动它了。组件的状态或者属性改变时都会触发该函数，但只有在返回true时，组件才会被重新渲染。</p>
<p>DO or DON’T<br>什么也不要做就对了?</p>
<h2 id="articleHeader10">componentWillUpdate</h2>
<p>当我们没有覆写componentShouldUpdate时，componentWillUpdate会在其之后立即执行。当shouldComponent被覆写过时，componentWillUpdate主要用来取代componentWillReceiveProps，用来同步Props至组件的部分状态。</p>
<p>DO</p>
<ol><li>同步Props到组件状态</li></ol>
<p>DON’T</p>
<ol><li>发生异步请求</li></ol>
<h2 id="articleHeader11">componentDidUpdate</h2>
<p>它和componentDidMount的功能类似，componentDidMount发生于组件的首次render之后，而componentDidUpdate则是发生于组件状态及属性变化所导致的re-render之后。主要是用来请求后台数据。和componentWillReceiveProps类似，做相应处理时，需要做属性是否变更的判断，如下面代码所示。有趣的一点： componentWillReceiveProps接收的参数是nextProps, componentDidUpdate接收的是preProps。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentDidUpdate(prevProps) {
  if(prevProps.myProps !== this.props.myProp) {
    // this.props.myProp has a different value
    // ...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">componentDidUpdate(prevProps) {
  <span class="hljs-keyword">if</span>(prevProps.myProps !== <span class="hljs-keyword">this</span>.props.myProp) {
    <span class="hljs-comment">// this.props.myProp has a different value</span>
    <span class="hljs-comment">// ...</span>
  }
}</code></pre>
<p>DO</p>
<ol><li>异步请求</li></ol>
<p>DON’T</p>
<ol><li>this.setState更新状态，会触发二次渲染</li></ol>
<h2 id="articleHeader12">componentWillUnmount</h2>
<p>当组件被卸载时被调用，在这里主要做一些清理操作，清理定时器、关闭socket、清除监听器等等</p>
<h2 id="articleHeader13">componentDidCatch</h2>
<p>React的错误机制：子组件中产生的错误若并未被捕获或处理会抛给父组件，若上层也一直没有处理，错误将会被抛至最顶层导致浏览器白屏。<br>React16开始添加了一个新的特性<code>错误处理</code>。componentDidCatch十分特别，它只可以处理子组件中产生的、未处理的错误，能够捕获的错误类型有子组件render函数中产生的错误及生命周期函数中产生的非异步错误。用法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//父组件或祖宗组件中实现
componentDidCatch(errorString, errorInfo) {
  this.setState({
    error: errorString
  });
  ErrorLoggingTool.log(errorInfo);
}
render() {
  if(this.state.error) return <ShowErrorMessage error={this.state.error} />
  return (
    // render normal component output
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//父组件或祖宗组件中实现</span>
componentDidCatch(errorString, errorInfo) {
  <span class="hljs-keyword">this</span>.setState({
    <span class="hljs-attr">error</span>: errorString
  });
  ErrorLoggingTool.log(errorInfo);
}
render() {
  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.state.error) <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ShowErrorMessage</span> <span class="hljs-attr">error</span>=<span class="hljs-string">{this.state.error}</span> /&gt;</span>
  return (
    // render normal component output
  );
}</span></code></pre>
<h2 id="articleHeader14">在哪请求数据</h2>
<p>？？首先大家想一下在哪里发送请求比较合适<code>componentWillMount</code>、<code>componentDidMount</code>、<code>componentWillReceiveProps</code>、<code>componentDidUpdate</code>?</p>
<p>在<code>componentDidMount</code>和<code>componentDidUpdate</code>中。?</p>
<p>本文是阅读了<a href="https://medium.com/@baphemot/understanding-reactjs-component-life-cycle-823a640b3e8d" rel="nofollow noreferrer" target="_blank">Understanding React — Component life-cycle</a>和官方文档后做的总结，也可以说是我抄来得?，欢迎大家批评指正。<a href="https://github.com/xiyuanyuan/react16-lifecycle" rel="nofollow noreferrer" target="_blank">code</a><br><a href="https://segmentfault.com/l/1500000013813893">React系列课程之 入门</a></p>
<p><a href="https://medium.com/@baphemot/understanding-reactjs-component-life-cycle-823a640b3e8d" rel="nofollow noreferrer" target="_blank">Understanding React — Component life-cycle</a><br><a href="https://reactjs.org/docs/react-component.html" rel="nofollow noreferrer" target="_blank">React.Component</a><br><a href="http://react.tips/how-to-use-react-component-lifecycle-methods/" rel="nofollow noreferrer" target="_blank">component-lifecycle-methods</a></p>
<blockquote>【开发环境推荐】<a href="https://studio.coding.net/intro" rel="nofollow noreferrer" target="_blank">Cloud Studio</a> 是基于浏览器的集成式开发环境，支持绝大部分编程语言，包括 HTML5、PHP、Python、Java、Ruby、C/C++、.NET 小程序等等，无需下载安装程序，一键切换开发环境。 Cloud Studio提供了完整的 Linux 环境，并且支持自定义域名指向，动态计算资源调整，可以完成各种应用的开发编译与部署。</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
理解React组件的生命周期

## 原文链接
[https://segmentfault.com/a/1190000013354181](https://segmentfault.com/a/1190000013354181)

