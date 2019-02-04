---
title: '使用Vue快速开发单页应用－登录页面' 
date: 2019-02-05 2:30:09
hidden: true
slug: 5d4nrl7td7y
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文所涉及代码全在<a href="https://github.com/wszgxa/vue-cnode" rel="nofollow noreferrer" target="_blank">vue-cnode</a></p></blockquote>
<p>前面两篇都是介绍组织结构和vue-router，从本文开始我们将讲一些如何优雅的用vue编写单页应用。首先我们从登录页面以及开始，因为后续很多其它的页面都需要登录信息。</p>
<h2 id="articleHeader0">路由，文件组织</h2>
<p>首先我们第一步肯定是指定一条路由啦，在<code>src/config_router.js</code>里面增加一条路由</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function configRouter (router) {
  router.map({
    '/login': {
      name: 'login',
      title: '登录',
      // es6箭头函数
      component: (resolve) => require(['./components/login/login.vue'], resolve)
    }
  })

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">configRouter</span> (<span class="hljs-params">router</span>) </span>{
  router.map({
    <span class="hljs-string">'/login'</span>: {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'login'</span>,
      <span class="hljs-attr">title</span>: <span class="hljs-string">'登录'</span>,
      <span class="hljs-comment">// es6箭头函数</span>
      component: <span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'./components/login/login.vue'</span>], resolve)
    }
  })

}</code></pre>
<p>上面compenents部分，使用了webpack代码分割功能，这样他会安需加在<code>./components/login/login.vue</code>组件。也可以这样写<code>component: require('./components/login/login.vue')</code>，这样就不会按需载入了。编译的第一个文件就有这个。</p>
<p>然后我们需要在<code>src/conponengts/</code>下面创建一个login的文件夹一个login.vue的文件。最开始login.vue里面应该是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style lang=&quot;styl&quot; src='../../assets/styl/login.styl' scoped></style>

<template>
  <section class=&quot;content&quot;>
  // something
  </section>
