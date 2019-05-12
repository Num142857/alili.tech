---
title: '我为什么从Redux迁移到了Mobx' 
date: 2018-12-24 2:30:07
hidden: true
slug: elki9zv6oiv
categories: [reprint]
---

{{< raw >}}

                    
<p>Redux是一个数据管理层，被广泛用于管理复杂应用的数据。但是实际使用中，Redux的表现差强人意，可以说是不好用。而同时，社区也出现了一些数据管理的方案，Mobx就是其中之一。</p>
<h2 id="articleHeader0">Redux的问题</h2>
<blockquote><p>Predictable state container for JavaScript apps</p></blockquote>
<p>这是Redux给自己的定位，但是这其中存在很多问题。<br>首先，Redux做了什么？看Redux的源码，<code>createStore</code>只有一个函数，返回4个闭包。<code>dispatch</code>只做了一件事，调用<code>reducer</code>然后调用<code>subscribe</code>的<code>listener</code>，这其中<code>state</code>的不可变或者是可变全部由使用者来控制，Redux并不知道state有没有发生变化，更不知道state具体哪里发生了变化。所以，如果view层需要知道哪一部分需要更新，只能通过脏检查。</p>
<p>再看<code>react-redux</code>做了什么，在store.subscribe上挂回调，每次发生subscribe就调用<code>connect</code>传进去<code>mapStateToProps</code>和<code>mapDispatchToProps</code>，然后脏检测<code>props</code>的每一项。当然，我们可以利用不可变数据的特点，去减少prop的数量从而减少脏检测的次数，但是哪有props都来自同一个子树这么好的事呢？</p>
<p>所以，如果有n个组件connect，每当dispatch一个action的时候，无论做了什么粒度的更新，都会发生O(n)时间复杂度的脏检测。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Redux 3.7.2 createStore.js

// ...
    try {
      isDispatching = true
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }

    const listeners = currentListeners = nextListeners
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }
// ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Redux 3.7.2 createStore.js</span>

<span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">try</span> {
      isDispatching = <span class="hljs-literal">true</span>
      currentState = currentReducer(currentState, action)
    } <span class="hljs-keyword">finally</span> {
      isDispatching = <span class="hljs-literal">false</span>
    }

    <span class="hljs-keyword">const</span> listeners = currentListeners = nextListeners
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; listeners.length; i++) {
      <span class="hljs-keyword">const</span> listener = listeners[i]
      listener()
    }
<span class="hljs-comment">// ...</span></code></pre>
<p>更糟糕的是，每次reducer执行完Redux就直接调用listener了，如果在短时间内发生了多次修改（例如用户输入），不可变的开销，加上redux用字符串匹配action的开销，脏检测的开销，再加上view层的开销，整个性能表现会非常糟糕，即使在用户输入的时候往往只需要更新一个"input"。应用规模越大，性能表现越糟糕。（这里的应用指单个页面。这里的单页不是SPA的单页的意思，因为有Router的情况下，被切走的页面其所有组件都被unmount了）</p>
<p>在应用规模增大的同时，异步请求数量一多，Redux所宣传的<code>Predictable</code>也根本就是泡影，更多的时候是配合各种工具沦为数据可视化工具。</p>
<h2 id="articleHeader1">Mobx</h2>
<p>Mobx可以说是众多数据方案中最完善的一个了。Mobx本身独立，不与任何view层框架互相依赖，因此你可以随意选择合适的view层框架（部分除外，例如Vue，因为它们的原理是一样的）。</p>
<p>目前Mobx（3.x)和Vue（2.x)采用了相同的响应式原理，借用Vue文档的一张图：<br><span class="img-wrap"><img data-src="/img/bVNnnE?w=1200&amp;h=750" src="https://static.alili.tech/img/bVNnnE?w=1200&amp;h=750" alt="data.png" title="data.png" style="cursor: pointer; display: inline;"></span><br>为每个组件创建一个Watcher，在数据的getter和setter上加钩子，当组件渲染的时候（例如，调用render方法）会触发getter，然后把这个组件对应的Watcher添加到getter相关的数据的依赖中（例如，一个Set）。当setter被触发时，就能知道数据发生了变化，然后同时对应的Watcher去重绘组件。</p>
<p>这样，每个组件所需要的数据时精确可知的，因此当数据发生变化时，可以精确地知道哪些组件需要被重绘，数据变化时重绘的过程是O(1)的时间复杂度。</p>
<p>需要注意的是，在Mobx中，需要把数据声明为observable。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';
import { observable, action } from 'mobx';
import { Provider, observer, inject } from 'mobx-react';

class CounterModel {
    @observable
    count = 0

    @action
    increase = () => {
        this.count += 1;
    }
}

const counter = new CounterModel();

@inject('counter') @observer
class App extends React.Component {
    render() {
        const { count, increase } = this.props.counter;

        return (
            <div>
                <span>{count}</span>
                <button onClick={increase}>increase</button>
            </div>
        )
    }
}

