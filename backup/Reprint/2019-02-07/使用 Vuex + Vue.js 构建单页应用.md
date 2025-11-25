---
title: '使用 Vuex + Vue.js 构建单页应用' 
date: 2019-02-07 2:30:16
hidden: true
slug: o5bzjjdd9ah
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>鉴于该篇文章阅读量大，回复的同学也挺多的，特地抽空写了一篇 vue2.0 下的 vuex 使用方法，传送门：<a href="https://segmentfault.com/a/1190000011099751">使用 Vuex + Vue.js 构建单页应用【新篇】</a></p></blockquote>
<p>-------------------- 华丽的分割线 --------------------</p>
<p>原文地址：<a href="https://coligo.io/learn-vuex-by-building-notes-app/" rel="nofollow noreferrer" target="_blank">https://coligo.io/learn-vuex-by-building-notes-app/</a></p>
<p>前言：在最近学习 Vue.js 的时候，看到国外一篇讲述了如何使用 Vue.js 和 Vuex 来构建一个简单笔记的单页应用的文章。感觉收获挺多，自己在它的例子的基础上进行了一些优化和自定义功能，在这里和大家分享下学习心得。</p>
<p>在这篇教程中我们将通过构建一个笔记应用来学习如何在我们的 Vue 项目中使用 Vuex。我们将大概的过一遍什么是 Vuex.js，在项目中什么时候使用它，和如何构建我们的 Vue 应用。</p>
<p>这里放一张我们项目的预览图片：    </p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005863694" src="https://static.alili.tech/img/remote/1460000005863694" alt="效果预览图" title="效果预览图" style="cursor: pointer; display: inline;"></span></p>
<p>项目源码：<a href="https://github.com/lichenbuliren/vuex-notes-app" rel="nofollow noreferrer" target="_blank">vuex-notes-app</a>；有需要的同学可以直接下载源码查看。</p>
<h2 id="articleHeader0">主要知识点</h2>
<ul>
<li>
<a href="https://github.com/vuejs/vuex/blob/master/docs/zh-cn/intro.md" rel="nofollow noreferrer" target="_blank">Vuex</a> 状态管理机制的使用</li>
<li>
<a href="https://github.com/vuejs/vue/" rel="nofollow noreferrer" target="_blank">Vue.js</a> 的基础 api</li>
<li>
<a href="https://github.com/vuejs/vue-cli" rel="nofollow noreferrer" target="_blank">Vue-cli</a> 脚手架的安装及使用</li>
<li>
<a href="https://github.com/vuejs/vue-router" rel="nofollow noreferrer" target="_blank">vur-router</a> 的使用</li>
<li>
<a href="http://es6.ruanyifeng.com/" rel="nofollow noreferrer" target="_blank">ES6</a> 的语法，这里推荐看下阮一峰的入门教程</li>
</ul>
<h2 id="articleHeader1">Vuex 概述</h2>
<p>在我们迫不及待的开始项目之前，我们最好先花几分钟来了解下 <a href="https://github.com/vuejs/vuex/blob/master/docs/zh-cn/intro.md" rel="nofollow noreferrer" target="_blank">Vuex</a>  的核心概念。</p>
<p>Vuex 是一个专门为 Vue.js 应用所设计的集中式状态管理架构。它借鉴了 Flux 和 Redux 的设计思想，但简化了概念，并且采用了一种为能更好发挥 Vue.js 数据响应机制而专门设计的实现。</p>
<p><code>state</code> 这样概念初次接触的时候可能会感觉到有点模糊，简单来说就是将 <code>state</code> 看成我们项目中使用的数据的集合。然后，Vuex 使得 组件本地状态（component local state）和 应用层级状态(application state) 有了一定的差异</p>
<ul>
<li>component local state: 该状态表示仅仅在组件内部使用的状态，有点类似通过配置选项传入 Vue 组件内部的意思。</li>
<li>application level state: 应用层级状态，表示同时被多个组件共享的状态层级。</li>
</ul>
<p>假设有这样一个场景：我们有一个父组件，同时包含两个子组件。父组件可以很容易的通过使用 <code>props</code> 属性来向子组件传递数据。</p>
<p>但是问题来了，当我们的两个子组件如何和对方互相通信的？ 或者子组件如何传递数据给他父组件的？在我们的项目很小的时候，这个两个问题都不会太难，因为我们可以通过事件派发和监听来完成父组件和子组件的通信。</p>
<p>然而，随着我们项目的增长：</p>
<ul>
<li>保持对所有的事件追踪将变得很困难。到底哪个事件是哪个组件派发的，哪个组件该监听哪个事件？</li>
<li>项目逻辑分散在各个组件当中，很容易导致逻辑的混乱，不利于我们项目的维护。</li>
<li>父组件将变得和子组件耦合越来越严重，因为它需要明确的派发和监听子组件的某些事件。</li>
</ul>
<p>这就是 Vuex 用来解决的问题。 Vuex 的四个核心概念分别是：</p>
<ul>
<li>The state tree：Vuex 使用单一状态树，用一个对象就包含了全部的应用层级状态。至此它便作为一个『唯一数据源(SSOT)』而存在。这也意味着，每个应用将仅仅包含一个 store 实例。单状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。</li>
<li>Getters:  用来从 store 获取 Vue 组件数据。</li>
<li>Mutators: 事件处理器用来驱动状态的变化。</li>
<li>Actions: 可以给组件使用的函数，以此用来驱动事件处理器 mutations</li>
</ul>
<p>如何你暂时还不太理解这个四个概念，不用着急，我们将在后面的项目实战中详细的解释。</p>
<p>下面这张图详细的解释了 Vuex 应用中数据的流向（Vuex 官方图）</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005863699" src="https://static.alili.tech/img/remote/1460000005863699" alt="Vuex 数据流图" title="Vuex 数据流图" style="cursor: pointer; display: inline;"></span></p>
<p>简单解释下：</p>
<p>Vuex 规定，属于应用层级的状态只能通过 Mutation 中的方法来修改，而派发 Mutation 中的事件只能通过 action。</p>
<p>从左到又，从组件出发，组件中调用 action，在 action 这一层级我们可以和后台数据交互，比如获取初始化的数据源，或者中间数据的过滤等。然后在 action 中去派发 Mutation。Mutation 去触发状态的改变，状态的改变，将触发视图的更新。</p>
<p><strong>注意事项</strong></p>
<ul>
<li>数据流都是单向的</li>
<li>组件能够调用 action</li>
<li>action 用来派发 Mutation</li>
<li>只有 mutation 可以改变状态</li>
<li>store 是响应式的，无论 state 什么时候更新，组件都将同步更新</li>
</ul>
<h2 id="articleHeader2">环境安装</h2>
<p>这个应用将使用 <a href="https://webpack.github.io/" rel="nofollow noreferrer" target="_blank">webpack</a> 来做模块打包，处理和热重启。使用 Vue 官方提供的脚手架 <a href="https://github.com/vuejs/vue-cli" rel="nofollow noreferrer" target="_blank">vue-cli</a>。</p>
<h3 id="articleHeader3">安装 vue-cli</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g vue-cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">npm install -g vue-cli</code></pre>
<p>*Node.js &gt;= 4.x,5.x最好</p>
<h3 id="articleHeader4">初始化应用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init webpack vue-notes-app
cd vue-notes-app
npm install // 安装依赖包
npm run dev // 启动服务" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">vue init webpack vue-notes-app
cd vue-notes-app
npm install <span class="hljs-comment">// 安装依赖包</span>
npm run dev <span class="hljs-comment">// 启动服务</span></code></pre>
<p>初始化一个项目名为<code>vue-notes-app</code>的应用，并选择使用 webpack 打包方式。在命令行中按照提示选择初始化配置项。其中在选择 JSLint 校验的时候，推荐选择 <a href="https://github.com/airbnb/javascript" rel="nofollow noreferrer" target="_blank">AirBNB</a> 规范。</p>
<p>使用你最喜欢的编辑器打开我们刚刚新建的项目，项目的结构大概如下图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005863702" src="https://static.alili.tech/img/remote/1460000005863702" alt="项目结构图" title="项目结构图" style="cursor: pointer;"></span></p>
<ul>
<li>components/ 文件夹用来存放我们的 Vue 组件</li>
<li>vuex/ 文件夹存放的是和 Vuex store 相关的东西（state object，actions，mutators)</li>
<li>build/ 文件是 webpack 的打包编译配置文件</li>
<li>config/ 文件夹存放的是一些配置项，比如我们服务器访问的端口配置等</li>
<li>dist/ 该文件夹一开始是不存在，在我们的项目经过 build 之后才会产出</li>
<li>App.vue 根组件，所有的子组件都将在这里被引用</li>
<li>index.html 整个项目的入口文件，将会引用我们的根组件 App.vue</li>
<li>main.js 入口文件的 js 逻辑，在 webpack 打包之后将被注入到 index.html 中</li>
</ul>
<h2 id="articleHeader5">功能模块</h2>
<ul>
<li>新增笔记，新增一篇笔记，编辑区显示空的笔记内容</li>
<li>删除笔记，删除一篇笔记之后，编辑区域显示当前笔记类别的第一项</li>
<li>笔记列表切换，分为全部笔记和收藏笔记两种，在切换之后，编辑区域显示当前列表的第一条笔记</li>
<li>收藏笔记，给当前激活的笔记打上收藏的标签</li>
</ul>
<h2 id="articleHeader6">项目组件划分</h2>
<p>在这个项目中，我们将总共使用四个组件：根组件 App.vue，操作栏组件 Toolbar.vue，别表组件 NotesList.vue，笔记编辑组件 Editor.vue。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005863705" src="https://static.alili.tech/img/remote/1460000005863705" alt="组件划分图" title="组件划分图" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">创建 Vuex Store</h3>
<p>按照上面我们列出来的功能模块，我们在 Vuex/ 下面建立一个 store.js 文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 需要维护的状态
const state = {
  notes: [],
  activeNote: {},
  show: ''
};

