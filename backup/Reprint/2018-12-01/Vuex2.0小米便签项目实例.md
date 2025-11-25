---
title: 'Vuex2.0小米便签项目实例' 
date: 2018-12-01 2:30:12
hidden: true
slug: m8vrwrkkw7d
categories: [reprint]
---

{{< raw >}}

                    
<p>本文对Vue和Vuex有一定基础的同学更容易掌握，如对Vue和Vuex不是很熟悉的同学，请先移步<a href="https://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">Vue官网</a>自行学习</p>
<p>在这个教程中，我们会通过构建一个小米便签应用来学习怎么使用Vuex,开始我会简单的介绍Vuex的一些基础内容，什么时候使用以及用Vuex怎么组织代码，然后一步一步的把这些概念应用到小米便签应用里面。</p>
<p>废话不多说，先给大家看一下小米便签应用的截图：</p>
<p><span class="img-wrap"><img data-src="/img/bVbaiVd?w=830&amp;h=772" src="https://static.alili.tech/img/bVbaiVd?w=830&amp;h=772" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>你可以从<a href="https://github.com" rel="nofollow noreferrer" target="_blank">GitHub</a>上下载源码，这里是<a href="https://github.com/tianlang89757/vuex-notepad2" rel="nofollow noreferrer" target="_blank">项目源代码</a>的地址和<a href="https://tianlang89757.github.io/vuex-notepad2/dist/index.html#/" rel="nofollow noreferrer" target="_blank">在线预览</a>地址，安装成功后推荐使用chrome的设备模式查看效果更佳。</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVbaiYg?w=1595&amp;h=828" src="https://static.alili.tech/img/bVbaiYg?w=1595&amp;h=828" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">Vuex概述</h2>
<p>Vuex 是一个专门为 Vue.js 应用所设计的集中式状态管理架构，它借鉴了 Flux 和 Redux 的设计思想，但简化了概念，并且采用了一种为能更好发挥 Vue.js 数据响应机制而专门设计的实现。</p>
<p>如果你不太理解 Vue.js 应用里的状态是什么意思的话，你可以想象一下你此前写的 Vue 组件里面的 data 字段。Vuex 把状态分成组件内部状态和应用级别状态：</p>
<ul>
<li>组件内部状态：仅在一个组件内使用的状态(data 字段)</li>
<li>应用级别状态：多个组件共用的状态</li>
</ul>
<p>举个例子：比如说有一个父组件，它有两个子组件。这个父组件可以用 props 向子组件传递数据，这条数据通道很好理解。</p>
<p>那如果这两个子组件相互之间需要共享数据呢?或者子组件需要向父组件传递数据呢?这两个问题在应用体量较小的时候都好解决，只要用自定义事件即可。</p>
<p>但是随着应用规模的扩大：</p>
<ul>
<li>追踪这些事件越来越难了。这个事件是哪个组件触发的？谁在监听它？</li>
<li>业务逻辑遍布各个组件，导致各种意想不到的问题。</li>
<li>由于要显式地分发和监听事件，父组件和子组件强耦合。</li>
</ul>
<p>Vuex 要解决的就是这些问题，Vuex 背后有四个核心的概念：</p>
<ul>
<li>State: 包含所有应用级别状态的对象</li>
<li>Getters: 在组件内部获取 store 中状态的函数</li>
<li>Mutations: 修改状态的事件回调函数</li>
<li>Actions: 组件内部用来分发 mutations 事件的函数</li>
</ul>
<p>下面这张图完美地解释了一个 Vuex 应用内部的数据流动：</p>
<p><span class="img-wrap"><img data-src="/img/bVDxBu?w=701&amp;h=551" src="https://static.alili.tech/img/bVDxBu?w=701&amp;h=551" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>这张图的重点：</p>
<p>数据流动是单向的</p>
<ul>
<li>组件可以调用 actions</li>
<li>Actions 是用来分发 mutations 的</li>
<li>只有 mutations 可以修改状态</li>
<li>store 是反应式的，即，状态的变化会在组件内部得到反映</li>
</ul>
<h2 id="articleHeader1">搭建项目</h2>
<p>项目结构：</p>
<p><span class="img-wrap"><img data-src="/img/bVbai58?w=196&amp;h=475" src="https://static.alili.tech/img/bVbai58?w=196&amp;h=475" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>项目主要文件存放于src目录下：</p>
<ul>
<li>
<strong>assets</strong>/公共图片，css文件</li>
<li>
<strong>components</strong>/包含所有组件</li>
<li>
<strong>libs</strong>/扩展文件</li>
<li>
<strong>router</strong>/路由文件</li>
<li>
<strong>store</strong>/vuex相关文件(state,actions,getters,mutation)</li>
<li>
<strong>App.vue</strong>根组件</li>
<li>
<strong>main.js</strong>应用总入口</li>
</ul>
<p>新建项目：</p>
<p>使用vue-cli脚手架，可用于快速搭建大型单页应用。该工具为现代化的前端开发工作流提供了开箱即用的构建配置。只需几分钟即可创建并启动一个带热重载、保存时静态检查以及可用于生产环境的构建配置的项目：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 安装vue
npm install vue
# 全局安装 vue-cli
npm install --global vue-cli
# 创建一个基于 webpack 模板的新项目
vue init webpack notepad-xiaomi
# 安装依赖，走你
cd notepad-xiaomi
# 安装依赖
npm install muse-ui vue-awesome --save
# 安装vuex
npm install vue vuex --save
# 运行
npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vala"><code><span class="hljs-meta"># 安装vue</span>
npm install vue
<span class="hljs-meta"># 全局安装 vue-cli</span>
npm install --global vue-cli
<span class="hljs-meta"># 创建一个基于 webpack 模板的新项目</span>
vue init webpack notepad-xiaomi
<span class="hljs-meta"># 安装依赖，走你</span>
cd notepad-xiaomi
<span class="hljs-meta"># 安装依赖</span>
npm install muse-ui vue-awesome --save
<span class="hljs-meta"># 安装vuex</span>
npm install vue vuex --save
<span class="hljs-meta"># 运行</span>
npm run dev</code></pre>
<p>使用vue-cli脚手架创建项目时，一定要安装vue-router插件。<br><strong>安装依赖后再main.js中引用</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVbajg9?w=660&amp;h=551" src="https://static.alili.tech/img/bVbajg9?w=660&amp;h=551" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">创建Vuex Store</h2>
<p>在store文件夹下创建第一个index.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutation'
import * as getters from './getters'
import * as actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
<span class="hljs-keyword">import</span> state <span class="hljs-keyword">from</span> <span class="hljs-string">'./state'</span>
<span class="hljs-keyword">import</span> mutations <span class="hljs-keyword">from</span> <span class="hljs-string">'./mutation'</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> getters <span class="hljs-keyword">from</span> <span class="hljs-string">'./getters'</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> actions <span class="hljs-keyword">from</span> <span class="hljs-string">'./actions'</span>

