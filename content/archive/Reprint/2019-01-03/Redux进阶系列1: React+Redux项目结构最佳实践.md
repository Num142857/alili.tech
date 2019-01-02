---
title: 'Redux进阶系列1: React+Redux项目结构最佳实践' 
date: 2019-01-03 2:30:11
hidden: true
slug: qsub22nndfp
categories: [reprint]
---

{{< raw >}}

                    
<p>React + Redux 是React生态中使用最频繁的技术栈，但关于如何组织React+Redux的项目结构，一直都有多种声音。本文将讨论其中最常用的3种项目结构，并给出个人的最佳实践。</p>
<p>1.按照类型</p>
<p>这里的类型指的是一个文件在项目中充当的角色类型，即这个文件是一个component，还是一个container，或者是一个reducer等，充当component、container、action、reducer等不同角色的文件，分别放在不同的文件夹下，这也是Redux官网示例所采用的项目结构。这种结构如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="actions/
  a.js
  b.js
components/
  a1.js
  a2.js
  b1.js
constainers/
  a.js
  b.js
reducers/
  a.js
  b.js
index.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>actions/
  <span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.js</span>
  <span class="hljs-selector-tag">b</span><span class="hljs-selector-class">.js</span>
components/
  a1<span class="hljs-selector-class">.js</span>
  a2<span class="hljs-selector-class">.js</span>
  b1<span class="hljs-selector-class">.js</span>
constainers/
  <span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.js</span>
  <span class="hljs-selector-tag">b</span><span class="hljs-selector-class">.js</span>
reducers/
  <span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.js</span>
  <span class="hljs-selector-tag">b</span><span class="hljs-selector-class">.js</span>
index.js</code></pre>
<p>使用这种结构组织项目，每当增加一个新功能时，需要在containers和components文件夹下增加这个功能需要的组件，还需要在actions和reducers文件夹下，分别添加Redux管理这个功能使用到的action和reducer，如果action type是放在另外一个文件夹的话，还需要在这个文件夹下增加新的action type文件。所以，开发一个功能时，你需要频繁的切换路径，修改不同的文件。当项目逐渐变大时，这种项目结构是非常不方便的。</p>
<p>2.按照功能</p>
<p>一个功能模块对应一个文件夹，这个功能所用到的container、component、action、reducer等文件，都存放在这个文件夹下。如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="feature1/
  components/
  actions.js
  container.js
  index.js
  reducer.js
feature2/
  components/
  actions.js
  container.js
  index.js
  reducer.js
index.js
rootReducer.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>feature1/
  components/
  actions<span class="hljs-selector-class">.js</span>
  container<span class="hljs-selector-class">.js</span>
  index<span class="hljs-selector-class">.js</span>
  reducer<span class="hljs-selector-class">.js</span>
feature2/
  components/
  actions<span class="hljs-selector-class">.js</span>
  container<span class="hljs-selector-class">.js</span>
  index<span class="hljs-selector-class">.js</span>
  reducer<span class="hljs-selector-class">.js</span>
index<span class="hljs-selector-class">.js</span>
rootReducer.js</code></pre>
<p>这种项目结构的好处显而易见，一个功能中使用到的组件、状态和行为都在同一个文件夹下，方便开发，易于功能的扩展，Github上很多脚手架也选择了这种目录结构，如<a href="https://github.com/react-boilerplate/react-boilerplate" rel="nofollow noreferrer" target="_blank">https://github.com/react-boil...</a>。但这种结构也有一个问题，Redux会将整个应用的状态作为一个store来管理，不同的功能模块之间可以共享store中的部分状态（项目越复杂，这种场景就会越多），于是当你在feature1的container中dispatch一个action，很可能会影响feature2的状态，因为feature1和feature2共享了部分状态，会响应相同的action。这种情况下，不同模块间的功能被耦合到了一起。</p>
<p>3.Ducks</p>
<p><a href="https://github.com/erikras/ducks-modular-redux" rel="nofollow noreferrer" target="_blank">Ducks</a>其实是对一种新的Redux项目结构的提议。它提倡将相关联的reducer、action types和action写到一个文件里。本质上是以应用的状态作为模块的划分依据，而不是以界面功能作为划分模块的依据。这样，管理相同状态的依赖都在同一个文件中，不管哪个容器组件需要使用这部分状态，只需要在这个组件中引入这个状态对应的文件即可。这样的一个文件（模块）如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// widget.js

