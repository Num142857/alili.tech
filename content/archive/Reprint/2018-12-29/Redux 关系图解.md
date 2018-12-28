---
title: 'Redux 关系图解' 
date: 2018-12-29 2:30:10
hidden: true
slug: wulult6nif
categories: [reprint]
---

{{< raw >}}

                    
<p><code>Redux</code>是一款状态管理库，并且提供了<code>react-redux</code>库来与<code>React</code>亲密配合， 但是总是傻傻分不清楚这2者提供的<code>API</code>和相应的关系。这篇文章就来理一理。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011473976?w=1149&amp;h=554" src="https://static.alili.tech/img/remote/1460000011473976?w=1149&amp;h=554" alt="关系图" title="关系图"></span></p>
<h2>Redux</h2>
<h3>Redux 三大核心</h3>
<p><code>Redux</code>的核心由三部分组成：<code>Store</code>, <code>Action</code>, <code>Reducer</code>。</p>
<ul>
<li>
<code>Store</code> : 是个对象，贯穿你整个应用的数据都应该存储在这里。</li>
<li>
<code>Action</code>： 是个对象，必须包含<code>type</code>这个属性，<code>reducer</code>将根据这个属性值来对<code>store</code>进行相应的处理。除此之外的属性，就是进行这个操作需要的数据。</li>
<li>
<code>Reducer</code>:  是个函数。接受两个参数：要修改的数据(state) 和 <code>action</code>对象。根据<code>action.type</code>来决定采用的操作，对<code>state</code>进行修改，最后返回新的<code>state</code>。</li>
</ul>
<pre><code>===== Store =====
{
  todos: [],
  visibilityFilter: 'SHOW_ALL'
}


===== Action =====
{
  type: 'ADD_TODO',
  text: 'Build my first Redux app'
}

===== Reducer =====
const todos = (state = [], action) =&gt; {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    default:
      return state
  }
}</code></pre>
<h3>Redux核心之间的关系</h3>
<p>在上一部分，我们提到了，我们<code>触发action</code>  → <code>reducer来处理</code>。这就是二者之间的关系。那么我们怎么触发<code>action</code>呢?<code>Store</code>这个对象提供了<code>dispatch方法</code>  → <code>触发action</code>。<code>dispatch</code>方法接受<code>action</code>对象作为参数。因此，我们可以了解三者之间的关系：</p>
<pre><code>`store`  ➡️  `dispatch`  ➡️   `action`  ⬅️  `reducer`</code></pre>
<h3>Store</h3>
<p>我们通过<code>redux</code>提供的<code>createStore</code>这个方法来创建一个<code>Store</code>。它接受对<code>store</code>进行处理的<code>reducer</code>作为参数。</p>
<p><code>Store</code>有三个方法：</p>
<ul>
<li>
<code>getState</code>：用来获取<code>store</code>里面存储的数据。</li>
<li>
<code>dispatch</code>: <code>store</code>里的数据不能直接修改，只能通过触发<code>action</code>来进行修改，这个方法就是用来触发<code>action</code>。</li>
<li>
<code>subscibe</code>：订阅<code>store</code>改变时，要进行的操作。比如在<code>react</code>中，当<code>store</code>改变时，我们需要调用<code>render</code>方法对视图进行更新。</li>
</ul>
<pre><code>const store = createStore(reducer);

store.getState(); // { todos: [], visibilityFilter: 'SHOW_ALL' }

store.dispatch({
  type: 'ADD_TODO',
  text: 'Build my first Redux app'
});

store.subscibe(() =&gt; {
  console.log(store.getState());
});</code></pre>
<h3>Reducer</h3>
<p>我们可以将对<code>store</code>的操作，写在一个<code>reducer</code>中，比如：</p>
<pre><code>function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    case ADD_TODO:
    case TOGGLE_TODO:
      return Object.assign({}, state, {
        todos: todos(state.todos, action)
      })
    default:
      return state
  }
}</code></pre>
<p>可以看到这个<code>reducer</code>对<code>store</code>的<code>visibilityFilter</code>和<code>todos</code>的两部分数据进行了处理。随着应用的复杂，如果我们把对所有数据的处理，都写在一个<code>reducer</code>中，那么它会变得很冗杂。如果我们将对每一部分的数据的处理，写在一个单独的<code>reducer</code>中，它接受该部分的数据作为<code>state</code>。那么整个<code>reducer</code>会变得整洁和清晰。</p>
<p>因此，<code>redux</code>为我们提供了<code>combineReducer</code>这个<code>API</code>，帮助我们分开书写<code>reducer</code>， 并且最终把这些<code>reducer</code>给集合到一个根<code>reducer</code>中。</p>
<pre><code>// 对todos进行处理
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    default:
      return state
  }
}

