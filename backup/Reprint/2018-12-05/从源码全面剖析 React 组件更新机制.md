---
title: '从源码全面剖析 React 组件更新机制' 
date: 2018-12-05 2:30:09
hidden: true
slug: 9b854awzdxv
categories: [reprint]
---

{{< raw >}}

                    
<p>React 把组件看作状态机(有限状态机), 使用state来控制本地状态, 使用props来传递状态.  前面我们探讨了 React 如何映射状态到 UI 上(初始渲染), 那么接下来我们谈谈 React 时如何同步状态到 UI 上的, 也就是:</p>
<p>React 是如何更新组件的? </p>
<p>React 是如何对比出页面变化最小的部分?</p>
<p>这篇文章会为你解答这些问题.</p>
<h3>在这之前</h3>
<p>你已经了解了React (15-stable版本)内部的一些基本概念, 包括不同类型的组件实例、mount过程、事务、批量更新的大致过程(还没有? 不用担心, 为你准备好了<a href="http://realtcg.com/2018/02/11/%E7%AA%A5%E6%8E%A2React-%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90/" rel="nofollow noreferrer">从源码看组件初始渲染</a>、<a href="http://realtcg.com/2018/03/17/%E7%AA%A5%E6%8E%A2React-%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90-%E4%BA%8C/" rel="nofollow noreferrer">接着从源码看组件初始渲染</a>);</p>
<p>准备一个<a href="https://github.com/MrStronger/react-experiment" rel="nofollow noreferrer">demo</a>, 调试源码, 以便更好理解;</p>
<p>Keep calm and make a big deal !</p>
<h2>React 是如何更新组件的?</h2>
<h5>TL;DR</h5>
<ul>
<li>依靠事务进行批量更新;</li>
<li>一次batch(批量)的生命周期就是从<code>ReactDefaultBatchingStrategy</code>事务perform之前(调用ReactUpdates.batchUpdates)到这个事务的最后一个close方法调用后结束;</li>
<li>事务启动后, 遇到 setState 则将 partial state 存到组件实例的_pendingStateQueue上, 然后将这个组件存到dirtyComponents 数组中, 等到 <code>ReactDefaultBatchingStrategy</code>事务结束时调用<code>runBatchedUpdates</code>批量更新所有组件;</li>
<li>组件的更新是递归的, 三种不同类型的组件都有自己的<code>updateComponent</code>方法来决定自己的组件如何更新, 其中 ReactDOMComponent 会采用diff算法对比子元素中最小的变化, 再批量处理.</li>
</ul>
<p>这个更新过程像是一套流程, 无论你通过setState(或者replaceState)还是新的props去更新一个组件, 都会起作用.</p>
<h3>那么具体是什么?</h3>
<p>让我们从这套更新流程的开始部分讲起...</p>
<h4>调用 setState 之前</h4>
<p>首先, 开始一次batch的入口是在<code>ReactDefaultBatchingStrategy</code>里, 调用里面的<code>batchedUpdates</code>便可以开启一次batch:</p>
<pre><code class="javascript">// 批处理策略
var ReactDefaultBatchingStrategy = {
  isBatchingUpdates: false, 
  batchedUpdates: function(callback, a, b, c, d, e) {
    var alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates;
    ReactDefaultBatchingStrategy.isBatchingUpdates = true; // 开启一次batch

    if (alreadyBatchingUpdates) {
      return callback(a, b, c, d, e);
    } else {
      // 启动事务, 将callback放进事务里执行
      return transaction.perform(callback, null, a, b, c, d, e);  
    }
  },
};</code></pre>
<p>在 React 中, 调用<code>batchedUpdates</code>有很多地方, 与更新流程相关的如下</p>
<pre><code class="javascript">// ReactMount.js
ReactUpdates.batchedUpdates(
      batchedMountComponentIntoNode,  // 负责初始渲染
      componentInstance,
      container,
      shouldReuseMarkup,
      context,
);

