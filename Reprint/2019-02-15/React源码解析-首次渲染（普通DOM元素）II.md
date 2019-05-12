---
title: 'React源码解析-首次渲染（普通DOM元素）II' 
date: 2019-02-15 2:30:44
hidden: true
slug: y7cou9dmdh
categories: [reprint]
---

{{< raw >}}

                    
<p>上一篇文章中，介绍了顶层对象<code>ReactCompositeComponent[T]</code>是如何构造的，接下来我们看看 batchedMountComponentIntoNode 做了什么事情。</p>
<p>本文将要讲解的调用栈是下面这个样子的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|=ReactMount.render(nextElement, container, callback)     ___
|=ReactMount._renderSubtreeIntoContainer()                 |
  |-ReactMount._renderNewRootComponent()                   |
    |-instantiateReactComponent()                          |
    |~batchedMountComponentIntoNode()                  upper half
      |~mountComponentIntoNode()                       (平台无关)
        |-ReactReconciler.mountComponent()                 |
          |-ReactCompositeComponent.mountComponent()       |
          |-ReactCompositeComponent.performInitialMount()  |
            |-instantiateReactComponent()                 _|_
            |-ReactDOMComponent.mountComponent()       lower half
        |-_mountImageIntoNode()                      (HTML DOM 相关)
                                                          _|_" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">|=ReactMount.render(nextElement, container, callback)     ___
|=ReactMount._renderSubtreeIntoContainer()                 |
  |-ReactMount._renderNewRootComponent()                   |
    |-instantiateReactComponent()                          |
    |~batchedMountComponentIntoNode()                  upper half
      |~mountComponentIntoNode()                       (平台无关)
        |-ReactReconciler.mountComponent()                 |
          |-ReactCompositeComponent.mountComponent()       |
          |-ReactCompositeComponent.performInitialMount()  |
            |-instantiateReactComponent()                 _|_
            |-ReactDOMComponent.mountComponent()       lower half
        |-_mountImageIntoNode()                      (HTML DOM 相关)
                                                          _|_</code></pre>
<p>如果看源码，我们会留意到很多<code>transaction</code>相关的代码，我们暂时先将其忽略，会在后续的文章中进行讲解。暂时可以理解为调用<code>transaction.perform</code>时，实际上就是对第一个参数进行函数调用。跳过一些模版代码后，实际上做事情的是 mountComponentIntoNode 这个方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 文件位置：src/renderers/dom/client/ReactMount.js

