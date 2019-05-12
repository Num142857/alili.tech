---
title: '用 Vuex 构建一个笔记应用' 
date: 2019-02-11 2:30:49
hidden: true
slug: 4q3cte6e2zu
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>原文：<a href="https://coligo.io/learn-vuex-by-building-notes-app/" rel="nofollow noreferrer" target="_blank">Learn Vuex by Building a Notes App</a>，有删改。</p></blockquote>
<p>本文假设读者熟悉 <a href="http://vuejs.github.io/vuex/en/index.html" rel="nofollow noreferrer" target="_blank">Vuex 文档</a> 的内容。如果不熟悉，you definitely should！</p>
<p>在这个教程里面，我们会通过构建一个笔记应用来学习怎么用 Vuex。我会简单地介绍一下 Vuex 的基础内容， 什么时候该用它以及用 Vuex 的时候该怎么组织代码，然后我会一步一步地把这些概念应用到这个笔记应用里面。</p>
<p>这个是我们要构建的笔记应用的截图：</p>
<p><span class="img-wrap"><img data-src="/img/bVvcH4" src="https://static.alili.tech/img/bVvcH4" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>你可以从 <a href="https://github.com/coligo-io/notes-app-vuejs-vuex" rel="nofollow noreferrer" target="_blank">Github Repo</a> 下载源码，这里是 <a href="https://coligo-io.github.io/notes-app-vuejs-vuex" rel="nofollow noreferrer" target="_blank">demo</a> 的地址。</p>
<h2 id="articleHeader0">Vuex 概述</h2>
<p>Vuex 是一个主要应用在中大型单页应用的类似于 <a href="https://facebook.github.io/flux/" rel="nofollow noreferrer" target="_blank">Flux</a> 的数据管理架构。它主要帮我们更好地组织代码，以及把应用内的的状态保持在可维护、可理解的状态。</p>
<p>如果你不太理解 Vue.js 应用里的状态是什么意思的话，你可以想象一下你此前写的 Vue 组件里面的 data 字段。Vuex 把状态分成<strong>组件内部状态</strong>和<strong>应用级别状态</strong>：</p>
<ul>
<li><p>组件内部状态：仅在一个组件内使用的状态(data 字段)</p></li>
<li><p>应用级别状态：多个组件共用的状态</p></li>
</ul>
<p>举个例子：比如说有一个父组件，它有两个子组件。这个父组件可以用 props 向子组件传递数据，这条数据通道很好理解。</p>
<p>那如果这两个子组件相互之间需要共享数据呢?或者子组件需要向父组件传递数据呢?这两个问题在应用体量较小的时候都好解决，只要用<a href="http://cn.vuejs.org/guide/components.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BA%8B%E4%BB%B6" rel="nofollow noreferrer" target="_blank">自定义事件</a>即可。</p>
<p>但是随着应用规模的扩大：</p>
<ul>
<li><p>追踪这些事件越来越难了。这个事件是哪个组件触发的？谁在监听它？</p></li>
<li><p>业务逻辑遍布各个组件，导致各种意想不到的问题。</p></li>
<li><p>由于要显式地分发和监听事件，父组件和子组件强耦合。</p></li>
</ul>
<p>Vuex 要解决的就是这些问题，Vuex 背后有四个核心的概念：</p>
<ul>
<li><p><strong>状态树</strong>: 包含所有应用级别状态的对象</p></li>
<li><p><strong>Getters</strong>: 在组件内部获取 store 中状态的函数</p></li>
<li><p><strong>Mutations</strong>: 修改状态的事件回调函数</p></li>
<li><p><strong>Actions</strong>: 组件内部用来分发 mutations 事件的函数</p></li>
</ul>
<p>下面这张图完美地解释了一个 Vuex 应用内部的数据流动：</p>
<p><span class="img-wrap"><img data-src="/img/bVvcIk" src="https://static.alili.tech/img/bVvcIk" alt="2.png" title="2.png" style="cursor: pointer;"></span></p>
<p>这张图的重点：</p>
<ul>
<li><p>数据流动是单向的</p></li>
<li><p>组件可以调用 actions</p></li>
<li><p>Actions 是用来分发 mutations 的</p></li>
<li><p>只有 mutations 可以修改状态</p></li>
<li><p>store 是反应式的，即，状态的变化会在组件内部得到反映</p></li>
</ul>
<h2 id="articleHeader1">搭建项目</h2>
<p>项目结构是这样的： </p>
<p><span class="img-wrap"><img data-src="/img/bVvcIx" src="https://static.alili.tech/img/bVvcIx" alt="3.png" title="3.png" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li><p><strong>components/</strong>包含所有的组件</p></li>
<li><p><strong>vuex/</strong>包含 Vuex 相关的文件 (store, actions)</p></li>
<li><p><strong>build.js</strong>是 webpack 将要输出的文件</p></li>
<li><p><strong>index.html</strong>是要渲染的页面</p></li>
<li><p><strong>main.js</strong>是应用的入口点，包含了根实例</p></li>
<li><p><strong>style.css</strong></p></li>
<li><p><strong>webpack.config.js</strong></p></li>
</ul>
<p>新建项目：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mkdir vuex-notes-app &amp;&amp; cd vuex-note-app
npm init -y" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">mkdir</span> vuex-<span class="hljs-keyword">notes</span>-<span class="hljs-keyword">app</span> &amp;&amp; <span class="hljs-keyword">cd</span> vuex-<span class="hljs-keyword">note</span>-<span class="hljs-keyword">app</span>
npm init -<span class="hljs-built_in">y</span></code></pre>
<p>安装依赖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install\
  webpack webpack-dev-server\
  vue-loader vue-html-loader css-loader vue-style-loader vue-hot-reload-api\
  babel-loader babel-core babel-plugin-transform-runtime babel-preset-es2015\
  babel-runtime@5\
  --save-dev

