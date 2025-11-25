---
title: 'Vuex学习' 
date: 2019-02-03 2:30:39
hidden: true
slug: bhep5xogkr
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">参考</h2>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000005891026">使用 Vuex + Vue.js 构建单页应用</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000005780326" target="_blank">使用Vue.js和Vuex实现购物车场景</a><br><a href="https://github.com/xiaoluoboding/vue-demo-collection" rel="nofollow noreferrer" target="_blank">vue-demo-collection</a></p></li>
</ul>
<h2 id="articleHeader1">配置Vuex</h2>
<p>在<code>src</code>下创建一个文件夹叫做<code>vuex</code>。里面定义三个文件。</p>
<h3 id="articleHeader2">
<code>mutation-types.js</code> 定义类型的</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/vuex/mutation-types.js
export const SET_HEADER_TITLE = 'SET_HEADER_TITLE'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/vuex/mutation-types.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> SET_HEADER_TITLE = <span class="hljs-string">'SET_HEADER_TITLE'</span></code></pre>
<h3 id="articleHeader3">
<code>actions.js</code> 操作，可以分解成多个文件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/vuex/actions.js
/**
 * 用统一的函数处理并分发mutations。
 * @param type
 * @returns {function({dispatch: *}, ...[*]): *}
 */
function makeAction (type) {
    return ({ dispatch }, ...args) => dispatch(type, ...args)
}

import {
    SET_HEADER_TITLE
} from './mutation-types'

/**
 * actions
 */
export const setTitle = makeAction(SET_HEADER_TITLE)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/vuex/actions.js</span>
<span class="hljs-comment">/**
 * 用统一的函数处理并分发mutations。
 * @param type
 * @returns {function({dispatch: *}, ...[*]): *}
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeAction</span> (<span class="hljs-params">type</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">{ dispatch }, ...args</span>) =&gt;</span> dispatch(type, ...args)
}

<span class="hljs-keyword">import</span> {
    SET_HEADER_TITLE
} <span class="hljs-keyword">from</span> <span class="hljs-string">'./mutation-types'</span>

<span class="hljs-comment">/**
 * actions
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> setTitle = makeAction(SET_HEADER_TITLE)</code></pre>
<h3 id="articleHeader4">
<code>store.js</code> 入口文件，在根组件调用，然后所有子组件可以共享数据。</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/vuex/store.js
import Vue from 'vue'
import Vuex from 'vuex'
//import createLogger from 'vuex/logger'

Vue.use(Vuex)
//Vue.config.debug = true
//const debug = process.env.NODE_ENV !== 'production'

// 导入各个模块的初始状态和 mutations
import index from './modules/index'
export default new Vuex.Store({
    // 组合各个模块
    modules: {
        index
    },
    //strict: debug,
    //moddlewares: debug ? [createLogger()] : []
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/vuex/store.js</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
<span class="hljs-comment">//import createLogger from 'vuex/logger'</span>

Vue.use(Vuex)
<span class="hljs-comment">//Vue.config.debug = true</span>
<span class="hljs-comment">//const debug = process.env.NODE_ENV !== 'production'</span>

<span class="hljs-comment">// 导入各个模块的初始状态和 mutations</span>
<span class="hljs-keyword">import</span> index <span class="hljs-keyword">from</span> <span class="hljs-string">'./modules/index'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vuex.Store({
    <span class="hljs-comment">// 组合各个模块</span>
    modules: {
        index
    },
    <span class="hljs-comment">//strict: debug,</span>
    <span class="hljs-comment">//moddlewares: debug ? [createLogger()] : []</span>
})</code></pre>
<h3 id="articleHeader5">
<code>modules/index.js</code> 只是例子用的，一个index的操作，需要定义数据的状态和mutation。<code>actions.js</code>只是分发操作。</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/vuex/modules/index.js
import {
    SET_HEADER_TITLE
} from '../mutation-types'

const state = {
    title: 'default',
    info: {
        name:''
    }
}

const mutations = {
    [SET_HEADER_TITLE](state, newTitle) {
        state.title = newTitle
    }
}

export default {
    state,
    mutations
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/vuex/modules/index.js</span>
<span class="hljs-keyword">import</span> {
    SET_HEADER_TITLE
} <span class="hljs-keyword">from</span> <span class="hljs-string">'../mutation-types'</span>

<span class="hljs-keyword">const</span> state = {
    <span class="hljs-attr">title</span>: <span class="hljs-string">'default'</span>,
    <span class="hljs-attr">info</span>: {
        <span class="hljs-attr">name</span>:<span class="hljs-string">''</span>
    }
}

<span class="hljs-keyword">const</span> mutations = {
    [SET_HEADER_TITLE](state, newTitle) {
        state.title = newTitle
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    state,
    mutations
}</code></pre>
<h2 id="articleHeader6">挂载store</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/App.vue
import store from './vuex/store'
import HeaderComponent from './components/header'
import FooterComponent from './components/footer'
export default {
    store,
    components: {
        HeaderComponent,
        FooterComponent
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/App.vue</span>
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./vuex/store'</span>
<span class="hljs-keyword">import</span> HeaderComponent <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/header'</span>
<span class="hljs-keyword">import</span> FooterComponent <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/footer'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    store,
    <span class="hljs-attr">components</span>: {
        HeaderComponent,
        FooterComponent
    }
}</code></pre>
<h2 id="articleHeader7">获取数据及操作</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/components/header.vue
// 从vuex拿数据，然后渲染到页面上
// 如果需要修改可以调用setTitle
import { setTitle } from '../vuex/actions'
export default {
    vuex: {
        //获取vuex状态数据
        getters: {
            title: state => state.title,
            info: ({index}) => index.info
        },
        //状态变更事件
        actions: {
            setTitle
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/components/header.vue</span>
<span class="hljs-comment">// 从vuex拿数据，然后渲染到页面上</span>
<span class="hljs-comment">// 如果需要修改可以调用setTitle</span>
<span class="hljs-keyword">import</span> { setTitle } <span class="hljs-keyword">from</span> <span class="hljs-string">'../vuex/actions'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">vuex</span>: {
        <span class="hljs-comment">//获取vuex状态数据</span>
        getters: {
            <span class="hljs-attr">title</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.title,
            <span class="hljs-attr">info</span>: <span class="hljs-function">(<span class="hljs-params">{index}</span>) =&gt;</span> index.info
        },
        <span class="hljs-comment">//状态变更事件</span>
        actions: {
            setTitle
        }
    }
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vuex学习

## 原文链接
[https://segmentfault.com/a/1190000007020790](https://segmentfault.com/a/1190000007020790)

