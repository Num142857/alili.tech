---
title: 'React16.2的fiber架构' 
date: 2018-12-15 2:30:11
hidden: true
slug: xhbpeeac4hq
categories: [reprint]
---

{{< raw >}}

                    
<p>React16真是一天一改，如果现在不看，以后也很难看懂了。</p>
<p>在React16中，虽然也是通过JSX编译得到一个虚拟DOM对象，但对这些虚拟DOM对象的再加工则是经过翻天覆地的变化。我们需要追根溯底，看它是怎么一步步转换过来的。我们先不看什么组件render，先找到ReactDOM.render。在ReactDOM的源码里，有三个类似的东西：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//by 司徒正美， 加群：370262116 一起研究React与anujs
// https://github.com/RubyLouvre/anu 欢迎加star

ReactDOM= {
 hydrate: function (element, container, callback) {
    //新API，代替render
    return renderSubtreeIntoContainer(null, element, container, true, callback);
  },
  render: function (element, container, callback) {
    //React15的重要API，逐渐退出舞台
    return renderSubtreeIntoContainer(null, element, container, false, callback);
  },
  unstable_renderSubtreeIntoContainer: function (parentComponent, element, containerNode, callback) {
    //用于生成子树，废弃
    return renderSubtreeIntoContainer(parentComponent, element, containerNode, false, callback);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//by 司徒正美， 加群：370262116 一起研究React与anujs</span>
<span class="hljs-comment">// https://github.com/RubyLouvre/anu 欢迎加star</span>

ReactDOM= {
 <span class="hljs-attr">hydrate</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">element, container, callback</span>) </span>{
    <span class="hljs-comment">//新API，代替render</span>
    <span class="hljs-keyword">return</span> renderSubtreeIntoContainer(<span class="hljs-literal">null</span>, element, container, <span class="hljs-literal">true</span>, callback);
  },
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">element, container, callback</span>) </span>{
    <span class="hljs-comment">//React15的重要API，逐渐退出舞台</span>
    <span class="hljs-keyword">return</span> renderSubtreeIntoContainer(<span class="hljs-literal">null</span>, element, container, <span class="hljs-literal">false</span>, callback);
  },
  <span class="hljs-attr">unstable_renderSubtreeIntoContainer</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">parentComponent, element, containerNode, callback</span>) </span>{
    <span class="hljs-comment">//用于生成子树，废弃</span>
    <span class="hljs-keyword">return</span> renderSubtreeIntoContainer(parentComponent, element, containerNode, <span class="hljs-literal">false</span>, callback);
  }
}</code></pre>
<p>我们看renderSubtreeIntoContainer，这是一个内部API</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//by 司徒正美， 加群：370262116 一起研究React与anujs

function renderSubtreeIntoContainer(parentComponent, children, container, forceHydrate, callback) {

  var root = container._reactRootContainer;
  if (!root) {
    //如果是第一次对这个元素进行渲染，那么它会清空元素的内部
    var shouldHydrate = forceHydrate || shouldHydrateDueToLegacyHeuristic(container);
    // First clear any existing content.
    if (!shouldHydrate) {
      var warned = false;
      var rootSibling = void 0;
      while (rootSibling = container.lastChild) {
        container.removeChild(rootSibling);
      }
    }

    var newRoot = DOMRenderer.createContainer(container, shouldHydrate);
    //创建一个HostRoot对象，是Fiber对象的一种
    root = container._reactRootContainer = newRoot;
    
    // Initial mount should not be batched.
    DOMRenderer.unbatchedUpdates(function () {
     //对newRoot对象进行更新
      DOMRenderer.updateContainer(children, newRoot, parentComponent, callback);
    });
  } else {
    //对root对象进行更新
    DOMRenderer.updateContainer(children, root, parentComponent, callback);
  }
  return DOMRenderer.getPublicRootInstance(root);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//by 司徒正美， 加群：370262116 一起研究React与anujs</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">renderSubtreeIntoContainer</span>(<span class="hljs-params">parentComponent, children, container, forceHydrate, callback</span>) </span>{

  <span class="hljs-keyword">var</span> root = container._reactRootContainer;
  <span class="hljs-keyword">if</span> (!root) {
    <span class="hljs-comment">//如果是第一次对这个元素进行渲染，那么它会清空元素的内部</span>
    <span class="hljs-keyword">var</span> shouldHydrate = forceHydrate || shouldHydrateDueToLegacyHeuristic(container);
    <span class="hljs-comment">// First clear any existing content.</span>
    <span class="hljs-keyword">if</span> (!shouldHydrate) {
      <span class="hljs-keyword">var</span> warned = <span class="hljs-literal">false</span>;
      <span class="hljs-keyword">var</span> rootSibling = <span class="hljs-keyword">void</span> <span class="hljs-number">0</span>;
      <span class="hljs-keyword">while</span> (rootSibling = container.lastChild) {
        container.removeChild(rootSibling);
      }
    }

    <span class="hljs-keyword">var</span> newRoot = DOMRenderer.createContainer(container, shouldHydrate);
    <span class="hljs-comment">//创建一个HostRoot对象，是Fiber对象的一种</span>
    root = container._reactRootContainer = newRoot;
    
    <span class="hljs-comment">// Initial mount should not be batched.</span>
    DOMRenderer.unbatchedUpdates(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
     <span class="hljs-comment">//对newRoot对象进行更新</span>
      DOMRenderer.updateContainer(children, newRoot, parentComponent, callback);
    });
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">//对root对象进行更新</span>
    DOMRenderer.updateContainer(children, root, parentComponent, callback);
  }
  <span class="hljs-keyword">return</span> DOMRenderer.getPublicRootInstance(root);
}</code></pre>
<p>看一下DOMRenderer.createContainer是怎么创建root对象的。</p>
<p>首先DOMRenderer这个对象是由一个叫reactReconciler的方法生成，需要传入一个对象，将一些东西注进去。最后产生一个对象，里面就有createContainer这个方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// containerInfo就是ReactDOM.render(<div/>, containerInfo)的第二个对象，换言之是一个元素节点
createContainer: function (containerInfo, hydrate) {
   return createFiberRoot(containerInfo, hydrate);
},
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// containerInfo就是ReactDOM.render(&lt;div/&gt;, containerInfo)的第二个对象，换言之是一个元素节点</span>
createContainer: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">containerInfo, hydrate</span>) </span>{
   <span class="hljs-keyword">return</span> createFiberRoot(containerInfo, hydrate);
},
</code></pre>
<p>再看createFiberRoot是怎么将一个真实DOM变成一个Fiber对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//by 司徒正美， 加群：370262116 一起研究React与anujs