Vue.use(Vuex)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vuex.Store({
    state,
    mutations,
    getters,
    actions
})</code></pre>
<p>现在我用下面这张图把应用分解成多个组件，并把组件内部需要的数据对应到 store.js 里的 state。</p>
<p><span class="img-wrap"><img data-src="/img/bVbajpc?w=392&amp;h=684" src="https://static.alili.tech/img/bVbajpc?w=392&amp;h=684" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVbajpC?w=397&amp;h=688" src="https://static.alili.tech/img/bVbajpC?w=397&amp;h=688" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVbajqa?w=402&amp;h=689" src="https://static.alili.tech/img/bVbajqa?w=402&amp;h=689" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVbajtc?w=410&amp;h=701" src="https://static.alili.tech/img/bVbajtc?w=410&amp;h=701" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>App根组件，第一幅图中的红色盒子<br>Header头部组件，第一幅图中的绿色盒子<br>NoteList列表组件，第一幅图中的橙色盒子<br>ToolBar工具栏组件，第一幅图中的蓝色盒子（包括删除和移动按钮）<br>Editor编辑组件，第二幅图，<br>NoteFolder便签夹组件，第三幅图<br>TrashHeader废纸篓头部组件，第四幅图蓝色盒子<br>TrashNoteList废纸篓列表组件，第四幅图灰色盒子<br>TrashToolBar废纸篓工具栏组件，第四幅图黄色盒子</p>
<p>state.js里面的状态对象会包含所有应用级别的状态，也就是各个组件需要共享的状态。<br>笔记列表(<strong>notes: []</strong>)包含了 NodesList 组件要渲染的 notes 对象。当前便签(activeNote: {})则包含当前编辑的便签对象，多个组件都需要这个对象。</p>
<p>聊完了状态state,我们来看看 mutations, 我们要实现的 mutation 方法包括：</p>
<ul>
<li>添加标签到notes数组中</li>
<li>编辑选中便签</li>
<li>删除便签</li>
<li>便签布局</li>
<li>勾选便签</li>
<li>全部/取消勾选便签</li>
<li>保存便签</li>
<li>勾选废纸篓便签</li>
<li>全部/取消勾选废纸篓便签</li>
<li>恢复废纸篓便签</li>
</ul>
<p>mutation-types中用于将常量放在单独的文件中，方便协作开发。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const NEW_NOTE = 'NEW_NOTE'
export const EDIT_NOTE = 'EDIT_NOTE'
export const TOGGLE_NOTE = 'TOGGLE_NOTE'
export const CANCEL_CHECK = 'CANCEL_CHECK'
export const ALL_CHECK = 'ALL_CHECK'
export const DELETE_NOTE = 'DELETE_NOTE'
export const BACK_SAVE = 'BACK_SAVE'
export const TOGGLE_TRASHNOTE = 'TOGGLE_TRASHNOTE'
export const CANCEL_TRASHCHECk = 'CANCEL_TRASHCHECk'
export const ALL_TRASHCHECK = 'ALL_TRASHCHECK'
export const DELETE_TRASHNOTE = 'DELETE_TRASHNOTE'
export const RECOVERY_NOTE = 'RECOVERY_NOTE'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> NEW_NOTE = <span class="hljs-string">'NEW_NOTE'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> EDIT_NOTE = <span class="hljs-string">'EDIT_NOTE'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> TOGGLE_NOTE = <span class="hljs-string">'TOGGLE_NOTE'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> CANCEL_CHECK = <span class="hljs-string">'CANCEL_CHECK'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> ALL_CHECK = <span class="hljs-string">'ALL_CHECK'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> DELETE_NOTE = <span class="hljs-string">'DELETE_NOTE'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> BACK_SAVE = <span class="hljs-string">'BACK_SAVE'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> TOGGLE_TRASHNOTE = <span class="hljs-string">'TOGGLE_TRASHNOTE'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> CANCEL_TRASHCHECk = <span class="hljs-string">'CANCEL_TRASHCHECk'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> ALL_TRASHCHECK = <span class="hljs-string">'ALL_TRASHCHECK'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> DELETE_TRASHNOTE = <span class="hljs-string">'DELETE_TRASHNOTE'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> RECOVERY_NOTE = <span class="hljs-string">'RECOVERY_NOTE'</span></code></pre>
<p>首先，创建一条新的便签，我们需要做的是:</p>
<ul>
<li>新建一个对象</li>
<li>初始化属性</li>
<li>push到state.notes数组中</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[types.NEW_NOTE](state) {
    let newNote = {
        id: +new Date(),
        date: new Date().Format('yyyy-MM-dd hh:mm'),
        content: '',
        done: false
    }
    state.notes.push(newNote)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>[types.NEW_NOTE](<span class="hljs-name">state</span>) {
    let newNote = {
        id: +new Date(),
        date: new Date().Format(<span class="hljs-name">'yyyy-MM-dd</span> hh:mm'),
        content: '',
        done: <span class="hljs-literal">false</span>
    }
    state.notes.push(<span class="hljs-name">newNote</span>)
}</code></pre>
<p>然后，编辑便签需要用笔记内容 content 作参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[types.EDIT_NOTE](state, note) {
    state.activeNote = note;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>[<span class="hljs-string">types.EDIT_NOTE</span>](<span class="hljs-link">state, note</span>) {
<span class="hljs-code">    state.activeNote = note;</span>
}</code></pre>
<p>剩下的这些 mutations 很简单就不一一赘述了。整个 store/mutation.js 如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Format from '../libs/dateFormat'
import * as types from './mutation-types';

const mutations = {
    [types.NEW_NOTE](state) {
        let newNote = {
            id: +new Date(),
            date: new Date().Format('yyyy-MM-dd hh:mm'),
            content: '',
            done: false
        }
        state.notes.push(newNote)
    },
    [types.EDIT_NOTE](state, note) {
        state.activeNote = note;
    },
    [types.TOGGLE_NOTE](state, note) {
        state.notes.map((item, i) => {
            if (item.id == note.id) {
                item.done = !note.done;
            }
        })
        if (note.done) {
            state.deleteNotes.push(note);
        } else {
            state.deleteNotes.splice(state.deleteNotes.indexOf(note), 1);
        }
    },
    [types.CANCEL_CHECK](state) {
        state.notes.map((item, i) => {
            item.done = false;
        })
        state.deleteNotes = [];
        state.isCheck = false;
    },
    [types.ALL_CHECK](state, done) {
        state.deleteNotes = [];
        state.notes.map((item, i) => {
            item.done = done;
            if (done) {
                state.deleteNotes.push(item);
            } else {
                state.deleteNotes = [];
            }
        })
    },
    [types.DELETE_NOTE](state) {
        state.deleteNotes.map((item, i) => {
            item.done = false;
            state.notes.splice(state.notes.indexOf(item), 1);
            state.trashNotes.push(item)
        })
        state.isCheck = false;
        state.deleteNotes = [];
    },
    [types.BACK_SAVE](state, note) {
        if (note.content != '') return;
        state.notes.splice(state.notes.indexOf(note), 1);
    },
    [types.TOGGLE_TRASHNOTE](state, note) {
        state.trashNotes.map((item, i) => {
            if (item.id == note.id) {
                item.done = !note.done;
            }
        })
        if (note.done) {
            state.deleteTrashNotes.push(note);
        } else {
            state.deleteTrashNotes.splice(state.deleteTrashNotes.indexOf(note), 1);
        }
    },
    [types.CANCEL_TRASHCHECk](state) {
        state.trashNotes.map((item, i) => {
            item.done = false;
        })
        state.deleteTrashNotes = [];
        state.isTrashCheck = false;
    },
    [types.ALL_TRASHCHECK](state, done) {
        state.deleteTrashNotes = [];
        state.trashNotes.map((item, i) => {
            item.done = done;
            if (done) {
                state.deleteTrashNotes.push(item);
            } else {
                state.deleteTrashNotes = [];
            }
        })
    },
    [types.DELETE_TRASHNOTE](state) {
        state.deleteTrashNotes.map((item, i) => {
            state.trashNotes.splice(state.trashNotes.indexOf(item), 1);
        })
        state.deleteTrashNotes = [];
        state.isTrashCheck = false;
    },
    [types.RECOVERY_NOTE](state) {
        state.deleteTrashNotes.map((item, i) => {
            item.done = false;
            state.notes.unshift(item)
            state.trashNotes.splice(state.trashNotes.indexOf(item), 1);
        })
        state.deleteTrashNotes = [];
        state.isTrashCheck = false;
    }
}

export default mutations;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>import Format <span class="hljs-keyword">from</span> '../libs/dateFormat'
import * as types <span class="hljs-keyword">from</span> './mutation-types';

const mutations = {
    [types.NEW_NOTE](<span class="hljs-keyword">state</span>) {
        let newNote = {
            id: +new Date(),
            date: new Date().Format('yyyy-MM-dd hh:mm'),
            content: '',
            done: false
        }
        <span class="hljs-keyword">state</span>.notes.push(newNote)
    },
    [types.EDIT_NOTE](<span class="hljs-keyword">state</span>, note) {
        <span class="hljs-keyword">state</span>.activeNote = note;
    },
    [types.TOGGLE_NOTE](<span class="hljs-keyword">state</span>, note) {
        <span class="hljs-keyword">state</span>.notes.map((item, i) =&gt; {
            if (item.id == note.id) {
                item.done = !note.done;
            }
        })
        if (note.done) {
            <span class="hljs-keyword">state</span>.deleteNotes.push(note);
        } else {
            <span class="hljs-keyword">state</span>.deleteNotes.splice(<span class="hljs-keyword">state</span>.deleteNotes.indexOf(note), <span class="hljs-number">1</span>);
        }
    },
    [types.CANCEL_CHECK](<span class="hljs-keyword">state</span>) {
        <span class="hljs-keyword">state</span>.notes.map((item, i) =&gt; {
            item.done = false;
        })
        <span class="hljs-keyword">state</span>.deleteNotes = [];
        <span class="hljs-keyword">state</span>.isCheck = false;
    },
    [types.ALL_CHECK](<span class="hljs-keyword">state</span>, done) {
        <span class="hljs-keyword">state</span>.deleteNotes = [];
        <span class="hljs-keyword">state</span>.notes.map((item, i) =&gt; {
            item.done = done;
            if (done) {
                <span class="hljs-keyword">state</span>.deleteNotes.push(item);
            } else {
                <span class="hljs-keyword">state</span>.deleteNotes = [];
            }
        })
    },
    [types.DELETE_NOTE](<span class="hljs-keyword">state</span>) {
        <span class="hljs-keyword">state</span>.deleteNotes.map((item, i) =&gt; {
            item.done = false;
            <span class="hljs-keyword">state</span>.notes.splice(<span class="hljs-keyword">state</span>.notes.indexOf(item), <span class="hljs-number">1</span>);
            <span class="hljs-keyword">state</span>.trashNotes.push(item)
        })
        <span class="hljs-keyword">state</span>.isCheck = false;
        <span class="hljs-keyword">state</span>.deleteNotes = [];
    },
    [types.BACK_SAVE](<span class="hljs-keyword">state</span>, note) {
        if (note.content != '') return;
        <span class="hljs-keyword">state</span>.notes.splice(<span class="hljs-keyword">state</span>.notes.indexOf(note), <span class="hljs-number">1</span>);
    },
    [types.TOGGLE_TRASHNOTE](<span class="hljs-keyword">state</span>, note) {
        <span class="hljs-keyword">state</span>.trashNotes.map((item, i) =&gt; {
            if (item.id == note.id) {
                item.done = !note.done;
            }
        })
        if (note.done) {
            <span class="hljs-keyword">state</span>.deleteTrashNotes.push(note);
        } else {
            <span class="hljs-keyword">state</span>.deleteTrashNotes.splice(<span class="hljs-keyword">state</span>.deleteTrashNotes.indexOf(note), <span class="hljs-number">1</span>);
        }
    },
    [types.CANCEL_TRASHCHECk](<span class="hljs-keyword">state</span>) {
        <span class="hljs-keyword">state</span>.trashNotes.map((item, i) =&gt; {
            item.done = false;
        })
        <span class="hljs-keyword">state</span>.deleteTrashNotes = [];
        <span class="hljs-keyword">state</span>.isTrashCheck = false;
    },
    [types.ALL_TRASHCHECK](<span class="hljs-keyword">state</span>, done) {
        <span class="hljs-keyword">state</span>.deleteTrashNotes = [];
        <span class="hljs-keyword">state</span>.trashNotes.map((item, i) =&gt; {
            item.done = done;
            if (done) {
                <span class="hljs-keyword">state</span>.deleteTrashNotes.push(item);
            } else {
                <span class="hljs-keyword">state</span>.deleteTrashNotes = [];
            }
        })
    },
    [types.DELETE_TRASHNOTE](<span class="hljs-keyword">state</span>) {
        <span class="hljs-keyword">state</span>.deleteTrashNotes.map((item, i) =&gt; {
            <span class="hljs-keyword">state</span>.trashNotes.splice(<span class="hljs-keyword">state</span>.trashNotes.indexOf(item), <span class="hljs-number">1</span>);
        })
        <span class="hljs-keyword">state</span>.deleteTrashNotes = [];
        <span class="hljs-keyword">state</span>.isTrashCheck = false;
    },
    [types.RECOVERY_NOTE](<span class="hljs-keyword">state</span>) {
        <span class="hljs-keyword">state</span>.deleteTrashNotes.map((item, i) =&gt; {
            item.done = false;
            <span class="hljs-keyword">state</span>.notes.unshift(item)
            <span class="hljs-keyword">state</span>.trashNotes.splice(<span class="hljs-keyword">state</span>.trashNotes.indexOf(item), <span class="hljs-number">1</span>);
        })
        <span class="hljs-keyword">state</span>.deleteTrashNotes = [];
        <span class="hljs-keyword">state</span>.isTrashCheck = false;
    }
}

export <span class="hljs-keyword">default</span> mutations;</code></pre>
<p>接下来聊 actions, actions 是组件内用来分发 mutations 的函数。它们接收 store 作为第一个参数。比方说，当用户点击 Toolbar 组件的添加按钮时，我们想要调用一个能分发NEW_NOTE mutation 的 action。现在我们在 store/文件夹下创建一个 actions.js 并在里面写上 newNote函数:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建新便签
export const newNote = ({ commit }) => {
    commit(types.NEW_NOTE)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 创建新便签</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> newNote = <span class="hljs-function">(<span class="hljs-params">{ commit }</span>) =&gt;</span> {
    commit(types.NEW_NOTE)
}</code></pre>
<p>其他的这些actions都类似，整个store/actions.js如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as types from './mutation-types';

//创建新便签
export const newNote = ({ commit }) => {
    commit(types.NEW_NOTE)
}

//编辑便签
export const editNote = ({ commit }, note) => {
    commit(types.EDIT_NOTE, note)
}

//勾选便签
export const toggleNote = ({ commit }, note) => {
    commit(types.TOGGLE_NOTE, note)
}

//取消勾选便签
export const cancelCheck = ({ commit }) => {
    commit(types.CANCEL_CHECK)
}

//全部勾选
export const allCheck = ({ commit }, done) => {
    commit(types.ALL_CHECK, done)
}

//删除便签
export const deleteNote = ({ commit }) => {
    commit(types.DELETE_NOTE)
}

//返回自动保存
export const backSave = ({ commit }, note) => {
    commit(types.BACK_SAVE, note)
}

//勾选废纸篓便签
export const toggleTrashNote = ({ commit }, note) => {
    commit(types.TOGGLE_TRASHNOTE, note)
}

//取消勾选废纸篓便签
export const cancelTrashCheck = ({ commit }) => {
    commit(types.CANCEL_TRASHCHECk)
}

//全选废纸篓便签
export const allTrashCheck = ({ commit }, done) => {
    commit(types.ALL_TRASHCHECK, done)
}

//删除废纸篓便签
export const deleteTrashNote = ({ commit }) => {
    commit(types.DELETE_TRASHNOTE)
}

//恢复便签
export const recoveryNote = ({ commit }) => {
    commit(types.RECOVERY_NOTE)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> types <span class="hljs-keyword">from</span> <span class="hljs-string">'./mutation-types'</span>;

<span class="hljs-comment">//创建新便签</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> newNote = <span class="hljs-function">(<span class="hljs-params">{ commit }</span>) =&gt;</span> {
    commit(types.NEW_NOTE)
}

<span class="hljs-comment">//编辑便签</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> editNote = <span class="hljs-function">(<span class="hljs-params">{ commit }, note</span>) =&gt;</span> {
    commit(types.EDIT_NOTE, note)
}

<span class="hljs-comment">//勾选便签</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> toggleNote = <span class="hljs-function">(<span class="hljs-params">{ commit }, note</span>) =&gt;</span> {
    commit(types.TOGGLE_NOTE, note)
}

<span class="hljs-comment">//取消勾选便签</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> cancelCheck = <span class="hljs-function">(<span class="hljs-params">{ commit }</span>) =&gt;</span> {
    commit(types.CANCEL_CHECK)
}

