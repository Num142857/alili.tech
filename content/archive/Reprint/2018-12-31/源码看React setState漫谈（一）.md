---
title: '源码看React setState漫谈（一）' 
date: 2018-12-31 2:30:30
hidden: true
slug: wt2j05lr81
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">一张图看懂React setState操作</h1>
<p>网上关于react setState的结论不少，比如：</p>
<ul>
<li>setState不会立刻改变React组件中state的值；</li>
<li>多次setState函数调用产生的效果会合并。</li>
</ul>
<p>但你是否真的了解setState背后的机制？真的是setState触发的刷新吗？<br>废话不说，先上图<br><span class="img-wrap"><img data-src="/img/bVU2aU?w=2626&amp;h=1756" src="https://static.alili.tech/img/bVU2aU?w=2626&amp;h=1756" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>组件挂载后，setState一般是通过DOM交互事件触发。这里以<code>click</code>为例，其他也一样。</p>
<p>代码很简单</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {Component} from 'react';
class MyInfo extends Component{
    constructor(props,context){
        super(props,context);
        this.state = {
            age:1
        }
    }

     _grow(age){
        age++
        this.setState({
            age:age
        })
    }

    render(){
        const {age} = this.state
        return (
            <div>
                我的年龄是{age}
                <button onClick={this._grow.bind(this,age)}>点击涨一岁</button>
            </div>
        )
    }
}