npm install vue vuex --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code><span class="hljs-built_in">npm</span> install<span class="hljs-string">\</span>
  webpack webpack-dev-server<span class="hljs-string">\</span>
  vue-loader vue-html-loader css-loader vue-style-loader vue-hot-reload-api<span class="hljs-string">\</span>
  babel-loader babel-core babel-plugin-transform-runtime babel-preset-es2015<span class="hljs-string">\</span>
  babel-runtime@<span class="hljs-number">5</span><span class="hljs-string">\</span>
  --save-dev

<span class="hljs-built_in">npm</span> install vue vuex --save</code></pre>
<p>然后配置 Webpack:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
module.exports = {
  entry: './main.js',
  output: {
    path: __dirname,
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: <span class="hljs-string">'./main.js'</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: __dirname,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'build.js'</span>
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">loaders</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'vue'</span>
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel'</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>
      }
    ]
  },
  <span class="hljs-attr">babel</span>: {
    <span class="hljs-attr">presets</span>: [<span class="hljs-string">'es2015'</span>],
    <span class="hljs-attr">plugins</span>: [<span class="hljs-string">'transform-runtime'</span>]
  }
}</code></pre>
<p>然后在 package.json 里面配置一下 npm script:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
  &quot;dev&quot;: &quot;webpack-dev-server --inline --hot&quot;,
  &quot;build&quot;: &quot;webpack -p&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"scripts"</span>: {
  <span class="hljs-string">"dev"</span>: <span class="hljs-string">"webpack-dev-server --inline --hot"</span>,
  <span class="hljs-string">"build"</span>: <span class="hljs-string">"webpack -p"</span>
}</code></pre>
<p>后面测试和生产的时候直接运行<code>npm run dev</code>和<code>npm run build</code>就行了。</p>
<h2 id="articleHeader2">创建 Vuex Store</h2>
<p>在 vuex/文件夹下创建一个 store.js:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  notes: [],
  activeNote: {}
}

const mutations = { ... }