<span class="hljs-comment">//全部勾选</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> allCheck = <span class="hljs-function">(<span class="hljs-params">{ commit }, done</span>) =&gt;</span> {
    commit(types.ALL_CHECK, done)
}

<span class="hljs-comment">//删除便签</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> deleteNote = <span class="hljs-function">(<span class="hljs-params">{ commit }</span>) =&gt;</span> {
    commit(types.DELETE_NOTE)
}

<span class="hljs-comment">//返回自动保存</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> backSave = <span class="hljs-function">(<span class="hljs-params">{ commit }, note</span>) =&gt;</span> {
    commit(types.BACK_SAVE, note)
}

<span class="hljs-comment">//勾选废纸篓便签</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> toggleTrashNote = <span class="hljs-function">(<span class="hljs-params">{ commit }, note</span>) =&gt;</span> {
    commit(types.TOGGLE_TRASHNOTE, note)
}

<span class="hljs-comment">//取消勾选废纸篓便签</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> cancelTrashCheck = <span class="hljs-function">(<span class="hljs-params">{ commit }</span>) =&gt;</span> {
    commit(types.CANCEL_TRASHCHECk)
}

<span class="hljs-comment">//全选废纸篓便签</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> allTrashCheck = <span class="hljs-function">(<span class="hljs-params">{ commit }, done</span>) =&gt;</span> {
    commit(types.ALL_TRASHCHECK, done)
}

