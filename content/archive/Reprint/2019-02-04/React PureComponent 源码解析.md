---
title: 'React PureComponent 源码解析' 
date: 2019-02-04 2:30:58
hidden: true
slug: 955rep1qpg7
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">TL;DR</h2>
<p>React 15.3.0 新增了一个 <code>PureComponent</code> 类，以 ES2015 class 的方式方便地定义纯组件 (pure component)。这篇文章分析了一下源码实现，并衍生探讨了下 <code>shallowCompare</code> 和 <code>PureRenderMixin</code>。相关的 GitHub PR 在 <a href="https://github.com/facebook/react/pull/7195" rel="nofollow noreferrer" target="_blank">这里</a> 。</p>
<h2 id="articleHeader1">PureComponent 源码分析</h2>
<p>这个类的用法很简单，如果你有些组件是纯组件，那么把继承类从 <code>Component</code> 换成 <code>PureComponent</code> 即可。当组件更新时，如果组件的 <code>props</code> 和 <code>state</code> 都没发生改变，render 方法就不会触发，省去 Virtual DOM 的生成和比对过程，达到提升性能的目的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { PureComponent } from 'react'

class Example extends PureComponent {
  render() {
    // ...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React, { PureComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Example</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">PureComponent</span> </span>{
  render() {
    <span class="hljs-comment">// ...</span>
  }
}</code></pre>
<p><code>PureComponent</code> 自身的源码也很简单，节选如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ReactPureComponent(props, context, updater) {
  // Duplicated from ReactComponent.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

function ComponentDummy() {}
ComponentDummy.prototype = ReactComponent.prototype;
ReactPureComponent.prototype = new ComponentDummy();
ReactPureComponent.prototype.constructor = ReactPureComponent;
// Avoid an extra prototype jump for these methods.
Object.assign(ReactPureComponent.prototype, ReactComponent.prototype);
ReactPureComponent.prototype.isPureReactComponent = true;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ReactPureComponent</span>(<span class="hljs-params">props, context, updater</span>) </span>{
  <span class="hljs-comment">// Duplicated from ReactComponent.</span>
  <span class="hljs-keyword">this</span>.props = props;
  <span class="hljs-keyword">this</span>.context = context;
  <span class="hljs-keyword">this</span>.refs = emptyObject;
  <span class="hljs-comment">// We initialize the default updater but the real one gets injected by the</span>
  <span class="hljs-comment">// renderer.</span>
  <span class="hljs-keyword">this</span>.updater = updater || ReactNoopUpdateQueue;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ComponentDummy</span>(<span class="hljs-params"></span>) </span>{}
ComponentDummy.prototype = ReactComponent.prototype;
ReactPureComponent.prototype = <span class="hljs-keyword">new</span> ComponentDummy();
ReactPureComponent.prototype.constructor = ReactPureComponent;
<span class="hljs-comment">// Avoid an extra prototype jump for these methods.</span>
<span class="hljs-built_in">Object</span>.assign(ReactPureComponent.prototype, ReactComponent.prototype);
ReactPureComponent.prototype.isPureReactComponent = <span class="hljs-literal">true</span>;</code></pre>
<p>上面的 <code>ReactPureComponent</code> 就是暴露给外部使用的 <code>PureComponent</code> 。可以看到它只是继承了 <code>ReactComponent</code> 再设定了一下 <code>isPureReactComponent</code> 属性。<code>ComponentDummy</code> 是典型的 JavaScript 原型模拟继承的做法，对此有疑惑的可以看 <a href="https://segmentfault.com/a/1190000003798438#articleHeader2">我的另一篇文章</a> 。另外，为了避免原型链拉长导致方法查找的性能开销，还用 <code>Object.assign</code> 把方法从 <code>ReactComponent</code> 拷贝过来了。</p>
<p>跟 <code>PureRenderMixin</code> 不一样的是，这里完全没有实现 <code>shouldComponentUpdate</code>。那 <code>PureComponent</code> 的 props/state 比对是在哪里做的呢？答案是 <code>ReactCompositeComponent</code>。</p>
<p><code>ReactCompositeComponent</code> 这个类的信息太少，我只能推测它是负责实际渲染并维护组件实例的对象。建议大家从高层次了解 React 对组件的更新机制即可。以下几篇官方文档看完就足够了。</p>
<ul>
<li><p><a href="https://facebook.github.io/react/docs/advanced-performance.html" rel="nofollow noreferrer" target="_blank">Advanced Performance</a></p></li>
<li><p><a href="https://facebook.github.io/react/docs/reconciliation.html" rel="nofollow noreferrer" target="_blank">Reconciliation</a></p></li>
<li><p><a href="https://facebook.github.io/react/docs/glossary.html" rel="nofollow noreferrer" target="_blank">React (Virtual) DOM Terminology</a></p></li>
</ul>
<p>这个类的代码改动很多，但关键就在 <a href="https://github.com/facebook/react/pull/7195/files#diff-6363300a479c9057729248ca9dd3e7b6R873" rel="nofollow noreferrer" target="_blank">这里</a> 。下面是我简化后的代码片段：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 定义 CompositeTypes
var CompositeTypes = {
  ImpureClass: 0,         // 继承自 Component 的组件
  PureClass: 1,           // 继承自 PureComponent 的组件
  StatelessFunctional: 2, // 函数组件
};

// 省略一堆代码，因为加入了 CompositeTypes 造成的调整

// 这个变量用来控制组件是否需要更新
var shouldUpdate = true;

// inst 是组件实例
if (inst.shouldComponentUpdate) {
  shouldUpdate = inst.shouldComponentUpdate(nextProps, nextState, nextContext);
} else {
  if (this._compositeType === CompositeType.PureClass) {
    // 用 shallowEqual 对比 props 和 state 的改动
    // 如果都没改变就不用更新
    shouldUpdate =
      !shallowEqual(prevProps, nextProps) ||
      !shallowEqual(inst.state, nextState);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 定义 CompositeTypes</span>
<span class="hljs-keyword">var</span> CompositeTypes = {
  <span class="hljs-attr">ImpureClass</span>: <span class="hljs-number">0</span>,         <span class="hljs-comment">// 继承自 Component 的组件</span>
  PureClass: <span class="hljs-number">1</span>,           <span class="hljs-comment">// 继承自 PureComponent 的组件</span>
  StatelessFunctional: <span class="hljs-number">2</span>, <span class="hljs-comment">// 函数组件</span>
};

<span class="hljs-comment">// 省略一堆代码，因为加入了 CompositeTypes 造成的调整</span>

<span class="hljs-comment">// 这个变量用来控制组件是否需要更新</span>
<span class="hljs-keyword">var</span> shouldUpdate = <span class="hljs-literal">true</span>;

<span class="hljs-comment">// inst 是组件实例</span>
<span class="hljs-keyword">if</span> (inst.shouldComponentUpdate) {
  shouldUpdate = inst.shouldComponentUpdate(nextProps, nextState, nextContext);
} <span class="hljs-keyword">else</span> {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>._compositeType === CompositeType.PureClass) {
    <span class="hljs-comment">// 用 shallowEqual 对比 props 和 state 的改动</span>
    <span class="hljs-comment">// 如果都没改变就不用更新</span>
    shouldUpdate =
      !shallowEqual(prevProps, nextProps) ||
      !shallowEqual(inst.state, nextState);
  }
}</code></pre>
<p>简而言之，<code>ReactCompositeComponent</code> 会在 mount 的时候判断各个组件的类型，设定 <code>_compositeType</code> ，然后根据这个类型来判断是非需要更新组件。这个 PR 中大部分改动都是 因为加了 <code>CompositeTypes</code> 而做的调整性工作，实际跟 <code>PureComponent</code> 有关的就是 <code>shallowEqual</code> 的那两行。</p>
<p>关于 <code>PureComponent</code> 的源码分析就到这里。其他的就都是细节和测试，有兴趣的可以自己看看 PR 。</p>
<h2 id="articleHeader2">shallowEqual, shallowCompare, PureRenderMixin 的联系</h2>
<p>我们知道在 <code>PureComponent</code> 出现之前，<code>shallowCompare</code> 和 <code>PureRenderMixin</code> 都可以做一样的事情。于是好奇看了一下后两者的代码。</p>
<p><code>shallowCompare</code> 的源码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var shallowEqual = require('shallowEqual');

function shallowCompare(instance, nextProps, nextState) {
  return (
    !shallowEqual(instance.props, nextProps) ||
    !shallowEqual(instance.state, nextState)
  );
}

module.exports = shallowCompare;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> shallowEqual = <span class="hljs-built_in">require</span>(<span class="hljs-string">'shallowEqual'</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">shallowCompare</span>(<span class="hljs-params">instance, nextProps, nextState</span>) </span>{
  <span class="hljs-keyword">return</span> (
    !shallowEqual(instance.props, nextProps) ||
    !shallowEqual(instance.state, nextState)
  );
}

<span class="hljs-built_in">module</span>.exports = shallowCompare;</code></pre>
<p><code>PureRenderMixin</code> 的源码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var shallowCompare = require('shallowCompare');

var ReactComponentWithPureRenderMixin = {
  shouldComponentUpdate: function(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  },
};

module.exports = ReactComponentWithPureRenderMixin;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> shallowCompare = <span class="hljs-built_in">require</span>(<span class="hljs-string">'shallowCompare'</span>);

<span class="hljs-keyword">var</span> ReactComponentWithPureRenderMixin = {
  <span class="hljs-attr">shouldComponentUpdate</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">nextProps, nextState</span>) </span>{
    <span class="hljs-keyword">return</span> shallowCompare(<span class="hljs-keyword">this</span>, nextProps, nextState);
  },
};

<span class="hljs-built_in">module</span>.exports = ReactComponentWithPureRenderMixin;</code></pre>
<p>可以看到，<code>shallowCompare</code> 依赖 <code>shallowEqual</code> ，做的是跟刚才在 <code>ReactCompositeComponent</code> 里一样的事情 -- 对比 props 和 state 。这个工具函数一般配合组件的 <code>shouldComponentUpdate</code> 一起使用，而这就是 <code>PureRenderMixin</code> 做的事情。不过 <code>PureRenderMixin</code> 是配合 <code>React.createClass</code> 这种老的组件定义方式使用的，在 ES2015 class 里用起来不是很方便，这也是 <code>PureComponent</code> 诞生的原因之一。</p>
<p>最后 <code>shallowEqual</code> 这玩意定义在哪里呢？它其实不是 React 的一部分，而是 <a href="https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/core/shallowEqual.js" rel="nofollow noreferrer" target="_blank">fbjs 的一部分</a>。这是 Facebook 内部使用的一个工具集。</p>
<h2 id="articleHeader3">小结</h2>
<p>React 之前一直没有针对 ES2015 class 的纯组件写法，虽然自己实现起来并不麻烦，但这也算给出了一个官方的解决方案，可以不再依赖 addon 了。不过 <code>PureComponent</code> 也不是万能的，特定情况下自己实现 <code>shouldComponentUpdate</code> 可能更高效。</p>
<h2 id="articleHeader4">参考资料</h2>
<p><a href="https://github.com/facebook/react/pull/7195" rel="nofollow noreferrer" target="_blank">PureComponent PR</a><br><a href="https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/core/shallowEqual.js" rel="nofollow noreferrer" target="_blank">shallowEqual</a><br><a href="https://facebook.github.io/react/docs/shallow-compare.html" rel="nofollow noreferrer" target="_blank">Shallow Compare</a><br><a href="https://facebook.github.io/react/docs/pure-render-mixin.html" rel="nofollow noreferrer" target="_blank">PureRenderMixin</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React PureComponent 源码解析

## 原文链接
[https://segmentfault.com/a/1190000006741060](https://segmentfault.com/a/1190000006741060)