function createFiberRoot(containerInfo, hydrate) {
  // Cyclic construction. This cheats the type system right now because
  // stateNode is any.
  var uninitializedFiber = createHostRootFiber();
  var root = {
    current: uninitializedFiber,
    containerInfo: containerInfo,
    pendingChildren: null,
    remainingExpirationTime: NoWork,
    isReadyForCommit: false,
    finishedWork: null,
    context: null,
    pendingContext: null,
    hydrate: hydrate,
    nextScheduledRoot: null
  };
  uninitializedFiber.stateNode = root;

  return root;
}

function createHostRootFiber() {
  var fiber = createFiber(HostRoot, null, NoContext);
  return fiber;
}

var createFiber = function (tag, key, internalContextTag) {
  return new FiberNode(tag, key, internalContextTag);
};


function FiberNode(tag, key, internalContextTag) {
  // Instance
  this.tag = tag;
  this.key = key;
  this.type = null;
  this.stateNode = null;

  // Fiber
  this['return'] = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;

  this.ref = null;

  this.pendingProps = null;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;

  this.internalContextTag = internalContextTag;

  // Effects
  this.effectTag = NoEffect;
  this.nextEffect = null;

  this.firstEffect = null;
  this.lastEffect = null;

  this.expirationTime = NoWork;

  this.alternate = null;


}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//by 司徒正美， 加群：370262116 一起研究React与anujs</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createFiberRoot</span>(<span class="hljs-params">containerInfo, hydrate</span>) </span>{
  <span class="hljs-comment">// Cyclic construction. This cheats the type system right now because</span>
  <span class="hljs-comment">// stateNode is any.</span>
  <span class="hljs-keyword">var</span> uninitializedFiber = createHostRootFiber();
  <span class="hljs-keyword">var</span> root = {
    <span class="hljs-attr">current</span>: uninitializedFiber,
    <span class="hljs-attr">containerInfo</span>: containerInfo,
    <span class="hljs-attr">pendingChildren</span>: <span class="hljs-literal">null</span>,
    <span class="hljs-attr">remainingExpirationTime</span>: NoWork,
    <span class="hljs-attr">isReadyForCommit</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">finishedWork</span>: <span class="hljs-literal">null</span>,
    <span class="hljs-attr">context</span>: <span class="hljs-literal">null</span>,
    <span class="hljs-attr">pendingContext</span>: <span class="hljs-literal">null</span>,
    <span class="hljs-attr">hydrate</span>: hydrate,
    <span class="hljs-attr">nextScheduledRoot</span>: <span class="hljs-literal">null</span>
  };
  uninitializedFiber.stateNode = root;

  <span class="hljs-keyword">return</span> root;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createHostRootFiber</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> fiber = createFiber(HostRoot, <span class="hljs-literal">null</span>, NoContext);
  <span class="hljs-keyword">return</span> fiber;
}

<span class="hljs-keyword">var</span> createFiber = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">tag, key, internalContextTag</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> FiberNode(tag, key, internalContextTag);
};


<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">FiberNode</span>(<span class="hljs-params">tag, key, internalContextTag</span>) </span>{
  <span class="hljs-comment">// Instance</span>
  <span class="hljs-keyword">this</span>.tag = tag;
  <span class="hljs-keyword">this</span>.key = key;
  <span class="hljs-keyword">this</span>.type = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">this</span>.stateNode = <span class="hljs-literal">null</span>;

  <span class="hljs-comment">// Fiber</span>
  <span class="hljs-keyword">this</span>[<span class="hljs-string">'return'</span>] = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">this</span>.child = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">this</span>.sibling = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">this</span>.index = <span class="hljs-number">0</span>;

  <span class="hljs-keyword">this</span>.ref = <span class="hljs-literal">null</span>;

  <span class="hljs-keyword">this</span>.pendingProps = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">this</span>.memoizedProps = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">this</span>.updateQueue = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">this</span>.memoizedState = <span class="hljs-literal">null</span>;

  <span class="hljs-keyword">this</span>.internalContextTag = internalContextTag;

  <span class="hljs-comment">// Effects</span>
  <span class="hljs-keyword">this</span>.effectTag = NoEffect;
  <span class="hljs-keyword">this</span>.nextEffect = <span class="hljs-literal">null</span>;

  <span class="hljs-keyword">this</span>.firstEffect = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">this</span>.lastEffect = <span class="hljs-literal">null</span>;

  <span class="hljs-keyword">this</span>.expirationTime = NoWork;

  <span class="hljs-keyword">this</span>.alternate = <span class="hljs-literal">null</span>;


}
</code></pre>
<p>所有Fiber对象都是FiberNode的实例，它有许多种类型，通过tag来标识。</p>
<p>内部有许多方法来生成Fiber对象</p>
<ul>
<li>createFiberFromElement (type为类，无状态函数，元素标签名)</li>
<li>createFiberFromFragment （type为React.Fragment）</li>
<li>createFiberFromText (在JSX中表现为字符串，数字)</li>
<li>createFiberFromHostInstanceForDeletion</li>
<li>createFiberFromCall</li>
<li>createFiberFromReturn</li>
<li>createFiberFromPortal （createPortal就会产生该类型）</li>
<li>createFiberRoot （用于ReactDOM.render的根节点）</li>
</ul>
<p>createFiberRoot就是创建了一个普通对象，里面有一个current属性引用fiber对象，有一个containerInfo属性引用刚才的DOM节点，然后fiber对象有一个stateNode引用刚才的普通对象。在React15中，stateNode应该是一个组件实例或真实DOM，可能单纯是为了对齐，就创建一个普通对象。 最后返回普通对象。</p>
<p>我们先不看 DOMRenderer.unbatchedUpdates，直接看DOMRenderer.updateContainer。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//children就是ReactDOM的第一个参数，children通常表示一个数组，但是现在它泛指各种虚拟DOM了，第二个对象就是刚才提到的普通对象，我们可以称它为根组件，parentComponent为之前的根组件，现在它为null
 DOMRenderer.updateContainer(children, newRoot, parentComponent, callback);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//children就是ReactDOM的第一个参数，children通常表示一个数组，但是现在它泛指各种虚拟DOM了，第二个对象就是刚才提到的普通对象，我们可以称它为根组件，parentComponent为之前的根组件，现在它为null</span>
 DOMRenderer.updateContainer(children, newRoot, parentComponent, callback);</code></pre>
