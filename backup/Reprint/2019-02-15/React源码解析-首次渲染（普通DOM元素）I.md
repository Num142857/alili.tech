---
title: 'React源码解析-首次渲染（普通DOM元素）I' 
date: 2019-02-15 2:30:44
hidden: true
slug: kebbxbzzbg
categories: [reprint]
---

{{< raw >}}

                    
<ul><li><h3 id="articleHeader0">前言</h3></li></ul>
<p>React 是一个十分庞大的库，由于要同时考虑 ReactDom 和 ReactNative ，还有服务器渲染等，导致其代码抽象化程度很高，嵌套层级非常深，阅读其源码是一个非常艰辛的过程。在学习 React 源码的过程中，给我帮助最大的就是<a href="https://holmeshe.me/categories/Understanding-The-React-Source-Code/" rel="nofollow noreferrer" target="_blank">这个系列文章</a>，于是决定基于这个系列文章谈一下自己的理解。本文会大量用到原文中的例子，想体会原汁原味的感觉，推荐阅读原文。</p>
<p>本系列文章将基于 React 15.4.2。</p>
<ul><li><h3 id="articleHeader1">React.createElement</h3></li></ul>
<p>在写 React 项目的时候，我们一般会直接用 JSX 的形式来写，而 JSX 经过 Babel 编译后最终会将 HTML 标签转换为<code>React.createElement</code>的函数形式。如果想进行更深入的了解，可以看我之前写的这篇文章：<a href="https://segmentfault.com/a/1190000016129036">你不知道的Virtual DOM（一）：Virtual Dom介绍</a>。文章中的<code>h</code>函数，如果不在 Babel 中配置的话，默认就是<code>React.createElement</code>。</p>
<p>下面，我们将从一个最简单的例子，来看React是如何渲染的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ReactDOM.render(
    <h1 style="{{"&quot;color&quot;:&quot;blue&quot;"}}">hello world</h1>,
    document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">ReactDOM.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"</span>"<span class="hljs-attr">color</span>"<span class="hljs-attr">:</span>"<span class="hljs-attr">blue</span>""}}"&gt;</span>hello world<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>,
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'root'</span>)
);</code></pre>
<p>经过JSX编译后，会是下面这个样子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ReactDOM.render(
    React.createElement(
        'h1',
        { style: { &quot;color&quot;: &quot;blue&quot; } },
        'hello world'
    ),
    document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">ReactDOM.render(
    React.createElement(
        <span class="hljs-string">'h1'</span>,
        { <span class="hljs-attr">style</span>: { <span class="hljs-string">"color"</span>: <span class="hljs-string">"blue"</span> } },
        <span class="hljs-string">'hello world'</span>
    ),
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'root'</span>)
);</code></pre>
<p>先来看下<code>React.createElement</code>的源码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 文件位置：src/isomorphic/React.js

var ReactElement = require('ReactElement');

...

var createElement = ReactElement.createElement;

...

var React = {
    ...
    
    createElement: createElement,
    
    ...
}

module.exports = React;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 文件位置：src/isomorphic/React.js</span>

<span class="hljs-keyword">var</span> ReactElement = <span class="hljs-built_in">require</span>(<span class="hljs-string">'ReactElement'</span>);

...

var createElement = ReactElement.createElement;

...

var React = {
    ...
    
    createElement: createElement,
    
    ...
}

<span class="hljs-built_in">module</span>.exports = React;</code></pre>
<p>最终的实现需要查看<code>ReactElement.createElement</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 文件位置：src/isomorphic/classic/element/ReactElement.js

ReactElement.createElement = function (type, config, children) {
    ...

    // 1. 将过滤后的有效的属性，从config拷贝到props
    if (config != null) {
        
        ...
        
        for (propName in config) {
            if (hasOwnProperty.call(config, propName) &amp;&amp;
                !RESERVED_PROPS.hasOwnProperty(propName)) {
                props[propName] = config[propName];
            }
        }
    }

    // 2. 将children以数组的形式拷贝到props.children属性
    var childrenLength = arguments.length - 2;
    if (childrenLength === 1) {
        props.children = children;
    } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);
        for (var i = 0; i < childrenLength; i++) {
            childArray[i] = arguments[i + 2];
        }
        if (__DEV__) {
            if (Object.freeze) {
                Object.freeze(childArray);
            }
        }
        props.children = childArray;
    }

    // 3. 默认属性赋值
    if (type &amp;&amp; type.defaultProps) {
        var defaultProps = type.defaultProps;
        for (propName in defaultProps) {
            if (props[propName] === undefined) {
                props[propName] = defaultProps[propName];
            }
        }
    }
    
    ...
    
    return ReactElement(
        type,
        key,
        ref,
        self,
        source,
        ReactCurrentOwner.current,
        props
    );
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 文件位置：src/isomorphic/classic/element/ReactElement.js</span>

