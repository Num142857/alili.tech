---
title: '[React技术内幕]:setState的秘密' 
date: 2019-01-03 2:30:11
hidden: true
slug: 2kx06sp59j5
categories: [reprint]
---

{{< raw >}}

                    
<p>　对于大多数的React开发者，setState可能是最常用的API之一。React作为View层，通过改变data从而引发UI的更新。React不像Vue这种MVVM库，直接修改data并不能视图的改变，更新状态(state)的过程必须使用setState。<br>　　</p>
<h2 id="articleHeader0">setState介绍</h2>
<p>　　setState的函数签名如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setState(partialState,callback)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">setState(partialState,callback)</code></pre>
<p>我们看到setState接受两个参数，一个是<code>partialState</code>，它是新的state用来更新之前的state。<code>callback</code>作为回调函数，会在更新结束之后执行。举个常见的例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.setState({
    value: this.state.value + 1
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">this</span>.setState({
    <span class="hljs-attr">value</span>: <span class="hljs-keyword">this</span>.state.value + <span class="hljs-number">1</span>
})</code></pre>
<p>　　上面这个例子执行的结果是将state中value的值增加1。但事实真的如此简单吗？我们看下面的代码:<br>　　</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Example extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        value: 0
    }

    render() {
        return (
            <div>
                <div>The Value: {this.state.value}</div>
                <button onClick={::this._addValue}>add Value</button>
            </div>
        );
    }

    _addValue() {
        this.setState({
            value: this.state.value + 1
        })
        this.setState({
            value: this.state.value + 1
        })
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Example</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
    }

    state = {
        <span class="hljs-attr">value</span>: <span class="hljs-number">0</span>
    }

    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>The Value: {this.state.value}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{::this._addValue}</span>&gt;</span>add Value<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        );
    }

    _addValue() {
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">value</span>: <span class="hljs-keyword">this</span>.state.value + <span class="hljs-number">1</span>
        })
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">value</span>: <span class="hljs-keyword">this</span>.state.value + <span class="hljs-number">1</span>
        })
    }
}</code></pre>
<p>　　如果你认为点击"addValue"按妞时每次会增加2的话，说明你可能对setState不是很了解。事实上如果你真的需要每次增加2的话，你的<code>_addValue</code>函数应该这么写:<br>　　</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_addValue() {
    this.setState((preState,props)=>({
        value: preState.value + 1
    }))
    
    this.setState((preState,props)=>({
        value: preState.value + 1
    }))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">_addValue() {
    <span class="hljs-keyword">this</span>.setState(<span class="hljs-function">(<span class="hljs-params">preState,props</span>)=&gt;</span>({
        <span class="hljs-attr">value</span>: preState.value + <span class="hljs-number">1</span>
    }))
    
    <span class="hljs-keyword">this</span>.setState(<span class="hljs-function">(<span class="hljs-params">preState,props</span>)=&gt;</span>({
        <span class="hljs-attr">value</span>: preState.value + <span class="hljs-number">1</span>
    }))
}</code></pre>
<p>　　我们可以看到其实参数<code>partialState</code>不仅可以是一个对象，也可以是一个函数。该函数接受两个参数: 更新前的state(<code>preState</code>)与当前的属性(props)，函数返回一个对象用于更新state。为什么会产生这个问题，答案会在后序解答。<br>　　<br>　　其实上面的例子中，如果你真的需要每次增加2的话，你也可以这么写，虽然下面的写法不是很优美:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_addValue() {
    setTimeout(()=>{
        this.setState({
            value: this.state.value + 1
        });
        this.setState({
            value: this.state.value + 1
        });
    },0)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">_addValue() {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">value</span>: <span class="hljs-keyword">this</span>.state.value + <span class="hljs-number">1</span>
        });
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">value</span>: <span class="hljs-keyword">this</span>.state.value + <span class="hljs-number">1</span>
        });
    },<span class="hljs-number">0</span>)
}</code></pre>
<p>　　你现在是否眉头一皱，发现setState并没有这么简单。<br>　　<br><span class="img-wrap"><img data-src="/img/remote/1460000010785697" src="https://static.alili.tech/img/remote/1460000010785697" alt="" title="" style="cursor: pointer;"></span></p>
<p>　　关于setState的介绍，官方文档是这么介绍的:</p>
<blockquote><p>Sets a subset of the state. Always use this to mutate</p></blockquote>
<ol><li>You should treat this.state as immutable.</li></ol>
<blockquote>
<p>There is no guarantee that this.state will be immediately updated, so<br>accessing this.state after calling this method may return the old value.</p>
<p>There is no guarantee that calls to setState will run synchronously,</p>
</blockquote>
<p>as they may eventually be batched together. You can provide an optional<br>callback that will be executed when the call to setState is actually<br>completed.</p>
<p>　　翻译过来(意译)相当于:</p>
<blockquote>
<p>setState用来设置<code>state</code>的子集，永远都只使用setState更改<code>state</code>。你应该将<code>this.state</code>视为不可变数据。</p>
<p>并不能保证this.state会被立即更新，因此在调用这个方法之后访问<code>this.state</code>可能会得到的是之前的值。</p>
<p>不能保证调用setState之后会同步运行，因为它们可能被批量更新，你可以提供可选的回调函数，在setState真正地完成了之后，回调函数将会被执行。</p>
</blockquote>
<p>　　通篇几个字眼让我们很难办，<strong>不保证</strong>、<strong>可能</strong>，到底什么时候才会同步更新，什么时候才会异步更新？可能真的需要我们研究一下。<br>　　</p>
<h2 id="articleHeader1">setState的实现　　</h2>
<p>　　<br>　　React组件继承自<code>React.Component</code>，而setState是<code>React.Component</code>的方法，因此对于组件来讲<code>setState</code>属于其原型方法，首先看setState的定义:<br>　　</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ReactComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}