<span class="hljs-comment">//删除废纸篓便签</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> deleteTrashNote = <span class="hljs-function">(<span class="hljs-params">{ commit }</span>) =&gt;</span> {
    commit(types.DELETE_TRASHNOTE)
}

<span class="hljs-comment">//恢复便签</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> recoveryNote = <span class="hljs-function">(<span class="hljs-params">{ commit }</span>) =&gt;</span> {
    commit(types.RECOVERY_NOTE)
}</code></pre>
<p>最后说一下getters,在Store仓库里，state就是用来存放数据，若是对数据进行处理输出，比如数据要过滤，一般我们可以写到computed中。但是如果很多组件都使用这个过滤后的数据，比如饼状图组件和曲线图组件，我们是否可以把这个数据抽提出来共享？这就是getters存在的意义。我们可以认为，<strong>getters</strong>是store的计算属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 搜索过滤便签
export const filterNote = (state) => {
    if (state.search != '' &amp;&amp; state.notes.length > 0) {
        return state.notes.filter(note => note.content.indexOf(state.search) > -1) || {}
    } else {
        return state.notes || {}
    }
}
// 当前编辑的便签
export const activeNote = (state) => {
    return state.activeNote
}
// 便签列表布局
export const layout = state => state.layout
// 便签选中状态
export const isCheck = state => state.isCheck
// 废纸篓便签选中状态
export const isTrashCheck = state => state.isTrashCheck" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>// 搜索过滤便签
export const filterNote = (<span class="hljs-keyword">state</span>) =&gt; {
    if (<span class="hljs-keyword">state</span>.search != '' &amp;&amp; <span class="hljs-keyword">state</span>.notes.length &gt; <span class="hljs-number">0</span>) {
        return <span class="hljs-keyword">state</span>.notes.filter(note =&gt; note.content.indexOf(<span class="hljs-keyword">state</span>.search) &gt; -<span class="hljs-number">1</span>) || {}
    } else {
        return <span class="hljs-keyword">state</span>.notes || {}
    }
}
// 当前编辑的便签
export const activeNote = (<span class="hljs-keyword">state</span>) =&gt; {
    return <span class="hljs-keyword">state</span>.activeNote
}
// 便签列表布局
export const layout = <span class="hljs-keyword">state</span> =&gt; <span class="hljs-keyword">state</span>.layout
// 便签选中状态
export const isCheck = <span class="hljs-keyword">state</span> =&gt; <span class="hljs-keyword">state</span>.isCheck
// 废纸篓便签选中状态
export const isTrashCheck = <span class="hljs-keyword">state</span> =&gt; <span class="hljs-keyword">state</span>.isTrashCheck</code></pre>
<p>这样，在 store文件夹里面要写的代码就都写完了。这里面包括了 state.js 中的 state 和 mutation.js中的mutations,以及 actions.js 里面用来分发 mutations 的 actions，和getters.js中的处理输出。</p>
<h2 id="articleHeader3">构建Vue组件</h2>
<p>最后这个小结，我们来实现四个组件 (App, Header,Toolbar, NoteList 和 Editor) 并学习怎么在这些组件里面获取 Vuex store 里的数据以及调用 actions。</p>
<h2 id="articleHeader4">创建根实例 - main.js</h2>
<p>main.js是应用的入口文件，里面有根实例，我们要把 Vuex store 加到到这个根实例里面，进而注入到它所有的子组件里面：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'