export default MyInfo;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React, {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyInfo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span></span>{
    <span class="hljs-keyword">constructor</span>(props,context){
        <span class="hljs-keyword">super</span>(props,context);
        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-attr">age</span>:<span class="hljs-number">1</span>
        }
    }

     _grow(age){
        age++
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">age</span>:age
        })
    }

    render(){
        <span class="hljs-keyword">const</span> {age} = <span class="hljs-keyword">this</span>.state
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                我的年龄是{age}
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this._grow.bind(this,age)}</span>&gt;</span>点击涨一岁<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> MyInfo;</code></pre>
<p>我们点击button按钮时，到底发生了什么？ReactEventListener会触发dispatchEvent方法。（具体怎么触发是事件机制的事，这里不深究）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dispatchEvent: function (topLevelType, nativeEvent) {
    if (!ReactEventListener._enabled) {
      return;
    }

    var bookKeeping = TopLevelCallbackBookKeeping.getPooled(topLevelType, nativeEvent);
    try {
      // Event queue being processed in the same cycle allows
      // `preventDefault`.
      ReactUpdates.batchedUpdates(handleTopLevelImpl, bookKeeping);
    } finally {
      TopLevelCallbackBookKeeping.release(bookKeeping);
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">dispatchEvent: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">topLevelType, nativeEvent</span>) </span>{
    <span class="hljs-keyword">if</span> (!ReactEventListener._enabled) {
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-keyword">var</span> bookKeeping = TopLevelCallbackBookKeeping.getPooled(topLevelType, nativeEvent);
    <span class="hljs-keyword">try</span> {
      <span class="hljs-comment">// Event queue being processed in the same cycle allows</span>
      <span class="hljs-comment">// `preventDefault`.</span>
      ReactUpdates.batchedUpdates(handleTopLevelImpl, bookKeeping);
    } <span class="hljs-keyword">finally</span> {
      TopLevelCallbackBookKeeping.release(bookKeeping);
    }
  }</code></pre>
<p>可以看到这里有个<code>ReactUpdates.batchedUpdates</code>方法。我们跟进去看看</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function batchedUpdates(callback, a, b, c, d, e) {
  ensureInjected();
  return batchingStrategy.batchedUpdates(callback, a, b, c, d, e);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">batchedUpdates</span>(<span class="hljs-params">callback, a, b, c, d, e</span>) </span>{
  ensureInjected();
  <span class="hljs-keyword">return</span> batchingStrategy.batchedUpdates(callback, a, b, c, d, e);
}</code></pre>
<p>可以发现这里调用了<code>batchingStrategy</code>的方法。这又是什么鬼，其实这是注入进来的<code>ReactDefaultBatchingStragy</code>（<strong>这里插一句，React大量运用了注入机制，这样每次注入的都是同一个实例化对象，防止多次实例化。</strong>）<br><strong>到这边就已经开启了批量更新模式</strong><br>继续看，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="batchedUpdates: function(callback, a, b, c, d, e) {
    var alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates;

    ReactDefaultBatchingStrategy.isBatchingUpdates = true;

    // The code is written this way to avoid extra allocations
    if (alreadyBatchingUpdates) {
      return callback(a, b, c, d, e);
    } else {
      return transaction.perform(callback, null, a, b, c, d, e);
    }
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">batchedUpdates: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback, a, b, c, d, e</span>) </span>{
    <span class="hljs-keyword">var</span> alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates;

    ReactDefaultBatchingStrategy.isBatchingUpdates = <span class="hljs-literal">true</span>;

    <span class="hljs-comment">// The code is written this way to avoid extra allocations</span>
    <span class="hljs-keyword">if</span> (alreadyBatchingUpdates) {
      <span class="hljs-keyword">return</span> callback(a, b, c, d, e);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> transaction.perform(callback, <span class="hljs-literal">null</span>, a, b, c, d, e);
    }
  },</code></pre>
<p><code>transaction.perform</code>执行了一个事务。事务其他文章说的很多我就不详细解释了。大概就是，transaction在执行perform之前会执行特性的initialize方法，然后执行传进去的callback,之后会执行close方法，是不是似曾相识？没错，高阶函数或者高阶组件都是这路数。<br>在<code>ReactDefaultBatchingStragy</code>里可以发现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var transaction = new ReactDefaultBatchingStrategyTransaction();

//在事务结束时清理一下标识
var RESET_BATCHED_UPDATES = {
  initialize: emptyFunction,
  close: function() {
    ReactDefaultBatchingStrategy.isBatchingUpdates = false;
  },
};

// 在事务结束时执行flushBatchedUpdates方法，这个方法就是 state 更新的核心代码了。
var FLUSH_BATCHED_UPDATES = {
  initialize: emptyFunction,
  close: ReactUpdates.flushBatchedUpdates.bind(ReactUpdates),
};

var TRANSACTION_WRAPPERS = [FLUSH_BATCHED_UPDATES, RESET_BATCHED_UPDATES];

function ReactDefaultBatchingStrategyTransaction() {
  this.reinitializeTransaction();
}

Object.assign(ReactDefaultBatchingStrategyTransaction.prototype, Transaction, {
  getTransactionWrappers: function() {
    return TRANSACTION_WRAPPERS;
  },
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> transaction = <span class="hljs-keyword">new</span> ReactDefaultBatchingStrategyTransaction();

<span class="hljs-comment">//在事务结束时清理一下标识</span>
<span class="hljs-keyword">var</span> RESET_BATCHED_UPDATES = {
  <span class="hljs-attr">initialize</span>: emptyFunction,
  <span class="hljs-attr">close</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    ReactDefaultBatchingStrategy.isBatchingUpdates = <span class="hljs-literal">false</span>;
  },
};

<span class="hljs-comment">// 在事务结束时执行flushBatchedUpdates方法，这个方法就是 state 更新的核心代码了。</span>
<span class="hljs-keyword">var</span> FLUSH_BATCHED_UPDATES = {
  <span class="hljs-attr">initialize</span>: emptyFunction,
  <span class="hljs-attr">close</span>: ReactUpdates.flushBatchedUpdates.bind(ReactUpdates),
};

<span class="hljs-keyword">var</span> TRANSACTION_WRAPPERS = [FLUSH_BATCHED_UPDATES, RESET_BATCHED_UPDATES];

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ReactDefaultBatchingStrategyTransaction</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.reinitializeTransaction();
}

<span class="hljs-built_in">Object</span>.assign(ReactDefaultBatchingStrategyTransaction.prototype, Transaction, {
  <span class="hljs-attr">getTransactionWrappers</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> TRANSACTION_WRAPPERS;
  },
});</code></pre>
<p>可以发现这个transition有两个wrapper,主要看<code>FLUSH_BATCHED_UPDATES</code></p>
<p>目前走完了图中的第一行，有点晕的可以对着图回顾一下。</p>
<p>-</p>
<p>是不是发现哪里不对？是的，到现在我们的setState还没执行呢！<br>接着上文，我们首先看看transition的两个initailize方法，发现时两个空函数。跳过<br>接着就是perform需要执行的逻辑了。再次放出代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ReactUpdates.batchedUpdates(handleTopLevelImpl, bookKeeping);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">ReactUpdates.batchedUpdates(handleTopLevelImpl, bookKeeping);</code></pre>
<p>也就是执行这边的<code>handleTopLevelImpl</code>。正是在这边调用DOM事件对应的回调方法。也就是例子中<code>_grow</code>在这时候调用。<br>然后是setState方法。这里和大部分书和文章说的差不多。抛开细节就是将state的变化和对应的回调函数放置到<code>_pendingStateQueue</code>，和<code>_pendingCallback</code>中。<br>然后把需要更新的组件放到dirtyComponents序列中。<br>重点来了：<br>注意注意！！！！<br><strong>setState从来不负责更新操作。它的工作只是把state,和callback放进序列，并且把要更新的组件放到dirtyComponents序列</strong><br>还记得吗？我们还在<code>ReactDefalutBatchingStragy</code>的事务中，perform执行完了，还要执行close。<br>真正执行更新方法的是close里面的<code>flushBatchedUpdates</code>。<br>鉴于文章长度，其他的可以看图理解</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
源码看React setState漫谈（一）

## 原文链接
[https://segmentfault.com/a/1190000011170740](https://segmentfault.com/a/1190000011170740)

