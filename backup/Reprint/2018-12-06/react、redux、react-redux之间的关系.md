---
title: 'react、redux、react-redux之间的关系' 
date: 2018-12-06 2:30:09
hidden: true
slug: vt7aez71mxm
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0"><a href="https://reactjs.org/" rel="nofollow noreferrer" target="_blank">React</a></h3>
<p>一些小型项目，只使用 <code>React</code> 完全够用了，数据管理使用<code>props</code>、<code>state</code>即可，那什么时候需要引入<code>Redux</code>呢？<br>当渲染一个组件的数据是通过<code>props</code>从父组件中获取时，通常情况下是 <code>A --&gt; B</code>，但随着业务复杂度的增加，有可能是这样的：<code>A --&gt; B --&gt; C --&gt; D --&gt; E</code>，<code>E</code>需要的数据需要从<code>A</code>那里通过<code>props</code>传递过来，以及对应的 <code>E --&gt; A</code>逆向传递callback。组件BCD是不需要这些数据的，但是又必须经由它们来传递，这确实有点不爽，而且传递的<code>props</code>以及<code>callback</code>对BCD组件的复用也会造成影响。或者兄弟组件之间想要共享某些数据，也不是很方便传递、获取等。诸如此类的情况，就有必要引入Redux了。</p>
<blockquote>其实 <code>A --&gt; B --&gt; C --&gt; D --&gt; E</code> 这种情况，React不使用props层层传递也是能拿到数据的，使用<a href="https://reactjs.org/docs/context.html" rel="nofollow noreferrer" target="_blank">Context</a>即可。后面要讲到的<code>react-redux</code>就是通过<code>Context</code>让各个子组件拿到<code>store</code>中的数据的。</blockquote>
<h3 id="articleHeader1"><a href="https://redux.js.org/" rel="nofollow noreferrer" target="_blank">Redux</a></h3>
<p>其实我们只是想找个地方存放一些共享数据而已，大家都可以获取到，也都可以进行修改，仅此而已。<br>那放在一个全部变量里面行不行？行，当然行，但是太不优雅，也不安全，因为是全局变量嘛，谁都能访问、谁都能修改，有可能一不小心被哪个小伙伴覆盖了也说不定。那全局变量不行就用私有变量呗，<code>私有变量</code>、<code>不能轻易被修改</code>，是不是立马就想到<code>闭包</code>了...</p>
<p>现在要写这样一个函数，其满足：</p>
<ul>
<li>存放一个数据对象</li>
<li>外界能访问到这个数据</li>
<li>外界也能修改这个数据</li>
<li>当数据有变化的时候，通知订阅者</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createStore(reducer, initialState) {
  // currentState就是那个数据
  let currentState = initialState;
  let listener = () => {};

  function getState() {
    return currentState;
  }
  function dispatch(action) {
    currentState = reducer(currentState, action); // 更新数据
    listener(); // 执行订阅函数
    return action;
  }
  function subscribe(newListener) {
    listener = newListener;
    // 取消订阅函数
    return function unsubscribe() {
      listener = () => {};
    };
  }
  return {
    getState,
    dispatch,
    subscribe
  };
}

const store = createStore(reducer);
store.getState(); // 获取数据
store.dispatch({type: 'ADD_TODO'}); // 更新数据
store.subscribe(() => {/* update UI */}); // 注册订阅函数" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createStore</span>(<span class="hljs-params">reducer, initialState</span>) </span>{
  <span class="hljs-comment">// currentState就是那个数据</span>
  <span class="hljs-keyword">let</span> currentState = initialState;
  <span class="hljs-keyword">let</span> listener = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {};

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getState</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> currentState;
  }
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dispatch</span>(<span class="hljs-params">action</span>) </span>{
    currentState = reducer(currentState, action); <span class="hljs-comment">// 更新数据</span>
    listener(); <span class="hljs-comment">// 执行订阅函数</span>
    <span class="hljs-keyword">return</span> action;
  }
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">subscribe</span>(<span class="hljs-params">newListener</span>) </span>{
    listener = newListener;
    <span class="hljs-comment">// 取消订阅函数</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unsubscribe</span>(<span class="hljs-params"></span>) </span>{
      listener = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {};
    };
  }
  <span class="hljs-keyword">return</span> {
    getState,
    dispatch,
    subscribe
  };
}