</template>
<script>
  export default {

  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;style lang=<span class="hljs-string">"styl"</span> src=<span class="hljs-string">'../../assets/styl/login.styl'</span> scoped&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span>

&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>&gt;</span>
  // something
  <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/template&gt;
&lt;script&gt;
  export default {

  }
&lt;/</span>script&gt;</code></pre>
<p>上面是vue-loader的结构，你可以看到，样式、模版、js三者很清晰，不像react中的写法全是js，jsx感觉还有点混乱（个人观点）。</p>
<p>上面的style中<code>lang</code>是指定解析语言，我们这里用的是<a href="http://stylus-lang.com/" rel="nofollow noreferrer" target="_blank">stylus</a>，然后<code>src</code>指定文件路径，最后的一个scoped是指定样式只在当前组件生效。template和script里面的内容就部多介绍了，现在开始编写业务逻辑。</p>
<h2 id="articleHeader1">vuex</h2>
<p>这里我们不介绍<a href="https://github.com/vuejs/vuex" rel="nofollow noreferrer" target="_blank">vuex</a>是个啥，文档在<a href="http://vuex.vuejs.org/" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<p>我们需要保存登录的信息，因为在后续的所有接口中去获取数据我们都需要服务器返回的用户信息。这里我们将获取用户信息、保存用户信息逻辑全部拆出来交给vuex。</p>
<h3 id="articleHeader2">modules</h3>
<p>先安装vuex：<code>npm install vuex --save</code>，然后我们建一个<code>store</code>。在src文件夹下面创建`/vuex/modules/user_info.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// content
import {
  SET_BASEINFO,
  SET_DETAIL
} from '../mutation_types'
const state = {
  // 保存第一页数据
  id: '',
  accessToken: '',
  loginName: '',
  avatarUrl: '',
  score: '',
  recentTopics: '',
  recentReplies: '',
  github: '',
  createAt: ''
}

const mutations = {
  // 设置 token 登录名 头像
  [SET_BASEINFO] (state, data) {
    try {
      state.id = data.id
      state.accessToken = data.accesstoken
      state.loginName = data.loginname
      state.avatarUrl = data.avatar_url
    } catch (err) {
      console.log(err)
    }
  },
  [SET_DETAIL] (state, data) {
    try {
      state.score = data.score
      state.recentTopics = data.recent_topics
      state.recentReplies = data.recent_replies
      state.github = data.githubUsername || ''
      state.createAt = data.create_at
    } catch (err) {
      console.log(err)
    }
  }
}

export default {
  state,
  mutations
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// content</span>
<span class="hljs-keyword">import</span> {
  SET_BASEINFO,
  SET_DETAIL
} <span class="hljs-keyword">from</span> <span class="hljs-string">'../mutation_types'</span>
<span class="hljs-keyword">const</span> state = {
  <span class="hljs-comment">// 保存第一页数据</span>
  id: <span class="hljs-string">''</span>,
  <span class="hljs-attr">accessToken</span>: <span class="hljs-string">''</span>,
  <span class="hljs-attr">loginName</span>: <span class="hljs-string">''</span>,
  <span class="hljs-attr">avatarUrl</span>: <span class="hljs-string">''</span>,
  <span class="hljs-attr">score</span>: <span class="hljs-string">''</span>,
  <span class="hljs-attr">recentTopics</span>: <span class="hljs-string">''</span>,
  <span class="hljs-attr">recentReplies</span>: <span class="hljs-string">''</span>,
  <span class="hljs-attr">github</span>: <span class="hljs-string">''</span>,
  <span class="hljs-attr">createAt</span>: <span class="hljs-string">''</span>
}

<span class="hljs-keyword">const</span> mutations = {
  <span class="hljs-comment">// 设置 token 登录名 头像</span>
  [SET_BASEINFO] (state, data) {
    <span class="hljs-keyword">try</span> {
      state.id = data.id
      state.accessToken = data.accesstoken
      state.loginName = data.loginname
      state.avatarUrl = data.avatar_url
    } <span class="hljs-keyword">catch</span> (err) {
      <span class="hljs-built_in">console</span>.log(err)
    }
  },
  [SET_DETAIL] (state, data) {
    <span class="hljs-keyword">try</span> {
      state.score = data.score
      state.recentTopics = data.recent_topics
      state.recentReplies = data.recent_replies
      state.github = data.githubUsername || <span class="hljs-string">''</span>
      state.createAt = data.create_at
    } <span class="hljs-keyword">catch</span> (err) {
      <span class="hljs-built_in">console</span>.log(err)
    }
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  state,
  mutations
}
</code></pre>
<p>上面有个<code>mutation_types</code>是用来让mutation唯一的，在mutation_types里面是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// user info
export const SET_BASEINFO = 'SET_BASEINFO'
export const SET_DETAIL = 'SET_DETAIL'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// user info</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> SET_BASEINFO = <span class="hljs-string">'SET_BASEINFO'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> SET_DETAIL = <span class="hljs-string">'SET_DETAIL'</span></code></pre>
<p>用<code>const</code>来保证唯一性。</p>
<p>然后我们需要将modules加到store里面，新建一个<code>/src/vuex/store.js</code>文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from './modules/user_info'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    userInfo
  },
  strict: debug,
  middlewares: debug ? [] : []
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
<span class="hljs-keyword">import</span> userInfo <span class="hljs-keyword">from</span> <span class="hljs-string">'./modules/user_info'</span>
Vue.use(Vuex)

<span class="hljs-keyword">const</span> debug = process.env.NODE_ENV !== <span class="hljs-string">'production'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vuex.Store({
  <span class="hljs-attr">modules</span>: {
    userInfo
  },
  <span class="hljs-attr">strict</span>: debug,
  <span class="hljs-attr">middlewares</span>: debug ? [] : []
})</code></pre>
<p>再把其在App.vue里面引用，App.vue加入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import store from './vuex/store'
export default {
  store
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./vuex/store'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  store
}</code></pre>
<p>这样我们就可以用:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vuex: {
  getters: {
    accessToken: ({ userInfo }) => userInfo.accessToken
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>vuex: {
  getters: {
    accessToken: <span class="hljs-function"><span class="hljs-params">({ userInfo })</span> =&gt;</span> userInfo.accessToken
  }
}</code></pre>
<p>来获取用户数据了。</p>
<h3 id="articleHeader3">actions</h3>
<p>我们将获取用户信息，保存用户信息的逻辑全放在vuex的actions里面，而不是在业务逻辑里面获取，只是在vuex里面保存一下。这样业务逻辑就更扁平了，数据的获取只需要调用一下actions里面的函数，用getter来动态获取。具体代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// /src/vuex/actions/user_actions.js
import * as types from '../mutation_types'
import { setMsg } from '../../tool'
import Vue from 'vue'
let localStorage = window.localStorage
let storeBaseInfo = (data) => {
  localStorage.setItem('cnodeBaseInfo', JSON.stringify(data))
}
let storeDetailInfo = (data) => {
  localStorage.setItem('cnodeDetailInfo', JSON.stringify(data))
}
// 获取存储在localStorage中的数据
export const getStore = ({ dispatch, state }) => {
  if (localStorage.getItem('cnodeBaseInfo')) {
    let data = JSON.parse(localStorage.getItem('cnodeBaseInfo'))
    dispatch(types.SET_BASEINFO, data)
  }
  if (localStorage.getItem('cnodeDetailInfo')) {
    let data = JSON.parse(localStorage.getItem('cnodeDetailInfo'))
    dispatch(types.SET_DETAIL, data)
  }
}
// 设置基础数据
export const setBaseInfo = ({ dispatch, state }, token, callback) => {
  Vue.http({
    url: '/api/v1/accesstoken',
    method: 'POST',
    body: JSON.stringify({
      accesstoken: token
    }),
    headers: {
      contentType: 'application/x-www-form-urlencoded'
    }
  }).then(function (res) {
    let data = JSON.parse(res.data)
    if (data.success) {
      data.accesstoken = token
      delete data.success
      storeBaseInfo(data)
      dispatch(types.SET_BASEINFO, data)
      callback(setMsg(true, '登录成功'))
    } else {
      console.log(data.error_msg)
      callback(setMsg(false, data.error_msg))
    }
  }).catch(err => {
    console.log(err)
    let errBody = JSON.parse(err.body)
    callback(setMsg(false, errBody.error_msg))
  })
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// /src/vuex/actions/user_actions.js</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> types <span class="hljs-keyword">from</span> <span class="hljs-string">'../mutation_types'</span>
<span class="hljs-keyword">import</span> { setMsg } <span class="hljs-keyword">from</span> <span class="hljs-string">'../../tool'</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">let</span> localStorage = <span class="hljs-built_in">window</span>.localStorage
<span class="hljs-keyword">let</span> storeBaseInfo = <span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
  localStorage.setItem(<span class="hljs-string">'cnodeBaseInfo'</span>, <span class="hljs-built_in">JSON</span>.stringify(data))
}
<span class="hljs-keyword">let</span> storeDetailInfo = <span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
  localStorage.setItem(<span class="hljs-string">'cnodeDetailInfo'</span>, <span class="hljs-built_in">JSON</span>.stringify(data))
}
<span class="hljs-comment">// 获取存储在localStorage中的数据</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> getStore = <span class="hljs-function">(<span class="hljs-params">{ dispatch, state }</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (localStorage.getItem(<span class="hljs-string">'cnodeBaseInfo'</span>)) {
    <span class="hljs-keyword">let</span> data = <span class="hljs-built_in">JSON</span>.parse(localStorage.getItem(<span class="hljs-string">'cnodeBaseInfo'</span>))
    dispatch(types.SET_BASEINFO, data)
  }
  <span class="hljs-keyword">if</span> (localStorage.getItem(<span class="hljs-string">'cnodeDetailInfo'</span>)) {
    <span class="hljs-keyword">let</span> data = <span class="hljs-built_in">JSON</span>.parse(localStorage.getItem(<span class="hljs-string">'cnodeDetailInfo'</span>))
    dispatch(types.SET_DETAIL, data)
  }
}
<span class="hljs-comment">// 设置基础数据</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> setBaseInfo = <span class="hljs-function">(<span class="hljs-params">{ dispatch, state }, token, callback</span>) =&gt;</span> {
  Vue.http({
    <span class="hljs-attr">url</span>: <span class="hljs-string">'/api/v1/accesstoken'</span>,
    <span class="hljs-attr">method</span>: <span class="hljs-string">'POST'</span>,
    <span class="hljs-attr">body</span>: <span class="hljs-built_in">JSON</span>.stringify({
      <span class="hljs-attr">accesstoken</span>: token
    }),
    <span class="hljs-attr">headers</span>: {
      <span class="hljs-attr">contentType</span>: <span class="hljs-string">'application/x-www-form-urlencoded'</span>
    }
  }).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{
    <span class="hljs-keyword">let</span> data = <span class="hljs-built_in">JSON</span>.parse(res.data)
    <span class="hljs-keyword">if</span> (data.success) {
      data.accesstoken = token
      <span class="hljs-keyword">delete</span> data.success
      storeBaseInfo(data)
      dispatch(types.SET_BASEINFO, data)
      callback(setMsg(<span class="hljs-literal">true</span>, <span class="hljs-string">'登录成功'</span>))
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-built_in">console</span>.log(data.error_msg)
      callback(setMsg(<span class="hljs-literal">false</span>, data.error_msg))
    }
  }).catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(err)
    <span class="hljs-keyword">let</span> errBody = <span class="hljs-built_in">JSON</span>.parse(err.body)
    callback(setMsg(<span class="hljs-literal">false</span>, errBody.error_msg))
  })
}
</code></pre>
<p>上面有个setMsg的函数，只是用来将格式化返回给组件的内容的，把action写的就像一个接口一样。</p>
<p>上面用了<a href="https://github.com/vuejs/vue-resource" rel="nofollow noreferrer" target="_blank">vue-resource</a>。然后我们做的事主要就件，调用接口，拿数据，错误处理，保存数据到localStorage，返回数据。</p>
<p>接下来，我们看看组件里面的获取数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import dialog from '../common/dialog'
  import { setBaseInfo, setDetail } from '../../vuex/actions/user_actions'
  import { setMenu, setTip } from '../../vuex/actions/doc_actions'
  export default {
    vuex: {
      actions: {
        setBaseInfo,
        setMenu,
        setTip,
        setDetail
      }
    },
    data () {
      return {
        config: {
          visible: false,
          text: '在 Cnode社区网站端登录你的账户，然后在右上角找到【设置】按钮，点击进入后将页面滑动到最底部来查看你的Access Token。',
          sureText: '确定'
        },
        access: ''
      }
    },
    methods: {
      dialog () {
        this.config.visible = true
      },
      success () {
        window.history.go(-1)
        this.setMenu(true)
        this.setDetail()
      },
      login () {
        if (this.access.length < 6) {
          this.setTip({
            text: '请输入正确的Access Token'
          })
          return
        }
        this.setBaseInfo(this.access, (res) => {
          if (res.success) {
            this.success()
          }
          this.setTip({
            text: res.msg
          })
        })
      }
    },
    components: {
      dialog
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> dialog <span class="hljs-keyword">from</span> <span class="hljs-string">'../common/dialog'</span>
  <span class="hljs-keyword">import</span> { setBaseInfo, setDetail } <span class="hljs-keyword">from</span> <span class="hljs-string">'../../vuex/actions/user_actions'</span>
  <span class="hljs-keyword">import</span> { setMenu, setTip } <span class="hljs-keyword">from</span> <span class="hljs-string">'../../vuex/actions/doc_actions'</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">vuex</span>: {
      <span class="hljs-attr">actions</span>: {
        setBaseInfo,
        setMenu,
        setTip,
        setDetail
      }
    },
    data () {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">config</span>: {
          <span class="hljs-attr">visible</span>: <span class="hljs-literal">false</span>,
          <span class="hljs-attr">text</span>: <span class="hljs-string">'在 Cnode社区网站端登录你的账户，然后在右上角找到【设置】按钮，点击进入后将页面滑动到最底部来查看你的Access Token。'</span>,
          <span class="hljs-attr">sureText</span>: <span class="hljs-string">'确定'</span>
        },
        <span class="hljs-attr">access</span>: <span class="hljs-string">''</span>
      }
    },
    <span class="hljs-attr">methods</span>: {
      dialog () {
        <span class="hljs-keyword">this</span>.config.visible = <span class="hljs-literal">true</span>
      },
      success () {
        <span class="hljs-built_in">window</span>.history.go(<span class="hljs-number">-1</span>)
        <span class="hljs-keyword">this</span>.setMenu(<span class="hljs-literal">true</span>)
        <span class="hljs-keyword">this</span>.setDetail()
      },
      login () {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.access.length &lt; <span class="hljs-number">6</span>) {
          <span class="hljs-keyword">this</span>.setTip({
            <span class="hljs-attr">text</span>: <span class="hljs-string">'请输入正确的Access Token'</span>
          })
          <span class="hljs-keyword">return</span>
        }
        <span class="hljs-keyword">this</span>.setBaseInfo(<span class="hljs-keyword">this</span>.access, (res) =&gt; {
          <span class="hljs-keyword">if</span> (res.success) {
            <span class="hljs-keyword">this</span>.success()
          }
          <span class="hljs-keyword">this</span>.setTip({
            <span class="hljs-attr">text</span>: res.msg
          })
        })
      }
    },
    <span class="hljs-attr">components</span>: {
      dialog
    }
  }</code></pre>
<p>首先引入actions,然后调用，因为返回数据格式事固定的，直接做判断，错误就用dialog弹错错误。是不是很清爽。</p>
<h2 id="articleHeader4">小结</h2>
<p>我感觉要仔仔细细把所有全部讲完，篇幅太长了。。。大家还是看看我这做个指引，具体还是看<a href="https://github.com/vuejs/vue-router" rel="nofollow noreferrer" target="_blank">代码</a></p>
<blockquote><p>原文地址：<a href="http://hiluluke.cn/2016/08/20/vue-first/" rel="nofollow noreferrer" target="_blank">http://hiluluke.cn/2016/08/20...</a></p></blockquote>
<p>其他</p>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000006711743">使用Vue快速开发单页应用－主体结构</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006712234" target="_blank">使用Vue快速开发单页应用－vue-router</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006712278">使用Vue快速开发单页应用－登录页面</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006713809" target="_blank">使用Vue快速开发单页应用－功能组件与路由组件通信</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用Vue快速开发单页应用－登录页面

## 原文链接
[https://segmentfault.com/a/1190000006712278](https://segmentfault.com/a/1190000006712278)

