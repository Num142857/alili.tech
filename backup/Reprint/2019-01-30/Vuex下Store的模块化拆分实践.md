---
title: 'Vuex下Store的模块化拆分实践' 
date: 2019-01-30 2:30:23
hidden: true
slug: y1266jmkyzl
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>最近的项目用到了 vue.js + vuex + vue-router 全家桶，版本为 &gt;2.0，在搞Store的时候发现，圈子里大部分关于vuex的文章都是比较基础的Demo搭建方式，很少有涉及到比较复杂的模块化拆分的Store实践，而且事实上也有朋友在实践中问到过这方面的内容，vuex自身提供了模块化的方式，因此在这里总结一下我自己在项目里的心得。</p>
<h2 id="articleHeader1">模块化拆分</h2>
<p>vue.js的项目文件结构在这里就不说了，大家可以通过<code>vue-cli</code>初始化项目,脚手架会为你搭建一个start项目的最佳实践。</p>
<p>默认你已经搭架好了一个项目，而且需要建立或者已经是一个复杂的Store，但是还没有进行模块拆分，你可以尝试对其进行模块拆分，当然在一开始你不必一定需要这么做。</p>
<h3 id="articleHeader2">1. 安装Vuex，建立文件结构</h3>
<p>在项目根目录下安装vuex:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vuex -S" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> vuex -S</code></pre>
<p>安装完毕后，在项目的<code>src</code>文件夹下新建一个<code>store</code>文件夹，并且分别在其中新建<code>modules</code>,<code>actions</code>,<code>mutations</code>,<code>getters</code>,<code>constants</code>子文件夹和一个<code>index.js</code>文件。</p>
<p>目录结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="└─ demo/
   ├── build/
   ├── config/
   ├── node_modules/
   ├── src/
   │   ├── assets/
   │   ├── components/
   │   ├── store/
   │   │   ├── actions/ 
   │   │   │   ├──aAction.js
   │   │   │   ├──bAction.js
   │   │   │   └──cAction.js
   │   │   ├── constants/
   │   │   │   └── types.js
   │   │   ├── getters/
   │   │   │   └── aGetter.js
   │   │   ├── modules/
   │   │   │   ├── aModules.js
   │   │   │   ├── bModules.js
   │   │   │   ├── cModules.js
   │   │   │   └── index.js
   │   │   ├── mutations/
   │   │   │   ├── aMutation.js
   │   │   │   ├── bMutation.js
   │   │   │   └── cMutation.js
   │   │   └── index.js
   │   ├── App.vue
   │   └── main.js
   ├── static/
   ├── utils/
   ├── test/
   └── index.html" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>└─ demo/
   ├── build/
   ├── config/
   ├── node_modules/
   ├── src/
   │   ├── assets/
   │   ├── components/
   │   ├── store/
   │   │   ├── actions/ 
   │   │   │   ├──aAction<span class="hljs-selector-class">.js</span>
   │   │   │   ├──bAction<span class="hljs-selector-class">.js</span>
   │   │   │   └──cAction<span class="hljs-selector-class">.js</span>
   │   │   ├── constants/
   │   │   │   └── types<span class="hljs-selector-class">.js</span>
   │   │   ├── getters/
   │   │   │   └── aGetter<span class="hljs-selector-class">.js</span>
   │   │   ├── modules/
   │   │   │   ├── aModules<span class="hljs-selector-class">.js</span>
   │   │   │   ├── bModules<span class="hljs-selector-class">.js</span>
   │   │   │   ├── cModules<span class="hljs-selector-class">.js</span>
   │   │   │   └── index<span class="hljs-selector-class">.js</span>
   │   │   ├── mutations/
   │   │   │   ├── aMutation<span class="hljs-selector-class">.js</span>
   │   │   │   ├── bMutation<span class="hljs-selector-class">.js</span>
   │   │   │   └── cMutation<span class="hljs-selector-class">.js</span>
   │   │   └── index<span class="hljs-selector-class">.js</span>
   │   ├── App<span class="hljs-selector-class">.vue</span>
   │   └── main<span class="hljs-selector-class">.js</span>
   ├── static/
   ├── utils/
   ├── test/
   └── index.html</code></pre>