<p>updateContainer的源码也很简单，就是获得上下文对象，决定它是叫context还是pendingContext，最后丢给scheduleTopLevelUpdate</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//by 司徒正美， 加群：370262116 一起研究React与anujs

 updateContainer: function (element, container, parentComponent, callback) {
      var current = container.current;//createFiberRoot中创建的fiber对象
      var context = getContextForSubtree(parentComponent);
      if (container.context === null) {
        container.context = context;
      } else {
        container.pendingContext = context;
      }
      // 原传名为 children, newRoot, parentComponent, callback
      // newRoot.fiber, children, callback
      scheduleTopLevelUpdate(current, element, callback);
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//by 司徒正美， 加群：370262116 一起研究React与anujs</span>

 updateContainer: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">element, container, parentComponent, callback</span>) </span>{
      <span class="hljs-keyword">var</span> current = container.current;<span class="hljs-comment">//createFiberRoot中创建的fiber对象</span>
      <span class="hljs-keyword">var</span> context = getContextForSubtree(parentComponent);
      <span class="hljs-keyword">if</span> (container.context === <span class="hljs-literal">null</span>) {
        container.context = context;
      } <span class="hljs-keyword">else</span> {
        container.pendingContext = context;
      }
      <span class="hljs-comment">// 原传名为 children, newRoot, parentComponent, callback</span>
      <span class="hljs-comment">// newRoot.fiber, children, callback</span>
      scheduleTopLevelUpdate(current, element, callback);
    },</code></pre>
<p>getContextForSubtree的实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//by 司徒正美， 加群：370262116 一起研究React与anujs

function getContextForSubtree(parentComponent) {
  if (!parentComponent) {
    return emptyObject_1;
  }

  var fiber = get(parentComponent);
  var parentContext = findCurrentUnmaskedContext(fiber);
  return isContextProvider(fiber) ? processChildContext(fiber, parentContext) : parentContext;
}
//isContextConsumer与isContextProvider是两个全新的概念，
// 从原上下文中抽取一部分出来
function isContextConsumer(fiber) {
  return fiber.tag === ClassComponent &amp;&amp; fiber.type.contextTypes != null;
}
//isContextProvider,产生一个新的上下文
function isContextProvider(fiber) {
  return fiber.tag === ClassComponent &amp;&amp; fiber.type.childContextTypes != null;
}

function _processChildContext(currentContext) {
    var Component = this._currentElement.type;
    var inst = this._instance;
    var childContext;
    if (inst.getChildContext) {
       childContext = inst.getChildContext();
    }
    
    if (childContext) {
        return _assign({}, currentContext, childContext);
    }
    return currentContext;
}

function findCurrentUnmaskedContext(fiber) {
 
  var node = fiber;
  while (node.tag !== HostRoot) {
    if (isContextProvider(node)) {
      return node.stateNode.__reactInternalMemoizedMergedChildContext;
    }
    var parent = node['return'];
    node = parent;
  }
  return node.stateNode.context;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//by 司徒正美， 加群：370262116 一起研究React与anujs</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getContextForSubtree</span>(<span class="hljs-params">parentComponent</span>) </span>{
  <span class="hljs-keyword">if</span> (!parentComponent) {
    <span class="hljs-keyword">return</span> emptyObject_1;
  }

  <span class="hljs-keyword">var</span> fiber = get(parentComponent);
  <span class="hljs-keyword">var</span> parentContext = findCurrentUnmaskedContext(fiber);
  <span class="hljs-keyword">return</span> isContextProvider(fiber) ? processChildContext(fiber, parentContext) : parentContext;
}
<span class="hljs-comment">//isContextConsumer与isContextProvider是两个全新的概念，</span>
<span class="hljs-comment">// 从原上下文中抽取一部分出来</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isContextConsumer</span>(<span class="hljs-params">fiber</span>) </span>{
  <span class="hljs-keyword">return</span> fiber.tag === ClassComponent &amp;&amp; fiber.type.contextTypes != <span class="hljs-literal">null</span>;
}
<span class="hljs-comment">//isContextProvider,产生一个新的上下文</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isContextProvider</span>(<span class="hljs-params">fiber</span>) </span>{
  <span class="hljs-keyword">return</span> fiber.tag === ClassComponent &amp;&amp; fiber.type.childContextTypes != <span class="hljs-literal">null</span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_processChildContext</span>(<span class="hljs-params">currentContext</span>) </span>{
    <span class="hljs-keyword">var</span> Component = <span class="hljs-keyword">this</span>._currentElement.type;
    <span class="hljs-keyword">var</span> inst = <span class="hljs-keyword">this</span>._instance;
    <span class="hljs-keyword">var</span> childContext;
    <span class="hljs-keyword">if</span> (inst.getChildContext) {
       childContext = inst.getChildContext();
    }
    
    <span class="hljs-keyword">if</span> (childContext) {
        <span class="hljs-keyword">return</span> _assign({}, currentContext, childContext);
    }
    <span class="hljs-keyword">return</span> currentContext;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">findCurrentUnmaskedContext</span>(<span class="hljs-params">fiber</span>) </span>{
 
  <span class="hljs-keyword">var</span> node = fiber;
  <span class="hljs-keyword">while</span> (node.tag !== HostRoot) {
    <span class="hljs-keyword">if</span> (isContextProvider(node)) {
      <span class="hljs-keyword">return</span> node.stateNode.__reactInternalMemoizedMergedChildContext;
    }
    <span class="hljs-keyword">var</span> parent = node[<span class="hljs-string">'return'</span>];
    node = parent;
  }
  <span class="hljs-keyword">return</span> node.stateNode.context;
}</code></pre>
<p>因为我们的parentComponent一开始不存在，于是返回一个空对象。注意，这个空对象是重复使用的，不是每次返回一个新的空对象，这是一个很好的优化。</p>
<p>scheduleTopLevelUpdate是将用户的传参封装成一个update对象, update对象有partialState对象，它就是相当于React15中 的setState的第一个state传参。但现在partialState中竟然把children放进去了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//by 司徒正美， 加群：370262116 一起研究React与anujs