/* 第三方插件 */
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-teal.css'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/flag'
import 'vue-awesome/icons'

Vue.use(MuseUI)
Vue.component('icon', Icon);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-comment">// The Vue build version to load with the `import` command</span>
<span class="hljs-comment">// (runtime-only or standalone) has been set in webpack.base.conf with an alias.</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'./router'</span>
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./store/index'</span>

<span class="hljs-comment">/* 第三方插件 */</span>
<span class="hljs-keyword">import</span> MuseUI <span class="hljs-keyword">from</span> <span class="hljs-string">'muse-ui'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'muse-ui/dist/muse-ui.css'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'muse-ui/dist/theme-teal.css'</span>
<span class="hljs-keyword">import</span> Icon <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-awesome/components/Icon'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'vue-awesome/icons/flag'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'vue-awesome/icons'</span>

Vue.use(MuseUI)
Vue.component(<span class="hljs-string">'icon'</span>, Icon);
Vue.config.productionTip = <span class="hljs-keyword">false</span>

<span class="hljs-comment">/* eslint-disable no-new */</span>
<span class="hljs-keyword">new</span> Vue({
    el: <span class="hljs-string">'#app'</span>,
    router,
    store,
    components: { App },
    template: <span class="hljs-string">'&lt;App/&gt;'</span>
})</code></pre>
<h2 id="articleHeader5">App - 根组件</h2>
<p>根组件 App 作为总的路由入口:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>/&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'App'</span>
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<h2 id="articleHeader6">Notepad</h2>
<p>Notepad 组件会 import 其余三个组件：Header,NoteList和ToolBar：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;notepad&quot;>
        <Header />
        <NoteList />
        <ToolBar />
    </div>
</template>

