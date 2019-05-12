---
title: '再说 Vue SSR 的 Cookies 问题' 
date: 2019-01-08 2:30:11
hidden: true
slug: czpb7jpq2y7
categories: [reprint]
---

{{< raw >}}

                    
<p>一个网站一旦涉及到多用户, 就很难从 Cookies 中逃脱, Vue SSR 的 cookies 也真算是遇到的一个不小的问题, 从开始玩 SSR 开始到现在, 一共想出了3种方案, 从最早的把 Cookies 注入到 state 中, 到把 Cookies 注入到 global, 到现在的将 Cookies 注入到组件的 asyncData 方法.</p>
<p>随着 Vue 的升级, 第一种方案已经不再适用, 第二种也有不少的限制, 于是想到第三种方案, 下来就说说具体实现的方法:</p>
<h3 id="articleHeader0">第一种方案</h3>
<p>第一种方案已经不再适用, 这里不再细说</p>
<h3 id="articleHeader1">第二种方案</h3>
<p>思路: 将 cookies 注入到 ssr 的 context里, 然后在请求 api 时读取, 再追加到 axios 的header 里</p>
<p>1, 首先在 server.js 里将 cookies 加到 context里</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const context = {
    title: 'M.M.F 小屋',
    description: 'M.M.F 小屋',
    url: req.url,
    cookies: req.cookies
}
renderer.renderToString(context, (err, html) => {
    if (err) {
        return errorHandler(err)
    }
    res.end(html)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> context = {
    <span class="hljs-attr">title</span>: <span class="hljs-string">'M.M.F 小屋'</span>,
    <span class="hljs-attr">description</span>: <span class="hljs-string">'M.M.F 小屋'</span>,
    <span class="hljs-attr">url</span>: req.url,
    <span class="hljs-attr">cookies</span>: req.cookies
}
renderer.renderToString(context, (err, html) =&gt; {
    <span class="hljs-keyword">if</span> (err) {
        <span class="hljs-keyword">return</span> errorHandler(err)
    }
    res.end(html)
})</code></pre>
<p>之后, Vue 会把 context 加到 <code>global.__VUE_SSR_CONTEXT__</code></p>
<p>2, 在 api.js 里读取 cookies</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from 'axios'
import qs from 'qs'
import md5 from 'md5'
import config from './config-server'

const SSR = global.__VUE_SSR_CONTEXT__
const cookies = SSR.cookies || {}
const parseCookie = cookies => {
    let cookie = ''
    Object.keys(cookies).forEach(item => {
        cookie+= item + '=' + cookies[item] + '; '
    })
    return cookie
}

export default {
    async post(url, data) {
        const cookie = parseCookie(cookies)
        const res = await axios({
            method: 'post',
            url: config.api + url,
            data: qs.stringify(data),
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                cookie
            }
        })
        return res
    },
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>
<span class="hljs-keyword">import</span> qs <span class="hljs-keyword">from</span> <span class="hljs-string">'qs'</span>
<span class="hljs-keyword">import</span> md5 <span class="hljs-keyword">from</span> <span class="hljs-string">'md5'</span>
<span class="hljs-keyword">import</span> config <span class="hljs-keyword">from</span> <span class="hljs-string">'./config-server'</span>

<span class="hljs-keyword">const</span> SSR = global.__VUE_SSR_CONTEXT__
<span class="hljs-keyword">const</span> cookies = SSR.cookies || {}
<span class="hljs-keyword">const</span> parseCookie = <span class="hljs-function"><span class="hljs-params">cookies</span> =&gt;</span> {
    <span class="hljs-keyword">let</span> cookie = <span class="hljs-string">''</span>
    <span class="hljs-built_in">Object</span>.keys(cookies).forEach(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
        cookie+= item + <span class="hljs-string">'='</span> + cookies[item] + <span class="hljs-string">'; '</span>
    })
    <span class="hljs-keyword">return</span> cookie
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-keyword">async</span> post(url, data) {
        <span class="hljs-keyword">const</span> cookie = parseCookie(cookies)
        <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> axios({
            <span class="hljs-attr">method</span>: <span class="hljs-string">'post'</span>,
            <span class="hljs-attr">url</span>: config.api + url,
            <span class="hljs-attr">data</span>: qs.stringify(data),
            <span class="hljs-attr">timeout</span>: config.timeout,
            <span class="hljs-attr">headers</span>: {
                <span class="hljs-string">'X-Requested-With'</span>: <span class="hljs-string">'XMLHttpRequest'</span>,
                <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'application/x-www-form-urlencoded; charset=UTF-8'</span>,
                cookie
            }
        })
        <span class="hljs-keyword">return</span> res
    },
}</code></pre>
<p>为什么可以这么做?<br>默认情况下，Vue 对于每次渲染，<code>bundle renderer</code> 将创建一个新的 V8 上下文并重新执行整个 bundle。应用程序代码与服务器进程隔离, 所以每个访问的用户上下文都是独立的, 不会互相影响.</p>
<p>但是从<code>Vue@2.3.0</code>开始, 在<code>createBundleRenderer</code>方法的选项中, 添加了<code>runInNewContext</code>选项, 使用 <code>runInNewContext: false</code>，bundle 代码将与服务器进程在同一个 global 上下文中运行，所以我们不能再将 cookies 放在 global, 因为这会让所有用户共用同一个 cookies.</p>
<p>为什么现在不这么做?<br>那我们继续将<code>runInNewContext</code>设置成<code>true</code>, 不就好了吗? 当然也是可以的, 但是重新创建上下文并执行整个 bundle 还是相当昂贵的，特别是当应用很大的时候.</p>
<p>以我自己的博客为例, 之前只有渲染 5 个路由组件, loadtest 的 rps, 有 50 左右, 但是后来把后台的 12 个路由组件也加到 SSR 后, rps 直接降到了个位数...</p>
<p>所以出现了现在的第三种方案</p>
<h3 id="articleHeader2">第三种方案</h3>
<p>思路: 将 Cookies 作为参数注入到组件的<code>asyncData</code>方法, 然后用传参数的方法把 cookies 传给 api, 不得不说这种方法很麻烦, 但是这是个人能想到的比较好的方法</p>
<h4>步骤1:</h4>
<p>还是在 server.js 里, 把 cookies 注入到 context 中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const context = {
    title: 'M.M.F 小屋',
    url: req.url,
    cookies: req.cookies,
}
renderer.renderToString(context, (err, html) => {
    if (err) {
        return handleError(err)
    }
    res.end(html)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> context = {
    <span class="hljs-attr">title</span>: <span class="hljs-string">'M.M.F 小屋'</span>,
    <span class="hljs-attr">url</span>: req.url,
    <span class="hljs-attr">cookies</span>: req.cookies,
}
renderer.renderToString(context, (err, html) =&gt; {
    <span class="hljs-keyword">if</span> (err) {
        <span class="hljs-keyword">return</span> handleError(err)
    }
    res.end(html)
})</code></pre>
<h4>步骤2:</h4>
<p>在<code>entry-server.js</code>里, 将<code>cookies</code>作为参数传给 asyncData 方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.all(matchedComponents.map(({asyncData}) => asyncData &amp;&amp; asyncData({
    store,
    route: router.currentRoute,
    cookies: context.cookies,
    isServer: true,
    isClient: false
}))).then(() => {
    context.state = store.state
    context.isProd = process.env.NODE_ENV === 'production'
    resolve(app)
}).catch(reject)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Promise</span>.all(matchedComponents.map(<span class="hljs-function">(<span class="hljs-params">{asyncData}</span>) =&gt;</span> asyncData &amp;&amp; asyncData({
    store,
    <span class="hljs-attr">route</span>: router.currentRoute,
    <span class="hljs-attr">cookies</span>: context.cookies,
    <span class="hljs-attr">isServer</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">isClient</span>: <span class="hljs-literal">false</span>
}))).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    context.state = store.state
    context.isProd = process.env.NODE_ENV === <span class="hljs-string">'production'</span>
    resolve(app)
}).catch(reject)</code></pre>
<h4>步骤3:</h4>
<p>在组件里, 把 cookies 做为参数给 Vuex 的 actions</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    name: 'frontend-index',
    async asyncData({store, route, cookies}, config = { page: 1}) {
        config.cookies = cookies
        await store.dispatch('frontend/article/getArticleList', config)
    }
    // .....
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'frontend-index'</span>,
    <span class="hljs-keyword">async</span> asyncData({store, route, cookies}, config = { <span class="hljs-attr">page</span>: <span class="hljs-number">1</span>}) {
        config.cookies = cookies
        <span class="hljs-keyword">await</span> store.dispatch(<span class="hljs-string">'frontend/article/getArticleList'</span>, config)
    }
    <span class="hljs-comment">// .....</span>
}</code></pre>
<h4>步骤4:</h4>
<p>在 Vuex 里将 cookies 做为参数给 api</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import api from '~api'

