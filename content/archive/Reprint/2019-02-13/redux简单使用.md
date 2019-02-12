---
title: 'redux简单使用' 
date: 2019-02-13 2:31:22
hidden: true
slug: wseedpzouaa
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>在react火热的年代，flux作为fb提出的最适合react的数据模型，时下有非常多的实现。<br>而redux作为在众多的flux地实现中脱颖而出，及其精简的代码，却能带来实用的功能，正好自己的项目中要用，所以让我们来分析redux</p></blockquote>
<p>为什么要写这个文档呢，因为我看官方文档各种看不懂啊，琢磨了半天都不理解，最后是去看了源码才看明白<br>因为他的一些概念没搞清楚的话，就不知道他的文档在说什么。为了不让更多的人掉坑里面，这里稍微解释一些概念。</p>
<p>学习redux需要知道redux的三个部分：</p>
<ol>
<li><p>action</p></li>
<li><p>reducer</p></li>
<li><p>store</p></li>
</ol>
<h3 id="articleHeader0">action</h3>
<p>redux中得action就是你自己定义的一个动作，什么是动作？你可以理解为用户的动作你做出的反应，最简单地例子就是当你进行分页的时候，<br>跳到特定的页数这个动作。我们可以通过类似如下的代码定义action：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
 * action types
 */
 
export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

/*
 * action creators
 */

export function addTodo(text) {
  return { type: ADD_TODO, text };
}