// ReactEventListener.js
dispatchEvent: function(topLevelType, nativeEvent) {
    ...
    try {
      ReactUpdates.batchedUpdates(handleTopLevelImpl, bookKeeping);  // 处理事件
    } finally {
      TopLevelCallbackBookKeeping.release(bookKeeping);
    }
},</code></pre>
<p>第一种情况, React 在首次渲染组件的时候会调用<code>batchedUpdates</code>, 然后开始渲染组件. 那么为什么要在这个时候启动一次batch呢? 不是因为要批量插入, 因为插入过程是递归的, 而是因为组件在渲染的过程中, 会依顺序调用各种生命周期函数, 开发者很可能在生命周期函数中(如<code>componentWillMount</code>或者<code>componentDidMount</code>)调用<code>setState</code>. 因此, 开启一次batch就是要存储更新(放入dirtyComponents), 然后在事务结束时批量更新. 这样以来, 在初始渲染流程中, 任何<code>setState</code>都会生效, 用户看到的始终是最新的状态.</p>
<p>第二种情况, 如果你在HTML元素上或者组件上绑定了事件, 那么你有可能在事件的监听函数中调用<code>setState</code>, 因此, 同样为了存储更新(放入dirtyComponents), 需要启动批量更新策略. 在回调函数被调用之前, React事件系统中的<code>dispatchEvent</code>函数负责事件的分发, 在<code>dispatchEvent</code>中启动了事务, 开启了一次batch, 随后调用了回调函数. 这样一来, 在事件的监听函数中调用的<code>setState</code>就会生效.</p>
<p>也就是说, 任何可能调用 setState 的地方, 在调用之前, React 都会启动批量更新策略以提前应对可能的setState</p>
<h4>那么调用 batchedUpdates 后发生了什么?</h4>
<p>React 调用<code>batchedUpdates</code>时会传进去一个函数, <code>batchedUpdates</code>会启动<code>ReactDefaultBatchingStrategyTransaction</code>事务, 这个函数就会被放在事务里执行:</p>
<pre><code class="javascript">// ReactDefaultBatchingStrategy.js
var transaction = new ReactDefaultBatchingStrategyTransaction(); // 实例化事务
var ReactDefaultBatchingStrategy = {
  ...
  batchedUpdates: function(callback, a, b, c, d, e) {
    ...
      return transaction.perform(callback, null, a, b, c, d, e);  // 将callback放进事务里执行
       ...
};</code></pre>
<p><code>ReactDefaultBatchingStrategyTransaction</code>这个事务控制了批量策略的生命周期:</p>
<pre><code class="javascript">// ReactDefaultBatchingStrategy.js
var FLUSH_BATCHED_UPDATES = {
  initialize: emptyFunction,
  close: ReactUpdates.flushBatchedUpdates.bind(ReactUpdates),  // 批量更新
};
var RESET_BATCHED_UPDATES = {
  initialize: emptyFunction,
  close: function() {
    ReactDefaultBatchingStrategy.isBatchingUpdates = false;  // 结束本次batch
  },
};
var TRANSACTION_WRAPPERS = [FLUSH_BATCHED_UPDATES, RESET_BATCHED_UPDATES];</code></pre>
<p>无论你传进去的函数是什么, 无论这个函数后续会做什么, 都会在执行完后调用上面事务的close方法, 先调用<code>flushBatchedUpdates</code>批量更新, 再结束本次batch.</p>
<h4>调用 setState 后发生了什么</h4>
<pre><code class="javascript">// ReactBaseClasses.js :
ReactComponent.prototype.setState = function(partialState, callback) {
  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'setState');
  }
};

// =&gt; ReactUpdateQueue.js:
enqueueSetState: function(publicInstance, partialState) {
    // 根据 this.setState 中的 this 拿到内部实例, 也就是组件实例
    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'setState');
    // 取得组件实例的_pendingStateQueue
    var queue =
      internalInstance._pendingStateQueue ||
      (internalInstance._pendingStateQueue = []);
    // 将partial state存到_pendingStateQueue
    queue.push(partialState);
    // 调用enqueueUpdate
    enqueueUpdate(internalInstance);
 }