<script>
import Header from './Header'
import NoteList from './NoteList'
import ToolBar from './ToolBar'
export default {
    name: 'Notepad',
    data () {
        return {
        }
    },
    components:{
        Header,
        NoteList,
        ToolBar,
    }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"notepad"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Header</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">NoteList</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ToolBar</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Header <span class="hljs-keyword">from</span> <span class="hljs-string">'./Header'</span>
<span class="hljs-keyword">import</span> NoteList <span class="hljs-keyword">from</span> <span class="hljs-string">'./NoteList'</span>
<span class="hljs-keyword">import</span> ToolBar <span class="hljs-keyword">from</span> <span class="hljs-string">'./ToolBar'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'Notepad'</span>,
    data () {
        <span class="hljs-keyword">return</span> {
        }
    },
    <span class="hljs-attr">components</span>:{
        Header,
        NoteList,
        ToolBar,
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader7">Header</h2>
<p>Header组件提供搜索和便签勾选和取消，并统计勾选数量功能，如图：</p>
<p><span class="img-wrap"><img data-src="/img/bVbajNK?w=384&amp;h=675" src="https://static.alili.tech/img/bVbajNK?w=384&amp;h=675" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>对于Header组件来说，搜索框中输入查询内容时，需要对便签列表中的数据进行过滤，在创建state.js的时候就添加了search字段，用于存储搜索内容，而在getters.js中通过filterNote方法对便签列表进行过滤，筛选出符合条件的便签并返回，这时候我们在NoteList组件中就直接遍历filterNote方法就可以实现搜索功能。</p>
<p>store/getters中实现filterNote方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 搜索过滤便签
export const filterNote = (state) => {
    if (state.search != '' &amp;&amp; state.notes.length > 0) {
        return state.notes.filter(note => note.content.indexOf(state.search) > -1) || {}
    } else {
        return state.notes || {}
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>// 搜索过滤便签
export const filterNote = (<span class="hljs-keyword">state</span>) =&gt; {
    if (<span class="hljs-keyword">state</span>.search != '' &amp;&amp; <span class="hljs-keyword">state</span>.notes.length &gt; <span class="hljs-number">0</span>) {
        return <span class="hljs-keyword">state</span>.notes.filter(note =&gt; note.content.indexOf(<span class="hljs-keyword">state</span>.search) &gt; -<span class="hljs-number">1</span>) || {}
    } else {
        return <span class="hljs-keyword">state</span>.notes || {}
    }
}</code></pre>
<p>NoteList组件中遍历filterNote</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<li v-for=&quot;note in filterNote&quot; :key=&quot;note.id&quot; @mousedown=&quot;gtouchstart(note)&quot; @mouseup=&quot;gtouchend(note)&quot; @touchstart=&quot;loopstart(note)&quot; @touchend=&quot;clearLoop&quot;>
    <h4>"{{"note.date"}}"</h4>
    <p>"{{"note.content"}}"</p>
    <mu-checkbox label=&quot;&quot; v-model=&quot;note.done&quot; class=&quot;checkbox&quot; v-show=&quot;isCheck&quot;/>
</li>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"note in filterNote"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"note.id"</span> @<span class="hljs-attr">mousedown</span>=<span class="hljs-string">"gtouchstart(note)"</span> @<span class="hljs-attr">mouseup</span>=<span class="hljs-string">"gtouchend(note)"</span> @<span class="hljs-attr">touchstart</span>=<span class="hljs-string">"loopstart(note)"</span> @<span class="hljs-attr">touchend</span>=<span class="hljs-string">"clearLoop"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span></span><span class="hljs-template-variable">"{{"note.date"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{"note.content"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">mu-checkbox</span> <span class="hljs-attr">label</span>=<span class="hljs-string">""</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"note.done"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"isCheck"</span>/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span></code></pre>
<p>Header组件：</p>
<p>...mapGetters中的...是es6的扩展运算符，不懂的可以查阅es6文档</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <header class=&quot;header&quot; :class=&quot;{visible:isVisible}&quot;>
        <mu-flexbox class=&quot;headerTool&quot; :class=&quot;{visible:isVisible}&quot;>
            <mu-flexbox-item order=&quot;0&quot; class=&quot;flex&quot;>
                <mu-raised-button v-if=&quot;isCheck&quot; label=&quot;取消&quot; @click=&quot;cancelCheck&quot; class=&quot;raised-button&quot;/>
                <span v-else class=&quot;icon&quot; @click=&quot;openFolder&quot;><icon name=&quot;folder-open&quot;></icon></span>
            </mu-flexbox-item>
            <mu-flexbox-item order=&quot;1&quot; class=&quot;flex&quot; style=&quot;text-align:center&quot;>
                <span v-if=&quot;isCheck&quot;>"{{"checkTitle"}}"</span>
                <span v-else>"{{"title"}}"</span>
            </mu-flexbox-item>
            <mu-flexbox-item order=&quot;2&quot; class=&quot;flex&quot; style=&quot;text-align:right&quot;>
                <mu-raised-button v-if=&quot;isCheck&quot; :label=&quot;checkBtnTxt&quot; @click=&quot;allCheck(!allChecked)&quot; class=&quot;raised-button&quot;/>
                <span v-else>
                    <span class=&quot;icon&quot; v-if=&quot;layout=='grid'&quot; @click=&quot;changeLayout&quot;><icon name=&quot;list&quot;></icon></span>
                    <span class=&quot;icon&quot; v-else @click=&quot;changeLayout&quot;><icon name=&quot;th-large&quot;></icon></span>
                </span>
            </mu-flexbox-item>
        </mu-flexbox>
        <div class=&quot;search&quot;>
            <div class=&quot;icon&quot;><icon name=&quot;search&quot;></icon></div>
            <input type=&quot;text&quot; v-model=&quot;searchTxt&quot; @keyup=&quot;search&quot; @focus=&quot;searchFocus&quot; @blur=&quot;searchBlur&quot;/>
        </div>
    </header>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'
export default {
    name: 'Header',
    data(){
        return {
            title:'便签',
            checkBtnTxt:'全选',
            searchTxt:'',
            isVisible:false
        }
    },
    computed:{
        ...mapGetters([
            'layout',
            'isCheck'
        ]),
        //获取便签勾选状态
        allChecked(){
            return this.$store.state.notes.every(note => note.done)
        },
        //便签选中数量提示
        checkTitle(){
            return `已选择${this.$store.state.deleteNotes.length}项`
        }
    },
    methods:{
        //显示搜索框
        searchFocus(){
            this.isVisible = true;
        },
        //隐藏搜索框
        searchBlur(){
            this.isVisible = false;
        },
        //搜索
        search(){
            this.$store.state.search = this.searchTxt
        },
        //切换布局
        changeLayout(){
            if(this.$store.state.layout == 'list'){
                this.$store.state.layout = 'grid'
            }else{
                this.$store.state.layout = 'list'
            }
            
        },
        //取消勾选
        cancelCheck(){
            this.$store.dispatch('cancelCheck')
        },
        //全选切换
        allCheck(done){
            this.checkBtnTxt = done?'取消全选':'全选'
            this.$store.dispatch('allCheck',done)
        },
        //打开便签夹
        openFolder(){
            this.$router.push({path:'noteFolder'})
        }
    }
}
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"header"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{visible:isVisible}"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">mu-flexbox</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"headerTool"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{visible:isVisible}"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">mu-flexbox-item</span> <span class="hljs-attr">order</span>=<span class="hljs-string">"0"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"flex"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">mu-raised-button</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"isCheck"</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"取消"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"cancelCheck"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"raised-button"</span>/&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-else</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"openFolder"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"folder-open"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">icon</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">mu-flexbox-item</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">mu-flexbox-item</span> <span class="hljs-attr">order</span>=<span class="hljs-string">"1"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"flex"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"text-align:center"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"isCheck"</span>&gt;</span></span><span class="hljs-template-variable">"{{"checkTitle"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-else</span>&gt;</span></span><span class="hljs-template-variable">"{{"title"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">mu-flexbox-item</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">mu-flexbox-item</span> <span class="hljs-attr">order</span>=<span class="hljs-string">"2"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"flex"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"text-align:right"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">mu-raised-button</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"isCheck"</span> <span class="hljs-attr">:label</span>=<span class="hljs-string">"checkBtnTxt"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"allCheck(!allChecked)"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"raised-button"</span>/&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-else</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"layout=='grid'"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"changeLayout"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"list"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">icon</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon"</span> <span class="hljs-attr">v-else</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"changeLayout"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"th-large"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">icon</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">mu-flexbox-item</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">mu-flexbox</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"search"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"search"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">icon</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"searchTxt"</span> @<span class="hljs-attr">keyup</span>=<span class="hljs-string">"search"</span> @<span class="hljs-attr">focus</span>=<span class="hljs-string">"searchFocus"</span> @<span class="hljs-attr">blur</span>=<span class="hljs-string">"searchBlur"</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> { mapActions,mapGetters } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'Header'</span>,
    data(){
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">title</span>:<span class="hljs-string">'便签'</span>,
            <span class="hljs-attr">checkBtnTxt</span>:<span class="hljs-string">'全选'</span>,
            <span class="hljs-attr">searchTxt</span>:<span class="hljs-string">''</span>,
            <span class="hljs-attr">isVisible</span>:<span class="hljs-literal">false</span>
        }
    },
    <span class="hljs-attr">computed</span>:{
        ...mapGetters([
            <span class="hljs-string">'layout'</span>,
            <span class="hljs-string">'isCheck'</span>
        ]),
        <span class="hljs-comment">//获取便签勾选状态</span>
        allChecked(){
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.state.notes.every(<span class="hljs-function"><span class="hljs-params">note</span> =&gt;</span> note.done)
        },
        <span class="hljs-comment">//便签选中数量提示</span>
        checkTitle(){
            <span class="hljs-keyword">return</span> <span class="hljs-string">`已选择<span class="hljs-subst">${<span class="hljs-keyword">this</span>.$store.state.deleteNotes.length}</span>项`</span>
        }
    },
    <span class="hljs-attr">methods</span>:{
        <span class="hljs-comment">//显示搜索框</span>
        searchFocus(){
            <span class="hljs-keyword">this</span>.isVisible = <span class="hljs-literal">true</span>;
        },
        <span class="hljs-comment">//隐藏搜索框</span>
        searchBlur(){
            <span class="hljs-keyword">this</span>.isVisible = <span class="hljs-literal">false</span>;
        },
        <span class="hljs-comment">//搜索</span>
        search(){
            <span class="hljs-keyword">this</span>.$store.state.search = <span class="hljs-keyword">this</span>.searchTxt
        },
        <span class="hljs-comment">//切换布局</span>
        changeLayout(){
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.$store.state.layout == <span class="hljs-string">'list'</span>){
                <span class="hljs-keyword">this</span>.$store.state.layout = <span class="hljs-string">'grid'</span>
            }<span class="hljs-keyword">else</span>{
                <span class="hljs-keyword">this</span>.$store.state.layout = <span class="hljs-string">'list'</span>
            }
            
        },
        <span class="hljs-comment">//取消勾选</span>
        cancelCheck(){
            <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'cancelCheck'</span>)
        },
        <span class="hljs-comment">//全选切换</span>
        allCheck(done){
            <span class="hljs-keyword">this</span>.checkBtnTxt = done?<span class="hljs-string">'取消全选'</span>:<span class="hljs-string">'全选'</span>
            <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'allCheck'</span>,done)
        },
        <span class="hljs-comment">//打开便签夹</span>
        openFolder(){
            <span class="hljs-keyword">this</span>.$router.push({<span class="hljs-attr">path</span>:<span class="hljs-string">'noteFolder'</span>})
        }
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<h2 id="articleHeader8">NoteList</h2>
<p>NotesList 组件主要有三个功能：</p>
<ul>
<li>渲染便签列表</li>
<li>对便签进行勾选或取消</li>
<li>点击编辑便签</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <ul class=&quot;noteList&quot; :class=&quot;layout&quot;>
        <li v-for=&quot;note in filterNote&quot; :key=&quot;note.id&quot; @mousedown=&quot;gtouchstart(note)&quot; @mouseup=&quot;gtouchend(note)&quot; @touchstart=&quot;loopstart(note)&quot; @touchend=&quot;clearLoop&quot;>
            <h4>"{{"note.date"}}"</h4>
            <p>"{{"note.content"}}"</p>
            <mu-checkbox label=&quot;&quot; v-model=&quot;note.done&quot; class=&quot;checkbox&quot; v-show=&quot;isCheck&quot;/>
        </li>
    </ul>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
export default {
    name: 'NoteList',
    data(){
        return {
            timeOutEvent: 0,
            Loop:null
        }
    },
    computed:{
        ...mapGetters([
            'filterNote',
            'layout',
            'isCheck'
        ])
    },
    methods:{
        //编辑&amp;选中
        editNote(note){
            if(this.isCheck){
                this.$store.dispatch('toggleNote',note);
            }else{
                this.$store.dispatch('editNote',note);
                this.$router.push({path:'/editor'})
            }
            
        },
        //鼠标按下，模拟长按事件
        gtouchstart(note){
            var _this = this;
            this.timeOutEvent = setTimeout(function(){
                _this.longPress(note)
            },500);//这里设置定时器，定义长按500毫秒触发长按事件，时间可以自己改，个人感觉500毫秒非常合适
            return false;
        },
        //鼠标放开，模拟长按事件
        gtouchend(note){
            clearTimeout(this.timeOutEvent);//清除定时器
            if(this.timeOutEvent!=0){
                //这里写要执行的内容（尤如onclick事件）
                this.editNote(note);
            }
            return false;
        },
        longPress(note){
            this.timeOutEvent = 0;
            this.$store.state.isCheck = true;
            this.$store.dispatch('toggleNote',note);
        },
        //手按住开始，模拟长按事件
        loopstart(note){
            var _this = this;
            clearInterval(this.Loop);
　　　　　　 this.Loop = setTimeout(function(){
    　　　　     _this.$store.state.isCheck = true;
                _this.$store.dispatch('toggleNote',note);
　　　　　　},500);
        },
        //手放开结束，模拟长按事件
        clearLoop(){
            clearTimeout(this.Loop);
        }
    }
}
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>&lt;template&gt;
    &lt;ul <span class="hljs-class"><span class="hljs-keyword">class</span>="<span class="hljs-title">noteList</span>" :<span class="hljs-type">class="layout"&gt;</span></span>
        &lt;li v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"note in filterNote"</span> :key=<span class="hljs-string">"note.id"</span> <span class="hljs-meta">@mousedown</span>=<span class="hljs-string">"gtouchstart(note)"</span> <span class="hljs-meta">@mouseup</span>=<span class="hljs-string">"gtouchend(note)"</span> <span class="hljs-meta">@touchstart</span>=<span class="hljs-string">"loopstart(note)"</span> <span class="hljs-meta">@touchend</span>=<span class="hljs-string">"clearLoop"</span>&gt;
            &lt;h4&gt;"{{"note.date"}}"&lt;/h4&gt;
            &lt;p&gt;"{{"note.content"}}"&lt;/p&gt;
            &lt;mu-checkbox label=<span class="hljs-string">""</span> v-model=<span class="hljs-string">"note.done"</span> <span class="hljs-class"><span class="hljs-keyword">class</span>="<span class="hljs-title">checkbox</span>" <span class="hljs-title">v</span>-<span class="hljs-title">show</span>="<span class="hljs-title">isCheck</span>"/&gt;</span>
        &lt;/li&gt;
    &lt;/ul&gt;
&lt;/template&gt;

&lt;script&gt;
<span class="hljs-keyword">import</span> { mapGetters,mapActions } from <span class="hljs-string">'vuex'</span>
export <span class="hljs-keyword">default</span> {
    name: <span class="hljs-string">'NoteList'</span>,
    <span class="hljs-keyword">data</span>(){
        <span class="hljs-keyword">return</span> {
            timeOutEvent: <span class="hljs-number">0</span>,
            Loop:<span class="hljs-literal">null</span>
        }
    },
    computed:{
        ...mapGetters([
            <span class="hljs-string">'filterNote'</span>,
            <span class="hljs-string">'layout'</span>,
            <span class="hljs-string">'isCheck'</span>
        ])
    },
    methods:{
        <span class="hljs-comment">//编辑&amp;选中</span>
        editNote(note){
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.isCheck){
                <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'toggleNote'</span>,note);
            }<span class="hljs-keyword">else</span>{
                <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'editNote'</span>,note);
                <span class="hljs-keyword">this</span>.$router.push({path:<span class="hljs-string">'/editor'</span>})
            }
            
        },
        <span class="hljs-comment">//鼠标按下，模拟长按事件</span>
        gtouchstart(note){
            <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
            <span class="hljs-keyword">this</span>.timeOutEvent = setTimeout(function(){
                _this.longPress(note)
            },<span class="hljs-number">500</span>);<span class="hljs-comment">//这里设置定时器，定义长按500毫秒触发长按事件，时间可以自己改，个人感觉500毫秒非常合适</span>
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        },
        <span class="hljs-comment">//鼠标放开，模拟长按事件</span>
        gtouchend(note){
            clearTimeout(<span class="hljs-keyword">this</span>.timeOutEvent);<span class="hljs-comment">//清除定时器</span>
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.timeOutEvent!=<span class="hljs-number">0</span>){
                <span class="hljs-comment">//这里写要执行的内容（尤如onclick事件）</span>
                <span class="hljs-keyword">this</span>.editNote(note);
            }
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        },
        longPress(note){
            <span class="hljs-keyword">this</span>.timeOutEvent = <span class="hljs-number">0</span>;
            <span class="hljs-keyword">this</span>.$store.state.isCheck = <span class="hljs-literal">true</span>;
            <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'toggleNote'</span>,note);
        },
        <span class="hljs-comment">//手按住开始，模拟长按事件</span>
        loopstart(note){
            <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
            clearInterval(<span class="hljs-keyword">this</span>.Loop);
　　　　　　 <span class="hljs-keyword">this</span>.Loop = setTimeout(function(){
    　　　　     _this.$store.state.isCheck = <span class="hljs-literal">true</span>;
                _this.$store.dispatch(<span class="hljs-string">'toggleNote'</span>,note);
　　　　　　},<span class="hljs-number">500</span>);
        },
        <span class="hljs-comment">//手放开结束，模拟长按事件</span>
        clearLoop(){
            clearTimeout(<span class="hljs-keyword">this</span>.Loop);
        }
    }
}
&lt;/script&gt;
</code></pre>
<h2 id="articleHeader9">ToolBar</h2>
<p>Toolbar组件提供给用户三个按钮：创建便签，编辑便签和移动便签（移动便签功能还没有做）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;toolBar&quot;>
        <div class=&quot;toolBtn&quot; v-if=&quot;isCheck&quot;>
            <span class=&quot;icon&quot; @click=&quot;deleteNote&quot;><icon name=&quot;trash-alt&quot;></icon></span>
            <span class=&quot;icon&quot;><icon name=&quot;dolly&quot;></icon></span>
        </div>
        <div class=&quot;addNote&quot; v-else>
            <div class=&quot;float-button mu-float-button&quot; @click=&quot;addNote&quot;><icon name=&quot;plus&quot;></icon></div>
        </div>
        <mu-dialog :open=&quot;dialog&quot; title=&quot;删除便签&quot; @close=&quot;close&quot;>
            您确定删除所选便签吗？
            <mu-flat-button slot=&quot;actions&quot; @click=&quot;close&quot; primary label=&quot;取消&quot;/>
            <mu-flat-button slot=&quot;actions&quot; primary @click=&quot;deleteConfirm&quot; label=&quot;确定&quot;/>
        </mu-dialog>
    </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