function scheduleTopLevelUpdate(current, element, callback) {
    // // newRoot.fiber, children, callback

    callback = callback === undefined ? null : callback;
    var expirationTime = void 0;
    // Check if the top-level element is an async wrapper component. If so,
    // treat updates to the root as async. This is a bit weird but lets us
    // avoid a separate `renderAsync` API.
    if (enableAsyncSubtreeAPI &amp;&amp; element != null &amp;&amp; element.type != null &amp;&amp; element.type.prototype != null &amp;&amp; element.type.prototype.unstable_isAsyncReactComponent === true) {
      expirationTime = computeAsyncExpiration();
    } else {
      expirationTime = computeExpirationForFiber(current);//计算过时时间
    }

    var update = {
      expirationTime: expirationTime,//过时时间
      partialState: { element: element },//!!!!神奇
      callback: callback,
      isReplace: false,
      isForced: false,
      nextCallback: null,
      next: null
    };
    insertUpdateIntoFiber(current, update);//创建一个列队
    scheduleWork(current, expirationTime);//执行列队
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//by 司徒正美， 加群：370262116 一起研究React与anujs</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">scheduleTopLevelUpdate</span>(<span class="hljs-params">current, element, callback</span>) </span>{
    <span class="hljs-comment">// // newRoot.fiber, children, callback</span>

    callback = callback === <span class="hljs-literal">undefined</span> ? <span class="hljs-literal">null</span> : callback;
    <span class="hljs-keyword">var</span> expirationTime = <span class="hljs-keyword">void</span> <span class="hljs-number">0</span>;
    <span class="hljs-comment">// Check if the top-level element is an async wrapper component. If so,</span>
    <span class="hljs-comment">// treat updates to the root as async. This is a bit weird but lets us</span>
    <span class="hljs-comment">// avoid a separate `renderAsync` API.</span>
    <span class="hljs-keyword">if</span> (enableAsyncSubtreeAPI &amp;&amp; element != <span class="hljs-literal">null</span> &amp;&amp; element.type != <span class="hljs-literal">null</span> &amp;&amp; element.type.prototype != <span class="hljs-literal">null</span> &amp;&amp; element.type.prototype.unstable_isAsyncReactComponent === <span class="hljs-literal">true</span>) {
      expirationTime = computeAsyncExpiration();
    } <span class="hljs-keyword">else</span> {
      expirationTime = computeExpirationForFiber(current);<span class="hljs-comment">//计算过时时间</span>
    }

    <span class="hljs-keyword">var</span> update = {
      <span class="hljs-attr">expirationTime</span>: expirationTime,<span class="hljs-comment">//过时时间</span>
      partialState: { <span class="hljs-attr">element</span>: element },<span class="hljs-comment">//!!!!神奇</span>
      callback: callback,
      <span class="hljs-attr">isReplace</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">isForced</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">nextCallback</span>: <span class="hljs-literal">null</span>,
      <span class="hljs-attr">next</span>: <span class="hljs-literal">null</span>
    };
    insertUpdateIntoFiber(current, update);<span class="hljs-comment">//创建一个列队</span>
    scheduleWork(current, expirationTime);<span class="hljs-comment">//执行列队</span>
  }</code></pre>
<p>列队是一个链表</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//by 司徒正美， 加群：370262116 一起研究React与anujs
// https://github.com/RubyLouvre/anu 欢迎加star

function insertUpdateIntoFiber(fiber, update) {
  // We'll have at least one and at most two distinct update queues.
  var alternateFiber = fiber.alternate;
  var queue1 = fiber.updateQueue;
  if (queue1 === null) {
    // TODO: We don't know what the base state will be until we begin work.
    // It depends on which fiber is the next current. Initialize with an empty
    // base state, then set to the memoizedState when rendering. Not super
    // happy with this approach.
    queue1 = fiber.updateQueue = createUpdateQueue(null);
  }

  var queue2 = void 0;
  if (alternateFiber !== null) {
    queue2 = alternateFiber.updateQueue;
    if (queue2 === null) {
      queue2 = alternateFiber.updateQueue = createUpdateQueue(null);
    }
  } else {
    queue2 = null;
  }
  queue2 = queue2 !== queue1 ? queue2 : null;

  // If there's only one queue, add the update to that queue and exit.
  if (queue2 === null) {
    insertUpdateIntoQueue(queue1, update);
    return;
  }

  // If either queue is empty, we need to add to both queues.
  if (queue1.last === null || queue2.last === null) {
    insertUpdateIntoQueue(queue1, update);
    insertUpdateIntoQueue(queue2, update);
    return;
  }

  // If both lists are not empty, the last update is the same for both lists
  // because of structural sharing. So, we should only append to one of
  // the lists.
  insertUpdateIntoQueue(queue1, update);
  // But we still need to update the `last` pointer of queue2.
  queue2.last = update;
}

function insertUpdateIntoQueue(queue, update) {
  // Append the update to the end of the list.
  if (queue.last === null) {
    // Queue is empty
    queue.first = queue.last = update;
  } else {
    queue.last.next = update;
    queue.last = update;
  }
  if (queue.expirationTime === NoWork || queue.expirationTime > update.expirationTime) {
    queue.expirationTime = update.expirationTime;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-comment">//by 司徒正美， 加群：370262116 一起研究React与anujs</span>
<span class="hljs-comment">// https://github.com/RubyLouvre/anu 欢迎加star</span>

function insertUpdateIntoFiber(fiber, update) {
  <span class="hljs-comment">// We'll have at least one and at most two distinct update queues.</span>
  <span class="hljs-built_in">var</span> alternateFiber = fiber.alternate;
  <span class="hljs-built_in">var</span> queue1 = fiber.updateQueue;
  <span class="hljs-keyword">if</span> (queue1 === <span class="hljs-built_in">null</span>) {
    <span class="hljs-comment">// <span class="hljs-doctag">TODO:</span> We don't know what the base state will be until we begin work.</span>
    <span class="hljs-comment">// It depends on which fiber is the next current. Initialize with an empty</span>
    <span class="hljs-comment">// base state, then set to the memoizedState when rendering. Not super</span>
    <span class="hljs-comment">// happy with this approach.</span>
    queue1 = fiber.updateQueue = createUpdateQueue(<span class="hljs-built_in">null</span>);
  }

  <span class="hljs-built_in">var</span> queue2 = <span class="hljs-literal">void</span> <span class="hljs-number">0</span>;
  <span class="hljs-keyword">if</span> (alternateFiber !== <span class="hljs-built_in">null</span>) {
    queue2 = alternateFiber.updateQueue;
    <span class="hljs-keyword">if</span> (queue2 === <span class="hljs-built_in">null</span>) {
      queue2 = alternateFiber.updateQueue = createUpdateQueue(<span class="hljs-built_in">null</span>);
    }
  } <span class="hljs-keyword">else</span> {
    queue2 = <span class="hljs-built_in">null</span>;
  }
  queue2 = queue2 !== queue1 ? queue2 : <span class="hljs-built_in">null</span>;

  <span class="hljs-comment">// If there's only one queue, add the update to that queue and exit.</span>
  <span class="hljs-keyword">if</span> (queue2 === <span class="hljs-built_in">null</span>) {
    insertUpdateIntoQueue(queue1, update);
    <span class="hljs-keyword">return</span>;
  }

  <span class="hljs-comment">// If either queue is empty, we need to add to both queues.</span>
  <span class="hljs-keyword">if</span> (queue1.last === <span class="hljs-built_in">null</span> || queue2.last === <span class="hljs-built_in">null</span>) {
    insertUpdateIntoQueue(queue1, update);
    insertUpdateIntoQueue(queue2, update);
    <span class="hljs-keyword">return</span>;
  }

  <span class="hljs-comment">// If both lists are not empty, the last update is the same for both lists</span>
  <span class="hljs-comment">// because of structural sharing. So, we should only append to one of</span>
  <span class="hljs-comment">// the lists.</span>
  insertUpdateIntoQueue(queue1, update);
  <span class="hljs-comment">// But we still need to update the `last` pointer of queue2.</span>
  queue2.last = update;
}

function insertUpdateIntoQueue(<span class="hljs-built_in">queue</span>, update) {
  <span class="hljs-comment">// Append the update to the end of the list.</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">queue</span>.last === <span class="hljs-built_in">null</span>) {
    <span class="hljs-comment">// Queue is empty</span>
    <span class="hljs-built_in">queue</span>.first = <span class="hljs-built_in">queue</span>.last = update;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-built_in">queue</span>.last.next = update;
    <span class="hljs-built_in">queue</span>.last = update;
  }
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">queue</span>.expirationTime === NoWork || <span class="hljs-built_in">queue</span>.expirationTime &gt; update.expirationTime) {
    <span class="hljs-built_in">queue</span>.expirationTime = update.expirationTime;
  }
}</code></pre>
<p>scheduleWork是执行虚拟DOM（fiber树）的更新。 scheduleWork，requestWork, performWork是三部曲。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//by 司徒正美， 加群：370262116 一起研究React与anujs

