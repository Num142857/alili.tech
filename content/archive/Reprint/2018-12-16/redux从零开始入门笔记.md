---
title: 'redux从零开始入门笔记' 
date: 2018-12-16 2:30:10
hidden: true
slug: o625gq1qz3
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">为什么需要redux</h2>
<p>学过react的都知道，react用<code>state</code>和<code>props</code>控制组件的渲染情况，而对于JavaScript单页面日趋复杂的今天，JavaScript需要管理越来越多的state，而这些state包括着各种乱七八糟途径来的数据。甚至有的应用的state会关系到另一个组件的状态。所以为了方便对这些state的管理以及对state变化的可控性。这个时候Redux这个东西就出来了，它可以让state的变化变得可预测。</p>
<h2 id="articleHeader1">Redux的基本概念</h2>
<p>什么是redux？这里非权威的解释：就是一个应用的state管理库，甚至可以说是前端数据库。更包括的是管理数据。</p>
<h3 id="articleHeader2">state</h3>
<p>state是整个应用的数据，本质上是一个普通对象。<br>state决定了整个应用的组件如何渲染，渲染的结果是什么。可以说，State是应用的灵魂，组件是应用的肉体。<br>所以，在项目开发初期，设计一份健壮灵活的State尤其重要，对后续的开发有很大的帮助。<br>但是，并不是所有的数据都需要保存到state中，有些属于组件的数据是完全可以留给组件自身去维护的。</p>
<h3 id="articleHeader3">action</h3>
<p>数据state已经有了，那么我们是如何实现管理这些state中的数据的呢？那就是action，什么是action？按字面意思解释就是动作，也可以理解成，一个可能！改变state的动作包装。就这么简单。。。。<br>只有当某一个动作发生的时候才能够触发这个state去改变，那么，触发state变化的原因那么多，比如这里的我们的点击事件，还有网络请求，页面进入，鼠标移入。。。所以action的出现，就是为了把这些操作所产生或者改变的数据从应用传到store中的有效载荷。 需要说明的是，action是state的唯一来源。它本质上就是一个JavaScript对象，但是约定的包含<code>type</code>属性，可以理解成每个人都要有名字一般。除了type属性，别的属性，都可以.<br>那么这么多action一个个手动创建必然不现实，一般我们会写好<code>actionCreator</code>，即action的创建函数。调用<code>actionCreator</code>，给你返回一个action。这里我们可以使用 <a href="https://www.npmjs.com/package/redux-actions" rel="nofollow noreferrer" target="_blank">redux-actions</a>，嗯呢，我们下文有介绍。<br>比如有一个counter数量加减应用，我们就有两个action，一个<code>decrement</code>，一个<code>increment</code>。 所以这里的action creator写成如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function decrement() {
    return{
        type:DECREMENT_COUNTER
    }
}

export function increment(){
    return{
        type:INCREMENT_COUNTER
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">decrement</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span>{
        <span class="hljs-attr">type</span>:DECREMENT_COUNTER
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">increment</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span>{
        <span class="hljs-attr">type</span>:INCREMENT_COUNTER
    }
}</code></pre>
<p>那么，当action创建完成了之后呢，我们怎么触发这些action呢，这时我们是要利用<code>dispatch</code>，比如我们执行count增减减少动作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function incrementIfOdd(){
    return(dispatch,getState)=>{
        const {counter} = getState();
        if(counter%2==0) {
            return;
        }
        dispatch(increment());
    }
}

export function incrementAsync() {
    return dispatch => {
        setTimeout(() => {
            dispatch(increment());
        }, 1000);
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">incrementIfOdd</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span><span class="hljs-function">(<span class="hljs-params">dispatch,getState</span>)=&gt;</span>{
        <span class="hljs-keyword">const</span> {counter} = getState();
        <span class="hljs-keyword">if</span>(counter%<span class="hljs-number">2</span>==<span class="hljs-number">0</span>) {
            <span class="hljs-keyword">return</span>;
        }
        dispatch(increment());
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">incrementAsync</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">dispatch</span> =&gt;</span> {
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            dispatch(increment());
        }, <span class="hljs-number">1000</span>);
    };
}</code></pre>
<p>为了减少样板代码，我们使用单独的模块或文件来定义 action type 常量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> INCREMENT_COUNTER = <span class="hljs-string">'INCREMENT_COUNTER'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> DECREMENT_COUNTER = <span class="hljs-string">'DECREMENT_COUNTER'</span>;</code></pre>
<p>这么做不是必须的，在大型应用中把它们显式地定义成常量还是利大于弊的。</p>
<h3 id="articleHeader4">reducer</h3>
<p>既然这个可能改变state的动作已经包装好了，那么我们怎么去判断并且对state做相应的改变呢？对，这就是reducer干的事情了。<br><code>reducer</code>是state最终格式的确定。它是一个纯函数，也就是说，只要传入参数相同，返回计算得到的下一个 state 就一定相同。没有特殊情况、没有副作用，没有 API 请求、没有变量修改，单纯执行计算。<br><code>reducer</code>对传入的action进行判断，然后返回一个通过判断后的state，这就是reducer的全部职责。如我们的counter应用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {INCREMENT_COUNTER,DECREMENT_COUNTER} from '../actions';

