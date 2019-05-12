---
title: 'Redux概念之二: Redux的三大原则' 
date: 2019-01-27 2:31:00
hidden: true
slug: 9gngp6sg77
categories: [reprint]
---

{{< raw >}}

                    
<p>Redux里的强硬规则与设计不少，大部份都会与FP(函数式程序开发)、改进原本的Flux架构设计有关。Redux官网文档上的三大基本原则，主要是因为有可能怕初学者不理解Redux中的一些限制或设计，所以先写出来说明，这里面也说明了Redux的设计原理基础是如何，所以强烈建议所有的初学者一定要彻底地理解这三大原则中的意义，多看几遍，对日后的学习会很有帮助。以下分别说明，主要以原文的标题与内容说明，尽可以说明的比较清楚些。</p>
<h2 id="articleHeader0">单一真相来源</h2>
<blockquote><p>你的整个应用中的state(状态)，会存储在单一个store(存储)之中的一个对象树状结构里。</p></blockquote>
<p>Redux中只有用单一个对象大树结构来的存储整个应用的状态，也就是整个应用中会用到的数据，称之为<code>store</code>(存储)。但要注意的是<code>store</code>(存储)并不是只有单纯的数据而已。<code>store</code>就是应用程序领域的状态，它是类型MVC中的Model(模型的)设计的概念，这设计是由Flux架构而来的，在原本的Flux架构中是允许多个<code>store</code>的结构，Redux简化为只有单一个。</p>
<p>Redux的单一个store的设计有一些好处，对开发者来说，它可以容易调试与观察状态的变化，状态存储于对象树状结构中，也很容易作到重作/复原(Undo/Redo)的功能。因为只有一个<code>store</code>，但如果<code>store</code>里要储放多个不同的状态对象，以及每次的更动数据，自然就会变成了对象树状结构(object tree)。</p>
<p>此外，如果你想要从store中取出目前的状态数据，可以用store的<code>getState()</code>方法。</p>
<h2 id="articleHeader1">状态是唯读的</h2>
<blockquote><p>唯一能更动状态的是发送一个<code>action</code>(动作)，<code>action</code>是一个描述"发生了什么事"的纯对象</p></blockquote>
<p>这里指的"状态"，是上面说的储放在store中的状态数据，你"不能直接"对其中的状态数据更动，只能"间接"地作这事。这与原先的React中的<code>state</code>与<code>setState</code>的概念有点像，Redux的意思是你不能直接更动<code>store</code>里面所记录的状态值，只能"间接"地透过发送<code>action</code>对象来叫<code>store</code>更动状态。"间接"地更动状态是一个很关键的设计，这是Flux中单向数据流的重点之一，这对于每个动作发生，最终会影响到什么状态上的更动，一个接一个的顺序等等的一种严格的设计。</p>
<p>你可能会认为"状态既然是唯读"，直接与间接有什么差异，"唯读"不就代表完全不能更动，这语句是不是有误？</p>
<p>"唯读"当然就是完全不能更动的意思没错，所以状态对象的更动是并不是在原先的状态对象上变动它，而是由原先状态对象因为动作的加入后，产生一个全新的状态对象，用这全新的状态对象来取代原先的状态对象而已。这在真实世界中或许很难拿比喻来说明，但在软体世界中这很可以很容易达成。</p>
<p>"发生了什么事"这句，是代表每个<code>action</code>都会有一个type(类型)，代表这个动作是要作什么用的，或是现在是发生了什么，例如是要新建一笔什么数据，或是删除整个数据等等，动作对象除了要说明它是要作什么之外，也需要包含所影响的数据。</p>
<p>发送一个action(动作)，使用的是<code>store.dispatch(action)</code>语法样式，下面这个例子就是一个要更动状态的代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="store.dispatch({
  type: 'COMPLETE_TODO',
  index: 1
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">store.dispatch({
  <span class="hljs-attr">type</span>: <span class="hljs-string">'COMPLETE_TODO'</span>,
  <span class="hljs-attr">index</span>: <span class="hljs-number">1</span>
})</code></pre>
<p>中间的那个纯对象，就叫作<code>action</code>(动作)，它是一个单纯用于描述发生了什么事与相关数据的纯对象:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  type: 'COMPLETE_TODO',
  index: 1
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-attr">type</span>: <span class="hljs-string">'COMPLETE_TODO'</span>,
  <span class="hljs-attr">index</span>: <span class="hljs-number">1</span>
}</code></pre>
<p>还记得我们在React中的<code>state</code>与<code>setState</code>方法的设计吗？<code>state</code>也是不能直接更动的，一定要透过<code>setState</code>方法才能更动它。那这是为什么呢？因为<code>setState</code>不光只是更动<code>state</code>值，它还要作重新渲染的动作，React需要比对目前的状态，与即将要变动的状态，这样才能进移动新渲染的工作。Redux的设计中<code>store</code>是与React中的<code>state</code>相比，它们之间有一些类似的设计。</p>
<h2 id="articleHeader2">更动只能由纯函数来进行</h2>
<blockquote><p>要指示状态树要如何依actions(动作)来作改变，你需要撰写纯粹的归纳函数(reducers)</p></blockquote>
<p>Redux中的reducer的原型会长得像下面这样，你可以把它当作就是 <code>之前的状态 + 动作 = 新的状态</code> 的公式:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(previousState, action) => newState" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">(previousState, action) =&gt; newState</code></pre>
<blockquote><p>注: 你可以参考Redux中<a href="http://redux.js.org/docs/basics/Reducers.html" rel="nofollow noreferrer" target="_blank">Reducers</a>这一章的内容，里面有实例。</p></blockquote>
<p>不过，Redux中的reducer一定是纯函数(pure function)，也就是不能有副作用的函数。因此由reducer所产生的新状态，并不是直接修改之前的状态而来，而是一个复制之前状态，然后加上动作改变的部份，产生的一个新的对象，它这样设计是有原因的。</p>
<p>Redux的store设计，并不是原本Flux架构中的store，而是<a href="https://facebook.github.io/flux/docs/flux-utils.html#reducestore-t" rel="nofollow noreferrer" target="_blank">ReduceStore</a>，这个ReduceStore是一个在Flux中的<code>store</code>进化版本，在说明中它有一个叫作reduce的方法，说明如下:</p>
<blockquote><p>reduce(state: T, action: Object): T 归纳(Reduces)目前的state(状态)与一个action(动作)到新的store中的state(状态)。所有的子类都需要实作这个方法。这个方法必须是纯粹而是无副作用。</p></blockquote>
<p>那为何要用这个进化的ReduceStore？它最后有说明一段:</p>
<blockquote><p>不需要发送更动事件注意所有继承自ReduceStore的store，不需要手动发送在reduce()中的更动事件...state(状态)会自动地比对在每个dispatch(发送)之前与之后，与自动地作发送更动事件...</p></blockquote>
<p><code>ReduceStore</code>的设计与Redux最一开始的版本差不多是同时间发布的，在开发者之间彼此有交流。Redux的store运用了类似于ReduceStore的设计，所以要更动Redux中的store，需要透过reducer，这是为了简化原本在Flux数据流的实作流程。</p>
<p>reducer在Redux中扮演了十分重要的关键角色，它是一种对store中所存放的状态，要如何因应不同的动作而进行刷新的函数，而store也是由reducer所创建，例如像下面的代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// @Reducer
//
// action payload = action.text
// 使用纯粹函数的数组unshift，不能有副作用
// state(状态)一开始的值是空数组`state=[]`
function todoApp(state = [], action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return [action.text, ...state]
    default:
      return state
  }
}