const state = () => ({
    lists: {
        data: [],
        hasNext: 0,
        page: 1,
        path: ''
    },
})

const actions = {
    async ['getArticleList']({commit, state}, config) {
        // vuex 作为临时缓存
        if (state.lists.data.length > 0 &amp;&amp; config.path === state.lists.path &amp;&amp; config.page === 1) {
            return
        }
        let cookies
        if (config.cookies) {
            cookies = config.cookies
            delete config.cookies
        }
        const { data: { data, code} } = await api.get('frontend/article/list', {...config, cache: true}, cookies)
        if (data &amp;&amp; code === 200) {
            commit('receiveArticleList', {
                ...config,
                ...data,
            })
        }
    },
}

const mutations = {
    ['receiveArticleList'](state, {list, hasNext, hasPrev, page, path}) {
        if (page === 1) {
            list = [].concat(list)
        } else {
            list = state.lists.data.concat(list)
        }
        state.lists = {
            data: list, hasNext, hasPrev, page, path
        }
    },
}

const getters = {

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

<span class="hljs-keyword">const</span> state = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({
    <span class="hljs-attr">lists</span>: {
        <span class="hljs-attr">data</span>: [],
        <span class="hljs-attr">hasNext</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">page</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">path</span>: <span class="hljs-string">''</span>
    },
})

<span class="hljs-keyword">const</span> actions = {
    <span class="hljs-keyword">async</span> [<span class="hljs-string">'getArticleList'</span>]({commit, state}, config) {
        <span class="hljs-comment">// vuex 作为临时缓存</span>
        <span class="hljs-keyword">if</span> (state.lists.data.length &gt; <span class="hljs-number">0</span> &amp;&amp; config.path === state.lists.path &amp;&amp; config.page === <span class="hljs-number">1</span>) {
            <span class="hljs-keyword">return</span>
        }
        <span class="hljs-keyword">let</span> cookies
        <span class="hljs-keyword">if</span> (config.cookies) {
            cookies = config.cookies
            <span class="hljs-keyword">delete</span> config.cookies
        }
        <span class="hljs-keyword">const</span> { <span class="hljs-attr">data</span>: { data, code} } = <span class="hljs-keyword">await</span> api.get(<span class="hljs-string">'frontend/article/list'</span>, {...config, <span class="hljs-attr">cache</span>: <span class="hljs-literal">true</span>}, cookies)
        <span class="hljs-keyword">if</span> (data &amp;&amp; code === <span class="hljs-number">200</span>) {
            commit(<span class="hljs-string">'receiveArticleList'</span>, {
                ...config,
                ...data,
            })
        }
    },
}

<span class="hljs-keyword">const</span> mutations = {
    [<span class="hljs-string">'receiveArticleList'</span>](state, {list, hasNext, hasPrev, page, path}) {
        <span class="hljs-keyword">if</span> (page === <span class="hljs-number">1</span>) {
            list = [].concat(list)
        } <span class="hljs-keyword">else</span> {
            list = state.lists.data.concat(list)
        }
        state.lists = {
            <span class="hljs-attr">data</span>: list, hasNext, hasPrev, page, path
        }
    },
}

<span class="hljs-keyword">const</span> getters = {

}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">namespaced</span>: <span class="hljs-literal">true</span>,
    state,
    actions,
    mutations,
    getters
}</code></pre>
<p>这里一定要注意, state 一定要用函数返回值来初始化 state, 不然会导致所有用户共用 state</p>
<h4>步骤5:</h4>
<p>在 api 里接收 cookies, 并加到 axios 的 headers 里</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from 'axios'
import qs from 'qs'
import config from './config-server'