// =&gt; ReactUpdate.js:
function enqueueUpdate(component) {
  ensureInjected(); // 注入默认策略
    
    // 如果没有开启batch(或当前batch已结束)就开启一次batch再执行, 这通常发生在异步回调中调用 setState      // 的情况
  if (!batchingStrategy.isBatchingUpdates) {
    batchingStrategy.batchedUpdates(enqueueUpdate, component);
    return;
  }
    // 如果batch已经开启就存储更新
  dirtyComponents.push(component);
  if (component._updateBatchNumber == null) {
    component._updateBatchNumber = updateBatchNumber + 1;
  }
}</code></pre>
<p>也就是说, 调用 setState 会首先拿到内部组件实例, 然后把要更新的partial state存到其_pendingStateQueue中, 然后标记当前组件为<code>dirtyComponent</code>, 存到<code>dirtyComponents</code>数组中. 然后就接着继续做下面的事情了, 并没有立即更新, 这是因为接下来要执行的代码里有可能还会调用 setState, 因此只做存储处理.</p>
<h4>什么时候批量更新?</h4>
<p>首先, 一个事务在执行的时候(包括initialize、perform、close阶段), 任何一阶段都有可能调用一系列函数, 并且开启了另一些事务. 那么只有等后续开启的事务执行完, 之前开启的事务才继续执行. 下图是我们刚才所说的第一种情况, 在初始渲染组件期间 setState 后, React 启动的各种事务和执行的顺序:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014442213?w=465&amp;h=620" src="https://static.alili.tech/img/remote/1460000014442213?w=465&amp;h=620" alt="" title=""></span></p>
<p>从图中可以看到, <strong>批量更新是在<code>ReactDefaultBatchingStrategyTransaction</code>事务的close阶段, 在<code>flushBatchedUpdates</code>函数中启动了<code>ReactUpdatesFlushTransaction</code>事务负责批量更新.</strong></p>
<h4>怎么批量更新的?</h4>
<h5>开启批量更新事务、批量处理callback</h5>
<p>我们接着看<code>flushBatchedUpdates</code>函数, 在ReactUpdates.js中</p>
<pre><code class="javascript">var flushBatchedUpdates = function () {
  // 启动批量更新事务
  while (dirtyComponents.length || asapEnqueued) {
    if (dirtyComponents.length) {
      var transaction = ReactUpdatesFlushTransaction.getPooled();
      transaction.perform(runBatchedUpdates, null, transaction);
      ReactUpdatesFlushTransaction.release(transaction);
    }
// 批量处理callback
    if (asapEnqueued) {
      asapEnqueued = false;
      var queue = asapCallbackQueue;
      asapCallbackQueue = CallbackQueue.getPooled();
      queue.notifyAll();
      CallbackQueue.release(queue);
    }
  }
};</code></pre>
<h5>遍历dirtyComponents</h5>
<p><code>flushBatchedUpdates</code>启动了一个更新事务, 这个事务执行了<code>runBatchedUpdates</code>进行批量更新:</p>
<pre><code class="javascript">// ReactUpdates.js
function runBatchedUpdates(transaction) {
  var len = transaction.dirtyComponentsLength;
  // 排序保证父组件优先于子组件更新
  dirtyComponents.sort(mountOrderComparator);

  // 代表批量更新的次数, 保证每个组件只更新一次
  updateBatchNumber++;
  // 遍历 dirtyComponents
  for (var i = 0; i &lt; len; i++) {
    var component = dirtyComponents[i];
      
    var callbacks = component._pendingCallbacks;
    component._pendingCallbacks = null;
    ...
    // 执行更新
    ReactReconciler.performUpdateIfNecessary(
      component,
      transaction.reconcileTransaction,
      updateBatchNumber,
    );
    ...
    // 存储 callback以便后续按顺序调用
    if (callbacks) {
      for (var j = 0; j &lt; callbacks.length; j++) {
        transaction.callbackQueue.enqueue(
          callbacks[j],
          component.getPublicInstance(),
        );
      }
    }
  }
}</code></pre>
<p>前面 setState 后将组件推入了<code>dirtyComponents</code>, 现在就是要遍历<code>dirtyComponents</code>数组进行更新了.</p>
<h5>根据不同情况执行更新</h5>
<p><code>ReactReconciler</code>会调用组件实例的<code>performUpdateIfNecessary</code>.  如果接收了props, 就会调用此组件的<code>receiveComponent</code>, 再在里面调用<code>updateComponent</code>更新组件; 如果没有接受props, 但是有新的要更新的状态(_pendingStateQueue不为空)就会直接调用<code>updateComponent</code>来更新:</p>
<pre><code class="javascript">// ReactCompositeComponent.js
performUpdateIfNecessary: function (transaction) {
    if (this._pendingElement != null) {
        ReactReconciler.receiveComponent(this, this._pendingElement, transaction,                 this._context);
    } else if (this._pendingStateQueue !== null || this._pendingForceUpdate) {
        this.updateComponent(transaction, this._currentElement, this._currentElement,             this._context, this._context);
    } else {
        this._updateBatchNumber = null;
    }
}</code></pre>
<h5>调用组件实例的updateComponent</h5>
<p>接下里就是重头戏<code>updateComponent</code>了, 它决定了组件如果更新自己和它的后代们. <strong>需要特别注意的是, React 内部三种不同的组件类型, 每种组件都有自己的<code>updateComponent</code>, 有不同的行为.</strong></p>
<p>对于 ReactCompositeComponent (<a href="https://www.processon.com/view/link/5acb3adfe4b0899654a18c4d" rel="nofollow noreferrer">矢量图</a>):</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014442214?w=1261&amp;h=523" src="https://static.alili.tech/img/remote/1460000014442214?w=1261&amp;h=523" alt="" title=""></span></p>
<p><code>updateComponent</code>所做的事情 :</p>
<ul>
<li>调用此层级组件的一系列生命周期函数, 并且在合适的时机更新props、state、context;</li>
<li>re-render, 与之前 render 的 element 比较, 如果两者key &amp;&amp; element.type 相等, 则进入下一层进行更新; 如果不等, 直接移除重新mount</li>
</ul>
<p>对于 ReactDOMComponent:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014442215?w=1304&amp;h=583" src="https://static.alili.tech/img/remote/1460000014442215?w=1304&amp;h=583" alt="" title=""></span></p>
<p><code>updateComponent</code>所做的事情 :</p>
<ul>
<li>更新这一层级DOM元素属性;</li>
<li>更新子元素, 调用 ReactMultiChild 的 <code>updateChildren</code>, 对比前后变化、标记变化类型、存到updates中(diff算法主要部分);</li>
<li>批量处理updates</li>
</ul>
<p>对于 ReactDOMTextComponent :</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014442216" src="https://static.alili.tech/img/remote/1460000014442216" alt="" title=""></span></p>
<p>上面只是每个组件自己更新的过程, 那么 React 是如何一次性更新所有组件的 ? 答案是递归.</p>
<h5>递归调用组件的updateComponent</h5>
<p>观察 ReactCompositeComponent 和 ReactDOMComponent 的更新流程, 我们发现 React 每次走到一个组件更新过程的最后部分, 都会有一个判断 : 如果 nextELement 和 prevElement key 和 type 相等, 就会调用<code>receiveComponent</code>. <code>receiveComponent</code>和<code>updateComponent</code>一样, 每种组件都有一个, 作用就相当于updateComponent 接受了新 props 的版本. 而这里调用的就是子元素的<code>receiveComponent</code>, 进而进行子元素的更新, 于是就形成了递归更新、递归diff. 因此, 整个流程就像这样(<a href="https://www.processon.com/view/link/5acb3adfe4b0899654a18c4d" rel="nofollow noreferrer">矢量图</a>) :</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014442217?w=1113&amp;h=760" src="https://static.alili.tech/img/remote/1460000014442217?w=1113&amp;h=760" alt="" title=""></span></p>
<p>这种更新完一级、diff完一级再进入下一级的过程保证 React 只遍历一次组件树就能完成更新, 但代价就是只要前后 render 出元素的 type 和 key 有一个不同就删除重造, 因此, React 建议页面要尽量保持稳定的结构.</p>
<h2>React 是如何对比出页面变化最小的部分?</h2>
<p>你可能会说 React 用 virtual DOM 表示了页面结构, 每次更新, React 都会re-render出新的 virtual DOM, 再通过 diff 算法对比出前后变化, 最后批量更新. 没错, 很好, 这就是大致过程, 但这里存在着一些隐藏的深层问题值得探讨 :</p>
<ul>
<li>React 是如何用 virtual DOM 表示了页面结构, 从而使任何页面变化都能被 diff 出来?</li>
<li>React 是如何 diff 出页面变化最小的部分?</li>
</ul>
<h4>React 如何表示页面结构</h4>
<pre><code class="javascript">class C extends React.Component {
    render () {
        return (
            &lt;div className='container'&gt;
                  "dscsdcsd"
                  &lt;i onClick={(e) =&gt; console.log(e)}&gt;{this.state.val}&lt;/i&gt;
                  &lt;Children val={this.state.val}/&gt;
            &lt;/div&gt;
        )
    }
}
// virtual DOM(React element)
{
  $$typeof: Symbol(react.element)
  key: null
  props: {  // props 代表元素上的所有属性, 有children属性, 描述子组件, 同样是元素
    children: [
      ""dscsdcsd"",
      {$$typeof: Symbol(react.element), type: "i", key: null, ref: null, props: {…}, …},
      {$$typeof: Symbol(react.element), type: class Children, props: {…}, …}
    ]
    className: 'container'
  }  
  ref: null
  type: "div"
  _owner: ReactCompositeComponentWrapper {...} // class C 实例化后的对象
  _store: {validated: false}
  _self: null
  _source: null
}</code></pre>
<p>每个标签, 无论是DOM元素还是自定义组件, 都会有 key、type、props、ref 等属性.</p>
<ul>
<li>key 代表元素唯一id值, 意味着只要id改变, 就算前后元素种类相同, 元素也肯定不一样了;</li>
<li>type 代表元素种类,  有 function(空的wrapper)、class(自定义类)、string(具体的DOM元素名称)类型, 与key一样, 只要改变, 元素肯定不一样;</li>
<li>props 是元素的属性, 任何写在标签上的属性(如className='container')都会被存在这里, 如果这个元素有子元素(包括文本内容), props就会有children属性, 存储子元素; children属性是递归插入、递归更新的依据;</li>
</ul>
<p>也就是说, 如果元素唯一标识符或者类别或者属性有变化, 那么它们re-render后对应的 key、type 和props里面的属性也会改变, 前后一对比即可找出变化. 综上来看, React 这么表示页面结构确实能够反映前后所有变化.</p>
<h4>那么 React 是如何 diff 的?</h4>
<p>React diff 每次只对同一层级的节点进行比对 :</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014442218?w=708&amp;h=322" src="https://static.alili.tech/img/remote/1460000014442218?w=708&amp;h=322" alt="" title=""></span></p>
<p>上图的数字表示遍历更新的次序.</p>
<p>从父节点开始, 每一层 diff 包括两个地方</p>
<ul>
<li>
<p>element diff—— 前后 render 出来的 element 的对比, 这个对比是为了找出前后节点是不是同一节点, 会对比前后render出来的元素它们的 key 和 type. element diff 包括两个地方, 组件顶层DOM元素对比和子元素的对比:</p>
<p><strong>组件顶层DOM元素对比 :</strong></p>
<pre><code class="javascript">// ReactCompositeComponent.js/updateComponent =&gt; _updateRenderedComponent
_updateRenderedComponent: function(transaction, context) {
    // re-render 出element
    var nextRenderedElement = this._renderValidatedComponent();
    // 对比前后变化
    if (shouldUpdateReactComponent(prevRenderedElement, nextRenderedElement)) {
      // 如果 key &amp;&amp; type 没变进行下一级更新
      ReactReconciler.receiveComponent(...);
    } else {
      // 如果变了移除重造
      ReactReconciler.unmountComponent(prevComponentInstance, false);
      ...
      var child = this._instantiateReactComponent(...);
  
      var nextMarkup = ReactReconciler.mountComponent(...);
      this._replaceNodeWithMarkup(...);
    }
}</code></pre>
<p><strong>子元素的对比:</strong></p>
<pre><code class="javascript">// ReactChildReconciler.js
updateChildren: function(...) {
    ...
    for (name in nextChildren) {  // 遍历 re-render 出的elements
      ...
      if (
        prevChild != null &amp;&amp;
        shouldUpdateReactComponent(prevElement, nextElement)
      ) {
        // 如果key &amp;&amp; type 没变进行下一级更新
        ReactReconciler.receiveComponent(...);  
        nextChildren[name] = prevChild;  // 更新完放入 nextChildren, 注意放入的是组件实例
      } else {
        // 如果变了则移除重建                               
        if (prevChild) {
          removedNodes[name] = ReactReconciler.getHostNode(prevChild);
          ReactReconciler.unmountComponent(prevChild, false);
        }
        var nextChildInstance = instantiateReactComponent(nextElement, true);
        nextChildren[name] = nextChildInstance;
          
        var nextChildMountImage = ReactReconciler.mountComponent(...);
        mountImages.push(nextChildMountImage);
      }
    }
    // 再除掉 prevChildren 里有, nextChildren 里没有的组件
    for (name in prevChildren) {
      if (
        prevChildren.hasOwnProperty(name) &amp;&amp;
        !(nextChildren &amp;&amp; nextChildren.hasOwnProperty(name))
      ) {
        prevChild = prevChildren[name];
        removedNodes[name] = ReactReconciler.getHostNode(prevChild);
        ReactReconciler.unmountComponent(prevChild, false);
      }
    }
  },</code></pre>
