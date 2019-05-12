---
title: 'Redux 入坑笔记' 
date: 2019-02-12 2:30:12
hidden: true
slug: q6rl37s7v5
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>Redux 简要的说就是一个事件分发器和全局<code>state</code>控制台。</p></blockquote>
<p>Redux 有一个全局的<code>state</code>，通过将根组件包进<code>Provider</code>，将<code>store</code>分发给所有的子组件，而子组件通过<code>connect</code>方法，获取<code>dispatch</code>事件分发函数，以及需要的<code>props</code>(如果有需要也可以通过<code>connect</code>传入想分发给子组件的<code>action</code>)</p>
<h3 id="articleHeader0">定义常量、state和Action</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Reducer/ConstValue.js
export const ADD_NEW = 'add_new';
export const INCREASE = 'increase';
export const DECREASE = 'decrease';
export const DELETE = 'delete';
export INITIAL_STATE = {
    objList: [
        {
            number: 0
        }
    ]
};

// Reducer/ActionCreator.js
import {
    ADD_NEW,
    DELETE
    INCREASE,
    DECREASE
} from './ConstValue';

export function addNew(obj) {
    return {
        type: ADD_NEW,
        obj
    }
}

export function delete(index) {
    return {
        type: DELETE,
        index
    }
}

export function increase(number, index) {
    return {
        type: INCREASE,
        number,
        index
    }
}

export function decrease(number, index) {
    return {
        type: DECREASE,
        number,
        index
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// Reducer/ConstValue.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> ADD_NEW = <span class="hljs-string">'add_new'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> INCREASE = <span class="hljs-string">'increase'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> DECREASE = <span class="hljs-string">'decrease'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> DELETE = <span class="hljs-string">'delete'</span>;
<span class="hljs-keyword">export</span> INITIAL_STATE = {
    objList: [
        {
            <span class="hljs-built_in">number</span>: <span class="hljs-number">0</span>
        }
    ]
};

<span class="hljs-comment">// Reducer/ActionCreator.js</span>
<span class="hljs-keyword">import</span> {
    ADD_NEW,
    DELETE
    INCREASE,
    DECREASE
} <span class="hljs-keyword">from</span> <span class="hljs-string">'./ConstValue'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addNew</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-keyword">type</span>: ADD_NEW,
        obj
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">delete</span>(<span class="hljs-params">index</span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-keyword">type</span>: DELETE,
        index
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">increase</span>(<span class="hljs-params"><span class="hljs-built_in">number</span>, index</span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-keyword">type</span>: INCREASE,
        <span class="hljs-built_in">number</span>,
        index
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">decrease</span>(<span class="hljs-params"><span class="hljs-built_in">number</span>, index</span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-keyword">type</span>: DECREASE,
        <span class="hljs-built_in">number</span>,
        index
    }
}
</code></pre>
<h3 id="articleHeader1">定义Reducer</h3>
<blockquote><p>Reducer 会注册给 store,用于处理 action 事件</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Reducer/Reducers.js
import {
    ADD_NEW,
    DELETE
    INCREASE,
    DECREASE,
    INITIAL_STATE
} from './ConstValue';

let objList = INITIAL_STATE.objList;

export function objList(state=objList, action) {
    switch (action.type) {
        case ADD_NEW:
            return [...state, action.obj];
        case DELETE:
            return [...state.slice(0, action.index),
                ...state.slice(action.index + 1)
            ];
        case INCREASE:
        case DECREASE:
            return [...state.slice(0, action.index),
                Object.assign({}, state[action.index], {number: number(state[action.index].number, action)}),
                ...state.slice(action.index + 1)
            ];
        default:
            return state;
    }
}