export default new Vuex.Store({
  state,
  mutations
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>

Vue.use(Vuex)

<span class="hljs-keyword">const</span> state = {
  <span class="hljs-attr">notes</span>: [],
  <span class="hljs-attr">activeNote</span>: {}
}

<span class="hljs-keyword">const</span> mutations = { ... }

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vuex.Store({
  state,
  mutations
})</code></pre>
<p>现在我用下面这张图把应用分解成多个组件，并把组件内部需要的数据对应到 store.js 里的 state。</p>
<p><span class="img-wrap"><img data-src="/img/bVvcIB" src="https://static.alili.tech/img/bVvcIB" alt="4.png" title="4.png" style="cursor: pointer;"></span></p>
<ul>
<li><p><strong>App</strong>, 根组件，就是最外面那个红色的盒子</p></li>
<li><p><strong>Toolbar</strong> 是左边的绿色竖条，包括三个按钮</p></li>
<li><p><strong>NotesList</strong> 是包含了笔记标题列表的紫色框。用户可以点击所有笔记(All Notes)或者收藏笔记(Favorites)</p></li>
<li><p><strong>Editor</strong> 是右边这个可以编辑笔记内容的黄色框</p></li>
</ul>
<p>store.js 里面的状态对象会包含所有应用级别的状态，也就是各个组件需要共享的状态。</p>
<p>笔记列表(<code>notes: []</code>)包含了 NodesList 组件要渲染的 notes 对象。当前笔记(activeNote: {})则包含当前选中的笔记对象，多个组件都需要这个对象：</p>
<ul>
<li><p>Toolbar 组件的收藏和删除按钮都对应这个对象</p></li>
<li><p>NotesList 组件通过 CSS 高亮显示这个对象</p></li>
<li><p>Editor 组件展示及编辑这个笔记对象的内容。</p></li>
</ul>
<p>聊完了状态(state),我们来看看 mutations, 我们要实现的 mutation 方法包括：</p>
<ul>
<li><p>添加笔记到数组里 (state.notes)</p></li>
<li><p>把选中的笔记设置为「当前笔记」(state.activeNote)</p></li>
<li><p>删掉当前笔记</p></li>
<li><p>编辑当前笔记</p></li>
<li><p>收藏/取消收藏当前笔记</p></li>
</ul>
<p>首先,要添加一条新笔记，我们需要做的是：</p>
<ul>
<li><p>新建一个对象</p></li>
<li><p>初始化属性</p></li>
<li><p>push 到<code>state.notes</code>里去</p></li>
<li><p>把新建的这条笔记设为当前笔记(activeNote)</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ADD_NOTE (state) {
  const new Note = {
    text: 'New note',
    favorite: fals
  }
  state.notes.push(newNote)
  state.activeNote=  newNote
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">ADD_NOTE (state) {
  <span class="hljs-keyword">const</span> <span class="hljs-keyword">new</span> Note = {
    <span class="hljs-attr">text</span>: <span class="hljs-string">'New note'</span>,
    <span class="hljs-attr">favorite</span>: fals
  }
  state.notes.push(newNote)
  state.activeNote=  newNote
}</code></pre>
<p>然后，编辑笔记需要用笔记内容 text 作参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="EDIT_NOTE (state, text) {
  state.activeNote.text = text
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">EDIT_NOTE (state, text) {
  state.activeNote.text = text
}</code></pre>
<p>剩下的这些 mutations 很简单就不一一赘述了。整个 vuex/store.js 是这个样子的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  note: [],
  activeNote: {}
}

const mutations = {
  ADD_NOTE (state) {
    const newNote = {
      text: 'New Note',
      favorite: false
    }
    state.notes.push(newNote)
    state.activeNote = newNote
  },

  EDIT_NOTE (state, text) {
    state.activeNote.text = text
  },

  DELETE_NOTE (state) {
    state.notes.$remove(state.activeNote)
    state.activeNote = state.notes[0]
  },

  TOGGLE_FAVORITE (state) {
    state.activeNote.favorite = !state.activeNote.favorite
  },

  SET_ACTIVE_NOTE (state, note) {
    state.activeNote = note
  }
}