const mutations = {
  // 初始化 state
  INIT_STORE(state, data) {
    state.notes = data.notes,
    state.show = data.show;
    state.activeNote = data.activeNote;
  },
  // 新增笔记
  NEW_NOTE(state) {
    var newNote = {
      id: +new Date(),
      title: '',
      content: '',
      favorite: false
    };
    state.notes.push(newNote);
    state.activeNote = newNote;
  },
  // 修改笔记
  EDIT_NOTE(state, note) {
    state.activeNote = note;
    // 修改原始数据
    for (var i = 0; i < state.notes.length; i++) {
      if(state.notes[i].id === note.id){
        state.notes[i] = note;
        break;
      }
    };
  },
  // 删除笔记
  DELETE_NOTE(state) {
    state.notes.$remove(state.activeNote);
    state.activeNote = state.notes[0] || {};
  },
  // 切换笔记的收藏与取消收藏
  TOGGLE_FAVORITE(state) {
    state.activeNote.favorite = !state.activeNote.favorite;
  },
  // 切换显示数据列表类型：全部 or 收藏
  SET_SHOW_ALL(state, show){
    state.show = show;
    // 切换数据展示，需要同步更新 activeNote
    if(show === 'favorite'){
      state.activeNote = state.notes.filter(note => note.favorite)[0] || {};
    }else{
      state.activeNote = state.notes[0] || {};
    }
  },
  // 设置当前激活的笔记
  SET_ACTIVE_NOTE(state, note) {
    state.activeNote = note;
  }
};