function scheduleWork(fiber, expirationTime) {
    return scheduleWorkImpl(fiber, expirationTime, false);
  }

  function checkRootNeedsClearing(root, fiber, expirationTime) {
    if (!isWorking &amp;&amp; root === nextRoot &amp;&amp; expirationTime < nextRenderExpirationTime) {
      // Restart the root from the top.
      if (nextUnitOfWork !== null) {
        // This is an interruption. (Used for performance tracking.)
        interruptedBy = fiber;
      }
      nextRoot = null;
      nextUnitOfWork = null;
      nextRenderExpirationTime = NoWork;
    }
  }

  function scheduleWorkImpl(fiber, expirationTime, isErrorRecovery) {
    recordScheduleUpdate();


    var node = fiber;
    while (node !== null) {
      // Walk the parent path to the root and update each node's
      // expiration time.
      if (node.expirationTime === NoWork || node.expirationTime > expirationTime) {
        node.expirationTime = expirationTime;
      }
      if (node.alternate !== null) {
        if (node.alternate.expirationTime === NoWork || node.alternate.expirationTime > expirationTime) {
          node.alternate.expirationTime = expirationTime;
        }
      }
      if (node['return'] === null) {
        if (node.tag === HostRoot) {
          var root = node.stateNode;

          checkRootNeedsClearing(root, fiber, expirationTime);
          requestWork(root, expirationTime);
          checkRootNeedsClearing(root, fiber, expirationTime);
        } else {

          return;
        }
      }
      node = node['return'];
    }
  }


function requestWork(root, expirationTime) {
    if (nestedUpdateCount > NESTED_UPDATE_LIMIT) {
      invariant_1(false, 'Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.');
    }

    // Add the root to the schedule.
    // Check if this root is already part of the schedule.
    if (root.nextScheduledRoot === null) {
      // This root is not already scheduled. Add it.
      root.remainingExpirationTime = expirationTime;
      if (lastScheduledRoot === null) {
        firstScheduledRoot = lastScheduledRoot = root;
        root.nextScheduledRoot = root;
      } else {
        lastScheduledRoot.nextScheduledRoot = root;
        lastScheduledRoot = root;
        lastScheduledRoot.nextScheduledRoot = firstScheduledRoot;
      }
    } else {
      // This root is already scheduled, but its priority may have increased.
      var remainingExpirationTime = root.remainingExpirationTime;
      if (remainingExpirationTime === NoWork || expirationTime < remainingExpirationTime) {
        // Update the priority.
        root.remainingExpirationTime = expirationTime;
      }
    }

    if (isRendering) {
      // Prevent reentrancy. Remaining work will be scheduled at the end of
      // the currently rendering batch.
      return;
    }

    if (isBatchingUpdates) {
      // Flush work at the end of the batch.
      if (isUnbatchingUpdates) {
        // unless we're inside unbatchedUpdates, in which case we should
        // flush it now.
        nextFlushedRoot = root;
        nextFlushedExpirationTime = Sync;
        performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime);
      }
      return;
    }

    // TODO: Get rid of Sync and use current time?
    if (expirationTime === Sync) {
      performWork(Sync, null);
    } else {
      scheduleCallbackWithExpiration(expirationTime);
    }
  }

 function performWork(minExpirationTime, dl) {
    deadline = dl;

    // Keep working on roots until there's no more work, or until the we reach
    // the deadline.
    findHighestPriorityRoot();

    if (enableUserTimingAPI &amp;&amp; deadline !== null) {
      var didExpire = nextFlushedExpirationTime < recalculateCurrentTime();
      stopRequestCallbackTimer(didExpire);
    }

    while (nextFlushedRoot !== null &amp;&amp; nextFlushedExpirationTime !== NoWork &amp;&amp; (minExpirationTime === NoWork || nextFlushedExpirationTime <= minExpirationTime) &amp;&amp; !deadlineDidExpire) {
      performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime);
      // Find the next highest priority work.
      findHighestPriorityRoot();
    }

    // We're done flushing work. Either we ran out of time in this callback,
    // or there's no more work left with sufficient priority.

    // If we're inside a callback, set this to false since we just completed it.
    if (deadline !== null) {
      callbackExpirationTime = NoWork;
      callbackID = -1;
    }
    // If there's work left over, schedule a new callback.
    if (nextFlushedExpirationTime !== NoWork) {
      scheduleCallbackWithExpiration(nextFlushedExpirationTime);
    }

    // Clean-up.
    deadline = null;
    deadlineDidExpire = false;
    nestedUpdateCount = 0;

    if (hasUnhandledError) {
      var _error4 = unhandledError;
      unhandledError = null;
      hasUnhandledError = false;
      throw _error4;
    }
  }