ReactElement.createElement = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">type, config, children</span>) </span>{
    ...

    <span class="hljs-comment">// 1. 将过滤后的有效的属性，从config拷贝到props</span>
    <span class="hljs-keyword">if</span> (config != <span class="hljs-literal">null</span>) {
        
        ...
        
        for (propName <span class="hljs-keyword">in</span> config) {
            <span class="hljs-keyword">if</span> (hasOwnProperty.call(config, propName) &amp;&amp;
                !RESERVED_PROPS.hasOwnProperty(propName)) {
                props[propName] = config[propName];
            }
        }
    }

    <span class="hljs-comment">// 2. 将children以数组的形式拷贝到props.children属性</span>
    <span class="hljs-keyword">var</span> childrenLength = <span class="hljs-built_in">arguments</span>.length - <span class="hljs-number">2</span>;
    <span class="hljs-keyword">if</span> (childrenLength === <span class="hljs-number">1</span>) {
        props.children = children;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (childrenLength &gt; <span class="hljs-number">1</span>) {
        <span class="hljs-keyword">var</span> childArray = <span class="hljs-built_in">Array</span>(childrenLength);
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; childrenLength; i++) {
            childArray[i] = <span class="hljs-built_in">arguments</span>[i + <span class="hljs-number">2</span>];
        }
        <span class="hljs-keyword">if</span> (__DEV__) {
            <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Object</span>.freeze) {
                <span class="hljs-built_in">Object</span>.freeze(childArray);
            }
        }
        props.children = childArray;
    }

    <span class="hljs-comment">// 3. 默认属性赋值</span>
    <span class="hljs-keyword">if</span> (type &amp;&amp; type.defaultProps) {
        <span class="hljs-keyword">var</span> defaultProps = type.defaultProps;
        <span class="hljs-keyword">for</span> (propName <span class="hljs-keyword">in</span> defaultProps) {
            <span class="hljs-keyword">if</span> (props[propName] === <span class="hljs-literal">undefined</span>) {
                props[propName] = defaultProps[propName];
            }
        }
    }
    
    ...
    
    return ReactElement(
        type,
        key,
        ref,
        self,
        source,
        ReactCurrentOwner.current,
        props
    );
};</code></pre>
<p>本质上只做了3件事：</p>
<ol>
<li>将过滤后的有效的属性，从config拷贝到props</li>
<li>将children以数组的形式拷贝到props.children属性</li>
<li>默认属性赋值</li>
</ol>
<p>最终的返回值是<code>ReactElement</code>。我们再来看看它做了什么</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 文件位置：src/isomorphic/classic/element/ReactElement.js

var ReactElement = function (type, key, ref, self, source, owner, props) {
    var element = {
        // This tag allow us to uniquely identify this as a React Element
        $$typeof: REACT_ELEMENT_TYPE,

        // Built-in properties that belong on the element
        type: type,
        key: key,
        ref: ref,
        props: props,

        // Record the component responsible for creating this element.
        _owner: owner,
    };
    
    ...

    return element;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 文件位置：src/isomorphic/classic/element/ReactElement.js</span>

<span class="hljs-keyword">var</span> ReactElement = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">type, key, ref, self, source, owner, props</span>) </span>{
    <span class="hljs-keyword">var</span> element = {
        <span class="hljs-comment">// This tag allow us to uniquely identify this as a React Element</span>
        $$<span class="hljs-keyword">typeof</span>: REACT_ELEMENT_TYPE,

        <span class="hljs-comment">// Built-in properties that belong on the element</span>
        type: type,
        <span class="hljs-attr">key</span>: key,
        <span class="hljs-attr">ref</span>: ref,
        <span class="hljs-attr">props</span>: props,

        <span class="hljs-comment">// Record the component responsible for creating this element.</span>
        _owner: owner,
    };
    
    ...

    return element;
};</code></pre>
<p>最终只是返回了一个简单对象。调用栈是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.createElement
|=ReactElement.createElement(type, config, children)
    |-ReactElement(type,..., props)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">React.createElement
|=ReactElement.createElement(type, config, children)
    |-ReactElement(type,..., props)</code></pre>
<p>这里生成的 ReactElement 我们将其命名为<code>ReactElement[1]</code>，它将作为参数传入到 ReactDom.render。</p>
<ul><li><h3 id="articleHeader2">ReactDom.render</h3></li></ul>
<p>ReactDom.render 最终会调用 ReactMount 的 _renderSubtreeIntoContainer：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 文件位置：src/renderers/dom/client/ReactMount.js