export default new Vuex.Store({
  state,
  mutations
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>

Vue.use(Vuex)

<span class="hljs-keyword">const</span> state = {
  <span class="hljs-attr">note</span>: [],
  <span class="hljs-attr">activeNote</span>: {}
}

<span class="hljs-keyword">const</span> mutations = {
  ADD_NOTE (state) {
    <span class="hljs-keyword">const</span> newNote = {
      <span class="hljs-attr">text</span>: <span class="hljs-string">'New Note'</span>,
      <span class="hljs-attr">favorite</span>: <span class="hljs-literal">false</span>
    }
    state.notes.push(newNote)
    state.activeNote = newNote
  },

  EDIT_NOTE (state, text) {
    state.activeNote.text = text
  },

  DELETE_NOTE (state) {
    state.notes.$remove(state.activeNote)
    state.activeNote = state.notes[<span class="hljs-number">0</span>]
  },

  TOGGLE_FAVORITE (state) {
    state.activeNote.favorite = !state.activeNote.favorite
  },

  SET_ACTIVE_NOTE (state, note) {
    state.activeNote = note
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vuex.Store({
  state,
  mutations
})</code></pre>
<p>接下来聊 actions, actions 是组件内用来分发 mutations 的函数。它们接收 store 作为第一个参数。比方说，当用户点击 Toolbar 组件的添加按钮时，我们想要调用一个能分发<code>ADD_NOTE</code> mutation 的 action。现在我们在 vuex/文件夹下创建一个 actions.js 并在里面写上 <code>addNote</code>函数:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// actions.js
export const addNote = ({ dispatch }) => {
  dispatch('ADD_NOTE')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// actions.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> addNote = <span class="hljs-function">(<span class="hljs-params">{ dispatch }</span>) =&gt;</span> {
  dispatch(<span class="hljs-string">'ADD_NOTE'</span>)
}</code></pre>
<p>剩下的这些 actions 都跟这个差不多：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const addNote = ({ dispatch }) => {
  dispatch('ADD_NOTE')
}

export const editNote = ({ dispatch }, e) => {
  dispatch('EDIT_NOTE', e.target.value)
}

export const deleteNote = ({ dispatch }) => {
  dispatch('DELETE_NOTE')
}

export const updateActiveNote = ({ dispatch }, note) => {
  dispatch('SET_ACTIVE_NOTE', note)
}

export const toggleFavorite = ({ dispatch }) => {
  dispatch('TOGGLE_FAVORITE')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> addNote = <span class="hljs-function">(<span class="hljs-params">{ dispatch }</span>) =&gt;</span> {
  dispatch(<span class="hljs-string">'ADD_NOTE'</span>)
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> editNote = <span class="hljs-function">(<span class="hljs-params">{ dispatch }, e</span>) =&gt;</span> {
  dispatch(<span class="hljs-string">'EDIT_NOTE'</span>, e.target.value)
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> deleteNote = <span class="hljs-function">(<span class="hljs-params">{ dispatch }</span>) =&gt;</span> {
  dispatch(<span class="hljs-string">'DELETE_NOTE'</span>)
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> updateActiveNote = <span class="hljs-function">(<span class="hljs-params">{ dispatch }, note</span>) =&gt;</span> {
  dispatch(<span class="hljs-string">'SET_ACTIVE_NOTE'</span>, note)
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> toggleFavorite = <span class="hljs-function">(<span class="hljs-params">{ dispatch }</span>) =&gt;</span> {
  dispatch(<span class="hljs-string">'TOGGLE_FAVORITE'</span>)
}</code></pre>
<p>这样，在 vuex 文件夹里面要写的代码就都写完了。这里面包括了 store.js 里的 state 和 mutations,以及 actions.js 里面用来分发 mutations 的 actions。</p>
<h2 id="articleHeader3">构建 Vue 组件</h2>
<p>最后这个小结，我们来实现四个组件 (App, Toolbar, NoteList 和 Editor) 并学习怎么在这些组件里面获取 Vuex store 里的数据以及调用 actions。</p>
<h3 id="articleHeader4">创建根实例 - main.js</h3>
<p><strong>main.js</strong>是应用的入口文件，里面有根实例，我们要把 Vuex store 加到到这个根实例里面，进而注入到它所有的子组件里面：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import store from './vuex/store'
import App from './components/App.vue'

new Vue({
  store, // 注入到所有子组件
  el: 'body',
  components: { App }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./vuex/store'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/App.vue'</span>

<span class="hljs-keyword">new</span> Vue({
  store, <span class="hljs-comment">// 注入到所有子组件</span>
  el: <span class="hljs-string">'body'</span>,
  <span class="hljs-attr">components</span>: { App }
})</code></pre>
<h3 id="articleHeader5">App - 根组件</h3>
<p>根组件 <strong>App</strong> 会 import 其余三个组件：Toolbar, NotesList 和 Editor:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <toolbar></toolbar>
    <notes-list></notes-list>
    <editor></editor>
  </div>
</template>

<script>
import Toolbar from './Toolbar.vue'
import NotesList from './NotesList.vue'
import Editor from './Editor.vue'

export default {
  components: {
    Toolbar,
    NotesList,
    Editor
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">toolbar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">toolbar</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">notes-list</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">notes-list</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">editor</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">editor</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Toolbar <span class="hljs-keyword">from</span> <span class="hljs-string">'./Toolbar.vue'</span>
<span class="hljs-keyword">import</span> NotesList <span class="hljs-keyword">from</span> <span class="hljs-string">'./NotesList.vue'</span>
<span class="hljs-keyword">import</span> Editor <span class="hljs-keyword">from</span> <span class="hljs-string">'./Editor.vue'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> </span></span><span class="hljs-template-variable">{
  components: {
    Toolbar,
    NotesList,
    Editor
  }</span><span class="xml"><span class="undefined">
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>把 App 组件放到 index.html 里面，用 BootStrap 提供基本样式，在 style.css 里写组件相关的样式:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- index.html -->

<!DOCTYPE html>
<html lang=&quot;en&quot;>
  <head>
    <meta charset=&quot;utf-8&quot;>
    <title>Notes | coligo.io</title>
    <link rel=&quot;stylesheet&quot; href=&quot;https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css&quot;>
    <link rel=&quot;stylesheet&quot; href=&quot;styles.css&quot;>
  </head>
  <body>
    <app></app>
    <script src=&quot;build.js&quot;></script>
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;!-- index.html --&gt;

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="utf-8"&gt;
    &lt;title&gt;Notes | coligo.io&lt;/title&gt;
    &lt;link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"&gt;
    &lt;link rel="stylesheet" href="styles.css"&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;app&gt;&lt;/app&gt;
    &lt;script src="build.js"&gt;&lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
<h3 id="articleHeader6">Toolbar</h3>
<p>Toolbar 组件提供给用户三个按钮：创建新笔记，收藏当前选中的笔记和删除当前选中的笔记。</p>
<p><span class="img-wrap"><img data-src="/img/bVvcIC" src="https://static.alili.tech/img/bVvcIC" alt="5.png" title="5.png" style="cursor: pointer;"></span></p>
<p>这对于 Vuex 来说是个绝佳的用例，因为 Toolbar 组件需要知道「当前选中的笔记」是哪一条，这样我们才能删除、收藏/取消收藏它。前面说了「当前选中的笔记」是各个组件都需要的，不应该单独存在于任何一个组件里面，这时候我们就能发现共享数据的必要性了。</p>
<p>每当用户点击笔记列表中的某一条时，NodeList 组件会调用<code>updateActiveNote()</code> action 来分发 <code>SET_ACTIVE_NOTE</code> mutation, 这个 mutation 会把当前选中的笔记设为 <code>activeNote</code>。</p>
<p>也就是说，Toolbar 组件需要从 state 获取 <code>activeNote</code> 属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vuex: {
  getters: {
    activeNote: state => state.activeNote
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">vuex: {
  <span class="hljs-attr">getters</span>: {
    <span class="hljs-attr">activeNote</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.activeNote
  }
}</code></pre>
<p>我们也需要把这三个按钮所对应的 actions 引进来,因此 Toolbar.vue 就是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;toolbar&quot;>
    <i @click=&quot;addNote&quot; class=&quot;glyphicon glyphicon-plus&quot;></i>
    <i @click=&quot;toggleFavorite&quot;
      class=&quot;glyphicon glyphicon-star&quot;
      :class=&quot;{starred: activeNote.favorite}&quot;></i>
    <i @click=&quot;deleteNote&quot; class=&quot;glyphicon glyphicon-remove&quot;></i>
  </div>
</template>

<script>
import { addNote, deleteNote, toggleFavorite } from '../vuex/actions'

export default {
  vuex: {
    getters: {
      activeNote: state => state.activeNote
    },
    actions: {
      addNote,
      deleteNote,
      toggleFavorite
    }
  }
}
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"toolbar"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">i</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"addNote"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"glyphicon glyphicon-plus"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">i</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"toggleFavorite"</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">"glyphicon glyphicon-star"</span>
      <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{starred: activeNote.favorite}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">i</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"deleteNote"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"glyphicon glyphicon-remove"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
<span class="hljs-meta"><span class="hljs-meta-keyword">import</span> </span></span></span><span class="hljs-template-variable">{ addNote, deleteNote, toggleFavorite }</span><span class="xml"><span class="javascript"> <span class="hljs-keyword">from</span> <span class="hljs-string">'../vuex/actions'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> </span></span><span class="hljs-template-variable">{
  vuex: {
    getters: {
      activeNote: state =&gt; state.activeNote
    }</span><span class="xml"><span class="undefined">,
    actions: </span></span><span class="hljs-template-variable">{
      addNote,
      deleteNote,
      toggleFavorite
    }</span><span class="xml"><span class="undefined">
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<p>注意到当 <code>activeNote.favorite === true</code>的时候，收藏按钮还有一个 starred 的类名，这个类的作用是对收藏按钮提供高亮显示。</p>
<p><span class="img-wrap"><img data-src="/img/bVvcIZ" src="https://static.alili.tech/img/bVvcIZ" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">NotesList</h3>
<p>NotesList 组件主要有三个功能：</p>
<ol>
<li><p>把笔记列表渲染出来</p></li>
<li><p>允许用户选择"所有笔记"或者只显示"收藏的笔记"</p></li>
<li><p>当用户点击某一条时，调用<code>updateActiveNote</code>action 来更新 store 里的 <code>activeNote</code></p></li>
</ol>
<p>显然，在 NoteLists 里需要 store 里的<code>notes array</code>和<code>activeNote</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vuex: {
  getters: {
    notes: state => state.notes,
    activeNote: state => state.activeNote
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">vuex: {
  <span class="hljs-attr">getters</span>: {
    <span class="hljs-attr">notes</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.notes,
    <span class="hljs-attr">activeNote</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.activeNote
  }
}</code></pre>
<p>当用户点击某一条笔记时，把它设为当前笔记：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { updateActiveNote } from '../vuex/actions'

export default {
  vuex: {
    getters: {
      // as shown above
    },
    actions: {
      updateActiveNote
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { updateActiveNote } <span class="hljs-keyword">from</span> <span class="hljs-string">'../vuex/actions'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">vuex</span>: {
    <span class="hljs-attr">getters</span>: {
      <span class="hljs-comment">// as shown above</span>
    },
    <span class="hljs-attr">actions</span>: {
      updateActiveNote
    }
  }
}</code></pre>
<p>接下来，根据用户点击的是"所有笔记"还是"收藏笔记"来展示过滤后的列表：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { updateActiveNote } from '../vuex/actions'

export default {
  data () {
    return {
      show: 'all'
    }
  },
  vuex: {
    // as shown above
  },
  computed: {
    filteredNotes () {
      if (this.show === 'all'){
        return this.notes
      } else if (this.show === 'favorites') {
        return this.notes.filter(note => note.favorite)
      }
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { updateActiveNote } <span class="hljs-keyword">from</span> <span class="hljs-string">'../vuex/actions'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">show</span>: <span class="hljs-string">'all'</span>
    }
  },
  <span class="hljs-attr">vuex</span>: {
    <span class="hljs-comment">// as shown above</span>
  },
  <span class="hljs-attr">computed</span>: {
    filteredNotes () {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.show === <span class="hljs-string">'all'</span>){
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.notes
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.show === <span class="hljs-string">'favorites'</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.notes.filter(<span class="hljs-function"><span class="hljs-params">note</span> =&gt;</span> note.favorite)
      }
    }
  }
}</code></pre>
<p>在这里组件内的 show 属性是作为组件内部状态出现的，很明显，它只在 NoteList 组件内出现。</p>
<p>以下是完整的 NotesList.vue:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;notes-list&quot;>

    <div id=&quot;list-header&quot;>
      <h2>Notes | coligo</h2>
      <div class=&quot;btn-group btn-group-justified&quot; role=&quot;group&quot;>
        <!-- All Notes button -->
        <div class=&quot;btn-group&quot; role=&quot;group&quot;>
          <button type=&quot;button&quot; class=&quot;btn btn-default&quot;
            @click=&quot;show = 'all'&quot;
            :class=&quot;{active: show === 'all'}&quot;>
            All Notes
          </button>
        </div>
        <!-- Favorites Button -->
        <div class=&quot;btn-group&quot; role=&quot;group&quot;>
          <button type=&quot;button&quot; class=&quot;btn btn-default&quot;
            @click=&quot;show = 'favorites'&quot;
            :class=&quot;{active: show === 'favorites'}&quot;>
            Favorites
          </button>
        </div>
      </div>
    </div>
    <!-- render notes in a list -->
    <div class=&quot;container&quot;>
      <div class=&quot;list-group&quot;>
        <a v-for=&quot;note in filteredNotes&quot;
          class=&quot;list-group-item&quot; href=&quot;#&quot;
          :class=&quot;{active: activeNote === note}&quot;
          @click=&quot;updateActiveNote(note)&quot;>
          <h4 class=&quot;list-group-item-heading&quot;>
            "{{"note.text.trim().substring(0, 30)"}}"
          </h4>
        </a>
      </div>
    </div>

  </div>
</template>

<script>
import { updateActiveNote } from '../vuex/actions'

export default {
  data () {
    return {
      show: 'all'
    }
  },
  vuex: {
    getters: {
      notes: state => state.notes,
      activeNote: state => state.activeNote
    },
    actions: {
      updateActiveNote
    }
  },
  computed: {
    filteredNotes () {
      if (this.show === 'all'){
        return this.notes
      } else if (this.show === 'favorites') {
        return this.notes.filter(note => note.favorite)
      }
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code class="vue"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"notes-list"</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"list-header"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Notes | coligo<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn-group btn-group-justified"</span> <span class="hljs-attr">role</span>=<span class="hljs-string">"group"</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- All Notes button --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn-group"</span> <span class="hljs-attr">role</span>=<span class="hljs-string">"group"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-default"</span>
            @<span class="hljs-attr">click</span>=<span class="hljs-string">"show = 'all'"</span>
            <span class="hljs-attr">:class</span>=<span class="hljs-string">"{active: show === 'all'}"</span>&gt;</span>
            All Notes
          <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- Favorites Button --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn-group"</span> <span class="hljs-attr">role</span>=<span class="hljs-string">"group"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-default"</span>
            @<span class="hljs-attr">click</span>=<span class="hljs-string">"show = 'favorites'"</span>
            <span class="hljs-attr">:class</span>=<span class="hljs-string">"{active: show === 'favorites'}"</span>&gt;</span>
            Favorites
          <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- render notes in a list --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list-group"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"note in filteredNotes"</span>
          <span class="hljs-attr">class</span>=<span class="hljs-string">"list-group-item"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>
          <span class="hljs-attr">:class</span>=<span class="hljs-string">"{active: activeNote === note}"</span>
          @<span class="hljs-attr">click</span>=<span class="hljs-string">"updateActiveNote(note)"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h4</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list-group-item-heading"</span>&gt;</span>
            </span><span class="hljs-template-variable">"{{"note.text.trim().substring(0, 30)"}}"</span><span class="xml">
          <span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> { updateActiveNote } <span class="hljs-keyword">from</span> <span class="hljs-string">'../vuex/actions'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">show</span>: <span class="hljs-string">'all'</span>
    }
  },
  <span class="hljs-attr">vuex</span>: {
    <span class="hljs-attr">getters</span>: {
      <span class="hljs-attr">notes</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.notes,
      <span class="hljs-attr">activeNote</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.activeNote
    },
    <span class="hljs-attr">actions</span>: {
      updateActiveNote
    }
  },
  <span class="hljs-attr">computed</span>: {
    filteredNotes () {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.show === <span class="hljs-string">'all'</span>){
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.notes
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.show === <span class="hljs-string">'favorites'</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.notes.filter(<span class="hljs-function"><span class="hljs-params">note</span> =&gt;</span> note.favorite)
      }
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>这个组件的几个要点：</p>
<ul>
<li><p>用前30个字符当作该笔记的标题</p></li>
<li><p>当用户点击一条笔记，该笔记变成当前选中笔记</p></li>
<li><p>在"all"和"favorite"之间选择实际上就是设置 show 属性</p></li>
<li><p>通过<code>:class=""</code>设置样式</p></li>
</ul>
<h3 id="articleHeader8">Editor</h3>
<p>Editor 组件是最简单的，它只做两件事：</p>
<ul>
<li><p>从 store 获取当前笔记<code>activeNote</code>，把它的内容展示在 textarea</p></li>
<li><p>在用户更新笔记的时候，调用 <code>editNote()</code> action</p></li>
</ul>
<p>以下是完整的 Editor.vue:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;note-editor&quot;>
    <textarea
      :value=&quot;activeNoteText&quot;
      @input=&quot;editNote&quot;
      class=&quot;form-control&quot;>
    </textarea>
  </div>
</template>

<script>
import { editNote } from '../vuex/actions'

export default {
  vuex: {
    getters: {
      activeNoteText: state => state.activeNote.text
    },
    actions: {
      editNote
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code class="vue"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"note-editor"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span>
      <span class="hljs-attr">:value</span>=<span class="hljs-string">"activeNoteText"</span>
      @<span class="hljs-attr">input</span>=<span class="hljs-string">"editNote"</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">"form-control"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
<span class="hljs-meta"><span class="hljs-meta-keyword">import</span> </span></span></span><span class="hljs-template-variable">{ editNote }</span><span class="xml"><span class="javascript"> <span class="hljs-keyword">from</span> <span class="hljs-string">'../vuex/actions'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> </span></span><span class="hljs-template-variable">{
  vuex: {
    getters: {
      activeNoteText: state =&gt; state.activeNote.text
    }</span><span class="xml"><span class="undefined">,
    actions: </span></span><span class="hljs-template-variable">{
      editNote
    }</span><span class="xml"><span class="undefined">
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>这里的 textarea 不用 v-model 的原因在 vuex 文档里面有<a href="http://vuejs.github.io/vuex/en/forms.html" rel="nofollow noreferrer" target="_blank">详细的说明</a>。</p>
<p>至此，这个应用的代码就写完了，不明白的地方可以看<a href="https://github.com/coligo-io/notes-app-vuejs-vuex" rel="nofollow noreferrer" target="_blank">源代码</a>, 然后动手操练一遍。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用 Vuex 构建一个笔记应用

## 原文链接
[https://segmentfault.com/a/1190000005015164](https://segmentfault.com/a/1190000005015164)