function mountComponentIntoNode(
    wrapperInstance,    // ReactCompositeComponent[T]
    container,          // document.getElementById(&quot;root&quot;)
    transaction,
    shouldReuseMarkup,
    context
) {
    ...
    
    var markup = ReactReconciler.mountComponent(
        wrapperInstance,
        transaction,
        null,
        ReactDOMContainerInfo(wrapperInstance, container),
        context,
        0 /* parentDebugID */
    );

    ...
    
    ReactMount._mountImageIntoNode(
        markup,
        container,
        wrapperInstance,
        shouldReuseMarkup,
        transaction
    );
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 文件位置：src/renderers/dom/client/ReactMount.js</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mountComponentIntoNode</span>(<span class="hljs-params">
    wrapperInstance,    <span class="hljs-regexp">//</span> ReactCompositeComponent[T]
    container,          <span class="hljs-regexp">//</span> document.getElementById(<span class="hljs-string">"root"</span></span>)
    <span class="hljs-title">transaction</span>,
    <span class="hljs-title">shouldReuseMarkup</span>,
    <span class="hljs-title">context</span>
) </span>{
    ...
    
    var markup = ReactReconciler.mountComponent(
        wrapperInstance,
        transaction,
        <span class="hljs-literal">null</span>,
        ReactDOMContainerInfo(wrapperInstance, container),
        context,
        <span class="hljs-number">0</span> <span class="hljs-comment">/* parentDebugID */</span>
    );

    ...
    
    ReactMount._mountImageIntoNode(
        markup,
        container,
        wrapperInstance,
        shouldReuseMarkup,
        transaction
    );
}
</code></pre>
<p>ReactReconciler.mountComponent 用于创建 DOM 元素，而 ReactMount._mountImageIntoNode 则是将刚创建的 DOM 元素挂载到页面。ReactReconciler.mountComponent 会调用 <code>ReactCompositeComponent[T]</code>的 mountComponent 方法。在看 mountComponent 方法前，还需要先准备好 hostContainerInfo，由 ReactDOMContainerInfo 生成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 文件位置：src/renderers/shared/stack/reconciler/ReactContainerInfo.js

function ReactDOMContainerInfo(
    topLevelWrapper,     // ReactCompositeComponent[T]
    node                 // document.getElementById(&quot;root&quot;)
) {
    var info = {
        _topLevelWrapper: topLevelWrapper,
        _idCounter: 1,
        _ownerDocument: node ?
            node.nodeType === DOC_NODE_TYPE ? node : node.ownerDocument : null,
        _node: node,
        _tag: node ? node.nodeName.toLowerCase() : null,
        _namespaceURI: node ? node.namespaceURI : null,
    };
    
    ...
    
    return info;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 文件位置：src/renderers/shared/stack/reconciler/ReactContainerInfo.js</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ReactDOMContainerInfo</span>(<span class="hljs-params">
    topLevelWrapper,     <span class="hljs-regexp">//</span> ReactCompositeComponent[T]
    node                 <span class="hljs-regexp">//</span> document.getElementById(<span class="hljs-string">"root"</span></span>)
) </span>{
    <span class="hljs-keyword">var</span> info = {
        <span class="hljs-attr">_topLevelWrapper</span>: topLevelWrapper,
        <span class="hljs-attr">_idCounter</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">_ownerDocument</span>: node ?
            node.nodeType === DOC_NODE_TYPE ? node : node.ownerDocument : <span class="hljs-literal">null</span>,
        <span class="hljs-attr">_node</span>: node,
        <span class="hljs-attr">_tag</span>: node ? node.nodeName.toLowerCase() : <span class="hljs-literal">null</span>,
        <span class="hljs-attr">_namespaceURI</span>: node ? node.namespaceURI : <span class="hljs-literal">null</span>,
    };
    
    ...
    
    return info;
}</code></pre>
<p>现在各实例间的关系是这样的：</p>
<p><span class="img-wrap"><img data-src="/img/bVbip5a?w=806&amp;h=429" src="https://static.alili.tech/img/bVbip5a?w=806&amp;h=429" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>再继续看 mountComponent 方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 文件位置：src/renderers/shared/stack/reconciler/ReactCompositeComponent.js

mountComponent: function (
    transaction,
    hostParent,
    hostContainerInfo,
    context
) {
    ...

    // this._currentElement 为ReactElement[2](TopLevelWrapper)
    var publicProps = this._currentElement.props;
    var publicContext = this._processContext(context);

    // TopLevelWrapper
    var Component = this._currentElement.type;

    ...

    // Initialize the public class
    var doConstruct = shouldConstruct(Component);
    
    // 生成TopLevelWrapper 实例
    var inst = this._constructComponent(
        doConstruct,
        publicProps,
        publicContext,
        updateQueue
    );
    
    ...

    var markup;
    
    ...
    
    markup = this.performInitialMount(renderedElement,
            hostParent, hostContainerInfo, transaction, context

    ...

    return markup;
},

performInitialMount: function (renderedElement, hostParent,
    hostContainerInfo, transaction, context) {
    
    // TopLevelWrapper 实例
    var inst = this._instance;

    ...
    
    // If not a stateless component, we now render
    if (renderedElement === undefined) {
        // 返回值为 ReactElement[1]
        renderedElement = this._renderValidatedComponent();
    }

    // 返回 ReactNodeTypes.HOST
    var nodeType = ReactNodeTypes.getType(renderedElement);
    
    this._renderedNodeType = nodeType;
    
    // instantiateReactComponent.js
    var child = this._instantiateReactComponent(
        renderedElement,
        nodeType !== ReactNodeTypes.EMPTY /* shouldHaveDebugID */
    );
    this._renderedComponent = child;

    var markup = ReactReconciler.mountComponent(
        child,
        transaction,
        hostParent,
        hostContainerInfo,
        this._processChildContext(context),
        debugID
    );

    ...

    return markup;
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 文件位置：src/renderers/shared/stack/reconciler/ReactCompositeComponent.js</span>

mountComponent: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">
    transaction,
    hostParent,
    hostContainerInfo,
    context
</span>) </span>{
    ...

    <span class="hljs-comment">// this._currentElement 为ReactElement[2](TopLevelWrapper)</span>
    <span class="hljs-keyword">var</span> publicProps = <span class="hljs-keyword">this</span>._currentElement.props;
    <span class="hljs-keyword">var</span> publicContext = <span class="hljs-keyword">this</span>._processContext(context);

    <span class="hljs-comment">// TopLevelWrapper</span>
    <span class="hljs-keyword">var</span> Component = <span class="hljs-keyword">this</span>._currentElement.type;

    ...

    <span class="hljs-comment">// Initialize the public class</span>
    <span class="hljs-keyword">var</span> doConstruct = shouldConstruct(Component);
    
    <span class="hljs-comment">// 生成TopLevelWrapper 实例</span>
    <span class="hljs-keyword">var</span> inst = <span class="hljs-keyword">this</span>._constructComponent(
        doConstruct,
        publicProps,
        publicContext,
        updateQueue
    );
    
    ...

    var markup;
    
    ...
    
    markup = <span class="hljs-keyword">this</span>.performInitialMount(renderedElement,
            hostParent, hostContainerInfo, transaction, context

    ...

    return markup;
},

<span class="hljs-attr">performInitialMount</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">renderedElement, hostParent,
    hostContainerInfo, transaction, context</span>) </span>{
    
    <span class="hljs-comment">// TopLevelWrapper 实例</span>
    <span class="hljs-keyword">var</span> inst = <span class="hljs-keyword">this</span>._instance;

    ...
    
    <span class="hljs-comment">// If not a stateless component, we now render</span>
    <span class="hljs-keyword">if</span> (renderedElement === <span class="hljs-literal">undefined</span>) {
        <span class="hljs-comment">// 返回值为 ReactElement[1]</span>
        renderedElement = <span class="hljs-keyword">this</span>._renderValidatedComponent();
    }

    <span class="hljs-comment">// 返回 ReactNodeTypes.HOST</span>
    <span class="hljs-keyword">var</span> nodeType = ReactNodeTypes.getType(renderedElement);
    
    <span class="hljs-keyword">this</span>._renderedNodeType = nodeType;
    
    <span class="hljs-comment">// instantiateReactComponent.js</span>
    <span class="hljs-keyword">var</span> child = <span class="hljs-keyword">this</span>._instantiateReactComponent(
        renderedElement,
        nodeType !== ReactNodeTypes.EMPTY <span class="hljs-comment">/* shouldHaveDebugID */</span>
    );
    <span class="hljs-keyword">this</span>._renderedComponent = child;

    <span class="hljs-keyword">var</span> markup = ReactReconciler.mountComponent(
        child,
        transaction,
        hostParent,
        hostContainerInfo,
        <span class="hljs-keyword">this</span>._processChildContext(context),
        debugID
    );

    ...

    return markup;
},</code></pre>
<p>当运行到<code>var child = this._instantiateReactComponent</code>时，就会调用上篇文章说到的<code>instantiateReactComponent</code>文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 文件位置：src/renderers/shared/stack/reconciler/instantiateReactComponent.js

function instantiateReactComponent(node, shouldHaveDebugID) {
    var instance;

    ...
    
    } else if (typeof node === 'object') {
        ...

        // element.type 为 ‘h1’
        if (typeof element.type === 'string') {
            instance = ReactHostComponent.createInternalComponent(element);
        } 

    return instance;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 文件位置：src/renderers/shared/stack/reconciler/instantiateReactComponent.js</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">instantiateReactComponent</span>(<span class="hljs-params">node, shouldHaveDebugID</span>) </span>{
    <span class="hljs-keyword">var</span> instance;

    ...
    
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> node === <span class="hljs-string">'object'</span>) {
        ...

        <span class="hljs-comment">// element.type 为 ‘h1’</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> element.type === <span class="hljs-string">'string'</span>) {
            instance = ReactHostComponent.createInternalComponent(element);
        } 

    <span class="hljs-keyword">return</span> instance;
}</code></pre>
<p>ReactDom 会在执行的时候，执行<code>ReactDefaultInjection.inject()</code>将 ReactDOMComponent 注入到 ReactHostComponent 中，ReactHostComponent.createInternalComponent 最终会调用 ReactDOMComponent：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 文件位置：src/renderers/dom/shared/ReactDomComponent.js

function ReactDOMComponent(element) {
    // h1
    var tag = element.type;
    
    validateDangerousTag(tag);
    
    // ReactElement[1]
    this._currentElement = element;
    
    this._tag = tag.toLowerCase();
    this._namespaceURI = null;
    this._renderedChildren = null;
    this._previousStyle = null;
    this._previousStyleCopy = null;
    this._hostNode = null;
    this._hostParent = null;
    this._rootNodeID = 0;
    this._domID = 0;
    this._hostContainerInfo = null;
    this._wrapperState = null;
    this._topLevelWrapper = null;
    this._flags = 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 文件位置：src/renderers/dom/shared/ReactDomComponent.js</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ReactDOMComponent</span>(<span class="hljs-params">element</span>) </span>{
    <span class="hljs-comment">// h1</span>
    <span class="hljs-keyword">var</span> tag = element.type;
    
    validateDangerousTag(tag);
    
    <span class="hljs-comment">// ReactElement[1]</span>
    <span class="hljs-keyword">this</span>._currentElement = element;
    
    <span class="hljs-keyword">this</span>._tag = tag.toLowerCase();
    <span class="hljs-keyword">this</span>._namespaceURI = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">this</span>._renderedChildren = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">this</span>._previousStyle = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">this</span>._previousStyleCopy = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">this</span>._hostNode = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">this</span>._hostParent = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">this</span>._rootNodeID = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">this</span>._domID = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">this</span>._hostContainerInfo = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">this</span>._wrapperState = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">this</span>._topLevelWrapper = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">this</span>._flags = <span class="hljs-number">0</span>;
}</code></pre>
<p>我们将返回的实例命名为 ReactDOMComponent[ins]。</p>
<p>ReactReconciler.mountComponent 会调用 ReactDomComponent 的 mountComponent 方法，这就会涉及到 HTML DOM 相关的内容，我们在下一篇进行讲解。</p>
<p>现在我们来看一下各实例间的关系：</p>
<p><span class="img-wrap"><img data-src="/img/bVbiqFI?w=838&amp;h=492" src="https://static.alili.tech/img/bVbiqFI?w=838&amp;h=492" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>目前为止的调用栈：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|=ReactMount.render(nextElement, container, callback)     ___
|=ReactMount._renderSubtreeIntoContainer()                 |
  |-ReactMount._renderNewRootComponent()                   |
    |-instantiateReactComponent()                          |
    |~batchedMountComponentIntoNode()                  upper half
      |~mountComponentIntoNode()                       (平台无关)
        |-ReactReconciler.mountComponent()                 |
          |-ReactCompositeComponent.mountComponent()       |
          |-ReactCompositeComponent.performInitialMount()  |
            |-instantiateReactComponent()                 _|_
            |-ReactDOMComponent.mountComponent()       lower half
        |-_mountImageIntoNode()                 (HTML DOM 相关下一篇讲解)
                                                          _|_" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">|=ReactMount.render(nextElement, container, callback)     ___
|=ReactMount._renderSubtreeIntoContainer()                 |
  |-ReactMount._renderNewRootComponent()                   |
    |-instantiateReactComponent()                          |
    |~batchedMountComponentIntoNode()                  upper half
      |~mountComponentIntoNode()                       (平台无关)
        |-ReactReconciler.mountComponent()                 |
          |-ReactCompositeComponent.mountComponent()       |
          |-ReactCompositeComponent.performInitialMount()  |
            |-instantiateReactComponent()                 _|_
            |-ReactDOMComponent.mountComponent()       lower half
        |-_mountImageIntoNode()                 (HTML DOM 相关下一篇讲解)
                                                          _|_</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React源码解析-首次渲染（普通DOM元素）II

## 原文链接
[https://segmentfault.com/a/1190000016746443](https://segmentfault.com/a/1190000016746443)

