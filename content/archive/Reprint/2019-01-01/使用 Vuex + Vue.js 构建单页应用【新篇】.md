---
title: '使用 Vuex + Vue.js 构建单页应用【新篇】' 
date: 2019-01-01 2:30:07
hidden: true
slug: ve6oqedcm8q
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">使用 Vuex + Vue.js 构建单页应用【新篇】</h1>
<blockquote><p>在去年的七月六号的时候，发布了一篇 <a href="https://segmentfault.com/a/1190000005891026">使用 Vuex + Vue.js 构建单页应用</a> 的文章，文章主要是介绍 <code>vuex</code> 的基本使用方法，发现对大部分的入门同学有很大的帮助，时至今日还有很多同学不断的点赞与收藏，浏览量最高达到 20.4K 。鉴于前端技术发展更新快速，特此在这里重新整理一篇 vue2.0 版本的 <code>vuex</code> 基本使用方法，希望能给更多刚入门或者将要入门的同学带来帮助。</p></blockquote>
<p>这篇文章主要是介绍最新 vue2.0 API 的使用方法， 和 vue1.x 的一些差异的地方。</p>
<h2 id="articleHeader1">阅读建议</h2>
<p>1、在阅读这篇文章之前，我希望你已经阅读过我上一篇文章  <a href="https://segmentfault.com/a/1190000005891026" target="_blank">使用 Vuex + Vue.js 构建单页应用</a> ，明白我们需要实现的基本需求。</p>
<p>2、希望你阅读并掌握以下知识点</p>
<ul>
<li><a href="http://es6.ruanyifeng.com/" rel="nofollow noreferrer" target="_blank">ECMAScript 6 入门</a></li>
<li><a href="https://vuex.vuejs.org/zh-cn/intro.html" rel="nofollow noreferrer" target="_blank">Vuex 是什么</a></li>
<li><a href="https://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">vue2.0 官方文档</a></li>
</ul>
<h1 id="articleHeader2">目录层级变化</h1>
<p>首先是目录层级的变动，我们看下前后对比：</p>
<p>2.0 版本，vuex 的文件夹改为了 store</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── index.html
├── src
│&nbsp;&nbsp; ├── App.vue
│&nbsp;&nbsp; ├── assets
│&nbsp;&nbsp; │&nbsp;&nbsp; └── logo.png
│&nbsp;&nbsp; ├── components
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── Editor.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── NoteList.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; └── Toolbar.vue
│&nbsp;&nbsp; ├── main.js
│&nbsp;&nbsp; └── store
│&nbsp;&nbsp;     ├── actions.js
│&nbsp;&nbsp;     ├── getters.js
│&nbsp;&nbsp;     ├── index.js
│&nbsp;&nbsp;     ├── mutation-types.js
│&nbsp;&nbsp;     └── mutations.js
└── static" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">├── index.html
├── src
│&nbsp;&nbsp; ├── App.vue
│&nbsp;&nbsp; ├── assets
│&nbsp;&nbsp; │&nbsp;&nbsp; └── logo.png
│&nbsp;&nbsp; ├── components
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── Editor.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── NoteList.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; └── Toolbar.vue
│&nbsp;&nbsp; ├── main.js
│&nbsp;&nbsp; └── store
│&nbsp;&nbsp;     ├── actions.js
│&nbsp;&nbsp;     ├── getters.js
│&nbsp;&nbsp;     ├── index.js
│&nbsp;&nbsp;     ├── mutation-types.js
│&nbsp;&nbsp;     └── mutations.js
└── static</code></pre>
<p>1..0 版本</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── index.html
├── src
│&nbsp;&nbsp; ├── App.vue
│&nbsp;&nbsp; ├── assets
│&nbsp;&nbsp; │&nbsp;&nbsp; └── logo.png
│&nbsp;&nbsp; ├── components
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── Editor.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── NotesList.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; └── Toolbar.vue
│&nbsp;&nbsp; ├── main.js
│&nbsp;&nbsp; └── vuex
│&nbsp;&nbsp;     ├── actions.js
│&nbsp;&nbsp;     ├── getters.js
│&nbsp;&nbsp;     └── store.js
└── static" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">├── index.html
├── src
│&nbsp;&nbsp; ├── App.vue
│&nbsp;&nbsp; ├── assets
│&nbsp;&nbsp; │&nbsp;&nbsp; └── logo.png
│&nbsp;&nbsp; ├── components
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── Editor.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── NotesList.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; └── Toolbar.vue
│&nbsp;&nbsp; ├── main.js
│&nbsp;&nbsp; └── vuex
│&nbsp;&nbsp;     ├── actions.js
│&nbsp;&nbsp;     ├── getters.js
│&nbsp;&nbsp;     └── store.js
└── static</code></pre>
<h2 id="articleHeader3">使用方式的变动</h2>
<h3 id="articleHeader4">在文件的 <code>main.js</code> 中注入，2.0 的注入方式如下</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import App from './App'
import store from './store';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  store,
  components: { App }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./store'</span>;