ReactDOM.render(
    <Provider counter={counter}>
        <App />
    </Provider>
);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-keyword">import</span> { observable, action } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx'</span>;
<span class="hljs-keyword">import</span> { Provider, observer, inject } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx-react'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CounterModel</span> </span>{
    @observable
    count = <span class="hljs-number">0</span>

    @action
    increase = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">this</span>.count += <span class="hljs-number">1</span>;
    }
}

<span class="hljs-keyword">const</span> counter = <span class="hljs-keyword">new</span> CounterModel();

@inject(<span class="hljs-string">'counter'</span>) @observer
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">const</span> { count, increase } = <span class="hljs-keyword">this</span>.props.counter;

        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{count}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{increase}</span>&gt;</span>increase<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}

ReactDOM.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Provider</span> <span class="hljs-attr">counter</span>=<span class="hljs-string">{counter}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Provider</span>&gt;</span></span>
);
</code></pre>
<h2 id="articleHeader2">性能</h2>
<p>在这篇<a href="https://hackernoon.com/an-artificial-example-where-mobx-really-shines-and-redux-is-not-really-suited-for-it-1a58313c0c70" rel="nofollow noreferrer" target="_blank">文章</a>中，作者使用了一个一个128*128的绘图板来说明问题。<br>由于Mobx利用<code>getter</code>和<code>setter</code>（未来可能会出现一个平行的基于<code>Proxy</code>的版本）去收集组件实例的数据依赖关系，因此每单当一个点发生更新的时候，<code>Mobx</code>知道哪些组件需要被更新，决定哪个组件更新的过程的时间复杂度是O(1)的，而<code>Redux</code>通过脏检查每一个<code>connect</code>的组件去得到哪些组件需要更新，有n个组件<code>connect</code>这个过程的时间复杂度就是O(n)，最终反映到Perf工具上就是JavaScript的执行耗时。</p>
<p>虽然在经过一系列优化后，Redux的版本可以获得不输Mobx版本的性能，当时Mobx不用任何优化就可以得到不错的性能。而Redux最完美的优化是为每一个点建立单独的store，这与Mobx等一众精确定位数据依赖的方案在思想上是相同的。</p>
<h2 id="articleHeader3">Mobx State Tree</h2>
<p>Mobx并不完美。Mobx不要求数据在一颗树上，因此对Mobx进行数据可是化或者是记录每次的数据变化变得不太容易。在Mobx的基础上，Mobx State Tree诞生了。同Redux一样，Mobx State Tree要求数据在一颗树上，这样对数据进行可视化和追踪就变得非常容易，对开发来说是福音。同时Mobx State Tree非常容易得到准确的TypeScript类型定义，这一点Redux不容易做到。同时还提供了运行时的类型安全检查。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';
import { types } from 'mobx-state-tree';
import { Provider, observer, inject } from 'mobx-react';

const CountModel = types.model('CountModel', {
    count: types.number
}).actions(self => ({
    increase() {
        self.count += 1;
    }
}));

const store = CountModel.create({
    count: 0
});

@inject(({ store }) => ({ count: store.count, increase: store.increase }))
class App extends React.Component {
    render() {
        const { count, increase } = this.props;

        return (
            <div>
                <span>{count}</span>
                <button onClick={increase}>increase</button>
            </div>
        )
    }
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-keyword">import</span> { types } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx-state-tree'</span>;
<span class="hljs-keyword">import</span> { Provider, observer, inject } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx-react'</span>;

<span class="hljs-keyword">const</span> CountModel = types.model(<span class="hljs-string">'CountModel'</span>, {
    <span class="hljs-attr">count</span>: types.number
}).actions(<span class="hljs-function"><span class="hljs-params">self</span> =&gt;</span> ({
    increase() {
        self.count += <span class="hljs-number">1</span>;
    }
}));

<span class="hljs-keyword">const</span> store = CountModel.create({
    <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>
});

@inject(<span class="hljs-function">(<span class="hljs-params">{ store }</span>) =&gt;</span> ({ <span class="hljs-attr">count</span>: store.count, <span class="hljs-attr">increase</span>: store.increase }))
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">const</span> { count, increase } = <span class="hljs-keyword">this</span>.props;

        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{count}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{increase}</span>&gt;</span>increase<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}

ReactDOM.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Provider</span> <span class="hljs-attr">store</span>=<span class="hljs-string">{store}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Provider</span>&gt;</span></span>
);</code></pre>
<p>Mobx State Tree还提供了<code>snapshot</code>的功能，因此虽然MST本身的数据可变，依然能打到不可变的数据的效果。官方提供了利用<code>snaptshot</code>直接结合Redux的开发工具使用，方便开发；同时官方还提供了把MST的数据作为一个Redux的store来使用；当然，利用snapshot也可以MST嵌在Redux的store中作为数据（类似在Redux中很流行的Immutable.js的作用）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 连接Redux的开发工具
// ...
connectReduxDevtools(require(&quot;remotedev&quot;), store);
// ...

// 直接作为一个Redux store使用
// ...
import { Provider, connect } from 'react-redux';

const store = asReduxStore(store);