export function number(state=objList[0].number, action) {
    switch (action.type) {
        case INCREASE:
            return state + action.number;
        case DECREASE:
            return state - action.number;
        default:
            return state;
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>// Reducer/Reducers.js
import {
    ADD_NEW,
    DELETE
    INCREASE,
    DECREASE,
    INITIAL_STATE
} <span class="hljs-keyword">from</span> './ConstValue';

let objList = INITIAL_STATE.objList;

export function objList(<span class="hljs-keyword">state</span>=objList, action) {
    switch (action.type) {
        case ADD_NEW:
            return [...<span class="hljs-keyword">state</span>, action.obj];
        case DELETE:
            return [...<span class="hljs-keyword">state</span>.slice(<span class="hljs-number">0</span>, action.index),
                ...<span class="hljs-keyword">state</span>.slice(action.index + <span class="hljs-number">1</span>)
            ];
        case INCREASE:
        case DECREASE:
            return [...<span class="hljs-keyword">state</span>.slice(<span class="hljs-number">0</span>, action.index),
                Object.assign({}, <span class="hljs-keyword">state</span>[action.index], {number: number(<span class="hljs-keyword">state</span>[action.index].number, action)}),
                ...<span class="hljs-keyword">state</span>.slice(action.index + <span class="hljs-number">1</span>)
            ];
        <span class="hljs-keyword">default</span>:
            return <span class="hljs-keyword">state</span>;
    }
}

export function number(<span class="hljs-keyword">state</span>=objList[<span class="hljs-number">0</span>].number, action) {
    switch (action.type) {
        case INCREASE:
            return <span class="hljs-keyword">state</span> + action.number;
        case DECREASE:
            return <span class="hljs-keyword">state</span> - action.number;
        <span class="hljs-keyword">default</span>:
            return <span class="hljs-keyword">state</span>;
    }
}
</code></pre>
<p><strong>IMPORTANT</strong></p>
<p>Reducer 传入(state, action), 通过判断<code>action</code>的<code>type</code>, 进行事件分发处理。当事件很多的时候可以把 Reducer 拆分, 最后通过<code>combineReducers</code>进行组合。</p>
<p>每个 Reducer 都要有明确的返回值,当<code>siwtch</code>到<code>default</code>的时候则返回传入的<code>state</code>本身。在处理<code>state</code>的时候，不要在原有参数上修改, 而应该返回一个新的参数, 例如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return Object.assign({}, state[0], {number: action.number});
// 通过Object.assign获取一份state[0]的拷贝, 并修改state[0]中的number数据

return [...state, action.obj];
// 通过[...XXX]得到一个新的数组, 并在最后加入action.obj
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>return Object.assign({}, <span class="hljs-keyword">state</span>[<span class="hljs-number">0</span>], {number: action.number});
// 通过Object.assign获取一份<span class="hljs-keyword">state</span>[<span class="hljs-number">0</span>]的拷贝, 并修改<span class="hljs-keyword">state</span>[<span class="hljs-number">0</span>]中的number数据

return [...<span class="hljs-keyword">state</span>, action.obj];
// 通过[...XXX]得到一个新的数组, 并在最后加入action.obj
</code></pre>
<h3 id="articleHeader2">combineReducers</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Reducer/index.js
import { combineReducers } from 'redux';

import * as appReducers from './Reducers';

export const AppReducer = combineReducers(appReducers);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// Reducer/index.js</span>
<span class="hljs-keyword">import</span> { combineReducers } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;

<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> appReducers <span class="hljs-keyword">from</span> <span class="hljs-string">'./Reducers'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> AppReducer = combineReducers(appReducers);
</code></pre>
<p>上述代码中, 通过<code>import * as appReducers</code>导出全部的 Reducer, 之后利用<code>combineReducers</code>黑魔法快速的组合 Reducer </p>
<p><strong>黑魔法发动条件</strong></p>
<p>每个 Reducer 的名称, 必须与它获取的 state 参数名称一样, 例如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function objList(state=objList, action){}

export function number(state=objList[0].number, action){}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>export function objList(<span class="hljs-keyword">state</span>=objList, action){}

export function number(<span class="hljs-keyword">state</span>=objList[<span class="hljs-number">0</span>].number, action){}
</code></pre>
<p>如果你任性的不想那么写, 那么就要:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Reducer/Reducers.js
export function reducerA(state=objList, action){}
export function reducerB(state=objList[0].number, action){}

// Reducer/index.js
import { combineReducers } from 'redux';
import {
    reducerA
    reducerB,
} from './Reducers';

export function AppReducer(state, action) {
    return {
        objList: reducerA(state.objList, action),
        number: reducerB(state.objList[0].number, action)
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>// Reducer/Reducers.js
export function reducerA(<span class="hljs-keyword">state</span>=objList, action){}
export function reducerB(<span class="hljs-keyword">state</span>=objList[<span class="hljs-number">0</span>].number, action){}

// Reducer/index.js
import { combineReducers } <span class="hljs-keyword">from</span> 'redux';
import {
    reducerA
    reducerB,
} <span class="hljs-keyword">from</span> './Reducers';

export function AppReducer(<span class="hljs-keyword">state</span>, action) {
    return {
        objList: reducerA(<span class="hljs-keyword">state</span>.objList, action),
        number: reducerB(<span class="hljs-keyword">state</span>.objList[<span class="hljs-number">0</span>].number, action)
    }
}
</code></pre>
<h3 id="articleHeader3">注入到React</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 安装React绑定库
sudo npm install --save react-redux
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code><span class="hljs-comment">// 安装React绑定库</span>
sudo npm install --<span class="hljs-keyword">save</span> react-redux
</code></pre>
<p>在根组件上, 通过<code>Provider</code>注入store</p>
<p><strong>只有一个Store</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// App/index.js
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {
  AppReducer
} from '../Reducer/index';
import RootComponent from './RootComponent';

let appStore = createStore(AppReducer);

render(
  <Provider store={appStore}>
    <RootComponent />
  </Provider>,
    document.getElementById('index_body')
);

// App/RootComponent.js
import ContentComponent from './ContentComponent';

class RootComponent extends Component {
    render() {
        return (
            <div>
                <ContentComponent />
            <div>
        )
    }
}

export default ContentComponent;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// App/index.js</span>
<span class="hljs-keyword">import</span> { Provider } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>;
<span class="hljs-keyword">import</span> { createStore } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;
<span class="hljs-keyword">import</span> {
  AppReducer
} <span class="hljs-keyword">from</span> <span class="hljs-string">'../Reducer/index'</span>;
<span class="hljs-keyword">import</span> RootComponent <span class="hljs-keyword">from</span> <span class="hljs-string">'./RootComponent'</span>;

<span class="hljs-keyword">let</span> appStore = createStore(AppReducer);

render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Provider</span> <span class="hljs-attr">store</span>=<span class="hljs-string">{appStore}</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">RootComponent</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Provider</span>&gt;</span></span>,
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'index_body'</span>)
);

<span class="hljs-comment">// App/RootComponent.js</span>
<span class="hljs-keyword">import</span> ContentComponent <span class="hljs-keyword">from</span> <span class="hljs-string">'./ContentComponent'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">RootComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (
            &lt;div&gt;
                &lt;ContentComponent /&gt;
            &lt;div&gt;
        )
    }
}