function performWorkOnRoot(root, expirationTime) {
    !!isRendering ? invariant_1(false, 'performWorkOnRoot was called recursively. This error is likely caused by a bug in React. Please file an issue.') : void 0;

    isRendering = true;

    // Check if this is async work or sync/expired work.
    // TODO: Pass current time as argument to renderRoot, commitRoot
    if (expirationTime <= recalculateCurrentTime()) {
      // Flush sync work.
      var finishedWork = root.finishedWork;
      if (finishedWork !== null) {
        // This root is already complete. We can commit it.
        root.finishedWork = null;
        root.remainingExpirationTime = commitRoot(finishedWork);
      } else {
        root.finishedWork = null;
        finishedWork = renderRoot(root, expirationTime);
        if (finishedWork !== null) {
          // We've completed the root. Commit it.
          root.remainingExpirationTime = commitRoot(finishedWork);
        }
      }
    } else {
      // Flush async work.
      var _finishedWork = root.finishedWork;
      if (_finishedWork !== null) {
        // This root is already complete. We can commit it.
        root.finishedWork = null;
        root.remainingExpirationTime = commitRoot(_finishedWork);
      } else {
        root.finishedWork = null;
        _finishedWork = renderRoot(root, expirationTime);
        if (_finishedWork !== null) {
          // We've completed the root. Check the deadline one more time
          // before committing.
          if (!shouldYield()) {
            // Still time left. Commit the root.
            root.remainingExpirationTime = commitRoot(_finishedWork);
          } else {
            // There's no time left. Mark this root as complete. We'll come
            // back and commit it later.
            root.finishedWork = _finishedWork;
          }
        }
      }
    }

   isRendering = false;
}
//用于调整渲染顺序，高优先级的组件先执行
function findHighestPriorityRoot() {
    var highestPriorityWork = NoWork;
    var highestPriorityRoot = null;

    if (lastScheduledRoot !== null) {
      var previousScheduledRoot = lastScheduledRoot;
      var root = firstScheduledRoot;
      while (root !== null) {
        var remainingExpirationTime = root.remainingExpirationTime;
        if (remainingExpirationTime === NoWork) {
          // This root no longer has work. Remove it from the scheduler.

          // TODO: This check is redudant, but Flow is confused by the branch
          // below where we set lastScheduledRoot to null, even though we break
          // from the loop right after.
          !(previousScheduledRoot !== null &amp;&amp; lastScheduledRoot !== null) ? invariant_1(false, 'Should have a previous and last root. This error is likely caused by a bug in React. Please file an issue.') : void 0;
          if (root === root.nextScheduledRoot) {
            // This is the only root in the list.
            root.nextScheduledRoot = null;
            firstScheduledRoot = lastScheduledRoot = null;
            break;
          } else if (root === firstScheduledRoot) {
            // This is the first root in the list.
            var next = root.nextScheduledRoot;
            firstScheduledRoot = next;
            lastScheduledRoot.nextScheduledRoot = next;
            root.nextScheduledRoot = null;
          } else if (root === lastScheduledRoot) {
            // This is the last root in the list.
            lastScheduledRoot = previousScheduledRoot;
            lastScheduledRoot.nextScheduledRoot = firstScheduledRoot;
            root.nextScheduledRoot = null;
            break;
          } else {
            previousScheduledRoot.nextScheduledRoot = root.nextScheduledRoot;
            root.nextScheduledRoot = null;
          }
          root = previousScheduledRoot.nextScheduledRoot;
        } else {
          if (highestPriorityWork === NoWork || remainingExpirationTime < highestPriorityWork) {
            // Update the priority, if it's higher
            highestPriorityWork = remainingExpirationTime;
            highestPriorityRoot = root;
          }
          if (root === lastScheduledRoot) {
            break;
          }
          previousScheduledRoot = root;
          root = root.nextScheduledRoot;
        }
      }
    }

    // If the next root is the same as the previous root, this is a nested
    // update. To prevent an infinite loop, increment the nested update count.
    var previousFlushedRoot = nextFlushedRoot;
    if (previousFlushedRoot !== null &amp;&amp; previousFlushedRoot === highestPriorityRoot) {
      nestedUpdateCount++;
    } else {
      // Reset whenever we switch roots.
      nestedUpdateCount = 0;
    }
    nextFlushedRoot = highestPriorityRoot;
    nextFlushedExpirationTime = highestPriorityWork;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code class="javasript"><span class="hljs-comment">//by 司徒正美， 加群：370262116 一起研究React与anujs</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">scheduleWork</span><span class="hljs-params">(fiber, expirationTime)</span> </span>{
    <span class="hljs-keyword">return</span> scheduleWorkImpl(fiber, expirationTime, <span class="hljs-literal">false</span>);
  }

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkRootNeedsClearing</span><span class="hljs-params">(root, fiber, expirationTime)</span> </span>{
    <span class="hljs-keyword">if</span> (!isWorking &amp;&amp; root === nextRoot &amp;&amp; expirationTime &lt; nextRenderExpirationTime) {
      <span class="hljs-comment">// Restart the root from the top.</span>
      <span class="hljs-keyword">if</span> (nextUnitOfWork !== <span class="hljs-literal">null</span>) {
        <span class="hljs-comment">// This is an interruption. (Used for performance tracking.)</span>
        interruptedBy = fiber;
      }
      nextRoot = <span class="hljs-literal">null</span>;
      nextUnitOfWork = <span class="hljs-literal">null</span>;
      nextRenderExpirationTime = NoWork;
    }
  }

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">scheduleWorkImpl</span><span class="hljs-params">(fiber, expirationTime, isErrorRecovery)</span> </span>{
    recordScheduleUpdate();


    <span class="hljs-keyword">var</span> node = fiber;
    <span class="hljs-keyword">while</span> (node !== <span class="hljs-literal">null</span>) {
      <span class="hljs-comment">// Walk the parent path to the root and update each node's</span>
      <span class="hljs-comment">// expiration time.</span>
      <span class="hljs-keyword">if</span> (node.expirationTime === NoWork || node.expirationTime &gt; expirationTime) {
        node.expirationTime = expirationTime;
      }
      <span class="hljs-keyword">if</span> (node.alternate !== <span class="hljs-literal">null</span>) {
        <span class="hljs-keyword">if</span> (node.alternate.expirationTime === NoWork || node.alternate.expirationTime &gt; expirationTime) {
          node.alternate.expirationTime = expirationTime;
        }
      }
      <span class="hljs-keyword">if</span> (node[<span class="hljs-string">'return'</span>] === <span class="hljs-literal">null</span>) {
        <span class="hljs-keyword">if</span> (node.tag === HostRoot) {
          <span class="hljs-keyword">var</span> root = node.stateNode;

          checkRootNeedsClearing(root, fiber, expirationTime);
          requestWork(root, expirationTime);
          checkRootNeedsClearing(root, fiber, expirationTime);
        } <span class="hljs-keyword">else</span> {

          <span class="hljs-keyword">return</span>;
        }
      }
      node = node[<span class="hljs-string">'return'</span>];
    }
  }