export default function counter(state = 0, action) {
    switch (action.type){
        case INCREMENT_COUNTER:
            return state+1;
        case DECREMENT_COUNTER:
            return state-1;
        default:
            return state;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> {INCREMENT_COUNTER,DECREMENT_COUNTER} <span class="hljs-keyword">from</span> <span class="hljs-string">'../actions'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">counter</span>(<span class="hljs-params">state = <span class="hljs-number">0</span>, action</span>) </span>{
    <span class="hljs-keyword">switch</span> (action.type){
        <span class="hljs-keyword">case</span> INCREMENT_COUNTER:
            <span class="hljs-keyword">return</span> state+<span class="hljs-number">1</span>;
        <span class="hljs-keyword">case</span> DECREMENT_COUNTER:
            <span class="hljs-keyword">return</span> state<span class="hljs-number">-1</span>;
        <span class="hljs-keyword">default</span>:
            <span class="hljs-keyword">return</span> state;
    }
}</code></pre>
<p>这里我们就是对增和减两个之前在action定义好的常量做了处理。<br>对于一个比较大一点的应用来说，我们是需要将reducer拆分的，最后通过redux提供的combineReducers方法组合到一起。 如此项目上的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const rootReducer = combineReducers({
    counter
});
export default rootReducer;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> rootReducer = combineReducers({
    counter
});
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> rootReducer;</code></pre>
<p>每个<code>reducer</code>只负责管理全局<code>state</code>中它负责的一部分。每个<code>reducer</code>的<code>state</code>参数都不同，分别对应它管理的那部分<code>state</code>数据。<code>combineReducers()</code>所做的只是生成一个函数，这个函数来调用你的一系列<code>reducer</code>，每个<code>reducer</code>根据它们的<code>key</code>来筛选出<code>state</code>中的一部分数据并处理， 然后这个生成的函数再将所有<code>reducer</code>的结果合并成一个大的对象。</p>
<h3 id="articleHeader5">store</h3>
<p>store是对之前说到一个联系和管理。具有如下职责</p>
<ul>
<li>维持应用的<code>state</code>；</li>
<li>提供<code>getState()</code>方法获取 state</li>
<li>提供<code>dispatch(action)</code>方法更新 state；</li>
<li>通过<code>subscribe(listener)</code>注册监听器;</li>
<li>通过<code>subscribe(listener)</code>返回的函数注销监听器。</li>
</ul>
<p>强调一下 Redux 应用只有一个单一的<code>store</code>。当需要拆分数据处理逻辑时，你应该使用<code>reducer</code>组合,而不是创建多个<code>store</code>。<code>store</code>的创建通过<code>redux</code>的<code>createStore</code>方法创建，这个方法还需要传入<code>reducer</code>，很容易理解：毕竟我需要<code>dispatch</code>一个<code>action</code>来改变<code>state</code>嘛。 应用一般会有一个初始化的<code>state</code>，所以可选为第二个参数，这个参数通常是有服务端提供的，传说中的<code>Universal</code>渲染。 第三个参数一般是需要使用的中间件，通过applyMiddleware传入。<br>说了这么多，<code>action</code>，<code>store</code>，<code>actionCreator</code>，<code>reducer</code>关系就是这么如下的简单明了： <br><span class="img-wrap"><img data-src="/img/bVLeW0?w=1134&amp;h=484" src="https://static.alili.tech/img/bVLeW0?w=1134&amp;h=484" alt="redux" title="redux" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader6">结合react-redux的使用</h2>
<p><code>react-redux</code>，<code>redux</code>和<code>react</code>的桥梁工具。<br><code>react-redux</code>将组建分成了两大类，UI组建<code>component</code>和容器组建<code>container</code>。 简单的说，UI组建负责美的呈现，容器组件负责来帮你盛着，给你"力量"。<br>UI 组件有以下几个特征：</p>
<ul>
<li>只负责 UI 的呈现，不带有任何业务逻辑</li>
<li>没有状态（即不使用this.state这个变量）</li>
<li>所有数据都由参数（this.props）提供</li>
<li>不使用任何 Redux 的 API</li>
</ul>
<p>如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class Counter extends Component{
    render(){
        const { counter, increment, decrement, incrementIfOdd, incrementAsync } = this.props;
        return(
            <p>
                Clicked:{counter} times
                <button onClick={increment}>+</button>
                <button onClick={decrement}>-</button>
                <button onClick={incrementIfOdd}>increment if Odd</button>
                <button onClick={incrementAsync}>increment async</button>
            </p>
        )
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Counter</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span></span>{
    render(){
        <span class="hljs-keyword">const</span> { counter, increment, decrement, incrementIfOdd, incrementAsync } = <span class="hljs-keyword">this</span>.props;
        <span class="hljs-keyword">return</span>(
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
                Clicked:{counter} times
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{increment}</span>&gt;</span>+<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{decrement}</span>&gt;</span>-<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{incrementIfOdd}</span>&gt;</span>increment if Odd<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{incrementAsync}</span>&gt;</span>increment async<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
        )
    }
}</code></pre>
<p>容器组件特性则恰恰相反：</p>
<ul>
<li>负责管理数据和业务逻辑，不负责 UI 的呈现</li>
<li>带有内部状态</li>
<li>使用 Redux 的 API</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class App extends Component{
    render(){
        const { counter, increment, decrement, incrementIfOdd, incrementAsync } = this.props;
        return(
            <Counter
                counter={counter}
                increment={increment}
                decrement={decrement}
                incrementIfOdd={incrementIfOdd}
                incrementAsync={incrementAsync}/>
        )
    }
}

export default connect(
    state=>({ counter: state.counter }),
    ActionCreators
)(App);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span></span>{
    render(){
        <span class="hljs-keyword">const</span> { counter, increment, decrement, incrementIfOdd, incrementAsync } = <span class="hljs-keyword">this</span>.props;
        <span class="hljs-keyword">return</span>(
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Counter</span>
                <span class="hljs-attr">counter</span>=<span class="hljs-string">{counter}</span>
                <span class="hljs-attr">increment</span>=<span class="hljs-string">{increment}</span>
                <span class="hljs-attr">decrement</span>=<span class="hljs-string">{decrement}</span>
                <span class="hljs-attr">incrementIfOdd</span>=<span class="hljs-string">{incrementIfOdd}</span>
                <span class="hljs-attr">incrementAsync</span>=<span class="hljs-string">{incrementAsync}/</span>&gt;</span>
        )
    }
}

export default connect(
    state=&gt;({ counter: state.counter }),
    ActionCreators
)(App);</span></code></pre>
<p><code>connect</code>方法接受两个参数：<code>mapStateToProps</code>和<code>mapDispatchToProps</code>。它们定义了UI组件的业务逻辑。前者负责输入逻辑，即将<code>state</code>映射到 UI 组件的参数（props）， 后者负责输出逻辑，即将用户对 UI 组件的操作映射成<code>Action</code>。因为作为组件，我们只要能拿到值，能发出改变值得action就可以了，所以<code>mapStateToProps</code>和<code>mapDispatchToProps</code>正是满足这个需求的。</p>
<h2 id="articleHeader7">redux-thunk</h2>
<p>一个比较流行的redux的action中间件，它可以让<code>actionCreator</code>暂时不返回<code>action</code>对象，而是返回一个函数，函数传递两个参数<code>(dispatch, getState)</code>，在函数体内进行业务逻辑的封装，比如异步操作，我们至少需要触发两个<code>action</code>，这时候我们可以通过<code>redux-thunk</code>将这两个<code>action</code>封装在一起，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fetchDataAction = (querys) => (dispatch, getState) => {
    const setLoading = createAction('SET_LOADING');
    dispatch(setLoading(true)); // 设置加载中。。。
    return fetch(`${url}?${querys}`).then(r => r.json()).then(res => {
        dispatch(setLoading(false)); // 设置取消加载中。。。
        dispatch(createAction('DATA_DO_SOMETHIN')(res))
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> fetchDataAction = <span class="hljs-function">(<span class="hljs-params">querys</span>) =&gt;</span> (dispatch, getState) =&gt; {
    <span class="hljs-keyword">const</span> setLoading = createAction(<span class="hljs-string">'SET_LOADING'</span>);
    dispatch(setLoading(<span class="hljs-literal">true</span>)); <span class="hljs-comment">// 设置加载中。。。</span>
    <span class="hljs-keyword">return</span> fetch(<span class="hljs-string">`<span class="hljs-subst">${url}</span>?<span class="hljs-subst">${querys}</span>`</span>).then(<span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> r.json()).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
        dispatch(setLoading(<span class="hljs-literal">false</span>)); <span class="hljs-comment">// 设置取消加载中。。。</span>
        dispatch(createAction(<span class="hljs-string">'DATA_DO_SOMETHIN'</span>)(res))
    })
}</code></pre>
<p>这里我们的<code>createCreator</code>返回的是一个<code>fetch</code>对象，我们下文会介绍，我们通过<code>dispatch</code>触发改<code>action</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dispatch(fetchDataAction(querys))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">dispatch(fetchDataAction(querys))</code></pre>
<p>在请求数据之前，通过<code>redux-thunk</code>我们可以先触发加载中的<code>action</code>，等请求数据结束之后我们可以在次触发<code>action</code>，使得加载中状态取消，并处理请求结果。</p>
<h2 id="articleHeader8">redux-promise</h2>
<p>既然说到了异步<code>action</code>，我们可以使用<code>redux-promise</code>，它可以让<code>actionCreator</code>返回一个<code>Promise</code>对象。<br>第一种做法，我们可以参考<code>redux-thunk</code>的部分。<br>第二种做法，<code>action</code>对象的<code>payload</code>属性（相当于我们的diy参数，action里面携带的其他参数）是一个<code>Promise</code>对象。这需要从<code>redux-actions</code>模块引入<code>createAction</code>方法，并且写法也要变成下面这样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createAction } from 'redux-actions';
class AsyncApp extends Component {
  componentDidMount() {
    const { dispatch, selectedPost } = this.props
    // 发出异步 Action
    dispatch(createAction(
      'FETCH_DATA', 
      fetch(`url`).then(res => res.json())
    ));
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { createAction } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-actions'</span>;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AsyncApp</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  componentDidMount() {
    <span class="hljs-keyword">const</span> { dispatch, selectedPost } = <span class="hljs-keyword">this</span>.props
    <span class="hljs-comment">// 发出异步 Action</span>
    dispatch(createAction(
      <span class="hljs-string">'FETCH_DATA'</span>, 
      fetch(<span class="hljs-string">`url`</span>).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res.json())
    ));
  }</code></pre>
<p>其实<code>redux-actions</code>的<code>createAction</code>的源码是拿到fetch对象的payload结果之后又触发了一次<code>action</code>。</p>
<h2 id="articleHeader9">redux-actions</h2>
<p>当我们的在开发大型应用的时候，对于大量的<code>action</code>，我们的<code>reducer</code>需要些大量的swich来对<code>action.type</code>进行判断。<code>redux-actions</code>可以简化这一烦琐的过程，它可以是<code>actionCreator</code>，也可以用来生成<code>reducer</code>，其作用都是用来简化<code>action</code>、<code>reducer</code>。<br>主要函数有<code>createAction</code>、<code>createActions</code>、<code>handleAction</code>、<code>handleActions</code>、<code>combineActions</code>。</p>
<h3 id="articleHeader10">createAction</h3>
<p>创建<code>action</code>，参数如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createAction } from 'redux-actions';
createAction(
  type,  // action类型
  payloadCreator = Identity, // payload数据 具体参考Flux教程
  ?metaCreator // 具体我也没深究是啥
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { createAction } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-actions'</span>;
createAction(
  type,  <span class="hljs-comment">// action类型</span>
  payloadCreator = Identity, <span class="hljs-comment">// payload数据 具体参考Flux教程</span>
  ?metaCreator <span class="hljs-comment">// 具体我也没深究是啥</span>
)</code></pre>
<p>例子如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const increment = createAction('INCREMENT')
export const decrement = createAction('DECREMENT')

increment() // { type: 'INCREMENT' }
decrement() // { type: 'DECREMENT' }
increment(10) // { type: 'INCREMENT', payload: 10 }
decrement([1, 42]) // { type: 'DECREMENT', payload: [1, 42] }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> increment = createAction(<span class="hljs-string">'INCREMENT'</span>)
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> decrement = createAction(<span class="hljs-string">'DECREMENT'</span>)

increment() <span class="hljs-comment">// { type: 'INCREMENT' }</span>
decrement() <span class="hljs-comment">// { type: 'DECREMENT' }</span>
increment(<span class="hljs-number">10</span>) <span class="hljs-comment">// { type: 'INCREMENT', payload: 10 }</span>
decrement([<span class="hljs-number">1</span>, <span class="hljs-number">42</span>]) <span class="hljs-comment">// { type: 'DECREMENT', payload: [1, 42] }</span></code></pre>
<h3 id="articleHeader11">createActions</h3>
<p>创建多个<code>action</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createActions } from 'redux-actions';
createActions(
  actionMap,
  ?...identityActions,
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { createActions } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-actions'</span>;
createActions(
  actionMap,
  ?...identityActions,
)</code></pre>
<p>第一个参数<code>actionMap</code>为一个对象，以<code>action type</code>为键值，值value有三种形式，</p>
<ul>
<li>函数，该函数参数传入的是<code>action</code>创建的时候传入的参数，返回结果会作为到生成的<code>action</code>的<code>payload</code>的value。</li>
<li>数组，长度为二，第一个值为一个函数，前面的一样，返回<code>payload</code>的值，第二个值也为一个函数，返回<code>meta</code>的值，不知道有什么用。</li>
<li>一个 <code>actionMap</code>对象，递归作用吧。</li>
</ul>
<p>例子如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="createActions({
  ADD_TODO: todo => ({ todo })
  REMOVE_TODO: [
    todo => ({ todo }), // payloa
    (todo, warn) => ({ todo, warn }) // meta
  ]
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">createActions({
  <span class="hljs-attr">ADD_TODO</span>: <span class="hljs-function"><span class="hljs-params">todo</span> =&gt;</span> ({ todo })
  REMOVE_TODO: [
    <span class="hljs-function"><span class="hljs-params">todo</span> =&gt;</span> ({ todo }), <span class="hljs-comment">// payloa</span>
    (todo, warn) =&gt; ({ todo, warn }) <span class="hljs-comment">// meta</span>
  ]
});</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const actionCreators = createActions({
  APP: {
    COUNTER: {
      INCREMENT: [
        amount => ({ amount }),
        amount => ({ key: 'value', amount })
      ],
      DECREMENT: amount => ({ amount: -amount }),
      SET: undefined // given undefined, the identity function will be used
    },
    NOTIFY: [
      (username, message) => ({ message: `${username}: ${message}` }),
      (username, message) => ({ username, message })
    ]
  }
});

expect(actionCreators.app.counter.increment(1)).to.deep.equal({
  type: 'APP/COUNTER/INCREMENT',
  payload: { amount: 1 },
  meta: { key: 'value', amount: 1 }
});
expect(actionCreators.app.counter.decrement(1)).to.deep.equal({
  type: 'APP/COUNTER/DECREMENT',
  payload: { amount: -1 }
});
expect(actionCreators.app.counter.set(100)).to.deep.equal({
  type: 'APP/COUNTER/SET',
  payload: 100
});
expect(actionCreators.app.notify('yangmillstheory', 'Hello World')).to.deep.equal({
  type: 'APP/NOTIFY',
  payload: { message: 'yangmillstheory: Hello World' },
  meta: { username: 'yangmillstheory', message: 'Hello World' }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> actionCreators = createActions({
  <span class="hljs-attr">APP</span>: {
    <span class="hljs-attr">COUNTER</span>: {
      <span class="hljs-attr">INCREMENT</span>: [
        <span class="hljs-function"><span class="hljs-params">amount</span> =&gt;</span> ({ amount }),
        amount =&gt; ({ <span class="hljs-attr">key</span>: <span class="hljs-string">'value'</span>, amount })
      ],
      <span class="hljs-attr">DECREMENT</span>: <span class="hljs-function"><span class="hljs-params">amount</span> =&gt;</span> ({ <span class="hljs-attr">amount</span>: -amount }),
      <span class="hljs-attr">SET</span>: <span class="hljs-literal">undefined</span> <span class="hljs-comment">// given undefined, the identity function will be used</span>
    },
    <span class="hljs-attr">NOTIFY</span>: [
      <span class="hljs-function">(<span class="hljs-params">username, message</span>) =&gt;</span> ({ <span class="hljs-attr">message</span>: <span class="hljs-string">`<span class="hljs-subst">${username}</span>: <span class="hljs-subst">${message}</span>`</span> }),
      (username, message) =&gt; ({ username, message })
    ]
  }
});

expect(actionCreators.app.counter.increment(<span class="hljs-number">1</span>)).to.deep.equal({
  <span class="hljs-attr">type</span>: <span class="hljs-string">'APP/COUNTER/INCREMENT'</span>,
  <span class="hljs-attr">payload</span>: { <span class="hljs-attr">amount</span>: <span class="hljs-number">1</span> },
  <span class="hljs-attr">meta</span>: { <span class="hljs-attr">key</span>: <span class="hljs-string">'value'</span>, <span class="hljs-attr">amount</span>: <span class="hljs-number">1</span> }
});
expect(actionCreators.app.counter.decrement(<span class="hljs-number">1</span>)).to.deep.equal({
  <span class="hljs-attr">type</span>: <span class="hljs-string">'APP/COUNTER/DECREMENT'</span>,
  <span class="hljs-attr">payload</span>: { <span class="hljs-attr">amount</span>: <span class="hljs-number">-1</span> }
});
expect(actionCreators.app.counter.set(<span class="hljs-number">100</span>)).to.deep.equal({
  <span class="hljs-attr">type</span>: <span class="hljs-string">'APP/COUNTER/SET'</span>,
  <span class="hljs-attr">payload</span>: <span class="hljs-number">100</span>
});
expect(actionCreators.app.notify(<span class="hljs-string">'yangmillstheory'</span>, <span class="hljs-string">'Hello World'</span>)).to.deep.equal({
  <span class="hljs-attr">type</span>: <span class="hljs-string">'APP/NOTIFY'</span>,
  <span class="hljs-attr">payload</span>: { <span class="hljs-attr">message</span>: <span class="hljs-string">'yangmillstheory: Hello World'</span> },
  <span class="hljs-attr">meta</span>: { <span class="hljs-attr">username</span>: <span class="hljs-string">'yangmillstheory'</span>, <span class="hljs-attr">message</span>: <span class="hljs-string">'Hello World'</span> }
});</code></pre>
<p>第二个参数<code>identityActions</code>，可选参数，也是一个<code>action type</code>吧，官方例子没看懂，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { actionOne, actionTwo, actionThree } = createActions({
  // function form; payload creator defined inline
  ACTION_ONE: (key, value) => ({ [key]: value }),

  // array form
  ACTION_TWO: [
    (first) => [first],             // payload
    (first, second) => ({ second }) // meta
  ],

  // trailing action type string form; payload creator is the identity
}, 'ACTION_THREE');

expect(actionOne('key', 1)).to.deep.equal({
  type: 'ACTION_ONE',
  payload: { key: 1 }
});

expect(actionTwo('first', 'second')).to.deep.equal({
  type: 'ACTION_TWO',
  payload: ['first'],
  meta: { second: 'second' }
});

expect(actionThree(3)).to.deep.equal({
  type: 'ACTION_THREE',
  payload: 3,
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> { actionOne, actionTwo, actionThree } = createActions({
  <span class="hljs-comment">// function form; payload creator defined inline</span>
  ACTION_ONE: <span class="hljs-function">(<span class="hljs-params">key, value</span>) =&gt;</span> ({ [key]: value }),

  <span class="hljs-comment">// array form</span>
  ACTION_TWO: [
    <span class="hljs-function">(<span class="hljs-params">first</span>) =&gt;</span> [first],             <span class="hljs-comment">// payload</span>
    (first, second) =&gt; ({ second }) <span class="hljs-comment">// meta</span>
  ],

  <span class="hljs-comment">// trailing action type string form; payload creator is the identity</span>
}, <span class="hljs-string">'ACTION_THREE'</span>);

expect(actionOne(<span class="hljs-string">'key'</span>, <span class="hljs-number">1</span>)).to.deep.equal({
  <span class="hljs-attr">type</span>: <span class="hljs-string">'ACTION_ONE'</span>,
  <span class="hljs-attr">payload</span>: { <span class="hljs-attr">key</span>: <span class="hljs-number">1</span> }
});

expect(actionTwo(<span class="hljs-string">'first'</span>, <span class="hljs-string">'second'</span>)).to.deep.equal({
  <span class="hljs-attr">type</span>: <span class="hljs-string">'ACTION_TWO'</span>,
  <span class="hljs-attr">payload</span>: [<span class="hljs-string">'first'</span>],
  <span class="hljs-attr">meta</span>: { <span class="hljs-attr">second</span>: <span class="hljs-string">'second'</span> }
});

expect(actionThree(<span class="hljs-number">3</span>)).to.deep.equal({
  <span class="hljs-attr">type</span>: <span class="hljs-string">'ACTION_THREE'</span>,
  <span class="hljs-attr">payload</span>: <span class="hljs-number">3</span>,
});</code></pre>
<h3 id="articleHeader12">handleAction</h3>
<p>字面意思理解，处理<code>action</code>，那就是一个<code>reducer</code>，包裹返回一个<code>reducer</code>，处理一种类型的<code>action type</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { handleAction } from 'redux-actions';

handleAction(
  type,  // action类型
  reducer | reducerMap = Identity
  defaultState // 默认state
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { handleAction } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-actions'</span>;

handleAction(
  type,  <span class="hljs-comment">// action类型</span>
  reducer | reducerMap = Identity
  defaultState <span class="hljs-comment">// 默认state</span>
)</code></pre>
<p>当第二个参数为一个reducer处理函数时，形式如下，处理传入的<code>state</code>并返回新的<code>state</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="handleAction('APP/COUNTER/INCREMENT', (state, action) => ({
  counter: state.counter + action.payload.amount,
}), defaultState);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">handleAction(<span class="hljs-string">'APP/COUNTER/INCREMENT'</span>, (state, action) =&gt; ({
  <span class="hljs-attr">counter</span>: state.counter + action.payload.amount,
}), defaultState);</code></pre>
<p>当第二个参数为reducerMap时，也为处理<code>state</code>并返回新的<code>state</code>，只是必须传入key值为<code>next</code>和<code>throw</code>的两个函数，分别用来处理state和异常如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="handleAction('FETCH_DATA', {
  next(state, action) {...},
  throw(state, action) {...},
}, defaultState);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">handleAction(<span class="hljs-string">'FETCH_DATA'</span>, {
  next(state, action) {...},
  <span class="hljs-keyword">throw</span>(state, action) {...},
}, defaultState);</code></pre>
<p>官方推荐使用<code>reducerMap</code>形式，因为与ES6的<code>generator</code>类似。</p>
<h3 id="articleHeader13">handleActions</h3>
<p>与<code>handleAction</code>不同，<code>handleActions</code>可以处理多个<code>action</code>，也返回一个<code>reducer</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { handleActions } from 'redux-actions';