// Actions
const LOAD   = 'widget/LOAD';
const CREATE = 'widget/CREATE';
const UPDATE = 'widget/UPDATE';
const REMOVE = 'widget/REMOVE';

const initialState = {
  widget: null,
  isLoading: false,
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    LOAD: 
      //...
    CREATE:
      //...
    UPDATE:
      //...
    REMOVE:
      //...
    default: return state;
  }
}

// Action Creators
export function loadWidget() {
  return { type: LOAD };
}

export function createWidget(widget) {
  return { type: CREATE, widget };
}

export function updateWidget(widget) {
  return { type: UPDATE, widget };
}

export function removeWidget(widget) {
  return { type: REMOVE, widget };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// widget.js</span>

<span class="hljs-comment">// Actions</span>
<span class="hljs-keyword">const</span> LOAD   = <span class="hljs-string">'widget/LOAD'</span>;
<span class="hljs-keyword">const</span> CREATE = <span class="hljs-string">'widget/CREATE'</span>;
<span class="hljs-keyword">const</span> UPDATE = <span class="hljs-string">'widget/UPDATE'</span>;
<span class="hljs-keyword">const</span> REMOVE = <span class="hljs-string">'widget/REMOVE'</span>;

<span class="hljs-keyword">const</span> initialState = {
  <span class="hljs-attr">widget</span>: <span class="hljs-literal">null</span>,
  <span class="hljs-attr">isLoading</span>: <span class="hljs-literal">false</span>,
}

<span class="hljs-comment">// Reducer</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reducer</span>(<span class="hljs-params">state = initialState, action = {}</span>) </span>{
  <span class="hljs-keyword">switch</span> (action.type) {
    <span class="hljs-attr">LOAD</span>: 
      <span class="hljs-comment">//...</span>
    CREATE:
      <span class="hljs-comment">//...</span>
    UPDATE:
      <span class="hljs-comment">//...</span>
    REMOVE:
      <span class="hljs-comment">//...</span>
    <span class="hljs-keyword">default</span>: <span class="hljs-keyword">return</span> state;
  }
}

<span class="hljs-comment">// Action Creators</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadWidget</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> { <span class="hljs-attr">type</span>: LOAD };
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createWidget</span>(<span class="hljs-params">widget</span>) </span>{
  <span class="hljs-keyword">return</span> { <span class="hljs-attr">type</span>: CREATE, widget };
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateWidget</span>(<span class="hljs-params">widget</span>) </span>{
  <span class="hljs-keyword">return</span> { <span class="hljs-attr">type</span>: UPDATE, widget };
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">removeWidget</span>(<span class="hljs-params">widget</span>) </span>{
  <span class="hljs-keyword">return</span> { <span class="hljs-attr">type</span>: REMOVE, widget };
}</code></pre>
<p>整体的目录结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="components/  (应用级别的通用组件)
containers/  
  feature1/
    components/  (功能拆分出的专用组件)
    feature1.js  (容器组件)
    index.js     (feature1对外暴露的接口)
redux/
  index.js (combineReducers)
  module1.js (reducer, action types, actions creators)
  module2.js (reducer, action types, actions creators)
index.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>components/  (应用级别的通用组件)
containers/  
  feature1/
    components/  (功能拆分出的专用组件)
    feature1<span class="hljs-selector-class">.js</span>  (容器组件)
    index<span class="hljs-selector-class">.js</span>     (feature1对外暴露的接口)
redux/
  index<span class="hljs-selector-class">.js</span> (combineReducers)
  module1<span class="hljs-selector-class">.js</span> (reducer, action types, actions creators)
  module2<span class="hljs-selector-class">.js</span> (reducer, action types, actions creators)
index.js</code></pre>
<p>在前两种项目结构中，当container需要使用actions时，可以通过<code>import *  as actions from 'path/to/actions.js'</code>方式，一次性把一个action文件中的所有action creators都引入进来。但在使用Ducks结构时，action creators和reducer定义在同一个文件中，<code>import *</code>的导入方式会把reducer也导入进来（如果action types也被export，那么还会导入action types）。我们可以把action creators和action types定义到一个命名空间中，解决这个问题。修改如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// widget.js

// Actions
export const types = {
  const LOAD   : 'widget/LOAD',
  const CREATE : 'widget/CREATE',
  const UPDATE : 'widget/UPDATE',
  const REMOVE : 'widget/REMOVE'
}

const initialState = {
  widget: null,
  isLoading: false,
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    types.LOAD: 
      //...
    types.CREATE:
      //...
    types.UPDATE:
      //...
    types.REMOVE:
      //...
    default: return state;
  }
}