@connect(// ...)
function SomeComponent() {
    return <span>Some Component</span>
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    <Provider />,
    document.getElementById('foo')
);

// ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 连接Redux的开发工具</span>
<span class="hljs-comment">// ...</span>
connectReduxDevtools(<span class="hljs-built_in">require</span>(<span class="hljs-string">"remotedev"</span>), store);
<span class="hljs-comment">// ...</span>

<span class="hljs-comment">// 直接作为一个Redux store使用</span>
<span class="hljs-comment">// ...</span>
<span class="hljs-keyword">import</span> { Provider, connect } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>;

<span class="hljs-keyword">const</span> store = asReduxStore(store);

@connect(<span class="hljs-comment">// ...)</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SomeComponent</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Some Component<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
}

ReactDOM.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Provider</span> <span class="hljs-attr">store</span>=<span class="hljs-string">{store}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Provider</span> /&gt;</span>,
    document.getElementById('foo')
);

// ...</span></code></pre>
<p>并且，在MST中，可变数据和不可变的数据（snapshot）可以互相转化，你可以随时把snapshot应用到数据上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="applySnapshot(counter, {
    count: 12345
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">applySnapshot(counter, {
    <span class="hljs-attr">count</span>: <span class="hljs-number">12345</span>
});</code></pre>
<p>除此之外，官方还提供了异步action的支持。由于JavaScript的限制，异步操作难以被追踪，即时使用了async函数，其执行过程中也是不能被追踪的，就会出现虽然在async的函数内操作了数据，这个async函数也被标记为action，但是会被误判是在action外修改了数据。以往异步action只能通过多个action组合使用来完成，而Vue则是通过把action和mutation分开来实现。在Mobx State Tree利用了Generator，使异步操作可以在一个action函数内完成并且可以被追踪。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ...

SomeModel.actions(self => ({
    someAsyncAction: process(function* () {
        const a = 1;
        const b = yield foo(a); // foo必须返回一个Promise
        self.bar = b;
    })
}));

// ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// ...</span>

SomeModel.actions(<span class="hljs-function"><span class="hljs-params">self</span> =&gt;</span> ({
    <span class="hljs-attr">someAsyncAction</span>: process(<span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">const</span> a = <span class="hljs-number">1</span>;
        <span class="hljs-keyword">const</span> b = <span class="hljs-keyword">yield</span> foo(a); <span class="hljs-comment">// foo必须返回一个Promise</span>
        self.bar = b;
    })
}));

<span class="hljs-comment">// ...</span></code></pre>
<h2 id="articleHeader4">总结</h2>
<p>Mobx利用<code>getter</code>和<code>setter</code>来收集组件的数据依赖关系，从而在数据发生变化的时候精确知道哪些组件需要重绘，在界面的规模变大的时候，往往会有很多细粒度更新，虽然响应式设计会有额外的开销，在界面规模大的时候，这种开销是远比对每一个组件做脏检查小的，因此在这种情况下Mobx会很容易得到比Redux更好的性能。而在数据全部发生改变时，基于脏检查的实现会比Mobx这类响应式有更好的性能，但这类情况很少。同时，有些benchmark并不是最佳实践，其结果也不能反映真实的情况。</p>
<p>但是，由于<code>React</code>本身提供了利用不可变数据结构来减少无用渲染的机制（例如PureComponent，函数式组件），同时，React的一些生态和Immutable绑定了（例如Draft.js），因此在配合可变的观察者模式的数据结构时并不是那么舒服。所以，在遇到性能问题之前，建议还是使用Redux和Immutable.js搭配React。</p>
<blockquote><p>The real problem is that programmers have spent far too much time worrying about efficiency in the wrong places and at the wrong times; premature optimization is the root of all evil (or at least most of it) in programming.</p></blockquote>
<h2 id="articleHeader5">一些实践</h2>
<p>由于JavaScript的限制，一些对象不是原生的对象，其他的类型检查库可能会导致意想不到的结果。例如在Mobx中，数组并不是一个Array，而是一个类Array的对象，这是为了能监听到数据下标的赋值。相对的，在Vue中数组是一个Array，但是数组下标赋值要使用<code>splice</code>来进行，否则无法被检测到。</p>
<p>由于Mobx的原理，要做到精确的按需更新，就要在正确的地方触发getter，最简单的办法就是render要用到的数据只在render里解构。<code>mobx-react</code>从4.0开始，<code>inject</code>接受的map函数中的结构也会被追踪，因此可以直接用类似<code>react-redux</code>的写法。注意，在4.0之前inject的map函数不会被追踪。</p>
<p>响应式有额外的开销，这些开销在渲染大量数据时会对性能有影响（例如：长列表），因此要合理搭配使用<code>observable.ref</code>、<code>observable.shallow</code>（Mobx），<code>types.frozen</code>（Mobx State Tree）。</p>
<blockquote><p>本文首发于<a href="https://tech.youzan.com/mobx_vs_redux/" rel="nofollow noreferrer" target="_blank">有赞技术博客</a>。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
我为什么从Redux迁移到了Mobx

## 原文链接
[https://segmentfault.com/a/1190000012209750](https://segmentfault.com/a/1190000012209750)