handleActions(
  reducerMap,
  defaultState
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { handleActions } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-actions'</span>;

handleActions(
  reducerMap,
  defaultState
)</code></pre>
<p><code>reducerMap</code>以<code>action type</code>为key，value与<code>handleAction</code>的第二个参数一致，传入一个<code>reducer</code>处理函数或者一个只有<code>next</code>和<code>throw</code>两个键值的对象。<br>另外，键值key也可以使用<code>createAction</code>创建：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createActions, handleActions } from 'redux-actions';

const { increment, decrement } = createActions({
  'INCREMENT': amount => ({ amount: 1 }),
  'DECREMENT': amount => ({ amount: -1 })
});

const reducer = handleActions({
  [increment](state, { payload: { amount } }) {
    return { counter: state.counter + amount }
  },
  [decrement](state, { payload: { amount } }) {
    return { counter: state.counter + amount }
  }
}, defaultState);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { createActions, handleActions } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-actions'</span>;

<span class="hljs-keyword">const</span> { increment, decrement } = createActions({
  <span class="hljs-string">'INCREMENT'</span>: <span class="hljs-function"><span class="hljs-params">amount</span> =&gt;</span> ({ <span class="hljs-attr">amount</span>: <span class="hljs-number">1</span> }),
  <span class="hljs-string">'DECREMENT'</span>: <span class="hljs-function"><span class="hljs-params">amount</span> =&gt;</span> ({ <span class="hljs-attr">amount</span>: <span class="hljs-number">-1</span> })
});

