---
title: 'Vuex 模块化+命名空间后, 如何调用其他模块的 state, actions, mutations, getters ?' 
date: 2019-01-14 2:30:07
hidden: true
slug: 5agi1ecia9l
categories: [reprint]
---

{{< raw >}}

                    
<p>由于 Vuex 使用了单一状态树，应用的所有状态都包含在一个大对象中。那么，随着应用的不断扩展，store 会变得非常臃肿。</p>
<p>为了解决这个问题，Vuex 允许我们把 store 分 module（模块）。每一个模块包含各自的状态、mutation、action 和 getter。</p>
<p>那么问题来了, 模块化+命名空间之后, 数据都是相对独立的, 如果想在模块 A 调用 模块 B 的<code>state, actions, mutations, getters</code>, 该肿么办?</p>
<p>假设有这么两个模块:</p>
<h4>模块A:</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import api from '~api'

const state = {
    vip: {},
}

const actions = {
    async ['get']({commit, state, dispatch}, config = {}) {
        try {
            const { data: { code, data } } = await api.post('vip/getVipBaseInfo', config)
            if (code === 1001) commit('receive', data)
        } catch(error) { console.log(error) }
    }
}

const mutations = {
    ['receive'](state, data) {
        state.vip = data
    }
}

const getters = {
    ['get'](state) {
        return state.vip
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> api <span class="hljs-keyword">from</span> <span class="hljs-string">'~api'</span>

<span class="hljs-keyword">const</span> state = {
    <span class="hljs-attr">vip</span>: {},
}

<span class="hljs-keyword">const</span> actions = {
    <span class="hljs-keyword">async</span> [<span class="hljs-string">'get'</span>]({commit, state, dispatch}, config = {}) {
        <span class="hljs-keyword">try</span> {
            <span class="hljs-keyword">const</span> { <span class="hljs-attr">data</span>: { code, data } } = <span class="hljs-keyword">await</span> api.post(<span class="hljs-string">'vip/getVipBaseInfo'</span>, config)
            <span class="hljs-keyword">if</span> (code === <span class="hljs-number">1001</span>) commit(<span class="hljs-string">'receive'</span>, data)
        } <span class="hljs-keyword">catch</span>(error) { <span class="hljs-built_in">console</span>.log(error) }
    }
}

<span class="hljs-keyword">const</span> mutations = {
    [<span class="hljs-string">'receive'</span>](state, data) {
        state.vip = data
    }
}

<span class="hljs-keyword">const</span> getters = {
    [<span class="hljs-string">'get'</span>](state) {
        <span class="hljs-keyword">return</span> state.vip
    },
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">namespaced</span>: <span class="hljs-literal">true</span>,
    state,
    actions,
    mutations,
    getters
}</code></pre>
<h4>模块B:</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import api from '~api'

const state = {
    shop: {},
}

const actions = {
    async ['get']({commit, state, dispatch}, config = {}) {
        try {
            const { data: { code, data } } = await api.post('shop/getShopBaseInfo', config)
            if (code === 1001) commit('receive', data)
        } catch(error) { console.log(error) }
    }
}

const mutations = {
    ['receive'](state, data) {
        state.shop = data
    }
}

const getters = {
    ['get'](state) {
        return state.shop
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> api <span class="hljs-keyword">from</span> <span class="hljs-string">'~api'</span>

<span class="hljs-keyword">const</span> state = {
    <span class="hljs-attr">shop</span>: {},
}

<span class="hljs-keyword">const</span> actions = {
    <span class="hljs-keyword">async</span> [<span class="hljs-string">'get'</span>]({commit, state, dispatch}, config = {}) {
        <span class="hljs-keyword">try</span> {
            <span class="hljs-keyword">const</span> { <span class="hljs-attr">data</span>: { code, data } } = <span class="hljs-keyword">await</span> api.post(<span class="hljs-string">'shop/getShopBaseInfo'</span>, config)
            <span class="hljs-keyword">if</span> (code === <span class="hljs-number">1001</span>) commit(<span class="hljs-string">'receive'</span>, data)
        } <span class="hljs-keyword">catch</span>(error) { <span class="hljs-built_in">console</span>.log(error) }
    }
}

<span class="hljs-keyword">const</span> mutations = {
    [<span class="hljs-string">'receive'</span>](state, data) {
        state.shop = data
    }
}

<span class="hljs-keyword">const</span> getters = {
    [<span class="hljs-string">'get'</span>](state) {
        <span class="hljs-keyword">return</span> state.shop
    },
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">namespaced</span>: <span class="hljs-literal">true</span>,
    state,
    actions,
    mutations,
    getters
}</code></pre>
<h4>假设模块 B 的 <code>actions</code> 里, 需要用模块 A 的 <code>state</code> 该怎么办?</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const actions = {
    async ['shop'](store, config = {}) {
        const { commit, dispatch, state, rootState } = store
        console.log(rootState) // 打印根 state
        console.log(rootState.vip) // 打印其他模块的 state
        try {
            const { data: { code, data } } = await api.post('shop/getShopBaseInfo', config)
            if (code === 1001) commit('receive', data)
        } catch(error) { console.log(error) }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> actions = {
    <span class="hljs-keyword">async</span> [<span class="hljs-string">'shop'</span>](store, config = {}) {
        <span class="hljs-keyword">const</span> { commit, dispatch, state, rootState } = store
        <span class="hljs-built_in">console</span>.log(rootState) <span class="hljs-comment">// 打印根 state</span>
        <span class="hljs-built_in">console</span>.log(rootState.vip) <span class="hljs-comment">// 打印其他模块的 state</span>
        <span class="hljs-keyword">try</span> {
            <span class="hljs-keyword">const</span> { <span class="hljs-attr">data</span>: { code, data } } = <span class="hljs-keyword">await</span> api.post(<span class="hljs-string">'shop/getShopBaseInfo'</span>, config)
            <span class="hljs-keyword">if</span> (code === <span class="hljs-number">1001</span>) commit(<span class="hljs-string">'receive'</span>, data)
        } <span class="hljs-keyword">catch</span>(error) { <span class="hljs-built_in">console</span>.log(error) }
    }
}</code></pre>
<p>我们来看下上面的代码, actions 中的 shop 方法, 有 2 个参数, 第一个是 store, 第二个是 dispatch 调用时传过来的参数<br>store 这个对象又包含了 4 个键, 其中 commit 是调用 mutations 用的, dispatch 是调用 actions 用的, state 是当前模块的 state, 而 rootState 是根 state,<br>既然能拿到根 state, 想取其他模块的 state 是不是就很简单了...?</p>
<h4>假设模块 B 的 <code>actions</code> 里, 需要调用模块 A 的 <code>actions</code> 该怎么办?</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const actions = {
    async ['shop'](store, config = {}) {
        const { commit, dispatch, state, rootState } = store
        try {
            const { data: { code, data } } = await api.post('shop/getShopBaseInfo', config, 'get')
            if (code === 1001) commit('receive', data) // 调用当前模块的 mutations
            dispatch('vip/get', {}, {root: true}) // 调用其他模块的 actions
        } catch(error) { console.log(error) }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> actions = {
    <span class="hljs-keyword">async</span> [<span class="hljs-string">'shop'</span>](store, config = {}) {
        <span class="hljs-keyword">const</span> { commit, dispatch, state, rootState } = store
        <span class="hljs-keyword">try</span> {
            <span class="hljs-keyword">const</span> { <span class="hljs-attr">data</span>: { code, data } } = <span class="hljs-keyword">await</span> api.post(<span class="hljs-string">'shop/getShopBaseInfo'</span>, config, <span class="hljs-string">'get'</span>)
            <span class="hljs-keyword">if</span> (code === <span class="hljs-number">1001</span>) commit(<span class="hljs-string">'receive'</span>, data) <span class="hljs-comment">// 调用当前模块的 mutations</span>
            dispatch(<span class="hljs-string">'vip/get'</span>, {}, {<span class="hljs-attr">root</span>: <span class="hljs-literal">true</span>}) <span class="hljs-comment">// 调用其他模块的 actions</span>
        } <span class="hljs-keyword">catch</span>(error) { <span class="hljs-built_in">console</span>.log(error) }
    }
}</code></pre>
<p>上面的代码中<code>dispatch('vip/vip', {}, {root: true})</code>就是在模块 B 调用 模块 A 的 actions,<br>有 3 个参数, 第一个参数是其他模块的 actions 路径, 第二个是传给 actions 的数据, 如果不需要传数据, 也必须预留, 第三个参数是配置选项, 申明这个 acitons 不是当前模块的</p>
<h4>假设模块 B 的 <code>actions</code> 里, 需要调用模块 A 的 <code>mutations</code> 该怎么办?</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const actions = {
    async ['shop'](store, config = {}) {
        const { commit, dispatch, state, rootState } = store
        try {
            const { data: { code, data } } = await api.post('shop/getShopBaseInfo', config)
            if (code === 1001) commit('receive', data) // 调用当前模块的 mutations
            commit('vip/receive', data, {root: true}) // 调用其他模块的 mutations
        } catch(error) { console.log(error) }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> actions = {
    <span class="hljs-keyword">async</span> [<span class="hljs-string">'shop'</span>](store, config = {}) {
        <span class="hljs-keyword">const</span> { commit, dispatch, state, rootState } = store
        <span class="hljs-keyword">try</span> {
            <span class="hljs-keyword">const</span> { <span class="hljs-attr">data</span>: { code, data } } = <span class="hljs-keyword">await</span> api.post(<span class="hljs-string">'shop/getShopBaseInfo'</span>, config)
            <span class="hljs-keyword">if</span> (code === <span class="hljs-number">1001</span>) commit(<span class="hljs-string">'receive'</span>, data) <span class="hljs-comment">// 调用当前模块的 mutations</span>
            commit(<span class="hljs-string">'vip/receive'</span>, data, {<span class="hljs-attr">root</span>: <span class="hljs-literal">true</span>}) <span class="hljs-comment">// 调用其他模块的 mutations</span>
        } <span class="hljs-keyword">catch</span>(error) { <span class="hljs-built_in">console</span>.log(error) }
    }
}</code></pre>
<p>上面的代码中<code>commit('vip/receive', {}, {root: true})</code>就是在模块 B 调用 模块 A 的 mutations,<br>有 3 个参数, 第一个参数是其他模块的 mutations 路径, 第二个是传给 mutations 的数据, 如果不需要传数据, 也必须预留, 第三个参数是配置选项, 申明这个 mutations 不是当前模块的</p>
<h4>假设模块 B 的 <code>actions</code> 里, 需要用模块 A 的 <code>getters</code> 该怎么办?</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const actions = {
    async ['shop'](store, config = {}) {
        const { commit, dispatch, state, rootState, rootGetters } = store
        console.log(rootGetters['vip/get']) // 打印其他模块的 getters
        try {
            const { data: { code, data } } = await api.post('shop/getShopBaseInfo', config)
            if (code === 1001) commit('receive', data)
        } catch(error) { console.log(error) }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> actions = {
    <span class="hljs-keyword">async</span> [<span class="hljs-string">'shop'</span>](store, config = {}) {
        <span class="hljs-keyword">const</span> { commit, dispatch, state, rootState, rootGetters } = store
        <span class="hljs-built_in">console</span>.log(rootGetters[<span class="hljs-string">'vip/get'</span>]) <span class="hljs-comment">// 打印其他模块的 getters</span>
        <span class="hljs-keyword">try</span> {
            <span class="hljs-keyword">const</span> { <span class="hljs-attr">data</span>: { code, data } } = <span class="hljs-keyword">await</span> api.post(<span class="hljs-string">'shop/getShopBaseInfo'</span>, config)
            <span class="hljs-keyword">if</span> (code === <span class="hljs-number">1001</span>) commit(<span class="hljs-string">'receive'</span>, data)
        } <span class="hljs-keyword">catch</span>(error) { <span class="hljs-built_in">console</span>.log(error) }
    }
}</code></pre>
<p>我们来看下上面的代码, 相比之前的代码, store 又多了一个键: rootGetters<br>rootGetters 就是 vuex 中所有的 getters, 你可以用 <code>rootGetters['xxxxx']</code> 来取其他模块的getters</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vuex 模块化+命名空间后, 如何调用其他模块的 state, actions, mutations, getters ?

## 原文链接
[https://segmentfault.com/a/1190000009434398](https://segmentfault.com/a/1190000009434398)