export default new Vuex.Store({
  state,
  mutations
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>;

Vue.use(Vuex);

<span class="hljs-comment">// 需要维护的状态</span>
<span class="hljs-keyword">const</span> state = {
  <span class="hljs-attr">notes</span>: [],
  <span class="hljs-attr">activeNote</span>: {},
  <span class="hljs-attr">show</span>: <span class="hljs-string">''</span>
};

<span class="hljs-keyword">const</span> mutations = {
  <span class="hljs-comment">// 初始化 state</span>
  INIT_STORE(state, data) {
    state.notes = data.notes,
    state.show = data.show;
    state.activeNote = data.activeNote;
  },
  <span class="hljs-comment">// 新增笔记</span>
  NEW_NOTE(state) {
    <span class="hljs-keyword">var</span> newNote = {
      <span class="hljs-attr">id</span>: +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(),
      <span class="hljs-attr">title</span>: <span class="hljs-string">''</span>,
      <span class="hljs-attr">content</span>: <span class="hljs-string">''</span>,
      <span class="hljs-attr">favorite</span>: <span class="hljs-literal">false</span>
    };
    state.notes.push(newNote);
    state.activeNote = newNote;
  },
  <span class="hljs-comment">// 修改笔记</span>
  EDIT_NOTE(state, note) {
    state.activeNote = note;
    <span class="hljs-comment">// 修改原始数据</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; state.notes.length; i++) {
      <span class="hljs-keyword">if</span>(state.notes[i].id === note.id){
        state.notes[i] = note;
        <span class="hljs-keyword">break</span>;
      }
    };
  },
  <span class="hljs-comment">// 删除笔记</span>
  DELETE_NOTE(state) {
    state.notes.$remove(state.activeNote);
    state.activeNote = state.notes[<span class="hljs-number">0</span>] || {};
  },
  <span class="hljs-comment">// 切换笔记的收藏与取消收藏</span>
  TOGGLE_FAVORITE(state) {
    state.activeNote.favorite = !state.activeNote.favorite;
  },
  <span class="hljs-comment">// 切换显示数据列表类型：全部 or 收藏</span>
  SET_SHOW_ALL(state, show){
    state.show = show;
    <span class="hljs-comment">// 切换数据展示，需要同步更新 activeNote</span>
    <span class="hljs-keyword">if</span>(show === <span class="hljs-string">'favorite'</span>){
      state.activeNote = state.notes.filter(<span class="hljs-function"><span class="hljs-params">note</span> =&gt;</span> note.favorite)[<span class="hljs-number">0</span>] || {};
    }<span class="hljs-keyword">else</span>{
      state.activeNote = state.notes[<span class="hljs-number">0</span>] || {};
    }
  },
  <span class="hljs-comment">// 设置当前激活的笔记</span>
  SET_ACTIVE_NOTE(state, note) {
    state.activeNote = note;
  }
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vuex.Store({
  state,
  mutations
});</code></pre>
<h3 id="articleHeader8">创建 Vuex Actions</h3>
<p>在 Vuex/ 下面建立一个 action.js，用来给组件使用的函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function makeAction(type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args);
};

const initNote = {
  id: +new Date(),
  title: '我的笔记',
  content: '第一篇笔记内容',
  favorite: false
};

// 模拟初始化数据
const initData = {
  show: 'all',
  notes: [initNote],
  activeNote: initNote
};

export const initStore = ({ dispatch }) => {
  dispatch('INIT_STORE', initData);
};
// 更新当前activeNote对象
export const updateActiveNote = makeAction('SET_ACTIVE_NOTE');

// 添加一个note对象
export const newNote = makeAction('NEW_NOTE');

// 删除一个note对象
export const deleteNote = makeAction('DELETE_NOTE');
export const toggleFavorite = makeAction('TOGGLE_FAVORITE');
export const editNote = makeAction('EDIT_NOTE');

// 更新列表展示
export const updateShow = makeAction('SET_SHOW_ALL');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeAction</span>(<span class="hljs-params">type</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">{ dispatch }, ...args</span>) =&gt;</span> dispatch(type, ...args);
};

<span class="hljs-keyword">const</span> initNote = {
  <span class="hljs-attr">id</span>: +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(),
  <span class="hljs-attr">title</span>: <span class="hljs-string">'我的笔记'</span>,
  <span class="hljs-attr">content</span>: <span class="hljs-string">'第一篇笔记内容'</span>,
  <span class="hljs-attr">favorite</span>: <span class="hljs-literal">false</span>
};

<span class="hljs-comment">// 模拟初始化数据</span>
<span class="hljs-keyword">const</span> initData = {
  <span class="hljs-attr">show</span>: <span class="hljs-string">'all'</span>,
  <span class="hljs-attr">notes</span>: [initNote],
  <span class="hljs-attr">activeNote</span>: initNote
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> initStore = <span class="hljs-function">(<span class="hljs-params">{ dispatch }</span>) =&gt;</span> {
  dispatch(<span class="hljs-string">'INIT_STORE'</span>, initData);
};
<span class="hljs-comment">// 更新当前activeNote对象</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> updateActiveNote = makeAction(<span class="hljs-string">'SET_ACTIVE_NOTE'</span>);

<span class="hljs-comment">// 添加一个note对象</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> newNote = makeAction(<span class="hljs-string">'NEW_NOTE'</span>);

<span class="hljs-comment">// 删除一个note对象</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> deleteNote = makeAction(<span class="hljs-string">'DELETE_NOTE'</span>);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> toggleFavorite = makeAction(<span class="hljs-string">'TOGGLE_FAVORITE'</span>);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> editNote = makeAction(<span class="hljs-string">'EDIT_NOTE'</span>);

<span class="hljs-comment">// 更新列表展示</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> updateShow = makeAction(<span class="hljs-string">'SET_SHOW_ALL'</span>);</code></pre>
<h3 id="articleHeader9">创建 Vuex Getters</h3>
<p>在 vuex/ 下面建立一个 getter.js 文件，用来从 store 获取数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获取 noteList,这里将会根据 state.show 的状态做数据过滤
export const filteredNotes = (state) => {
  if(state.show === 'all'){
    return state.notes || {};
  }else if(state.show === 'favorite'){
    return state.notes.filter(note => note.favorite) || {};
  }
};


// 获取列表展示状态 ： all or favorite
export const show = (state) => {
  return state.show;
};

// 获取当前激活 note
export const activeNote = (state) => {
  return state.activeNote;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 获取 noteList,这里将会根据 state.show 的状态做数据过滤</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> filteredNotes = <span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span>(state.show === <span class="hljs-string">'all'</span>){
    <span class="hljs-keyword">return</span> state.notes || {};
  }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(state.show === <span class="hljs-string">'favorite'</span>){
    <span class="hljs-keyword">return</span> state.notes.filter(<span class="hljs-function"><span class="hljs-params">note</span> =&gt;</span> note.favorite) || {};
  }
};


<span class="hljs-comment">// 获取列表展示状态 ： all or favorite</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> show = <span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> state.show;
};

<span class="hljs-comment">// 获取当前激活 note</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> activeNote = <span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> state.activeNote;
};</code></pre>
<p>以上就是我们 Vuex 的所有逻辑了，在定下了我们需要完成的功能之后，接下来就是只需要在组件中去调用 action 来实现对应的功能了。</p>
<h3 id="articleHeader10">路由配置</h3>
<p>在这里我们将使用 vue-router 来做路由，引用 bootstrap 样式。</p>
<p><strong>index.html</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
  <head>
    <meta charset=&quot;utf-8&quot;>
    <title>vuex-notes-app</title>
    <link rel=&quot;stylesheet&quot; href=&quot;https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css&quot;>
  </head>
  <body>
    <div id=&quot;app&quot;></div>
    <!-- built files will be auto injected -->
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>vuex-notes-app<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- built files will be auto injected --&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>所有的入口逻辑我们都将在 main.js 中编写</p>
<p><strong>main.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue';
import App from './App';