ReactComponent.prototype.setState = function (partialState, callback) {
  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback);
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ReactComponent</span>(<span class="hljs-params">props, context, updater</span>) </span>{
  <span class="hljs-keyword">this</span>.props = props;
  <span class="hljs-keyword">this</span>.context = context;
  <span class="hljs-keyword">this</span>.refs = emptyObject;
  <span class="hljs-keyword">this</span>.updater = updater || ReactNoopUpdateQueue;
}

ReactComponent.prototype.setState = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">partialState, callback</span>) </span>{
  <span class="hljs-keyword">this</span>.updater.enqueueSetState(<span class="hljs-keyword">this</span>, partialState);
  <span class="hljs-keyword">if</span> (callback) {
    <span class="hljs-keyword">this</span>.updater.enqueueCallback(<span class="hljs-keyword">this</span>, callback);
  }
};</code></pre>
<p>　　我们首先看setState，首先调用的是<code>this.updater.enqueueSetState</code>,先明确<code>this.updater</code>是什么，在React中每个组件有拥有一个<code>this.updater</code>，是用来驱动<code>state</code>更新的工具对象。当我们在组件中的构造函数中调用<code>super</code>时实质调用的就是函数<code>ReactComponent</code>。其中有:<br>　　</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.updater = updater || ReactNoopUpdateQueue;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.updater = updater || ReactNoopUpdateQueue;</code></pre>
<p>　　没有传入参数<code>updater</code>参数时，<code>this.updater</code>的值就是<code>ReactNoopUpdateQueue</code>。　而<code>ReactNoopUpdateQueue</code>实际是没有什么意义的，只相当于一个初始化的过程。而<code>ReactNoopUpdateQueue.enqueueSetState</code>主要起到一个在非生产版本中警告(warning)的作用。真正的<code>updater</code>是在<code>renderer</code>中注入(inject)的。因此如果你在<code>constructor</code>中尝试调用<code>this.helper.isMounted</code>会返回<code>false</code>，表明组件并没有安装(<code>mount</code>),如果你调用setState,也会给出相应的警告。<br>　　</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  constructor(props) {
    super(props);
    //这是指个演示，this.isMounted函数已经被废弃
    console.log(this.updater.isMounted())
    this.setState({
        value: 1
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-comment">//这是指个演示，this.isMounted函数已经被废弃</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.updater.isMounted())
    <span class="hljs-keyword">this</span>.setState({
        <span class="hljs-attr">value</span>: <span class="hljs-number">1</span>
    })
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010785698" src="https://static.alili.tech/img/remote/1460000010785698" alt="" title="" style="cursor: pointer;"></span></p>
<p>　　上面的警告就是<code>ReactNoopUpdateQueue</code>中负责打印的。告诉我们在非安装或已卸载的组件上是不能使用setState函数的。<br>　　<br>　　在<code>ReactCompositeComponentMixin</code>中的函数<code>mountComponent</code>中有下面的语句:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="inst.updater = ReactUpdateQueue;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">inst.updater = ReactUpdateQueue;</code></pre>
<p>那我们来看看<code>ReactUpdateQueue</code>中的<code>enqueueSetState</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var ReactUpdatedQueue = {
  enqueueSetState: function (publicInstance, partialState) {
    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'setState');

    if (!internalInstance) {
      return;
    }

    var queue = internalInstance._pendingStateQueue 
                || (internalInstance._pendingStateQueue = []);
    queue.push(partialState);

    enqueueUpdate(internalInstance);
  },
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">var</span> ReactUpdatedQueue = {
  <span class="hljs-attr">enqueueSetState</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">publicInstance, partialState</span>) </span>{
    <span class="hljs-keyword">var</span> internalInstance = getInternalInstanceReadyForUpdate(publicInstance, <span class="hljs-string">'setState'</span>);

    <span class="hljs-keyword">if</span> (!internalInstance) {
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-keyword">var</span> queue = internalInstance._pendingStateQueue 
                || (internalInstance._pendingStateQueue = []);
    queue.push(partialState);

    enqueueUpdate(internalInstance);
  },
}</code></pre>
<p>我们通过<code>this.updater.enqueueSetState(this, partialState);</code>这里的<code>this</code>是组件的实例，例如在最开始的例子中，<code>this</code>指的就是函数<code>Example</code>的实例(<code>class</code>实质就是函数<code>function</code>的语法糖)。如下图:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010785699" src="https://static.alili.tech/img/remote/1460000010785699" alt="" title="" style="cursor: pointer;"></span></p>
<p>通过执行函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'setState');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> internalInstance = getInternalInstanceReadyForUpdate(publicInstance, <span class="hljs-string">'setState'</span>);</code></pre>
<p>　　我们得到的<code>internalInstance</code>实质就是组件实例的React内部表达，包含了组件实例的内部的一些属性,例如:<br>　　<span class="img-wrap"><img data-src="/img/remote/1460000010785700" src="https://static.alili.tech/img/remote/1460000010785700" alt="" title="" style="cursor: pointer;"></span><br>　　<code>internalInstance</code>的属性很多，但我们需要关注的只有两个:<code>_pendingStateQueue</code>(待更新队列)与<code>_pendingCallbacks</code>(更新回调队列)。根据代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var queue = internalInstance._pendingStateQueue 
                || (internalInstance._pendingStateQueue = []);
 queue.push(partialState);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"> <span class="hljs-keyword">var</span> queue = internalInstance._pendingStateQueue 
                || (internalInstance._pendingStateQueue = []);
 queue.push(partialState);</code></pre>
<p>　　如果<code>_pendingStateQueue</code>的值为<code>null</code>，将其赋值为空数组<code>[]</code>，并将<code>partialState</code>放入待更新state队列<code>_pendingStateQueue</code>。最后执行<code>enqueueUpdate(internalInstance);</code>。因此下一步我们需要研究一下<code>enqueueUpdate</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function enqueueUpdate(internalInstance) {
  ReactUpdates.enqueueUpdate(internalInstance);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">enqueueUpdate</span>(<span class="hljs-params">internalInstance</span>) </span>{
  ReactUpdates.enqueueUpdate(internalInstance);
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ReactUpdates = {
    enqueueUpdate: function enqueueUpdate(component) {
        ensureInjected();
        if (!batchingStrategy.isBatchingUpdates) {
            batchingStrategy.batchedUpdates(enqueueUpdate, component);
            return;
        }
        
        dirtyComponents.push(component);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> ReactUpdates = {
    <span class="hljs-attr">enqueueUpdate</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">enqueueUpdate</span>(<span class="hljs-params">component</span>) </span>{
        ensureInjected();
        <span class="hljs-keyword">if</span> (!batchingStrategy.isBatchingUpdates) {
            batchingStrategy.batchedUpdates(enqueueUpdate, component);
            <span class="hljs-keyword">return</span>;
        }
        
        dirtyComponents.push(component);
    }
}</code></pre>
<p>　　首先执行的<code>ensureInjected()</code>其实也是一个保证<code>ReactUpdates.ReactReconcileTransaction</code>与<code>batchingStrategy</code>是否存在，否则给出相应的警告，当然上面两个的作用之后会给出。接下来会根据batchingStrategy.isBatchingUpdates的值做出不同的行为,如果是<code>true</code>的话，直接将<code>internalInstance</code>放入<code>dirtyComponents</code>，否则将执行<code>batchingStrategy.batchedUpdates(enqueueUpdate, component)</code>。那么我们要了解一下<code>batchingStrategy</code>是干什么的。首先看<code>batchingStrategy</code>的定义:<br>　　</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ReactDefaultBatchingStrategy = {
  isBatchingUpdates: false,
  batchedUpdates: function(callback, a, b, c, d, e) {
    var alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates;
    ReactDefaultBatchingStrategy.isBatchingUpdates = true;
    if (alreadyBatchingUpdates) {
      callback(a, b, c, d, e);
    } else {
      transaction.perform(callback, null, a, b, c, d, e);
    }
  },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> ReactDefaultBatchingStrategy = {
  <span class="hljs-attr">isBatchingUpdates</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">batchedUpdates</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback, a, b, c, d, e</span>) </span>{
    <span class="hljs-keyword">var</span> alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates;
    ReactDefaultBatchingStrategy.isBatchingUpdates = <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">if</span> (alreadyBatchingUpdates) {
      callback(a, b, c, d, e);
    } <span class="hljs-keyword">else</span> {
      transaction.perform(callback, <span class="hljs-literal">null</span>, a, b, c, d, e);
    }
  },
};</code></pre>
<p>　　<code>batchingStrategy</code>实质上就是一种批量更新策略，其属性<code>isBatchingUpdates</code>表示的是否处于批量更新的过程中，开始默认值为false。<code>batchedUpdates</code>就是执行批量更新的方法。当<code>isBatchingUpdates</code>为<code>false</code>时，执行<code>transaction.perform(callback, null, a, b, c, d, e)</code>。否则当<code>isBatchingUpdates</code>为<code>true</code>时，直接执行<code>callback</code>。但在我们这里，其实不会执行到这儿，因为当<code>isBatchingUpdates</code>为<code>true</code>时，直接就将<code>component</code>中放入<code>dirtyComponents</code>中。关于代码中的<code>transaction</code>我们需要了解下React中的事务Transaction。</p>
<h2 id="articleHeader2">Transaction</h2>
<p>　　关于React中的事务Transaction，源码中给出了下面的ASCII图:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * <pre>
 *                       wrappers (injected at creation time)
 *                                      +        +
 *                                      |        |
 *                    +-----------------|--------|--------------+
 *                    |                 v        |              |
 *                    |      +---------------+   |              |
 *                    |   +--|    wrapper1   |---|----+         |
 *                    |   |  +---------------+   v    |         |
 *                    |   |          +-------------+  |         |
 *                    |   |     +----|   wrapper2  |--------+   |
 *                    |   |     |    +-------------+  |     |   |
 *                    |   |     |                     |     |   |
 *                    |   v     v                     v     v   | wrapper
 *                    | +---+ +---+   +---------+   +---+ +---+ | invariants
 * perform(anyMethod) | |   | |   |   |         |   |   | |   | | maintained
 * +----------------->|-|---|-|---|-->|anyMethod|---|---|-|---|-|-------->
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | +---+ +---+   +---------+   +---+ +---+ |
 *                    |  initialize                    close    |
 *                    +-----------------------------------------+
 * </pre>
 */" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * &lt;pre&gt;
 *                       wrappers (injected at creation time)
 *                                      +        +
 *                                      |        |
 *                    +-----------------|--------|--------------+
 *                    |                 v        |              |
 *                    |      +---------------+   |              |
 *                    |   +--|    wrapper1   |---|----+         |
 *                    |   |  +---------------+   v    |         |
 *                    |   |          +-------------+  |         |
 *                    |   |     +----|   wrapper2  |--------+   |
 *                    |   |     |    +-------------+  |     |   |
 *                    |   |     |                     |     |   |
 *                    |   v     v                     v     v   | wrapper
 *                    | +---+ +---+   +---------+   +---+ +---+ | invariants
 * perform(anyMethod) | |   | |   |   |         |   |   | |   | | maintained
 * +-----------------&gt;|-|---|-|---|--&gt;|anyMethod|---|---|-|---|-|--------&gt;
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | +---+ +---+   +---------+   +---+ +---+ |
 *                    |  initialize                    close    |
 *                    +-----------------------------------------+
 * &lt;/pre&gt;
 */</span></code></pre>
<p>　　<br>　　其实上面的形象的解释了React中的事务Transaction，React Transaction会给方法包装一个个wrapper，其中每个<code>wrapper</code>都有两个方法:<code>initialize</code>与<code>close</code>。当执行方法时，需要执行事务的<code>perform</code>方法。<code>perform</code>方法会首先一次执行<code>wrapper</code>的<code>initialize</code>，然后执行函数本身，最后执行<code>wrapper</code>的<code>close</code>方法。<br>　　定义Transaction需要给构造函数混入Transaction.Mixin，并需要提供一个原型方法<code>getTransactionWrappers</code>用于返回wrapper数组。下面我们看下<code>ReactDefaultBatchingStrategy</code>中的<code>transaction</code>是如何定义的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var RESET_BATCHED_UPDATES = {
  initialize: emptyFunction,
  close: function() {
    ReactDefaultBatchingStrategy.isBatchingUpdates = false;
  },
};

var FLUSH_BATCHED_UPDATES = {
  initialize: emptyFunction,
  close: ReactUpdates.flushBatchedUpdates.bind(ReactUpdates),
};

var TRANSACTION_WRAPPERS = [FLUSH_BATCHED_UPDATES, RESET_BATCHED_UPDATES];

function ReactDefaultBatchingStrategyTransaction() {
  this.reinitializeTransaction();
}

Object.assign(
  ReactDefaultBatchingStrategyTransaction.prototype,
  Transaction.Mixin,
  {
    getTransactionWrappers: function() {
      return TRANSACTION_WRAPPERS;
    },
  }
);

var transaction = new ReactDefaultBatchingStrategyTransaction();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> RESET_BATCHED_UPDATES = {
  <span class="hljs-attr">initialize</span>: emptyFunction,
  <span class="hljs-attr">close</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    ReactDefaultBatchingStrategy.isBatchingUpdates = <span class="hljs-literal">false</span>;
  },
};

<span class="hljs-keyword">var</span> FLUSH_BATCHED_UPDATES = {
  <span class="hljs-attr">initialize</span>: emptyFunction,
  <span class="hljs-attr">close</span>: ReactUpdates.flushBatchedUpdates.bind(ReactUpdates),
};

<span class="hljs-keyword">var</span> TRANSACTION_WRAPPERS = [FLUSH_BATCHED_UPDATES, RESET_BATCHED_UPDATES];

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ReactDefaultBatchingStrategyTransaction</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.reinitializeTransaction();
}