<span class="hljs-keyword">const</span> reducer = handleActions({
  [increment](state, { <span class="hljs-attr">payload</span>: { amount } }) {
    <span class="hljs-keyword">return</span> { <span class="hljs-attr">counter</span>: state.counter + amount }
  },
  [decrement](state, { <span class="hljs-attr">payload</span>: { amount } }) {
    <span class="hljs-keyword">return</span> { <span class="hljs-attr">counter</span>: state.counter + amount }
  }
}, defaultState);</code></pre>
<h3 id="articleHeader14">combineActions</h3>
<p>将多个<code>action</code>或者<code>actionCreator</code>结合起来，看起来很少用，具体例子如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { increment, decrement } = createActions({
  INCREMENT: amount => ({ amount }),
  DECREMENT: amount => ({ amount: -amount })
});

const reducer = handleActions({
  [combineActions(increment, decrement)](state, { payload: { amount } }) {
    return { ...state, counter: state.counter + amount };
  }
}, { counter: 10 });

expect(reducer({ counter: 5 }, increment(5))).to.deep.equal({ counter: 10 });
expect(reducer({ counter: 5 }, decrement(5))).to.deep.equal({ counter: 0 });
expect(reducer({ counter: 5 }, { type: 'NOT_TYPE', payload: 1000 })).to.equal({ counter: 5 });
expect(reducer(undefined, increment(5))).to.deep.equal({ counter: 15 });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> { increment, decrement } = createActions({
  <span class="hljs-attr">INCREMENT</span>: <span class="hljs-function"><span class="hljs-params">amount</span> =&gt;</span> ({ amount }),
  <span class="hljs-attr">DECREMENT</span>: <span class="hljs-function"><span class="hljs-params">amount</span> =&gt;</span> ({ <span class="hljs-attr">amount</span>: -amount })
});