<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">requestWork</span><span class="hljs-params">(root, expirationTime)</span> </span>{
    <span class="hljs-keyword">if</span> (nestedUpdateCount &gt; NESTED_UPDATE_LIMIT) {
      invariant_1(<span class="hljs-literal">false</span>, <span class="hljs-string">'Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.'</span>);
    }

    <span class="hljs-comment">// Add the root to the schedule.</span>
    <span class="hljs-comment">// Check if this root is already part of the schedule.</span>
    <span class="hljs-keyword">if</span> (root.nextScheduledRoot === <span class="hljs-literal">null</span>) {
      <span class="hljs-comment">// This root is not already scheduled. Add it.</span>
      root.remainingExpirationTime = expirationTime;
      <span class="hljs-keyword">if</span> (lastScheduledRoot === <span class="hljs-literal">null</span>) {
        firstScheduledRoot = lastScheduledRoot = root;
        root.nextScheduledRoot = root;
      } <span class="hljs-keyword">else</span> {
        lastScheduledRoot.nextScheduledRoot = root;
        lastScheduledRoot = root;
        lastScheduledRoot.nextScheduledRoot = firstScheduledRoot;
      }
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// This root is already scheduled, but its priority may have increased.</span>
      <span class="hljs-keyword">var</span> remainingExpirationTime = root.remainingExpirationTime;
      <span class="hljs-keyword">if</span> (remainingExpirationTime === NoWork || expirationTime &lt; remainingExpirationTime) {
        <span class="hljs-comment">// Update the priority.</span>
        root.remainingExpirationTime = expirationTime;
      }
    }

    <span class="hljs-keyword">if</span> (isRendering) {
      <span class="hljs-comment">// Prevent reentrancy. Remaining work will be scheduled at the end of</span>
      <span class="hljs-comment">// the currently rendering batch.</span>
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-keyword">if</span> (isBatchingUpdates) {
      <span class="hljs-comment">// Flush work at the end of the batch.</span>
      <span class="hljs-keyword">if</span> (isUnbatchingUpdates) {
        <span class="hljs-comment">// unless we're inside unbatchedUpdates, in which case we should</span>
        <span class="hljs-comment">// flush it now.</span>
        nextFlushedRoot = root;
        nextFlushedExpirationTime = Sync;
        performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime);
      }
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-comment">// <span class="hljs-doctag">TODO:</span> Get rid of Sync and use current time?</span>
    <span class="hljs-keyword">if</span> (expirationTime === Sync) {
      performWork(Sync, <span class="hljs-literal">null</span>);
    } <span class="hljs-keyword">else</span> {
      scheduleCallbackWithExpiration(expirationTime);
    }
  }

 <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">performWork</span><span class="hljs-params">(minExpirationTime, dl)</span> </span>{
    deadline = dl;

    <span class="hljs-comment">// Keep working on roots until there's no more work, or until the we reach</span>
    <span class="hljs-comment">// the deadline.</span>
    findHighestPriorityRoot();

    <span class="hljs-keyword">if</span> (enableUserTimingAPI &amp;&amp; deadline !== <span class="hljs-literal">null</span>) {
      <span class="hljs-keyword">var</span> didExpire = nextFlushedExpirationTime &lt; recalculateCurrentTime();
      stopRequestCallbackTimer(didExpire);
    }

    <span class="hljs-keyword">while</span> (nextFlushedRoot !== <span class="hljs-literal">null</span> &amp;&amp; nextFlushedExpirationTime !== NoWork &amp;&amp; (minExpirationTime === NoWork || nextFlushedExpirationTime &lt;= minExpirationTime) &amp;&amp; !deadlineDidExpire) {
      performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime);
      <span class="hljs-comment">// Find the next highest priority work.</span>
      findHighestPriorityRoot();
    }

    <span class="hljs-comment">// We're done flushing work. Either we ran out of time in this callback,</span>
    <span class="hljs-comment">// or there's no more work left with sufficient priority.</span>

    <span class="hljs-comment">// If we're inside a callback, set this to false since we just completed it.</span>
    <span class="hljs-keyword">if</span> (deadline !== <span class="hljs-literal">null</span>) {
      callbackExpirationTime = NoWork;
      callbackID = <span class="hljs-number">-1</span>;
    }
    <span class="hljs-comment">// If there's work left over, schedule a new callback.</span>
    <span class="hljs-keyword">if</span> (nextFlushedExpirationTime !== NoWork) {
      scheduleCallbackWithExpiration(nextFlushedExpirationTime);
    }

    <span class="hljs-comment">// Clean-up.</span>
    deadline = <span class="hljs-literal">null</span>;
    deadlineDidExpire = <span class="hljs-literal">false</span>;
    nestedUpdateCount = <span class="hljs-number">0</span>;

    <span class="hljs-keyword">if</span> (hasUnhandledError) {
      <span class="hljs-keyword">var</span> _error4 = unhandledError;
      unhandledError = <span class="hljs-literal">null</span>;
      hasUnhandledError = <span class="hljs-literal">false</span>;
      <span class="hljs-keyword">throw</span> _error4;
    }
  }

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">performWorkOnRoot</span><span class="hljs-params">(root, expirationTime)</span> </span>{
    !!isRendering ? invariant_1(<span class="hljs-literal">false</span>, <span class="hljs-string">'performWorkOnRoot was called recursively. This error is likely caused by a bug in React. Please file an issue.'</span>) : <span class="hljs-keyword">void</span> <span class="hljs-number">0</span>;

    isRendering = <span class="hljs-literal">true</span>;

    <span class="hljs-comment">// Check if this is async work or sync/expired work.</span>
    <span class="hljs-comment">// <span class="hljs-doctag">TODO:</span> Pass current time as argument to renderRoot, commitRoot</span>
    <span class="hljs-keyword">if</span> (expirationTime &lt;= recalculateCurrentTime()) {
      <span class="hljs-comment">// Flush sync work.</span>
      <span class="hljs-keyword">var</span> finishedWork = root.finishedWork;
      <span class="hljs-keyword">if</span> (finishedWork !== <span class="hljs-literal">null</span>) {
        <span class="hljs-comment">// This root is already complete. We can commit it.</span>
        root.finishedWork = <span class="hljs-literal">null</span>;
        root.remainingExpirationTime = commitRoot(finishedWork);
      } <span class="hljs-keyword">else</span> {
        root.finishedWork = <span class="hljs-literal">null</span>;
        finishedWork = renderRoot(root, expirationTime);
        <span class="hljs-keyword">if</span> (finishedWork !== <span class="hljs-literal">null</span>) {
          <span class="hljs-comment">// We've completed the root. Commit it.</span>
          root.remainingExpirationTime = commitRoot(finishedWork);
        }
      }
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// Flush async work.</span>
      <span class="hljs-keyword">var</span> _finishedWork = root.finishedWork;
      <span class="hljs-keyword">if</span> (_finishedWork !== <span class="hljs-literal">null</span>) {
        <span class="hljs-comment">// This root is already complete. We can commit it.</span>
        root.finishedWork = <span class="hljs-literal">null</span>;
        root.remainingExpirationTime = commitRoot(_finishedWork);
      } <span class="hljs-keyword">else</span> {
        root.finishedWork = <span class="hljs-literal">null</span>;
        _finishedWork = renderRoot(root, expirationTime);
        <span class="hljs-keyword">if</span> (_finishedWork !== <span class="hljs-literal">null</span>) {
          <span class="hljs-comment">// We've completed the root. Check the deadline one more time</span>
          <span class="hljs-comment">// before committing.</span>
          <span class="hljs-keyword">if</span> (!shouldYield()) {
            <span class="hljs-comment">// Still time left. Commit the root.</span>
            root.remainingExpirationTime = commitRoot(_finishedWork);
          } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// There's no time left. Mark this root as complete. We'll come</span>
            <span class="hljs-comment">// back and commit it later.</span>
            root.finishedWork = _finishedWork;
          }
        }
      }
    }

   isRendering = <span class="hljs-literal">false</span>;
}
<span class="hljs-comment">//用于调整渲染顺序，高优先级的组件先执行</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">findHighestPriorityRoot</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">var</span> highestPriorityWork = NoWork;
    <span class="hljs-keyword">var</span> highestPriorityRoot = <span class="hljs-literal">null</span>;

    <span class="hljs-keyword">if</span> (lastScheduledRoot !== <span class="hljs-literal">null</span>) {
      <span class="hljs-keyword">var</span> previousScheduledRoot = lastScheduledRoot;
      <span class="hljs-keyword">var</span> root = firstScheduledRoot;
      <span class="hljs-keyword">while</span> (root !== <span class="hljs-literal">null</span>) {
        <span class="hljs-keyword">var</span> remainingExpirationTime = root.remainingExpirationTime;
        <span class="hljs-keyword">if</span> (remainingExpirationTime === NoWork) {
          <span class="hljs-comment">// This root no longer has work. Remove it from the scheduler.</span>

          <span class="hljs-comment">// <span class="hljs-doctag">TODO:</span> This check is redudant, but Flow is confused by the branch</span>
          <span class="hljs-comment">// below where we set lastScheduledRoot to null, even though we break</span>
          <span class="hljs-comment">// from the loop right after.</span>
          !(previousScheduledRoot !== <span class="hljs-literal">null</span> &amp;&amp; lastScheduledRoot !== <span class="hljs-literal">null</span>) ? invariant_1(<span class="hljs-literal">false</span>, <span class="hljs-string">'Should have a previous and last root. This error is likely caused by a bug in React. Please file an issue.'</span>) : <span class="hljs-keyword">void</span> <span class="hljs-number">0</span>;
          <span class="hljs-keyword">if</span> (root === root.nextScheduledRoot) {
            <span class="hljs-comment">// This is the only root in the list.</span>
            root.nextScheduledRoot = <span class="hljs-literal">null</span>;
            firstScheduledRoot = lastScheduledRoot = <span class="hljs-literal">null</span>;
            <span class="hljs-keyword">break</span>;
          } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (root === firstScheduledRoot) {
            <span class="hljs-comment">// This is the first root in the list.</span>
            <span class="hljs-keyword">var</span> next = root.nextScheduledRoot;
            firstScheduledRoot = next;
            lastScheduledRoot.nextScheduledRoot = next;
            root.nextScheduledRoot = <span class="hljs-literal">null</span>;
          } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (root === lastScheduledRoot) {
            <span class="hljs-comment">// This is the last root in the list.</span>
            lastScheduledRoot = previousScheduledRoot;
            lastScheduledRoot.nextScheduledRoot = firstScheduledRoot;
            root.nextScheduledRoot = <span class="hljs-literal">null</span>;
            <span class="hljs-keyword">break</span>;
          } <span class="hljs-keyword">else</span> {
            previousScheduledRoot.nextScheduledRoot = root.nextScheduledRoot;
            root.nextScheduledRoot = <span class="hljs-literal">null</span>;
          }
          root = previousScheduledRoot.nextScheduledRoot;
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">if</span> (highestPriorityWork === NoWork || remainingExpirationTime &lt; highestPriorityWork) {
            <span class="hljs-comment">// Update the priority, if it's higher</span>
            highestPriorityWork = remainingExpirationTime;
            highestPriorityRoot = root;
          }
          <span class="hljs-keyword">if</span> (root === lastScheduledRoot) {
            <span class="hljs-keyword">break</span>;
          }
          previousScheduledRoot = root;
          root = root.nextScheduledRoot;
        }
      }
    }

    <span class="hljs-comment">// If the next root is the same as the previous root, this is a nested</span>
    <span class="hljs-comment">// update. To prevent an infinite loop, increment the nested update count.</span>
    <span class="hljs-keyword">var</span> previousFlushedRoot = nextFlushedRoot;
    <span class="hljs-keyword">if</span> (previousFlushedRoot !== <span class="hljs-literal">null</span> &amp;&amp; previousFlushedRoot === highestPriorityRoot) {
      nestedUpdateCount++;
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// Reset whenever we switch roots.</span>
      nestedUpdateCount = <span class="hljs-number">0</span>;
    }
    nextFlushedRoot = highestPriorityRoot;
    nextFlushedExpirationTime = highestPriorityWork;
  }</code></pre>
<p>这只是一部分更新逻辑， 简直没完没了，下次继续,添上流程图，回忆一下本文学到的东西</p>
<p><span class="img-wrap"><img data-src="/img/bV3bdq?w=736&amp;h=746" src="https://static.alili.tech/img/bV3bdq?w=736&amp;h=746" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React16.2的fiber架构

## 原文链接
[https://segmentfault.com/a/1190000013109071](https://segmentfault.com/a/1190000013109071)