_renderSubtreeIntoContainer: function (parentComponent, nextElement, container, callback) {
    ...
    var nextWrappedElement = React.createElement(
        TopLevelWrapper, 
        {
            child: nextElement
        }
    );

    ...
    
    var component = ReactMount._renderNewRootComponent(
        nextWrappedElement,
        container,
        shouldReuseMarkup,
        nextContext
    )._renderedComponent.getPublicInstance();
    
    ...
    
    return component;
},

...

var TopLevelWrapper = function () {
    this.rootID = topLevelRootCounter++;
};

TopLevelWrapper.prototype.isReactComponent = {};

TopLevelWrapper.prototype.render = function () {
    return this.props.child;
};

TopLevelWrapper.isReactTopLevelWrapper = true;

...

_renderNewRootComponent: function (
    nextElement,
    container,
    shouldReuseMarkup,
    context
) {
    ...
    
    var componentInstance = instantiateReactComponent(nextElement, false);

    ...

    return componentInstance;
},
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 文件位置：src/renderers/dom/client/ReactMount.js</span>

_renderSubtreeIntoContainer: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">parentComponent, nextElement, container, callback</span>) </span>{
    ...
    var nextWrappedElement = React.createElement(
        TopLevelWrapper, 
        {
            <span class="hljs-attr">child</span>: nextElement
        }
    );

    ...
    
    var component = ReactMount._renderNewRootComponent(
        nextWrappedElement,
        container,
        shouldReuseMarkup,
        nextContext
    )._renderedComponent.getPublicInstance();
    
    ...
    
    return component;
},

...

var TopLevelWrapper = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.rootID = topLevelRootCounter++;
};

TopLevelWrapper.prototype.isReactComponent = {};

TopLevelWrapper.prototype.render = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.props.child;
};

TopLevelWrapper.isReactTopLevelWrapper = <span class="hljs-literal">true</span>;

...

_renderNewRootComponent: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">
    nextElement,
    container,
    shouldReuseMarkup,
    context
</span>) </span>{
    ...
    
    var componentInstance = instantiateReactComponent(nextElement, <span class="hljs-literal">false</span>);

    ...

    return componentInstance;
},
</code></pre>
<p>这里又会调用到另一个文件 instantiateReactComponent：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 文件位置：src/renders/shared/stack/reconciler/instantiateReactComponent.js

function instantiateReactComponent(node, shouldHaveDebugID) {
    var instance;

    ...

    instance = new ReactCompositeComponentWrapper(element);
    
    ...

    return instance;
}

// To avoid a cyclic dependency, we create the final class in this module
var ReactCompositeComponentWrapper = function (element) {
    this.construct(element);
};

Object.assign(
    ReactCompositeComponentWrapper.prototype,
    ReactCompositeComponent, 
    {
        _instantiateReactComponent: instantiateReactComponent,
    }
);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 文件位置：src/renders/shared/stack/reconciler/instantiateReactComponent.js</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">instantiateReactComponent</span>(<span class="hljs-params">node, shouldHaveDebugID</span>) </span>{
    <span class="hljs-keyword">var</span> instance;

    ...

    instance = <span class="hljs-keyword">new</span> ReactCompositeComponentWrapper(element);
    
    ...

    return instance;
}

<span class="hljs-comment">// To avoid a cyclic dependency, we create the final class in this module</span>
<span class="hljs-keyword">var</span> ReactCompositeComponentWrapper = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">element</span>) </span>{
    <span class="hljs-keyword">this</span>.construct(element);
};

<span class="hljs-built_in">Object</span>.assign(
    ReactCompositeComponentWrapper.prototype,
    ReactCompositeComponent, 
    {
        <span class="hljs-attr">_instantiateReactComponent</span>: instantiateReactComponent,
    }
);
</code></pre>
<p>这里又会调用到另一个文件 ReactCompositeComponent：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 文件位置：src/renders/shared/stack/reconciler/ReactCompositeComponent.js