<span class="hljs-keyword">const</span> store = createStore(reducer);
store.getState(); <span class="hljs-comment">// 获取数据</span>
store.dispatch({<span class="hljs-attr">type</span>: <span class="hljs-string">'ADD_TODO'</span>}); <span class="hljs-comment">// 更新数据</span>
store.subscribe(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {<span class="hljs-comment">/* update UI */</span>}); <span class="hljs-comment">// 注册订阅函数</span></code></pre>
<p>更新数据执行的步骤：</p>
<ul>
<li>What：想干什么 --- dispatch(action)</li>
<li>How：怎么干，干的结果 --- reducer(oldState, action) =&gt; newState</li>
<li>Then?：重新执行订阅函数（比如重新渲染UI等）</li>
</ul>
<p>这样就实现了一个store，提供一个数据存储中心，可以供外部访问、修改等，这就是Redux的主要思想。<br>所以，Redux确实和React没有什么本质关系，Redux可以结合其他库正常使用。只不过Redux这种数据管理方式，跟React的数据驱动视图理念很合拍，它俩结合在一起，开发非常便利。</p>
<p>现在既然有了一个安全的地方存取数据，怎么结合到React里面呢？<br>我们可以在应用初始化的时候，创建一个<code>window.store = createStore(reducer)</code>，然后在需要的地方通过<code>store.getState()</code>去获取数据，通过<code>store.dispatch</code>去更新数据，通过<code>store.subscribe</code>去订阅数据变化然后进行<code>setState</code>...如果很多地方都这样做一遍，实在是不堪其重，而且，还是没有避免掉<strong>全局变量的不优雅</strong>。</p>
<h3 id="articleHeader2"><a href="https://github.com/reactjs/react-redux" rel="nofollow noreferrer" target="_blank">React-Redux</a></h3>
<p>由于全局变量有诸多的缺点，那就换个思路，把store直接集成到React应用的顶层props里面，只要各个子组件能访问到顶层props就行了，比如这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<TopWrapComponent store={store}>
  <App />