// @Store
//
// 由reducer创建store
const store = createStore(todoApp)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// @Reducer</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// action payload = action.text</span>
<span class="hljs-comment">// 使用纯粹函数的数组unshift，不能有副作用</span>
<span class="hljs-comment">// state(状态)一开始的值是空数组`state=[]`</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">todoApp</span>(<span class="hljs-params">state = [], action</span>) </span>{
  <span class="hljs-keyword">switch</span> (action.type) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">'ADD_ITEM'</span>:
      <span class="hljs-keyword">return</span> [action.text, ...state]
    <span class="hljs-keyword">default</span>:
      <span class="hljs-keyword">return</span> state
  }
}

<span class="hljs-comment">// @Store</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// 由reducer创建store</span>
<span class="hljs-keyword">const</span> store = createStore(todoApp)</code></pre>
<p>针对应用中不同功能的状态，可以分别写出不同的reducer，Redux中提供了<code>combineReducers</code>函数可以合并多个reducer，例如以下的代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([ action.text ])
    default:
      return state
  }
}

function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

// rootReducer是个组合过的函数，
// 这里用的是对象属性初始设置简写法，
// combineReducers传参是一个对象
const rootReducer = combineReducers({
  todos,
  counter
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">todos</span>(<span class="hljs-params">state = [], action</span>) </span>{
  <span class="hljs-keyword">switch</span> (action.type) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">'ADD_TODO'</span>:
      <span class="hljs-keyword">return</span> state.concat([ action.text ])
    <span class="hljs-keyword">default</span>:
      <span class="hljs-keyword">return</span> state
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">counter</span>(<span class="hljs-params">state = <span class="hljs-number">0</span>, action</span>) </span>{
  <span class="hljs-keyword">switch</span> (action.type) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">'INCREMENT'</span>:
      <span class="hljs-keyword">return</span> state + <span class="hljs-number">1</span>
    <span class="hljs-keyword">case</span> <span class="hljs-string">'DECREMENT'</span>:
      <span class="hljs-keyword">return</span> state - <span class="hljs-number">1</span>
    <span class="hljs-keyword">default</span>:
      <span class="hljs-keyword">return</span> state
  }
}

<span class="hljs-comment">// rootReducer是个组合过的函数，</span>
<span class="hljs-comment">// 这里用的是对象属性初始设置简写法，</span>
<span class="hljs-comment">// combineReducers传参是一个对象</span>
<span class="hljs-keyword">const</span> rootReducer = combineReducers({
  todos,
  counter
})</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Redux概念之二: Redux的三大原则

## 原文链接
[https://segmentfault.com/a/1190000008209999](https://segmentfault.com/a/1190000008209999)

