---
title: 'React系列---Redux高阶运用' 
date: 2019-01-08 2:30:11
hidden: true
slug: f6fgcyt1lb
categories: [reprint]
---

{{< raw >}}

                    
<p>参考资料：《深入React技术栈》</p>
<hr>
<h1 id="articleHeader0">高阶reducer</h1>
<blockquote>高阶函数是指将函数作为参数或返回值的函数，高阶reducer就是指将reducer作为参数或返回值的函数。</blockquote>
<p>在Redux架构中，reducer是一个纯函数，它的职责是根据previousState和action计算出新的state。在复杂应用中，Redux提供的combineReducers让我们可以把顶层的reducer拆分成多个小的reducer，分别独立地操作state树的不同部分。而在一个应用中，很多小粒度的reducer往往有很多重复的逻辑，那么对于这些reducer，如何抽取公共逻辑，减少代码冗余呢？这种情况下，使用高阶reducer是一种较好的解决方案。</p>
<h2 id="articleHeader1">reducer复用</h2>
<p>我们将顶层的reduce拆分成多个小的reducer，肯定会碰到reducer复用问题。例如有A和B两个模块，它们的UI部分相似，此时可以通过配置不同的props来区别它们。那么这种情况下，A和B模块能不能共用一个reducer呢？答案是否定的。我们先来看一个简单reducer：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const LOAD_DATA = 'LOAD_DATA';
const initialState = { ... };

function loadData() {
    return {
        type: LOAD_DATA,
        ...
    };
}