<span class="hljs-keyword">const</span> reducer = handleActions({
  [combineActions(increment, decrement)](state, { <span class="hljs-attr">payload</span>: { amount } }) {
    <span class="hljs-keyword">return</span> { ...state, <span class="hljs-attr">counter</span>: state.counter + amount };
  }
}, { <span class="hljs-attr">counter</span>: <span class="hljs-number">10</span> });

expect(reducer({ <span class="hljs-attr">counter</span>: <span class="hljs-number">5</span> }, increment(<span class="hljs-number">5</span>))).to.deep.equal({ <span class="hljs-attr">counter</span>: <span class="hljs-number">10</span> });
expect(reducer({ <span class="hljs-attr">counter</span>: <span class="hljs-number">5</span> }, decrement(<span class="hljs-number">5</span>))).to.deep.equal({ <span class="hljs-attr">counter</span>: <span class="hljs-number">0</span> });
expect(reducer({ <span class="hljs-attr">counter</span>: <span class="hljs-number">5</span> }, { <span class="hljs-attr">type</span>: <span class="hljs-string">'NOT_TYPE'</span>, <span class="hljs-attr">payload</span>: <span class="hljs-number">1000</span> })).to.equal({ <span class="hljs-attr">counter</span>: <span class="hljs-number">5</span> });
expect(reducer(<span class="hljs-literal">undefined</span>, increment(<span class="hljs-number">5</span>))).to.deep.equal({ <span class="hljs-attr">counter</span>: <span class="hljs-number">15</span> });</code></pre>
<p><code>redux-actions</code>说到这里，大概是这样，有什么不了解看看<a href="https://redux-actions.js.org" rel="nofollow noreferrer" target="_blank">官方文档</a>吧。</p>
<h2 id="articleHeader15">reselect</h2>
<p><code>Reselect</code>用来记忆<code>selectors</code>的库，我们定义的<code>selectors</code>是作为函数获取<code>state</code>的某一部分。使用记忆能力，我们可以组织不必要的衍生数据的重渲染和计算过程，由此加速了我们的应用。具体细节大概是在<code>mapStateToProps</code>的时候，讲<code>state</code>的某一部分交给<code>reselect</code>的<code>selectors</code>来管理，使用<code>selectors</code>的记忆功能让组件的<code>props</code>尽量不变化，引起不必要的渲染。<br>下面我们以一个todolist为例子。<br>当我们没有<code>reselect</code>的时候，我们是直接通过<code>mapStateToProps</code>把数据传入组件内，如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
  }
}