// 对 visibilityFilter 进行处理
function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

// 生成 root reducer
function todoApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  }
}

// 创建store
const store = createStore(todoApp)</code></pre>
<h2>react-redux</h2>
<p>上一部分我们介绍了<code>redux</code>的核心。可以看到，<code>redux</code>是独立的应用状态管理工具。它是可以独立于<code>react</code>之外的。如果我们需要在<code>react</code>当中运用它，那么我们需要手动订阅<code>store</code>的状态变化，来对我们的<code>react</code>组件进行更新。那么<code>react-reudx</code>这个工具，就帮我们实现了这个功能，我们只需对<code>store</code>进行处理，<code>react</code>组件就会有相应的变化。</p>
<p>这个工具主要提供两个<code>API</code>：</p>
<h3><code>connect</code></h3>
<p>现在我们有了<code>store</code>，那么我们怎么才能在我们的组件中对它们进行操作呢？<code>connect</code>就为提供了这个功能。它接受<code>mapStateToProps</code>, <code>mapDispatchToProps</code>等作为参数。比如在我的<code>TodoList</code>这个组件中需要用到<code>todos</code>这部分数据，那么我完善<code>mapStateToProps</code>这个函数，它接受<code>store</code>中的<code>state</code>作为参数，返回一个对象，属性就是<code>state</code>中我们需要的数据：</p>
<pre><code>const mapStateToProps = state =&gt; {
  return {
    todos: state.todos
  }
}</code></pre>
<p><code>mapStateToProps</code>就将我们的<code>state</code>转换为了<code>props</code>对象。</p>
<p>同样的，我们可能需要在组件中对<code>state</code>进行处理。<code>mapDispatchToProps</code>就是帮助我们在组件中通过<code>props</code>调用<code>dispatch</code>来触发<code>action</code>的：</p>
<pre><code>const mapDispatchToProps = dispatch =&gt; {
  return {
    onTodoClick: id =&gt; {
      dispatch(toggleTodo(id))
    }
  }
}</code></pre>
<p>最后我们调用<code>connect</code>这个方法，将<code>mapStateToProps</code>， <code>mapDispatchToProps</code>生成的<code>props</code>注入到需要使用它的组`中：</p>
<pre><code>const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)</code></pre>
<p>这样，我们在<code>TodoList</code>这个组件中，就能直接通过<code>props.todos</code>获取到<code>todos</code>中的数据， 通过<code>props.onTodoClick</code>对<code>todos</code>进行处理。</p>
<h3><code>provider</code></h3>
<p>上面我们调用<code>connect</code>时，在<code>mapStateToProps</code> 和 <code>mapDispatchToProps</code>我们分别用到了<code>store</code>的<code>state</code>和<code>dispatch</code>。但是在组件中的<code>store</code>是哪里凭空冒出来的呢？</p>
<p><code>provider</code>就是来解决这个事的。<code>Provider</code>使它的子孙在调用<code>connect</code>方法时，都能获取到<code>store</code>。</p>
<pre><code>const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

const App = () =&gt; (
  &lt;div&gt;
    &lt;AddTodo /&gt;
    &lt;VisibleTodoList /&gt;
    &lt;Footer /&gt;
  &lt;/div&gt;
)

&lt;Provider store={store}&gt;
  &lt;App /&gt;
&lt;/Provider&gt;</code></pre>
<p>这样，<code>Provider</code>的子孙组件都能在调用<code>connect</code>时获取到<code>store</code>。</p>
<h2>总结</h2>
<ul>
<li>
<p>Redux: <code>store</code>,  <code>action</code>,  <code>reducer</code></p>
<ul>
<li>
<code>store</code>: <code>getState</code>, <code>dispatch</code>,  <code>subscribe</code>
</li>
<li><code>combineReducers</code></li>
<li><code>createStore</code></li>
<li>
<code>store</code>  ➡️  <code>dispatch</code>  ➡️   <code>action</code>  ⬅️  <code>reducer</code>
</li>
</ul>
</li>
<li>
<p>react-redux:</p>
<ul>
<li>
<code>connect</code>: 将<code>store</code>作为<code>props</code>注入</li>
<li>
<code>Provider</code>: 使<code>store</code>在子孙组件的<code>connect</code>中能够获取到。</li>
</ul>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Redux 关系图解

## 原文链接
[https://segmentfault.com/a/1190000011473973](https://segmentfault.com/a/1190000011473973)