<p>shouldComponentUpdate 函数:</p>
<pre><code class="javascript">function shouldUpdateReactComponent(prevElement, nextElement) {
  
  var prevEmpty = prevElement === null || prevElement === false;
  var nextEmpty = nextElement === null || nextElement === false;
  if (prevEmpty || nextEmpty) {
    return prevEmpty === nextEmpty;
  }

  var prevType = typeof prevElement;
  var nextType = typeof nextElement;
  // 如果前后变化都是字符串、数字类型的则允许更新
  if (prevType === 'string' || prevType === 'number') {
    return nextType === 'string' || nextType === 'number';
  } else {
    // 否则检查 type &amp;&amp; key
    return (
      nextType === 'object' &amp;&amp;
      prevElement.type === nextElement.type &amp;&amp;
      prevElement.key === nextElement.key
    );
  }
}</code></pre>
<p>element diff 检测 type &amp;&amp; key 都没变时会进入下一级更新, 如果变化则直接移除重造新元素, 然后遍历同级的下一个.</p>
</li>
<li>
<p>subtree diff ——组件顶层DOM元素包裹的所有子元素(也就是props.children里的元素)与之前版本的对比, 这个对比是为了找出同级所有子节点的变化, 包括移除、新建、同级范围的移动;</p>
<pre><code class="javascript">// ReactMultiChild.js
_updateChildren: function(...) {
      var prevChildren = this._renderedChildren;
      var removedNodes = {};
      var mountImages = [];
      // 拿到更新后子组件实例
      var nextChildren = this._reconcilerUpdateChildren();
      ...
      // 遍历子组件实例
      for (name in nextChildren) {
           ...
        var prevChild = prevChildren &amp;&amp; prevChildren[name];
        var nextChild = nextChildren[name];
        // 因为子组件的更新是在原组件实例上更改的, 因此与之前的组件作引用比较即可判断
        if (prevChild === nextChild) {
            // 发生了移动
          updates = enqueue(
            updates,
            this.moveChild(prevChild, lastPlacedNode, nextIndex, lastIndex),
          );
          lastIndex = Math.max(prevChild._mountIndex, lastIndex);
          prevChild._mountIndex = nextIndex;
        } else {
          ...
          // 有新的组件
          updates = enqueue(
            updates,
            this._mountChildAtIndex(
              nextChild,
              mountImages[nextMountIndex],
              lastPlacedNode,
              nextIndex,
              transaction,
              context,
            ),
          );
          nextMountIndex++;
        }
        nextIndex++;
        lastPlacedNode = ReactReconciler.getHostNode(nextChild);
      }
      // Remove children that are no longer present.
      for (name in removedNodes) {
          // removedNodes 记录了所有的移除节点
        if (removedNodes.hasOwnProperty(name)) {
          updates = enqueue(
            updates,
            this._unmountChild(prevChildren[name], removedNodes[name]),
          );
        }
      }
      if (updates) {
        processQueue(this, updates); // 批量处理
      }
      this._renderedChildren = nextChildren;
    },
</code></pre>
<p>React 会将同一层级的变化标记, 如 MOVE_EXISTING、REMOVE_NODE、TEXT_CONTENT、INSERT_MARKUP 等, 统一放到 updates 数组中然后批量处理.</p>
</li>
</ul>
<h2>And that‘s it !</h2>
<p>React 是一个激动人心的库, 它给我们带来了前所未有的开发体验, 但当我们沉浸在使用 React 快速实现需求的喜悦中时, 有必要去探究两个问题 : Why and How?</p>
<p>为什么 React 会如此流行, 原因是什么?  组件化、快速、足够简单、all in js、容易扩展、生态丰富、社区强大...</p>
<p>React 反映了哪些思想/理念/思路 ?  状态机、webComponents、virtual DOM、virtual stack、异步渲染、多端渲染、单向数据流、反应式更新、函数式编程...</p>
<p>React 这些理念/思路受什么启发 ? 怎么想到的 ? 又怎么实现的? ...</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从源码全面剖析 React 组件更新机制

## 原文链接
[https://segmentfault.com/a/1190000014442208](https://segmentfault.com/a/1190000014442208)