</TopWrapComponent>," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;TopWrapComponent store={store}&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">TopWrapComponent</span>&gt;</span></span>,</code></pre>
<p>React恰好提供了这么一个钩子，<a href="https://reactjs.org/docs/context.html" rel="nofollow noreferrer" target="_blank">Context</a>，用法很简单，看一下官方demo就明了。现在各个子组件已经能够轻易地访问到store了，接下来就是子组件把store中用到的数据取出来、修改、以及订阅更新UI等。每个子组件都需要这样做一遍，显然，肯定有更便利的方法：<a href="https://reactjs.org/docs/higher-order-components.html" rel="nofollow noreferrer" target="_blank">高阶组件</a>。通过高阶组件把<code>store.getState()</code>、<code>store.dispatch</code>、<code>store.subscribe</code>封装起来，子组件对store就无感知了，子组件正常使用props获取数据以及正常使用callback触发回调，相当于没有store存在一样。</p>
<p>下面是这个高阶组件的大致实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function connect(mapStateToProps, mapDispatchToProps) {
  return function(WrappedComponent) {
    class Connect extends React.Component {
      componentDidMount() {
        // 组件加载完成后订阅store变化，如果store有变化则更新UI
        this.unsubscribe = this.context.store.subscribe(this.handleStoreChange.bind(this));
      }
      componentWillUnmount() {
        // 组件销毁后，取消订阅事件
        this.unsubscribe();
      }
      handleStoreChange() {
        // 更新UI
        this.forceUpdate();
      }
      render() {
        return (
          <WrappedComponent
            {...this.props}
            {...mapStateToProps(this.context.store.getState())} // 参数是store里面的数据
            {...mapDispatchToProps(this.context.store.dispatch)} // 参数是store.dispatch
          />
        );
      }
    }
    Connect.contextTypes = {
      store: PropTypes.object
    };
    return Connect;
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">connect</span>(<span class="hljs-params">mapStateToProps, mapDispatchToProps</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">WrappedComponent</span>) </span>{
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Connect</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
      componentDidMount() {
        <span class="hljs-comment">// 组件加载完成后订阅store变化，如果store有变化则更新UI</span>
        <span class="hljs-keyword">this</span>.unsubscribe = <span class="hljs-keyword">this</span>.context.store.subscribe(<span class="hljs-keyword">this</span>.handleStoreChange.bind(<span class="hljs-keyword">this</span>));
      }
      componentWillUnmount() {
        <span class="hljs-comment">// 组件销毁后，取消订阅事件</span>
        <span class="hljs-keyword">this</span>.unsubscribe();
      }
      handleStoreChange() {
        <span class="hljs-comment">// 更新UI</span>
        <span class="hljs-keyword">this</span>.forceUpdate();
      }
      render() {
        <span class="hljs-keyword">return</span> (
          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">WrappedComponent</span>
            {<span class="hljs-attr">...this.props</span>}
            {<span class="hljs-attr">...mapStateToProps</span>(<span class="hljs-attr">this.context.store.getState</span>())} // 参数是<span class="hljs-attr">store</span>里面的数据
            {<span class="hljs-attr">...mapDispatchToProps</span>(<span class="hljs-attr">this.context.store.dispatch</span>)} // 参数是<span class="hljs-attr">store.dispatch</span>
          /&gt;</span>
        );
      }
    }
    Connect.contextTypes = {
      store: PropTypes.object
    };
    return Connect;
  };
}</span></code></pre>
<p>使用connect的时候，我们知道要写一些样板化的代码，比如<code>mapStateToProps</code>、<code>mapDispatchToProps</code>这两个函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const mapStateToProps = state => {
  return {
    count: state.count
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Child);

// 上述代码执行之后，可以看到connect函数里面的
  <WrappedComponent
    {...this.props}
    {...mapStateToProps(this.context.store.getState())}
    {...mapDispatchToProps(this.context.store.dispatch)}
  />

// 就变成了
  <WrappedComponent
    {...this.props}
    {count: store.getState().count}
    {dispatch: store.dispatch}
  />

// 这样，子组件Child的props里面就多了count和dispatch两个属性
// count可以用来渲染UI，dispatch可以用来触发回调" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> mapStateToProps = <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">count</span>: state.count
  };
};

<span class="hljs-keyword">const</span> mapDispatchToProps = <span class="hljs-function"><span class="hljs-params">dispatch</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> {
    dispatch
  };
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> connect(mapStateToProps, mapDispatchToProps)(Child);

<span class="hljs-comment">// 上述代码执行之后，可以看到connect函数里面的</span>
  &lt;WrappedComponent
    {...this.props}
    {...mapStateToProps(<span class="hljs-keyword">this</span>.context.store.getState())}
    {...mapDispatchToProps(<span class="hljs-keyword">this</span>.context.store.dispatch)}
  /&gt;

<span class="hljs-comment">// 就变成了</span>
  &lt;WrappedComponent
    {...this.props}
    {<span class="hljs-attr">count</span>: store.getState().count}
    {<span class="hljs-attr">dispatch</span>: store.dispatch}
  /&gt;

<span class="hljs-comment">// 这样，子组件Child的props里面就多了count和dispatch两个属性</span>
<span class="hljs-comment">// count可以用来渲染UI，dispatch可以用来触发回调</span></code></pre>
<hr>
<p>So，这样就OK了？OK了。<br>通过一个闭包生成一个数据中心store，然后把这个store绑定到React的顶层props里面，子组件通过HOC建立与顶层props.store的联系，进而获取数据、修改数据、更新UI。<br>这里主要讲了一下三者怎么窜在一起的，如果想了解更高级的功能，比如redux中间件、reducer拆分、connect的其他参数等，可以去看一下对应的源码。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react、redux、react-redux之间的关系

## 原文链接
[https://segmentfault.com/a/1190000014297021](https://segmentfault.com/a/1190000014297021)