const mapStateToProps = (state, props) => {
  return {
    todolist: getVisibleTodos(state, props)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> getVisibleTodos = <span class="hljs-function">(<span class="hljs-params">todos, filter</span>) =&gt;</span> {
  <span class="hljs-keyword">switch</span> (filter) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">'SHOW_ALL'</span>:
      <span class="hljs-keyword">return</span> todos
    <span class="hljs-keyword">case</span> <span class="hljs-string">'SHOW_COMPLETED'</span>:
      <span class="hljs-keyword">return</span> todos.filter(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> t.completed)
    <span class="hljs-keyword">case</span> <span class="hljs-string">'SHOW_ACTIVE'</span>:
      <span class="hljs-keyword">return</span> todos.filter(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> !t.completed)
  }
}

<span class="hljs-keyword">const</span> mapStateToProps = <span class="hljs-function">(<span class="hljs-params">state, props</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">todolist</span>: getVisibleTodos(state, props)
  }
}</code></pre>
<p>这个代码有一个潜在的问题。每当<code>state tree</code>改变时，<code>selector</code>都要重新运行。当<code>state tree</code>特别大，或者<code>selector</code>计算特别耗时，那么这将带来严重的运行效率问题。为了解决这个问题，reselect为<code>selector</code>设置了缓存，只有当<code>selector</code>的输入改变时，程序才重新调用selector函数。<br>这时我们把<code>state</code>转化为<code>props</code>的数据交给<code>reselect来</code>处理，我们重写<code>mapStateToProps</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const getVisibilityFilter = state => state.todo.showStatus