function reducer(state = initialState, action) {
    switch(action.type) {
        case LOAD_DATA:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>const LOAD_DATA = 'LOAD_DATA';
const initialState = { ... };

function <span class="hljs-built_in">load</span>Data() {
    return {
        type: LOAD_DATA,
        ...
    };
}

function reducer(<span class="hljs-keyword">state</span> = initialState, action) {
    switch(action.type) {
        case LOAD_DATA:
            return {
                ...<span class="hljs-keyword">state</span>,
                data: action.payload
            };
        <span class="hljs-keyword">default</span>:
            return <span class="hljs-keyword">state</span>;
    }
}</code></pre>
<p>如果我们将这个reducer绑定到A和B两个不同模块，造成的问题将会是，当A模块调用loadData来分发相应的action时，A和B的reducer都会处理这个action，然后A和B的内容就完全一致了。</p>
<p>这里我们必需意识到，在一个应用中，不同模块间的actionType必须是全局唯一的。</p>
<p>因此，要解决actionType唯一的问题，还有一个方法就是通过添加前缀的方式来做到：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function generateReducer(prefix, state) {
    const LOAD_DATA = prefix + 'LOAD_DATA';
    
    const initialState = { ...state, ...};
    
    return function reducer(state = initialState, action) {
        switch(action.type) {
            case LOAD_DATA:
                return {
                    ...state,
                    data: action.payload
                };
            default:
                return state;
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>function generateReducer(prefix, <span class="hljs-keyword">state</span>) {
    const LOAD_DATA = prefix + 'LOAD_DATA';
    
    const initialState = { ...<span class="hljs-keyword">state</span>, ...};
    
    return function reducer(<span class="hljs-keyword">state</span> = initialState, action) {
        switch(action.type) {
            case LOAD_DATA:
                return {
                    ...<span class="hljs-keyword">state</span>,
                    data: action.payload
                };
            <span class="hljs-keyword">default</span>:
                return <span class="hljs-keyword">state</span>;
        }
    }
}</code></pre>
<p>这样只要A和B模块分别调用generateReducer来生成相应的reducer，就能解决reducer复用的问题了。而对于prefix，我们可以根据自己的项目结构来决定，例如${页面名称}_${模块名称}。只要能够保证全局唯一性，就可以写成一种前缀。</p>
<h2 id="articleHeader2">reducer增强</h2>
<p>除了解决复用问题，高阶reducer的另一个重要作用就是对原始的reducer进行增强。redux-undo就是典型的利用高阶reducer来增强reducer的例子，它主要作用是使任意reducer变成可以执行撤销和重做的全新reducer。我们来看看它的核心代码实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function undoable(reducer) {
    const initialState = {
        // 记录过去的state
        past: [],
        // 以一个空的action调用reducer来产生当前值的初始值
        present: reducer(undefined, {}),
        // 记录后续的state
        future: []
    };
    
    return function(state = initialState, action) {
        const { past, present, future } = state;
        
        switch(action.type) {
            case '@@redux-undo/UNDO':
                const previous = past[past.length - 1];
                const newPast = past.slice(0, past.length - 1);
                
                return {
                    past: newPast,
                    present: previous,
                    future: [ present, ...future ]
                };
            case '@@redux-undo/REDO':
                const next = future[0];
                const newFuture = future.slice(1);
                
                return {
                    past: [ ...past, present ],
                    present: next,
                    future: newFuture
                };
            default:
                // 将其他action委托给原始的reducer处理
                const newPresent = reducer(present, action);
                
                if(present === newPresent) {
                    return state;
                }
                
                return {
                    past: [ ...past, present ],
                    present: newPresent,
                    future: []
                };
        }
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">undoable</span><span class="hljs-params">(reducer)</span> </span>{
    <span class="hljs-keyword">const</span> initialState = {
        <span class="hljs-comment">// 记录过去的state</span>
        past: [],
        <span class="hljs-comment">// 以一个空的action调用reducer来产生当前值的初始值</span>
        present: reducer(<span class="hljs-literal">undefined</span>, {}),
        <span class="hljs-comment">// 记录后续的state</span>
        future: []
    };
    
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(state = initialState, action)</span> </span>{
        <span class="hljs-keyword">const</span> { past, present, future } = state;
        
        <span class="hljs-keyword">switch</span>(action.type) {
            <span class="hljs-keyword">case</span> <span class="hljs-string">'@@redux-undo/UNDO'</span>:
                <span class="hljs-keyword">const</span> previous = past[past.length - <span class="hljs-number">1</span>];
                <span class="hljs-keyword">const</span> newPast = past.slice(<span class="hljs-number">0</span>, past.length - <span class="hljs-number">1</span>);
                
                <span class="hljs-keyword">return</span> {
                    past: newPast,
                    present: previous,
                    future: [ present, ...future ]
                };
            <span class="hljs-keyword">case</span> <span class="hljs-string">'@@redux-undo/REDO'</span>:
                <span class="hljs-keyword">const</span> next = future[<span class="hljs-number">0</span>];
                <span class="hljs-keyword">const</span> newFuture = future.slice(<span class="hljs-number">1</span>);
                
                <span class="hljs-keyword">return</span> {
                    past: [ ...past, present ],
                    present: next,
                    future: newFuture
                };
            <span class="hljs-keyword">default</span>:
                <span class="hljs-comment">// 将其他action委托给原始的reducer处理</span>
                <span class="hljs-keyword">const</span> newPresent = reducer(present, action);
                
                <span class="hljs-keyword">if</span>(present === newPresent) {
                    <span class="hljs-keyword">return</span> state;
                }
                
                <span class="hljs-keyword">return</span> {
                    past: [ ...past, present ],
                    present: newPresent,
                    future: []
                };
        }
    };
}</code></pre>
<p>有了这高阶reducer，就可以对任意一个reducer进行封装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createStore } from 'redux';

function todos(state = [], action) {
    switch(action.type) {
        case: 'ADD_TODO':
        // ...
    }
}

const undoableTodos = undoable(todos);
const store = createStore(undoableTodos);

store.dispatch({
    type: 'ADD_TODO',
    text: 'Use Redux'
});

store.dispatch({
    type: 'ADD_TODO',
    text: 'Implement Undo'
});

store.dispatch({
    type: '@@redux-undo/UNDO'
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>import { createStore } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;

function todos(state = [], <span class="hljs-built_in">action</span>) {
    <span class="hljs-keyword">switch</span>(<span class="hljs-built_in">action</span>.<span class="hljs-built_in">type</span>) {
        <span class="hljs-keyword">case</span>: <span class="hljs-string">'ADD_TODO'</span>:
        <span class="hljs-comment">// ...</span>
    }
}

const undoableTodos = undoable(todos);
const store = createStore(undoableTodos);

store.dispatch({
    <span class="hljs-built_in">type</span>: <span class="hljs-string">'ADD_TODO'</span>,
    <span class="hljs-built_in">text</span>: <span class="hljs-string">'Use Redux'</span>
});

store.dispatch({
    <span class="hljs-built_in">type</span>: <span class="hljs-string">'ADD_TODO'</span>,
    <span class="hljs-built_in">text</span>: <span class="hljs-string">'Implement Undo'</span>
});

store.dispatch({
    <span class="hljs-built_in">type</span>: <span class="hljs-string">'@@redux-undo/UNDO'</span>
});</code></pre>
<p>查看高阶reducer undoable的实现代码可以发现，高阶reducer主要通过下面3点来增强reducer：</p>
<ul>
<li>能够处理额外的action;</li>
<li>能够维护更多的state;</li>
<li>将不能处理的action委托给原始reducer处理。</li>
</ul>
<h1 id="articleHeader3">Redux与表单</h1>
<p>React单向绑定的特性极大地提升了应用的执行效率，但是相比于简单易用的双向绑定，单向绑定在处理表单等交互的时候着实有些力不从心。具体到React应用中，单向绑定意味着你需要手动给每个表单控件提供onChange回调函数，同时需要将它们的状态初始化在this.state中。不仅如此，一个体验友好的表单还需要有明确的错误状态和错误信息，甚至某些输入项还需要异步校验功能。也就是说，表单里的一个有效字段至少需要2~3个本地状态。</p>
<p>在Angular.js中，表单相关的问题在框架层面已经得到了很好的解决。那么，对于React+Redux应用，有没有什么好的方案呢？</p>
<p>下面我们从两个层面来解答这个问题：对于简单的表单应用，为了减少重复冗余的代码，可以使用redux-form-utils这个工具库，它能利用高阶组件的特性为表单的每个字段提供value和onChange等必须值，而无需你手动创建；对于复杂的表单，则可以利用redux-form。虽然同样基于高阶组件的原理，但如果说redux-form-utils是一把水果刀的话，那么redux-form就是一把多功能的瑞士军刀。除了提供表单必须的字段外，redux-form还能实现表单同步验证、异步验证甚至嵌套表单等复杂功能。</p>
<h2 id="articleHeader4">使用redux-form-utils减少创建表单的冗余代码</h2>
<p>了解redux-form-utils之前，先来看看如何使用原生React处理表单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);
        
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangeGender = this.handleChangeGender.bind(this);
        
        this.state = {
            name: '',
            address: '',
            gender: ''
        };
    }
    
    handleChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }
    
    handleChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }
    
    handleChangeGender(e) {
        this.setState({
            gender: e.target.value
        });
    }
    
    render() {
        const { name, address, gender } = this.state;
        return (
            <form className=&quot;form&quot;>
              <input name=&quot;name&quot; value={name} onChange={this.handleChangeName} />
              <input name=&quot;address&quot; value={address} onChange={this.handleChangeAddress} />
              <select name=&quot;gender&quot; value={gender} onChange={this.handleChangeGender}>    
                <option value=&quot;male&quot; />
                <option value=&quot;female&quot; />
              </select>
            </form>
        );
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">import</span> React, { Component } from <span class="hljs-string">'react'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Form</span> <span class="hljs-title">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        
        <span class="hljs-keyword">this</span>.handleChangeAddress = <span class="hljs-keyword">this</span>.handleChangeAddress.bind(<span class="hljs-keyword">this</span>);
        <span class="hljs-keyword">this</span>.handleChangeGender = <span class="hljs-keyword">this</span>.handleChangeGender.bind(<span class="hljs-keyword">this</span>);
        
        <span class="hljs-keyword">this</span>.state = {
            name: <span class="hljs-string">''</span>,
            address: <span class="hljs-string">''</span>,
            gender: <span class="hljs-string">''</span>
        };
    }
    
    handleChangeName(e) {
        <span class="hljs-keyword">this</span>.setState({
            name: e.target.value
        });
    }
    
    handleChangeAddress(e) {
        <span class="hljs-keyword">this</span>.setState({
            address: e.target.value
        });
    }
    
    handleChangeGender(e) {
        <span class="hljs-keyword">this</span>.setState({
            gender: e.target.value
        });
    }
    
    render() {
        const { name, address, gender } = <span class="hljs-keyword">this</span>.state;
        <span class="hljs-keyword">return</span> (
            &lt;form className=<span class="hljs-string">"form"</span>&gt;
              &lt;input name=<span class="hljs-string">"name"</span> value={name} onChange={<span class="hljs-keyword">this</span>.handleChangeName} /&gt;
              &lt;input name=<span class="hljs-string">"address"</span> value={address} onChange={<span class="hljs-keyword">this</span>.handleChangeAddress} /&gt;
              &lt;select name=<span class="hljs-string">"gender"</span> value={gender} onChange={<span class="hljs-keyword">this</span>.handleChangeGender}&gt;    
                &lt;option value=<span class="hljs-string">"male"</span> /&gt;
                &lt;option value=<span class="hljs-string">"female"</span> /&gt;
              &lt;/select&gt;
            &lt;/form&gt;
        );
    };
}</code></pre>
<p>可以看到，虽然我们的表单里只有3个字段，但是已经有非常多的冗余代码。如果还需要加上验证等功能，那么这个表单对应的处理代码将会更加膨胀。</p>
<p>仔细分析表单的代码实现，我们发现几乎所有的onChange处理器逻辑都很类似，只是需要改变表单字段即可。对于某些复杂的输入控件，比如自己封装了一个TimePicker组件，也许回调名称不是onChange，而是onSelect。同样，onSelect回调里提供的参数也许并不是React的合成事件，而是一个具体的值。通过分析表单控件可能的输入和输出，我们将通过使用redux-form-utils减少Redux处理表单应用时的冗余代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// components/MyForm.js
import React, { Component } from 'react';
import { createForm } from 'redux-form-utils';

@createForm({
    form: 'my-form',
    fields: ['name', 'address', 'gender']
})

class Form extends Component {
    render(){
        const { name, address, gender } = this.props.fields;
        return (
          <form className=&quot;form&quot;>
            <input name=&quot;name&quot; value={...name} />
            <input name=&quot;address&quot; value={...address} />
            <select {...gender}>    
              <option value=&quot;male&quot; />
              <option value=&quot;female&quot; />
            </select>
          </form>
        );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-comment">// components/MyForm.js</span>
<span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t';
<span class="hljs-keyword">import</span> { createForm } from <span class="hljs-symbol">'redux</span>-form-utils';

<span class="hljs-meta">@createForm</span>({
    form: <span class="hljs-symbol">'my</span>-form',
    fields: [<span class="hljs-symbol">'nam</span>e', <span class="hljs-symbol">'addres</span>s', <span class="hljs-symbol">'gende</span>r']
})

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Form</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render(){
        const { name, address, gender } = <span class="hljs-keyword">this</span>.props.fields;
        <span class="hljs-keyword">return</span> (
          &lt;form className=<span class="hljs-string">"form"</span>&gt;
            &lt;input name=<span class="hljs-string">"name"</span> value={...name} /&gt;
            &lt;input name=<span class="hljs-string">"address"</span> value={...address} /&gt;
            &lt;select {...gender}&gt;    
              &lt;option value=<span class="hljs-string">"male"</span> /&gt;
              &lt;option value=<span class="hljs-string">"female"</span> /&gt;
            &lt;/select&gt;
          &lt;/form&gt;
        );
    }
}</code></pre>
<p>可以看到，实现同样功能的表单，代码量减少了近一半以上。</p>
<p>redux-form-utils提供了两个方便的工具函数---createForm(config)和bindRedux(config)，前者可以当作decorate使用，传入表单的配置，自动为被装饰的组件添加表单相关的props；而后者可以生成与Redux应用相关的reducer、initialState和actionCreator等。</p>
<p>下面先看看如何在reducer里整合redux-form-utils：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// reducer/MyForm.js
import { bindRedux } from 'redux-form-utils';

const { state: formState, reducer: formReducer } = bindRedux({
    form: 'my-form',
    fields: ['name', 'address', 'gender'],
});

const initialState = {
    foo: 1,
    bar: 2,
    ...formState
};

function myReducer(state = initialState, action) {
    switch(action.type) {
        case 'MY_ACTION': {
            // ...
        }
        
        default:
            return formReducer(state, action);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// reducer/MyForm.js</span>
<span class="hljs-keyword">import</span> { bindRedux } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-form-utils'</span>;

<span class="hljs-keyword">const</span> { <span class="hljs-attr">state</span>: formState, <span class="hljs-attr">reducer</span>: formReducer } = bindRedux({
    <span class="hljs-attr">form</span>: <span class="hljs-string">'my-form'</span>,
    <span class="hljs-attr">fields</span>: [<span class="hljs-string">'name'</span>, <span class="hljs-string">'address'</span>, <span class="hljs-string">'gender'</span>],
});

<span class="hljs-keyword">const</span> initialState = {
    <span class="hljs-attr">foo</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">bar</span>: <span class="hljs-number">2</span>,
    ...formState
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myReducer</span>(<span class="hljs-params">state = initialState, action</span>) </span>{
    <span class="hljs-keyword">switch</span>(action.type) {
        <span class="hljs-keyword">case</span> <span class="hljs-string">'MY_ACTION'</span>: {
            <span class="hljs-comment">// ...</span>
        }
        
        <span class="hljs-keyword">default</span>:
            <span class="hljs-keyword">return</span> formReducer(state, action);
    }
}</code></pre>
<p>我们把同样的配置传给bindRedux方法，并获得这个表单对应的reducer和初始状态formState，并将这些内容整合在reducer中。</p>
<p>完成createForm和bindRedux这两个函数后，一个基于Redux的表单应用就完成了。为了后续修改表单更加灵活，建议将配置文件单独保存，并分别在组件和reducer中引入对应的配置文件。</p>
<h2 id="articleHeader5">使用redux-form完成表单异步验证</h2>
<p>redux-form-utils为我们提供了实现表单最基本的功能，但是为了填写表单的体验更加友好，在把数据提交到服务端之前，我们应该做一些基本的表单校验，比如填写字段不能为空等。要实现校验等复杂的表单功能，需要用到redux-form。</p>
<p>在使用和配置方面，redux-form与redux-form-utils没有太多的差异，唯一不同的是redux-form需要在Redux应用的state树中挂载一个独立的节点。这意味着，所有使用redux-form创建的表单中的字段都会在一个固定的位置，如state.form.myForm或state.form.myOtherForm均挂载在state.form下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const reducers = {
    // 其他的reducer...
    // 所有表单相关的reducer挂载在form下
    form: formReducer
};

const reducer = combineReducers(reducers);
const store = createStore(reducer);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { createStore, combineReducers } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;
<span class="hljs-keyword">import</span> { reducer <span class="hljs-keyword">as</span> formReducer } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-form'</span>;

<span class="hljs-keyword">const</span> reducers = {
    <span class="hljs-comment">// 其他的reducer...</span>
    <span class="hljs-comment">// 所有表单相关的reducer挂载在form下</span>
    form: formReducer
};

<span class="hljs-keyword">const</span> reducer = combineReducers(reducers);
<span class="hljs-keyword">const</span> store = createStore(reducer);</code></pre>
<p>完成了基本的配置后，现在看看redux-form如何帮我们完成表单验证功能：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

function validate(values) {
    if(values.name == null || values.name === '') {
        return {
            name: '请填写名称'
        };
    }
}

@reduxForm({
    form: 'my-form',
    fields: ['name', 'address', 'gender'],
    validate
});

class Form extends Component {
    render(){
        const { name, address, gender } = this.props.fields;
        return (
          <form className=&quot;form&quot;>
            <input name=&quot;name&quot; value={...name} />
            { name.error &amp;&amp; <span>{name.error}</span> }
            <input name=&quot;address&quot; value={...address} />
            <select {...gender}>    
              <option value=&quot;male&quot; />
              <option value=&quot;female&quot; />
            </select>
            <button type=&quot;submit&quot;>提交</button>
          </form>
        );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t';
<span class="hljs-keyword">import</span> { reduxForm } from <span class="hljs-symbol">'redux</span>-form';

function validate(values) {
    <span class="hljs-keyword">if</span>(values.name == <span class="hljs-literal">null</span> || values.name === '') {
        <span class="hljs-keyword">return</span> {
            name: '请填写名称'
        };
    }
}

<span class="hljs-meta">@reduxForm</span>({
    form: <span class="hljs-symbol">'my</span>-form',
    fields: [<span class="hljs-symbol">'nam</span>e', <span class="hljs-symbol">'addres</span>s', <span class="hljs-symbol">'gende</span>r'],
    validate
});

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Form</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render(){
        const { name, address, gender } = <span class="hljs-keyword">this</span>.props.fields;
        <span class="hljs-keyword">return</span> (
          &lt;form className=<span class="hljs-string">"form"</span>&gt;
            &lt;input name=<span class="hljs-string">"name"</span> value={...name} /&gt;
            { name.error &amp;&amp; &lt;span&gt;{name.error}&lt;/span&gt; }
            &lt;input name=<span class="hljs-string">"address"</span> value={...address} /&gt;
            &lt;select {...gender}&gt;    
              &lt;option value=<span class="hljs-string">"male"</span> /&gt;
              &lt;option value=<span class="hljs-string">"female"</span> /&gt;
            &lt;/select&gt;
            &lt;button <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"submit"</span>&gt;提交&lt;/button&gt;
          &lt;/form&gt;
        );
    }
}</code></pre>
<p>在上面的表单中，我们在提交时对name字段做了非空验证，而在Form组件的render方法中，同时添加了显示相应错误的逻辑。触发验证、重新渲染、表单纯洁性判断等过程，均被redux-form进行了封装，对使用者透明。</p>
<p>可以看到，使用redux-form校验表单十分简单易用，从很大程度上填补了Redux应用在框架层面处理表单应用的不足。</p>
<hr>
<p>参考资料：《深入React技术栈》</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React系列---Redux高阶运用

## 原文链接
[https://segmentfault.com/a/1190000010205508](https://segmentfault.com/a/1190000010205508)