<p>好了，基本的文件结构大概就是上面?这样的。</p>
<h3 id="articleHeader3">2. 编写模块A</h3>
<p>在编写模块之前，首先设定一些type类，例如：</p>
<h4>types.js</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = keyMirror({

    FETCH_LIST_REQUEST: null,
    FETCH_LIST_SUCCESS: null,
    FETCH_LISR_FAILURE: null
    
})

function keyMirror (obj) {
  if (obj instanceof Object) {
    var _obj = Object.assign({}, obj)
    var _keyArray = Object.keys(obj)
    _keyArray.forEach(key => _obj[key] = key)
    return _obj
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">module</span>.exports = keyMirror({

    <span class="hljs-attr">FETCH_LIST_REQUEST</span>: <span class="hljs-literal">null</span>,
    <span class="hljs-attr">FETCH_LIST_SUCCESS</span>: <span class="hljs-literal">null</span>,
    <span class="hljs-attr">FETCH_LISR_FAILURE</span>: <span class="hljs-literal">null</span>
    
})

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">keyMirror</span> (<span class="hljs-params">obj</span>) </span>{
  <span class="hljs-keyword">if</span> (obj <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>) {
    <span class="hljs-keyword">var</span> _obj = <span class="hljs-built_in">Object</span>.assign({}, obj)
    <span class="hljs-keyword">var</span> _keyArray = <span class="hljs-built_in">Object</span>.keys(obj)
    _keyArray.forEach(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> _obj[key] = key)
    <span class="hljs-keyword">return</span> _obj
  }
}
</code></pre>
<p>上面?自己实现keyMirror的方法，大家也可以使用下面这个包：<br><a href="https://github.com/STRML/keyMirror" rel="nofollow noreferrer" target="_blank">github.com/STRML/keyMirror</a></p>
<p>keyMirror的作用就是下面这个一个形式?，作用其实也不是很大：</p>
<blockquote>
<p>Input: {key1: null, key2: null}</p>
<p>Output: {key1: key1, key2: key2}</p>
</blockquote>
<h4>actions/aAction.js</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { FETCH_LIST_REQUEST, FETCH_LIST_SUCCESS, FETCH_LISR_FAILURE } from  '../constants/types'
import { toQueryString } from '../../utils'
import axios from 'axios'