const getTodos = state => state.todo.todolist

const getVisibleTodos = createSelector([getVisibilityFilter, getTodos], (visibilityFilter, todos) => {
  switch (visibilityFilter) {
    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(todo => !todo.completed)
    default:
      return todos
  }
})
const mapStateToProps = (state, props) => {
  const todolist = getVisibleTodos(state, props);
  return {
    todolist
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> getVisibilityFilter = <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.todo.showStatus

<span class="hljs-keyword">const</span> getTodos = <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.todo.todolist

<span class="hljs-keyword">const</span> getVisibleTodos = createSelector([getVisibilityFilter, getTodos], (visibilityFilter, todos) =&gt; {
  <span class="hljs-keyword">switch</span> (visibilityFilter) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">'SHOW_COMPLETED'</span>:
      <span class="hljs-keyword">return</span> todos.filter(<span class="hljs-function"><span class="hljs-params">todo</span> =&gt;</span> todo.completed)
    <span class="hljs-keyword">case</span> <span class="hljs-string">'SHOW_ACTIVE'</span>:
      <span class="hljs-keyword">return</span> todos.filter(<span class="hljs-function"><span class="hljs-params">todo</span> =&gt;</span> !todo.completed)
    <span class="hljs-keyword">default</span>:
      <span class="hljs-keyword">return</span> todos
  }
})
<span class="hljs-keyword">const</span> mapStateToProps = <span class="hljs-function">(<span class="hljs-params">state, props</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> todolist = getVisibleTodos(state, props);
  <span class="hljs-keyword">return</span> {
    todolist
  }
}</code></pre>
<p>我们使用<code>createSelector</code>包裹起来，将组件内需要的两个<code>props</code>包裹起来，然后在返回一个获取数据的函数<code>getVisibleTodos</code>，这样返回的<code>todolist</code>就不会受到一些不必要的state的变化而变化引起冲渲染。</p>
<h2 id="articleHeader16">最后</h2>
<p>总结了那么多的用法，其实也是<code>redux</code>的基本用法，然后自己写了半天的<code>todolist</code>，把上面说到的技术都用了，这是 <a href="https://github.com/yacan8/react-redux-todo" rel="nofollow noreferrer" target="_blank">github地址</a>，上面的内容如有错误，勿喷，毕竟入门级别。。。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
redux从零开始入门笔记

## 原文链接
[https://segmentfault.com/a/1190000013026224](https://segmentfault.com/a/1190000013026224)