Vue.config.productionTip = <span class="hljs-literal">false</span>

<span class="hljs-comment">/* eslint-disable no-new */</span>
<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
  <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;App/&gt;'</span>,
  store,
  <span class="hljs-attr">components</span>: { App }
})</code></pre>
<h3 id="articleHeader5">在组件中使用方式</h3>
<p>我们来看 <code>Editor.vue</code> 组件内部如何使用 <code>vuex</code> 的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;note-editor&quot;>
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

<style>
  ...
</style>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
export default {
  name: 'Editor',
  computed: {
    ...mapGetters([
      'activeNote'
    ]),

    currentNote() {
      return this.activeNote;
    }
  },
  methods: {
    ...mapActions({
      update: 'updateNote'
    }),

    updateNote() {
      this.update({
        note: this.currentNote
      });
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="vue"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"note-editor"</span>&gt;</span>
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

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">
  ...
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> { mapState, mapActions, mapGetters } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'Editor'</span>,
  <span class="hljs-attr">computed</span>: {
    ...mapGetters([
      <span class="hljs-string">'activeNote'</span>
    ]),

    currentNote() {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.activeNote;
    }
  },
  <span class="hljs-attr">methods</span>: {
    ...mapActions({
      <span class="hljs-attr">update</span>: <span class="hljs-string">'updateNote'</span>
    }),

    updateNote() {
      <span class="hljs-keyword">this</span>.update({
        <span class="hljs-attr">note</span>: <span class="hljs-keyword">this</span>.currentNote
      });
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>由于我们在入口文件 <code>main.js</code> 中已经注入 <code>store</code> 对象，使得我们能够在子组件中获取到它，在这里，我们使用了 <code>vuex</code> 提供的三个扩展方法 <code>mapState</code>、<code>mapActions</code>、<code>mapGetters</code>。</p>
<p>另外一个不同点是在我们的 <code>NodeList.vue</code> 组件中，在 <code>vue2.0</code> 里面已经移除了自带的过滤器函数，官方建议我们使用计算属性，下面是我们更改后的使用方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;notes-list&quot;>
    <div class=&quot;list-header&quot;>
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

      <div class=&quot;btn-group btn-group-justified&quot; role=&quot;group&quot;>
        <div class=&quot;input-group search&quot;>
          <input type=&quot;text&quot; class=&quot;form-control&quot; v-model=&quot;search&quot; placeholder=&quot;Search for...&quot;>
          <span class=&quot;input-group-addon&quot;>
            <i class=&quot;glyphicon glyphicon-search&quot;></i>
          </span>
        </div>
      </div>

    </div>

    <!-- 渲染笔记列表 -->
    <div class=&quot;container&quot;>
      <div class=&quot;list-group&quot;>
        <div
          v-for=&quot;(note, index) in searchNotes&quot; :key=&quot;index&quot;
          class=&quot;list-group-item&quot;
          :class=&quot;{active: activeNote === note}&quot;
          @click=&quot;updateActiveNote(note)&quot;>
          <h4 class=&quot;list-group-item-heading&quot;>
            "{{"note.title.trim().substring(0,30)"}}"
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  ...
</style>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
export default {
  name: 'NoteList',
  data() {
    return {
      search: ''
    }
  },
  computed: {
    ...mapGetters([
      'filteredNotes'
    ]),

    // state 内部状态
    ...mapState([
      'show',
      'activeNote'
    ]),

    // 计算属性，自定义过滤
    searchNotes() {
      if (this.search.length > 0) {
        return this.filteredNotes.filter((note) => note.title.toLowerCase().indexOf(this.search) > -1);
      } else {
        return this.filteredNotes;
      }
    }
  },
  methods: {
    ...mapActions([
      'toggleListShow',
      'setActiveNote'
    ]),

    // 切换列表，全部或者收藏
    toggleShow(type) {
      this.toggleListShow({ show: type});
    },

    // 点击列表，更新当前激活文章
    updateActiveNote(note) {
      this.setActiveNote({ note });
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code class="vue"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"notes-list"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list-header"</span>&gt;</span>
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

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn-group btn-group-justified"</span> <span class="hljs-attr">role</span>=<span class="hljs-string">"group"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"input-group search"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form-control"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"search"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"Search for..."</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"input-group-addon"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"glyphicon glyphicon-search"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-comment">&lt;!-- 渲染笔记列表 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list-group"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
          <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(note, index) in searchNotes"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"index"</span>
          <span class="hljs-attr">class</span>=<span class="hljs-string">"list-group-item"</span>
          <span class="hljs-attr">:class</span>=<span class="hljs-string">"{active: activeNote === note}"</span>
          @<span class="hljs-attr">click</span>=<span class="hljs-string">"updateActiveNote(note)"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h4</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list-group-item-heading"</span>&gt;</span>
            </span><span class="hljs-template-variable">"{{"note.title.trim().substring(0,30)"}}"</span><span class="xml">
          <span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="undefined">
  ...
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> { mapGetters, mapState, mapActions } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'NoteList'</span>,
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">search</span>: <span class="hljs-string">''</span>
    }
  },
  <span class="hljs-attr">computed</span>: {
    ...mapGetters([
      <span class="hljs-string">'filteredNotes'</span>
    ]),

    <span class="hljs-comment">// state 内部状态</span>
    ...mapState([
      <span class="hljs-string">'show'</span>,
      <span class="hljs-string">'activeNote'</span>
    ]),

    <span class="hljs-comment">// 计算属性，自定义过滤</span>
    searchNotes() {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.search.length &gt; <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.filteredNotes.filter(<span class="hljs-function">(<span class="hljs-params">note</span>) =&gt;</span> note.title.toLowerCase().indexOf(<span class="hljs-keyword">this</span>.search) &gt; <span class="hljs-number">-1</span>);
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.filteredNotes;
      }
    }
  },
  <span class="hljs-attr">methods</span>: {
    ...mapActions([
      <span class="hljs-string">'toggleListShow'</span>,
      <span class="hljs-string">'setActiveNote'</span>
    ]),

    <span class="hljs-comment">// 切换列表，全部或者收藏</span>
    toggleShow(type) {
      <span class="hljs-keyword">this</span>.toggleListShow({ <span class="hljs-attr">show</span>: type});
    },

    <span class="hljs-comment">// 点击列表，更新当前激活文章</span>
    updateActiveNote(note) {
      <span class="hljs-keyword">this</span>.setActiveNote({ note });
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<h2 id="articleHeader6">Q&amp;A</h2>
<p>其他的变动，大家自行的查看源码学习：<a href="https://github.com/lichenbuliren/vuex-notes-app2.git" rel="nofollow noreferrer" target="_blank">vuex-notes-app2</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 Vuex + Vue.js 构建单页应用【新篇】

## 原文链接
[https://segmentfault.com/a/1190000011099751](https://segmentfault.com/a/1190000011099751)