import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

// 路由模块和HTTP模块
Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter();

router.map({
  '/index': {
    component: App
  }
});

router.redirect({
  '*': '/index'
});

router.start(App, '#app');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>;

<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>;
<span class="hljs-keyword">import</span> VueResource <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-resource'</span>;

<span class="hljs-comment">// 路由模块和HTTP模块</span>
Vue.use(VueResource);
Vue.use(VueRouter);

<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter();

router.map({
  <span class="hljs-string">'/index'</span>: {
    <span class="hljs-attr">component</span>: App
  }
});

router.redirect({
  <span class="hljs-string">'*'</span>: <span class="hljs-string">'/index'</span>
});

router.start(App, <span class="hljs-string">'#app'</span>);</code></pre>
<h3 id="articleHeader11">根组件 App.vue</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot; class=&quot;app&quot;>
    <toolbar></toolbar>
    <notes-list></notes-list>
    <editor></editor>
  </div>
</template>

<style>
  html, #app {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    border: 0;
    height: 100%;
    max-height: 100%;
    position: relative;
  }
</style>

<script>
  import Toolbar from './components/Toolbar';
  import NotesList from './components/NotesList';
  import Editor from './components/Editor';
  import store from './vuex/store';
  import { initStore } from './vuex/actions';

  export default {
    components: {
      Toolbar,
      NotesList,
      Editor
    },
    store,
    vuex: {
      actions: {
        initStore
      }
    },
    ready() {
      this.initStore()
    }
  }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">toolbar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">toolbar</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">notes-list</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">notes-list</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">editor</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">editor</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-tag">html</span>, <span class="hljs-selector-id">#app</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
  }

  <span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">max-height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">position</span>: relative;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> Toolbar <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Toolbar'</span>;
  <span class="hljs-keyword">import</span> NotesList <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/NotesList'</span>;
  <span class="hljs-keyword">import</span> Editor <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Editor'</span>;
  <span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./vuex/store'</span>;
  <span class="hljs-keyword">import</span> { initStore } <span class="hljs-keyword">from</span> <span class="hljs-string">'./vuex/actions'</span>;

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">components</span>: {
      Toolbar,
      NotesList,
      Editor
    },
    store,
    <span class="hljs-attr">vuex</span>: {
      <span class="hljs-attr">actions</span>: {
        initStore
      }
    },
    ready() {
      <span class="hljs-keyword">this</span>.initStore()
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>在根组件中引用了三个子组件：Toolbar.vue, NotesList.vue, Editor.vue。</p>
<p>注意：我们在配置里面加入了 <code>vuex</code> 这么一个选项，这里用来将我们 action 里面定义的方法给暴露出来，我们在根组件中只做了一件事情，那就是初始化模拟数据，因此我们在组件生命周期的 ready 阶段调用了 actions 里面的 initStore 来初始化我们的 store 里面的 state</p>
<h3 id="articleHeader12">Toolbar.vue</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;toolbar&quot;>
    <i class=&quot;glyphicon logo&quot;><img src=&quot;../assets/logo.png&quot; width=&quot;30&quot; height=&quot;30&quot;></i>
    <i @click=&quot;newNote&quot; class=&quot;glyphicon glyphicon-plus&quot;></i>
    <i @click=&quot;toggleFavorite&quot; class=&quot;glyphicon glyphicon-star&quot; :class=&quot;{starred: activeNote.favorite}&quot;></i>
    <i @click=&quot;deleteNote&quot; class=&quot;glyphicon glyphicon-remove&quot;></i>
  </div>
</template>

<script>
import { newNote, deleteNote, toggleFavorite } from '../vuex/actions';
import { activeNote } from '../vuex/getters';

export default {
  vuex: {
    getters: {
      activeNote
    },
    actions: {
      newNote,
      deleteNote,
      toggleFavorite
    }
  }
}
</script>

<style lang=&quot;scss&quot; scoped>
  #toolbar{
    float: left;
    width: 80px;
    height: 100%;
    background-color: #30414D;
    color: #767676;
    padding: 35px 25px 25px 25px;

    .starred {
      color: #F7AE4F;
    }

    i{
      font-size: 30px;
      margin-bottom: 35px;
      cursor: pointer;
      opacity: 0.8;
      transition: opacity 0.5s ease;

      &amp;:hover{
        opacity: 1;
      }
    }
  }
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"toolbar"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"glyphicon logo"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../assets/logo.png"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"30"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"30"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">i</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"newNote"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"glyphicon glyphicon-plus"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">i</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"toggleFavorite"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"glyphicon glyphicon-star"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{starred: activeNote.favorite}"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">i</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"deleteNote"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"glyphicon glyphicon-remove"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> { newNote, deleteNote, toggleFavorite } <span class="hljs-keyword">from</span> <span class="hljs-string">'../vuex/actions'</span>;
<span class="hljs-keyword">import</span> { activeNote } <span class="hljs-keyword">from</span> <span class="hljs-string">'../vuex/getters'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">vuex</span>: {
    <span class="hljs-attr">getters</span>: {
      activeNote
    },
    <span class="hljs-attr">actions</span>: {
      newNote,
      deleteNote,
      toggleFavorite
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"scss"</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="undefined">
  #toolbar{
    float: left;
    width: 80px;
    height: 100%;
    background-color: #30414D;
    color: #767676;
    padding: 35px 25px 25px 25px;

    .starred {
      color: #F7AE4F;
    }

    i{
      font-size: 30px;
      margin-bottom: 35px;
      cursor: pointer;
      opacity: 0.8;
      transition: opacity 0.5s ease;

      &amp;:hover{
        opacity: 1;
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p>在这里，我们用到了 Vuex 的一个案例就是我们需要知道当前的激活的笔记是否是收藏类别的，如果是，我们需要高亮收藏按钮，那么如何知道呢？那就是通过 vuex 里面的 getters 获取当前激活的笔记对象，判断它的 favorite 是否为 true。</p>
<p>始终牢记一个概念，vuex 中数据是单向的，只能从 store 获取，而我们这个例子中的 activeNote 也是始终都在 store.js 中维护的，这样子就可以给其他组件公用了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 需要维护的状态
const state = {
  notes: [],
  activeNote: {},
  show: ''
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 需要维护的状态</span>
<span class="hljs-keyword">const</span> state = {
  <span class="hljs-attr">notes</span>: [],
  <span class="hljs-attr">activeNote</span>: {},
  <span class="hljs-attr">show</span>: <span class="hljs-string">''</span>
};</code></pre>
<h3 id="articleHeader13">NotesList.vue</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;notes-list&quot;>
    <div id=&quot;list-header&quot;>
      <h2>Notes | heavenru.com</h2>
      <div class=&quot;btn-group btn-group-justified&quot; role=&quot;group&quot;>
        <!-- all -->
        <div class=&quot;btn-group&quot; role=&quot;group&quot;>
          <button type=&quot;button&quot; class=&quot;btn btn-default&quot;
            @click=&quot;toggleShow('all')&quot;
            :class=&quot;{active: show === 'all'}&quot;>All Notes</button>
        </div>

        <!-- favorites -->
        <div class=&quot;btn-group&quot; role=&quot;group&quot;>
          <button type=&quot;button&quot; class=&quot;btn btn-default&quot;
            @click=&quot;toggleShow('favorite')&quot;
            :class=&quot;{active: show === 'favorite'}&quot;>Favorites</button>
        </div>
      </div>
    </div>

    <!-- 渲染笔记列表 -->
    <div class=&quot;container&quot;>
      <div class=&quot;list-group&quot;>
        <a v-for=&quot;note in filteredNotes&quot;
         class=&quot;list-group-item&quot; href=&quot;#&quot;
         :class=&quot;{active: activeNote === note}&quot;
         @click=&quot;updateActiveNote(note)&quot;>
          <h4 class=&quot;list-group-item-heading&quot;>
            "{{"note.title.trim().substring(0,30)"}}"
          </h4>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import { updateActiveNote, updateShow } from '../vuex/actions';
  import { show, filteredNotes, activeNote } from '../vuex/getters';

  export default {
    vuex: {
      getters: {
        show,
        filteredNotes,
        activeNote
      },
      actions: {
        updateActiveNote,
        updateShow
      }
    },
    methods: {
      toggleShow(show) {
        this.updateShow(show);
      }
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"notes-list"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"list-header"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Notes | heavenru.com<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn-group btn-group-justified"</span> <span class="hljs-attr">role</span>=<span class="hljs-string">"group"</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- all --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn-group"</span> <span class="hljs-attr">role</span>=<span class="hljs-string">"group"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-default"</span>
            @<span class="hljs-attr">click</span>=<span class="hljs-string">"toggleShow('all')"</span>
            <span class="hljs-attr">:class</span>=<span class="hljs-string">"{active: show === 'all'}"</span>&gt;</span>All Notes<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

        <span class="hljs-comment">&lt;!-- favorites --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn-group"</span> <span class="hljs-attr">role</span>=<span class="hljs-string">"group"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-default"</span>
            @<span class="hljs-attr">click</span>=<span class="hljs-string">"toggleShow('favorite')"</span>
            <span class="hljs-attr">:class</span>=<span class="hljs-string">"{active: show === 'favorite'}"</span>&gt;</span>Favorites<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-comment">&lt;!-- 渲染笔记列表 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list-group"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"note in filteredNotes"</span>
         <span class="hljs-attr">class</span>=<span class="hljs-string">"list-group-item"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>
         <span class="hljs-attr">:class</span>=<span class="hljs-string">"{active: activeNote === note}"</span>
         @<span class="hljs-attr">click</span>=<span class="hljs-string">"updateActiveNote(note)"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h4</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list-group-item-heading"</span>&gt;</span>
            "{{"note.title.trim().substring(0,30)"}}"
          <span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> { updateActiveNote, updateShow } <span class="hljs-keyword">from</span> <span class="hljs-string">'../vuex/actions'</span>;
  <span class="hljs-keyword">import</span> { show, filteredNotes, activeNote } <span class="hljs-keyword">from</span> <span class="hljs-string">'../vuex/getters'</span>;

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">vuex</span>: {
      <span class="hljs-attr">getters</span>: {
        show,
        filteredNotes,
        activeNote
      },
      <span class="hljs-attr">actions</span>: {
        updateActiveNote,
        updateShow
      }
    },
    <span class="hljs-attr">methods</span>: {
      toggleShow(show) {
        <span class="hljs-keyword">this</span>.updateShow(show);
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>笔记列表组件，主要有三个操作</p>
<ul>
<li>渲染笔记</li>
<li>切换渲染笔记</li>
<li>点击列表 title，切换 activeNote</li>
</ul>
<p>我们通过 getters 中的 filteredNotes 方法获取笔记列表</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获取 noteList,这里将会根据 state.show 的状态做数据过滤
export const filteredNotes = (state) => {
  if(state.show === 'all'){
    return state.notes || {};
  }else if(state.show === 'favorite'){
    return state.notes.filter(note => note.favorite) || {};
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 获取 noteList,这里将会根据 state.show 的状态做数据过滤</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> filteredNotes = <span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span>(state.show === <span class="hljs-string">'all'</span>){
    <span class="hljs-keyword">return</span> state.notes || {};
  }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(state.show === <span class="hljs-string">'favorite'</span>){
    <span class="hljs-keyword">return</span> state.notes.filter(<span class="hljs-function"><span class="hljs-params">note</span> =&gt;</span> note.favorite) || {};
  }
};</code></pre>
<p>可以看到，我们获取的列表是依赖于 state.show 这个状态的。而我们的切换列表操作恰好就是调用 actions 里面的方法来更新 state.show ，这样一来，实现了数据列表的动态刷新，而且我们对树的操作都是通过调用 actions 的方法来实现的。</p>
<p>我们再看，在切换列表的时候，我们还需要动态的更新 activeNote 。 看看我们在 store.js 中是如何做的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 切换显示数据列表类型：全部 or 收藏
SET_SHOW_ALL(state, show){
  state.show = show;
  // 切换数据展示，需要同步更新 activeNote
  if(show === 'favorite'){
    state.activeNote = state.notes.filter(note => note.favorite)[0] || {};
  }else{
    state.activeNote = state.notes[0] || {};
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 切换显示数据列表类型：全部 or 收藏</span>
SET_SHOW_ALL(state, show){
  state.show = show;
  <span class="hljs-comment">// 切换数据展示，需要同步更新 activeNote</span>
  <span class="hljs-keyword">if</span>(show === <span class="hljs-string">'favorite'</span>){
    state.activeNote = state.notes.filter(<span class="hljs-function"><span class="hljs-params">note</span> =&gt;</span> note.favorite)[<span class="hljs-number">0</span>] || {};
  }<span class="hljs-keyword">else</span>{
    state.activeNote = state.notes[<span class="hljs-number">0</span>] || {};
  }
}</code></pre>
<p>触发这些操作的是我们给两个按钮分别绑定了我们自定义的函数，通过给函数传入不同的参数，然后调用 actions 里面的方法，来实现对数据的过滤，更新。</p>
<h3 id="articleHeader14">Editor.vue</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;note-editor&quot;>
    <div class=&quot;form-group&quot;>
      <input type=&quot;text&quot; name=&quot;title&quot;
        class=&quot;title form-control&quot;
        placeholder=&quot;请输入标题&quot;
        @input=&quot;updateNote&quot;
        v-model=&quot;currentNote.title&quot;>
      <textarea
        v-model=&quot;currentNote.content&quot; name=&quot;content&quot;
        class=&quot;form-control&quot; row=&quot;3&quot; placeholder=&quot;请输入正文&quot;
        @input=&quot;updateNote&quot;></textarea>
    </div>
  </div>
</template>

<script>
  import { editNote } from '../vuex/actions';
  import { activeNote } from '../vuex/getters';

  export default {
    vuex: {
      getters: {
        activeNote
      },
      actions: {
        editNote
      }
    },
    computed: {
      // 通过计算属性得到的一个对象，这样子我们就能愉快的使用 v-model 了
      currentNote: activeNote
    },
    methods: {
      // 为什么这么做？ 因为在严格模式中不允许直接在模板层面去修改 state 中的值
      updateNote() {
        this.editNote(this.currentNote);
      }
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"note-editor"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form-group"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"title"</span>
        <span class="hljs-attr">class</span>=<span class="hljs-string">"title form-control"</span>
        <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请输入标题"</span>
        @<span class="hljs-attr">input</span>=<span class="hljs-string">"updateNote"</span>
        <span class="hljs-attr">v-model</span>=<span class="hljs-string">"currentNote.title"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span>
        <span class="hljs-attr">v-model</span>=<span class="hljs-string">"currentNote.content"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"content"</span>
        <span class="hljs-attr">class</span>=<span class="hljs-string">"form-control"</span> <span class="hljs-attr">row</span>=<span class="hljs-string">"3"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请输入正文"</span>
        @<span class="hljs-attr">input</span>=<span class="hljs-string">"updateNote"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> { editNote } <span class="hljs-keyword">from</span> <span class="hljs-string">'../vuex/actions'</span>;
  <span class="hljs-keyword">import</span> { activeNote } <span class="hljs-keyword">from</span> <span class="hljs-string">'../vuex/getters'</span>;

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">vuex</span>: {
      <span class="hljs-attr">getters</span>: {
        activeNote
      },
      <span class="hljs-attr">actions</span>: {
        editNote
      }
    },
    <span class="hljs-attr">computed</span>: {
      <span class="hljs-comment">// 通过计算属性得到的一个对象，这样子我们就能愉快的使用 v-model 了</span>
      currentNote: activeNote
    },
    <span class="hljs-attr">methods</span>: {
      <span class="hljs-comment">// 为什么这么做？ 因为在严格模式中不允许直接在模板层面去修改 state 中的值</span>
      updateNote() {
        <span class="hljs-keyword">this</span>.editNote(<span class="hljs-keyword">this</span>.currentNote);
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>在 Editor.vue 组件中，我们需要能够实时的更新当前的 activeNote 组件和列表中对应的我们正在修改的笔记对象的内容。</p>
<p>由于我们前面提到过，在组件中是不允许直接修改 store.js在里面的状态值的，所以在这里的时候，我们通过一个计算属性，将 store 里面的状态值赋值给一个对象，然后在自定义的 updateNotes() 方法中，去调用 action,同时传入 currentNote 对象。</p>
<p>在 store.js 中，我们是这么做的，找到对应的 id 的对象，重新赋值，因为前面提到过，我们的数据是响应式的，在这里进行了改变，对应的视图也将刷新改变，这样一来就实现了实时编辑，实时渲染的功能了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 修改笔记
EDIT_NOTE(state, note) {
  state.activeNote = note;
  // 修改原始数据
  for (var i = 0; i < state.notes.length; i++) {
    if(state.notes[i].id === note.id){
      state.notes[i] = note;
      break;
    }
  };
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 修改笔记</span>
EDIT_NOTE(state, note) {
  state.activeNote = note;
  <span class="hljs-comment">// 修改原始数据</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; state.notes.length; i++) {
    <span class="hljs-keyword">if</span>(state.notes[i].id === note.id){
      state.notes[i] = note;
      <span class="hljs-keyword">break</span>;
    }
  };
},</code></pre>
<h2 id="articleHeader15">Q&amp;A</h2>
<p>在这个项目中，我们并没有引入 vue-resource 插件，只是自己模拟了部分的数据，有兴趣的同学可以自己去试试。</p>
<p>由于我们的例子相对简单，没有涉及到很深入的东西，更深层次的研究需要大家花更多的时间去实践了。</p>
<p>最后，再说一句，在 action 里面，我们其实可以做的还有更多，比如根据 id 动态的异步获取笔记内容等等，这些有兴趣的同学可以自己去尝试，一点点的丰富这个例子。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 Vuex + Vue.js 构建单页应用

## 原文链接
[https://segmentfault.com/a/1190000005863691](https://segmentfault.com/a/1190000005863691)