// Action Creators
export const actions = {
  loadWidget: function() {
    return { type: types.LOAD };
  },
  createWidget: createWidget(widget) {
    return { type: types.CREATE, widget };
  },
  updateWidget: function(widget) {
    return { type: types.UPDATE, widget };
  },
  removeWidget: function(widget) {
    return { type: types.REMOVE, widget };
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// widget.js</span>

<span class="hljs-comment">// Actions</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> types = {
  <span class="hljs-keyword">const</span> LOAD   : <span class="hljs-string">'widget/LOAD'</span>,
  <span class="hljs-keyword">const</span> CREATE : <span class="hljs-string">'widget/CREATE'</span>,
  <span class="hljs-keyword">const</span> UPDATE : <span class="hljs-string">'widget/UPDATE'</span>,
  <span class="hljs-keyword">const</span> REMOVE : <span class="hljs-string">'widget/REMOVE'</span>
}

<span class="hljs-keyword">const</span> initialState = {
  <span class="hljs-attr">widget</span>: <span class="hljs-literal">null</span>,
  <span class="hljs-attr">isLoading</span>: <span class="hljs-literal">false</span>,
}

<span class="hljs-comment">// Reducer</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reducer</span>(<span class="hljs-params">state = initialState, action = {}</span>) </span>{
  <span class="hljs-keyword">switch</span> (action.type) {
    types.LOAD: 
      <span class="hljs-comment">//...</span>
    types.CREATE:
      <span class="hljs-comment">//...</span>
    types.UPDATE:
      <span class="hljs-comment">//...</span>
    types.REMOVE:
      <span class="hljs-comment">//...</span>
    <span class="hljs-keyword">default</span>: <span class="hljs-keyword">return</span> state;
  }
}

<span class="hljs-comment">// Action Creators</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> actions = {
  <span class="hljs-attr">loadWidget</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> { <span class="hljs-attr">type</span>: types.LOAD };
  },
  <span class="hljs-attr">createWidget</span>: createWidget(widget) {
    <span class="hljs-keyword">return</span> { <span class="hljs-attr">type</span>: types.CREATE, widget };
  },
  <span class="hljs-attr">updateWidget</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">widget</span>) </span>{
    <span class="hljs-keyword">return</span> { <span class="hljs-attr">type</span>: types.UPDATE, widget };
  },
  <span class="hljs-attr">removeWidget</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">widget</span>) </span>{
    <span class="hljs-keyword">return</span> { <span class="hljs-attr">type</span>: types.REMOVE, widget };
  }
}</code></pre>
<p>这样，我们在container中使用actions时，可以通过<code>import  { actions } from 'path/to/module.js' </code>引入，避免了引入额外的对象，也避免了import时把所有action都列出来的繁琐。</p>
<p>现在的Ducks结构就是我项目中正在使用的项目结构，用起来还是很顺畅的，欢迎大家提出改进建议！</p>
<hr>
<p><strong>欢迎关注我的公众号：老干部的大前端，领取21本大前端精选书籍！</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV4lGT?w=540&amp;h=193" src="https://static.alili.tech/img/bV4lGT?w=540&amp;h=193" alt="3808299627-5a93ba468b59a" title="3808299627-5a93ba468b59a" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Redux进阶系列1: React+Redux项目结构最佳实践

## 原文链接
[https://segmentfault.com/a/1190000010775697](https://segmentfault.com/a/1190000010775697)