export function completeTodo(index) {
  return { type: COMPLETE_TODO, index };
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*
 * action types
 */</span>
 
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> ADD_TODO = <span class="hljs-string">'ADD_TODO'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> COMPLETE_TODO = <span class="hljs-string">'COMPLETE_TODO'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> SET_VISIBILITY_FILTER = <span class="hljs-string">'SET_VISIBILITY_FILTER'</span>;

<span class="hljs-comment">/*
 * other constants
 */</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> VisibilityFilters = {
  <span class="hljs-attr">SHOW_ALL</span>: <span class="hljs-string">'SHOW_ALL'</span>,
  <span class="hljs-attr">SHOW_COMPLETED</span>: <span class="hljs-string">'SHOW_COMPLETED'</span>,
  <span class="hljs-attr">SHOW_ACTIVE</span>: <span class="hljs-string">'SHOW_ACTIVE'</span>
};

<span class="hljs-comment">/*
 * action creators
 */</span>

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addTodo</span>(<span class="hljs-params">text</span>) </span>{
  <span class="hljs-keyword">return</span> { <span class="hljs-attr">type</span>: ADD_TODO, text };
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">completeTodo</span>(<span class="hljs-params">index</span>) </span>{
  <span class="hljs-keyword">return</span> { <span class="hljs-attr">type</span>: COMPLETE_TODO, index };
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setVisibilityFilter</span>(<span class="hljs-params">filter</span>) </span>{
  <span class="hljs-keyword">return</span> { <span class="hljs-attr">type</span>: SET_VISIBILITY_FILTER, filter };
}</code></pre>
<p>在这里定义action之后用来出发的，通过<code>dispatch</code>方法来触发动作，在这里action只是一些常亮的定义。<br><code>dispatch</code>方法接收的参数是一个<code>object</code>，而且<code>object</code>必须包含一个<code>type</code>属性，告诉我们需要执行的操作。<br>而对象里面的包含的其他属性则可以在执行动作的时候用作其他用途。</p>
<p><code>dispatch</code>方法是会在store连接组件的时候随着组件的props传递到各个组件的，所以组件内都是可以用的。</p>
<h3 id="articleHeader1">reducer</h3>
<p>这是在redux里面提出来的概念，具体啥含义请参考官网，因为我也解释不清楚╮(╯▽╰)╭</p>
<p>reducer在这里是核心，因为redux是只有一个store的，所以整个app的状态和数据都存储在一个store里面，<br>如果所有状态变化都在store里面进行逻辑操作，那么这个store肯定是无法维护的，所以在这里我们把状态的变化放到了reducer里面。<br>我们先来看一下如何定义一个reducer：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { combineReducers } from 'redux';
import { ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions';
const { SHOW_ALL } = VisibilityFilters;

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
  case SET_VISIBILITY_FILTER:
    return action.filter;
  default:
    return state;
  }
}

function todos(state = [], action) {
  switch (action.type) {
  case ADD_TODO:
    return [...state, {
      text: action.text,
      completed: false
    }];
  case COMPLETE_TODO:
    return [
      ...state.slice(0, action.index),
      Object.assign({}, state[action.index], {
        completed: true
      }),
      ...state.slice(action.index + 1)
    ];
  default:
    return state;
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos
});

export default todoApp;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { combineReducers } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;
<span class="hljs-keyword">import</span> { ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } <span class="hljs-keyword">from</span> <span class="hljs-string">'./actions'</span>;
<span class="hljs-keyword">const</span> { SHOW_ALL } = VisibilityFilters;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">visibilityFilter</span>(<span class="hljs-params">state = SHOW_ALL, action</span>) </span>{
  <span class="hljs-keyword">switch</span> (action.type) {
  <span class="hljs-keyword">case</span> SET_VISIBILITY_FILTER:
    <span class="hljs-keyword">return</span> action.filter;
  <span class="hljs-keyword">default</span>:
    <span class="hljs-keyword">return</span> state;
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">todos</span>(<span class="hljs-params">state = [], action</span>) </span>{
  <span class="hljs-keyword">switch</span> (action.type) {
  <span class="hljs-keyword">case</span> ADD_TODO:
    <span class="hljs-keyword">return</span> [...state, {
      <span class="hljs-attr">text</span>: action.text,
      <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span>
    }];
  <span class="hljs-keyword">case</span> COMPLETE_TODO:
    <span class="hljs-keyword">return</span> [
      ...state.slice(<span class="hljs-number">0</span>, action.index),
      <span class="hljs-built_in">Object</span>.assign({}, state[action.index], {
        <span class="hljs-attr">completed</span>: <span class="hljs-literal">true</span>
      }),
      ...state.slice(action.index + <span class="hljs-number">1</span>)
    ];
  <span class="hljs-keyword">default</span>:
    <span class="hljs-keyword">return</span> state;
  }
}

<span class="hljs-keyword">const</span> todoApp = combineReducers({
  visibilityFilter,
  todos
});

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> todoApp;</code></pre>
<p>如你所见，reducer只是一个方法，在reducer里面根据传入的action里面的type进行不同的state地操作。<br><strong>在这里必须理解一点，在你调用<code>dispatch</code>方法的时候传入的action动作就是reducer里面接受的action</strong></p>
<p>在这里我们唯一用到redux的功能只有<code>combineReducers</code>方法，这个方法的作用是把不同的reducer合并到一起，<br>因为在创建store的时候我们只能传入一个reducer，但是我们不可能把所有逻辑操作写到一个reducer里面，所以这边提供了这个方法。</p>
<h3 id="articleHeader2">store</h3>
<p>store的作用即是整合所有的reducer，然后提供一些帮助方法，例如<code>dispatch</code>等方法让我们使用，<br>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let store = createStore(reducer);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">let store</span> = createStore(reducer);</code></pre>
<p>是的，就是这么简单。</p>
<h3 id="articleHeader3">如何跟react一起使用</h3>
<p>请参考<a href="http://redux.js.org/docs/basics/UsageWithReact.html" rel="nofollow noreferrer" target="_blank">文档</a><br>这边并不进行详细讲解，以为这不是这篇文章的重点，以后会单独在其他文章中进行讲解。</p>
<h3 id="articleHeader4">理解</h3>
<p>如何理解redux的重点就在于，redux如何处理整个数据流的走向。<br>基本的思路如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="component --dispatch(action)--> reducer --update(state)--> store --update(props)--> component" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code style="word-break: break-word; white-space: initial;">component --dispatch<span class="hljs-function"><span class="hljs-params">(action)</span>--&gt;</span> reducer --update<span class="hljs-function"><span class="hljs-params">(state)</span>--&gt;</span> store --update<span class="hljs-function"><span class="hljs-params">(props)</span>--&gt;</span> component</code></pre>
<p>这就是整个数据的走向</p>
<p><strong>看到这里，你们肯定跟我有相同的想法：reducer到底是个什么东西！</strong></p>
<p>那么我们就来理解一下</p>
<p>我们看一下reducer的定义：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function todos(state = [], action) {
  switch (action.type) {
  case ADD_TODO:
    return [...state, {
      text: action.text,
      completed: false
    }];
  case COMPLETE_TODO:
    return [
      ...state.slice(0, action.index),
      Object.assign({}, state[action.index], {
        completed: true
      }),
      ...state.slice(action.index + 1)
    ];
  default:
    return state;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">todos</span>(<span class="hljs-params">state = [], action</span>) </span>{
  <span class="hljs-keyword">switch</span> (action.type) {
  <span class="hljs-keyword">case</span> ADD_TODO:
    <span class="hljs-keyword">return</span> [...state, {
      <span class="hljs-attr">text</span>: action.text,
      <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span>
    }];
  <span class="hljs-keyword">case</span> COMPLETE_TODO:
    <span class="hljs-keyword">return</span> [
      ...state.slice(<span class="hljs-number">0</span>, action.index),
      <span class="hljs-built_in">Object</span>.assign({}, state[action.index], {
        <span class="hljs-attr">completed</span>: <span class="hljs-literal">true</span>
      }),
      ...state.slice(action.index + <span class="hljs-number">1</span>)
    ];
  <span class="hljs-keyword">default</span>:
    <span class="hljs-keyword">return</span> state;
  }
}</code></pre>
<p>首先他接受两个参数，一个是state，一个是action。</p>
<p>action我们知道是在dispatch的时候传入的告诉我们进行什么操作的，那么state是什么？<br>state就是store里面存着的状态，即数据。我们可以看到<code>每个reducer都会返回state</code>，而这些state最终都会保存在store里面。</p>
<p>**每次触发一个action的时候，store调用reducer，同时传入本身保存着的state，reducer根据传入的state和action返回新的state，<br>store更新state，返回以props的方式传入组件，这就形成了整个数据流循环**</p>
<p>以上是redux的最基础使用，这也是redux的核心，然后后面还有一堆redux的扩展以及中间件进行学习，这仅仅是一个开始，以后还有更长的路要走^_^</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
redux简单使用

## 原文链接
[https://segmentfault.com/a/1190000004611579](https://segmentfault.com/a/1190000004611579)