export default ContentComponent;
</code></pre>
<p>注入<code>store</code>后, 根组件所有的组件都可以获取到<code>dispatch</code>函数, 以便进行<code>action</code>的分发处理</p>
<h3 id="articleHeader4">子组价获取props和dispatch</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// App/ContentComponent.js
import {
    increase,
    decrease
} from '../Reducer/ActionCreator';

class ContentComponent extends Component {
    render() {
        const {obj, increaseNumber, decreaseNumber}
        return (
            <div>
                <span 
                  onClick={() => {
                      increaseNumber(1);
                  "}}">加一</span>
                <span>{obj.number}</span>
                <span
                  onClick={() => {
                      decreaseNumber(1);
                  "}}">减一</span>
            </div>
        )
    }
}

// 定义props筛选函数, 以state作为传入参数, 选出需要注入该组件作为props的state. 不是必须, 不写则state作为props全部注入
const mapStateToProps = (state) => {
    return {
        obj: state.objList[0]
        // objList: state.objList 
        // 本来想写list增删逻辑的但是太懒了暂时搁浅..
    }
}

// 定义action筛选函数, 以dispatch作为传入参数, 选出需要注入该组件需要使用的action. 不是必须
const mapDispatchToProps = (dispatch) => {
    return {
        increaseNumber: (number) => {
            dispatch(increase(number));
        },
        decreaseNumber: (number) => {
            dispatch(decrease(number));
        }
    }
}

import { connect } from 'react-redux';
export default connect(mapStateToProps, mapDispatchToProps)(ContentComponent);
// 不使用筛选函数的时候:
// export default connect(mapStateToProps)(ContentComponent);
// export default connect()(ContentComponent);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// App/ContentComponent.js</span>
<span class="hljs-keyword">import</span> {
    increase,
    decrease
} <span class="hljs-keyword">from</span> <span class="hljs-string">'../Reducer/ActionCreator'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ContentComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">const</span> {obj, increaseNumber, decreaseNumber}
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> 
                  <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> {
                      increaseNumber(1);
                  "}}"&gt;加一<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{obj.number}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span>
                  <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> {
                      decreaseNumber(1);
                  "}}"&gt;减一<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}

<span class="hljs-comment">// 定义props筛选函数, 以state作为传入参数, 选出需要注入该组件作为props的state. 不是必须, 不写则state作为props全部注入</span>
<span class="hljs-keyword">const</span> mapStateToProps = <span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">obj</span>: state.objList[<span class="hljs-number">0</span>]
        <span class="hljs-comment">// objList: state.objList </span>
        <span class="hljs-comment">// 本来想写list增删逻辑的但是太懒了暂时搁浅..</span>
    }
}

<span class="hljs-comment">// 定义action筛选函数, 以dispatch作为传入参数, 选出需要注入该组件需要使用的action. 不是必须</span>
<span class="hljs-keyword">const</span> mapDispatchToProps = <span class="hljs-function">(<span class="hljs-params">dispatch</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">increaseNumber</span>: <span class="hljs-function">(<span class="hljs-params">number</span>) =&gt;</span> {
            dispatch(increase(number));
        },
        <span class="hljs-attr">decreaseNumber</span>: <span class="hljs-function">(<span class="hljs-params">number</span>) =&gt;</span> {
            dispatch(decrease(number));
        }
    }
}

<span class="hljs-keyword">import</span> { connect } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> connect(mapStateToProps, mapDispatchToProps)(ContentComponent);
<span class="hljs-comment">// 不使用筛选函数的时候:</span>
<span class="hljs-comment">// export default connect(mapStateToProps)(ContentComponent);</span>
<span class="hljs-comment">// export default connect()(ContentComponent);</span>
</code></pre>
<p>在通过<code>connect</code>进行注入的时候, <code>dispatch</code>已经作为组件的 props 而存在了。所以当需要传入的事件很多, 感觉写<code>mapDispatchToProps</code>很繁琐的时候, 还有另外一种写法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// App/ContentComponent.js
import {
    increase,
    decrease
} from '../Reducer/ActionCreator';

class ContentComponent extends Component {
    render() {
        const {obj, dispatch}
        return (
            <div>
                <span 
                  onClick={() => {
                      dispatch(increaseNumber(1));
                  "}}">加一</span>
                <span>{obj.number}</span>
                <span
                  onClick={() => {
                      dispatch(decreaseNumber(1));
                  "}}">减一</span>
            </div>
        )
    }
}

import { connect } from 'react-redux';
export default connect(mapStateToProps)(ContentComponent);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// App/ContentComponent.js</span>
<span class="hljs-keyword">import</span> {
    increase,
    decrease
} <span class="hljs-keyword">from</span> <span class="hljs-string">'../Reducer/ActionCreator'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ContentComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">const</span> {obj, dispatch}
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> 
                  <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> {
                      dispatch(increaseNumber(1));
                  "}}"&gt;加一<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{obj.number}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span>
                  <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> {
                      dispatch(decreaseNumber(1));
                  "}}"&gt;减一<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}

<span class="hljs-keyword">import</span> { connect } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> connect(mapStateToProps)(ContentComponent);
</code></pre>
<h3 id="articleHeader5">优劣势</h3>
<h4>优势</h4>
<p>通过 Redux, 我们可以少些很多繁琐的事件传输。在 Redux 之前, 顶层组件处理 state 的改变, 而触发的事件则有可能需要层层传递给底层的子组件, 子组件触发之后再次层层回调传到顶层。</p>
<p>但 Redux 的 state 是全局的, 不必关心哪个组件触发<code>setState()</code>函数, 只需要设定好<code>action</code>和处理 action 的<code>reducer</code>, 由<code>store</code>进行分发处理。</p>
<p>那样的话, 我们可以在底层触发 state 的改变而不必担心向上调用 --- 触发的 action 改变将被 store 监听, dispatch 给 reducer, reducer通过判断<code>action.type</code>, 做出适当的反应处理 state</p>
<h4>劣势</h4>
<ul>
<li><p>action 很多很繁琐</p></li>
<li><p>一开始的架构很重要，否则后期改动不易</p></li>
<li><p>淡化了传统React的组件传输事件与props的思想, 可能一开始不易理解</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Redux 入坑笔记

## 原文链接
[https://segmentfault.com/a/1190000004804937](https://segmentfault.com/a/1190000004804937)