const parseCookie = cookies => {
    let cookie = ''
    Object.keys(cookies).forEach(item => {
        cookie+= item + '=' + cookies[item] + '; '
    })
    return cookie
}

export default {
    get(url, data, cookies = {}) {
        const cookie = parseCookie(cookies)
        return axios({
            method: 'get',
            url: config.api + url,
            data: qs.stringify(data),
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                cookie
            }
        })
    },
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>
<span class="hljs-keyword">import</span> qs <span class="hljs-keyword">from</span> <span class="hljs-string">'qs'</span>
<span class="hljs-keyword">import</span> config <span class="hljs-keyword">from</span> <span class="hljs-string">'./config-server'</span>

<span class="hljs-keyword">const</span> parseCookie = <span class="hljs-function"><span class="hljs-params">cookies</span> =&gt;</span> {
    <span class="hljs-keyword">let</span> cookie = <span class="hljs-string">''</span>
    <span class="hljs-built_in">Object</span>.keys(cookies).forEach(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
        cookie+= item + <span class="hljs-string">'='</span> + cookies[item] + <span class="hljs-string">'; '</span>
    })
    <span class="hljs-keyword">return</span> cookie
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    get(url, data, cookies = {}) {
        <span class="hljs-keyword">const</span> cookie = parseCookie(cookies)
        <span class="hljs-keyword">return</span> axios({
            <span class="hljs-attr">method</span>: <span class="hljs-string">'get'</span>,
            <span class="hljs-attr">url</span>: config.api + url,
            <span class="hljs-attr">data</span>: qs.stringify(data),
            <span class="hljs-attr">timeout</span>: config.timeout,
            <span class="hljs-attr">headers</span>: {
                <span class="hljs-string">'X-Requested-With'</span>: <span class="hljs-string">'XMLHttpRequest'</span>,
                <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'application/x-www-form-urlencoded; charset=UTF-8'</span>,
                cookie
            }
        })
    },
}</code></pre>
<p>如果你没有将 axios 重新封装, 那么也可以把第五步省略, 直接在第四部把 cookies 给 axios 即可</p>
<p>方案 2 具体实例: <a href="https://github.com/lincenying/mmf-blog-vue2-ssr" rel="nofollow noreferrer" target="_blank">https://github.com/lincenying...</a></p>
<p>方案 3 具体实例: <a href="https://github.com/lincenying/mmf-blog-vue2-pwa-ssr" rel="nofollow noreferrer" target="_blank">https://github.com/lincenying...</a></p>
<hr>
<p>综上, 如果你项目不大, 还是直接用方案 2 吧, 项目有很多页面, 并且大部分页面是每个用户都一样的, 可以考虑方案 3, 或者你有什么更好的方法, 欢迎讨论</p>
<p>Vue SSR 对需要 SEO, 并且每个用户看到的内容都是一致的, 配合缓存, 将是一个非常好的体验...</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
再说 Vue SSR 的 Cookies 问题

## 原文链接
[https://segmentfault.com/a/1190000010225972](https://segmentfault.com/a/1190000010225972)