<span class="hljs-built_in">Object</span>.assign(
  ReactDefaultBatchingStrategyTransaction.prototype,
  Transaction.Mixin,
  {
    <span class="hljs-attr">getTransactionWrappers</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> TRANSACTION_WRAPPERS;
    },
  }
);

<span class="hljs-keyword">var</span> transaction = <span class="hljs-keyword">new</span> ReactDefaultBatchingStrategyTransaction();</code></pre>
<p>　　其中wrapper<code>RESET_BATCHED_UPDATES</code>负责在<code>close</code>阶段重置<code>ReactDefaultBatchingStrategy</code>的<code>isBatchingUpdates</code>为<code>false</code>。而wrapper<code>FLUSH_BATCHED_UPDATES</code>负责在<code>close</code>执行<code>flushBatchedUpdates</code>。<br>　　</p>
<h2 id="articleHeader3">setState更新的过程　　</h2>
<p>　　我们再次回顾一下更新的过程，如果处于批量更新的过程中(即isBatchingUpdates为<code>true</code>)，则直接将组件传入<code>dirtyComponents</code>。如果不是的话，开启批量更新，用事务<code>transaction.perform</code>执行<code>enqueueUpdate</code>,这时候<code>isBatchingUpdates</code>经过上次执行，已经是<code>true</code>，将被直接传入<code>dirtyComponents</code>。那么传入更新的组件传入<code>dirtyComponents</code>之后会发生什么？<br>　　<br>　　我们知道，<code>batchedUpdates</code>是处于一个事务中的，该事务在<code>close</code>阶段做了两件事，首先是将<code>ReactDefaultBatchingStrategy.isBatchingUpdates</code>置为<code>false</code>,即关闭批量更新的标志位，第二个就是调用了方法<code>ReactUpdates.flushBatchedUpdates</code>。<code>flushBatchedUpdates</code>中会涉及到Virtual DOM到真实DOM的映射，这不是我们这篇文章的重点(最重要的是我自己也没有参透这边的逻辑)，这部分我们只会简要的介绍流程。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//代码有省略
var flushBatchedUpdates = function() {
  while (dirtyComponents.length) {
    if (dirtyComponents.length) {
      var transaction = ReactUpdatesFlushTransaction.getPooled();
      transaction.perform(runBatchedUpdates, null, transaction);
      ReactUpdatesFlushTransaction.release(transaction);
    }
    //......
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//代码有省略</span>
<span class="hljs-keyword">var</span> flushBatchedUpdates = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">while</span> (dirtyComponents.length) {
    <span class="hljs-keyword">if</span> (dirtyComponents.length) {
      <span class="hljs-keyword">var</span> transaction = ReactUpdatesFlushTransaction.getPooled();
      transaction.perform(runBatchedUpdates, <span class="hljs-literal">null</span>, transaction);
      ReactUpdatesFlushTransaction.release(transaction);
    }
    <span class="hljs-comment">//......</span>
  }
};</code></pre>
<p>　　我们发现在函数<code>flushBatchedUpdates</code>中是以事务<code>ReactUpdatesFlushTransaction</code>的方式执行了函数<code>runBatchedUpdates</code>，追根溯源我们来看看<code>runBatchedUpdates</code>干了什么。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function runBatchedUpdates(transaction) {
  var len = transaction.dirtyComponentsLength;
  dirtyComponents.sort(mountOrderComparator);

  for (var i = 0; i < len; i++) {
    var component = dirtyComponents[i];
    var callbacks = component._pendingCallbacks;
    component._pendingCallbacks = null;
    //.....
    ReactReconciler.performUpdateIfNecessary(component, transaction.reconcileTransaction);
    //.......
    if (callbacks) {
      for (var j = 0; j < callbacks.length; j++) {
        transaction.callbackQueue.enqueue(
          callbacks[j],
          component.getPublicInstance()
        );
      }
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">runBatchedUpdates</span>(<span class="hljs-params">transaction</span>) </span>{
  <span class="hljs-keyword">var</span> len = transaction.dirtyComponentsLength;
  dirtyComponents.sort(mountOrderComparator);

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; len; i++) {
    <span class="hljs-keyword">var</span> component = dirtyComponents[i];
    <span class="hljs-keyword">var</span> callbacks = component._pendingCallbacks;
    component._pendingCallbacks = <span class="hljs-literal">null</span>;
    <span class="hljs-comment">//.....</span>
    ReactReconciler.performUpdateIfNecessary(component, transaction.reconcileTransaction);
    <span class="hljs-comment">//.......</span>
    <span class="hljs-keyword">if</span> (callbacks) {
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; callbacks.length; j++) {
        transaction.callbackQueue.enqueue(
          callbacks[j],
          component.getPublicInstance()
        );
      }
    }
  }
}</code></pre>
<p>　　首先函数将<code>dirtyComponents</code>以组件中的<code>_mountOrder</code>进行了递增排序，其目的就是保证更新顺序，即父组件保证其子组件之前更新。然后在组件中获得<code>setState</code>完成之后的回调函数，开始执行<code>ReactReconciler.performUpdateIfNecessary</code>。又得看看这个函数:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="performUpdateIfNecessary: function (internalInstance, transaction) {
    internalInstance.performUpdateIfNecessary(transaction);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">performUpdateIfNecessary: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">internalInstance, transaction</span>) </span>{
    internalInstance.performUpdateIfNecessary(transaction);
}</code></pre>
<p>　　<code>performUpdateIfNecessary</code>执行组件实例的原型方法<code>performUpdateIfNecessary</code>，我们再去看看组件实例是如何定义的这个方法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ReactCompositeComponentMixin = {
  performUpdateIfNecessary: function(transaction) {
    //......
    if (this._pendingStateQueue !== null || this._pendingForceUpdate) {
      this.updateComponent(
        transaction,
        this._currentElement,
        this._currentElement,
        this._context,
        this._context
      );
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> ReactCompositeComponentMixin = {
  <span class="hljs-attr">performUpdateIfNecessary</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">transaction</span>) </span>{
    <span class="hljs-comment">//......</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>._pendingStateQueue !== <span class="hljs-literal">null</span> || <span class="hljs-keyword">this</span>._pendingForceUpdate) {
      <span class="hljs-keyword">this</span>.updateComponent(
        transaction,
        <span class="hljs-keyword">this</span>._currentElement,
        <span class="hljs-keyword">this</span>._currentElement,
        <span class="hljs-keyword">this</span>._context,
        <span class="hljs-keyword">this</span>._context
      );
    }
  }
}</code></pre>
<p>　　上面代码是<code>perfromUpdateIfNecessary</code>的省略版本，主要调用的其中的<code>this.updateComponent</code>方法:<br>　　</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="updateComponent: function(
    transaction,
    prevParentElement,
    nextParentElement,
    prevUnmaskedContext,
    nextUnmaskedContext
  ) {
    var inst = this._instance;
    var willReceive = false;
    var nextContext;
    var nextProps;

    // 验证组件context是否改变
    // ......

    // 验证是否是props更新还是组件state更新
    if (prevParentElement === nextParentElement) {
      nextProps = nextParentElement.props;
    } else {
      //存在props的更新  
      nextProps = this._processProps(nextParentElement.props);
      willReceive = true;
    }
    //根据条件判断是否调用钩子函数componentWillReceiveProps
    if (willReceive &amp;&amp; inst.componentWillReceiveProps) {
      inst.componentWillReceiveProps(nextProps, nextContext);
    }
    //计算新的state
    var nextState = this._processPendingState(nextProps, nextContext);

    var shouldUpdate =
      this._pendingForceUpdate ||
      !inst.shouldComponentUpdate ||
      inst.shouldComponentUpdate(nextProps, nextState, nextContext);

    if (shouldUpdate) {
      this._pendingForceUpdate = false;
      this._performComponentUpdate(
        nextParentElement,
        nextProps,
        nextState,
        nextContext,
        transaction,
        nextUnmaskedContext
      );
    } else {
      this._currentElement = nextParentElement;
      this._context = nextUnmaskedContext;
      inst.props = nextProps;
      inst.state = nextState;
      inst.context = nextContext;
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">updateComponent: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">
    transaction,
    prevParentElement,
    nextParentElement,
    prevUnmaskedContext,
    nextUnmaskedContext
  </span>) </span>{
    <span class="hljs-keyword">var</span> inst = <span class="hljs-keyword">this</span>._instance;
    <span class="hljs-keyword">var</span> willReceive = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">var</span> nextContext;
    <span class="hljs-keyword">var</span> nextProps;

    <span class="hljs-comment">// 验证组件context是否改变</span>
    <span class="hljs-comment">// ......</span>

    <span class="hljs-comment">// 验证是否是props更新还是组件state更新</span>
    <span class="hljs-keyword">if</span> (prevParentElement === nextParentElement) {
      nextProps = nextParentElement.props;
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">//存在props的更新  </span>
      nextProps = <span class="hljs-keyword">this</span>._processProps(nextParentElement.props);
      willReceive = <span class="hljs-literal">true</span>;
    }
    <span class="hljs-comment">//根据条件判断是否调用钩子函数componentWillReceiveProps</span>
    <span class="hljs-keyword">if</span> (willReceive &amp;&amp; inst.componentWillReceiveProps) {
      inst.componentWillReceiveProps(nextProps, nextContext);
    }
    <span class="hljs-comment">//计算新的state</span>
    <span class="hljs-keyword">var</span> nextState = <span class="hljs-keyword">this</span>._processPendingState(nextProps, nextContext);

    <span class="hljs-keyword">var</span> shouldUpdate =
      <span class="hljs-keyword">this</span>._pendingForceUpdate ||
      !inst.shouldComponentUpdate ||
      inst.shouldComponentUpdate(nextProps, nextState, nextContext);

    <span class="hljs-keyword">if</span> (shouldUpdate) {
      <span class="hljs-keyword">this</span>._pendingForceUpdate = <span class="hljs-literal">false</span>;
      <span class="hljs-keyword">this</span>._performComponentUpdate(
        nextParentElement,
        nextProps,
        nextState,
        nextContext,
        transaction,
        nextUnmaskedContext
      );
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">this</span>._currentElement = nextParentElement;
      <span class="hljs-keyword">this</span>._context = nextUnmaskedContext;
      inst.props = nextProps;
      inst.state = nextState;
      inst.context = nextContext;
    }
  }</code></pre>
<p>　　<code>updateComponent</code>方法已经做了相关的注释，其实里面不仅涉及到state的改变导致的重新渲染，还有props的更新导致的重新渲染。在计算新的<code>state</code>时调用了<code>_processPendingState</code>:<br>　　</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  _processPendingState: function(props, context) {
    var inst = this._instance;
    var queue = this._pendingStateQueue;
    var replace = this._pendingReplaceState;
    this._pendingReplaceState = false;
    this._pendingStateQueue = null;

    if (!queue) {
      return inst.state;
    }

    if (replace &amp;&amp; queue.length === 1) {
      return queue[0];
    }

    var nextState = Object.assign({}, replace ? queue[0] : inst.state);
    for (var i = replace ? 1 : 0; i < queue.length; i++) {
      var partial = queue[i];
      Object.assign(
        nextState,
        typeof partial === 'function' ?
          partial.call(inst, nextState, props, context) :
          partial
      );
    }

    return nextState;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-attr">_processPendingState</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">props, context</span>) </span>{
    <span class="hljs-keyword">var</span> inst = <span class="hljs-keyword">this</span>._instance;
    <span class="hljs-keyword">var</span> queue = <span class="hljs-keyword">this</span>._pendingStateQueue;
    <span class="hljs-keyword">var</span> replace = <span class="hljs-keyword">this</span>._pendingReplaceState;
    <span class="hljs-keyword">this</span>._pendingReplaceState = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">this</span>._pendingStateQueue = <span class="hljs-literal">null</span>;

    <span class="hljs-keyword">if</span> (!queue) {
      <span class="hljs-keyword">return</span> inst.state;
    }

    <span class="hljs-keyword">if</span> (replace &amp;&amp; queue.length === <span class="hljs-number">1</span>) {
      <span class="hljs-keyword">return</span> queue[<span class="hljs-number">0</span>];
    }

    <span class="hljs-keyword">var</span> nextState = <span class="hljs-built_in">Object</span>.assign({}, replace ? queue[<span class="hljs-number">0</span>] : inst.state);
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = replace ? <span class="hljs-number">1</span> : <span class="hljs-number">0</span>; i &lt; queue.length; i++) {
      <span class="hljs-keyword">var</span> partial = queue[i];
      <span class="hljs-built_in">Object</span>.assign(
        nextState,
        <span class="hljs-keyword">typeof</span> partial === <span class="hljs-string">'function'</span> ?
          partial.call(inst, nextState, props, context) :
          partial
      );
    }

    <span class="hljs-keyword">return</span> nextState;
  }
}</code></pre>
<p>　　这一部分代码相对来说不算是很难，<code>replace</code>是存在是由于之前被废弃的API<code>this.replaceState</code>，我们现在不需要关心这一部分，现在我们可以回答刚开始的问题，为什么给setState传入的参数是函数时，就可以解决刚开始的例子。<br>　　</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.assign(
    nextState,
    typeof partial === 'function' ?
        partial.call(inst, nextState, props, context) :
        partial
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vbnet"><code class="javasript"><span class="hljs-built_in">Object</span>.assign(
    nextState,
    <span class="hljs-built_in">typeof</span> <span class="hljs-keyword">partial</span> === <span class="hljs-comment">'function' ?</span>
        <span class="hljs-keyword">partial</span>.<span class="hljs-keyword">call</span>(inst, nextState, props, context) :
        <span class="hljs-keyword">partial</span>
);</code></pre>
<p>如果我们传入的是对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.setState({value: this.state.value + 1 });
this.setState({value: this.state.value + 1})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>this.<span class="hljs-built_in">set</span>State({value: this.<span class="hljs-keyword">state</span>.value + <span class="hljs-number">1</span> });
this.<span class="hljs-built_in">set</span>State({value: this.<span class="hljs-keyword">state</span>.value + <span class="hljs-number">1</span>})</code></pre>
<p>　　我们现在已经知道，调用<code>setState</code>是批量更新，那么第一次调用之后，<code>this.state.value</code>的值并没有改变。两次更新的<code>value</code>值其实是一样的，所以达不到我们的目的。但是如果我们传递的是回调函数的形式，那么情况就不一样了，<code>partial.call(inst, nextState, props, context)</code>接受的state都是上一轮更新之后的新值，因此可以达到我们预期的目的。<br>　　<br>　　<code>_processPendingState</code>在计算完新的state之后，会执行<code>_performComponentUpdate</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function _performComponentUpdate(
    nextElement,
    nextProps,
    nextState,
    nextContext,
    transaction,
    unmaskedContext
  ) {
    var inst = this._instance;

    var hasComponentDidUpdate = Boolean(inst.componentDidUpdate);
    var prevProps;
    var prevState;
    var prevContext;
    if (hasComponentDidUpdate) {
      prevProps = inst.props;
      prevState = inst.state;
      prevContext = inst.context;
    }

    if (inst.componentWillUpdate) {
      inst.componentWillUpdate(nextProps, nextState, nextContext);
    }

    this._currentElement = nextElement;
    this._context = unmaskedContext;
    inst.props = nextProps;
    inst.state = nextState;
    inst.context = nextContext;

    this._updateRenderedComponent(transaction, unmaskedContext);

    if (hasComponentDidUpdate) {
      transaction.getReactMountReady().enqueue(
        inst.componentDidUpdate.bind(inst, prevProps, prevState, prevContext),
        inst
      );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_performComponentUpdate</span>(<span class="hljs-params">
    nextElement,
    nextProps,
    nextState,
    nextContext,
    transaction,
    unmaskedContext
  </span>) </span>{
    <span class="hljs-keyword">var</span> inst = <span class="hljs-keyword">this</span>._instance;

    <span class="hljs-keyword">var</span> hasComponentDidUpdate = <span class="hljs-built_in">Boolean</span>(inst.componentDidUpdate);
    <span class="hljs-keyword">var</span> prevProps;
    <span class="hljs-keyword">var</span> prevState;
    <span class="hljs-keyword">var</span> prevContext;
    <span class="hljs-keyword">if</span> (hasComponentDidUpdate) {
      prevProps = inst.props;
      prevState = inst.state;
      prevContext = inst.context;
    }

    <span class="hljs-keyword">if</span> (inst.componentWillUpdate) {
      inst.componentWillUpdate(nextProps, nextState, nextContext);
    }

    <span class="hljs-keyword">this</span>._currentElement = nextElement;
    <span class="hljs-keyword">this</span>._context = unmaskedContext;
    inst.props = nextProps;
    inst.state = nextState;
    inst.context = nextContext;

    <span class="hljs-keyword">this</span>._updateRenderedComponent(transaction, unmaskedContext);

    <span class="hljs-keyword">if</span> (hasComponentDidUpdate) {
      transaction.getReactMountReady().enqueue(
        inst.componentDidUpdate.bind(inst, prevProps, prevState, prevContext),
        inst
      );
    }
}</code></pre>
<p>　　我们可以看到，这部分内容涉及到了几方面内容，首先在更新前调用了钩子函数<code>componentWillUpdate</code>，然后更新了组件的属性(props、state、context)，执行函数<code>_updateRenderedComponent</code>(这部分涉及到<code>render</code>函数的调用和相应的DOM更新，我们不做分析)，最后再次执行钩子函数<code>componentDidUpdate</code>。<br>　　<br>　　到目前为止，我们已经基本介绍完了setState的更新过程，只剩一个部分没有介绍，那就是setState执行结束之后的回调函数。我们知道，setState函数中如果存在callback，则会有:<br>　　</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  if (callback) {
    this.updater.enqueueCallback(this, callback);
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">callback</span>) {
    <span class="hljs-built_in">this</span>.updater.enqueueCallback(<span class="hljs-built_in">this</span>, <span class="hljs-keyword">callback</span>);
  }</code></pre>
<p>　　call函数会被传递给<code>this.updater</code>的函数<code>enqueueCallback</code>，然后非常类似于setState，<code>callback</code>会存储在组件内部实例中的<code>_pendingCallbacks</code>属性之中。我们知道，回调函数必须要setState真正完成之后才会调用，那么在代码中是怎么实现的。大家还记得在函数<code>flushBatchedUpdates</code>中有一个事务<code>ReactUpdatesFlushTransaction</code>:<br>　　</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//代码有省略
var flushBatchedUpdates = function() {
  while (dirtyComponents.length) {
    if (dirtyComponents.length) {
      //从事务pool中获得事务实例
      var transaction = ReactUpdatesFlushTransaction.getPooled();
      transaction.perform(runBatchedUpdates, null, transaction);
      //释放实例
      ReactUpdatesFlushTransaction.release(transaction);
    }
    //......
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//代码有省略</span>
<span class="hljs-keyword">var</span> flushBatchedUpdates = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">while</span> (dirtyComponents.length) {
    <span class="hljs-keyword">if</span> (dirtyComponents.length) {
      <span class="hljs-comment">//从事务pool中获得事务实例</span>
      <span class="hljs-keyword">var</span> transaction = ReactUpdatesFlushTransaction.getPooled();
      transaction.perform(runBatchedUpdates, <span class="hljs-literal">null</span>, transaction);
      <span class="hljs-comment">//释放实例</span>
      ReactUpdatesFlushTransaction.release(transaction);
    }
    <span class="hljs-comment">//......</span>
  }
};</code></pre>
<p>　　我们现在看看<code>ReactUpdatesFlushTransaction</code>的wrapper是怎么定义的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var UPDATE_QUEUEING = {
  initialize: function() {
    this.callbackQueue.reset();
  },
  close: function() {
    this.callbackQueue.notifyAll();
  },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> UPDATE_QUEUEING = {
  <span class="hljs-attr">initialize</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.callbackQueue.reset();
  },
  <span class="hljs-attr">close</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.callbackQueue.notifyAll();
  },
};</code></pre>
<p>　　我们看到在事务的<code>close</code>阶段定义了<code>this.callbackQueue.notifyAll()</code>,即执行了回调函数，通过这种方法就能保证回调函数一定是在setState真正完成之后才执行的。到此为止我们基本已经解释了setState大致的流程是怎样的，但是我们还是没有回答之前的一个问题，为什么下面的两种代码会产生不同的情况:<br>　　</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//未按预期执行
_addValue() {
    this.setState({
        value: this.state.value + 1
    })
    this.setState({
        value: this.state.value + 1
    })
}
//按预期执行
_addValue() {
    setTimeout(()=>{
        this.setState({
            value: this.state.value + 1
        });
        this.setState({
            value: this.state.value + 1
        });
    },0)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//未按预期执行</span>
_addValue() {
    <span class="hljs-keyword">this</span>.setState({
        <span class="hljs-attr">value</span>: <span class="hljs-keyword">this</span>.state.value + <span class="hljs-number">1</span>
    })
    <span class="hljs-keyword">this</span>.setState({
        <span class="hljs-attr">value</span>: <span class="hljs-keyword">this</span>.state.value + <span class="hljs-number">1</span>
    })
}
<span class="hljs-comment">//按预期执行</span>
_addValue() {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">value</span>: <span class="hljs-keyword">this</span>.state.value + <span class="hljs-number">1</span>
        });
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">value</span>: <span class="hljs-keyword">this</span>.state.value + <span class="hljs-number">1</span>
        });
    },<span class="hljs-number">0</span>)
}</code></pre>
<p>　　这个问题，其实真的要追本溯源地去讲，是比较复杂的，我们简要介绍一下。在第一种情况下，如果打断点追踪你会发现，在第一次执行setState前，已经触发了一个 batchedUpdates，等到执行setState时已经处于一个较大的事务，因此两个setState都是会被批量更新的(相当于异步更新的过程，thi.state.value值并没有立即改变)，执行setState只不过是将两者的<code>partialState</code>传入<code>dirtyComponents</code>，最后再通过事务的<code>close</code>阶段的<code>flushBatchedUpdates</code>方法去执行重新渲染。但是通过<code>setTimeout</code>函数的包装，两次setState都会在click触发的批量更新<code>batchedUpdates</code>结束之后执行，这两次setState会触发<strong>两次</strong>批量更新batchedUpdates，当然也会执行两个事务以及函数<code>flushBatchedUpdates</code>,这就相当于一个同步更新的过程，自然可以达到我们的目的，这也就解释了为什么React文档中既没有说setState是同步更新或者是异步更新，只是模糊地说到，setState并不保证同步更新。<br>　　<br>　　这篇文章对setState的介绍也是比较浅显的，但是希望能起到一个抛砖迎玉的作用。setState之所以需要会采用一个批量更新的策略，其目的也是为了优化更新性能。但对于平常的使用中，虽然我们不会关心或者涉及到这个问题，但是我们仍然可以使用React开发出高性能的应用，我想这也就是我们喜欢React的原因:简单、高效!</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[React技术内幕]:setState的秘密

## 原文链接
[https://segmentfault.com/a/1190000010785692](https://segmentfault.com/a/1190000010785692)