export default {
    name: 'ToolBar',
    data(){
        return {
            dialog: false
        }
    },
    computed:{
        ...mapGetters([
            'isCheck'
        ])
    },
    methods:{
        //添加便签
        addNote(){
            this.$store.dispatch('newNote');
            this.$router.push({path:'editor'});
        },
        //删除便签
        deleteNote(){
            this.dialog = true;
        },
        //关闭窗口
        close () {
            this.dialog = false;
        },
        //确定删除
        deleteConfirm(){
            this.dialog = false;
            this.$store.dispatch('deleteNote');
        }
    }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"toolBar"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"toolBtn"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"isCheck"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"deleteNote"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"trash-alt"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">icon</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"dolly"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">icon</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"addNote"</span> <span class="hljs-attr">v-else</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"float-button mu-float-button"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"addNote"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"plus"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">icon</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">mu-dialog</span> <span class="hljs-attr">:open</span>=<span class="hljs-string">"dialog"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"删除便签"</span> @<span class="hljs-attr">close</span>=<span class="hljs-string">"close"</span>&gt;</span>
            您确定删除所选便签吗？
            <span class="hljs-tag">&lt;<span class="hljs-name">mu-flat-button</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"actions"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"close"</span> <span class="hljs-attr">primary</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"取消"</span>/&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">mu-flat-button</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"actions"</span> <span class="hljs-attr">primary</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"deleteConfirm"</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"确定"</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">mu-dialog</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> { mapGetters,mapActions } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'ToolBar'</span>,
    data(){
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">dialog</span>: <span class="hljs-literal">false</span>
        }
    },
    <span class="hljs-attr">computed</span>:{
        ...mapGetters([
            <span class="hljs-string">'isCheck'</span>
        ])
    },
    <span class="hljs-attr">methods</span>:{
        <span class="hljs-comment">//添加便签</span>
        addNote(){
            <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'newNote'</span>);
            <span class="hljs-keyword">this</span>.$router.push({<span class="hljs-attr">path</span>:<span class="hljs-string">'editor'</span>});
        },
        <span class="hljs-comment">//删除便签</span>
        deleteNote(){
            <span class="hljs-keyword">this</span>.dialog = <span class="hljs-literal">true</span>;
        },
        <span class="hljs-comment">//关闭窗口</span>
        close () {
            <span class="hljs-keyword">this</span>.dialog = <span class="hljs-literal">false</span>;
        },
        <span class="hljs-comment">//确定删除</span>
        deleteConfirm(){
            <span class="hljs-keyword">this</span>.dialog = <span class="hljs-literal">false</span>;
            <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'deleteNote'</span>);
        }
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader10">Editor</h2>
<p>Editor 组件是最简单的，它只做两件事：</p>
<p>从 store 获取当前笔记activeNote，把它的内容展示在 textarea<br>在用户更新笔记的时候，调用 editNote() action<br>以下是完整的 Editor.vue:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;edit-panel&quot;>
        <div class=&quot;edit-tool&quot;>
            <span class=&quot;back-list&quot; @click=&quot;backList&quot;><icon name=&quot;angle-left&quot;></icon></span>          
            <span class=&quot;date&quot; v-text=&quot;activeNote.date&quot;></span>
            <span class=&quot;saveNote&quot; v-show=&quot;isShow&quot; @click=&quot;backList&quot;>完成</span>
        </div>
        <textarea v-focus class=&quot;edit-area&quot; v-model=&quot;activeNote.content&quot; @keyup=&quot;editorNote&quot;></textarea>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Editor',
    data(){
        return {
            content:'',
            isShow:false
        }
    },
    created(){
        this.content = this.activeNote.content
    },
    computed:{
        //获取正在操作的便签
        ...mapGetters([
            'activeNote'
        ])
    },
    directives:{
        focus:{
            inserted(el){
                el.focus();
            }
        }
    },
    methods:{
        //返回便签列表
        backList(){
            this.$router.push({path:'/'})
            this.$store.dispatch('backSave',this.activeNote)
        },
        //完成按钮显示&amp;隐藏
        editorNote(){
            if(this.content != this.activeNote.content){
                this.isShow = true;
            }else{
                this.isShow = false;
            }
        }
    }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"edit-panel"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"edit-tool"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"back-list"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"backList"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"angle-left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">icon</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>          
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"date"</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"activeNote.date"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"saveNote"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"isShow"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"backList"</span>&gt;</span>完成<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">v-focus</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"edit-area"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"activeNote.content"</span> @<span class="hljs-attr">keyup</span>=<span class="hljs-string">"editorNote"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> { mapGetters } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'Editor'</span>,
    data(){
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">content</span>:<span class="hljs-string">''</span>,
            <span class="hljs-attr">isShow</span>:<span class="hljs-literal">false</span>
        }
    },
    created(){
        <span class="hljs-keyword">this</span>.content = <span class="hljs-keyword">this</span>.activeNote.content
    },
    <span class="hljs-attr">computed</span>:{
        <span class="hljs-comment">//获取正在操作的便签</span>
        ...mapGetters([
            <span class="hljs-string">'activeNote'</span>
        ])
    },
    <span class="hljs-attr">directives</span>:{
        <span class="hljs-attr">focus</span>:{
            inserted(el){
                el.focus();
            }
        }
    },
    <span class="hljs-attr">methods</span>:{
        <span class="hljs-comment">//返回便签列表</span>
        backList(){
            <span class="hljs-keyword">this</span>.$router.push({<span class="hljs-attr">path</span>:<span class="hljs-string">'/'</span>})
            <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'backSave'</span>,<span class="hljs-keyword">this</span>.activeNote)
        },
        <span class="hljs-comment">//完成按钮显示&amp;隐藏</span>
        editorNote(){
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.content != <span class="hljs-keyword">this</span>.activeNote.content){
                <span class="hljs-keyword">this</span>.isShow = <span class="hljs-literal">true</span>;
            }<span class="hljs-keyword">else</span>{
                <span class="hljs-keyword">this</span>.isShow = <span class="hljs-literal">false</span>;
            }
        }
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>这就是一个小米便签的创建和编辑，还有删除以及废纸篓功能这里就不多说了，功能都很简单不明白的地方可以看<a href="https://github.com/tianlang89757/vuex-notepad2" rel="nofollow noreferrer" target="_blank">源代码</a>，然后自己实战操作一番，如有写的不对的地方大家提出来，互相学习互相帮助嘛，谢谢！</p>
<p><strong>来都来了点一下赞吧，你的赞是对我最大的鼓励^_^</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vuex2.0小米便签项目实例

## 原文链接
[https://segmentfault.com/a/1190000014813963](https://segmentfault.com/a/1190000014813963)