export const fetchListAction = {
    fetchList ({ commit, state }, param) {
        commit(FETCH_LIST_REQUEST)
        axios.get('http://youdomain.com/list')
          .then(function (response) {
            commit(FETCH_LIST_SUCCESS, {
                data: response.data
            })  
            console.log(response);
          })
          .catch(function (error) {
            commit(FETCH_LIST_FAILURE, {
                error: error
            })
            console.log(error);
          });
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { FETCH_LIST_REQUEST, FETCH_LIST_SUCCESS, FETCH_LISR_FAILURE } <span class="hljs-keyword">from</span>  <span class="hljs-string">'../constants/types'</span>
<span class="hljs-keyword">import</span> { toQueryString } <span class="hljs-keyword">from</span> <span class="hljs-string">'../../utils'</span>
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> fetchListAction = {
    fetchList ({ commit, state }, param) {
        commit(FETCH_LIST_REQUEST)
        axios.get(<span class="hljs-string">'http://youdomain.com/list'</span>)
          .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">response</span>) </span>{
            commit(FETCH_LIST_SUCCESS, {
                <span class="hljs-attr">data</span>: response.data
            })  
            <span class="hljs-built_in">console</span>.log(response);
          })
          .catch(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
            commit(FETCH_LIST_FAILURE, {
                <span class="hljs-attr">error</span>: error
            })
            <span class="hljs-built_in">console</span>.log(error);
          });
    }
}</code></pre>
<h4>getters/aGetter.js</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const = fetchListGetter = {
    hotList (state) {
        return state.list.data.slice(0, 10)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>export const = fetchListGetter = {
    hotList (<span class="hljs-keyword">state</span>) {
        return <span class="hljs-keyword">state</span>.list.data.slice(<span class="hljs-number">0</span>, <span class="hljs-number">10</span>)
    }
}</code></pre>
<h4>mutations/aMutation.js</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { FETCH_LIST_REQUEST, FETCH_LIST_SUCCESS, FETCH_LISR_FAILURE } from  '../constants/types'

export const fetchListMutation = {
    [FETCH_LIST_REQUEST] (state) {
        state.isFetching = true
    },
    [FETCH_LIST_SUCCESS] (state, action) {
        state.isFetching = false
        state.data = action.data
        state.lastUpdated = (new Date()).getTime()
    },
    [FETCH_LIST_FAILURE] (state, action) {
        state.isFetching = false
        state.error = action.error
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>import { FETCH_LIST_REQUEST, FETCH_LIST_SUCCESS, FETCH_LISR_FAILURE } <span class="hljs-keyword">from</span>  '../constants/types'

export const fetchListMutation = {
    [FETCH_LIST_REQUEST] (<span class="hljs-keyword">state</span>) {
        <span class="hljs-keyword">state</span>.isFetching = true
    },
    [FETCH_LIST_SUCCESS] (<span class="hljs-keyword">state</span>, action) {
        <span class="hljs-keyword">state</span>.isFetching = false
        <span class="hljs-keyword">state</span>.data = action.data
        <span class="hljs-keyword">state</span>.lastUpdated = (new Date()).getTime()
    },
    [FETCH_LIST_FAILURE] (<span class="hljs-keyword">state</span>, action) {
        <span class="hljs-keyword">state</span>.isFetching = false
        <span class="hljs-keyword">state</span>.error = action.error
    }
}</code></pre>
<h4>modules/aModule.js</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { fetchListAction } from '../actions/aAction'
import { fetchListGetter } from '../getters/aGetter'
import { fetchListMutation } from '../mutations/aMutation'

export const list = {
    state: {
        isFetching: false,
        data: []
    }
    actions: fetchListAction,
    getters: fetchListGetter,
    mutations: fetchListMutation
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { fetchListAction } <span class="hljs-keyword">from</span> <span class="hljs-string">'../actions/aAction'</span>
<span class="hljs-keyword">import</span> { fetchListGetter } <span class="hljs-keyword">from</span> <span class="hljs-string">'../getters/aGetter'</span>
<span class="hljs-keyword">import</span> { fetchListMutation } <span class="hljs-keyword">from</span> <span class="hljs-string">'../mutations/aMutation'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> list = {
    <span class="hljs-attr">state</span>: {
        <span class="hljs-attr">isFetching</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">data</span>: []
    }
    actions: fetchListAction,
    <span class="hljs-attr">getters</span>: fetchListGetter,
    <span class="hljs-attr">mutations</span>: fetchListMutation
}</code></pre>
<h4>modules/index.js</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { list } from './aModule'

module.exports = {
    list: list
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs golo"><code><span class="hljs-keyword">import</span> { <span class="hljs-keyword">list</span> } from './aModule'

<span class="hljs-keyword">module</span>.exports = {
    <span class="hljs-keyword">list</span>: <span class="hljs-keyword">list</span>
}
</code></pre>
<h3 id="articleHeader4">3. 挂载store</h3>
<h4>index.js</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import { list } from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    list: list
    
  },
  plugins: [createLogger()],
  strict: process.env.NODE_ENV !== 'production'
})

if (module.hot) {
  module.hot.accept(['./mutations'], () => {
    const newMutations = require('./mutations').default

    store.hotUpdate({
      mutations: newMutations
    })
  })
}

export default store" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
<span class="hljs-keyword">import</span> createLogger <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex/dist/logger'</span>
<span class="hljs-keyword">import</span> { list } <span class="hljs-keyword">from</span> <span class="hljs-string">'./modules'</span>

Vue.use(Vuex)

const store = <span class="hljs-keyword">new</span> Vuex.Store({
  modules: {
    list: list
    
  },
  plugins: [createLogger()],
  strict: process.env.NODE_ENV !== <span class="hljs-string">'production'</span>
})

<span class="hljs-keyword">if</span> (<span class="hljs-built_in">module</span>.hot) {
  <span class="hljs-built_in">module</span>.hot.accept([<span class="hljs-string">'./mutations'</span>], <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    const newMutations = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./mutations'</span>).<span class="hljs-keyword">default</span>

    store.hotUpdate({
      mutations: newMutations
    })
  })
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> store</code></pre>
<h3 id="articleHeader5">4. store注入vue实例</h3>
<h4>main.js</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  ····
import store from './store'

  ···· 


var vue = new Vue({
  store,
 
  ···· 

})

vue.$mount('#app')
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>  ····
<span class="hljs-keyword">import</span> store from <span class="hljs-string">'./store'</span>

  ···· 


<span class="hljs-keyword">var</span> vue = <span class="hljs-keyword">new</span> <span class="hljs-type">Vue</span>({
  store,
 
  ···· 

})

vue.$mount(<span class="hljs-string">'#app'</span>)
</code></pre>
<h3 id="articleHeader6">5. 在Component中使用</h3>
<p>Vuex 提供了组件中使用的<code>mapState</code>,<code>mapAction</code>,<code>mapGetter</code>方法，因此可以很方便的调用。</p>
<h4>Example.vue</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>

 ·········

</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
module.exports = {
    ·······
    methods: {
        ...mapActions([
            'fetchList'
        ])
    },
    computed: {
        ...mapState{
            list: state => state.list
        },
        ...mapGetters{[
            'hotList'
        ]}
    }
}
</script>
<style>
    ·······
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>

 ·········

<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> { mapState, mapActions, mapGetters } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
<span class="hljs-built_in">module</span>.exports = {
    ·······
    methods: {
        ...mapActions([
            <span class="hljs-string">'fetchList'</span>
        ])
    },
    <span class="hljs-attr">computed</span>: {
        ...mapState{
            <span class="hljs-attr">list</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.list
        },
        ...mapGetters{[
            <span class="hljs-string">'hotList'</span>
        ]}
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">
    ·······
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h2 id="articleHeader7">复用模块</h2>
<p>模块化拆分之后可以实现较为复杂的数据流，特别地，如果对action和mutation稍加改造，就可以复用模块：<br>比如我们在Example.vue中发起Action：</p>
<h4>Example.vue</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>

 ·········

</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
module.exports = {
    ·······
    mounted () {
        this.fetchList({
            request: 'week'
        })
    },
    methods: {
        ...mapActions([
            'fetchList'
        ])
    },
    computed: {
        ...mapState{
            list: state => state.list
        },
        ...mapGetters{[
            'hotList'
        ]}
    }
}
</script>
<style>
    ·······
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>

 ·········

<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> { mapState, mapActions, mapGetters } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
<span class="hljs-built_in">module</span>.exports = {
    ·······
    mounted () {
        <span class="hljs-keyword">this</span>.fetchList({
            <span class="hljs-attr">request</span>: <span class="hljs-string">'week'</span>
        })
    },
    <span class="hljs-attr">methods</span>: {
        ...mapActions([
            <span class="hljs-string">'fetchList'</span>
        ])
    },
    <span class="hljs-attr">computed</span>: {
        ...mapState{
            <span class="hljs-attr">list</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.list
        },
        ...mapGetters{[
            <span class="hljs-string">'hotList'</span>
        ]}
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">
    ·······
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>在上面的例子中，我们在组件挂载完成之后发起了一个fetchList的action，并添加了一个名为<code>request</code>的参数，这里给一个<code>week</code>值，也可以给按照业务需要给<code>month</code>、<code>year</code>之类的值，接下来对aAction.js做一些修改。</p>
<h4>actions/aAction.js</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { FETCH_LIST_REQUEST, FETCH_LIST_SUCCESS, FETCH_LISR_FAILURE } from  '../constants/types'
import { toQueryString } from '../../utils'
import axios from 'axios'

export const fetchListAction = {
    fetchList ({ commit, state }, param) {
        commit(FETCH_LIST_REQUEST, {
            request: param['request']
        })
        axios.get(`http://youdomain.com/${param['request']}list`)
          .then(function (response) {
            commit(FETCH_LIST_SUCCESS, {
                request: param['request']
                data: response.data
            })  
            console.log(response);
          })
          .catch(function (error) {
            commit(FETCH_LIST_FAILURE, {
                request: param['request']
                error: error
            })
            console.log(error);
          });
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { FETCH_LIST_REQUEST, FETCH_LIST_SUCCESS, FETCH_LISR_FAILURE } <span class="hljs-keyword">from</span>  <span class="hljs-string">'../constants/types'</span>
<span class="hljs-keyword">import</span> { toQueryString } <span class="hljs-keyword">from</span> <span class="hljs-string">'../../utils'</span>
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> fetchListAction = {
    fetchList ({ commit, state }, param) {
        commit(FETCH_LIST_REQUEST, {
            <span class="hljs-attr">request</span>: param[<span class="hljs-string">'request'</span>]
        })
        axios.get(<span class="hljs-string">`http://youdomain.com/<span class="hljs-subst">${param[<span class="hljs-string">'request'</span>]}</span>list`</span>)
          .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">response</span>) </span>{
            commit(FETCH_LIST_SUCCESS, {
                <span class="hljs-attr">request</span>: param[<span class="hljs-string">'request'</span>]
                data: response.data
            })  
            <span class="hljs-built_in">console</span>.log(response);
          })
          .catch(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
            commit(FETCH_LIST_FAILURE, {
                <span class="hljs-attr">request</span>: param[<span class="hljs-string">'request'</span>]
                error: error
            })
            <span class="hljs-built_in">console</span>.log(error);
          });
    }
}</code></pre>
<p>请求成功之后，在 commit()中加入了一个request的参数，这样Mutation就可以从里面获取相应的参数，最后对aMutation做一些修改。</p>
<h4>mutations/aMutation.js</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { FETCH_LIST_REQUEST, FETCH_LIST_SUCCESS, FETCH_LISR_FAILURE } from  '../constants/types'

export const fetchListMutation = {
    [FETCH_LIST_REQUEST] (state, action) {
        state[action.request].isFetching = true
    },
    [FETCH_LIST_SUCCESS] (state, action) {
        state[action.request].isFetching = false
        state[action.request].data = action.data
        state[action.request].lastUpdated = (new Date()).getTime()
    },
    [FETCH_LIST_FAILURE] (state, action) {
        state[action.request].isFetching = false
        state[action.request].error = action.error
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>import { FETCH_LIST_REQUEST, FETCH_LIST_SUCCESS, FETCH_LISR_FAILURE } <span class="hljs-keyword">from</span>  '../constants/types'

export const fetchListMutation = {
    [FETCH_LIST_REQUEST] (<span class="hljs-keyword">state</span>, action) {
        <span class="hljs-keyword">state</span>[action.request].isFetching = true
    },
    [FETCH_LIST_SUCCESS] (<span class="hljs-keyword">state</span>, action) {
        <span class="hljs-keyword">state</span>[action.request].isFetching = false
        <span class="hljs-keyword">state</span>[action.request].data = action.data
        <span class="hljs-keyword">state</span>[action.request].lastUpdated = (new Date()).getTime()
    },
    [FETCH_LIST_FAILURE] (<span class="hljs-keyword">state</span>, action) {
        <span class="hljs-keyword">state</span>[action.request].isFetching = false
        <span class="hljs-keyword">state</span>[action.request].error = action.error
    }
}</code></pre>
<p>state加入了[action.request]，以区分不同的接口数据。</p>
<p>完成以上修改后，只需要在组件调用相应的action时加入不同的参数，就可以调用相同类型但数据不同的接口。</p>
<h2 id="articleHeader8">总结</h2>
<p>以上是我在Vuex实践中总结的一些东西，分享给大家，如果有不合理或者错误❌的地方，也希望各位老司机不吝赐教??，有机会多交流。</p>
<p>微信号：pasturn<br>Github：<a href="https://github.com/pasturn" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/pasturn" rel="nofollow noreferrer" target="_blank">https://github.com/pasturn</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vuex下Store的模块化拆分实践

## 原文链接
[https://segmentfault.com/a/1190000007667542](https://segmentfault.com/a/1190000007667542)