var ReactCompositeComponent = {
    construct: function (element) {
        this._currentElement = element;
        this._rootNodeID = 0;
        this._compositeType = null;
        this._instance = null;
        this._hostParent = null;
        this._hostContainerInfo = null;

        // See ReactUpdateQueue
        this._updateBatchNumber = null;
        this._pendingElement = null;
        this._pendingStateQueue = null;
        this._pendingReplaceState = false;
        this._pendingForceUpdate = false;

        this._renderedNodeType = null;
        this._renderedComponent = null;
        this._context = null;
        this._mountOrder = 0;
        this._topLevelWrapper = null;

        // See ReactUpdates and ReactUpdateQueue.
        this._pendingCallbacks = null;

        // ComponentWillUnmount shall only be called once
        this._calledComponentWillUnmount = false;

        if (__DEV__) {
            this._warnedAboutRefsInRender = false;
        }
    }
    
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 文件位置：src/renders/shared/stack/reconciler/ReactCompositeComponent.js</span>

<span class="hljs-keyword">var</span> ReactCompositeComponent = {
    <span class="hljs-attr">construct</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">element</span>) </span>{
        <span class="hljs-keyword">this</span>._currentElement = element;
        <span class="hljs-keyword">this</span>._rootNodeID = <span class="hljs-number">0</span>;
        <span class="hljs-keyword">this</span>._compositeType = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">this</span>._instance = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">this</span>._hostParent = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">this</span>._hostContainerInfo = <span class="hljs-literal">null</span>;

        <span class="hljs-comment">// See ReactUpdateQueue</span>
        <span class="hljs-keyword">this</span>._updateBatchNumber = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">this</span>._pendingElement = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">this</span>._pendingStateQueue = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">this</span>._pendingReplaceState = <span class="hljs-literal">false</span>;
        <span class="hljs-keyword">this</span>._pendingForceUpdate = <span class="hljs-literal">false</span>;

        <span class="hljs-keyword">this</span>._renderedNodeType = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">this</span>._renderedComponent = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">this</span>._context = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">this</span>._mountOrder = <span class="hljs-number">0</span>;
        <span class="hljs-keyword">this</span>._topLevelWrapper = <span class="hljs-literal">null</span>;

        <span class="hljs-comment">// See ReactUpdates and ReactUpdateQueue.</span>
        <span class="hljs-keyword">this</span>._pendingCallbacks = <span class="hljs-literal">null</span>;

        <span class="hljs-comment">// ComponentWillUnmount shall only be called once</span>
        <span class="hljs-keyword">this</span>._calledComponentWillUnmount = <span class="hljs-literal">false</span>;

        <span class="hljs-keyword">if</span> (__DEV__) {
            <span class="hljs-keyword">this</span>._warnedAboutRefsInRender = <span class="hljs-literal">false</span>;
        }
    }
    
    ...
}</code></pre>
<p>我们用<code>ReactCompositeComponent[T]</code>来表示这里生成的顶层 component。</p>
<p>整个的调用栈是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ReactDOM.render
|=ReactMount.render(nextElement, container, callback)
|=ReactMount._renderSubtreeIntoContainer()
    |-ReactMount._renderNewRootComponent(
        nextWrappedElement, // scr:------------------> ReactElement[2]
        container,          // scr:------------------> document.getElementById('root')
        shouldReuseMarkup,  // scr: null from ReactDom.render()
        nextContext,        // scr: emptyObject from ReactDom.render()
    )
    |-instantiateReactComponent(
          node,             // scr:------------------> ReactElement[2]
          shouldHaveDebugID /* false */
        )
        |-ReactCompositeComponentWrapper(
            element         // scr:------------------> ReactElement[2]
        );
        |=ReactCompositeComponent.construct(element)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">ReactDOM.render
|=ReactMount.render(nextElement, container, callback)
|=ReactMount._renderSubtreeIntoContainer()
    |-ReactMount._renderNewRootComponent(
        nextWrappedElement, <span class="hljs-comment">// scr:------------------&gt; ReactElement[2]</span>
        container,          <span class="hljs-comment">// scr:------------------&gt; document.getElementById('root')</span>
        shouldReuseMarkup,  <span class="hljs-comment">// scr: null from ReactDom.render()</span>
        nextContext,        <span class="hljs-comment">// scr: emptyObject from ReactDom.render()</span>
    )
    |-instantiateReactComponent(
          node,             <span class="hljs-comment">// scr:------------------&gt; ReactElement[2]</span>
          shouldHaveDebugID <span class="hljs-comment">/* false */</span>
        )
        |-ReactCompositeComponentWrapper(
            element         <span class="hljs-comment">// scr:------------------&gt; ReactElement[2]</span>
        );
        |=ReactCompositeComponent.construct(element)
</code></pre>
<p>组件间的层级结构是这样的：</p>
<p><span class="img-wrap"><img data-src="/img/bVbipq2?w=678&amp;h=152" src="https://static.alili.tech/img/bVbipq2?w=678&amp;h=152" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>当顶层组件构建完毕后，下一步就是调用 batchedMountComponentIntoNode（来自 ReactMount 的 _renderNewRootComponent方法），进行页面的渲染了。这部分内容将在下一篇文章进行讲解。如果你等不及的话，可以直接看<a href="https://holmeshe.me/categories/Understanding-The-React-Source-Code/" rel="nofollow noreferrer" target="_blank">这个系列文章</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React源码解析-首次渲染（普通DOM元素）I

## 原文链接
[https://segmentfault.com/a/1190000016741764](https://segmentfault.com/a/1190000016741764)

